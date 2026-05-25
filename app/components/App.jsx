'use client';
import React, { useState, useEffect } from 'react';
import { Nav, Footer } from './Components';
import { WhatsAppFloat } from './Whatsapp';
import { HomePage, RavAvshiPage, YehiOhrPage } from './Pages';
import {
  MusicPage,
  ToursPage,
  CommunityPage,
  TeachingPage,
  SupportPage,
  VisionPage,
  ContactPage,
  FAQPage,
  MerchPage,
} from './Pages2';
import { TorahClassesPage } from './Pages3';

export default function App() {
  const [route, setRouteRaw] = useState('home');
  const [lang, setLang] = useState('EN');

  // Initialize from hash on mount
  useEffect(() => {
    const h = window.location.hash.replace('#', '');
    if (h) setRouteRaw(h);
    const onHash = () => setRouteRaw(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const setRoute = (r) => {
    setRouteRaw(r);
    window.location.hash = r;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  let Page;
  switch (route) {
    case 'rav-avshi': Page = RavAvshiPage; break;
    case 'yehi-ohr': Page = YehiOhrPage; break;
    case 'music': Page = MusicPage; break;
    case 'tours': Page = ToursPage; break;
    case 'community': Page = CommunityPage; break;
    case 'teaching': Page = TeachingPage; break;
    case 'classes':
    case 'torah-classes': Page = TorahClassesPage; break;
    case 'support': Page = SupportPage; break;
    case 'vision': Page = VisionPage; break;
    case 'contact': Page = ContactPage; break;
    case 'faq': Page = FAQPage; break;
    case 'merch': Page = MerchPage; break;
    case 'newsletter':
    case 'visit':
      Page = CommunityPage; break;
    default: Page = HomePage;
  }

  return (
    <>
      <Nav route={route} setRoute={setRoute} lang={lang} setLang={setLang} />
      <main key={route} className="page-enter page-enter-active">
        <Page setRoute={setRoute} />
      </main>
      <Footer setRoute={setRoute} lang={lang} setLang={setLang} />
      <WhatsAppFloat />
    </>
  );
}
