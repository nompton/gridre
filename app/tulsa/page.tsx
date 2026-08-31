import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Tulsa Property Management — GRID Real Estate",
  description:
    "Property management in Tulsa, OK by GRID Real Estate. Tulsa's diverse rental market rewards professional presentation — we offer Matterport 3D tours, drone coverage, tenant screening, and full-service management for Tulsa landlords. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/tulsa" },
  openGraph: {
    title: "Tulsa Property Management — GRID Real Estate",
    description: "Full-service rental property management in Tulsa, Oklahoma. Professional marketing, thorough tenant screening, and investor-focused management across the Tulsa metro.",
    url: "https://thegridre.com/tulsa",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Property Management",
  "name": "Tulsa Property Management",
  "description": "Full-service rental property management in Tulsa, Oklahoma. Professional marketing, tenant screening, maintenance coordination, and monthly owner reporting across the Tulsa metro.",
  "provider": { "@type": "LocalBusiness", "name": "GRID Real Estate", "url": "https://thegridre.com", "telephone": "+14053101221" },
  "areaServed": [
    { "@type": "City", "name": "Tulsa", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Bixby", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Broken Arrow", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Jenks", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Owasso", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Sand Springs", "containedIn": "Oklahoma" },
  ],
  "url": "https://thegridre.com/tulsa",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in Tulsa, OK?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal for your Tulsa property or portfolio." } },
    { "@type": "Question", name: "Do you manage rental properties in Tulsa?", acceptedAnswer: { "@type": "Answer", text: "Yes. We manage single-family homes, small multifamily properties, and investor portfolios throughout Tulsa and the Tulsa Metro area." } },
    { "@type": "Question", name: "Why invest in Tulsa rental properties?", acceptedAnswer: { "@type": "Answer", text: "Tulsa offers strong cash flow potential with lower entry costs than many metros, a diverse renter base, and consistent demand. It's an attractive market for both local and out-of-state investors." } },
    { "@type": "Question", name: "Do you manage Tulsa properties for out-of-state owners?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with many remote investors who own Tulsa rentals. We handle everything locally — marketing, tenants, maintenance, and reporting — so you don't need to be here." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "Tulsa Property Management", item: "https://thegridre.com/tulsa" },
  ],
};

export default function TulsaPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/listing-exterior.jpg" alt="Tulsa Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Tulsa, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Tulsa property management with premier marketing.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Tulsa's rental market spans everything from historic midtown bungalows to newer southside neighborhoods — each with its own demand and tenant profile. <GridWord /> manages Tulsa rentals with professional photography, Matterport 3D, drone coverage, and targeted social media campaigns on every listing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Tulsa owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Tulsa has a deep rental pool">
            Strong employment, a major university presence, and steady in-migration make Tulsa one of Oklahoma's most active rental markets. <GridWord /> knows how to reach the right tenants in each submarket.
          </Card>
          <Card title="premier marketing on every vacancy">
            Professional photography, Matterport 3D tours, drone coverage, Instagram and Facebook campaigns, and syndication to 100+ rental platforms. Every vacancy, no exceptions.
          </Card>
          <Card title="tenant screening that protects your investment">
            Full credit, background, and income verification on every applicant. We're selective so you don't have to be.
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
              <div className="text-sm font-medium text-black/60">Tulsa rental market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">A city with real rental demand across every neighborhood.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                Tulsa's neighborhoods each have their own character and tenant demand — midtown, the Pearl District, Brookside, east Tulsa, and beyond. Properties managed well and marketed well hold their value and attract long-term tenants regardless of which part of the city you're in.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                <GridWord /> manages Tulsa properties with the same standard we apply to our own. Proactive maintenance, clear communication, and professional marketing that fills vacancies fast.
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
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Tulsa property management FAQ</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { q: "How much does property management cost in Tulsa, OK?", a: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal for your Tulsa property or portfolio." },
              { q: "Do you manage rental properties in Tulsa?", a: "Yes. We manage single-family homes, small multifamily properties, and investor portfolios throughout Tulsa and the Tulsa Metro area." },
              { q: "Why invest in Tulsa rental properties?", a: "Tulsa offers strong cash flow potential with lower entry costs than many metros, a diverse renter base, and consistent demand. It's an attractive market for both local and out-of-state investors." },
              { q: "Do you manage Tulsa properties for out-of-state owners?", a: "Yes. We work with many remote investors who own Tulsa rentals. We handle everything locally — marketing, tenants, maintenance, and reporting — so you don't need to be here." },
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
            <div className="text-sm font-medium text-white/75">Tulsa property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Tulsa rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one property or a portfolio in Tulsa, <GridWord /> can put together a straightforward management proposal.
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
