import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { ToastProvider } from "@/components/toast-provider";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  // Pages set their own title ("Shop", a product name, …); the template adds the brand.
  title: { default: "FitGear — Gear up. Show up.", template: "%s — FitGear" },
  description: "FitGear is a modern e-commerce storefront built with Next.js, MongoDB, Stripe, and NextAuth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen bg-[#F5F4F0] font-sans text-ink antialiased">
        <ToastProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white">
            Skip to content
          </a>
          <div className="min-h-screen">
            <SiteNav />
            <main id="main">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
