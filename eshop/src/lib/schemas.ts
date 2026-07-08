import { z } from "zod";

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
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  items: z.array(
    z.object({
      slug: z.string().min(3),
      quantity: z.number().min(1),
      size: z.string().optional(),
    }),
  ),
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
