'use client';

// components/sections/ServicesPreview/ServicesPreviewSection.tsx
// Main Services Preview section for homepage
// Displays comprehensive overview of all services organized by category

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

// Import sub-components
import ServiceCategoryCard from './ServiceCategoryCard';
import FeaturedServiceCard from './FeaturedServiceCard';

// Import data
import { serviceCategories, featuredServices } from './services-data';

/**
 * ServicesPreviewSection Component
 * Main section displaying services overview with categories and featured services
 */
const ServicesPreviewSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      aria-labelledby="services-preview-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-gold-100/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-gray-100 to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 rounded-full
                       text-sm font-semibold mb-4 border border-gold-200"
          >
            NECA-Certified Contractor
          </motion.span>
          <h2
            id="services-preview-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
              {' '}Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive electrical, telecommunications, and construction services
            for commercial, residential, and municipal projects throughout
            California, Nevada, and Oregon.
          </p>
        </motion.div>

        {/* Featured Services Grid - Visual showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <FeaturedServiceCard
                key={service.id}
                service={service}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Service Categories - Detailed breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((category, index) => (
            <ServiceCategoryCard
              key={category.id}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12
                          shadow-2xl relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500 rounded-full blur-3xl" />
            </div>

            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact our team to discuss your project requirements. We serve commercial,
                industrial, residential, and municipal clients across California, Nevada, and Oregon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/services"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600
                             text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl
                             hover:from-gold-600 hover:to-gold-700"
                  >
                    View All Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm
                             border-2 border-white/30 text-white hover:bg-white/20
                             font-semibold rounded-xl transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Get an Estimate
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
