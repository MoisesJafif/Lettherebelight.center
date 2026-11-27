const { useState, useEffect, useRef, useMemo, useCallback } = React;

// Donation page (Steady Connection, card payments by Stripe). Every donate button links here.
const DONATE_URL = LINKS.donate;

// ---------- small helpers ----------
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useReducedMotion() {
  const [r, setR] = useState(prefersReducedMotion());
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on));
  }, []);
  return r;
}

// Opens the WhatsApp concierge with a topic (and optional note) pre-filled.
function openWA(topic, notes) {
  window.dispatchEvent(new CustomEvent('yo:open-wa', { detail: { topic, notes } }));
}

// Fade-in on first view (CSS handles reduced motion).
function Rv({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`rv ${className}`} {...rest}>{children}</Tag>;
}

// ---------- icons ----------
const Icon = {
  arrow: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M4 10h12M11 5l5 5-5 5"/></svg>,
  back: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M16 10H4M9 5l-5 5 5 5"/></svg>,
  out: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M8 4H4v12h12v-4M11 4h5v5M16 4l-7 7"/></svg>,
  play: (p) => <svg viewBox="0 0 16 18" fill="currentColor" aria-hidden="true" {...p}><path d="M0 0v18l16-9z"/></svg>,
  down: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M10 4v12M5 11l5 5 5-5"/></svg>,
  search: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...p}><circle cx="9" cy="9" r="6"/><path d="M14 14l4 4"/></svg>,
  wa: (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .1-3.3-.7-2.7-1-4.4-3.8-4.5-3.9-.1-.2-1-1.4-1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8s.1.3 0 .5c-.1.2-.2.3-.4.5-.1.1-.3.3-.1.5.1.3.7 1.1 1.5 1.8 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.1.1.7-.1 1.3z"/></svg>,
  yt: (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z"/></svg>,
  sp: (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21zm4.8 15.1a.7.7 0 0 1-.9.2c-2.5-1.5-5.6-1.8-9.3-1a.7.7 0 1 1-.3-1.3c4-.9 7.5-.5 10.3 1.2.3.2.4.6.2.9zm1.3-2.9a.8.8 0 0 1-1.1.3c-2.8-1.7-7.1-2.2-10.5-1.2a.8.8 0 1 1-.5-1.6c3.8-1.1 8.6-.6 11.8 1.4.4.3.5.8.3 1.1zm.1-3c-3.4-2-8.9-2.2-12.1-1.2a1 1 0 1 1-.6-1.9c3.7-1.1 9.8-.9 13.7 1.4a1 1 0 0 1-1 1.7z"/></svg>,
};

// ---------- navigation model ----------
// Five groups. Every existing route stays reachable; secondary routes live inside a group.
const NAV = [
  { id: 'learn', label: 'Learn', href: '#classes', items: [
    { href: '#classes', label: 'Torah classes', note: 'Watch or listen to recent shiurim' },
    { href: '#teaching', label: 'Teaching & path', note: 'Mind, heart and experience' },
  ]},
  { id: 'listen', label: 'Listen', href: '#music', items: [
    { href: '#music', label: 'Music', note: 'Adam Kadmon and live niggunim' },
    { href: LINKS.spotifyShow, label: 'Podcast on Spotify', note: 'Every class as audio', external: true },
  ]},
  { id: 'visit', label: 'Visit', href: '#yehi-ohr', items: [
    { href: '#yehi-ohr', label: 'Yehi Ohr Center', note: 'Tzfat · ask about visiting' },
    { href: '#tours', label: 'Tours & seminars', note: 'Uman, Tzfat and gatherings' },
    { href: '#community', label: 'Shabbat & community', note: 'Ask about joining a Shabbat' },
    { href: '#faq', label: 'Practical questions', note: 'Visiting, Shabbat, languages' },
  ]},
  { id: 'about', label: 'About', href: '#rav-avshi', items: [
    { href: '#rav-avshi', label: 'Rav Avshi', note: 'His story, in his words' },
    { href: '#vision', label: 'Vision', note: 'What exists and what is planned' },
    { href: '#contact', label: 'Contact', note: 'WhatsApp and updates' },
  ]},
  { id: 'support', label: 'Support', href: '#support', items: [
    { href: '#support', label: 'Give', note: 'Monthly or one-time' },
    { href: '#merch', label: 'Merch', note: 'The Let There Be Light collection' },
  ]},
];
const ROUTE_GROUP = {
  classes: 'learn', 'torah-classes': 'learn', teaching: 'learn',
  music: 'listen',
  'yehi-ohr': 'visit', visit: 'visit', tours: 'visit', community: 'visit', faq: 'visit',
  'rav-avshi': 'about', vision: 'about', contact: 'about', newsletter: 'about',
  support: 'support', merch: 'support',
};

function NavLink({ item, route, className = '', onClick }) {
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{item.children || item.label}</a>;
  }
  const current = item.href === '#' + route;
  return <a href={item.href} className={className} aria-current={current ? 'page' : undefined} onClick={onClick}>{item.children || item.label}</a>;
}

// ---------- Header ----------
function Header({ route }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef(null);
  const btnRef = useRef(null);
  const isHome = route === 'home';

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current && btnRef.current.focus(); } };
    window.addEventListener('keydown', onKey);
    const first = sheetRef.current && sheetRef.current.querySelector('a');
    first && first.focus({ preventScroll: true });
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const group = ROUTE_GROUP[route];

  return (
    <>
      <header className={`site-header ${isHome && !scrolled && !open ? 'over-hero' : ''}`}>
        <div className="wrap header-row">
          <a href="#home" className="brand" aria-label="Yehi Ohr — home">
            <span className="brand-flame" aria-hidden="true" />
            <span className="brand-name">Yehi Ohr</span>
            <span className="brand-he" lang="he" dir="rtl" aria-hidden="true">יהי אור</span>
          </a>

          <nav className="desk-nav" aria-label="Main">
            {NAV.map(g => (
              <div className="desk-group" key={g.id}>
                <a href={g.href} className="desk-link" aria-current={group === g.id ? 'page' : undefined}>{g.label}</a>
                <div className="desk-pop">
                  {g.items.map(it => (
                    <NavLink key={it.href} route={route} item={{ ...it, children: <>{it.label}{it.external ? ' ↗' : ''}<small>{it.note}</small></> }} />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="icon-btn wa" aria-label="WhatsApp Rav Avshi's team">
            <Icon.wa /><span className="wa-label">WhatsApp</span>
          </a>
          <button ref={btnRef} className="icon-btn menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(o => !o)}>
            <span className="bars" aria-hidden="true" /><span>{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <div id="site-menu" ref={sheetRef} className={`sheet ${open ? 'open' : ''}`} aria-hidden={!open} role="dialog" aria-label="Site menu">
        <nav aria-label="Main">
          {NAV.map(g => (
            <div className="sheet-group" key={g.id}>
              <a className="sheet-title" href={g.href} tabIndex={open ? 0 : -1}>{g.label}<Icon.arrow width="22" height="22" /></a>
              <div className="sheet-links">
                {g.items.map(it => (
                  <NavLink key={it.href} route={route} item={{ ...it, children: <><span>{it.label}</span><span className="small" style={{ color: 'var(--on-ink-faint)' }}>{it.external ? '↗' : ''}</span></> }}
                    onClick={() => setOpen(false)} className="" />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="sheet-foot">
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-candle btn-block" tabIndex={open ? 0 : -1}><Icon.wa />WhatsApp {LINKS.whatsappNumber}</a>
          <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-block" style={{ borderColor: 'rgba(246,239,227,.4)', color: 'var(--on-ink)' }} tabIndex={open ? 0 : -1}>Give to Yehi Ohr ↗</a>
        </div>
      </div>
    </>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="brand" style={{ margin: 0 }}>
              <span className="brand-flame" aria-hidden="true" />
              <span className="brand-name">Yehi Ohr</span>
              <span className="brand-he" lang="he" dir="rtl">יהי אור</span>
            </div>
            <p className="small" style={{ marginTop: 10, maxWidth: '26em' }}>Torah, music and Shabbat with Rav Avshi Weingot · Old City, Tzfat.</p>
          </div>
          <div className="btn-row">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-candle"><Icon.wa />WhatsApp</a>
          </div>
        </div>
        <nav className="foot-cols" aria-label="Footer">
          {NAV.map(g => (
            <div key={g.id}>
              <h3>{g.label}</h3>
              <ul>
                {g.items.map(it => <li key={it.href}><NavLink item={{ ...it, children: it.label + (it.external ? ' ↗' : '') }} route="" /></li>)}
              </ul>
            </div>
          ))}
        </nav>
        <div className="foot-base">
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
          <a href={LINKS.spotifyShow} target="_blank" rel="noopener noreferrer">Spotify ↗</a>
          <a href={LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer">WhatsApp community ↗</a>
          <a href="#newsletter">Updates</a>
          <span style={{ marginInlineStart: 'auto' }}>© Yehi Ohr · Tzfat</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Photo with provenance ----------
function Photo({ p, aspect = '4/5', position = 'center', className = '', eager = false, showBadge = true, style }) {
  if (!p) return null;
  return (
    <div className={`photo ${className}`} style={{ aspectRatio: aspect, ...style }}>
      <img src={p.src} alt={p.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: position }} />
      {showBadge && <Provenance kind={p.kind} />}
    </div>
  );
}
function Provenance({ kind }) {
  if (kind === 'render') return <span className="badge badge-render"><span>Render</span></span>;
  if (kind === 'plan') return <span className="badge badge-plan"><span>Plan</span></span>;
  if (kind === 'story') return <span className="badge badge-story"><span>Storyboard</span></span>;
  return null; // documentary photos carry no badge
}

// ---------- YouTube (poster first, iframe on tap — sound is always visitor-initiated) ----------
function YouTubePlayer({ id, title, sec, date, compact = false, label, autostart = false }) {
  const [on, setOn] = useState(autostart);
  return (
    <div>
      <div className="player">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
            title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <button className="player-poster" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
            <img src={ytThumb(id)} alt="" loading="lazy" decoding="async" />
            <span className="play-dot"><Icon.play /></span>
          </button>
        )}
      </div>
      {!compact && (
        <div className="player-meta">
          {label && <span className="eyebrow">{label}</span>}
          {sec ? <span>{fmtDuration(sec)}</span> : null}
          {date ? <span>{fmtDate(date)}</span> : null}
          <a className="text-link" href={ytWatch(id)} target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a>
        </div>
      )}
    </div>
  );
}

// Spotify embed loads only when asked for (third-party, heavy on phones).
function SpotifyEmbed({ kind = 'show', id, height = 232, title = 'Spotify player', cta = 'Load the Spotify player' }) {
  const [on, setOn] = useState(false);
  const url = `https://open.spotify.com/${kind}/${id}`;
  if (!on) {
    return (
      <div className="btn-row">
        <button className="btn btn-line" onClick={() => setOn(true)}><Icon.sp />{cta}</button>
        <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">Open in Spotify ↗</a>
      </div>
    );
  }
  return (
    <div>
      <div className="spotify-frame">
        <iframe src={`https://open.spotify.com/embed/${kind}/${id}?utm_source=generator&theme=0`} height={height} title={title}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
      </div>
      <p className="small" style={{ marginTop: 8 }}>Player not showing? <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">Open in Spotify ↗</a></p>
    </div>
  );
}

// ---------- latest classes (live feed with verified fallback) ----------
let __classesCache = null;
function useClasses() {
  const [list, setList] = useState(__classesCache || CLASSES);
  const [source, setSource] = useState(__classesCache ? 'live' : 'saved');
  useEffect(() => {
    if (__classesCache) return;
    let dead = false;
    fetch('/api/classes', { headers: { accept: 'application/json' } })
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(d => {
        if (dead || !d || !Array.isArray(d.items) || !d.items.length) return;
        const known = Object.fromEntries(CLASSES.map(c => [c.id, c]));
        const merged = d.items.map(it => ({ ...(known[it.id] || {}), ...it, sec: (known[it.id] || {}).sec || it.sec, summary: (known[it.id] || {}).summary || it.summary || '', tag: tagFor(it.title) }));
        __classesCache = merged; setList(merged); setSource('live');
      })
      .catch(() => {});
    return () => { dead = true; };
  }, []);
  return { list, source };
}

// ---------- page opener (photo + concise lead + one action) ----------
function Opener({ photo, position, eyebrow, title, children, actions, badge = true }) {
  return (
    <section className="opener">
      <div className="opener-media">
        <img src={photo.src} alt={photo.alt} style={{ objectPosition: position || 'center' }} />
        {badge && <Provenance kind={photo.kind} />}
      </div>
      <div className="opener-copy on-photo">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="display" style={{ marginTop: 10 }} tabIndex="-1" data-page-title>{title}</h1>
        {children && <div className="lede" style={{ marginTop: 16, color: 'var(--on-ink-soft)' }}>{children}</div>}
        {actions && <div className="btn-row" style={{ marginTop: 24 }}>{actions}</div>}
      </div>
    </section>
  );
}

// Plain lead for text-first pages.
function Lead({ eyebrow, title, children, actions, className = '' }) {
  return (
    <section className={`lead ${className}`}>
      <div className="wrap">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="display" style={{ marginTop: 10, maxWidth: '14em' }} tabIndex="-1" data-page-title>{title}</h1>
        {children && <div className="lede" style={{ marginTop: 16 }}>{children}</div>}
        {actions && <div className="btn-row" style={{ marginTop: 24 }}>{actions}</div>}
      </div>
    </section>
  );
}

Object.assign(window, {
  DONATE_URL, useReducedMotion, prefersReducedMotion, openWA, Rv, Icon, NAV, ROUTE_GROUP, Header, Footer,
  Photo, Provenance, YouTubePlayer, SpotifyEmbed, useClasses, Opener, Lead,
});
