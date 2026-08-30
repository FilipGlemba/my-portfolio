import { NextResponse } from "next/server";
import { createCloudinarySignature } from "@/lib/cloudinary";
import { getAdminSession } from "@/lib/require-admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = createCloudinarySignature();
  return NextResponse.json(payload);
}
