import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Jenks Property Management — GRID Real Estate",
  description:
    "Property management in Jenks, OK by GRID Real Estate. Jenks's acclaimed school district draws quality, long-term renters — ideal for investors. GRID manages Jenks rentals with professional photography, Matterport 3D, tenant screening, and full service. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/jenks" },
  openGraph: {
    title: "Jenks Property Management — GRID Real Estate",
    description: "Full-service property management in Jenks, Oklahoma. Top-rated school district, strong renter demand, and professional marketing for Jenks investment properties.",
    url: "https://thegridre.com/jenks",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Property Management",
  "name": "Jenks Property Management",
  "description": "Full-service rental property management in Jenks, Oklahoma. Tenant screening, professional marketing, maintenance coordination, and monthly owner reporting for Jenks investment properties.",
  "provider": { "@type": "LocalBusiness", "name": "GRID Real Estate", "url": "https://thegridre.com", "telephone": "+14053101221" },
  "areaServed": [
    { "@type": "City", "name": "Jenks", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Tulsa", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Bixby", "containedIn": "Oklahoma" },
    { "@type": "City", "name": "Sand Springs", "containedIn": "Oklahoma" },
  ],
  "url": "https://thegridre.com/jenks",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does property management cost in Jenks?", acceptedAnswer: { "@type": "Answer", text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your Jenks property or portfolio." } },
    { "@type": "Question", name: "What types of properties do you manage in Jenks?", acceptedAnswer: { "@type": "Answer", text: "We manage single-family homes, small multifamily properties, and growing investor portfolios throughout Jenks and the surrounding Tulsa metro." } },
    { "@type": "Question", name: "How do you market vacancies in Jenks?", acceptedAnswer: { "@type": "Answer", text: "Every Jenks vacancy gets professional photography, a Matterport 3D virtual tour, drone coverage, targeted Instagram and Facebook campaigns, and syndication across 100+ rental platforms." } },
    { "@type": "Question", name: "Do you manage Jenks properties for out-of-state investors?", acceptedAnswer: { "@type": "Answer", text: "Yes. We work with out-of-state owners who invest in the Jenks and Tulsa metro market. We provide local oversight, monthly reporting, and handle everything on the ground." } },
    { "@type": "Question", name: "Why is Jenks a good market for rental investors?", acceptedAnswer: { "@type": "Answer", text: "Jenks is a Tulsa-metro community known for its top-rated school district, walkable main street, and river access. That intentional demand draws quality, long-term renters and creates stable tenancies with lower turnover." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thegridre.com" },
    { "@type": "ListItem", position: 2, name: "Jenks Property Management", item: "https://thegridre.com/jenks" },
  ],
};

export default function JenksPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/listing-exterior.jpg" alt="Jenks Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Jenks, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Jenks property management with premier marketing.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Jenks is a tight-knit community with excellent schools, river access, and steady demand from families and professionals who want quality over quantity. <GridWord /> manages Jenks rentals with professional photography, Matterport 3D, drone coverage, and targeted campaigns on every listing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Jenks owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Jenks tenants are selective">
            Renters who choose Jenks are typically looking for a specific experience — good schools, a walkable main street, and a neighborhood feel. <GridWord /> presents properties at a level that attracts exactly that tenant.
          </Card>
          <Card title="premier marketing on every vacancy">
            Professional photography, Matterport 3D tours, drone coverage, Instagram and Facebook campaigns, and syndication to 100+ rental platforms. Every vacancy, no exceptions.
          </Card>
          <Card title="tenant screening that protects your investment">
            Full credit, background, and income verification on every applicant. We take the time to get it right the first time.
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
              <div className="text-sm font-medium text-black/60">Jenks rental market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">A community people choose on purpose.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                Jenks draws tenants who specifically want what it offers — a top school district, a real main street, and a neighborhood with character. That kind of intentional demand creates stable, long-term tenancies and lower turnover for property owners.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                <GridWord /> manages Jenks properties with the same standards we apply to our own. Proactive maintenance, clear communication, and marketing that finds the right tenant quickly.
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
            <div className="text-sm font-medium text-white/75">Jenks property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Jenks rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one property or a portfolio in Jenks, <GridWord /> can put together a straightforward management proposal.
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
