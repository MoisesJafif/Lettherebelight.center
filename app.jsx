const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [route, setRouteRaw] = useStateApp(() => {
    const h = window.location.hash.replace('#','');
    return h || 'home';
  });
  const [lang, setLang] = useStateApp('EN');

  const setRoute = (r) => {
    setRouteRaw(r);
    window.location.hash = r;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffectApp(() => {
    const onHash = () => setRouteRaw(window.location.hash.replace('#','') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

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
      // route these to relevant existing pages
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

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
