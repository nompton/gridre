"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

export default function QRPage() {
  const [text, setText] = useState("https://thegridre.com/open-house/apex");
  const [size, setSize] = useState(1024);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [includeLogo, setIncludeLogo] = useState(true);
  const [logoScale, setLogoScale] = useState(0.2);
  const [logoDataUrl, setLogoDataUrl] = useState("");

  // Load PNG and convert to data URL (reliable for SVG embedding)
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const res = await fetch("/brand/grid_icon.png");
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoDataUrl(typeof reader.result === "string" ? reader.result : "");
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Logo load failed", e);
      }
    };
    loadLogo();
  }, []);

  useEffect(() => {
    const generate = async () => {
      if (!text.trim()) return setSvgMarkup("");
      try {
        const svg = await QRCode.toString(text, {
          type: "svg",
          width: size,
          margin: 2,
          errorCorrectionLevel: includeLogo ? "H" : "M",
        });
        setSvgMarkup(svg);
      } catch (e) {
        console.error(e);
        setSvgMarkup("");
      }
    };
    generate();
  }, [text, size, includeLogo]);

  const combinedSvg = useMemo(() => {
    if (!svgMarkup) return "";
    if (!includeLogo || !logoDataUrl) return svgMarkup;

    const logoSize = Math.round(size * logoScale);
    const x = Math.round((size - logoSize) / 2);
    const y = Math.round((size - logoSize) / 2);
    const pad = Math.round(logoSize * 0.2);

    const overlay = `
      <rect x="${x - pad}" y="${y - pad}" width="${logoSize + pad * 2}" height="${logoSize + pad * 2}" rx="${Math.round(logoSize * 0.12)}" fill="#FFFFFF" />
      <image href="${logoDataUrl}" x="${x}" y="${y}" width="${logoSize}" height="${logoSize}" />
    `;

    return svgMarkup.replace("</svg>", `${overlay}</svg>`);
  }, [svgMarkup, includeLogo, logoDataUrl, size, logoScale]);

  const previewSvg = useMemo(() => {
    if (!combinedSvg) return "";
    return combinedSvg.replace(/<svg([^>]*)>/i, '<svg$1 width="100%" height="100%">');
  }, [combinedSvg]);

  const downloadSvg = () => {
    if (!combinedSvg) return;
    const blob = new Blob([combinedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grid-qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJpg = () => {
    if (!combinedSvg) return;
    const blob = new Blob([combinedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0);
      const jpg = canvas.toDataURL("image/jpeg", 0.95);
      const a = document.createElement("a");
      a.href = jpg;
      a.download = "grid-qr.jpg";
      a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
      <div style={{ maxWidth: 760, width: "100%" }}>
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>QR Generator</h1>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: 14, borderRadius: 10, background: "#fff", color: "#000", marginBottom: 16 }}
        />

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ width: 120, padding: 10, borderRadius: 8 }} />
          <label style={{ display: "flex", gap: 6 }}>
            <input type="checkbox" checked={includeLogo} onChange={(e) => setIncludeLogo(e.target.checked)} /> Include logo
          </label>
        </div>

        {includeLogo && (
          <input type="range" min="12" max="28" value={Math.round(logoScale * 100)} onChange={(e) => setLogoScale(Number(e.target.value) / 100)} />
        )}

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, display: "flex", justifyContent: "center", marginTop: 16 }}>
          <div style={{ width: 320, height: 320 }}>
            {previewSvg && <div dangerouslySetInnerHTML={{ __html: previewSvg }} style={{ width: "100%", height: "100%" }} />}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
          <button onClick={downloadSvg} style={{ padding: 14, background: "#fff", color: "#000", borderRadius: 10 }}>SVG</button>
          <button onClick={downloadJpg} style={{ padding: 14, border: "1px solid #fff", color: "#fff", borderRadius: 10 }}>JPG</button>
        </div>
      </div>
    </main>
  );
}
