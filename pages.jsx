// Home · Rav Avshi · Yehi Ohr Center

// ============== HOME ==============
const HOME_PATHS = [
  { n: '01', title: 'Learn', href: '#classes', photo: 'learning', pos: '50% 40%',
    line: 'Recent shiurim on Chassidut, Kabbalah and the parasha — ready to play.', go: 'Start a class' },
  { n: '02', title: 'Listen', href: '#music', photo: 'fireMusic', pos: '40% 70%',
    line: 'Adam Kadmon, and every class as a podcast.', go: 'Open the music' },
  { n: '03', title: 'Visit', href: '#yehi-ohr', photo: 'alley', pos: '50% 60%',
    line: 'Shabbat, tours and the center in the Old City of Tzfat.', go: 'Plan a visit' },
  { n: '04', title: 'Meet Rav Avshi', href: '#rav-avshi', photo: 'portrait', pos: '50% 22%',
    line: 'From a Tzfat childhood to Rosh Yeshiva of Shalom Rav.', go: 'Read his story' },
];

function HomePage() {
  const reduced = useReducedMotion();
  const pathsRef = useRef(null);
  const [live, setLive] = useState(-1);

  // On phones, the panel nearest the middle of the screen gets a slow, subtle push-in.
  useEffect(() => {
    const list = pathsRef.current; if (!list || reduced || !('IntersectionObserver' in window)) return;
    const els = [...list.querySelectorAll('.path')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setLive(els.indexOf(e.target)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  const toPaths = () => {
    const el = document.getElementById('paths');
    el && el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    const first = el && el.querySelector('.path');
    first && setTimeout(() => first.focus({ preventScroll: true }), reduced ? 0 : 500);
  };

  return (
    <div>
      <section className="hero" aria-label="Yehi Ohr">
        <div className="hero-media">
          <img src={PHOTOS.menorah.src} alt={PHOTOS.menorah.alt} className={reduced ? '' : 'settle'} fetchpriority="high" />
        </div>
        <div className="hero-copy">
          <h1 className="hero-name" tabIndex="-1" data-page-title>
            Yehi Ohr
            <span className="he" lang="he" dir="rtl">יהי אור</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-intro">Torah, music and Shabbat in Tzfat with Rav Avshi.</p>
            <button className="btn btn-candle" onClick={toPaths}>Find your way in <Icon.down /></button>
            <p className="hero-credit">Rav Avshi lighting the menorah in the Old City of Tzfat.</p>
          </div>
        </div>
      </section>

      <section id="paths" className="paths" aria-labelledby="paths-title">
        <div className="paths-head">
          <h2 id="paths-title" className="eyebrow" style={{ color: 'var(--candle)' }}>Where would you like to begin?</h2>
        </div>
        <div className="paths-list" ref={pathsRef}>
          {HOME_PATHS.map((p, i) => (
            <a key={p.href} href={p.href} className={`path ${i === 0 ? 'is-default' : ''} ${live === i ? 'is-live' : ''}`}>
              <img src={PHOTOS[p.photo].src} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: p.pos }} />
              <span className="path-body">
                <span className="path-num">{p.n}</span>
                <span className="path-title">{p.title}</span>
                <span className="path-line">{p.line}</span>
                <span className="path-go">{p.go} <Icon.arrow /></span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <LatestClass />
    </div>
  );
}

// The one timely item on Home: the newest class on the Rabbi's channel.
function LatestClass() {
  const { list } = useClasses();
  const c = list[0];
  if (!c) return null;
  const ageDays = (Date.now() - new Date(c.date + 'T12:00:00Z').getTime()) / 864e5;
  const label = ageDays <= 10 ? 'New this week' : 'Latest class';
  return (
    <section className="section" aria-labelledby="latest-title">
      <div className="wrap">
        <div className="split wide-left">
          <Rv><YouTubePlayer id={c.id} title={c.title} sec={c.sec} date={c.date} /></Rv>
          <Rv className="stack" style={{ '--stack': '14px' }}>
            <div className="eyebrow">{label}</div>
            <h2 id="latest-title" className="h2">{c.title}</h2>
            {c.summary && <p className="lede" style={{ fontSize: 18 }}>{c.summary}</p>}
            <div className="btn-row" style={{ paddingTop: 6 }}>
              <a href="#classes" className="btn btn-ink">More classes <Icon.arrow /></a>
              {c.spotifyEpisode
                ? <a className="text-link" href={'https://open.spotify.com/episode/' + c.spotifyEpisode} target="_blank" rel="noopener noreferrer">Listen on Spotify ↗</a>
                : <a className="text-link" href={LINKS.spotifyShow} target="_blank" rel="noopener noreferrer">Podcast on Spotify ↗</a>}
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}

// ============== RAV AVSHI ==============
const RAV_STACK = [
  { p: 'father', pos: '50% 30%', fit: 'contain', cap: 'With his father, Rav Rafael Weingot, founder of Yeshiva Shalom Rav.' },
  { p: 'group', pos: '55% 30%', cap: 'With students in the Old City of Tzfat.' },
  { p: 'fireMusic', pos: '40% 60%', cap: 'Teaching through song, by the fire.' },
  { p: 'praying', pos: '70% 35%', cap: 'In prayer.' },
  { p: 'seforim', pos: '50% 30%', cap: 'Learning.' },
];

const RAV_CHAPTERS = [
  { when: 'Tzfat', title: 'An open home', text: 'Born in the Old City of Tzfat. His parents’ home was both yeshiva and family — students, seekers and guests arrived in a steady current.' },
  { when: 'Abroad', title: 'Out into the world', text: 'He went his own way and travelled to America, until September 11, 2001, when his life changed drastically.' },
  { when: '2002', title: 'Return home', text: 'Back in Tzfat with new depth, he joined Yeshiva Shalom Rav and began teaching the talmidim.' },
  { when: 'Shalom Rav', title: 'Leading the yeshiva', text: 'He began sharing leadership with his father and trained as a life coach, to guide students in spiritual and personal growth. Today he is Rosh Yeshiva of Shalom Rav.' },
  { when: 'Today', title: 'Yehi Ohr', text: 'Teaching Chassidut, Kabbalah and meditation in Tzfat, online, and on journeys to Uman and Mexico — and building the Yehi Ohr center beside the family home.' },
];

function RavAvshiPage() {
  const toTeaching = () => document.getElementById('hear')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  return (
    <div className="page">
      <Opener photo={PHOTOS.portrait} position="50% 18%" eyebrow="Rav Avraham Shimon Weingot" title="Rav Avshi"
        actions={<button className="btn btn-candle" onClick={toTeaching}><Icon.play style={{ width: 14, height: 14 }} />Hear him teach</button>}>
        Born in Tzfat, shaped by an open home of seekers, called to teach the inner Torah of the Zohar and Chassidut — and to live it.
      </Opener>

      <section className="section">
        <div className="wrap-narrow">
          <Rv as="p" className="h3" style={{ fontWeight: 400, fontSize: 'clamp(22px, 5vw, 30px)', lineHeight: 1.35 }}>
            Avshi grew up in a home where students, seekers and guests arrived in a steady current — drawn by his father, <em>Rav Rafael Weingot</em>, founder of Yeshiva Shalom Rav, and his mother, <em>Tova</em>, founder of Sharei Bina Seminary. Hospitality was a form of prayer.
          </Rv>
        </div>
      </section>

      <section className="section stone" aria-labelledby="chapters-title">
        <div className="wrap split">
          <div>
            <div className="eyebrow">In chapters</div>
            <h2 id="chapters-title" className="h2" style={{ marginTop: 8 }}>A life in five short chapters.</h2>
            <ol className="chapters" style={{ marginTop: 28 }}>
              {RAV_CHAPTERS.map(c => (
                <Rv as="li" className="chapter" key={c.title}>
                  <div className="chapter-when">{c.when}</div>
                  <div>
                    <h3 className="h3">{c.title}</h3>
                    <p style={{ marginTop: 4 }}>{c.text}</p>
                  </div>
                </Rv>
              ))}
            </ol>
          </div>
          <PhotoStack items={RAV_STACK} />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Photo p={PHOTOS.group} aspect="3/2" position="55% 30%" />
          <div className="stack">
            <div className="eyebrow">Kiki & the family</div>
            <h2 className="h2">A home that opens, again and again.</h2>
            <p>Together with his wife Kiki, Rav Avshi brings these experiences to life. Shabbat meals at their home offer guests the chance to connect with the whole family in an atmosphere of warmth and authenticity. Kiki works behind the scenes — tailoring every gathering, every detail, with care.</p>
            <a className="text-link" href="#community">Ask about a Shabbat at their table →</a>
          </div>
        </div>
      </section>

      <section className="section ink">
        <div className="wrap-narrow">
          <blockquote>
            <p className="h2 italic" style={{ fontWeight: 300 }}>“Wherever he is, and with whomever he meets, he carries one mission: to reveal the inner secrets of Torah — the light of the Geulah, healing, comfort, clarity, peace.”</p>
            <footer className="small" style={{ marginTop: 16 }}>Yehi Ohr · mission</footer>
          </blockquote>
        </div>
      </section>

      <section id="hear" className="section" aria-labelledby="hear-title">
        <div className="wrap split wide-left">
          <YouTubePlayer id={TEACHINGS.tzfat.id} title={TEACHINGS.tzfat.title} sec={TEACHINGS.tzfat.sec} date={TEACHINGS.tzfat.date} />
          <div className="stack">
            <div className="eyebrow">Hear him teach</div>
            <h2 id="hear-title" className="h2">Thank You Hashem for Tzfat</h2>
            <p>What makes Tzfat so unique, and why is its spiritual atmosphere unlike anywhere else? Rav Avshi on the kabbalistic secrets of the city he grew up in.</p>
            <a href="#classes" className="text-link">More classes →</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Captioned photo stack: tap Next/Prev, swipe, or use arrow keys.
function PhotoStack({ items }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const go = (d) => setI(x => (x + d + n) % n);
  const touch = useRef(null);
  return (
    <div className="pstack" role="group" aria-roledescription="photo stack" aria-label="Photographs of Rav Avshi">
      <div className="pstack-frame"
        onTouchStart={e => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={e => { const dx = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}
        onKeyDown={e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }} tabIndex="0">
        {items.map((it, k) => {
          const d = (k - i + n) % n; // 0 = front
          const style = d === 0
            ? { transform: 'none', opacity: 1, zIndex: n }
            : { transform: `translate(${d * 10}px, ${d * -10}px) rotate(${d % 2 ? 2.5 : -2}deg) scale(${1 - d * 0.04})`, opacity: d > 2 ? 0 : 1 - d * 0.25, zIndex: n - d };
          return (
            <figure key={it.p} className={`pstack-card ${it.fit === 'contain' ? 'contain' : ''}`} style={style} aria-hidden={d !== 0}>
              <img src={PHOTOS[it.p].src} alt={d === 0 ? PHOTOS[it.p].alt : ''} loading="lazy" decoding="async" style={{ objectPosition: it.pos }} />
            </figure>
          );
        })}
      </div>
      <div className="pstack-controls">
        <button className="round-btn" onClick={() => go(-1)} aria-label="Previous photograph"><Icon.back /></button>
        <p className="pstack-cap" aria-live="polite">{items[i].cap} <span className="small">({i + 1}/{n})</span></p>
        <button className="round-btn" onClick={() => go(1)} aria-label="Next photograph"><Icon.arrow /></button>
      </div>
    </div>
  );
}

// ============== YEHI OHR CENTER ==============
const CENTER_SEQUENCE = [
  { p: 'alley', pos: '50% 55%', kicker: '01 · The alley', title: 'Into the Old City', text: 'Stone steps, blue doors, an olive tree — the lanes of Tzfat’s Old City.' },
  { p: 'learning', pos: '50% 45%', kicker: '02 · The doorway', title: 'Through the doorway', text: 'Inside, the learning is already underway.' },
  { p: 'sitting', pos: '45% 40%', kicker: '03 · The gathering', title: 'An open table', text: 'Students, guests and the Rav — conversation, song and Shabbat.' },
  { p: 'centerRender', pos: '50% 60%', kicker: '04 · The center', title: 'The center to come', text: 'An architectural render of the planned building — not a photograph.' },
];

function YehiOhrPage({ sub }) {
  return (
    <div className="page">
      <Opener photo={PHOTOS.alley} position="50% 60%" eyebrow="Old City · Tzfat, Israel" title="Visit Yehi Ohr"
        actions={<>
          <button className="btn btn-candle" onClick={() => openWA('visit')}><Icon.wa />Ask about visiting</button>
          <button className="text-link" style={{ minHeight: 44 }} onClick={() => openWA('shabbat')}>Coming for Shabbat?</button>
        </>}>
        Classes, prayer and Shabbat with Rav Avshi’s community — in Tzfat, beside Yeshiva Shalom Rav.
      </Opener>

      <section id="details" className="section-tight stone" aria-labelledby="details-title">
        <div className="wrap">
          <h2 id="details-title" className="eyebrow">Practical details</h2>
          <dl className="grid-3" style={{ marginTop: 16 }}>
            <div className="card"><dt className="h3">Where</dt><dd style={{ marginTop: 6 }}>The Old City of Tzfat. The team sends exact directions on WhatsApp.</dd></div>
            <div className="card"><dt className="h3">What happens</dt><dd style={{ marginTop: 6 }}>Classes, prayer, Kabbalat Shabbat at the Mekarev Shul and Shabbat meals at the family home.</dd></div>
            <div className="card"><dt className="h3">How to arrange</dt><dd style={{ marginTop: 6 }}>Send your dates and group size. Times are confirmed with you directly.</dd></div>
          </dl>
          <p className="small" style={{ marginTop: 16 }}>More answers: <a className="text-link" href="#faq/visiting">visiting</a> · <a className="text-link" href="#faq/shabbat">Shabbat</a> · <a className="text-link" href="#tours">tours & seminars</a></p>
        </div>
      </section>

      <CenterSequence />

      <section className="section" aria-labelledby="space-title">
        <div className="wrap">
          <div className="eyebrow">Today and tomorrow</div>
          <h2 id="space-title" className="h2" style={{ marginTop: 8, maxWidth: '16em' }}>What is here now, and what is being built.</h2>
          <div className="grid-2" style={{ marginTop: 28 }}>
            <div className="card">
              <span className="badge badge-doc" style={{ position: 'static' }}><span>Here now</span></span>
              <ul className="stack" style={{ marginTop: 14, '--stack': '10px' }}>
                <li><strong style={{ color: 'var(--ink)' }}>Yeshiva Shalom Rav</strong> — founded by Rav Rafael Weingot; daily learning, led today by Rav Avshi.</li>
                <li><strong style={{ color: 'var(--ink)' }}>Kabbalat Shabbat</strong> at the Mekarev Shul.</li>
                <li><strong style={{ color: 'var(--ink)' }}>Shabbat meals</strong> at the family home with Rav Avshi and Kiki.</li>
                <li><strong style={{ color: 'var(--ink)' }}>Classes</strong> in person, and online on YouTube and Spotify.</li>
              </ul>
            </div>
            <div className="card">
              <span className="badge badge-plan" style={{ position: 'static' }}><span>Planned</span></span>
              <ul className="stack" style={{ marginTop: 14, '--stack': '10px' }}>
                <li><strong style={{ color: 'var(--ink)' }}>A shul</strong> for Shabbat and weekday tefillah.</li>
                <li><strong style={{ color: 'var(--ink)' }}>A classroom</strong> for Zohar, Chassidut and inner Torah.</li>
                <li><strong style={{ color: 'var(--ink)' }}>A gathering hall</strong> for seminars, Shabbatonim and simchas.</li>
                <li><strong style={{ color: 'var(--ink)' }}>Gardens</strong> and quiet corners for chavruta.</li>
              </ul>
              <p className="small" style={{ marginTop: 14 }}>Images of the building are architectural renders. <a className="text-link" href="#vision">See the vision →</a></p>
            </div>
          </div>
          <div className="grid-2" style={{ marginTop: 32 }}>
            <figure><Photo p={PHOTOS.facadeRender} aspect="1650/953" /><figcaption>Yeshiva Shalom Rav — architectural render.</figcaption></figure>
            <figure><Photo p={PHOTOS.centerRender} aspect="1800/850" /><figcaption>The Yehi Ohr center beside the family home — architectural render.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="section-tight ink">
        <div className="wrap btn-row" style={{ justifyContent: 'space-between' }}>
          <p className="h3" style={{ maxWidth: '20em' }}>Ready to come? Send your dates and the team will reply on WhatsApp.</p>
          <button className="btn btn-candle" onClick={() => openWA('visit')}><Icon.wa />Ask about visiting</button>
        </div>
      </section>
    </div>
  );
}

// Scroll-controlled walk from the alley to the center (a photo storyboard
// until the original camera move is filmed). Static list with reduced motion.
function CenterSequence() {
  const reduced = useReducedMotion();
  const secRef = useRef(null);
  const imgRefs = useRef([]);
  const [step, setStep] = useState(0);
  const n = CENTER_SEQUENCE.length;

  useEffect(() => {
    if (reduced) return;
    let raf = 0, visible = false;
    const sec = secRef.current; if (!sec) return;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) tick(); });
    io.observe(sec);
    function tick() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!visible) return;
        const r = sec.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const prog = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
        const f = prog * n;
        const s = Math.min(n - 1, Math.floor(f));
        setStep(s);
        const local = f - s; // 0..1 within the current frame: slow push toward the doorway
        const img = imgRefs.current[s];
        if (img) img.style.transform = `scale(${1 + local * 0.09}) translateY(${local * -1.5}%)`;
      });
    }
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', tick); window.removeEventListener('resize', tick); };
  }, [reduced, n]);

  if (reduced) {
    return (
      <section className="section ink" aria-labelledby="walk-title">
        <div className="wrap">
          <div className="eyebrow">Walk in</div>
          <h2 id="walk-title" className="h2" style={{ marginTop: 8 }}>From the alley to the center</h2>
          <div className="seq-static grid-2" style={{ marginTop: 24 }}>
            {CENTER_SEQUENCE.map(f => (
              <figure key={f.p}>
                <Photo p={PHOTOS[f.p]} aspect="4/3" position={f.pos} />
                <figcaption><strong style={{ color: 'var(--on-ink)' }}>{f.title}.</strong> {f.text}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const cur = CENTER_SEQUENCE[step];
  return (
    <section ref={secRef} className="seq" style={{ height: `${n * 90}svh` }} aria-labelledby="walk-title">
      <div className="seq-sticky">
        {CENTER_SEQUENCE.map((f, k) => (
          <div key={f.p} className={`seq-frame ${k === step ? 'on' : ''}`} aria-hidden={k !== step}>
            <img ref={el => (imgRefs.current[k] = el)} src={PHOTOS[f.p].src} alt={PHOTOS[f.p].alt} loading={k < 2 ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: f.pos }} />
            {PHOTOS[f.p].kind === 'render' ? <span className="badge badge-render"><span>Architectural render</span></span> : <span className="badge badge-story"><span>Photo storyboard</span></span>}
          </div>
        ))}
        <div className="seq-progress" aria-hidden="true">{CENTER_SEQUENCE.map((_, k) => <i key={k} className={k <= step ? 'on' : ''} />)}</div>
        <a className="seq-skip" href="#yehi-ohr/details" onClick={(e) => { e.preventDefault(); document.getElementById('details')?.scrollIntoView(); }}>Skip to practical details</a>
        <div className="seq-caption on-photo" aria-live="polite">
          <div className="eyebrow">{cur.kicker}</div>
          <h2 id="walk-title" className="h2" style={{ marginTop: 6 }}>{cur.title}</h2>
          <p style={{ marginTop: 8, color: 'var(--on-ink-soft)' }}>{cur.text}</p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage, RavAvshiPage, YehiOhrPage, PhotoStack });
