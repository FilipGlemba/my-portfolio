import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <AuthForm mode="register" />
    </section>
  );
}
