import { ReactNode } from "react";

export default function Section({
  title,
  kicker,
  children,
  as = "h2",
}: {
  title?: string;
  kicker?: string;
  children: ReactNode;
  // Heading level for `title`. Defaults to h2; pass "h1" when this Section is a
  // page's primary heading (e.g. a page whose hero IS a Section) so the page has
  // exactly one h1 for SEO.
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        {(kicker || title) && (
          <div className="mb-8">
            {kicker && (
              <div className="text-sm font-medium text-black/60">{kicker}</div>
            )}
            {title && (
              <Heading className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                {title}
              </Heading>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
