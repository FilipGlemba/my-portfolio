import connect from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Review from "@/models/Review";

export type ProductSort = "price_asc" | "price_desc" | "newest";

export type ProductFilters = {
  category?: string;
  search?: string;
  sort?: ProductSort;
};

export type RatingSummary = { rating: number; reviewCount: number };

// One aggregate query for however many slugs are on screen, instead of one
// query per product card (N+1).
async function getRatingSummaries(slugs: string[]): Promise<Record<string, RatingSummary>> {
  if (!slugs.length) return {};

  const rows = await Review.aggregate([
    { $match: { productSlug: { $in: slugs } } },
    { $group: { _id: "$productSlug", rating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
  ]);

  const summaries: Record<string, RatingSummary> = {};
  for (const row of rows) {
    summaries[row._id] = { rating: Math.round(row.rating * 10) / 10, reviewCount: row.reviewCount };
  }
  return summaries;
}

export async function getProducts(filters: ProductFilters = {}) {
  await connect();

  const filter: Record<string, unknown> = {};
  if (filters.category) filter.category = filters.category;
  if (filters.search) filter.name = { $regex: filters.search, $options: "i" };

  let query = Product.find(filter);
  if (filters.sort === "price_asc") query = query.sort({ price: 1 });
  else if (filters.sort === "price_desc") query = query.sort({ price: -1 });
  else query = query.sort({ createdAt: -1 });

  const products = await query.limit(100).lean();
  const summaries = await getRatingSummaries(products.map((p) => p.slug));

  return products.map((product) => ({
    ...product,
    rating: summaries[product.slug]?.rating ?? null,
    reviewCount: summaries[product.slug]?.reviewCount ?? 0,
  }));
}

export async function getProductBySlug(slug: string) {
  await connect();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return null;

  const summaries = await getRatingSummaries([slug]);
  return {
    ...product,
    rating: summaries[slug]?.rating ?? null,
    reviewCount: summaries[slug]?.reviewCount ?? 0,
  };
}

export async function getReviewsForProduct(slug: string) {
  await connect();
  return Review.find({ productSlug: slug }).sort({ createdAt: -1 }).lean();
}

export async function getRecommendations(category: string, excludeSlug: string, limit = 4) {
  await connect();
  const products = await Product.find({ category, slug: { $ne: excludeSlug } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const summaries = await getRatingSummaries(products.map((p) => p.slug));
  return products.map((product) => ({
    ...product,
    rating: summaries[product.slug]?.rating ?? null,
    reviewCount: summaries[product.slug]?.reviewCount ?? 0,
  }));
}

export async function getOrdersForUser(email: string, isAdmin: boolean) {
  await connect();
  const filter = isAdmin ? {} : { "shippingAddress.email": email };
  return Order.find(filter).sort({ createdAt: -1 }).lean();
}

export async function getOrderById(id: string) {
  await connect();
  return Order.findById(id).populate("items.product").lean();
}

export async function getAdminStats() {
  await connect();

  const orders = await Order.find({ status: { $ne: "cancelled" } }).lean();
  const revenue = orders.reduce((total, order) => total + order.total, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ordersToday = orders.filter((order) => new Date(order.createdAt) >= today).length;

  const unitsBySlug = new Map<string, number>();
  for (const order of orders) {
    for (const item of order.items) {
      unitsBySlug.set(item.slug, (unitsBySlug.get(item.slug) ?? 0) + item.qty);
    }
  }

  const products = await Product.find().lean();
  const topProducts = products
    .map((product) => ({ name: product.name, units: unitsBySlug.get(product.slug) ?? 0 }))
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  return { revenue, ordersToday, topProducts, orderCount: orders.length };
}
