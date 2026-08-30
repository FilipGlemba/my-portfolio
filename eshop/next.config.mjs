const nextConfig = {
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
};

export default nextConfig;
