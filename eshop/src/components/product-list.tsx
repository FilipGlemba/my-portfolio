"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  rating: number | null;
  reviewCount: number;
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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame-500">Shop</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">The full collection</h1>
      </div>
      <div className="space-y-8">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={queryString}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {products.length ? (
                products.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
                  >
                    <ProductCard {...product} image={product.images[0] ?? "/favicon.ico"} />
                  </motion.div>
                ))
              ) : (
                <p className="col-span-full rounded-2xl border border-black/10 bg-white p-10 text-center text-black/60">
                  No products matched your search.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
