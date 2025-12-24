import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";

export async function GET() {
  try {
    await connectMongoDB();

    const carMakes = await Car.distinct("carMake");
    const colors = await Car.distinct("color");
    const bodyTypes = await Car.distinct("bodyType");
    const transmissions = await Car.distinct("transmission");
    const fuels = await Car.distinct("fuel");

    return NextResponse.json({
      success: true,
      filters: {
        carMake: carMakes,
        color: colors,
        bodyType: bodyTypes,
        transmission: transmissions,
        fuel: fuels,
      },
    });
  } catch (err) {
    console.error("[GET Filters]", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch filters" },
      { status: 500 }
    );
  }
}
