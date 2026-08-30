import mongoose, { Schema, model, models } from "mongoose";

export interface IReview extends mongoose.Document {
  productSlug: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productSlug: { type: String, required: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

const Review = (models.Review as mongoose.Model<IReview>) || model<IReview>("Review", ReviewSchema);
export default Review;
