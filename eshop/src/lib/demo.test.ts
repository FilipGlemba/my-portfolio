import { afterEach, describe, expect, it, vi } from "vitest";
import { demoReadOnlyEnabled, isDemoAccount, isReadOnlyDemo } from "@/lib/demo";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("demo accounts", () => {
  it("recognises the seeded demo accounts, case-insensitively", () => {
    expect(isDemoAccount("admin@fitgear.local")).toBe(true);
    expect(isDemoAccount("USER@FitGear.local")).toBe(true);
  });

  it("does not treat real registered accounts as demo", () => {
    expect(isDemoAccount("someone@example.com")).toBe(false);
    expect(isDemoAccount(null)).toBe(false);
    expect(isDemoAccount(undefined)).toBe(false);
  });

  it("is read-only in production and editable in development by default", () => {
    vi.stubEnv("DEMO_READ_ONLY", "");
    vi.stubEnv("NODE_ENV", "production");
    expect(demoReadOnlyEnabled()).toBe(true);
    vi.stubEnv("NODE_ENV", "development");
    expect(demoReadOnlyEnabled()).toBe(false);
  });

  it("lets DEMO_READ_ONLY override the default either way", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DEMO_READ_ONLY", "false");
    expect(demoReadOnlyEnabled()).toBe(false);
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("DEMO_READ_ONLY", "true");
    expect(demoReadOnlyEnabled()).toBe(true);
  });

  it("only blocks demo accounts, never real ones, when read-only is on", () => {
    vi.stubEnv("DEMO_READ_ONLY", "true");
    expect(isReadOnlyDemo("admin@fitgear.local")).toBe(true);
    expect(isReadOnlyDemo("someone@example.com")).toBe(false);
  });
});
