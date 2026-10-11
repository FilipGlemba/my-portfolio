"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductFilter } from "@/components/product-filter";
import type { CatalogProduct } from "@/lib/queries";

type Props = {
  products: CatalogProduct[];
  search: string;
  category: string;
  sort: string;
  failed: boolean;
};

function buildHref(search: string, category: string, sort: string) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (category) params.set("category", category);
  if (sort && sort !== "newest") params.set("sort", sort);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

// Products arrive server-rendered for the current URL. Changing a filter just
// updates the URL; the server re-renders with the new results.
export function ProductList({ products, search, category, sort, failed }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(search);

  const searchTimer = useRef<number>();

  const navigate = (href: string) => {
    window.clearTimeout(searchTimer.current); // a pending search must not undo this
    startTransition(() => router.replace(href, { scroll: false }));
  };

  // Typing is debounced so every keystroke doesn't hit the server.
  const onQueryChange = (value: string) => {
    setQuery(value);
    window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      startTransition(() => router.replace(buildHref(value, category, sort), { scroll: false }));
    }, 300);
  };

  useEffect(() => () => window.clearTimeout(searchTimer.current), []);

  const hasFilters = Boolean(search || category);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame-600">Shop</p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">{category ? category : "The full collection"}</h1>
        </div>
        <p aria-live="polite" className="text-sm tabular-nums text-black/60">
          {failed ? "" : `${products.length} ${products.length === 1 ? "product" : "products"}`}
        </p>
      </div>

      <ProductFilter
        query={query}
        category={category}
        sort={sort}
        onQueryChange={onQueryChange}
        onCategoryChange={(value) => navigate(buildHref(query, value, sort))}
        onSortChange={(value) => navigate(buildHref(query, category, value))}
      />

      <h2 className="sr-only">Results</h2>
      {failed ? (
        <p className="mt-8 rounded-2xl bg-white p-10 text-center text-black/60 ring-1 ring-black/5">
          We couldn&apos;t load the catalog right now. Please refresh the page in a moment.
        </p>
      ) : products.length ? (
        <div className={`mt-8 grid gap-6 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${isPending ? "opacity-50" : ""}`}>
          {products.map((product, i) => (
            <ProductCard key={product.slug} {...product} image={product.images[0] ?? "/favicon.ico"} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-white p-10 text-center ring-1 ring-black/5">
          <p className="font-display text-2xl text-ink">Nothing matched.</p>
          <p className="mt-2 text-sm text-black/60">Try a different search or category.</p>
          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                navigate("/products");
              }}
              className="mt-5 text-sm font-bold uppercase tracking-wide text-ink underline decoration-flame-500 decoration-2 underline-offset-4"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
