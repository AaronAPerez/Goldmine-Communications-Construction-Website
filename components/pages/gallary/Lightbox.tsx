import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { LightboxProps } from './types';


const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev, onIndexChange }: LightboxProps) => {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-gold-400" />
          <span className="font-medium">{currentImage.location}</span>
          <span className="text-white/60">|</span>
          <span className="text-white/80">{currentIndex + 1} of {images.length}</span>
        </div>
        <button
          onClick={onClose}
          type="button"
          aria-label="Close lightbox"
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex-1 relative flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-w-6xl max-h-[70vh]"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous image"
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next image"
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Description */}
      <div className="p-4 text-center text-white">
        <p className="text-lg font-medium mb-1">{currentImage.alt}</p>
        <p className="text-white/70">{currentImage.description}</p>
      </div>

      {/* Thumbnail Strip */}
      <div className="p-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 justify-center">
          {images.slice(Math.max(0, currentIndex - 4), currentIndex + 5).map((img, idx) => {
            const actualIndex = Math.max(0, currentIndex - 4) + idx;
            return (
              <button
                key={actualIndex}
                type="button"
                aria-label={`View image ${actualIndex + 1}`}
                onClick={() => onIndexChange(actualIndex)}
                className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 transition-all ${
                  actualIndex === currentIndex ? 'ring-2 ring-gold-400 scale-110' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                 src={img.src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Lightbox