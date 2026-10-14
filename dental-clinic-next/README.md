# Dental Clinic Website Template (Next.js)

A one-page website for dental clinics in Baku, built with Next.js 16 (App Router). It comes in three languages (AZ / RU / EN), and each language is pre-rendered as its own static page.

## Features
- **Separate URL per language**: `/az`, `/ru`, `/en`, each with its own title, description, `hreflang` tags and Open Graph data
- **Automatic language detection**: `/` sends visitors to their browser's language (`proxy.ts`). Visitors whose browser language isn't AZ, RU or EN get `defaultLang`
- **WhatsApp booking**: the form opens WhatsApp with the patient's name, phone, service and date already filled in, in the visitor's language
- Floating WhatsApp button and a sticky **Call / Book** bar on mobile
- Google `Dentist` structured data, plus `sitemap.xml` and `robots.txt`
- Fonts loaded with `next/font` (Manrope, including Azerbaijani letters and Cyrillic) and images through `next/image`
- Ships only a small amount of JavaScript: the menu, the form and the scroll animations are the only interactive parts

## Project structure
```
lib/clinic.config.ts   ← the ONLY file you edit for a new clinic
lib/i18n.ts            interface strings (buttons, headings), shared by all clinics
app/[lang]/page.tsx    the page sections
app/[lang]/layout.tsx  fonts, metadata, brand colours
components/            Header, BookingForm, Reveal (client), Icon
proxy.ts               "/" → /az | /ru | /en redirect
public/images/         clinic photos
```

## Set up the site for a new clinic
1. Copy the folder (or the git repository) and run `npm install`.
2. Edit **`lib/clinic.config.ts`**. TypeScript will flag any field you've missed:
   - `siteUrl`: the clinic's domain, e.g. `https://nurdent.az`
   - `name`, logo, `theme` colours, phone, `whatsapp` (digits only), email
   - `address`, `landmark`, `mapEmbed` (from Google Maps: **Share → Embed a map**, then copy only the `src` URL), `mapLink`, `geo`
   - `hours`, `socials`, `stats`, `services`, `doctors`, `reviews`, `faq`, `seo`
3. Put photos in `public/images/` and reference them as `/images/hero.jpg` or `/images/dr-leyla.jpg`. If you leave them empty, the hero shows an illustration and doctors show their initials.
4. Replace `app/icon.svg` with the clinic's icon.

Service icons available: `tooth`, `implant`, `braces`, `sparkle`, `shield`, `child`, `crown`, `xray`.

## Develop
```bash
npm run dev     # http://localhost:3000 → redirects to /az
npm run build   # production build (all 3 languages pre-rendered)
npm run lint
```

## Deploy (Vercel)
```bash
npx vercel          # preview
npx vercel --prod   # production
```
Then add the clinic's domain under **Project → Settings → Domains**.

## Notes
- Reviews, stats and the address in the demo config are **sample data**. Replace them with the clinic's real details before launch.
- Want submissions saved somewhere as well as WhatsApp (email, Telegram, a CRM)? Add a Server Action and call it from `components/BookingForm.tsx`.
