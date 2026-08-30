import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getProducts } from "@/lib/queries";
import { CATEGORY_IMAGES } from "@/lib/seed-data";

export default async function CollectionsPage({ params }: { params: { category: string } }) {
  const products = await getProducts({ category: params.category });
  const image = CATEGORY_IMAGES[params.category];

  return (
    <section>
      <div className="relative isolate overflow-hidden bg-ink py-24 text-white">
        {image ? (
          <div className="absolute inset-0">
            <Image src={image} alt="" fill priority sizes="100vw" className="gear-photo object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          </div>
        ) : null}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-volt">Collection</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">{params.category}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.length ? (
            products.map((product, i) => (
              <Reveal key={product.slug} delay={Math.min(i, 6) * 0.06}>
                <ProductCard {...product} image={product.images[0] ?? "/favicon.ico"} />
              </Reveal>
            ))
          ) : (
            <p className="col-span-full rounded-2xl border border-black/10 bg-white p-10 text-center text-black/60">No products found in this collection yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
