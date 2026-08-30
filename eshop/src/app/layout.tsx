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
  title: "FitGear — Gear up. Show up.",
  description: "FitGear is a modern e-commerce storefront built with Next.js, MongoDB, Stripe, and NextAuth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen bg-[#F5F4F0] font-sans text-ink antialiased">
        <ToastProvider>
          <div className="min-h-screen">
            <SiteNav />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
