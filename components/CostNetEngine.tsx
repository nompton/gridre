"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

type Financing = "cash" | "loan";
type BrokerFeeMode = "percent" | "flat";
type WhoPays = "buyer" | "seller";
type LedgerRow = { label: string; debit: number; credit: number };

const money0 = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const money2 = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const num = (v: number | "") => (v === "" ? 0 : v);
const clamp0 = (n: number) => (n < 0 ? 0 : n);
const round2 = (n: number) => Math.round(n * 100) / 100;

function calcTitlePolicy(price: number) {
  if (price <= 0) return 0;
  const pts = [{ p: 40000, v: 256 }, { p: 50000, v: 329 }, { p: 75000, v: 470 }, { p: 100000, v: 593 }, { p: 200000, v: 923 }];
  if (price <= pts[0].p) return pts[0].v;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    if (price <= b.p) { const t = (price - a.p) / (b.p - a.p); return round2(a.v + t * (b.v - a.v)); }
  }
  return round2(pts[pts.length - 1].v + ((price - 200000) / 1000) * 3);
}

function calcMortgageTax(loanAmount: number, termYears: number) {
  if (loanAmount <= 0) return 0;
  let ratePer100 = 0.10;
  if (termYears < 2) ratePer100 = 0.02;
  else if (termYears < 3) ratePer100 = 0.04;
  else if (termYears < 4) ratePer100 = 0.06;
  else if (termYears < 5) ratePer100 = 0.08;
  return round2((loanAmount / 100) * ratePer100);
}

function daysBetween(a: Date, b: Date) { return (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24); }

export default function CostNetEngine() {
  type Side = "buyer" | "seller";
  const [side, setSide] = useState<Side>("buyer");
  const [hasHoa, setHasHoa] = useState(false);
  const [salesPrice, setSalesPrice] = useState<number | "">("");
  const price = num(salesPrice);
  const [propertyTitle, setPropertyTitle] = useState("");
  const [hoaFrequency, setHoaFrequency] = useState<"monthly" | "annual">("monthly");
  const [sellerBrokerPercent, setSellerBrokerPercent] = useState<number | "">("");
  const [buyerBrokerPercentSeller, setBuyerBrokerPercentSeller] = useState<number | "">("");
  const [sellerLoanBalance, setSellerLoanBalance] = useState<number | "">("");
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  type ExtraCost = { id: string; label: string; amount: number; type: "debit" | "credit" };
  const [buyerExtras, setBuyerExtras] = useState<ExtraCost[]>([]);
  const [sellerExtras, setSellerExtras] = useState<ExtraCost[]>([]);

  const addBuyerExtra = () => setBuyerExtras([...buyerExtras, { id: crypto.randomUUID(), label: "", amount: 0, type: "debit" }]);
  const updateBuyerExtra = (id: string, field: "label" | "amount", value: any) =>
    setBuyerExtras((prev) => prev.map((item) => item.id === id ? { ...item, [field]: value } : item));
  const removeBuyerExtra = (id: string) => setBuyerExtras((prev) => prev.filter((item) => item.id !== id));

  const sellerBrokerFee = useMemo(() => round2(price * (num(sellerBrokerPercent) / 100)), [price, sellerBrokerPercent]);
  const buyerBrokerFeeSellerSide = useMemo(() => round2(price * (num(buyerBrokerPercentSeller) / 100)), [price, buyerBrokerPercentSeller]);
  const docStamps = useMemo(() => round2((price / 1000) * 1.5), [price]);

  const [settlementSeller, setSettlementSeller] = useState<number | "">(135);
  const [closingSeller, setClosingSeller] = useState<number | "">(200);
  const [abstracting, setAbstracting] = useState<number | "">(575);
  const sellerTitleFeesTotal = useMemo(() => round2(num(settlementSeller) + num(closingSeller) + num(abstracting) + docStamps), [settlementSeller, closingSeller, abstracting, docStamps]);

  const [closeDate, setCloseDate] = useState<string>("");
  const [financing, setFinancing] = useState<Financing>("loan");
  const [taxMode, setTaxMode] = useState<"percent" | "dollar">("percent");
  const [insuranceMode, setInsuranceMode] = useState<"percent" | "dollar">("percent");
  const [downPercent, setDownPercent] = useState<number | "">(20);
  const [interestRate, setInterestRate] = useState<number | "">(7.0);
  const [termYears, setTermYears] = useState<number | "">(30);
  const [brokerMode, setBrokerMode] = useState<BrokerFeeMode>("percent");
  const [brokerPercent, setBrokerPercent] = useState<number | "">(3);
  const [brokerFlat, setBrokerFlat] = useState<number | "">("");
  const [brokerPaidBy, setBrokerPaidBy] = useState<WhoPays>("seller");
  const [sellerConcession, setSellerConcession] = useState<number | "">("");
  const [earnestMoney, setEarnestMoney] = useState<number | "">("");
  const [hoaAmount, setHoaAmount] = useState<number | "">("");
  const [taxRate, setTaxRate] = useState<number | "">(1.185);
  const [insuranceRate, setInsuranceRate] = useState<number | "">(1.5);
  const [showDetail, setShowDetail] = useState(false);
  const [settlementService, setSettlementService] = useState<number | "">(200);
  const [closingFee, setClosingFee] = useState<number | "">(200);
  const [cpl, setCpl] = useState<number | "">(25);
  const [finalTitle, setFinalTitle] = useState<number | "">(150);
  const [titleExam, setTitleExam] = useState<number | "">(200);
  const [mortgageCert, setMortgageCert] = useState<number | "">(10);
  const [appraisal, setAppraisal] = useState<number | "">(700);
  const [originationPercent, setOriginationPercent] = useState<number | "">(1);
  const [mic, setMic] = useState<number | "">(200);
  const [creditReport, setCreditReport] = useState<number | "">(75);
  const [underwriting, setUnderwriting] = useState<number | "">(600);
  const [mortgageRecFee1, setMortgageRecFee1] = useState<number | "">(24);
  const [mortgageRecFee2, setMortgageRecFee2] = useState<number | "">(46);

  // URL state
  useEffect(() => {
    const raw = window.location.hash.slice(1);
    const colonIdx = raw.indexOf(":");
    const hash = colonIdx !== -1 ? raw.slice(colonIdx + 1) : raw;
    if (!hash) return;
    try {
      const s = JSON.parse(atob(hash));
      if (s.side) setSide(s.side);
      if (s.sp !== undefined) setSalesPrice(s.sp);
      if (s.t !== undefined) setPropertyTitle(s.t);
      if (s.fin !== undefined) setFinancing(s.fin);
      if (s.dp !== undefined) setDownPercent(s.dp);
      if (s.ir !== undefined) setInterestRate(s.ir);
      if (s.ty !== undefined) setTermYears(s.ty);
      if (s.cd !== undefined) setCloseDate(s.cd);
    } catch {}
  }, []);

  const shareUrl = () => {
    const s = { side, sp: salesPrice, t: propertyTitle, fin: financing, dp: downPercent, ir: interestRate, ty: termYears, cd: closeDate };
    const url = window.location.href.split("#")[0] + "#costnet:" + btoa(JSON.stringify(s));
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const loanRequiredFieldsMissing = financing === "loan" && (price <= 0 || num(downPercent) <= 0 || num(interestRate) <= 0 || num(termYears) <= 0);
  const downPayment = useMemo(() => financing !== "loan" ? 0 : round2(price * (num(downPercent) / 100)), [financing, price, downPercent]);
  const loanAmount = useMemo(() => financing !== "loan" ? 0 : clamp0(round2(price - downPayment)), [financing, price, downPayment]);
  const originationFee = useMemo(() => financing !== "loan" ? 0 : round2(loanAmount * (num(originationPercent) / 100)), [financing, loanAmount, originationPercent]);
  const titlePolicy = useMemo(() => calcTitlePolicy(price), [price]);
  const titleFeesTotal = useMemo(() => round2(titlePolicy + num(settlementService) + num(closingFee) + num(cpl) + num(finalTitle) + num(titleExam) + num(mortgageCert)), [titlePolicy, settlementService, closingFee, cpl, finalTitle, titleExam, mortgageCert]);
  const mortgageTax = useMemo(() => financing !== "loan" ? 0 : calcMortgageTax(loanAmount, num(termYears)), [financing, loanAmount, termYears]);
  const recordingFees = useMemo(() => financing !== "loan" ? 0 : round2(num(mortgageRecFee1) + num(mortgageRecFee2)), [financing, mortgageRecFee1, mortgageRecFee2]);
  const lenderFeesTotal = useMemo(() => financing !== "loan" ? 0 : round2(originationFee + num(appraisal) + num(mic) + num(creditReport) + num(underwriting)), [financing, originationFee, appraisal, mic, creditReport, underwriting]);

  const annualInsurance = useMemo(() => insuranceMode === "percent" ? round2(price * (num(insuranceRate) / 100)) : round2(num(insuranceRate)), [price, insuranceRate, insuranceMode]);
  const insurancePrepaid14Mo = useMemo(() => financing !== "loan" ? 0 : round2((annualInsurance / 12) * 14), [financing, annualInsurance]);

  const proratedInterestToMonthEnd = useMemo(() => {
    if (financing !== "loan" || !closeDate) return 0;
    const close = new Date(closeDate);
    const endOfMonth = new Date(close.getFullYear(), close.getMonth() + 1, 0);
    const days = clamp0(daysBetween(close, endOfMonth));
    const dailyRate = (num(interestRate) / 100) / 365;
    return round2(loanAmount * dailyRate * days);
  }, [financing, closeDate, interestRate, loanAmount]);

  const buyerBrokerFee = useMemo(() => {
    if (price <= 0) return 0;
    if (brokerMode === "percent") return round2(price * (num(brokerPercent) / 100));
    return clamp0(num(brokerFlat));
  }, [price, brokerMode, brokerPercent, brokerFlat]);

  const buyerBrokerPaidByBuyer = brokerPaidBy === "buyer" ? buyerBrokerFee : 0;
  const concession = clamp0(num(sellerConcession));
  const earnest = clamp0(num(earnestMoney));
  const loanPrepaidsTotal = useMemo(() => financing !== "loan" ? 0 : round2(insurancePrepaid14Mo + proratedInterestToMonthEnd), [financing, insurancePrepaid14Mo, proratedInterestToMonthEnd]);

  const annualTaxes = useMemo(() => taxMode === "percent" ? round2(price * (num(taxRate) / 100)) : round2(num(taxRate)), [price, taxRate, taxMode]);

  const taxProration = useMemo(() => {
    if (!closeDate || !annualTaxes) return 0;
    const close = new Date(closeDate);
    const startOfYear = new Date(close.getFullYear(), 0, 1);
    const daysOwned = clamp0(daysBetween(startOfYear, close));
    return round2((annualTaxes / 365) * daysOwned);
  }, [closeDate, annualTaxes]);

  const annualHoa = useMemo(() => {
    const amt = clamp0(num(hoaAmount));
    if (!amt) return 0;
    return hoaFrequency === "monthly" ? amt * 12 : amt;
  }, [hoaAmount, hoaFrequency]);

  const hoaProration = useMemo(() => {
    if (!hasHoa || !closeDate || !hoaAmount) return 0;
    const close = new Date(closeDate);
    if (hoaFrequency === "monthly") {
      const endOfMonth = new Date(close.getFullYear(), close.getMonth() + 1, 0);
      const remainingDays = clamp0(daysBetween(close, endOfMonth));
      return round2((num(hoaAmount) / endOfMonth.getDate()) * remainingDays);
    }
    const endOfYear = new Date(close.getFullYear(), 11, 31);
    return round2((annualHoa / 365) * clamp0(daysBetween(close, endOfYear)));
  }, [closeDate, annualHoa, hoaAmount, hoaFrequency, hasHoa]);

  const buyerClosingCosts = useMemo(() => round2(
    buyerBrokerPaidByBuyer + hoaProration + titleFeesTotal + lenderFeesTotal + recordingFees + mortgageTax + loanPrepaidsTotal +
    buyerExtras.reduce((sum, item) => sum + item.amount, 0)
  ), [buyerBrokerPaidByBuyer, hoaProration, titleFeesTotal, lenderFeesTotal, recordingFees, mortgageTax, loanPrepaidsTotal, buyerExtras]);

  const sellerNet = useMemo(() => round2(
    price - sellerBrokerFee - buyerBrokerFeeSellerSide - concession - num(sellerLoanBalance) - sellerTitleFeesTotal - taxProration + hoaProration -
    sellerExtras.reduce((sum, item) => sum + item.amount, 0)
  ), [price, sellerBrokerFee, buyerBrokerFeeSellerSide, concession, sellerLoanBalance, sellerTitleFeesTotal, taxProration, hoaProration, sellerExtras]);

  // Monthly PITI calculation for buyer
  const monthlyPI = useMemo(() => {
    if (financing !== "loan" || loanAmount <= 0) return 0;
    const r = num(interestRate) / 100 / 12;
    const n = num(termYears) * 12;
    if (!r || !n) return 0;
    return round2((loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1));
  }, [financing, loanAmount, interestRate, termYears]);

  const monthlyTaxes = round2(annualTaxes / 12);
  const monthlyInsurance = round2(annualInsurance / 12);
  const monthlyHoa = hasHoa ? round2(annualHoa / 12) : 0;
  const monthlyPITI = round2(monthlyPI + monthlyTaxes + monthlyInsurance + monthlyHoa);

  // Ledger arrays
  const buyerLedger: LedgerRow[] = [];
  if (brokerPaidBy === "buyer") buyerLedger.push({ label: "Buyer Broker Fee", debit: buyerBrokerFee, credit: 0 });
  if (showDetail) {
    buyerLedger.push(
      { label: "Title Policy", debit: titlePolicy, credit: 0 },
      { label: "Settlement Service", debit: num(settlementService), credit: 0 },
      { label: "Closing Fee", debit: num(closingFee), credit: 0 },
      { label: "CPL", debit: num(cpl), credit: 0 },
      { label: "Final Title Report", debit: num(finalTitle), credit: 0 },
      { label: "Title Exam", debit: num(titleExam), credit: 0 },
      { label: "Mortgage Certification", debit: num(mortgageCert), credit: 0 }
    );
  } else {
    buyerLedger.push({ label: "Title Fees", debit: titleFeesTotal, credit: 0 });
  }
  if (financing === "loan") {
    if (showDetail) {
      buyerLedger.push(
        { label: "Origination", debit: originationFee, credit: 0 },
        { label: "Appraisal", debit: num(appraisal), credit: 0 },
        { label: "MIC", debit: num(mic), credit: 0 },
        { label: "Credit Report", debit: num(creditReport), credit: 0 },
        { label: "Underwriting", debit: num(underwriting), credit: 0 },
        { label: "Mortgage Tax", debit: mortgageTax, credit: 0 },
        { label: "Recording Fees", debit: recordingFees, credit: 0 },
        { label: "Loan Prepaids", debit: loanPrepaidsTotal, credit: 0 }
      );
    } else {
      buyerLedger.push(
        { label: "Lender Fees", debit: lenderFeesTotal + mortgageTax + recordingFees, credit: 0 },
        { label: "Loan Prepaids", debit: loanPrepaidsTotal, credit: 0 }
      );
    }
  }
  if (financing === "loan" && downPayment > 0) buyerLedger.push({ label: "Down Payment", debit: downPayment, credit: 0 });
  if (taxProration > 0) buyerLedger.push({ label: "Tax Proration (Credit from Seller)", debit: 0, credit: taxProration });
  if (hasHoa && hoaProration > 0) buyerLedger.push({ label: "HOA Proration (Credit from Seller)", debit: 0, credit: hoaProration });
  buyerExtras.forEach((e) => { if (e.amount !== 0) buyerLedger.push({ label: e.label || "Additional Cost", debit: e.type === "debit" ? e.amount : 0, credit: e.type === "credit" ? e.amount : 0 }); });
  if (concession > 0) buyerLedger.push({ label: "Seller Concession", debit: 0, credit: concession });
  if (earnest > 0) buyerLedger.push({ label: "Earnest Money", debit: 0, credit: earnest });

  const sellerLedger: LedgerRow[] = [];
  sellerLedger.push({ label: "Sales Price", debit: 0, credit: price });
  sellerLedger.push({ label: "Seller Broker Fee", debit: sellerBrokerFee, credit: 0 });
  sellerLedger.push({ label: "Buyer Broker Fee", debit: buyerBrokerFeeSellerSide, credit: 0 });
  if (num(sellerLoanBalance) > 0) sellerLedger.push({ label: "Loan Payoff", debit: num(sellerLoanBalance), credit: 0 });
  if (taxProration > 0) sellerLedger.push({ label: "Tax Proration (Credit to Buyer)", debit: taxProration, credit: 0 });
  if (hasHoa && hoaProration > 0) sellerLedger.push({ label: "HOA Proration (Credit to Buyer)", debit: hoaProration, credit: 0 });
  if (showDetail) {
    sellerLedger.push(
      { label: "Settlement Fee", debit: num(settlementSeller), credit: 0 },
      { label: "Closing Fee", debit: num(closingSeller), credit: 0 },
      { label: "Abstracting", debit: num(abstracting), credit: 0 },
      { label: "Doc Stamps", debit: docStamps, credit: 0 }
    );
  } else {
    sellerLedger.push({ label: "Title Fees", debit: sellerTitleFeesTotal, credit: 0 });
  }
  if (concession > 0) sellerLedger.push({ label: "Seller Concessions", debit: concession, credit: 0 });
  sellerExtras.forEach((e) => { if (e.amount !== 0) sellerLedger.push({ label: e.label || "Additional Cost", debit: e.amount, credit: 0 }); });

  const calculateTotals = (ledger: LedgerRow[]) => {
    const totalDebits = round2(ledger.reduce((s, r) => s + r.debit, 0));
    const totalCredits = round2(ledger.reduce((s, r) => s + r.credit, 0));
    return { totalDebits, totalCredits, net: round2(totalCredits - totalDebits) };
  };

  const buyerTotals = calculateTotals(buyerLedger);
  const sellerTotals = calculateTotals(sellerLedger);

  const copySummary = () => {
    const activeLedger = side === "buyer" ? buyerLedger : sellerLedger;
    const totals = side === "buyer" ? buyerTotals : sellerTotals;
    const lines = [
      `GRID ${side === "buyer" ? "Buyer Cost Estimate" : "Seller Net Estimate"}`,
      propertyTitle ? `Property: ${propertyTitle}` : "",
      "---",
      ...activeLedger.map(r => `${r.label}: ${r.debit > 0 ? `-${money0(r.debit)}` : `+${money0(r.credit)}`}`),
      "---",
      side === "buyer"
        ? `Cash To Close: ${money0(round2(totals.totalDebits - totals.totalCredits))}`
        : `Estimated Net To Seller: ${money0(totals.net)}`,
      ...(side === "buyer" && financing === "loan" ? [
        "---",
        `Monthly P&I: ${money2(monthlyPI)}`,
        `Monthly Taxes: ${money2(monthlyTaxes)}`,
        `Monthly Insurance: ${money2(monthlyInsurance)}`,
        hasHoa ? `Monthly HOA: ${money2(monthlyHoa)}` : "",
        `Est. Monthly PITI: ${money2(monthlyPITI)}`,
      ] : []),
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /////////PDF///////
  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210, margin = 18, rightEdge = pageWidth - margin;
    const debitX = 150, creditX = 185;
    let y = 20;
    const activeLedger = side === "buyer" ? buyerLedger : sellerLedger;
    const totals = side === "buyer" ? buyerTotals : sellerTotals;

    pdf.addImage("/brand/grid_logo.png", "PNG", margin, 8, 28, 8);
    y = 24;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(side === "buyer" ? "BUYER COST ESTIMATE" : "SELLER NET ESTIMATE", margin, y);
    y += 7;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(90);
    pdf.text(propertyTitle || "", margin, y);
    pdf.setTextColor(0);
    y += 6;
    pdf.setLineWidth(0.6);
    pdf.line(margin, y, rightEdge, y);
    y += 10;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, y - 5, rightEdge - margin, 8, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Description", margin, y);
    pdf.text("Debit", debitX, y, { align: "right" });
    pdf.text("Credit", creditX, y, { align: "right" });
    y += 8;
    pdf.setFont("helvetica", "normal");
    let rowIndex = 0;
    activeLedger.forEach((r) => {
      const rowHeight = 7;
      if (rowIndex % 2 === 0) { pdf.setFillColor(248, 248, 248); pdf.rect(margin, y - 5, rightEdge - margin, rowHeight, "F"); }
      pdf.text(r.label, margin, y);
      if (r.debit > 0) pdf.text(money0(r.debit), debitX, y, { align: "right" });
      if (r.credit > 0) pdf.text(money0(r.credit), creditX, y, { align: "right" });
      y += rowHeight;
      rowIndex++;
    });

    // PITI section for buyer
    if (side === "buyer" && financing === "loan" && monthlyPITI > 0) {
      y += 4;
      pdf.setFont("helvetica", "bold");
      pdf.text("Est. Monthly Payment (PITI)", margin, y);
      y += 7;
      pdf.setFont("helvetica", "normal");
      [
        ["Principal & Interest", money2(monthlyPI)],
        ["Taxes", money2(monthlyTaxes)],
        ["Insurance", money2(monthlyInsurance)],
        ...(hasHoa ? [["HOA", money2(monthlyHoa)]] : []),
      ].forEach(([label, val]) => { pdf.text(label, margin, y); pdf.text(val, creditX, y, { align: "right" }); y += 7; });
      pdf.setFont("helvetica", "bold");
      pdf.text("Total PITI", margin, y);
      pdf.text(money2(monthlyPITI), creditX, y, { align: "right" });
      y += 7;
    }

    y += 3;
    pdf.setLineWidth(0.8);
    pdf.line(margin, y, rightEdge, y);
    y += 8;
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, y - 5, rightEdge - margin, 16, "F");
    pdf.setFont("helvetica", "bold");
    pdf.text("Total Debits", margin, y);
    pdf.text(money0(totals.totalDebits), debitX, y, { align: "right" });
    y += 7;
    pdf.text("Total Credits", margin, y);
    pdf.text(money0(totals.totalCredits), creditX, y, { align: "right" });
    y += 10;
    pdf.setFontSize(13);
    if (side === "buyer") {
      pdf.text("Cash To Close", margin, y);
      pdf.text(money0(round2(totals.totalDebits - totals.totalCredits)), debitX, y, { align: "right" });
    } else {
      pdf.text("Estimated Net To Seller", margin, y);
      pdf.text(money0(totals.net), creditX, y, { align: "right" });
    }
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    y += 22;
    pdf.setLineWidth(0.5);
    pdf.line(margin, y, rightEdge - 60, y);
    pdf.text(side === "buyer" ? "Buyer Signature" : "Seller Signature", margin, y + 5);
    y += 20;
    pdf.line(margin, y, rightEdge - 60, y);
    pdf.text(side === "buyer" ? "Buyer Signature" : "Seller Signature", margin, y + 5);
    pdf.setFontSize(9);
    pdf.setTextColor(120);
    pdf.text("Preliminary Estimate – Subject to Final Title Figures", margin, 292);
    pdf.setTextColor(0);
    pdf.save(side === "buyer" ? "Buyer-Cost-Sheet.pdf" : "Seller-Net-Sheet.pdf");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex gap-4 mb-4">
        <button onClick={() => setSide("buyer")} className={`px-4 py-2 rounded-xl text-sm ${side === "buyer" ? "bg-black text-white" : "border"}`}>Buyer</button>
        <button onClick={() => setSide("seller")} className={`px-4 py-2 rounded-xl text-sm ${side === "seller" ? "bg-black text-white" : "border"}`}>Seller</button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/brand/grid_logo.png" alt="GRID" className="h-10 w-auto" />
          <div>
            <div className="text-2xl font-bold">Cost / Net Sheet</div>
            <div className="text-sm text-gray-500">{side === "buyer" ? "Buyer side" : "Seller side"}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={copySummary} className="border px-3 py-2 rounded-xl text-sm">{copied ? "Copied!" : "Copy"}</button>
          <button onClick={shareUrl} className="border px-3 py-2 rounded-xl text-sm">{shared ? "Copied!" : "Share"}</button>
          <button onClick={downloadPDF} className="bg-black text-white px-4 py-2 rounded-xl text-sm">PDF</button>
        </div>
      </div>

      {/* BUYER INPUTS */}
      {side === "buyer" && (
        <div className="border rounded-2xl p-4 space-y-4">
          <Field label="Property Address / Title">
            <input value={propertyTitle} onChange={(e) => setPropertyTitle(e.target.value)} placeholder="123 Main Street Norman, OK" className="border rounded-xl px-3 py-2 w-full" />
          </Field>
          <Field label="Sales Price">
            <NumberInput value={salesPrice} set={setSalesPrice} placeholder="250000" />
          </Field>
          <Field label="Close Date">
            <input type="date" value={closeDate} onChange={(e) => setCloseDate(e.target.value)} className="border rounded-xl px-3 py-2 w-full" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded-xl p-3">
              <div className="text-xs font-semibold uppercase text-gray-500 mb-2">Financing</div>
              <select value={financing} onChange={(e) => setFinancing(e.target.value as Financing)} className="border rounded-xl px-3 py-2 w-full">
                <option value="loan">Loan</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            <div className="border rounded-xl p-3 space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" checked={hasHoa} onChange={(e) => setHasHoa(e.target.checked)} />
                Property has HOA
              </label>
              {hasHoa && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Amount</div>
                    <NumberInput value={hoaAmount} set={setHoaAmount} unit="$" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Frequency</div>
                    <select value={hoaFrequency} onChange={(e) => setHoaFrequency(e.target.value as "monthly" | "annual")} className="border rounded-xl px-3 py-2 w-full">
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {financing === "loan" && (
            <div className="border rounded-xl p-3 space-y-3">
              <div className="text-xs font-semibold uppercase text-gray-500">Loan terms (required)</div>
              <div className="grid grid-cols-3 gap-3">
                <FieldInline label="Down %"><NumberInput value={downPercent} set={setDownPercent} placeholder="20" /></FieldInline>
                <FieldInline label="Rate %"><NumberInput value={interestRate} set={setInterestRate} placeholder="7.0" /></FieldInline>
                <FieldInline label="Term yrs"><NumberInput value={termYears} set={setTermYears} placeholder="30" /></FieldInline>
              </div>
              {loanRequiredFieldsMissing && <div className="text-xs text-red-600">Loan selected: down payment, rate, and term must be filled in.</div>}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <KeyVal label="Down Payment" value={money0(downPayment)} />
                <KeyVal label="Loan Amount" value={money0(loanAmount)} />
              </div>
            </div>
          )}

          {/* Monthly PITI summary */}
          {financing === "loan" && price > 0 && !loanRequiredFieldsMissing && (
            <div className="border rounded-xl p-3 bg-blue-50 space-y-2">
              <div className="text-xs font-semibold uppercase text-blue-700">Est. Monthly Payment (PITI)</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <KeyVal label="Principal & Interest" value={money2(monthlyPI)} />
                <KeyVal label="Taxes" value={money2(monthlyTaxes)} />
                <KeyVal label="Insurance" value={money2(monthlyInsurance)} />
                {hasHoa && <KeyVal label="HOA" value={money2(monthlyHoa)} />}
              </div>
              <div className="pt-2 border-t border-blue-200 flex justify-between font-semibold text-blue-900">
                <span>Total PITI</span>
                <span>{money2(monthlyPITI)}</span>
              </div>
            </div>
          )}

          {/* Buyer broker fee */}
          <div className="border rounded-xl p-3 space-y-3">
            <div className="text-xs font-semibold uppercase text-gray-500">Buyer broker fee</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Fee type</div>
                <select value={brokerMode} onChange={(e) => setBrokerMode(e.target.value as BrokerFeeMode)} className="border rounded-xl px-3 py-2 w-full">
                  <option value="percent">Percent</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Paid by</div>
                <select value={brokerPaidBy} onChange={(e) => setBrokerPaidBy(e.target.value as WhoPays)} className="border rounded-xl px-3 py-2 w-full">
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>
            </div>
            {brokerMode === "percent"
              ? <Field label="Percent"><NumberInput value={brokerPercent} set={setBrokerPercent} placeholder="3" /></Field>
              : <Field label="Flat amount"><NumberInput value={brokerFlat} set={setBrokerFlat} placeholder="0" /></Field>
            }
            <div className="grid grid-cols-2 gap-3 text-sm">
              <KeyVal label="Buyer broker fee" value={money0(buyerBrokerFee)} />
              <KeyVal label="Buyer pays" value={money0(buyerBrokerPaidByBuyer)} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-xs font-semibold uppercase text-gray-500">Other Costs</div>
                <button onClick={addBuyerExtra} className="text-xs underline">+ Add</button>
              </div>
              {buyerExtras.map((item) => (
                <div key={item.id} className="grid grid-cols-5 gap-2 items-center">
                  <input value={item.label} onChange={(e) => updateBuyerExtra(item.id, "label", e.target.value)} className="border rounded-xl px-2 py-1 col-span-3" placeholder="Home Warranty" />
                  <NumberInput value={item.amount} set={(v) => updateBuyerExtra(item.id, "amount", v || 0)} />
                  <button onClick={() => removeBuyerExtra(item.id)} className="text-red-500 text-xs">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Credits */}
          <div className="grid md:grid-cols-2 gap-3">
            <FieldInline label="Seller concession"><NumberInput value={sellerConcession} set={setSellerConcession} placeholder="0" /></FieldInline>
            <FieldInline label="Earnest money"><NumberInput value={earnestMoney} set={setEarnestMoney} placeholder="0" /></FieldInline>
            <FieldInline label="Tax">
              <div className="flex gap-2">
                <NumberInput value={taxRate} set={setTaxRate} unit={taxMode === "percent" ? "%" : "$"} />
                <select value={taxMode} onChange={(e) => setTaxMode(e.target.value as any)} className="border rounded-xl px-2">
                  <option value="percent">%</option>
                  <option value="dollar">$</option>
                </select>
              </div>
            </FieldInline>
            <FieldInline label="Insurance">
              <div className="flex gap-2">
                <NumberInput value={insuranceRate} set={setInsuranceRate} unit={insuranceMode === "percent" ? "%" : "$"} />
                <select value={insuranceMode} onChange={(e) => setInsuranceMode(e.target.value as any)} className="border rounded-xl px-2">
                  <option value="percent">%</option>
                  <option value="dollar">$</option>
                </select>
              </div>
            </FieldInline>
          </div>
        </div>
      )}

      {/* SELLER INPUTS */}
      {side === "seller" && (
        <div className="border rounded-2xl p-4 space-y-4">
          <Field label="Property Address / Title">
            <input value={propertyTitle} onChange={(e) => setPropertyTitle(e.target.value)} className="border rounded-xl px-3 py-2 w-full" placeholder="123 Main Street Norman, OK" />
          </Field>
          <Field label="Sales Price"><NumberInput value={salesPrice} set={setSalesPrice} placeholder="250000" /></Field>
          <Field label="Close Date">
            <input type="date" value={closeDate} onChange={(e) => setCloseDate(e.target.value)} className="border rounded-xl px-3 py-2 w-full" />
          </Field>
          <Field label="Seller Broker Commission (%)"><NumberInput value={sellerBrokerPercent} set={setSellerBrokerPercent} unit="%" placeholder="3" /></Field>
          <Field label="Buyer Broker Commission (%)"><NumberInput value={buyerBrokerPercentSeller} set={setBuyerBrokerPercentSeller} unit="%" placeholder="3" /></Field>
          <Field label="Property Taxes">
            <div className="flex gap-2">
              <NumberInput value={taxRate} set={setTaxRate} unit={taxMode === "percent" ? "%" : "$"} />
              <select value={taxMode} onChange={(e) => setTaxMode(e.target.value as any)} className="border rounded-xl px-2">
                <option value="percent">%</option>
                <option value="dollar">$</option>
              </select>
            </div>
          </Field>
          <Field label="Seller Concessions"><NumberInput value={sellerConcession} set={setSellerConcession} /></Field>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xs font-semibold uppercase text-gray-500">Other Costs</div>
              <button onClick={() => setSellerExtras([...sellerExtras, { id: crypto.randomUUID(), label: "", amount: 0, type: "debit" }])} className="text-xs underline">+ Add</button>
            </div>
            {sellerExtras.map((item) => (
              <div key={item.id} className="grid grid-cols-5 gap-2 items-center">
                <input value={item.label} onChange={(e) => setSellerExtras((prev) => prev.map((i) => i.id === item.id ? { ...i, label: e.target.value } : i))} className="border rounded-xl px-2 py-1 col-span-3" placeholder="Repair credit" />
                <NumberInput value={item.amount} set={(v) => setSellerExtras((prev) => prev.map((i) => i.id === item.id ? { ...i, amount: v || 0 } : i))} />
                <button onClick={() => setSellerExtras((prev) => prev.filter((i) => i.id !== item.id))} className="text-red-500 text-xs">✕</button>
              </div>
            ))}
          </div>
          <Field label="Seller Loan Balance"><NumberInput value={sellerLoanBalance} set={setSellerLoanBalance} /></Field>
          <div className="pt-4 border-t space-y-2">
            <Line label="Seller Broker Fee" value={money0(sellerBrokerFee)} />
            <Line label="Buyer Broker Fee" value={money0(buyerBrokerFeeSellerSide)} />
            <Line label="Title Fees" value={money0(sellerTitleFeesTotal)} />
            <Line label="Loan Payoff" value={money0(num(sellerLoanBalance))} />
            {concession > 0 && <Line label="Seller Concessions" value={money0(concession)} />}
            <div className="pt-2 border-t">
              <div className="flex justify-between font-semibold">
                <span>Estimated Net To Seller</span>
                <span className={sellerNet < 0 ? "text-red-600" : "text-green-700"}>{money0(sellerNet)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {side === "buyer" && (
        <>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Debits</span>
            <span className="font-semibold">{money0(buyerTotals.totalDebits)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Credits</span>
            <span className="font-semibold">{money0(buyerTotals.totalCredits)}</span>
          </div>
          <div className="flex justify-between text-sm border-t pt-2">
            <span className="text-gray-800 font-semibold">Cash To Close</span>
            <span className="font-semibold">{money0(round2(buyerTotals.totalDebits - buyerTotals.totalCredits))}</span>
          </div>
        </>
      )}

      {/* On-screen ledger */}
      <div className="pt-2 space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={showLedger} onChange={(e) => setShowLedger(e.target.checked)} />
          Show Full Ledger
        </label>
        {showLedger && (
          <div className="border rounded-2xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 grid grid-cols-3 text-xs font-semibold uppercase text-gray-500">
              <div>Description</div>
              <div className="text-right">Debit</div>
              <div className="text-right">Credit</div>
            </div>
            {(side === "buyer" ? buyerLedger : sellerLedger).map((r, i) => (
              <div key={i} className={`px-4 py-2 grid grid-cols-3 text-sm border-t ${i % 2 === 0 ? "" : "bg-gray-50"}`}>
                <div className="text-gray-700">{r.label}</div>
                <div className="text-right font-medium">{r.debit > 0 ? money0(r.debit) : ""}</div>
                <div className="text-right font-medium">{r.credit > 0 ? money0(r.credit) : ""}</div>
              </div>
            ))}
            <div className="px-4 py-3 border-t bg-gray-100 grid grid-cols-3 text-sm font-semibold">
              <div>{side === "buyer" ? "Cash To Close" : "Net To Seller"}</div>
              <div className="text-right">{side === "buyer" ? money0(round2(buyerTotals.totalDebits - buyerTotals.totalCredits)) : ""}</div>
              <div className="text-right">{side === "seller" ? money0(sellerTotals.net) : ""}</div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={showDetail} onChange={(e) => setShowDetail(e.target.checked)} />
          Show Detailed Closing Costs
        </label>
      </div>

      {showDetail && (
        <div className="border rounded-2xl p-4 space-y-5 bg-gray-50">
          {side === "buyer" && (
            <>
              <div className="font-semibold text-sm">Detailed Buyer Closing Costs</div>
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase text-gray-500">Title Fees</div>
                <Line label="Title Policy (calculated)" value={money2(titlePolicy)} />
                <Field label="Settlement Service"><NumberInput value={settlementService} set={setSettlementService} /></Field>
                <Field label="Closing Fee"><NumberInput value={closingFee} set={setClosingFee} /></Field>
                <Field label="CPL"><NumberInput value={cpl} set={setCpl} /></Field>
                <Field label="Final Title Report"><NumberInput value={finalTitle} set={setFinalTitle} /></Field>
                <Field label="Title Exam"><NumberInput value={titleExam} set={setTitleExam} /></Field>
                <Field label="Mortgage Certification"><NumberInput value={mortgageCert} set={setMortgageCert} /></Field>
                <div className="pt-2 border-t"><Line label="Title Fees Total" value={money0(titleFeesTotal)} /></div>
              </div>
              {financing === "loan" && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase text-gray-500">Lender Fees</div>
                  <Field label="Origination (%)"><NumberInput value={originationPercent} set={setOriginationPercent} unit="%" /></Field>
                  <Line label="Origination (calculated)" value={money0(originationFee)} />
                  <Field label="Appraisal"><NumberInput value={appraisal} set={setAppraisal} /></Field>
                  <Field label="MIC"><NumberInput value={mic} set={setMic} /></Field>
                  <Field label="Credit Report"><NumberInput value={creditReport} set={setCreditReport} /></Field>
                  <Field label="Underwriting"><NumberInput value={underwriting} set={setUnderwriting} /></Field>
                  <Line label="Mortgage Tax (calculated)" value={money2(mortgageTax)} />
                  <Line label="Recording Fees" value={money0(recordingFees)} />
                  <div className="pt-2 border-t"><Line label="Lender Fees Total" value={money0(lenderFeesTotal)} /></div>
                </div>
              )}
            </>
          )}
          {side === "seller" && (
            <>
              <div className="font-semibold text-sm">Detailed Seller Closing Costs</div>
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase text-gray-500">Title Fees</div>
                <Field label="Settlement Fee"><NumberInput value={settlementSeller} set={setSettlementSeller} /></Field>
                <Field label="Closing Fee"><NumberInput value={closingSeller} set={setClosingSeller} /></Field>
                <Field label="Abstracting"><NumberInput value={abstracting} set={setAbstracting} /></Field>
                <Line label="Doc Stamps ($1.50 per $1000)" value={money0(docStamps)} />
                <div className="pt-2 border-t"><Line label="Title Fees Total" value={money0(sellerTitleFeesTotal)} /></div>
              </div>
            </>
          )}
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
      <input type="number" inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => set(e.target.value === "" ? "" : +e.target.value)} className="border rounded-xl px-3 py-2 w-full pr-8" />
      {unit && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{unit}</div>}
    </div>
  );
}

function KeyVal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-600">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function Line({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <div className="text-gray-700">
        <div>{label}</div>
        {note ? <div className="text-xs text-gray-500">{note}</div> : null}
      </div>
      <div className="font-medium whitespace-nowrap">{value}</div>
    </div>
  );
}
