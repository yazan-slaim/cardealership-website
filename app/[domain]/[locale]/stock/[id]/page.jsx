import { connectMongoDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";
import MongodbProduct from "@/components/MongodbProduct";

export default async function page({ params }) {
  await connectMongoDB();
  let product = await Car.findById(params.id).lean();
  product = product ? JSON.parse(JSON.stringify(product)) : null;

  return <MongodbProduct product={product} />;
}
