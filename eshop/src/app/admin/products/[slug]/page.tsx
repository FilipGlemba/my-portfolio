"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  badge: string;
  featured: boolean;
  images: string[];
};

type Props = {
  params: { slug: string };
};

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "0",
    badge: "NONE",
    featured: false,
    images: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch(`/api/products/${params.slug}`);
      if (!response.ok) {
        setError("Unable to load product.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setProduct(data.product);
      setFormState({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price.toString(),
        category: data.product.category,
        stock: data.product.stock.toString(),
        badge: data.product.badge,
        featured: data.product.featured,
        images: (data.product.images || []).join(", "),
      });
      setLoading(false);
    }

    loadProduct();
  }, [params.slug]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: formState.name,
      description: formState.description,
      price: Number(formState.price),
      category: formState.category,
      stock: Number(formState.stock),
      badge: formState.badge,
      featured: formState.featured,
      images: formState.images.split(",").map((image) => image.trim()).filter(Boolean),
    };

    const response = await fetch(`/api/products/${params.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError("Unable to update product.");
      setSaving(false);
      return;
    }

    router.push("/admin/products");
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    const response = await fetch(`/api/products/${params.slug}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setError("Unable to delete product.");
      return;
    }
    router.push("/admin/products");
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Loading product details…</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Product not found.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-panel">
        <h1 className="text-3xl font-semibold text-slate-950">Edit product</h1>
        <p className="mt-3 text-sm text-slate-600">Update product information and sync inventory.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Name</span>
              <input value={formState.name} onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))} required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Category</span>
              <input value={formState.category} onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))} required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
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
              <span className="mb-2 block font-semibold">Badge</span>
              <select value={formState.badge} onChange={(event) => setFormState((prev) => ({ ...prev, badge: event.target.value }))} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                <option value="NONE">NONE</option>
                <option value="NEW">NEW</option>
                <option value="BESTSELLER">BESTSELLER</option>
                <option value="LIMITED">LIMITED</option>
              </select>
            </label>
          </div>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-semibold">Images</span>
            <input type="text" value={formState.images} onChange={(event) => setFormState((prev) => ({ ...prev, images: event.target.value }))} placeholder="Comma-separated image URLs" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3" />
          </label>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" disabled={saving} className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60">
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button type="button" onClick={handleDelete} className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Delete product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
