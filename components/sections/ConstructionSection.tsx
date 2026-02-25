'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  HardHat,
  Building,
  Wrench,
  Truck,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';

/**
 * Construction Section Component for Homepage
 * Uses unique images not repeated in ConstructionPage
 */

interface ConstructionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

interface ServiceGroup {
  id: string;
  services: ConstructionService[];
  images: { src: string; alt: string }[];
  projectLocation: string;
}

const serviceGroups: ServiceGroup[] = [
  {
    id: 'group-1',
    services: [
      {
        id: 'public-works',
        title: 'Public Works & Site Development',
        description: 'High-quality infrastructure solutions including grading, excavation, and site prep.',
        icon: <HardHat className="w-7 h-7" />,
        features: [
          'Site Development & Preparation',
          'Grading & Excavation',
          'Access Road Construction',
          'Environmental Compliance'
        ],
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 'structural-concrete',
        title: 'Structural Concrete & Foundations',
        description: 'Expert concrete work including foundations and specialized construction.',
        icon: <Building className="w-7 h-7" />,
        features: [
          'Foundation Construction',
          'Structural Concrete Placement',
          'Reinforcement Installation',
          'Quality Control & Testing'
        ],
        color: 'from-stone-500 to-stone-600'
      }
    ],
    projectLocation: 'Bodega Bay, CA',
    images: [
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-1.jpg', alt: 'Heavy bulldozer site grading' },
      { src: '/images/projects/Bodega-Bay-CA/jack-hammer.jpg', alt: 'Construction equipment at work' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-4.jpg', alt: 'Bulldozer trenching operations' },
      { src: '/images/projects/Bodega-Bay-CA/trench-1.jpg', alt: 'Site trenching for utilities' },
      { src: '/images/projects/PouringConcrete.jpg', alt: 'Professional concrete pouring' }
    ]
  },
  {
    id: 'group-2',
    services: [
      {
        id: 'specialized-services',
        title: 'Specialized Services',
        description: 'Precision cutting, drilling, trenching, and technical construction.',
        icon: <Wrench className="w-7 h-7" />,
        features: [
          'Saw Cutting & Core Drilling',
          'Trenching & Backfill',
          'Utility Installation',
          'Quality Assurance'
        ],
        color: 'from-purple-500 to-purple-600'
      },
      {
        id: 'comprehensive-construction',
        title: 'Heavy Equipment & Transport',
        description: 'Full-service construction with heavy equipment and logistics.',
        icon: <Truck className="w-7 h-7" />,
        features: [
          'Heavy Equipment Transport',
          'Crane Operations',
          'Material Logistics',
          'Equipment Installation'
        ],
        color: 'from-orange-500 to-orange-600'
      }
    ],
    projectLocation: 'Ripon, CA & Winnemucca, NV',
    images: [
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-1.webp', alt: 'EV station trenching Ripon' },
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-5.webp', alt: 'Precision utility trenching' },
      { src: '/images/projects/Winnemucca-NV/trench-1.jpg', alt: 'Underground utility installation' },
      { src: '/images/projects/Winnemucca-NV/trench-5.jpg', alt: 'Trenching operations Winnemucca' },
      { src: '/images/projects/Bodega-Bay-CA/transport-1.jpg', alt: 'Heavy equipment transport' }
    ]
  }
];

/**
 * Image Gallery Component
 */
interface ServiceImageGalleryProps {
  images: { src: string; alt: string }[];
  projectLocation?: string;
}

const ServiceImageGallery = ({ images, projectLocation }: ServiceImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden h-full
                    bg-gradient-to-br from-gray-800 to-[#1a1a1a]
                    shadow-2xl shadow-black/50
                    border border-white/10 hover:border-gold-400/30
                    transition-all duration-500">
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400/20 via-amber-500/20 to-gold-400/20
                      rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

      <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        {/* Location badge with improved styling */}
        {projectLocation && (
          <div className="absolute bottom-16 left-4 flex items-center gap-2
                        bg-black/70 backdrop-blur-md text-white text-sm px-4 py-2.5
                        rounded-xl border border-white/10 shadow-lg">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="font-medium">{projectLocation}</span>
          </div>
        )}

        {/* Navigation buttons with improved styling */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-xl
                       bg-black/60 text-white hover:bg-gold-500 backdrop-blur-md
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       border border-white/10 hover:border-gold-400 shadow-lg
                       hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl
                       bg-black/60 text-white hover:bg-gold-500 backdrop-blur-md
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       border border-white/10 hover:border-gold-400 shadow-lg
                       hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter with improved styling */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-md
                        text-white text-sm rounded-xl border border-white/10 font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip with improved styling */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 p-3
                        bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-10">
          {images.slice(0, 5).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-1 aspect-[3/2] rounded-lg overflow-hidden transition-all duration-300 ${
                idx === currentIndex
                  ? 'ring-2 ring-gold-400 scale-105 shadow-lg shadow-gold-400/30'
                  : 'opacity-50 hover:opacity-90 hover:scale-102'
              }`}
            >
              <Image
                src={img.src}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Compact Service Card Component
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-gold-500/10
                 transition-all duration-500 overflow-hidden border border-white/10
                 hover:border-gold-400/30 hover:bg-white/15 hover:-translate-y-1"
    >
      {/* Gradient header with glow effect */}
      <div className={`relative p-5 bg-gradient-to-r ${service.color} text-white overflow-hidden`}>
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <div className="relative flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-inner">
            {service.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">{service.title}</h3>
            <p className="text-white/80 text-sm mt-1 line-clamp-1">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Features list with enhanced styling */}
      <div className="p-5 bg-gradient-to-b from-white/5 to-transparent">
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: (index * 0.1) + (idx * 0.05) }}
              className="flex items-center gap-3 text-gray-200 text-sm group/item"
            >
              <div className="p-1 rounded-full bg-green-500/20 group-hover/item:bg-green-500/30 transition-colors">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              </div>
              <span className="group-hover/item:text-white transition-colors">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

/**
 * Service Group Row Component
 */
interface ServiceGroupRowProps {
  group: ServiceGroup;
  index: number;
  isReversed: boolean;
}

const ServiceGroupRow = ({ group, index, isReversed }: ServiceGroupRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
    >
      <div className={`flex flex-col gap-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
        {group.services.map((service, idx) => (
          <ServiceCard key={service.id} service={service} index={idx} />
        ))}
      </div>

      <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
        <ServiceImageGallery
          images={group.images}
          projectLocation={group.projectLocation}
        />
      </div>
    </motion.div>
  );
};

/**
 * Main Construction Section Component
 */
const ConstructionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      aria-labelledby="construction-heading"
    >
      {/* Dynamic Background with Construction Theme */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base gradient - dark sophisticated look */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Accent gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-gold-500/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-500/8 to-transparent" />

        {/* Glowing orbs for visual interest */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gold-400/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/3 blur-3xl" />

        {/* Blueprint-style corner accents */}
        <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-gold-500/20" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-gold-500/20" />
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-gold-500/10 rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="construction-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-500">
              {' '}Construction
            </span>
            {' '}Services
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            From site preparation to complex infrastructure systems, we deliver comprehensive
            construction solutions. View our real project work from California and Nevada.
          </p>
        </motion.div>

        <div className="space-y-12 lg:space-y-16">
          {serviceGroups.map((group, index) => (
            <ServiceGroupRow
              key={group.id}
              group={group}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Build?
            </h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
              From site preparation to complex infrastructure installation, our proven expertise
              and comprehensive project portfolio demonstrate our ability to deliver extraordinary results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/construction"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600
                         text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl
                         hover:from-gold-500 hover:to-gold-700
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
                Get an Estimate
              </motion.a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm">
                <span className="font-semibold">License #1099543</span>  •
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
