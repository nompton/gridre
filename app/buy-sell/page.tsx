import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  alternates: { canonical: "https://thegridre.com/buy-sell" },
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
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/70">
              How a property is presented directly affects what it sells for and how fast. <GridWord /> listings get the full marketing treatment — professional photography, Matterport 3D, drone coverage, and targeted social media campaigns are standard, not add-ons.
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-3">
            <div className="relative h-[220px] overflow-hidden rounded-2xl border border-black/10 md:col-span-2">
              <Image src="/images/listing-exterior.jpg" alt="Professional exterior photography for OKC home listing" fill className="object-cover" />
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">Professional photography</div>
            </div>
            <div className="grid gap-3">
              <div className="relative h-[104px] overflow-hidden rounded-2xl border border-black/10">
                <Image src="/images/listing-kitchen.jpg" alt="Professional kitchen photography" fill className="object-cover" />
              </div>
              <div className="relative h-[104px] overflow-hidden rounded-2xl border border-black/10">
                <Image src="/images/listing-living.jpg" alt="Professional living room photography" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="mb-8 grid gap-3 md:grid-cols-4">
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/listing-bedroom.jpg" alt="Professional bedroom photography" fill className="object-cover" />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/listing-bath.jpg" alt="Professional bathroom photography" fill className="object-cover" />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-black/10 md:col-span-2">
              <Image src="/images/listing-backpatio.jpg" alt="Professional back patio photography" fill className="object-cover" />
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">Full property coverage</div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-black/10 bg-white p-8">
            <div className="mb-6">
              <div className="text-sm font-semibold tracking-tight">Matterport 3D Tour</div>
              <p className="mt-2 text-sm leading-6 text-black/70">
                Every listing gets a full Matterport virtual tour. Buyers and investors explore the property remotely and arrive at showings already serious.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-black/10">
              <iframe width="100%" height="480" src="https://my.matterport.com/show/?m=cHWR8EsNBfv" frameBorder="0" allowFullScreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking" className="w-full" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card title="professional photography & drone">
              Wide-angle, professionally edited photography and FAA-compliant aerial coverage that shows the property and its surroundings at their best.
            </Card>
            <Card title="social media campaigns">
              Targeted Instagram and Facebook ads that put your listing in front of qualified buyers and investors actively looking in OKC.
            </Card>
            <Card title="MLS and full syndication">
              Listed on MLSOK and syndicated to Zillow, Realtor.com, Redfin, and 100+ portals. Maximum exposure, automatically.
            </Card>
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
