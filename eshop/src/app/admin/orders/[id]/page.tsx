"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderStatusSelect } from "@/components/order-status-select";
import { formatPrice } from "@/lib/format";

type OrderDetail = {
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

type Props = {
  params: { id: string };
};

export default function OrderDetailPage({ params }: Props) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
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
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="rounded-2xl border border-black/5 bg-white p-8 text-center text-black/60">Loading order details…</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="rounded-2xl border border-black/5 bg-white p-8 text-center text-black/60">{error ?? "Order not found."}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Link href="/admin/orders" className="text-sm font-semibold text-black/50 transition hover:text-ink">← Back to orders</Link>
      <div className="mt-6 space-y-8 rounded-2xl border border-black/5 bg-white p-8 shadow-panel sm:p-10">
        <div>
          <p className="text-sm text-black/50">Order detail</p>
          <h1 className="mt-1 font-display text-4xl text-ink">#{order._id.slice(-6)}</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-xl border border-black/5 bg-black/[0.015] p-6">
              <p className="text-sm text-black/50">Customer</p>
              <p className="mt-2 font-semibold text-ink">{order.shippingAddress.name}</p>
              <p className="text-sm text-black/60">{order.shippingAddress.email}</p>
              <p className="text-sm text-black/60">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-black/[0.015] p-6">
              <p className="text-sm text-black/50">Items</p>
              <ul className="mt-4 space-y-3">
                {order.items.map((item, index) => {
                  const productName = typeof item.product === "object"
                    ? item.product?.name ?? item.name
                    : typeof item.product === "string"
                    ? item.product
                    : item.name;

                  return (
                    <li key={`${item.slug ?? index}-${item.qty}`} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                      <p className="font-semibold text-ink">{productName}</p>
                      <p className="text-sm text-black/60">Qty {item.qty} · {formatPrice(item.price)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-black/5 bg-black/[0.015] p-6">
              <p className="text-sm text-black/50">Total</p>
              <p className="mt-2 font-display text-3xl text-ink">{formatPrice(order.total)}</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-black/[0.015] p-6">
              <OrderStatusSelect status={status} onChange={handleStatusChange} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
