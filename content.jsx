// ============================================================
// Verified content — every link and recording below was checked
// against the Rabbi's own channels on 26 Nov 2026.
//   YouTube: "Let There Be Light | Rav Avshi Weingot" (@lettherebelight-yehior)
//   Spotify: podcast "Rav Avshi Weingot" by Yehi Or Project
// The Classes page refreshes this list from /api/classes (the
// channel's public feed); the copy here is the offline fallback.
// ============================================================

const LINKS = {
  whatsappNumber: '+972 54 540 4914',
  whatsapp: 'https://wa.me/972545404914',
  whatsappCommunity: 'https://chat.whatsapp.com/LRBqG79GkA3A6fFKxt3EIG', // "Rav Avshi | Let There Be Light" chat, listed in his video descriptions
  youtube: 'https://www.youtube.com/@lettherebelight-yehior',
  youtubeChannelId: 'UCXmo5V_ly2VysOzHhg479qw',
  spotifyShow: 'https://open.spotify.com/show/2EoY2HZTKuBOnVxt2W7NgK',
  donate: 'https://donaciones.yehiohr.live/#donate',
};

const ytWatch = (id) => 'https://www.youtube.com/watch?v=' + id;
const ytPlaylist = (id) => 'https://www.youtube.com/playlist?list=' + id;
const ytThumb = (id) => 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';

function fmtDuration(sec) {
  if (!sec) return '';
  const m = Math.round(sec / 60);
  if (m < 60) return m + ' min';
  const h = Math.floor(m / 60), r = m % 60;
  return h + ' h' + (r ? ' ' + r + ' min' : '');
}
function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00Z' : ''));
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Topic tags used for the class filter.
function tagFor(title) {
  const t = title.toLowerCase();
  if (/pars(ha|has|hat|hat)|perasha|parashat/.test(t)) return 'Parasha';
  if (/likutei moharan|nachman|uman/.test(t)) return 'Rebbe Nachman';
  if (/meditat/.test(t)) return 'Meditation';
  if (/amida|prayer|davening|tefil/.test(t)) return 'Prayer';
  if (/farbr|hillula|niggun|kumzitz|song/.test(t)) return 'Farbrengen';
  return 'Inner Torah';
}

// Recent classes, newest first (channel feed, 26 Nov 2026).
// Summaries are trimmed from the Rabbi's own video descriptions.
const CLASSES = [
  { id: '7yMFVlHnKgk', date: '2026-11-26', sec: 4646, title: "Finding Joy and Peace of Mind (Yishuv HaDa'at)", series: 'Likutei Moharan',
    summary: "A Likutei Moharan class (Tinyana, Torah 10) on settling the mind to discover our true purpose and draw closer to Hashem.",
    spotifyEpisode: '3G6zinlNZnJWq0IoIme85h' },
  { id: '3tlN-p2Yj3Y', date: '2026-11-13', sec: 3279, title: 'The Inner Struggle Within Us: Jewish Meditation Class',
    summary: 'A guided inner meditation on Yaakov and Esav — not just as historical figures, but as forces living within each of us.' },
  { id: 'ru9pMwIggG0', date: '2026-11-04', sec: 2097, title: 'Thank You Hashem for Tzfat',
    summary: 'What makes Tzfat so unique? The kabbalistic secrets of the city, the passing of holy tzaddikim, and Parshat Chayei Sarah.' },
  { id: 'TnmikqKSos8', date: '2026-10-28', sec: 2600, title: 'The origin of Moshiach, Chaos and order',
    summary: 'Why must redemption emerge from darkness and disorder? The Maharal on renewal and the breaking of the old shell.' },
  { id: 'a_2xyMoYvO8', date: '2026-09-07', sec: 1222, title: 'Why Your Perspective is the Key to Rosh Hashana',
    summary: 'A change in how we view our relationship with the Creator and our own infinite worth.' },
  { id: 'vF4_lpCF3jI', date: '2026-06-19', sec: 7639, title: 'You Were Never Meant to Do It Alone', where: 'Mexico City',
    summary: 'A session from Mexico City on Klal Yisrael as a single, unified team, drawing on the Noam Elimelech and the Arizal.' },
  { id: 'emc5pdzvqg8', date: '2026-06-17', sec: 3748, title: 'Tamuz, vision and perspective', summary: '' },
  { id: 'iB1XqzogIRA', date: '2026-06-03', sec: 3871, title: 'Reclaiming Emunah in an Age of Confusion',
    summary: 'The secret of Gamzu L’tova — “even this is for the good.”' },
  { id: 'il2404jdGs8', date: '2026-02-05', sec: 2903, title: 'Parshas Yisro: Living Up to the Torah’s Intention', summary: '' },
  { id: 'IZFkkkNieYQ', date: '2026-01-22', sec: 3691, title: 'Deeper explanation of the Amida',
    summary: 'The spiritual mechanics behind our daily prayers and the Shemona Esrei — man as a “ladder” and connector.' },
  { id: 'eXyGRnceHyM', date: '2026-01-15', sec: 1200, title: 'Parshas Vayeira: Feeling the Pleasure of Being Part of a Team', summary: '' },
  { id: 'Zbq0Oyk2Z8I', date: '2026-01-08', sec: 1788, title: 'Parshas Shemos: Thanking, singing, and shining in darkness', summary: '' },
  { id: 'Pk80CozmkWA', date: '2026-01-04', sec: 1945, title: 'Parshas Vayechi: Healing The World Stitch By Stitch', summary: '' },
  { id: 'YYfCx1CtXOY', date: '2025-11-11', sec: 1449, title: 'Parshat Chayei Sarah: Understanding What It Means to Be Shomer HaBrit', summary: '' },
  { id: 'Ym4O7uRk8H8', date: '2025-11-07', sec: 3973, title: 'Hillula of Reb Shlomo Carlebach — Farbrengen', summary: '' },
].map(c => ({ ...c, tag: tagFor(c.title + ' ' + (c.series || '')) }));

// Playlists on the Rabbi's channel (Rosh Chodesh and Shorts are left out on purpose).
const PLAYLISTS = [
  { id: 'PLgSQJNMuDV7B4jv44xSOtX-G6Z9v4_UYf', title: 'Parasha' },
  { id: 'PLgSQJNMuDV7Dg7AkUTlzhEbUH9KflrGXm', title: 'Tomer Devorah · Tzfat Bat Medrash' },
  { id: 'PLgSQJNMuDV7DBQwqpFTqhIWbkWNfioKj0', title: 'Alshech Academy' },
  { id: 'PLgSQJNMuDV7CP9ve-NEYkMd7pAU4u6GsB', title: 'Uman Gueula Trip' },
  { id: 'PLgSQJNMuDV7C-z09LG_6KaWORiKP_aTqR', title: 'Geula Trip to Uman' },
  { id: 'PLBbeogw73_P0', title: 'Rav Avshi in Mexico 2026' },
  { id: 'PLgSQJNMuDV7Bas5groRVaQH2_NK0VYAah', title: 'Mexico Trip 2025' },
  { id: 'PLgSQJNMuDV7DRblI_MpKonwIUTYynNrIU', title: 'Rav Avshi in Mexico' },
  { id: 'PLgSQJNMuDV7AUJK5W_ZzMdHI-jigB5JY6', title: 'Interviews' },
  { id: 'PLgSQJNMuDV7AOlzzlndkoysaosvOfXSJM', title: 'Mekarev and Yeshiva Shalom Rav' },
];

// Teachings referenced from specific pages (all verified playable in embeds).
const TEACHINGS = {
  tzfat:   { id: 'ru9pMwIggG0', sec: 2097, date: '2026-11-04', title: 'Thank You Hashem for Tzfat' },
  meditation: { id: '3tlN-p2Yj3Y', sec: 3279, date: '2026-11-13', title: 'The Inner Struggle Within Us: Jewish Meditation Class' },
  amida:   { id: 'IZFkkkNieYQ', sec: 3691, date: '2026-01-22', title: 'Deeper explanation of the Amida' },
  uman:    { id: 'W7BM9Qe_tjI', sec: 1941, date: '2025-07-13', title: 'How to Always Be in a State of Joy — from Uman',
             summary: 'Recorded in Uman near the tzaddikim: “It’s a great mitzvah to always be in joy.”' },
  teens:   { id: 'DI1Tdfmcako', sec: 4162, date: '2023-08-13', title: 'Helping Teens Find & Love Themselves (interview)' },
  closer:  { id: 'IcVb-1SiS4U', sec: 127, date: '2024-03-07', title: 'Help us build something CLOSER' },
};

// The one verified music release.
const ADAM_KADMON = {
  title: 'Adam Kadmon', he: 'אדם קדמון',
  artists: 'Avshi Weingot & Shlepping Nachas',
  released: '30 Mar 2023', length: '4:11',
  youtube: 'QwFFLkW6HZQ',
  spotifyTrack: '4qyJhZnP9WRxOBJ7qyzqde',
  credits: [
    ['Produced & recorded by', 'Eli Klein & Yitzy Berry'],
    ['Vocals', 'Avshi & Shlepping Nachas'],
    ['Guitar / bass', 'Nachman Helbitz'],
    ['Sax', 'Ruby Weinreb'],
    ['Director', 'Yehuda Grovais'],
    ['Cinematographer', 'Itzik Grovais'],
    ['Producer', 'Salomon Askenazi'],
    ['Editor', 'Jimmy Cohen'],
  ],
  locations: 'Filmed at R’ Yosi d’Pekien (Baal Shem Tov Forest), R’ Elazar HaModai (Birya Forest), R’ Shimon bar Yochai (Meron) and the Mekarev Shul, Tzfat.',
};

// Photo provenance. "doc" = documentary photograph; "render" = architectural
// render or generated image — never shown as documentary.
const PHOTOS = {
  menorah:   { src: 'assets/hero-menorah.webp', kind: 'doc', alt: 'Rav Avshi lighting a tall menorah at night in a Tzfat street, a crowd watching' },
  portrait:  { src: 'assets/rav-portrait.webp', kind: 'doc', alt: 'Rav Avshi laughing, holding an open sefer — black and white portrait' },
  seforim:   { src: 'assets/rav-seforim-bw.webp', kind: 'doc', alt: 'Rav Avshi with an open sefer, black and white' },
  learning:  { src: 'assets/learning-doorway.webp', kind: 'doc', alt: 'Rav Avshi learning at a wooden table with two students by an open doorway' },
  campfire:  { src: 'assets/campfire-night.webp', kind: 'doc', alt: 'Students gathered around a campfire at night on a rocky hillside' },
  fireMusic: { src: 'assets/fire-music.webp', kind: 'doc', alt: 'Rav Avshi with a guitar beside a fire, students singing' },
  alley:     { src: 'assets/tzfat-alley.webp', kind: 'doc', alt: 'A narrow Tzfat alley with blue doors, stone steps and an olive tree' },
  walking:   { src: 'assets/tzfat-walking.webp', kind: 'doc', alt: 'A man walking down a stone street in Tzfat, sepia' },
  group:     { src: 'assets/group-smiling.webp', kind: 'doc', alt: 'Rav Avshi laughing with students in a Tzfat street' },
  sitting:   { src: 'assets/three-sitting.webp', kind: 'doc', alt: 'Rav Avshi sitting on stone steps in conversation with two young men' },
  clouds:    { src: 'assets/looking-clouds.webp', kind: 'doc', alt: 'A group of students at a railing looking out at a dramatic sky' },
  praying:   { src: 'assets/rav-praying.webp', kind: 'doc', alt: 'Rav Avshi in prayer among trees, hand over his eyes' },
  meditative:{ src: 'assets/rav-meditative.webp', kind: 'doc', alt: 'Rav Avshi standing in quiet prayer among pines' },
  father:    { src: 'assets/co-leading-father.webp', kind: 'doc', alt: 'Rav Avshi and his father, Rav Rafael Weingot, side by side' },
  laughing:  { src: 'assets/students-laughing.webp', kind: 'doc', alt: 'Students laughing together in a Tzfat street, sepia' },
  jumping:   { src: 'assets/jumping-mountains.webp', kind: 'doc', alt: 'A young man leaping on a rocky hillside in the Galilee' },
  cover:     { src: 'assets/adam-kadmon-cover.webp', kind: 'doc', alt: 'Adam Kadmon cover art: Avshi Weingot and Shlepping Nachas singing with a guitar in a Tzfat alley' },
  // Renders and generated scenes — always labelled.
  centerRender:  { src: 'assets/yehi-ohr-building.webp', kind: 'render', alt: 'Architectural render: a stone-and-plaster building with deep eaves beside a road' },
  facadeRender:  { src: 'assets/yehi-ohr-facade.webp', kind: 'render', alt: 'Architectural render: Yeshiva Shalom Rav facade at twilight' },
  sideRender:    { src: 'assets/yehi-ohr-side.webp', kind: 'render', alt: 'Architectural render: Yeshiva Shalom Rav front elevation' },
  mekarevRender: { src: 'assets/mekarev-shul.webp', kind: 'render', alt: 'Architectural render: stone building with lanterns on a plaza' },
  shulRender:    { src: 'assets/shalom-rav-shul.webp', kind: 'render', alt: 'Architectural render: Shalom Rav shul with lanterns at dusk' },
};

Object.assign(window, { LINKS, CLASSES, PLAYLISTS, TEACHINGS, ADAM_KADMON, PHOTOS, ytWatch, ytPlaylist, ytThumb, fmtDuration, fmtDate, tagFor });
