import Image from "next/image";
import Section from "@/components/Section";
import GridWord from "@/components/GridWord";

export const metadata = {
  alternates: { canonical: "https://thegridre.com/about" },
  title: "About GRID Real Estate | Norman, OK Property Management Brokerage",
  description: "GRID Real Estate is Norman, Oklahoma's investor-focused brokerage. Led by a licensed Oklahoma broker with deep compliance experience, active property ownership since 2018, and local market expertise.",
  openGraph: {
    title: "About GRID Real Estate | Norman, OK",
    description: "Norman's investor-focused brokerage, built on real compliance experience and active property ownership since 2018.",
    url: "https://thegridre.com/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image src="/images/chautauqua.jpg" alt="Norman neighborhood" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">About</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">built in Norman. backed by experience.</h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> is Norman's investor-focused brokerage, built on real ownership experience, regulatory depth, and a genuine commitment to this city's future.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="/contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90">get in touch</a>
                <a href="tel:4053101221" className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20">call (405) 310-1221</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title="About GRID" kicker="The company">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="max-w-prose space-y-5 text-sm leading-7 text-black/75">
            <p>
              <GridWord /> Real Estate is a Norman-based brokerage focused on property management, association management, and investor services. We're built specifically for owners, investors, and communities who need professional, accountable management.
            </p>
            <p>
              The company is led by a licensed Oklahoma broker with years of hands-on experience owning, operating, and managing rental property. That foundation shapes how <GridWord /> operates. We manage for others the way we manage for ourselves.
            </p>
            <p>
              Deep regulatory and compliance expertise means trust accounts, documentation, and financial controls are handled correctly from day one.
            </p>
            <p>
              <GridWord /> is also deeply involved in Norman's growth and planning. We're not just working in Norman. We're invested in where it's going.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative h-[280px] overflow-hidden rounded-2xl border border-black/10">
              <Image src="/images/corner_table_windows.jpeg" alt="Norman property" fill className="object-cover" />
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <p className="text-sm leading-7 text-black/75">
                If you want a brokerage that knows this market, understands the rules, and treats your investment like it matters, let's talk.
              </p>
              <div className="mt-6">
                <a href="/contact" className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">get in touch</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section className="border-y border-black/10 bg-black/[0.02] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="text-sm font-medium text-black/60">Experience</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Our Expertise</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="max-w-prose space-y-5 text-sm leading-7 text-black/75">
              <p>
                <GridWord /> is led by a licensed Oklahoma broker with years of experience owning, operating, and managing rental property. That hands-on background shapes how we work: we manage for others the way we manage for ourselves.
              </p>
              <p>
                We understand what it takes to keep a property rented, maintained, and profitable over time, and we bring that same discipline to every owner and association we serve.
              </p>
              <p>
                We're also deeply invested in Norman's growth and long-term planning, because we're not just working in this market, we're building for its future.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-black/10 p-6">
                <div className="text-sm font-semibold tracking-tight">What we bring</div>
                <ul className="mt-4 space-y-3 text-sm text-black/75">
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-black/30">+</span>
                    Licensed Oklahoma real estate brokerage
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-black/30">+</span>
                    Years of hands-on property ownership and management
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-black/30">+</span>
                    Deep regulatory and compliance expertise
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-black/30">+</span>
                    Trust accounting and financial controls handled correctly
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-black/30">+</span>
                    Active in Norman's planning and development
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
