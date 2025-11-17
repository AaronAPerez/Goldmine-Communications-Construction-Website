
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { auth } from '@/lib/auth';
import SessionProvider from '@/components/providers/SessionProvider';
import LayoutProvider from '@/components/providers/LayoutProvider';




const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://goldminecomm.net'),
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
  maximumScale: 5,
  userScalable: true,
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
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
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </SessionProvider>

        {/* Analytics for all routes */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}