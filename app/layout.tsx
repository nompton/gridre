import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "GRID Real Estate — OKC Metro Property Management",
  description:
    "Premier property management across the Oklahoma City Metro. Professional photography, Matterport 3D, social media marketing, and full-service leasing.",
  metadataBase: new URL("https://www.thegridre.com"),
  openGraph: {
    type: "website",
    siteName: "GRID Real Estate",
    title: "GRID Real Estate — OKC Metro Property Management",
    description:
      "Premier property management across the Oklahoma City Metro. Professional photography, Matterport 3D, social media marketing, and full-service leasing.",
    url: "https://www.thegridre.com",
    images: [{ url: "/images/east-village.jpg", width: 1200, height: 630, alt: "GRID Real Estate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRID Real Estate — OKC Metro Property Management",
    description: "Premier property management across the Oklahoma City Metro.",
    images: ["/images/east-village.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body
        className="min-h-screen bg-white text-black font-sans antialiased"
      >
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}