// components/sections/ServicesPreview/services-data.ts
// Service categories and featured services data
// Centralized data management for easy updates

import { Building2, Home, Landmark } from 'lucide-react';
import { ServiceCategory, FeaturedService } from './types';

/**
 * Service categories organized by type
 * Each category contains a list of services offered
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'commercial-industrial',
    title: 'Commercial / Industrial / Institutional',
    description: 'Full-service electrical and communications solutions for commercial buildings, industrial facilities, and institutional projects.',
    icon: Building2,
    image: '/images/projects/Oregon-AV-Station/AV-station/AvStation-card.jpg',
    color: 'from-blue-600 to-blue-800',
    services: [
      'Building Renovation',
      'Cable Splicing',
      'Communications & Networking Systems',
      'Data Centers',
      'Electrical Testing',
      'EV Charging Stations',
      'Energy Management & Power Quality Monitoring',
      'Power Generation',
      'Security Systems, CCTV & Access Control',
      'Signage',
      'Smart Grid',
      'Sound & Video Systems',
      'Street Lighting & Traffic Control',
      'Structured Wiring & Cabling',
      'Substations',
      'Transmission & Distribution',
      'Tree Trimming / Line Clearance',
      'Underground Utilities'
    ]
  },
  {
    id: 'residential',
    title: 'Residential',
    description: 'Professional electrical services for residential properties, from new construction to renovations and upgrades.',
    icon: Home,
    image: '/images/projects/PouringConcrete.jpg',
    color: 'from-green-600 to-green-800',
    services: [
      'Building Renovation',
      'Electrical Testing',
      'Power Generation',
      'Security Systems, CCTV & Access Control',
      'Smart Grid Integration',
      'Sound & Video Systems',
      'Street Lighting & Traffic Control',
      'Substations',
      'Transmission & Distribution',
      'Tree Trimming / Line Clearance',
      'Underground Utilities'
    ]
  },
  {
    id: 'utility-municipal',
    title: 'Non-Building (Utility, Municipal, etc.)',
    description: 'Specialized infrastructure services for utilities, municipalities, and public works projects across California, Nevada, and Oregon.',
    icon: Landmark,
    image: '/images/projects/Bodega-Bay-CA/bulldozer-trench.jpg',
    color: 'from-amber-600 to-amber-800',
    services: [
      'Building Renovation',
      'Cable Splicing',
      'Electrical Testing',
      'Power Generation',
      'Security Systems, CCTV & Access Control',
      'Signage',
      'Smart Grid',
      'Sound & Video Systems',
      'Street Lighting & Traffic Control',
      'Substations',
      'Transmission & Distribution',
      'Tree Trimming / Line Clearance',
      'Underground Utilities'
    ]
  }
];

/**
 * Featured services with images for visual showcase
 * Highlights key capabilities with professional imagery
 */
export const featuredServices: FeaturedService[] = [
  {
    id: 'ev-charging',
    title: 'EV Charging Stations',
    description: 'Commercial and fleet electric vehicle charging infrastructure installation and maintenance.',
    image: '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-2.jpg'
  },
  {
    id: 'underground',
    title: 'Underground Utilities',
    description: 'Trenching, grading, conduit installation, and underground cable infrastructure.',
    image: '/images/projects/Oregon-AV-Station/trench/trench-card.jpg'
  },
  {
    id: 'telecommunications',
    title: 'Communications & Networking',
    description: 'Fiber optics, 5G infrastructure, data centers, and structured cabling systems.',
    image: '/images/projects/Sparks-NV/tower-tree-install.jpg'
  },
  {
    id: 'construction',
    title: 'Civil Construction',
    description: 'Site preparation, concrete work, and heavy equipment operations for infrastructure projects.',
    image: '/images/projects/Bodega-Bay-CA/construction-dozer.jpg'
  }
];
