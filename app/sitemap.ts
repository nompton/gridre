import type { MetadataRoute } from "next";

// Emitted as a static sitemap.xml under `output: export`.
export const dynamic = "force-static";

const BASE = "https://thegridre.com";

// Public, indexable marketing pages only. Internal/utility routes (/agent,
// /agent/qr, /tools) and time-sensitive campaign pages (/open-house/*) are
// intentionally excluded here and disallowed in robots.ts.
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/manage", priority: 0.9, changeFrequency: "monthly" },
  { path: "/invest", priority: 0.9, changeFrequency: "monthly" },
  { path: "/buy-sell", priority: 0.9, changeFrequency: "monthly" },
  { path: "/associations", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/home-value", priority: 0.8, changeFrequency: "monthly" },
  { path: "/zerodown", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  // City / metro landing pages
  { path: "/norman", priority: 0.8, changeFrequency: "monthly" },
  { path: "/noble", priority: 0.7, changeFrequency: "monthly" },
  { path: "/oklahoma-city", priority: 0.8, changeFrequency: "monthly" },
  { path: "/edmond", priority: 0.7, changeFrequency: "monthly" },
  { path: "/yukon", priority: 0.7, changeFrequency: "monthly" },
  { path: "/moore", priority: 0.7, changeFrequency: "monthly" },
  { path: "/mustang", priority: 0.7, changeFrequency: "monthly" },
  { path: "/midwest-city", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tulsa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tulsa-metro", priority: 0.7, changeFrequency: "monthly" },
  { path: "/bixby", priority: 0.7, changeFrequency: "monthly" },
  { path: "/broken-arrow", priority: 0.7, changeFrequency: "monthly" },
  { path: "/jenks", priority: 0.7, changeFrequency: "monthly" },
  { path: "/owasso", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sand-springs", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
