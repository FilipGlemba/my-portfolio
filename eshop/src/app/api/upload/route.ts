import { NextResponse } from "next/server";
import { createCloudinarySignature } from "@/lib/cloudinary";
import { getAdminSession } from "@/lib/require-admin";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = createCloudinarySignature();
    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to prepare upload.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
