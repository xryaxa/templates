import type { MetadataRoute } from "next";
import { clinic } from "@/lib/clinic.config";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${clinic.siteUrl}/${l}`]));
  return locales.map((l) => ({
    url: `${clinic.siteUrl}/${l}`,
    changeFrequency: "monthly",
    priority: l === clinic.defaultLang ? 1 : 0.8,
    alternates: { languages },
  }));
}
