import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Order from "@/models/Order";
import authOptions from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();

  const filter = session.user.role === "admin" ? {} : { "shippingAddress.email": session.user.email };
  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ orders });
}
