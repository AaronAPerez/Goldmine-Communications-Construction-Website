'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Camera,
  Grid3X3,
  LayoutGrid,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';
import ImageCard from './ImageCard';
import Lightbox from './Lightbox';
// Static content is defined in gallery-data.tsx; types are in types.ts
import { galleryCategories, allImages } from './gallery-data';

/**
 * GalleryPage
 *
 * Renders the full /gallery route:
 *   - Hero section with background image
 *   - Sticky filter bar (category + grid/masonry toggle)
 *   - Animated image grid using the ImageCard reusable component
 *   - Stats section
 *   - CTA section
 *   - Lightbox overlay (keyboard-navigable)
 *
 * Data lives in gallery-data.tsx.
 * Types live in types.ts.
 * ImageCard and Lightbox are extracted reusable components.
 */
const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const currentImages = selectedCategory === 'all'
    ? allImages
    : galleryCategories.find(c => c.id === selectedCategory)?.images || [];

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  }, [currentImages.length]);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
      >
        <Image
          src="/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp"
          alt="Project gallery"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/20 text-gold-400 rounded-full text-sm font-semibold mb-6 border border-gold-500/30">
              <Camera className="w-4 h-4" />
              Project Gallery
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Work in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Action
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Browse our portfolio of completed projects showcasing EV charging infrastructure,
              telecommunications towers, underground utilities, and site development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar — sticky below nav */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Projects ({allImages.length})
              </button>
              {galleryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon}
                  {cat.title} ({cat.images.length})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'masonry' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Masonry view"
                aria-label="Masonry view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Description — shown when a specific category is active */}
      {selectedCategory !== 'all' && (
        <section className="bg-gray-50 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {galleryCategories.filter(c => c.id === selectedCategory).map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${cat.color} text-white`}>
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                  <p className="text-gray-600">{cat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Grid — delegates rendering to reusable ImageCard */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-4 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            <AnimatePresence mode="popLayout">
              {currentImages.map((image, index) => (
                <ImageCard
                  key={`${image.src}-${index}`}
                  image={image}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </AnimatePresence>
          </div>

          {currentImages.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">{allImages.length}+</div>
              <div className="text-gray-400">Project Photos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">{galleryCategories.length}</div>
              <div className="text-gray-400">Service Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">3</div>
              <div className="text-gray-400">States Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">60+</div>
              <div className="text-gray-400">Years Combined Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-black/80 max-w-2xl mx-auto mb-8">
            Our portfolio demonstrates the quality and expertise we bring to every project.
            Let us bring that same excellence to yours.
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
              href="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-black
                       text-black hover:bg-black hover:text-white font-medium
                       rounded-xl transition-colors"
            >
              View Our Services
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-black/80">
            <a href="tel:+19253055980" className="inline-flex items-center gap-2 hover:text-black">
              <Phone className="w-5 h-5" />
              (925) 305-5980
            </a>
            <a href="mailto:a.lopez@goldminecomm.net" className="inline-flex items-center gap-2 hover:text-black">
              <Mail className="w-5 h-5" />
              a.lopez@goldminecomm.net
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Stockton, CA
            </span>
          </div>
        </div>
      </section>

      {/* Lightbox — delegates rendering to the reusable Lightbox component */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={currentImages}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            onIndexChange={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
