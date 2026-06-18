export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-10 text-sm text-black/60">
      <div className="mx-auto max-w-6xl space-y-2 px-4">
        <div>made with ♥ in norman, oklahoma</div>

        <div>© copyright {new Date().getFullYear()} GRID Real Estate LLC</div>

        <div className="text-black/50">don&apos;t steal our shit</div>

        <div>
          a member of the{" "}
          <a
            href="https://www.nompton.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black underline underline-offset-4 hover:text-black/70 transition"
          >
            nompton™ group
          </a>
        </div>
      </div>
    </footer>
  );
}