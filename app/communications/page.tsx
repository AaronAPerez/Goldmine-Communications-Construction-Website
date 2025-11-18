'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Network, 
  Radio, 
  Zap, 
  Eye,
  Cpu,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Settings,
  Telescope,
  Wrench
} from 'lucide-react';
import Image from 'next/image';

/**
 * Communications Page Component
 * 
 * Comprehensive showcase of all communication services with:
 * - Detailed service breakdowns
 * - Interactive service exploration
 * - Professional presentation
 * - Technical specifications
 */

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  color: string;
  expanded?: boolean;
}

const communicationServices: ServiceDetail[] = [
  {
    id: 'network-services',
    title: 'Network Services',
    description: 'Comprehensive network infrastructure and installation services.',
    icon: <Network className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    services: [
      'Radio Installation & Remote Monitoring',
      'DC Power & Battery Systems with Alarming',
      'Structured Cable & CRAN Integration',
      'Generator Installation & Turn-up',
      'Rack and Stack Equipment Services',
      'Construction Services, Climbing & Rigging',
      'Civil & Electrical Infrastructure',
      'Equipment Engineering & Design'
    ]
  },
  {
    id: 'wireless-solutions',
    title: 'Wireless Solutions',
    description: 'Advanced wireless infrastructure for all major carriers.',
    icon: <Radio className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    services: [
      'Installation & Maintenance for Verizon, T-Mobile, AT&T, Dish Networks',
      'RF Installation, Testing & 5G Equipment Installation',
      'Internet Backhaul, Wireless Backhaul & Broadband Solutions',
      'C-Band Solutions & RAN Implementation',
      'Low Voltage Systems & Generator Installation',
      'Macro Lines & Antennas Installation/Repair',
      'Small Cell Tower Installation',
      'Antenna, Coax & Hybrid Cabling Installation',
      'PIM, Sweep & OTDR Testing',
      'Decommission & Demolition Services'
    ]
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    description: 'Data center and network infrastructure solutions.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    services: [
      'Data Centers/CO Rack and Stack',
      'Power Whips Installation',
      'Cabling Infrastructure & Network Services',
      'DAS Wireless Systems',
      'Fiber Optic Splicing & Terminating',
      'Outside Plant Public Safety 5G',
      'In-building Head-end Integration'
    ]
  },
  {
    id: 'smart-technology',
    title: 'Smart Technology & IoT',
    description: 'Cutting-edge smart technology and IoT solutions.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    services: [
      'EV Charging Stations & Clean Energy Solutions',
      'Intrusion Detection & Video Surveillance',
      'IoT Device Installation & Optimization',
      'Public Safety Private 60 MHz, CBRS LTE',
      'Programming & Commissioning',
      'Camera Installation & Optimization'
    ]
  },
  {
    id: 'audio-visual',
    title: 'Audio/Visual Systems',
    description: 'Professional AV solutions for corporate and institutional environments.',
    icon: <Eye className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
    services: [
      'Control System Programming',
      'Audio DSP Programming',
      'Audio Systems Evaluation, Balancing & Calibration',
      'Broadband Fiber Connections',
      'Comprehensive Cabling Services (Audio, Broadcast, Control, Data, Voice, Video)',
      'Classroom Media Systems',
      'Command Centers & Mission Critical Systems',
      'Corporate Boardrooms',
      'Intercom Systems (Production & Wireless)',
      'Whole SMART Building Control & Monitoring',
      'Churches & Convention Centers'
    ]
  }
];

const additionalServices = [
  {
    id: 'testing-certification',
    title: 'Testing & Certification',
    icon: <Settings className="w-6 h-6" />,
    services: [
      'PIM Sweep Testing',
      'Fiber Testing & OTDR',
      'COWs/COLTs & RATs Building/Deployment',
      'Troubleshooting (All Areas)',
      'Site Surveys & Power Audits'
    ]
  },
  {
    id: 'support-maintenance',
    title: 'Support & Maintenance',
    icon: <Wrench className="w-6 h-6" />,
    services: [
      'Update & Maintain Site Records (SiteTracker, FUZE)',
      'Asset Tracking & Management Services',
      'Decommissioning of Old Equipment',
      'Bucket Truck Add/Mod Services for 5G Sites',
      'New Build Ground Based Work (ISP)'
    ]
  },
  {
    id: 'design-engineering',
    title: 'A&E Services',
    icon: <Telescope className="w-6 h-6" />,
    services: [
      'As-built Drawings',
      'Site Surveys & Zoning Drawings',
      'Construction Drawings (Raw Land, Collocation, Roof Top)',
      'FAA Height Verification Drawings',
      'Lease Exhibits & Easement Drawings',
      'Modification & Technology Upgrade Drawings',
      'Structural & Electrical Analysis/Evaluation'
    ]
  }
];

/**
 * Expandable Service Card Component
 */
interface ServiceCardProps {
  service: ServiceDetail;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard = ({ service, index, isExpanded, onToggle }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* Service Header */}
      <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              {service.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-white/90 text-sm mt-1">{service.description}</p>
            </div>
          </div>
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} details`}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Services Included:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.services.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 text-gray-600"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Main Communications Page Component
 */
const CommunicationsPage = () => {
  const [expandedService, setExpandedService] = useState<string>('network-services');
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const handleServiceToggle = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? '' : serviceId);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden"
      >
         <Image
                        src="/images/projects/communications-tower2.png"
                        alt="Communications tower with wireless infrastructure equipment"
                        fill
                        className="absolute inset-0 object-cover opacity-40 z-0"
                        />
        {/* Enhanced dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-[2]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[3]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >

            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Advanced
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 drop-shadow-lg">
                {' '}Communications
              </span>
              <br />Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 drop-shadow-md">
              Cutting-edge telecommunications infrastructure, network solutions, and smart
              technology services for the connected world.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3   border-2 border-white/80 
                             bg-gradient-to-r from-gold-400 to-gold-700 text-white
                               rounded-xl  hover:bg-gold-500 
                         font-medium transition-colors shadow-lg"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 border-2 border-white
                         text-white hover:bg-white hover:text-gray-900 font-medium 
                         rounded-xl transition-colors"
              >
                Explore Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Communication Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From network infrastructure to smart technology integration, we provide 
              end-to-end communication solutions.
            </p>
          </motion.div>

          <div className="space-y-6">
            {communicationServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isExpanded={expandedService === service.id}
                onToggle={() => handleServiceToggle(service.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Supporting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete support ecosystem to ensure optimal performance and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-gold-400/30 
                         hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gold-100 rounded-xl text-gold-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <ul className="space-y-2">
                  {service.services.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Certification Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Training & Certification
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Professional development and certification programs for field technicians 
              and technical growth opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Integration/Installation Training',
                  description: 'Comprehensive training on system integration and installation best practices.',
                  icon: <Wrench className="w-8 h-8" />
                },
                {
                  title: '5G Technologies',
                  description: 'Advanced certification in 5G deployment, testing, and optimization.',
                  icon: <Smartphone className="w-8 h-8" />
                },
                {
                  title: 'Structured Cabling & Telecom Standards',
                  description: 'Industry-standard certification in structured cabling and telecommunications.',
                  icon: <Network className="w-8 h-8" />
                }
              ].map((training, index) => (
                <motion.div
                  key={training.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="text-gold-400 mb-4">{training.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{training.title}</h3>
                  <p className="text-gray-300 text-sm">{training.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <p className="text-gray-300 mb-6">
                Contact our office today to learn more about our training programs and certification opportunities.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-gold-400 hover:bg-gold-500 
                         text-white font-medium rounded-xl transition-colors shadow-lg"
              >
                Learn About Training
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-gold-400 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Communications Infrastructure?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Let&apos;s discuss how our comprehensive communication solutions can enhance 
              your connectivity and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-white text-gold-600 
                         hover:bg-gray-50 font-medium rounded-xl transition-colors shadow-lg"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 border-2 border-white
                         text-white hover:bg-white hover:text-gold-600 font-medium 
                         rounded-xl transition-colors"
              >
                View Our Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommunicationsPage;