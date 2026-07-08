"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatusSelect } from "@/components/order-status-select";

type OrderDetail = {
  order: {
    _id: string;
    total: number;
    status: string;
    shippingAddress: {
      name: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    items: Array<{
      product: { _id?: string; name?: string } | string | null;
      slug?: string;
      name?: string;
      qty: number;
      price: number;
    }>;
  };
};

type Props = {
  params: { id: string };
};

export default function OrderDetailPage({ params }: Props) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail["order"] | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      const response = await fetch(`/api/orders/${params.id}`);
      if (!response.ok) {
        setError("Unable to load order.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setOrder(data.order);
      setStatus(data.order.status);
      setLoading(false);
    }

    loadOrder();
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    const response = await fetch(`/api/orders/${params.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      setError("Unable to update order status.");
      return;
    }

    const data = await response.json();
    setOrder(data.order);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Loading order details…</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">{error ?? "Order not found."}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-panel">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Order detail</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">#{order._id}</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm text-slate-600">Customer</p>
              <p className="mt-2 font-semibold text-slate-950">{order.shippingAddress.name}</p>
              <p className="text-sm text-slate-600">{order.shippingAddress.email}</p>
              <p className="text-sm text-slate-600">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm text-slate-600">Items</p>
              <ul className="mt-4 space-y-4">
                {order.items.map((item, index) => {
                  const productName = typeof item.product === "object"
                    ? item.product?.name ?? item.name
                    : typeof item.product === "string"
                    ? item.product
                    : item.name;

                  return (
                    <li key={`${item.slug ?? index}-${item.qty}`} className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="font-semibold text-slate-950">{productName}</p>
                      <p className="text-sm text-slate-600">Qty {item.qty} · €{item.price.toFixed(2)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-sm text-slate-600">Total</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">€{order.total.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <OrderStatusSelect status={status} onChange={handleStatusChange} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
