export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-10 text-sm text-black/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">GRID Real Estate LLC</div>
            <address className="not-italic space-y-1 text-sm text-black/60">
              <div>117 E Daws St</div>
              <div>Norman, OK 73069</div>
              <div className="mt-2">
                <a href="tel:4053101221" className="hover:text-black transition">(405) 310-1221</a>
              </div>
            </address>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">Services</div>
            <div className="space-y-1.5">
              <div><a href="/manage" className="hover:text-black transition">Property Management</a></div>
              <div><a href="/associations" className="hover:text-black transition">Association Management</a></div>
              <div><a href="/invest" className="hover:text-black transition">Investor Services</a></div>
              <div><a href="/buy-sell" className="hover:text-black transition">Buy &amp; Sell</a></div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">OKC Metro</div>
            <div className="space-y-1.5 mb-5">
              <div><a href="/oklahoma-city" className="hover:text-black transition">Oklahoma City</a></div>
              <div><a href="/edmond" className="hover:text-black transition">Edmond</a></div>
              <div><a href="/yukon" className="hover:text-black transition">Yukon</a></div>
              <div><a href="/moore" className="hover:text-black transition">Moore</a></div>
              <div><a href="/mustang" className="hover:text-black transition">Mustang</a></div>
              <div><a href="/midwest-city" className="hover:text-black transition">Midwest City</a></div>
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">Tulsa Metro</div>
            <div className="space-y-1.5">
              <div><a href="/tulsa" className="hover:text-black transition">Tulsa</a></div>
              <div><a href="/bixby" className="hover:text-black transition">Bixby</a></div>
              <div><a href="/broken-arrow" className="hover:text-black transition">Broken Arrow</a></div>
              <div><a href="/jenks" className="hover:text-black transition">Jenks</a></div>
              <div><a href="/owasso" className="hover:text-black transition">Owasso</a></div>
              <div><a href="/sand-springs" className="hover:text-black transition">Sand Springs</a></div>
            </div>
          </div>
        </div>
        <div className="border-t border-black/10 pt-6 space-y-1.5">
          <div>© {new Date().getFullYear()} GRID Real Estate LLC — Oklahoma</div>
          <div>
            a member of the{" "}
            <a href="https://www.nompton.net" target="_blank" rel="noopener noreferrer" className="font-medium text-black underline underline-offset-4 hover:text-black/70 transition">
              nompton™ group
            </a>
          </div>
          <div><a href="/privacy" className="hover:text-black transition">privacy policy</a></div>
        </div>
      </div>
    </footer>
  );
}