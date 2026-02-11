import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export default function ManagePage() {
  return (
    <div>
      {/* HERO (matches Buy/Sell/Invest) */}
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image
            src="/images/balcony.jpg"
            alt="Norman rentals"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Manage</div>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                property management that feels personal and runs professionally
              </h1>

              <p className="mt-5 text-sm leading-7 text-white/90">
                Property management is not just maintenance and rent collection.
                It is tenant relationships, protecting the asset, and maximizing
                long-term return. <GridWord /> is built for owners who want
                management done right.
              </p>

              {/* Hero CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
                >
                  request a consultation
                </a>

                <a
                  href="tel:4053101221"
                  className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20"
                >
                  call (405) 310-1221
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY OWNERS CHOOSE GRID */}
      <Section title="Why owners choose us">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="1) investor-led management">
            We manage with an owner&apos;s mindset because we are owners too.
            Vacancy, turnover, and deferred maintenance all show up in your
            returns. We stay focused on retention and long-term value.
          </Card>

          <Card title="2) relationship-driven service">
            Better tenant relationships mean less turnover and fewer vacancies.
            We take communication seriously with both landlords and tenants, and
            we keep expectations clear from day one.
          </Card>

          <Card title="3) digital-first leasing">
            Professional marketing and modern workflows help fill vacancies
            faster. Clear updates throughout the leasing process so you are
            never guessing what&apos;s happening.
          </Card>

          <Card title="4) clean reporting and disciplined accounting">
            GRID is led by a broker with a background in compliance and trust
            practices. We operate with professional controls, documentation, and
            transparency.
          </Card>
        </div>
      </Section>

      {/* WHAT WE HANDLE */}
      <Section title="What we handle">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">Services</div>
            <ul className="mt-4 list-disc pl-5 text-sm leading-7 text-black/75">
              <li>Leasing and marketing</li>
              <li>Tenant screening and placement</li>
              <li>Rent collection and enforcement</li>
              <li>Maintenance coordination and vendor management</li>
              <li>Lease renewals and tenant retention</li>
              <li>Owner updates and monthly reporting</li>
              <li>HOA and small community management support</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">
              The GRID standard
            </div>

            <p className="mt-4 text-sm leading-7 text-black/75">
              We stay responsive, document what matters, and treat people with
              respect. This is a relationship business, and we run it like a
              professional operation.
            </p>

            <p className="mt-4 text-sm leading-7 text-black/75">
              If you want management that protects your investment and keeps
              ownership stress-free, let&apos;s talk.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                talk management
              </a>

              <a
                href="tel:4053101221"
                className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30"
              >
                call (405) 310-1221
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}