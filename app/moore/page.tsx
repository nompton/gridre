import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Moore Property Management — GRID Real Estate",
  description:
    "Property management in Moore, OK by GRID Real Estate. Moore's strong south OKC renter demand means vacancies fill fast when marketed right. We offer professional photography, Matterport 3D, tenant screening, and full-service management. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/moore" },
  openGraph: {
    title: "Moore Property Management — GRID Real Estate",
    description: "Full-service rental property management in Moore, Oklahoma. Professional marketing, tenant screening, and owner-focused management for the south OKC corridor.",
    url: "https://thegridre.com/moore",
  },
};

export default function MoorePage() {
  return (
    <div>
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/moore-rental-home.jpg" alt="Moore Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Moore, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Moore property management. Professionally done.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Moore has a deep pool of quality renters — families, professionals, and workers tied to the south OKC corridor. <GridWord /> manages Moore rentals with professional photography, Matterport 3D tours, drone coverage, targeted social media, and syndication across 100+ platforms.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Moore owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="marketing that fills vacancies fast">
            Moore renters search online. Professional photography, 3D virtual tours, and targeted social campaigns mean your property reaches them — and makes a strong impression.
          </Card>
          <Card title="thorough tenant screening">
            Full credit, criminal, and income verification on every applicant. Moore's strong renter base means we can be selective, and we are.
          </Card>
          <Card title="proactive maintenance">
            We coordinate maintenance with vetted vendors, clear work orders, and transparent pricing. Problems get handled before they become expensive.
          </Card>
          <Card title="compliance you can trust">
            <GridWord />'s management practice is built on deep regulatory experience — including work at the Oklahoma Real Estate Commission. Trust accounts and documentation handled correctly.
          </Card>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-sm font-medium text-black/60 mb-2">Full-service management</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-4">Everything your Moore rental needs.</h2>
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

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Moore property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Moore rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              One property or a growing portfolio — <GridWord /> will put together a clear, straightforward management proposal.
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
