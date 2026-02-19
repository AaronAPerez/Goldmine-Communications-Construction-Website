'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, MapPin, Maximize2 } from 'lucide-react';

/**
 * Premium Service Image Gallery Component
 *
 * Features:
 * - Large featured image with smooth transitions
 * - Thumbnail navigation
 * - Fullscreen lightbox view
 * - Location badge for project details
 * - Premium gold accent styling
 */

interface ProjectImage {
  src: string;
  alt: string;
}

interface ServiceImageGalleryProps {
  images: ProjectImage[];
  projectName?: string;
  location?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
  showThumbnails?: boolean;
  maxThumbnails?: number;
}

const ServiceImageGallery = ({
  images,
  projectName,
  location,
  className = '',
  aspectRatio = 'video',
  showThumbnails = true,
  maxThumbnails = 5
}: ServiceImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectRatioClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]'
  }[aspectRatio];

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsLoading(true);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    setIsLoading(true);
  }, [images.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setIsLightboxOpen(false);
  }, [handlePrevious, handleNext]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className={`relative group ${className}`}>
        {/* Main Image Container */}
        <div className={`relative ${aspectRatioClass} rounded-2xl overflow-hidden bg-gray-900`}>
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Main Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority={selectedIndex === 0}
                onLoad={() => setIsLoading(false)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Project Info Badge */}
          {(projectName || location) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                {projectName && (
                  <h4 className="text-white font-semibold text-sm md:text-base">
                    {projectName}
                  </h4>
                )}
                {location && (
                  <div className="flex items-center gap-1.5 text-gold-400 text-xs md:text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full
                         bg-black/50 text-white hover:bg-gold-500 backdrop-blur-sm
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full
                         bg-black/50 text-white hover:bg-gold-500 backdrop-blur-sm
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2.5 rounded-full
                     bg-black/50 text-white hover:bg-gold-500 backdrop-blur-sm
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm
                          text-white text-xs font-medium rounded-full border border-white/10">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {showThumbnails && images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.slice(0, maxThumbnails).map((image, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIndex(idx);
                  setIsLoading(true);
                }}
                className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden
                          transition-all duration-300 ${
                  idx === selectedIndex
                    ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-gray-900'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
            {images.length > maxThumbnails && (
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg
                         bg-gray-800 flex items-center justify-center text-white
                         hover:bg-gold-500 transition-colors"
              >
                <span className="text-sm font-medium">+{images.length - maxThumbnails}</span>
              </button>
            )}
          </div>
        )}

        {/* Progress Dots (for mobile) */}
        {images.length > 1 && !showThumbnails && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIndex(idx);
                  setIsLoading(true);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === selectedIndex
                    ? 'bg-gold-400 w-6'
                    : 'bg-gray-400 hover:bg-gray-300'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white
                       hover:bg-gold-500 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image */}
            <div
              className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />

              {/* Project Info */}
              {(projectName || location) && (
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="inline-block bg-black/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
                    {projectName && (
                      <h4 className="text-white font-semibold">{projectName}</h4>
                    )}
                    {location && (
                      <div className="flex items-center justify-center gap-2 text-gold-400 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Lightbox Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full
                           bg-white/10 text-white hover:bg-gold-500 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full
                           bg-white/10 text-white hover:bg-gold-500 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Lightbox Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden
                            transition-all duration-300 ${
                    idx === selectedIndex
                      ? 'ring-2 ring-gold-400 scale-110'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceImageGallery;
