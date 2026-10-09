"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/manage", label: "Property Management" },
  { href: "/invest", label: "Investor Services" },
  { href: "/buy-sell", label: "Buy & Sell" },
  { href: "/associations", label: "Associations" },
  { href: "/platform", label: "Platform" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src="/brand/grid_icon.png" alt="GRID Real Estate" width={34} height={34} className="rounded-sm" />
        </Link>
        {/* Primary nav takes the middle (flex-1 + centered), so it never crowds the
            logo on the left or the contact/CTA cluster on the right — the gap that
            used to collapse at xl and run "About" into "Text us". */}
        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap text-sm text-black/70 hover:text-black transition-colors">{l.label}</Link>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          {/* Contact text links are grouped and visually set off from the nav by a
              hairline divider so they don't read as more menu items. */}
          <div className="hidden items-center gap-4 border-r border-black/10 pr-4 xl:flex">
            <a href="sms:+14053101221" className="whitespace-nowrap text-sm text-black/60 hover:text-black transition-colors">Text us</a>
            <a href="tel:4053101221" className="whitespace-nowrap text-sm text-black/60 hover:text-black transition-colors">(405) 310-1221</a>
          </div>
          <a href="https://portal.thegridre.com" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-black/70 hover:border-black/30 hover:text-black transition-colors">client login</a>
          <a href="/contact" className="whitespace-nowrap rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">get a proposal</a>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden rounded-full border border-black/15 px-4 py-2 text-sm font-medium">Menu</button>
        {open && (
          <div className="absolute left-0 top-full w-full border-t border-black/10 bg-white shadow-lg lg:hidden">
            <nav className="flex flex-col px-4 py-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-black/80 hover:text-black border-b border-black/5 last:border-0">{l.label}</Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a href="/contact" onClick={() => setOpen(false)} className="rounded-full bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:opacity-90">get a proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-black/15 px-5 py-3 text-center text-sm font-medium hover:border-black/30">call (405) 310-1221</a>
                <a href="sms:+14053101221" onClick={() => setOpen(false)} className="rounded-full border border-black/15 px-5 py-3 text-center text-sm font-medium hover:border-black/30">text (405) 310-1221</a>
                <a href="https://portal.thegridre.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-black/15 px-5 py-3 text-center text-sm font-medium hover:border-black/30">client login</a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
