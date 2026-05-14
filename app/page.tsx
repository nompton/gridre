import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Property Management & HOA Management in Norman, OK | GRID Real Estate",
  description: "Norman's investor-focused real estate brokerage. Professional property management, HOA and association management, and investor services in Norman, Oklahoma. Call (405) 310-1221.",
  openGraph: {
    title: "GRID Real Estate | Property & HOA Management in Norman, OK",
    description: "Full-service property management and HOA management in Norman, Oklahoma. Tenant placement, rent collection, covenant enforcement, and board support.",
    url: "https://thegridre.com",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "GRID Real Estate",
  description: "Full-service property management, HOA and association management, and investor real estate services in Norman, Oklahoma.",
  url: "https://thegridre.com",
  telephone: "+14053101221",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Norman",
    addressRegion: "OK",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.2226,
    longitude: -97.4395,
  },
  areaServed: [
    { "@type": "City", name: "Norman", containedIn: "Oklahoma" },
    { "@type": "City", name: "Moore", containedIn: "Oklahoma" },
    { "@type": "City", name: "Oklahoma City", containedIn: "Oklahoma" },
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
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl drop-shadow-md">Norman's investor-focused brokerage</h1>
              <p className="mt-5 max-w-xl text-white/90 text-sm leading-7 drop-shadow-sm">
                <GridWord /> is built for property owners, investors, and associations who want professional management, regulatory fluency, and a brokerage that thinks like an owner.
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
      <Section title="What we do" kicker="Core services">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="property management" href="/manage">
            Full-service management for single-family rentals, small multifamily, and investment portfolios. Tenant placement, rent collection, maintenance coordination, and clean reporting handled professionally.
          </Card>
          <Card title="investor services" href="/invest">
            Acquisition support, market analysis, and portfolio strategy for  investors looking in Norman and the OKC Metro. We understand the numbers because we are investors.
          </Card>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card title="association management" href="/associations">
            HOA, condo, and mixed-use association management for Norman communities. Financial oversight, vendor coordination, covenant enforcement, and board support done right.
          </Card>
          <Card title="buy & sell" href="/buy-sell">
            Buyer representation and listing services with an investor-first perspective on every transaction. Local knowledge, clear strategy, smooth execution.
          </Card>
        </div>
      </Section>
      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-sm font-medium text-black/60">About GRID</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Built for Norman. Backed by real experience.</h2>
              <p className="mt-5 text-sm leading-7 text-black/75">
                <GridWord /> is Norman's investor-focused brokerage, built by people who own, manage, and operate real estate in this market. Our background spans brokerage compliance, active investment ownership, and years of hands-on property management.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                We manage properties the way we'd want our own managed. That means taking care of the tenant, staying on top of maintenance, and treating every property like the investment it is. It comes from experience, not a company policy.
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
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Ready to work together?</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Management, investments, or associations. Let's talk.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one rental or a growing portfolio, manage an HOA, or want to invest in Norman, <GridWord /> is built for you.
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
