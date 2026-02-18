import HomePage from '@/components/landing/HomePage';
import { Metadata } from 'next';
import JsonLd, { localBusinessSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Telecommunications & Construction Contractor | Stockton, Central Valley, Bay Area',
  description: 'Goldmine Communications & Construction - Licensed, bonded & insured telecommunications and construction company serving Northern California, Central Valley, and Bay Area. Fiber optics, 5G infrastructure, EV charging stations, commercial construction. CA License #1099543. Call (925) 305-5980.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <JsonLd schema={localBusinessSchema} />
      <HomePage />
    </>
  );
}
