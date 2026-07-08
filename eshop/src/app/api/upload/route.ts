import { NextRequest, NextResponse } from "next/server";
import { createCloudinarySignature } from "@/lib/cloudinary";

export async function GET() {
  const payload = createCloudinarySignature();
  return NextResponse.json(payload);
}
