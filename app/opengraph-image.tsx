import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

// Default social-share card (home + any page without its own opengraph-image).
export const dynamic = "force-static";
export const alt = "GRID Real Estate — Oklahoma Property & HOA Management";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImageResponse({ eyebrow: "GRID Real Estate", title: "Oklahoma Property & HOA Management" });
}
