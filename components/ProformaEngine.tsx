"use client";

import { useMemo, useState } from "react";
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
  freq: Frequency; // allow monthly/yearly for extras too
};

export default function ProformaEngine() {
  /* ================= helpers ================= */

  const num = (v: number | "") => (v === "" ? 0 : v);

  const annualize = (v: number, f: Frequency) => (f === "monthly" ? v * 12 : v);

  const format = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  /* ================= state ================= */

  const [propertyTitle, setPropertyTitle] = useState("");

  // Financing
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [downPercent, setDownPercent] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [termYears, setTermYears] = useState<number | "">("");
  const [isCash, setIsCash] = useState(false);

  // Income
  const [units, setUnits] = useState<UnitRow[]>([
    { label: "Unit 1", rent: "", freq: "monthly" },
  ]);

  // Vacancy as % of gross income (line item under Income and counted in expenses math as loss)
  const [vacancyPercent, setVacancyPercent] = useState<number | "">("");

  // Expenses
  const [taxes, setTaxes] = useState<number | "">("");
  const [taxesFreq, setTaxesFreq] = useState<Frequency>("yearly");

  const [insurance, setInsurance] = useState<number | "">("");
  const [insuranceFreq, setInsuranceFreq] = useState<Frequency>("yearly");

  const [hoa, setHoa] = useState<number | "">("");
  const [hoaFreq, setHoaFreq] = useState<Frequency>("monthly");

  const [managementPercent, setManagementPercent] = useState<number | "">("");
  const [maintenancePercent, setMaintenancePercent] = useState<number | "">("");

  const [extraExpenses, setExtraExpenses] = useState<ExtraExpenseRow[]>([]);

  /* ================= add/remove ================= */

  const addUnit = () => {
    setUnits((prev) => [
      ...prev,
      { label: `Unit ${prev.length + 1}`, rent: "", freq: "monthly" },
    ]);
  };

  const removeUnit = (i: number) => {
    setUnits((prev) => prev.filter((_, idx) => idx !== i));
  };

  const addExpense = () => {
    setExtraExpenses((prev) => [
      ...prev,
      { label: "Other Expense", amount: "", freq: "yearly" },
    ]);
  };

  const removeExpense = (i: number) => {
    setExtraExpenses((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* ================= calculations ================= */

  const loanAmount = useMemo(() => {
    if (isCash) return 0;
    const pp = num(purchasePrice);
    const dp = num(downPercent) / 100;
    return pp > 0 ? pp * (1 - dp) : 0;
  }, [purchasePrice, downPercent, isCash]);
  
  const downPaymentAmount =
  isCash
    ? num(purchasePrice)
    : num(purchasePrice) * (num(downPercent) / 100);

  const monthlyPayment = useMemo(() => {
    if (isCash || loanAmount === 0) return 0;

    const r = num(interestRate) / 100 / 12;
    const n = num(termYears) * 12;

    if (!r || !n) return 0;

    // standard amortization formula
    return (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, interestRate, termYears, isCash]);

  const annualDebtService = monthlyPayment * 12;

  const grossIncome = useMemo(() => {
    return units.reduce((sum, u) => sum + annualize(num(u.rent), u.freq), 0);
  }, [units]);

  const vacancyLoss = grossIncome * (num(vacancyPercent) / 100);
  const effectiveGross = grossIncome - vacancyLoss;

  // management/maintenance as % of effective gross (your preference)
  const management = effectiveGross * (num(managementPercent) / 100);
  const maintenance = effectiveGross * (num(maintenancePercent) / 100);

  const taxesAnnual = annualize(num(taxes), taxesFreq);
  const insuranceAnnual = annualize(num(insurance), insuranceFreq);
  const hoaAnnual = annualize(num(hoa), hoaFreq);

  const extraAnnualTotal = extraExpenses.reduce(
    (sum, e) => sum + annualize(num(e.amount), e.freq),
    0
  );

  // Operating expenses (exclude debt service)
  const operatingExpenses =
    taxesAnnual + insuranceAnnual + hoaAnnual + management + maintenance + extraAnnualTotal;

  const noi = effectiveGross - operatingExpenses;
  const cashFlow = noi - annualDebtService;

  const capRate = num(purchasePrice) > 0 ? (noi / num(purchasePrice)) * 100 : 0;

  const cashInvested = isCash
    ? num(purchasePrice)
    : num(purchasePrice) * (num(downPercent) / 100);

  const cashOnCash = cashInvested > 0 ? (cashFlow / cashInvested) * 100 : 0;

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
    opts?: { bold?: boolean; indent?: number }
  ) => {
    const indent = opts?.indent ?? 0;

    if (opts?.bold) pdf.setFont("helvetica", "bold");
    else pdf.setFont("helvetica", "normal");

    pdf.setFontSize(11);
    pdf.text(label, 15 + indent, y);
    pdf.text(value, 195, y, { align: "right" });

    // subtle line under row for readability
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

    // logo
    try {
      const logoBlob = await fetch("/brand/grid_logo.png").then((res) => res.blob());
      const logoData = await blobToDataURL(logoBlob);
      pdf.addImage(logoData, "PNG", 15, 12, 42, 14);
    } catch {
      // if logo fails, just continue
    }

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Investment Proforma", 15, 35);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(
      "Preliminary Estimate – For Underwriting Purposes Only",
      15,
      41
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(propertyTitle || "Property Analysis", 15, 50);

    let y = 60;

    // Income
    y = drawSection(pdf, y, "Income");
    units.forEach((u) => {
      y = drawRow(pdf, y, u.label, format(annualize(num(u.rent), u.freq)));
    });
    y = drawRow(pdf, y, "Gross Income", format(grossIncome), { bold: true });
    y = drawRow(pdf, y, "Vacancy Loss", format(vacancyLoss));
    y = drawRow(pdf, y, "Effective Gross Income", format(effectiveGross), { bold: true });

    y += 4;

    // Expenses
    y = drawSection(pdf, y, "Operating Expenses");
    y = drawRow(pdf, y, "Taxes", format(taxesAnnual));
    y = drawRow(pdf, y, "Insurance", format(insuranceAnnual));
    y = drawRow(pdf, y, "HOA", format(hoaAnnual));
    y = drawRow(pdf, y, "Management", format(management));
    y = drawRow(pdf, y, "Maintenance", format(maintenance));
    extraExpenses.forEach((e) => {
      y = drawRow(pdf, y, e.label, format(annualize(num(e.amount), e.freq)));
    });
    y = drawRow(pdf, y, "Total Operating Expenses", format(operatingExpenses), { bold: true });

    y += 4;

    y = drawSection(pdf, y, "Financing");

    y = drawRow(pdf, y, "Purchase Price", format(num(purchasePrice)));

    y = drawRow(
      pdf,
      y,
      "Down Payment",
      `${format(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`
    );

    if (!isCash) {
      y = drawRow(
        pdf,
        y,
        "Interest Rate",
        `${num(interestRate).toFixed(2)}%`
      );

      y = drawRow(
        pdf,
        y,
        "Term",
        `${num(termYears)} Years`
      );
    }

    y = drawRow(pdf, y, "Loan Amount", format(loanAmount));
    y = drawRow(pdf, y, "Annual Debt Service", format(annualDebtService));

    y += 4;

    // Returns
    y = drawSection(pdf, y, "Returns");
    y = drawRow(pdf, y, "NOI", format(noi), { bold: true });
    y = drawRow(pdf, y, "Cash Flow", format(cashFlow), { bold: true });
    y = drawRow(pdf, y, "Cap Rate", `${capRate.toFixed(2)}%`);
    y = drawRow(pdf, y, "Cash on Cash", `${cashOnCash.toFixed(2)}%`);

    pdf.save("GRID-Proforma.pdf");
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* header */}
      <div className="flex flex-col items-center gap-2">
        <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
        <div className="text-sm font-semibold tracking-wide">Proforma Calculator</div>
      </div>

      {/* property */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Property
        </label>
        <input
          placeholder="Property Address / Title"
          value={propertyTitle}
          onChange={(e) => setPropertyTitle(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-sm"
        />
      </div>

      {/* form + statement */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* INPUT FORM */}
        <div className="bg-white rounded-xl border shadow-sm p-4 space-y-5">
          {/* Financing */}
          <SectionTitle>Financing</SectionTitle>

          <GridRow label="Purchase Price">
            <NumberInput value={purchasePrice} set={setPurchasePrice} />
          </GridRow>

          <GridRow label="Cash Purchase">
            <input
              type="checkbox"
              checked={isCash}
              onChange={() => setIsCash((v) => !v)}
              className="h-4 w-4"
            />
          </GridRow>

          {!isCash && (
            <>
              <GridRow label="Down Payment (%)">
                <NumberInput value={downPercent} set={setDownPercent} />
              </GridRow>

              <GridRow label="Interest Rate (%)">
                <NumberInput value={interestRate} set={setInterestRate} />
              </GridRow>

              <GridRow label="Term (Years)">
                <NumberInput value={termYears} set={setTermYears} />
              </GridRow>
            </>
          )}

          <div className="pt-2 border-t space-y-2">
            <SmallRow label="Loan Amount" value={format(loanAmount)} />
            <SmallRow label="Annual Debt Service" value={format(annualDebtService)} />
          </div>

          {/* Income */}
          <SectionTitle>Income</SectionTitle>

          <div className="space-y-3">
            {units.map((u, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    value={u.label}
                    onChange={(e) => {
                      const copy = [...units];
                      copy[i] = { ...copy[i], label: e.target.value };
                      setUnits(copy);
                    }}
                    className="border rounded-md px-2 py-1 text-sm flex-1"
                  />

                  {units.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUnit(i)}
                      className="text-red-600 text-sm px-2 py-1"
                      aria-label="Remove unit"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <NumberInput
                    value={u.rent}
                    set={(val) => {
                      const copy = [...units];
                      copy[i] = { ...copy[i], rent: val };
                      setUnits(copy);
                    }}
                    className="flex-1"
                  />

                  <select
                    value={u.freq}
                    onChange={(e) => {
                      const copy = [...units];
                      copy[i] = { ...copy[i], freq: e.target.value as Frequency };
                      setUnits(copy);
                    }}
                    className="border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            ))}

            <button type="button" onClick={addUnit} className="text-sm underline">
              + Add Unit
            </button>
          </div>

          <GridRow label="Vacancy (%)">
            <NumberInput value={vacancyPercent} set={setVacancyPercent} />
          </GridRow>

          {/* Expenses */}
          <SectionTitle>Expenses</SectionTitle>

          <ExpenseRow
            label="Taxes"
            value={taxes}
            set={setTaxes}
            freq={taxesFreq}
            setFreq={setTaxesFreq}
          />
          <ExpenseRow
            label="Insurance"
            value={insurance}
            set={setInsurance}
            freq={insuranceFreq}
            setFreq={setInsuranceFreq}
          />
          <ExpenseRow label="HOA" value={hoa} set={setHoa} freq={hoaFreq} setFreq={setHoaFreq} />

          <GridRow label="Management (%)">
            <NumberInput value={managementPercent} set={setManagementPercent} />
          </GridRow>

          <GridRow label="Maintenance (%)">
            <NumberInput value={maintenancePercent} set={setMaintenancePercent} />
          </GridRow>

          {/* Extra expenses */}
          <div className="space-y-3">
            {extraExpenses.map((e, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    value={e.label}
                    onChange={(ev) => {
                      const copy = [...extraExpenses];
                      copy[i] = { ...copy[i], label: ev.target.value };
                      setExtraExpenses(copy);
                    }}
                    className="border rounded-md px-2 py-1 text-sm flex-1"
                  />

                  <button
                    type="button"
                    onClick={() => removeExpense(i)}
                    className="text-red-600 text-sm px-2 py-1"
                    aria-label="Remove expense"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex gap-2">
                  <NumberInput
                    value={e.amount}
                    set={(val) => {
                      const copy = [...extraExpenses];
                      copy[i] = { ...copy[i], amount: val };
                      setExtraExpenses(copy);
                    }}
                    className="flex-1"
                  />

                  <select
                    value={e.freq}
                    onChange={(ev) => {
                      const copy = [...extraExpenses];
                      copy[i] = { ...copy[i], freq: ev.target.value as Frequency };
                      setExtraExpenses(copy);
                    }}
                    className="border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            ))}

            <button type="button" onClick={addExpense} className="text-sm underline">
              + Add Expense
            </button>
          </div>

          <button
            type="button"
            onClick={downloadPDF}
            className="bg-black text-white w-full py-3 rounded-lg mt-2"
          >
            Download PDF
          </button>
        </div>

        {/* PRESENTATION / SCREENSHOT CARD */}
        <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
        <div className="space-y-2">
        <div className="flex items-center justify-between">
          <img src="/brand/grid_logo.png" alt="GRID" className="h-7 w-auto" />
          <div className="text-xs text-gray-500">
            Preliminary Estimate – For Underwriting Purposes Only
          </div>
        </div>

        <div className="text-xl font-bold tracking-wide">
          Investment Proforma
        </div>

        <div className="text-lg font-semibold">
          {propertyTitle || "Property Analysis"}
        </div>
      </div>

          <Statement title="Income">
            {units.map((u, i) => (
              <StatementRow
                key={i}
                label={u.label}
                value={format(annualize(num(u.rent), u.freq))}
              />
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
              <StatementRow
                key={i}
                label={e.label}
                value={format(annualize(num(e.amount), e.freq))}
              />
            ))}
            <StatementRow label="Total Operating Expenses" value={format(operatingExpenses)} bold />
          </Statement>

          <Statement title="Financing">
            <StatementRow
              label="Purchase Price"
              value={format(num(purchasePrice))}
            />

            <StatementRow
              label="Down Payment"
              value={`${format(downPaymentAmount)} (${num(downPercent).toFixed(1)}%)`}
            />

            {!isCash && (
              <>
                <StatementRow
                  label="Interest Rate"
                  value={`${num(interestRate).toFixed(2)}%`}
                />

                <StatementRow
                  label="Term"
                  value={`${num(termYears)} Years`}
                />
              </>
            )}

            <StatementRow label="Loan Amount" value={format(loanAmount)} />
            <StatementRow label="Debt Service" value={format(annualDebtService)} />
          </Statement>

          <Statement title="Returns">
            <StatementRow label="NOI" value={format(noi)} bold />
            <StatementRow label="Cash Flow" value={format(cashFlow)} bold />
            <StatementRow label="Cap Rate" value={`${capRate.toFixed(2)}%`} />
            <StatementRow label="Cash on Cash" value={`${cashOnCash.toFixed(2)}%`} />
          </Statement>
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

function ExpenseRow({
  label,
  value,
  set,
  freq,
  setFreq,
}: {
  label: string;
  value: number | "";
  set: (v: number | "") => void;
  freq: Frequency;
  setFreq: (v: Frequency) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 items-center">
      <div className="text-sm">{label}</div>
      <div className="flex justify-end gap-2">
        <NumberInput value={value} set={set} />
        <select
          value={freq}
          onChange={(e) => setFreq(e.target.value as Frequency)}
          className="border rounded-md px-2 py-1 text-sm"
        >
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