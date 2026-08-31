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
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/grid_icon.png" alt="GRID Real Estate" width={34} height={34} className="rounded-sm" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-black/70 hover:text-black transition-colors">{l.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:4053101221" className="text-sm text-black/60 hover:text-black transition-colors">(405) 310-1221</a>
          <a href="https://portal.thegridre.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-black/70 hover:border-black/30 hover:text-black transition-colors">client login</a>
          <a href="/contact" className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">get a proposal</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden rounded-full border border-black/15 px-4 py-2 text-sm font-medium">Menu</button>
        {open && (
          <div className="absolute left-0 top-full w-full border-t border-black/10 bg-white shadow-lg md:hidden">
            <nav className="flex flex-col px-4 py-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-black/80 hover:text-black border-b border-black/5 last:border-0">{l.label}</Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a href="/contact" onClick={() => setOpen(false)} className="rounded-full bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:opacity-90">get a proposal</a>
                <a href="tel:4053101221" className="rounded-full border border-black/15 px-5 py-3 text-center text-sm font-medium hover:border-black/30">call (405) 310-1221</a>
                <a href="https://portal.thegridre.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-black/15 px-5 py-3 text-center text-sm font-medium hover:border-black/30">client login</a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
