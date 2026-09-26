import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { Fleet } from "@/models/Fleet";
import { Client } from "@/models/Client";
import { Dealership } from "@/models/Dealership";

/**
 * POST /api/bookings — Public booking creation (reservation request)
 * Body: { dealershipId, fleetId, pickupDate, returnDate, rateType, extras[], 
 *         firstName, lastName, email, phone, driverLicenseNumber, pickupLocation, returnLocation, notes }
 */
export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const {
      dealershipId,
      fleetId,
      pickupDate,
      returnDate,
      rateType = "daily",
      extras = [],
      firstName,
      lastName,
      email,
      phone,
      driverLicenseNumber,
      pickupLocation,
      returnLocation,
      notes,
    } = body;

    // Validation
    if (!dealershipId || !fleetId || !pickupDate || !returnDate) {
      return NextResponse.json(
        { error: "dealershipId, fleetId, pickupDate, and returnDate are required." },
        { status: 400 }
      );
    }

    if (!firstName || !phone) {
      return NextResponse.json(
        { error: "First name and phone number are required." },
        { status: 400 }
      );
    }

    // Verify dealership is rental
    const dealership = await Dealership.findById(dealershipId).lean();
    if (!dealership || dealership.businessType !== "rental") {
      return NextResponse.json(
        { error: "Bookings are only available for rental businesses." },
        { status: 403 }
      );
    }

    // Verify vehicle exists and is available
    const vehicle = await Fleet.findById(fleetId);
    if (!vehicle || !vehicle.isActive) {
      return NextResponse.json(
        { error: "Vehicle not found." },
        { status: 404 }
      );
    }

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    if (returnD <= pickup) {
      return NextResponse.json(
        { error: "Return date must be after pickup date." },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const overlap = await Booking.findOne({
      fleet: fleetId,
      status: { $in: ["pending", "confirmed", "active"] },
      pickupDate: { $lt: returnD },
      returnDate: { $gt: pickup },
    });
    if (overlap) {
      return NextResponse.json(
        { error: "Vehicle is already booked for the selected dates." },
        { status: 400 }
      );
    }

    // Find or create client (same pattern as enquiry/route.js)
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
    let queryConditions = [];
    if (email) queryConditions.push({ email: email.toLowerCase() });
    if (phone) queryConditions.push({ phoneNumber: phone });
    if (fullName) queryConditions.push({ fullName: new RegExp(`^${fullName}$`, "i") });

    let client = null;
    if (queryConditions.length > 0) {
      client = await Client.findOne({ $or: queryConditions });
    }

    if (!client) {
      client = new Client({
        fullName,
        email: email || "",
        phoneNumber: phone,
        driverLicense: driverLicenseNumber
          ? { number: driverLicenseNumber }
          : undefined,
      });
      await client.save();
    } else if (driverLicenseNumber && !client.driverLicense?.number) {
      // Update driver license if not already set
      client.driverLicense = { ...client.driverLicense, number: driverLicenseNumber };
      await client.save();
    }

    // Determine rate amount based on rate type
    let rateAmount = vehicle.dailyRate;
    if (rateType === "weekly" && vehicle.weeklyRate) {
      rateAmount = vehicle.weeklyRate;
    } else if (rateType === "monthly" && vehicle.monthlyRate) {
      rateAmount = vehicle.monthlyRate;
    }

    // Calculate deposit from dealership config
    const depositPercent = dealership.rentalConfig?.depositPercent || 20;

    // Create the booking
    const booking = new Booking({
      dealershipId,
      fleet: fleetId,
      renter: client._id,
      pickupDate: pickup,
      returnDate: returnD,
      rateType,
      rateAmount,
      extras: extras.map((e) => ({ name: e.name, price: e.price })),
      pickupLocation: pickupLocation || "",
      returnLocation: returnLocation || "",
      adminNotes: notes || "",
      status: "pending",
      paymentStatus: "pending",
    });

    await booking.save();

    // Calculate deposit after totalAmount is computed by pre-save hook
    booking.deposit = Math.round((booking.totalAmount || 0) * (depositPercent / 100));
    await booking.save();

    // Mark vehicle as reserved
    await Fleet.findByIdAndUpdate(fleetId, { status: "reserved" });

    // Link booking to client
    client.bookings = client.bookings || [];
    client.bookings.push(booking._id);
    await client.save();

    return NextResponse.json(
      {
        success: true,
        booking: {
          bookingNumber: booking.bookingNumber,
          status: booking.status,
          pickupDate: booking.pickupDate,
          returnDate: booking.returnDate,
          totalDays: booking.totalDays,
          rateAmount: booking.rateAmount,
          subtotal: booking.subtotal,
          extras: booking.extras,
          totalAmount: booking.totalAmount,
          deposit: booking.deposit,
          vehicle: {
            title: vehicle.title,
            images: vehicle.images?.[0],
          },
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/bookings] Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create booking." },
      { status: 500 }
    );
  }
}
