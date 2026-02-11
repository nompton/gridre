import Image from "next/image";
import Section from "@/components/Section";
import GridWord from "@/components/GridWord";

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-black/10">
        <div className="relative h-[420px] w-full">
          <Image
            src="/images/chautauqua.jpg"
            alt="Norman neighborhood"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="max-w-2xl text-white">
              <div className="text-sm font-medium text-white/80">About</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                built in Norman. backed by experience.
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/90">
                <GridWord /> is led by Patrick Schrank, a broker, investor, and
                housing-focused entrepreneur with deep roots in Norman and
                nearly a decade in the Oklahoma real estate industry.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90"
                >
                  contact patrick
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
      <Section title="A broker you can trust" kicker="Expertise matters">
        <div className="max-w-3xl text-sm leading-7 text-black/75 space-y-5">
          <p>
            Patrick has been licensed in real estate since 2017 and earned his
            broker license in 2021. His career spans the full spectrum of the
            industry, from residential sales and brokerage operations to
            long-term investment ownership and professional management.
          </p>

          <p>
            Before launching <GridWord />, Patrick worked as an investigator
            with the Oklahoma Real Estate Commission, handling complex matters
            involving brokerage compliance, consumer complaints, trust accounts,
            and property management practices.
          </p>

          <p>
            That regulatory background gives <GridWord /> a different standard
            of professionalism: disciplined documentation, clean financial
            controls, risk awareness, and a commitment to doing things the right
            way from day one.
          </p>

          <p>
            Patrick is also an active investor and the founder of the{" "}
            <span className="font-semibold">Nompton™ Group</span>, a collective
            of companies operating in real estate investment, development, and
            digital media. He understands ownership because he lives it, and he
            approaches every deal with an investor’s mindset for long-term
            value.
          </p>

          <p>
            Beyond transactions, Patrick is deeply involved in Norman’s growth,
            including participation in Comprehensive Plan efforts and local
            development conversations. <GridWord /> is built to serve Norman
            with clarity, expertise, and a personal touch.
          </p>

          <p className="font-medium text-black">
            If you want a broker who knows this market, understands the rules,
            and treats your investment like it matters, let’s talk.
          </p>

          <div className="pt-4">
            <a
              href="/contact"
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              reach out today
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}