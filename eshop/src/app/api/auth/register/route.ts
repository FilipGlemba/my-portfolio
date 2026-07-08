import { compare, hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/User";
import { parseJson } from "@/lib/validation";
import { registerSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(ip);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await parseJson(request, registerSchema);
  await connect();

  const existing = await User.findOne({ email: body.email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const passwordHash = await hash(body.password, 12);
  await User.create({ name: body.name, email: body.email.toLowerCase(), passwordHash, role: "user" });

  return NextResponse.json({ success: true });
}
