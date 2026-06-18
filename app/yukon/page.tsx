import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Yukon Property Management — GRID Real Estate",
  description:
    "Professional property management in Yukon, OK. GRID offers premier marketing, full-service leasing, and owner-focused management for Yukon rental properties.",
};

export default function YukonPage() {
  return (
    <div>
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-black/50">Property Management — Yukon, OK</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Yukon property management. Premier marketing included.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/70">
              Yukon is growing fast — and with that growth comes real rental demand from families and professionals moving to the west metro. <GridWord /> manages Yukon properties with professional photography, Matterport 3D tours, drone coverage, and social media campaigns on every listing. No extra charge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">get a management proposal</a>
              <a href="tel:4053101221" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">call (405) 310-1221</a>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Yukon owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Yukon's growth means more competition">
            New construction in Yukon means tenants have options. Professional marketing — real photography, 3D tours, social media — is what separates fast-leasing properties from ones that sit.
          </Card>
          <Card title="full marketing toolkit on every vacancy">
            Professional photography, Matterport 3D, drone coverage, Instagram and Facebook ad campaigns, and syndication to 100+ rental platforms. Standard. Not optional.
          </Card>
          <Card title="owner-first management">
            <GridWord /> has been managing its own properties since 2018. We manage yours the same way — proactive maintenance, qualified tenants, and clean books.
          </Card>
          <Card title="metro-wide reach">
            Our marketing reaches renters actively looking across the entire OKC west metro, not just people who happen to drive by.
          </Card>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-sm font-medium text-black/60 mb-2">The GRID standard</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-4">Everything included. Nothing hidden.</h2>
          <p className="max-w-2xl text-sm leading-7 text-black/70 mb-8">
            Every property we manage in Yukon gets the full suite: premier marketing, thorough tenant screening, Oklahoma-compliant leases, maintenance coordination with vetted vendors, and monthly owner reporting. Management fees are straightforward with no hidden charges or surprise markups.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/manage" className="rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30">see full management services</a>
            <a href="/contact" className="rounded-full bg-black px-4 py-2 text-sm text-white hover:opacity-90">get a proposal</a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Yukon property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Ready to work together?</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Tell us about your Yukon rental and we'll put together a clear management proposal.
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
