import { cache } from "react";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getProductPage } from "@/lib/queries";

// generateMetadata and the page both need this — cache() runs the queries once per request.
const loadProduct = cache(getProductPage);

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const data = await loadProduct(params.slug);
    if (data) return { title: data.product.name, description: data.product.description };
  } catch {
    // DB unreachable — fall through to a generic title rather than failing the page
  }
  return { title: "Product" };
}

// Server-rendered: product, reviews and recommendations are in the first HTML
// response (fast first paint, indexable), instead of being fetched after load.
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const data = await loadProduct(params.slug);
  if (!data) notFound();
  return <ProductDetail product={data.product} reviews={data.reviews} recommendations={data.recommendations} />;
}
