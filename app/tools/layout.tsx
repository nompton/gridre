import type { ReactNode } from "react";

// The tools page is a client component, so its metadata lives here (like privacy).
export const metadata = {
  alternates: { canonical: "https://thegridre.com/tools" },
  title: "Free Real Estate Investor Calculators — OKC & Tulsa",
  description:
    "Free real estate investing calculators from GRID Real Estate: rental proforma, rehab underwriting, mortgage scenarios, and a buyer/seller net sheet. Run the numbers on any Oklahoma deal — no sign-up required.",
  openGraph: {
    title: "Free Real Estate Investor Calculators",
    description:
      "Rental proforma, rehab underwriting, mortgage, and net-sheet calculators for Oklahoma investors. No sign-up required.",
    url: "https://thegridre.com/tools",
  },
};

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return children;
}
