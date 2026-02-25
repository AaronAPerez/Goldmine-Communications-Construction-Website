// // components/sections/HeroSection.tsx
// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
// import { ArrowRight, Phone, Play, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
// import OptimizedImage from '../common/OptimizedImage';
// import { Button } from '@/components/ui/button';
// import NoSSR from '@/components/common/NoSSR';

// // Background images for carousel
// const heroImages = [
//   {
//     id: 1,
//     url: '/images/hero/communications-hero.jpg',
//     alt: 'Communications infrastructure installation',
//     title: 'Advanced Communications',
//     subtitle: 'Cutting-edge telecommunications solutions'
//   },
//   {
//     id: 2,
//     url: '/images/hero/construction-hero.jpg',
//     alt: 'Construction project in progress',
//     title: 'Professional Construction',
//     subtitle: 'Quality construction and development'
//   },
//   {
//     id: 3,
//     url: '/images/hero/healthcare-hero.jpg',
//     alt: 'Healthcare facility construction',
//     title: 'Healthcare Facilities',
//     subtitle: 'Specialized healthcare construction experts'
//   },
//   {
//     id: 4,
//     url: '/images/hero/technology-hero.jpg',
//     alt: 'Technology infrastructure',
//     title: 'Smart Technology',
//     subtitle: 'IoT and intelligent building systems'
//   }
// ];

// // Background carousel component
// const BackgroundCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   // Auto-advance carousel
//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//     }, 6000); // Change every 6 seconds

//     return () => clearInterval(interval);
//   }, [isAutoPlaying]);

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//     setIsAutoPlaying(false);
//     // Resume auto-play after user interaction
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % heroImages.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   return (
//     <div className="absolute inset-0 w-full h-full">
//       {/* Background images */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//           className="absolute inset-0 w-full h-full"
//         >
//           <OptimizedImage
//             src={heroImages[currentIndex].url}
//             alt={heroImages[currentIndex].alt}
//             fill
//             className="object-cover"
//             priority={currentIndex === 0}
//             quality={90}
//             sizes="100vw"
//           />
//           {/* Dark overlay for text readability */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation dots */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="flex space-x-3">
//           {heroImages.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentIndex
//                   ? 'bg-gold-400 scale-125'
//                   : 'bg-white/50 hover:bg-white/75'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Navigation arrows - only visible on hover */}
//       <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={prevSlide}
//           className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white 
//                    hover:bg-white/30 transition-colors border border-white/30"
//           aria-label="Previous image"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={nextSlide}
//           className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white 
//                    hover:bg-white/30 transition-colors border border-white/30"
//           aria-label="Next image"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </motion.button>
//       </div>

//       {/* Slide info - subtle display of current slide info */}
//       <div className="absolute bottom-20 left-6 z-20">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
//           >
//             <h3 className="text-white font-semibold text-lg">
//               {heroImages[currentIndex].title}
//             </h3>
//             <p className="text-white/80 text-sm">
//               {heroImages[currentIndex].subtitle}
//             </p>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// // Static animated background elements (no hydration issues)
// const StaticAnimatedElements = () => {
//   const particles = [
//     { id: 1, x: 15, y: 25, color: 'bg-gold-400/30', size: 'w-2 h-2', delay: 0 },
//     { id: 2, x: 75, y: 15, color: 'bg-white/20', size: 'w-1 h-1', delay: 1 },
//     { id: 3, x: 45, y: 80, color: 'bg-gold-400/20', size: 'w-3 h-3', delay: 2 },
//     { id: 4, x: 85, y: 60, color: 'bg-white/15', size: 'w-1 h-1', delay: 0.5 },
//     { id: 5, x: 25, y: 45, color: 'bg-gold-400/25', size: 'w-2 h-2', delay: 1.5 },
//     { id: 6, x: 90, y: 85, color: 'bg-white/25', size: 'w-1 h-1', delay: 3 },
//   ];

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className={`absolute rounded-full ${particle.color} ${particle.size}`}
//           style={{
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//           }}
//           animate={{
//             y: [-20, 20, -20],
//             opacity: [0.3, 1, 0.3],
//             scale: [0.8, 1.2, 0.8],
//           }}
//           transition={{
//             duration: 4 + Math.random() * 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: particle.delay,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Trust indicators component
// const TrustIndicators = () => {
//   const indicators = [
//     { text: 'Licensed & Insured #1099543', icon: '🛡️' },
//     { text: '15+ Years Experience', icon: '⭐' },
//     { text: '24/7 Emergency Services', icon: '🚨' },
//     { text: 'We Beat Estimates', icon: '💰' },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 1.5, duration: 0.6 }}
//       className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-white/90"
//     >
//       {indicators.map((indicator, index) => (
//         <motion.div
//           key={indicator.text}
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1.7 + index * 0.1, duration: 0.3 }}
//           className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm 
//                    rounded-full px-4 py-2 border border-white/20 hover:bg-white/15 
//                    transition-colors"
//         >
//           <span className="text-base">{indicator.icon}</span>
//           <span className="hidden sm:inline">{indicator.text}</span>
//           <span className="sm:hidden">
//             {indicator.text.split(' ')[0]} {indicator.text.split(' ')[1]}
//           </span>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };

// // Main hero section props
// interface HeroSectionProps {
//   onScrollToNext?: () => void;
// }

// export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(heroRef, { once: true });

//   return (
//     <section 
//       ref={heroRef}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden"
//       style={{ 
//         // Account for the TopContactBar height
//         paddingTop: 'calc(2rem + 14px)', // 2rem for spacing + height of contact bars
//         minHeight: 'calc(100vh - 14px)' // Adjust for contact bar
//       }}
//       aria-labelledby="hero-heading"
//     >
//       {/* Background image carousel */}
//       <NoSSR fallback={
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
//       }>
//         <BackgroundCarousel />
//       </NoSSR>

//       {/* Animated particles overlay */}
//       <NoSSR>
//         <StaticAnimatedElements />
//       </NoSSR>

//       {/* Main content */}
//       <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="text-center">
//           {/* Logo and branding */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={isInView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="mb-8"
//           >
//             <div className="relative inline-block">
//               <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-6">
//                 <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full blur-2xl opacity-40" />
//                 <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold-400/60 shadow-2xl bg-white/10 backdrop-blur-sm">
//                   <OptimizedImage
//                     src="/images/logo-circular.png"
//                     alt="Goldmine Communications and Construction"
//                     fill
//                     className="object-contain p-2"
//                     priority
//                   />
//                 </div>
//               </div>

//               <motion.h1
//                 id="hero-heading"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//                 className="text-2xl md:text-3xl font-bold text-gold-400 mb-2"
//               >
//                 Goldmine Construction Services
//               </motion.h1>
//             </div>
//           </motion.div>

//           {/* Main headline */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="mb-8"
//           >
//             <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               Building Tomorrow's
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
//                 Infrastructure
//               </span>
//             </h2>
//             <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
//               Professional communications and construction services with over 15 years 
//               of specialized experience in healthcare facilities and cutting-edge technology integration.
//             </p>
//           </motion.div>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.7 }}
//             className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12"
//           >
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 
//                          hover:to-gold-700 text-white shadow-xl hover:shadow-2xl px-8 py-4 text-base md:text-lg
//                          border-0 font-semibold"
//                 asChild
//               >
//                 <a href="/contact" className="flex items-center">
//                   Get Free Consultation
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </a>
//               </Button>
//             </motion.div>

//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button 
//                 variant="outline" 
//                 size="lg"
//                 className="border-2 border-white text-white hover:bg-white hover:text-gray-900 
//                          px-8 py-4 text-base md:text-lg font-semibold bg-white/10 backdrop-blur-sm"
//                 asChild
//               >
//                 <a href="tel:+19253055980" className="flex items-center">
//                   <Phone className="mr-2 w-5 h-5" />
//                   (925) 305-5980
//                 </a>
//               </Button>
//             </motion.div>

//             <motion.div 
//               whileHover={{ scale: 1.05 }} 
//               whileTap={{ scale: 0.95 }}
//               className="hidden sm:block"
//             >
//               <Button 
//                 variant="ghost" 
//                 size="lg"
//                 className="text-white hover:bg-white/20 px-8 py-4 text-base md:text-lg 
//                          font-semibold border border-white/30 backdrop-blur-sm"
//                 asChild
//               >
//                 <a href="/projects" className="flex items-center">
//                   <Play className="mr-2 w-5 h-5" />
//                   View Our Work
//                 </a>
//               </Button>
//             </motion.div>
//           </motion.div>

//           {/* Trust indicators */}
//           <TrustIndicators />
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       {onScrollToNext && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 2 }}
//           className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
//         >
//           <motion.button
//             onClick={onScrollToNext}
//             animate={{ y: [0, 8, 0] }}
//             transition={{ 
//               duration: 2, 
//               repeat: Infinity, 
//               ease: "easeInOut" 
//             }}
//             className="text-white/80 hover:text-white cursor-pointer transition-colors group"
//             aria-label="Scroll to about section"
//           >
//             <div className="flex flex-col items-center">
//               <span className="text-sm mb-2 group-hover:scale-105 transition-transform">
//                 Discover More
//               </span>
//               <div className="p-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm
//                             group-hover:bg-white/20 transition-colors">
//                 <ChevronDown className="w-5 h-5" />
//               </div>
//             </div>
//           </motion.button>
//         </motion.div>
//       )}
//     </section>
//   );
// }