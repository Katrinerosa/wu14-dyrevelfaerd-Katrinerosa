import Link from "next/link";
import type { ReactNode } from "react";

export function SiteHeader() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Hovedmenu"
        className="mx-auto flex min-h-16 max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8"
      >
        <Link className="flex items-center gap-3" href="/">
          <img
            alt="Foreningen for Dyrevelfærd logo"
            className="h-8 w-8 object-contain"
            src="/dyrevelfaerd/logo.png"
          />
          <span className="font-oswald text-sm font-semibold text-[#111]">
            Foreningen for Dyrevelfærd
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-oswald text-xs font-semibold text-[#111]">
          <Link href="/">Hjem</Link>
          <Link href="/bliv-frivillig">Bliv frivillig</Link>
          <Link href="/adopter">Adopter et dyr</Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#bfd1e6] px-5 py-8 text-[#111] sm:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-8 sm:grid-cols-[1fr_1fr]">
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className="font-oswald text-lg font-bold uppercase">
            Kontakt
          </h2>
          <address className="mt-3 not-italic text-sm font-semibold leading-6">
            Tovesvej 22, 1.
            <br />
            1131 København K
            <br />
            CVR: 22441687
            <br />
            Husk at du kan få fradrag for donationer på op til 16.600 kr.
          </address>
        </section>
        <section aria-labelledby="footer-partners" className="sm:justify-self-end">
          <h2 id="footer-partners" className="font-oswald text-lg font-bold uppercase">
            Partnere
          </h2>
          <ul className="mt-3 space-y-1 text-sm font-semibold text-[#1265a8]">
            <li>Alma</li>
            <li>World Animal Protection</li>
            <li>Fødevarestyrelsen</li>
            <li>Faktalink</li>
          </ul>
        </section>
      </div>
      <p className="mx-auto mt-8 max-w-[1400px] text-center text-xs font-semibold">
        @ 2024 - Foreningen for Dyrevelfærd
      </p>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
