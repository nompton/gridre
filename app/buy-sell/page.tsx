import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Buy & Sell Real Estate in Norman, OK | GRID Real Estate",
  description: "Buyer representation and home listings in Norman, Oklahoma with an investor-first perspective. Local market knowledge, professional photography, Matterport tours, and MLS syndication. Call (405) 310-1221.",
  openGraph: {
    title: "Buy & Sell Real Estate in Norman, OK | GRID Real Estate",
    description: "Norman, OK buyer representation and listing services. Investor-first perspective, professional marketing, and local expertise.",
    url: "https://thegridre.com/buy-sell",
  },
};

export default function BuySellPage() {
  return (
    <div>
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image src="/images/frontdoor.jpg" alt="Norman real estate" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Buy & Sell</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">transactions done right</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Whether you're buying your next investment property or selling one you've held for years, <GridWord /> brings real market knowledge, strategic marketing, and clean execution to every transaction.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">talk about buying or selling</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Buying in Norman" kicker="Buyer representation">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-black/75">
              Whether you're buying a primary residence or adding to a rental portfolio, <GridWord /> brings a perspective most agents can't. One that accounts for long-term value, rental potential, and neighborhood trajectory alongside the personal factors.
            </p>
            <p className="text-sm leading-7 text-black/75">
              Norman is a nuanced market. Neighborhoods vary significantly in rental demand, appreciation, and long-term positioning. We help you understand what you're actually buying, not just the address.
            </p>
            <div className="grid gap-4">
              <Card title="investor-aware buyer representation">
                Even if you're buying a primary home, we evaluate every property through an ownership lens. What it could rent for, what the exit looks like, and what the neighborhood is doing.
              </Card>
              <Card title="clear process, no surprises">
                From offer to close, you'll always know what's happening and what comes next. We keep transactions moving and handle problems before they become delays.
              </Card>
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-black/10">
            <Image src="/images/pool_home_exterior.jpeg" alt="Norman property" fill className="object-cover" />
          </div>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Listing and marketing</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Selling with <GridWord /></h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-4">
              <p className="text-sm leading-7 text-black/75">
                <GridWord /> listings get professional marketing because how a property is presented directly affects what it sells for and how fast. We don't cut corners on presentation.
              </p>
              <p className="text-sm leading-7 text-black/75">
                For investors selling a rental, we understand the specific positioning that attracts the right buyer. One who sees the income potential, not just the property.
              </p>
            </div>
            <div className="grid gap-4">
              <Card title="Matterport 3D tours">
                Every listing gets a full Matterport virtual tour, letting buyers and investors explore the property remotely and arrive at showings already qualified.
              </Card>
              <Card title="professional photography and drone">
                Wide-angle, professionally edited photography and FAA-compliant aerial coverage that shows the property and its context at its best.
              </Card>
              <Card title="MLS and full digital syndication">
                Listed on MLSOK and syndicated to Zillow, Realtor.com, Redfin, and 100+ portals, plus targeted social distribution through the Nompton™ network.
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Ready to move?</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your next transaction.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">Buying, selling, or both. We'll keep it clear, strategic, and moving forward.</div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get in touch</a>
              <a href="/invest" className="rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white hover:border-white/60">investor services</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
