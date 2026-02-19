'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Network,
  Radio,
  Zap,
  Eye,
  Cpu,
  Smartphone,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';

/**
 * Communications Section Component for Homepage
 * Uses unique images not repeated in CommunicationsPage
 */

interface CommunicationService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

interface ServiceGroup {
  id: string;
  services: CommunicationService[];
  images: { src: string; alt: string }[];
  projectLocation: string;
}

const serviceGroups: ServiceGroup[] = [
  {
    id: 'group-1',
    services: [
      {
        id: 'network-infrastructure',
        title: 'Network Infrastructure',
        description: 'Comprehensive network solutions from data centers to fiber optic systems.',
        icon: <Network className="w-7 h-7" />,
        features: [
          'Data Center Rack & Stack',
          'Fiber Optic Splicing & Termination',
          'Structured Cabling Systems',
          'DAS Wireless Solutions'
        ],
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 'wireless-solutions',
        title: 'Wireless Solutions',
        description: 'Advanced wireless infrastructure for all major carriers and technologies.',
        icon: <Radio className="w-7 h-7" />,
        features: [
          'Verizon, T-Mobile, AT&T, Dish Networks',
          '5G & RF Installation',
          'Small Cell & Macro Tower Solutions',
          'C-Band & Broadband Implementation'
        ],
        color: 'from-green-500 to-green-600'
      }
    ],
    projectLocation: 'Sparks, NV',
    images: [
      { src: '/images/projects/Sparks-NV/tree-tower-network.jpg', alt: 'Completed cell tower with network equipment' },
      { src: '/images/projects/Sparks-NV/tower-tree-install.jpg', alt: 'Tower installation in progress' },
      { src: '/images/projects/Sparks-NV/tower-base.jpg', alt: 'Tower foundation construction' },
      { src: '/images/projects/Sparks-NV/tree-post.jpg', alt: 'Utility post installation' },
      { src: '/images/projects/Sparks-NV/tower-tree-1.jpg', alt: 'Cell tower camouflage design' }
    ]
  },
  {
    id: 'group-2',
    services: [
      {
        id: 'smart-technology',
        title: 'Smart Technology',
        description: 'IoT, charging solutions, and intelligent building systems.',
        icon: <Zap className="w-7 h-7" />,
        features: [
          'EV Charging Stations',
          'IoT Device Installation',
          'Smart Building Controls',
          'Clean Energy Solutions'
        ],
        color: 'from-purple-500 to-purple-600'
      },
      {
        id: 'av-systems',
        title: 'Audio/Visual Systems',
        description: 'Professional AV solutions for corporate and mission-critical environments.',
        icon: <Eye className="w-7 h-7" />,
        features: [
          'Control System Programming',
          'Corporate Boardrooms',
          'Command Centers',
          'Whole Building Integration'
        ],
        color: 'from-orange-500 to-orange-600'
      }
    ],
    projectLocation: 'Antioch, CA & Oregon',
    images: [
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-39.webp', alt: 'EV charging station installation' },
      { src: '/images/projects/Oregon-AV-Station/AV-station.jpg', alt: 'Oregon AV station completed project' },
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-13.webp', alt: 'Multiple EV charging units installed' },
      { src: '/images/projects/Ripon-CA/ripon-ev-station-trench-11.webp', alt: 'AV station with EV infrastructure' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-49.webp', alt: 'Smart charging infrastructure' }
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {projectLocation && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5
                        bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
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

        {images.length > 1 && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm
                        text-white text-sm rounded-full">
            {currentIndex + 1}/{images.length}
          </div>
        )}
      </div>

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
  service: CommunicationService;
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
 * Main Communications Section Component
 */
const CommunicationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-900"
      aria-labelledby="communications-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="communications-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Advanced
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Communications
            </span>
            {' '}Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge telecommunications infrastructure and smart technology solutions
            for the connected world. See our real project work below.
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm
                        rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Comprehensive Support Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
              <div className="text-center p-4">
                <Cpu className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Testing & Certification</h4>
                <p className="text-sm">PIM Sweep, Fiber Testing, OTDR</p>
              </div>
              <div className="text-center p-4">
                <Network className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Professional Training</h4>
                <p className="text-sm">5G Technologies, Structured Cabling</p>
              </div>
              <div className="text-center p-4">
                <Smartphone className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">A&E Services</h4>
                <p className="text-sm">Design, Surveys, Construction Drawings</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/communications"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600
                     text-white font-medium transition-all shadow-lg hover:shadow-xl
                     hover:from-gold-500 hover:to-gold-700"
          >
            Explore All Communications Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunicationsSection;
