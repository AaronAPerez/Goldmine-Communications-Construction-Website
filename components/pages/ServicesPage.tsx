'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Zap,
  Radio,
  Server,
  Cable,
  Camera,
  Speaker,
  Wrench,
  Car,
  Factory,
  Lightbulb,
  Network,
  Activity,
  TrafficCone,
  TreePine,
  FileCheck,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

/**
 * Service Category Interface
 */
interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  services: ServiceItem[];
}

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  capabilities: string[];
}

/**
 * Service Categories Data - NECA Certified Services
 */
const serviceCategories: ServiceCategory[] = [
  {
    id: 'commercial-industrial',
    title: 'Commercial, Industrial & Institutional',
    description: 'Comprehensive electrical and communication solutions for commercial buildings, industrial facilities, and institutional projects.',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    services: [
      {
        title: 'Communications & Networking Systems',
        description: 'Enterprise-grade communication infrastructure including fiber optics, 5G networks, and wireless solutions.',
        icon: <Network className="w-6 h-6" />,
        capabilities: [
          'Fiber optic installation and splicing',
          '5G and wireless network deployment',
          'DAS (Distributed Antenna Systems)',
          'VoIP and unified communications',
          'Network design and implementation'
        ]
      },
      {
        title: 'Data Centers',
        description: 'Mission-critical data center infrastructure with redundant power and cooling systems.',
        icon: <Server className="w-6 h-6" />,
        capabilities: [
          'Server room electrical systems',
          'UPS and backup power systems',
          'Cable management and routing',
          'Environmental monitoring',
          'Hot/cold aisle containment'
        ]
      },
      {
        title: 'Structured Wiring & Cabling',
        description: 'Professional cabling infrastructure for voice, data, and video systems.',
        icon: <Cable className="w-6 h-6" />,
        capabilities: [
          'Cat5e/Cat6/Cat6A installation',
          'Fiber optic backbone systems',
          'Cable certification and testing',
          'Pathway and raceway systems',
          'Telecommunications rooms'
        ]
      },
      {
        title: 'Security Systems, CCTV & Access Control',
        description: 'Integrated security solutions to protect your facilities and assets.',
        icon: <Camera className="w-6 h-6" />,
        capabilities: [
          'IP and analog camera systems',
          'Access control and card readers',
          'Intrusion detection systems',
          'Video management software',
          'Remote monitoring solutions'
        ]
      },
      {
        title: 'Sound & Video Systems',
        description: 'Professional audio-visual systems for conference rooms, auditoriums, and public spaces.',
        icon: <Speaker className="w-6 h-6" />,
        capabilities: [
          'Conference room AV systems',
          'Public address systems',
          'Digital signage',
          'Projection and display systems',
          'Control system integration'
        ]
      },
      {
        title: 'Building Renovation',
        description: 'Electrical upgrades and modernization for existing commercial structures.',
        icon: <Wrench className="w-6 h-6" />,
        capabilities: [
          'Electrical system upgrades',
          'Panel replacements',
          'Lighting retrofits',
          'Code compliance updates',
          'Energy efficiency improvements'
        ]
      }
    ]
  },
  {
    id: 'electrical-infrastructure',
    title: 'Electrical Infrastructure',
    description: 'Power generation, distribution, and sustainable energy solutions for modern infrastructure needs.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-amber-500 to-orange-500',
    services: [
      {
        title: 'Electric Vehicle Charging Stations',
        description: 'Complete EV charging infrastructure from site preparation to commissioning.',
        icon: <Car className="w-6 h-6" />,
        capabilities: [
          'Level 2 and DC fast charging',
          'Site assessment and planning',
          'Trenching and conduit installation',
          'Electrical panel upgrades',
          'Network connectivity setup'
        ]
      },
      {
        title: 'Power Generation',
        description: 'Reliable power generation systems for backup and primary power needs.',
        icon: <Factory className="w-6 h-6" />,
        capabilities: [
          'Generator installation',
          'Automatic transfer switches',
          'Load bank testing',
          'Preventive maintenance',
          'Emergency power systems'
        ]
      },
      {
        title: 'Substations',
        description: 'Substation construction, maintenance, and upgrades for utility infrastructure.',
        icon: <Zap className="w-6 h-6" />,
        capabilities: [
          'Substation construction',
          'Transformer installation',
          'Switchgear installation',
          'Protective relay systems',
          'Grounding systems'
        ]
      },
      {
        title: 'Transmission & Distribution',
        description: 'High-voltage transmission and distribution line installation and maintenance.',
        icon: <Radio className="w-6 h-6" />,
        capabilities: [
          'Overhead line construction',
          'Underground cable installation',
          'Pole and tower erection',
          'Line maintenance and repair',
          'Storm restoration services'
        ]
      },
      {
        title: 'Smart Grid Solutions',
        description: 'Advanced grid technologies for improved efficiency and reliability.',
        icon: <Activity className="w-6 h-6" />,
        capabilities: [
          'Smart meter installation',
          'Grid automation systems',
          'SCADA integration',
          'Demand response systems',
          'Grid monitoring solutions'
        ]
      },
      {
        title: 'Energy Management & Power Quality',
        description: 'Monitoring and optimization of electrical systems for peak performance.',
        icon: <Lightbulb className="w-6 h-6" />,
        capabilities: [
          'Power quality analysis',
          'Energy audits',
          'Power factor correction',
          'Harmonic filtering',
          'Load management systems'
        ]
      }
    ]
  },
  {
    id: 'utility-municipal',
    title: 'Utility & Municipal Services',
    description: 'Infrastructure solutions for municipalities, utilities, and public works projects.',
    icon: <TrafficCone className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-600',
    services: [
      {
        title: 'Street Lighting & Traffic Control',
        description: 'Public lighting and traffic management system installation and maintenance.',
        icon: <Lightbulb className="w-6 h-6" />,
        capabilities: [
          'LED street light conversion',
          'Traffic signal installation',
          'Intelligent traffic systems',
          'Pedestrian crossing systems',
          'Parking lot lighting'
        ]
      },
      {
        title: 'Underground Utilities',
        description: 'Underground utility installation with minimal surface disruption.',
        icon: <Cable className="w-6 h-6" />,
        capabilities: [
          'Directional boring',
          'Trenching and excavation',
          'Conduit installation',
          'Duct bank construction',
          'Utility locating services'
        ]
      },
      {
        title: 'Cable Splicing',
        description: 'Expert cable splicing for power and communication systems.',
        icon: <Cable className="w-6 h-6" />,
        capabilities: [
          'Medium voltage splicing',
          'Fiber optic splicing',
          'Cable terminations',
          'Splice testing and certification',
          'Emergency splice repairs'
        ]
      },
      {
        title: 'Signage',
        description: 'Electrical signage installation for commercial and municipal applications.',
        icon: <Building2 className="w-6 h-6" />,
        capabilities: [
          'Illuminated sign installation',
          'LED display systems',
          'Wayfinding signage',
          'Monument signs',
          'Sign maintenance and repair'
        ]
      },
      {
        title: 'Tree Trimming & Line Clearance',
        description: 'Vegetation management for utility right-of-way maintenance.',
        icon: <TreePine className="w-6 h-6" />,
        capabilities: [
          'Utility line clearance',
          'Right-of-way maintenance',
          'Storm damage cleanup',
          'Hazard tree removal',
          'Vegetation management plans'
        ]
      }
    ]
  },
  {
    id: 'testing-certification',
    title: 'Testing & Certification',
    description: 'Comprehensive electrical testing and certification services to ensure safety and compliance.',
    icon: <FileCheck className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    services: [
      {
        title: 'Electrical Testing & Certification',
        description: 'Complete testing services to verify system integrity and compliance.',
        icon: <FileCheck className="w-6 h-6" />,
        capabilities: [
          'Acceptance testing',
          'Protective relay testing',
          'Cable testing and fault location',
          'Thermographic surveys',
          'Ground resistance testing',
          'Power quality analysis',
          'Arc flash studies',
          'NETA certification testing'
        ]
      }
    ]
  }
];

/**
 * Service Card Component
 */
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold-400"
        aria-expanded={isExpanded ? 'true' : 'false'}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gold-100 rounded-xl text-gold-600 flex-shrink-0">
              {service.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 ml-4"
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Capabilities:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Category Section Component
 */
interface CategorySectionProps {
  category: ServiceCategory;
  index: number;
}

const CategorySection = ({ category, index }: CategorySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id={category.id}
      className="scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white mb-4`}>
          {category.icon}
          <h2 className="text-xl font-bold">{category.title}</h2>
        </div>
        <p className="text-gray-600 max-w-3xl">{category.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.services.map((service, idx) => (
          <ServiceCard key={service.title} service={service} index={idx} />
        ))}
      </div>
    </section>
  );
};

/**
 * Main Services Page Component
 */
const ServicesPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
      >
        {/* Background Image */}
        <Image
          src="/images/projects/Oregon-AV-Station/AV-station/Oregon-AvStations-hero.jpg"
          alt="Professional electrical and communications services"
          fill
          className="absolute inset-0 object-cover opacity-40 z-0"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 z-[1]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[2]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 rounded-full text-sm font-semibold mb-6 border border-gold-500/30">
              NECA Certified Contractor
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Electrical & Communications
              </span>
              <br />Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Comprehensive solutions for commercial, industrial, and municipal projects.
              Licensed, bonded, and insured throughout California, Nevada, and Oregon.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600
                         text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Get an Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center px-8 py-4 border-2 border-white
                         text-white hover:bg-white hover:text-gray-900 font-medium
                         rounded-xl transition-colors"
              >
                View Our Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center gap-2" aria-label="Service categories">
            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gold-600
                         hover:bg-gold-50 rounded-lg transition-colors"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {serviceCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Licensed, Bonded & Insured
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your confidence and project protection are our highest priorities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <Shield className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">CA License #1099543</h3>
              <p className="text-gray-300">Fully licensed contractor in California with proven compliance record</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">NECA Member</h3>
              <p className="text-gray-300">National Electrical Contractors Association certified member</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <Building2 className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">We Beat Estimates</h3>
              <p className="text-gray-300">Forward your estimate - we&apos;ll provide a competitive alternative</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Proudly serving Northern California, Central Valley, Bay Area, Nevada, and Oregon.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Stockton', 'Sacramento', 'San Jose', 'Oakland', 'Modesto', 'Fresno', 'Reno', 'Sparks', 'Portland', 'Bay Area'].map((city) => (
              <span
                key={city}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-black/90 max-w-3xl mx-auto mb-8">
              From EV charging infrastructure to telecommunications systems,
              our proven expertise delivers exceptional results on time and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-gold-600
                         hover:bg-gray-50 font-medium rounded-xl transition-colors shadow-lg"
              >
                Get an Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center px-8 py-4 border-2 border-white
                         text-white hover:bg-white hover:text-gold-600 font-medium
                         rounded-xl transition-colors"
              >
                View Our Gallery
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-black/90">
              <a href="tel:+19253055980" className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="w-5 h-5" />
                (925) 305-5980
              </a>
              <a href="mailto:a.lopez@goldminecomm.net" className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="w-5 h-5" />
                a.lopez@goldminecomm.net
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Stockton, CA
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
