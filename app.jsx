// Hash router. Every existing deep link keeps working (#rav-avshi, #classes,
// #torah-classes, #newsletter, #visit …) and the browser back button moves
// between pages. A second segment (e.g. #faq/shabbat) targets a section.

const ROUTES = {
  home:            ['Yehi Ohr — Rav Avshi · Let There Be Light', () => HomePage],
  'rav-avshi':     ['Rav Avshi · Yehi Ohr', () => RavAvshiPage],
  'yehi-ohr':      ['Visit the Yehi Ohr Center · Tzfat', () => YehiOhrPage],
  visit:           ['Visit the Yehi Ohr Center · Tzfat', () => YehiOhrPage],
  vision:          ['Vision · Yehi Ohr', () => VisionPage],
  teaching:        ['Teaching & Path · Yehi Ohr', () => TeachingPage],
  classes:         ['Torah Classes · Yehi Ohr', () => TorahClassesPage],
  'torah-classes': ['Torah Classes · Yehi Ohr', () => TorahClassesPage],
  music:           ['Music · Yehi Ohr', () => MusicPage],
  tours:           ['Tours & Seminars · Yehi Ohr', () => ToursPage],
  community:       ['Shabbat & Community · Yehi Ohr', () => CommunityPage],
  support:         ['Support Yehi Ohr', () => SupportPage],
  contact:         ['Contact · Yehi Ohr', () => ContactPage],
  newsletter:      ['Updates · Yehi Ohr', () => ContactPage],
  faq:             ['Practical Questions · Yehi Ohr', () => FAQPage],
  merch:           ['Merch · Yehi Ohr', () => MerchPage],
};

function parseHash() {
  const raw = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''));
  const [route, sub] = raw.split('/');
  return { route: ROUTES[route] ? route : 'home', sub: sub || (route === 'newsletter' ? 'updates' : '') };
}

function App() {
  const [{ route, sub }, setLoc] = React.useState(parseHash);
  const first = React.useRef(true);

  React.useEffect(() => {
    const on = () => setLoc(parseHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  React.useEffect(() => {
    document.title = ROUTES[route][0];
    const target = sub && document.getElementById(sub);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    } else if (!first.current) {
      window.scrollTo(0, 0);
    }
    // Move focus to the new page heading so screen readers announce it.
    if (!first.current) {
      const h = document.querySelector('[data-page-title]');
      h && h.focus({ preventScroll: true });
    }
    first.current = false;
  }, [route, sub]);

  const Page = ROUTES[route][1]();

  return (
    <>
      <Header route={route} />
      <main id="main" tabIndex="-1" key={route}>
        <Page sub={sub} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
