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
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings,
  Telescope,
  Wrench,
  MapPin,
  Maximize2,
  X
} from 'lucide-react';

/**
 * Enhanced Communications Page Component
 *
 * Comprehensive showcase of all communication services with:
 * - Real project image galleries
 * - Interactive service exploration
 * - Professional presentation with premium styling
 * - Lightbox view for project images
 */

interface ProjectImage {
  src: string;
  alt: string;
}

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  color: string;
  images: ProjectImage[];
  projectLocation?: string;
}

const communicationServices: ServiceDetail[] = [
  {
    id: 'network-services',
    title: 'Network Services',
    description: 'Comprehensive network infrastructure and installation services.',
    icon: <Network className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    projectLocation: 'Sparks, NV',
    images: [
      { src: '/images/projects/Sparks-NV/tower-tree-1.jpg', alt: 'Cell tower installation' },
      { src: '/images/projects/Sparks-NV/tower-tree-2.jpg', alt: 'Network tower work' },
      { src: '/images/projects/Sparks-NV/tower-base.jpg', alt: 'Tower base installation' },
      { src: '/images/projects/Sparks-NV/tree-tower-network.jpg', alt: 'Network infrastructure' }
    ],
    services: [
      'Radio Installation & Remote Monitoring',
      'DC Power & Battery Systems with Alarming',
      'Structured Cable & CRAN Integration',
      'Generator Installation & Turn-up',
      'Rack and Stack Equipment Services',
      'Construction Services, Climbing & Rigging',
      'Civil & Electrical Infrastructure',
      'Equipment Engineering & Design'
    ]
  },
  {
    id: 'wireless-solutions',
    title: 'Wireless Solutions',
    description: 'Advanced wireless infrastructure for all major carriers.',
    icon: <Radio className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    projectLocation: 'Sparks, NV',
    images: [
      { src: '/images/projects/Sparks-NV/tower-tree-install.jpg', alt: 'Tower installation' },
      { src: '/images/projects/Sparks-NV/tree-tower.jpg', alt: 'Camouflage tower' },
      { src: '/images/projects/Sparks-NV/tower-tree-4.jpg', alt: 'Wireless installation' },
      { src: '/images/projects/Sparks-NV/tower-tree-6.jpg', alt: 'Cell tower' },
      { src: '/images/projects/Sparks-NV/tower-tree-7.jpg', alt: 'Tower equipment' }
    ],
    services: [
      'Installation & Maintenance for Verizon, T-Mobile, AT&T, Dish Networks',
      'RF Installation, Testing & 5G Equipment Installation',
      'Internet Backhaul, Wireless Backhaul & Broadband Solutions',
      'C-Band Solutions & RAN Implementation',
      'Low Voltage Systems & Generator Installation',
      'Macro Lines & Antennas Installation/Repair',
      'Small Cell Tower Installation',
      'Antenna, Coax & Hybrid Cabling Installation',
      'PIM, Sweep & OTDR Testing',
      'Decommission & Demolition Services'
    ]
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    description: 'Data center and network infrastructure solutions.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    projectLocation: 'Oregon',
    images: [
      { src: '/images/projects/Oregon-AV-Station/trench/trench-pipes.jpg', alt: 'Infrastructure cables' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-1.jpg', alt: 'Underground infrastructure' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-5.jpg', alt: 'Cable installation' },
      { src: '/images/projects/Oregon-AV-Station/trench/trench-card.jpg', alt: 'Network infrastructure' }
    ],
    services: [
      'Data Centers/CO Rack and Stack',
      'Power Whips Installation',
      'Cabling Infrastructure & Network Services',
      'DAS Wireless Systems',
      'Fiber Optic Splicing & Terminating',
      'Outside Plant Public Safety 5G',
      'In-building Head-end Integration'
    ]
  },
  {
    id: 'smart-technology',
    title: 'Smart Technology & IoT',
    description: 'Cutting-edge smart technology and IoT solutions.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    projectLocation: 'Antioch, CA',
    images: [
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-1.webp', alt: 'EV charging station' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-3.webp', alt: 'EV charger installation' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-5.webp', alt: 'Smart charging point' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-8.webp', alt: 'EV infrastructure' },
      { src: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-12.webp', alt: 'Charging station' }
    ],
    services: [
      'EV Charging Stations & Clean Energy Solutions',
      'Intrusion Detection & Video Surveillance',
      'IoT Device Installation & Optimization',
      'Public Safety Private 60 MHz, CBRS LTE',
      'Programming & Commissioning',
      'Camera Installation & Optimization'
    ]
  },
  {
    id: 'audio-visual',
    title: 'Audio/Visual Systems',
    description: 'Professional AV solutions for corporate and institutional environments.',
    icon: <Eye className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
    projectLocation: 'Oregon',
    images: [
      { src: '/images/projects/Oregon-AV-Station/AV-station.jpg', alt: 'AV station' },
      { src: '/images/projects/Oregon-AV-Station/AV-station/AvStation2.jpg', alt: 'AV equipment' },
      { src: '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-1.jpg', alt: 'AV installation' },
      { src: '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-2.jpg', alt: 'Completed AV system' }
    ],
    services: [
      'Control System Programming',
      'Audio DSP Programming',
      'Audio Systems Evaluation, Balancing & Calibration',
      'Broadband Fiber Connections',
      'Comprehensive Cabling Services (Audio, Broadcast, Control, Data, Voice, Video)',
      'Classroom Media Systems',
      'Command Centers & Mission Critical Systems',
      'Corporate Boardrooms',
      'Intercom Systems (Production & Wireless)',
      'Whole SMART Building Control & Monitoring',
      'Churches & Convention Centers'
    ]
  }
];

const additionalServices = [
  {
    id: 'testing-certification',
    title: 'Testing & Certification',
    icon: <Settings className="w-6 h-6" />,
    services: [
      'PIM Sweep Testing',
      'Fiber Testing & OTDR',
      'COWs/COLTs & RATs Building/Deployment',
      'Troubleshooting (All Areas)',
      'Site Surveys & Power Audits'
    ]
  },
  {
    id: 'support-maintenance',
    title: 'Support & Maintenance',
    icon: <Wrench className="w-6 h-6" />,
    services: [
      'Update & Maintain Site Records (SiteTracker, FUZE)',
      'Asset Tracking & Management Services',
      'Decommissioning of Old Equipment',
      'Bucket Truck Add/Mod Services for 5G Sites',
      'New Build Ground Based Work (ISP)'
    ]
  },
  {
    id: 'design-engineering',
    title: 'A&E Services',
    icon: <Telescope className="w-6 h-6" />,
    services: [
      'As-built Drawings',
      'Site Surveys & Zoning Drawings',
      'Construction Drawings (Raw Land, Collocation, Roof Top)',
      'FAA Height Verification Drawings',
      'Lease Exhibits & Easement Drawings',
      'Modification & Technology Upgrade Drawings',
      'Structural & Electrical Analysis/Evaluation'
    ]
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
        {/* Main Image */}
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

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Location Badge */}
          {projectLocation && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5
                          bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
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

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 rounded-full
                     bg-black/50 text-white hover:bg-gold-500 backdrop-blur-sm
                     opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm
                          text-white text-sm rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-1 p-2 bg-black/40">
            {images.slice(0, 5).map((img, idx) => (
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
            {images.length > 5 && (
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="flex-1 aspect-[3/2] rounded bg-gray-800 flex items-center justify-center
                         text-white text-sm hover:bg-gold-500 transition-colors"
              >
                +{images.length - 5}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
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
 * Expandable Service Card Component with Gallery
 */
interface ServiceCardProps {
  service: ServiceDetail;
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
      {/* Service Header */}
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

      {/* Expandable Content */}
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
          {/* Image Gallery */}
          <div className="mb-6">
            <ImageGallery
              images={service.images}
              projectLocation={service.projectLocation}
            />
          </div>

          {/* Services List */}
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
 * Main Communications Page Component
 */
const CommunicationsPage = () => {
  const [expandedService, setExpandedService] = useState<string>('network-services');
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
          src="/images/projects/Sparks-NV/tree-tower-network.jpg"
          alt="Communications Infrastructure"
          fill
          className="absolute inset-0 object-cover opacity-30 z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-[2]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[3]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Advanced
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Communications
              </span>
              <br />Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Cutting-edge telecommunications infrastructure, network solutions, and smart
              technology services. View our real project work from across California, Nevada, and Oregon.
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
                Get a Quote
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
                Explore Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Communication Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From network infrastructure to smart technology integration, we provide
              end-to-end communication solutions with proven results.
            </p>
          </motion.div>

          <div className="space-y-6">
            {communicationServices.map((service, index) => (
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

      {/* Additional Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Supporting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete support ecosystem to ensure optimal performance and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-gold-400/30
                         hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gold-100 rounded-xl text-gold-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <ul className="space-y-2">
                  {service.services.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Certification Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Training & Certification
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Professional development and certification programs for field technicians
              and technical growth opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Integration/Installation Training',
                  description: 'Comprehensive training on system integration and installation best practices.',
                  icon: <Wrench className="w-8 h-8" />
                },
                {
                  title: '5G Technologies',
                  description: 'Advanced certification in 5G deployment, testing, and optimization.',
                  icon: <Smartphone className="w-8 h-8" />
                },
                {
                  title: 'Structured Cabling & Telecom Standards',
                  description: 'Industry-standard certification in structured cabling and telecommunications.',
                  icon: <Network className="w-8 h-8" />
                }
              ].map((training, index) => (
                <motion.div
                  key={training.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="text-gold-400 mb-4">{training.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{training.title}</h3>
                  <p className="text-gray-300 text-sm">{training.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600
                         text-white font-medium rounded-xl transition-all shadow-lg"
              >
                Learn About Training
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>
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
              Ready to Transform Your Communications Infrastructure?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Let&apos;s discuss how our comprehensive communication solutions can enhance
              your connectivity and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gold-600
                         hover:bg-gray-50 font-medium rounded-xl transition-colors shadow-lg"
              >
                Get Started Today
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
                View Our Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommunicationsPage;
