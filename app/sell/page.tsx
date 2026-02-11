import Image from "next/image";
import Section from "@/components/Section";
import GridWord from "@/components/GridWord";

export default function SellPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image
            src="/images/livingroom.jpg"
            alt="Selling your home in Norman"
            fill
            priority
            className="object-cover"
          />

          {/* Same overlay as Buy */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Sell</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                sell with strategy, not stress
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> combines modern marketing, clean execution, and
                Norman-specific expertise to get your home sold smoothly and
                for top value.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
                >
                  talk about selling
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
      <Section
        title="What sets GRID listings apart"
        kicker="Marketing that actually works"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">
              Digital-first exposure
            </div>
            <p className="mt-4 text-sm leading-7 text-black/75">
              Professional photography, strong online positioning, and social
              media distribution ensure your listing reaches the right buyers
              fast.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">
              Pricing + execution with experience
            </div>
            <p className="mt-4 text-sm leading-7 text-black/75">
              We price with the market, negotiate with clarity, and manage the
              transaction like a professional operation from start to finish.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="/contact"
            className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            talk about selling
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