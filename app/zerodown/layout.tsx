import type { ReactNode } from "react";

// Campaign landing page (client component) — metadata lives here.
export const metadata = {
  alternates: { canonical: "https://thegridre.com/zerodown" },
  title: "Zero Down Home Opportunity — Oklahoma",
  description:
    "A move-in-ready Oklahoma home available with a zero-down purchase option. See photos and details, and get in touch with GRID Real Estate.",
};

export default function ZeroDownLayout({ children }: { children: ReactNode }) {
  return children;
}
