# Open House Studio — site

Next.js marketing site for the validation period. One route group, no auth, no database.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Structure

```
src/
├── app/
│   ├── page.tsx              landing page, sections composed here
│   ├── layout.tsx            fonts, metadata, icons
│   ├── globals.css           palette tokens, base type
│   ├── api/subscribe/route.ts email capture
│   ├── legal/privacy         privacy policy
│   ├── legal/terms           terms and licence
│   ├── robots.ts, sitemap.ts
│   └── icon.svg
├── components/
│   ├── nav.tsx, wordmark.tsx, door-mark.tsx
│   ├── post-preview.tsx      code-drawn template mockup
│   ├── glow.tsx, reveal.tsx
│   └── sections/*            hero, proof, pillars, features, formats,
│                             how, pricing, faq, final-cta, footer
├── content/
│   ├── formats.ts            formats, counts, copy, mock post data
│   └── faq.ts
└── lib/site.ts               brand, nav, price ladder
```

## Email capture

`POST /api/subscribe` with `{ "email": "..." }`.

Without environment variables it accepts the request and logs it:

```
[subscribe] no provider configured { email: '...', source: 'landing' }
```

To send to MailerLite, copy `.env.example` to `.env.local` and fill in:

| Variable | Where to find it |
|---|---|
| `MAILERLITE_API_KEY` | MailerLite → Integrations → API tokens |
| `MAILERLITE_GROUP_ID` | The numeric ID of the `Free templates` group |

Note: the MailerLite Free plan restricts some API usage. Test one signup end to end after
adding the keys. If the API rejects it on Free, switch the form to the embedded MailerLite
form instead of the API call.

## Design tokens

| Token | Value |
|---|---|
| Background | `#F7F4EF` |
| Ink | `#1A1714` |
| Card | `#FFFDFA` |
| Muted | `#6B6156` |
| Border | `#E4DCD1` |
| Primary | `#A94F2E` |
| Primary hover | `#8F3F22` |
| Accent | `#C4643F` |
| Sand | `#E9DFCF` |
| Light | `#FFFCF4` |

Display type is Fraunces, body is Inter, both via `next/font`.

## Swapping in real templates

`src/components/post-preview.tsx` draws the mock posts with HTML and CSS. Replace it with
image exports from Figma when the real templates exist. Keep the same 4:5 aspect ratio and
rounded corner, and the layout will hold.

## Screenshot tooling

`scripts/shot.mjs` and `scripts/shot-mobile.mjs` use local Chrome through `puppeteer-core`.
They exist to check layout, not to ship. Delete them and the dev dependency before launch
if you prefer a smaller repo.

## Deploy

Vercel. Import the `site` directory as the project root, add the two environment variables,
then point `openhousestudio.online` at it.
