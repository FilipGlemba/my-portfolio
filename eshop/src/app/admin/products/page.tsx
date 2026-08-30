import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin-nav";
import { getAdminSession } from "@/lib/require-admin";
import { getProducts } from "@/lib/queries";
import { formatPrice } from "@/lib/format";

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/login");

  const products = await getProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Inventory</h1>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center rounded-full bg-flame-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600">
          + Create product
        </Link>
      </div>
      <AdminNav />
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-black/5 text-left text-sm">
          <thead className="bg-black/[0.02] text-black/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {products.map((product) => (
              <tr key={product.slug} className="transition hover:bg-black/[0.015]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element -- small table thumbnail, can be a real file or a generated SVG data: URI */}
                    <img src={product.images?.[0] ?? "/favicon.ico"} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <span className="font-medium text-ink">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-black/60">{product.category}</td>
                <td className="px-6 py-4 text-black/60">{formatPrice(product.price)}</td>
                <td className="px-6 py-4 text-black/60">{product.stock}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/products/${product.slug}`} className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-black">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
