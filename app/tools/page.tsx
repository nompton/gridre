"use client";

import { useEffect, useState } from "react";
import ProformaEngine from "@/components/ProformaEngine";
import MortgageEngine from "@/components/MortgageEngine";
import CostNetEngine from "@/components/CostNetEngine";
import RehabEngine from "@/components/RehabEngine";

type View = "menu" | "proforma" | "mortgage" | "costnet" | "rehab";

const tools: { id: Exclude<View, "menu">; icon: string; title: string; desc: string }[] = [
  {
    id: "proforma",
    icon: "📊",
    title: "Rental Proforma",
    desc: "Analyze cash flow, cap rate, CoC return, DSCR, and break-even on any rental property",
  },
  {
    id: "rehab",
    icon: "🔨",
    title: "Rehab Underwriter",
    desc: "Full flip or rental analysis with rehab budget, MAO calculation, and hold cost modeling",
  },
  {
    id: "mortgage",
    icon: "🏦",
    title: "Mortgage Calculator",
    desc: "Amortization schedules, balloon payoff, scenario comparison, and refi break-even",
  },
  {
    id: "costnet",
    icon: "📄",
    title: "Buyer / Seller Net Sheet",
    desc: "Estimate closing costs for buyers and net proceeds for sellers with PDF export",
  },
];

const toolTitles: Record<Exclude<View, "menu">, string> = {
  proforma: "Rental Proforma",
  mortgage: "Mortgage Calculator",
  costnet: "Buyer / Seller Net Sheet",
  rehab: "Rehab Underwriter",
};

export default function ToolsPage() {
  const [view, setView] = useState<View>("menu");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const colonIdx = hash.indexOf(":");
    const tool = (colonIdx !== -1 ? hash.slice(0, colonIdx) : hash) as View;
    if (tools.some((t) => t.id === tool)) setView(tool);
  }, []);

  if (view !== "menu") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => { setView("menu"); window.history.replaceState(null, "", window.location.pathname); }}
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            ← Back to tools
          </button>
          <span className="text-sm font-semibold text-gray-700">{toolTitles[view]}</span>
        </div>
        <div className="flex-1">
          {view === "proforma" && <ProformaEngine />}
          {view === "mortgage" && <MortgageEngine />}
          {view === "costnet" && <CostNetEngine />}
          {view === "rehab" && <RehabEngine />}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-sm font-medium text-black/50 mb-2">Investor Resources</div>
        <h1 className="text-3xl font-semibold tracking-tight">Real estate calculators.</h1>
        <p className="mt-3 text-sm leading-7 text-black/65 max-w-xl">
          Built by GRID Real Estate for Oklahoma investors. Run the numbers on any deal — rental cash flow, rehab underwriting, mortgage scenarios, or closing cost estimates. No sign-up required.
        </p>
        <p className="mt-3 text-sm text-black/50">
          Want us to run the numbers on a real deal?{" "}
          <a href="/contact" className="text-black underline underline-offset-4 hover:text-black/70">Talk to GRID →</a>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setView(tool.id)}
            className="w-full border rounded-2xl p-5 text-left flex items-start gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="text-2xl w-10 text-center flex-shrink-0 mt-0.5">{tool.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{tool.title}</div>
              <div className="text-xs text-gray-500 mt-1 leading-relaxed">{tool.desc}</div>
            </div>
            <div className="text-gray-300 flex-shrink-0 text-lg mt-0.5">›</div>
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
        <div className="text-sm font-semibold tracking-tight">Need more than a calculator?</div>
        <p className="mt-2 text-sm leading-6 text-black/65">
          GRID runs real numbers on real deals — rent comps, expense assumptions, cap rate, and exit strategy. If you&apos;re evaluating an Oklahoma investment, let&apos;s talk.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/contact" className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">talk to GRID</a>
          <a href="/invest" className="rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30">investor services</a>
        </div>
      </div>
    </div>
  );
}
