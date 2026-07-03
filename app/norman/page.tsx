import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Norman Property Management — GRID Real Estate",
  description:
    "Property management in Norman, OK by GRID Real Estate — Norman is our home market. Tenant screening, rent collection, Matterport 3D, drone coverage, and full-service management for Norman landlords and investors. Call (405) 310-1221.",
  openGraph: {
    title: "Norman Property Management — GRID Real Estate",
    description: "Full-service rental property management in Norman, Oklahoma. GRID is headquartered in Norman — this is our home market. Professional marketing, tenant screening, and investor-focused management.",
    url: "https://thegridre.com/norman",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in Norman, OK?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Norman is our home market — contact us for a custom proposal based on your property or portfolio." } },
    { "@type": "Question", name: "Do you manage rentals near the University of Oklahoma?", acceptedAnswer: { "@type": "Answer", text: "Yes. We manage rental properties throughout Norman including near OU campus, Campus Corner, and surrounding neighborhoods. The university creates consistent, year-round rental demand." } },
    { "@type": "Question", name: "Is Norman a good rental investment market?", acceptedAnswer: { "@type": "Answer", text: "Norman is one of Oklahoma's most stable rental markets, anchored by the University of Oklahoma. Strong tenant demand, diverse renter types (students, faculty, professionals, families), and consistent cash flow make it a reliable long-term investment." } },
    { "@type": "Question", name: "Do you manage condos in Norman?", acceptedAnswer: { "@type": "Answer", text: "Yes. We manage Norman condos and have deep expertise in Norman's condo market. We also built NormanOKCondos.com — a dedicated Norman condo directory covering every major complex in the city." } },
    { "@type": "Question", name: "Do you manage Norman properties for out-of-state investors?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with many out-of-state investors who own Norman rentals. GRID provides local oversight, clear monthly reporting, and full management so you can own here confidently without being here." } },
  ],
};

export default function NormanPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/campus_corner.jpg" alt="Norman Oklahoma rental property — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Norman, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Norman property management. This is our home market.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> is headquartered in Norman. We live here, invest here, and know this market at a level no out-of-town property manager can match. Single-family rentals, condos, small multifamily — we manage them all with professional photography, Matterport 3D, drone coverage, and a management practice built on real ownership experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Norman owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="local knowledge, not just a license">
            We own property in Norman. We know which neighborhoods rent fast, which tenants OU attracts, and what maintenance looks like in older Campus Corner stock versus newer east-side builds. That context changes how we manage.
          </Card>
          <Card title="thorough tenant screening">
            Norman's renter mix — students, faculty, university staff, professionals — means applicant quality varies widely. We run full credit, criminal, and income verification on every applicant and match the tenant to the property type.
          </Card>
          <Card title="professional marketing on every vacancy">
            Every Norman vacancy gets professional photography, a Matterport 3D tour, drone coverage, and syndication across 100+ platforms. Vacancies fill faster because we present properties better than anyone in this market.
          </Card>
          <Card title="compliance you can trust">
            <GridWord />&apos;s management practice is built on deep regulatory experience — including work at the Oklahoma Real Estate Commission. Trust accounts and documentation handled to the professional standard most managers never reach.
          </Card>
        </div>
      </Section>

      {/* Norman Condo Callout */}
      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-sm font-medium text-black/60">Norman condo market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Deep expertise in Norman condos.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                Norman has a rich condo market spanning historic downtown lofts, OU-adjacent units, and newer east-side developments. <GridWord /> manages Norman condos and has invested in making that market more transparent — we built <strong>NormanOKCondos.com</strong>, a dedicated directory covering every major condo complex in the city.
              </p>
              <p className="mt-3 text-sm leading-7 text-black/75">
                Whether you own a condo and need management, or you&apos;re an investor evaluating the Norman condo market, we have both the data and the local knowledge to help.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.normanokcondos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  explore NormanOKCondos.com
                </a>
                <a href="/contact" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">
                  get a condo proposal
                </a>
              </div>
            </div>
            <div className="relative h-[340px] overflow-hidden rounded-3xl border border-black/10">
              <Image src="/images/loft.jpg" alt="Norman Oklahoma condo interior" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-sm font-medium text-black/60 mb-2">Full-service management</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-4">Everything your Norman rental needs.</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {[
              "Professional Photography",
              "Matterport 3D Tour",
              "Drone Coverage",
              "Social Media Marketing",
              "100+ Platform Syndication",
              "Tenant Screening",
              "Rent Collection",
              "Maintenance Coordination",
              "Oklahoma-compliant Leases",
              "Monthly Reporting",
              "Lease Renewals",
              "Eviction Coordination",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm">
                <span className="text-black/30">+</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Common questions</div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Norman property management FAQ</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { q: "How much does property management cost in Norman, OK?", a: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Norman is our home market — contact us for a custom proposal based on your property or portfolio." },
              { q: "Do you manage rentals near the University of Oklahoma?", a: "Yes. We manage rental properties throughout Norman including near OU campus, Campus Corner, and surrounding neighborhoods. The university creates consistent, year-round rental demand." },
              { q: "Is Norman a good rental investment market?", a: "Norman is one of Oklahoma's most stable rental markets, anchored by the University of Oklahoma. Strong tenant demand, diverse renter types (students, faculty, professionals, families), and consistent cash flow make it a reliable long-term investment." },
              { q: "Do you manage condos in Norman?", a: "Yes. We manage Norman condos and have deep expertise in Norman's condo market. We also built NormanOKCondos.com — a dedicated Norman condo directory covering every major complex in the city." },
              { q: "Do you manage Norman properties for out-of-state investors?", a: "Yes. We work with many out-of-state investors who own Norman rentals. GRID provides local oversight, clear monthly reporting, and full management so you can own here confidently without being here." },
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
            <div className="text-sm font-medium text-white/75">Norman property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let&apos;s talk about your Norman rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              One property or a growing portfolio — <GridWord /> will put together a clear, straightforward management proposal. Norman is our home. We&apos;re invested in this market the same way you are.
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
