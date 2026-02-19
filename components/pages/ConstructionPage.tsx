'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  HardHat,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Truck,
  Target,
  Building,
  Wrench,
  MapPin,
  Maximize2,
  X
} from 'lucide-react';

/**
 * Construction Page Component
 * Uses different images than ConstructionSection (homepage)
 */

interface ProjectImage {
  src: string;
  alt: string;
}

interface ConstructionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  color: string;
  images: ProjectImage[];
  projectLocation?: string;
}

const constructionServices: ConstructionService[] = [
  {
    id: 'site-development',
    title: 'Site Development & Preparation',
    description: 'Comprehensive site preparation, excavation, grading, and access development.',
    icon: <Building className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    projectLocation: 'Bodega Bay, CA',
    images: [
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-2.jpg', alt: 'Heavy equipment grading' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-3.jpg', alt: 'Site excavation work' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-4.jpg', alt: 'Land clearing operations' },
      { src: '/images/projects/Bodega-Bay-CA/case-1.jpg', alt: 'Equipment at work site' }
    ],
    services: [
      'Multi-phase site excavation and grading',
      'Access road and pathway construction',
      'Utility corridor preparation and installation',
      'Environmental compliance and monitoring',
      'Drainage system design and implementation',
      'Site preparation for multiple structures',
      'Soil stabilization and compaction',
      'Safety protocol management throughout all phases'
    ]
  },
  {
    id: 'infrastructure-systems',
    title: 'Infrastructure & Utility Systems',
    description: 'Advanced infrastructure installation including telecommunications and utilities.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    projectLocation: 'Oregon',
    images: [
      { src: '/images/projects/Oregon-AV-Station/trench/trench-3.jpg', alt: 'Utility trenching' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-7.jpg', alt: 'Underground systems' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-10.jpg', alt: 'Infrastructure installation' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-12.jpg', alt: 'Completed infrastructure' }
    ],
    services: [
      'Telecommunications tower installation and integration',
      'Advanced utility system planning and installation',
      'Precision equipment placement and commissioning',
      'Underground infrastructure development',
      'Communications network deployment and testing',
      'Power system installation with backup capabilities',
      'Environmental monitoring system integration',
      'Complete system commissioning and certification'
    ]
  },
  {
    id: 'concrete-construction',
    title: 'Concrete Foundations & Structures',
    description: 'Expert concrete construction including foundations and high-strength applications.',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    projectLocation: 'California',
    images: [
      { src: '/images/projects/TractorConcrete.jpg', alt: 'Concrete equipment operations' },
      { src: '/images/projects/PoolConcrete.jpg', alt: 'Concrete pool construction' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-17.webp', alt: 'Foundation work' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp', alt: 'Concrete installation' }
    ],
    services: [
      'Deep foundation design and installation',
      'Structural concrete placement and finishing',
      'Reinforcement steel fabrication and installation',
      'High-strength concrete specification and testing',
      'Precision forming, pouring, and finishing',
      'Comprehensive quality control and testing',
      'Seismic resistance engineering and implementation',
      'Load-bearing structural element construction'
    ]
  },
  {
    id: 'equipment-installation',
    title: 'Heavy Equipment & Transport',
    description: 'Specialized heavy equipment transportation, rigging, and precision installation.',
    icon: <Truck className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    projectLocation: 'Bodega Bay, CA',
    images: [
      { src: '/images/projects/Bodega-Bay-CA/transport-2.jpg', alt: 'Equipment transport' },
      { src: '/images/projects/Bodega-Bay-CA/bulldozer-transport.jpg', alt: 'Heavy machinery moving' },
      { src: '/images/projects/Bodega-Bay-CA/Bulldozer.jpg', alt: 'Construction equipment' },
      { src: '/images/projects/transport-hero.jpg', alt: 'Transport operations' }
    ],
    services: [
      'Heavy machinery transport and logistics coordination',
      'Precision equipment placement using advanced rigging',
      'Specialized crane operations with certified operators',
      'Comprehensive safety protocol implementation',
      'Equipment commissioning and startup support',
      'Site preparation specifically for heavy installations',
      'Load calculation and structural engineering verification',
      'Post-installation testing and performance verification'
    ]
  },
  {
    id: 'specialized-services',
    title: 'Specialized Construction Services',
    description: 'Technical construction services including precision cutting and drilling.',
    icon: <Wrench className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
    projectLocation: 'Winnemucca, NV',
    images: [
      { src: '/images/projects/Winnemucca-NV/trench-2.jpg', alt: 'Precision trenching' },
      { src: '/images/projects/Winnemucca-NV/trench-7.jpg', alt: 'Utility installation' },
      { src: '/images/projects/Winnemucca-NV/trench-10.jpg', alt: 'Excavation work' },
      { src: '/images/projects/Bodega-Bay-CA/jack-hammer.jpg', alt: 'Concrete cutting' }
    ],
    services: [
      'Diamond blade concrete cutting and precision sawing',
      'Core drilling for utilities and structural penetrations',
      'Controlled demolition with dust and debris management',
      'Grading and excavation for specialized applications',
      'Equipment mounting and anchor installation',
      'Utility trenching and backfill operations',
      'Surface preparation and finishing work',
      'Emergency repair and restoration services'
    ]
  }
];

const safetyFeatures = [
  {
    title: 'Comprehensive Planning',
    description: 'Every project begins with detailed safety planning and risk assessment.',
    icon: <Shield className="w-8 h-8" />,
    stat: { value: '100%', label: 'Projects Safety Planned' }
  },
  {
    title: 'Expert Teams',
    description: 'Certified professionals with decades of experience.',
    icon: <HardHat className="w-8 h-8" />,
    stat: { value: '15+', label: 'Years Average Experience' }
  },
  {
    title: 'Quality Standards',
    description: 'Exceeding industry standards with comprehensive QC.',
    icon: <CheckCircle className="w-8 h-8" />,
    stat: { value: '99.9%', label: 'Quality Score' }
  },
  {
    title: 'Timely Execution',
    description: 'Projects completed on schedule without compromise.',
    icon: <Clock className="w-8 h-8" />,
    stat: { value: '98%', label: 'On-Time Delivery' }
  }
];

/**
 * Project Image Gallery Component
 */
interface ImageGalleryProps {
  images: ProjectImage[];
  projectLocation?: string;
}

const ImageGallery = ({ images, projectLocation }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="relative group rounded-xl overflow-hidden bg-gray-900 shadow-xl">
        <div className="aspect-video relative">
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
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {projectLocation && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5
                          bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>{projectLocation}</span>
            </div>
          )}

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

          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 rounded-full
                     bg-black/50 text-white hover:bg-gold-500 backdrop-blur-sm
                     opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {images.length > 1 && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm
                          text-white text-sm rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-1 p-2 bg-black/40">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-1 aspect-[3/2] rounded overflow-hidden transition-all ${
                  idx === currentIndex
                    ? 'ring-2 ring-gold-400'
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

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white
                       hover:bg-gold-500 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full
                           bg-white/10 text-white hover:bg-gold-500 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full
                           bg-white/10 text-white hover:bg-gold-500 transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * Expandable Service Card Component
 */
interface ServiceCardProps {
  service: ConstructionService;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard = ({ service, index, isExpanded, onToggle }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
    >
      <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              {service.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-white/90 text-sm mt-1">{service.description}</p>
            </div>
          </div>
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            aria-expanded={isExpanded}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6">
          <div className="mb-6">
            <ImageGallery
              images={service.images}
              projectLocation={service.projectLocation}
            />
          </div>

          <h4 className="font-semibold text-gray-900 mb-4">Services Included:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.services.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.03 }}
                className="flex items-start gap-3 text-gray-600"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Main Construction Page Component
 */
const ConstructionPage = () => {
  const [expandedService, setExpandedService] = useState<string>('site-development');
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const handleServiceToggle = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? '' : serviceId);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden"
      >
        <Image
          src="/images/projects/Bodega-Bay-CA/construction-dozer.jpg"
          alt="Construction services"
          fill
          className="absolute inset-0 object-cover opacity-40 z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[3]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Construction
              </span>
              <br />Excellence
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 drop-shadow-md">
              From large-scale site development to precision equipment installation,
              we deliver comprehensive construction solutions across California, Nevada, and Oregon.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600
                         text-white font-medium rounded-xl transition-all shadow-lg"
              >
                Get an Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white
                         text-white hover:bg-white hover:text-gray-900 font-medium
                         rounded-xl transition-colors"
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Safety & Quality Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Safety & Quality Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our construction services are built on an unwavering foundation of safety excellence
              and quality assurance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-gold-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <div className="bg-gold-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-gold-600">{feature.stat.value}</div>
                  <div className="text-xs text-gold-700">{feature.stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Construction Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From site development to specialized equipment installation, our comprehensive
              service portfolio covers every aspect of modern construction.
            </p>
          </motion.div>

          <div className="space-y-6">
            {constructionServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isExpanded={expandedService === service.id}
                onToggle={() => handleServiceToggle(service.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* License & Insurance Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Licensed, Bonded & Insured
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Your confidence and project protection are our highest priorities.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Shield className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">License #1099543</h3>
                  <p className="text-gray-300">Fully licensed California contractor</p>
                </div>
                <div>
                  <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Bonded & Insured</h3>
                  <p className="text-gray-300">Comprehensive coverage for your protection</p>
                </div>
                <div>
                  <Target className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">We Beat Estimates</h3>
                  <p className="text-gray-300">Forward your estimate - we&apos;ll compete!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-gold-400 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Vision?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              From comprehensive site development to precision equipment installation,
              our proven expertise delivers exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gold-600
                         hover:bg-gray-50 font-medium rounded-xl transition-colors shadow-lg"
              >
                Get an Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white
                         text-white hover:bg-white hover:text-gold-600 font-medium
                         rounded-xl transition-colors"
              >
                View Our Projects
              </motion.a>
            </div>
            <div className="mt-8 text-white/80">
              <p className="text-lg font-semibold">License #1099543 | Bonded & Insured</p>
              <p className="text-sm mt-2">1161 Brick and Tile Circle, Stockton, CA 95206 | (925) 305-5980</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionPage;
