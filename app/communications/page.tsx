import { Metadata } from 'next';
import CommunicationsPage from '@/components/pages/CommunicationsPage';
import JsonLd, { communicationsServiceSchema } from '@/components/SEO/JsonLd';

export const metadata: Metadata = {
  title: 'Telecommunications Services | Fiber Optics, 5G, Wireless Infrastructure',
  description: 'Professional telecommunications services in Northern California, Central Valley & Bay Area. Fiber optic installation, 5G infrastructure, wireless solutions, EV charging stations, data center services. Licensed, bonded & insured. CA Lic #1099543.',
  keywords: [
    'fiber optic installation California',
    'fiber optic splicing',
    '5G network deployment',
    '5G infrastructure contractor',
    'wireless infrastructure',
    'telecommunications contractor Northern California',
    'telecommunications contractor Bay Area',
    'EV charging station installation',
    'data center services',
    'DAS installation',
    'small cell installation',
    'network infrastructure Stockton',
    'telecommunications Modesto',
    'fiber optics Sacramento',
    'wireless solutions San Jose',
    'telecom contractor Central Valley',
    'Verizon contractor',
    'T-Mobile contractor',
    'AT&T contractor',
    'OTDR testing',
    'PIM testing',
    'RF installation',
    'C-Band solutions',
  ],
  openGraph: {
    title: 'Telecommunications Services | Goldmine Communications & Construction',
    description: 'Fiber optics, 5G infrastructure, wireless solutions, EV charging stations. Serving Northern California, Central Valley & Bay Area. Licensed & insured.',
    url: 'https://www.goldminecomm.net/communications',
    type: 'website',
    images: [
      {
        url: '/images/logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'Goldmine Communications - Telecommunications Services Northern California',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telecommunications Services | Fiber Optics, 5G, Wireless',
    description: 'Professional telecommunications services in Northern California. Fiber optics, 5G, wireless, EV charging.',
    images: ['/images/logo-banner.png'],
  },
  alternates: {
    canonical: '/communications',
  },
};

export default function Communications() {
  return (
    <>
      <JsonLd schema={communicationsServiceSchema} />
      <CommunicationsPage />
    </>
  );
}
