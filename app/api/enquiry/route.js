import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Enquiry";
import { Client } from "@/models/Client";

export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const { firstName, lastName, email, contactNumber, ...rest } = body;

    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

    // 1. Build query conditions dynamically
    let query = [];
    if (email) query.push({ email: email.toLowerCase() });
    if (contactNumber) query.push({ phoneNumber: contactNumber });
    if (fullName) query.push({ fullName: new RegExp(`^${fullName}$`, "i") });

    let client = null;
    if (query.length > 0) {
      client = await Client.findOne({ $or: query });
    }

    // 2. If client doesn't exist, create one
    if (!client) {
      client = new Client({
        fullName,
        email,
        phoneNumber: contactNumber,
      });
      await client.save();
    }

    // 3. Create the inquiry linked to client
    const newInquiry = new Inquiry({
      ...rest,
      firstName,
      lastName,
      email,
      contactNumber,
      client: client._id,
    });
    await newInquiry.save();

    // 4. Push inquiry into client.inquiries
    client.inquiries = client.inquiries || [];
    client.inquiries.push(newInquiry._id);
    await client.save();

    return NextResponse.json({ success: true, inquiryId: newInquiry._id });
  } catch (error) {
    console.error("[POST Inquiry]", error);
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    await connectMongoDB();
    const { id, cleared } = await req.json();
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { cleared },
      { new: true }
    );

    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear enquiry" },
      { status: 500 }
    );
  }
}
// GET - Get all enquiries or a single enquiry
export async function GET(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const enquiry = await Enquiry.findById(id);
      if (!enquiry) {
        return NextResponse.json(
          { error: "Enquiry not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(enquiry);
    } else {
      const enquiries = await Enquiry.find();
      return NextResponse.json(enquiries);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a single enquiry by id
export async function DELETE(req) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Enquiry ID is required" },
        { status: 400 }
      );
    }

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Enquiry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
