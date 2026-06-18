"use client";

import { useMemo, useState } from "react";
import jsPDF from "jspdf";

type Strategy = "flip" | "rental";
type FinancingMode = "cash" | "long" | "interest";

type ExtraRow = {
  id: string;
  label: string;
  amount: number;
};

function money0(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function money2(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

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

function amortBalanceAfterMonths(
  loanAmount: number,
  annualRatePct: number,
  termYears: number,
  months: number
) {
  if (loanAmount <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  const k = clamp0(months);
  if (r <= 0 || n <= 0) return loanAmount;

  // balance after k payments:
  // Bk = P*(1+r)^k - PMT * [((1+r)^k - 1) / r]
  const pmt = amortMonthlyPayment(loanAmount, annualRatePct, termYears);
  const pow = Math.pow(1 + r, k);
  const balance = loanAmount * pow - pmt * ((pow - 1) / r);
  return clamp0(round2(balance));
}

export default function RehabEngine() {
  // ---------- Core ----------
  const [propertyTitle, setPropertyTitle] = useState("");
  const [strategy, setStrategy] = useState<Strategy>("flip");
    const [originationFee, setOriginationFee] = useState<number | "">(0);
const [serviceFee, setServiceFee] = useState<number | "">(0);
const [appraisalFee, setAppraisalFee] = useState<number | "">(0);
const [titleFees, setTitleFees] = useState<number | "">(0);
    const loanFeesTotal = round2(
  num(originationFee) +
    num(serviceFee) +
    num(appraisalFee) +
    num(titleFees)
);
    
  // Acquisition
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const pp = num(purchasePrice);

  const [buyerClosingMode, setBuyerClosingMode] = useState<"percent" | "dollar">("percent");
  const [buyerClosingValue, setBuyerClosingValue] = useState<number | "">(2); // % default

  // Holding
  const [holdMonths, setHoldMonths] = useState<number | "">(4);
  const hm = clamp0(num(holdMonths));

  const [monthlyHolding, setMonthlyHolding] = useState<number | "">(450); // utilities/insurance/taxes/etc.

type RehabLine = {
  id: string;
  label: string;
  amount: number;
};

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
 

  // ---------- Financing (Acquisition / Initial) ----------
  const [initialFinancing, setInitialFinancing] = useState<FinancingMode>("long");
  const [initialDownPct, setInitialDownPct] = useState<number | "">(20);
    const [downMode, setDownMode] = useState<"percent" | "dollar">("percent");
  const [initialRate, setInitialRate] = useState<number | "">(9.5);
  const [initialTermYears, setInitialTermYears] = useState<number | "">(30);
  const effectiveTermYears = num(initialTermYears);
    const [includeRehabInLoan, setIncludeRehabInLoan] = useState(false);

  // If you use hard money, you can still model it as amortizing for now (simple + consistent).
  // Later we can add “interest-only” as an option.

  // ---------- Exit / ARV / Sale costs ----------
  const [arv, setArv] = useState<number | "">("");
  const [saleCostPct, setSaleCostPct] = useState<number | "">(8); // commissions + seller closing, etc.

  // ---------- Rental inputs + Permanent financing ----------
  const [rentMonthly, setRentMonthly] = useState<number | "">(1650);
  const [operatingPct, setOperatingPct] = useState<number | "">(40); // taxes/ins/maint/mgmt/vacancy simplified

  const [permLtv, setPermLtv] = useState<number | "">(75);
  const [permRate, setPermRate] = useState<number | "">(7.25);
  const [permTermYears, setPermTermYears] = useState<number | "">(30);

  // ---------- Calculations ----------
  const buyerClosingCosts = useMemo(() => {
    if (!pp) return 0;
    if (buyerClosingMode === "percent") return round2(pp * (num(buyerClosingValue) / 100));
    return clamp0(num(buyerClosingValue));
  }, [pp, buyerClosingMode, buyerClosingValue]);

const rehabBase = useMemo(() => {
  return (
    rehabLines.reduce((sum, l) => sum + (l.amount || 0), 0) +
    extras.reduce((sum, e) => sum + (e.amount || 0), 0)
  );
}, [rehabLines, extras]);
    
const [fullBathCosts, setFullBathCosts] = useState<number[]>([5000]);
const [halfBathCosts, setHalfBathCosts] = useState<number[]>([]);

const bathroomRehab = useMemo(() => {
  const full = fullBathCosts.reduce((sum, v) => sum + num(v), 0);
  const half = halfBathCosts.reduce((sum, v) => sum + num(v), 0);
  return round2(full + half);
}, [fullBathCosts, halfBathCosts]);
    
    const [contingencyMode, setContingencyMode] = useState<"percent" | "dollar">("percent");
const [contingencyInput, setContingencyInput] = useState<number | "">(5);  
    
    const contingencyAmount = useMemo(() => {
  if (contingencyMode === "percent") {
    return round2(rehabBase * (num(contingencyInput) / 100));
  }
  return clamp0(num(contingencyInput));
}, [rehabBase, contingencyMode, contingencyInput]);

const rehabTotal = useMemo(() => {
  return round2(rehabBase + bathroomRehab + contingencyAmount);
}, [rehabBase, bathroomRehab, contingencyAmount]);

const holdingTotal = useMemo(() => {
  return round2(hm * clamp0(num(monthlyHolding)));
}, [hm, monthlyHolding]);

    
  // Total cost basis (not including financing interest)
  const totalProjectCostBeforeInterest = useMemo(() => {
    return round2(pp + buyerClosingCosts + rehabTotal + holdingTotal);
  }, [pp, buyerClosingCosts, rehabTotal, holdingTotal]);

  // Initial financing loan amount
const initialDownPayment = useMemo(() => {
  if (initialFinancing === "cash") return pp;

  if (downMode === "percent") {
    return round2(pp * (num(initialDownPct) / 100));
  }

  return clamp0(num(initialDownPct));
}, [initialFinancing, pp, initialDownPct, downMode]);

  const initialLoanAmount = useMemo(() => {
    if (initialFinancing === "cash") return 0;
    const baseLoan = clamp0(round2(pp - initialDownPayment));

if (includeRehabInLoan) {
  return round2(baseLoan + rehabTotal);
}

return baseLoan;
  }, [initialFinancing, pp, initialDownPayment]);

const initialMonthlyPmt = useMemo(() => {
  if (initialFinancing === "cash") return 0;

  if (initialFinancing === "interest") {
    return round2(
      initialLoanAmount * (num(initialRate) / 100 / 12)
    );
  }

  return round2(
    amortMonthlyPayment(
      initialLoanAmount,
      num(initialRate),
      num(initialTermYears)
    )
  );
}, [
  initialFinancing,
  initialLoanAmount,
  initialRate,
  initialTermYears,
]);

  // Approx interest paid during hold (amortizing)
const initialBalanceAfterHold = useMemo(() => {
  if (initialFinancing === "cash") return 0;

  if (initialFinancing === "interest") {
    return initialLoanAmount;
  }

  return amortBalanceAfterMonths(
    initialLoanAmount,
    num(initialRate),
    num(initialTermYears),
    hm
  );
}, [
  initialFinancing,
  initialLoanAmount,
  initialRate,
  initialTermYears,
  hm,
]);

  const totalPaidDuringHold = useMemo(() => {
    if (initialFinancing === "cash") return 0;
    return round2(initialMonthlyPmt * hm);
  }, [initialFinancing, initialMonthlyPmt, hm]);

  const principalPaidDuringHold = useMemo(() => {
    if (initialFinancing === "cash") return 0;
    return round2(initialLoanAmount - initialBalanceAfterHold);
  }, [initialFinancing, initialLoanAmount, initialBalanceAfterHold]);

const interestPaidDuringHold = useMemo(() => {
  if (initialFinancing === "cash") return 0;

  if (initialFinancing === "interest") {
    return round2(
      initialLoanAmount *
        (num(initialRate) / 100 / 12) *
        hm
    );
  }

  return clamp0(round2(totalPaidDuringHold - principalPaidDuringHold));
}, [
  initialFinancing,
  initialLoanAmount,
  initialRate,
  hm,
  totalPaidDuringHold,
  principalPaidDuringHold,
]);

  const totalCashInvested = useMemo(() => {
    // “Total invested (down + rehab + holding)” + buyer close + extras is usually what you want.
    // If cash purchase, down payment becomes the full purchase price.
    const downLike =
        initialFinancing === "cash" ? pp : initialDownPayment;

    return round2(
        downLike +
buyerClosingCosts +
loanFeesTotal +
rehabTotal +
holdingTotal +
interestPaidDuringHold
    );
  }, [
     initialFinancing,
      initialDownPayment,
      pp,
      buyerClosingCosts,
      loanFeesTotal,
      rehabTotal,
      holdingTotal,
      interestPaidDuringHold,
  ]);

  // ---------- Flip math ----------
  const arvNum = num(arv);

  const saleCosts = useMemo(() => {
    if (strategy !== "flip") return 0;
    if (arvNum <= 0) return 0;
    return round2(arvNum * (num(saleCostPct) / 100));
  }, [strategy, arvNum, saleCostPct]);

  const payoffAtSale = useMemo(() => {
    if (strategy !== "flip") return 0;
    if (initialFinancing === "cash") return 0;
    // If you sell after hm months, remaining balance is the payoff.
    return round2(initialBalanceAfterHold);
  }, [strategy, initialFinancing, initialBalanceAfterHold]);

  const flipProfit = useMemo(() => {
    if (strategy !== "flip") return 0;
    if (arvNum <= 0) return 0;

    // Proceeds minus sale costs minus payoff minus all cash invested items that aren't in payoff
    // Note: totalCashInvested includes down + costs + interest. Payoff handles remaining debt.
    // A simple consistent approach:
    // Profit = Sale Price - SaleCosts - Payoff - (cash invested excluding down?).
    // But since cash invested already includes down, and payoff is remaining debt, we can use:
    // Profit = SalePrice - SaleCosts - (TotalProjectCostBeforeInterest + InterestPaidDuringHold) + LoanAmount
    // Easier: cashflow view:
    // Total out of pocket = totalCashInvested
    // Net cash received at sale = SalePrice - SaleCosts - Payoff
    // Profit = Net cash received - Total out of pocket
    const netCashAtSale = arvNum - saleCosts - payoffAtSale;
    return round2(netCashAtSale - totalCashInvested);
  }, [
    strategy,
    arvNum,
    saleCosts,
    payoffAtSale,
    totalCashInvested,
  ]);

  const flipRoi = useMemo(() => {
    if (strategy !== "flip") return 0;
    if (totalCashInvested <= 0) return 0;
    return round2((flipProfit / totalCashInvested) * 100);
  }, [strategy, flipProfit, totalCashInvested]);

  // ---------- Rental math ----------
  const basisForRefi = useMemo(() => {
    // Usually refinance uses appraised value (ARV). If none, use total cost.
    return arvNum > 0 ? arvNum : totalProjectCostBeforeInterest;
  }, [arvNum, totalProjectCostBeforeInterest]);

  const permLoanAmount = useMemo(() => {
    if (strategy !== "rental") return 0;
    return round2(basisForRefi * (num(permLtv) / 100));
  }, [strategy, basisForRefi, permLtv]);

  const permMonthlyPmt = useMemo(() => {
    if (strategy !== "rental") return 0;
    return round2(amortMonthlyPayment(permLoanAmount, num(permRate), num(permTermYears)));
  }, [strategy, permLoanAmount, permRate, permTermYears]);

  const grossRentAnnual = useMemo(() => {
    if (strategy !== "rental") return 0;
    return round2(clamp0(num(rentMonthly)) * 12);
  }, [strategy, rentMonthly]);
    
const [taxMode, setTaxMode] = useState<"percent" | "dollar">("percent");
const [insMode, setInsMode] = useState<"percent" | "dollar">("percent");

const [taxInput, setTaxInput] = useState<number | "">(1.185);
const [insInput, setInsInput] = useState<number | "">(1.5);
    
const annualTaxes = useMemo(() => {
  if (taxMode === "percent") {
    return round2(basisForRefi * (num(taxInput) / 100));
  }
  return clamp0(num(taxInput));
}, [basisForRefi, taxMode, taxInput]);
const annualInsurance = useMemo(() => {
  if (insMode === "percent") {
    return round2(basisForRefi * (num(insInput) / 100));
  }
  return clamp0(num(insInput));
}, [basisForRefi, insMode, insInput]);

  const operatingExpensesAnnual = useMemo(() => {
    if (strategy !== "rental") return 0;
    return round2(
  grossRentAnnual * (num(operatingPct) / 100) +
  annualTaxes +
  annualInsurance
);
}, [
  strategy,
  grossRentAnnual,
  operatingPct,
  annualTaxes,
  annualInsurance,
]);

  const noi = useMemo(() => {
    if (strategy !== "rental") return 0;
    return round2(grossRentAnnual - operatingExpensesAnnual);
  }, [strategy, grossRentAnnual, operatingExpensesAnnual]);

  const debtServiceAnnual = useMemo(() => {
    if (strategy !== "rental") return 0;
    return round2(permMonthlyPmt * 12);
  }, [strategy, permMonthlyPmt]);

  const cashFlowAnnual = useMemo(() => {
    if (strategy !== "rental") return 0;
    return round2(noi - debtServiceAnnual);
  }, [strategy, noi, debtServiceAnnual]);

  const capRate = useMemo(() => {
    if (strategy !== "rental") return 0;
    const denom = totalProjectCostBeforeInterest || 0;
    if (denom <= 0) return 0;
    return round2((noi / denom) * 100);
  }, [strategy, noi, totalProjectCostBeforeInterest]);

  const cocReturn = useMemo(() => {
    if (strategy !== "rental") return 0;
    if (totalCashInvested <= 0) return 0;
    return round2((cashFlowAnnual / totalCashInvested) * 100);
  }, [strategy, cashFlowAnnual, totalCashInvested]);
    
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
  line("Purchase", money0(pp));
  line("Rehab", money0(rehabTotal));
  line("Holding", money0(holdingTotal));
  line("Cash Invested", money0(totalCashInvested));

  y += 4;

  if (strategy === "flip") {
    line("ARV", money0(arvNum));
    line("Projected Profit", money0(flipProfit));
    line("ROI", `${flipRoi.toFixed(2)}%`);
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

  // ---------- UI ----------
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
          <div>
            <div className="text-2xl font-bold">Rehab / Offer Underwriting</div>
            <div className="text-sm text-gray-500">
              Quick offer math + Flip vs Rental
            </div>
              <button
  onClick={downloadPDF}
  className="border px-4 py-2 rounded-xl text-sm"
>
  Download PDF
</button>
          </div>
        </div>
      </div>

      {/* Property + Strategy */}
      <div className="border rounded-2xl p-4 space-y-4">
        <Field label="Property Address / Title">
          <input
            value={propertyTitle}
            onChange={(e) => setPropertyTitle(e.target.value)}
            placeholder="123 Main Street Norman, OK"
            className="border rounded-xl px-3 py-2 w-full"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-xl p-3">
            <div className="text-xs font-semibold uppercase text-gray-500 mb-2">
              Strategy
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStrategy("flip")}
                className={`px-3 py-2 rounded-xl text-sm w-full ${
                  strategy === "flip" ? "bg-black text-white" : "border"
                }`}
              >
                Flip
              </button>
              <button
                onClick={() => setStrategy("rental")}
                className={`px-3 py-2 rounded-xl text-sm w-full ${
                  strategy === "rental" ? "bg-black text-white" : "border"
                }`}
              >
                Keep as Rental
              </button>
            </div>
          </div>

          <div className="border rounded-xl p-3">
            <div className="text-xs font-semibold uppercase text-gray-500 mb-2">
              Holding Period
            </div>
            <FieldInline label="Months">
              <NumberInput value={holdMonths} set={setHoldMonths} placeholder="4" />
            </FieldInline>
          </div>
        </div>
      </div>

      {/* Acquisition */}
      <div className="border rounded-2xl p-4 space-y-4">
        <div className="text-sm font-semibold">Acquisition</div>

        <Field label="Purchase Price">
          <NumberInput value={purchasePrice} set={setPurchasePrice} unit="$" />
        </Field>
          
          
          
          <div className="border rounded-xl p-3 bg-gray-50 space-y-2">
  <div className="text-xs font-semibold uppercase text-gray-500">
    Loan &amp; Closing Costs
  </div>

  <FieldInline label="Origination Fee">
    <NumberInput value={originationFee} set={setOriginationFee} unit="$"/>
  </FieldInline>

  <FieldInline label="Service Fee">
    <NumberInput value={serviceFee} set={setServiceFee} unit="$" />
  </FieldInline>

  <FieldInline label="Appraisal">
    <NumberInput value={appraisalFee} set={setAppraisalFee} unit="$" />
  </FieldInline>

  <FieldInline label="Title / Escrow">
    <NumberInput value={titleFees} set={setTitleFees} unit="$" />
  </FieldInline>

  <Line label="Total Closing Costs" value={money0(loanFeesTotal)} />
</div>

      </div>
          
          {/* Initial financing */}
      <div className="border rounded-2xl p-4 space-y-4">
        <div className="text-sm font-semibold">Initial Financing</div>

        <Field label="Financing">
          <select
            value={initialFinancing}
            onChange={(e) => setInitialFinancing(e.target.value as FinancingMode)}
            className="border rounded-xl px-3 py-2 w-full"
          >
            <option value="cash">Cash</option>
            <option value="long">Long-Term Loan</option>
            <option value="interest">Interest Only Loan</option>
          </select>
        </Field>

{initialFinancing !== "cash" && (
  <>
        <div className="flex items-center gap-2 text-sm">
  <input
    type="checkbox"
    checked={includeRehabInLoan}
    onChange={(e) => setIncludeRehabInLoan(e.target.checked)}
  />
  <span>Include Rehab Budget in Loan</span>
</div>
    <div className="grid grid-cols-3 gap-3">
      <FieldInline label="Down">
        <NumberInput
          value={initialDownPct}
          set={setInitialDownPct}
          unit={downMode === "percent" ? "%" : "$"}
        />
      </FieldInline>

      <FieldInline label="Rate %">
        <NumberInput
          value={initialRate}
          set={setInitialRate}
          placeholder="9.5"
        />
      </FieldInline>

      <FieldInline label="Term yrs">
        <NumberInput
          value={initialTermYears}
          set={setInitialTermYears}
          placeholder="30"
        />
      </FieldInline>
    </div>

    <div className="flex gap-2">
      <div className="flex border rounded-xl overflow-hidden">
  <button
    type="button"
    onClick={() => setDownMode("percent")}
    className={`px-3 py-1 text-sm ${
      downMode === "percent" ? "bg-black text-white" : "bg-white"
    }`}
  >
    %
  </button>

  <button
    type="button"
    onClick={() => setDownMode("dollar")}
    className={`px-3 py-1 text-sm ${
      downMode === "dollar" ? "bg-black text-white" : "bg-white"
    }`}
  >
    $
  </button>
</div>
    </div>
  </>
)}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Line
            label={initialFinancing === "cash" ? "Cash Purchase" : "Down Payment"}
            value={money0(initialFinancing === "cash" ? pp : initialDownPayment)}
          />
          <Line
            label="Loan Amount"
            value={money0(initialLoanAmount)}
          />
        </div>

        {initialFinancing !== "cash" && (
          <div className="border rounded-xl p-3 bg-gray-50 space-y-2">
<Line
  label={
    initialFinancing === "interest"
      ? "Monthly Payment (interest only)"
      : "Monthly Payment (amortizing)"
  }
  value={money0(initialMonthlyPmt)}
/>
            <Line label="Interest During Hold (approx)" value={money0(interestPaidDuringHold)} />
            <Line label="Balance at Sale / Refi (approx)" value={money0(initialBalanceAfterHold)} />
          </div>
        )}
      </div>

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

    <NumberInput
      value={cost}
      unit="$"
      set={(v) => {
        const updated = [...fullBathCosts];
        updated[i] = typeof v === "number" ? v : 0;
        setFullBathCosts(updated);
      }}
    />

    <button
      type="button"
      onClick={() =>
        setFullBathCosts(fullBathCosts.filter((_, idx) => idx !== i))
      }
      className="text-xs text-red-500"
    >
      ✕
    </button>
  </div>
))}

 <button
  type="button"
  onClick={() =>
    setFullBathCosts([...fullBathCosts, 9000])
  }
  className="text-xs px-2 py-1 border rounded-lg"
>
  + Full
</button>

{halfBathCosts.map((cost, i) => (
  <div key={`half-${i}`} className="flex gap-2 items-center">
    <span className="text-xs w-12">Half</span>

    <NumberInput
      value={cost}
      unit="$"
      set={(v) => {
        const updated = [...halfBathCosts];
        updated[i] = typeof v === "number" ? v : 0;
        setHalfBathCosts(updated);
      }}
    />

    <button
      type="button"
      onClick={() =>
        setHalfBathCosts(halfBathCosts.filter((_, idx) => idx !== i))
      }
      className="text-xs text-red-500"
    >
      ✕
    </button>
  </div>
))}

<button
  type="button"
  onClick={() =>
    setHalfBathCosts([...halfBathCosts, 2500])
  }
  className="text-xs px-2 py-1 border rounded-lg"
>
  + Half
</button>

          </div>
        </div>

        <div className="col-span-2 text-sm font-semibold text-right">
          {money0(bathroomRehab)}
        </div>
      </>
    ) : (
      <>
        <div className="col-span-3 text-sm">{line.label}</div>

        <NumberInput
          value={line.amount}
          unit="$"
          set={(v) =>
            setRehabLines((prev) =>
              prev.map((l) =>
                l.id === line.id
                  ? { ...l, amount: typeof v === "number" ? v : 0 }
                  : l
              )
            )
          }
        />

        <div className="text-sm font-semibold text-right">
          {money0(line.amount)}
        </div>
      </>
    )}
  </div>
))} 
          
          <div className="border-t pt-3 space-y-2">
  <div className="text-xs font-semibold uppercase text-gray-500">
    Custom Items
  </div>

  {extras.map((row) => (
    <div key={row.id} className="grid grid-cols-5 gap-2 items-center">
      <input
        value={row.label}
        onChange={(e) =>
          setExtras((prev) =>
            prev.map((r) =>
              r.id === row.id ? { ...r, label: e.target.value } : r
            )
          )
        }
        className="border rounded-xl px-2 py-2 col-span-3"
        placeholder="Custom Item"
      />

      <NumberInput
        value={row.amount}
        unit="$"
        set={(v) =>
          setExtras((prev) =>
            prev.map((r) =>
              r.id === row.id
                ? { ...r, amount: typeof v === "number" ? v : 0 }
                : r
            )
          )
        }
      />
    </div>
  ))}

  <button
    onClick={() =>
      setExtras((prev) => [
        ...prev,
        { id: crypto.randomUUID(), label: "", amount: 0 },
      ])
    }
    className="text-sm underline"
  >
    + Add Custom Item
  </button>
</div>
          
<div className="flex items-center gap-3">
  <span className="text-sm">Contingency</span>

  <NumberInput
    value={contingencyInput}
    set={setContingencyInput}
    unit={contingencyMode === "percent" ? "%" : "$"}
  />

  <div className="flex border rounded-xl overflow-hidden">
    <button
      type="button"
      onClick={() => setContingencyMode("percent")}
      className={`px-3 py-1 text-sm ${
        contingencyMode === "percent" ? "bg-black text-white" : "bg-white"
      }`}
    >
      %
    </button>

    <button
      type="button"
      onClick={() => setContingencyMode("dollar")}
      className={`px-3 py-1 text-sm ${
        contingencyMode === "dollar" ? "bg-black text-white" : "bg-white"
      }`}
    >
      $
    </button>
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
        <Line
          label="Total Project Cost (before interest)"
          value={money0(totalProjectCostBeforeInterest)}
        />
      </div>

      {/* Flip section */}
      {strategy === "flip" && (
        <div className="border rounded-2xl p-4 space-y-4">
          <div className="text-sm font-semibold">Flip Exit</div>

          <Field label="After Repair Value (ARV)">
            <NumberInput value={arv} set={setArv} placeholder="240000" />
          </Field>

          <Field label="Sale Costs % (commissions + seller closing)">
            <NumberInput value={saleCostPct} set={setSaleCostPct} unit="%" />
          </Field>

          <div className="border rounded-xl p-3 bg-gray-50 space-y-2">
            <Line label="Sale Costs (calculated)" value={money0(saleCosts)} />
            <Line label="Loan Payoff at Sale (approx)" value={money0(payoffAtSale)} />
            <div className="pt-2 border-t flex justify-between font-semibold">
              <span>Projected Profit</span>
              <span>{money0(flipProfit)}</span>
            </div>
            <Line label="ROI on Cash Invested" value={`${money2(flipRoi)}%`} />
          </div>
        </div>
      )}

{/* Rental section */}
{strategy === "rental" && (
  <>
    <div className="border rounded-2xl p-4 space-y-4">
      <div className="text-sm font-semibold">Keep as Rental</div>

        <Field label="Estimated ARV / Appraised Value">
  <NumberInput value={arv} set={setArv} unit="$" />
</Field>

      <div className="grid grid-cols-2 gap-3">
        <FieldInline label="Monthly Rent">
          <NumberInput value={rentMonthly} set={setRentMonthly} unit="$" />
        </FieldInline>

        <FieldInline label="OpEx % (simplified)">
          <NumberInput value={operatingPct} set={setOperatingPct} unit="%" />
        </FieldInline>
      </div>

      <div className="border rounded-xl p-3 space-y-3">
        <div className="text-xs font-semibold uppercase text-gray-500">
          Permanent Financing (refi / long-term)
        </div>

        <div className="grid grid-cols-3 gap-3">
          <FieldInline label="LTV %">
            <NumberInput value={permLtv} set={setPermLtv} unit="%" />
          </FieldInline>

          <FieldInline label="Rate %">
            <NumberInput value={permRate} set={setPermRate} unit="%" />
          </FieldInline>

          <FieldInline label="Term yrs">
            <NumberInput value={permTermYears} set={setPermTermYears} />
          </FieldInline>
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
        <div className="pt-2 border-t flex justify-between font-semibold">
          <span>Cash Flow (annual)</span>
          <span>{money0(cashFlowAnnual)}</span>
        </div>
        <Line label="Cap Rate (on total cost)" value={`${capRate.toFixed(2)}%`} />
        <Line label="Cash-on-Cash (on cash invested)" value={`${cocReturn.toFixed(2)}%`} />
      </div>
    </div>
  </>
)}
          </div>
  );
}

/* ---------- Small UI helpers (match your other engines) ---------- */

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

function NumberInput({
  value,
  set,
  placeholder,
  unit,
}: {
  value: number | "";
  set: (v: number | "") => void;
  placeholder?: string;
  unit?: string;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => set(e.target.value === "" ? "" : +e.target.value)}
        className="border rounded-xl px-3 py-2 w-full pr-10"
      />
      {unit ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
          {unit}
        </div>
      ) : null}
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