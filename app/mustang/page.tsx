import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Mustang Property Management — GRID Real Estate",
  description:
    "Professional property management in Mustang, OK. GRID delivers premier marketing, full-service leasing, and owner-focused management for Mustang rental properties.",
};

export default function MustangPage() {
  return (
    <div>
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-black/50">Property Management — Mustang, OK</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Mustang property management built for growth.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/70">
              Mustang is one of the fastest-growing communities in the OKC Metro — new construction, expanding neighborhoods, and steady rental demand. <GridWord /> manages Mustang properties with premier marketing and professional management so owners can keep pace with the market.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">get a management proposal</a>
              <a href="tel:4053101221" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">call (405) 310-1221</a>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Mustang owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="new construction needs strong marketing">
            In a market with new builds competing for the same tenants, professional photography and 3D tours aren't optional — they're how your property stands out.
          </Card>
          <Card title="full marketing suite, no add-ons">
            Professional photos, Matterport 3D, drone coverage, Instagram and Facebook campaigns, and 100+ platform syndication. Every listing, every time.
          </Card>
          <Card title="scalable systems for growing portfolios">
            Whether you own one Mustang rental or are building a portfolio in the southwest metro, <GridWord /> has the systems to manage it consistently.
          </Card>
          <Card title="owners managing for owners">
            <GridWord /> has been operating its own rental properties since 2018. We manage yours the way we'd want ours managed.
          </Card>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-sm font-medium text-black/60 mb-2">The GRID standard</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-3">Premier marketing. Professional management.</h2>
          <p className="max-w-2xl text-sm leading-7 text-black/70">
            Every Mustang property we manage gets professional photography, Matterport 3D, drone coverage, social media campaigns, and syndication to 100+ platforms — plus full-service management with tenant screening, rent collection, maintenance coordination, and clean monthly reporting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/manage" className="rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30">see all management services</a>
            <a href="/contact" className="rounded-full bg-black px-4 py-2 text-sm text-white hover:opacity-90">get a proposal</a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Mustang property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Ready to get started?</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Tell us about your Mustang property and we'll put together a clear, straightforward management proposal.
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
