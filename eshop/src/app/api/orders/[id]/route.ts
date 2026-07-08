import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Order from "@/models/Order";
import authOptions from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();
  const order = await Order.findById(params.id).populate("items.product").lean();
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.role !== "admin" && order.shippingAddress.email !== session.user.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ order });
}
