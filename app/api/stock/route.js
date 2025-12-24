import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";

export async function POST(req) {
  const { searchValues } = await req.json();
  console.log(searchValues);

  try {
    await connectMongoDB();
    const filter = { sold: false };
        const sort = {};

    searchValues.forEach(([key, value]) => {
      if (key === "date" || key === "price") {
        sort[key] = value === "asc" ? 1 : -1;
      } else if (value) {
        const valuesArray = value.split(",").map((v) => v.trim());
        filter[key] = { $in: valuesArray };
      }
    });

    const cars = await Car.find(filter).sort(sort);
    const carCount = cars.length;

    return NextResponse.json({ count: carCount, cars });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
