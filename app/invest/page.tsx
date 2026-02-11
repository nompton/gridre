import Image from "next/image";
import Section from "@/components/Section";
import GridWord from "@/components/GridWord";

export default function InvestPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image
            src="/images/campus_corner.jpg"
            alt="Investing in Norman real estate"
            fill
            priority
            className="object-cover"
          />

          {/* Same overlay as Buy/Sell */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">Invest</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                invest with an owner’s mindset
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> is built for investors because it is led by one.
                We understand returns, tenant demand, long-term value, and the
                neighborhoods shaping Norman’s future.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
                >
                  talk investing
                </a>
                <a
                  href="/manage"
                  className="rounded-full border border-white/50 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20"
                >
                  management services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <Section title="Investor-focused real estate" kicker="Real numbers, real strategy">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">
              Acquisition + underwriting support
            </div>
            <p className="mt-4 text-sm leading-7 text-black/75">
              Whether you are buying your first rental or scaling a portfolio,
              we help you evaluate deals through real-world ownership
              experience.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold tracking-tight">
              Local development insight
            </div>
            <p className="mt-4 text-sm leading-7 text-black/75">
              From Norman’s growth patterns to infill opportunities, we bring a
              deeper understanding of what is changing and where value is going.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="/contact"
            className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            talk investing
          </a>
          <a
            href="/manage"
            className="rounded-full border border-black/15 px-5 py-3 text-sm font-medium hover:border-black/30"
          >
            management services
          </a>
        </div>
      </Section>
    </div>
  );
}