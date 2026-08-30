"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/format";

type Profile = {
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type OrderSummary = {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
};

const statusStyle: Record<string, string> = {
  pending: "bg-black/5 text-black/60",
  paid: "bg-volt/20 text-ink",
  shipped: "bg-flame-100 text-flame-600",
  delivered: "bg-volt text-ink",
  cancelled: "bg-black/5 text-black/40 line-through",
};

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [profileRes, ordersRes] = await Promise.all([
        fetch("/api/auth/profile"),
        fetch("/api/orders"),
      ]);

      if (profileRes.status === 401) {
        setError("Please sign in to view your account.");
        setLoading(false);
        return;
      }

      if (!profileRes.ok || !ordersRes.ok) {
        setError("Unable to load account details.");
        setLoading(false);
        return;
      }

      const profileData = await profileRes.json();
      const ordersData = await ordersRes.json();
      setProfile(profileData.user);
      setOrders(ordersData.orders || []);
      setName(profileData.user.name);
      setLoading(false);
    }

    load();
  }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const response = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Unable to save profile.");
      return;
    }

    const data = await response.json();
    setProfile(data.user);
    setMessage("Profile updated successfully.");
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="rounded-2xl border border-black/5 bg-white p-8 text-center text-black/60">Loading your account details…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-10 text-center">
          <p className="text-ink">{error}</p>
          <Link href="/login" className="mt-6 inline-flex rounded-full bg-flame-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Your account</h1>
        <p className="mt-2 text-black/50">Profile, security, and order history.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-5 rounded-xl border border-black/5 bg-black/[0.015] p-6">
            <div>
              <label className="block text-sm font-semibold text-ink">Name</label>
              <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink">Email</label>
              <input value={profile?.email ?? ""} readOnly className="mt-2 w-full cursor-not-allowed rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-black/60" />
            </div>
            {message ? <p className="text-sm font-medium text-ink">✓ {message}</p> : null}
            {error ? <p className="text-sm text-flame-600">{error}</p> : null}
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-flame-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600">
              Save profile
            </button>
          </form>
          {profile?.role === "admin" ? (
            <div className="rounded-xl border border-volt/40 bg-volt/10 p-5">
              <p className="text-sm font-semibold text-ink">You&apos;re an admin</p>
              <p className="mt-1 text-sm text-black/60">Manage the store from the admin dashboard.</p>
              <Link href="/admin" className="mt-3 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black">
                Open dashboard
              </Link>
            </div>
          ) : null}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-6 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
          <div>
            <h2 className="font-display text-2xl text-ink">Order history</h2>
            <p className="mt-1 text-sm text-black/50">Review your recent checkout history and order status.</p>
          </div>
          {orders.length ? (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order._id} className="rounded-xl border border-black/5 bg-black/[0.015] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-black/50">Order #{order._id.slice(-6)}</p>
                      <p className="text-xs text-black/40">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusStyle[order.status] ?? "bg-black/5 text-black/60"}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-xl text-ink">{formatPrice(order.total)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-black/50">No orders found yet.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
