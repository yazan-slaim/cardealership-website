import StockPage from "@/components/StockPage";
import { connectMongoDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";

export default async function page({ searchParams }) {
  const {
    date = "desc",
    price,
    color,
    bodyType,
    carMake,
    transmission,
    fuel,
    search,
    page = 1, // ✅ default page
  } = searchParams;

  await connectMongoDB();

  // ✅ Sorting logic
  const sort = {};
  if (price) sort.price = price === "desc" ? -1 : 1;
  if (date) sort._createdAt = date === "desc" ? -1 : 1;

  // ✅ Always add a unique tie-breaker to prevent duplicate cars between pages
  sort._id = -1;

  // ✅ Filtering logic
  const query = {};
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
