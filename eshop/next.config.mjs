// Bezpečnostné hlavičky pre všetky stránky aj API.
// CSP je zámerne len „bezpečná časť“ (bez script-src): Next.js vkladá vlastné
// inline skripty, takže prísna CSP by potrebovala nonce cez middleware.
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=(), interest-cohort=()" },
];

const nextConfig = {
  // Neprezrádzať „X-Powered-By: Next.js“
  poweredByHeader: false,
  experimental: {
    // mongodb-memory-server is only ever used in local dev (see src/lib/dev-mongo.ts)
    // and must never be bundled into the server build.
    serverComponentsExternalPackages: ["mongodb-memory-server", "mongodb-memory-server-core"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
