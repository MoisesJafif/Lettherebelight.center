import { Cormorant_Garamond, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Yehi Ohr — Rav Avshi · Let There Be Light',
  description:
    'A living spiritual center in Tzfat dedicated to learning, prayer, music, Shabbat, and transformational experiences with Rav Avshi. Torah, Light, and Living Experience.',
  openGraph: {
    title: 'Yehi Ohr — Rav Avshi',
    description: 'A living spiritual center in Tzfat. Torah, Light, and Living Experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain font-sans">
        {children}
      </body>
    </html>
  );
}
