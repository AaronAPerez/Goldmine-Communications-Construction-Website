'use client';

// components/sections/ServicesPreview/ServiceCategoryCard.tsx
// Service category card with image header and service list
// Displays category details with expandable service listings

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceCategoryCardProps } from './types';

/**
 * ServiceCategoryCard Component
 * Renders a service category with image, description, and service list
 * Memoized for performance optimization
 */
const ServiceCategoryCard = memo(function ServiceCategoryCard({
  category,
  index,
  isInView
}: ServiceCategoryCardProps) {
  const IconComponent = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-white rounded-2xl shadow-xl overflow-hidden
                 hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* Category Image Header */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70`} />

        {/* Category title overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {category.title}
            </h3>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Services Include:
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {category.services.slice(0, 8).map((service, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{service}</span>
            </li>
          ))}
        </ul>

        {/* Show more indicator if there are more services */}
        {category.services.length > 8 && (
          <p className="text-sm text-gold-600 font-medium mt-4">
            + {category.services.length - 8} more services
          </p>
        )}

        {/* View details link */}
        <Link
          href={`/services#${category.id}`}
          className="inline-flex items-center gap-2 mt-6 text-gold-600 font-semibold
                     hover:text-gold-700 transition-colors group/link"
        >
          View All {category.title.split('/')[0].trim()} Services
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
});

export default ServiceCategoryCard;
