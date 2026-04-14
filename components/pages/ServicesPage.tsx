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
  Car,
  Network,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Ruler
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
 * Service Categories Data — sourced directly from Goldmine brochure
 * Six service lines: Wireless, Network Infrastructure, Charging/IoT/5G,
 * Audio/Visual, Training & Certification, and Design & Drafting (A&E)
 */
const serviceCategories: ServiceCategory[] = [
  {
    id: 'wireless',
    title: 'Wireless',
    description: 'Site acquisition, project, and construction management services for major wireless carriers. Our team delivers a wide range of customizable options, guaranteed to meet and exceed expectations.',
    icon: <Radio className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    services: [
      {
        title: 'Carrier Installation & Maintenance',
        description: 'Full installation and ongoing maintenance for major wireless carriers including Verizon, T-Mobile, AT&T, and Dish Networks.',
        icon: <Radio className="w-6 h-6" />,
        capabilities: [
          'Installation and Maintenance for Verizon, T-Mobile, and AT&T',
          'Dish Networks equipment installation',
          'RF installation, testing and 5G equipment installation',
          'Installation and Repair of Macro Lines & Tower Equipment',
          'Small Cell Tower installation',
          'Install Coax, Hybrid Cabling & RF Equipment',
          'Troubleshooting and Operational Testing',
          'PIM, Sweep and OTDR testing',
          'Cabinet engineering and connections',
          'Decommission and demolition'
        ]
      },
      {
        title: 'Network & Backhaul Solutions',
        description: 'Comprehensive backhaul and RAN solutions for reliable wireless network connectivity.',
        icon: <Network className="w-6 h-6" />,
        capabilities: [
          'Internet Backhaul and Wireless Backhaul',
          'Broadband and C-Band solutions',
          'RAN Solutions',
          'Fiber and backhaul services',
          'ISP Installation and new builds groundwork',
          'Low Voltage Systems, Generator and Alternative',
          'Electrical, Hydrogen, power plants and batteries',
          'Mobile Fleet / Transportation',
          'Consulting Services'
        ]
      },
      {
        title: 'Civil Construction Services',
        description: 'Civil construction and project management for wireless infrastructure, from site preparation to final commissioning.',
        icon: <Building2 className="w-6 h-6" />,
        capabilities: [
          'Civil Construction services',
          'Construction Management',
          'Site Act and Project Management',
          'Decommission and demolition'
        ]
      }
    ]
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    description: 'Data center solutions, cabling infrastructure, fiber optics, DAS wireless, and advanced network systems for enterprise and public safety applications.',
    icon: <Server className="w-8 h-8" />,
    color: 'from-indigo-500 to-indigo-600',
    services: [
      {
        title: 'Data Centers & CO',
        description: 'Mission-critical data center infrastructure including rack and stack, power whips, and in-building head-end integration.',
        icon: <Server className="w-6 h-6" />,
        capabilities: [
          'Data Centers / CO rack and stack',
          'Power whips and distribution',
          'In-building Head-end Integration',
          'Cable management and routing',
          'Environmental monitoring'
        ]
      },
      {
        title: 'Fiber Optic & Network Services',
        description: 'Professional fiber optic splicing, terminating, and cabling infrastructure for enterprise and public safety networks.',
        icon: <Cable className="w-6 h-6" />,
        capabilities: [
          'Fiber Optic Splicing and Terminating',
          'Cabling Infrastructure and Network Services',
          'DAS Wireless',
          'Outside Plant Public Safety 5G',
          'Broadband fiber connections'
        ]
      }
    ]
  },
  {
    id: 'charging-iot-5g',
    title: 'Charging / IoT / 5G',
    description: 'EV charging infrastructure, IoT device deployment, video surveillance, and public safety communications for the connected future.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-amber-500 to-orange-500',
    services: [
      {
        title: 'EV Charging Stations & Clean Energy',
        description: 'Complete electric vehicle charging station installation and clean energy infrastructure for commercial and fleet applications.',
        icon: <Car className="w-6 h-6" />,
        capabilities: [
          'EV Charging stations / Clean Energy',
          'Level 2 and DC fast charging',
          'Site assessment and planning',
          'Electrical panel upgrades',
          'Network connectivity setup'
        ]
      },
      {
        title: 'Security, Surveillance & IoT',
        description: 'Intrusion detection, video surveillance, IoT device deployment, and public safety communications.',
        icon: <Camera className="w-6 h-6" />,
        capabilities: [
          'Intrusion Detection and Video Surveillance',
          'Camera Installation and optimization',
          'IOT device installation and optimization',
          'Programming and Commissioning',
          'Public Safety Private 60 MHZ, CBRS LTE'
        ]
      }
    ]
  },
  {
    id: 'audio-visual',
    title: 'Audio / Visual',
    description: 'Professional AV systems for corporate boardrooms, command centers, classroom media, churches, and whole smart building control and monitoring.',
    icon: <Speaker className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    services: [
      {
        title: 'AV Systems & Smart Building Integration',
        description: 'Full-service audio/visual system design, installation, and programming for corporate, educational, and mission-critical environments.',
        icon: <Speaker className="w-6 h-6" />,
        capabilities: [
          'Control System Programming',
          'Audio DSP Programming',
          'Audio Systems Evaluation, Balancing, and Calibration',
          'Broadband Fiber Connections',
          'Cabling Services – Audio, Broadcast, Control, Data, Voice, Video',
          'Classroom Media Systems',
          'Command Centers and Mission Critical',
          'Control Systems for Audio, Video, Lighting',
          'Corporate Boardrooms',
          'Intercom Systems (Production and Wireless)',
          'Whole SMART Building Control and Monitoring',
          'Churches and convention centers'
        ]
      }
    ]
  },
  {
    id: 'training-certification',
    title: 'Training & Certification',
    description: 'Training classes and certification programs for field technicians and those seeking technical growth in integration, 5G, and structured cabling standards.',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-600',
    services: [
      {
        title: 'Technical Training Programs',
        description: 'Hands-on training and certification for field technicians covering integration, 5G technologies, and telecom standards.',
        icon: <GraduationCap className="w-6 h-6" />,
        capabilities: [
          'Integration / Installation training',
          '5G technologies certification',
          'Structured Cabling and Telecom Standards',
          'Field technician development programs',
          'Technical growth certification'
        ]
      }
    ]
  },
  {
    id: 'design-drafting',
    title: 'Design & Drafting (A&E)',
    description: 'Architecture, mechanical, electrical, and structural experience in the telecom industry — from conceptual design through permitting, surveys, and as-built documentation.',
    icon: <Ruler className="w-8 h-8" />,
    color: 'from-rose-500 to-pink-600',
    services: [
      {
        title: 'Architecture & Engineering Services',
        description: 'Surveys, as-builts, zoning drawings, and construction drawings. Our clients are our number one priority — we go the extra mile for even the most complex projects.',
        icon: <Ruler className="w-6 h-6" />,
        capabilities: [
          'Conceptual, Permitting and As-builts Drawings',
          'Survey and Modification Plan Drawings',
          'FAA application and drawings',
          'Lease Exhibits',
          'Pre-Construction Audits and financial',
          'Electrical, fire, hazard and special permits recovery',
          'Benchmarking and design'
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
              Licensed #1099543 A, B, C-10 · Bonded &amp; Insured
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Elevate and Inspire
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}to the Next Level
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Full-service telecommunications and construction — Wireless, Network Infrastructure,
              EV Charging, Audio/Visual, Training, and A&E Design. Serving California, Nevada, and Oregon.
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
              <h3 className="text-xl font-bold text-white mb-2">License #1099543 A, B, C-10</h3>
              <p className="text-gray-300">Fully licensed contractor in California for general engineering, general building, and electrical work</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Bond #G121001978153</h3>
              <p className="text-gray-300">Fully bonded and insured — your project and investment are protected</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <Building2 className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">We Beat Estimates</h3>
              <p className="text-gray-300">Forward your estimate — we&apos;ll provide a competitive cost-efficient alternative</p>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Clients */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We have proudly served major telecommunications carriers and enterprise clients across the United States.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            {['Verizon', 'T-Mobile', 'AT&T', 'Ericsson', 'Nokia', 'CenturyLink'].map((client) => (
              <span
                key={client}
                className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-semibold text-base shadow-sm"
              >
                {client}
              </span>
            ))}
            <span className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium text-base">
              And others
            </span>
          </div>

          {/* Network Family / Partner Companies */}
          <div className="border-t border-gray-100 pt-10">
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Network Family &amp; Partner Companies
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Luma Builders',
                'Salient Global Technologies',
                'Blackrock A&E Services',
                'Intellifreight Logistics',
                'Alpha Services',
                'Lucas Electric'
              ].map((partner) => (
                <span
                  key={partner}
                  className="px-4 py-2 bg-gold-50 border border-gold-200 rounded-full text-gold-800 text-sm font-medium"
                >
                  {partner}
                </span>
              ))}
            </div>
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
                Hayward, CA
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
