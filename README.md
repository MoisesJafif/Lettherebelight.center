# Yehi Ohr — Rav Avshi · Let There Be Light

A cinematic, immersive website for the Yehi Ohr spiritual center in Tzfat.

## Stack

Static site — no build step required.

- React 18 (loaded via UMD CDN)
- Tailwind CSS (Play CDN)
- Babel Standalone for inline JSX transpilation
- Spotify and YouTube embeds (configurable in `pages3.jsx`)
- Plain `<a>` deep links for WhatsApp + PayPal

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

## Configuration

Open `pages3.jsx` and paste into `CLASSES_CONFIG`:

- `YT_API_KEY` — YouTube Data API v3 key
- `YT_CHANNEL_ID` — Rav Avshi's channel (UC…)
- `SPOTIFY_EMBED_URL` — Spotify Share → Embed URL
- `SPOTIFY_EPISODES` — episode IDs per tab (optional)

Once set, the Classes page pulls live videos and playlists automatically. Nothing else needs to be touched per upload.

## File map

| File | What it does |
|---|---|
| `index.html` | Document shell, fonts, design tokens, layered CSS |
| `components.jsx` | Nav, Footer, Photo, Placeholder, Reveal, Eyebrow |
| `whatsapp.jsx` | Floating WhatsApp concierge widget with intake form |
| `pages.jsx` | Home, Rav Avshi, Yehi Ohr Center |
| `pages2.jsx` | Music, Tours, Community, Teaching, Support, Vision, Contact, FAQ, Merch |
| `pages3.jsx` | Torah Classes (live YouTube + Spotify) |
| `app.jsx` | Router (`location.hash` based) + page mounting |
| `assets/` | All images, WebP-optimized for the web |

## Image optimization

Every photo is served as **WebP** capped at 1800px on the long edge — total `/assets` payload is around 5–6 MB. Hero images stay sharp on retina without bloating page weight.

## Contact wiring

- **WhatsApp**: `+972 54 540 4914` — chat opens at `api.whatsapp.com/send/...`
- **PayPal**: `paypal.me/avshiweingot` — all donate CTAs
- **Newsletter form**: front-end only — wire to your provider of choice (Mailchimp, Buttondown, etc.) by replacing the form's `onSubmit` in `components.jsx → Footer`

## License

© Yehi Ohr · All rights reserved.
