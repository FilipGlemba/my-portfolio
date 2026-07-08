import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import authOptions from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();
  const orders = await Order.find({ status: { $ne: "cancelled" } }).lean();
  const revenue = orders.reduce((total, order) => total + order.total, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ordersToday = orders.filter((order) => new Date(order.createdAt) >= today).length;

  const products = await Product.find().lean();
  const topProducts = products.slice(0, 3).map((product) => ({ name: product.name, units: 0 }));

  return NextResponse.json({ revenue, ordersToday, topProducts });
}
