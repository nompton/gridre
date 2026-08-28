import type { ReactNode } from "react";

// The privacy page itself is a client component, so its metadata lives here.
export const metadata = {
  alternates: { canonical: "https://thegridre.com/privacy" },
  title: "Privacy Policy",
  description:
    "How GRID Real Estate collects, uses, and protects your information across our property management, association management, and investor services.",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
