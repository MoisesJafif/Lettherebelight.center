// ============================================================
// WhatsApp Concierge — floating popup + smart intake form
// Builds a clean line-formatted WhatsApp message from the
// answers and opens chat with it pre-filled.
// ============================================================

const WA_PHONE = '%2B972545404914';
const WA_BASE = 'https://api.whatsapp.com/send/?phone=' + WA_PHONE;
const WA_OPEN_EMPTY = WA_BASE + '&text&type=phone_number&app_absent=0';
const DRAFT_KEY = 'yo:wa:draft';

// ---- UI strings per language ----
const WA_L10N = {
  EN: {
    title: 'Message Rav Avshi', subtitle: 'A few details help the team reply faster.', name: 'Your name',
    topic: 'What\u2019s this about?', quickStart: 'Quick start',
    bestTime: 'Best time to contact you', anyTime: 'Any time',
    preferredLang: 'Preferred follow-up language', notes: 'Anything else?',
    placeholder: 'Shalom Rav Avshi, I\u2019d like to get in touch\u2026',
    send: 'Send on WhatsApp', skip: 'Open WhatsApp without form', help: 'Need help? Email hello@lettherebelight.center',
    errEmpty: 'Please add your name or a short note first.',
    opening: 'Opening WhatsApp\u2026', sentFrom: 'Sent from the Yehi Ohr website.',
    greet: (name) => 'Shalom Rav Avshi' + (name ? ', my name is ' + name : '') + '.',
    intro: {
      general:  'I\u2019d like to get in touch.',
      shabbat:  'I\u2019d like to join a Shabbat at Yehi Ohr.',
      visit:    'I\u2019d like to visit Yehi Ohr in Tzfat.',
      classes:  'I\u2019d love to learn more about your Torah classes.',
      tour:     'I\u2019m interested in a spiritual tour or journey.',
      support:  'I\u2019d like to support Yehi Ohr.'
    },
    topics: [
      ['general', 'General Question'], ['shabbat', 'Join a Shabbat'], ['visit', 'Visit Yehi Ohr'],
      ['classes', 'Torah Classes'], ['tour', 'Tour / Journey'], ['support', 'Support / Donation']
    ],
    labels: {
      arrivalDate: 'Arrival date', departureDate: 'Departure date',
      guests: 'Number of guests', breakdown: 'Men / women / children',
      comingFrom: 'Coming from', stayingAt: 'Staying in Tzfat',
      mealsNeeded: 'Meals needed', sleepingNeeded: 'Sleeping arrangements needed', dietary: 'Dietary restrictions',
      visitDate: 'Visit date', interests: 'Interests',
      format: 'Online or in-person', topics: 'Topics of interest',
      type: 'Private or group', budget: 'Budget (optional)',
      recurring: 'One-time or monthly', supportInterest: 'Where to direct the gift',
      bestTime: 'Best time to contact', lang: 'Preferred language',
      notes: 'Notes', name: 'Name', topic: 'Topic'
    },
    opts: {
      mealsNeeded: ['Meals only', 'Meals + sleeping', 'Sleeping only', 'Just attending'],
      format: ['In-person in Tzfat', 'Online', 'Both'],
      type: ['Private', 'Group', 'Either'],
      recurring: ['One-time', 'Monthly'],
      supportInterest: ['Yehi Ohr center', 'Shabbat meals', 'Torah classes', 'Building fund', 'General support'],
      classesTopics: ['Kabbalah', 'Chassidut', 'Zohar', 'Beginner Torah', 'Music', 'Inner Torah'],
      tourInterests: ['Kabbalah sites', 'Old City', 'Art', 'Music', 'Graves of tzaddikim'],
      visitInterests: ['Learning', 'Prayer', 'Tour', 'Music', 'Meeting Rav Avshi'],
      lang: ['English', 'Hebrew', 'Spanish'],
      bestTime: ['Morning', 'Afternoon', 'Evening', 'Any time']
    }
  },
  HE: {
    title: '\u05e9\u05dc\u05d7\u05d5 \u05d4\u05d5\u05d3\u05e2\u05d4 \u05dc\u05d4\u05e8\u05d1 \u05d0\u05d1\u05e9\u05d9', subtitle: '\u05e4\u05e8\u05d8\u05d9\u05dd \u05e7\u05e6\u05e8\u05d9\u05dd \u05de\u05d0\u05e4\u05e9\u05e8\u05d9\u05dd \u05dc\u05e6\u05d5\u05d5\u05ea \u05dc\u05d4\u05e9\u05d9\u05d1 \u05de\u05d4\u05e8.', name: '\u05d4\u05e9\u05dd \u05e9\u05dc\u05da',
    topic: '\u05d1\u05e0\u05d5\u05e9\u05d0', quickStart: '\u05d4\u05ea\u05d7\u05dc\u05d4 \u05de\u05d4\u05d9\u05e8\u05d4',
    bestTime: '\u05d6\u05de\u05df \u05de\u05d5\u05e2\u05d3\u05e3 \u05dc\u05e2\u05d3\u05db\u05d5\u05df', anyTime: '\u05db\u05dc \u05d6\u05de\u05df',
    preferredLang: '\u05e9\u05e4\u05d4 \u05de\u05d5\u05e2\u05d3\u05e4\u05ea', notes: '\u05de\u05e9\u05d4\u05d5 \u05e0\u05d5\u05e1\u05e3?',
    placeholder: '\u05e9\u05dc\u05d5\u05dd \u05d4\u05e8\u05d1 \u05d0\u05d1\u05e9\u05d9, \u05d4\u05d9\u05d9\u05ea\u05d9 \u05e8\u05d5\u05e6\u05d4...',
    send: '\u05e9\u05dc\u05d7 \u05d1\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4', skip: '\u05e4\u05ea\u05d7 \u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4 \u05dc\u05dc\u05d0 \u05d8\u05d5\u05e4\u05e1', help: '\u05e6\u05e8\u05d9\u05db\u05d9\u05dd \u05e2\u05d6\u05e8\u05d4? hello@lettherebelight.center',
    errEmpty: '\u05e0\u05d0 \u05dc\u05de\u05dc\u05d0 \u05e9\u05dd \u05d0\u05d5 \u05dc\u05db\u05ea\u05d5\u05d1 \u05d4\u05e2\u05e8\u05d4 \u05e7\u05e6\u05e8\u05d4.',
    opening: '\u05e4\u05d5\u05ea\u05d7 \u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4...', sentFrom: '\u05e0\u05e9\u05dc\u05d7 \u05de\u05d0\u05ea\u05e8 \u05d9\u05d4\u05d9 \u05d0\u05d5\u05e8.',
    greet: (name) => '\u05e9\u05dc\u05d5\u05dd \u05d4\u05e8\u05d1 \u05d0\u05d1\u05e9\u05d9' + (name ? ', \u05e9\u05de\u05d9 ' + name : '') + '.',
    intro: {
      general:  '\u05d4\u05d9\u05d9\u05ea\u05d9 \u05e8\u05d5\u05e6\u05d4 \u05dc\u05d9\u05e6\u05d5\u05e8 \u05e7\u05e9\u05e8.',
      shabbat:  '\u05d0\u05e0\u05d9 \u05de\u05e2\u05d5\u05e0\u05d9\u05d9\u05df \u05dc\u05d4\u05ea\u05d0\u05e8\u05d7 \u05d1\u05e9\u05d1\u05ea \u05d1\u05d9\u05d4\u05d9 \u05d0\u05d5\u05e8.',
      visit:    '\u05d0\u05e9\u05de\u05d7 \u05dc\u05d1\u05e7\u05e8 \u05d0\u05ea \u05d9\u05d4\u05d9 \u05d0\u05d5\u05e8 \u05d1\u05e6\u05e4\u05ea.',
      classes:  '\u05d0\u05e9\u05de\u05d7 \u05dc\u05e9\u05de\u05d5\u05e2 \u05e2\u05dc \u05d4\u05e9\u05d9\u05e2\u05d5\u05e8\u05d9\u05dd.',
      tour:     '\u05d0\u05e0\u05d9 \u05de\u05e2\u05d5\u05e0\u05d9\u05d9\u05df \u05d1\u05e1\u05d9\u05d5\u05e8 \u05e8\u05d5\u05d7\u05e0\u05d9.',
      support:  '\u05d0\u05e9\u05de\u05d7 \u05dc\u05ea\u05de\u05d5\u05da \u05d1\u05d9\u05d4\u05d9 \u05d0\u05d5\u05e8.'
    },
    topics: [
      ['general', '\u05e9\u05d0\u05dc\u05d4 \u05db\u05dc\u05dc\u05d9\u05ea'], ['shabbat', '\u05dc\u05d4\u05e6\u05d8\u05e8\u05e3 \u05dc\u05e9\u05d1\u05ea'], ['visit', '\u05d1\u05d9\u05e7\u05d5\u05e8 \u05d1\u05d9\u05d4\u05d9 \u05d0\u05d5\u05e8'],
      ['classes', '\u05e9\u05d9\u05e2\u05d5\u05e8\u05d9 \u05ea\u05d5\u05e8\u05d4'], ['tour', '\u05e1\u05d9\u05d5\u05e8 / \u05de\u05e1\u05e2'], ['support', '\u05ea\u05de\u05d9\u05db\u05d4 / \u05ea\u05e8\u05d5\u05de\u05d4']
    ],
    labels: {
      arrivalDate: '\u05ea\u05d0\u05e8\u05d9\u05da \u05d4\u05d2\u05e2\u05d4', departureDate: '\u05ea\u05d0\u05e8\u05d9\u05da \u05e2\u05d6\u05d9\u05d1\u05d4',
      guests: '\u05de\u05e1\u05e4\u05e8 \u05d0\u05d5\u05e8\u05d7\u05d9\u05dd', breakdown: '\u05d2\u05d1\u05e8\u05d9\u05dd / \u05e0\u05e9\u05d9\u05dd / \u05d9\u05dc\u05d3\u05d9\u05dd',
      comingFrom: '\u05de\u05d0\u05d9\u05df \u05d4\u05d2\u05e2\u05ea\u05dd', stayingAt: '\u05dc\u05d9\u05e0\u05d4 \u05d1\u05e6\u05e4\u05ea',
      mealsNeeded: '\u05d0\u05d5\u05db\u05dc \u05d3\u05e8\u05d5\u05e9', sleepingNeeded: '\u05dc\u05d9\u05e0\u05d4 \u05d3\u05e8\u05d5\u05e9\u05d4', dietary: '\u05d4\u05d2\u05d1\u05dc\u05d5\u05ea \u05ea\u05d6\u05d5\u05e0\u05d4',
      visitDate: '\u05ea\u05d0\u05e8\u05d9\u05da \u05d1\u05d9\u05e7\u05d5\u05e8', interests: '\u05ea\u05d7\u05d5\u05de\u05d9 \u05e2\u05e0\u05d9\u05d9\u05df',
      format: '\u05d0\u05d5\u05e0\u05dc\u05d9\u05d9\u05df \u05d0\u05d5 \u05e4\u05e8\u05d5\u05e0\u05d8\u05dc\u05d9', topics: '\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05de\u05e2\u05e0\u05d9\u05d9\u05e0\u05d9\u05dd',
      type: '\u05e4\u05e8\u05d8\u05d9 \u05d0\u05d5 \u05e7\u05d1\u05d5\u05e6\u05ea\u05d9', budget: '\u05ea\u05e7\u05e6\u05d9\u05d1 (\u05d0\u05d5\u05e4\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9)',
      recurring: '\u05d7\u05d3 \u05e4\u05e2\u05de\u05d9 \u05d0\u05d5 \u05d7\u05d5\u05d3\u05e9\u05d9', supportInterest: '\u05dc\u05d0\u05df \u05dc\u05db\u05d5\u05d5\u05df \u05d0\u05ea \u05d4\u05ea\u05e8\u05d5\u05de\u05d4',
      bestTime: '\u05d6\u05de\u05df \u05de\u05d5\u05e2\u05d3\u05e3', lang: '\u05e9\u05e4\u05d4 \u05de\u05d5\u05e2\u05d3\u05e4\u05ea',
      notes: '\u05d4\u05e2\u05e8\u05d5\u05ea', name: '\u05e9\u05dd', topic: '\u05e0\u05d5\u05e9\u05d0'
    },
    opts: {
      mealsNeeded: ['\u05d0\u05d5\u05db\u05dc \u05d1\u05dc\u05d1\u05d3', '\u05d0\u05d5\u05db\u05dc + \u05dc\u05d9\u05e0\u05d4', '\u05dc\u05d9\u05e0\u05d4 \u05d1\u05dc\u05d1\u05d3', '\u05de\u05e9\u05ea\u05ea\u05e4\u05d9\u05dd'],
      format: ['\u05e4\u05e8\u05d5\u05e0\u05d8\u05dc\u05d9 \u05d1\u05e6\u05e4\u05ea', '\u05d0\u05d5\u05e0\u05dc\u05d9\u05d9\u05df', '\u05e9\u05e0\u05d9\u05d4\u05dd'],
      type: ['\u05e4\u05e8\u05d8\u05d9', '\u05e7\u05d1\u05d5\u05e6\u05ea\u05d9', '\u05dc\u05d0 \u05e2\u05e7\u05e8\u05d5\u05e0\u05d9'],
      recurring: ['\u05d7\u05d3 \u05e4\u05e2\u05de\u05d9', '\u05d7\u05d5\u05d3\u05e9\u05d9'],
      supportInterest: ['\u05de\u05e8\u05db\u05d6 \u05d9\u05d4\u05d9 \u05d0\u05d5\u05e8', '\u05d0\u05e8\u05d5\u05d7\u05d5\u05ea \u05e9\u05d1\u05ea', '\u05e9\u05d9\u05e2\u05d5\u05e8\u05d9 \u05ea\u05d5\u05e8\u05d4', '\u05e7\u05e8\u05df \u05d4\u05d1\u05e0\u05d9\u05d9\u05df', '\u05ea\u05de\u05d9\u05db\u05d4 \u05db\u05dc\u05dc\u05d9\u05ea'],
      classesTopics: ['\u05e7\u05d1\u05dc\u05d4', '\u05d7\u05e1\u05d9\u05d3\u05d5\u05ea', '\u05d6\u05d5\u05d4\u05e8', '\u05ea\u05d5\u05e8\u05d4 \u05dc\u05de\u05ea\u05d7\u05d9\u05dc\u05d9\u05dd', '\u05de\u05d5\u05d6\u05d9\u05e7\u05d4', '\u05ea\u05d5\u05e8\u05d4 \u05e4\u05e0\u05d9\u05de\u05d9\u05ea'],
      tourInterests: ['\u05d0\u05ea\u05e8\u05d9 \u05e7\u05d1\u05dc\u05d4', '\u05d4\u05e2\u05d9\u05e8 \u05d4\u05e2\u05ea\u05d9\u05e7\u05d4', '\u05d0\u05de\u05e0\u05d5\u05ea', '\u05de\u05d5\u05d6\u05d9\u05e7\u05d4', '\u05e7\u05d1\u05e8\u05d9 \u05e6\u05d3\u05d9\u05e7\u05d9\u05dd'],
      visitInterests: ['\u05dc\u05d9\u05de\u05d5\u05d3', '\u05ea\u05e4\u05d9\u05dc\u05d4', '\u05e1\u05d9\u05d5\u05e8', '\u05de\u05d5\u05d6\u05d9\u05e7\u05d4', '\u05e4\u05d2\u05d9\u05e9\u05d4 \u05e2\u05dd \u05d4\u05e8\u05d1'],
      lang: ['\u05d0\u05e0\u05d2\u05dc\u05d9\u05ea', '\u05e2\u05d1\u05e8\u05d9\u05ea', '\u05e1\u05e4\u05e8\u05d3\u05d9\u05ea'],
      bestTime: ['\u05d1\u05d5\u05e7\u05e8', '\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd', '\u05e2\u05e8\u05d1', '\u05db\u05dc \u05d6\u05de\u05df']
    }
  },
  ES: {
    title: 'Mensaje al Rav Avshi', subtitle: 'Unos pocos detalles ayudan al equipo a responder antes.', name: 'Tu nombre',
    topic: '\u00bfSobre qu\u00e9 escribes?', quickStart: 'Inicio r\u00e1pido',
    bestTime: 'Mejor horario de contacto', anyTime: 'Cualquier hora',
    preferredLang: 'Idioma preferido para responder', notes: '\u00bfAlgo m\u00e1s?',
    placeholder: 'Shalom Rav Avshi, me gustar\u00eda escribir\u2026',
    send: 'Enviar por WhatsApp', skip: 'Abrir WhatsApp sin formulario', help: '\u00bfNecesitas ayuda? hello@lettherebelight.center',
    errEmpty: 'Por favor agrega tu nombre o un breve mensaje.',
    opening: 'Abriendo WhatsApp\u2026', sentFrom: 'Enviado desde el sitio de Yehi Ohr.',
    greet: (name) => 'Shalom Rav Avshi' + (name ? ', mi nombre es ' + name : '') + '.',
    intro: {
      general:  'Me gustar\u00eda comunicarme.',
      shabbat:  'Me gustar\u00eda unirme a un Shabat en Yehi Ohr.',
      visit:    'Me gustar\u00eda visitar Yehi Ohr en Tzfat.',
      classes:  'Me gustar\u00eda saber m\u00e1s sobre las clases de Tor\u00e1.',
      tour:     'Me interesa un tour o viaje espiritual.',
      support:  'Me gustar\u00eda apoyar a Yehi Ohr.'
    },
    topics: [
      ['general', 'Pregunta general'], ['shabbat', 'Unirme a un Shabat'], ['visit', 'Visitar Yehi Ohr'],
      ['classes', 'Clases de Tor\u00e1'], ['tour', 'Tour / Viaje'], ['support', 'Apoyo / Donaci\u00f3n']
    ],
    labels: {
      arrivalDate: 'Fecha de llegada', departureDate: 'Fecha de salida',
      guests: 'N\u00famero de personas', breakdown: 'Hombres / mujeres / ni\u00f1os',
      comingFrom: 'Vienes de', stayingAt: 'Alojamiento en Tzfat',
      mealsNeeded: 'Comidas necesarias', sleepingNeeded: 'Alojamiento necesario', dietary: 'Restricciones diet\u00e9ticas',
      visitDate: 'Fecha de visita', interests: 'Intereses',
      format: 'En l\u00ednea o presencial', topics: 'Temas de inter\u00e9s',
      type: 'Privado o grupo', budget: 'Presupuesto (opcional)',
      recurring: 'Una vez o mensual', supportInterest: 'Destino de la donaci\u00f3n',
      bestTime: 'Mejor horario', lang: 'Idioma preferido',
      notes: 'Notas', name: 'Nombre', topic: 'Tema'
    },
    opts: {
      mealsNeeded: ['Solo comidas', 'Comidas + alojamiento', 'Solo alojamiento', 'Solo asistir'],
      format: ['Presencial en Tzfat', 'En l\u00ednea', 'Ambos'],
      type: ['Privado', 'Grupo', 'Cualquiera'],
      recurring: ['Una vez', 'Mensual'],
      supportInterest: ['Centro Yehi Ohr', 'Comidas de Shabat', 'Clases de Tor\u00e1', 'Fondo de construcci\u00f3n', 'Apoyo general'],
      classesTopics: ['Kabal\u00e1', 'Jasidut', 'Zohar', 'Tor\u00e1 b\u00e1sica', 'M\u00fasica', 'Tor\u00e1 interior'],
      tourInterests: ['Sitios de Kabal\u00e1', 'Ciudad antigua', 'Arte', 'M\u00fasica', 'Tumbas de tzadik\u00edm'],
      visitInterests: ['Estudio', 'Oraci\u00f3n', 'Tour', 'M\u00fasica', 'Encuentro con Rav Avshi'],
      lang: ['Ingl\u00e9s', 'Hebreo', 'Espa\u00f1ol'],
      bestTime: ['Ma\u00f1ana', 'Tarde', 'Noche', 'Cualquier hora']
    }
  }
};

// ---- Form schema per topic ----
function getSchema(topic, L) {
  const o = L.opts;
  const text = (key, ph) => ({ key, type: 'text', label: L.labels[key], placeholder: ph });
  const date = (key) => ({ key, type: 'date', label: L.labels[key] });
  const sel = (key, options) => ({ key, type: 'select', label: L.labels[key], options });
  const chips = (key, options) => ({ key, type: 'chips', label: L.labels[key], options });

  if (topic === 'shabbat') return [
    date('arrivalDate'), date('departureDate'),
    text('guests'), text('breakdown'),
    text('comingFrom'), text('stayingAt'),
    sel('mealsNeeded', o.mealsNeeded),
    text('dietary')
  ];
  if (topic === 'visit') return [
    date('visitDate'), text('guests'), text('comingFrom'),
    chips('interests', o.visitInterests)
  ];
  if (topic === 'classes') return [
    sel('format', o.format), chips('topics', o.classesTopics), sel('lang', o.lang)
  ];
  if (topic === 'tour') return [
    text('arrivalDate'), text('departureDate'),
    text('guests'), sel('type', o.type),
    chips('interests', o.tourInterests), sel('lang', o.lang), text('budget')
  ];
  if (topic === 'support') return [
    sel('recurring', o.recurring), sel('supportInterest', o.supportInterest)
  ];
  return [];
}

// ---- Format a clean WhatsApp message from form values ----
function buildWhatsAppMessage(state, L) {
  const lines = [];
  lines.push(L.greet(state.name));
  const topicLabel = L.topics.find(t => t[0] === state.topic)?.[1];
  const introLine = L.intro[state.topic] || L.intro.general;
  lines.push(introLine);
  lines.push('');
  if (state.name) lines.push(L.labels.name + ': ' + state.name);
  if (topicLabel) lines.push(L.labels.topic + ': ' + topicLabel);

  const schema = getSchema(state.topic, L);
  for (const field of schema) {
    const v = state[field.key];
    if (v == null || v === '' || (Array.isArray(v) && v.length === 0)) continue;
    const formatted = Array.isArray(v) ? v.join(', ') : v;
    lines.push(field.label + ': ' + formatted);
  }
  if (state.bestTime) lines.push(L.labels.bestTime + ': ' + state.bestTime);
  if (state.followupLang) lines.push(L.labels.lang + ': ' + state.followupLang);
  if (state.notes) {
    lines.push('');
    lines.push(L.labels.notes + ': ' + state.notes);
  }
  lines.push('');
  lines.push('\u2014 ' + L.sentFrom);
  return lines.join('\n');
}

function WAField({ field, value, onChange, isRTL }) {
  const set = v => onChange(field.key, v);
  if (field.type === 'text' || field.type === 'date') {
    return (
      <label className="block">
        <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.5)] mb-1.5">{field.label}</span>
        <input
          type={field.type === 'date' ? 'date' : 'text'}
          value={value || ''} onChange={e => set(e.target.value)}
          placeholder={field.placeholder || ''}
          className="w-full bg-[rgba(244,237,225,0.04)] border border-[rgba(244,237,225,0.12)] focus:border-[var(--gold)] outline-none rounded-sm px-3 py-2 text-[13px] text-[var(--parchment)] placeholder:text-[rgba(244,237,225,0.3)] transition-colors"
        />
      </label>
    );
  }
  if (field.type === 'select') {
    return (
      <label className="block">
        <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.5)] mb-1.5">{field.label}</span>
        <div className="relative">
          <select value={value || ''} onChange={e => set(e.target.value)}
            className={`w-full appearance-none bg-[rgba(244,237,225,0.04)] border border-[rgba(244,237,225,0.12)] focus:border-[var(--gold)] outline-none rounded-sm px-3 py-2 text-[13px] text-[var(--parchment)] transition-colors cursor-pointer ${isRTL ? 'pl-8' : 'pr-8'}`}>
            <option value="" className="bg-[#1f1810]">—</option>
            {field.options.map(o => <option key={o} value={o} className="bg-[#1f1810]">{o}</option>)}
          </select>
          <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] text-[rgba(244,237,225,0.5)] pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}>▾</span>
        </div>
      </label>
    );
  }
  if (field.type === 'chips') {
    const arr = Array.isArray(value) ? value : [];
    const toggle = opt => set(arr.includes(opt) ? arr.filter(x => x !== opt) : [...arr, opt]);
    return (
      <div>
        <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.5)] mb-1.5">{field.label}</span>
        <div className="flex flex-wrap gap-1.5">
          {field.options.map(opt => {
            const on = arr.includes(opt);
            return (
              <button key={opt} type="button" onClick={() => toggle(opt)}
                className={`px-2.5 py-1 text-[10px] tracking-[0.08em] uppercase rounded-full border transition-colors ${on ? 'border-[var(--gold)] text-[var(--gold)] bg-[rgba(232,166,87,0.06)]' : 'border-[rgba(244,237,225,0.15)] text-[rgba(244,237,225,0.7)] hover:border-[var(--gold)]'}`}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}

function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');
  const [state, setState] = useState({
    topic: 'general', name: '', notes: '', bestTime: '', followupLang: ''
  });
  const ref = useRef(null);
  const notesRef = useRef(null);

  const t = WA_L10N[lang];
  const isRTL = lang === 'HE';

  // Restore draft on mount
  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (draft && typeof draft === 'object') {
        setState(s => ({ ...s, ...draft.state }));
        if (draft.lang) setLang(draft.lang);
      }
    } catch (_) {}
  }, []);

  // Persist draft
  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ state, lang })); } catch (_) {}
  }, [state, lang]);

  // External open with prefill (Register buttons on Tours page, etc.)
  useEffect(() => {
    const onOpen = (e) => {
      const d = e.detail || {};
      setState(s => ({
        ...s,
        ...(d.topic ? { topic: d.topic } : {}),
        ...(d.name ? { name: d.name } : {}),
        ...(d.notes ? { notes: d.notes } : {})
      }));
      setErr('');
      setOpen(true);
    };
    window.addEventListener('yo:open-wa', onOpen);
    return () => window.removeEventListener('yo:open-wa', onOpen);
  }, []);

  // Outside click + Esc
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    const onClick = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    setTimeout(() => window.addEventListener('mousedown', onClick), 0);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  }, [open]);

  // Auto-resize notes textarea
  useEffect(() => {
    const el = notesRef.current; if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, [state.notes, open]);

  const onChange = (key, val) => { setState(s => ({ ...s, [key]: val })); if (err) setErr(''); };
  const onTopic = topic => setState(s => ({ ...s, topic }));

  const send = () => {
    const hasInfo = (state.name || '').trim() || (state.notes || '').trim();
    if (!hasInfo && state.topic === 'general') { setErr(t.errEmpty); return; }
    const message = buildWhatsAppMessage(state, t);
    const url = WA_BASE + '&text=' + encodeURIComponent(message) + '&type=phone_number&app_absent=0';
    setSending(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => setSending(false), 800);
    }, 400);
  };
  const openEmpty = () => window.open(WA_OPEN_EMPTY, '_blank', 'noopener,noreferrer');

  const schema = getSchema(state.topic, t);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Popup panel */}
      <div
        className={`origin-bottom-right transition-all duration-300 ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}
        style={{ width: 'min(400px, calc(100vw - 32px))' }}
      >
        <div className="rounded-sm border border-[rgba(244,237,225,0.12)] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_50px_rgba(232,166,87,0.08)]"
             style={{ background: 'linear-gradient(180deg, rgba(31,24,16,0.96), rgba(20,16,10,0.96))', backdropFilter: 'blur(14px)' }}>
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-[rgba(244,237,225,0.07)] flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flicker" />
                WhatsApp
              </div>
              <div className="font-display text-[22px] leading-tight mt-2">{t.title}</div>
              <p className="text-[12px] text-[rgba(244,237,225,0.6)] leading-snug mt-1">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 text-[10px] font-mono tracking-[0.18em] uppercase">
                {['EN','HE','ES'].map(L => (
                  <button key={L} onClick={() => setLang(L)}
                    className={`px-2 py-1 rounded transition-colors ${lang===L?'text-[var(--gold)]':'text-[rgba(244,237,225,0.5)] hover:text-[var(--parchment)]'}`}>
                    {L}
                  </button>
                ))}
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close"
                className="w-7 h-7 rounded-full border border-[rgba(244,237,225,0.15)] text-[rgba(244,237,225,0.7)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors flex items-center justify-center text-base">×</button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Name + Topic */}
            <div className="px-5 pt-4 space-y-3">
              <WAField field={{ key:'name', type:'text', label: t.name, placeholder: t.name }} value={state.name} onChange={onChange} isRTL={isRTL} />
              <div>
                <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.5)] mb-1.5">{t.topic}</span>
                <div className="flex flex-wrap gap-1.5">
                  {t.topics.map(([k, label]) => (
                    <button key={k} type="button" onClick={() => onTopic(k)}
                      className={`px-2.5 py-1.5 text-[10px] tracking-[0.1em] uppercase rounded-full border transition-colors ${state.topic===k ? 'border-[var(--gold)] text-[var(--gold)] bg-[rgba(232,166,87,0.06)]' : 'border-[rgba(244,237,225,0.15)] text-[rgba(244,237,225,0.7)] hover:border-[var(--gold)]'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Conditional fields */}
            {schema.length > 0 && (
              <div className="px-5 pt-4 space-y-3 animate-[fadeIn_300ms_ease]">
                {schema.map(field => (
                  <WAField key={field.key} field={field} value={state[field.key]} onChange={onChange} isRTL={isRTL} />
                ))}
              </div>
            )}

            {/* Best time + Preferred language */}
            <div className="px-5 pt-4 grid grid-cols-2 gap-3">
              <WAField field={{ key:'bestTime', type:'select', label: t.bestTime, options: t.opts.bestTime }} value={state.bestTime} onChange={onChange} isRTL={isRTL} />
              <WAField field={{ key:'followupLang', type:'select', label: t.preferredLang, options: t.opts.lang }} value={state.followupLang} onChange={onChange} isRTL={isRTL} />
            </div>

            {/* Notes */}
            <div className="px-5 pt-4 pb-2">
              <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-[rgba(244,237,225,0.5)] mb-1.5">{t.notes}</span>
              <textarea
                ref={notesRef}
                value={state.notes}
                onChange={e => onChange('notes', e.target.value)}
                rows={2}
                placeholder={t.placeholder}
                className={`w-full bg-[rgba(244,237,225,0.04)] border ${err ? 'border-red-400/60' : 'border-[rgba(244,237,225,0.12)] focus:border-[var(--gold)]'} outline-none rounded-sm px-3 py-2.5 text-[13px] leading-relaxed resize-none text-[var(--parchment)] placeholder:text-[rgba(244,237,225,0.35)] transition-colors overflow-hidden`}
                style={{ minHeight: '60px' }}
              />
              {err && <div className="mt-2 text-[12px] text-red-400/90">{err}</div>}
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 pt-3 space-y-2 border-t border-[rgba(244,237,225,0.06)]">
            <button onClick={send} disabled={sending}
              className="btn-primary w-full px-5 py-3.5 rounded-full text-[12px] tracking-[0.18em] uppercase font-medium inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {sending ? (
                <>
                  <span className="w-3 h-3 border-2 border-[#1a120b] border-r-transparent rounded-full animate-spin" />
                  {t.opening}
                </>
              ) : (
                <>
                  {t.send}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M2 21l1.65-4.95A9 9 0 1 1 7 19.7L2 21zm5.3-3.4l.4.2a7 7 0 1 0-3.5-3.5l.2.4-1 3 3-1zM17 14.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.8-2.4c-.2-.4.2-.3.6-1 .1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.3-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.2.8 2.3.9 2.5a8.6 8.6 0 0 0 3.4 3c2.1.8 2.1.5 2.5.5.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2z"/></svg>
                </>
              )}
            </button>
            <button onClick={openEmpty}
              className="btn-ghost w-full px-5 py-2.5 rounded-full text-[11px] tracking-[0.18em] uppercase">
              {t.skip}
            </button>
            <div className="text-center text-[10px] text-[rgba(244,237,225,0.4)] pt-1">{t.help}</div>
          </div>
        </div>
      </div>

      {/* Floating trigger */}
      <button onClick={() => setOpen(o => !o)} aria-label="Open WhatsApp chat"
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(180deg, rgba(232,166,87,0.95), rgba(160,122,58,0.95))',
          boxShadow: '0 8px 30px rgba(0,0,0,0.55), 0 0 30px rgba(232,166,87,0.35)'
        }}>
        <span className="absolute inset-0 rounded-full opacity-60" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }} />
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1a120b] relative">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .1-3.3-.7-2.7-1-4.4-3.8-4.5-3.9-.1-.2-1-1.4-1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8s.1.3 0 .5c-.1.2-.2.3-.4.5-.1.1-.3.3-.4.4-.1.1-.3.3-.1.5.1.3.7 1.1 1.5 1.8 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.1.1.7-.1 1.3z"/>
        </svg>
        {!open && <span className="absolute inset-0 rounded-full border border-[rgba(232,166,87,0.6)] animate-[pulse_2.4s_ease-out_infinite]" />}
      </button>
    </div>
  );
}

// Globally available
Object.assign(window, { WhatsAppFloat });
