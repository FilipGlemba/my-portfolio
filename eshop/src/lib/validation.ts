import { NextRequest } from "next/server";
import { ZodSchema } from "zod";

export async function parseJson<T>(request: NextRequest, schema: ZodSchema<T>): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}
