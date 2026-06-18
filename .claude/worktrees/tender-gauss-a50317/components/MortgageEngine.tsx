// components/MortgageEngine.tsx
"use client";

import { useMemo, useState } from "react";
import jsPDF from "jspdf";

type LoanMode = "amortizing" | "balloon";

type ScheduleRow = {
  monthIndex: number; // 1-based
  yearIndex: number; // 1-based
  payment: number; // base payment
  interest: number;
  principal: number; // base principal portion
  extraPrincipal: number;
  totalPrincipal: number;
  balance: number; // ending balance
};

export default function MortgageEngine() {
  /* ================= helpers ================= */

  const num = (v: number | "") => (v === "" ? 0 : v);

  const formatMoney = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  const formatMoney0 = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const clampNonNeg = (n: number) => (n < 0 ? 0 : n);

  const round2 = (n: number) => Math.round(n * 100) / 100;

  /* ================= state ================= */

  const [title, setTitle] = useState("");

  const [mode, setMode] = useState<LoanMode>("amortizing");

  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [downPercent, setDownPercent] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [termYears, setTermYears] = useState<number | "">(""); // informational
  const [amortYears, setAmortYears] = useState<number | "">(""); // payment calc
  const [balloonYears, setBalloonYears] = useState<number | "">(""); // stop month
  const [extraPrincipalMonthly, setExtraPrincipalMonthly] = useState<number | "">(
    ""
  );
  const [useExtraPrincipal, setUseExtraPrincipal] = useState(false);
  const [showAmort, setShowAmort] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>(
    {}
  );

  /* ================= derived values ================= */

  const downPaymentAmount = useMemo(() => {
    const pp = num(purchasePrice);
    const dp = num(downPercent) / 100;
    if (pp <= 0) return 0;
    return pp * dp;
  }, [purchasePrice, downPercent]);

  const loanAmount = useMemo(() => {
    const pp = num(purchasePrice);
    const dpAmt = downPaymentAmount;
    return clampNonNeg(pp - dpAmt);
  }, [purchasePrice, downPaymentAmount]);

  const monthlyRate = useMemo(() => num(interestRate) / 100 / 12, [interestRate]);

  // Defaults:
  // - If amortYears empty, default to termYears (if provided), else 30
  // - If balloonYears empty, default to 5 when balloon selected
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

  const balloonYearsEff = useMemo(() => {
    const b = num(balloonYears);
    if (b > 0) return b;
    return 5;
  }, [balloonYears]);

  const balloonMonths = balloonYearsEff * 12;

  const amortMonths = amortYearsEff * 12;

  const basePayment = useMemo(() => {
    const L = loanAmount;
    if (L <= 0) return 0;

    const r = monthlyRate;
    const n = amortMonths;
    if (n <= 0) return 0;

    // 0% interest
    if (r === 0) return round2(L / n);

    const p =
      (L * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

    return round2(p);
  }, [loanAmount, monthlyRate, amortMonths]);

  const extraP = useMemo(() => {
      if (!useExtraPrincipal) return 0;
      return clampNonNeg(num(extraPrincipalMonthly));
    }, [extraPrincipalMonthly, useExtraPrincipal]);

  const paymentWithExtra = round2(basePayment + extraP);

  /* ================= schedule generation ================= */

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
    if (balance < 1) {
      balance = 0;
      break;
    }

    const interest = round2(balance * r);

    const scheduledPayment = basePayment;

    let principal = round2(scheduledPayment - interest);
    if (principal < 0) principal = 0;
    if (principal > balance) principal = balance;

    let extraPrincipal = extraP;
    const remainingAfterBase = round2(balance - principal);
    if (extraPrincipal > remainingAfterBase) {
      extraPrincipal = remainingAfterBase;
    }

    let totalPrincipal = round2(principal + extraPrincipal);
    let actualPayment = round2(interest + totalPrincipal);

    // Balloon: force final payoff
    if (mode === "balloon" && m === stopAtMonths) {
      const remainingPrincipal = balance;

      totalPrincipal = remainingPrincipal;
      principal = remainingPrincipal;
      extraPrincipal = 0;

      actualPayment = round2(interest + remainingPrincipal);

      balance = 0;
    } else {
      balance = round2(balance - totalPrincipal);
      if (balance < 1) balance = 0;
    }

    const yearIndex = Math.ceil(m / 12);

    rows.push({
      monthIndex: m,
      yearIndex,
      payment: actualPayment,
      interest,
      principal,
      extraPrincipal,
      totalPrincipal,
      balance,
    });
  }

  return rows;
}, [
  loanAmount,
  monthlyRate,
  amortMonths,
  mode,
  balloonMonths,
  basePayment,
  extraP,
]);

  const payoffMonthCount = schedule.length;

  const totalPaid = useMemo(
    () => round2(schedule.reduce((s, r) => s + r.payment, 0)),
    [schedule]
  );
  const totalInterest = useMemo(
    () => round2(schedule.reduce((s, r) => s + r.interest, 0)),
    [schedule]
  );
  const totalPrincipalPaid = useMemo(
    () => round2(schedule.reduce((s, r) => s + r.totalPrincipal, 0)),
    [schedule]
  );

  const endingBalanceRaw = schedule.length ? schedule[schedule.length - 1].balance : loanAmount;
  const endingBalance = endingBalanceRaw < 1 ? 0 : endingBalanceRaw;

const balloonPayoff = useMemo(() => {
  if (mode !== "balloon" || schedule.length === 0) return 0;

  const last = schedule[schedule.length - 1];

  // Final balloon payment = interest + principal paid in last month
  return round2(last.payment);
}, [mode, schedule]);

  const annualDebtServiceBase = round2(basePayment * 12);
  const annualDebtServiceWithExtra = round2(paymentWithExtra * 12);

  /* ================= year grouping for display ================= */

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

  const toggleYear = (y: number) => {
    setExpandedYears((prev) => ({ ...prev, [y]: !prev[y] }));
  };

  /* ================= PDF ================= */

  const blobToDataURL = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onloadend = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });

  const drawRow = (
    pdf: jsPDF,
    y: number,
    label: string,
    value: string,
    opts?: { bold?: boolean; small?: boolean }
  ) => {
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
      pdf.text(
        "Preliminary Estimate – For Planning Purposes Only",
        15,
        287
      );
      pdf.text(`${i} / ${pageCount}`, 195, 287, { align: "right" });
      pdf.setTextColor(0);
    }
  };

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setTextColor(0);

    // logo
    try {
      const logoBlob = await fetch("/brand/grid_logo.png").then((res) => res.blob());
      const logoData = await blobToDataURL(logoBlob);
      pdf.addImage(logoData, "PNG", 15, 12, 42, 14);
    } catch {
      // ignore
    }

    // Header
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

    // Terms
    y = drawSection(pdf, y, "Loan Terms");
    y = drawRow(pdf, y, "Purchase Price", formatMoney0(num(purchasePrice)));
    y = drawRow(
      pdf,
      y,
      "Down Payment",
      `${formatMoney0(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`
    );
    y = drawRow(pdf, y, "Loan Amount", formatMoney0(loanAmount), { bold: true });

    y = drawRow(pdf, y, "Interest Rate", `${num(interestRate).toFixed(3)}%`);
    y = drawRow(pdf, y, "Amortization", `${amortYearsEff} Years`);
    if (mode === "balloon") {
      y = drawRow(pdf, y, "Balloon", `${balloonYearsEff} Years`);
    } else {
      y = drawRow(pdf, y, "Term", `${termYearsEff} Years`);
    }
    if (useExtraPrincipal) {
      y = drawRow(pdf, y, "Additional Principal", formatMoney(extraP), { small: true });
    }

    y += 4;

    // Payments
    y = drawSection(pdf, y, "Payment Summary");
    y = drawRow(pdf, y, "Base Monthly Payment", formatMoney(basePayment), { bold: true });
    if (useExtraPrincipal) {
      y = drawRow(pdf, y, "Monthly With Additional Principal", formatMoney(paymentWithExtra), { bold: true });
    }
    y = drawRow(pdf, y, "Annual Debt Service (Base)", formatMoney0(annualDebtServiceBase));
    if (useExtraPrincipal) {
      y = drawRow(pdf, y, "Annual Debt Service (With Extra)", formatMoney0(annualDebtServiceWithExtra));
    }
    if (mode === "balloon") {
      y = drawRow(pdf, y, "Balloon Amount", formatMoney0(balloonPayoff), { bold: true });
    }
    y = drawRow(pdf, y, "Total Interest", formatMoney0(totalInterest));
y = drawRow(pdf, y, "Total Paid", formatMoney0(totalPaid));
    if (mode === "balloon") {
}

    // Optional amortization
    if (showAmort && schedule.length) {
      y += 6;

      y = drawSection(pdf, y, "Amortization");

      // table header
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
        // Year summary row
        const t = yearTotals(rows);

        // page break guard
        if (y > 270) {
          pdf.addPage();
          y = 20;
          drawHeader();
        }

        pdf.setFont("helvetica", "bold");
        pdf.text(`Year ${yearNum}`, 15, y);
        pdf.text(formatMoney0(t.paid), colX.pay, y);
        pdf.text(formatMoney0(t.principal), colX.prin, y);
        pdf.text(formatMoney0(t.interest), colX.int, y);
        pdf.text(formatMoney0(0), colX.extra, y);

        pdf.setDrawColor(215);
        pdf.line(15, y + 2, 195, y + 2);
        y += 7;

        pdf.setFont("helvetica", "normal");

        for (const r of rows) {
          if (y > 270) {
            pdf.addPage();
            y = 20;
            drawHeader();
          }

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
      {/* header */}
      <div className="flex flex-col items-center gap-2">
        <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
        <div className="text-sm font-semibold tracking-wide">
          Mortgage + Balloon Calculator
        </div>
      </div>

      {/* title */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Title (optional)
        </label>
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
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as LoanMode)}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value="amortizing">Fully Amortizing</option>
                <option value="balloon">Balloon</option>
              </select>
            </div>
          </div>

          <SectionTitle>Inputs</SectionTitle>

          <GridRow label="Purchase Price">
            <NumberInput value={purchasePrice} set={setPurchasePrice} />
          </GridRow>

          <GridRow label="Down Payment (%)">
            <NumberInput value={downPercent} set={setDownPercent} />
          </GridRow>

          <GridRow label="Interest Rate (%)">
            <NumberInput value={interestRate} set={setInterestRate} />
          </GridRow>

          <GridRow label="Amortization (Years)">
            <NumberInput value={amortYears} set={setAmortYears} />
          </GridRow>

          {mode === "balloon" ? (
            <GridRow label="Balloon (Years)">
              <NumberInput value={balloonYears} set={setBalloonYears} />
            </GridRow>
          ) : (
            <GridRow label="Term (Years)">
              <NumberInput value={termYears} set={setTermYears} />
            </GridRow>
          )}

          <div className="pt-2 border-t space-y-2">
              <label className="text-sm flex items-center justify-between">
                <span>Use Additional Principal</span>
                <input
                  type="checkbox"
                  checked={useExtraPrincipal}
                  onChange={(e) => setUseExtraPrincipal(e.target.checked)}
                />
              </label>

              {useExtraPrincipal && (
                <GridRow label="Additional Principal (Monthly)">
                  <NumberInput value={extraPrincipalMonthly} set={setExtraPrincipalMonthly} />
                </GridRow>
              )}
            </div>

          <div className="pt-2 border-t space-y-2">
            <SmallRow
              label="Down Payment"
              value={`${formatMoney0(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`}
            />
            <SmallRow label="Loan Amount" value={formatMoney0(loanAmount)} />
          </div>

          <div className="pt-2 border-t space-y-2">
            <SmallRow label="Base Monthly Payment" value={formatMoney(basePayment)} />
            {useExtraPrincipal && (
              <SmallRow
                label="Monthly With Addl Principal"
                value={formatMoney(paymentWithExtra)}
              />
            )}
          </div>

          <div className="pt-2 border-t space-y-2">
            <SmallRow label="Annual Debt Service (Base)" value={formatMoney0(annualDebtServiceBase)} />
            {useExtraPrincipal && (
              <SmallRow
                label="Annual Debt Service (With Extra)"
                value={formatMoney0(annualDebtServiceWithExtra)}
              />
            )}
          </div>

          <div className="pt-2 border-t space-y-2">
            {mode === "balloon" && (
              <SmallRow label="Balloon Amount" value={formatMoney0(balloonPayoff)} />
            )}
            <SmallRow label="Total Interest" value={formatMoney0(totalInterest)} />
            <SmallRow label="Total Paid" value={formatMoney0(totalPaid)} />
            <SmallRow label="Payments Count" value={`${payoffMonthCount}`} />
          </div>

          <div className="pt-2 border-t flex items-center justify-between">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={showAmort}
                onChange={(e) => setShowAmort(e.target.checked)}
              />
              Show Amortization
            </label>

            <button
              type="button"
              onClick={downloadPDF}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* PRESENTATION / SCREENSHOT CARD */}
        <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <img src="/brand/grid_logo.png" alt="GRID" className="h-7 w-auto" />
              <div className="text-xs text-gray-500">
                Preliminary Estimate – For Planning Purposes Only
              </div>
            </div>

            <div className="text-xl font-bold tracking-wide">Investment Loan Estimate</div>
            <div className="text-lg font-semibold">{title || "Loan Summary"}</div>
          </div>

          <Statement title="Loan Terms">
            <StatementRow label="Purchase Price" value={formatMoney0(num(purchasePrice))} />
            <StatementRow
              label="Down Payment"
              value={`${formatMoney0(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`}
            />
            <StatementRow label="Loan Amount" value={formatMoney0(loanAmount)} bold />
            <StatementRow label="Interest Rate" value={`${num(interestRate).toFixed(3)}%`} />
            <StatementRow label="Amortization" value={`${amortYearsEff} Years`} />
            {mode === "balloon" ? (
                <StatementRow
                  label="Balloon Amount"
                  value={formatMoney0(balloonPayoff)}
                  bold
                />
            ) : (
              <StatementRow label="Term" value={`${termYearsEff} Years`} />
            )}
            <StatementRow label="Additional Principal" value={formatMoney(extraP)} />
          </Statement>

          <Statement title="Payment Summary">
            <StatementRow label="Base Monthly Payment" value={formatMoney(basePayment)} bold />
            {useExtraPrincipal && (
            <StatementRow
              label="Monthly With Addl Principal"
              value={formatMoney(paymentWithExtra)}
              bold
            />
            )}
            <StatementRow
              label="Annual Debt Service (Base)"
              value={formatMoney0(annualDebtServiceBase)}
            />
            {useExtraPrincipal && (
            <StatementRow
              label="Annual Debt Service (With Extra)"
              value={formatMoney0(annualDebtServiceWithExtra)}
            />
            )}
            {mode === "balloon" && (
              <StatementRow
                label="Balloon Payoff (Estimated)"
                value={formatMoney0(balloonPayoff)}
                bold
              />
            )}
            <StatementRow label="Total Interest" value={formatMoney0(totalInterest)} />
            <StatementRow label="Total Paid" value={formatMoney0(totalPaid)} />
            <StatementRow label="Payments Count" value={`${payoffMonthCount}`} />
          </Statement>

          {showAmort && schedule.length > 0 && (
            <Statement title="Amortization (Expandable by Year)">
              <div className="text-xs text-gray-500 mb-2">
                Tap a year to expand. Additional principal reduces the remaining balance and balloon payoff.
              </div>

              <div className="space-y-2">
                {years.map(([yearNum, rows]) => {
                  const t = yearTotals(rows);
                  const open = !!expandedYears[yearNum];

                  return (
                    <div key={yearNum} className="border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleYear(yearNum)}
                        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50"
                      >
                        <div className="text-sm font-semibold">Year {yearNum}</div>
                        <div className="text-xs text-gray-600">
                          End Bal: {formatMoney0(t.endBal)}
                        </div>
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
                              <div>Mo</div>
                              <div className="text-right">Pay</div>
                              <div className="text-right">Prin</div>
                              <div className="text-right">Int</div>
                              <div className="text-right">Addl</div>
                            </div>

                            {rows.map((r) => (
                              <div
                                key={r.monthIndex}
                                className="grid grid-cols-6 gap-2 px-2 py-2 text-[11px] border-t"
                              >
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

/* ================= components ================= */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-1">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        {children}
      </div>
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

function NumberInput({
  value,
  set,
  className = "",
}: {
  value: number | "";
  set: (v: number | "") => void;
  className?: string;
}) {
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

function Statement({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide">
        {title}
      </div>
      <div className="px-3 py-2">{children}</div>
    </div>
  );
}

function StatementRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
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