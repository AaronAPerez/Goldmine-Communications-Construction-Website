'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Shield,
  Clock,
  Award,
  Target,
  Star,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import FloatingParticles from '../Hero/FloatingParticles';

/**
 * Enhanced Hero Section with Background Image Carousel
 * 
 * Improvements:
 * - Better image optimization and loading
 * - Enhanced responsive design
 * - Improved accessibility features
 * - Better performance with reduced animations on mobile
 * - Fixed spacing and layout issues
 * - Enhanced visual hierarchy
 * - Better color contrast and readability
 */

interface HeroSlide {
  id: string;
  image: string;
  mobileImage?: string; // Optional mobile-specific image
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: { text: string; href: string; icon?: React.ReactNode };
    secondary: { text: string; href: string; icon?: React.ReactNode };
  };
  priority?: boolean;
}

// Enhanced carousel slides with better content structure
const heroSlides: HeroSlide[] = [
  {
    id: 'ev-charging',
    image: '/images/projects/Oregon-AV-Station/AV-station/Oregon-AvStations-hero.jpg',
    mobileImage: '/images/projects/Oregon-AV-Station/Av-Station-EV.jpg',
    title: 'Future-Ready EV Infrastructure',
    subtitle: 'Clean Energy Technology',
    description: 'Advanced electric vehicle charging solutions and smart technology integration for sustainable transportation networks.',
    cta: {
      primary: {
        text: 'Explore EV Solutions',
        href: '/communications',
        icon: <Zap className="w-5 h-5" />
      },
      secondary: {
        text: 'View Projects',
        href: '/projects'
      }
    },
    priority: true
  },
  {
    id: 'communications',
    image: '/images/projects/Sparks-NV/tree-post-hero.jpg',
    title: 'Advanced Communications',
    subtitle: 'Network Infrastructure Excellence',
    description: 'Cutting-edge telecommunications, fiber optic systems, and 5G infrastructure for the connected world.',
    cta: {
      primary: {
        text: 'Communications Services',
        href: '/communications',
        icon: <ArrowRight className="w-5 h-5" />
      },
      secondary: {
        text: 'Get Quote',
        href: '/contact'
      }
    }
  },
  {
    id: 'construction',
    image: '/images/projects/Oregon-AV-Station/transport-hero.jpg',
    title: 'Professional Construction',
    subtitle: 'Site Development',
    description: 'Expert construction services with 15+ years of specialized experience in healthcare facilities and critical infrastructure.',
    cta: {
      primary: {
        text: 'Construction Services',
        href: '/construction',
        icon: <ArrowRight className="w-5 h-5" />
      },
      secondary: {
        text: 'Free Consultation',
        href: '/contact',
        icon: <Phone className="w-4 h-4" />
      }
    }
  }
];

/**
 * Carousel Dots Component
 */
interface CarouselDotsProps {
  slides: HeroSlide[];
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const CarouselDots = ({ slides, currentIndex, onDotClick }: CarouselDotsProps) => (
  <div className="flex space-x-3 justify-center">
    {slides.map((slide, index) => (
      <button
        key={slide.id}
        onClick={() => onDotClick(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none 
                   focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50 
                   ${index === currentIndex
            ? 'bg-gold-400 scale-110 shadow-lg shadow-gold-400/50'
            : 'bg-white/50 hover:bg-white/70 hover:scale-105'
          }`}
        aria-label={`Go to slide ${index + 1}: ${slide.title}`}
      />
    ))}
  </div>
);

/**
 * Main Hero Section Component
 */
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [, setIsLoaded] = useState(false);
  const [, setImageLoadStates] = useState<boolean[]>(new Array(heroSlides.length).fill(false));
  const [isMobile, setIsMobile] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000); // 7 seconds per slide

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle image load states
  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    pauseAndResume();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    pauseAndResume();
  };

  const pauseAndResume = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden w-full max-w-full"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Background Images with Enhanced Loading */}
      <div className="absolute inset-0 z-0 w-full bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={isMobile && currentSlideData.mobileImage ? currentSlideData.mobileImage : currentSlideData.image}
              alt="Hero image"
              fill
              priority={true} // Critical for LCP
              fetchPriority="high"
              onLoad={() => handleImageLoad(currentSlide)}
              className="object-cover"
              sizes="100vw"
            />

            {/* Enhanced overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Container - Fixed width constraints */}
      <div className="relative z-10 w-full max-w-full min-h-screen flex items-center pt-20 pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile Company Branding - Constrained width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:hidden text-center mb-8 w-full max-w-full"
          >
            <div className="relative inline-block">
              {/* Mobile Logo */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto my-2">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400/30 to-gold-600/30 rounded-full blur-xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-3 border-gold-400/60 bg-white/10 backdrop-blur-sm">
                  <Image
                    src="/images/logo/logo-circular.jpg"
                    alt="Goldmine Communications and Construction"
                    fill
                    className="object-contain p-4"
                    // priority
                    sizes="(max-width: 640px) 128px, 144px"
                  />
                </div>
              </div>

              {/* Mobile Company Name */}
              <div className="text-center max-w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-gold-400 mb-1 text-shadow break-words">
                  Goldmine Communications
                </h2>
                <div className="text-xl sm:text-3xl text-gray-100 text-shadow-sm">
                  & Construction
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Layout Grid - Responsive constraints */}
          <div className="w-full max-w-full lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 lg:items-center">

            {/* Content Column - Proper width constraints */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-center lg:text-left lg:col-span-7 w-full max-w-full"
            >
              {/* Slide Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full max-w-full"
                >
                  {/* Subtitle Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center px-4 py-2 bg-gold-400/20 backdrop-blur-sm 
                             border border-gold-400/30 rounded-full text-sm font-semibold text-gold-300 mb-6
                             max-w-full"
                  >
                    <Star className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{currentSlideData.subtitle}</span>
                  </motion.div>

                  {/* Main Title - Responsive text sizing */}
                  <h1
                    id="hero-heading"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight
                             w-full max-w-full break-words"
                  >
                    <span className="block text-white text-shadow-lg">
                      {currentSlideData.title}
                    </span>
                  </h1>

                  {/* Description - Responsive and constrained */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed 
                              max-w-full lg:max-w-2xl mx-auto lg:mx-0 text-shadow-sm px-2 sm:px-0">
                    {currentSlideData.description}
                  </p>

                  {/* CTA Buttons - Mobile-first responsive */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8
                                w-full max-w-full">
                    <motion.a
                      href={currentSlideData.cta.primary.href}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4
                        border-2 border-white/80 
                             bg-gradient-to-r from-gold-400 to-gold-700 text-white
                               rounded-xl font-semibold text-base sm:text-lg transition-all duration-300
                               shadow-xl hover:shadow-2xl hover:shadow-gold-400/25 w-full sm:w-auto
                               min-w-0 max-w-full"
                    >
                      <span className="truncate">{currentSlideData.cta.primary.text}</span>
                      {currentSlideData.cta.primary.icon && (
                        <span className="ml-3 transition-transform group-hover:translate-x-1 flex-shrink-0">
                          {currentSlideData.cta.primary.icon}
                        </span>
                      )}
                    </motion.a>

                    <motion.a
                      href={currentSlideData.cta.secondary.href}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4
                               border-2 border-white/80 text-white rounded-xl font-semibold text-base sm:text-lg
                               hover:bg-white hover:text-gray-900 transition-all duration-300 
                               backdrop-blur-sm bg-white/10 w-full sm:w-auto min-w-0 max-w-full"
                    >
                      {currentSlideData.cta.secondary.icon && (
                        <span className="mr-3 flex-shrink-0">
                          {currentSlideData.cta.secondary.icon}
                        </span>
                      )}
                      <span className="truncate">{currentSlideData.cta.secondary.text}</span>
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Trust Indicators - Mobile responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 w-full max-w-full"
              >
                {[
                  { text: 'Licensed & Insured', short: 'Licensed', icon: <Shield className="w-4 h-4 text-gold-400" /> },
                  { text: '15+ Years Experience', short: '15+ Years', icon: <Clock className="w-4 h-4 text-gold-400" /> },
                  { text: 'Quality Guarantee', short: 'Quality', icon: <Award className="w-4 h-4 text-gold-400" /> },
                  { text: 'We Beat Estimates', short: 'Best Price', icon: <Target className="w-4 h-4 text-gold-400" /> }
                ].map(({ text, short, icon }, index) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + (index * 0.1) }}
                    className="flex items-center bg-black/30 backdrop-blur-sm rounded-full 
                             px-3 py-2 border border-white/10 hover:bg-black/40 transition-colors
                             min-w-0 max-w-full"
                  >
                    <span className="mr-2 flex-shrink-0">{icon}</span>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                      <span className="hidden sm:inline">{text}</span>
                      <span className="sm:hidden">{short}</span>
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Desktop Logo Column - Hidden on mobile to prevent width issues */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:flex flex-col items-center justify-center lg:col-span-5"
            >
              <div className="relative text-center">
                {/* Decorative animated rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-gold-400/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '320px',
                    height: '320px',
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    top: '50%'
                  }}
                />
                <motion.div
                  className="absolute inset-0 border border-gold-400/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '380px',
                    height: '380px',
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    top: '50%'
                  }}
                />

                {/* Desktop Logo */}
                <div className="relative w-72 h-72 xl:w-80 xl:h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400/40 to-gold-600/40 rounded-full blur-3xl" />
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl 
                                border-4 border-gold-400/60 bg-white/10 backdrop-blur-sm">
                    <Image
                      src="/images/logo/logo-circular.jpg"
                      alt="Goldmine Communications and Construction"
                      fill
                      className="object-contain p-6"
                      priority
                    />
                  </div>
                </div>

                {/* Company Name - Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-4"
                >
                  <h2 className="text-4xl xl:text-5xl font-bold text-gold-400 mb-3 text-shadow">
                    Goldmine Communications
                  </h2>
                  <div className="text-3xl xl:text-4xl text-gray-100 text-shadow-sm">
                    & Construction
                  </div>
                  <div className="mt-4 text-lg text-gray-300">
                    License #1099543 • Bonded & Insured
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      {heroSlides.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full 
                     bg-white/10 backdrop-blur-sm border border-white/20 text-white 
                     hover:bg-white/20 transition-all duration-300 focus:outline-none 
                     focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50
                     hidden sm:block"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full 
                     bg-white/10 backdrop-blur-sm border border-white/20 text-white 
                     hover:bg-white/20 transition-all duration-300 focus:outline-none 
                     focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black/50
                     hidden sm:block"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Controls */}
          <div className="absolute bottom-8 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center">
                {/* Control Buttons */}
                <div className="flex items-center space-x-3 mr-6">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white/10 border border-white/20 
                             text-white hover:bg-white/20 transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-gold-400 sm:hidden"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-white/10 border border-white/20 
                             text-white hover:bg-white/20 transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-gold-400"
                    aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white/10 border border-white/20 
                             text-white hover:bg-white/20 transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-gold-400 sm:hidden"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Carousel Dots */}
                <CarouselDots
                  slides={heroSlides}
                  currentIndex={currentSlide}
                  onDotClick={goToSlide}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <motion.div
            className="h-1 bg-gradient-to-r from-gold-400 to-gold-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 7, ease: "linear" }}
            key={currentSlide}
            style={{ transformOrigin: "left" }}
          />
        </div>
      )}

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60 cursor-pointer text-center hover:text-white/80 transition-colors"
          onClick={() => {
            const nextSection = document.querySelector('main section:nth-child(2)');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const nextSection = document.querySelector('main section:nth-child(2)');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-3 font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </motion.div> */}

      {/* Floating Particles Effect */}
      <FloatingParticles />

      {/* Screen reader announcement */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Currently showing slide {currentSlide + 1} of {heroSlides.length}: {currentSlideData.title}
      </div>
    </section>
  );
};

export default HeroSection;