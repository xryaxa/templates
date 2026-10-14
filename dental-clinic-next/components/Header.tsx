"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

const NAV = [
  ["#services", "nav.services"],
  ["#about", "nav.about"],
  ["#doctors", "nav.doctors"],
  ["#reviews", "nav.reviews"],
  ["#contact", "nav.contact"],
] as const;

type Props = {
  lang: Locale;
  dict: Pick<Dict, (typeof NAV)[number][1] | "cta.book">;
  phone: string;
  phoneRaw: string;
  logo: React.ReactNode;
};

export function Header({ lang, dict, phone, phoneRaw, logo }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`} id="top">
      <div className="container header__inner">
        <a href="#top" className="logo">{logo}</a>

        <nav className={`nav${open ? " is-open" : ""}`} id="nav" aria-label="Main">
          {NAV.map(([href, key]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{dict[key]}</a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang">
            {locales.map((l) => (
              <Link key={l} href={`/${l}`} hrefLang={l} aria-current={l === lang ? "true" : undefined} scroll={false}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <a className="header__phone" href={`tel:${phoneRaw}`}>{phone}</a>
          <a href="#book" className="btn btn--primary btn--sm hide-sm">{dict["cta.book"]}</a>
          <button
            className="burger" aria-label="Menu" aria-controls="nav" aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
