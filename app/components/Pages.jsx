'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Placeholder, Photo, Reveal, Eyebrow, R } from './Components';

// ============== HOME ==============
function HomePage({ setRoute }) {
  return (
    <div data-screen-label="Home">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <HeroBackdrop />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 py-32 w-full">
          <Reveal>
            <Eyebrow>יהי אור · Yehi Ohr · Tzfat</Eyebrow>
          </Reveal>
          <Reveal delay={250}>
            <h1 className="font-display mt-8 text-[56px] sm:text-[88px] lg:text-[124px] leading-[0.95] tracking-[-0.02em] text-balance max-w-[1100px]">
              Torah, Light, and<br/>
              <span className="font-display-i text-[var(--gold)]">Living Experience.</span>
            </h1>
          </Reveal>
          <Reveal delay={500}>
            <p className="mt-10 max-w-xl text-[17px] sm:text-[19px] leading-[1.65] text-[rgba(244,237,225,0.78)]">
              A place to learn, feel, and live Torah — through Kabbalah, Chassidut, music, and sacred journeys with Rav Avshi, from the ancient stones of Tzfat to the world.
            </p>
            <div className="mt-6 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] flicker" />
              A living vision growing in the heart of Tzfat
            </div>
          </Reveal>
          <Reveal delay={700}>
            <div className="mt-12 flex flex-wrap gap-3">
              <button onClick={() => setRoute('yehi-ohr')} className="btn-primary px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase font-medium">Visit Yehi Ohr</button>
              <a href="https://wa.me/+972545404914"
                 target="_blank" rel="noopener noreferrer"
                 className="btn-ghost px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-[var(--gold)] hover:text-[var(--gold)] hover:shadow-[0_0_30px_rgba(232,166,87,0.25)]">
                Join a Shabbat
              </a>
              <button onClick={() => setRoute('teaching')} className="btn-ghost px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Explore Torah</button>
              <button onClick={() => setRoute('music')} className="btn-ghost px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Experience the Music</button>
            </div>
          </Reveal>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.4em] uppercase text-[rgba(244,237,225,0.5)]">
          <span>scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[rgba(244,237,225,0.5)] to-transparent" />
        </div>
      </section>

      {/* INTRO — who Rav Avshi is */}
      <section className="relative py-32 sm:py-40 ambient-stone">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Who Rav Avshi Is</Eyebrow>
              <h2 className="font-display mt-6 text-[44px] sm:text-[64px] leading-[1.02] tracking-[-0.01em] text-balance">
                A teacher of <span className="font-display-i text-[var(--gold)]">lived light.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-7">
            <Reveal delay={200}>
              <p className="text-[19px] sm:text-[22px] leading-[1.55] text-[rgba(244,237,225,0.82)] font-light text-balance">
                Rav Avshi is a teacher, guide, and creator of immersive Torah experiences rooted in Chassidut and Kabbalah. From Tzfat to communities around the world, his work invites people to encounter Torah not only as wisdom — but as lived light.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 text-[14px] font-mono tracking-[0.18em] uppercase text-[rgba(244,237,225,0.55)]">
                <span>Tzfat · Born &amp; Raised</span>
                <span>Yeshiva Shalom Rav</span>
                <span>Talmid · Rav Y.M. Morgenstern</span>
              </div>
              <button onClick={() => setRoute('rav-avshi')} className="link-soft mt-8 inline-flex items-center gap-2 text-[13px] tracking-[0.18em] uppercase text-[var(--gold)]">
                Read his story <span>→</span>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="relative py-32 border-t border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Four Pillars</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-3xl">
              One world, woven of four threads.
            </h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { idx:'01', t:'Torah, Kabbalah & Chassidut', d:'Inner Torah through the Zohar, the Ramak, the Ari — taught with the heart of Chassidut.', img:'/assets/learning-doorway.webp', alt:'Three men learning at a wooden table, mountains beyond', route:'teaching' },
              { idx:'02', t:'Yehi Ohr Center, Tzfat', d:'A wood-and-glass sanctuary being built beside the family home — a growing space for prayer, Shabbat, and gathering.', img:'/assets/tzfat-sunset.webp', alt:'Tzfat at golden hour, view from a stone terrace', route:'yehi-ohr' },
              { idx:'03', t:'Community, Local & Global', d:'Tzfat, Ukraine, New York, Mexico — a circle of soul-family in every direction.', img:'/assets/students-walking.webp', alt:'Rav Avshi\'s students walking together in Tzfat', route:'community' },
              { idx:'04', t:'Music & Experiential Teaching', d:'Nigunim, live niggun gatherings, recorded releases — Torah taught through sound.', img:'/assets/campfire-night.webp', alt:'Niggun gathering around a campfire under stars', route:'music' },
            ].map((p,i) => (
              <Reveal key={p.idx} delay={i*100}>
                <button onClick={() => setRoute(p.route)} className="event-card group block text-left w-full h-full p-6 sm:p-7 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.015)] hover:bg-[rgba(244,237,225,0.04)] transition-colors">
                  <Photo src={p.img} alt={p.alt} aspect="4/5" className="mb-6 rounded-sm" kenburns />
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{p.idx}</div>
                  <h3 className="font-display mt-3 text-[26px] sm:text-[30px] leading-[1.1]">{p.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[rgba(244,237,225,0.6)]">{p.d}</p>
                  <div className="mt-5 text-[12px] tracking-[0.2em] uppercase text-[rgba(244,237,225,0.55)] group-hover:text-[var(--gold)] transition-colors">Enter →</div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED CINEMATIC */}
      <section className="relative my-32">
        <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
          <img src="/assets/tzfat-sunset.webp" alt="Tzfat at golden hour" className="absolute inset-0 w-full h-full object-cover kenburns" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,10,0.55) 0%, rgba(20,16,10,0.3) 40%, rgba(20,16,10,0.8) 100%)' }} />
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
            <Reveal>
              <div className="font-display-i text-[var(--parchment)] text-[34px] sm:text-[58px] lg:text-[80px] leading-[1.1] max-w-5xl text-balance">
                “To reveal the inner secrets of Torah is to bring light, healing,<br className="hidden sm:block" /> and the quiet beginning of redemption.”
              </div>
              <div className="mt-8 font-mono text-[11px] tracking-[0.35em] uppercase text-[var(--gold)]">— Rav Avshi</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED — upcoming */}
      <section className="relative py-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <Eyebrow>What's Upcoming</Eyebrow>
              <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">The next gatherings.</h2>
            </div>
            <div className="flex gap-2">
              {['All','Shabbat','Tours','Classes','Music'].map((f,i)=>(
                <button key={f} className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase rounded-full border ${i===0?'border-[var(--gold)] text-[var(--gold)]':'border-[rgba(244,237,225,0.15)] text-[rgba(244,237,225,0.6)] hover:border-[rgba(244,237,225,0.35)]'} transition-colors`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { tag:'Shabbaton', when:'Dec 12–14 · 5786', t:'Shabbat of Light · Tzfat', loc:'Yehi Ohr Center', spots:'8 places left', img:'/assets/group-smiling.webp', alt:'Rav Avshi with students, laughing' },
              { tag:'Tour', when:'Jan 8–14 · 5786', t:'Breslov Pilgrimage to Uman', loc:'Ukraine · 7 days', spots:'Registration open', img:'/assets/prayer-mountains.webp', alt:'Prayer in the mountains' },
              { tag:'Seminar', when:'Feb 2 · 5786', t:'Godly Me · Inner Torah Intensive', loc:'Yehi Ohr · 3 days', spots:'12 places left', img:'/assets/three-blue-sky.webp', alt:'Three figures together looking out' },
              { tag:'Class', when:'Every Tuesday · 21:00', t:'Zohar with Rav Avshi (Online + In-Person)', loc:'Live · EN/HE', spots:'Free · Join anytime', img:'/assets/learning-doorway.webp', alt:'Learning at the table' },
              { tag:'Music', when:'Late winter · 5786', t:'Adam Kadmon · New Release', loc:'Spotify · YouTube', spots:'Pre-save now', img:'/assets/campfire-night.webp', alt:'Niggun gathering around a campfire' },
              { tag:'Tour', when:'Mar 18–22 · 5786', t:'Spring Tzfat Spiritual Tour', loc:'Tzfat · 5 days', spots:'Early bird open', img:'/assets/tzfat-alley.webp', alt:'Tzfat blue door alley' },
            ].map((e, i) => (
              <Reveal key={i} delay={i*60}>
                <article className="event-card group rounded-sm border border-[rgba(244,237,225,0.1)] overflow-hidden bg-[rgba(244,237,225,0.015)]">
                  <Photo src={e.img} alt={e.alt} aspect="3/2" />
                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase">
                      <span className="text-[var(--gold)]">{e.tag}</span>
                      <span className="text-[rgba(244,237,225,0.45)]">{e.when}</span>
                    </div>
                    <h3 className="font-display mt-3 text-[26px] leading-[1.1]">{e.t}</h3>
                    <div className="mt-4 flex items-center justify-between text-[12px] text-[rgba(244,237,225,0.55)]">
                      <span>{e.loc}</span>
                      <span className="text-[var(--gold)]">{e.spots}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIO TASTE */}
      <section className="relative py-32 ambient-amber border-y border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Now Playing</Eyebrow>
              <h2 className="font-display mt-6 text-[44px] sm:text-[64px] leading-[1.02] tracking-[-0.01em] text-balance">
                <span className="font-display-i">Adam Kadmon —</span> the first man, the first light.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-[rgba(244,237,225,0.7)] max-w-md">
                A new niggun composed in the spirit of the Ari, in collaboration with Shlepping Nachas. Listen, breathe, and let it open something quiet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setRoute('music')} className="btn-primary px-6 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Open the Music Room</button>
                <a href="#" className="btn-ghost px-6 py-3 rounded-full text-[12px] tracking-[0.18em] uppercase">Pre-save</a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-7">
            <Reveal delay={200}>
              <MiniPlayer />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Newsletter call-out lives in footer */}
    </div>
  );
}

function MiniPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(20,16,10,0.6)] backdrop-blur-md p-6 sm:p-8">
      <div className="flex items-center gap-5">
        <Photo src="/assets/adam-kadmon-cover.webp" alt="Adam Kadmon — album cover" aspect="1/1" className="w-28 sm:w-32 shrink-0 rounded-sm" />
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">Single · 5786</div>
          <div className="font-display text-[28px] sm:text-[34px] leading-[1.05] truncate">Adam Kadmon</div>
          <div className="text-[13px] text-[rgba(244,237,225,0.55)] mt-1">Avshi Weingot × Shlepping Nachas</div>
        </div>
        <button onClick={()=>setPlaying(p=>!p)} className="relative w-14 h-14 rounded-full play-pulse flex items-center justify-center btn-primary">
          {playing ? (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><rect x="0" y="0" width="4" height="16"/><rect x="10" y="0" width="4" height="16"/></svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0v16l14-8z"/></svg>
          )}
        </button>
      </div>

      {/* waveform */}
      <div className="mt-6 flex items-end gap-[3px] h-14 px-1">
        {Array.from({length: 64}).map((_,i)=>{
          const h = 20 + Math.abs(Math.sin(i * 0.6) * 70) + (i%3?12:0);
          return (
            <div key={i}
              className={playing ? 'wave-bar' : ''}
              style={{
                width: 4,
                height: `${Math.min(100, h)}%`,
                background: i < 28 ? 'rgba(232,166,87,0.85)' : 'rgba(244,237,225,0.18)',
                animationDelay: `${(i%8)*0.08}s`
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.2em] text-[rgba(244,237,225,0.45)]">
        <span>01:42</span><span>03:58</span>
      </div>
    </div>
  );
}

// ============== RAV AVSHI ==============
function RavAvshiPage({ setRoute }) {
  return (
    <div data-screen-label="Rav Avshi" className="pt-[72px]">
      {/* editorial hero */}
      <section className="relative overflow-hidden">
        {/* Tzfat panorama backdrop */}
        <div className="absolute inset-0 -z-0">
          <img
            src="/assets/tzfat-panorama.webp"
            alt="Tzfat skyline at sunset"
            className="absolute inset-0 w-full h-full object-cover kenburns"
            style={{ objectPosition: '50% 40%' }}
            loading="eager"
          />
          {/* warm amber tint to bind with site palette */}
          <div className="absolute inset-0" style={{
            background:
              'linear-gradient(120deg, rgba(20,16,10,0.65) 0%, rgba(58,31,16,0.45) 40%, rgba(20,16,10,0.55) 100%)',
            mixBlendMode: 'multiply'
          }} />
          {/* gold glow blend so the sun bleeds into the gold UI tone */}
          <div className="absolute inset-0" style={{
            background:
              'radial-gradient(45% 40% at 18% 35%, rgba(232,166,87,0.35), transparent 65%),' +
              'radial-gradient(60% 50% at 85% 90%, rgba(160,122,58,0.25), transparent 70%)',
            mixBlendMode: 'screen'
          }} />
          {/* readability scrim — vertical so headline stays legible top-left */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(20,16,10,0.55) 0%, rgba(20,16,10,0.25) 25%, rgba(20,16,10,0.35) 75%, rgba(20,16,10,0.95) 100%)'
          }} />
          {/* vignette for cinematic depth */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(120% 90% at 50% 50%, transparent 35%, rgba(20,16,10,0.7) 100%)'
          }} />
          {/* film grain ambient */}
          <div className="absolute inset-0 opacity-[0.16]" style={{
            background: 'repeating-linear-gradient(92deg, rgba(217,199,167,0.06) 0 2px, transparent 2px 18px)'
          }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 py-24 sm:py-32 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Rav Avraham Shimon Weingot</Eyebrow>
              <h1 className="font-display mt-6 text-[64px] sm:text-[100px] lg:text-[140px] leading-[0.9] tracking-[-0.02em]">
                Rav<br/><span className="font-display-i text-[var(--gold)]">Avshi.</span>
              </h1>
              <p className="mt-8 text-[18px] leading-[1.6] text-[rgba(244,237,225,0.78)] max-w-md">
                Born in Tzfat, shaped by an open home of seekers, called to teach the inner Torah of the Zohar and Chassidut — and to live it.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <div className="relative" style={{ aspectRatio: '4/5' }}>
                {/* large warm sunset halo — fills the area with positive light so
                    the section vignette can't read as a dark rectangle behind him */}
                <div className="absolute -inset-x-20 -inset-y-14 pointer-events-none" style={{
                  background:
                    'radial-gradient(55% 55% at 50% 42%, rgba(232,166,87,0.42), rgba(160,122,58,0.20) 35%, transparent 72%)',
                  filter: 'blur(40px)'
                }} />
                {/* secondary tighter glow under the face / books */}
                <div className="absolute -inset-x-6 inset-y-0 pointer-events-none" style={{
                  background:
                    'radial-gradient(35% 25% at 45% 40%, rgba(255,210,140,0.30), transparent 60%),' +
                    'radial-gradient(30% 25% at 55% 62%, rgba(255,200,120,0.22), transparent 70%)',
                  filter: 'blur(18px)'
                }} />

                {/* portrait — elliptical mask removes any trace of rectangle,
                    screen blend dissolves studio black into the dusk */}
                <img
                  src={R('/assets/rav-portrait.webp')}
                  alt="Rav Avshi portrait"
                  className="absolute inset-0 w-full h-full object-cover kenburns"
                  style={{
                    objectPosition: 'center 14%',
                    mixBlendMode: 'screen',
                    WebkitMaskImage: 'radial-gradient(58% 78% at 50% 38%, #000 32%, rgba(0,0,0,0.78) 56%, rgba(0,0,0,0.25) 80%, transparent 100%)',
                    maskImage: 'radial-gradient(58% 78% at 50% 38%, #000 32%, rgba(0,0,0,0.78) 56%, rgba(0,0,0,0.25) 80%, transparent 100%)',
                    filter: 'brightness(1.16) contrast(0.9) saturate(0.92)'
                  }}
                />

                {/* additional bottom-edge fade so his lower body dissolves into shadow */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(20,16,10,0.55) 80%, rgba(20,16,10,0.9) 100%)',
                  WebkitMaskImage: 'radial-gradient(80% 100% at 50% 0%, #000, transparent 90%)',
                  maskImage: 'radial-gradient(80% 100% at 50% 0%, #000, transparent 90%)'
                }} />

                {/* warm rim grade — amber catches the left side */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background:
                    'radial-gradient(50% 60% at 8% 42%, rgba(255,210,140,0.32), transparent 55%),' +
                    'linear-gradient(115deg, rgba(232,166,87,0.20) 0%, transparent 35%)',
                  mixBlendMode: 'screen',
                  WebkitMaskImage: 'radial-gradient(58% 78% at 50% 38%, #000 32%, transparent 95%)',
                  maskImage: 'radial-gradient(58% 78% at 50% 38%, #000 32%, transparent 95%)'
                }} />

                {/* floating light particles */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute float-slow" style={{ left:'14%', top:'28%', width:'3px', height:'3px', borderRadius:'50%', background:'rgba(255,220,150,0.7)', boxShadow:'0 0 10px rgba(255,200,120,0.6)' }} />
                  <div className="absolute float-slow" style={{ left:'72%', top:'24%', width:'2px', height:'2px', borderRadius:'50%', background:'rgba(232,166,87,0.6)', boxShadow:'0 0 8px rgba(232,166,87,0.55)', animationDelay:'2s' }} />
                  <div className="absolute float-slow" style={{ left:'8%', top:'66%', width:'2px', height:'2px', borderRadius:'50%', background:'rgba(255,220,150,0.55)', boxShadow:'0 0 7px rgba(255,200,120,0.45)', animationDelay:'4s' }} />
                  <div className="absolute float-slow" style={{ left:'85%', top:'78%', width:'3px', height:'3px', borderRadius:'50%', background:'rgba(232,166,87,0.5)', boxShadow:'0 0 10px rgba(232,166,87,0.55)', animationDelay:'1.5s' }} />
                  <div className="absolute float-slow" style={{ left:'52%', top:'10%', width:'2px', height:'2px', borderRadius:'50%', background:'rgba(255,220,150,0.5)', boxShadow:'0 0 6px rgba(255,200,120,0.45)', animationDelay:'3.5s' }} />
                </div>

                {/* soft diagonal light ray */}
                <div className="absolute pointer-events-none" style={{
                  left: '-15%', top: '-20%', width: '60%', height: '140%',
                  background: 'linear-gradient(115deg, rgba(255,220,150,0.10) 0%, rgba(255,220,150,0.0) 35%)',
                  filter: 'blur(20px)',
                  transform: 'rotate(-15deg)',
                  mixBlendMode: 'screen'
                }} />
              </div>
              <div className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.5)] flex items-center gap-3">
                <span className="w-6 h-px bg-[var(--gold)]" />
                <span>Yehi Ohr · Old City Tzfat · 5785</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* opening narrative — large quote */}
      <section className="py-24 border-y border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <Reveal>
            <p className="font-display text-[28px] sm:text-[40px] leading-[1.3] text-balance text-[rgba(244,237,225,0.92)]">
              Avshi grew up in a home where students, seekers, and guests arrived in a steady current — drawn by his father <em className="font-display-i text-[var(--gold)]">Rav Rafael Weingot</em>, founder of Yeshiva Shalom Rav, and his mother <em className="font-display-i text-[var(--gold)]">Tova</em>, founder of Sharei Bina Seminary. From the very first years of his life, hospitality was a form of prayer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* timeline */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>The Journey</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">A life in chapters.</h2>
          </Reveal>

          <div className="mt-16 grid lg:grid-cols-12 gap-10">
            {/* spine */}
            <div className="lg:col-span-1 hidden lg:block relative">
              <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--gold)] via-[rgba(202,164,92,0.3)] to-transparent" />
            </div>
            <ol className="lg:col-span-11 space-y-16">
              {[
                { y:'1980s', t:'Tzfat childhood', d:'Born in the Old City of Tzfat. An open home filled with students and seekers — his parents’ home was both yeshiva and family.', img:'/assets/tzfat-childhood.webp', alt:'Children playing in the alleys of Old City Tzfat' },
                { y:'Teen years', t:'Out into the world', d:'A long journey beyond Tzfat. A deeper acquaintance with people, life, and the questions every person carries.', img:'/assets/jumping-mountains.webp', alt:'Young man mid-leap in the Galilean hills' },
                { y:'2002', t:'Return home', d:'Returns to Tzfat with new depth. Joins Yeshiva Shalom Rav and begins teaching the talmidim.', img:'/assets/learning-doorway.webp', alt:'Learning at a table by the window' },
                { y:'2010s', t:'Co-leading Shalom Rav', d:'Begins sharing leadership with his father, Rav Rafael Weingot. Becomes a certified life coach to guide students in both spiritual and personal growth.', img:'/assets/co-leading-father.webp', alt:'Rav Avshi and his father Rav Rafael Weingot, side by side', aspect:'16/9' },
                { y:'Present', t:'Yehi Ohr born', d:'Builds the Yehi Ohr Center beside the family home — a wood-and-glass sanctuary for inner Torah, music, and Shabbat.', img:'/assets/yehi-ohr-building.webp', alt:'Yehi Ohr Center exterior render', aspect:'16/9' },
                { y:'Ongoing', t:'The world as classroom', d:'Tours and gatherings in Ukraine, New York, Mexico, and beyond — teaching through place, story, song.', img:'/assets/students-walking.webp', alt:'Rav Avshi students walking together', aspect:'4/5', position:'center 18%' },
              ].map((c, i) => (
                <Reveal key={i} delay={i*80}>
                  <li className="grid sm:grid-cols-12 gap-8 items-start">
                    <div className="sm:col-span-3">
                      <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">{c.y}</div>
                      <h3 className="font-display mt-2 text-[32px] leading-[1.05]">{c.t}</h3>
                    </div>
                    <p className="sm:col-span-5 text-[16px] leading-[1.7] text-[rgba(244,237,225,0.72)]">{c.d}</p>
                    <div className="sm:col-span-4">
                      <Photo src={c.img} alt={c.alt} aspect={c.aspect || "4/3"} position={c.position || 'center'} />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* pull-quote */}
      <section className="relative py-32 border-y border-[rgba(244,237,225,0.06)] overflow-hidden">
        <img src="/assets/rav-praying.webp" alt="Rav Avshi in prayer under olive trees" className="absolute inset-0 w-full h-full object-cover kenburns" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(20,16,10,0.88) 0%, rgba(20,16,10,0.6) 50%, rgba(20,16,10,0.78) 100%)' }} />
        <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <Reveal>
            <div className="font-display-i text-[32px] sm:text-[52px] lg:text-[64px] leading-[1.15] text-balance">
              “Wherever he is, and with whomever he meets, he carries one mission: <span className="text-[var(--gold)]">to reveal the inner secrets of Torah</span> — the light of the Geulah, healing, comfort, clarity, peace.”
            </div>
            <div className="mt-8 font-mono text-[11px] tracking-[0.35em] uppercase text-[rgba(244,237,225,0.7)]">— Mission</div>
          </Reveal>
        </div>
      </section>

      {/* family & hospitality */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Photo src="/assets/group-smiling.webp" alt="Rav Avshi with students laughing together in Tzfat" aspect="3/2" />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Kiki & The Family</Eyebrow>
              <h2 className="font-display mt-5 text-[40px] sm:text-[52px] leading-[1.05] text-balance">
                A home that opens, again and again.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-[rgba(244,237,225,0.7)]">
                Together with his wife Kiki, Rav Avshi brings these experiences to life. Shabbat meals at their home offer guests the chance to connect with the entire family in an atmosphere of warmth and authenticity. Kiki works behind the scenes — tailoring every gathering, every detail, with care.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="py-28 border-t border-[rgba(244,237,225,0.06)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>In Their Words</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05]">Voices from the path.</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              { q:'I came to Tzfat for a weekend. I left with a teacher, a song, and a question that has kept opening for two years.', n:'Mira · Tel Aviv' },
              { q:'Rav Avshi taught me how to listen to a single niggun like it was a whole book of Zohar. Something cracked open.', n:'Jonah · Brooklyn' },
              { q:'Their home felt like a home I had been looking for my entire life and had forgotten existed.', n:'Esti · Mexico City' },
            ].map((t,i)=>(
              <Reveal key={i} delay={i*100}>
                <blockquote className="p-7 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)] h-full">
                  <div className="font-display-i text-[24px] leading-[1.3] text-[rgba(244,237,225,0.92)]">"{t.q}"</div>
                  <div className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{t.n}</div>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============== YEHI OHR CENTER ==============
function YehiOhrPage({ setRoute }) {
  return (
    <div data-screen-label="Yehi Ohr Center" className="pt-[72px]">
      {/* hero */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/tzfat-sunset.webp" alt="Tzfat at golden hour" className="absolute inset-0 w-full h-full object-cover kenburns" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,10,0.35) 0%, rgba(20,16,10,0.0) 30%, rgba(20,16,10,0.85) 100%)' }} />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 pb-20 w-full">
            <Reveal>
              <Eyebrow>The Center · Tzfat</Eyebrow>
              <h1 className="font-display mt-6 text-[56px] sm:text-[96px] lg:text-[128px] leading-[0.95] tracking-[-0.02em] max-w-5xl">
                A sanctuary of <span className="font-display-i text-[var(--gold)]">wood, glass, and light.</span>
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* origin */}
      <section className="py-28">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <Reveal>
            <p className="font-display text-[24px] sm:text-[32px] leading-[1.4] text-balance text-[rgba(244,237,225,0.9)]">
              For many years, Rav Avshi and his family opened their home to students, guests, and seekers — for classes, gatherings, and Shabbat. Learning, prayer, music, and shared meals flowed within the walls of a private home, creating deep connection and lasting impact.
            </p>
            <p className="mt-8 text-[18px] leading-[1.7] text-[rgba(244,237,225,0.7)]">
              As the community grew, it became clear this work needed a dedicated space — one that could hold more people, more learning, and more light. <em className="font-display-i text-[var(--gold)]">Yehi Ohr was born from this need — and is now being built, stone by stone, with the help of friends around the world.</em>
            </p>
            <p className="mt-6 text-[16px] leading-[1.7] text-[rgba(244,237,225,0.62)]">
              The community is already alive: classes, Shabbat tables, music, and prayer happen weekly. The permanent home is a vision actively becoming reality — a journey we walk together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Yehi Ohr building — render */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>The Building</Eyebrow>
                <h2 className="font-display mt-4 text-[40px] sm:text-[56px] leading-[1.05] max-w-2xl">
                  Yehi Ohr — <span className="font-display-i text-[var(--gold)]">coming to life</span> beside the home.
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-[1.75] text-[rgba(244,237,225,0.65)]">
                Tzfat stone at the base, plaster and wood above, deep eaves and an open gallery that catches the afternoon light. A modern home for an older spirit of hospitality.
              </p>
            </div>
          </Reveal>
          <Photo src="/assets/yehi-ohr-building.webp" alt="Yehi Ohr Center — exterior, Tzfat" aspect="1825/862" caption="Yehi Ohr · Tzfat" />
        </div>
      </section>

      {/* Yeshiva Shalom Rav — building renders */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>Yeshiva Shalom Rav</Eyebrow>
                <h2 className="font-display mt-4 text-[40px] sm:text-[56px] leading-[1.05] max-w-2xl">
                  The mother yeshiva — beside which Yehi Ohr was born.
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-[1.75] text-[rgba(244,237,225,0.65)]">
                Founded by Rav Rafael Weingot, Yeshiva Shalom Rav has stood at the heart of Tzfat for decades. Yehi Ohr rises beside it, extending the same open-home spirit into a dedicated space for the wider community.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-12 gap-4">
            <div className="md:col-span-12">
              <Photo src="/assets/yehi-ohr-facade.webp" alt="Yeshiva Shalom Rav — facade at twilight" aspect="1650/953" caption="Yeshiva — Shalom Rav · Tzfat" />
            </div>
            <div className="md:col-span-12">
              <Photo src="/assets/shalom-rav-shul.webp" alt="Shalom Rav Shul at twilight, lit lanterns and stone facade" aspect="1537/1023" caption="Shalom Rav Shul · Tzfat" />
            </div>
          </div>
          <div className="mt-6 grid md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-4 md:col-start-1 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--gold)]">Architecture · Renders</div>
            <div className="md:col-span-7">
              <p className="text-[16px] leading-[1.75] text-[rgba(244,237,225,0.7)]">
                Jerusalem-stone walls, arched windows, twin lanterns, an iron-railed balcony, and benches under olive trees — the yeshiva belongs to the rhythm of the Old City.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey timeline — Vision → Future */}
      <section className="relative py-28 border-y border-[rgba(244,237,225,0.06)] ambient-stone">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>The Journey</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-3xl">
              From vision <span className="font-display-i text-[var(--gold)]">to reality.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[rgba(244,237,225,0.65)]">
              Yehi Ohr began in a private home and is becoming a permanent sanctuary for Torah, music, and gathering — together with the community that is building it.
            </p>
          </Reveal>

          <div className="mt-16">
            {/* phase timeline */}
            <div className="relative grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* connecting line */}
              <div className="hidden md:block absolute top-[14px] left-[10%] right-[10%] h-px" style={{
                background: 'linear-gradient(90deg, rgba(202,164,92,0.7) 0%, rgba(202,164,92,0.7) 55%, rgba(244,237,225,0.18) 65%, rgba(244,237,225,0.12) 100%)'
              }} />
              {[
                { n:'01', t:'Vision', d:'A dream of a home where Torah, music, and Shabbat could be lived openly.', status:'done' },
                { n:'02', t:'Community', d:'Years of Shabbat tables, learning, and gatherings in the family home.', status:'done' },
                { n:'03', t:'Construction', d:'The wood-and-glass center beginning to rise beside the home, stone by stone.', status:'now' },
                { n:'04', t:'Expansion', d:'Beit midrash, guesthouse, gardens — opening room for many more souls.', status:'next' },
                { n:'05', t:'Future', d:'A permanent home for inner Torah in Tzfat, reaching outward to the world.', status:'next' },
              ].map((p, i) => (
                <Reveal key={p.n} delay={i*80}>
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center border ${p.status==='now' ? 'border-[var(--gold)] bg-[rgba(232,166,87,0.12)]' : p.status==='done' ? 'border-[var(--gold)] bg-[var(--gold)]' : 'border-[rgba(244,237,225,0.25)] bg-[#14100a]'}`}>
                        {p.status === 'now' && <span className="w-2 h-2 rounded-full bg-[var(--gold)] flicker" />}
                        {p.status === 'done' && <span className="text-[10px] text-[#1a120b]">✓</span>}
                      </div>
                      <div className="mt-5 text-center">
                        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--gold)]">{p.n}</div>
                        <div className="font-display text-[24px] sm:text-[26px] leading-tight mt-1">{p.t}</div>
                        <div className="mt-2 font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: p.status==='now' ? 'var(--gold)' : 'rgba(244,237,225,0.4)' }}>
                          {p.status==='done' ? 'Complete' : p.status==='now' ? 'In progress' : 'Coming'}
                        </div>
                        <p className="mt-3 text-[13px] leading-relaxed text-[rgba(244,237,225,0.6)] max-w-[200px] mx-auto">{p.d}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Building Progress */}
      <section className="relative py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Current Building Progress</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-3xl">
              What is rising, <span className="font-display-i text-[var(--gold)]">and what is still to come.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              { tag:'Complete', t:'Foundations & community', d:'Years of Shabbat hospitality, weekly learning, music gatherings, and a global circle of soul-family. The spiritual foundation is already alive.', tone:'done' },
              { tag:'In Progress', t:'The main center', d:'The Jerusalem-stone facade, the wood-and-glass shul, the classroom, the gathering hall — all currently being built beside the family home.', tone:'now' },
              { tag:'Still to Build', t:'Guesthouse, beit midrash, gardens', d:'A larger beit midrash, a guesthouse for travelers, garden grounds, and the Yehi Ohr studio — the next stones we hope to lay with friends like you.', tone:'next' },
            ].map((m, i) => (
              <Reveal key={m.t} delay={i*100}>
                <div className={`event-card p-8 h-full rounded-sm border ${m.tone==='now' ? 'border-[rgba(202,164,92,0.4)] bg-[rgba(232,166,87,0.04)]' : 'border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.015)]'}`}>
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: m.tone==='done' ? 'rgba(244,237,225,0.6)' : m.tone==='now' ? 'var(--gold)' : 'rgba(244,237,225,0.45)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flicker" style={{ background: m.tone==='done' ? 'rgba(244,237,225,0.5)' : m.tone==='now' ? 'var(--gold)' : 'rgba(244,237,225,0.35)' }} />
                    {m.tag}
                  </div>
                  <h3 className="font-display mt-4 text-[28px] leading-[1.1]">{m.t}</h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[rgba(244,237,225,0.7)]">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 p-8 sm:p-10 rounded-sm border border-[rgba(202,164,92,0.25)] bg-[rgba(232,166,87,0.05)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">Build Together</div>
                <h3 className="font-display mt-3 text-[28px] sm:text-[32px] leading-tight max-w-xl">Lay another stone in a home for Torah.</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[rgba(244,237,225,0.7)] max-w-xl">
                  Every contribution helps transform the vision of Yehi Ohr into a permanent home for Torah, hospitality, music, prayer, and healing in Tzfat.
                </p>
              </div>
              <a href="https://www.paypal.com/paypalme/avshiweingot" target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase whitespace-nowrap shrink-0">Help Build the Light →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* features grid */}
      <section className="py-28">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>The Space</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-3xl">Designed to hold many — and feel like one.</h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ['Shul','A working beit knesset for Shabbat, weekday tefillah, and Kabbalat Shabbat that has become legendary in Tzfat.'],
              ['Classroom','Daily learning of Zohar, Chassidut, and inner Torah — for talmidim of Shalom Rav and visiting seekers.'],
              ['Event Hall','Seminars, Shabbatonim, simchas, and immersive teaching weekends — the space holds intimacy at any scale.'],
              ['Shabbat Meals','Long tables under candlelight. Guests from twenty countries. Singing that does not end.'],
              ['Gardens','Olive and pomegranate, stone walls, quiet corners for chavruta and a slow breath.'],
              ['Fully Accessible','Wheelchair accessible throughout. Welcoming to all, in every sense of the word.'],
            ].map(([t,d],i)=>(
              <Reveal key={t} delay={i*60}>
                <div className="p-8 h-full rounded-sm border border-[rgba(244,237,225,0.1)] bg-[rgba(244,237,225,0.02)]">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">0{i+1}</div>
                  <h3 className="font-display mt-3 text-[28px] leading-[1.1]">{t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[rgba(244,237,225,0.65)]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* sub-pages: yeshiva / shul / tours / activities */}
      <section className="py-24 border-y border-[rgba(244,237,225,0.06)] ambient-stone">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <Reveal>
            <Eyebrow>Within Yehi Ohr</Eyebrow>
            <h2 className="font-display mt-5 text-[40px] sm:text-[56px] leading-[1.05] max-w-2xl">Four doorways into the same light.</h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {[
              { num:'4.1', t:'Yeshiva Shalom Rav', d:'Daily learning, dorms, and a full beit midrash rhythm for talmidim ready to give themselves to Torah.', img:'/assets/yehi-ohr-facade.webp', alt:'Yeshiva Shalom Rav facade', real:true, pos:'center' },
              { num:'4.2', t:'Mekarev Shul · Kabbalat Shabbat', d:'A Kabbalat Shabbat that locals and travelers walk twenty minutes for. Schedule, languages, what to expect.', img:'/assets/mekarev-shul.webp', alt:'Mekarev Shul exterior at twilight, lit lanterns', real:true },
              { num:'4.3', t:'Activities in Tzfat', d:'Weekly classes, monthly Shabbatot, special gatherings — the living rhythm of the community.', img:'/assets/three-sitting.webp', alt:'Rav Avshi sitting with students in Tzfat', real:true },
              { num:'4.4', t:'Tzfat Tours & Guided Experiences', d:'Walking the holy city as a living classroom — kabbalistic sites, stories, places where the world was opened.', img:'/assets/tzfat-alley.webp', alt:'Tzfat blue door alley with olive tree', real:true },
            ].map((s,i)=>(
              <Reveal key={s.num} delay={i*80}>
                <article className="event-card group rounded-sm border border-[rgba(244,237,225,0.1)] overflow-hidden bg-[#14100a]/40">
                  <div className="grid sm:grid-cols-12 gap-0">
                    <div className="sm:col-span-5">
                      {s.real
                        ? <Photo src={s.img} alt={s.alt} aspect="1/1" position={s.pos || 'center'} />
                        : <Placeholder label={s.img} aspect="1/1" />}
                    </div>
                    <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">{s.num}</div>
                        <h3 className="font-display mt-2 text-[30px] leading-[1.1]">{s.t}</h3>
                        <p className="mt-3 text-[14px] leading-relaxed text-[rgba(244,237,225,0.65)]">{s.d}</p>
                      </div>
                      <div className="mt-6 text-[12px] tracking-[0.18em] uppercase text-[rgba(244,237,225,0.6)] group-hover:text-[var(--gold)] transition-colors">Open →</div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* invitation */}
      <section className="py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
          <Reveal>
            <Eyebrow>From Vision to Reality</Eyebrow>
            <h2 className="font-display mt-6 text-[44px] sm:text-[72px] leading-[1.05] text-balance">
              Help build the <span className="font-display-i text-[var(--gold)]">next chapter.</span>
            </h2>
            <p className="mt-7 text-[17px] leading-[1.7] text-[rgba(244,237,225,0.7)] max-w-2xl mx-auto">
              Yehi Ohr is a living spiritual movement — and the permanent center is being built together with friends, students, and supporters around the world. Every contribution lays another stone in a home for Torah, hospitality, music, prayer, and healing in Tzfat.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <button onClick={() => setRoute('community')} className="btn-primary px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Plan Your Visit</button>
              <button onClick={() => setRoute('support')} className="btn-ghost px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase">Help Build the Light</button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export { HomePage, RavAvshiPage, YehiOhrPage, MiniPlayer };
