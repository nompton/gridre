import Image from "next/image";
import Section from "@/components/Section";
import Card from "@/components/Card";
import GridWord from "@/components/GridWord";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[520px] w-full">
          <Image
            src="/images/east-village.jpg"
            alt="Norman, Oklahoma"
            fill
            priority
            className="object-cover"
          />

          {/* Light overlay (clean + readable) */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Subtle fade at bottom for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-4">
            <div className="max-w-2xl text-white">
              {/* HERO LOGO */}
              <div className="mb-5">
                <Image
                  src="/brand/grid_logo_white.png"
                  alt="GRID Real Estate"
                  width={240}
                  height={70}
                  priority
                  className="drop-shadow-lg"
                />
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl drop-shadow-md">
                find your place on the <GridWord />
              </h1>

              <div className="mt-3 text-white/90">
                buy · sell · invest · manage
              </div>

              <p className="mt-6 max-w-xl text-white/90 drop-shadow-sm">
                Real estate in Norman is changing fast. <GridWord /> is built
                for people who want clear guidance, modern systems, and a
                personal touch.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
                >
                  talk to patrick
                </a>

                <a
                  href="/manage"
                  className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20"
                >
                  property management
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section title="Services">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="buyers" href="/buy">
            Whether it&apos;s your first home or your fifth, we help you buy with
            confidence, backed by local knowledge and tactful negotiation.
          </Card>

          <Card title="sellers" href="/sell">
            High-level experience to get you top dollar, powered by a
            digital-first approach that drives exposure and results.
          </Card>

          <Card title="investors" href="/invest">
            Clear guidance grounded in real underwriting and local market
            context, from acquisition strategy to long-term ownership decisions.
          </Card>

          <Card title="management" href="/manage">
            A relationship-driven company focused on retention, clear
            communication, and stress-free ownership.
          </Card>
        </div>
      </Section>

      {/* VALUES STRIP */}
      <section className="border-y border-black/10 bg-black/[0.02] py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-4">
          <div>
            <div className="text-sm font-medium">local, deeply involved</div>
            <div className="mt-1 text-sm text-black/70">
              Norman-focused with real participation in the city&apos;s future.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">investor mindset</div>
            <div className="mt-1 text-sm text-black/70">
              We think in return, retention, and long-term value.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">digital-first</div>
            <div className="mt-1 text-sm text-black/70">
              Clean marketing and modern workflows that move fast.
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">relationship company</div>
            <div className="mt-1 text-sm text-black/70">
              Better communication means smoother outcomes.
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT GRID (short + clean) */}
      <Section title="About GRID" kicker="Norman expertise, personal service">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm leading-7 text-black/75">
              <GridWord /> Real Estate is built for Norman. We combine modern
              systems, deep local knowledge, and relationship-driven service for
              buyers, sellers, investors, and owners.
            </p>

            <p className="mt-4 text-sm leading-7 text-black/75">
              If you want clear guidance and a brokerage that understands where
              Norman is headed, you&apos;re in the right place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/about"
                className="rounded-full border border-black/15 px-4 py-2 text-sm hover:border-black/30"
              >
                learn more
              </a>

              <a
                href="/contact"
                className="rounded-full bg-black px-4 py-2 text-sm text-white hover:opacity-90"
              >
                contact
              </a>
            </div>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-3xl border border-black/10">
            <Image
              src="/images/porch.jpg"
              alt="Front Porch"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-black/10 bg-black p-10 text-white md:p-12">
            <div className="text-sm font-medium text-white/75">Ready?</div>

            <div className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Let&apos;s talk about your next move.
            </div>

            <div className="mt-3 text-white/85">
              Buying, selling, investing, or management. We&apos;ll keep it clear
              and keep it moving.
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
              >
                contact <GridWord />
              </a>

              <a
                href="tel:4053101221"
                className="rounded-full border border-white/35 px-5 py-3 text-sm font-medium text-white hover:border-white/60"
              >
                call (405) 310-1221
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}