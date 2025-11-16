'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HardHat,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Clock,
  Truck,
  Target,
  Building,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';

/**
 * Construction Page Component
 * 
 * Comprehensive showcase of all construction services with:
 * - Real project images and detailed galleries
 * - Interactive service exploration with expandable sections
 * - Professional safety emphasis with actual project examples
 * - Quality assurance highlights with specifications
 */

interface ConstructionService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  services: string[];
  color: string;
  // projectImages: string[];
  // projectName: string;
  specifications?: {
    [key: string]: string;
  };
}

const constructionServices: ConstructionService[] = [
  {
    id: 'site-development',
    title: 'Site Development & Preparation',
    description: 'Comprehensive site preparation, excavation, grading, and access development for all types of construction projects.',
    icon: <Building className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    // projectName: 'Large-Scale Site Development',
    // projectImages: [
    //   '/images/projects/IMG_20250522_183647 (1).jpg',
    //   '/images/projects/IMG_20250522_183647 (2).jpg',
    //   '/images/projects/IMG_20250522_183647 (3).jpg',
    //   '/images/projects/IMG_20250522_183647 (4).jpg',
    //   '/images/projects/IMG_20250522_183648 (2).jpg',
    //   '/images/projects/IMG_20250522_183648 (3).jpg'
    // ],
    services: [
      'Multi-phase site excavation and grading',
      'Access road and pathway construction',
      'Utility corridor preparation and installation',
      'Environmental compliance and monitoring',
      'Drainage system design and implementation',
      'Site preparation for multiple structures',
      'Soil stabilization and compaction',
      'Safety protocol management throughout all phases'
    ],
    specifications: {
      'Site Capacity': '100+ acre developments',
      'Excavation Volume': '500,000+ cubic yards',
      'Access Roads': 'Multi-lane construction',
      'Environmental Standards': 'Full regulatory compliance',
      'Completion Timeline': '12-24 months',
      'Safety Record': 'Zero incidents across all phases'
    }
  },
  {
    id: 'infrastructure-systems',
    title: 'Infrastructure & Utility Systems',
    description: 'Advanced infrastructure installation including telecommunications, utilities, and specialized systems integration.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    // projectName: 'Infrastructure Systems Installation',
    // projectImages: [
    //   '/images/projects/IMG_20250522_183648 (8).jpg',
    //   '/images/projects/IMG_20250522_183648 (10).jpg',
    //   '/images/projects/IMG_20250522_183648 (11).jpg',
    //   '/images/projects/IMG_20250522_183648 (12).jpg',
    //   '/images/projects/IMG_20250522_183649 (1).jpg',
    //   '/images/projects/IMG_20250522_183649 (2).jpg'
    // ],
    services: [
      'Telecommunications tower installation and integration',
      'Advanced utility system planning and installation',
      'Precision equipment placement and commissioning',
      'Underground infrastructure development',
      'Communications network deployment and testing',
      'Power system installation with backup capabilities',
      'Environmental monitoring system integration',
      'Complete system commissioning and certification'
    ],
    specifications: {
      'Tower Installations': '200+ feet capacity',
      'Equipment Handling': '100+ ton capacity',
      'Underground Systems': '50+ mile networks',
      'Power Systems': '1MW+ installations',
      'Communications': 'Multi-carrier infrastructure',
      'Precision Tolerance': '±2mm accuracy',
      'System Reliability': '99.99% uptime guarantee'
    }
  },
  {
    id: 'concrete-construction',
    title: 'Concrete Foundations & Structures',
    description: 'Expert concrete construction including foundations, structural elements, and specialized high-strength applications.',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    // projectName: 'Advanced Concrete Construction',
    // projectImages: [
    //   '/images/projects/IMG_20250522_183649 (11).jpg',
    //   '/images/projects/IMG_20250522_183649 (12).jpg',
    //   '/images/projects/IMG_20250522_183649 (13).jpg',
    //   '/images/projects/IMG_20250522_183649 (14).jpg',
    //   '/images/projects/IMG_20250522_183649 (15).jpg',
    //   '/images/projects/IMG_20250522_183649 (16).jpg'
    // ],
    services: [
      'Deep foundation design and installation',
      'Structural concrete placement and finishing',
      'Reinforcement steel fabrication and installation',
      'High-strength concrete specification and testing',
      'Precision forming, pouring, and finishing',
      'Comprehensive quality control and testing',
      'Seismic resistance engineering and implementation',
      'Load-bearing structural element construction'
    ],
    specifications: {
      'Foundation Depth': '20+ feet deep foundations',
      'Concrete Strength': '6000+ PSI high-strength',
      'Reinforcement': 'Grade 80 rebar systems',
      'Load Capacity': '1000+ tons per foundation',
      'Surface Finish': 'Architectural grade quality',
      'Quality Standards': 'Continuous monitoring and testing',
      'Curing Methods': 'Controlled environment processes'
    }
  },
  {
    id: 'equipment-installation',
    title: 'Heavy Equipment & Specialized Installation',
    description: 'Specialized heavy equipment transportation, rigging, and precision installation for complex industrial projects.',
    icon: <Truck className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    // projectName: 'Equipment Installation & Transport',
    // projectImages: [
    //   '/images/projects/IMG_20250522_183649 (23).jpg',
    //   '/images/projects/IMG_20250522_183649 (24).jpg',
    //   '/images/projects/IMG_20250522_183649 (25).jpg',
    //   '/images/projects/IMG_20250522_183649 (26).jpg',
    //   '/images/projects/IMG_20250522_183649 (27).jpg',
    //   '/images/projects/IMG_20250522_183649.jpg'
    // ],
    services: [
      'Heavy machinery transport and logistics coordination',
      'Precision equipment placement using advanced rigging',
      'Specialized crane operations with certified operators',
      'Comprehensive safety protocol implementation',
      'Equipment commissioning and startup support',
      'Site preparation specifically for heavy installations',
      'Load calculation and structural engineering verification',
      'Post-installation testing and performance verification'
    ],
    specifications: {
      'Maximum Load': '500+ tons capacity',
      'Crane Operations': '1000-ton mobile cranes',
      'Placement Precision': '±1mm final positioning',
      'Transport Capability': '1000+ mile range',
      'Equipment Diversity': '50+ different system types',
      'Safety Certifications': 'All current and maintained',
      'Success Rate': '100% successful installations'
    }
  },
  {
    id: 'specialized-services',
    title: 'Specialized Construction Services',
    description: 'Technical construction services including precision cutting, drilling, demolition, and specialized installation work.',
    icon: <Wrench className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
    // projectName: 'Specialized Technical Work',
    // projectImages: [
    //   '/images/projects/IMG_20250522_183649 (17).jpg',
    //   '/images/projects/IMG_20250522_183649 (18).jpg',
    //   '/images/projects/IMG_20250522_183649 (19).jpg',
    //   '/images/projects/IMG_20250522_183649 (20).jpg',
    //   '/images/projects/IMG_20250522_183649 (21).jpg',
    //   '/images/projects/IMG_20250522_183649 (22).jpg'
    // ],
    services: [
      'Diamond blade concrete cutting and precision sawing',
      'Core drilling for utilities and structural penetrations',
      'Controlled demolition with dust and debris management',
      'Grading and excavation for specialized applications',
      'Equipment mounting and anchor installation',
      'Utility trenching and backfill operations',
      'Surface preparation and finishing work',
      'Emergency repair and restoration services'
    ],
    specifications: {
      'Cutting Capacity': '36+ inch concrete',
      'Core Drilling': '48+ inch diameter capability',
      'Precision Level': '±0.5mm accuracy',
      'Demolition': 'Controlled and environmentally safe',
      'Response Time': '24/7 emergency availability',
      'Equipment': 'Latest diamond technology',
      'Dust Control': 'HEPA filtration systems'
    }
  }
];

const safetyFeatures = [
  {
    title: 'Comprehensive Planning',
    description: 'Every project begins with detailed safety planning, risk assessment, and environmental compliance review.',
    icon: <Shield className="w-8 h-8" />,
    stat: { value: '100%', label: 'Projects Safety Planned' }
  },
  {
    title: 'Expert Teams',
    description: 'Certified professionals with decades of experience and continuous safety training.',
    icon: <HardHat className="w-8 h-8" />,
    stat: { value: '15+', label: 'Years Average Experience' }
  },
  {
    title: 'Quality Standards',
    description: 'Exceeding industry standards with comprehensive quality control and testing protocols.',
    icon: <CheckCircle className="w-8 h-8" />,
    stat: { value: '99.9%', label: 'Quality Score' }
  },
  {
    title: 'Timely Execution',
    description: 'Projects completed on schedule without compromising safety or quality standards.',
    icon: <Clock className="w-8 h-8" />,
    stat: { value: '98%', label: 'On-Time Delivery' }
  }
];

/**
 * Expandable Service Card Component with Project Gallery
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
  // const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Service Header */}
      <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
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
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${service.title} details`}
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
        {/* <div className="p-6"> */}
        {/* Project Gallery */}
        {/* <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 text-gold-500 mr-2" />
              {service.projectName} - Project Gallery
            </h4> */}

        {/* Main Image */}
        {/* <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
              <OptimizedImage
                src={service.projectImages[selectedImageIndex]}
                alt={`${service.projectName} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              /> */}

        {/* Image Navigation */}
        {/* {service.projectImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => 
                      prev === 0 ? service.projectImages.length - 1 : prev - 1
                    )}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                             bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => 
                      (prev + 1) % service.projectImages.length
                    )}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                             bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
                  
                  {/* Image Counter */}
        {/* <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {selectedImageIndex + 1} / {service.projectImages.length}
                  </div>
                </>
              )}
            </div> */}

        {/* Thumbnail Navigation */}
        {/* {service.projectImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {service.projectImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                      idx === selectedImageIndex ? 'border-gold-400' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )} */}
        {/* </div> */}

        {/* Services List */}
        <h4 className="font-semibold text-gray-900 mb-4">Services Included:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {service.services.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 text-gray-600"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Specifications */}
        {service.specifications && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Technical Specifications:</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(service.specifications).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <dt className="font-medium text-gray-900">{key}:</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {/* </div> */}
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
                                src="/images/projects/maintenance.jpg"
                                alt="Construction Hero Image"
                                fill
                                className="absolute inset-0 object-cover opacity-30 z-0"
                                />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Construction
              </span>
              <br />Excellence
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              From large-scale site development to precision equipment installation,
              we deliver comprehensive construction solutions with proven expertise,
              safety excellence, and exceptional results across all project types.
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
                className="inline-flex items-center px-8 py-3 bg-gold-400 hover:bg-gold-500 
                         text-white font-medium rounded-lg transition-colors shadow-lg"
              >
                Get Free Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 border-2 border-white
                         text-white hover:bg-white hover:text-gray-900 font-medium 
                         rounded-lg transition-colors"
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
              Our construction services are built on an unwavering foundation of safety excellence,
              quality assurance, and proven results demonstrated across hundreds of successful projects.
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
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl 
                         transition-shadow duration-300"
              >
                <div className="text-gold-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <div className="bg-gold-50 rounded-lg p-3">
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
              service portfolio covers every aspect of modern construction with proven results.
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
              Your confidence and project protection are our highest priorities. We maintain
              all necessary licenses, comprehensive bonding, and full insurance coverage.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Shield className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">License #1099543</h3>
                  <p className="text-gray-300">Fully licensed California contractor with proven compliance record</p>
                </div>
                <div>
                  <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Bonded & Insured</h3>
                  <p className="text-gray-300">Comprehensive coverage and bonding for complete project protection</p>
                </div>
                <div>
                  <Target className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">We Beat Estimates</h3>
                  <p className="text-gray-300">Forward your estimate - we&apos;ll provide a competitive alternative!</p>
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
              our proven expertise and extensive project portfolio demonstrate our ability
              to deliver exceptional results across all construction disciplines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gold-600 
                         hover:bg-gray-50 font-medium rounded-lg transition-colors shadow-lg"
              >
                Get Free Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white
                         text-white hover:bg-white hover:text-gold-600 font-medium 
                         rounded-lg transition-colors"
              >
                View Our Projects
              </motion.a>
            </div>
            <div className="mt-8 text-white/80">
              <p className="text-lg font-semibold">License #1099543 | Bonded & Insured</p>
              <p className="text-sm mt-2">946 Lincoln Ave, San Jose, CA 95125 | (925) 305-5980</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionPage;