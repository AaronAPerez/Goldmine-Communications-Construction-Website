'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Tag,
  MapPin,
  X,
  Eye,
  ArrowUpRight,
  CheckCircle,
  Award,
  Settings
} from 'lucide-react';
import Image from 'next/image';

/**
 * Project Interface
 * Includes all necessary properties for project display
 */
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  // completionDate: string;
  thumbnailUrl: string;
  galleryImages: string[];
  features: string[];
  // client?: string;
  // duration?: string;
  // teamSize?: number;
  specifications?: {
    [key: string]: string;
  };
}

/**
 * Project data using all uploaded images
 * Organized by different types of construction work
 */
const projects: Project[] = [
  {
    id: 'antioch-ca-ev-charging',
    title: 'Antioch EV Charging Infrastructure',
    description: 'Complete EV charging station installation in Antioch, CA featuring underground trenching, conduit installation, and charging equipment deployment for sustainable transportation infrastructure.',
    category: 'Infrastructure',
    location: 'Antioch, CA',
    thumbnailUrl: '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp',
    galleryImages: [
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-1.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-3.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-4.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-7.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-9.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-16.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-17.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-20.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-25.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-29.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-31.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-33.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-39.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-41.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-43.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-45.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-49.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-55.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-61.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-66.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-71.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-76.webp',
      '/images/projects/antioch-ca-ev-charging/antioch-ca-ev-charging-station-81.webp',
    ],
    features: [
      'Underground trenching and conduit installation',
      'EV charging station deployment',
      'Electrical infrastructure integration',
      'Safety compliance and site preparation',
      'Multi-phase construction documentation',
      'Commercial-grade charging equipment'
    ],
    specifications: {
      'Project Type': 'EV Charging Infrastructure',
      'Installation Type': 'Commercial Grade',
      'Safety Standards': 'UL Listed & Code Compliant',
      'Documentation': '85+ timestamped progress photos'
    }
  },
  {
    id: 'av-charging-oregon',
    title: 'Oregon AV Charging Infrastructure',
    description: 'Comprehensive implementation of EV charging stations with advanced infrastructure support and safety systems for sustainable transportation.',
    category: 'Infrastructure',
    location: 'Chemult, Oregon',
    // completionDate: 'October, 2024',
    thumbnailUrl: '/images/projects/Oregon-AV-Station/AV-station/AvStation-card.jpg',
    galleryImages: [
      '/images/projects/Oregon-AV-Station/trench/trench-1.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-2.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-5.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-7.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-8.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-10.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-11.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-12.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-13.jpg',
      '/images/projects/Oregon-AV-Station/trench/trench-16.jpg',
      '/images/projects/Oregon-AV-Station/AV-station/Oregon-AvStations-hero.jpg',
      '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-1.jpg',
      '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-2.jpg',
      '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-7.jpg',
      '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-9.jpg',
      '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-10.jpg',
    ],
    features: [
      'High-capacity charging infrastructure',
      'Advanced safety systems integration',
      'Environmental compliance standards',
      'Complete site development and utilities',
      'Smart monitoring and control systems',
      'Future-ready scalable design'
    ],
    specifications: {
      'Charging Capacity': 'Up to 350kW DC Fast Charging',
      'Installation Type': 'Commercial Grade',
      'Safety Standards': 'UL Listed & Code Compliant',
      // 'Project Duration': '6 months'
    }
  },
  {
    id: 'ripon-ev-infrastructure',
    title: 'Ripon EV Station Infrastructure',
    description: 'Strategic underground utility installation and trenching for EV station deployment in Ripon, CA. Includes safety compliance, site preparation, and phased construction documentation.',
    category: 'Infrastructure',
    location: 'Ripon, CA',
    // completionDate: 'December, 2025',
    thumbnailUrl: '/images/projects/Ripon-CA/ripon-ev-station-trench-15.webp',
    galleryImages: [
      '/images/projects/Ripon-CA/ripon-ev-station-trench-1.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-2.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-3.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-4.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-5.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-6.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-7.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-8.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-9.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-10.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-11.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-12.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-13.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-14.webp',
      '/images/projects/Ripon-CA/ripon-ev-station-trench-15.webp',
    ],
    features: [
      'Underground trenching and conduit installation',
      'EV station site preparation and layout',
      'Safety tape and hazard zone compliance',
      'Heavy equipment and material staging',
      'Timestamped geo-located construction documentation',
      'Multi-phase infrastructure deployment'
    ],
    specifications: {
      'Utility Type': 'EV Charging Infrastructure',
      'Trench Depth': 'Varied by site phase',
      'Location Accuracy': 'GPS-tagged image documentation',
      'Safety Protocols': 'Caution tape, signage, and perimeter control',
      'Construction Equipment': 'Excavators, trucks, and trench boxes',
      'Documentation': '15+ timestamped progress photos'
    }
  },
  {
    id: 'comprehensive-site-development',
    title: 'Comprehensive Site Development',
    description: 'Large-scale site development project featuring extensive excavation, grading, access road construction, and complete infrastructure preparation for commercial development.',
    category: 'Site Development',
    location: 'Bodega Bay, CA',
    // completionDate: 'May, 2025',
    // client: 'Regional Development Authority',
    // duration: '18 months',
    // teamSize: 25,
    thumbnailUrl: '/images/projects/Bodega-Bay-CA/transport-1.jpg',
    galleryImages: [
      '/images/projects/Bodega-Bay-CA/jack-hammer-1.jpg',
      '/images/projects/Bodega-Bay-CA/bulldozer-transport.jpg',
      '/images/projects/Bodega-Bay-CA/bulldozer-trench.jpg',
      '/images/projects/Bodega-Bay-CA/bulldozer-3.jpg',
      '/images/projects/Bodega-Bay-CA/trench-1.jpg',
      '/images/projects/Bodega-Bay-CA/trench-2.jpg',
      '/images/projects/Bodega-Bay-CA/trench-3.jpg',
      '/images/projects/Bodega-Bay-CA/transport-1.jpg',
      '/images/projects/Bodega-Bay-CA/transport-2.jpg',
      '/images/projects/Bodega-Bay-CA/case-1.jpg',
    ],
    features: [
      'Multi-phase site excavation and grading',
      'Access road and pathway construction',
      'Utility corridor preparation',
      'Environmental compliance and monitoring',
      'Drainage system implementation',
      'Site preparation for multiple structures',
      'Soil stabilization and compaction',
      'Safety protocol management throughout phases'
    ],
    specifications: {
      'Project Type': 'Large-Scale Site Development',
      'Site Area': '150+ acres',
      'Excavation Volume': '500,000+ cubic yards',
      'Access Roads': '5+ miles constructed',
      // 'Project Duration': '18 months',
      'Environmental Standards': 'Full compliance achieved',
      'Safety Record': 'Zero incidents across all phases'
    }
  },
  {
    id: 'infrastructure-systems-installation-2024',
    title: 'Advanced Infrastructure Systems',
    description: 'Complex infrastructure installation project featuring telecommunications towers, utility systems, and specialized equipment placement with precision engineering.',
    category: 'Telecommunications',
    location: 'Sparks, NV',
    // completionDate: 'March, 2025',
    // client: 'Communications Infrastructure Corp',
    // duration: '12 months',
    // teamSize: 20,
    thumbnailUrl: '/images/projects/Sparks-NV/tower-tree-7.jpg',
    galleryImages: [
      '/images/projects/Sparks-NV/tower-base-1.jpg',
      '/images/projects/Sparks-NV/tower-tree-1.jpg',
      '/images/projects/Sparks-NV/tower-tree-install.jpg',
      '/images/projects/Sparks-NV/tower-tree-3.jpg',
      '/images/projects/Sparks-NV/tower-tree-4.jpg',
      '/images/projects/Sparks-NV/tower-tree-6.jpg',
      '/images/projects/Sparks-NV/tower-tree-7.jpg',
    ],
    features: [
      'Telecommunications tower installation',
      'Advanced utility system integration',
      'Precision equipment placement',
      'Underground infrastructure development',
      'Communications network deployment',
      'Power system installation and testing',
      'Environmental monitoring systems',
      'Complete system commissioning'
    ],
    specifications: {
      'Tower Height': '200+ feet',
      'Equipment Weight': '50+ tons installed',
      'Underground Systems': '10+ miles of conduit',
      'Power Capacity': '500kW systems',
      'Communications': 'Multi-carrier capable',
      'Precision Tolerance': '±2mm placement accuracy',
      // 'Completion Time': '12 months',
      'System Reliability': '99.99% uptime guaranteed'
    }
  }
];

/**
 * Enhanced Service Card Component
 * Displays individual project with improved accessibility and animations
 */
interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

const ProjectCard = ({ project, index, onViewDetails }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl 
                 shadow-xl border-2 border-gold-300/60 overflow-hidden 
                 hover:shadow-2xl hover:-translate-y-2 hover:border-gold-400/80
                 transition-all duration-300 backdrop-blur-sm
                 ring-1 ring-white/20"
    >
      {/* Project Image with Enhanced Overlay */}
      <div
        className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-gray-100"
        onClick={() => onViewDetails(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onViewDetails(project);
          }
        }}
        aria-label={`View details for ${project.title}`}
      >
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
        />

        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View Details Button with Animation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gold-200"
          >
            <Eye className="w-6 h-6 text-gray-700" />
          </motion.div>
        </div>

        {/* Category Badge with Enhanced Styling */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 bg-gold-400/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white shadow-lg">
            <Tag className="w-3 h-3 mr-1.5" />
            {project.category}
          </span>
        </div>

        {/* Gallery Count Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm 
                        rounded-full px-2 py-1 text-white text-xs font-medium
                        xs:pt-12
                        ">
          {project.galleryImages.length} Photos
        </div>
      </div>

      {/* Enhanced Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold-700 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Enhanced Project Meta */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gold-600 flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
          {/* <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gold-600 flex-shrink-0" />
            <span>Completed {project.completionDate}</span>
          </div> */}
          {/* {project.client && (
            <div className="flex items-center text-sm text-gray-600">
              <Award className="w-4 h-4 mr-2 text-gold-600 flex-shrink-0" />
              <span className="truncate">{project.client}</span>
            </div>
          )} */}
        </div>

        {/* Enhanced Action Button */}
        <button
          onClick={() => onViewDetails(project)}
          className="w-full inline-flex items-center justify-center px-4 py-3 
                     bg-gradient-to-r from-white/90 to-amber-50/90 hover:from-gold-100 hover:to-gold-200 
                     border-2 border-gold-300/50 hover:border-gold-400/70
                     text-gray-700 hover:text-gold-800 font-medium rounded-lg
                     transition-all duration-200 group/btn shadow-md hover:shadow-lg
                     backdrop-blur-sm ring-1 ring-white/30"
          aria-label={`View detailed information about ${project.title}`}
        >
          View Project Details
          <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
};

/**
 * Enhanced Project Showcase Component
 */
export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Enhanced modal management with focus trapping
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!modalOpen || !selectedProject) return;

      switch (event.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setCurrentImageIndex((prev) =>
            prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          event.preventDefault();
          setCurrentImageIndex((prev) =>
            (prev + 1) % selectedProject.galleryImages.length
          );
          break;
        case 'Home':
          event.preventDefault();
          setCurrentImageIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setCurrentImageIndex(selectedProject.galleryImages.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen, selectedProject]);

  // Filter projects
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project =>
      project.category.toLowerCase() === selectedCategory.toLowerCase()
    );

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  // Blueprint Compass SVG component
  const BlueprintCompass = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="48" stroke="#B3995D" strokeWidth="2" />
      <path d="M50 2V98" stroke="#B3995D" strokeWidth="1" />
      <path d="M2 50H98" stroke="#B3995D" strokeWidth="1" />
      <path d="M26 50L50 26L74 50L50 74L26 50Z" stroke="#B3995D" strokeWidth="2" />
      <circle cx="50" cy="50" r="5" stroke="#B3995D" strokeWidth="2" />
      <path d="M18 18L82 82" stroke="#B3995D" strokeWidth="1" />
      <path d="M18 82L82 18" stroke="#B3995D" strokeWidth="1" />
      <text x="50" y="20" textAnchor="middle" fontSize="8" fill="#B3995D">N</text>
    </svg>
  );

  return (
    <section ref={sectionRef} className="relative py-16" aria-labelledby="projects-heading">
      {/* Enhanced Blueprint Grid Paper Background */}
      <div className="absolute inset-0 bg-blue-50/70" aria-hidden="true">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(179, 153, 93, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(179, 153, 93, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(179, 153, 93, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(179, 153, 93, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Decorative elements */}
        <div className="absolute left-10 top-20 w-40 h-40 border-2 border-gold-300/25 rounded-full"></div>
        <div className="absolute right-20 bottom-40 w-60 h-60 border border-dashed border-gold-400/25 rounded-lg transform rotate-3"></div>
        <div className="absolute left-1/4 bottom-20 w-20 h-20 border border-gold-300/25 rounded-sm rotate-45"></div>

        <div className="absolute right-10 top-10 w-32 h-32 opacity-15 z-30">
          <BlueprintCompass />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gold-300/12 text-9xl font-bold rotate-[-25deg] select-none pointer-events-none tracking-wider">
            PORTFOLIO
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-16 px-6">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center backdrop-blur-sm mb-12 p-8 shadow-xl rounded-2xl border border-gold-300/40 bg-gradient-to-br from-amber-50/95 to-orange-50/95 ring-1 ring-white/30"
          >
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                {' '}Portfolio
              </span>
              {' '}Showcase
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive portfolio of completed projects demonstrating our expertise
              in site development, infrastructure systems, concrete construction, and specialized equipment installation.
            </p>
          </motion.div>

          {/* Enhanced Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
            role="tablist"
            aria-label="Project categories"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`
                  relative px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2
                  ${selectedCategory === category
                    ? 'bg-gold-400 text-white shadow-lg shadow-gold-400/25 ring-1 ring-white/20'
                    : 'bg-gradient-to-br from-amber-50/95 to-orange-50/95 text-gray-700 border-2 border-gold-300/50 hover:border-gold-400/70 hover:text-gold-800 shadow-md hover:shadow-lg backdrop-blur-sm ring-1 ring-white/30'}
                `}
                role="tab"
                aria-selected={selectedCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {selectedCategory === category && (
                  <motion.div
                    layoutId="categoryBackground"
                    className="absolute inset-0 bg-gold-400 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" role="tabpanel">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={openModal}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Enhanced CTA Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-amber-50/95 to-orange-50/95 backdrop-blur-sm rounded-2xl p-8 border border-gold-300/40 shadow-xl ring-1 ring-white/30">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                From site development to complex infrastructure installation, our comprehensive project portfolio 
                demonstrates our ability to deliver exceptional results across all construction disciplines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500
                           text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl
                           ring-1 ring-gold-200/50"
                >
                  Request a Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white/90 border-2 border-gold-400
                           text-gold-700 hover:bg-gold-50 font-medium rounded-lg transition-all duration-300
                           shadow-md hover:shadow-lg ring-1 ring-white/30"
                >
                  View Our Services
                </motion.a>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {modalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            {/* Blueprint Backdrop */}
            <div className="fixed inset-0 bg-blue-50/95">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(179, 153, 93, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(179, 153, 93, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
              <div className="absolute right-10 top-10 w-32 h-32 opacity-15">
                <BlueprintCompass />
              </div>
            </div>

            {/* Enhanced Modal Content */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-gradient-to-br from-amber-50/98 to-orange-50/98 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto border border-gold-300/60 ring-1 ring-white/20 backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white shadow-lg
                           text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 
                           border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  aria-label="Close project details dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-400 to-gold-500 rounded-t-2xl"></div>

                <div className="p-4">
                  {/* Project Header */}
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="inline-flex items-center px-3 py-1.5 bg-gold-100 text-gold-800 rounded-full text-sm font-medium">
                        <Tag className="w-3 h-3 mr-1.5" />
                        {selectedProject.category}
                      </span>
                      {/* {selectedProject.duration && (
                        <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {selectedProject.duration}
                        </span>
                      )}
                      {selectedProject.teamSize && (
                        <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          <Users className="w-3 h-3 mr-1.5" />
                          {selectedProject.teamSize} team members
                        </span>
                      )} */}
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Image Gallery */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-black/90 backdrop-blur-md border-2 border-gold-200/50 shadow-inner">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={selectedProject.galleryImages[currentImageIndex]}
                          alt={`${selectedProject.title} - Image ${currentImageIndex + 1} of ${selectedProject.galleryImages.length}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 600px) 100vw, 600px"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gallery Navigation */}
                    {selectedProject.galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
                            );
                          }}
                          className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full 
                                   bg-white/90 hover:bg-white border border-gray-200 shadow-lg
                                   text-gray-700 hover:text-gray-900 transition-all duration-200"
                          aria-label='Previous Image'
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              (prev + 1) % selectedProject.galleryImages.length
                            );
                          }}
                          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full 
                                   bg-white/90 hover:bg-white border border-gray-200 shadow-lg
                                   text-gray-700 hover:text-gray-900 transition-all duration-200"
                          aria-label='Next Image'
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white rounded-full px-3 py-1">

                          {currentImageIndex + 1} of {selectedProject.galleryImages.length}
                        </div>

                        <div className="flex gap-1">
                          {selectedProject.galleryImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImageIndex
                                  ? 'bg-gold-400 scale-125'
                                  : 'bg-white/60 hover:bg-white/80'
                                }`}
                            />
                          ))}
                        </div>

                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Project Details */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-gold-200/30 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Award className="w-5 h-5 text-gold-500 mr-2" />
                          Project Information
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-gray-900">Location: </span>
                              <span className="text-gray-600">{selectedProject.location}</span>
                            </div>
                          </div>
                          {/* <div className="flex items-start">
                            <Calendar className="w-5 h-5 text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-gray-900">Completed: </span>
                              <span className="text-gray-600">{selectedProject.completionDate}</span>
                            </div>
                          </div> */}
                          {/* {selectedProject.client && (
                            <div className="flex items-start">
                              <Award className="w-5 h-5 text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-gray-900">Client: </span>
                                <span className="text-gray-600">{selectedProject.client}</span>
                              </div>
                            </div>
                          )} */}
                          <div className="flex items-start">
                            <Tag className="w-5 h-5 text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-gray-900">Category: </span>
                              <span className="text-gray-600">{selectedProject.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-xl p-6 border border-gold-200/30 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-gold-500 mr-2" />
                          Key Features & Achievements
                        </h3>
                        <ul className="grid grid-cols-1 gap-3">
                          {selectedProject.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Specifications */}
                    {selectedProject.specifications && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Settings className="w-5 h-5 text-gold-500 mr-2" />
                          Technical Specifications
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full shadow-sm">
                          <dl className="space-y-4">
                            {Object.entries(selectedProject.specifications).map(([key, value], index) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                              >
                                <dt className="font-semibold text-gray-900 mb-1 text-sm">{key}</dt>
                                <dd className="text-gray-600 text-sm leading-relaxed">{value}</dd>
                              </motion.div>
                            ))}
                          </dl>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <div className="bg-gradient-to-r from-gold-50 to-amber-50 rounded-xl p-6 border border-gold-200/50">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Interested in a Similar Project?
                      </h4>
                      <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                        Let&apos;s discuss how our proven expertise can help bring your vision to life with the same
                        level of precision and excellence demonstrated in this comprehensive project.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="/contact"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 
                                   text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          Start Your Project
                          <ArrowUpRight className="w-4 h-4 ml-2" />
                        </a>
                        <a
                          href="/services"
                          className="inline-flex items-center px-6 py-3 bg-white border-2 border-gold-400
                                   text-gold-600 hover:bg-gold-50 font-medium rounded-lg transition-all duration-200"
                        >
                          View Our Services
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
