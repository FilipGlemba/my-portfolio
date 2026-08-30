"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/toast-provider";
import { TiltCard } from "@/components/tilt-card";
import { StarRating } from "@/components/star-rating";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { formatPrice } from "@/lib/format";

type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  badge: string;
  stock: number;
  rating: number | null;
  reviewCount: number;
};

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type Recommendation = {
  slug: string;
  name: string;
  price: number;
  category: string;
  badge: string;
  images: string[];
  rating: number | null;
  reviewCount: number;
};

const badgeStyle: Record<string, string> = {
  NEW: "bg-volt text-ink",
  BESTSELLER: "bg-flame-500 text-white",
  LIMITED: "bg-ink text-white",
};

export function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const cart = useCartStore();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setActiveImage(0);
    fetch(`/api/products/${slug}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => {
        setProduct(data.product);
        setReviews(data.reviews ?? []);
        setRecommendations(data.recommendations ?? []);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="aspect-square animate-pulse rounded-2xl bg-black/[0.06]" />
          <div className="space-y-4">
            <div className="h-4 w-1/3 animate-pulse rounded bg-black/[0.06]" />
            <div className="h-10 w-2/3 animate-pulse rounded bg-black/[0.06]" />
            <div className="h-24 animate-pulse rounded bg-black/[0.06]" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-3xl text-ink">Product not found.</p>
        <button onClick={() => router.push("/products")} className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
          Back to shop
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    cart.addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0] ?? "/favicon.ico",
      size,
    });
    toast.notify("Added to cart", "success");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-3">
          <TiltCard maxTilt={9}>
            <div className="relative overflow-hidden rounded-2xl bg-black/[0.04]" style={{ transformStyle: "preserve-3d" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- image can be a real /images/... file or a generated SVG data: URI */}
              <img src={product.images[activeImage] ?? product.images[0] ?? "/favicon.ico"} alt={product.name} className="gear-photo aspect-square w-full object-cover" />
              {product.badge && product.badge !== "NONE" ? (
                <span
                  style={{ transform: "translateZ(28px)" }}
                  className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${badgeStyle[product.badge] ?? "bg-white text-ink"}`}
                >
                  {product.badge}
                </span>
              ) : null}
            </div>
          </TiltCard>
          {product.images.length > 1 ? (
            <div className="flex gap-3">
              {product.images.map((image, i) => (
                <button
                  key={image + i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${
                    i === activeImage ? "border-flame-500" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail of the same mixed real/data-uri image set */}
                  <img src={image} alt="" className="gear-photo h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="space-y-8 rounded-2xl border border-black/5 bg-white p-8 shadow-panel sm:p-10"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame-500">{product.category}</p>
              <span className="font-display text-2xl text-ink">{formatPrice(product.price)}</span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-ink">{product.name}</h1>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <p className="text-black/60">{product.description}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold text-ink">Size</span>
              <select value={size} onChange={(event) => setSize(event.target.value)} className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none">
                {["S", "M", "L", "XL"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold text-ink">Quantity</span>
              <input type="number" min="1" max={product.stock} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none" />
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.96 }}
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-flame-500 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600"
            >
              {added ? "Added ✓" : "Add to cart"}
            </motion.button>
            <button onClick={() => router.push("/cart")} className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black/[0.03]">
              View cart
            </button>
          </div>
        </motion.div>
      </div>

      <Reveal className="mt-20">
        <h2 className="font-display text-3xl text-ink">
          Reviews {product.reviewCount ? <span className="text-black/40">({product.reviewCount})</span> : null}
        </h2>
        {reviews.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <div key={review._id} className="rounded-2xl border border-black/5 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-ink">{review.name}</p>
                  <StarRating rating={review.rating} reviewCount={1} showCount={false} />
                </div>
                <p className="mt-2 text-sm text-black/60">{review.comment}</p>
                <p className="mt-3 text-xs text-black/35">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-black/50">No reviews yet.</p>
        )}
      </Reveal>

      {recommendations.length ? (
        <Reveal className="mt-20" delay={0.05}>
          <h2 className="font-display text-3xl text-ink">You might also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((item) => (
              <ProductCard key={item.slug} {...item} image={item.images[0] ?? "/favicon.ico"} />
            ))}
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}
