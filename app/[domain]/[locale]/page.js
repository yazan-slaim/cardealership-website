import HomePage from "@/components/HomePage";
import { connectMongoDB } from "@/lib/mongodb";
import { FeaturedCar } from "@/models/FeaturedCar";
import React from "react";
import { Car } from "@/models/Car";


import { Dealership } from "@/models/Dealership";
import { notFound } from "next/navigation";

export default async function page({ params }) {
  await connectMongoDB();
  
  const domain = params.domain;
  
  // Find the dealership based on the domain/subdomain
  // If no domain is matched, we could default to a 'master' dealership or throw 404
  let dealership = await Dealership.findOne({
    $or: [{ subdomain: domain }, { customDomain: domain }]
  });

  if (!dealership) {
    // For development, if we want a fallback instead of 404
    dealership = await Dealership.findOne(); 
    if (!dealership) return notFound();
  }

  // Fetch only cars for this specific dealership
  const featuredcars = await Car.find({ 
    dealershipId: dealership._id,
    Featured: true 
  }).limit(5).lean();

  return <HomePage featuredcars={featuredcars} dealership={JSON.parse(JSON.stringify(dealership))} />;
}
