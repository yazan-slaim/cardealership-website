import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Review } from "@/models/Review";

// GET - Get all reviews or a single review by ?id=
export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const review = await Review.findById(id);
      if (!review) {
        return NextResponse.json({ error: "Review not found" }, { status: 404 });
      }
      return NextResponse.json(review);
    }

    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("[GET Reviews]", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
