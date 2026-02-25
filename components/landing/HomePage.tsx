'use client';

import React from 'react';

import AboutServicesSection from '@/components/sections/AboutServicesSection';
import CommunicationsSection from '@/components/sections/CommunicationsSection';
import ConstructionSection from '@/components/sections/ConstructionSection';
import CTASection from '@/components/sections/CTASection';
import HeroSection from '../sections/HeroSection';
import ProjectShowcase from '../Projects/ProjectShowcase';

/**
 * HomePage Component
 * 
 * Main landing page with improved layout and spacing:
 * - Fixed section spacing and padding
 * - Consistent vertical rhythm
 * - Proper background transitions
 * - Improved accessibility
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

      {/* Communications Section - Dark background */}
      <section className="bg-gray-900 py-20 relative">
        <CommunicationsSection />
      </section>

      {/* Construction Section - Dark background (matches internal component theme) */}
      <section className="relative">
        <ConstructionSection />
      </section>

      {/* Project Showcase - Blueprint background */}
      <section className="relative">
        <ProjectShowcase />
      </section>

      {/* CTA Section - Dark background with gold accents (matches internal component theme) */}
      <section className="relative">
        <CTASection />
      </section>
    </div>
  );
}