import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import TopContactBar from '../components/Contact/TopContactBar';
import FloatingNavigation from '../components/Navigation/FloatingNavigation';
import Footer from '../components/Footer/Footer';
import { Analytics } from "@vercel/analytics/react";
import { ScrollToTop } from '../components/Navigation/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Goldmine Communications & Construction',
  description: 'Leading provider of communications and construction solutions in Northern California',
  keywords: 'communications, construction, fiber optics, network infrastructure, commercial construction',
  openGraph: {
    title: 'Goldmine Communications & Construction',
    description: 'Leading provider of communications and construction solutions',
    url: 'https://goldminecomm.net',
    siteName: 'Goldmine Communications & Construction',
    images: [
      {
        url: '/images/logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'Goldmine Communications & Construction',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
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
        {/* Preload LCP hero image to reduce resource load delay */}
        <link
          rel="preload"
          href="/images/projects/Oregon-AV-Station/AV-station/Oregon-AvStations-hero.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
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