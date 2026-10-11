// One source of truth for shipping, used by the product page, cart, checkout
// summary AND the server when it records the order total — so the number the
// shopper sees is always the number that gets saved.
export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_FEE = 4.9;

const round2 = (value: number) => Math.round(value * 100) / 100;

export function shippingFor(subtotal: number): number {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
}

export function orderTotal(subtotal: number): number {
  return round2(subtotal + shippingFor(subtotal));
}

/** How much more the cart needs for free shipping (0 once it qualifies). */
export function remainingForFreeShipping(subtotal: number): number {
  return round2(Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal));
}
