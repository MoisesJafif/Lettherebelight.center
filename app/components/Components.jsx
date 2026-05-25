'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

// ---------- Standalone resource resolver (unused in main build, kept for offline export) ----------
function R(path) {
  if (typeof path !== 'string') return path;
  if (!path.startsWith('assets/')) return path;
  if (typeof window === 'undefined' || !window.__resources) return path;
  const id = path.slice(7).replace(/\.[^.]+$/, '');
  return window.__resources[id] || path;
}

// ---------- Cinematic Placeholder ----------
function Placeholder({ label, note, aspect = '16/9', className = '', kenburns = true }) {
  return (
    <div className={`placeholder-cinema ${className}`} style={{ aspectRatio: aspect }}>
      <div className={`absolute inset-0 ${kenburns ? 'kenburns' : ''}`} style={{
        background:
          'radial-gradient(60% 50% at 30% 30%, rgba(232,166,87,0.22), transparent 65%), ' +
          'radial-gradient(70% 60% at 75% 80%, rgba(93,107,58,0.18), transparent 70%), ' +
          'repeating-linear-gradient(110deg, rgba(244,237,225,0.03) 0 1px, transparent 1px 9px)'
      }} />
      <div className="absolute inset-0 flex items-end p-5 sm:p-6">
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[rgba(244,237,225,0.55)]">
          <div className="text-[rgba(232,166,87,0.85)] mb-1">— image slot</div>
          <div className="text-[rgba(244,237,225,0.85)]">{label}</div>
          {note && <div className="mt-1 text-[rgba(244,237,225,0.45)] normal-case tracking-normal font-sans italic">{note}</div>}
        </div>
      </div>
    </div>
  );
}

// ---------- Real Photo (cinematic frame) ----------
function Photo({ src, alt, aspect = '4/5', className = '', position = 'center', kenburns = false, caption }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: aspect, background: '#14100a' }}>
      <img
        src={R(src)}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${kenburns ? 'kenburns' : ''}`}
        style={{ objectPosition: position }}
        loading="lazy"
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(110% 90% at 50% 50%, transparent 55%, rgba(20,16,10,0.45) 100%)'
      }} />
      {caption && (
        <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.22em] uppercase text-[rgba(244,237,225,0.7)]">
          {caption}
        </div>
      )}
    </div>
  );
}

// ---------- Hero video placeholder (looping cinematic) ----------
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 kenburns" style={{
        backgroundImage: `url('${R('/assets/hero-menorah.webp')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat'
      }} />
      <div className="absolute inset-0" style={{
        background:
          'linear-gradient(90deg, rgba(20,16,10,0.78) 0%, rgba(20,16,10,0.55) 45%, rgba(20,16,10,0.25) 70%, rgba(20,16,10,0.55) 100%),' +
          'linear-gradient(180deg, rgba(20,16,10,0.55) 0%, rgba(20,16,10,0.0) 30%, rgba(20,16,10,0.0) 55%, rgba(20,16,10,0.85) 100%)'
      }} />
      <div className="absolute inset-0 kenburns" style={{
        background:
          'radial-gradient(40% 30% at 22% 38%, rgba(232,166,87,0.22), transparent 60%),' +
          'radial-gradient(55% 45% at 78% 65%, rgba(160,122,58,0.18), transparent 65%),' +
          'radial-gradient(80% 65% at 50% 110%, rgba(20,16,10,0.65), rgba(20,16,10,0.2) 50%, transparent 80%)',
        mixBlendMode: 'screen'
      }} />
      <div className="absolute inset-0 opacity-[0.18]" style={{
        background:
          'repeating-linear-gradient(92deg, rgba(217,199,167,0.06) 0 2px, transparent 2px 16px),' +
          'repeating-linear-gradient(2deg, rgba(217,199,167,0.04) 0 1px, transparent 1px 22px)'
      }} />
      <div className="absolute" style={{ left: '14%', top: '58%' }}><Flame size={56} /></div>
      <div className="absolute flicker" style={{ left: '22%', top: '62%', animationDelay: '0.8s' }}><Flame size={42} /></div>
      <div className="absolute flicker" style={{ left: '78%', top: '72%', animationDelay: '1.6s' }}><Flame size={66} /></div>
      <div className="absolute flicker" style={{ left: '86%', top: '66%', animationDelay: '0.4s' }}><Flame size={36} /></div>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(120% 90% at 50% 40%, transparent 30%, rgba(20,16,10,0.85) 100%)'
      }} />
      <div className="absolute bottom-4 right-5 font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.55)]">
        still · tzfat · menorah lighting
      </div>
    </div>
  );
}

function Flame({ size = 50 }) {
  return (
    <div className="flicker float-slow" style={{
      width: size, height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 50% 60%, rgba(255,220,150,0.95) 0%, rgba(232,166,87,0.7) 30%, rgba(202,82,30,0.35) 55%, transparent 75%)',
      filter: 'blur(0.5px)',
      mixBlendMode: 'screen'
    }} />
  );
}

// ---------- Nav ----------
function Nav({ route, setRoute, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['home', 'Home'],
    ['rav-avshi', 'Rav Avshi'],
    ['yehi-ohr', 'Yehi Ohr'],
    ['classes', 'Classes'],
    ['music', 'Music'],
    ['tours', 'Journeys'],
    ['community', 'Community'],
    ['support', 'Support'],
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : 'nav-glass'}`}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
        <button onClick={() => setRoute('home')} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full flicker" style={{
              background: 'radial-gradient(circle, rgba(255,220,150,0.9), rgba(232,166,87,0.5) 40%, transparent 70%)'
            }} />
          </div>
          <div className="leading-tight text-left">
            <div className="font-display text-[20px] tracking-wide">Yehi Ohr</div>
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[rgba(244,237,225,0.55)]">Let There Be Light · Tzfat</div>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-9">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setRoute(id)}
              className={`link-soft text-[13px] tracking-[0.12em] uppercase ${route === id ? 'text-[var(--gold)]' : 'text-[rgba(244,237,225,0.78)]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button onClick={() => setLangOpen(o => !o)}
              className="font-mono text-[11px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.65)] hover:text-[var(--gold)] transition-colors px-2 py-2">
              {lang}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-24 rounded-sm border border-[rgba(244,237,225,0.1)] bg-[#1f1810]/95 backdrop-blur-xl">
                {['EN','HE','ES'].map(l => (
                  <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-2 font-mono text-[11px] tracking-[0.25em] hover:bg-[rgba(244,237,225,0.04)] ${lang===l?'text-[var(--gold)]':'text-[rgba(244,237,225,0.7)]'}`}>
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="https://api.whatsapp.com/send/?phone=%2B972545404914&text&type=phone_number&app_absent=0"
             target="_blank" rel="noopener noreferrer"
             className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase btn-ghost px-4 py-2 rounded-full transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:shadow-[0_0_24px_rgba(232,166,87,0.22)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--olive)] flicker" />
            WhatsApp
          </a>
          <a href="https://www.paypal.com/paypalme/avshiweingot" target="_blank" rel="noopener noreferrer" className="btn-primary text-[12px] tracking-[0.14em] uppercase px-5 py-2.5 rounded-full font-medium">
            Be the Light
          </a>
          <button onClick={() => setOpen(o => !o)} className="lg:hidden ml-1 p-2 text-[rgba(244,237,225,0.8)]">
            <div className="space-y-1.5">
              <div className="w-5 h-px bg-current"></div>
              <div className="w-5 h-px bg-current"></div>
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[rgba(244,237,225,0.08)] bg-[#14100a]/95 backdrop-blur-xl">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { setRoute(id); setOpen(false); }}
              className={`block w-full text-left px-8 py-4 text-[13px] tracking-[0.12em] uppercase border-b border-[rgba(244,237,225,0.04)] ${route===id?'text-[var(--gold)]':'text-[rgba(244,237,225,0.8)]'}`}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Footer ----------
function Footer({ setRoute, lang, setLang }) {
  return (
    <footer className="relative mt-24 border-t border-[rgba(244,237,225,0.08)] bg-[#0f0a05]">
      <div className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-[rgba(244,237,225,0.06)]">
          <div className="lg:col-span-6">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">Newsletter</div>
            <h3 className="font-display text-[40px] sm:text-[54px] leading-[1.05] text-balance">
              Letters of light, arriving softly.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-[rgba(244,237,225,0.65)] max-w-md">
              A weekly note from Rav Avshi — Torah reflections, upcoming gatherings, new music. No noise. Just light.
            </p>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <form className="w-full flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="your@email"
                className="flex-1 bg-transparent border border-[rgba(244,237,225,0.18)] focus:border-[var(--gold)] outline-none px-5 py-4 rounded-full text-[15px] placeholder:text-[rgba(244,237,225,0.35)] transition-colors" />
              <button className="btn-primary px-7 py-4 rounded-full text-[12px] tracking-[0.18em] uppercase font-medium">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full flicker" style={{ background: 'radial-gradient(circle, rgba(255,220,150,0.9), rgba(232,166,87,0.4) 50%, transparent 75%)' }} />
              <div className="font-display text-[22px]">Yehi Ohr</div>
            </div>
            <p className="text-[14px] leading-relaxed text-[rgba(244,237,225,0.55)] max-w-sm">
              A living spiritual center in Tzfat dedicated to learning, prayer, music, Shabbat, and transformational experiences with Rav Avshi.
            </p>
            <div className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(244,237,225,0.45)]">
              <div>Old City · Tzfat · Israel</div>
              <div className="mt-1">hello@lettherebelight.center</div>
            </div>
          </div>

          {[
            ['Explore', [['Rav Avshi','rav-avshi'],['Teaching & Path','teaching'],['Yehi Ohr Center','yehi-ohr'],['Music','music'],['Tours','tours']]],
            ['Connect', [['Community','community'],['Visit Tzfat','visit'],['Newsletter','newsletter'],['Contact','contact'],['FAQ','faq']]],
            ['Support', [['Donate','paypal'],['Monthly Light','paypal'],['Volunteer','support'],['Merch','merch'],['Vision','vision']]],
          ].map(([title, items]) => (
            <div key={title}>
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-5">{title}</div>
              <ul className="space-y-3 text-[14px]">
                {items.map(([label, id]) => (
                  <li key={label}>
                    {id === 'paypal'
                      ? <a href="https://www.paypal.com/paypalme/avshiweingot" target="_blank" rel="noopener noreferrer" className="link-soft text-[rgba(244,237,225,0.7)]">{label}</a>
                      : <button onClick={() => setRoute(id)} className="link-soft text-[rgba(244,237,225,0.7)]">{label}</button>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[rgba(244,237,225,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-[rgba(244,237,225,0.4)]">
          <div>© 5786 · Yehi Ohr · Built with love in Tzfat</div>
          <div className="flex items-center gap-5">
            {['EN','HE','ES'].map(l => (
              <button key={l} onClick={() => setLang(l)} className={lang===l ? 'text-[var(--gold)]' : 'hover:text-[var(--parchment)]'}>{l}</button>
            ))}
            <span className="opacity-40">·</span>
            <a href="#" className="hover:text-[var(--parchment)]">Instagram</a>
            <a href="#" className="hover:text-[var(--parchment)]">YouTube</a>
            <a href="#" className="hover:text-[var(--parchment)]">Spotify</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- Reveal on scroll ----------
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) { setSeen(true); return; }
    const checkInView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.95 && r.bottom > 0) { setSeen(true); return true; }
      return false;
    };
    if (checkInView()) return;
    let io;
    try {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io && io.disconnect(); } }, { threshold: 0.05 });
      io.observe(el);
    } catch (_) {}
    const onScroll = () => { if (checkInView()) { window.removeEventListener('scroll', onScroll); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setSeen(true), 400);
    return () => { io && io.disconnect(); window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);
  return (
    <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ---------- Section heading with ornament ----------
function Eyebrow({ children, tone = 'gold' }) {
  return (
    <div className={`font-mono text-[11px] tracking-[0.3em] uppercase flex items-center gap-3 ${tone==='gold' ? 'text-[var(--gold)]' : 'text-[rgba(244,237,225,0.6)]'}`}>
      <span className="w-6 h-px bg-current" />
      <span>{children}</span>
    </div>
  );
}

export { R, Placeholder, Photo, HeroBackdrop, Flame, Nav, Footer, Reveal, Eyebrow };
