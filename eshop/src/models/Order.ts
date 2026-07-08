import mongoose, { Schema, model, models } from "mongoose";

export interface IOrderItem {
  product?: mongoose.Types.ObjectId | null;
  slug: string;
  name: string;
  image?: string;
  qty: number;
  price: number;
}

export interface IOrder extends mongoose.Document {
  user?: mongoose.Types.ObjectId | null;
  items: IOrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  stripeSessionId: string;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: false },
  slug: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  image: { type: String },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    stripeSessionId: { type: String, required: true, unique: true },
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;
