// GET /api/classes — newest classes from Rav Avshi's YouTube channel.
// Reads the channel's public RSS feed (no API key) and returns JSON.
// The site falls back to the saved list in content.jsx if this fails.

const CHANNEL_ID = 'UCXmo5V_ly2VysOzHhg479qw'; // "Let There Be Light | Rav Avshi Weingot"
const FEED = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID;

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function firstSentence(text) {
  const t = (text || '').split(/\n|-{6,}/)[0].trim();
  if (!t) return '';
  const m = t.match(/^(.{20,220}?[.?!])(\s|$)/);
  return m ? m[1] : t.slice(0, 200);
}

module.exports = async (req, res) => {
  try {
    const r = await fetch(FEED, { headers: { 'user-agent': 'yehi-ohr-site' } });
    if (!r.ok) throw new Error('feed ' + r.status);
    const xml = await r.text();
    const items = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
      const get = (re) => { const m = e.match(re); return m ? decode(m[1]) : ''; };
      const link = get(/<link rel="alternate" href="([^"]+)"/);
      return {
        id: get(/<yt:videoId>([^<]+)</),
        title: get(/<title>([^<]+)</),
        date: get(/<published>([^<]+)</).slice(0, 10),
        summary: firstSentence(get(/<media:description>([\s\S]*?)<\/media:description>/)),
        short: link.includes('/shorts/'),
      };
    }).filter((it) => it.id && !it.short && !/#shorts/i.test(it.title))
      .map((it) => {
        // Many descriptions just repeat the title; drop those.
        const head = it.title.toLowerCase().replace(/[^a-z]/g, '').slice(0, 14);
        const sum = it.summary.toLowerCase().replace(/[^a-z]/g, '');
        return { ...it, summary: head && sum.startsWith(head) ? '' : it.summary };
      });

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.status(200).send(JSON.stringify({ channel: CHANNEL_ID, fetched: new Date().toISOString(), items }));
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ error: 'Could not read the YouTube feed', items: [] });
  }
};
