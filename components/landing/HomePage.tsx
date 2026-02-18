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

      {/* Construction Section - Light background */}
      <section className="bg-gray-50 py-20 relative">
        <ConstructionSection />
      </section>

      {/* Project Showcase - Blueprint background */}
      <section className="relative">
        <ProjectShowcase />
      </section>

      {/* Contact Section - Dark background */}
      {/* <section className="bg-gray-900 py-24 relative">
        <ContactSection />
      </section>

      {/* CTA Section - Gold gradient background */}
      <section className="bg-gradient-to-r from-gold-400 to-gold-600 py-24 relative">
        <CTASection />
      </section>
    </div>
  );
}