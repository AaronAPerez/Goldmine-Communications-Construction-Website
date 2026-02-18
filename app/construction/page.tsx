import { Metadata } from 'next';
import ConstructionPage from '@/components/pages/ConstructionPage';
import JsonLd, { constructionServiceSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Commercial Construction Services | Site Development & Infrastructure',
  description: 'Licensed, bonded & insured commercial construction services in Northern California, Central Valley & Bay Area. Site development, infrastructure projects, healthcare facilities, utility construction. CA License #1099543.',
  keywords: [
    'commercial construction Northern California',
    'commercial construction Bay Area',
    'site development contractor',
    'infrastructure construction',
    'healthcare facility construction',
    'utility construction California',
    'construction contractor Stockton',
    'construction contractor Central Valley',
    'general contractor Sacramento',
    'construction services Modesto',
    'commercial contractor San Jose',
    'civil construction',
    'grading contractor',
    'excavation services',
    'bonded contractor California',
    'licensed contractor CA',
    'construction company Northern California',
    'infrastructure projects',
    'site preparation',
    'commercial electrical contractor',
  ],
  openGraph: {
    title: 'Commercial Construction Services | Goldmine Communications & Construction',
    description: 'Site development, infrastructure projects, healthcare facilities, utility construction. Serving Northern California, Central Valley & Bay Area. Licensed & insured.',
    url: 'https://www.goldminecomm.net/construction',
    type: 'website',
    images: [
      {
        url: '/images/logo-banner.png',
        width: 1200,
        height: 630,
        alt: 'Goldmine Construction Services - Commercial Contractor Northern California',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Construction Services | Site Development & Infrastructure',
    description: 'Licensed commercial construction services in Northern California. Site development, infrastructure, healthcare facilities.',
    images: ['/images/logo-banner.png'],
  },
  alternates: {
    canonical: '/construction',
  },
};

export default function Construction() {
  return (
    <>
      <JsonLd schema={constructionServiceSchema} />
      <ConstructionPage />
    </>
  );
}
