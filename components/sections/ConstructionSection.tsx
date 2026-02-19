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
 * Enhanced Construction Section Component for Homepage
 *
 * Premium showcase of construction services with:
 * - 2 service cards paired with each image gallery
 * - Real project images from actual construction work
 * - Professional presentation with gold accents
 * - Smooth animations and transitions
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
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-1.jpg', alt: 'Heavy bulldozer grading work' },
      { src: '/images/projects/Bodega-Bay-CA/construction-dozer.jpg', alt: 'Site development excavation' },
      { src: '/images/projects/Bodega-Bay-CA/trench-1.jpg', alt: 'Trenching for utilities' },
      { src: '/images/projects/Bodega-Bay-CA/jack-hammer-1.jpg', alt: 'Concrete demolition work' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-transport.jpg', alt: 'Equipment mobilization' }
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
    projectLocation: 'Winnemucca, NV & Oregon',
    images: [
      { src: '/images/projects/Winnemucca-NV/trench-1.jpg', alt: 'Precision trenching operations' },
      { src: '/images/projects/Winnemucca-NV/trench-5.jpg', alt: 'Underground utility installation' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-pipes.jpg', alt: 'Pipe installation in trench' },
      { src: '/images/projects/Oregon-AV-Station/site/site-1.jpg', alt: 'Construction site preparation' },
      { src: '/images/projects/Winnemucca-NV/trench-10.jpg', alt: 'Completed trench work' }
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
    <div className="relative group rounded-2xl overflow-hidden bg-gray-900 shadow-2xl h-full">
      {/* Main Image */}
      <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Location Badge */}
        {projectLocation && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5
                        bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>{projectLocation}</span>
          </div>
        )}

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full
                       bg-black/50 text-white hover:bg-gold-500 backdrop-blur-sm
                       opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full
                       bg-black/50 text-white hover:bg-gold-500 backdrop-blur-sm
                       opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm
                        text-white text-sm rounded-full">
            {currentIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 bg-gradient-to-t from-black/80 to-transparent pt-8">
          {images.slice(0, 5).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-1 aspect-[3/2] rounded-lg overflow-hidden transition-all duration-200 ${
                idx === currentIndex
                  ? 'ring-2 ring-gold-400 scale-105'
                  : 'opacity-60 hover:opacity-100'
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
      className="bg-white rounded-xl shadow-lg hover:shadow-xl
                 transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Service Header */}
      <div className={`p-4 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-lg">
            {service.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold">{service.title}</h3>
            <p className="text-white/90 text-xs mt-0.5 line-clamp-1">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Service Features */}
      <div className="p-4">
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: (index * 0.1) + (idx * 0.05) }}
              className="flex items-center gap-2 text-gray-600 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
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
      {/* Service Cards Column */}
      <div className={`flex flex-col gap-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
        {group.services.map((service, idx) => (
          <ServiceCard key={service.id} service={service} index={idx} />
        ))}
      </div>

      {/* Image Gallery Column */}
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="construction-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="construction-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Construction
            </span>
            {' '}Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From site preparation to complex infrastructure systems, we deliver comprehensive
            construction solutions. View our real project work from California, Nevada, and Oregon.
          </p>
        </motion.div>

        {/* Service Groups */}
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

        {/* Enhanced Call to Action */}
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

            {/* License Information */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm">
                <span className="font-semibold">Licensed & Insured</span> • License #1099543 •
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
