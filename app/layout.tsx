
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import TopContactBar from '../components/Contact/TopContactBar';
import FloatingNavigation from '../components/Navigation/FloatingNavigation';
import Footer from '../components/Footer/Footer';
import { Analytics } from "@vercel/analytics/react";
import { ScrollToTop } from '../components/Navigation/ScrollToTop';
import { auth } from '@/lib/auth';
import SessionProvider from '@/components/providers/SessionProvider';




const inter = Inter({ subsets: ['latin'] });

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


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <meta name="theme-color" content="#D4AF37" />
        <link
          rel="preload"
          href="/images/WorkOregonPics/image16.jpeg"
          as="image"
          type="image/jpeg"
        /> */}
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
      <SessionProvider session={session}>
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
            className="flex-grow w-full max-w-full overflow-x-hidden md:mt-4"
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
        </SessionProvider>
      </body>
    </html>
  );
}