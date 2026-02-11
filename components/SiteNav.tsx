"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/invest", label: "Invest" },
  { href: "/manage", label: "Manage" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/grid_icon.png"
            alt="GRID icon"
            width={34}
            height={34}
            className="rounded-sm"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-black/70 hover:text-black"
            >
              {l.label}
            </Link>
          ))}

          {/* Phone CTA */}
          <a
            href="tel:4053101221"
            className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold hover:border-black/30"
          >
            (405) 310-1221
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-full border border-black/15 px-4 py-2 text-sm font-medium"
        >
          Menu
        </button>

        {/* Mobile Dropdown (anchored properly) */}
        {open && (
          <div className="absolute left-0 top-full w-full border-t border-black/10 bg-white shadow-lg md:hidden">
            <nav className="flex flex-col px-4 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium text-black/80 hover:text-black"
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile Phone CTA */}
              <a
                href="tel:4053101221"
                className="mt-4 rounded-full bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
              >
                Call (405) 310-1221
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}