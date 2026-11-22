import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's image optimizer has a monthly quota on the free tier and
    // returns 402 once it's spent, which broke images on the live site. The
    // sources are pre-sized WebP (max 1600px wide), so serve them as-is.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Deliberately no script-src/style-src: Next's inline RSC payload
          // and the theme script would need a per-request nonce to allow
          // safely, and a CSP that allows 'unsafe-inline' adds little. These
          // directives are the ones that are safe without it.
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
