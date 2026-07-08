"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
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
    alert("Unable to create product.");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-panel">
        <h1 className="text-3xl font-semibold text-slate-950">New product</h1>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Name</span>
              <input value={formState.name} onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))} required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Slug</span>
              <input value={formState.slug} onChange={(event) => setFormState((prev) => ({ ...prev, slug: event.target.value }))} required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
          </div>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-semibold">Description</span>
            <textarea value={formState.description} onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))} required rows={4} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
          </label>
          <div className="grid gap-6 sm:grid-cols-3">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Price</span>
              <input type="number" min="0" step="0.01" value={formState.price} onChange={(event) => setFormState((prev) => ({ ...prev, price: event.target.value }))} required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Stock</span>
              <input type="number" min="0" value={formState.stock} onChange={(event) => setFormState((prev) => ({ ...prev, stock: event.target.value }))} required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Category</span>
              <input value={formState.category} onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))} required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Badge</span>
              <select value={formState.badge} onChange={(event) => setFormState((prev) => ({ ...prev, badge: event.target.value }))} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                <option value="NONE">NONE</option>
                <option value="NEW">NEW</option>
                <option value="BESTSELLER">BESTSELLER</option>
                <option value="LIMITED">LIMITED</option>
              </select>
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input type="checkbox" checked={formState.featured} onChange={(event) => setFormState((prev) => ({ ...prev, featured: event.target.checked }))} className="h-5 w-5 rounded border-slate-300 text-emerald-600" />
              <span>Featured product</span>
            </label>
          </div>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-semibold">Images</span>
            <input type="text" value={formState.images} onChange={(event) => setFormState((prev) => ({ ...prev, images: event.target.value }))} placeholder="Comma-separated image URLs" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
          </label>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60">
            {isSubmitting ? "Creating…" : "Create product"}
          </button>
        </form>
      </div>
    </section>
  );
}
