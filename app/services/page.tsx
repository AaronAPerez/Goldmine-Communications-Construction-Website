import { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';
import JsonLd, { companyInfo } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Professional Electrical & Communications Services | NECA Certified Contractor',
  description: 'NECA certified electrical contractor providing comprehensive services: EV charging stations, data centers, communications systems, substations, smart grid, street lighting, and more. Licensed, bonded & insured. CA License #1099543.',
  keywords: [
    // Primary Services
    'electrical contractor California',
    'telecommunications contractor',
    'EV charging station installation',
    'data center electrical contractor',
    'communications networking systems',
    // Commercial/Industrial
    'commercial electrical contractor',
    'industrial electrical services',
    'structured wiring cabling',
    'security systems CCTV installation',
    'sound video systems',
    'building renovation electrical',
    // Infrastructure
    'power generation contractor',
    'substation construction',
    'transmission distribution lines',
    'smart grid solutions',
    'energy management systems',
    // Utility/Municipal
    'street lighting contractor',
    'traffic control systems',
    'underground utilities',
    'cable splicing services',
    // Testing
    'electrical testing certification',
    'NETA certified testing',
    // Geographic
    'Northern California electrical contractor',
    'Bay Area telecommunications',
    'Central Valley electrical services',
    'Stockton contractor',
    'Sacramento electrical contractor',
    'NECA contractor California',
  ],
  openGraph: {
    title: 'Professional Electrical & Communications Services | Goldmine Construction',
    description: 'NECA certified contractor providing EV charging, data centers, communications, substations, smart grid, and more. Licensed & insured throughout CA, NV, OR.',
    url: 'https://www.goldminecomm.net/services',
    type: 'website',
    images: [
      {
        url: '/images/logo/logo-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Goldmine Construction Services - NECA Certified Electrical Contractor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Electrical & Communications Services | NECA Certified',
    description: 'EV charging, data centers, communications, substations, smart grid. Licensed, bonded & insured.',
    images: ['/images/logo/logo-banner.jpg'],
  },
  alternates: {
    canonical: '/services',
  },
};

// Unified Services Schema for JSON-LD
const unifiedServicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Electrical & Communications Services',
  provider: {
    '@type': 'LocalBusiness',
    name: companyInfo.name,
    '@id': `${companyInfo.url}/#organization`,
  },
  serviceType: ['Electrical Contractor', 'Telecommunications Contractor'],
  areaServed: [
    { '@type': 'State', name: 'California' },
    { '@type': 'State', name: 'Nevada' },
    { '@type': 'State', name: 'Oregon' },
  ],
  description: 'NECA certified electrical and communications contractor providing comprehensive services including EV charging infrastructure, data centers, telecommunications, substations, smart grid solutions, and municipal services throughout California, Nevada, and Oregon.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Electrical & Communications Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Commercial, Industrial & Institutional',
        itemListElement: [
          { '@type': 'Service', name: 'Communications & Networking Systems' },
          { '@type': 'Service', name: 'Data Centers' },
          { '@type': 'Service', name: 'Structured Wiring & Cabling' },
          { '@type': 'Service', name: 'Security Systems, CCTV & Access Control' },
          { '@type': 'Service', name: 'Sound & Video Systems' },
          { '@type': 'Service', name: 'Building Renovation' },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Electrical Infrastructure',
        itemListElement: [
          { '@type': 'Service', name: 'Electric Vehicle Charging Stations' },
          { '@type': 'Service', name: 'Power Generation' },
          { '@type': 'Service', name: 'Substations' },
          { '@type': 'Service', name: 'Transmission & Distribution' },
          { '@type': 'Service', name: 'Smart Grid Solutions' },
          { '@type': 'Service', name: 'Energy Management & Power Quality' },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Utility & Municipal Services',
        itemListElement: [
          { '@type': 'Service', name: 'Street Lighting & Traffic Control' },
          { '@type': 'Service', name: 'Underground Utilities' },
          { '@type': 'Service', name: 'Cable Splicing' },
          { '@type': 'Service', name: 'Signage' },
          { '@type': 'Service', name: 'Tree Trimming & Line Clearance' },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Testing & Certification',
        itemListElement: [
          { '@type': 'Service', name: 'Electrical Testing & Certification' },
        ],
      },
    ],
  },
};

export default function Services() {
  return (
    <>
      <JsonLd schema={unifiedServicesSchema} />
      <ServicesPage />
    </>
  );
}
