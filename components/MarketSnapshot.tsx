"use client";

import { useEffect, useState } from "react";

// Live market snapshot, fed straight from the Atlas public market feed
// (portal.thegridre.com/api/public/market). It fetches on the client at view
// time, so the figures stay current on their own — no site rebuild. Pass a
// `city` to scope it (Norman / Moore / Edmond / Oklahoma City); with no city it
// pools the whole OKC metro (Cleveland + Oklahoma + Canadian counties). Fails
// soft: if the feed can't be reached it renders nothing rather than a broken box.

type Series = { key: string; median: number; count: number };
type MarketData = {
  ok: boolean;
  overall?: { count: number; median: number; medianPricePerSqft: number };
  series?: Series[];
};

const API = "https://portal.thegridre.com/api/public";
const money = (n?: number | null) => (n == null ? "—" : "$" + Math.round(n).toLocaleString());
const int = (n?: number | null) => (n == null ? "—" : Math.round(n).toLocaleString());

// Mirror the build-side trend guard: require a real yearly sample (count ≥ 150)
// and drop any year whose median is a wild outlier against the median-of-medians,
// so sparse historical years can't skew the line.
function saneTrend(series: Series[]): Series[] {
  const ok = series.filter((s) => s.median && (s.count || 0) >= 150);
  if (!ok.length) return [];
  const meds = ok.map((s) => s.median).sort((a, b) => a - b);
  const mid = meds[Math.floor(meds.length / 2)];
  return ok.filter((s) => s.median >= 0.45 * mid && s.median <= 2.2 * mid).slice(-6);
}

function Sparkline({ points }: { points: Series[] }) {
  if (points.length < 2) return null;
  const w = 260;
  const h = 64;
  const pad = 6;
  const vals = points.map((p) => p.median);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const xy = points.map((p, i) => {
    const x = pad + (i * (w - pad * 2)) / (points.length - 1);
    const y = h - pad - ((p.median - min) / span) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${xy[xy.length - 1][0].toFixed(1)},${h - pad} L${xy[0][0].toFixed(1)},${h - pad} Z`;
  const last = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full" role="img" aria-label="Median sale price trend">
      <path d={area} fill="currentColor" opacity={0.08} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={3} fill="currentColor" />
    </svg>
  );
}

export default function MarketSnapshot({
  city,
  site = "metro",
  title = "Local market snapshot",
  blurb,
}: {
  city?: string;
  site?: string;
  title?: string;
  blurb?: string;
}) {
  const [d, setD] = useState<MarketData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const qs = new URLSearchParams({ site, homesOnly: "1", minPrice: "40000", group: "year" });
    if (city) qs.set("city", city);
    let live = true;
    fetch(`${API}/market?${qs.toString()}`)
      .then((r) => r.json())
      .then((j: MarketData) => {
        if (!live) return;
        if (j && j.ok) setD(j);
        else setFailed(true);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [city, site]);

  if (failed) return null;

  const o = d?.overall;
  const trend = d?.series ? saneTrend(d.series) : [];
  const loading = !d;
  const where = city || "the OKC metro";

  const stats: { label: string; value: string }[] = [
    { label: "Median sale price", value: money(o?.median) },
    { label: "Median price / sq ft", value: money(o?.medianPricePerSqft) },
    { label: "Recorded sales", value: int(o?.count) },
  ];

  return (
    <div className="rounded-2xl border border-black/10 p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="text-sm font-medium text-black/60">{title}</div>
          {blurb && <p className="mt-1 max-w-prose text-sm text-black/60">{blurb}</p>}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-2.5 py-1 text-xs font-medium text-black/55">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live from Atlas
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className={`text-2xl font-semibold tracking-tight tabular-nums md:text-3xl ${loading ? "animate-pulse text-black/20" : ""}`}>
              {loading ? "—" : s.value}
            </div>
            <div className="mt-1 text-xs leading-4 text-black/55">{s.label}</div>
          </div>
        ))}
      </div>

      {trend.length >= 2 && (
        <div className="mt-6 text-emerald-700">
          <Sparkline points={trend} />
          <div className="mt-1 flex justify-between text-[11px] font-medium text-black/45">
            <span>{trend[0].key}</span>
            <span>Median sale price, year over year</span>
            <span>{trend[trend.length - 1].key}</span>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs leading-5 text-black/45">
        Recorded arm&apos;s-length sales across {where}, from public county records via the Atlas
        market-data feed — updated automatically. A market snapshot, not an appraisal.
      </p>
    </div>
  );
}
