import { describe, expect, it } from "vitest";
import { checkoutSchema, registerSchema, orderStatusSchema } from "@/lib/schemas";

describe("checkoutSchema", () => {
  const validPayload = {
    email: "buyer@example.com",
    address: "Main street 1",
    city: "Bratislava",
    postalCode: "81101",
    country: "Slovakia",
    items: [{ slug: "velocity-pro-trainer", quantity: 2 }],
  };

  it("accepts a valid checkout payload", () => {
    expect(checkoutSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = checkoutSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a line item with zero quantity", () => {
    const result = checkoutSchema.safeParse({
      ...validPayload,
      items: [{ slug: "velocity-pro-trainer", quantity: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a checkout with no shipping address", () => {
    const { address, ...withoutAddress } = validPayload;
    const result = checkoutSchema.safeParse(withoutAddress);
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("accepts a valid registration", () => {
    const result = registerSchema.safeParse({
      name: "Filip",
      email: "filip@example.com",
      password: "supersecret",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = registerSchema.safeParse({
      name: "Filip",
      email: "filip@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("orderStatusSchema", () => {
  it("accepts every known order status", () => {
    for (const status of ["pending", "paid", "shipped", "delivered", "cancelled"]) {
      expect(orderStatusSchema.safeParse({ status }).success).toBe(true);
    }
  });

  it("rejects an unknown status", () => {
    expect(orderStatusSchema.safeParse({ status: "refunded" }).success).toBe(false);
  });
});
