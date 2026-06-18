import { ReactNode } from "react";

export default function Section({
  title,
  kicker,
  children
}: {
  title?: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        {(kicker || title) && (
          <div className="mb-8">
            {kicker && (
              <div className="text-sm font-medium text-black/60">{kicker}</div>
            )}
            {title && (
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
