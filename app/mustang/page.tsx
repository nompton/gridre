import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Mustang Property Management — GRID Real Estate",
  description:
    "Property management in Mustang, OK for growing families and investor landlords. GRID handles leasing, tenant screening, maintenance coordination, and owner reporting — with drone coverage and Matterport 3D on every vacancy. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/mustang" },
  openGraph: {
    title: "Mustang Property Management — GRID Real Estate",
    description: "Full-service rental management in Mustang, Oklahoma. Investor-focused management with professional marketing, thorough screening, and clear monthly reporting.",
    url: "https://thegridre.com/mustang",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Property Management",
  "name": "Mustang Property Management",
  "description": "Full-service rental property management in Mustang, Oklahoma. Tenant screening, professional marketing, maintenance coordination, and monthly owner reporting for a fast-growing southwest OKC metro market.",
  "provider": { "@type": "LocalBusiness", "name": "GRID Real Estate", "url": "https://thegridre.com", "telephone": "+14053101221" },
  "areaServed": [
    { "@type": "City", "name": "Mustang", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Yukon", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Oklahoma City", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Moore", "containedIn": "Oklahoma" },
  ],
  "url": "https://thegridre.com/mustang",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in Mustang?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your Mustang property or portfolio." } },
    { "@type": "Question", name: "What types of properties do you manage in Mustang?", acceptedAnswer: { "@type": "Answer", text: "We manage single-family rentals, new construction homes, small multifamily properties, and growing investor portfolios across Mustang and the southwest OKC metro." } },
    { "@type": "Question", name: "How do you market vacancies in Mustang?", acceptedAnswer: { "@type": "Answer", text: "Every Mustang vacancy gets professional photography, a Matterport 3D virtual tour, drone coverage, targeted Instagram and Facebook campaigns, and syndication across 100+ rental platforms." } },
    { "@type": "Question", name: "Do you manage Mustang properties for out-of-state investors?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with out-of-state owners who invest in the Mustang and OKC metro market. We provide local oversight, monthly reporting, and handle everything on the ground." } },
    { "@type": "Question", name: "Why is Mustang a good market for rental property owners?", acceptedAnswer: { "@type": "Answer", text: "Mustang is one of the fastest-growing communities in the OKC Metro, with new construction, expanding neighborhoods, and steady rental demand. In a market with new builds competing for tenants, premier marketing helps your property stand out." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "Mustang Property Management", item: "https://thegridre.com/mustang" },
  ],
};

export default function MustangPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/mustang-rental-home.jpg" alt="Mustang Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Mustang, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Mustang property management built for growth.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Mustang is one of the fastest-growing communities in the OKC Metro — new construction, expanding neighborhoods, and steady rental demand. <GridWord /> manages Mustang properties with premier marketing and professional management so owners can keep pace with the market.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
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
