"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/toast-provider";
import { TiltCard } from "@/components/tilt-card";
import { StarRating } from "@/components/star-rating";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { formatDate, formatPrice } from "@/lib/format";
import { MAX_LINE_QUANTITY } from "@/lib/limits";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/shipping";
import type { CatalogProduct, CatalogReview } from "@/lib/queries";

type Props = {
  product: CatalogProduct;
  reviews: CatalogReview[];
  recommendations: CatalogProduct[];
};

const badgeStyle: Record<string, string> = {
  NEW: "bg-volt text-ink",
  BESTSELLER: "bg-flame-600 text-white",
  LIMITED: "bg-ink text-white",
};

function ProductImage({ src, alt, priority = false, sizes }: { src: string; alt: string; priority?: boolean; sizes: string }) {
  return src.startsWith("data:") ? (
    // eslint-disable-next-line @next/next/no-img-element -- generated SVG placeholder; next/image can't optimize data: URIs
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  ) : (
    <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="gear-photo object-cover" />
  );
}

export function ProductDetail({ product, reviews, recommendations }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toast = useToast();

  const inStock = product.stock > 0;
  const maxQuantity = Math.max(1, Math.min(product.stock, MAX_LINE_QUANTITY));
  const images = product.images.length ? product.images : ["/favicon.ico"];

  const handleAdd = () => {
    if (!inStock) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: Math.min(maxQuantity, Math.max(1, quantity)),
      image: images[0],
      size,
    });
    toast.notify(`Added ${product.name}${size ? ` (${size})` : ""} to your cart`, "success");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const addLabel = !inStock ? "Out of stock" : added ? "Added ✓" : "Add to cart";

  return (
    <section className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6 lg:pb-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-black/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/products" className="hover:text-ink">Shop</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">{product.category}</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="font-medium text-ink">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="space-y-3">
          <TiltCard maxTilt={6}>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#ECEBE6]">
              <ProductImage src={images[activeImage] ?? images[0]} alt={product.name} priority sizes="(min-width: 1024px) 560px, 100vw" />
              {product.badge && product.badge !== "NONE" ? (
                <span className={`absolute left-0 top-5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${badgeStyle[product.badge] ?? "bg-white text-ink"}`}>
                  {product.badge}
                </span>
              ) : null}
            </div>
          </TiltCard>
          {images.length > 1 ? (
            <div className="flex gap-3">
              {images.map((image, i) => (
                <button
                  key={image + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1} of ${images.length}`}
                  aria-current={i === activeImage}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg ring-2 transition ${
                    i === activeImage ? "ring-flame-500" : "ring-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <ProductImage src={image} alt="" sizes="80px" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="lg:pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame-600">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-2xl font-bold tabular-nums text-ink">{formatPrice(product.price)}</span>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>
          <p className="mt-5 max-w-prose leading-relaxed text-black/70">{product.description}</p>

          <p className={`mt-5 flex items-center gap-2 text-sm font-medium ${inStock ? "text-emerald-700" : "text-flame-700"}`}>
            <span className={`h-2 w-2 rounded-full ${inStock ? "bg-emerald-600" : "bg-flame-600"}`} />
            {!inStock ? "Out of stock" : product.stock <= 10 ? `Only ${product.stock} left` : "In stock — ships in 1–2 days"}
          </p>

          {product.sizes.length ? (
            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-semibold text-ink">Size</legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={size === option}
                    className={`min-w-[3.25rem] rounded-lg px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-500 ${
                      size === option ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-black/15 hover:ring-black/40"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center rounded-full bg-white ring-1 ring-black/15" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="h-12 w-11 rounded-l-full text-lg text-black/70 transition hover:text-ink disabled:opacity-30" disabled={quantity <= 1}>−</button>
              <span aria-live="polite" className="w-8 text-center font-semibold tabular-nums text-ink">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))} aria-label="Increase quantity" className="h-12 w-11 rounded-r-full text-lg text-black/70 transition hover:text-ink disabled:opacity-30" disabled={quantity >= maxQuantity}>+</button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!inStock}
              className="flex-1 rounded-full bg-flame-600 px-6 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-black/20 disabled:shadow-none"
            >
              {addLabel}
            </button>
          </div>
          {added ? (
            <Link href="/cart" className="mt-3 inline-block text-sm font-semibold text-ink underline decoration-flame-500 decoration-2 underline-offset-4">
              View cart →
            </Link>
          ) : null}

          <ul className="mt-10 divide-y divide-black/10 border-y border-black/10 text-sm text-black/70">
            <li className="flex justify-between gap-4 py-3.5">
              <span className="font-semibold text-ink">Shipping</span>
              <span>Free over {formatPrice(FREE_SHIPPING_THRESHOLD)}, otherwise {formatPrice(SHIPPING_FEE)}</span>
            </li>
            <li className="flex justify-between gap-4 py-3.5">
              <span className="font-semibold text-ink">Returns</span>
              <span>30 days, unworn and with tags</span>
            </li>
            <li className="flex justify-between gap-4 py-3.5">
              <span className="font-semibold text-ink">Payment</span>
              <span>Demo store — nothing is charged</span>
            </li>
          </ul>
        </div>
      </div>

      <Reveal className="mt-20">
        <h2 className="font-display text-3xl text-ink">
          Reviews {product.reviewCount ? <span className="text-black/60">({product.reviewCount})</span> : null}
        </h2>
        {reviews.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <figure key={review.id} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
                <StarRating rating={review.rating} reviewCount={1} showCount={false} />
                <blockquote className="mt-3 leading-relaxed text-ink">“{review.comment}”</blockquote>
                <figcaption className="mt-4 text-sm text-black/60">
                  <span className="font-semibold text-ink">{review.name}</span> · {formatDate(review.createdAt)}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-black/60">No reviews yet.</p>
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

      {/* Mobile: keep price + add-to-cart reachable while reading reviews. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{product.name}{size ? ` · ${size}` : ""}</p>
            <p className="text-sm tabular-nums text-black/70">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!inStock}
            className="rounded-full bg-flame-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-flame-700 active:scale-[0.98] disabled:bg-black/20"
          >
            {addLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
