import connect from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";

export type ProductSort = "price_asc" | "price_desc" | "newest";

export type ProductFilters = {
  category?: string;
  search?: string;
  sort?: ProductSort;
};

export async function getProducts(filters: ProductFilters = {}) {
  await connect();

  const filter: Record<string, unknown> = {};
  if (filters.category) filter.category = filters.category;
  if (filters.search) filter.name = { $regex: filters.search, $options: "i" };

  let query = Product.find(filter);
  if (filters.sort === "price_asc") query = query.sort({ price: 1 });
  else if (filters.sort === "price_desc") query = query.sort({ price: -1 });
  else query = query.sort({ createdAt: -1 });

  return query.limit(100).lean();
}

export async function getProductBySlug(slug: string) {
  await connect();
  return Product.findOne({ slug }).lean();
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
