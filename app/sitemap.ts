import { MetadataRoute } from "next";

const BASE = "https://thegridre.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const corePages = [
    { url: BASE, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${BASE}/manage`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/invest`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/associations`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/buy-sell`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/about`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const cityPages = [
    "norman",
    "oklahoma-city",
    "edmond",
    "yukon",
    "moore",
    "mustang",
    "noble",
    "midwest-city",
    "tulsa",
    "tulsa-metro",
    "bixby",
    "broken-arrow",
    "jenks",
    "owasso",
    "sand-springs",
  ].map((slug) => ({
    url: `${BASE}/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  return [
    ...corePages.map((p) => ({ ...p, lastModified: now })),
    ...cityPages,
  ];
}
