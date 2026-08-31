import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Broken Arrow Property Management — GRID Real Estate",
  description:
    "Property management in Broken Arrow, OK by GRID Real Estate. One of Oklahoma's fastest-growing cities, Broken Arrow's strong renter base and family demand make it a premier investment market. Full-service management with professional marketing. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/broken-arrow" },
  openGraph: {
    title: "Broken Arrow Property Management — GRID Real Estate",
    description: "Full-service rental management in Broken Arrow, Oklahoma. Strong family renter demand, professional Matterport marketing, and investor-focused management.",
    url: "https://thegridre.com/broken-arrow",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in Broken Arrow, OK?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal for your Broken Arrow property." } },
    { "@type": "Question", name: "Do you manage rentals in Broken Arrow?", acceptedAnswer: { "@type": "Answer", text: "Yes. We manage single-family homes, small multifamily properties, and growing investor portfolios across Broken Arrow and the Tulsa Metro." } },
    { "@type": "Question", name: "Is Broken Arrow a good market for rental property investment?", acceptedAnswer: { "@type": "Answer", text: "Broken Arrow is one of Oklahoma's fastest-growing cities with strong family-driven rental demand, top-rated schools, and consistent appreciation. It's a reliable buy-and-hold market." } },
    { "@type": "Question", name: "Do you manage Broken Arrow properties for out-of-state investors?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with many remote investors in Broken Arrow. We handle marketing, tenant placement, maintenance, and monthly reporting so you don't need to be local." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "Broken Arrow Property Management", item: "https://thegridre.com/broken-arrow" },
  ],
};

export default function BrokenArrowPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/listing-exterior.jpg" alt="Broken Arrow Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Broken Arrow, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Broken Arrow property management with premier marketing.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Broken Arrow is one of Oklahoma's largest cities and Tulsa's most established suburban rental market — deep applicant pools, strong employment, and consistent demand across every price point. <GridWord /> manages Broken Arrow rentals with professional photography, Matterport 3D, drone coverage, and targeted campaigns on every listing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Broken Arrow owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Broken Arrow has depth">
            As one of Oklahoma's largest cities, Broken Arrow offers a wide and consistent applicant pool across income levels and household types. <GridWord /> markets to all of them.
          </Card>
          <Card title="premier marketing on every vacancy">
            Professional photography, Matterport 3D tours, drone coverage, Instagram and Facebook campaigns, and syndication to 100+ rental platforms. Every vacancy, no exceptions.
          </Card>
          <Card title="tenant screening that protects your investment">
            Full credit, background, and income verification on every applicant. We're thorough because your investment depends on it.
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
              <div className="text-sm font-medium text-black/60">Broken Arrow rental market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Tulsa's largest suburb — and one of its most consistent markets.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                Broken Arrow's scale is its strength. Major employers, a well-developed retail and restaurant corridor, and strong schools create year-round rental demand across single-family homes, townhomes, and condos. Properties that show well fill quickly.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                <GridWord /> manages Broken Arrow properties with the same standards we apply to our own. Proactive maintenance, responsive communication, and marketing built to minimize vacancy.
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
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Broken Arrow property management FAQ</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { q: "How much does property management cost in Broken Arrow, OK?", a: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal for your Broken Arrow property." },
              { q: "Do you manage rentals in Broken Arrow?", a: "Yes. We manage single-family homes, small multifamily properties, and growing investor portfolios across Broken Arrow and the Tulsa Metro." },
              { q: "Is Broken Arrow a good market for rental property investment?", a: "Broken Arrow is one of Oklahoma's fastest-growing cities with strong family-driven rental demand, top-rated schools, and consistent appreciation. It's a reliable buy-and-hold market." },
              { q: "Do you manage Broken Arrow properties for out-of-state investors?", a: "Yes. We work with many remote investors in Broken Arrow. We handle marketing, tenant placement, maintenance, and monthly reporting so you don't need to be local." },
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
            <div className="text-sm font-medium text-white/75">Broken Arrow property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Broken Arrow rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one property or a portfolio in Broken Arrow, <GridWord /> can put together a straightforward management proposal.
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
