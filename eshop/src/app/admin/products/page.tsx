import Link from "next/link";

async function fetchProducts() {
  const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load products.");
  return response.json();
}

export default async function AdminProductsPage() {
  const data = await fetchProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Products</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">Manage inventory</h1>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
          Create product
        </Link>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.products.map((product: any) => (
              <tr key={product.slug}>
                <td className="px-6 py-4 text-slate-950">{product.name}</td>
                <td className="px-6 py-4 text-slate-600">{product.category}</td>
                <td className="px-6 py-4 text-slate-600">€{product.price.toFixed(0)}</td>
                <td className="px-6 py-4 text-slate-600">{product.stock}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/products/${product.slug}`} className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
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
