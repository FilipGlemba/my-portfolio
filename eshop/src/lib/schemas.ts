import { z } from "zod";
import { MAX_CART_LINES, MAX_LINE_QUANTITY } from "@/lib/limits";

export const productCreateSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  category: z.string().min(3),
  stock: z.number().min(0),
  images: z.array(z.string().url()).min(1),
  badge: z.enum(["NEW", "BESTSELLER", "LIMITED", "NONE"]),
  featured: z.boolean().default(false),
});

export const productUpdateSchema = productCreateSchema.partial().extend({ slug: z.string().min(3) });

export const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  // Caps keep the public demo's order stats sane (no "1 000 000 × gloves").
  items: z
    .array(
      z.object({
        slug: z.string().min(3),
        quantity: z.number().int().min(1).max(MAX_LINE_QUANTITY),
        size: z.string().optional(),
      }),
    )
    .min(1)
    .max(MAX_CART_LINES),
});

export const orderStatusSchema = z.object({ status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]) });

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2),
});
