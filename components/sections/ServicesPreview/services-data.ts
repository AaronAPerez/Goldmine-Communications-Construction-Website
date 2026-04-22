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
    id: 'wireless',
    title: 'Wireless',
    description: 'Installation and maintenance for Verizon, T-Mobile, AT&T, and Dish Networks — RF, 5G, small cells, backhaul, RAN, and civil construction.',
    icon: Building2,
    image: null,
    color: 'from-blue-600 to-blue-800',
    services: [
      'Carrier Installation & Maintenance (Verizon, T-Mobile, AT&T, Dish)',
      'RF Installation, Testing & 5G Equipment',
      'Macro Lines & Small Cell Towers',
      'Internet Backhaul & Wireless Backhaul',
      'C-Band & Broadband Solutions',
      'RAN Solutions',
      'Fiber & Backhaul Services',
      'PIM, Sweep & OTDR Testing',
      'ISP Installation & New Builds',
      'Civil Construction Services',
      'Decommission & Demolition',
      'Consulting Services'
    ]
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    description: 'Data centers, fiber optic splicing, DAS wireless, cabling infrastructure, and outside plant public safety 5G.',
    icon: Home,
    image: null,
    color: 'from-indigo-600 to-indigo-800',
    services: [
      'Data Centers / CO Rack & Stack',
      'Power Whips & Distribution',
      'Cabling Infrastructure & Network Services',
      'DAS Wireless',
      'Fiber Optic Splicing & Terminating',
      'Outside Plant Public Safety 5G',
      'In-Building Head-end Integration'
    ]
  },
  {
    id: 'charging-iot-av',
    title: 'Charging / IoT / 5G / Audio-Visual',
    description: 'EV charging stations, IoT devices, intrusion detection, video surveillance, CBRS LTE, and full audio/visual system integration.',
    icon: Landmark,
    image: null,
    color: 'from-amber-600 to-amber-800',
    services: [
      'EV Charging Stations / Clean Energy',
      'Intrusion Detection & Video Surveillance',
      'IOT Device Installation & Optimization',
      'Public Safety Private 60 MHZ, CBRS LTE',
      'Programming & Commissioning',
      'Control System & Audio DSP Programming',
      'Smart Building Control & Monitoring',
      'Corporate Boardrooms & Command Centers',
      'Classroom Media Systems',
      'Intercom Systems (Production & Wireless)',
      'Churches & Convention Centers'
    ]
  }
];

/**
 * Featured services with images for visual showcase
 * Highlights key capabilities with professional imagery
 */
export const featuredServices: FeaturedService[] = [
  {
    id: 'wireless',
    title: 'Wireless & 5G',
    description: 'Installation and maintenance for Verizon, T-Mobile, AT&T, and Dish Networks — small cells, RAN, backhaul, and 5G equipment.',
    image: '/images/projects/Sparks-NV/tower-tree-install.jpg'
  },
  {
    id: 'ev-charging',
    title: 'EV Charging / Clean Energy',
    description: 'Commercial and fleet electric vehicle charging station installation, programming, and commissioning.',
    image: '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-2.jpg'
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    description: 'Data centers, fiber optic splicing, DAS wireless, cabling infrastructure, and public safety 5G systems.',
    image: '/images/optimized/webp/communications.webp'
  },
  {
    id: 'civil-construction',
    title: 'Civil Construction',
    description: 'Site preparation, trenching, conduit installation, and heavy equipment operations for telecom and utility infrastructure.',
    image: '/images/projects/Bodega-Bay-CA/construction-dozer.jpg'
  }
];
