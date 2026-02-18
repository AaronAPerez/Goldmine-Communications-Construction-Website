import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import TopContactBar from '../components/Contact/TopContactBar';
import FloatingNavigation from '../components/Navigation/FloatingNavigation';
import Footer from '../components/Footer/Footer';
import { Analytics } from "@vercel/analytics/react";
import { ScrollToTop } from '../components/Navigation/ScrollToTop';
import JsonLd, { localBusinessSchema, organizationSchema } from '../components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.goldminecomm.net'),
  title: {
    default: 'Goldmine Communications & Construction | Licensed Telecommunications Contractor Northern California',
    template: '%s | Goldmine Communications & Construction',
  },
  description: 'Licensed, bonded & insured telecommunications and construction company serving Northern California, Central Valley, and the Bay Area. Specializing in fiber optics, 5G infrastructure, EV charging stations, and commercial construction. CA License #1099543.',
  keywords: [
    // Primary Services
    'telecommunications contractor',
    'fiber optic installation',
    '5G infrastructure',
    'EV charging station installation',
    'commercial construction',
    'network infrastructure',
    // Location Keywords - Central Valley
    'Stockton telecommunications',
    'Modesto fiber optics',
    'Central Valley construction',
    'Tracy network services',
    'Manteca contractor',
    'Lodi telecommunications',
    'Fresno communications',
    // Location Keywords - Bay Area
    'San Jose telecommunications',
    'Oakland fiber optics',
    'San Francisco network contractor',
    'Hayward construction',
    'Fremont telecommunications',
    'Palo Alto infrastructure',
    'Bay Area contractor',
    // Location Keywords - Sacramento
    'Sacramento telecommunications',
    'Northern California contractor',
    // Service Keywords
    'wireless infrastructure',
    'data center services',
    'DAS installation',
    'small cell installation',
    'commercial electrical',
    'bonded contractor California',
    'licensed contractor',
    'NECA member contractor',
  ],
  authors: [{ name: 'Goldmine Communications & Construction' }],
  creator: 'Goldmine Communications & Construction',
  publisher: 'Goldmine Communications & Construction',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Goldmine Communications & Construction | Licensed Contractor Northern California',
    description: 'Licensed, bonded & insured telecommunications and construction company serving Northern California, Central Valley, and Bay Area. Fiber optics, 5G, EV charging, commercial construction. CA Lic #1099543.',
    url: 'https://www.goldminecomm.net',
    siteName: 'Goldmine Communications & Construction',
    images: [
      {
        url: '/images/logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'Goldmine Communications & Construction - Licensed Contractor Northern California',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goldmine Communications & Construction | Northern California',
    description: 'Licensed telecommunications & construction contractor serving Northern California, Central Valley & Bay Area. Fiber optics, 5G, EV charging stations.',
    images: ['/images/logo-banner.png'],
  },
  alternates: {
    canonical: 'https://www.goldminecomm.net',
  },
  category: 'Construction & Telecommunications',
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'Stockton, California',
    'geo.position': '37.9352;-121.2767',
    'ICBM': '37.9352, -121.2767',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <JsonLd schema={[localBusinessSchema, organizationSchema]} />
        {/* Preload LCP hero image to reduce resource load delay */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 
                     bg-gold-400 text-white px-4 py-2 rounded-lg z-[60]"
        >
          Skip to main content
        </a>

        {/* Layout structure with overflow fixes */}
        <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
          {/* Top contact bar - fixed width */}
          <div className="w-full overflow-x-hidden">
            <TopContactBar />
          </div>

          {/* Floating navigation - fixed width */}
          <div className="w-full overflow-x-hidden">
            <FloatingNavigation />
          </div>

          {/* Main content with proper constraints */}
          <main
            id="main-content"
            className="flex-grow w-full max-w-full overflow-x-hidden bg-gray-50"
          >
            <div className="w-full max-w-full">
              {children}
            </div>
            <Analytics />
            <SpeedInsights />
          </main>

          {/* Footer with width constraints */}
          <div className="w-full overflow-x-hidden">
            <Footer />
          </div>

          {/* Scroll to top button */}
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}