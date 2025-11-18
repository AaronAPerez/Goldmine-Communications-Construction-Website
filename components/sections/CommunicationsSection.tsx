'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Network, 
  Radio, 
  Zap, 
  Eye,
  Cpu,
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

/**
 * Communications Section Component for Homepage
 * 
 * Professional showcase of communication services with:
 * - Clean service categorization
 * - Visual service highlights
 * - Professional presentation without repetition
 */

interface CommunicationService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const communicationServices: CommunicationService[] = [
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    description: 'Comprehensive network solutions from data centers to fiber optic systems.',
    icon: <Network className="w-8 h-8" />,
    features: [
      'Data Center Rack & Stack',
      'Fiber Optic Splicing & Termination',
      'Structured Cabling Systems',
      'DAS Wireless Solutions'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'wireless-solutions',
    title: 'Wireless Solutions',
    description: 'Advanced wireless infrastructure for all major carriers and technologies.',
    icon: <Radio className="w-8 h-8" />,
    features: [
      'Verizon, T-Mobile, AT&T, Dish Networks',
      '5G & RF Installation',
      'Small Cell & Macro Tower Solutions',
      'C-Band & Broadband Implementation'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'smart-technology',
    title: 'Smart Technology',
    description: 'IoT, charging solutions, and intelligent building systems.',
    icon: <Zap className="w-8 h-8" />,
    features: [
      'EV Charging Stations',
      'IoT Device Installation',
      'Smart Building Controls',
      'Clean Energy Solutions'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'av-systems',
    title: 'Audio/Visual Systems',
    description: 'Professional AV solutions for corporate and mission-critical environments.',
    icon: <Eye className="w-8 h-8" />,
    features: [
      'Control System Programming',
      'Corporate Boardrooms',
      'Command Centers',
      'Whole Building Integration'
    ],
    color: 'from-orange-500 to-orange-600'
  }
];

/**
 * Service Card Component
 */
interface ServiceCardProps {
  service: CommunicationService;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl 
                 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Service Header */}
      <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg group-hover:scale-110 
                        transition-transform duration-300">
            {service.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-white/90 text-sm mt-1">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Service Features */}
      <div className="p-6">
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: (index * 0.1) + (idx * 0.05) }}
              className="flex items-center gap-3 text-gray-600"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

/**
 * Main Communications Section Component
 */
const CommunicationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef} 
      className="py-2 bg-gray-900"
      aria-labelledby="communications-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            id="communications-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Advanced
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Communications
            </span>
            {' '}Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge telecommunications infrastructure and smart technology solutions 
            for the connected world.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {communicationServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Additional Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm 
                        rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Comprehensive Support Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
              <div className="text-center">
                <Cpu className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Testing & Certification</h4>
                <p className="text-sm">PIM Sweep, Fiber Testing, OTDR</p>
              </div>
              <div className="text-center">
                <Network className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Professional Training</h4>
                <p className="text-sm">5G Technologies, Structured Cabling</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">A&E Services</h4>
                <p className="text-sm">Design, Surveys, Construction Drawings</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/communications"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-700 hover:bg-gold-500 
                     text-white font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Explore Communications Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunicationsSection;