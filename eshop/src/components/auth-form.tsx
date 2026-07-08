"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (mode === "register") {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Registration failed.");
        return;
      }
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push("/");
  };

  const handleGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-panel">
      <h1 className="text-3xl font-semibold text-slate-950">{mode === "login" ? "Sign in" : "Create account"}</h1>
      <p className="mt-3 text-sm text-slate-600">
        {mode === "login"
          ? "Use your email or Google account to continue."
          : "Create your FitGear user account in seconds."}
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {mode === "register" ? (
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              required
            />
          </label>
        ) : null}
        <label className="block space-y-2 text-sm text-slate-700">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            required
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
            required
          />
        </label>
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <button type="submit" className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
          {mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>
      <div className="mt-6 flex flex-col gap-3">
        <button type="button" onClick={handleGoogle} className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
          Continue with Google
        </button>
        <p className="text-center text-sm text-slate-600">
          {mode === "login" ? (
            <>New to FitGear? <Link href="/register" className="font-semibold text-slate-950">Create account</Link></>
          ) : (
            <>Already have an account? <Link href="/login" className="font-semibold text-slate-950">Sign in</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
