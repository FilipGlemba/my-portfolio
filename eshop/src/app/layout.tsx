import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: "FitGear",
  description: "FitGear is a modern e-commerce storefront built with Next.js, MongoDB, Stripe, and NextAuth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <ToastProvider>
          <div className="min-h-screen">
            <SiteNav />
            <main>{children}</main>
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
