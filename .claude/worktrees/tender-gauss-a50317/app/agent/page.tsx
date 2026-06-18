"use client";

import { useState } from "react";
import FieldLeadForm from "@/components/FieldLeadForm";
import ProformaEngine from "@/components/ProformaEngine";
import MortgageEngine from "@/components/MortgageEngine";
import CostNetEngine from "@/components/CostNetEngine";
import RehabEngine from "@/components/RehabEngine";

export default function AgentToolsPage() {
  const [view, setView] = useState<
    "menu" | "frbo" | "proforma" | "mortgage" | "costnet" | "rehab"
  >("menu");

  // ===============================
  // FRBO
  // ===============================
  if (view === "frbo") {
    return (
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <button onClick={() => setView("menu")} className="text-sm underline">
          ← Back
        </button>

        <h1 className="text-xl font-bold">FRBO Submission</h1>
        <FieldLeadForm />
      </div>
    );
  }

  // ===============================
  // PROFORMA
  // ===============================
  if (view === "proforma") {
    return (
      <div className="p-6">
        <button
          onClick={() => setView("menu")}
          className="text-sm underline mb-6"
        >
          ← Back
        </button>

        <ProformaEngine />
      </div>
    );
  }

  // ===============================
  // MORTGAGE
  // ===============================
  if (view === "mortgage") {
    return (
      <div className="p-6">
        <button
          onClick={() => setView("menu")}
          className="text-sm underline mb-6"
        >
          ← Back
        </button>

        <MortgageEngine />
      </div>
    );
  }

  // ===============================
  // COST / NET
  // ===============================
  if (view === "costnet") {
    return (
      <div className="p-6">
        <button
          onClick={() => setView("menu")}
          className="text-sm underline mb-6"
        >
          ← Back
        </button>

        <CostNetEngine />
      </div>
    );
  }

  // ===============================
  // REHAB
  // ===============================
  if (view === "rehab") {
    return (
      <div className="p-6">
        <button
          onClick={() => setView("menu")}
          className="text-sm underline mb-6"
        >
          ← Back
        </button>

        <RehabEngine />
      </div>
    );
  }

  // ===============================
  // MENU
  // ===============================
  return (
    <div className="max-w-md mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">Agent Tools</h1>

      <button
        onClick={() => setView("frbo")}
        className="w-full border p-4 rounded-xl text-left"
      >
        FRBO Submission
      </button>

      <button
        onClick={() => setView("proforma")}
        className="w-full border p-4 rounded-xl text-left"
      >
        Proforma Calculator
      </button>

      <button
        onClick={() => setView("mortgage")}
        className="w-full border p-4 rounded-xl text-left"
      >
        Mortgage + Balloon Calculator
      </button>

      <button
        onClick={() => setView("costnet")}
        className="w-full border p-4 rounded-xl text-left"
      >
        Cost / Net Sheet
      </button>

      <button
        onClick={() => setView("rehab")}
        className="w-full border p-4 rounded-xl text-left"
      >
        Rehab / Offer Underwriting
      </button>
    </div>
  );
}