import { hash, compare } from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/User";
import { parseJson } from "@/lib/validation";
import { z } from "zod";
import authOptions from "@/lib/auth";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseJson(request, changePasswordSchema);
  await connect();
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await compare(body.currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid current password" }, { status: 400 });
  }

  user.passwordHash = await hash(body.newPassword, 12);
  await user.save();
  return NextResponse.json({ success: true });
}
