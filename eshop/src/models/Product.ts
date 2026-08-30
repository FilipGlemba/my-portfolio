import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  badge: "NEW" | "BESTSELLER" | "LIMITED" | "NONE";
  featured: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0 },
    images: { type: [String], required: true, default: [] },
    badge: { type: String, enum: ["NEW", "BESTSELLER", "LIMITED", "NONE"], default: "NONE" },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

const Product = (models.Product as mongoose.Model<IProduct>) || model<IProduct>("Product", ProductSchema);
export default Product;
