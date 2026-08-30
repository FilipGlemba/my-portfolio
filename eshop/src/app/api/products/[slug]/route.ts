import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/models/Product";
import { productUpdateSchema } from "@/lib/schemas";
import { parseJson } from "@/lib/validation";
import { getProductBySlug, getReviewsForProduct, getRecommendations } from "@/lib/queries";
import { getAdminSession } from "@/lib/require-admin";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [reviews, recommendations] = await Promise.all([
    getReviewsForProduct(params.slug),
    getRecommendations(product.category, params.slug),
  ]);

  return NextResponse.json({ product, reviews, recommendations });
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseJson(request, productUpdateSchema);
  await connect();

  const product = await Product.findOneAndUpdate({ slug: params.slug }, body, { new: true });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();
  const product = await Product.findOneAndDelete({ slug: params.slug });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
