import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { clinic } from "@/lib/clinic.config";
import { hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"], // latin-ext covers ə ğ ı ş ç
  variable: "--font-manrope",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    metadataBase: new URL(clinic.siteUrl),
    title: clinic.seo.title[lang],
    description: clinic.seo.description[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": `/${clinic.defaultLang}` },
    },
    openGraph: {
      type: "website",
      siteName: clinic.name,
      title: clinic.seo.title[lang],
      description: clinic.seo.description[lang],
      locale: { az: "az_AZ", ru: "ru_RU", en: "en_US" }[lang],
      url: `/${lang}`,
      ...(clinic.hero.image && { images: [clinic.hero.image] }),
    },
  };
}

export const viewport: Viewport = {
  themeColor: clinic.theme.primary,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const theme = {
    "--primary": clinic.theme.primary,
    "--primary-dark": clinic.theme.primaryDark,
    "--accent": clinic.theme.accent,
  } as React.CSSProperties;

  return (
    <html lang={lang} className={manrope.variable} style={theme}>
      <body>{children}</body>
    </html>
  );
}
