// components/MortgageEngine.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

type LoanMode = "amortizing" | "balloon";

type ScheduleRow = {
  monthIndex: number;
  yearIndex: number;
  payment: number;
  interest: number;
  principal: number;
  extraPrincipal: number;
  totalPrincipal: number;
  balance: number;
};

export default function MortgageEngine() {
  const num = (v: number | "") => (v === "" ? 0 : v);
  const formatMoney = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  const formatMoney0 = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const clampNonNeg = (n: number) => (n < 0 ? 0 : n);
  const round2 = (n: number) => Math.round(n * 100) / 100;

  // Scenario A state
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<LoanMode>("amortizing");
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [downPercent, setDownPercent] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [termYears, setTermYears] = useState<number | "">("");
  const [amortYears, setAmortYears] = useState<number | "">("");
  const [balloonYears, setBalloonYears] = useState<number | "">("");
  const [extraPrincipalMonthly, setExtraPrincipalMonthly] = useState<number | ">">("");
  const [useExtraPrincipal, setUseExtraPrincipal] = useState(false);
  const [showAmort, setShowAmort] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>({});

  // Scenario B state
  const [showComparison, setShowComparison] = useState(false);
  const [bRate, setBRate] = useState<number | "">("");
  const [bAmortYears, setBAmortYears] = useState<number | "">("");
  const [bDownPercent, setBDownPercent] = useState<number | "">("");
  const [bMode, setBMode] = useState<LoanMode>("amortizing");
  const [bBalloonYears, setBBalloonYears] = useState<number | "">("");

  // Refi break-even
  const [showRefi, setShowRefi] = useState(false);
  const [refiRate, setRefiRate] = useState<number | "">("");
  const [refiClosingCosts, setRefiClosingCosts] = useState<number | "">("");

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    try {
      const s = JSON.parse(atob(hash));
      if (s.t !== undefined) setTitle(s.t);
      if (s.pp !== undefined) setPurchasePrice(s.pp);
      if (s.dp !== undefined) setDownPercent(s.dp);
      if (s.ir !== undefined) setInterestRate(s.ir);
      if (s.ty !== undefined) setTermYears(s.ty);
      if (s.ay !== undefined) setAmortYears(s.ay);
      if (s.by !== undefined) setBalloonYears(s.by);
      if (s.mode !== undefined) setMode(s.mode);
    } catch {}
  }, []);

  // Scenario A derived
  const downPaymentAmount = useMemo(() => {
    const pp = num(purchasePrice);
    const dp = num(downPercent) / 100;
    if (pp <= 0) return 0;
    return pp * dp;
  }, [purchasePrice, downPercent]);

  const loanAmount = useMemo(() => clampNonNeg(num(purchasePrice) - downPaymentAmount), [purchasePrice, downPaymentAmount]);
  const monthlyRate = useMemo(() => num(interestRate) / 100 / 12, [interestRate]);

  const amortYearsEff = useMemo(() => {
    const a = num(amortYears);
    if (a > 0) return a;
    const t = num(termYears);
    if (t > 0) return t;
    return 30;
  }, [amortYears, termYears]);

  const termYearsEff = useMemo(() => {
    const t = num(termYears);
    if (t > 0) return t;
    return mode === "balloon" ? num(balloonYears) || 5 : amortYearsEff;
  }, [termYears, mode, balloonYears, amortYearsEff]);

  const balloonYearsEff = useMemo(() => { const b = num(balloonYears); return b > 0 ? b : 5; }, [balloonYears]);
  const balloonMonths = balloonYearsEff * 12;
  const amortMonths = amortYearsEff * 12;

  const basePayment = useMemo(() => {
    const L = loanAmount;
    if (L <= 0) return 0;
    const r = monthlyRate;
    const n = amortMonths;
    if (n <= 0) return 0;
    if (r === 0) return round2(L / n);
    return round2((L * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1));
  }, [loanAmount, monthlyRate, amortMonths]);

  const extraP = useMemo(() => (!useExtraPrincipal ? 0 : clampNonNeg(num(extraPrincipalMonthly as number | ""))), [extraPrincipalMonthly, useExtraPrincipal]);
  const paymentWithExtra = round2(basePayment + extraP);

  const schedule = useMemo(() => {
    const rows: ScheduleRow[] = [];
    const L0 = loanAmount;
    if (L0 <= 0) return rows;
    const r = monthlyRate;
    const n = amortMonths;
    if (n <= 0) return rows;
    const stopAtMonths = mode === "balloon" ? balloonMonths : n;
    let balance = L0;
    for (let m = 1; m <= stopAtMonths; m++) {
      if (balance < 1) { balance = 0; break; }
      const interest = round2(balance * r);
      let principal = round2(basePayment - interest);
      if (principal < 0) principal = 0;
      if (principal > balance) principal = balance;
      let extraPrincipal = extraP;
      const remainingAfterBase = round2(balance - principal);
      if (extraPrincipal > remainingAfterBase) extraPrincipal = remainingAfterBase;
      let totalPrincipal = round2(principal + extraPrincipal);
      let actualPayment = round2(interest + totalPrincipal);
      if (mode === "balloon" && m === stopAtMonths) {
        totalPrincipal = balance;
        principal = balance;
        extraPrincipal = 0;
        actualPayment = round2(interest + balance);
        balance = 0;
      } else {
        balance = round2(balance - totalPrincipal);
        if (balance < 1) balance = 0;
      }
      rows.push({ monthIndex: m, yearIndex: Math.ceil(m / 12), payment: actualPayment, interest, principal, extraPrincipal, totalPrincipal, balance });
    }
    return rows;
  }, [loanAmount, monthlyRate, amortMonths, mode, balloonMonths, basePayment, extraP]);

  const payoffMonthCount = schedule.length;
  const totalPaid = useMemo(() => round2(schedule.reduce((s, r) => s + r.payment, 0)), [schedule]);
  const totalInterest = useMemo(() => round2(schedule.reduce((s, r) => s + r.interest, 0)), [schedule]);
  const totalPrincipalPaid = useMemo(() => round2(schedule.reduce((s, r) => s + r.totalPrincipal, 0)), [schedule]);
  const endingBalanceRaw = schedule.length ? schedule[schedule.length - 1].balance : loanAmount;
  const endingBalance = endingBalanceRaw < 1 ? 0 : endingBalanceRaw;
  const balloonPayoff = useMemo(() => {
    if (mode !== "balloon" || schedule.length === 0) return 0;
    return round2(schedule[schedule.length - 1].payment);
  }, [mode, schedule]);
  const annualDebtServiceBase = round2(basePayment * 12);
  const annualDebtServiceWithExtra = round2(paymentWithExtra * 12);

  // Scenario B derived
  const bDownAmt = useMemo(() => {
    const pp = num(purchasePrice);
    const dp = num(bDownPercent) / 100;
    return pp > 0 ? pp * dp : downPaymentAmount;
  }, [purchasePrice, bDownPercent, downPaymentAmount]);

  const bLoanAmount = useMemo(() => clampNonNeg(num(purchasePrice) - bDownAmt), [purchasePrice, bDownAmt]);

  const bAmortYearsEff = useMemo(() => {
    const a = num(bAmortYears);
    return a > 0 ? a : amortYearsEff;
  }, [bAmortYears, amortYearsEff]);

  const bAmortMonths = bAmortYearsEff * 12;
  const bMonthlyRate = useMemo(() => num(bRate) / 100 / 12, [bRate]);

  const bBasePayment = useMemo(() => {
    const L = bLoanAmount;
    if (L <= 0) return 0;
    const r = bMonthlyRate;
    const n = bAmortMonths;
    if (n <= 0) return 0;
    if (r === 0) return round2(L / n);
    return round2((L * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1));
  }, [bLoanAmount, bMonthlyRate, bAmortMonths]);

  const bBalloonYearsEff = useMemo(() => { const b = num(bBalloonYears); return b > 0 ? b : 5; }, [bBalloonYears]);

  const bSchedule = useMemo(() => {
    const rows: ScheduleRow[] = [];
    const L0 = bLoanAmount;
    if (L0 <= 0) return rows;
    const r = bMonthlyRate;
    const n = bAmortMonths;
    if (n <= 0) return rows;
    const stopAtMonths = bMode === "balloon" ? bBalloonYearsEff * 12 : n;
    let balance = L0;
    for (let m = 1; m <= stopAtMonths; m++) {
      if (balance < 1) { balance = 0; break; }
      const interest = round2(balance * r);
      let principal = round2(bBasePayment - interest);
      if (principal < 0) principal = 0;
      if (principal > balance) principal = balance;
      const totalPrincipal = principal;
      const actualPayment = round2(interest + totalPrincipal);
      if (bMode === "balloon" && m === stopAtMonths) {
        balance = 0;
      } else {
        balance = round2(balance - totalPrincipal);
        if (balance < 1) balance = 0;
      }
      rows.push({ monthIndex: m, yearIndex: Math.ceil(m / 12), payment: actualPayment, interest, principal, extraPrincipal: 0, totalPrincipal, balance });
    }
    return rows;
  }, [bLoanAmount, bMonthlyRate, bAmortMonths, bMode, bBalloonYearsEff, bBasePayment]);

  const bTotalPaid = useMemo(() => round2(bSchedule.reduce((s, r) => s + r.payment, 0)), [bSchedule]);
  const bTotalInterest = useMemo(() => round2(bSchedule.reduce((s, r) => s + r.interest, 0)), [bSchedule]);
  const bBalloonPayoff = useMemo(() => {
    if (bMode !== "balloon" || bSchedule.length === 0) return 0;
    return round2(bSchedule[bSchedule.length - 1].payment);
  }, [bMode, bSchedule]);

  // Refi break-even
  const refiBreakEvenMonths = useMemo(() => {
    if (!refiRate || !refiClosingCosts) return null;
    const currentMonthlyRate = monthlyRate;
    const newRate = num(refiRate) / 100 / 12;
    const n = amortMonths;
    const L = loanAmount;
    if (L <= 0 || n <= 0) return null;

    const newPayment = newRate === 0
      ? round2(L / n)
      : round2((L * (newRate * Math.pow(1 + newRate, n))) / (Math.pow(1 + newRate, n) - 1));

    const savings = basePayment - newPayment;
    if (savings <= 0) return null;
    return Math.ceil(num(refiClosingCosts) / savings);
  }, [refiRate, refiClosingCosts, monthlyRate, amortMonths, loanAmount, basePayment]);

  // Year grouping
  const years = useMemo(() => {
    const map = new Map<number, ScheduleRow[]>();
    schedule.forEach((row) => {
      if (!map.has(row.yearIndex)) map.set(row.yearIndex, []);
      map.get(row.yearIndex)!.push(row);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [schedule]);

  const yearTotals = (rows: ScheduleRow[]) => {
    const paid = round2(rows.reduce((s, r) => s + r.payment, 0));
    const principal = round2(rows.reduce((s, r) => s + r.totalPrincipal, 0));
    const interest = round2(rows.reduce((s, r) => s + r.interest, 0));
    const endBal = rows.length ? rows[rows.length - 1].balance : endingBalance;
    return { paid, principal, interest, endBal };
  };

  const toggleYear = (y: number) => setExpandedYears((prev) => ({ ...prev, [y]: !prev[y] }));

  // Share / Copy
  const shareUrl = () => {
    const s = { t: title, pp: purchasePrice, dp: downPercent, ir: interestRate, ty: termYears, ay: amortYears, by: balloonYears, mode };
    const url = window.location.href.split("#")[0] + "#" + btoa(JSON.stringify(s));
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const copySummary = () => {
    const lines = [
      "GRID Mortgage Summary",
      title ? `Property: ${title}` : "",
      "---",
      `Scenario A`,
      `Purchase Price: ${formatMoney0(num(purchasePrice))}`,
      `Down: ${formatMoney0(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`,
      `Loan: ${formatMoney0(loanAmount)} @ ${num(interestRate).toFixed(3)}% / ${amortYearsEff}yr`,
      `Base Monthly Payment: ${formatMoney(basePayment)}`,
      `Annual Debt Service: ${formatMoney0(annualDebtServiceBase)}`,
      `Total Interest: ${formatMoney0(totalInterest)}`,
      `Total Paid: ${formatMoney0(totalPaid)}`,
      mode === "balloon" ? `Balloon Payoff: ${formatMoney0(balloonPayoff)}` : "",
      showComparison && bBasePayment ? [
        "---",
        `Scenario B`,
        `Rate: ${num(bRate).toFixed(3)}% / ${bAmortYearsEff}yr`,
        `Monthly Payment: ${formatMoney(bBasePayment)}`,
        `Total Interest: ${formatMoney0(bTotalInterest)}`,
        `Monthly Savings vs A: ${formatMoney(basePayment - bBasePayment)}`,
      ].join("\n") : "",
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

  const drawRow = (pdf: jsPDF, y: number, label: string, value: string, opts?: { bold?: boolean; small?: boolean }) => {
    pdf.setFont("helvetica", opts?.bold ? "bold" : "normal");
    pdf.setFontSize(opts?.small ? 10 : 11);
    pdf.text(label, 15, y);
    pdf.text(value, 195, y, { align: "right" });
    pdf.setDrawColor(215);
    pdf.line(15, y + 2, 195, y + 2);
    return y + 7;
  };

  const drawSection = (pdf: jsPDF, y: number, titleText: string) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(titleText.toUpperCase(), 15, y);
    y += 4;
    pdf.setDrawColor(60);
    pdf.line(15, y, 195, y);
    return y + 8;
  };

  const addFooter = (pdf: jsPDF) => {
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(100);
      pdf.text("Preliminary Estimate – For Planning Purposes Only", 15, 287);
      pdf.text(`${i} / ${pageCount}`, 195, 287, { align: "right" });
      pdf.setTextColor(0);
    }
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
    pdf.text("Investment Loan Estimate", 15, 35);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Preliminary Estimate – For Planning Purposes Only", 15, 41);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text(title || "Loan Summary", 15, 50);
    let y = 60;
    y = drawSection(pdf, y, "Loan Terms");
    y = drawRow(pdf, y, "Purchase Price", formatMoney0(num(purchasePrice)));
    y = drawRow(pdf, y, "Down Payment", `${formatMoney0(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`);
    y = drawRow(pdf, y, "Loan Amount", formatMoney0(loanAmount), { bold: true });
    y = drawRow(pdf, y, "Interest Rate", `${num(interestRate).toFixed(3)}%`);
    y = drawRow(pdf, y, "Amortization", `${amortYearsEff} Years`);
    if (mode === "balloon") {
      y = drawRow(pdf, y, "Balloon", `${balloonYearsEff} Years`);
    } else {
      y = drawRow(pdf, y, "Term", `${termYearsEff} Years`);
    }
    if (useExtraPrincipal) y = drawRow(pdf, y, "Additional Principal", formatMoney(extraP), { small: true });
    y += 4;
    y = drawSection(pdf, y, "Payment Summary");
    y = drawRow(pdf, y, "Base Monthly Payment", formatMoney(basePayment), { bold: true });
    if (useExtraPrincipal) y = drawRow(pdf, y, "Monthly With Additional Principal", formatMoney(paymentWithExtra), { bold: true });
    y = drawRow(pdf, y, "Annual Debt Service (Base)", formatMoney0(annualDebtServiceBase));
    if (useExtraPrincipal) y = drawRow(pdf, y, "Annual Debt Service (With Extra)", formatMoney0(annualDebtServiceWithExtra));
    if (mode === "balloon") y = drawRow(pdf, y, "Balloon Amount", formatMoney0(balloonPayoff), { bold: true });
    y = drawRow(pdf, y, "Total Interest", formatMoney0(totalInterest));
    y = drawRow(pdf, y, "Total Paid", formatMoney0(totalPaid));

    if (showAmort && schedule.length) {
      y += 6;
      y = drawSection(pdf, y, "Amortization");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setDrawColor(60);
      const colX = { m: 15, pay: 45, prin: 80, int: 115, extra: 145, bal: 195 };
      const drawHeader = () => {
        pdf.text("Mo", colX.m, y);
        pdf.text("Payment", colX.pay, y);
        pdf.text("Principal", colX.prin, y);
        pdf.text("Interest", colX.int, y);
        pdf.text("Addl", colX.extra, y);
        pdf.line(15, y + 2, 195, y + 2);
        y += 7;
      };
      drawHeader();
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      for (const [yearNum, rows] of years) {
        const t = yearTotals(rows);
        if (y > 270) { pdf.addPage(); y = 20; drawHeader(); }
        pdf.setFont("helvetica", "bold");
        pdf.text(`Year ${yearNum}`, 15, y);
        pdf.text(formatMoney0(t.paid), colX.pay, y);
        pdf.text(formatMoney0(t.principal), colX.prin, y);
        pdf.text(formatMoney0(t.interest), colX.int, y);
        pdf.setDrawColor(215);
        pdf.line(15, y + 2, 195, y + 2);
        y += 7;
        pdf.setFont("helvetica", "normal");
        for (const r of rows) {
          if (y > 270) { pdf.addPage(); y = 20; drawHeader(); }
          pdf.text(String(r.monthIndex), colX.m, y);
          pdf.text(formatMoney0(r.payment), colX.pay, y);
          pdf.text(formatMoney0(r.totalPrincipal), colX.prin, y);
          pdf.text(formatMoney0(r.interest), colX.int, y);
          pdf.text(formatMoney0(r.extraPrincipal), colX.extra, y);
          pdf.setDrawColor(235);
          pdf.line(15, y + 2, 195, y + 2);
          y += 6;
        }
        y += 3;
      }
    }
    addFooter(pdf);
    pdf.save("GRID-Investment-Loan-Estimate.pdf");
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col items-center gap-2">
        <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
        <div className="text-sm font-semibold tracking-wide">Mortgage + Balloon Calculator</div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Title (optional)</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="123 Main St, Norman OK"
          className="border rounded-lg px-3 py-2 w-full text-sm"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* INPUT FORM */}
        <div className="bg-white rounded-xl border shadow-sm p-4 space-y-5">
          <SectionTitle>Loan Type</SectionTitle>
          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="text-sm">Mode</div>
            <div className="flex justify-end">
              <select value={mode} onChange={(e) => setMode(e.target.value as LoanMode)} className="border rounded-md px-2 py-1 text-sm">
                <option value="amortizing">Fully Amortizing</option>
                <option value="balloon">Balloon</option>
              </select>
            </div>
          </div>

          <SectionTitle>Inputs</SectionTitle>
          <GridRow label="Purchase Price"><NumberInput value={purchasePrice} set={setPurchasePrice} /></GridRow>
          <GridRow label="Down Payment (%)"><NumberInput value={downPercent} set={setDownPercent} /></GridRow>
          <GridRow label="Interest Rate (%)"><NumberInput value={interestRate} set={setInterestRate} /></GridRow>
          <GridRow label="Amortization (Years)"><NumberInput value={amortYears} set={setAmortYears} /></GridRow>
          {mode === "balloon" ? (
            <GridRow label="Balloon (Years)"><NumberInput value={balloonYears} set={setBalloonYears} /></GridRow>
          ) : (
            <GridRow label="Term (Years)"><NumberInput value={termYears} set={setTermYears} /></GridRow>
          )}

          <div className="pt-2 border-t space-y-2">
            <label className="text-sm flex items-center justify-between">
              <span>Use Additional Principal</span>
              <input type="checkbox" checked={useExtraPrincipal} onChange={(e) => setUseExtraPrincipal(e.target.checked)} />
            </label>
            {useExtraPrincipal && (
              <GridRow label="Additional Principal (Monthly)">
                <NumberInput value={extraPrincipalMonthly as number | ""} set={(v) => setExtraPrincipalMonthly(v as any)} />
              </GridRow>
            )}
          </div>

          <div className="pt-2 border-t space-y-2">
            <SmallRow label="Down Payment" value={`${formatMoney0(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`} />
            <SmallRow label="Loan Amount" value={formatMoney0(loanAmount)} />
          </div>

          <div className="pt-2 border-t space-y-2">
            <SmallRow label="Base Monthly Payment" value={formatMoney(basePayment)} />
            {useExtraPrincipal && <SmallRow label="Monthly With Addl Principal" value={formatMoney(paymentWithExtra)} />}
          </div>

          <div className="pt-2 border-t space-y-2">
            <SmallRow label="Annual Debt Service (Base)" value={formatMoney0(annualDebtServiceBase)} />
            {useExtraPrincipal && <SmallRow label="Annual Debt Service (With Extra)" value={formatMoney0(annualDebtServiceWithExtra)} />}
          </div>

          <div className="pt-2 border-t space-y-2">
            {mode === "balloon" && <SmallRow label="Balloon Amount" value={formatMoney0(balloonPayoff)} />}
            <SmallRow label="Total Interest" value={formatMoney0(totalInterest)} />
            <SmallRow label="Total Paid" value={formatMoney0(totalPaid)} />
            <SmallRow label="Payments Count" value={`${payoffMonthCount}`} />
          </div>

          {/* Scenario B toggle */}
          <div className="pt-2 border-t space-y-3">
            <label className="text-sm flex items-center justify-between font-medium">
              <span>Compare Scenario B</span>
              <input type="checkbox" checked={showComparison} onChange={(e) => setShowComparison(e.target.checked)} />
            </label>
            {showComparison && (
              <div className="space-y-3 border rounded-xl p-3 bg-gray-50">
                <div className="text-xs font-semibold uppercase text-gray-500">Scenario B (same price)</div>
                <div className="grid grid-cols-2 gap-2 items-center text-sm">
                  <span>Mode</span>
                  <select value={bMode} onChange={(e) => setBMode(e.target.value as LoanMode)} className="border rounded-md px-2 py-1 text-sm">
                    <option value="amortizing">Amortizing</option>
                    <option value="balloon">Balloon</option>
                  </select>
                </div>
                <GridRow label="Down (%)"><NumberInput value={bDownPercent} set={setBDownPercent} /></GridRow>
                <GridRow label="Rate (%)"><NumberInput value={bRate} set={setBRate} /></GridRow>
                <GridRow label="Amort (Years)"><NumberInput value={bAmortYears} set={setBAmortYears} /></GridRow>
                {bMode === "balloon" && (
                  <GridRow label="Balloon (Years)"><NumberInput value={bBalloonYears} set={setBBalloonYears} /></GridRow>
                )}
              </div>
            )}
          </div>

          {/* Refi break-even */}
          <div className="pt-2 border-t space-y-3">
            <label className="text-sm flex items-center justify-between font-medium">
              <span>Refi Break-Even</span>
              <input type="checkbox" checked={showRefi} onChange={(e) => setShowRefi(e.target.checked)} />
            </label>
            {showRefi && (
              <div className="space-y-3 border rounded-xl p-3 bg-gray-50">
                <div className="text-xs font-semibold uppercase text-gray-500">New Loan Terms</div>
                <GridRow label="New Rate (%)"><NumberInput value={refiRate} set={setRefiRate} /></GridRow>
                <GridRow label="Closing Costs ($)"><NumberInput value={refiClosingCosts} set={setRefiClosingCosts} /></GridRow>
                <div className="pt-2 border-t text-sm">
                  {refiBreakEvenMonths === null ? (
                    <span className="text-gray-500">
                      {num(refiRate) >= num(interestRate) ? "New rate must be lower than current rate" : "Enter rate and closing costs"}
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Current Payment</span>
                        <span className="font-medium">{formatMoney(basePayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Payment</span>
                        <span className="font-medium">
                          {formatMoney(round2((bMonthlyRate || (num(refiRate)/100/12)) > 0
                            ? (bLoanAmount > 0 ? bLoanAmount : loanAmount) * ((num(refiRate)/100/12) * Math.pow(1 + num(refiRate)/100/12, amortMonths)) / (Math.pow(1 + num(refiRate)/100/12, amortMonths) - 1)
                            : loanAmount / amortMonths
                          ))}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-green-700 pt-1 border-t">
                        <span>Break-Even</span>
                        <span>{refiBreakEvenMonths} months ({(refiBreakEvenMonths / 12).toFixed(1)} yrs)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t flex items-center justify-between">
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" checked={showAmort} onChange={(e) => setShowAmort(e.target.checked)} />
              Show Amortization
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={copySummary} className="border px-3 py-2 rounded-lg text-sm">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button type="button" onClick={shareUrl} className="border px-3 py-2 rounded-lg text-sm">
                {shared ? "Copied!" : "Share"}
              </button>
              <button type="button" onClick={downloadPDF} className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* STATEMENT CARD */}
        <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <img src="/brand/grid_logo.png" alt="GRID" className="h-7 w-auto" />
              <div className="text-xs text-gray-500">Preliminary Estimate – For Planning Purposes Only</div>
            </div>
            <div className="text-xl font-bold tracking-wide">Investment Loan Estimate</div>
            <div className="text-lg font-semibold">{title || "Loan Summary"}</div>
          </div>

          {/* Scenario comparison */}
          {showComparison && bBasePayment > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide">Scenario Comparison</div>
              <div className="px-3 py-2">
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold pb-2 border-b mb-2">
                  <div className="text-gray-500"></div>
                  <div className="text-center">Scenario A</div>
                  <div className="text-center">Scenario B</div>
                </div>
                {[
                  { label: "Rate", a: `${num(interestRate).toFixed(3)}%`, b: `${num(bRate).toFixed(3)}%` },
                  { label: "Amort", a: `${amortYearsEff}yr`, b: `${bAmortYearsEff}yr` },
                  { label: "Loan", a: formatMoney0(loanAmount), b: formatMoney0(bLoanAmount) },
                  { label: "Monthly", a: formatMoney(basePayment), b: formatMoney(bBasePayment) },
                  { label: "Annual DS", a: formatMoney0(annualDebtServiceBase), b: formatMoney0(round2(bBasePayment * 12)) },
                  { label: "Total Interest", a: formatMoney0(totalInterest), b: formatMoney0(bTotalInterest) },
                  { label: "Total Paid", a: formatMoney0(totalPaid), b: formatMoney0(bTotalPaid) },
                ].map(({ label, a, b }) => (
                  <div key={label} className="grid grid-cols-3 gap-2 text-sm py-1 border-b last:border-b-0">
                    <div className="text-gray-600">{label}</div>
                    <div className="text-center font-medium">{a}</div>
                    <div className={`text-center font-medium ${label === "Monthly" || label === "Annual DS" || label === "Total Interest" || label === "Total Paid" ? (bBasePayment < basePayment ? "text-green-600" : "text-red-600") : ""}`}>{b}</div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-2 text-sm py-2 font-semibold">
                  <div>Monthly Δ</div>
                  <div className="col-span-2 text-center">
                    {bBasePayment < basePayment
                      ? <span className="text-green-600">B saves {formatMoney(basePayment - bBasePayment)}/mo</span>
                      : <span className="text-red-600">B costs {formatMoney(bBasePayment - basePayment)}/mo more</span>
                    }
                  </div>
                </div>
                {bMode === "balloon" && bBalloonPayoff > 0 && (
                  <div className="grid grid-cols-3 gap-2 text-sm py-1 border-t">
                    <div className="text-gray-600">Balloon</div>
                    <div className="text-center">-</div>
                    <div className="text-center font-medium">{formatMoney0(bBalloonPayoff)}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Statement title="Loan Terms">
                <StatementRow label="Purchase Price" value={formatMoney0(num(purchasePrice))} />
                <StatementRow label="Down Payment" value={`${formatMoney0(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`} />
                <StatementRow label="Loan Amount" value={formatMoney0(loanAmount)} bold />
                <StatementRow label="Interest Rate" value={`${num(interestRate).toFixed(3)}%`} />
                <StatementRow label="Amortization" value={`${amortYearsEff} Years`} />
                {mode === "balloon"
                  ? <StatementRow label="Balloon Amount" value={formatMoney0(balloonPayoff)} bold />
                  : <StatementRow label="Term" value={`${termYearsEff} Years`} />
                }
                <StatementRow label="Additional Principal" value={formatMoney(extraP)} />
              </Statement>

              <Statement title="Payment Summary">
                <StatementRow label="Base Monthly Payment" value={formatMoney(basePayment)} bold />
                {useExtraPrincipal && <StatementRow label="Monthly With Addl Principal" value={formatMoney(paymentWithExtra)} bold />}
                <StatementRow label="Annual Debt Service (Base)" value={formatMoney0(annualDebtServiceBase)} />
                {useExtraPrincipal && <StatementRow label="Annual Debt Service (With Extra)" value={formatMoney0(annualDebtServiceWithExtra)} />}
                {mode === "balloon" && <StatementRow label="Balloon Payoff (Estimated)" value={formatMoney0(balloonPayoff)} bold />}
                <StatementRow label="Total Interest" value={formatMoney0(totalInterest)} />
                <StatementRow label="Total Paid" value={formatMoney0(totalPaid)} />
                <StatementRow label="Payments Count" value={`${payoffMonthCount}`} />
              </Statement>
            </>
          )}

          {showAmort && schedule.length > 0 && (
            <Statement title="Amortization (Expandable by Year)">
              <div className="text-xs text-gray-500 mb-2">Tap a year to expand.</div>
              <div className="space-y-2">
                {years.map(([yearNum, rows]) => {
                  const t = yearTotals(rows);
                  const open = !!expandedYears[yearNum];
                  return (
                    <div key={yearNum} className="border rounded-lg overflow-hidden">
                      <button type="button" onClick={() => toggleYear(yearNum)} className="w-full flex items-center justify-between px-3 py-2 bg-gray-50">
                        <div className="text-sm font-semibold">Year {yearNum}</div>
                        <div className="text-xs text-gray-600">End Bal: {formatMoney0(t.endBal)}</div>
                      </button>
                      <div className="px-3 py-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <KeyVal label="Total Paid" value={formatMoney0(t.paid)} />
                          <KeyVal label="Principal Paid" value={formatMoney0(t.principal)} />
                          <KeyVal label="Interest Paid" value={formatMoney0(t.interest)} />
                        </div>
                        {open && (
                          <div className="mt-3 border rounded-lg overflow-hidden">
                            <div className="grid grid-cols-6 gap-2 bg-gray-50 px-2 py-2 text-[11px] font-semibold">
                              <div>Mo</div><div className="text-right">Pay</div><div className="text-right">Prin</div>
                              <div className="text-right">Int</div><div className="text-right">Addl</div>
                            </div>
                            {rows.map((r) => (
                              <div key={r.monthIndex} className="grid grid-cols-6 gap-2 px-2 py-2 text-[11px] border-t">
                                <div>{r.monthIndex}</div>
                                <div className="text-right">{formatMoney0(r.payment)}</div>
                                <div className="text-right">{formatMoney0(r.totalPrincipal)}</div>
                                <div className="text-right">{formatMoney0(r.interest)}</div>
                                <div className="text-right">{formatMoney0(r.extraPrincipal)}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Statement>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="pt-1"><div className="text-xs font-semibold uppercase tracking-wide text-gray-600">{children}</div></div>;
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
      type="number" inputMode="decimal" value={value}
      onChange={(e) => set(e.target.value === "" ? "" : +e.target.value)}
      className={`border rounded-md px-2 py-1 text-sm text-right w-28 ${className}`}
    />
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

function StatementRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between py-1 border-b last:border-b-0 text-sm">
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}

function KeyVal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="text-gray-600">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
