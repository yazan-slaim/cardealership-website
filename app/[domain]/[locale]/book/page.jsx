import { connectMongoDB } from "@/lib/mongodb";
import { Dealership } from "@/models/Dealership";
import BookingFlow from "@/components/BookingFlow";
import { notFound, redirect } from "next/navigation";

export default async function BookPage({ params }) {
  await connectMongoDB();

  const domain = params.domain;

  let dealership = await Dealership.findOne({
    $or: [{ subdomain: domain }, { customDomain: domain }],
  });

  if (!dealership) {
    dealership = await Dealership.findOne();
    if (!dealership) return notFound();
  }

  // Only rental businesses have a booking flow
  if (dealership.businessType !== "rental") {
    redirect("/");
  }

  return (
    <BookingFlow dealership={JSON.parse(JSON.stringify(dealership))} />
  );
}
