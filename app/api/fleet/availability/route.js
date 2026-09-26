import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { Fleet } from "@/models/Fleet";

export const dynamic = "force-dynamic";

/**
 * GET /api/fleet/availability — Check vehicle availability for a date range
 * Query params: fleetId, pickupDate, returnDate
 * Returns: { available: boolean, conflictingBookings: number }
 */
export async function GET(req) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);

    const fleetId = searchParams.get("fleetId");
    const pickupDate = searchParams.get("pickupDate");
    const returnDate = searchParams.get("returnDate");

    if (!fleetId || !pickupDate || !returnDate) {
      return NextResponse.json(
        { error: "fleetId, pickupDate, and returnDate are required." },
        { status: 400 }
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

    // Check vehicle exists and is not retired/maintenance
    const vehicle = await Fleet.findById(fleetId).lean();
    if (!vehicle || !vehicle.isActive) {
      return NextResponse.json(
        { error: "Vehicle not found." },
        { status: 404 }
      );
    }

    if (vehicle.status === "maintenance" || vehicle.status === "retired") {
      return NextResponse.json({
        available: false,
        reason: `Vehicle is currently ${vehicle.status}.`,
      });
    }

    // Check for overlapping bookings
    const conflictingBookings = await Booking.countDocuments({
      fleet: fleetId,
      status: { $in: ["pending", "confirmed", "active"] },
      pickupDate: { $lt: returnD },
      returnDate: { $gt: pickup },
    });

    return NextResponse.json({
      available: conflictingBookings === 0,
      conflictingBookings,
      vehicle: {
        title: vehicle.title,
        status: vehicle.status,
        dailyRate: vehicle.dailyRate,
        weeklyRate: vehicle.weeklyRate,
        monthlyRate: vehicle.monthlyRate,
      },
    });
  } catch (err) {
    console.error("[GET /api/fleet/availability] Error:", err);
    return NextResponse.json(
      { error: "Failed to check availability." },
      { status: 500 }
    );
  }
}
