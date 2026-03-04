import { Metadata } from 'next';
import GalleryPage from '@/components/pages/GalleryPage';
import JsonLd, { companyInfo } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Project Gallery | EV Charging, Telecommunications & Infrastructure Photos',
  description: 'Browse our portfolio of completed electrical and construction projects. EV charging station installations, telecommunications towers, underground utilities, and site development across California, Nevada, and Oregon.',
  keywords: [
    'electrical contractor portfolio',
    'EV charging station photos',
    'telecommunications tower installation',
    'underground utility trenching',
    'site development gallery',
    'construction project photos',
    'electrical infrastructure images',
    'California contractor portfolio',
    'NECA contractor projects',
    'commercial electrical work',
    'cell tower installation photos',
    'utility trenching images',
    'Stockton contractor portfolio',
    'Bay Area electrical projects',
    'Northern California construction'
  ],
  openGraph: {
    title: 'Project Gallery | Goldmine Construction Services',
    description: 'View our completed projects: EV charging infrastructure, telecommunications towers, underground utilities, and site development.',
    url: 'https://www.goldminecomm.net/gallery',
    type: 'website',
    images: [
      {
        url: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp',
        width: 1200,
        height: 630,
        alt: 'Goldmine Construction Services Project Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Gallery | EV Charging & Infrastructure Photos',
    description: 'Browse our portfolio of EV charging stations, telecommunications, and construction projects.',
    images: ['/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp'],
  },
  alternates: {
    canonical: '/gallery',
  },
};

// Gallery Schema for JSON-LD
const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Goldmine Construction Services Project Gallery',
  description: 'Portfolio of completed electrical and construction projects including EV charging infrastructure, telecommunications towers, underground utilities, and site development.',
  provider: {
    '@type': 'LocalBusiness',
    name: companyInfo.name,
    '@id': `${companyInfo.url}/#organization`,
  },
  about: [
    { '@type': 'Thing', name: 'EV Charging Infrastructure' },
    { '@type': 'Thing', name: 'Telecommunications & Tower Installation' },
    { '@type': 'Thing', name: 'Underground Utilities & Trenching' },
    { '@type': 'Thing', name: 'Site Development & Grading' },
  ],
  contentLocation: [
    { '@type': 'Place', name: 'Antioch, California' },
    { '@type': 'Place', name: 'Chemult, Oregon' },
    { '@type': 'Place', name: 'Ripon, California' },
    { '@type': 'Place', name: 'Bodega Bay, California' },
    { '@type': 'Place', name: 'Sparks, Nevada' },
  ],
};

export default function Gallery() {
  return (
    <>
      <JsonLd schema={gallerySchema} />
      <GalleryPage />
    </>
  );
}
