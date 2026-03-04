'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Eye,
  Camera
} from 'lucide-react';

/**
 * Gallery Preview Section for Homepage
 * Displays featured project images organized by category
 * with links to the full gallery page
 */

interface GalleryImage {
  src: string;
  alt: string;
  location: string;
  category: string;
}

const featuredImages: GalleryImage[] = [
  {
    src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp',
    alt: 'EV Charging Station Installation - Antioch',
    location: 'Antioch, CA',
    category: 'EV Charging Infrastructure'
  },
  {
    src: '/images/projects/Oregon-AV-Station/AV-station/Oregon-AvStations-hero.jpg',
    alt: 'AV Charging Station - Oregon',
    location: 'Chemult, OR',
    category: 'EV Charging Infrastructure'
  },
  {
    src: '/images/projects/Sparks-NV/tower-tree-7.jpg',
    alt: 'Telecommunications Tower Installation',
    location: 'Sparks, NV',
    category: 'Telecommunications & Towers'
  },
  {
    src: '/images/projects/Bodega-Bay-CA/bulldozer-trench.jpg',
    alt: 'Site Development Operations',
    location: 'Bodega Bay, CA',
    category: 'Site Development & Grading'
  },
  {
    src: '/images/projects/Ripon-CA/ripon-ev-station-trench-5.webp',
    alt: 'Underground Utility Trenching',
    location: 'Ripon, CA',
    category: 'Underground Utilities & Trenching'
  },
  {
    src: '/images/projects/Winnemucca-NV/trench-1.jpg',
    alt: 'Utility Installation Project',
    location: 'Winnemucca, NV',
    category: 'Underground Utilities & Trenching'
  }
];

const categories = [
  { id: 'ev-charging', name: 'EV Charging Infrastructure', count: 54 },
  { id: 'telecommunications', name: 'Telecommunications & Towers', count: 12 },
  { id: 'site-development', name: 'Site Development & Grading', count: 15 },
  { id: 'utilities', name: 'Underground Utilities', count: 8 }
];

const GalleryPreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      aria-labelledby="gallery-preview-heading"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-gray-50 to-amber-50/30" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(179, 153, 93, 0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(179, 153, 93, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(179, 153, 93, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold mb-4 border border-gold-200"
          >
            <Camera className="w-4 h-4 inline mr-2" />
            Our Work
          </motion.span>
          <h2
            id="gallery-preview-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Project
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600">
              {' '}Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of completed projects across California, Nevada, and Oregon.
            See our craftsmanship and attention to detail in action.
          </p>
        </motion.div>

        {/* Featured Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative group rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
            {/* Main Image */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={featuredImages[currentIndex].src}
                    alt={featuredImages[currentIndex].alt}
                    fill
                    className="object-scale-down rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gold-500 text-white text-sm font-medium rounded-full mb-2">
                      {featuredImages[currentIndex].category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {featuredImages[currentIndex].alt}
                    </h3>
                    <div className="flex items-center text-white/80 mt-2">
                      <MapPin className="w-4 h-4 mr-2 text-gold-400" />
                      <span>{featuredImages[currentIndex].location}</span>
                    </div>
                  </div>
                  <div className="text-white/80 text-sm">
                    {currentIndex + 1} / {featuredImages.length}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                         bg-black/60 text-white hover:bg-gold-500 backdrop-blur-md
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         border border-white/10 hover:border-gold-400 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                         bg-black/60 text-white hover:bg-gold-500 backdrop-blur-md
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         border border-white/10 hover:border-gold-400 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 p-4 bg-gray-900">
              {featuredImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex-1 aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
                    idx === currentIndex
                      ? 'ring-2 ring-gold-400 scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                  {hoveredIndex === idx && idx !== currentIndex && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm
                       hover:shadow-md hover:border-gold-300 transition-all duration-300"
            >
              <div className="text-3xl font-bold text-gold-500 mb-1">{category.count}+</div>
              <div className="text-sm text-gray-600 font-medium">{category.name}</div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-amber-50/95 to-orange-50/95 backdrop-blur-sm
                          rounded-2xl p-8 border border-gold-300/40 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              See More of Our Work
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Browse our complete gallery with high-resolution images from all our projects.
              Filter by category, location, or project type.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/gallery"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500
                           text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  View Full Gallery
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white border-2 border-gold-400
                           text-gold-700 hover:bg-gold-50 font-medium rounded-xl transition-all"
                >
                  Start Your Project
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreviewSection;
