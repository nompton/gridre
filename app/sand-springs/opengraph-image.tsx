import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "GRID Real Estate — Sand Springs, OK";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImageResponse({ eyebrow: "Property Management", title: "Sand Springs, OK" });
}
