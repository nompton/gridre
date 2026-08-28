import { ImageResponse } from "next/og";

// Shared branded social-share card used by every route's opengraph-image.
// No external fonts/assets so it renders under `output: "export"`.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogImageResponse({
  eyebrow,
  title,
  footerLeft = "OKC & Tulsa Metro",
  footerRight = "(405) 310-1221",
}: {
  eyebrow: string;
  title: string;
  footerLeft?: string;
  footerRight?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 6, color: "#9ca3af", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1.05, maxWidth: "90%" }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#d1d5db" }}>{footerLeft}</div>
          <div style={{ display: "flex", fontSize: 30, color: "#d1d5db" }}>{footerRight}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
