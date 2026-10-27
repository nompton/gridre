"use client";

import { useEffect, useRef } from "react";

// Shared Cloudflare Turnstile widget for the GRID lead forms. It renders the
// "GRID lead forms" widget; when the widget sits inside a <form>, Cloudflare
// injects a hidden <input name="cf-turnstile-response"> that each form forwards
// to the GRID backend as cf_turnstile_response. Backend verification is gated +
// fail-open, so this is an additive layer on top of the honeypot + content
// heuristics — a render failure never blocks a real lead. [[bot-spam-defense]]
const SITEKEY = "0x4AAAAAAFoF10j_tuosuTSk";
const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Load api.js once per page, shared across every widget instance.
let loader: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).turnstile) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise<void>((resolve) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => resolve(); // fail open: honeypot + heuristics still apply
    document.head.appendChild(s);
  });
  return loader;
}

export default function Turnstile({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | undefined;
    let cancelled = false;
    loadTurnstile().then(() => {
      const ts = (window as any).turnstile;
      if (cancelled || !ref.current || !ts) return;
      if (ref.current.childElementCount > 0) return; // avoid a double render
      try {
        widgetId = ts.render(ref.current, { sitekey: SITEKEY });
      } catch {
        /* non-fatal */
      }
    });
    return () => {
      cancelled = true;
      try {
        const ts = (window as any).turnstile;
        if (widgetId && ts) ts.remove(widgetId);
      } catch {}
    };
  }, []);

  return <div ref={ref} className={className} />;
}
