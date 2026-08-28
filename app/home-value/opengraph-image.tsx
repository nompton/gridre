import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "GRID Real Estate — What’s Your Home Worth?";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImageResponse({ eyebrow: "GRID Real Estate", title: "What’s Your Home Worth?" });
}
