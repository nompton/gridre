import type { MetadataRoute } from "next";

// Emitted as a static robots.txt under `output: export`.
export const dynamic = "force-static";

const BASE = "https://thegridre.com";

// Allow crawling of the public marketing site; keep internal tools and utility
// routes out of the index. The sitemap lists exactly the indexable pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/agent", "/agent/qr", "/tools", "/open-house/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
