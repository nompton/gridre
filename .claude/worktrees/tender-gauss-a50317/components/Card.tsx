import { ReactNode } from "react";

export default function Card({
  title,
  children,
  href
}: {
  title: string;
  children: ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="rounded-2xl border border-black/10 p-6 shadow-sm transition hover:border-black/20">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-black/70">{children}</div>
    </div>
  );

  if (!href) return inner;

  return (
    <a href={href} className="block">
      {inner}
    </a>
  );
}
