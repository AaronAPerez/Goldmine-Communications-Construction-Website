/**
 * JSON-LD Structured Data Component
 * Provides schema.org markup for better search engine visibility
 */

// Company information - single source of truth
export const companyInfo = {
  name: 'Goldmine Construction Services',
  legalName: 'Goldmine Construction Services Inc.',
  url: 'https://www.goldminecomm.net',
  logo: 'https://www.goldminecomm.net/images/logo/logo-circular.jpg',
  image: 'https://www.goldminecomm.net/images/logo/logo-banner.jpg',
  description: 'Licensed, bonded and insured telecommunications contractor and construction company serving Northern California, the Central Valley, and the Bay Area. Specializing in fiber optics, 5G infrastructure, EV charging stations, and commercial construction.',
  phonePrimary: '(925) 305-5980',
  phoneSecondary: '(510) 695-3177',
  email: 'contact@goldminecomm.net',
  license: '1099543',
  address: {
    street: '1161 Brick and Tile Circle',
    city: 'Stockton',
    state: 'CA',
    zip: '95206',
    country: 'US',
  },
  serviceAreas: [
    // Central Valley
    'Stockton, CA',
    'Modesto, CA',
    'Fresno, CA',
    'Tracy, CA',
    'Manteca, CA',
    'Lodi, CA',
    'Turlock, CA',
    'Merced, CA',
    'Visalia, CA',
    'Bakersfield, CA',
    // Sacramento Area
    'Sacramento, CA',
    'Elk Grove, CA',
    'Roseville, CA',
    'Folsom, CA',
    'Davis, CA',
    // Bay Area - East Bay
    'Oakland, CA',
    'Hayward, CA',
    'Fremont, CA',
    'Berkeley, CA',
    'Richmond, CA',
    'Concord, CA',
    'Antioch, CA',
    'Livermore, CA',
    'Pleasanton, CA',
    'Dublin, CA',
    'San Leandro, CA',
    'Walnut Creek, CA',
    'Alameda, CA',
    'Union City, CA',
    'Newark, CA',
    // Bay Area - South Bay
    'San Jose, CA',
    'Palo Alto, CA',
    'Mountain View, CA',
    'Sunnyvale, CA',
    'Santa Clara, CA',
    'Cupertino, CA',
    'Milpitas, CA',
    'Campbell, CA',
    'Los Gatos, CA',
    'Saratoga, CA',
    'Redwood City, CA',
    'San Mateo, CA',
    // Bay Area - San Francisco & North Bay
    'San Francisco, CA',
    'Daly City, CA',
    'South San Francisco, CA',
    'San Rafael, CA',
    'Vallejo, CA',
    'Napa, CA',
    'Santa Rosa, CA',
    // Regions
    'Central Valley, CA',
    'Northern California',
    'Bay Area, CA',
  ],
  foundingYear: 2009,
  priceRange: '$$',
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyInfo.name,
  legalName: companyInfo.legalName,
  url: companyInfo.url,
  logo: companyInfo.logo,
  image: companyInfo.image,
  description: companyInfo.description,
  telephone: companyInfo.phonePrimary,
  email: companyInfo.email,
  foundingDate: `${companyInfo.foundingYear}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.state,
    postalCode: companyInfo.address.zip,
    addressCountry: companyInfo.address.country,
  },
  areaServed: companyInfo.serviceAreas.map((area) => ({
    '@type': 'City',
    name: area,
  })),
  sameAs: [
    'https://www.necanet.org/member-search/detail?nid=001PU000014ThuqYAC',
  ],
};

// LocalBusiness Schema (more specific for local SEO)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectricalContractor', 'TelecommunicationsService'],
  '@id': `${companyInfo.url}/#organization`,
  name: companyInfo.name,
  url: companyInfo.url,
  logo: companyInfo.logo,
  image: companyInfo.image,
  description: companyInfo.description,
  telephone: companyInfo.phonePrimary,
  email: companyInfo.email,
  priceRange: companyInfo.priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.state,
    postalCode: companyInfo.address.zip,
    addressCountry: companyInfo.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.9352,
    longitude: -121.2767,
  },
  areaServed: [
    {
      '@type': 'State',
      name: 'California',
      containsPlace: companyInfo.serviceAreas.map((area) => ({
        '@type': 'City',
        name: area.replace(', CA', ''),
      })),
    },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `California Contractor License #${companyInfo.license}`,
    },
  ],
  knowsAbout: [
    'Telecommunications Infrastructure',
    'Fiber Optic Installation',
    '5G Network Deployment',
    'EV Charging Station Installation',
    'Commercial Construction',
    'Network Infrastructure',
    'Wireless Solutions',
    'Data Center Services',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Telecommunications Services',
        description: 'Fiber optics, 5G infrastructure, wireless solutions, and network services',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Construction Services',
        description: 'Commercial construction, site development, and infrastructure projects',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'EV Charging Infrastructure',
        description: 'Electric vehicle charging station installation and maintenance',
      },
    },
  ],
  slogan: 'Licensed, Bonded & Insured - Serving Northern California Since 2009',
  foundingDate: `${companyInfo.foundingYear}`,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: companyInfo.phonePrimary,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
    {
      '@type': 'ContactPoint',
      telephone: companyInfo.phoneSecondary,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  ],
};

// Service Schema for Communications
export const communicationsServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Telecommunications & Communications Services',
  provider: {
    '@type': 'LocalBusiness',
    name: companyInfo.name,
    '@id': `${companyInfo.url}/#organization`,
  },
  serviceType: 'Telecommunications Contractor',
  areaServed: {
    '@type': 'State',
    name: 'California',
  },
  description: 'Professional telecommunications services including fiber optic installation, 5G network deployment, wireless infrastructure, EV charging stations, and network services for Northern California, the Central Valley, and the Bay Area.',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'USD',
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Communications Services',
    itemListElement: [
      { '@type': 'Service', name: 'Fiber Optic Installation & Splicing' },
      { '@type': 'Service', name: '5G Network Infrastructure' },
      { '@type': 'Service', name: 'Wireless Solutions (Verizon, T-Mobile, AT&T)' },
      { '@type': 'Service', name: 'EV Charging Station Installation' },
      { '@type': 'Service', name: 'Data Center Services' },
      { '@type': 'Service', name: 'DAS & Small Cell Installation' },
      { '@type': 'Service', name: 'Network Infrastructure' },
    ],
  },
};

// Service Schema for Construction
export const constructionServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Construction Services',
  provider: {
    '@type': 'LocalBusiness',
    name: companyInfo.name,
    '@id': `${companyInfo.url}/#organization`,
  },
  serviceType: 'General Contractor',
  areaServed: {
    '@type': 'State',
    name: 'California',
  },
  description: 'Licensed, bonded and insured commercial construction services including site development, infrastructure projects, healthcare facilities, and utility construction throughout Northern California, the Central Valley, and the Bay Area.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction Services',
    itemListElement: [
      { '@type': 'Service', name: 'Site Development & Preparation' },
      { '@type': 'Service', name: 'Commercial Construction' },
      { '@type': 'Service', name: 'Healthcare Facility Construction' },
      { '@type': 'Service', name: 'Infrastructure Projects' },
      { '@type': 'Service', name: 'Utility Construction' },
    ],
  },
};

// Unified Services Schema (NECA Certified)
export const unifiedServicesSchema = {
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
  description: 'NECA certified electrical and communications contractor providing comprehensive services including EV charging infrastructure, data centers, telecommunications, substations, smart grid solutions, and municipal services.',
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

// Component to render JSON-LD scripts
interface JsonLdProps {
  schema: object | object[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
