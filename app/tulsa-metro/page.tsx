import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  alternates: { canonical: "https://thegridre.com/tulsa-metro" },
  title: "Tulsa Metro Property Management — GRID Real Estate",
  description:
    "Professional property management across the Tulsa Metro — Tulsa, Bixby, Broken Arrow, Jenks, Owasso, and Sand Springs. GRID delivers premier marketing and full-service management for Tulsa area rental properties.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Property Management",
  "name": "Tulsa Metro Property Management",
  "description": "Full-service rental property management across the greater Tulsa metropolitan area in Oklahoma. Professional marketing, tenant screening, maintenance coordination, and monthly owner reporting for Tulsa Metro rental properties.",
  "provider": { "@type": "LocalBusiness", "name": "GRID Real Estate", "url": "https://thegridre.com", "telephone": "+14053101221" },
  "areaServed": [
    { "@type": "City", "name": "Tulsa", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Bixby", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Broken Arrow", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Jenks", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Owasso", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Sand Springs", "containedIn": "Oklahoma" },
  ],
  "url": "https://thegridre.com/tulsa-metro",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in the Tulsa Metro?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your Tulsa Metro property or portfolio." } },
    { "@type": "Question", name: "What types of properties do you manage in the Tulsa Metro?", acceptedAnswer: { "@type": "Answer", text: "We manage single-family rentals, small multifamily properties, and growing investor portfolios across the Tulsa Metro — from urban core properties in Tulsa to homes in the surrounding suburbs. Whether you own one property or a portfolio, we treat it like our own." } },
    { "@type": "Question", name: "How do you market vacancies in the Tulsa Metro?", acceptedAnswer: { "@type": "Answer", text: "Every Tulsa Metro vacancy gets professional photography, a Matterport 3D virtual tour, drone coverage, targeted social media campaigns, and syndication across 100+ rental platforms including Zillow, Apartments.com, and Zumper." } },
    { "@type": "Question", name: "Do you manage Tulsa Metro properties for out-of-state investors?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with many out-of-state owners who invest in the Tulsa Metro market. We provide local oversight, monthly reporting, and handle everything on the ground so you don't need to be here." } },
    { "@type": "Question", name: "Which Tulsa Metro communities do you cover?", acceptedAnswer: { "@type": "Answer", text: "We manage rental properties across the greater Tulsa metropolitan area including Tulsa, Bixby, Broken Arrow, Jenks, Owasso, and Sand Springs. Each has its own demand profile, and GRID knows them all." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "Tulsa Metro Property Management", item: "https://thegridre.com/tulsa-metro" },
  ],
};

const cities = [
  { name: "Tulsa", href: "/tulsa", desc: "Core city rentals, diverse neighborhoods, strong urban demand." },
  { name: "Bixby", href: "/bixby", desc: "One of Oklahoma's fastest-growing suburbs. Top schools, strong family demand." },
  { name: "Broken Arrow", href: "/broken-arrow", desc: "Tulsa's largest suburb. Deep rental pool and consistent demand." },
  { name: "Jenks", href: "/jenks", desc: "River access, excellent schools, and a tight-knit community." },
  { name: "Owasso", href: "/owasso", desc: "North Tulsa's fastest-growing city. New development and high demand." },
  { name: "Sand Springs", href: "/sand-springs", desc: "Established west Tulsa neighborhoods with strong long-term tenant base." },
];

export default function TulsaMetroPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/listing-exterior.jpg" alt="Tulsa Metro Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Tulsa Metro</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Tulsa Metro property management with premier marketing.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                The Tulsa Metro is one of Oklahoma's strongest and most diverse rental markets — from core Tulsa neighborhoods to fast-growing suburbs like Bixby, Broken Arrow, and Owasso. <GridWord /> manages Tulsa Metro rentals with professional photography, Matterport 3D, drone coverage, and targeted campaigns on every listing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Where we manage in the Tulsa Metro" kicker="Our coverage">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <a key={city.href} href={city.href} className="group rounded-2xl border border-black/10 bg-white p-6 hover:border-black/25 transition-colors">
              <div className="text-base font-semibold group-hover:underline">{city.name}</div>
              <p className="mt-2 text-sm leading-6 text-black/60">{city.desc}</p>
              <div className="mt-4 text-xs font-medium text-black/40 group-hover:text-black/70 transition-colors">learn more →</div>
            </a>
          ))}
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-sm font-medium text-black/60">Tulsa Metro rental market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">A market built for long-term owners.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                The Tulsa Metro offers a range of rental submarkets — urban core properties in Tulsa, high-growth suburbs like Bixby and Owasso, and established family communities in Broken Arrow and Jenks. Each has its own demand profile, and <GridWord /> knows them all.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                We manage every property the same way — professional marketing, thorough tenant screening, and clear owner reporting. Whether you own one home or a growing portfolio, we treat it like our own.
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
            <div className="text-sm font-medium text-white/75">Tulsa Metro property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Tulsa Metro rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one property or a portfolio across the Tulsa Metro, <GridWord /> can put together a straightforward management proposal.
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
