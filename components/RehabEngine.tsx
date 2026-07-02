"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

type Strategy = "flip" | "rental";
type FinancingMode = "cash" | "long" | "interest";

type ExtraRow = { id: string; label: string; amount: number };

function money0(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }); }
function money2(n: number) { return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }

const num = (v: number | "") => (v === "" ? 0 : v);
const clamp0 = (n: number) => (n < 0 ? 0 : n);
const round2 = (n: number) => Math.round(n * 100) / 100;

function amortMonthlyPayment(loanAmount: number, annualRatePct: number, termYears: number) {
  if (loanAmount <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  if (r <= 0 || n <= 0) return 0;
  return (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

function amortBalanceAfterMonths(loanAmount: number, annualRatePct: number, termYears: number, months: number) {
  if (loanAmount <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  const k = clamp0(months);
  if (r <= 0 || n <= 0) return loanAmount;
  const pmt = amortMonthlyPayment(loanAmount, annualRatePct, termYears);
  const pow = Math.pow(1 + r, k);
  return clamp0(round2(loanAmount * pow - pmt * ((pow - 1) / r)));
}

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

export default function RehabEngine() {
  const [propertyTitle, setPropertyTitle] = useState("");
  const [strategy, setStrategy] = useState<Strategy>("flip");
  const [originationFee, setOriginationFee] = useState<number | "">(0);
  const [serviceFee, setServiceFee] = useState<number | "">(0);
  const [appraisalFee, setAppraisalFee] = useState<number | "">(0);
  const [titleFees, setTitleFees] = useState<number | "">(0);
  const loanFeesTotal = round2(num(originationFee) + num(serviceFee) + num(appraisalFee) + num(titleFees));

  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const pp = num(purchasePrice);
  const [buyerClosingMode, setBuyerClosingMode] = useState<"percent" | "dollar">("percent");
  const [buyerClosingValue, setBuyerClosingValue] = useState<number | "">(2);
  const [holdMonths, setHoldMonths] = useState<number | "">(4);
  const hm = clamp0(num(holdMonths));
  const [monthlyHolding, setMonthlyHolding] = useState<number | "">(450);

  // MAO / target profit
  const [targetProfit, setTargetProfit] = useState<number | "">(20000);
  const [showMao, setShowMao] = useState(true);

  type RehabLine = { id: string; label: string; amount: number };
  const defaultFlipLines: RehabLine[] = [
    { id: "plans", label: "Plans & Permits", amount: 0 },
    { id: "demo", label: "Demo", amount: 0 },
    { id: "foundation", label: "Foundation", amount: 0 },
    { id: "roof", label: "Roof & Gutters", amount: 0 },
    { id: "exterior", label: "Exterior / Siding", amount: 0 },
    { id: "windows", label: "Windows", amount: 0 },
    { id: "garage", label: "Garage & Driveway", amount: 0 },
    { id: "framing", label: "Framing", amount: 0 },
    { id: "finish", label: "Finish & Carpentry", amount: 0 },
    { id: "sheetrock", label: "Sheetrock & Insulation", amount: 0 },
    { id: "paint", label: "Interior Paint", amount: 0 },
    { id: "flooring", label: "Flooring", amount: 0 },
    { id: "kitchen", label: "Kitchen", amount: 0 },
    { id: "bathrooms", label: "Bathrooms", amount: 0 },
    { id: "plumbing", label: "Plumbing", amount: 0 },
    { id: "electrical", label: "Electrical", amount: 0 },
    { id: "hvac", label: "HVAC", amount: 0 },
    { id: "appliances", label: "Appliances", amount: 0 },
    { id: "yard", label: "Yard / Landscaping", amount: 0 },
  ];

  const [rehabLines, setRehabLines] = useState<RehabLine[]>(defaultFlipLines);
  const [extras, setExtras] = useState<ExtraRow[]>([]);
  const [initialFinancing, setInitialFinancing] = useState<FinancingMode>("long");
  const [initialDownPct, setInitialDownPct] = useState<number | "">(20);
  const [downMode, setDownMode] = useState<"percent" | "dollar">("percent");
  const [initialRate, setInitialRate] = useState<number | "">(9.5);
  const [initialTermYears, setInitialTermYears] = useState<number | "">(30);
  const [includeRehabInLoan, setIncludeRehabInLoan] = useState(false);
  const [arv, setArv] = useState<number | "">("");
  const [saleCostPct, setSaleCostPct] = useState<number | "">(8);
  const [rentMonthly, setRentMonthly] = useState<number | "">(1650);
  const [operatingPct, setOperatingPct] = useState<number | "">(40);
  const [permLtv, setPermLtv] = useState<number | "">(75);
  const [permRate, setPermRate] = useState<number | "">(7.25);
  const [permTermYears, setPermTermYears] = useState<number | "">(30);
  const [fullBathCosts, setFullBathCosts] = useState<number[]>([5000]);
  const [halfBathCosts, setHalfBathCosts] = useState<number[]>([]);
  const [contingencyMode, setContingencyMode] = useState<"percent" | "dollar">("percent");
  const [contingencyInput, setContingencyInput] = useState<number | "">(5);
  const [taxMode, setTaxMode] = useState<"percent" | "dollar">("percent");
  const [insMode, setInsMode] = useState<"percent" | "dollar">("percent");
  const [taxInput, setTaxInput] = useState<number | "">(1.185);
  const [insInput, setInsInput] = useState<number | "">(1.5);

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // URL state
  useEffect(() => {
    const raw = window.location.hash.slice(1);
    const colonIdx = raw.indexOf(":");
    const hash = colonIdx !== -1 ? raw.slice(colonIdx + 1) : raw;
    if (!hash) return;
    try {
      const s = JSON.parse(atob(hash));
      if (s.t !== undefined) setPropertyTitle(s.t);
      if (s.pp !== undefined) setPurchasePrice(s.pp);
      if (s.arv !== undefined) setArv(s.arv);
      if (s.hm !== undefined) setHoldMonths(s.hm);
      if (s.strat !== undefined) setStrategy(s.strat);
    } catch {}
  }, []);

  const shareUrl = () => {
    const s = { t: propertyTitle, pp: purchasePrice, arv, hm: holdMonths, strat: strategy };
    const url = window.location.href.split("#")[0] + "#rehab:" + btoa(JSON.stringify(s));
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Calculations
  const buyerClosingCosts = useMemo(() => {
    if (!pp) return 0;
    if (buyerClosingMode === "percent") return round2(pp * (num(buyerClosingValue) / 100));
    return clamp0(num(buyerClosingValue));
  }, [pp, buyerClosingMode, buyerClosingValue]);

  const rehabBase = useMemo(() => (
    rehabLines.reduce((sum, l) => sum + (l.amount || 0), 0) + extras.reduce((sum, e) => sum + (e.amount || 0), 0)
  ), [rehabLines, extras]);

  const bathroomRehab = useMemo(() => {
    const full = fullBathCosts.reduce((sum, v) => sum + num(v), 0);
    const half = halfBathCosts.reduce((sum, v) => sum + num(v), 0);
    return round2(full + half);
  }, [fullBathCosts, halfBathCosts]);

  const contingencyAmount = useMemo(() => {
    if (contingencyMode === "percent") return round2(rehabBase * (num(contingencyInput) / 100));
    return clamp0(num(contingencyInput));
  }, [rehabBase, contingencyMode, contingencyInput]);

  const rehabTotal = useMemo(() => round2(rehabBase + bathroomRehab + contingencyAmount), [rehabBase, bathroomRehab, contingencyAmount]);
  const holdingTotal = useMemo(() => round2(hm * clamp0(num(monthlyHolding))), [hm, monthlyHolding]);
  const totalProjectCostBeforeInterest = useMemo(() => round2(pp + buyerClosingCosts + rehabTotal + holdingTotal), [pp, buyerClosingCosts, rehabTotal, holdingTotal]);

  const initialDownPayment = useMemo(() => {
    if (initialFinancing === "cash") return pp;
    if (downMode === "percent") return round2(pp * (num(initialDownPct) / 100));
    return clamp0(num(initialDownPct));
  }, [initialFinancing, pp, initialDownPct, downMode]);

  const initialLoanAmount = useMemo(() => {
    if (initialFinancing === "cash") return 0;
    const baseLoan = clamp0(round2(pp - initialDownPayment));
    return includeRehabInLoan ? round2(baseLoan + rehabTotal) : baseLoan;
  }, [initialFinancing, pp, initialDownPayment, includeRehabInLoan, rehabTotal]);

  const initialMonthlyPmt = useMemo(() => {
    if (initialFinancing === "cash") return 0;
    if (initialFinancing === "interest") return round2(initialLoanAmount * (num(initialRate) / 100 / 12));
    return round2(amortMonthlyPayment(initialLoanAmount, num(initialRate), num(initialTermYears)));
  }, [initialFinancing, initialLoanAmount, initialRate, initialTermYears]);

  const initialBalanceAfterHold = useMemo(() => {
    if (initialFinancing === "cash") return 0;
    if (initialFinancing === "interest") return initialLoanAmount;
    return amortBalanceAfterMonths(initialLoanAmount, num(initialRate), num(initialTermYears), hm);
  }, [initialFinancing, initialLoanAmount, initialRate, initialTermYears, hm]);

  const totalPaidDuringHold = useMemo(() => initialFinancing === "cash" ? 0 : round2(initialMonthlyPmt * hm), [initialFinancing, initialMonthlyPmt, hm]);
  const principalPaidDuringHold = useMemo(() => initialFinancing === "cash" ? 0 : round2(initialLoanAmount - initialBalanceAfterHold), [initialFinancing, initialLoanAmount, initialBalanceAfterHold]);
  const interestPaidDuringHold = useMemo(() => {
    if (initialFinancing === "cash") return 0;
    if (initialFinancing === "interest") return round2(initialLoanAmount * (num(initialRate) / 100 / 12) * hm);
    return clamp0(round2(totalPaidDuringHold - principalPaidDuringHold));
  }, [initialFinancing, initialLoanAmount, initialRate, hm, totalPaidDuringHold, principalPaidDuringHold]);

  const totalCashInvested = useMemo(() => {
    const downLike = initialFinancing === "cash" ? pp : initialDownPayment;
    return round2(downLike + buyerClosingCosts + loanFeesTotal + rehabTotal + holdingTotal + interestPaidDuringHold);
  }, [initialFinancing, initialDownPayment, pp, buyerClosingCosts, loanFeesTotal, rehabTotal, holdingTotal, interestPaidDuringHold]);

  const arvNum = num(arv);
  const saleCosts = useMemo(() => strategy !== "flip" || arvNum <= 0 ? 0 : round2(arvNum * (num(saleCostPct) / 100)), [strategy, arvNum, saleCostPct]);
  const payoffAtSale = useMemo(() => strategy !== "flip" || initialFinancing === "cash" ? 0 : round2(initialBalanceAfterHold), [strategy, initialFinancing, initialBalanceAfterHold]);

  const flipProfit = useMemo(() => {
    if (strategy !== "flip" || arvNum <= 0) return 0;
    const netCashAtSale = arvNum - saleCosts - payoffAtSale;
    return round2(netCashAtSale - totalCashInvested);
  }, [strategy, arvNum, saleCosts, payoffAtSale, totalCashInvested]);

  const flipRoi = useMemo(() => {
    if (strategy !== "flip" || totalCashInvested <= 0) return 0;
    return round2((flipProfit / totalCashInvested) * 100);
  }, [strategy, flipProfit, totalCashInvested]);

  // Annualized ROI
  const flipRoiAnnualized = useMemo(() => {
    if (strategy !== "flip" || totalCashInvested <= 0 || hm <= 0) return 0;
    return round2((flipProfit / totalCashInvested) * (12 / hm) * 100);
  }, [strategy, flipProfit, totalCashInvested, hm]);

  // MAO calculations
  const quickMao = useMemo(() => arvNum > 0 ? round2(arvNum * 0.70 - rehabTotal) : 0, [arvNum, rehabTotal]);
  const targetMao = useMemo(() => {
    if (arvNum <= 0 || !targetProfit) return 0;
    // MAO = ARV - sale costs - target profit - rehab - holding - closing costs
    const estSaleCosts = round2(arvNum * (num(saleCostPct) / 100));
    return round2(arvNum - estSaleCosts - num(targetProfit) - rehabTotal - holdingTotal - buyerClosingCosts - loanFeesTotal - interestPaidDuringHold);
  }, [arvNum, targetProfit, saleCostPct, rehabTotal, holdingTotal, buyerClosingCosts, loanFeesTotal, interestPaidDuringHold]);

  // Rental math
  const basisForRefi = useMemo(() => arvNum > 0 ? arvNum : totalProjectCostBeforeInterest, [arvNum, totalProjectCostBeforeInterest]);
  const permLoanAmount = useMemo(() => strategy !== "rental" ? 0 : round2(basisForRefi * (num(permLtv) / 100)), [strategy, basisForRefi, permLtv]);
  const permMonthlyPmt = useMemo(() => strategy !== "rental" ? 0 : round2(amortMonthlyPayment(permLoanAmount, num(permRate), num(permTermYears))), [strategy, permLoanAmount, permRate, permTermYears]);
  const grossRentAnnual = useMemo(() => strategy !== "rental" ? 0 : round2(clamp0(num(rentMonthly)) * 12), [strategy, rentMonthly]);

  const annualTaxes = useMemo(() => taxMode === "percent" ? round2(basisForRefi * (num(taxInput) / 100)) : clamp0(num(taxInput)), [basisForRefi, taxMode, taxInput]);
  const annualInsurance = useMemo(() => insMode === "percent" ? round2(basisForRefi * (num(insInput) / 100)) : clamp0(num(insInput)), [basisForRefi, insMode, insInput]);
  const operatingExpensesAnnual = useMemo(() => strategy !== "rental" ? 0 : round2(grossRentAnnual * (num(operatingPct) / 100) + annualTaxes + annualInsurance), [strategy, grossRentAnnual, operatingPct, annualTaxes, annualInsurance]);
  const noi = useMemo(() => strategy !== "rental" ? 0 : round2(grossRentAnnual - operatingExpensesAnnual), [strategy, grossRentAnnual, operatingExpensesAnnual]);
  const debtServiceAnnual = useMemo(() => strategy !== "rental" ? 0 : round2(permMonthlyPmt * 12), [strategy, permMonthlyPmt]);
  const cashFlowAnnual = useMemo(() => strategy !== "rental" ? 0 : round2(noi - debtServiceAnnual), [strategy, noi, debtServiceAnnual]);
  const capRate = useMemo(() => {
    if (strategy !== "rental") return 0;
    const denom = totalProjectCostBeforeInterest || 0;
    return denom <= 0 ? 0 : round2((noi / denom) * 100);
  }, [strategy, noi, totalProjectCostBeforeInterest]);
  const cocReturn = useMemo(() => {
    if (strategy !== "rental" || totalCashInvested <= 0) return 0;
    return round2((cashFlowAnnual / totalCashInvested) * 100);
  }, [strategy, cashFlowAnnual, totalCashInvested]);

  // Copy summary
  const copySummary = () => {
    const lines = [
      "GRID Rehab Underwriting",
      propertyTitle ? `Property: ${propertyTitle}` : "",
      `Strategy: ${strategy === "flip" ? "Flip" : "Rental"}`,
      "---",
      `Purchase Price: ${money0(pp)}`,
      `Rehab Total: ${money0(rehabTotal)}`,
      `Holding Total: ${money0(holdingTotal)}`,
      `Total Cash Invested: ${money0(totalCashInvested)}`,
      `Total Project Cost: ${money0(totalProjectCostBeforeInterest)}`,
      "---",
      ...(strategy === "flip" ? [
        `ARV: ${money0(arvNum)}`,
        `Sale Costs (${num(saleCostPct)}%): ${money0(saleCosts)}`,
        `Projected Profit: ${money0(flipProfit)}`,
        `ROI: ${flipRoi.toFixed(2)}%`,
        `Annualized ROI: ${flipRoiAnnualized.toFixed(2)}%`,
        "---",
        `70% Rule MAO: ${money0(quickMao)}`,
        `Target Profit MAO: ${money0(targetMao)} (target: ${money0(num(targetProfit))})`,
      ] : [
        `Monthly Rent: ${money0(num(rentMonthly))}`,
        `NOI: ${money0(noi)}`,
        `Cash Flow: ${money0(cashFlowAnnual)}/yr`,
        `Cap Rate: ${capRate.toFixed(2)}%`,
        `Cash-on-Cash: ${cocReturn.toFixed(2)}%`,
      ]),
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("GRID – Rehab Underwriting Summary", 14, 15);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    let y = 25;
    const line = (label: string, value: string) => {
      pdf.text(label, 14, y);
      pdf.text(value, 190, y, { align: "right" });
      y += 6;
    };
    line("Property", propertyTitle || "-");
    line("Strategy", strategy === "flip" ? "Flip" : "Keep as Rental");
    line("Purchase", money0(pp));
    line("Rehab", money0(rehabTotal));
    line("Holding", money0(holdingTotal));
    line("Cash Invested", money0(totalCashInvested));
    y += 4;
    if (strategy === "flip") {
      line("ARV", money0(arvNum));
      line("Sale Costs", money0(saleCosts));
      line("Projected Profit", money0(flipProfit));
      line("ROI", `${flipRoi.toFixed(2)}%`);
      line("Annualized ROI", `${flipRoiAnnualized.toFixed(2)}%`);
      y += 4;
      line("70% Rule MAO", money0(quickMao));
      line("Target Profit MAO", money0(targetMao));
    }
    if (strategy === "rental") {
      line("Gross Rent (annual)", money0(grossRentAnnual));
      line("NOI", money0(noi));
      line("Cap Rate", `${capRate.toFixed(2)}%`);
      line("Cash-on-Cash", `${cocReturn.toFixed(2)}%`);
    }
    y += 12;
    pdf.line(14, y, 190, y);
    y += 10;
    pdf.text("Investor Signature: _______________________________", 14, y);
    y += 10;
    pdf.text("Date: ___________________", 14, y);
    pdf.save("grid-rehab-underwriting.pdf");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
          <div>
            <div className="text-2xl font-bold">Rehab / Offer Underwriting</div>
            <div className="text-sm text-gray-500">Quick offer math + Flip vs Rental</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={copySummary} className="border px-3 py-2 rounded-xl text-sm">{copied ? "Copied!" : "Copy"}</button>
          <button onClick={shareUrl} className="border px-3 py-2 rounded-xl text-sm">{shared ? "Copied!" : "Share"}</button>
          <button onClick={downloadPDF} className="border px-4 py-2 rounded-xl text-sm">PDF</button>
        </div>
      </div>

      {/* Property + Strategy */}
      <div className="border rounded-2xl p-4 space-y-4">
        <Field label="Property Address / Title">
          <input value={propertyTitle} onChange={(e) => setPropertyTitle(e.target.value)} placeholder="123 Main Street Norman, OK" className="border rounded-xl px-3 py-2 w-full" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-xl p-3">
            <div className="text-xs font-semibold uppercase text-gray-500 mb-2">Strategy</div>
            <div className="flex gap-2">
              <button onClick={() => setStrategy("flip")} className={`px-3 py-2 rounded-xl text-sm w-full ${strategy === "flip" ? "bg-black text-white" : "border"}`}>Flip</button>
              <button onClick={() => setStrategy("rental")} className={`px-3 py-2 rounded-xl text-sm w-full ${strategy === "rental" ? "bg-black text-white" : "border"}`}>Keep as Rental</button>
            </div>
          </div>
          <div className="border rounded-xl p-3">
            <div className="text-xs font-semibold uppercase text-gray-500 mb-2">Holding Period</div>
            <FieldInline label="Months"><NumberInput value={holdMonths} set={setHoldMonths} placeholder="4" /></FieldInline>
          </div>
        </div>
      </div>

      {/* Acquisition */}
      <div className="border rounded-2xl p-4 space-y-4">
        <div className="text-sm font-semibold">Acquisition</div>
        <Field label="Purchase Price"><NumberInput value={purchasePrice} set={setPurchasePrice} unit="$" /></Field>
        <div className="border rounded-xl p-3 bg-gray-50 space-y-2">
          <div className="text-xs font-semibold uppercase text-gray-500">Loan &amp; Closing Costs</div>
          <FieldInline label="Origination Fee"><NumberInput value={originationFee} set={setOriginationFee} unit="$" /></FieldInline>
          <FieldInline label="Service Fee"><NumberInput value={serviceFee} set={setServiceFee} unit="$" /></FieldInline>
          <FieldInline label="Appraisal"><NumberInput value={appraisalFee} set={setAppraisalFee} unit="$" /></FieldInline>
          <FieldInline label="Title / Escrow"><NumberInput value={titleFees} set={setTitleFees} unit="$" /></FieldInline>
          <Line label="Total Closing Costs" value={money0(loanFeesTotal)} />
        </div>
      </div>

      {/* Initial financing */}
      <div className="border rounded-2xl p-4 space-y-4">
        <div className="text-sm font-semibold">Initial Financing</div>
        <Field label="Financing">
          <select value={initialFinancing} onChange={(e) => setInitialFinancing(e.target.value as FinancingMode)} className="border rounded-xl px-3 py-2 w-full">
            <option value="cash">Cash</option>
            <option value="long">Long-Term Loan</option>
            <option value="interest">Interest Only Loan</option>
          </select>
        </Field>
        {initialFinancing !== "cash" && (
          <>
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={includeRehabInLoan} onChange={(e) => setIncludeRehabInLoan(e.target.checked)} />
              <span>Include Rehab Budget in Loan</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <FieldInline label="Down">
                <NumberInput value={initialDownPct} set={setInitialDownPct} unit={downMode === "percent" ? "%" : "$"} />
              </FieldInline>
              <FieldInline label="Rate %"><NumberInput value={initialRate} set={setInitialRate} placeholder="9.5" /></FieldInline>
              <FieldInline label="Term yrs"><NumberInput value={initialTermYears} set={setInitialTermYears} placeholder="30" /></FieldInline>
            </div>
            <div className="flex gap-2">
              <div className="flex border rounded-xl overflow-hidden">
                <button type="button" onClick={() => setDownMode("percent")} className={`px-3 py-1 text-sm ${downMode === "percent" ? "bg-black text-white" : "bg-white"}`}>%</button>
                <button type="button" onClick={() => setDownMode("dollar")} className={`px-3 py-1 text-sm ${downMode === "dollar" ? "bg-black text-white" : "bg-white"}`}>$</button>
              </div>
            </div>
          </>
        )}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Line label={initialFinancing === "cash" ? "Cash Purchase" : "Down Payment"} value={money0(initialFinancing === "cash" ? pp : initialDownPayment)} />
          <Line label="Loan Amount" value={money0(initialLoanAmount)} />
        </div>
        {initialFinancing !== "cash" && (
          <div className="border rounded-xl p-3 bg-gray-50 space-y-2">
            <Line label={initialFinancing === "interest" ? "Monthly Payment (interest only)" : "Monthly Payment (amortizing)"} value={money0(initialMonthlyPmt)} />
            <Line label="Interest During Hold (approx)" value={money0(interestPaidDuringHold)} />
            <Line label="Balance at Sale / Refi (approx)" value={money0(initialBalanceAfterHold)} />
          </div>
        )}
      </div>

      {/* Rehab Budget */}
      <div className="border rounded-2xl p-4 space-y-4">
        <div className="text-sm font-semibold">Rehab Budget</div>
        {rehabLines.map((line) => (
          <div key={line.id} className="grid grid-cols-5 gap-2 items-center">
            {line.id === "bathrooms" ? (
              <>
                <div className="col-span-3 space-y-3">
                  <div className="text-sm font-medium">Bathrooms</div>
                  <div className="space-y-2">
                    {fullBathCosts.map((cost, i) => (
                      <div key={`full-${i}`} className="flex gap-2 items-center">
                        <span className="text-xs w-12">Full</span>
                        <NumberInput value={cost} unit="$" set={(v) => { const u = [...fullBathCosts]; u[i] = typeof v === "number" ? v : 0; setFullBathCosts(u); }} />
                        <button type="button" onClick={() => setFullBathCosts(fullBathCosts.filter((_, idx) => idx !== i))} className="text-xs text-red-500">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setFullBathCosts([...fullBathCosts, 9000])} className="text-xs px-2 py-1 border rounded-lg">+ Full</button>
                    {halfBathCosts.map((cost, i) => (
                      <div key={`half-${i}`} className="flex gap-2 items-center">
                        <span className="text-xs w-12">Half</span>
                        <NumberInput value={cost} unit="$" set={(v) => { const u = [...halfBathCosts]; u[i] = typeof v === "number" ? v : 0; setHalfBathCosts(u); }} />
                        <button type="button" onClick={() => setHalfBathCosts(halfBathCosts.filter((_, idx) => idx !== i))} className="text-xs text-red-500">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setHalfBathCosts([...halfBathCosts, 2500])} className="text-xs px-2 py-1 border rounded-lg">+ Half</button>
                  </div>
                </div>
                <div className="col-span-2 text-sm font-semibold text-right">{money0(bathroomRehab)}</div>
              </>
            ) : (
              <>
                <div className="col-span-3 text-sm">{line.label}</div>
                <NumberInput value={line.amount} unit="$" set={(v) => setRehabLines((prev) => prev.map((l) => l.id === line.id ? { ...l, amount: typeof v === "number" ? v : 0 } : l))} />
                <div className="text-sm font-semibold text-right">{money0(line.amount)}</div>
              </>
            )}
          </div>
        ))}

        <div className="border-t pt-3 space-y-2">
          <div className="text-xs font-semibold uppercase text-gray-500">Custom Items</div>
          {extras.map((row) => (
            <div key={row.id} className="grid grid-cols-5 gap-2 items-center">
              <input value={row.label} onChange={(e) => setExtras((prev) => prev.map((r) => r.id === row.id ? { ...r, label: e.target.value } : r))} className="border rounded-xl px-2 py-2 col-span-3" placeholder="Custom Item" />
              <NumberInput value={row.amount} unit="$" set={(v) => setExtras((prev) => prev.map((r) => r.id === row.id ? { ...r, amount: typeof v === "number" ? v : 0 } : r))} />
            </div>
          ))}
          <button onClick={() => setExtras((prev) => [...prev, { id: crypto.randomUUID(), label: "", amount: 0 }])} className="text-sm underline">+ Add Custom Item</button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm">Contingency</span>
          <NumberInput value={contingencyInput} set={setContingencyInput} unit={contingencyMode === "percent" ? "%" : "$"} />
          <div className="flex border rounded-xl overflow-hidden">
            <button type="button" onClick={() => setContingencyMode("percent")} className={`px-3 py-1 text-sm ${contingencyMode === "percent" ? "bg-black text-white" : "bg-white"}`}>%</button>
            <button type="button" onClick={() => setContingencyMode("dollar")} className={`px-3 py-1 text-sm ${contingencyMode === "dollar" ? "bg-black text-white" : "bg-white"}`}>$</button>
          </div>
        </div>
        <div className="pt-2 border-t flex justify-between font-semibold">
          <span>Total Rehab</span>
          <span>{money0(rehabTotal)}</span>
        </div>
      </div>

      {/* Holding */}
      <div className="border rounded-2xl p-4 space-y-3">
        <div className="text-sm font-semibold">Holding</div>
        <Field label="Monthly Holding Cost (utilities, taxes, insurance, lawn, etc.)">
          <NumberInput value={monthlyHolding} set={setMonthlyHolding} />
        </Field>
        <Line label="Holding Total (calculated)" value={money0(holdingTotal)} />
      </div>

      {/* Project summary */}
      <div className="border rounded-2xl p-4 space-y-2">
        <div className="text-sm font-semibold">Project Summary</div>
        <Line label="Purchase Price" value={money0(pp)} />
        <Line label="Buyer Closing Costs" value={money0(buyerClosingCosts)} />
        <Line label="Rehab Total" value={money0(rehabTotal)} />
        <Line label="Holding Total" value={money0(holdingTotal)} />
        <Line label="ARV / Appraisal" value={money0(arvNum)} />
        <Line label="Total Cash Invested" value={money0(totalCashInvested)} />
        <Line label="Total Project Cost (before interest)" value={money0(totalProjectCostBeforeInterest)} />
      </div>

      {/* Flip section */}
      {strategy === "flip" && (
        <div className="border rounded-2xl p-4 space-y-4">
          <div className="text-sm font-semibold">Flip Exit</div>
          <Field label="After Repair Value (ARV)"><NumberInput value={arv} set={setArv} placeholder="240000" /></Field>
          <Field label="Sale Costs % (commissions + seller closing)"><NumberInput value={saleCostPct} set={setSaleCostPct} unit="%" /></Field>

          <div className="border rounded-xl p-3 bg-gray-50 space-y-2">
            <Line label="Sale Costs (calculated)" value={money0(saleCosts)} />
            <Line label="Loan Payoff at Sale (approx)" value={money0(payoffAtSale)} />
            <div className="pt-2 border-t">
              <div className="flex justify-between font-semibold text-lg">
                <span>Projected Profit</span>
                <span className={flipProfit >= 0 ? "text-green-600" : "text-red-600"}>{money0(flipProfit)}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>ROI on Cash Invested</span>
              <span className={flipRoi > 0 ? scoreClass(flipRoi, 10, 20) : "text-red-600"}>{flipRoi.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Annualized ROI</span>
              <span className={flipRoiAnnualized > 0 ? scoreClass(flipRoiAnnualized, 15, 30) : "text-red-600"}>{flipRoiAnnualized.toFixed(2)}% / yr</span>
            </div>
          </div>

          {/* MAO Section */}
          <div className="border-t pt-4 space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={showMao} onChange={(e) => setShowMao(e.target.checked)} />
              Show MAO Calculator
            </label>
            {showMao && (
              <div className="border rounded-xl p-3 bg-amber-50 space-y-3">
                <div className="text-xs font-semibold uppercase text-amber-700">Maximum Allowable Offer</div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>70% Rule MAO</span>
                    <span className="font-mono">{arvNum > 0 ? money0(quickMao) : "-"}</span>
                  </div>
                  <div className="text-xs text-amber-700">(ARV × 70%) − Rehab = {arvNum > 0 ? `${money0(round2(arvNum * 0.70))} − ${money0(rehabTotal)}` : "enter ARV above"}</div>
                </div>

                <div className="border-t border-amber-200 pt-3 space-y-2">
                  <div className="text-xs font-semibold text-amber-700 uppercase">Target Profit MAO</div>
                  <Field label="Target Profit ($)">
                    <NumberInput value={targetProfit} set={setTargetProfit} unit="$" placeholder="20000" />
                  </Field>
                  <div className="flex justify-between text-sm font-semibold pt-1">
                    <span>MAO to hit target</span>
                    <span className={targetMao > 0 ? "text-green-700" : "text-red-600"} >{arvNum > 0 ? money0(targetMao) : "-"}</span>
                  </div>
                  <div className="text-xs text-amber-700">
                    Backs out: sale costs + target profit + rehab + holding + interest
                  </div>
                </div>

                <div className="border-t border-amber-200 pt-3">
                  <div className="text-xs text-amber-700">
                    Current offer ({money0(pp)}) vs 70% MAO ({arvNum > 0 ? money0(quickMao) : "-"}):
                    {arvNum > 0 && pp > 0 && (
                      <span className={pp <= quickMao ? " text-green-700 font-semibold" : " text-red-700 font-semibold"}>
                        {pp <= quickMao ? ` ✓ Under by ${money0(quickMao - pp)}` : ` ✗ Over by ${money0(pp - quickMao)}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rental section */}
      {strategy === "rental" && (
        <div className="border rounded-2xl p-4 space-y-4">
          <div className="text-sm font-semibold">Keep as Rental</div>
          <Field label="Estimated ARV / Appraised Value"><NumberInput value={arv} set={setArv} unit="$" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <FieldInline label="Monthly Rent"><NumberInput value={rentMonthly} set={setRentMonthly} unit="$" /></FieldInline>
            <FieldInline label="OpEx % (simplified)"><NumberInput value={operatingPct} set={setOperatingPct} unit="%" /></FieldInline>
          </div>

          <div className="border rounded-xl p-3 space-y-3">
            <div className="text-xs font-semibold uppercase text-gray-500">Permanent Financing (refi / long-term)</div>
            <div className="grid grid-cols-3 gap-3">
              <FieldInline label="LTV %"><NumberInput value={permLtv} set={setPermLtv} unit="%" /></FieldInline>
              <FieldInline label="Rate %"><NumberInput value={permRate} set={setPermRate} unit="%" /></FieldInline>
              <FieldInline label="Term yrs"><NumberInput value={permTermYears} set={setPermTermYears} /></FieldInline>
            </div>
            <Line label="Refi Basis (ARV if set)" value={money0(basisForRefi)} />
            <Line label="Permanent Loan Amount" value={money0(permLoanAmount)} />
            <Line label="Monthly P&I" value={money0(permMonthlyPmt)} />
          </div>

          <div className="border rounded-xl p-3 bg-gray-50 space-y-2">
            <Line label="Gross Rent (annual)" value={money0(grossRentAnnual)} />
            <Line label="Operating Expenses (annual)" value={money0(operatingExpensesAnnual)} />
            <Line label="NOI (annual)" value={money0(noi)} />
            <Line label="Debt Service (annual)" value={money0(debtServiceAnnual)} />
            <div className="pt-2 border-t">
              <div className="flex justify-between font-semibold">
                <span>Cash Flow (annual)</span>
                <span className={cashFlowAnnual >= 0 ? "text-green-600" : "text-red-600"}>{money0(cashFlowAnnual)}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cap Rate (on total cost)</span>
              <span className={capRate > 0 ? scoreClass(capRate, 4, 7) : ""}>{capRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cash-on-Cash (on cash invested)</span>
              <span className={cocReturn > 0 ? scoreClass(cocReturn, 4, 8) : ""}>{cocReturn.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold uppercase text-gray-500">{label}</div>
      {children}
    </div>
  );
}

function FieldInline({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl p-3">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      {children}
    </div>
  );
}

function NumberInput({ value, set, placeholder, unit }: { value: number | ""; set: (v: number | "") => void; placeholder?: string; unit?: string }) {
  return (
    <div className="relative">
      <input type="number" inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => set(e.target.value === "" ? "" : +e.target.value)} className="border rounded-xl px-3 py-2 w-full pr-10" />
      {unit ? <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{unit}</div> : null}
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <div className="text-gray-700">{label}</div>
      <div className="font-medium whitespace-nowrap">{value}</div>
    </div>
  );
}
