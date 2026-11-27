// Music · Tours · Community · Teaching · Support · Vision · Contact · FAQ · Merch

// ============== MUSIC ==============
const SHELF = [
  { key: 'ak', kind: 'yt', id: ADAM_KADMON.youtube, title: 'Adam Kadmon', sub: 'Avshi Weingot & Shlepping Nachas · 2023', cover: PHOTOS.cover.src },
  { key: 'kz', kind: 'yt', id: 'fdRGgNKs1m8', title: 'Kumzitz and songs', sub: 'Rav Avshi in Mexico · 2023', cover: ytThumb('fdRGgNKs1m8') },
  { key: 'sc', kind: 'yt', id: 'Ym4O7uRk8H8', title: 'Hillula of Reb Shlomo Carlebach', sub: 'Farbrengen · Nov 2025', cover: ytThumb('Ym4O7uRk8H8') },
];

function MusicPage() {
  const [sel, setSel] = useState(0);
  const cur = SHELF[sel];
  return (
    <div className="page">
      <section className="section ink" style={{ paddingTop: 32 }}>
        <div className="wrap split">
          <Rv>
            <img src={PHOTOS.cover.src} alt={PHOTOS.cover.alt} style={{ width: '100%', borderRadius: 6, aspectRatio: '1/1', objectFit: 'cover', boxShadow: '0 40px 80px -30px rgba(0,0,0,.8)' }} />
          </Rv>
          <div className="stack">
            <div className="eyebrow">Music · featured release</div>
            <h1 className="display" tabIndex="-1" data-page-title>Adam Kadmon <span className="he candle" lang="he" dir="rtl" style={{ fontSize: '.5em' }}>אדם קדמון</span></h1>
            <p className="lede">{ADAM_KADMON.artists}. Released {ADAM_KADMON.released} · {ADAM_KADMON.length}.</p>
            <div className="btn-row">
              <a className="btn btn-candle" href="#listen" onClick={(e) => { e.preventDefault(); setSel(0); document.getElementById('listen')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' }); }}><Icon.play style={{ width: 14, height: 14 }} />Watch &amp; listen</a>
              <a className="btn btn-line" href={'https://open.spotify.com/track/' + ADAM_KADMON.spotifyTrack} target="_blank" rel="noopener noreferrer"><Icon.sp />Spotify ↗</a>
            </div>
            <dl className="facts" style={{ paddingTop: 8 }}>
              {ADAM_KADMON.credits.map(([k, v]) => <div className="fact" key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <p className="small">{ADAM_KADMON.locations}</p>
          </div>
        </div>
      </section>

      <section id="listen" className="section" aria-labelledby="shelf-title">
        <div className="wrap">
          <div className="eyebrow">Recordings</div>
          <h2 id="shelf-title" className="h2" style={{ marginTop: 8 }}>Songs and niggunim with Rav Avshi</h2>
          <div className="scroll-x" role="tablist" aria-label="Recordings" style={{ marginTop: 20 }}>
            {SHELF.map((s, k) => (
              <button key={s.key} role="tab" aria-selected={k === sel} onClick={() => setSel(k)}
                style={{ width: 168, textAlign: 'left', opacity: k === sel ? 1 : .72, transition: 'opacity .3s' }}>
                <img src={s.cover} alt="" loading="lazy" style={{ width: 168, height: 168, objectFit: 'cover', borderRadius: 6, outline: k === sel ? '3px solid var(--candle)' : 'none', outlineOffset: 2 }} />
                <span className="class-title" style={{ display: 'block', fontSize: 18, marginTop: 10 }}>{s.title}</span>
                <span className="class-meta" style={{ display: 'block' }}>{s.sub}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 24, maxWidth: 860 }} role="tabpanel">
            <YouTubePlayer key={cur.id} id={cur.id} title={cur.title} label={cur.title} />
          </div>
        </div>
      </section>

      <section className="section stone">
        <div className="wrap split">
          <figure>
            <Photo p={PHOTOS.campfire} aspect="3/2" />
            <figcaption>A niggun evening around the fire.</figcaption>
          </figure>
          <div className="stack">
            <div className="eyebrow">Live &amp; experiential</div>
            <h2 className="h2">Sometimes a class is a song.</h2>
            <p>Sometimes a song is a class. Live niggun evenings are an invitation to drop the words and remember what the words are pointing toward.</p>
            <div className="stack" style={{ '--stack': '10px' }}>
              <p className="small">Every class is also a podcast:</p>
              <SpotifyEmbed kind="show" id="2EoY2HZTKuBOnVxt2W7NgK" cta="Play the podcast" height={352} title="Rav Avshi Weingot podcast on Spotify" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============== TOURS & SEMINARS ==============
const TOURS = [
  { key: 'uman', tag: 'Journey', title: 'Ukraine — Breslov & holy sites',
    img: ytThumb('W7BM9Qe_tjI'), imgAlt: 'Rav Avshi teaching in Uman (video still)', pos: '50% 40%',
    facts: [['Duration', '7 days'], ['Language', 'English / Hebrew'], ['Group', 'Group journey']],
    text: 'A pilgrimage through Uman, Mezhibuzh and the places where Chassidut was born — taught and held with care.',
    proof: { label: 'Recorded on recent trips (Mar & Jul 2025)', href: ytPlaylist('PLgSQJNMuDV7C-z09LG_6KaWORiKP_aTqR') },
    note: 'I’m interested in the Ukraine — Breslov & holy sites journey.' },
  { key: 'tzfat', tag: 'Tour', title: 'Tzfat spiritual tour',
    img: PHOTOS.alley.src, imgAlt: PHOTOS.alley.alt, pos: '50% 60%',
    facts: [['Duration', '1–5 days'], ['Group', 'Private or group'], ['When', 'Year-round']],
    text: 'Tzfat as a living classroom — the Ari’s mikveh, kabbalistic shuls, blue alleys, and the stories that still live in the stones.',
    note: 'I’m interested in booking a Tzfat spiritual tour.' },
  { key: 'godly', tag: 'Seminar', title: 'Godly Me · inner Torah intensive',
    img: PHOTOS.clouds.src, imgAlt: PHOTOS.clouds.alt, pos: '50% 40%',
    facts: [['Duration', '3 days'], ['Where', 'Tzfat'], ['Group', 'Small groups']],
    text: 'An experiential program weaving Torah, reflection, niggun and community — for people ready to go inside.',
    proof: { label: 'Interview: “Becoming Godly” (2023)', href: ytWatch('yeqLAai2njo') },
    note: 'I’m interested in the Godly Me inner Torah intensive.' },
  { key: 'shabbat', tag: 'Shabbat', title: 'Shabbat in Tzfat', topic: 'shabbat',
    img: PHOTOS.group.src, imgAlt: PHOTOS.group.alt, pos: '55% 30%',
    facts: [['Duration', 'Friday – Saturday'], ['Group', 'Open to all']],
    text: 'Kabbalat Shabbat, meals at the family home, learning, music and walks in Tzfat.',
    more: '#community', note: 'I’d like to join a Shabbat in Tzfat.' },
];

function ToursPage() {
  return (
    <div className="page">
      <Lead eyebrow="Tours & seminars" title="Torah you walk, sing and live.">
        Journeys with Rav Avshi — through Tzfat, to the holy sites of Ukraine, and inward.
      </Lead>
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="note">Asking isn’t registering. Tap <strong>Ask about this</strong> to open WhatsApp with your question; the team replies to confirm dates, places and cost.</p>
          <div className="stack" style={{ '--stack': '20px', marginTop: 24 }}>
            {TOURS.map(t => (
              <Rv as="article" key={t.key} className="card" style={{ padding: 0, overflow: 'hidden' }} aria-labelledby={'t-' + t.key}>
                <div className="split" style={{ gap: 0, alignItems: 'stretch' }}>
                  <div className="photo" style={{ aspectRatio: '16/10', borderRadius: 0 }}>
                    <img src={t.img} alt={t.imgAlt} loading="lazy" decoding="async" style={{ objectPosition: t.pos }} />
                  </div>
                  <div style={{ padding: 20 }} className="stack">
                    <div className="eyebrow">{t.tag}</div>
                    <h2 id={'t-' + t.key} className="h3" style={{ fontSize: 28 }}>{t.title}</h2>
                    <dl className="facts">{t.facts.map(([k, v]) => <div className="fact" key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                    <p>{t.text}</p>
                    {t.proof && <a className="text-link small" href={t.proof.href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>{t.proof.label} ↗</a>}
                    <div className="btn-row" style={{ paddingTop: 4 }}>
                      <button className="btn btn-candle" onClick={() => openWA(t.topic || 'tour', 'Shalom Rav Avshi, ' + t.note)}><Icon.wa />Ask about this</button>
                      {t.more && <a className="text-link" href={t.more}>Shabbat details →</a>}
                    </div>
                  </div>
                </div>
              </Rv>
            ))}
          </div>
          <p className="small" style={{ marginTop: 24 }}>Rav Avshi also teaches abroad — see recordings from <a className="text-link" href={ytPlaylist('PLBbeogw73_P0')} target="_blank" rel="noopener noreferrer">Mexico 2026 ↗</a> and <a className="text-link" href={ytPlaylist('PLgSQJNMuDV7Bas5groRVaQH2_NK0VYAah')} target="_blank" rel="noopener noreferrer">Mexico 2025 ↗</a>.</p>
        </div>
      </section>
    </div>
  );
}

// ============== COMMUNITY / SHABBAT ==============
const NIGGUN_EVENING = [
  { p: 'campfire', cap: 'Evening falls; students gather around the fire.' },
  { p: 'fireMusic', cap: 'Rav Avshi takes up the guitar, and the niggun begins.' },
  { p: 'laughing', cap: 'Walking home together through Tzfat.' },
];

function CommunityPage() {
  return (
    <div className="page">
      <Opener photo={PHOTOS.group} position="55% 30%" eyebrow="Shabbat & community" title="Shabbat in Tzfat"
        actions={<button className="btn btn-candle" onClick={() => openWA('shabbat')}><Icon.wa />Ask about Shabbat</button>}>
        Kabbalat Shabbat at the Mekarev Shul, and Shabbat meals with Rav Avshi, Kiki and the family.
      </Opener>

      <section className="section-tight stone" aria-labelledby="shabbat-details">
        <div className="wrap">
          <h2 id="shabbat-details" className="eyebrow">Before you come</h2>
          <dl className="grid-3" style={{ marginTop: 16 }}>
            <div className="card"><dt className="h3">Friday night</dt><dd style={{ marginTop: 6 }}>Kabbalat Shabbat at the Mekarev Shul in Tzfat.</dd></div>
            <div className="card"><dt className="h3">Meals</dt><dd style={{ marginTop: 6 }}>At the Weingot family home — an atmosphere of warmth and authenticity.</dd></div>
            <div className="card"><dt className="h3">To arrange</dt><dd style={{ marginTop: 6 }}>Send your dates, group size and any dietary needs. The team confirms times and details with you.</dd></div>
          </dl>
          <p className="small" style={{ marginTop: 16 }}><a className="text-link" href="#faq/shabbat">Shabbat questions</a> · <a className="text-link" href="#yehi-ohr">Visiting Yehi Ohr</a></p>
        </div>
      </section>

      <section className="section" aria-labelledby="evening-title">
        <div className="wrap">
          <div className="eyebrow">A gathering</div>
          <h2 id="evening-title" className="h2" style={{ marginTop: 8, maxWidth: '14em' }}>An evening of niggunim</h2>
          <p className="lede" style={{ marginTop: 12 }}>Sometimes a class is a song. Sometimes a song is a class.</p>
          <ol className="grid-3" style={{ marginTop: 28 }}>
            {NIGGUN_EVENING.map((s, k) => (
              <Rv as="li" key={s.p}>
                <figure>
                  <Photo p={PHOTOS[s.p]} aspect="4/5" />
                  <figcaption><span className="eyebrow" style={{ marginInlineEnd: 8 }}>{k + 1}</span>{s.cap}</figcaption>
                </figure>
              </Rv>
            ))}
          </ol>
        </div>
      </section>

      <section className="section ink">
        <div className="wrap grid-2">
          <div className="stack">
            <div className="eyebrow">In Tzfat</div>
            <p>Weekly classes, Friday night davening at the Mekarev Shul, Shabbat meals at the family home, niggun evenings and daily learning at Yeshiva Shalom Rav.</p>
          </div>
          <div className="stack">
            <div className="eyebrow">Around the world</div>
            <p>Journeys and gatherings in Ukraine, New York and Mexico, and classes online. Stay close through the WhatsApp community.</p>
            <a className="text-link" href={LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer">Join the WhatsApp community ↗</a>
          </div>
        </div>
      </section>

      <div className="action-bar"><button className="btn btn-candle btn-block" onClick={() => openWA('shabbat')}><Icon.wa />Ask about Shabbat</button></div>
    </div>
  );
}

// ============== TEACHING & PATH ==============
const PATH_STEPS = [
  { n: 'I', title: 'Mind', text: 'Rigour in text — the Zohar, the Ramak, the Ari and the Chassidic masters. Sources held with both hands.',
    link: { label: 'Deeper explanation of the Amida', href: ytWatch(TEACHINGS.amida.id), ext: true }, more: { label: 'Parasha classes', href: ytPlaylist('PLgSQJNMuDV7B4jv44xSOtX-G6Z9v4_UYf') } },
  { n: 'II', title: 'Heart', text: 'Niggun, prayer, story and breath — letting what the mind grasps reach the place that already knew.',
    link: { label: 'Adam Kadmon', href: '#music' }, more: { label: 'Meditation class', href: ytWatch(TEACHINGS.meditation.id) } },
  { n: 'III', title: 'Experience', text: 'Shabbat, journeys, community and silence. Torah as something walked, sung and lived.',
    link: { label: 'Joy, from Uman', href: ytWatch(TEACHINGS.uman.id), ext: true }, more: { label: 'Shabbat in Tzfat', href: '#community' } },
];

function TeachingPage() {
  const t = TEACHINGS.meditation;
  return (
    <div className="page">
      <Lead eyebrow="Teaching & path" title="Mind, heart and lived experience.">
        Rav Avshi teaches Torah through Kabbalah, Chassidut and music — never as information to be stored, always as light to be lived.
      </Lead>
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap split wide-left">
          <YouTubePlayer id={t.id} title={t.title} sec={t.sec} date={t.date} label="Start here" />
          <div className="stack">
            <h2 className="h3" style={{ fontSize: 28 }}>The Inner Struggle Within Us</h2>
            <p>A guided inner meditation on Yaakov and Esav — not just as historical figures, but as forces living within each of us. A good first class: no background needed.</p>
          </div>
        </div>
      </section>
      <section className="section stone">
        <div className="wrap">
          <h2 className="h2">Three ways in</h2>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {PATH_STEPS.map(s => (
              <Rv className="card stack" key={s.title} style={{ '--stack': '10px' }}>
                <div className="h2 italic candle" style={{ fontSize: 34 }}>{s.n}.</div>
                <h3 className="h3" style={{ fontSize: 28 }}>{s.title}</h3>
                <p>{s.text}</p>
                <a className="btn btn-ink" href={s.link.href} {...(s.link.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ alignSelf: 'flex-start' }}>
                  {s.link.label} {s.link.ext ? '↗' : <Icon.arrow />}
                </a>
                <a className="text-link small" href={s.more.href} {...(s.more.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{s.more.label}{s.more.href.startsWith('http') ? ' ↗' : ' →'}</a>
              </Rv>
            ))}
          </div>
          <p style={{ marginTop: 28 }}><a className="text-link" href="#classes">All Torah classes →</a></p>
        </div>
      </section>
    </div>
  );
}

// ============== SUPPORT ==============
function SupportPage() {
  return (
    <div className="page">
      <Lead eyebrow="Support" title="Help keep the light shining."
        actions={<a className="btn btn-candle" href={DONATE_URL} target="_blank" rel="noopener noreferrer">Give on the donation page ↗</a>}>
        Your gift helps Yehi Ohr welcome people to Tzfat and share the light of Chassidut and Kabbalah with Jewish souls around the world.
      </Lead>

      <section className="section-tight stone">
        <div className="wrap grid-2">
          <div className="stack">
            <h2 className="h3" style={{ fontSize: 28 }}>What a gift supports</h2>
            <ul className="stack" style={{ '--stack': '8px' }}>
              <li>· Chassidut &amp; Kabbalah classes</li>
              <li>· Torah &amp; meditation</li>
              <li>· Shabbat experiences in Tzfat</li>
              <li>· Teaching in Tzfat and worldwide</li>
              <li>· Building a permanent home for Yehi Ohr</li>
            </ul>
            <a className="text-link small" href="#vision">What exists and what is planned →</a>
          </div>
          <div className="card stack" style={{ '--stack': '10px' }}>
            <h2 className="h3">On the donation page you choose</h2>
            <dl className="facts">
              <div className="fact"><dt>Amount</dt><dd>$36 · $72 · $180 · $360 · $500 · $720 · $1,000 · or your own</dd></div>
              <div className="fact"><dt>How often</dt><dd>Monthly or one-time</dd></div>
              <div className="fact"><dt>Dedication</dt><dd>Optional — in memory, for healing, in honour…</dd></div>
            </dl>
            <p className="small">Monthly gifts renew until you cancel. Card payments are processed by Stripe on donaciones.yehiohr.live.</p>
            <a className="btn btn-candle btn-block" href={DONATE_URL} target="_blank" rel="noopener noreferrer">Continue to give ↗</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h3" style={{ fontSize: 28 }}>Other ways to help</h2>
          <div className="grid-3" style={{ marginTop: 16 }}>
            <div className="card stack" style={{ '--stack': '8px' }}><h3 className="h3">Volunteer</h3><p>Writing, design, hospitality, photography, languages.</p><button className="text-link" style={{ alignSelf: 'flex-start', minHeight: 44 }} onClick={() => openWA('general', 'I’d like to volunteer with Yehi Ohr.')}>Offer your help</button></div>
            <div className="card stack" style={{ '--stack': '8px' }}><h3 className="h3">Visit</h3><p>A Shabbat, a class, a coffee in Tzfat.</p><a className="text-link" href="#yehi-ohr">Plan a visit →</a></div>
            <div className="card stack" style={{ '--stack': '8px' }}><h3 className="h3">Share a class</h3><p>Send one shiur to one person who needs it.</p><a className="text-link" href="#classes">Find a class →</a></div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============== VISION ==============
function VisionPage() {
  const latest = CLASSES[0];
  return (
    <div className="page">
      <Lead eyebrow="Vision" title="A dream, actively being built.">
        A permanent home for inner Torah in Tzfat — where learning, music, prayer and hospitality live under one roof. Already alive in spirit; slowly rising in stone.
      </Lead>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap track">
          <div className="track-col stack" style={{ '--stack': '10px' }}>
            <span className="badge badge-doc" style={{ position: 'static', alignSelf: 'flex-start', width: 'fit-content' }}><span>Exists</span></span>
            <h2 className="h3">Already happening</h2>
            <ul className="stack small" style={{ '--stack': '8px', color: 'var(--umber)' }}>
              <li><strong>Yeshiva Shalom Rav</strong>, led by Rav Avshi, with weekly classes and Shabbat in Tzfat.</li>
              <li><strong>Classes online</strong> on YouTube and Spotify — newest {fmtDate(latest.date)}.</li>
              <li><strong>Journeys to Uman</strong> — March and July 2025.</li>
              <li><strong>Teaching in Mexico</strong> — 2023, 2025 and 2026.</li>
            </ul>
          </div>
          <div className="track-col now stack" style={{ '--stack': '10px' }}>
            <span className="badge badge-render" style={{ position: 'static', width: 'fit-content' }}><span>Underway</span></span>
            <h2 className="h3">Making more space</h2>
            <p className="small" style={{ color: 'var(--on-ink-soft)' }}>In March 2024 the community launched the <strong style={{ color: 'var(--on-ink)' }}>CLOSER</strong> campaign to make more space at Shalom Rav. The Yehi Ohr center is now being built beside the family home.</p>
            <YouTubePlayer id={TEACHINGS.closer.id} title={TEACHINGS.closer.title} compact />
            <p className="small" style={{ color: 'var(--on-ink-faint)' }}>“Help us build something CLOSER” · 2 min · Mar 2024</p>
          </div>
          <div className="track-col stack" style={{ '--stack': '10px' }}>
            <span className="badge badge-plan" style={{ position: 'static', width: 'fit-content' }}><span>Hoped for</span></span>
            <h2 className="h3">What we hope to build</h2>
            <ul className="stack small" style={{ '--stack': '8px', color: 'var(--umber)' }}>
              <li>A larger beit midrash</li>
              <li>A guesthouse for travellers and seekers</li>
              <li>The Yehi Ohr studio for recording and translation</li>
              <li>Room for more guests at Shabbat</li>
              <li>A space for niggun evenings</li>
              <li>Gardens and quiet corners</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <figure>
            <Photo p={PHOTOS.centerRender} aspect="1800/850" />
            <figcaption>The planned Yehi Ohr center — architectural render, not a photograph.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section ink">
        <div className="wrap btn-row" style={{ justifyContent: 'space-between' }}>
          <div className="stack" style={{ '--stack': '8px', maxWidth: '30em' }}>
            <h2 className="h2">Become part of the foundation.</h2>
            <p>Stone by stone, Shabbat by Shabbat — from dream to reality, together.</p>
          </div>
          <a className="btn btn-candle" href="#support">Support Yehi Ohr <Icon.arrow /></a>
        </div>
      </section>
    </div>
  );
}

// ============== CONTACT (and #newsletter) ==============
function ContactPage() {
  return (
    <div className="page">
      <Lead eyebrow="Contact" title="Write to the team on WhatsApp."
        actions={<>
          <button className="btn btn-candle" onClick={() => openWA('general')}><Icon.wa />Start a message</button>
          <a className="text-link" href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">{LINKS.whatsappNumber} ↗</a>
        </>}>
        Visiting Tzfat, booking a group, or a question of the heart. WhatsApp is the fastest way to reach Rav Avshi’s team.
      </Lead>

      <section className="section-tight stone">
        <div className="wrap grid-2">
          <div className="card stack" style={{ '--stack': '8px' }}>
            <h2 className="h3">How it works</h2>
            <p>The form helps you write a clear message. Nothing is sent until you press send in WhatsApp.</p>
            <p className="small">Prefer to type it yourself? <a className="text-link" href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">Open WhatsApp directly ↗</a></p>
          </div>
          <div className="card stack" style={{ '--stack': '8px' }}>
            <h2 className="h3">Where</h2>
            <p>Old City, Tzfat, Israel. Directions are shared on WhatsApp when you arrange a visit.</p>
          </div>
        </div>
      </section>

      <section id="updates" className="section" aria-labelledby="updates-title">
        <div className="wrap-narrow stack">
          <div className="eyebrow">Updates</div>
          <h2 id="updates-title" className="h2">A newsletter isn’t available yet.</h2>
          <p>Until it is, the best way to hear about new classes and gatherings is the WhatsApp community, or following the podcast.</p>
          <div className="btn-row">
            <a className="btn btn-ink" href={LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer"><Icon.wa />Join the WhatsApp community ↗</a>
            <a className="btn btn-line" href={LINKS.spotifyShow} target="_blank" rel="noopener noreferrer"><Icon.sp />Follow on Spotify ↗</a>
            <a className="btn btn-line" href={LINKS.youtube} target="_blank" rel="noopener noreferrer"><Icon.yt />Subscribe on YouTube ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============== FAQ ==============
const FAQ_GROUPS = [
  { id: 'visiting', title: 'Visiting', items: [
    { q: 'Who is this for?', a: 'Anyone drawn to inner Torah, music and a more lived spiritual life — beginner or scholar.', act: { label: 'Ask about visiting', topic: 'visit' } },
    { q: 'Do I need prior knowledge?', a: 'No. Classes and experiences are designed to meet you where you are.', act: { label: 'Try a first class', href: '#teaching' } },
    { q: 'Is it suitable for families?', a: 'Children are welcome at many gatherings; some programs are for adults. Ask the team about your group.', act: { label: 'Ask about your group', topic: 'visit' } },
    { q: 'Where is Yehi Ohr?', a: 'In the Old City of Tzfat, Israel. Exact directions are sent on WhatsApp when you arrange a visit.', act: { label: 'Visiting Yehi Ohr', href: '#yehi-ohr' } },
  ]},
  { id: 'shabbat', title: 'Shabbat', items: [
    { q: 'Can I join a Shabbat in Tzfat?', a: 'Yes — Kabbalat Shabbat at the Mekarev Shul and meals at the Weingot family home. Send your dates and group size; the team confirms with you.', act: { label: 'Ask about Shabbat', topic: 'shabbat' } },
    { q: 'Can you help with meals or a place to stay?', a: 'Say what you need in your Shabbat message — meals, a place to sleep, or both — and the team will tell you what is possible.', act: { label: 'Ask about Shabbat', topic: 'shabbat' } },
  ]},
  { id: 'online', title: 'Learning online', items: [
    { q: 'Can I learn online?', a: 'Yes. Classes are posted on YouTube and as a podcast on Spotify.', act: { label: 'Torah classes', href: '#classes' } },
    { q: 'Do I have to travel to Tzfat?', a: 'Shabbat, seminars and tours happen in person. Classes online are open from anywhere.', act: { label: 'Tours & seminars', href: '#tours' } },
  ]},
  { id: 'languages', title: 'Languages', items: [
    { q: 'What languages are offered?', a: 'Recorded classes are mostly in English. You can write to the team in English, Hebrew or Spanish.', act: { label: 'Write to the team', topic: 'general' } },
  ]},
];

function FAQPage({ sub }) {
  const firstOpen = sub && FAQ_GROUPS.find(g => g.id === sub) ? sub + ':0' : 'visiting:0';
  const [open, setOpen] = useState(firstOpen);
  useEffect(() => { if (sub) setOpen(sub + ':0'); }, [sub]);
  return (
    <div className="page">
      <Lead eyebrow="Practical questions" title="Before you come.">
        <span className="btn-row" style={{ gap: 8 }}>
          {FAQ_GROUPS.map(g => <a key={g.id} className="chip" href={'#faq/' + g.id}>{g.title}</a>)}
        </span>
      </Lead>
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap-narrow">
          {FAQ_GROUPS.map(g => (
            <div key={g.id} id={g.id} style={{ marginBottom: 36 }}>
              <h2 className="eyebrow" style={{ marginBottom: 8 }}>{g.title}</h2>
              <div className="acc">
                {g.items.map((it, k) => {
                  const key = g.id + ':' + k; const isOpen = open === key;
                  return (
                    <div className="acc-item" key={key}>
                      <h3 style={{ margin: 0 }}>
                        <button className="acc-q" aria-expanded={isOpen} aria-controls={'a-' + key} id={'q-' + key} onClick={() => setOpen(isOpen ? '' : key)}>
                          {it.q}<span className="plus" aria-hidden="true" />
                        </button>
                      </h3>
                      <div className="acc-a" id={'a-' + key} role="region" aria-labelledby={'q-' + key} hidden={!isOpen}>
                        <p>{it.a}</p>
                        <p style={{ marginTop: 12 }}>
                          {it.act.topic
                            ? <button className="btn btn-ink" onClick={() => openWA(it.act.topic)}><Icon.wa />{it.act.label}</button>
                            : <a className="btn btn-line" href={it.act.href}>{it.act.label} <Icon.arrow /></a>}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============== MERCH ==============
function MerchPage() {
  return (
    <div className="page">
      <Lead eyebrow="Merch" title="The Let There Be Light collection."
        actions={<button className="btn btn-candle" onClick={() => openWA('general', 'Please let me know when the Let There Be Light collection is available.')}><Icon.wa />Tell me when it opens</button>}>
        Clothing and objects carrying messages of Torah, supporting the work of Yehi Ohr. The collection isn’t available to order yet, so no items or prices are listed here.
      </Lead>
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="small">In the meantime: <a className="text-link" href="#support">support Yehi Ohr directly →</a></p>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { MusicPage, ToursPage, CommunityPage, TeachingPage, SupportPage, VisionPage, ContactPage, FAQPage, MerchPage });
