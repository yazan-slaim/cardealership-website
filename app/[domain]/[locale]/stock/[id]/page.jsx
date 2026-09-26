import { connectMongoDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";
import { Fleet } from "@/models/Fleet";
import { Dealership } from "@/models/Dealership";
import MongodbProduct from "@/components/MongodbProduct";
import RentalCarDetail from "@/components/RentalCarDetail";
import { notFound } from "next/navigation";

export default async function page({ params }) {
  await connectMongoDB();

  const domain = params.domain;

  // Resolve dealership
  let dealership = await Dealership.findOne({
    $or: [{ subdomain: domain }, { customDomain: domain }]
  });

  if (!dealership) {
    dealership = await Dealership.findOne();
    if (!dealership) return notFound();
  }

  // ─── RENTAL BUSINESS ────────────────────────
  if (dealership.businessType === "rental") {
    let vehicle = await Fleet.findOne({
      _id: params.id,
      dealershipId: dealership._id,
      isActive: true,
    }).lean();
    vehicle = vehicle ? JSON.parse(JSON.stringify(vehicle)) : null;

    return (
      <RentalCarDetail
        product={vehicle}
        dealership={JSON.parse(JSON.stringify(dealership))}
      />
    );
  }

  // ─── DEALERSHIP BUSINESS (existing) ─────────
  let product = await Car.findById(params.id).lean();
  product = product ? JSON.parse(JSON.stringify(product)) : null;

  return <MongodbProduct product={product} />;
}

