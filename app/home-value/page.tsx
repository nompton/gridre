import Section from "@/components/Section";
import HomeValueForm from "@/components/HomeValueForm";

export const metadata = {
  alternates: { canonical: "https://thegridre.com/home-value" },
  title: "What's Your Home Worth? — GRID Real Estate",
  description:
    "Find out what your Norman-area home is worth. Request a free, no-obligation home valuation from GRID Real Estate and we'll follow up with what it's worth in today's market.",
};

export default function HomeValuePage() {
  return (
    <div>
      <Section as="h1" kicker="Home value" title="What's your home worth?">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm text-black/75 mb-6">
              Curious what your home would sell for today? Tell us the address
              and a little about it, and a GRID agent will prepare a
              no-obligation valuation based on real comparable sales in your
              neighborhood — not an automated guess.
            </p>
            <HomeValueForm />
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-black/10 p-6">
              <div className="text-sm font-semibold tracking-tight">
                Why ask GRID
              </div>
              <ul className="mt-4 space-y-2 text-sm text-black/75">
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  A real agent&apos;s read on your home, not just an algorithm
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  Recent comparable sales in your specific neighborhood
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  No obligation — helpful whether you sell now or later
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-black/30">+</span>
                  Local expertise across the Norman and OKC metro
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-black/10 p-6">
              <div className="text-sm font-semibold tracking-tight">
                Prefer to talk?
              </div>
              <div className="mt-5 text-sm">
                <div className="text-black/60">phone</div>
                <a
                  className="font-medium underline underline-offset-4 hover:text-black/70 transition"
                  href="tel:4053101221"
                >
                  (405) 310-1221
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
