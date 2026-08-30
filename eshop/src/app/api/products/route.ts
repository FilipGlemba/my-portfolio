import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/models/Product";
import { productCreateSchema } from "@/lib/schemas";
import { parseJson } from "@/lib/validation";
import { getProducts, type ProductSort } from "@/lib/queries";
import { getAdminSession } from "@/lib/require-admin";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? undefined;
  const search = url.searchParams.get("search") ?? undefined;
  const sort = (url.searchParams.get("sort") ?? undefined) as ProductSort | undefined;

  const products = await getProducts({ category, search, sort });
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseJson(request, productCreateSchema);
  await connect();
  const product = await Product.create(body);

  return NextResponse.json({ product });
}
