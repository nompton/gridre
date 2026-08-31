import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Edmond Property Management — GRID Real Estate",
  description:
    "Property management in Edmond, OK for landlords and investors who want it done right. GRID offers tenant screening, rent collection, professional photography, Matterport 3D tours, and clean owner reporting. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/edmond" },
  openGraph: {
    title: "Edmond Property Management — GRID Real Estate",
    description: "Full-service rental property management in Edmond, Oklahoma. Tenant placement, Matterport 3D, drone coverage, and monthly owner statements for Edmond landlords.",
    url: "https://thegridre.com/edmond",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in Edmond, OK?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your Edmond property or portfolio." } },
    { "@type": "Question", name: "Do you manage rental properties in Edmond?", acceptedAnswer: { "@type": "Answer", text: "Yes. We manage single-family homes, small multifamily properties, and investor portfolios in Edmond and across the OKC Metro." } },
    { "@type": "Question", name: "Why is Edmond a good rental investment market?", acceptedAnswer: { "@type": "Answer", text: "Edmond has consistently strong rental demand driven by top-rated schools, a growing professional population, and proximity to Oklahoma City. Quality tenants actively seek Edmond rentals." } },
    { "@type": "Question", name: "Do you manage Edmond properties for out-of-state investors?", acceptedAnswer: { "@type": "Answer", text: "Yes. Many of our Edmond owners are out-of-state investors. We provide local oversight, monthly reporting, and full management so you can own here confidently without being here." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "Edmond Property Management", item: "https://thegridre.com/edmond" },
  ],
};

export default function EdmondPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/edmond-rental-home.jpg" alt="Edmond Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Edmond, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Edmond property management with premier marketing.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Edmond is one of the strongest rental markets in the OKC Metro — high demand, quality tenants, and properties that deserve to be presented well. <GridWord /> manages Edmond rentals with professional photography, Matterport 3D, drone coverage, and targeted social media campaigns on every listing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
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

      <section className="border-y border-black/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Common questions</div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Edmond property management FAQ</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { q: "How much does property management cost in Edmond, OK?", a: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your Edmond property or portfolio." },
              { q: "Do you manage rental properties in Edmond?", a: "Yes. We manage single-family homes, small multifamily properties, and investor portfolios in Edmond and across the OKC Metro." },
              { q: "Why is Edmond a good rental investment market?", a: "Edmond has consistently strong rental demand driven by top-rated schools, a growing professional population, and proximity to Oklahoma City. Quality tenants actively seek Edmond rentals." },
              { q: "Do you manage Edmond properties for out-of-state investors?", a: "Yes. Many of our Edmond owners are out-of-state investors. We provide local oversight, monthly reporting, and full management so you can own here confidently without being here." },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold tracking-tight marker:content-none">
                  {item.q}
                  <span className="shrink-0 text-black/40 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-black/70">{item.a}</p>
              </details>
            ))}
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
