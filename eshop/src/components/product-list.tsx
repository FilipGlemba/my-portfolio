"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductFilter } from "@/components/product-filter";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { useToast } from "@/components/toast-provider";

type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  badge: string;
  images: string[];
};

export function ProductList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    return params.toString();
  }, [search, category, sort]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      router.replace(`/products?${queryString}`, { scroll: false });
      setLoading(true);
      fetch(`/api/products?${queryString}`)
        .then(async (response) => {
          if (!response.ok) throw new Error("Unable to load products.");
          return response.json();
        })
        .then((data) => setProducts(data.products))
        .catch(() => toast.notify("Failed to load products", "error"))
        .finally(() => setLoading(false));
    }, 300);

    return () => window.clearTimeout(handle);
  }, [queryString, router, toast]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Products</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Shop the FitGear collection</h1>
      </div>
      <div className="space-y-6">
        <ProductFilter
          value={search}
          category={category}
          sort={sort}
          onFilterChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.length ? (
              products.map((product) => (
                <ProductCard key={product.slug} {...product} image={product.images[0] ?? "/favicon.ico"} />
              ))
            ) : (
              <p className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">No products matched your search.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
