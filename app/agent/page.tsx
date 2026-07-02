"use client";

import { useEffect, useState } from "react";
import FieldLeadForm from "@/components/FieldLeadForm";
import ProformaEngine from "@/components/ProformaEngine";
import MortgageEngine from "@/components/MortgageEngine";
import CostNetEngine from "@/components/CostNetEngine";
import RehabEngine from "@/components/RehabEngine";

type View = "menu" | "frbo" | "proforma" | "mortgage" | "costnet" | "rehab";

const tools: { id: Exclude<View, "menu">; icon: string; title: string; desc: string }[] = [
  {
    id: "frbo",
    icon: "📋",
    title: "FRBO Submission",
    desc: "Submit For Rent By Owner leads directly to the pipeline",
  },
  {
    id: "proforma",
    icon: "📊",
    title: "Proforma Calculator",
    desc: "Rental property cash flow, cap rate, CoC & returns",
  },
  {
    id: "mortgage",
    icon: "🏦",
    title: "Mortgage + Balloon",
    desc: "Amortization schedules, balloon payoff & scenario comparison",
  },
  {
    id: "costnet",
    icon: "📄",
    title: "Cost / Net Sheet",
    desc: "Buyer closing costs & seller net estimates with PDF export",
  },
  {
    id: "rehab",
    icon: "🔨",
    title: "Rehab Underwriting",
    desc: "Flip vs. rental analysis with full rehab budget & MAO calc",
  },
];

const toolTitles: Record<Exclude<View, "menu">, string> = {
  frbo: "FRBO Submission",
  proforma: "Proforma Calculator",
  mortgage: "Mortgage + Balloon",
  costnet: "Cost / Net Sheet",
  rehab: "Rehab Underwriting",
};

export default function AgentToolsPage() {
  const [view, setView] = useState<View>("menu");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const colonIdx = hash.indexOf(":");
    if (colonIdx === -1) return;
    const tool = hash.slice(0, colonIdx) as View;
    if (tools.some((t) => t.id === tool)) setView(tool);
  }, []);

  if (view !== "menu") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setView("menu")}
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            ← Back
          </button>
          <span className="text-sm font-semibold text-gray-700">
            {toolTitles[view]}
          </span>
        </div>
        <div className="flex-1">
          {view === "frbo" && (
            <div className="max-w-xl mx-auto p-6">
              <FieldLeadForm />
            </div>
          )}
          {view === "proforma" && <ProformaEngine />}
          {view === "mortgage" && <MortgageEngine />}
          {view === "costnet" && <CostNetEngine />}
          {view === "rehab" && <RehabEngine />}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col items-center gap-2 pb-2">
        <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
        <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase">
          Agent Tools
        </div>
      </div>

      <div className="grid gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setView(tool.id)}
            className="w-full border rounded-2xl p-4 text-left flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="text-2xl w-10 text-center flex-shrink-0">{tool.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{tool.title}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {tool.desc}
              </div>
            </div>
            <div className="text-gray-300 flex-shrink-0 text-lg">›</div>
          </button>
        ))}
      </div>
    </div>
  );
}
