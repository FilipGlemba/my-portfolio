import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import type { CatalogProduct } from "@/lib/queries";

export function FeaturedProducts({ products }: { products: CatalogProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame-700">Featured</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Fan favorites</h2>
        </div>
        <Link href="/products" className="hidden text-sm font-bold uppercase tracking-wide text-ink underline decoration-flame-500 decoration-2 underline-offset-4 sm:inline">
          View all →
        </Link>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.07}>
            <ProductCard {...product} image={product.images[0] ?? "/favicon.ico"} />
          </Reveal>
        ))}
      </div>
      <Link href="/products" className="mt-8 inline-flex text-sm font-bold uppercase tracking-wide text-ink underline decoration-flame-500 decoration-2 underline-offset-4 sm:hidden">
        View all →
      </Link>
    </section>
  );
}
