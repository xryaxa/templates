import type { Locale } from "./i18n";

/** A piece of text the visitor sees, in every supported language. */
export type Localized = Record<Locale, string>;

export type IconName =
  | "tooth" | "implant" | "braces" | "sparkle" | "shield" | "child" | "crown" | "xray"
  | "check" | "pin" | "instagram" | "facebook" | "tiktok" | "phone" | "whatsapp";

export type ClinicConfig = {
  siteUrl: string;
  name: string;
  logoText: string;
  logoAccent: string;
  logoImage: string;
  theme: { primary: string; primaryDark: string; accent: string };
  defaultLang: Locale;

  phone: string;
  phoneRaw: string;
  whatsapp: string;
  email: string;
  address: Localized;
  landmark: Localized;
  mapEmbed: string;
  mapLink: string;
  geo: { lat: number; lng: number };
  hours: { days: Localized; time: string | null; schemaDays?: string[] }[];
  socials: Partial<Record<"instagram" | "facebook" | "tiktok", string>>;

  hero: { title: Localized; subtitle: Localized; image: string };
  stats: { value: string; label: Localized }[];
  currency: string;
  services: { icon: IconName; price: number; name: Localized; desc: Localized }[];
  features: { title: Localized; text: Localized }[];
  doctors: { name: string; photo: string; role: Localized; exp: number }[];
  reviews: { name: string; rating: number; source: string; text: Localized }[];
  faq: { q: Localized; a: Localized }[];
  seo: { title: Localized; description: Localized };
};
