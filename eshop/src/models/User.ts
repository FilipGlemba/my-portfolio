import mongoose, { Schema, model, models } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  },
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
