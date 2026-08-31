import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Oklahoma City Property Management — GRID Real Estate",
  description:
    "Property management in Oklahoma City by GRID Real Estate — Oklahoma's investor-focused brokerage. We handle OKC rentals with professional photography, Matterport 3D, tenant screening, maintenance, and clean owner reporting. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/oklahoma-city" },
  openGraph: {
    title: "Oklahoma City Property Management — GRID Real Estate",
    description: "Investor-focused property management across Oklahoma City. Full-service leasing, professional marketing, and monthly owner statements for OKC landlords and portfolio owners.",
    url: "https://thegridre.com/oklahoma-city",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Property Management",
  "name": "Oklahoma City Property Management",
  "description": "Full-service rental property management in Oklahoma City, Oklahoma. Tenant screening, professional marketing, maintenance coordination, and monthly owner reporting.",
  "provider": { "@type": "LocalBusiness", "name": "GRID Real Estate", "url": "https://thegridre.com", "telephone": "+14053101221" },
  "areaServed": [
    { "@type": "City", "name": "Oklahoma City", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Edmond", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Moore", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Yukon", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Mustang", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Midwest City", "containedIn": "Oklahoma" },
  ],
  "url": "https://thegridre.com/oklahoma-city",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in Oklahoma City?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your OKC property or portfolio." } },
    { "@type": "Question", name: "Do you manage single-family homes in OKC?", acceptedAnswer: { "@type": "Answer", text: "Yes. We manage single-family rentals, small multifamily properties, and growing investor portfolios across Oklahoma City and the surrounding metro." } },
    { "@type": "Question", name: "How do you market vacancies in Oklahoma City?", acceptedAnswer: { "@type": "Answer", text: "Every OKC vacancy gets professional photography, a Matterport 3D virtual tour, drone coverage, targeted social media campaigns, and syndication across 100+ rental platforms including Zillow, Apartments.com, and Zumper." } },
    { "@type": "Question", name: "Do you manage OKC properties for out-of-state investors?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with many out-of-state owners who invest in the Oklahoma City market. We provide local oversight, monthly reporting, and handle everything on the ground." } },
    { "@type": "Question", name: "What neighborhoods in Oklahoma City do you manage in?", acceptedAnswer: { "@type": "Answer", text: "We manage rental properties throughout OKC including Midtown, Nichols Hills adjacent areas, the 405 corridor, south OKC, and surrounding suburbs." } },
  ],
};

const features = [
  { title: "Professional Photography", body: "Every listing photographed by professionals with wide-angle, edited shots that show the property at its best." },
  { title: "Matterport 3D Tours", body: "Full virtual walkthroughs on every listing. Serious tenants show up to showings already sold." },
  { title: "Drone Coverage", body: "FAA-compliant aerial photography showing the property and its neighborhood context." },
  { title: "Social Media Campaigns", body: "Targeted Instagram and Facebook campaigns that put your listing in front of qualified OKC renters." },
  { title: "100+ Platform Syndication", body: "Zillow, Apartments.com, Zumper, Trulia, Facebook Marketplace, and more — automatically." },
  { title: "Tenant Screening", body: "Full credit, background, and income verification on every applicant. No exceptions." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "Oklahoma City Property Management", item: "https://thegridre.com/oklahoma-city" },
  ],
};

export default function OklahomaCityPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/okc-rental-townhome.jpg" alt="Oklahoma City rental property — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Oklahoma City, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Oklahoma City property management done right.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> manages rental properties across Oklahoma City with a level of marketing and professionalism most local managers can't match. Professional photography, Matterport 3D, drone, and social media campaigns are standard on every vacancy — not an upgrade.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Why GRID</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">The OKC rental market rewards good marketing.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/70">
              Oklahoma City is a competitive rental market. Properties that are professionally presented — with real photography, 3D tours, and social media exposure — lease faster and attract higher-quality tenants. That's what <GridWord /> delivers on every listing.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold tracking-tight">{f.title}</div>
                <p className="mt-2 text-sm leading-6 text-black/70">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Full-service management in OKC" kicker="What we handle">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Card title="tenant placement">
              We fill vacancies fast with qualified tenants. Premier marketing means more applicants; thorough screening means better ones.
            </Card>
            <Card title="rent collection & reporting">
              Consistent owner disbursements, monthly statements, and always-accessible financial records.
            </Card>
            <Card title="maintenance coordination">
              Vetted vendors, clear work orders, transparent pricing. Problems get handled, not ignored.
            </Card>
          </div>
          <div className="space-y-4">
            <Card title="lease management">
              Oklahoma-compliant leases, timely renewals, and proactive tenant retention.
            </Card>
            <Card title="trust account management">
              Built on real compliance experience. Your funds are handled correctly.
            </Card>
            <Card title="eviction coordination">
              When needed, we manage the process with proper documentation, timelines, and legal coordination.
            </Card>
          </div>
        </div>
      </Section>

      <section className="border-y border-black/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Common questions</div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Oklahoma City property management FAQ</h2>
          </div>
          <div className="divide-y divide-black/10">
            {[
              { q: "How much does property management cost in Oklahoma City?", a: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your OKC property or portfolio." },
              { q: "Do you manage single-family homes in OKC?", a: "Yes. We manage single-family rentals, small multifamily properties, and growing investor portfolios across Oklahoma City and the surrounding metro." },
              { q: "How do you market vacancies in Oklahoma City?", a: "Every OKC vacancy gets professional photography, a Matterport 3D virtual tour, drone coverage, targeted social media campaigns, and syndication across 100+ rental platforms including Zillow, Apartments.com, and Zumper." },
              { q: "Do you manage OKC properties for out-of-state investors?", a: "Yes. We work with many out-of-state owners who invest in the Oklahoma City market. We provide local oversight, monthly reporting, and handle everything on the ground so you don't need to be here." },
              { q: "What neighborhoods in Oklahoma City do you manage in?", a: "We manage rental properties throughout OKC including Midtown, Nichols Hills adjacent areas, the 405 corridor, south OKC, and surrounding suburbs. If you own it in the metro, we can manage it." },
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
            <div className="text-sm font-medium text-white/75">Oklahoma City property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Ready to hand it off?</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Tell us about your OKC property or portfolio and we'll put together a straightforward management proposal.
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
