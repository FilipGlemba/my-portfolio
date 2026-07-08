export function Roadmap() {
  const items = [
    { title: "Storefront", description: "Clean product listings, filters, and checkout flow." },
    { title: "Orders", description: "Stripe-backed orders and confirmation emails." },
    { title: "Admin", description: "Protected dashboard for products and order status." },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Roadmap</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">Built for full commerce in one release</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-4 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
