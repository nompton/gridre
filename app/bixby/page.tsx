import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  title: "Bixby Property Management — GRID Real Estate",
  description:
    "Property management in Bixby, OK by GRID Real Estate. Bixby's top-rated schools and rapid growth attract quality long-term tenants. We market, screen, and manage Bixby rentals with full-service professional management. Call (405) 310-1221.",
  alternates: { canonical: "https://thegridre.com/bixby" },
  openGraph: {
    title: "Bixby Property Management — GRID Real Estate",
    description: "Full-service property management in Bixby, Oklahoma. High-demand rental market, professional marketing, and investor-focused management for Bixby landlords.",
    url: "https://thegridre.com/bixby",
  },
};

export default function BixbyPage() {
  return (
    <div>
      <section className="relative border-b border-black/10">
        <div className="relative h-[480px] w-full">
          <Image src="/images/listing-exterior.jpg" alt="Bixby Oklahoma rental home — GRID Real Estate property management" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Property Management — Bixby, OK</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Bixby property management with premier marketing.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Bixby has been one of Oklahoma's fastest-growing communities for a reason — top-rated schools, a strong family demographic, and a location that delivers both suburban feel and city access. <GridWord /> manages Bixby rentals with professional photography, Matterport 3D, drone coverage, and targeted campaigns on every listing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get a management proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="Why Bixby owners choose GRID" kicker="The difference">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Bixby tenants expect quality">
            Families relocating for Bixby's schools and amenities want well-maintained, well-presented homes. <GridWord /> delivers that standard and markets your property at a level that attracts it.
          </Card>
          <Card title="premier marketing on every vacancy">
            Professional photography, Matterport 3D tours, drone coverage, Instagram and Facebook campaigns, and syndication to 100+ rental platforms. Every vacancy, no exceptions.
          </Card>
          <Card title="tenant screening that protects your investment">
            Full credit, background, and income verification on every applicant. Bixby's strong applicant pool means we can afford to be selective — and we are.
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
              <div className="text-sm font-medium text-black/60">Bixby rental market</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">One of Tulsa's strongest suburban rental markets.</h2>
              <p className="mt-4 text-sm leading-7 text-black/75">
                Bixby's growth isn't slowing down. Continued residential development, a strong school district, and proximity to Tulsa's major employers make it one of the most in-demand rental submarkets in the metro. Properties here hold their value and attract long-term tenants.
              </p>
              <p className="mt-4 text-sm leading-7 text-black/75">
                <GridWord /> manages Bixby properties with the same standard we apply to our own. Proactive maintenance, clear communication, and marketing that fills vacancies fast.
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
            <div className="text-sm font-medium text-white/75">Bixby property owners</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your Bixby rental.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you own one property or a portfolio in Bixby, <GridWord /> can put together a straightforward management proposal.
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
