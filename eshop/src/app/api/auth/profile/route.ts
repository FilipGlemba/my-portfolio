import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/User";
import authOptions from "@/lib/auth";
import { parseJson } from "@/lib/validation";
import { updateProfileSchema } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();
  const user = await User.findOne({ email: session.user.email }).select("name email role createdAt");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseJson(request, updateProfileSchema);
  await connect();

  const user = await User.findOneAndUpdate({ email: session.user.email }, { name: body.name }, { new: true }).select("name email role createdAt");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
