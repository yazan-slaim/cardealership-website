import HomePage from "@/components/HomePage";
import { connectMongoDB } from "@/lib/mongodb";
import { FeaturedCar } from "@/models/FeaturedCar";
import React from "react";
import { Car } from "@/models/Car";


export default async function page() {
  await connectMongoDB();
const featuredcars = await Car.find({ Featured: true }).limit(5).lean();
  return <HomePage featuredcars={featuredcars} />;
}
