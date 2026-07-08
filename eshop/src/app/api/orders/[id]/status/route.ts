import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connect from "@/lib/db";
import Order from "@/models/Order";
import authOptions from "@/lib/auth";
import { parseJson } from "@/lib/validation";
import { orderStatusSchema } from "@/lib/schemas";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseJson(request, orderStatusSchema);
  await connect();
  const order = await Order.findByIdAndUpdate(params.id, { status: body.status }, { new: true }).lean();
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ order });
}
