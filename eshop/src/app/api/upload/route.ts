import { NextResponse } from "next/server";
import { createCloudinarySignature } from "@/lib/cloudinary";
import { getAdminSession } from "@/lib/require-admin";
import { DEMO_READ_ONLY_ERROR, isReadOnlyDemo } from "@/lib/demo";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (isReadOnlyDemo(session.user?.email)) {
    return NextResponse.json({ error: DEMO_READ_ONLY_ERROR }, { status: 403 });
  }

  try {
    const payload = createCloudinarySignature();
    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to prepare upload.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
