'use client';

import React from 'react';

import AboutServicesSection from '@/components/sections/AboutServicesSection';
import ServicesPreviewSection from '@/components/sections/ServicesPreview';
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection';
import CTASection from '@/components/sections/CTASection';
import HeroSection from '../sections/HeroSection';

/**
 * HomePage Component
 *
 * Main landing page with improved layout and spacing:
 * - Fixed section spacing and padding
 * - Consistent vertical rhythm
 * - Proper background transitions
 * - Improved accessibility
 *
 * Updated structure:
 * - Replaced CommunicationsSection and ConstructionSection with unified ServicesPreviewSection
 * - Replaced ProjectShowcase with GalleryPreviewSection
 */
export default function HomePage() {
  return (
    <div className='mt-6'>
      {/* Hero Section - Full viewport with proper spacing */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* About & Services Section - White background with top padding */}
      <section className="py-24 relative">
        <AboutServicesSection />
      </section>

      {/* Services Preview Section - Dark background showcasing all NECA services */}
      <section className="relative">
        <ServicesPreviewSection />
      </section>

      {/* Gallery Preview Section - Light background with featured projects */}
      <section className="relative">
        <GalleryPreviewSection />
      </section>

      {/* CTA Section - Dark background with gold accents */}
      <section className="relative">
        <CTASection />
      </section>
    </div>
  );
}