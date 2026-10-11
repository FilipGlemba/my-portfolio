// Always two decimals: €129.99 must not display as €130 when €129.99 is what's charged.
const priceFormat = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (value: number) => priceFormat.format(value);

// Fixed locale + time zone, so the server and the browser render the exact
// same string (a mismatch here causes a React hydration error).
const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const formatDate = (value: string | Date) => dateFormat.format(new Date(value));
