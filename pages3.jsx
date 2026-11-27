// ============================================================
// Torah Classes — one playable class first, then a searchable list.
// The list comes from /api/classes (the YouTube channel's public
// feed, no API key needed) and falls back to CLASSES in content.jsx.
// Every class also links straight to YouTube, and the podcast to
// Spotify, in case an embed is blocked.
// ============================================================

const CLASS_TAGS = ['All', 'Parasha', 'Rebbe Nachman', 'Meditation', 'Prayer', 'Inner Torah', 'Farbrengen'];

function TorahClassesPage() {
  const { list, source } = useClasses();
  const [selId, setSelId] = useState(null);
  const [autostart, setAutostart] = useState(false);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('All');
  const playerRef = useRef(null);

  const sel = list.find(c => c.id === selId) || list[0];
  const tags = CLASS_TAGS.filter(t => t === 'All' || list.some(c => c.tag === t));
  const shown = list.filter(c =>
    (tag === 'All' || c.tag === tag) &&
    (!q.trim() || (c.title + ' ' + (c.summary || '') + ' ' + (c.series || '')).toLowerCase().includes(q.trim().toLowerCase())));

  const pick = (c) => {
    setSelId(c.id); setAutostart(true);
    playerRef.current && playerRef.current.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="page">
      <section className="section-tight" style={{ paddingTop: 24 }} ref={playerRef}>
        <div className="wrap split wide-left" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Torah classes</div>
            <YouTubePlayer key={sel.id} id={sel.id} title={sel.title} sec={sel.sec} date={sel.date} autostart={autostart} />
          </div>
          <div className="stack" style={{ '--stack': '12px' }}>
            <h1 className="h2" tabIndex="-1" data-page-title>{sel.title}</h1>
            {sel.summary && <p>{sel.summary}</p>}
            <div className="btn-row" style={{ gap: '8px 18px' }}>
              {sel.spotifyEpisode
                ? <a className="text-link" href={'https://open.spotify.com/episode/' + sel.spotifyEpisode} target="_blank" rel="noopener noreferrer">Listen on Spotify ↗</a>
                : <a className="text-link" href={LINKS.spotifyShow} target="_blank" rel="noopener noreferrer">Podcast on Spotify ↗</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight stone" aria-labelledby="find-title">
        <div className="wrap">
          <h2 id="find-title" className="h3" style={{ fontSize: 28 }}>Find a class</h2>
          <label className="search" style={{ marginTop: 14 }}>
            <Icon.search />
            <span className="sr-only">Search classes</span>
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search by topic or parasha" enterKeyHint="search" />
          </label>
          <div className="scroll-x" style={{ marginTop: 12 }} role="group" aria-label="Filter by topic">
            {tags.map(t => <button key={t} className="chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{t}</button>)}
          </div>

          <ul style={{ marginTop: 12 }} aria-live="polite">
            {shown.map(c => (
              <li key={c.id}>
                <button className="class-row" onClick={() => pick(c)} aria-current={c.id === sel.id ? 'true' : undefined}>
                  <span className="class-thumb">
                    <img src={ytThumb(c.id)} alt="" loading="lazy" decoding="async" />
                    {c.sec ? <span className="len">{fmtDuration(c.sec)}</span> : null}
                  </span>
                  <span>
                    <span className="class-title" style={{ display: 'block' }}>{c.title}</span>
                    <span className="class-meta" style={{ display: 'block' }}>{fmtDate(c.date)} · {c.tag}{c.id === sel.id ? ' · now playing' : ''}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {shown.length === 0 && (
            <div className="card" style={{ marginTop: 16 }}>
              <p>No classes match{q ? <> “{q}”</> : ''}{tag !== 'All' ? <> in {tag}</> : ''}.</p>
              <button className="text-link" style={{ minHeight: 44 }} onClick={() => { setQ(''); setTag('All'); }}>Show all classes</button>
            </div>
          )}
          <p className="small" style={{ marginTop: 16 }}>
            {source === 'live' ? 'Newest classes from the YouTube channel.' : 'Recent classes as of 26 Nov 2026.'}{' '}
            <a className="text-link" href={LINKS.youtube} target="_blank" rel="noopener noreferrer">Full library on YouTube ↗</a>
          </p>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="series-title">
        <div className="wrap">
          <h2 id="series-title" className="h3" style={{ fontSize: 28 }}>Series</h2>
          <div className="btn-row" style={{ marginTop: 14, gap: 8 }}>
            {PLAYLISTS.map(p => <a key={p.id} className="chip" href={ytPlaylist(p.id)} target="_blank" rel="noopener noreferrer">{p.title} ↗</a>)}
          </div>
        </div>
      </section>

      <section className="section-tight ink">
        <div className="wrap grid-2" style={{ alignItems: 'center' }}>
          <div className="stack" style={{ '--stack': '8px' }}>
            <h2 className="h3">Prefer to listen?</h2>
            <p>Every class is also published as a podcast.</p>
          </div>
          <SpotifyEmbed kind="show" id="2EoY2HZTKuBOnVxt2W7NgK" cta="Play the podcast" height={352} title="Rav Avshi Weingot podcast on Spotify" />
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { TorahClassesPage });
