export const metadata = {
  title: "Privacy Policy — FitGear",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-black/70">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-wide text-flame-500">Legal</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-black/60">
        FitGear is a portfolio project built by Filip Glemba to demonstrate full-stack
        development — it isn&apos;t a commercial business. That said, the account and
        checkout flows are fully functional, so if you create an account or place a test
        order, real data is stored exactly as described below.
      </p>

      <Section title="What data is collected">
        <p><strong>Account (if you register):</strong> name, email address, and a hashed password (never stored in plain text).</p>
        <p><strong>Orders (if you check out):</strong> shipping name, email, address, city, postal code, country, and the items/quantities ordered.</p>
        <p>No payment card details ever reach this app&apos;s servers — Stripe collects and processes those directly.</p>
      </Section>

      <Section title="Why it's collected">
        <p>Solely to let the account and order features work: signing in, showing your order history, and fulfilling a checkout. Nothing here is used for marketing, profiling, or sold to anyone.</p>
      </Section>

      <Section title="Who else sees it">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>MongoDB Atlas</strong> — hosts the database (account and order records).</li>
          <li><strong>Stripe</strong> — processes payment details directly; this app only ever sees a payment status, never card data.</li>
          <li><strong>Resend</strong> — sends order-confirmation emails, when configured.</li>
          <li><strong>Cloudinary</strong> — hosts product images uploaded through the admin panel; it doesn&apos;t receive customer data.</li>
        </ul>
      </Section>

      <Section title="Cookies">
        <p>
          One strictly-necessary session cookie (set by NextAuth) keeps you signed in.
          There are no analytics, advertising, or tracking cookies on this site.
        </p>
      </Section>

      <Section title="How long it's kept">
        <p>For as long as the account or order exists. Since this is a demo project, the database may be reset or reseeded periodically without notice.</p>
      </Section>

      <Section title="Your rights">
        <p>
          You can ask to see, correct, or delete any data tied to your account or order at
          any time — email <a href="mailto:filip.glemba9@gmail.com" className="text-flame-500 underline">filip.glemba9@gmail.com</a> and it&apos;ll be handled directly.
        </p>
      </Section>
    </section>
  );
}
