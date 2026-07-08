import { ProductCard } from "@/components/product-card";

async function fetchCollection(category: string) {
  const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products?category=${encodeURIComponent(category)}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch category.");
  return response.json();
}

export default async function CollectionsPage({ params }: { params: { category: string } }) {
  const data = await fetchCollection(params.category);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Collection</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">{params.category}</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {data.products.map((product: any) => (
          <ProductCard key={product.slug} {...product} image={product.images[0] ?? "/favicon.ico"} />
        ))}
      </div>
    </section>
  );
}
