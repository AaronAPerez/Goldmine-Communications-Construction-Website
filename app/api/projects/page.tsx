
import React from 'react';
import { Metadata } from 'next';
import ProjectShowcase from '@/components/Projects/ProjectShowcase';



// Generate metadata for the projects page
export const metadata: Metadata = {
  title: 'Our Projects | Goldmine Construction Services',
  description: 'Explore our portfolio of completed communications and construction projects showcasing our expertise and quality workmanship.',
  keywords: ['projects', 'portfolio', 'communications', 'construction', 'infrastructure', 'case studies'],
  openGraph: {
    title: 'Our Projects | Goldmine Construction Services',
    description: 'Explore our portfolio of completed communications and construction projects.',
    type: 'website',
  },
};

// Projects page component - no params needed for the main projects page
export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Portfolio
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our completed projects that demonstrate our expertise in 
            communications infrastructure and professional construction services.
          </p>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-24">
        <ProjectShowcase />
      </section>
    </div>
  );
}