import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/models/Product";
import { productCreateSchema } from "@/lib/schemas";
import { parseJson } from "@/lib/validation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { demoProducts } from "@/lib/demo-products";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");
  const sort = url.searchParams.get("sort");

  const filter: Record<string, any> = {};
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };

  try {
    await connect();
    let query = Product.find(filter);
    if (sort === "price_asc") query = query.sort({ price: 1 });
    else if (sort === "price_desc") query = query.sort({ price: -1 });
    else query = query.sort({ createdAt: -1 });

    const products = await query.limit(100).lean();
    return NextResponse.json({ products });
  } catch {
    const searchLower = search?.toLowerCase();
    const products = demoProducts
      .filter((product) => !category || product.category === category)
      .filter((product) => !searchLower || product.name.toLowerCase().includes(searchLower))
      .sort((a, b) => {
        if (sort === "price_asc") return a.price - b.price;
        if (sort === "price_desc") return b.price - a.price;
        return 0;
      });

    return NextResponse.json({ products, source: "demo" });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseJson(request, productCreateSchema);
  await connect();
  const product = await Product.create(body);

  return NextResponse.json({ product });
}
