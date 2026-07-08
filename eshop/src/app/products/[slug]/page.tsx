import { ProductDetail } from "@/components/product-detail";

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetail slug={params.slug} />;
}
