import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export const metadata = {
  alternates: { canonical: "https://thegridre.com/associations" },
  title: "HOA & Association Management in Norman, OK | GRID Real Estate",
  description: "Professional HOA and condo association management in Norman, Oklahoma. Financial reporting, covenant enforcement, vendor coordination, and board support. Call (405) 310-1221.",
  openGraph: {
    title: "HOA & Association Management in Norman, OK | GRID Real Estate",
    description: "Full-service HOA management for Norman, OK communities. Budget oversight, CC&R enforcement, owner communication, and board support from a local Norman company.",
    url: "https://thegridre.com/associations",
  },
};

const services = [
  { title: "Financial Management & Reporting", body: "Budget preparation, dues collection, reserve fund oversight, and monthly financial reporting that boards and owners can actually read." },
  { title: "Vendor Coordination", body: "Qualified vendor relationships, competitive bids, and supervised work. Common area maintenance, landscaping, and capital projects handled professionally." },
  { title: "Covenant & Rule Enforcement", body: "Consistent, documented enforcement of CC&Rs and community rules. Fair process, clear communication, and proper notice procedures." },
  { title: "Board Support & Meeting Management", body: "Agenda preparation, meeting facilitation, minutes documentation, and follow-through on board decisions. We make boards more effective." },
  { title: "Owner & Resident Communication", body: "Clear, timely communication with homeowners and residents. Violation notices, maintenance updates, and community announcements handled professionally." },
  { title: "Insurance & Compliance", body: "Policy review coordination, compliance documentation, and making sure the community's obligations are met and properly recorded." },
];

const types = [
  { title: "Small HOAs and planned communities", body: "Neighborhood associations with common areas, covenants, and shared infrastructure. We bring professional management to communities that often get overlooked by larger firms." },
  { title: "Condo associations", body: "Multi-unit communities with shared building systems, parking, and amenities. Complex ownership structures managed with clarity and proper documentation." },
  { title: "Mixed-use and commercial associations", body: "Communities with both residential and commercial components. We understand the different stakeholder needs and manage accordingly." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an HOA management company do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An HOA management company handles the day-to-day operations of a homeowners association. This includes collecting dues, managing the budget and reserves, coordinating vendor work, enforcing CC&Rs, supporting board meetings, and communicating with owners and residents.",
      },
    },
    {
      "@type": "Question",
      name: "Do you manage small HOAs in Norman, OK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We specifically focus on smaller communities that are often overlooked by large regional firms. Whether you have 10 units or 100, we bring the same professional management standard.",
      },
    },
    {
      "@type": "Question",
      name: "How does GRID handle covenant enforcement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We enforce CC&Rs and community rules consistently, using proper notice procedures, documented processes, and fair communication. Enforcement is handled professionally to protect both the association and individual homeowners.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between self-managed and professionally managed HOAs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Self-managed HOAs rely on volunteer board members to handle finances, vendor coordination, rule enforcement, and owner communication — often leading to inconsistency and burnout. A professional management company like GRID takes on all operational responsibilities, so board members can focus on governance and community decisions.",
      },
    },
    {
      "@type": "Question",
      name: "Do you manage condo associations in Norman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We manage condo associations with shared building systems, parking, and amenities. Complex ownership structures are handled with clear documentation and transparent financial reporting.",
      },
    },
  ],
};

const faqs = [
  {
    q: "What does an HOA management company do?",
    a: "An HOA management company handles the day-to-day operations of a homeowners association. This includes collecting dues, managing the budget and reserves, coordinating vendor work, enforcing CC&Rs, supporting board meetings, and communicating with owners and residents.",
  },
  {
    q: "Do you manage small HOAs in Norman, OK?",
    a: "Yes. We specifically focus on smaller communities that are often overlooked by large regional firms. Whether you have 10 units or 100, we bring the same professional management standard.",
  },
  {
    q: "How does GRID handle covenant enforcement?",
    a: "We enforce CC&Rs and community rules consistently, using proper notice procedures, documented processes, and fair communication. Enforcement is handled professionally to protect both the association and individual homeowners.",
  },
  {
    q: "What is the difference between self-managed and professionally managed HOAs?",
    a: "Self-managed HOAs rely on volunteer board members to handle finances, vendor coordination, rule enforcement, and owner communication — often leading to inconsistency and burnout. A professional management company like GRID takes on all operational responsibilities, so board members can focus on governance and community decisions.",
  },
  {
    q: "Do you manage condo associations in Norman?",
    a: "Yes. We manage condo associations with shared building systems, parking, and amenities. Complex ownership structures are handled with clear documentation and transparent financial reporting.",
  },
];

export default function AssociationsPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image src="/images/chautauqua_sign.jpeg" alt="Chautauqua Historic District, Norman" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Association Management</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                associations managed the right way
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> manages HOAs, condo associations, and mixed-use communities in Norman with financial discipline, clear communication, and real accountability to boards and owners.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">talk to us about your association</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GRID */}
      <Section title="What sets GRID apart" kicker="The difference">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-black/75">
              Most association management companies are large, impersonal, and slow. Boards can't reach anyone. Owners get form letters. Financial reporting is hard to read and harder to trust.
            </p>
            <p className="text-sm leading-7 text-black/75">
              <GridWord /> is different. We're a Norman-based company that manages associations the way we'd want our own managed. Responsively, transparently, and with genuine care for the community.
            </p>
            <p className="text-sm leading-7 text-black/75">
              Our compliance background means financial controls, trust account management, and documentation are handled to a professional standard that protects the association and its board members.
            </p>

            {/* Community photo */}
            <div className="relative h-[260px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/rooftop_community_view.jpeg" alt="Norman community" fill className="object-cover" />
            </div>
          </div>

          <div className="grid gap-4">
            <Card title="local and responsive">
              We're in Norman. When something needs attention, we're available, not routing you through a call center or a regional office three states away.
            </Card>
            <Card title="financially disciplined">
              Budget management, reserve planning, and monthly reporting done with the rigor that comes from real compliance and brokerage experience. Boards can trust what they're seeing.
            </Card>
            <Card title="board-focused">
              We work for the board and the community. Our job is to make governance easier, protect the association's interests, and keep owners informed.
            </Card>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Full-service association management</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Everything your association needs.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold tracking-tight">{s.title}</div>
                <p className="mt-2 text-sm leading-6 text-black/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSOCIATION TYPES */}
      <Section title="Who we work with" kicker="Association types">
        <div className="grid gap-4 md:grid-cols-3">
          {types.map((t) => (
            <Card key={t.title} title={t.title}>{t.body}</Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-6">
            <div className="grid gap-6 md:items-center">
              <div>
                <div className="text-sm font-semibold tracking-tight">Currently managing in Norman</div>
                <p className="mt-3 text-sm leading-7 text-black/75">
                  <GridWord /> is currently active in Norman with association clients. If your community is looking for a management change, or setting up management for the first time, we'd welcome a conversation.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">contact us</a>
                <a href="/manage" className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30">property management</a>
              </div>
            </div>
          </div>
          <a
            href="https://hoaadvisorsok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-black/10 bg-black/[0.02] p-6 hover:border-black/25 transition-colors"
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">Dedicated HOA site</div>
            <div className="text-sm font-semibold tracking-tight">hoaadvisorsok.com</div>
            <p className="mt-2 text-sm leading-6 text-black/70">
              Our dedicated HOA management site — deeper detail on services, process, pricing questions, and a direct proposal form for board members.
            </p>
            <div className="mt-4 text-sm font-medium text-black group-hover:underline underline-offset-4">visit hoaadvisorsok.com →</div>
          </a>
        </div>
      </Section>

      {/* PLATFORM / ATLAS TEASER */}
      <section className="py-4">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-8 text-white md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" /> Proprietary technology
                </div>
                <div className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">Financial transparency your board can log into.</div>
                <p className="mt-3 text-sm leading-7 text-white/80">
                  <GridWord /> runs on <span className="font-semibold text-white">Atlas</span>, a proprietary Oklahoma-built platform. Reconciled association accounting, a clear audit trail, and statements your board and owners can pull up any time.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/platform" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">explore the platform</a>
                <a href="/contact" className="rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/15">talk to us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* FAQ */}
      <section className="border-y border-black/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Common questions</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">HOA management FAQ</h2>
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

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Is your association ready for better management?</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Let's talk about your community.</div>
            <div className="mt-3 max-w-xl text-sm leading-7 text-white/80">
              Whether you're an HOA board looking for a change or a developer setting up new community management, we're ready to help.
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get in touch</a>
              <a href="tel:4053101221" className="rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white hover:border-white/60">call (405) 310-1221</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
