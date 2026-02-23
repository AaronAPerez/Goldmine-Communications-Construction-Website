
import React from 'react';
import { Metadata } from 'next';

import {
  Award,
  CheckCircle,
  ArrowRight,
  Building,
  Target,
  Shield,
} from 'lucide-react';
import ProjectShowcase from '@/components/Projects/ProjectShowcase';

/**
 * Enhanced metadata for the projects page
 * Includes comprehensive SEO optimization
 */
export const metadata: Metadata = {
  title: 'Our Projects Portfolio | Goldmine Communications & Construction',
  description: 'Explore our comprehensive portfolio of completed communications infrastructure and construction projects showcasing quality workmanship, innovative solutions, and client satisfaction.',
  keywords: [
    'construction projects',
    'communications infrastructure',
    'portfolio',
    'case studies',
    'infrastructure development',
    'commercial construction',
    'project gallery',
    'completed projects',
    'northern california construction',
    'telecommunications projects'
  ],
  openGraph: {
    title: 'Our Projects Portfolio | Goldmine Communications & Construction',
    description: 'Discover our completed projects demonstrating expertise in communications and construction.',
    type: 'website',
    images: [
      {
        url: '/images/projects/IMG_20250522_18_3649 (10).jpg',
        width: 1200,
        height: 630,
        alt: 'Goldmine Communications & Construction Project Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects Portfolio | Goldmine Communications & Construction',
    description: 'Discover our completed projects demonstrating expertise in communications and construction.',
    images: ['/images/projects/IMG_20250522_18_3649 (10).jpg']
  }
};


/**
 * Our approach highlights
 */
const approachHighlights = [
  {
    title: 'Precision Planning',
    description: 'Every project begins with meticulous planning and detailed analysis to ensure optimal outcomes.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Quality Execution',
    description: 'Our experienced teams deliver exceptional workmanship with attention to every detail.',
    icon: <Building className="w-8 h-8" />,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Safety First',
    description: 'Uncompromising commitment to safety standards and regulatory compliance.',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600'
  }
];

/**
 * Enhanced Projects Page Component
 * Features improved layout, accessibility, and visual presentation
 */
export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section with Statistics */}
      {/* <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-24 overflow-hidden">
        {/* Background Pattern 
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div> 

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {' '}Portfolio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive portfolio of completed projects that demonstrate 
              our expertise in communications infrastructure and professional construction services 
              throughout Northern California.
            </p>
          </div>

          {/* Company Statistics Grid */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {companyStats.map((stat) => (
              <div 
                key={stat.label}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-gold-400 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div> */}

      {/* Call to Action Buttons */}
      {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="inline-flex items-center px-8 py-4 bg-gold-400 hover:bg-gold-500 
                       text-white font-medium rounded-lg transition-colors shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Explore Our Work
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white
                       text-white hover:bg-white hover:text-gray-900 font-medium 
                       rounded-lg transition-colors
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Start Your Project
            </a>
          </div> */}
      {/* </div>
      </section> */}

      {/* Our Approach Section */}
      {/* <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Proven Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every project we undertake follows our time-tested methodology that ensures 
              exceptional results and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approachHighlights.map((highlight) => (
              <div 
                key={highlight.title}
                className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${highlight.color} text-white mb-6`}>
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Main Projects Showcase Section */}
      <section id="portfolio" className="py-6 bg-gray-50">
        <ProjectShowcase />
      </section>



      {/* Professional Credentials Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Licensed, Bonded & Insured
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Your confidence is our foundation. We maintain all necessary licenses,
            bonds, and insurance coverage to protect your investment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Shield className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">License #1099543</h3>
              <p className="text-gray-300">Fully licensed contractor in California with proven compliance record</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Bonded & Insured</h3>
              <p className="text-gray-300">Comprehensive coverage and bonding for complete project protection</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Award className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">We Beat Estimates</h3>
              <p className="text-gray-300">Forward your estimate - we&apos;ll provide a competitive alternative!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Proven Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every project we undertake follows our time-tested methodology that ensures
              exceptional results and client satisfaction.
            </p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approachHighlights.map((highlight) => (
            <div
              key={highlight.title}
              className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${highlight.color} text-white mb-6`}>
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {highlight.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

      </section>


      {/* Contact Information */}
      <section>
        <div className="border-t border-white/20">
          <div className="text-white/80">
            <p className="text-lg font-semibold mb-2">Ready to discuss your next project?</p>
            <p className="text-sm">
              1161 Brick and Tile Circle, Stockton, CA 95206 | <a href="tel:+19253055980" className="hover:text-white transition-colors">(925) 305-5980</a> | <a href="mailto:a.lopez@goldminecomm.net" className="hover:text-white transition-colors">a.lopez@goldminecomm.net</a>
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 bg-gradient-to-r from-gold-400 to-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Transform Your Vision Into Reality
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join our satisfied clients who have experienced the Goldmine difference.
            Let&apos;s bring your next project to life with precision and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-gold-600 
                       hover:bg-gray-50 font-medium rounded-lg transition-colors shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gold-500"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-white
                       text-white hover:bg-white hover:text-gold-600 font-medium 
                       rounded-lg transition-colors
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gold-500"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </div >
  );
}