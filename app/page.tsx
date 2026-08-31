import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  alternates: { canonical: "https://thegridre.com" },
  title: "Oklahoma Property Management — OKC & Tulsa Metro | GRID Real Estate",
  description: "Premier property management across the Oklahoma City and Tulsa Metro areas. Professional photography, Matterport 3D, social media marketing, and full-service leasing. Call (405) 310-1221.",
  openGraph: {
    title: "Oklahoma Property Management — OKC & Tulsa Metro | GRID Real Estate",
    description: "Premier property management across the Oklahoma City and Tulsa Metro areas. Professional photography, Matterport 3D, social media marketing, and full-service leasing.",
    url: "https://thegridre.com",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "GRID Real Estate",
  description: "Premier property management, HOA and association management, and investor real estate services across the Oklahoma City and Tulsa Metro areas.",
  url: "https://thegridre.com",
  telephone: "+14053101221",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1263 S Eastern Ave Ste B",
    addressLocality: "Moore",
    addressRegion: "OK",
    postalCode: "73160",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.3395,
    longitude: -97.4867,
  },
  areaServed: [
    { "@type": "City", name: "Norman", containedIn: "Oklahoma" },
    { "@type": "City", name: "Noble", containedIn: "Oklahoma" },
    { "@type": "City", name: "Oklahoma City", containedIn: "Oklahoma" },
    { "@type": "City", name: "Edmond", containedIn: "Oklahoma" },
    { "@type": "City", name: "Yukon", containedIn: "Oklahoma" },
    { "@type": "City", name: "Moore", containedIn: "Oklahoma" },
    { "@type": "City", name: "Mustang", containedIn: "Oklahoma" },
    { "@type": "City", name: "Midwest City", containedIn: "Oklahoma" },
    { "@type": "City", name: "Tulsa", containedIn: "Oklahoma" },
    { "@type": "City", name: "Bixby", containedIn: "Oklahoma" },
    { "@type": "City", name: "Broken Arrow", containedIn: "Oklahoma" },
    { "@type": "City", name: "Jenks", containedIn: "Oklahoma" },
    { "@type": "City", name: "Owasso", containedIn: "Oklahoma" },
    { "@type": "City", name: "Sand Springs", containedIn: "Oklahoma" },
  ],
  sameAs: [
    "https://hoaadvisorsok.com",
    "https://oldsilkstocking.com",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Real Estate Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Property Management", url: "https://thegridre.com/manage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HOA and Association Management", url: "https://thegridre.com/associations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Investor Services", url: "https://thegridre.com/invest" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buy & Sell Real Estate", url: "https://thegridre.com/buy-sell" } },
    ],
  },
};

export default function HomePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <section className="relative">
        <div className="relative h-[560px] w-full">
          <Image src="/images/east-village.jpg" alt="GRID Real Estate — property and HOA management in Norman, Oklahoma" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-4">
            <div className="max-w-2xl text-white">
              <div className="mb-5">
                <Image src="/brand/grid_logo_white.png" alt="GRID Real Estate" width={240} height={70} priority className="drop-shadow-lg" />
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl drop-shadow-md">Oklahoma's premier property management brokerage — OKC and Tulsa Metro</h1>
              <p className="mt-5 max-w-xl text-white/90 text-sm leading-7 drop-shadow-sm">
                <GridWord /> serves property owners, investors, and associations across both the Oklahoma City and Tulsa Metro areas with professional management, premier marketing, and a brokerage that thinks like an owner.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/manage" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">property management</a>
                <a href="/associations" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">association management</a>
                <a href="/invest" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">investor services</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-black/10 bg-black/[0.02] py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold">management-first</div>
            <div className="mt-1 text-sm text-black/70">Property and association management is the core of what we do, not a side service.</div>
          </div>
          <div>
            <div className="text-sm font-semibold">regulatory fluency</div>
            <div className="mt-1 text-sm text-black/70">Deep compliance background means trust accounts, documentation, and risk management handled correctly.</div>
          </div>
          <div>
            <div className="text-sm font-semibold">owners and operators</div>
            <div className="mt-1 text-sm text-black/70">We've seen the good, bad, and ugly in the property management business. We know what good management actually looks like.</div>
          </div>
          <div>
            <div className="text-sm font-semibold">tenant-first approach</div>
            <div className="mt-1 text-sm text-black/70">Well-maintained properties and clear communication keep good tenants longer. That's good for everyone.</div>
          </div>
        </div>
      </section>
      {/* INVESTOR FLOW SECTION */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <div className="text-sm font-medium text-black/50">For investors</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">One company. The full investment cycle.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/70">
              Most brokerages help you buy or sell. <GridWord /> stays with you through the whole thing — finding the deal, running the numbers, managing the asset, and selling when it's time.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <a href="/invest" className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:border-black/25 transition-colors">
              <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">01 — Find</div>
              <div className="text-sm font-semibold tracking-tight">Investor Services</div>
              <p className="mt-2 text-sm leading-6 text-black/70">Acquisition support, cash flow underwriting, market analysis, and portfolio strategy. We run real numbers on every deal.</p>
              <div className="mt-4 text-sm font-medium text-black group-hover:underline underline-offset-4">learn more →</div>
            </a>
            <a href="/manage" className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:border-black/25 transition-colors">
              <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">02 — Manage</div>
              <div className="text-sm font-semibold tracking-tight">Property Management</div>
              <p className="mt-2 text-sm leading-6 text-black/70">Premier marketing, tenant placement, rent collection, maintenance, and clean monthly reporting. Acquisitions handed directly into management.</p>
              <div className="mt-4 text-sm font-medium text-black group-hover:underline underline-offset-4">learn more →</div>
            </a>
            <a href="/buy-sell" className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:border-black/25 transition-colors">
              <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">03 — Exit</div>
              <div className="text-sm font-semibold tracking-tight">Buy &amp; Sell</div>
              <p className="mt-2 text-sm leading-6 text-black/70">When it's time to sell, we bring professional photography, Matterport 3D, and investor-to-investor positioning to maximize your return.</p>
              <div className="mt-4 text-sm font-medium text-black group-hover:underline underline-offset-4">learn more →</div>
            </a>
          </div>
          <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold tracking-tight">Also managing HOAs and associations</div>
                <p className="mt-1 text-sm text-black/65">Financial oversight, covenant enforcement, vendor coordination, and board support for Norman communities.</p>
              </div>
              <a href="/associations" className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30 transition-colors">association management →</a>
            </div>
          </div>
        </div>
      </section>
      {/* PLATFORM / ATLAS TEASER */}
      <section className="border-y border-black/10 bg-black py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> Proprietary technology
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">Management you can see into.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                <GridWord /> runs on <span className="font-semibold text-white">Atlas</span> — a proprietary Oklahoma-built brokerage platform. Verified trust accounting, per-tenant ledgers, and owner statements you can open on any device, any time. GRID is the first brokerage operating on it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/platform" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">explore the platform</a>
                <a href="https://portal.thegridre.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/15">owner login</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Verified", "trust accounting & reconciliation"],
                ["24/7", "statements on any device"],
                ["Per-tenant", "ledgers and full rental P&L"],
                ["Built-in", "OREC compliance on every file"],
              ].map(([stat, note]) => (
                <div key={note} className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                  <div className="text-xl font-semibold tracking-tight">{stat}</div>
                  <div className="mt-1 text-xs leading-5 text-white/60">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-sm font-medium text-black/60">About GRID</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Built for Oklahoma. OKC and Tulsa Metro.</h2>
              <p className="mt-5 text-sm leading-7 text-black/75">
                <GridWord /> is Oklahoma's premier property management brokerage, built by people who own, manage, and operate real estate across both metros. Our background spans brokerage compliance, active investment ownership since 2018, and years of hands-on property management in OKC and Tulsa markets.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                We manage properties the way we'd want our own managed — and we market them better than anyone in either metro. Professional photography, Matterport 3D, drone, and social media campaigns are standard on every listing.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/about" className="rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30">about GRID</a>
                <a href="/contact" className="rounded-full bg-black px-4 py-2 text-sm text-white hover:opacity-90">get in touch</a>
              </div>
            </div>
            <div className="relative h-[360px] overflow-hidden rounded-3xl border border-black/10">
              <Image src="/images/front_porch_entry.jpeg" alt="Norman property" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-black/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Service area</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Property management across Oklahoma.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/70">
              <GridWord /> manages rental properties across the OKC and Tulsa metros. Headquartered in Norman — our home market — with deep coverage across both major metro areas.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">OKC Metro</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/norman", label: "Norman" },
                  { href: "/oklahoma-city", label: "Oklahoma City" },
                  { href: "/edmond", label: "Edmond" },
                  { href: "/yukon", label: "Yukon" },
                  { href: "/moore", label: "Moore" },
                  { href: "/mustang", label: "Mustang" },
                  { href: "/noble", label: "Noble" },
                  { href: "/midwest-city", label: "Midwest City" },
                ].map((city) => (
                  <a key={city.href} href={city.href} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm hover:border-black/25 transition-colors">
                    {city.label} <span className="text-black/30 text-xs ml-1">→</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">Tulsa Metro</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/tulsa", label: "Tulsa" },
                  { href: "/bixby", label: "Bixby" },
                  { href: "/broken-arrow", label: "Broken Arrow" },
                  { href: "/jenks", label: "Jenks" },
                  { href: "/owasso", label: "Owasso" },
                  { href: "/sand-springs", label: "Sand Springs" },
                ].map((city) => (
                  <a key={city.href} href={city.href} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm hover:border-black/25 transition-colors">
                    {city.label} <span className="text-black/30 text-xs ml-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Ready to work together?</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Management, investments, or associations. Let's talk.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one rental or a growing portfolio, manage an HOA, or want to invest anywhere in the OKC or Tulsa Metro, <GridWord /> is built for you.
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">contact <GridWord /></a>
              <a href="tel:4053101221" className="rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white hover:border-white/60">call (405) 310-1221</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
