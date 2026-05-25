'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Placeholder, Photo, Reveal, Eyebrow } from './Components';
import { MiniPlayer } from './Pages';

// Additional pages: Music, Tours, Community, Teaching, Support, Vision, Contact, FAQ

function MusicPage({ setRoute }) {
  return (
    <div data-screen-label="Music" className="pt-[72px]">
      <section className="relative py-24 sm:py-32">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Music & Experience</Eyebrow>
            <h1 className="font-display mt-6 text-[64px] sm:text-[120px] lg:text-[160px] leading-[0.9] tracking-[-0.025em]">
              The <span className="font-display-i text-[var(--gold)]">niggun</span><br/>is a doorway.
            </h1>
            <p className="mt-10 max-w-xl text-[18px] leading-[1.6] text-[rgba(244,237,225,0.78)]">
              Music here is not decoration. It is Chassidut — Torah taught through sound, breath, and the shared silence between notes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* featured release */}
      <section className="py-16 border-y border-[rgba(244,237,225,0.06)] ambient-amber">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <Photo src="/assets/adam-kadmon-cover.webp" alt="Adam Kadmon — album cover with Avshi Weingot and Shlepping Nachas" aspect="1/1" />
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={150}>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">Featured Release</div>
              <h2 className="font-display mt-4 text-[56px] sm:text-[80px] leading-[0.95]">Adam Kadmon</h2>
              <div className="mt-3 text-[14px] tracking-[0.18em] uppercase text-[rgba(244,237,225,0.55)]">Avshi Weingot × Shlepping Nachas</div>
              <p className="mt-6 text-[16px] leading-[1.75] text-[rgba(244,237,225,0.7)] max-w-md">
                The first man, the first light — a niggun that travels from before the world to the kitchen table on Friday night.
              </p>
              <div className="mt-8">
                <MiniPlayer />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#" className="btn-ghost px-5 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Spotify</a>
                <a href="#" className="btn-ghost px-5 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">YouTube</a>
                <a href="#" className="btn-ghost px-5 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Apple Music</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* discography */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Discography</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">Recordings, nigunim, and live moments.</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t:'Adam Kadmon', m:'Single · 5786', tag:'Latest', cover:'/assets/adam-kadmon-cover.webp' },
              { t:'Kol Dodi', m:'Nigun · 5785', tag:'Live · Tzfat' },
              { t:'Shir HaShirim', m:'Suite · 5785', tag:'Studio' },
              { t:'Ohr HaGanuz', m:'Nigun · 5784', tag:'Live · Uman' },
              { t:'Erev Shel Shoshanim', m:'Nigun · 5784', tag:'Reimagined' },
              { t:'Hineni', m:'Single · 5784', tag:'Studio' },
              { t:'Tzfat Shabbat Live', m:'Album · 5783', tag:'Live' },
              { t:'Bilvavi', m:'Nigun · 5783', tag:'Studio' },
            ].map(({t,m,tag,cover},i)=>(
              <Reveal key={t} delay={i*40}>
                <div className="group">
                  <div className="relative">
                    {cover
                      ? <Photo src={cover} alt={`${t} — cover art`} aspect="1/1" />
                      : <Placeholder label={`${t} — cover art`} aspect="1/1" />}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full btn-primary flex items-center justify-center">
                        <svg width="12" height="14" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0v16l14-8z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--gold)]">{tag}</div>
                    <div className="font-display text-[22px] mt-1">{t}</div>
                    <div className="text-[12px] text-[rgba(244,237,225,0.5)]">{m}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* live experiences */}
      <section className="py-24 border-t border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Photo src="/assets/campfire-night.webp" alt="Live niggun gathering around a campfire under stars" aspect="3/2" />
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow>Live & Experiential</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] text-balance">Tish, niggun gatherings, and evenings of fire.</h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-[rgba(244,237,225,0.7)] max-w-md">
              Sometimes a class is a song. Sometimes a song is a class. Live niggun evenings at Yehi Ohr and on tour are an invitation to drop the words and remember what the words are pointing toward.
            </p>
            <button onClick={() => setRoute('tours')} className="link-soft mt-8 inline-flex items-center gap-2 text-[13px] tracking-[0.18em] uppercase text-[var(--gold)]">
              See upcoming live nights <span>→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ToursPage({ setRoute }) {
  return (
    <div data-screen-label="Tours" className="pt-[72px]">
      <section className="relative overflow-hidden border-b border-[rgba(244,237,225,0.06)]">
        {/* full-bleed Tzfat sunset prayer backdrop */}
        <div className="absolute inset-0 -z-0">
          <img
            src="/assets/rav-praying-tzfat.webp"
            alt="Rav Avshi in prayer overlooking Tzfat at sunset"
            className="absolute inset-0 w-full h-full object-cover kenburns"
            style={{ objectPosition: '70% 50%' }}
            loading="eager"
          />
          {/* directional readability gradient — heavy on the left so the headline reads, soft on the right so Rav Avshi stays visible */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(90deg, rgba(20,16,10,0.85) 0%, rgba(20,16,10,0.6) 35%, rgba(20,16,10,0.15) 60%, rgba(20,16,10,0.0) 80%)'
          }} />
          {/* warm gold blend so the sunset and the gold palette feel unified */}
          <div className="absolute inset-0" style={{
            background:
              'radial-gradient(45% 40% at 12% 45%, rgba(232,166,87,0.22), transparent 65%),' +
              'radial-gradient(40% 35% at 35% 80%, rgba(160,122,58,0.16), transparent 70%)',
            mixBlendMode: 'screen'
          }} />
          {/* top + bottom scrim for nav + section transition */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(20,16,10,0.45) 0%, rgba(20,16,10,0) 18%, rgba(20,16,10,0) 75%, rgba(20,16,10,0.92) 100%)'
          }} />
          {/* cinematic vignette */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(130% 95% at 50% 50%, transparent 40%, rgba(20,16,10,0.55) 100%)'
          }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 py-32 sm:py-44 lg:py-52 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Activities · Tours · Seminars</Eyebrow>
              <h1 className="font-display mt-6 text-[60px] sm:text-[96px] lg:text-[128px] leading-[0.92] tracking-[-0.02em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)]">
                Torah you walk,<br/><span className="font-display-i text-[var(--gold)]">sing, and live.</span>
              </h1>
              <p className="mt-10 max-w-xl text-[18px] leading-[1.65] text-[rgba(244,237,225,0.88)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
                Immersive journeys with Rav Avshi — through Tzfat alleyways, Ukrainian holy sites, and the inner geography of your own soul.
              </p>
              <div className="mt-8 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] flicker" />
                Tzfat · Uman · New York · Mexico
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* offerings */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 space-y-5">
          {[
            { tag:'International Tour', t:'Ukraine — Breslov & Holy Sites', d:'A seven-day pilgrimage through Uman, Mezhibuzh, and the places where Chassidut was born — taught and held with care.', meta:['7 days','Winter & Summer cycles','EN / HE'], img:'/assets/rav-praying.webp', alt:'Rav Avshi in prayer outdoors', wa:{ topic:'tour', notes:'Shalom Rav Avshi, I’m interested in the Ukraine — Breslov & Holy Sites journey.' } },
            { tag:'Seminar', t:'Godly Me · Inner Torah Intensive', d:'A three-day experiential program weaving Torah, reflection, niggun, and community. For people ready to go inside.', meta:['3 days','At Yehi Ohr · Tzfat','Small groups'], img:'/assets/looking-clouds.webp', alt:'Students leaning on a railing, looking out at dramatic skies', wa:{ topic:'tour', notes:'Shalom Rav Avshi, I’m interested in the Godly Me Inner Torah Intensive.' } },
            { tag:'Spiritual Tour', t:'Tzfat Spiritual Tour', d:'Tzfat as a living classroom — Ari mikveh, kabbalistic shuls, blue alleys, and the stories that still live in the stones.', meta:['1–5 days','Custom for groups','Year-round'], img:'/assets/tzfat-alley.webp', alt:'Tzfat alley with blue doors and olive tree', wa:{ topic:'tour', notes:'Shalom Rav Avshi, I’m interested in booking a Tzfat Spiritual Tour.' } },
            { tag:'Shabbat', t:'Shabbat of Light · Yehi Ohr', d:'A complete Shabbat — Kabbalat Shabbat, meals, learning, music, walks in Tzfat. The heart of everything we do.', meta:['Fri–Sat','Monthly','Open to all'], img:'/assets/group-smiling.webp', alt:'Rav Avshi with students, laughing', wa:{ topic:'shabbat', notes:'Shalom Rav Avshi, I’m interested in joining the Shabbat of Light at Yehi Ohr.' } },
          ].map((j,i) => (            <Reveal key={j.t} delay={i*80}>
              <article className="event-card grid lg:grid-cols-12 gap-6 lg:gap-10 p-6 lg:p-8 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.015)] hover:bg-[rgba(244,237,225,0.04)] transition-colors">
                <div className="lg:col-span-5">
                  <Photo src={j.img} alt={j.alt} aspect="3/2" />
                </div>
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{j.tag}</div>
                    <h3 className="font-display mt-3 text-[36px] sm:text-[44px] leading-[1.05]">{j.t}</h3>
                    <p className="mt-4 text-[15px] leading-[1.75] text-[rgba(244,237,225,0.7)] max-w-xl">{j.d}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    {j.meta.map(m => <span key={m} className="chip px-4 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase">{m}</span>)}
                    <button onClick={() => window.dispatchEvent(new CustomEvent('yo:open-wa', { detail: j.wa }))} className="ml-auto btn-primary px-5 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase">Register →</button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* map suggestion */}
      <section className="py-24 mt-12 border-y border-[rgba(244,237,225,0.06)] ambient-stone">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>The Routes</Eyebrow>
              <h2 className="font-display mt-5 text-[40px] sm:text-[52px] leading-[1.05] text-balance">From Tzfat outward, in every direction.</h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-[rgba(244,237,225,0.65)] max-w-md">
                Tzfat anchors the work. The world is the classroom — Ukraine, New York, Mexico, and wherever soul-family gathers.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <Placeholder label="Stylized map — Tzfat as glowing center; thin gold lines arc to Uman, NYC, CDMX" note="Suggested: animated paths, slow draw-in" aspect="3/2" />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function CommunityPage({ setRoute }) {
  return (
    <div data-screen-label="Community" className="pt-[72px]">
      <section className="py-24 sm:py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <Reveal>
            <Eyebrow>Community</Eyebrow>
            <h1 className="font-display mt-6 text-[60px] sm:text-[100px] leading-[0.95] tracking-[-0.02em]">
              A circle of <span className="font-display-i text-[var(--gold)]">soul-family.</span>
            </h1>
            <p className="mt-8 text-[18px] leading-[1.7] text-[rgba(244,237,225,0.78)] max-w-2xl mx-auto">
              In Tzfat, in cities across the world, and in the connection that stays after the journey ends.
            </p>
          </Reveal>
        </div>
      </section>

      {/* split — local vs global */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-5">
          {[
            { t:'Local · Tzfat', d:'Weekly classes, Friday night davening at the Mekarev Shul, Shabbat meals at the family home, niggun evenings, daily learning at Shalom Rav. The rhythm of a place.', img:'/assets/three-sitting.webp', alt:'Rav Avshi sitting with students on Tzfat steps' },
            { t:'Global', d:'Tours and gatherings in Ukraine, New York, Mexico, and more. Online classes that reach laptops in twenty time zones. Connection beyond geography.', img:'/assets/looking-clouds.webp', alt:'Students looking out together over a dramatic sky' },
          ].map((p,i)=>(
            <Reveal key={p.t} delay={i*100}>
              <div className="rounded-sm overflow-hidden border border-[rgba(244,237,225,0.1)]">
                <Photo src={p.img} alt={p.alt} aspect="4/3" />
                <div className="p-8 bg-[rgba(244,237,225,0.02)]">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">0{i+1}</div>
                  <h2 className="font-display mt-3 text-[34px] leading-[1.05]">{p.t}</h2>
                  <p className="mt-4 text-[15px] leading-[1.75] text-[rgba(244,237,225,0.7)]">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* gallery wall */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Moments</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">A gallery from the path.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src:'/assets/group-smiling.webp', a:'3/4', alt:'Rav Avshi with students, laughing' },
              { src:'/assets/campfire-night.webp', a:'1/1', alt:'Niggun around a campfire' },
              { src:'/assets/rav-praying.webp', a:'3/4', alt:'Rav Avshi in prayer' },
              { src:'/assets/jumping-mountains.webp', a:'1/1', alt:'Mid-leap in the hills' },
              { src:'/assets/looking-clouds.webp', a:'3/4', alt:'Students looking out at dramatic skies' },
              { src:'/assets/tzfat-sunset.webp', a:'1/1', alt:'Tzfat at golden hour' },
              { src:'/assets/three-sitting.webp', a:'3/4', alt:'Conversation on the stone steps' },
              { src:'/assets/rav-meditative.webp', a:'1/1', alt:'Rav Avshi in meditation' },
              { src:'/assets/tzfat-alley.webp', a:'3/4', alt:'Tzfat blue door alley' },
              { src:'/assets/learning-doorway.webp', a:'1/1', alt:'Learning at the table by the window' },
              { src:'/assets/students-walking.webp', a:'3/4', alt:'Students walking together' },
              { src:'/assets/prayer-mountains.webp', a:'1/1', alt:'Prayer in the mountains' },
            ].map((it,i)=>(
              <Reveal key={i} delay={i*40}>
                <Photo src={it.src} alt={it.alt} aspect={it.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TeachingPage({ setRoute }) {
  return (
    <div data-screen-label="Teaching" className="pt-[72px]">
      <section className="py-24 sm:py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Teaching & Path</Eyebrow>
            <h1 className="font-display mt-6 text-[56px] sm:text-[96px] leading-[0.95] tracking-[-0.02em]">
              Mind, heart, and <span className="font-display-i text-[var(--gold)]">lived experience.</span>
            </h1>
            <p className="mt-10 text-[19px] leading-[1.65] text-[rgba(244,237,225,0.78)] max-w-2xl">
              Rav Avshi teaches Torah through Kabbalah, Chassidut, and music — never as information to be stored, always as light to be lived.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 border-t border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid md:grid-cols-3 gap-5">
          {[
            { n:'I.', t:'Mind', d:'Rigor in text — Zohar, Ramak, Ari, Chassidic masters. Sources held with both hands.' },
            { n:'II.', t:'Heart', d:'Niggun, prayer, story, breath. Letting what the mind grasps reach the place that already knew.' },
            { n:'III.', t:'Experience', d:'Shabbat, journey, community, silence. Torah as something walked, sung, and lived.' },
          ].map((p,i)=>(
            <Reveal key={p.t} delay={i*100}>
              <div className="p-8 h-full rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)]">
                <div className="font-display-i text-[var(--gold)] text-[40px] leading-none">{p.n}</div>
                <h3 className="font-display mt-4 text-[32px]">{p.t}</h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-[rgba(244,237,225,0.7)]">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* classes */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Classes</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">Weekly learning, in person & online.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {[
              ['Zohar with Rav Avshi','Tuesdays 21:00 · Live + Zoom','EN / HE'],
              ['Chassidut of the Ramak','Thursdays 20:00 · In person','HE'],
              ['Inner Torah for Women','Wednesdays · Online','EN'],
              ['Daf Yomi Niggun','Sunday mornings · Recorded','EN / HE'],
            ].map(([t,w,l],i)=>(
              <Reveal key={t} delay={i*60}>
                <div className="event-card flex items-center justify-between gap-6 p-6 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.015)]">
                  <div>
                    <h3 className="font-display text-[26px]">{t}</h3>
                    <div className="mt-1 text-[13px] text-[rgba(244,237,225,0.6)]">{w}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="chip px-3 py-1.5 rounded-full text-[10px] tracking-[0.25em]">{l}</span>
                    <button className="btn-ghost px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase">Join</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SupportPage({ setRoute }) {
  const [amount, setAmount] = useState(180);
  const [recurring, setRecurring] = useState(true);
  const tiers = [54, 180, 360, 1800];
  return (
    <div data-screen-label="Support" className="pt-[72px]">
      <section className="py-24 sm:py-32 ambient-amber">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <Reveal>
            <Eyebrow>Build the Light</Eyebrow>
            <h1 className="font-display mt-6 text-[60px] sm:text-[100px] leading-[0.95] tracking-[-0.02em]">
              Help build the <span className="font-display-i text-[var(--gold)]">home of light.</span>
            </h1>
            <p className="mt-8 text-[18px] leading-[1.7] text-[rgba(244,237,225,0.8)] max-w-2xl mx-auto">
              Yehi Ohr is a living spiritual movement — and its permanent home is being built together with friends, students, and supporters around the world. Every contribution helps transform the vision of Yehi Ohr into a real home for Torah, hospitality, music, prayer, and healing in Tzfat.
            </p>
            <div className="mt-6 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)] flex items-center justify-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] flicker" />
              From dream to reality · built together
            </div>
          </Reveal>
        </div>
      </section>

      {/* donation card */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <Reveal>
            <div className="rounded-sm border border-[rgba(244,237,225,0.12)] bg-[rgba(20,16,10,0.6)] p-8 sm:p-12">
              <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">Lay Another Stone</div>
                  <h2 className="font-display mt-2 text-[40px] sm:text-[52px] leading-[1.05]">Give once. Or every month.</h2>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-[rgba(244,237,225,0.15)] p-1">
                  {[['Monthly', true],['One time', false]].map(([l, v]) => (
                    <button key={l} onClick={() => setRecurring(v)}
                      className={`px-5 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase transition-colors ${recurring===v?'bg-[var(--gold)] text-[#1a120b]':'text-[rgba(244,237,225,0.7)]'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tiers.map(v => (
                  <button key={v} onClick={() => setAmount(v)}
                    className={`p-6 rounded-sm border transition-colors ${amount===v?'border-[var(--gold)] bg-[rgba(232,166,87,0.08)]':'border-[rgba(244,237,225,0.12)] hover:border-[rgba(244,237,225,0.3)]'}`}>
                    <div className="font-display text-[36px]">${v}</div>
                    <div className="mt-1 font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.5)]">
                      {v===54?'Chai':v===180?'Chai × 10':v===360?'Builder':'Pillar'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="text-[14px] text-[rgba(244,237,225,0.55)]">Other amount</span>
                <input type="number" value={amount} onChange={e=>setAmount(+e.target.value||0)}
                  className="flex-1 bg-transparent border-b border-[rgba(244,237,225,0.18)] focus:border-[var(--gold)] outline-none px-2 py-2 font-display text-[28px]" />
                <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[rgba(244,237,225,0.5)]">USD</span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="https://www.paypal.com/paypalme/avshiweingot" target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase font-medium">
                  Help build the light · ${amount}{recurring?' / month':''}
                </a>
                <a href="https://www.paypal.com/paypalme/avshiweingot" target="_blank" rel="noopener noreferrer" className="btn-ghost text-center px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Sponsor a Shabbat</a>
              </div>

              <div className="mt-4 text-center text-[12px] text-[rgba(244,237,225,0.55)]">
                You'll be redirected to PayPal to complete your secure gift.
              </div>

              <div className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.4)]">
                501(c)(3) compatible · Tax deductible (US/UK/IL) · Secure payment
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* impact */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Become Part of the Foundation</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">What your gift becomes.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ['$18','sponsors candles for a Shabbat at Yehi Ohr.'],
              ['$54','hosts one guest at a Shabbat meal — meal, song, soul.'],
              ['$180','helps build a week of learning, prayer, and gathering.'],
              ['$1,800','lays a meaningful stone in the foundation of the future center.'],
            ].map(([a,d],i)=>(
              <Reveal key={a} delay={i*80}>
                <div className="p-7 h-full rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)]">
                  <div className="font-display text-[44px] leading-none text-[var(--gold)]">{a}</div>
                  <p className="mt-4 text-[15px] leading-[1.7] text-[rgba(244,237,225,0.75)]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* other ways */}
      <section className="py-20 border-t border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid md:grid-cols-3 gap-5">
          {[
            ['Volunteer','Lend your skill — writing, design, hospitality, photography, languages — to the light.'],
            ['Visit','Come to Tzfat. A Shabbat. A class. A coffee. Presence is also a kind of giving.'],
            ['Spread the word','Share a class, a niggun, a tour with one person who needs it. That is everything.'],
          ].map(([t,d],i)=>(
            <Reveal key={t} delay={i*80}>
              <div className="event-card p-7 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.015)]">
                <h3 className="font-display text-[28px]">{t}</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-[rgba(244,237,225,0.65)]">{d}</p>
                <button className="link-soft mt-5 text-[12px] tracking-[0.2em] uppercase text-[var(--gold)]">Begin →</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function VisionPage({ setRoute }) {
  return (
    <div data-screen-label="Vision" className="pt-[72px]">
      {/* HERO */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-1/3 right-[8%] w-[420px] h-[420px] rounded-full pointer-events-none float-slow"
             style={{ background: 'radial-gradient(circle, rgba(232,166,87,0.18), transparent 65%)' }} />
        <div className="absolute bottom-[10%] left-[6%] w-[360px] h-[360px] rounded-full pointer-events-none float-slow"
             style={{ background: 'radial-gradient(circle, rgba(202,164,92,0.14), transparent 60%)', animationDelay: '3s' }} />

        <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Vision</Eyebrow>
            <h1 className="font-display mt-6 text-[64px] sm:text-[120px] leading-[0.92] tracking-[-0.025em]">
              A dream actively <span className="font-display-i text-[var(--gold)]">being built.</span>
            </h1>
            <p className="mt-10 text-[20px] leading-[1.6] text-[rgba(244,237,225,0.82)] max-w-2xl">
              A permanent home for inner Torah in Tzfat. A place where learning, music, prayer, and hospitality live under one roof — already alive in spirit, slowly rising in stone.
            </p>
            <div className="mt-8 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] flicker" />
              From vision to reality · built together
            </div>
          </Reveal>
        </div>
      </section>

      {/* The dream — image alongside text */}
      <section className="py-20 border-t border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Photo src="/assets/yehi-ohr-building.webp" alt="Yehi Ohr — exterior render" aspect="852/402" />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-[36px] sm:text-[48px] leading-[1.05]">
                A home <span className="font-display-i text-[var(--gold)]">slowly rising</span> beside an open door.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-[rgba(244,237,225,0.72)]">
                What began in a family living room is becoming a sanctuary in Jerusalem stone, wood, and glass. The community is already living — the building is the next chapter, and you are invited to help write it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we're building */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>The Next Chapter</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-3xl">
              What we are building, <span className="font-display-i text-[var(--gold)]">together.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['01','A larger beit midrash','Room for more talmidim, more chavrutot, more depth in the inner Torah of Tzfat.'],
              ['02','A guesthouse','For travelers, soul-family, and seekers \u2014 a place to land, rest, and stay close to the learning.'],
              ['03','Yehi Ohr Studio','Recording, translation, broadcast \u2014 carrying the light to twenty time zones in three languages.'],
              ['04','Shabbat hospitality','Long tables under candlelight, expanding capacity to welcome more guests every week.'],
              ['05','Music gatherings','A dedicated space for tish, niggun nights, and live recordings of inner Torah through song.'],
              ['06','Gardens & quiet corners','Olive and pomegranate, stone walls, places for a slow breath and chavruta under sky.'],
            ].map(([n,t,d],i)=>(
              <Reveal key={n} delay={i*80}>
                <div className="event-card p-8 h-full rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)]">
                  <div className="font-display-i text-[var(--gold)] text-[44px] leading-none">{n}</div>
                  <h3 className="font-display mt-4 text-[26px] leading-tight">{t}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[rgba(244,237,225,0.68)]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Already alive */}
      <section className="py-24 border-y border-[rgba(244,237,225,0.06)] ambient-stone">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Already Alive</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">
              The community is <span className="font-display-i text-[var(--gold)]">already living.</span>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.75] text-[rgba(244,237,225,0.72)] max-w-2xl">
              Even as the walls are being built, the rhythm of Yehi Ohr is here: weekly classes, Friday-night davening, Shabbat tables, music nights, tours in Tzfat, journeys to Uman. The vision is not a someday \u2014 it is being lived now, with every Shabbat that arrives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 ambient-amber">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <Reveal>
            <Eyebrow>Build with Us</Eyebrow>
            <h2 className="font-display mt-6 text-[48px] sm:text-[80px] leading-[1.0] text-balance">
              Become part of the <span className="font-display-i text-[var(--gold)]">foundation.</span>
            </h2>
            <p className="mt-7 text-[17px] leading-[1.7] text-[rgba(244,237,225,0.75)] max-w-2xl mx-auto">
              You are invited to help create something sacred \u2014 stone by stone, Shabbat by Shabbat. From dream to reality, together.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <a href="https://www.paypal.com/paypalme/avshiweingot" target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Help Build the Light</a>
              <button onClick={() => setRoute('community')} className="btn-ghost px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Visit Yehi Ohr</button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ContactPage({ setRoute }) {
  const [sent, setSent] = useState(false);
  return (
    <div data-screen-label="Contact" className="pt-[72px]">
      <section className="py-24 sm:py-32">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="font-display mt-6 text-[56px] sm:text-[88px] leading-[0.95]">
                Write to <span className="font-display-i text-[var(--gold)]">us.</span>
              </h1>
              <p className="mt-6 text-[16px] leading-[1.7] text-[rgba(244,237,225,0.7)] max-w-md">
                Visiting Tzfat. Booking a group. Asking a question of the heart. We read everything that arrives.
              </p>
              <div className="mt-10 space-y-4 font-mono text-[12px] tracking-[0.15em] uppercase text-[rgba(244,237,225,0.55)]">
                <div><span className="text-[var(--gold)] mr-3">EMAIL</span> hello@lettherebelight.center</div>
                <div><span className="text-[var(--gold)] mr-3">WHATSAPP</span> <a href="https://wa.me/+972545404914" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors normal-case tracking-wider">+972 54 540 4914</a></div>
                <div><span className="text-[var(--gold)] mr-3">ADDRESS</span> Old City · Tzfat · Israel</div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <form onSubmit={e=>{e.preventDefault(); setSent(true);}} className="p-8 sm:p-10 rounded-sm border border-[rgba(244,237,225,0.12)] bg-[rgba(20,16,10,0.6)]">
                {sent ? (
                  <div className="text-center py-16">
                    <div className="font-display text-[36px]">Thank you.</div>
                    <p className="mt-4 text-[15px] text-[rgba(244,237,225,0.7)]">Your message has been received. We will write back soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Your name" />
                      <Field label="Email" type="email" />
                    </div>
                    <div className="mt-5">
                      <Field label="What is your question about?" select options={['Visiting Tzfat','Booking a group','Tour or seminar','Donation','Press','Something else']} />
                    </div>
                    <div className="mt-5">
                      <Field label="Tell us more" textarea />
                    </div>
                    <div className="mt-7 flex items-center justify-between flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-[12px] text-[rgba(244,237,225,0.55)] tracking-[0.1em] uppercase">
                        <input type="checkbox" defaultChecked className="accent-[var(--gold)]"/> Add me to the newsletter
                      </label>
                      <button className="btn-primary px-7 py-3.5 rounded-full text-[12px] tracking-[0.18em] uppercase">Send Letter →</button>
                    </div>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, type='text', textarea, select, options }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.5)] mb-2">{label}</span>
      {textarea ? (
        <textarea rows="5" className="w-full bg-transparent border-b border-[rgba(244,237,225,0.18)] focus:border-[var(--gold)] outline-none py-2 text-[16px] resize-none transition-colors" />
      ) : select ? (
        <select className="w-full bg-transparent border-b border-[rgba(244,237,225,0.18)] focus:border-[var(--gold)] outline-none py-2 text-[16px] transition-colors">
          {options.map(o=><option key={o} className="bg-[#14100a]">{o}</option>)}
        </select>
      ) : (
        <input type={type} className="w-full bg-transparent border-b border-[rgba(244,237,225,0.18)] focus:border-[var(--gold)] outline-none py-2 text-[16px] transition-colors" />
      )}
    </label>
  );
}

function FAQPage({ setRoute }) {
  const [open, setOpen] = useState(0);
  const faqs = [
    ['Who is this for?', 'For anyone — Jewish or not, observant or not, beginner or scholar — who feels drawn to inner Torah, music, and a more lived spiritual life.'],
    ['Do I need prior knowledge?', 'No. Classes and experiences are designed to meet you where you are. We translate, we slow down, we make space.'],
    ['What languages are offered?', 'English, Hebrew, and Spanish. Many classes are bilingual; tours can be booked in any of the three.'],
    ['Can I learn online?', 'Yes. Weekly classes are live-streamed and recorded. Online community gatherings happen monthly.'],
    ['Is travel to Tzfat involved?', 'For some programs, yes — Shabbatonim and seminars happen at Yehi Ohr. Tours and online classes are accessible from anywhere.'],
    ['Is it suitable for families?', 'Yes. Children are welcome at most gatherings; some programs are adults-only by design. Ask us about your group.'],
  ];
  return (
    <div data-screen-label="FAQ" className="pt-[72px]">
      <section className="py-24 sm:py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h1 className="font-display mt-6 text-[56px] sm:text-[88px] leading-[0.95]">Questions, gently answered.</h1>
          </Reveal>
          <div className="mt-14 divide-y divide-[rgba(244,237,225,0.08)] border-y border-[rgba(244,237,225,0.08)]">
            {faqs.map(([q,a],i)=>(
              <button key={q} onClick={()=>setOpen(open===i?-1:i)} className="block w-full text-left py-7">
                <div className="flex items-center justify-between gap-6">
                  <span className="font-display text-[26px] sm:text-[32px] leading-[1.15]">{q}</span>
                  <span className={`font-display-i text-[var(--gold)] text-[36px] transition-transform ${open===i?'rotate-45':''}`}>+</span>
                </div>
                <div className={`overflow-hidden transition-all ${open===i?'max-h-40 mt-4':'max-h-0'}`}>
                  <p className="text-[16px] leading-[1.75] text-[rgba(244,237,225,0.7)] max-w-2xl">{a}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function MerchPage({ setRoute }) {
  return (
    <div data-screen-label="Merch" className="pt-[72px]">
      <section className="py-24 sm:py-32">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Torah Through Design</Eyebrow>
            <h1 className="font-display mt-6 text-[60px] sm:text-[100px] leading-[0.95]">
              Wear the <span className="font-display-i text-[var(--gold)]">light.</span>
            </h1>
            <p className="mt-8 text-[18px] leading-[1.7] text-[rgba(244,237,225,0.78)] max-w-xl">
              The Let There Be Light collection — clothing and objects carrying messages of Torah. Every piece supports the work of Yehi Ohr.
            </p>
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['Yehi Ohr Tee','Stone · gold print','$48'],
              ['Adam Kadmon Hoodie','Charcoal · oversized','$96'],
              ['Tzfat Stone Mug','Hand-thrown','$32'],
              ['Niggun Cassette','Limited · with download','$24'],
              ['Light Print','Letterpress · 11×17','$45'],
              ['Beit Midrash Tote','Natural canvas','$28'],
            ].map(([t,m,p],i)=>(
              <Reveal key={t} delay={i*60}>
                <div className="event-card group">
                  <Placeholder label={`${t} — product photo`} aspect="4/5" />
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="font-display text-[22px]">{t}</div>
                      <div className="text-[12px] text-[rgba(244,237,225,0.5)]">{m}</div>
                    </div>
                    <div className="font-mono text-[13px] tracking-[0.1em] text-[var(--gold)]">{p}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export { MusicPage, ToursPage, CommunityPage, TeachingPage, SupportPage, VisionPage, ContactPage, FAQPage, MerchPage };
