'use client';

// components/sections/ServicesPreview/FeaturedServiceCard.tsx
// Featured service card with image overlay
// Displays highlighted services in a visual grid

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FeaturedServiceCardProps } from './types';

/**
 * FeaturedServiceCard Component
 * Renders a featured service with image and hover effects
 * Memoized for performance optimization
 */
const FeaturedServiceCard = memo(function FeaturedServiceCard({
  service,
  index,
  isInView
}: FeaturedServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl
                 transition-all duration-300"
    >
      <div className="relative h-64">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <h4 className="text-lg font-bold text-white mb-1">
            {service.title}
          </h4>
          <p className="text-white/80 text-sm line-clamp-2">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default FeaturedServiceCard;
