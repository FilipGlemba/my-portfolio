"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { formatPrice, type Product } from "@/lib/products";

type CartLine = {
  product: Product;
  quantity: number;
};

type CartPreviewProps = {
  products: Product[];
};

export function CartPreview({ products }: CartPreviewProps) {
  const [cart, setCart] = useState<Record<string, number>>({
    "velocity-tee": 1,
  });

  const lines = useMemo<CartLine[]>(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({
          product,
          quantity: cart[product.id],
        })),
    [cart, products],
  );

  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = lines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );

  function addToCart(productId: string) {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }

  function removeFromCart(productId: string) {
    setCart((current) => {
      const nextQuantity = (current[productId] ?? 0) - 1;
      if (nextQuantity <= 0) {
        const next = { ...current };
        delete next[productId];
        return next;
      }

      return {
        ...current,
        [productId]: nextQuantity,
      };
    });
  }

  return (
    <>
      <div className="cart-status" aria-label={`${itemCount} items in cart`}>
        <span>Cart</span>
        <strong>{itemCount}</strong>
      </div>

      <section className="cart-panel" aria-label="Shopping cart preview">
        <div className="panel-heading">
          <span>Live cart</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>

        <div className="cart-lines">
          {lines.length ? (
            lines.map((line) => (
              <article className="cart-line" key={line.product.id}>
                <div>
                  <strong>{line.product.name}</strong>
                  <span>
                    {line.quantity} x {formatPrice(line.product.price)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(line.product.id)}
                  aria-label={`Remove one ${line.product.name}`}
                >
                  -
                </button>
              </article>
            ))
          ) : (
            <p className="empty-cart">Your cart is ready for the first item.</p>
          )}
        </div>

        <div className="cart-actions">
          <button type="button">Checkout</button>
          <span>Stripe test flow later</span>
        </div>
      </section>

      <section className="product-grid" aria-label="Featured products">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div
              className="product-visual"
              style={
                {
                  "--product-color": product.color,
                  "--product-accent": product.accent,
                } as CSSProperties
              }
            >
              <span>{product.category}</span>
            </div>
            <div className="product-body">
              <div className="product-meta">
                <span>{product.badge}</span>
                <strong>{formatPrice(product.price)}</strong>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button type="button" onClick={() => addToCart(product.id)}>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
