# Yehi Ohr — Next.js

Cinematic, immersive website for the Yehi Ohr spiritual center in Tzfat.

Built with **Next.js 14** (App Router), **React 18**, and **Tailwind CSS**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
# Push to GitHub, then import at vercel.com/new
# OR via CLI:
npm i -g vercel
vercel deploy --prod
```

Zero config required — Next.js + Vercel handle everything.

## Project structure

```
yehi-ohr-next/
├── app/
│   ├── layout.jsx          # Root layout, fonts, global styles
│   ├── page.jsx            # Mounts <App />
│   ├── globals.css         # Design tokens + Tailwind + animations
│   └── components/
│       ├── App.jsx         # Router (URL-hash based)
│       ├── Components.jsx  # Nav, Footer, Photo, Reveal, Eyebrow, R
│       ├── Whatsapp.jsx    # Floating WhatsApp concierge widget
│       ├── Pages.jsx       # Home, Rav Avshi, Yehi Ohr Center
│       ├── Pages2.jsx      # Music, Tours, Community, Teaching, Support, Vision, Contact, FAQ, Merch
│       └── Pages3.jsx      # Torah Classes (live YouTube + Spotify)
├── public/
│   └── assets/             # 31 WebP-optimized photos (~5.5 MB total)
├── package.json
├── next.config.mjs
├── tailwind.config.mjs
├── postcss.config.mjs
└── jsconfig.json
```

## Configuration

Open `app/components/Pages3.jsx` and paste into `CLASSES_CONFIG`:

| Key | Where to find it |
|---|---|
| `YT_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) — restrict to YouTube Data API v3 |
| `YT_CHANNEL_ID` | YouTube → channel → Share → "Copy channel ID" |
| `SPOTIFY_EMBED_URL` | Any Spotify show → ⋯ → Share → "Embed" |
| `SPOTIFY_EPISODES` | Optional: episode IDs per tab |

Once filled, the Classes page pulls live content automatically.

## Fonts

Loaded via `next/font/google` (no CDN, fully self-hosted):
- **Cormorant Garamond** — editorial display serif
- **Manrope** — body sans
- **JetBrains Mono** — eyebrows, captions, monospace accents

## Images

Every photo is served as **WebP**, capped at 1800 px on the long edge. Total `/public/assets` payload is around 5.5 MB.

Next.js automatically serves them with proper caching and content-type headers.

## Contact wiring

- **WhatsApp**: `+972 54 540 4914` — `api.whatsapp.com/send/...`
- **PayPal**: `paypal.me/avshiweingot` — all donate CTAs

## Newsletter

Form in `app/components/Components.jsx → Footer` is front-end only. Wire its `onSubmit` to your provider (Mailchimp, Buttondown, Resend, etc.).

## License

© Yehi Ohr · All rights reserved.
