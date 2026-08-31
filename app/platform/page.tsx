import Section from "@/components/Section";
import GridWord from "@/components/GridWord";

export const metadata = {
  alternates: { canonical: "https://thegridre.com/platform" },
  title: "The Atlas Platform | GRID Real Estate Owner Portal & Trust Accounting",
  description:
    "GRID Real Estate runs on Atlas — a proprietary Oklahoma-built brokerage platform. Owners get verified trust accounting, per-tenant ledgers, owner payouts, and statements on any device, anytime. Call (405) 310-1221.",
  openGraph: {
    title: "The Atlas Platform | GRID Real Estate",
    description:
      "Verified trust accounting, live owner statements, and a branded client portal — the proprietary technology GRID runs on.",
    url: "https://thegridre.com/platform",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Property Management Technology & Owner Reporting",
  "name": "GRID Owner Portal & Trust Accounting on Atlas",
  "description":
    "GRID Real Estate manages property on Atlas, a proprietary Oklahoma-built brokerage platform. Owners receive verified trust accounting, per-tenant ledgers, tracked owner payouts, and monthly statements accessible on any device.",
  "provider": { "@type": "LocalBusiness", "name": "GRID Real Estate", "url": "https://thegridre.com", "telephone": "+14053101221" },
  "areaServed": [
    { "@type": "City", "name": "Oklahoma City", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Norman", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Tulsa", "containedIn": "Oklahoma" },
  ],
  "url": "https://thegridre.com/platform",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What software does GRID Real Estate use to manage property?", acceptedAnswer: { "@type": "Answer", text: "GRID runs on Atlas, a proprietary Oklahoma-built brokerage operating system. It handles trust accounting, per-tenant ledgers, owner payouts, and a branded owner portal, with OREC compliance built into the workflow. GRID is the first brokerage operating on Atlas." } },
    { "@type": "Question", name: "Can I see my owner statements online?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every owner has a secure portal login and can view statements, income and expenses, and property performance on any device, anytime — not just once a month by email." } },
    { "@type": "Question", name: "How does GRID handle trust funds?", acceptedAnswer: { "@type": "Answer", text: "Owner and tenant funds are held in a dedicated trust account with disciplined reconciliation and a full audit trail. Balances and disbursements are documented and verifiable inside the platform." } },
    { "@type": "Question", name: "Do I get a per-tenant ledger?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every property shows rent in, expenses out, owner payouts, and a per-tenant ledger, so the full rental P&L is transparent and always current." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "The Atlas Platform", item: "https://thegridre.com/platform" },
  ],
};

const benefits = [
  { title: "Verified trust accounting", body: "Owner and tenant funds sit in a dedicated trust account with disciplined reconciliation and a full audit trail. Balances and disbursements are documented and verifiable — compliant by design, not by binder." },
  { title: "Statements anytime", body: "Your statements live in a secure portal you can open on any device, any time — not a PDF you wait for once a month. Income, expenses, and net disbursement, always current." },
  { title: "Per-tenant ledger", body: "Rent in, expenses out, and a line-by-line ledger for every tenant. The full rental P&L on each property, transparent down to the transaction." },
  { title: "Owner payouts, tracked", body: "Every disbursement to you is recorded and reconciled against collected rent and paid expenses. No guessing where the money went." },
  { title: "Documents & e-sign", body: "Leases, renewals, and disclosures are stored, sent for signature, and tracked in one place — linked to your property and available in your portal." },
  { title: "OREC-compliant by design", body: "Compliance controls, disbursement authorizations, and file checklists are built into the workflow. The regulatory standard is enforced by the system, not chased after the fact." },
];

export default function PlatformPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-black text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> Proprietary technology · Built in Oklahoma
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
                Your management, made transparent.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/80">
                <GridWord /> runs on <span className="font-semibold text-white">Atlas</span> — a proprietary brokerage operating system built for Oklahoma real estate. Verified trust accounting, live owner statements, and a branded portal you can open any time. GRID is the first brokerage operating on it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="https://portal.thegridre.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">open your portal</a>
                <a href="/contact" className="rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/15">get a proposal</a>
              </div>
            </div>

            {/* PORTAL PREVIEW — illustrative UI, not a literal screenshot */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white text-black shadow-2xl">
                <div className="flex items-center gap-2 border-b border-black/10 bg-black/[0.03] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="ml-3 text-xs text-black/45">portal.thegridre.com</span>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-black/50">Monthly Owner Statement</div>
                      <div className="text-sm font-semibold tracking-tight">1420 Maple Ridge Dr</div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Trust verified
                    </div>
                  </div>
                  <div className="divide-y divide-black/5 rounded-xl border border-black/10">
                    {[
                      ["Rent collected", "$1,750.00", false],
                      ["Management fee", "−$140.00", false],
                      ["Maintenance — HVAC", "−$185.00", false],
                      ["Net disbursement", "$1,425.00", true],
                    ].map(([label, val, strong]) => (
                      <div key={label as string} className={`flex items-center justify-between px-4 py-2.5 text-sm ${strong ? "font-semibold" : "text-black/70"}`}>
                        <span>{label}</span>
                        <span className={strong ? "text-black" : ""}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[["YTD income", "$21,000"], ["YTD expenses", "$3,910"], ["Occupancy", "100%"]].map(([k, v]) => (
                      <div key={k} className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-2">
                        <div className="text-[10px] uppercase tracking-wide text-black/45">{k}</div>
                        <div className="mt-0.5 text-sm font-semibold">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center text-[11px] text-white/45">Illustrative preview of the owner portal.</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <Section kicker="Why it matters" title="The technology behind your property.">
        <div className="max-w-3xl">
          <p className="text-sm leading-7 text-black/75">
            Most management companies stitch together a spreadsheet for trust accounting, a separate tool for statements, and an inbox for everything else. <GridWord /> runs the whole operation on Atlas — one connected system where your money, your documents, and your property performance all live together, and where the compliance controls are built in rather than bolted on.
          </p>
          <p className="mt-4 text-sm leading-7 text-black/75">
            For you, that means fewer surprises and more visibility: verified trust balances, statements you can pull up any time, and a clear line from every dollar of rent collected to every dollar disbursed to you.
          </p>
        </div>
      </Section>

      {/* BENEFITS */}
      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">What you get</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Built for owners who want to see everything.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold tracking-tight">{b.title}</div>
                <p className="mt-3 text-sm leading-6 text-black/70">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A LOOK INSIDE — illustrative UI panels */}
      <Section kicker="A look inside" title="Verified accounting, in plain view.">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Trust reconciliation panel */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold tracking-tight">Trust account</div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Reconciled
              </span>
            </div>
            <div className="mt-4 divide-y divide-black/5 rounded-xl border border-black/10">
              {[
                ["Beginning balance", "$48,210.00"],
                ["Deposits (rent)", "+$14,600.00"],
                ["Disbursements", "−$12,940.00"],
                ["Ending balance", "$49,870.00"],
              ].map(([k, v], i) => (
                <div key={k} className={`flex items-center justify-between px-4 py-2.5 text-sm ${i === 3 ? "font-semibold" : "text-black/70"}`}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-black/50">Balances reconcile to the penny, with a full audit trail behind every line.</p>
          </div>

          {/* Per-tenant ledger panel */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold tracking-tight">Per-tenant ledger</div>
            <div className="mt-4 overflow-hidden rounded-xl border border-black/10">
              <div className="grid grid-cols-4 gap-2 border-b border-black/10 bg-black/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-black/45">
                <span>Date</span><span className="col-span-2">Description</span><span className="text-right">Balance</span>
              </div>
              {[
                ["Aug 1", "Rent charged", "$1,750.00"],
                ["Aug 3", "Payment received", "$0.00"],
                ["Aug 12", "Late fee waived", "$0.00"],
                ["Sep 1", "Rent charged", "$1,750.00"],
              ].map(([d, desc, bal]) => (
                <div key={d as string} className="grid grid-cols-4 gap-2 border-b border-black/5 px-4 py-2.5 text-sm last:border-0">
                  <span className="text-black/60">{d}</span>
                  <span className="col-span-2 text-black/70">{desc}</span>
                  <span className="text-right font-medium">{bal}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-black/50">Every charge, payment, and adjustment — tied to the tenant and the property.</p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-black/45">Panels are illustrative. Your live data is in your <a href="https://portal.thegridre.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black">owner portal</a>.</p>
      </Section>

      {/* FIRST ON ATLAS — credibility */}
      <section className="border-y border-black/10 bg-black py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-sm font-medium text-white/60">First on Atlas</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">A brokerage running on better infrastructure.</h2>
              <p className="mt-5 text-sm leading-7 text-white/80">
                Atlas is a proprietary brokerage operating system built in Norman by Atlas Labs — OREC compliance, back office, transaction management, and a client portal in one connected system. <GridWord /> is the first brokerage operating on it, which means our owners get technology most Oklahoma management companies simply do not have.
              </p>
              <p className="mt-4 text-xs leading-6 text-white/45">
                Atlas is a product of Atlas Labs LLC, now opening to select Oklahoma brokerages at{" "}
                <a href="https://goatlasbroker.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white/80">goatlasbroker.com</a>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["1", "login for everything you need to see"],
                ["24/7", "access to statements and balances"],
                ["Built-in", "trust accounting & reconciliation"],
                ["End-to-end", "compliance on every file"],
              ].map(([stat, note]) => (
                <div key={note} className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                  <div className="text-2xl font-semibold tracking-tight">{stat}</div>
                  <div className="mt-1 text-xs leading-5 text-white/60">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black/[0.02] p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="text-sm font-medium text-black/60">See it on your property</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Management you can actually see into.</div>
                <p className="mt-3 text-sm leading-7 text-black/70">
                  Tell us about your property or portfolio and we&apos;ll walk you through exactly what your owner portal, statements, and reporting will look like.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">get a proposal</a>
                <a href="/manage" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">property management</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
