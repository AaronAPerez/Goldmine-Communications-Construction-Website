'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ConstructionIcon,
  Hammer,
  HardHatIcon,
  BuildingIcon
} from 'lucide-react';

/**
 * Enhanced Construction Section Component for Homepage
 * 
 * Features:
 * - Real project images showcasing actual construction work
 * - Interactive service cards with comprehensive project galleries
 * - Professional presentation with visual proof of capabilities
 * - Blueprint-style background elements
 * - Improved accessibility and performance
 */

interface ConstructionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const constructionServices: ConstructionService[] = [
  {
    id: 'public-works',
    title: 'Public Works',
    description: 'High-quality infrastructure solutions that enhance community safety and connectivity.',
    icon: <HardHatIcon className="w-8 h-8" />,
    features: [
      'Site Development & Preparation',
      'Infrastructure Enhancement',
      'Public Safety Integration',
      'Community-Focused Solutions'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'structural-concrete',
    title: 'Structural Concrete & Foundations',
    description: 'Expert concrete work including foundations, structural elements, and specialized concrete construction.',
    icon: <BuildingIcon className="w-8 h-8" />,
    features: [
      'Foundation Construction',
      'Structural Concrete Placement',
      'Reinforcement Installation',
      'Quality Control & Testing'
    ],
    color: 'from-stone-500 to-stone-600',
  },
  {
    id: 'specialized-services',
    title: 'Specialized Services',
    description: 'Precision cutting, drilling, and technical construction services.',
    icon: <Hammer className="w-8 h-8" />,
    features: [
      'Saw Cutting & Core Drilling',
      'Precision Concrete Work',
      'Heavy Equipment Transport',
      'Quality Assurance'
    ],
    color: 'from-purple-500 to-purple-600',
  },
    {
    id: 'comprehensive-construction',
    title: 'Comprehensive Construction',
    description: 'Full-service construction from foundation to finishing.',
    icon: <ConstructionIcon className="w-8 h-8" />,
    features: [
      'Grading & Paving',
      'Structural & Site Concrete',
      'Pouring & Pumping',
      'Demolition Services'
    ],
    color: 'from-orange-500 to-orange-600'
  },
];

/**
 * Service Card Component
 */
interface ServiceCardProps {
  service: ConstructionService;
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
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                 transition-all duration-500 hover:-translate-y-2 overflow-hidden
                 border border-gray-100 hover:border-gold-200"
    >
      {/* Service Header */}
      <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 
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
 * Main Construction Section Component
 */
const ConstructionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });


  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="construction-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="construction-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Construction
            </span>
            {' '}Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From site preparation to complex infrastructure systems, we deliver comprehensive
            construction solutions with proven expertise, safety excellence, and exceptional results
            demonstrated in our extensive project portfolio.
          </p>
        </motion.div>

        {/* Enhanced Services Grid with Project Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {constructionServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>



        {/* Enhanced Call to Action with Multiple Options */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Build?
            </h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
              From site preparation to complex infrastructure installation, our proven expertise
              and comprehensive project portfolio demonstrate our ability to deliver extrodinary results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/construction"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4   bg-gradient-to-r from-gold-400 to-gold-700 hover:bg-gold-500 
                         text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl
                         focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Explore All Construction Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>

              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white
                         text-white hover:bg-white hover:text-gray-900 font-medium 
                         rounded-xl transition-colors
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                View Project Portfolio
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-gold-400
                         text-gold-400 hover:bg-gold-400 hover:text-white font-medium 
                         rounded-xl transition-colors
                         focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Get Free Estimate
              </motion.a>
            </div>

            {/* License Information */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm">
                <span className="font-semibold">Licensed & Insured</span> • License #1099543 •
                Bonded & Insured • We Beat Estimates
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConstructionSection;