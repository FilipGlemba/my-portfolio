import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/store/cart";
import { MAX_LINE_QUANTITY } from "@/lib/limits";

const shoe = { slug: "velocity-pro-trainer", name: "Velocity Pro Trainer", price: 129.99, image: "/a.jpg" };

beforeEach(() => {
  useCartStore.getState().clear();
});

describe("cart store", () => {
  it("adds a new item", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "M" });
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("merges quantity when the same slug and size is added again", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "M" });
    useCartStore.getState().addItem({ ...shoe, quantity: 2, size: "M" });
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it("keeps separate line items for the same product in different sizes", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "M" });
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "L" });
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it("clamps updateQuantity to a minimum of 1", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "M" });
    useCartStore.getState().updateQuantity("velocity-pro-trainer", 0);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("removes an item by slug", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "M" });
    useCartStore.getState().removeItem("velocity-pro-trainer");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("computes the subtotal across multiple items", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 2, size: "M" });
    useCartStore.getState().addItem({
      slug: "restore-foam-roller",
      name: "Restore Foam Roller",
      price: 27.99,
      image: "/b.jpg",
      quantity: 1,
      size: "One Size",
    });
    expect(useCartStore.getState().subtotal()).toBeCloseTo(129.99 * 2 + 27.99, 2);
  });

  it("changes the quantity of only the matching size", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "42" });
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "44" });
    useCartStore.getState().updateQuantity("velocity-pro-trainer", 3, "44");
    const bySize = Object.fromEntries(useCartStore.getState().items.map((item) => [item.size, item.quantity]));
    expect(bySize).toEqual({ "42": 1, "44": 3 });
  });

  it("removes only the matching size", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "42" });
    useCartStore.getState().addItem({ ...shoe, quantity: 1, size: "44" });
    useCartStore.getState().removeItem("velocity-pro-trainer", "42");
    expect(useCartStore.getState().items.map((item) => item.size)).toEqual(["44"]);
  });

  it("caps a line at the checkout limit, so the cart can't build an order checkout rejects", () => {
    useCartStore.getState().addItem({ ...shoe, quantity: 8, size: "42" });
    useCartStore.getState().addItem({ ...shoe, quantity: 8, size: "42" });
    expect(useCartStore.getState().items[0].quantity).toBe(MAX_LINE_QUANTITY);
    useCartStore.getState().updateQuantity("velocity-pro-trainer", 999, "42");
    expect(useCartStore.getState().items[0].quantity).toBe(MAX_LINE_QUANTITY);
  });
});
