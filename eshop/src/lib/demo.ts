import { SEED_USERS } from "@/lib/seed-data";

// The seeded demo accounts' passwords are printed on the login page, so on the
// public deployment anyone can sign in as admin. To keep the live demo from
// being vandalised (catalog deleted, admin password changed), those shared
// accounts are read-only in production. Locally (`npm run dev`) everything
// stays editable. DEMO_READ_ONLY=true|false overrides either way.
const DEMO_EMAILS = new Set(SEED_USERS.map((user) => user.email.toLowerCase()));

export function isDemoAccount(email: string | null | undefined): boolean {
  return Boolean(email && DEMO_EMAILS.has(email.toLowerCase()));
}

export function demoReadOnlyEnabled(): boolean {
  const flag = process.env.DEMO_READ_ONLY;
  if (flag === "true") return true;
  if (flag === "false") return false;
  return process.env.NODE_ENV === "production";
}

export function isReadOnlyDemo(email: string | null | undefined): boolean {
  return demoReadOnlyEnabled() && isDemoAccount(email);
}

export const DEMO_READ_ONLY_ERROR =
  "This is the shared demo account, so changes are disabled on the live site. Run the project locally to try editing.";
