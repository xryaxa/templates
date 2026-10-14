import { NextResponse, type NextRequest } from "next/server";
import { clinic } from "@/lib/clinic.config";
import { hasLocale, locales, type Locale } from "@/lib/i18n";

/** Pick the best language from the browser's Accept-Language header (e.g. "ru-RU,ru;q=0.9,en;q=0.8"). */
function preferredLocale(header: string | null): Locale {
  const ranked = (header ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => hasLocale(r.lang))?.lang as Locale ?? clinic.defaultLang;
}

/** Sends visitors without a language in the URL (e.g. "/") to /az, /ru or /en. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  request.nextUrl.pathname = `/${preferredLocale(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (icon.svg, robots.txt, images…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
