"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast-provider";

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

const fieldClass = "w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none";

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const toast = useToast();
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

    toast.notify("Product updated.", "success");
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
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="rounded-2xl border border-black/5 bg-white p-8 text-center text-black/60">Loading product details…</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="rounded-2xl border border-black/5 bg-white p-8 text-center text-black/60">Product not found.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link href="/admin/products" className="text-sm font-semibold text-black/50 transition hover:text-ink">← Back to products</Link>
      <div className="mt-6 rounded-2xl border border-black/5 bg-white p-8 shadow-panel sm:p-10">
        <h1 className="font-display text-3xl text-ink">Edit product</h1>
        <p className="mt-2 text-sm text-black/60">Update product information and sync inventory.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Name</span>
              <input value={formState.name} onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))} required className={fieldClass} />
            </label>
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Category</span>
              <input value={formState.category} onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))} required className={fieldClass} />
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
              <span className="mb-2 block font-semibold">Badge</span>
              <select value={formState.badge} onChange={(event) => setFormState((prev) => ({ ...prev, badge: event.target.value }))} className={fieldClass}>
                <option value="NONE">NONE</option>
                <option value="NEW">NEW</option>
                <option value="BESTSELLER">BESTSELLER</option>
                <option value="LIMITED">LIMITED</option>
              </select>
            </label>
          </div>

          <label className="block text-sm text-black/70">
            <span className="mb-2 block font-semibold">Images</span>
            <input type="text" value={formState.images} onChange={(event) => setFormState((prev) => ({ ...prev, images: event.target.value }))} placeholder="Comma-separated image URLs" className={fieldClass} />
          </label>

          {error ? <p className="text-sm text-flame-600">{error}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" disabled={saving} className="inline-flex flex-1 items-center justify-center rounded-full bg-flame-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600 disabled:opacity-60">
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button type="button" onClick={handleDelete} className="inline-flex flex-1 items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black/[0.03]">
              Delete product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
