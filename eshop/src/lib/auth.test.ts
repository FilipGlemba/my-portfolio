import { describe, expect, it } from "vitest";
import authOptions from "@/lib/auth";

// authorize() itself needs a live DB connection, so it's out of scope for a
// unit test — but the jwt/session callbacks are pure and are exactly what
// carries the admin role from login through to route protection.
describe("auth callbacks", () => {
  it("copies the user's role onto the JWT on sign-in", async () => {
    const token = await authOptions.callbacks!.jwt!({
      token: {},
      user: { id: "1", role: "admin" },
    } as never);
    expect(token.role).toBe("admin");
  });

  it("defaults the role to 'user' when none is provided", async () => {
    const token = await authOptions.callbacks!.jwt!({
      token: {},
      user: { id: "1" },
    } as never);
    expect(token.role).toBe("user");
  });

  it("leaves an existing token untouched on subsequent requests", async () => {
    const token = await authOptions.callbacks!.jwt!({
      token: { role: "admin" },
      user: undefined,
    } as never);
    expect(token.role).toBe("admin");
  });

  it("exposes the token's role on the session", async () => {
    const session = await authOptions.callbacks!.session!({
      session: { user: {}, expires: "" },
      token: { role: "admin" },
    } as never);
    expect((session.user as { role?: string } | undefined)?.role).toBe("admin");
  });
});
