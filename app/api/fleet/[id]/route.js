import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Fleet } from "@/models/Fleet";

export const dynamic = "force-dynamic";

/**
 * GET /api/fleet/[id] — Public single vehicle detail
 */
export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const vehicle = await Fleet.findOne({
      _id: id,
      isActive: true,
    }).lean();

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehicle not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      vehicle: JSON.parse(JSON.stringify(vehicle)),
    });
  } catch (err) {
    console.error("[GET /api/fleet/[id]] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch vehicle." },
      { status: 500 }
    );
  }
}
