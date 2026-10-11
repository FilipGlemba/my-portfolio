import connect from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Review from "@/models/Review";
import { escapeRegex, MAX_SEARCH_LENGTH } from "@/lib/text";

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
  const search = filters.search?.trim().slice(0, MAX_SEARCH_LENGTH);
  if (search) filter.name = { $regex: escapeRegex(search), $options: "i" };

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

export async function getCatalogStats() {
  await connect();
  const [products, categories] = await Promise.all([Product.countDocuments(), Product.distinct("category")]);
  return { products, categories: categories.length };
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

// ─── Serializable shapes for server → client components ───
// Mongoose lean docs carry ObjectIds and Dates, which can't cross the
// server/client boundary as props. These are plain JSON-safe copies.

export type CatalogProduct = {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  badge: string;
  featured: boolean;
  sizes: string[];
  rating: number | null;
  reviewCount: number;
};

export type CatalogReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ProductLike = {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images?: string[];
  badge?: string;
  featured?: boolean;
  sizes?: string[];
  rating?: number | null;
  reviewCount?: number;
};

export function toCatalogProduct(product: ProductLike): CatalogProduct {
  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    images: product.images ?? [],
    badge: product.badge ?? "NONE",
    featured: Boolean(product.featured),
    sizes: product.sizes ?? [],
    rating: product.rating ?? null,
    reviewCount: product.reviewCount ?? 0,
  };
}

export async function getCatalog(filters: ProductFilters = {}): Promise<CatalogProduct[]> {
  return (await getProducts(filters)).map(toCatalogProduct);
}

export async function getProductPage(slug: string) {
  const product = await getProductBySlug(slug);
  if (!product) return null;
  const [reviews, recommendations] = await Promise.all([
    getReviewsForProduct(slug),
    getRecommendations(product.category, slug),
  ]);
  return {
    product: toCatalogProduct(product),
    reviews: reviews.map(
      (review): CatalogReview => ({
        id: String(review._id),
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        createdAt: new Date(review.createdAt).toISOString(),
      }),
    ),
    recommendations: recommendations.map(toCatalogProduct),
  };
}

export type HighlightedReview = CatalogReview & { productSlug: string; productName: string };

/** Recent 4–5★ reviews across the catalog, with the product they're about. */
export async function getHighlightedReviews(limit = 6): Promise<HighlightedReview[]> {
  await connect();
  const reviews = await Review.find({ rating: { $gte: 4 } }).sort({ createdAt: -1 }).limit(limit).lean();
  const products = await Product.find({ slug: { $in: reviews.map((r) => r.productSlug) } }, { slug: 1, name: 1 }).lean();
  const names = new Map(products.map((p) => [p.slug, p.name]));
  return reviews
    .filter((review) => names.has(review.productSlug))
    .map((review) => ({
      id: String(review._id),
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: new Date(review.createdAt).toISOString(),
      productSlug: review.productSlug,
      productName: names.get(review.productSlug)!,
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
    .filter((product) => product.units > 0)
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  // Last 30 days, one bucket per UTC day (oldest first), including empty days.
  const DAY = 24 * 60 * 60 * 1000;
  const startOfToday = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
  const daily = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(startOfToday - (29 - i) * DAY).toISOString().slice(0, 10),
    revenue: 0,
    orders: 0,
  }));
  const dayIndex = new Map(daily.map((day, i) => [day.date, i]));
  for (const order of orders) {
    const i = dayIndex.get(new Date(order.createdAt).toISOString().slice(0, 10));
    if (i === undefined) continue;
    daily[i].revenue = Math.round((daily[i].revenue + order.total) * 100) / 100;
    daily[i].orders += 1;
  }
  const revenue30 = Math.round(daily.reduce((sum, day) => sum + day.revenue, 0) * 100) / 100;
  const orders30 = daily.reduce((sum, day) => sum + day.orders, 0);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((order) => ({
      id: String(order._id),
      name: order.shippingAddress?.name ?? "",
      total: order.total,
      status: order.status,
      createdAt: new Date(order.createdAt).toISOString(),
    }));

  return {
    revenue,
    ordersToday,
    topProducts,
    orderCount: orders.length,
    daily,
    revenue30,
    orders30,
    averageOrder: orders30 ? Math.round((revenue30 / orders30) * 100) / 100 : 0,
    recentOrders,
  };
}
