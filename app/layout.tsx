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
  title: {
    default: "GRID Real Estate | Oklahoma Property & HOA Management",
    template: "%s | GRID Real Estate",
  },
  description:
    "Oklahoma's investor-focused real estate brokerage. Full-service property management, HOA and association management, and investor services across the OKC and Tulsa metros.",
  metadataBase: new URL("https://thegridre.com"),
  openGraph: {
    siteName: "GRID Real Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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