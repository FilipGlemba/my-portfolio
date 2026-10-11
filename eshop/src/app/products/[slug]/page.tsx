import { ProductDetail } from "@/components/product-detail";
import { getProductBySlug } from "@/lib/queries";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const product = await getProductBySlug(params.slug);
    if (product) return { title: product.name, description: product.description };
  } catch {
    // DB unreachable — fall through to a generic title rather than failing the page
  }
  return { title: "Product" };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetail slug={params.slug} />;
}
