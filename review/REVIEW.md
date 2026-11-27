# Yehi Ohr redesign — review notes

**Branch:** `redesign/phone-first` (unmerged; no pull request opened; auto-merge not enabled)
**Preview (private, non-production):**
https://lettherebelight-center-git-redesig-54cf82-moisesjafifs-projects.vercel.app/
Protected by Vercel login (moisesjafif account). A temporary share link that skips the login was sent in chat; it is kept out of the repository on purpose.
**Live site:** untouched. `www.yehi-ohr.com` and `lettherebelight-center.vercel.app` still serve `main` (commit dd23fc0).

## What changed

| Page | Visitor's question → first action |
|---|---|
| Home | "Where do I start?" → menorah photograph, one line, **Find your way in** → Learn / Listen / Visit / Meet Rav Avshi → newest class |
| Rav Avshi | "Who is he?" → portrait, approved lines, five short chapters, captioned photo stack, ends with a playable teaching |
| Yehi Ohr Center | "Can I visit?" → **Ask about visiting** first, then practical details, then an opt-in scroll walk from the alley to the center |
| Vision | "What is real?" → Exists / Underway / Hoped for, with dates, then one route to Support |
| Teaching & Path | "How does he teach?" → one playable class, then Mind / Heart / Experience, each linked to real material |
| Torah Classes | "Can I listen now?" → newest class playable at the top; search and topic filters below; series links |
| Music | "What can I hear?" → Adam Kadmon with its published credits, a three-item shelf, the podcast |
| Tours & Seminars | "What are the trips?" → each entry shows duration, language and group before the description; **Ask about this** (WhatsApp) |
| Community | "Can I come for Shabbat?" → **Ask about Shabbat**, practical details, one captioned gathering |
| Support | "What does a gift do?" → plain-language uses and the donation page's real options |
| Contact | "How do I reach them?" → WhatsApp first; Updates section for `#newsletter` |
| FAQ | Grouped: Visiting, Shabbat, Learning online, Languages; each answer ends in an action |
| Merch | Honest "not available yet" with a WhatsApp ask |

Phone pages are much shorter (screens at 390×844, before → after): Home 13.0 → 3.9, Rav Avshi 11.1 → 6.3, Center 15.6 → 8.3 (3.6 of that is the walk-in sequence), Classes 9.6 → 4.9, Music 10.0 → 4.2, Support 6.2 → 3.3.

## Phone journeys (tested at 390px)

1. **Playable lesson:** Home → tap *Learn* → tap ▶ on the class = **2 taps**. The newest class is also on Home: one tap on ▶.
2. **Recording:** Home → tap *Listen* → tap *Watch & listen* (Adam Kadmon starts) = **2 taps**.
3. **Shabbat inquiry:** Home → tap *Visit* → tap *Coming for Shabbat?* (inquiry opens) = **2 taps**. Sending in WhatsApp is the visitor's third tap.

On Home the visitor scrolls (or taps *Find your way in*) to reach the four paths.
Recordings: `phone-home.webm`, `phone-three-journeys.webm`. These were made in Chromium at iPhone size. On a real iPhone, Safari may ask for one more tap on YouTube's own play button.

## Functional tests (14/14 pass)

- All 21 internal links resolve; all 16 old hashes work, including `#torah-classes`, `#visit` and `#newsletter`. The back button works.
- All 24 external links return 200 (YouTube, Spotify, WhatsApp, WhatsApp community, donation page).
- Shabbat and tour inquiries build the correct WhatsApp message to +972 54 540 4914. `window.open` was intercepted, so **nothing was sent**.
- Hebrew in the concierge switches to RTL.
- Classes: search, Parasha filter, empty state, and tapping a class loads its YouTube embed.
- `/api/classes` returns the live channel feed on the preview.
- Keyboard: first Tab reaches *Skip to content*; menu groups open on focus.
- Reduced motion: the Center walk-in becomes a static captioned list; image motion stops.
- Phone tap targets ≥ 40px; no horizontal scroll on any page at 390px.
- No script errors on any route.
- Bug found and fixed: the WhatsApp panel stayed open after navigation and covered the next page.

## What I removed because it couldn't be verified

- Upcoming events with dates and "8 places left", plus "Adam Kadmon · pre-save · 5786". The song came out on 30 Mar 2023.
- Three named testimonials, eight discography titles, six merch items with prices.
- `hello@lettherebelight.center`: that domain has no mail server, so mail to it can't arrive.
- `youtube.com/@ravavshi` (404). `@YehiOhr` is an unrelated Christian channel and is not linked.
- The EN/HE/ES site switch, which never translated the pages. The concierge keeps its real EN/HE/ES.
- "Fully accessible", "guests from twenty countries", the $18/$54/$180/$1,800 impact list (the donation page offers different amounts), and the map placeholder.

## Decisions for the Rabbi / center

1. **Tour details:** confirm *7 days*, *1–5 days*, *3 days*, the languages and the group sizes. They are carried over from the current site and labelled as such.
2. **Testimonials:** send real, approved quotes with names and permission if you want them back.
3. **Email:** is there a working address? Until there is, Contact is WhatsApp-only and has no email form.
4. **Newsletter:** choose a provider, or keep the WhatsApp community as the updates channel. Please confirm that chat is still active.
5. **Two donation pages:** the site uses `donaciones.yehiohr.live`, while the YouTube descriptions link `thechesedfund.com/yehior/...`. Which one is current?
6. **Instagram `@yehiohr`:** 0 posts and 5 followers. It is not linked. Confirm whether it is theirs.
7. **Merch:** confirm items, prices, real product photos and a buying path, or keep the page as "not available yet".
8. **Photographs:** confirm that `tzfat-alley`, `tzfat-walking`, `learning-doorway` and the students' photos are documentary and cleared for publication. Images I believe are generated or composited (`class-without-doors`, `rav-praying-tzfat`, `tzfat-panorama`, `tzfat-sunset`, `tzfat-childhood`) are **no longer used**. All building images are labelled *Render*.
9. **Center film:** the Tzfat walk-in is a photo storyboard, labelled as such. Film one continuous move toward the real doorway to replace it.
10. **Captions:** short factual captions were written for the photo stack and the niggun evening. Please approve or correct them.
11. **Rav Avshi bio:** the "Abroad" chapter now includes his own interview line about travelling to America until 11 September 2001. Confirm he wants it on the site.
12. **Licensed Scrolltide components** (Kiln, Photo Stack, Sable, Rann Mahal movement) were not available in the project. The expanding panels, photo stack, shelf and scroll walk are original builds that follow the described behaviour. Swap in the licensed versions once they arrive.

## Not done / out of scope

- No Rosh Chodesh destination, promo or playlist link. The genuine classes that mention observances are listed unchanged in the archive.
- Not tested on a physical iPhone (the recordings use Chromium at iPhone size).
- No production deploy, no merge, no real messages, gifts or orders.
