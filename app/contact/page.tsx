import { Metadata } from 'next';
import ContactPage from '@/components/Contact/ContactPage';
import JsonLd, { localBusinessSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us | Get a Quote',
  description: 'Contact Goldmine Communications & Construction for telecommunications and construction services in Northern California, Central Valley & Bay Area. Call (925) 305-5980 or (510) 695-3177. Located at 1161 Brick and Tile Circle, Stockton, CA 95206. Licensed, bonded & insured.',
  keywords: [
    'contact telecommunications contractor',
    'get quote construction',
    'estimate contractor',
    'contact Stockton contractor',
    'Northern California contractor contact',
    'Bay Area telecommunications contact',
    'Central Valley construction quote',
    'fiber optic installation quote',
    '5G contractor contact',
    'EV charging installation quote',
  ],
  openGraph: {
    title: 'Contact Goldmine Communications & Construction',
    description: 'Get a quote for telecommunications and construction services. Serving Northern California, Central Valley & Bay Area. Call (925) 305-5980.',
    url: 'https://www.goldminecomm.net/contact',
    type: 'website',
    images: [
      {
        url: '/images/logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'Contact Goldmine Communications & Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Goldmine Communications & Construction',
    description: 'Get a quote for telecommunications and construction services. Call (925) 305-5980.',
    images: ['/images/logo-banner.png'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function Contact() {
  return (
    <>
      <JsonLd schema={localBusinessSchema} />
      <ContactPage />
    </>
  );
}
