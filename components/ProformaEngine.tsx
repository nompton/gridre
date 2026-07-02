"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

type Frequency = "monthly" | "yearly";

type UnitRow = {
  label: string;
  rent: number | "";
  freq: Frequency;
};

type ExtraExpenseRow = {
  label: string;
  amount: number | "";
  freq: Frequency;
};

export default function ProformaEngine() {
  const num = (v: number | "") => (v === "" ? 0 : v);
  const annualize = (v: number, f: Frequency) => (f === "monthly" ? v * 12 : v);
  const round2 = (n: number) => Math.round(n * 100) / 100;

  const format = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const [propertyTitle, setPropertyTitle] = useState("");
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [downPercent, setDownPercent] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [termYears, setTermYears] = useState<number | "">("");
  const [isCash, setIsCash] = useState(false);
  const [units, setUnits] = useState<UnitRow[]>([{ label: "Unit 1", rent: "", freq: "monthly" }]);
  const [vacancyPercent, setVacancyPercent] = useState<number | "">("");
  const [taxes, setTaxes] = useState<number | "">("");
  const [taxesFreq, setTaxesFreq] = useState<Frequency>("yearly");
  const [insurance, setInsurance] = useState<number | "">("");
  const [insuranceFreq, setInsuranceFreq] = useState<Frequency>("yearly");
  const [hoa, setHoa] = useState<number | "">("");
  const [hoaFreq, setHoaFreq] = useState<Frequency>("monthly");
  const [managementPercent, setManagementPercent] = useState<number | "">("");
  const [maintenancePercent, setMaintenancePercent] = useState<number | "">("");
  const [extraExpenses, setExtraExpenses] = useState<ExtraExpenseRow[]>([]);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // URL state decode on mount
  useEffect(() => {
    const raw = window.location.hash.slice(1);
    const colonIdx = raw.indexOf(":");
    const hash = colonIdx !== -1 ? raw.slice(colonIdx + 1) : raw;
    if (!hash) return;
    try {
      const s = JSON.parse(atob(hash));
      if (s.t !== undefined) setPropertyTitle(s.t);
      if (s.pp !== undefined) setPurchasePrice(s.pp);
      if (s.dp !== undefined) setDownPercent(s.dp);
      if (s.ir !== undefined) setInterestRate(s.ir);
      if (s.ty !== undefined) setTermYears(s.ty);
      if (s.cash !== undefined) setIsCash(s.cash);
      if (s.u) setUnits(s.u.map(([label, rent, f]: [string, number | "", string]) => ({ label, rent, freq: f === "m" ? "monthly" : "yearly" })));
      if (s.vac !== undefined) setVacancyPercent(s.vac);
      if (s.tax) { setTaxes(s.tax[0]); setTaxesFreq(s.tax[1] === "m" ? "monthly" : "yearly"); }
      if (s.ins) { setInsurance(s.ins[0]); setInsuranceFreq(s.ins[1] === "m" ? "monthly" : "yearly"); }
      if (s.hoa) { setHoa(s.hoa[0]); setHoaFreq(s.hoa[1] === "m" ? "monthly" : "yearly"); }
      if (s.mgmt !== undefined) setManagementPercent(s.mgmt);
      if (s.maint !== undefined) setMaintenancePercent(s.maint);
      if (s.ex) setExtraExpenses(s.ex.map(([label, amount, f]: [string, number | "", string]) => ({ label, amount, freq: f === "m" ? "monthly" : "yearly" })));
    } catch {}
  }, []);

  const addUnit = () => setUnits((p) => [...p, { label: `Unit ${p.length + 1}`, rent: "", freq: "monthly" }]);
  const removeUnit = (i: number) => setUnits((p) => p.filter((_, idx) => idx !== i));
  const addExpense = () => setExtraExpenses((p) => [...p, { label: "Other Expense", amount: "", freq: "yearly" }]);
  const removeExpense = (i: number) => setExtraExpenses((p) => p.filter((_, idx) => idx !== i));

  const loanAmount = useMemo(() => {
    if (isCash) return 0;
    const pp = num(purchasePrice);
    const dp = num(downPercent) / 100;
    return pp > 0 ? pp * (1 - dp) : 0;
  }, [purchasePrice, downPercent, isCash]);

  const downPaymentAmount = isCash
    ? num(purchasePrice)
    : num(purchasePrice) * (num(downPercent) / 100);

  const monthlyPayment = useMemo(() => {
    if (isCash || loanAmount === 0) return 0;
    const r = num(interestRate) / 100 / 12;
    const n = num(termYears) * 12;
    if (!r || !n) return 0;
    return (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, interestRate, termYears, isCash]);

  const annualDebtService = monthlyPayment * 12;

  const grossIncome = useMemo(
    () => units.reduce((sum, u) => sum + annualize(num(u.rent), u.freq), 0),
    [units]
  );

  const vacancyLoss = grossIncome * (num(vacancyPercent) / 100);
  const effectiveGross = grossIncome - vacancyLoss;
  const management = effectiveGross * (num(managementPercent) / 100);
  const maintenance = effectiveGross * (num(maintenancePercent) / 100);
  const taxesAnnual = annualize(num(taxes), taxesFreq);
  const insuranceAnnual = annualize(num(insurance), insuranceFreq);
  const hoaAnnual = annualize(num(hoa), hoaFreq);
  const extraAnnualTotal = extraExpenses.reduce((sum, e) => sum + annualize(num(e.amount), e.freq), 0);
  const operatingExpenses = taxesAnnual + insuranceAnnual + hoaAnnual + management + maintenance + extraAnnualTotal;
  const noi = effectiveGross - operatingExpenses;
  const cashFlow = noi - annualDebtService;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  const capRate = num(purchasePrice) > 0 ? (noi / num(purchasePrice)) * 100 : 0;
  const cashInvested = isCash ? num(purchasePrice) : num(purchasePrice) * (num(downPercent) / 100);
  const cashOnCash = cashInvested > 0 ? (cashFlow / cashInvested) * 100 : 0;

  // New metrics
  const grm = grossIncome > 0 && num(purchasePrice) > 0
    ? round2(num(purchasePrice) / grossIncome)
    : 0;

  const breakEvenOccupancy = grossIncome > 0
    ? Math.min(100, ((operatingExpenses + annualDebtService) / grossIncome) * 100)
    : 0;

  const equityAmount = downPaymentAmount;
  const ltv = num(purchasePrice) > 0 ? (loanAmount / num(purchasePrice)) * 100 : 0;

  // Color helpers
  const scoreClass = (val: number, low: number, high: number, invert = false) => {
    if (invert) {
      if (val <= low) return "text-green-600 font-semibold";
      if (val <= high) return "text-yellow-600 font-semibold";
      return "text-red-600 font-semibold";
    }
    if (val >= high) return "text-green-600 font-semibold";
    if (val >= low) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  // Share URL
  const shareUrl = () => {
    const s = {
      t: propertyTitle, pp: purchasePrice, dp: downPercent, ir: interestRate,
      ty: termYears, cash: isCash,
      u: units.map(u => [u.label, u.rent, u.freq === "monthly" ? "m" : "y"]),
      vac: vacancyPercent,
      tax: [taxes, taxesFreq === "monthly" ? "m" : "y"],
      ins: [insurance, insuranceFreq === "monthly" ? "m" : "y"],
      hoa: [hoa, hoaFreq === "monthly" ? "m" : "y"],
      mgmt: managementPercent, maint: maintenancePercent,
      ex: extraExpenses.map(e => [e.label, e.amount, e.freq === "monthly" ? "m" : "y"]),
    };
    const url = window.location.href.split("#")[0] + "#proforma:" + btoa(JSON.stringify(s));
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Copy text summary
  const copySummary = () => {
    const lines = [
      "GRID Investment Proforma",
      propertyTitle ? `Property: ${propertyTitle}` : "",
      "---",
      `Purchase Price: ${format(num(purchasePrice))}`,
      isCash ? "Cash Purchase" : `Loan: ${format(loanAmount)} @ ${num(interestRate)}% / ${num(termYears)}yr`,
      `Annual Debt Service: ${format(annualDebtService)}`,
      "---",
      `Gross Income: ${format(grossIncome)}`,
      `Vacancy Loss: ${format(vacancyLoss)}`,
      `Effective Gross: ${format(effectiveGross)}`,
      `Operating Expenses: ${format(operatingExpenses)}`,
      `NOI: ${format(noi)}`,
      `Cash Flow: ${format(cashFlow)}/yr (${format(cashFlow / 12)}/mo)`,
      "---",
      `Cap Rate: ${capRate.toFixed(2)}%`,
      `Cash on Cash: ${cashOnCash.toFixed(2)}%`,
      `DSCR: ${annualDebtService ? dscr.toFixed(2) : "-"}`,
      `GRM: ${grm.toFixed(1)}`,
      `Break-Even Occupancy: ${breakEvenOccupancy.toFixed(1)}%`,
      `Equity at Close: ${format(equityAmount)} (LTV ${ltv.toFixed(1)}%)`,
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ================= PDF ================= */
  const blobToDataURL = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onloadend = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });

  const drawRow = (pdf: jsPDF, y: number, label: string, value: string, opts?: { bold?: boolean; indent?: number }) => {
    const indent = opts?.indent ?? 0;
    if (opts?.bold) pdf.setFont("helvetica", "bold");
    else pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text(label, 15 + indent, y);
    pdf.text(value, 195, y, { align: "right" });
    pdf.setDrawColor(220);
    pdf.line(15, y + 1.8, 195, y + 1.8);
    return y + 7;
  };

  const drawSection = (pdf: jsPDF, y: number, title: string) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20);
    pdf.text(title.toUpperCase(), 15, y);
    y += 4;
    pdf.setDrawColor(80);
    pdf.line(15, y, 195, y);
    y += 7;
    pdf.setTextColor(0);
    return y;
  };

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setTextColor(0);
    try {
      const logoBlob = await fetch("/brand/grid_logo.png").then((res) => res.blob());
      const logoData = await blobToDataURL(logoBlob);
      pdf.addImage(logoData, "PNG", 15, 12, 42, 14);
    } catch {}

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Investment Proforma", 15, 35);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Preliminary Estimate – For Underwriting Purposes Only", 15, 41);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(propertyTitle || "Property Analysis", 15, 50);

    let y = 60;
    y = drawSection(pdf, y, "Income");
    units.forEach((u) => { y = drawRow(pdf, y, u.label, format(annualize(num(u.rent), u.freq))); });
    y = drawRow(pdf, y, "Gross Income", format(grossIncome), { bold: true });
    y = drawRow(pdf, y, "Vacancy Loss", format(vacancyLoss));
    y = drawRow(pdf, y, "Effective Gross Income", format(effectiveGross), { bold: true });
    y += 4;

    y = drawSection(pdf, y, "Operating Expenses");
    y = drawRow(pdf, y, "Taxes", format(taxesAnnual));
    y = drawRow(pdf, y, "Insurance", format(insuranceAnnual));
    y = drawRow(pdf, y, "HOA", format(hoaAnnual));
    y = drawRow(pdf, y, "Management", format(management));
    y = drawRow(pdf, y, "Maintenance", format(maintenance));
    extraExpenses.forEach((e) => { y = drawRow(pdf, y, e.label, format(annualize(num(e.amount), e.freq))); });
    y = drawRow(pdf, y, "Total Operating Expenses", format(operatingExpenses), { bold: true });
    y += 4;

    y = drawSection(pdf, y, "Financing");
    y = drawRow(pdf, y, "Purchase Price", format(num(purchasePrice)));
    y = drawRow(pdf, y, "Down Payment", `${format(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`);
    if (!isCash) {
      y = drawRow(pdf, y, "Interest Rate", `${num(interestRate).toFixed(2)}%`);
      y = drawRow(pdf, y, "Term", `${num(termYears)} Years`);
    }
    y = drawRow(pdf, y, "Loan Amount", format(loanAmount));
    y = drawRow(pdf, y, "Annual Debt Service", format(annualDebtService));
    y += 4;

    y = drawSection(pdf, y, "Returns");
    y = drawRow(pdf, y, "NOI", format(noi), { bold: true });
    y = drawRow(pdf, y, "DSCR", annualDebtService ? dscr.toFixed(2) : "-");
    y = drawRow(pdf, y, "Cash Flow", format(cashFlow), { bold: true });
    y = drawRow(pdf, y, "Cap Rate", `${capRate.toFixed(2)}%`);
    y = drawRow(pdf, y, "Cash on Cash", `${cashOnCash.toFixed(2)}%`);
    y = drawRow(pdf, y, "GRM", grm.toFixed(1));
    y = drawRow(pdf, y, "Break-Even Occupancy", `${breakEvenOccupancy.toFixed(1)}%`);
    y = drawRow(pdf, y, "Equity at Close", `${format(equityAmount)} (LTV ${ltv.toFixed(1)}%)`);

    pdf.save("GRID-Proforma.pdf");
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col items-center gap-2">
        <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
        <div className="text-sm font-semibold tracking-wide">Proforma Calculator</div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Property</label>
        <input
          placeholder="Property Address / Title"
          value={propertyTitle}
          onChange={(e) => setPropertyTitle(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-sm"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* INPUT FORM */}
        <div className="bg-white rounded-xl border shadow-sm p-4 space-y-5">
          <SectionTitle>Financing</SectionTitle>
          <GridRow label="Purchase Price"><NumberInput value={purchasePrice} set={setPurchasePrice} /></GridRow>
          <GridRow label="Cash Purchase">
            <input type="checkbox" checked={isCash} onChange={() => setIsCash((v) => !v)} className="h-4 w-4" />
          </GridRow>
          {!isCash && (
            <>
              <GridRow label="Down Payment (%)"><NumberInput value={downPercent} set={setDownPercent} /></GridRow>
              <GridRow label="Interest Rate (%)"><NumberInput value={interestRate} set={setInterestRate} /></GridRow>
              <GridRow label="Term (Years)"><NumberInput value={termYears} set={setTermYears} /></GridRow>
            </>
          )}
          <div className="pt-2 border-t space-y-2">
            <SmallRow label="Loan Amount" value={format(loanAmount)} />
            <SmallRow label="Annual Debt Service" value={format(annualDebtService)} />
          </div>

          <SectionTitle>Income</SectionTitle>
          <div className="space-y-3">
            {units.map((u, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    value={u.label}
                    onChange={(e) => { const c = [...units]; c[i] = { ...c[i], label: e.target.value }; setUnits(c); }}
                    className="border rounded-md px-2 py-1 text-sm flex-1"
                  />
                  {units.length > 1 && (
                    <button type="button" onClick={() => removeUnit(i)} className="text-red-600 text-sm px-2 py-1">✕</button>
                  )}
                </div>
                <div className="flex gap-2">
                  <NumberInput
                    value={u.rent}
                    set={(val) => { const c = [...units]; c[i] = { ...c[i], rent: val }; setUnits(c); }}
                    className="flex-1"
                  />
                  <select
                    value={u.freq}
                    onChange={(e) => { const c = [...units]; c[i] = { ...c[i], freq: e.target.value as Frequency }; setUnits(c); }}
                    className="border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            ))}
            <button type="button" onClick={addUnit} className="text-sm underline">+ Add Unit</button>
          </div>

          <GridRow label="Vacancy (%)"><NumberInput value={vacancyPercent} set={setVacancyPercent} /></GridRow>

          <SectionTitle>Expenses</SectionTitle>
          <ExpenseRow label="Taxes" value={taxes} set={setTaxes} freq={taxesFreq} setFreq={setTaxesFreq} />
          <ExpenseRow label="Insurance" value={insurance} set={setInsurance} freq={insuranceFreq} setFreq={setInsuranceFreq} />
          <ExpenseRow label="HOA" value={hoa} set={setHoa} freq={hoaFreq} setFreq={setHoaFreq} />
          <GridRow label="Management (%)"><NumberInput value={managementPercent} set={setManagementPercent} /></GridRow>
          <GridRow label="Maintenance (%)"><NumberInput value={maintenancePercent} set={setMaintenancePercent} /></GridRow>

          <div className="space-y-3">
            {extraExpenses.map((e, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    value={e.label}
                    onChange={(ev) => { const c = [...extraExpenses]; c[i] = { ...c[i], label: ev.target.value }; setExtraExpenses(c); }}
                    className="border rounded-md px-2 py-1 text-sm flex-1"
                  />
                  <button type="button" onClick={() => removeExpense(i)} className="text-red-600 text-sm px-2 py-1">✕</button>
                </div>
                <div className="flex gap-2">
                  <NumberInput
                    value={e.amount}
                    set={(val) => { const c = [...extraExpenses]; c[i] = { ...c[i], amount: val }; setExtraExpenses(c); }}
                    className="flex-1"
                  />
                  <select
                    value={e.freq}
                    onChange={(ev) => { const c = [...extraExpenses]; c[i] = { ...c[i], freq: ev.target.value as Frequency }; setExtraExpenses(c); }}
                    className="border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            ))}
            <button type="button" onClick={addExpense} className="text-sm underline">+ Add Expense</button>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={downloadPDF} className="bg-black text-white flex-1 py-3 rounded-lg text-sm">
              Download PDF
            </button>
            <button type="button" onClick={copySummary} className="border px-4 py-3 rounded-lg text-sm">
              {copied ? "Copied!" : "Copy"}
            </button>
            <button type="button" onClick={shareUrl} className="border px-4 py-3 rounded-lg text-sm">
              {shared ? "Copied!" : "Share"}
            </button>
          </div>
        </div>

        {/* STATEMENT CARD */}
        <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <img src="/brand/grid_logo.png" alt="GRID" className="h-7 w-auto" />
              <div className="text-xs text-gray-500">Preliminary Estimate – For Underwriting Purposes Only</div>
            </div>
            <div className="text-xl font-bold tracking-wide">Investment Proforma</div>
            <div className="text-lg font-semibold">{propertyTitle || "Property Analysis"}</div>
          </div>

          <Statement title="Income">
            {units.map((u, i) => (
              <StatementRow key={i} label={u.label} value={format(annualize(num(u.rent), u.freq))} />
            ))}
            <StatementRow label="Gross Income" value={format(grossIncome)} bold />
            <StatementRow label="Vacancy Loss" value={format(vacancyLoss)} />
            <StatementRow label="Effective Gross Income" value={format(effectiveGross)} bold />
          </Statement>

          <Statement title="Operating Expenses">
            <StatementRow label="Taxes" value={format(taxesAnnual)} />
            <StatementRow label="Insurance" value={format(insuranceAnnual)} />
            <StatementRow label="HOA" value={format(hoaAnnual)} />
            <StatementRow label="Management" value={format(management)} />
            <StatementRow label="Maintenance" value={format(maintenance)} />
            {extraExpenses.map((e, i) => (
              <StatementRow key={i} label={e.label} value={format(annualize(num(e.amount), e.freq))} />
            ))}
            <StatementRow label="Total Operating Expenses" value={format(operatingExpenses)} bold />
          </Statement>

          <Statement title="Financing">
            <StatementRow label="Purchase Price" value={format(num(purchasePrice))} />
            <StatementRow label="Down Payment" value={`${format(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`} />
            {!isCash && (
              <>
                <StatementRow label="Interest Rate" value={`${num(interestRate).toFixed(2)}%`} />
                <StatementRow label="Term" value={`${num(termYears)} Years`} />
              </>
            )}
            <StatementRow label="Loan Amount" value={format(loanAmount)} />
            <StatementRow label="Debt Service" value={format(annualDebtService)} />
            <StatementRow label="Equity at Close" value={`${format(equityAmount)} (LTV ${ltv.toFixed(1)}%)`} />
          </Statement>

          <Statement title="Returns">
            <StatementRow label="NOI" value={format(noi)} bold />
            <StatementRow
              label="DSCR"
              value={annualDebtService ? dscr.toFixed(2) : "-"}
              valueClass={annualDebtService ? scoreClass(dscr, 1.1, 1.25) : ""}
            />
            <StatementRow
              label="Cash Flow / yr"
              value={format(cashFlow)}
              bold
              valueClass={scoreClass(cashFlow, 0, 2400)}
            />
            <StatementRow label="Cash Flow / mo" value={format(cashFlow / 12)} />
            <StatementRow
              label="Cap Rate"
              value={`${capRate.toFixed(2)}%`}
              valueClass={scoreClass(capRate, 4, 7)}
            />
            <StatementRow
              label="Cash on Cash"
              value={`${cashOnCash.toFixed(2)}%`}
              valueClass={scoreClass(cashOnCash, 4, 8)}
            />
            <StatementRow
              label="GRM"
              value={grm > 0 ? grm.toFixed(1) : "-"}
              valueClass={grm > 0 ? scoreClass(grm, 8, 12, true) : ""}
            />
            <StatementRow
              label="Break-Even Occupancy"
              value={breakEvenOccupancy > 0 ? `${breakEvenOccupancy.toFixed(1)}%` : "-"}
              valueClass={breakEvenOccupancy > 0 ? scoreClass(breakEvenOccupancy, 70, 85, true) : ""}
            />
          </Statement>

          {/* Benchmark legend */}
          <div className="border rounded-lg p-3 bg-gray-50 space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Benchmarks</div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="text-green-600 font-semibold">Green = Strong</div>
              <div className="text-yellow-600 font-semibold">Yellow = Fair</div>
              <div className="text-red-600 font-semibold">Red = Weak</div>
            </div>
            <div className="text-xs text-gray-500 pt-1 space-y-0.5">
              <div>Cap Rate: &lt;4% red · 4–7% yellow · &gt;7% green</div>
              <div>CoC: &lt;4% red · 4–8% yellow · &gt;8% green</div>
              <div>DSCR: &lt;1.10 red · 1.10–1.25 yellow · &gt;1.25 green</div>
              <div>GRM: &gt;12 red · 8–12 yellow · &lt;8 green</div>
              <div>Break-Even Occ: &gt;85% red · 70–85% yellow · &lt;70% green</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-1">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">{children}</div>
    </div>
  );
}

function GridRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 items-center">
      <div className="text-sm">{label}</div>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}

function SmallRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function NumberInput({ value, set, className = "" }: { value: number | ""; set: (v: number | "") => void; className?: string }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      value={value}
      onChange={(e) => set(e.target.value === "" ? "" : +e.target.value)}
      className={`border rounded-md px-2 py-1 text-sm text-right w-28 ${className}`}
    />
  );
}

function ExpenseRow({ label, value, set, freq, setFreq }: { label: string; value: number | ""; set: (v: number | "") => void; freq: Frequency; setFreq: (v: Frequency) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 items-center">
      <div className="text-sm">{label}</div>
      <div className="flex justify-end gap-2">
        <NumberInput value={value} set={set} />
        <select value={freq} onChange={(e) => setFreq(e.target.value as Frequency)} className="border rounded-md px-2 py-1 text-sm">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
    </div>
  );
}

function Statement({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide">{title}</div>
      <div className="px-3 py-2">{children}</div>
    </div>
  );
}

function StatementRow({ label, value, bold, valueClass = "" }: { label: string; value: string; bold?: boolean; valueClass?: string }) {
  return (
    <div className="flex justify-between py-1 border-b last:border-b-0 text-sm">
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className={`${bold ? "font-semibold" : ""} ${valueClass}`}>{value}</span>
    </div>
  );
}
