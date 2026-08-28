import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  alternates: { canonical: "https://thegridre.com/invest" },
  title: "Real Estate Investor Services — OKC Metro | GRID Real Estate",
  description: "Acquisition support, cash flow underwriting, and portfolio strategy for Oklahoma City Metro investors. GRID is run by active owners, for investors. Call (405) 310-1221.",
  openGraph: {
    title: "Real Estate Investor Services — OKC Metro | GRID Real Estate",
    description: "OKC Metro real estate investment services built by active owners. Acquisition support, market analysis, and seamless handoff into professional property management.",
    url: "https://thegridre.com/invest",
  },
};

const investorServices = [
  { title: "Acquisition Support", body: "From identifying opportunities to closing, we walk through every deal with an ownership lens. Neighborhoods, rent potential, condition, and exit strategy all factored in." },
  { title: "Cash Flow & Underwriting", body: "We run real numbers on every deal. Rent comps, expense assumptions, cap rate, and cash-on-cash return. No optimistic projections designed to close a transaction." },
  { title: "Market Analysis", body: "OKC Metro insight on rental demand, neighborhood trajectory, zoning shifts, and where value is moving. Local knowledge that doesn't come from Zillow." },
  { title: "Portfolio Strategy", body: "Whether you're building from scratch or optimizing what you own, we help you think through allocation, leverage, and long-term positioning." },
  { title: "Management Integration", body: "Acquisitions handed directly into professional management. No gap, no transition friction. Buy it and hand it off in one conversation." },
  { title: "Disposition & Selling", body: "When it's time to sell, we bring the full GRID marketing stack. Professional photography, Matterport, and investor-to-investor positioning." },
];

export default function InvestPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image src="/images/campus_corner.jpg" alt="Norman real estate investment" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Investor Services</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                invest with an owner's mindset
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> is built for investors because it is run by owners. We understand returns, tenant demand, long-term value, and the OKC Metro neighborhoods shaping the next decade.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">talk investing</a>
                <a href="/manage" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">property management</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE GRID EDGE */}
      <Section title="The GRID edge" kicker="Why it matters who you work with">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-black/75">
              Most real estate agents help investors as a secondary service. For <GridWord />, investors are the primary client. Our entire practice, management, marketing, compliance, and brokerage, is built around ownership.
            </p>
            <p className="text-sm leading-7 text-black/75">
              That means when we evaluate a deal with you, we're thinking about what happens after closing. Tenant quality, maintenance demands, rent trajectory, and what the exit looks like in five years. Not just whether the transaction closes.
            </p>
            <p className="text-sm leading-7 text-black/75">
              Our compliance background adds a layer of protection most investors never think about until something goes wrong. Trust accounts, documentation, lease enforceability, and regulatory exposure. We know what to watch for.
            </p>

            {/* Interior photo */}
            <div className="relative h-[260px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/unit_loft_interior.jpeg" alt="Investment property interior" fill className="object-cover" />
            </div>
          </div>

          <div className="grid gap-4">
            <Card title="owners since 2018">
              <GridWord /> has been managing its own properties since 2018. When we talk about returns, maintenance costs, and tenant behavior, it's from real experience, not theory.
            </Card>
            <Card title="acquisition to management in one step">
              Buy with <GridWord /> and your property moves directly into professional management. No transition period, no second onboarding, no gap in oversight.
            </Card>
            <Card title="regulatory fluency">
              Deep compliance experience means we flag issues before they become problems. Lease language, disclosure requirements, trust account practices, and landlord-tenant law in Oklahoma.
            </Card>
          </div>
        </div>
      </Section>

      {/* SERVICES GRID */}
      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Investor services</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">From acquisition to exit.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investorServices.map((s) => (
              <div key={s.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold tracking-tight">{s.title}</div>
                <p className="mt-2 text-sm leading-6 text-black/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY OKC METRO */}
      <Section title="Why the OKC Metro" kicker="The market">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-black/75">
              The Oklahoma City Metro is one of the most stable rental markets in the country — low cost of entry, strong rental demand, and consistent cash flow without the volatility of coastal markets. University anchors, major employers, and steady population growth across the metro make it a long-term owner's market.
            </p>
            <p className="text-sm leading-7 text-black/75">
              <GridWord /> is deeply embedded in how the OKC Metro is growing — through active involvement in planning, local development projects, and the <span className="font-semibold">Nompton™ Group's</span> network of operators and community stakeholders. We see opportunities before they're widely known.
            </p>
            <div className="grid gap-3 sm:grid-cols-3 pt-2">
              {[
                { stat: "Low entry costs", note: "Strong cash flow relative to purchase price" },
                { stat: "Stable demand", note: "Consistent rental demand across price points" },
                { stat: "Metro growth", note: "Population and job growth across all submarkets" },
              ].map((item) => (
                <div key={item.stat} className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-sm font-semibold tracking-tight">{item.stat}</div>
                  <div className="mt-1 text-xs text-black/60 leading-5">{item.note}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">talk about investing in OKC</a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative h-[200px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/logan_street_view.jpeg" alt="OKC Metro street view" fill className="object-cover" />
            </div>
            <div className="relative h-[200px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/logan_building_sky.jpeg" alt="OKC Metro building" fill className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* TOOLS + NORMAN CONDOS CALLOUT */}
      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <div className="text-sm font-medium text-black/60">Investor resources</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Tools built for Oklahoma investors.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <a href="/tools" className="group rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition-colors">
              <div className="text-2xl mb-3">📊</div>
              <div className="text-sm font-semibold tracking-tight">Real Estate Calculators</div>
              <p className="mt-2 text-sm leading-6 text-black/65">
                Rental proforma, rehab underwriter, mortgage scenarios, and closing cost estimates. Run the numbers on any Oklahoma deal — no sign-up required.
              </p>
              <div className="mt-4 text-sm font-medium text-black group-hover:underline underline-offset-4">open calculators →</div>
            </a>
            <a href="https://www.normanokcondos.com" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition-colors">
              <div className="text-2xl mb-3">🏙️</div>
              <div className="text-sm font-semibold tracking-tight">NormanOKCondos.com</div>
              <p className="mt-2 text-sm leading-6 text-black/65">
                GRID&apos;s dedicated Norman condo directory — every major complex, with unit layouts, market comps, HOA data, and floorplans. Built for buyers and investors researching the Norman condo market.
              </p>
              <div className="mt-4 text-sm font-medium text-black group-hover:underline underline-offset-4">explore the directory →</div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Ready to invest in Norman?</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your goals.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you're evaluating your first OKC rental or expanding a portfolio, we'll have a real conversation about the numbers, the market, and the right move.
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">talk investing</a>
              <a href="/manage" className="rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white hover:border-white/60">property management</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
