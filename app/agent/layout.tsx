import type { ReactNode } from "react";

// Internal agent utilities (FRBO submission, underwriting tools) — not public
// marketing, and not linked from the site nav. Keep it out of search.
export const metadata = {
  title: "Agent Tools",
  robots: { index: false, follow: false },
};

export default function AgentLayout({ children }: { children: ReactNode }) {
  return children;
}
