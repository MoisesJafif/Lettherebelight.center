# Yehi Ohr — Rav Avshi · Let There Be Light

A cinematic, immersive website for the Yehi Ohr spiritual center in Tzfat.

## Stack

Static site — no build step required.

- React 18 (loaded via UMD CDN)
- Hand-written CSS in `site.css` (Tailwind Play CDN only for the WhatsApp concierge)
- Babel Standalone for inline JSX transpilation
- Spotify and YouTube embeds (links in `content.jsx`)
- Plain `<a>` deep links for WhatsApp + the donation page

All site logic lives in a handful of `.jsx` files (no bundler).

## Deploy to Vercel

```bash
# Option 1 — via Vercel CLI
npm i -g vercel
vercel deploy --prod

# Option 2 — push to GitHub and import in the Vercel dashboard
# https://vercel.com/new
```

The included `vercel.json` configures:

- Long-term caching for `/assets/*` (immutable)
- Correct `text/babel` content type for `.jsx`
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`)
- Clean URLs

Nothing to build — Vercel will serve `index.html` and the static assets directly.

## Local preview

```bash
# Python
python3 -m http.server 8000

# Or Node
npx serve .
```

Open `http://localhost:8000`.

## Content and configuration

All links and recordings live in `content.jsx` and were checked against the
Rabbi's own channels:

- YouTube: `@lettherebelight-yehior` (channel `UCXmo5V_ly2VysOzHhg479qw`)
- Spotify podcast: `2EoY2HZTKuBOnVxt2W7NgK`
- WhatsApp: `+972 54 540 4914`; community chat link in `LINKS`

The Torah Classes page reads `/api/classes` (a Vercel function that parses the
channel's public RSS feed — no API key) and falls back to `CLASSES` in
`content.jsx`. Photos carry a `kind`: `doc` (documentary) or `render`
(architectural render / generated) — renders are always labelled on the page.

## File map

| File | What it does |
|---|---|
| `index.html` | Document shell, fonts, boot screen |
| `site.css` | Design system: tokens, type, layout, components |
| `content.jsx` | Verified links, classes, playlists, Adam Kadmon credits, photo provenance |
| `components.jsx` | Header and menu, footer, photo, YouTube/Spotify players, shared hooks |
| `whatsapp.jsx` | WhatsApp concierge (EN/HE/ES) that pre-fills a message |
| `pages.jsx` | Home, Rav Avshi, Yehi Ohr Center |
| `pages2.jsx` | Music, Tours, Community, Teaching, Support, Vision, Contact, FAQ, Merch |
| `pages3.jsx` | Torah Classes |
| `app.jsx` | Hash router (all old deep links kept) |
| `api/classes.js` | Newest classes from the YouTube feed |
| `review/` | Review captures and notes — excluded from deploys by `.vercelignore` |

## Image optimization

Every photo is served as **WebP** capped at 1800px on the long edge — total `/assets` payload is around 5–6 MB. Hero images stay sharp on retina without bloating page weight.

## Contact wiring

- **WhatsApp**: `+972 54 540 4914` — chat opens at `api.whatsapp.com/send/...`
- **Donations**: `donaciones.yehiohr.live` (Steady Connection, card payments by Stripe) — every donate button. Change it once: `DONATE_URL` in `components.jsx`. The page refuses to be embedded (`X-Frame-Options: DENY`), so buttons open it in a new tab.
- **Newsletter**: not offered yet. `#newsletter` points to the WhatsApp community, Spotify and YouTube until a provider is chosen.

## License

© Yehi Ohr · All rights reserved.
