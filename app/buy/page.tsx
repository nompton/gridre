import Image from "next/image";
import Section from "@/components/Section";
import GridWord from "@/components/GridWord";

export default function BuyPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image
            src="/images/frontdoor.jpg"
            alt="Buying a home in Norman"
            fill
            priority
            className="object-cover"
          />

          {/* Consistent overlay across pages */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Buy</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                buy with confidence in Norman
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                Buying a home is personal. <GridWord /> helps you navigate the
                process with clear strategy, local insight, and a calm guide in
                your corner.
              </p>

              {/* Hero CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
                >
                  talk about buying
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

      {/* CONTENT */}
      <Section title="How we help buyers" kicker="Local guidance, modern execution">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">
              Deep Norman knowledge
            </div>
            <p className="mt-4 text-sm leading-7 text-black/75">
              Norman is not a one-size-fits-all market. Neighborhoods, zoning,
              rental demand, and long-term growth patterns matter. We bring real
              local expertise into every decision.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">
              Clear negotiation + smooth process
            </div>
            <p className="mt-4 text-sm leading-7 text-black/75">
              From offer strategy to inspections, we keep things calm, clear,
              and moving forward. You will always know what comes next.
            </p>
          </div>
        </div>

        {/* Section CTAs (consistent + not weird) */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="/contact"
            className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            talk about buying
          </a>
          <a
            href="tel:4053101221"
            className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30"
          >
            call (405) 310-1221
          </a>
        </div>
      </Section>
    </div>
  );
}