"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
        <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Loading your account details…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-950">{error}</p>
          <Link href="/login" className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Account</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Your profile</h1>
          </div>
          <form onSubmit={handleSave} className="space-y-6 rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900">Name</label>
              <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900">Email</label>
              <input value={profile?.email ?? ""} readOnly className="mt-2 w-full cursor-not-allowed rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600" />
            </div>
            {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Save profile
            </button>
          </form>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-950">Security</h2>
            <p className="mt-2 text-sm text-slate-600">Change your password or review your session settings.</p>
            <Link href="/login" className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Manage login
            </Link>
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-950">Order history</h2>
            <p className="mt-2 text-sm text-slate-600">Review your recent checkout history and order status.</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            {orders.length ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="rounded-3xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Order #{order._id}</p>
                        <p className="text-sm text-slate-600">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">{order.status}</span>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-slate-950">€{order.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No orders found yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
