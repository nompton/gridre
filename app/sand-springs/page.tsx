import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Sand Springs Property Management — GRID Real Estate",
  description:
    "Property management in Sand Springs, OK by GRID Real Estate. Affordable entry points and proximity to Tulsa make Sand Springs an attractive market for buy-and-hold investors. Full-service management with professional marketing. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/sand-springs" },
  openGraph: {
    title: "Sand Springs Property Management — GRID Real Estate",
    description: "Full-service property management in Sand Springs, Oklahoma. Affordable investor market with strong rental demand, professional marketing, and owner-focused management.",
    url: "https://thegridre.com/sand-springs",
  },
};

export default function SandSpringsPage() {
  return (
    <div>
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/listing-exterior.jpg" alt="Sand Springs Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Sand Springs, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Sand Springs property management with premier marketing.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Sand Springs offers established neighborhoods, affordable housing stock, and a tenant base that tends to stay put — the kind of market long-term investors appreciate. <GridWord /> manages Sand Springs rentals with professional photography, Matterport 3D, drone coverage, and targeted campaigns on every listing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Sand Springs owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Sand Springs tenants stay">
            Established neighborhoods and a strong sense of community mean Sand Springs attracts tenants who put down roots. Lower turnover means lower costs and more predictable income.
          </Card>
          <Card title="premier marketing on every vacancy">
            Professional photography, Matterport 3D tours, drone coverage, Instagram and Facebook campaigns, and syndication to 100+ rental platforms. Every vacancy, no exceptions.
          </Card>
          <Card title="tenant screening that protects your investment">
            Full credit, background, and income verification on every applicant. The right tenant up front saves you far more than any shortcut.
          </Card>
          <Card title="owner reporting you can actually read">
            Monthly statements with clear income, expense, and maintenance records. No surprises, no confusion.
          </Card>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-sm font-medium text-black/60">Sand Springs rental market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">West Tulsa's most stable long-term rental market.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                Sand Springs has a loyal, community-oriented tenant base and affordable entry points for investors. Properties here don't always make headlines — but they perform quietly and consistently for owners who manage them right.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                <GridWord /> manages Sand Springs properties with the same standards we apply to our own. Proactive maintenance, clear communication, and professional marketing that fills vacancies fast.
              </p>
              <div className="mt-6">
                <a href="/manage" className="rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30">see full management services</a>
              </div>
            </div>
            <div className="space-y-3">
              {["Professional Photography", "Matterport 3D Tour", "Drone Coverage", "Social Media Campaigns", "100+ Platform Syndication", "Full Tenant Screening", "Oklahoma-compliant Leases", "Monthly Owner Reporting"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm">
                  <span className="text-black/30">+</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Sand Springs property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Sand Springs rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one property or a portfolio in Sand Springs, <GridWord /> can put together a straightforward management proposal.
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">request a proposal</a>
              <a href="tel:4053101221" className="rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white hover:border-white/60">call (405) 310-1221</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
