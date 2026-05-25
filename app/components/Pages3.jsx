'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Placeholder, Photo, Reveal, Eyebrow, R } from './Components';

// ============================================================
// Torah Classes — LIVE YouTube + Spotify integration
// ------------------------------------------------------------
// This page automatically pulls Rav Avshi's latest videos and
// playlists from YouTube. No manual content updates needed.
// ------------------------------------------------------------
//
//   ⚙  ONE-TIME SETUP (open this file, paste your values below):
//
//   YT_API_KEY        — YouTube Data API v3 key
//                       Create at: https://console.cloud.google.com/apis/credentials
//                       Restrict to "YouTube Data API v3" + your domain.
//
//   YT_CHANNEL_ID     — Rav Avshi's channel ID (UCxxxxxxxxxxxx)
//                       Find: youtube.com → channel → Share → "Copy channel ID"
//
//   PLAYLIST_IDS      — Optional explicit mapping of UI category → playlist ID.
//                       Leave blank to auto-list all playlists from the channel.
//
//   SPOTIFY_EMBED_URL — Open any artist / show / playlist on Spotify,
//                       click ⋯ → Share → "Embed" and copy the src URL.
//
// Once these are filled in, the page is fully self-updating.
// New uploads appear automatically. No code edits per class.
// ============================================================

const CLASSES_CONFIG = {
  YT_API_KEY: '',
  YT_CHANNEL_ID: '',
  YT_CHANNEL_URL: 'https://www.youtube.com/@ravavshi',
  PLAYLIST_IDS: {
    // Map UI category → playlist ID. Leave blank to auto-discover.
    zohar: '',
    kabbalah: '',
    chassidut: '',
    'inner-torah': '',
    music: '',
    live: '',
    parasha: ''
  },
  SPOTIFY_EMBED_URL: 'https://open.spotify.com/embed/show/2EoY2HZTKuBOnVxt2W7NgK?utm_source=generator&theme=0',
  SPOTIFY_URL: 'https://open.spotify.com/show/2EoY2HZTKuBOnVxt2W7NgK',
  SPOTIFY_SHOW_ID: '2EoY2HZTKuBOnVxt2W7NgK',

  // -----------------------------------------------------------------
  // Spotify episode IDs per tab. Paste the bit after /episode/ from
  // any Spotify episode URL. Add as many as you want — first item per
  // tab is featured. Spotify auto-fills title + cover via oEmbed.
  //
  // Want to fully automate? Add a tiny serverless function that returns
  // an access token (Client Credentials flow) and set SPOTIFY_TOKEN_URL.
  // The page will then auto-pull episodes via the Spotify API.
  // -----------------------------------------------------------------
  SPOTIFY_EPISODES: {
    latest: [
      // 'paste episode id here',
    ],
    torah: [],
    nigunim: [],
    conversations: [],
    music: []
  },
  SPOTIFY_TOKEN_URL: '', // optional: serverless endpoint returning { access_token }

  CACHE_TTL_MIN: 30,
  MAX_VIDEOS: 12,
};

// ---- YouTube API helpers ----
async function ytFetch(endpoint, params) {
  const url = new URL('https://www.googleapis.com/youtube/v3/' + endpoint);
  Object.entries(params).forEach(([k, v]) => v != null && url.searchParams.append(k, String(v)));
  const cacheKey = 'yt:' + url.toString();
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached && Date.now() - cached.t < CLASSES_CONFIG.CACHE_TTL_MIN * 60 * 1000) return cached.data;
  } catch (_) {}
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('YouTube API responded ' + res.status);
  const data = await res.json();
  try { localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data })); } catch (_) {}
  return data;
}

async function fetchUploadsPlaylistId() {
  const c = CLASSES_CONFIG;
  const data = await ytFetch('channels', { part: 'contentDetails,snippet,statistics', id: c.YT_CHANNEL_ID, key: c.YT_API_KEY });
  return {
    uploadsId: data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads,
    videoCount: data.items?.[0]?.statistics?.videoCount,
    channelTitle: data.items?.[0]?.snippet?.title
  };
}

async function fetchPlaylistVideos(playlistId, max) {
  const c = CLASSES_CONFIG;
  const data = await ytFetch('playlistItems', {
    part: 'snippet,contentDetails', playlistId, maxResults: max || c.MAX_VIDEOS, key: c.YT_API_KEY
  });
  return (data.items || []).map(item => ({
    id: item.contentDetails?.videoId || item.snippet?.resourceId?.videoId,
    title: item.snippet?.title || 'Untitled',
    description: item.snippet?.description || '',
    publishedAt: item.snippet?.publishedAt || item.contentDetails?.videoPublishedAt,
    channelTitle: item.snippet?.videoOwnerChannelTitle || item.snippet?.channelTitle,
    thumbnail:
      item.snippet?.thumbnails?.maxres?.url ||
      item.snippet?.thumbnails?.standard?.url ||
      item.snippet?.thumbnails?.high?.url ||
      item.snippet?.thumbnails?.medium?.url ||
      item.snippet?.thumbnails?.default?.url
  })).filter(v => v.id);
}

async function fetchChannelPlaylists() {
  const c = CLASSES_CONFIG;
  const data = await ytFetch('playlists', {
    part: 'snippet,contentDetails', channelId: c.YT_CHANNEL_ID, maxResults: 25, key: c.YT_API_KEY
  });
  return (data.items || []).map(p => ({
    id: p.id,
    title: p.snippet?.title || 'Playlist',
    itemCount: p.contentDetails?.itemCount || 0,
    thumbnail: p.snippet?.thumbnails?.high?.url || p.snippet?.thumbnails?.medium?.url
  }));
}

function timeAgo(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
  if (diff < 2592000) return Math.floor(diff / 604800) + 'w ago';
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

// ---- Spotify helpers ----
// Spotify's oEmbed endpoint is public + CORS-enabled, so we can pull
// real title + thumbnail per episode without authentication.
async function spotifyOEmbed(episodeId) {
  const cacheKey = 'sp:oembed:' + episodeId;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached && Date.now() - cached.t < CLASSES_CONFIG.CACHE_TTL_MIN * 60 * 1000) return cached.data;
  } catch (_) {}
  const url = 'https://open.spotify.com/oembed?url=' + encodeURIComponent('https://open.spotify.com/episode/' + episodeId);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Spotify oEmbed ' + res.status);
  const data = await res.json();
  try { localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data })); } catch (_) {}
  return data;
}

// Optional: pull live episode list via Spotify Web API.
// Requires SPOTIFY_TOKEN_URL pointing to a serverless function that
// returns { access_token: '...' } (Client Credentials grant).
async function fetchSpotifyEpisodesLive(showId, limit = 20) {
  const c = CLASSES_CONFIG;
  if (!c.SPOTIFY_TOKEN_URL || !showId) return null;
  const tokenRes = await fetch(c.SPOTIFY_TOKEN_URL);
  if (!tokenRes.ok) throw new Error('Token endpoint ' + tokenRes.status);
  const { access_token } = await tokenRes.json();
  const r = await fetch(`https://api.spotify.com/v1/shows/${showId}/episodes?limit=${limit}&market=US`, {
    headers: { Authorization: 'Bearer ' + access_token }
  });
  if (!r.ok) throw new Error('Spotify API ' + r.status);
  const data = await r.json();
  return (data.items || []).map(ep => ({
    id: ep.id,
    title: ep.name,
    description: ep.description,
    publishedAt: ep.release_date,
    durationMs: ep.duration_ms,
    thumbnail: ep.images?.[0]?.url || ep.images?.[1]?.url
  }));
}

// ---- Page ----
function TorahClassesPage({ setRoute }) {
  const cfg = CLASSES_CONFIG;
  const isConfigured = !!(cfg.YT_API_KEY && cfg.YT_CHANNEL_ID);

  const [status, setStatus] = useState(isConfigured ? 'loading' : 'unconfigured');
  // status: 'unconfigured' | 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ videoCount: null, channelTitle: '' });
  const [uploadsId, setUploadsId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState('all'); // 'all' or playlist id
  const [videos, setVideos] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);

  // initial bootstrap
  useEffect(() => {
    if (!isConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        setStatus('loading');
        const channel = await fetchUploadsPlaylistId();
        if (!channel.uploadsId) throw new Error('Channel has no uploads playlist');
        if (cancelled) return;
        setUploadsId(channel.uploadsId);
        setMeta({ videoCount: channel.videoCount, channelTitle: channel.channelTitle });

        const [vids, lists] = await Promise.all([
          fetchPlaylistVideos(channel.uploadsId, cfg.MAX_VIDEOS),
          fetchChannelPlaylists()
        ]);
        if (cancelled) return;
        setVideos(vids);
        setPlaylists(lists);
        setStatus('ready');
      } catch (e) {
        if (cancelled) return;
        setError(e.message || String(e));
        setStatus('error');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // refetch on filter change
  useEffect(() => {
    if (status !== 'ready' && status !== 'loading') return;
    if (!uploadsId) return;
    const targetId = activePlaylist === 'all' ? uploadsId : activePlaylist;
    let cancelled = false;
    setLoadingList(true);
    fetchPlaylistVideos(targetId, cfg.MAX_VIDEOS)
      .then(vids => { if (!cancelled) setVideos(vids); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoadingList(false); });
    return () => { cancelled = true; };
  }, [activePlaylist, uploadsId]);

  // close modal on Esc
  useEffect(() => {
    if (!modalVideo) return;
    const onKey = e => { if (e.key === 'Escape') setModalVideo(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [modalVideo]);

  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <div data-screen-label="Torah Classes" className="pt-[72px]">
      {/* HERO */}
      <section className="relative border-b border-[rgba(244,237,225,0.06)] overflow-hidden">
        {/* Tzfat outdoor learning backdrop */}
        <div className="absolute inset-0 -z-0">
          <img
            src="/assets/class-without-doors.webp"
            alt="Outdoor Torah learning on a Tzfat terrace at sunset"
            className="absolute inset-0 w-full h-full object-cover kenburns"
            style={{ objectPosition: '50% 55%' }}
            loading="eager"
          />
          {/* warm tint blend */}
          <div className="absolute inset-0" style={{
            background:
              'linear-gradient(120deg, rgba(20,16,10,0.78) 0%, rgba(58,31,16,0.55) 45%, rgba(20,16,10,0.65) 100%)',
            mixBlendMode: 'multiply'
          }} />
          {/* gold glow blend */}
          <div className="absolute inset-0" style={{
            background:
              'radial-gradient(40% 35% at 20% 30%, rgba(232,166,87,0.30), transparent 65%),' +
              'radial-gradient(50% 45% at 90% 80%, rgba(160,122,58,0.22), transparent 70%)',
            mixBlendMode: 'screen'
          }} />
          {/* readability scrim */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(20,16,10,0.55) 0%, rgba(20,16,10,0.2) 30%, rgba(20,16,10,0.35) 70%, rgba(20,16,10,0.95) 100%)'
          }} />
          {/* vignette */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(120% 90% at 50% 50%, transparent 35%, rgba(20,16,10,0.65) 100%)'
          }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 py-32 sm:py-40 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal><Eyebrow>Torah Classes</Eyebrow></Reveal>
            <Reveal delay={200}>
              <h1 className="font-display mt-6 text-[60px] sm:text-[100px] lg:text-[140px] leading-[0.92] tracking-[-0.025em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                A <span className="font-display-i text-[var(--gold)]">classroom</span><br/>without walls.
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="mt-8 text-[18px] sm:text-[20px] leading-[1.6] text-[rgba(244,237,225,0.88)] max-w-2xl">
                Learn Torah, Kabbalah, Chassidut, and inner wisdom with Rav Avshi — through video, audio, and live teachings. <span className="text-[rgba(244,237,225,0.65)]">Updated automatically as new classes are uploaded.</span>
              </p>
            </Reveal>
          </div>

          {/* Live stats card — glass */}
          <div className="lg:col-span-4">
            <Reveal delay={350}>
              <div className="rounded-sm border border-[rgba(244,237,225,0.14)] bg-[rgba(20,16,10,0.55)] backdrop-blur-md p-6">
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-[rgba(244,237,225,0.65)] mb-5">
                  <span className={`w-2 h-2 rounded-full flicker ${status==='ready'?'bg-[var(--gold)]':status==='error'?'bg-red-400':'bg-[rgba(244,237,225,0.4)]'}`} />
                  <span>{status==='ready'?'Live · synced from YouTube':status==='loading'?'Connecting to YouTube…':status==='error'?'YouTube offline · fallback below':'Awaiting setup'}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-display text-[34px] text-[var(--gold)] leading-none">{meta.videoCount ?? '—'}</div>
                    <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[rgba(244,237,225,0.5)] mt-2">Videos</div>
                  </div>
                  <div>
                    <div className="font-display text-[34px] text-[var(--gold)] leading-none">{playlists.length || '—'}</div>
                    <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[rgba(244,237,225,0.5)] mt-2">Playlists</div>
                  </div>
                  <div>
                    <div className="font-display text-[34px] text-[var(--gold)] leading-none">3</div>
                    <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[rgba(244,237,225,0.5)] mt-2">Languages</div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-[rgba(244,237,225,0.08)] font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(244,237,225,0.55)]">
                  Tzfat · open to the world
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THREE PLATFORM CARDS */}
      <PlatformCards channelUrl={cfg.YT_CHANNEL_URL} spotifyUrl={cfg.SPOTIFY_URL} videoCount={meta.videoCount} playlistCount={playlists.length} />

      {/* FEATURED + SPOTIFY EMBED */}
      <section className="relative py-24 border-y border-[rgba(244,237,225,0.06)] ambient-stone">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Now Streaming</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-3xl">
              Begin <span className="font-display-i text-[var(--gold)]">here.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid lg:grid-cols-12 gap-6">
            {/* YouTube — most recent upload */}
            <Reveal delay={100} className="lg:col-span-8">
              <div className="rounded-sm overflow-hidden border border-[rgba(244,237,225,0.1)] bg-[#0a0705]">
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  {status === 'loading' && <SkeletonShimmer />}
                  {status === 'error' && <FallbackFrame channelUrl={cfg.YT_CHANNEL_URL} message="Couldn't reach YouTube." />}
                  {status === 'unconfigured' && <FallbackFrame channelUrl={cfg.YT_CHANNEL_URL} message="Connect YouTube to surface live classes." />}
                  {status === 'ready' && featured && (
                    <button onClick={() => setModalVideo(featured)} className="absolute inset-0 group block">
                      <img src={featured.thumbnail} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,16,10,0.92)] via-[rgba(20,16,10,0.2)] to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full play-pulse flex items-center justify-center btn-primary transition-transform group-hover:scale-110">
                          <svg width="26" height="32" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0v16l14-8z"/></svg>
                        </div>
                      </div>
                      <div className="absolute top-5 left-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e85959] flicker" />
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.6)]">Latest · YouTube</span>
                      </div>
                      <div className="absolute bottom-5 left-6 right-6 text-left">
                        <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--gold)] mb-2">{timeAgo(featured.publishedAt)}</div>
                        <div className="font-display text-[26px] sm:text-[34px] leading-[1.1] max-w-2xl line-clamp-2">{featured.title}</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] font-mono tracking-[0.18em] uppercase text-[rgba(244,237,225,0.5)]">
                <span>{cfg.YT_CHANNEL_URL.replace(/^https?:\/\//,'')}</span>
                <a href={cfg.YT_CHANNEL_URL} target="_blank" rel="noopener" className="hover:text-[var(--gold)] transition-colors">Open in YouTube →</a>
              </div>
            </Reveal>

            {/* Spotify embed */}
            <Reveal delay={200} className="lg:col-span-4">
              <SpotifyPanel embedUrl={cfg.SPOTIFY_EMBED_URL} fallbackUrl={cfg.SPOTIFY_URL} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* SPOTIFY AUDIO LIBRARY — tabbed grid */}
      <SpotifyLibrary />

      {/* FILTER + GRID */}
      <section className="relative py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <Reveal>
              <Eyebrow>Latest Teachings</Eyebrow>
              <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">Filter by playlist.</h2>
            </Reveal>
            {status === 'ready' && (
              <Reveal delay={100}>
                <a href={cfg.YT_CHANNEL_URL} target="_blank" rel="noopener" className="link-soft text-[12px] tracking-[0.18em] uppercase text-[var(--gold)]">
                  Full library on YouTube →
                </a>
              </Reveal>
            )}
          </div>

          {/* Filter pills */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              <PlaylistPill
                label="All"
                active={activePlaylist === 'all'}
                onClick={() => setActivePlaylist('all')}
              />
              {playlists.map(p => (
                <PlaylistPill
                  key={p.id}
                  label={p.title}
                  count={p.itemCount}
                  active={activePlaylist === p.id}
                  onClick={() => setActivePlaylist(p.id)}
                />
              ))}
              {status === 'loading' && [1,2,3,4,5].map(i => (
                <div key={i} className="h-9 w-24 rounded-full bg-[rgba(244,237,225,0.06)] animate-pulse" />
              ))}
            </div>
          </Reveal>

          {/* Grid */}
          {status === 'unconfigured' && <UnconfiguredState channelUrl={cfg.YT_CHANNEL_URL} />}
          {status === 'error' && <ErrorState message={error} channelUrl={cfg.YT_CHANNEL_URL} />}
          {(status === 'loading' || loadingList) && <SkeletonGrid />}
          {status === 'ready' && !loadingList && videos.length === 0 && (
            <EmptyState channelUrl={cfg.YT_CHANNEL_URL} />
          )}
          {status === 'ready' && !loadingList && videos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {rest.map((v, i) => (
                <Reveal key={v.id} delay={i * 50}>
                  <VideoCard video={v} onOpen={() => setModalVideo(v)} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={200}>
            <div className="mt-16 flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flicker" />
              <span>New teachings added automatically</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flicker" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative py-32 ambient-amber border-t border-[rgba(244,237,225,0.06)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full"
               style={{ background: 'radial-gradient(circle, rgba(232,166,87,0.12), transparent 65%)', transform: 'translate(-50%, -50%)' }} />
        </div>
        <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <Reveal>
            <Eyebrow>The Invitation</Eyebrow>
            <h2 className="font-display mt-6 text-[52px] sm:text-[88px] leading-[0.95] tracking-[-0.015em] text-balance">
              Bring the light <span className="font-display-i text-[var(--gold)]">into your week.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 text-[17px] leading-[1.7] text-[rgba(244,237,225,0.75)] max-w-2xl mx-auto">
              Pick one class. Press play. Let it move with you through whatever else this week is asking of you.
            </p>
            <div className="mt-12 flex flex-wrap gap-3 justify-center">
              <a href={cfg.YT_CHANNEL_URL} target="_blank" rel="noopener" className="btn-primary px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase font-medium">Watch Torah Classes</a>
              <a href={cfg.SPOTIFY_URL} target="_blank" rel="noopener" className="btn-ghost px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Listen to Audio Teachings</a>
              <button onClick={() => setRoute('newsletter')} className="btn-ghost px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Join the Newsletter</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MODAL */}
      {modalVideo && <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />}
    </div>
  );
}

// ---------- subcomponents ----------

function PlatformCards({ channelUrl, spotifyUrl, videoCount, playlistCount }) {
  const items = [
    {
      id: 'youtube',
      name: 'YouTube Teachings',
      desc: "Watch Rav Avshi's classes, shiurim, conversations, and spiritual teachings.",
      cta: 'Watch on YouTube',
      href: channelUrl,
      glow: 'rgba(232, 89, 89, 0.35)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M23 9.7c0-1.4-1.1-2.5-2.5-2.5C18.2 7 12 7 12 7s-6.2 0-8.5.2C2.1 7.2 1 8.3 1 9.7.8 11.2.8 12.7.8 14.2c0 1.5 0 3 .2 4.5 0 1.4 1.1 2.5 2.5 2.5 2.3.2 8.5.2 8.5.2s6.2 0 8.5-.2c1.4 0 2.5-1.1 2.5-2.5.2-1.5.2-3 .2-4.5s0-3-.2-4.5zM9.7 16.4V8l6.3 4.2-6.3 4.2z"/>
        </svg>
      ),
      meta: videoCount ? `${videoCount} videos · auto-synced` : 'Auto-synced from channel'
    },
    {
      id: 'spotify',
      name: 'Spotify Audio Classes',
      desc: 'Listen to Torah teachings, music, niggunim, and inspiration wherever you are.',
      cta: 'Listen on Spotify',
      href: spotifyUrl,
      glow: 'rgba(30, 215, 96, 0.35)',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.5 17.3c-.2.4-.6.5-1 .3-2.8-1.7-6.3-2-10.4-1.1-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.5-1 8.4-.6 11.5 1.3.4.2.5.7.2 1zm1.5-3.3c-.3.4-.8.6-1.3.3-3.2-2-8.1-2.5-11.9-1.4-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 4.3-1.3 9.7-.7 13.4 1.6.4.2.6.8.4 1.3zm.1-3.4C15.4 8.4 8.5 8.2 4.6 9.4c-.6.2-1.3-.2-1.5-.8-.2-.6.2-1.3.8-1.5C8.4 5.7 16 5.9 20.4 8.5c.6.4.8 1.1.5 1.7-.4.5-1.2.7-1.8.4z"/>
        </svg>
      ),
      meta: 'Live Spotify embed'
    },
    {
      id: 'live',
      name: 'Weekly & Live Classes',
      desc: 'Join current classes, special series, and upcoming live teachings from Tzfat and around the world.',
      cta: 'View Upcoming Classes',
      href: channelUrl,
      glow: 'rgba(232, 166, 87, 0.45)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" />
        </svg>
      ),
      meta: playlistCount ? `${playlistCount} playlists` : 'Live + recorded'
    }
  ];
  return (
    <section className="relative py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <Reveal>
          <Eyebrow>Where to Listen, Where to Watch</Eyebrow>
          <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-3xl">Three doors into the teaching.</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <a href={p.href} target="_blank" rel="noopener" className="group relative block h-full p-8 sm:p-10 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(20,16,10,0.55)] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(202,164,92,0.4)]">
                <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                     style={{ background: `radial-gradient(60% 50% at 50% 0%, ${p.glow}, transparent 70%)` }} />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center border border-[rgba(244,237,225,0.15)] bg-[rgba(244,237,225,0.04)] text-[var(--parchment)] mb-7 transition-colors group-hover:text-[var(--gold)] group-hover:border-[rgba(202,164,92,0.5)]">
                    {p.icon}
                  </div>
                  <h3 className="font-display text-[30px] sm:text-[32px] leading-[1.1]">{p.name}</h3>
                  <p className="mt-4 text-[15px] leading-[1.7] text-[rgba(244,237,225,0.7)]">{p.desc}</p>
                  <div className="mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.45)]">{p.meta}</div>
                  <div className="mt-8 inline-flex items-center gap-3 text-[12px] tracking-[0.18em] uppercase btn-ghost px-5 py-3 rounded-full group-hover:border-[rgba(202,164,92,0.5)] group-hover:text-[var(--gold)] transition-colors">
                    {p.cta}<span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotifyPanel({ embedUrl, fallbackUrl }) {
  // Small right-column "Now Streaming" preview. Lists the first 3 episode
  // IDs from CLASSES_CONFIG.SPOTIFY_EPISODES.latest. Click → expand inline.
  const c = CLASSES_CONFIG;
  const previewIds = (c.SPOTIFY_EPISODES?.latest || []).slice(0, 3);
  const [meta, setMeta] = useState({});
  const [open, setOpen] = useState(null);

  useEffect(() => {
    let cancelled = false;
    previewIds.forEach(id => {
      if (meta[id]) return;
      spotifyOEmbed(id).then(d => { if (!cancelled) setMeta(m => ({ ...m, [id]: d })); }).catch(() => {});
    });
    return () => { cancelled = true; };
  }, [previewIds.join(',')]);

  // Fallback: no episode IDs configured → tasteful prompt + full show link.
  if (previewIds.length === 0) {
    return (
      <div className="rounded-sm overflow-hidden border border-[rgba(244,237,225,0.1)] bg-[rgba(20,16,10,0.7)] backdrop-blur-md h-full flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-[rgba(244,237,225,0.06)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] flicker" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.65)]">Spotify · Audio</span>
        </div>
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center gap-5 min-h-[360px]">
          <div className="w-16 h-16 rounded-full flex items-center justify-center border border-[rgba(30,215,96,0.3)] bg-[rgba(30,215,96,0.06)] text-[#1ed760]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.5 17.3c-.2.4-.6.5-1 .3-2.8-1.7-6.3-2-10.4-1.1-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.5-1 8.4-.6 11.5 1.3.4.2.5.7.2 1zm1.5-3.3c-.3.4-.8.6-1.3.3-3.2-2-8.1-2.5-11.9-1.4-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 4.3-1.3 9.7-.7 13.4 1.6.4.2.6.8.4 1.3zm.1-3.4C15.4 8.4 8.5 8.2 4.6 9.4c-.6.2-1.3-.2-1.5-.8-.2-.6.2-1.3.8-1.5C8.4 5.7 16 5.9 20.4 8.5c.6.4.8 1.1.5 1.7-.4.5-1.2.7-1.8.4z"/>
            </svg>
          </div>
          <div>
            <div className="font-display text-[22px]">Audio library, coming online</div>
            <p className="text-[13px] text-[rgba(244,237,225,0.55)] mt-2 max-w-xs mx-auto">
              Browse the full show on Spotify, or add episode IDs to <code className="font-mono text-[11px] text-[var(--gold)]">SPOTIFY_EPISODES</code> in <code className="font-mono text-[11px] text-[var(--gold)]">pages3.jsx</code> to feature them here.
            </p>
          </div>
          <a href={fallbackUrl} target="_blank" rel="noopener" className="font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.6)] hover:text-[#1ed760] transition-colors">Open Spotify show →</a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm overflow-hidden border border-[rgba(244,237,225,0.1)] bg-[rgba(20,16,10,0.7)] backdrop-blur-md h-full flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-[rgba(244,237,225,0.06)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] flicker" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.65)]">Spotify · Latest</span>
      </div>
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
        {previewIds.map(id => {
          const m = meta[id];
          const isOpen = open === id;
          return (
            <div key={id} className="rounded-sm overflow-hidden border border-[rgba(244,237,225,0.06)] bg-[rgba(244,237,225,0.02)] transition-colors hover:border-[rgba(30,215,96,0.3)]">
              <button onClick={() => setOpen(isOpen ? null : id)} className="w-full flex items-center gap-3 p-3 text-left">
                <div className="w-12 h-12 shrink-0 rounded-sm overflow-hidden bg-[rgba(244,237,225,0.05)]">
                  {m?.thumbnail_url
                    ? <img src={m.thumbnail_url} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full animate-pulse" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[15px] leading-tight line-clamp-2">{m?.title || 'Loading…'}</div>
                </div>
                <span className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center border border-[rgba(244,237,225,0.15)] text-[rgba(244,237,225,0.7)] hover:text-[#1ed760] hover:border-[#1ed760] transition-colors">
                  <svg width="9" height="11" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0v16l14-8z"/></svg>
                </span>
              </button>
              {isOpen && (
                <iframe src={`https://open.spotify.com/embed/episode/${id}?utm_source=generator&theme=0`} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title={m?.title || 'Spotify episode'}></iframe>
              )}
            </div>
          );
        })}
      </div>
      <a href={fallbackUrl} target="_blank" rel="noopener" className="block px-6 py-4 border-t border-[rgba(244,237,225,0.06)] text-center font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.6)] hover:text-[#1ed760] transition-colors">
        Open full show on Spotify →
      </a>
    </div>
  );
}

// ---- Spotify Audio Library — tabbed grid ----
function SpotifyLibrary() {
  const c = CLASSES_CONFIG;
  const tabs = [
    { id: 'latest', label: 'Latest' },
    { id: 'torah', label: 'Torah Classes' },
    { id: 'nigunim', label: 'Nigunim' },
    { id: 'conversations', label: 'Conversations' },
    { id: 'music', label: 'Music' }
  ];
  const [active, setActive] = useState('latest');
  const [livePool, setLivePool] = useState(null); // null = not attempted, [] = failed
  const [meta, setMeta] = useState({});
  const [openId, setOpenId] = useState(null);

  // Try live Spotify API (only if backend token URL is configured)
  useEffect(() => {
    if (!c.SPOTIFY_TOKEN_URL || !c.SPOTIFY_SHOW_ID) return;
    fetchSpotifyEpisodesLive(c.SPOTIFY_SHOW_ID, 24)
      .then(eps => setLivePool(eps || []))
      .catch(() => setLivePool([]));
  }, []);

  // Episode list for active tab
  const ids = c.SPOTIFY_EPISODES?.[active] || [];
  const liveEpisodes = livePool && active === 'latest' ? livePool : null;
  const showEmpty = ids.length === 0 && !liveEpisodes;

  // Fetch oEmbed metadata for any configured IDs we don't have yet
  useEffect(() => {
    let cancelled = false;
    ids.forEach(id => {
      if (meta[id]) return;
      spotifyOEmbed(id).then(d => { if (!cancelled) setMeta(m => ({ ...m, [id]: d })); }).catch(() => {});
    });
    return () => { cancelled = true; };
  }, [ids.join(',')]);

  return (
    <section className="relative py-24 border-b border-[rgba(244,237,225,0.06)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <Reveal>
            <Eyebrow>Spotify Audio Library</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">Latest Audio Classes.</h2>
          </Reveal>
          <Reveal delay={100}>
            <a href={c.SPOTIFY_URL} target="_blank" rel="noopener" className="link-soft text-[12px] tracking-[0.18em] uppercase text-[#1ed760]">
              Full show on Spotify →
            </a>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase rounded-full border transition-colors ${active===t.id?'border-[#1ed760] text-[#1ed760] bg-[rgba(30,215,96,0.06)]':'border-[rgba(244,237,225,0.15)] text-[rgba(244,237,225,0.65)] hover:border-[rgba(244,237,225,0.35)]'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {showEmpty ? (
          <SpotifyShowFallback showUrl={c.SPOTIFY_URL} embedUrl={c.SPOTIFY_EMBED_URL} tabLabel={tabs.find(t=>t.id===active).label} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(liveEpisodes && liveEpisodes.length
              ? liveEpisodes
              : ids.map(id => ({ id, ...(meta[id] ? { title: meta[id].title, thumbnail: meta[id].thumbnail_url } : {}) }))
            ).map((ep, i) => (
              <Reveal key={ep.id} delay={i * 50}>
                <SpotifyEpisodeCard
                  episode={ep}
                  open={openId === ep.id}
                  onOpen={() => setOpenId(openId === ep.id ? null : ep.id)}
                />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={200}>
          <div className="mt-14 flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] flicker" />
            <span>New episodes added automatically</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] flicker" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpotifyEpisodeCard({ episode, open, onOpen }) {
  const dur = episode.durationMs ? Math.round(episode.durationMs / 60000) + ' min' : null;
  const date = episode.publishedAt ? timeAgo(episode.publishedAt) : null;
  return (
    <article className="group rounded-sm border border-[rgba(244,237,225,0.1)] overflow-hidden bg-[rgba(244,237,225,0.015)] transition-colors hover:border-[rgba(30,215,96,0.4)]">
      <button onClick={onOpen} className="block w-full text-left">
        <div className="relative" style={{ aspectRatio: '1/1' }}>
          {episode.thumbnail
            ? <img src={episode.thumbnail} alt={episode.title || ''} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            : <div className="absolute inset-0 animate-pulse bg-[rgba(244,237,225,0.04)]" />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,16,10,0.85)] via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(20,16,10,0.7)] backdrop-blur-sm border border-[rgba(244,237,225,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] flicker" />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.75)]">Spotify</span>
          </div>
          <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: '#1ed760', color: '#0a0705' }}>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0v16l14-8z"/></svg>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-[20px] leading-[1.15] line-clamp-2 min-h-[48px]">{episode.title || 'Loading…'}</h3>
          <div className="mt-2 flex items-center gap-3 text-[12px] text-[rgba(244,237,225,0.55)]">
            {date && <span>{date}</span>}
            {date && dur && <span className="opacity-40">·</span>}
            {dur && <span>{dur}</span>}
          </div>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <iframe src={`https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator&theme=0`} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title={episode.title || 'Spotify episode'}></iframe>
        </div>
      )}
      <div className="px-5 pb-5 -mt-1 flex items-center justify-between">
        <a href={`https://open.spotify.com/episode/${episode.id}`} target="_blank" rel="noopener" className="link-soft text-[11px] tracking-[0.2em] uppercase text-[rgba(244,237,225,0.55)] hover:text-[#1ed760]">
          Listen on Spotify →
        </a>
      </div>
    </article>
  );
}

function SpotifyShowFallback({ showUrl, embedUrl, tabLabel }) {
  // When a tab has no episode IDs configured, render the full show
  // embed at generous height so users can still browse all episodes
  // straight from Spotify. Auto-updates from Spotify by design.
  return (
    <div className="rounded-sm overflow-hidden border border-[rgba(244,237,225,0.1)] bg-[rgba(20,16,10,0.5)]">
      <div className="p-5 sm:p-6 flex items-center justify-between gap-4 border-b border-[rgba(244,237,225,0.06)]">
        <div>
          <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[rgba(244,237,225,0.55)]">{tabLabel} · browsing all episodes</div>
          <h3 className="font-display mt-1 text-[20px]">Browse the full show.</h3>
        </div>
        <a href={showUrl} target="_blank" rel="noopener" className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.6)] hover:text-[#1ed760] transition-colors">Open in Spotify →</a>
      </div>
      <iframe src={embedUrl} width="100%" height="560" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify Show"></iframe>
    </div>
  );
}

function PlaylistPill({ label, count, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase rounded-full border transition-colors flex items-center gap-2 ${active ? 'border-[var(--gold)] text-[var(--gold)] bg-[rgba(232,166,87,0.06)]' : 'border-[rgba(244,237,225,0.15)] text-[rgba(244,237,225,0.65)] hover:border-[rgba(244,237,225,0.35)]'}`}>
      <span>{label}</span>
      {count != null && <span className="opacity-50">{count}</span>}
    </button>
  );
}

function VideoCard({ video, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="event-card group block rounded-sm border border-[rgba(244,237,225,0.1)] overflow-hidden bg-[rgba(244,237,225,0.015)] cursor-pointer">
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className={`absolute inset-0 flex items-center justify-center bg-[rgba(20,16,10,0.55)] transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-14 h-14 rounded-full btn-primary flex items-center justify-center">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0v16l14-8z"/></svg>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(20,16,10,0.7)] backdrop-blur-sm border border-[rgba(244,237,225,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e85959] flicker" />
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.75)]">YouTube</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-[19px] leading-[1.2] line-clamp-2">{video.title}</h3>
        <div className="mt-2 text-[12px] text-[rgba(244,237,225,0.55)]">{timeAgo(video.publishedAt)}</div>
      </div>
    </article>
  );
}

function VideoModal({ video, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-10 py-8 animate-[fadeIn_300ms_ease]"
         onClick={onClose}
         style={{ background: 'rgba(8,5,3,0.92)', backdropFilter: 'blur(14px)' }}>
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[rgba(244,237,225,0.2)] text-[rgba(244,237,225,0.8)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors flex items-center justify-center font-mono text-lg">×</button>
      <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">{timeAgo(video.publishedAt)}</div>
        <h3 className="font-display text-[24px] sm:text-[32px] leading-[1.1] mb-5 pr-12">{video.title}</h3>
        <div className="relative rounded-sm overflow-hidden border border-[rgba(244,237,225,0.12)]" style={{ aspectRatio: '16/9' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={video.title}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-[12px] font-mono tracking-[0.18em] uppercase text-[rgba(244,237,225,0.5)]">
          <span>YouTube · Rav Avshi</span>
          <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener" className="hover:text-[var(--gold)] transition-colors">Open on YouTube →</a>
        </div>
      </div>
    </div>
  );
}

function SkeletonShimmer() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(110deg, rgba(244,237,225,0.04) 0%, rgba(244,237,225,0.08) 40%, rgba(244,237,225,0.04) 80%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.6s linear infinite'
      }} />
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[1,2,3,4,5,6,7,8].map(i => (
        <div key={i} className="rounded-sm border border-[rgba(244,237,225,0.06)] overflow-hidden bg-[rgba(244,237,225,0.015)]">
          <div className="relative" style={{ aspectRatio: '16/9' }}><SkeletonShimmer /></div>
          <div className="p-5 space-y-3">
            <div className="h-4 w-full rounded bg-[rgba(244,237,225,0.06)] animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-[rgba(244,237,225,0.06)] animate-pulse" />
            <div className="h-3 w-1/3 rounded bg-[rgba(244,237,225,0.04)] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FallbackFrame({ channelUrl, message }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 text-center" style={{
      background: 'linear-gradient(160deg, #2a1d12 0%, #14100a 100%)'
    }}>
      <div className="max-w-sm">
        <div className="font-display text-[28px] leading-tight">{message}</div>
        <p className="mt-3 text-[14px] text-[rgba(244,237,225,0.6)]">Watch the full library directly on Rav Avshi's channel.</p>
        <a href={channelUrl} target="_blank" rel="noopener" className="mt-6 inline-block btn-primary px-6 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Open YouTube channel →</a>
      </div>
    </div>
  );
}

function UnconfiguredState({ channelUrl }) {
  return (
    <div className="p-10 sm:p-14 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)] text-center">
      <Eyebrow>One-time setup needed</Eyebrow>
      <h3 className="font-display mt-4 text-[32px] leading-tight">Connect YouTube to go live.</h3>
      <p className="mt-4 text-[15px] text-[rgba(244,237,225,0.7)] max-w-xl mx-auto leading-relaxed">
        Open <code className="font-mono text-[13px] text-[var(--gold)]">pages3.jsx</code>, paste your <code className="font-mono text-[13px] text-[var(--gold)]">YT_API_KEY</code> and <code className="font-mono text-[13px] text-[var(--gold)]">YT_CHANNEL_ID</code> into <code className="font-mono text-[13px] text-[var(--gold)]">CLASSES_CONFIG</code>, save, and refresh. The page will start pulling live videos and playlists.
      </p>
      <a href={channelUrl} target="_blank" rel="noopener" className="mt-7 inline-block btn-primary px-6 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Open YouTube channel →</a>
    </div>
  );
}

function EmptyState({ channelUrl }) {
  return (
    <div className="p-14 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)] text-center">
      <h3 className="font-display text-[28px]">No videos found in this playlist.</h3>
      <p className="mt-3 text-[14px] text-[rgba(244,237,225,0.6)]">Try a different filter, or browse the full channel.</p>
      <a href={channelUrl} target="_blank" rel="noopener" className="mt-6 inline-block btn-ghost px-6 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Open YouTube →</a>
    </div>
  );
}

function ErrorState({ message, channelUrl }) {
  return (
    <div className="p-14 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)] text-center">
      <Eyebrow tone="muted">YouTube unavailable</Eyebrow>
      <h3 className="font-display mt-4 text-[28px]">We couldn't reach YouTube just now.</h3>
      <p className="mt-3 text-[13px] text-[rgba(244,237,225,0.5)] font-mono">{message}</p>
      <a href={channelUrl} target="_blank" rel="noopener" className="mt-6 inline-block btn-primary px-6 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Watch on YouTube →</a>
    </div>
  );
}

export { TorahClassesPage };
