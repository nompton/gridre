import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Midwest City Property Management — GRID Real Estate",
  description:
    "Professional property management in Midwest City, OK. GRID delivers premier marketing, full-service leasing, and owner-focused management for Midwest City rental properties.",
};

export default function MidwestCityPage() {
  return (
    <div>
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-black/50">Property Management — Midwest City, OK</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Midwest City property management. Handled professionally.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/70">
              Midwest City has a reliable rental market anchored by Tinker AFB, steady employment, and consistent demand for quality housing. <GridWord /> manages Midwest City properties with premier marketing and full-service management — so owners get qualified tenants, fast.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">get a management proposal</a>
              <a href="tel:4053101221" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">call (405) 310-1221</a>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Midwest City owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="a stable market that rewards good management">
            Midwest City's rental demand is consistent and reliable. Properties that are well-managed and well-marketed attract the kind of long-term tenants that make ownership straightforward.
          </Card>
          <Card title="premier marketing on every listing">
            Professional photography, Matterport 3D, drone coverage, Instagram and Facebook campaigns, and syndication across 100+ platforms. Tenants searching online find your property first.
          </Card>
          <Card title="thorough tenant screening">
            Full credit, background, and income verification on every applicant. Midwest City attracts quality tenants — we make sure we place the right ones.
          </Card>
          <Card title="out-of-state investor friendly">
            Own a Midwest City property remotely? <GridWord /> gives you local management, clear reporting, and a team that handles everything so you don't have to be here.
          </Card>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-sm font-medium text-black/60 mb-2">Full-service management</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-3">Everything included. Nothing complicated.</h2>
          <p className="max-w-2xl text-sm leading-7 text-black/70 mb-8">
            Every Midwest City property we manage gets the full GRID treatment — premier marketing, thorough tenant screening, Oklahoma-compliant leases, proactive maintenance coordination, and clean monthly owner reporting. No hidden fees, no surprise markups.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/manage" className="rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30">see all management services</a>
            <a href="/contact" className="rounded-full bg-black px-4 py-2 text-sm text-white hover:opacity-90">get a proposal</a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Midwest City property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Midwest City property.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Tell us what you've got and we'll put together a clear, no-obligation management proposal.
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
