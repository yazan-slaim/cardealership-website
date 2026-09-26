import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Fleet } from "@/models/Fleet";
import { Dealership } from "@/models/Dealership";

export const dynamic = "force-dynamic";

/**
 * GET /api/fleet — Public fleet listing for rental businesses
 * Query params: dealershipId, status, bodyType, fuel, transmission, seats, search, sort, order, page, limit
 * Also returns filter options for the fleet grid UI
 */
export async function GET(req) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);

    // Resolve dealership — required for scoping
    const dealershipId = searchParams.get("dealershipId");
    if (!dealershipId) {
      return NextResponse.json(
        { error: "dealershipId is required." },
        { status: 400 }
      );
    }

    // Verify dealership is a rental business
    const dealership = await Dealership.findById(dealershipId).lean();
    if (!dealership || dealership.businessType !== "rental") {
      return NextResponse.json(
        { error: "Fleet is only available for rental businesses." },
        { status: 403 }
      );
    }

    const filter = {
      dealershipId,
      isActive: true,
    };

    // Only show available vehicles by default (public view)
    const status = searchParams.get("status") || "available";
    if (status !== "all") {
      filter.status = status;
    }

    // Optional filters
    const bodyType = searchParams.get("bodyType");
    if (bodyType) filter.bodyType = bodyType;

    const fuel = searchParams.get("fuel");
    if (fuel) filter.fuel = fuel;

    const transmission = searchParams.get("transmission");
    if (transmission) filter.transmission = transmission;

    const seats = searchParams.get("seats");
    if (seats) filter.seats = parseInt(seats);

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      filter.dailyRate = {};
      if (minPrice) filter.dailyRate.$gte = parseFloat(minPrice);
      if (maxPrice) filter.dailyRate.$lte = parseFloat(maxPrice);
    }

    // Search by title, make, or model
    const search = searchParams.get("search");
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { title: regex },
        { carMake: regex },
        { model: regex },
      ];
    }

    // Sorting
    const sortField = searchParams.get("sort") || "dailyRate";
    const sortOrder = searchParams.get("order") === "desc" ? -1 : 1;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Fetch fleet with pagination
    const [fleet, totalCount] = await Promise.all([
      Fleet.find(filter)
        .select("title carMake model year color bodyType transmission fuel seats mileage images features dailyRate weeklyRate monthlyRate status Featured")
        .sort({ [sortField]: sortOrder, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Fleet.countDocuments(filter),
    ]);

    // Fetch filter options from available vehicles for this dealership
    const filterBase = { dealershipId, isActive: true, status: "available" };
    const [bodyTypes, fuels, transmissions, seatOptions] = await Promise.all([
      Fleet.distinct("bodyType", filterBase),
      Fleet.distinct("fuel", filterBase),
      Fleet.distinct("transmission", filterBase),
      Fleet.distinct("seats", filterBase),
    ]);

    return NextResponse.json({
      fleet: JSON.parse(JSON.stringify(fleet)),
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      filters: {
        bodyType: bodyTypes.filter(Boolean).sort(),
        fuel: fuels.filter(Boolean).sort(),
        transmission: transmissions.filter(Boolean).sort(),
        seats: seatOptions.filter(Boolean).sort((a, b) => a - b),
      },
    });
  } catch (err) {
    console.error("[GET /api/fleet] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch fleet." },
      { status: 500 }
    );
  }
}
