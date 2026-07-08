"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/toast-provider";
import { formatPrice } from "@/lib/format";

type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  badge: string;
  stock: number;
};

export function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const cart = useCartStore();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => setProduct(data.product))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">Loading product…</div>;
  }

  if (!product) {
    return <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">Product not found.</div>;
  }

  const handleAdd = () => {
    cart.addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0] ?? "/favicon.ico",
      size,
    });
    toast.notify("Added to cart", "success");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img src={product.images[0] ?? "/favicon.ico"} alt={product.name} className="h-[520px] w-full object-cover" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {product.images.slice(1, 4).map((image) => (
              <div key={image} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <img src={image} alt={product.name} className="h-40 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-panel">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                {product.badge}
              </span>
              <span className="text-2xl font-semibold text-slate-950">{formatPrice(product.price)}</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{product.category}</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950">{product.name}</h1>
            </div>
            <p className="text-slate-600">{product.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Size</span>
              <select value={size} onChange={(event) => setSize(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none">
                {['S', 'M', 'L', 'XL'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Quantity</span>
              <input type="number" min="1" max={product.stock} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none" />
            </label>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button onClick={handleAdd} className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Add to cart
            </button>
            <button onClick={() => router.push("/cart")} className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              View cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
