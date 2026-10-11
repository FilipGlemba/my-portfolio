import { describe, expect, it } from "vitest";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, orderTotal, remainingForFreeShipping, shippingFor } from "@/lib/shipping";

describe("shipping", () => {
  it("charges the flat fee below the free-shipping threshold", () => {
    expect(shippingFor(19.99)).toBe(SHIPPING_FEE);
  });

  it("is free at and above the threshold", () => {
    expect(shippingFor(FREE_SHIPPING_THRESHOLD)).toBe(0);
    expect(shippingFor(129.99)).toBe(0);
  });

  it("charges nothing for an empty cart", () => {
    expect(shippingFor(0)).toBe(0);
  });

  it("adds shipping into the order total without floating-point noise", () => {
    expect(orderTotal(19.99)).toBe(24.89);
    expect(orderTotal(129.99)).toBe(129.99);
  });

  it("reports how much is left until free shipping", () => {
    expect(remainingForFreeShipping(44.99)).toBe(5.01);
    expect(remainingForFreeShipping(80)).toBe(0);
  });
});
