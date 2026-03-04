'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  Grid3X3,
  LayoutGrid,
  Zap,
  Radio,
  Shovel,
  Building2,
  ArrowRight,
  Phone,
  Mail,
  Download,
  ZoomIn
} from 'lucide-react';

/**
 * Gallery Category Interface
 */
interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  images: GalleryImage[];
}

interface GalleryImage {
  src: string;
  alt: string;
  location: string;
  description: string;
  category: string;
}

/**
 * Gallery Data organized by NECA service categories
 */
const galleryCategories: GalleryCategory[] = [
  {
    id: 'ev-charging',
    title: 'EV Charging Infrastructure',
    description: 'Electric vehicle charging station installations including trenching, conduit, and equipment deployment.',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    images: [
      // Antioch, CA
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp', alt: 'EV charging station concrete pad installation', location: 'Antioch, CA', description: 'Concrete pad and bollard installation for commercial EV charger', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-1.webp', alt: 'Underground conduit trenching for EV station', location: 'Antioch, CA', description: 'Precision trenching for electrical conduit routing', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-17.webp', alt: 'EV charging equipment mounting', location: 'Antioch, CA', description: 'Level 2 charger equipment mounting and wiring', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-25.webp', alt: 'Electrical panel upgrade for EV charging', location: 'Antioch, CA', description: 'Service panel upgrade to support charging infrastructure', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-31.webp', alt: 'Conduit installation in trench', location: 'Antioch, CA', description: 'Multiple conduit runs for power and communications', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-39.webp', alt: 'Backfill and compaction', location: 'Antioch, CA', description: 'Proper backfill and soil compaction around infrastructure', category: 'EV Charging Infrastructure' },
      // Oregon
      { src: '/images/projects/Oregon-AV-Station/AV-station/Oregon-AvStations-hero.jpg', alt: 'Completed EV charging station', location: 'Chemult, OR', description: 'DC fast charging station with multiple charging points', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-1.jpg', alt: 'EV charging parking layout', location: 'Chemult, OR', description: 'ADA-compliant charging station parking configuration', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-7.jpg', alt: 'Charging station signage', location: 'Chemult, OR', description: 'Wayfinding and charging station identification signage', category: 'EV Charging Infrastructure' },
      // Ripon, CA
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-15.webp', alt: 'EV station trenching work', location: 'Ripon, CA', description: 'Deep trench excavation for high-voltage conduit', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-5.webp', alt: 'Conduit placement in trench', location: 'Ripon, CA', description: 'Rigid conduit installation with proper spacing', category: 'EV Charging Infrastructure' },
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-10.webp', alt: 'Trench inspection', location: 'Ripon, CA', description: 'Quality inspection of conduit installation depth', category: 'EV Charging Infrastructure' },
    ]
  },
  {
    id: 'underground-utilities',
    title: 'Underground Utilities & Trenching',
    description: 'Underground utility installation, directional boring, trenching, and conduit systems.',
    icon: <Shovel className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
    images: [
      // Oregon trenching
      { src: '/images/projects/Oregon-AV-Station/trench/trench-1.jpg', alt: 'Utility trenching excavation', location: 'Chemult, OR', description: 'Excavator performing precision trenching for utilities', category: 'Underground Utilities' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-5.jpg', alt: 'Deep trench for conduit', location: 'Chemult, OR', description: 'Code-compliant depth for underground power lines', category: 'Underground Utilities' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-7.jpg', alt: 'Multiple conduit installation', location: 'Chemult, OR', description: 'Parallel conduit runs for power and fiber', category: 'Underground Utilities' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-10.jpg', alt: 'Trench backfill operation', location: 'Chemult, OR', description: 'Controlled backfill with compaction testing', category: 'Underground Utilities' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-12.jpg', alt: 'Utility corridor excavation', location: 'Chemult, OR', description: 'Wide utility corridor for multiple services', category: 'Underground Utilities' },
      // Ripon trenching
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-1.webp', alt: 'Start of trenching operation', location: 'Ripon, CA', description: 'Initial excavation with safety perimeter established', category: 'Underground Utilities' },
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-3.webp', alt: 'Conduit in open trench', location: 'Ripon, CA', description: 'PVC conduit placement before backfill', category: 'Underground Utilities' },
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-8.webp', alt: 'Trench with warning tape', location: 'Ripon, CA', description: 'Caution tape marking for buried utilities', category: 'Underground Utilities' },
      // Bodega Bay trenching
      { src: '/images/projects/Bodega-Bay-CA/trench-1.jpg', alt: 'Site trenching for utilities', location: 'Bodega Bay, CA', description: 'Trenching for water and electrical services', category: 'Underground Utilities' },
      { src: '/images/projects/Bodega-Bay-CA/trench-2.jpg', alt: 'Underground pipe installation', location: 'Bodega Bay, CA', description: 'Utility pipe installation and bedding', category: 'Underground Utilities' },
      { src: '/images/projects/Bodega-Bay-CA/trench-3.jpg', alt: 'Completed utility trench', location: 'Bodega Bay, CA', description: 'Trench ready for inspection and backfill', category: 'Underground Utilities' },
    ]
  },
  {
    id: 'telecommunications',
    title: 'Telecommunications & Towers',
    description: 'Cell tower installation, telecommunications infrastructure, and network equipment deployment.',
    icon: <Radio className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600',
    images: [
      { src: '/images/projects/Sparks-NV/tower-tree-7.jpg', alt: 'Stealth tree cell tower', location: 'Sparks, NV', description: 'Camouflaged mono-pine cell tower installation', category: 'Telecommunications' },
      { src: '/images/projects/Sparks-NV/tower-tree-1.jpg', alt: 'Tower assembly in progress', location: 'Sparks, NV', description: 'Stealth tower section assembly and rigging', category: 'Telecommunications' },
      { src: '/images/projects/Sparks-NV/tower-tree-install.jpg', alt: 'Crane lifting tower section', location: 'Sparks, NV', description: 'Precision crane operation for tower assembly', category: 'Telecommunications' },
      { src: '/images/projects/Sparks-NV/tower-tree-3.jpg', alt: 'Tower branch installation', location: 'Sparks, NV', description: 'Decorative branch installation for stealth appearance', category: 'Telecommunications' },
      { src: '/images/projects/Sparks-NV/tower-tree-4.jpg', alt: 'Antenna mounting', location: 'Sparks, NV', description: 'RF antenna mounting and alignment', category: 'Telecommunications' },
      { src: '/images/projects/Sparks-NV/tower-tree-6.jpg', alt: 'Completed stealth tower', location: 'Sparks, NV', description: 'Finished mono-pine blending with landscape', category: 'Telecommunications' },
      { src: '/images/projects/Sparks-NV/tower-base-1.jpg', alt: 'Tower foundation', location: 'Sparks, NV', description: 'Reinforced concrete foundation with anchor bolts', category: 'Telecommunications' },
      { src: '/images/projects/Sparks-NV/tree-tower-network.jpg', alt: 'Network equipment shelter', location: 'Sparks, NV', description: 'Ground-level equipment cabinet and power', category: 'Telecommunications' },
    ]
  },
  {
    id: 'site-development',
    title: 'Site Development & Grading',
    description: 'Commercial site preparation, excavation, grading, and heavy equipment operations.',
    icon: <Building2 className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-600',
    images: [
      { src: '/images/projects/Bodega-Bay-CA/construction-dozer.jpg', alt: 'Bulldozer site grading', location: 'Bodega Bay, CA', description: 'Heavy grading for commercial pad preparation', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-2.jpg', alt: 'Excavation operations', location: 'Bodega Bay, CA', description: 'Cut and fill operations for level building pad', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-3.jpg', alt: 'Site clearing', location: 'Bodega Bay, CA', description: 'Vegetation clearing and topsoil removal', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-4.jpg', alt: 'Grade establishment', location: 'Bodega Bay, CA', description: 'Final grade establishment per engineering plans', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-transport.jpg', alt: 'Equipment transport', location: 'Bodega Bay, CA', description: 'Heavy equipment delivery to job site', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/transport-1.jpg', alt: 'Flatbed equipment transport', location: 'Bodega Bay, CA', description: 'Specialized transport for construction equipment', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/transport-2.jpg', alt: 'Equipment offloading', location: 'Bodega Bay, CA', description: 'Safe equipment offloading procedures', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/case-1.jpg', alt: 'Compact track loader', location: 'Bodega Bay, CA', description: 'Versatile equipment for tight access areas', category: 'Site Development' },
      { src: '/images/projects/Bodega-Bay-CA/jack-hammer-1.jpg', alt: 'Concrete breaking', location: 'Bodega Bay, CA', description: 'Demolition and concrete removal operations', category: 'Site Development' },
    ]
  }
];

// Flatten all images for "All" view
const allImages = galleryCategories.flatMap(cat => cat.images);

/**
 * Gallery Image Card Component
 */
interface ImageCardProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

const ImageCard = ({ image, index, onClick }: ImageCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer
                 shadow-lg hover:shadow-2xl transition-all duration-500"
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Zoom Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-3 bg-white/90 rounded-full">
          <ZoomIn className="w-6 h-6 text-gray-900" />
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
          <MapPin className="w-4 h-4 text-gold-400" />
          <span>{image.location}</span>
        </div>
        <p className="text-white text-sm font-medium line-clamp-2">{image.description}</p>
      </div>
    </motion.div>
  );
};

/**
 * Lightbox Component
 */
interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onIndexChange: (index: number) => void;
}

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
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
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
                onClick={() => onIndexChange(actualIndex)}
                className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 transition-all ${
                  actualIndex === currentIndex ? 'ring-2 ring-gold-400 scale-110' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image src={img.src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Main Gallery Page Component
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

      {/* Filter Bar */}
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
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Grid view"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'masonry' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Masonry view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Description */}
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

      {/* Gallery Grid */}
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
              <div className="text-4xl font-bold text-gold-400 mb-2">15+</div>
              <div className="text-gray-400">Years Experience</div>
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

      {/* Lightbox */}
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
