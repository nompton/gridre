import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Edmond Property Management — GRID Real Estate",
  description:
    "Professional property management in Edmond, OK. GRID offers premier marketing, full-service leasing, and owner-focused management for Edmond rental properties.",
};

export default function EdmondPage() {
  return (
    <div>
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-black/50">Property Management — Edmond, OK</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Edmond property management with premier marketing.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/70">
              Edmond is one of the strongest rental markets in the OKC Metro — high demand, quality tenants, and properties that deserve to be presented well. <GridWord /> manages Edmond rentals with professional photography, Matterport 3D, drone coverage, and targeted social media campaigns on every listing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">get a management proposal</a>
              <a href="tel:4053101221" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">call (405) 310-1221</a>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Edmond owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Edmond demands quality">
            Tenants in Edmond expect well-maintained properties and professional communication. <GridWord /> delivers that standard — and markets your property at a level that attracts it.
          </Card>
          <Card title="premier marketing on every vacancy">
            Professional photography, Matterport 3D tours, drone coverage, Instagram and Facebook campaigns, and syndication to 100+ rental platforms. Every vacancy, no exceptions.
          </Card>
          <Card title="tenant screening that protects your investment">
            Full credit, background, and income verification. Edmond's strong applicant pool means we can afford to be selective — and we are.
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
              <div className="text-sm font-medium text-black/60">Edmond rental market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">One of the OKC Metro's strongest markets.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                Edmond benefits from top-rated schools, strong employment, and consistent demand from families and professionals who want quality rental housing. Properties managed well — and marketed well — hold their value and attract long-term tenants.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                <GridWord /> manages Edmond properties with the same standard we apply to our own. Proactive maintenance, clear communication, and professional marketing that fills vacancies fast.
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
            <div className="text-sm font-medium text-white/75">Edmond property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Edmond rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one property or a portfolio in Edmond, <GridWord /> can put together a straightforward management proposal.
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
