"use client";

import { useEffect } from "react";

const SELECTOR = ".section__head, .services, .features, .doctors, .reviews, .faq, .book, .contact";

/** Fades sections in as they scroll into view. Content stays visible without JS. */
export function Reveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      // Only hide what's still below the fold, so nothing visible flashes
      if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add("reveal");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
