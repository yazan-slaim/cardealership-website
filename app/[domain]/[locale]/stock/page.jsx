import StockPage from "@/components/StockPage";
import RentalFleetPage from "@/components/RentalFleetPage";
import { connectMongoDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";
import { Fleet } from "@/models/Fleet";
import { Dealership } from "@/models/Dealership";

export default async function page({ params, searchParams }) {
  const { domain } = params;
  const {
    date = "desc",
    price,
    color,
    bodyType,
    carMake,
    transmission,
    fuel,
    search,
    page = 1,
  } = searchParams;

  await connectMongoDB();

  // Find the dealership based on the domain/subdomain
  let dealership = await Dealership.findOne({
    $or: [{ subdomain: domain }, { customDomain: domain }]
  });

  if (!dealership) {
    dealership = await Dealership.findOne(); 
  }

  // ─── RENTAL BUSINESS → Fleet Grid ───────────
  if (dealership?.businessType === "rental") {
    const filter = {
      dealershipId: dealership._id,
      isActive: true,
      status: "available",
    };

    if (bodyType) filter.bodyType = bodyType;
    if (fuel) filter.fuel = fuel;
    if (transmission) filter.transmission = transmission;
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { title: regex },
        { carMake: regex },
        { model: regex },
      ];
    }

    const sortField = price ? "dailyRate" : "createdAt";
    const sortOrder = price === "asc" ? 1 : -1;

    const limit = 20;
    const skip = (parseInt(page) - 1) * limit;

    const [fleet, totalCars] = await Promise.all([
      Fleet.find(filter)
        .select("title carMake model year color bodyType transmission fuel seats mileage images features dailyRate weeklyRate monthlyRate status Featured")
        .sort({ [sortField]: sortOrder, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Fleet.countDocuments(filter),
    ]);

    // Get filter options
    const filterBase = { dealershipId: dealership._id, isActive: true, status: "available" };
    const [bodyTypes, fuels, transmissions] = await Promise.all([
      Fleet.distinct("bodyType", filterBase),
      Fleet.distinct("fuel", filterBase),
      Fleet.distinct("transmission", filterBase),
    ]);

    return (
      <RentalFleetPage
        collection={JSON.parse(JSON.stringify(fleet))}
        totalCars={totalCars}
        filters={{
          bodyType: bodyTypes.filter(Boolean).sort(),
          fuel: fuels.filter(Boolean).sort(),
          transmission: transmissions.filter(Boolean).sort(),
        }}
        dealership={JSON.parse(JSON.stringify(dealership))}
      />
    );
  }

  // ─── DEALERSHIP BUSINESS (existing) ─────────
  // ✅ Sorting logic
  const sort = {};
  if (price) sort.price = price === "desc" ? -1 : 1;
  if (date) sort._createdAt = date === "desc" ? -1 : 1;

  // ✅ Always add a unique tie-breaker to prevent duplicate cars between pages
  sort._id = -1;

  // ✅ Filtering logic
  const query = {};
  if (dealership) {
    query.dealershipId = dealership._id;
  }
  if (color) query.color = color;
  if (bodyType) query.bodyType = bodyType;
  if (carMake) query.carMake = carMake;
  if (transmission) query.transmission = transmission;
  if (fuel) query.fuel = fuel;
  if (search) query.title = { $regex: search, $options: "i" };

  // ✅ Pagination setup
  const limit = 20;
  const skip = (parseInt(page) - 1) * limit;

  // ✅ Fetch paginated, filtered cars
  const mongocars = await Car.find(
    {
      ...query,
      images: { $exists: true, $ne: [], $not: { $size: 0 } }, // Ensure valid images
    },
    "title color year price mileage condition logoImage images"
  )
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  // ✅ Get total number of cars for pagination display
  const totalCars = await Car.countDocuments({
    ...query,
    images: { $exists: true, $ne: [], $not: { $size: 0 } },
  });

  return <StockPage collection={mongocars} totalCars={totalCars} />;
}

