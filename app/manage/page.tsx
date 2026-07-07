import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Property Management in Norman, OK | GRID Real Estate",
  description: "Full-service property management in Norman, Oklahoma for landlords and investors. Tenant screening, rent collection, maintenance coordination, and owner reporting. Call (405) 310-1221.",
  openGraph: {
    title: "Property Management in Norman, OK | GRID Real Estate",
    description: "Professional rental property management for Norman, OK investors. Tenant placement, Matterport tours, trust account management, and clean monthly reporting.",
    url: "https://thegridre.com/manage",
  },
};

const services = [
  { title: "Tenant Screening & Placement", body: "Full credit, background, and income verification. We find tenants who pay on time, treat the property well, and stay." },
  { title: "Rent Collection & Disbursement", body: "Automated collection with consistent owner disbursements and monthly statements. No chasing, no guessing." },
  { title: "Maintenance Coordination", body: "Vetted vendor relationships, clear work orders, and transparent pricing. Problems get handled, not ignored." },
  { title: "Lease Management & Renewals", body: "Oklahoma-compliant leases, timely renewals, and proactive retention strategy to keep good tenants longer." },
  { title: "Owner Reporting", body: "Monthly statements with clear income, expense, and maintenance records. Always accessible from any device." },
  { title: "Trust Account Management", body: "Disciplined financial controls and documentation built on real compliance experience. Your funds are handled correctly." },
  { title: "Eviction & Legal Coordination", body: "When needed, we manage the process with documentation, timelines, and local legal coordination." },
  { title: "Premier Listing Marketing", body: "Professional photography, Matterport 3D tours, drone coverage, social media campaigns, and syndication across 100+ rental platforms. Every listing, every time." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does property management cost in Norman, OK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your property or portfolio.",
      },
    },
    {
      "@type": "Question",
      name: "Do you manage single-family rentals in Norman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We manage single-family homes, small multifamily properties, and investment portfolios of all sizes in Norman and the surrounding OKC Metro area.",
      },
    },
    {
      "@type": "Question",
      name: "How do you screen tenants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We run full credit checks, background verification, and income confirmation on every applicant. We look for tenants who pay on time, treat the property well, and stay long-term.",
      },
    },
    {
      "@type": "Question",
      name: "Do you manage properties for out-of-state owners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with many out-of-state investors who own rental properties in Norman. We provide local oversight, clear monthly reporting, and handle everything so you don't have to be on-site.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in GRID's property management service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our full-service management includes tenant screening and placement, rent collection and disbursement, maintenance coordination, lease management and renewals, monthly owner reporting, trust account management, and eviction coordination when needed.",
      },
    },
  ],
};

const faqs = [
  {
    q: "How much does property management cost in Norman, OK?",
    a: "GRID Real Estate offers straightforward property management pricing with no hidden fees or surprise maintenance markups. Contact us for a custom proposal based on your property or portfolio.",
  },
  {
    q: "Do you manage single-family rentals in Norman?",
    a: "Yes. We manage single-family homes, small multifamily properties, and investment portfolios of all sizes in Norman and the surrounding OKC Metro area.",
  },
  {
    q: "How do you screen tenants?",
    a: "We run full credit checks, background verification, and income confirmation on every applicant. We look for tenants who pay on time, treat the property well, and stay long-term.",
  },
  {
    q: "Do you manage properties for out-of-state owners?",
    a: "Yes. We work with many out-of-state investors who own rental properties in Norman. We provide local oversight, clear monthly reporting, and handle everything so you don't have to be on-site.",
  },
  {
    q: "What is included in GRID's property management service?",
    a: "Our full-service management includes tenant screening and placement, rent collection and disbursement, maintenance coordination, lease management and renewals, monthly owner reporting, trust account management, and eviction coordination when needed.",
  },
];

export default function ManagePage() {
  return (
    <div>
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image src="/images/balcony.jpg" alt="Norman rental property" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">own it. don't manage it.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> handles the day-to-day so you can focus on the next acquisition. Professional management with clean books, reliable tenants, and zero surprises.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="owners since 2018">
            <GridWord /> has been managing its own properties since 2018. That experience is what shapes how we manage for others. We know what deferred maintenance costs, what good tenants look like, and how to keep both sides of the relationship working.
          </Card>
          <Card title="tenant-first management">
            Well-treated tenants stay longer, take better care of the property, and cause fewer problems. We treat residents with respect, communicate clearly, and keep properties maintained. That's good business.
          </Card>
          <Card title="compliance you can trust">
            <GridWord />'s management practice is built on deep regulatory experience. Trust accounts, documentation, and financial controls are handled to the professional standard most managers never reach.
          </Card>
          <Card title="professional marketing on every listing">
            Every vacancy gets professional marketing services including photography, Matterport 3D tour, drone coverage, and MLS syndication. Vacancies fill faster because we present properties better.
          </Card>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Included in every listing</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">The full marketing toolkit.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/70">
              Every property we manage gets professional marketing treatment when it comes time to lease. Our marketing toolkit includes Matterport tours, professional photography, drone coverage, and full digital syndication across hundreds of rental sites.
            </p>
          </div>
          <div className="mb-8 grid gap-3 md:grid-cols-3">
            <div className="relative h-[220px] overflow-hidden rounded-2xl border border-black/10 md:col-span-2">
              <Image src="/images/mosier_exterior.jpg" alt="Professional exterior photography" fill className="object-cover" />
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">Professional photography</div>
            </div>
            <div className="relative h-[220px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/mosier_aerial.jpg" alt="Drone aerial photography" fill className="object-cover" />
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">Drone coverage</div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="relative h-[200px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/mosier_kitchen.jpg" alt="Interior photography" fill className="object-cover" />
            </div>
            <div className="relative h-[200px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/mosier_living.jpg" alt="Living area photography" fill className="object-cover" />
            </div>
            <div className="relative h-[200px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/mosier_bedroom.jpg" alt="Bedroom photography" fill className="object-cover" />
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-black/10 bg-white p-8">
            <div className="mb-6">
              <div className="text-sm font-semibold tracking-tight">Matterport 3D Tour</div>
              <p className="mt-2 text-sm leading-6 text-black/70">
                Every rental listing includes a full Matterport virtual tour. In-person showings are limited to serious, pre-qualified tenants.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-black/10">
              <iframe width="100%" height="480" src="https://my.matterport.com/show/?m=1N1cK9f4b9Y" frameBorder="0" allowFullScreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <Section title="Full-service management" kicker="What we handle">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold tracking-tight">{s.title}</div>
              <p className="mt-2 text-sm leading-6 text-black/70">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Our clients</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Who we manage for</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-4">
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold tracking-tight">Individual investors and landlords</div>
                <p className="mt-3 text-sm leading-7 text-black/75">
                  Whether you own one rental or a handful of properties in Norman, we provide the same professional management standard. No portfolio is too small to deserve proper management.
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold tracking-tight">Out-of-state investors</div>
                <p className="mt-3 text-sm leading-7 text-black/75">
                  Norman is an attractive market for remote investors. Strong rental demand, a university anchor, and long-term growth. <GridWord /> gives you local eyes and hands so you can own here confidently without being here.
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold tracking-tight">Growing portfolios</div>
                <p className="mt-3 text-sm leading-7 text-black/75">
                  If you're scaling, we grow with you. Centralized reporting, consistent processes, and a management team that understands your goals across multiple properties.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative h-[280px] overflow-hidden rounded-2xl border border-black/10">
                <Image src="/images/unit_loft_interior.jpeg" alt="Rental unit interior" fill className="object-cover" />
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold tracking-tight">The <GridWord /> standard</div>
                <p className="mt-3 text-sm leading-7 text-black/75">
                  We stay responsive, document what matters, and treat every property like we own it because we know what it feels like when someone doesn't. Management fees are straightforward. No hidden charges, no surprise markups on maintenance.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">get a proposal</a>
                  <a href="/associations" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">association management</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Where we manage</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">OKC Metro and Tulsa Metro.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/70">
              GRID manages rental properties across both major Oklahoma metros. Based in Norman — our home market — with full-service coverage across OKC and Tulsa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">OKC Metro</div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  ["/norman", "Norman"],
                  ["/oklahoma-city", "Oklahoma City"],
                  ["/edmond", "Edmond"],
                  ["/yukon", "Yukon"],
                  ["/moore", "Moore"],
                  ["/mustang", "Mustang"],
                  ["/noble", "Noble"],
                  ["/midwest-city", "Midwest City"],
                ] as [string, string][]).map(([href, label]) => (
                  <a key={href} href={href} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm hover:border-black/25 transition-colors">
                    {label} <span className="text-black/30 text-xs ml-1">→</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">Tulsa Metro</div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  ["/tulsa", "Tulsa"],
                  ["/bixby", "Bixby"],
                  ["/broken-arrow", "Broken Arrow"],
                  ["/jenks", "Jenks"],
                  ["/owasso", "Owasso"],
                  ["/sand-springs", "Sand Springs"],
                ] as [string, string][]).map(([href, label]) => (
                  <a key={href} href={href} className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm hover:border-black/25 transition-colors">
                    {label} <span className="text-black/30 text-xs ml-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="border-y border-black/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Common questions</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Property management FAQ</h2>
          </div>
          <div className="divide-y divide-black/10">
            {faqs.map((item) => (
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
            <div className="text-sm font-medium text-white/75">Let's talk management</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Ready to hand it off?</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Tell us about your property or portfolio and we'll put together a straightforward management proposal.
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
