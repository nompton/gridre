"use client";
import { useState, useMemo } from "react";

export default function ProformaEngine() {
  const [propertyName, setPropertyName] = useState("Willowisp");
  const [address, setAddress] = useState("");

  const [purchasePrice, setPurchasePrice] = useState(255000);
  const [downPercent, setDownPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(7.25);
  const [termYears, setTermYears] = useState(30);

  const [units, setUnits] = useState([
    { label: "Unit 1", rent: 1200 },
    { label: "Unit 2", rent: 1400 },
  ]);

  const [vacancyPercent, setVacancyPercent] = useState(5);

  const [taxes, setTaxes] = useState(3200);
  const [insurance, setInsurance] = useState(3000);
  const [managementPercent, setManagementPercent] = useState(10);
  const [maintenancePercent, setMaintenancePercent] = useState(10);

  const loanAmount = purchasePrice * (1 - downPercent / 100);

  const monthlyPayment = useMemo(() => {
    const r = interestRate / 100 / 12;
    const n = termYears * 12;
    if (r === 0) return loanAmount / n;
    return (
      loanAmount *
      (r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
    );
  }, [loanAmount, interestRate, termYears]);

  const annualDebtService = monthlyPayment * 12;

  const grossScheduledIncome = units.reduce(
    (sum, unit) => sum + unit.rent * 12,
    0
  );

  const vacancyLoss =
    grossScheduledIncome * (vacancyPercent / 100);

  const effectiveGross =
    grossScheduledIncome - vacancyLoss;

  const management =
    effectiveGross * (managementPercent / 100);

  const maintenance =
    effectiveGross * (maintenancePercent / 100);

  const totalExpenses =
    annualDebtService +
    taxes +
    insurance +
    management +
    maintenance;

  const noi = effectiveGross - totalExpenses;

  const capRate = (noi / purchasePrice) * 100;

  const cashInvested =
    purchasePrice * (downPercent / 100);

  const cashOnCash = (noi / cashInvested) * 100;

  const dscr =
    annualDebtService > 0
      ? effectiveGross / annualDebtService
      : 0;

  const format = (num: number) =>
    num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const addUnit = () => {
    setUnits([...units, { label: `Unit ${units.length + 1}`, rent: 0 }]);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-sm">

      <div className="mb-6">
        <input
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          className="text-xl font-bold border-b w-full mb-2"
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border-b w-full"
        />
        <div className="text-xs mt-2">
          Generated {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* CONTROLS */}
      <Section title="CONTROLS">
        <Row label="Purchase Price" input value={purchasePrice} set={setPurchasePrice} />
        <Row label="Down Payment (%)" input value={downPercent} set={setDownPercent} />
        <Row label="Interest Rate (%)" input value={interestRate} set={setInterestRate} />
        <Row label="Term (Years)" input value={termYears} set={setTermYears} />
        <Row label="Loan Amount" value={format(loanAmount)} />
        <Row label="Annual Debt Service" value={format(annualDebtService)} />
      </Section>

      {/* INCOME */}
      <Section title="INCOME">
        {units.map((unit, i) => (
          <div key={i} className="flex justify-between mb-1">
            <input
              value={unit.label}
              onChange={(e) => {
                const copy = [...units];
                copy[i].label = e.target.value;
                setUnits(copy);
              }}
              className="w-1/2 border-b"
            />
            <input
              type="number"
              value={unit.rent}
              onChange={(e) => {
                const copy = [...units];
                copy[i].rent = +e.target.value;
                setUnits(copy);
              }}
              className="w-1/4 text-right border-b"
            />
          </div>
        ))}
        <button onClick={addUnit} className="text-blue-600 text-xs mb-3">
          + Add Unit
        </button>

        <Row label="Gross Scheduled Income" value={format(grossScheduledIncome)} />
        <Row label="Vacancy (%)" input value={vacancyPercent} set={setVacancyPercent} />
        <Row label="Effective Gross Income" value={format(effectiveGross)} />
      </Section>

      {/* EXPENSES */}
      <Section title="EXPENSES">
        <Row label="Taxes" input value={taxes} set={setTaxes} />
        <Row label="Insurance" input value={insurance} set={setInsurance} />
        <Row label="Management (%)" input value={managementPercent} set={setManagementPercent} />
        <Row label="Maintenance (%)" input value={maintenancePercent} set={setMaintenancePercent} />
        <Row label="Management (Calc)" value={format(management)} />
        <Row label="Maintenance (Calc)" value={format(maintenance)} />
        <Row label="Total Expenses" value={format(totalExpenses)} />
      </Section>

      {/* OUTPUT */}
      <Section title="RESULTS">
        <Row label="NOI" value={format(noi)} />
        <Row label="Cap Rate (%)" value={capRate.toFixed(2)} />
        <Row label="Cash on Cash (%)" value={cashOnCash.toFixed(2)} />
        <Row label="DSCR" value={dscr.toFixed(2)} />
      </Section>

      <div className="mt-8">
        <button
          onClick={() => window.print()}
          className="border px-4 py-2 text-xs"
        >
          Download / Print PDF
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-6">
      <div className="border-b font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value, input, set }: any) {
  return (
    <div className="flex justify-between mb-1">
      <div>{label}</div>
      {input ? (
        <input
          type="number"
          value={value}
          onChange={(e) => set(+e.target.value)}
          className="text-right border-b w-32"
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}