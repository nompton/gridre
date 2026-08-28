import { ImageResponse } from "next/og";

// Statically generated to a PNG at build time under `output: export`.
export const dynamic = "force-static";

export const alt = "GRID Real Estate — Oklahoma Property & HOA Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share card for the whole site (pages inherit it unless they
// set their own). Statically generated at build — no external fonts/assets so
// it works under `output: "export"`.
export default function OpengraphImage() {
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
          GRID Real Estate
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            Oklahoma Property &amp;
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            HOA Management
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#d1d5db" }}>
            OKC &amp; Tulsa Metro
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#d1d5db" }}>
            (405) 310-1221
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
