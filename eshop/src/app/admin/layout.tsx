import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { isReadOnlyDemo } from "@/lib/demo";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const readOnly = isReadOnlyDemo(session?.user?.email);

  return (
    <>
      {readOnly ? (
        <div className="border-b border-volt/40 bg-volt/15">
          <p className="mx-auto max-w-7xl px-4 py-3 text-sm text-ink/80 sm:px-6">
            <strong className="font-semibold text-ink">Demo admin — read-only.</strong> Browse everything freely;
            editing and deleting products is disabled on the live site.
          </p>
        </div>
      ) : null}
      {children}
    </>
  );
}
