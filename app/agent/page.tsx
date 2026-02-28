"use client";

import { useState } from "react";
import FieldLeadForm from "@/components/FieldLeadForm";
import ProformaEngine from "@/components/ProformaEngine";

export default function AgentToolsPage() {
  const [view, setView] = useState<"menu" | "frbo" | "proforma">("menu");

  if (view === "frbo") {
    return (
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <button
          onClick={() => setView("menu")}
          className="text-sm underline"
        >
          ← Back
        </button>

        <h1 className="text-xl font-bold">FRBO Submission</h1>
        <FieldLeadForm />
      </div>
    );
  }

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
    </div>
  );
}