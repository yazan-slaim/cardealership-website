import { NextResponse } from "next/server";
import { HeatMap } from "@/model/HeatMap";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    console.log(page)

    if (!page) {
      return NextResponse.json({ error: "Page parameter is required" }, { status: 400 });
    }

    const heatmapData = await HeatMap.find({ page }, "interactions -_id").lean();

    const flattenedInteractions = heatmapData.flatMap(doc => 
      doc.interactions.map(({ x, y, type }) => ({ x, y, type }))
    );
    console.log(flattenedInteractions)

    return NextResponse.json(flattenedInteractions, { status: 200 });
  } catch (error) {
    console.error("Error fetching heatmap data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
