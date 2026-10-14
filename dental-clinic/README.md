# Dental Clinic Website Template (Baku)

A one-page website for dental clinics in Baku: static, works on phones, and available in three languages (AZ / RU / EN).
It has no backend and no build step. Upload the folder to any host and it runs.

## Features
- **3 languages** (Azerbaijani, Russian, English) with a switcher. The chosen language is remembered, and links like `?lang=ru` open a specific one
- **WhatsApp booking**: the form opens WhatsApp with the patient's name, phone, service and date already filled in
- Floating WhatsApp button and a sticky **Call / Book** bar on mobile
- Sections: hero, services with "from" prices in ₼, why us, doctors, reviews, FAQ, booking, contacts with Google Map and opening hours
- Google `Dentist` structured data (schema.org) for local SEO
- Change the brand colour in one place in the config

## Set up the site for a new clinic (about 15 minutes)
1. Copy the `dental-clinic/` folder and rename it, e.g. `clinic-nurdent/`.
2. Edit **`js/config.js`**. This is the only file you need to change:
   - `name`, `logoText`, `logoAccent` (or `logoImage: "assets/logo.svg"`)
   - `theme.primary` / `primaryDark` / `accent`: the clinic's brand colours
   - `phone`, `phoneRaw`, `whatsapp` (digits only, e.g. `994501234567`), `email`
   - `address`, `landmark` (nearby metro), `mapEmbed`, `mapLink`, `geo`
     - Get `mapEmbed` from Google Maps: **Share → Embed a map**, then copy only the `src="…"` URL
   - `hours`, `socials`, `stats`, `services` (prices), `doctors`, `reviews`, `faq`, `seo`
3. Add photos to `assets/` and point to them:
   - `hero.image: "assets/hero.jpg"` (if left empty, an illustration is shown instead)
   - `doctors[].photo: "assets/dr-leyla.jpg"` (portrait, about 4:5; if left empty, initials are shown)
4. Replace `assets/favicon.svg` with the clinic's icon.

Service icons available: `tooth`, `implant`, `braces`, `sparkle`, `shield`, `child`, `crown`, `xray`.

## Preview locally
```bash
cd dental-clinic
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy
The site is plain static files, so any of these hosts work:
- **Vercel**: run `npx vercel` inside the folder (or drag the folder into Vercel Drop), then connect the clinic's domain, e.g. `nurdent.az`
- Netlify, Cloudflare Pages, GitHub Pages, or regular shared hosting (upload the files over FTP)

## Notes
- Text in the interface (button labels, section titles) lives in `js/i18n.js` and is shared by all clinics.
- Reviews and stats in the demo config are **sample data**. Replace them with the clinic's real Google or Instagram reviews before launch.
- Want form submissions saved to email or a CRM as well as WhatsApp? Add a form service (Formspree, Telegram bot, etc.) inside the `submit` handler in `js/app.js`.
