# Templates

Ready-to-use website templates. Each template lives in its own folder, is self-contained, and has its own `README.md` with setup and deploy steps.

## Catalog

| Template | Type | Languages | Stack | Folder |
|----------|------|-----------|-------|--------|
| Dental Clinic (Baku) | One-page clinic site with WhatsApp booking | AZ / RU / EN | Static HTML/CSS/JS, no build | [`dental-clinic/`](dental-clinic/) |
| Dental Clinic (Baku), Next.js | Same site with a pre-rendered page per language, SEO, auto language redirect | AZ / RU / EN | Next.js 16, TypeScript | [`dental-clinic-next/`](dental-clinic-next/) |

## Repository layout

```
templates/
├── README.md            ← this catalog
├── <template-name>/     ← one folder per template, kebab-case
│   ├── README.md        ← what it is, how to set it up for a client, how to deploy
│   ├── index.html
│   ├── css/  js/  assets/
│   └── js/config.js     ← (recommended) the single file edited per client
└── ...
```

## Adding a new template

1. Create a folder in kebab-case named after the business type, e.g. `beauty-salon/`, `restaurant/`.
2. Keep it self-contained: no files shared across template folders, so any folder can be copied out on its own.
3. Put all client-specific data (name, contacts, colours, prices, texts) in one config file, like `js/config.js` in `dental-clinic/` or `lib/clinic.config.ts` in `dental-clinic-next/`.
4. Write a `README.md` in the folder covering features, setup for a new client, local preview and deploy.
5. Add a row to the **Catalog** table above.

## Using a template for a client

Copy the template folder **out of this repo** into the client's own project/repo, then edit its config. Keep this repo for the clean, reusable templates only, so client data never ends up here.
