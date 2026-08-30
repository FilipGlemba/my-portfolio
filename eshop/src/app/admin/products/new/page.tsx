"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast-provider";

const fieldClass = "w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none";

export default function NewProductPage() {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    stock: "0",
    badge: "NONE",
    featured: false,
    images: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formState,
      price: Number(formState.price),
      stock: Number(formState.stock),
      images: formState.images.split(",").map((image) => image.trim()).filter(Boolean),
      featured: formState.featured,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      router.push("/admin/products");
      return;
    }

    setIsSubmitting(false);
    toast.notify("Unable to create product.", "error");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link href="/admin/products" className="text-sm font-semibold text-black/50 transition hover:text-ink">← Back to products</Link>
      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-8 shadow-panel sm:p-10">
        <h1 className="font-display text-3xl text-ink">New product</h1>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Name</span>
              <input value={formState.name} onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))} required className={fieldClass} />
            </label>
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Slug</span>
              <input value={formState.slug} onChange={(event) => setFormState((prev) => ({ ...prev, slug: event.target.value }))} required className={fieldClass} />
            </label>
          </div>
          <label className="block text-sm text-black/70">
            <span className="mb-2 block font-semibold">Description</span>
            <textarea value={formState.description} onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))} required rows={4} className={fieldClass} />
          </label>
          <div className="grid gap-6 sm:grid-cols-3">
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Price</span>
              <input type="number" min="0" step="0.01" value={formState.price} onChange={(event) => setFormState((prev) => ({ ...prev, price: event.target.value }))} required className={fieldClass} />
            </label>
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Stock</span>
              <input type="number" min="0" value={formState.stock} onChange={(event) => setFormState((prev) => ({ ...prev, stock: event.target.value }))} required className={fieldClass} />
            </label>
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Category</span>
              <input value={formState.category} onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))} required className={fieldClass} />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Badge</span>
              <select value={formState.badge} onChange={(event) => setFormState((prev) => ({ ...prev, badge: event.target.value }))} className={fieldClass}>
                <option value="NONE">NONE</option>
                <option value="NEW">NEW</option>
                <option value="BESTSELLER">BESTSELLER</option>
                <option value="LIMITED">LIMITED</option>
              </select>
            </label>
            <label className="flex items-center gap-3 text-sm text-black/70">
              <input type="checkbox" checked={formState.featured} onChange={(event) => setFormState((prev) => ({ ...prev, featured: event.target.checked }))} className="h-5 w-5 rounded border-black/20 text-flame-500" />
              <span>Featured product</span>
            </label>
          </div>
          <label className="block text-sm text-black/70">
            <span className="mb-2 block font-semibold">Images</span>
            <input type="text" value={formState.images} onChange={(event) => setFormState((prev) => ({ ...prev, images: event.target.value }))} placeholder="Comma-separated image URLs, e.g. /images/products/my-shoe.jpg" className={fieldClass} />
          </label>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-full bg-flame-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600 disabled:opacity-60">
            {isSubmitting ? "Creating…" : "Create product"}
          </button>
        </form>
      </div>
    </section>
  );
}
