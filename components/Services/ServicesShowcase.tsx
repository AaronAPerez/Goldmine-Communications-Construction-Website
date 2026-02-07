'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Building2, Wrench, Shield } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Types for type safety and better maintainability
interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
}

// Services data with comprehensive descriptions
const services: Service[] = [
  {
    id: 'construction',
    icon: <Building2 className="w-8 h-8" />,
    title: 'Construction Services',
    description: 'Full-service construction solutions with expert project management and quality craftsmanship.',
    features: [
      'Commercial Construction',
      'Industrial Facilities',
      'Healthcare Facilities',
      'Project Management',
      'Quality Control'
    ],
    image: '/images/services/construction.jpg'
  },
  {
    id: 'communications',
    icon: <Network className="w-8 h-8" />,
    title: 'Communications Infrastructure',
    description: 'Advanced communications solutions for modern connectivity needs.',
    features: [
      'Fiber Optic Installation',
      'Network Infrastructure',
      'Data Center Construction',
      'Wireless Solutions',
      'System Integration'
    ],
    image: '/images/services/communications.jpg'
  },
  {
    id: 'maintenance',
    icon: <Wrench className="w-8 h-8" />,
    title: 'Maintenance & Support',
    description: '24/7 maintenance and support services to keep your systems running optimally.',
    features: [
      'Preventive Maintenance',
      'Emergency Repairs',
      'System Upgrades',
      'Regular Inspections',
      'Technical Support'
    ],
    image: '/images/services/maintenance.jpg'
  }
];

export default function ServicesShowcase() {
  // Track active service for enhanced interactivity
  const [activeService, setActiveService] = useState<string>(services[0].id);
  const { ref, isVisible } = useIntersectionObserver();

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      ref={ref}
      className="py-24 bg-gray-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            id="services-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction and communications solutions delivered with 
            expertise and dedication to excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`
                relative overflow-hidden rounded-2xl transition-all duration-300
                ${activeService === service.id 
                  ? 'ring-2 ring-gold-400 shadow-xl scale-105' 
                  : 'shadow-lg hover:shadow-xl'}
              `}
              onMouseEnter={() => setActiveService(service.id)}
              onFocus={() => setActiveService(service.id)}
            >
              {/* Service Card Content */}
              <div className="bg-white p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gold-400/10 text-gold-400">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {/* Features List with Animation */}
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={activeService === service.id 
                        ? { opacity: 1, x: 0 } 
                        : { opacity: 0.7, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-gray-600"
                    >
                      <Shield className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={activeService === service.id 
                    ? { opacity: 1, y: 0 } 
                    : { opacity: 0, y: 20 }}
                  className="mt-8"
                >
                  <a
                    href={`/services/${service.id}`}
                    className="inline-flex items-center justify-center px-6 py-3 
                             border border-transparent rounded-lg text-base font-medium 
                             text-white bg-gold-400 hover:bg-gold-500 
                             transition-colors duration-300"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-8">
              Contact us today to discuss your construction and communications needs.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 
                       border border-transparent rounded-lg text-base font-medium 
                       text-white bg-gold-400 hover:bg-gold-500 
                       transition-colors duration-300"
            >
              Get a Quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}