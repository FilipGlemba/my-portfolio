import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/models/Product";
import { productUpdateSchema } from "@/lib/schemas";
import { parseJson } from "@/lib/validation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { demoProducts } from "@/lib/demo-products";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connect();
    const product = await Product.findOne({ slug: params.slug }).lean();
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product });
  } catch {
    const product = demoProducts.find((item) => item.slug === params.slug);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product, source: "demo" });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseJson(request, productUpdateSchema);
  await connect();

  const product = await Product.findOneAndUpdate({ slug: params.slug }, body, { new: true });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();
  const product = await Product.findOneAndDelete({ slug: params.slug });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
