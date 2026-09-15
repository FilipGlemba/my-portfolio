"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";

type AuthFormProps = {
  mode: "login" | "register";
};

const googleLoginEnabled = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED === "true";
const fieldClass = "w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none";

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    if (mode === "register") {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Registration failed.");
        setSubmitting(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-black/5 bg-white p-8 shadow-panel sm:p-10"
    >
      <h1 className="font-display text-3xl text-ink">{mode === "login" ? "Sign in" : "Create account"}</h1>
      <p className="mt-3 text-sm text-black/60">
        {mode === "login" ? "Use your email or Google account to continue." : "Create your FitGear user account in seconds."}
      </p>

      {mode === "login" ? (
        <div className="mt-5 rounded-xl border border-volt/40 bg-volt/10 p-3 text-xs text-ink/70">
          Demo accounts: <code className="font-semibold">admin@fitgear.local / admin123</code> or{" "}
          <code className="font-semibold">user@fitgear.local / user123</code>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {mode === "register" ? (
          <label className="block space-y-2 text-sm text-black/70">
            <span className="font-semibold text-ink">Name</span>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} required />
          </label>
        ) : null}
        <label className="block space-y-2 text-sm text-black/70">
          <span className="font-semibold text-ink">Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} required />
        </label>
        <label className="block space-y-2 text-sm text-black/70">
          <span className="font-semibold text-ink">Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={fieldClass} required />
        </label>
        {error ? <p className="text-sm font-medium text-flame-600">{error}</p> : null}
        {mode === "register" ? (
          <p className="text-xs text-black/50">
            By creating an account you agree to our{" "}
            <Link href="/privacy" className="underline decoration-flame-500 decoration-2 underline-offset-2">Privacy Policy</Link>.
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-flame-500 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600 disabled:opacity-60"
        >
          {submitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>
      <div className="mt-6 flex flex-col gap-3">
        {googleLoginEnabled ? (
          <button type="button" onClick={handleGoogle} className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-black/[0.03]">
            Continue with Google
          </button>
        ) : null}
        <p className="text-center text-sm text-black/60">
          {mode === "login" ? (
            <>New to FitGear? <Link href="/register" className="font-semibold text-ink underline decoration-flame-500 decoration-2 underline-offset-2">Create account</Link></>
          ) : (
            <>Already have an account? <Link href="/login" className="font-semibold text-ink underline decoration-flame-500 decoration-2 underline-offset-2">Sign in</Link></>
          )}
        </p>
      </div>
    </motion.div>
  );
}
