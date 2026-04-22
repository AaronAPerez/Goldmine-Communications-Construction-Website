'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import BusinessHours from './BusinessHours';

/**
 * Contact Page Component
 * 
 * Comprehensive contact page that integrates seamlessly with existing design:
 * - Enhanced accessibility features
 * - Professional presentation matching site style
 * - Interactive elements and animations
 * - SEO optimized
 */

// Contact information data
const contactMethods = [
  {
    id: 'address',
    icon: <MapPin className="w-6 h-6" />,
    title: 'Office Location',
    primary: '1161 Brick and Tile Circle',
    secondary: 'Stockton, California 95206',
    description: 'Main Office & Headquarters',
    action: {
      label: 'Get Directions',
      href: 'https://maps.google.com/?q=1161+Brick+and+Tile+Circle,+Stockton,+CA+95206',
      external: true
    }
  },
  {
    id: 'phone',
    icon: <Phone className="w-6 h-6" />,
    title: 'Phone Numbers',
    primary: '(925) 305-5980',
    secondary: '(510) 695-3177',
    description: 'Main Line & Support',
    action: {
      label: 'Call Now',
      href: 'tel:+19253055980',
      external: false
    }
  },
  {
    id: 'email',
    icon: <Mail className="w-6 h-6" />,
    title: 'Email Addresses',
    primary: 'a.lopez@goldminecomm.net',
    secondary: 'm.nanney@goldminecomm.net',
    description: 'General Inquiries & Support',
    action: {
      label: 'Send Email',
      href: 'mailto:a.lopez@goldminecomm.net',
      external: false
    }
  },
  {
    id: 'service-area',
    icon: <Globe className="w-6 h-6" />,
    title: 'Service Areas',
    primary: 'San Francisco Bay Area',
    secondary: 'Sacramento & Central Valley',
    description: 'Northern California Coverage',
    action: {
      label: 'Coverage Map',
      href: '/service-areas',
      external: false
    }
  }
];


// Key features/differentiators
const keyFeatures = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Licensed & Insured',
    description: 'Lic# 1099543 | Fully Bonded',
    color: 'text-blue-500'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: '60+ Years Combined Experience',
    description: 'Healthcare & Communications Specialist',
    color: 'text-green-500'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'We Beat Estimates',
    description: 'Competitive Pricing Guarantee',
    color: 'text-gold-500'
  }
];

/**
 * Contact Method Card Component
 * Displays individual contact information in an interactive card format
 */
interface ContactCardProps {
  method: typeof contactMethods[0];
  index: number;
}

const ContactCard = ({ method, index }: ContactCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                 hover:-translate-y-1 border border-gray-100 overflow-hidden group"
    >
      <div className="p-6">
        {/* Card Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gold-50 rounded-lg text-gold-500 group-hover:bg-gold-500 
                        group-hover:text-white transition-colors duration-300">
            {method.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
            <p className="text-sm text-gray-500">{method.description}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-2 mb-4">
          {method.id === 'phone' || method.id === 'email' ? (
            <a
              href={method.action.href}
              className="text-gray-900 font-medium hover:text-gold-500 transition-colors block"
            >
              {method.primary}
            </a>
          ) : (
            <p className="text-gray-900 font-medium">{method.primary}</p>
          )}
          {method.id === 'phone' ? (
            <a
              href="tel:+15106953177"
              className="text-gray-600 text-sm hover:text-gold-500 transition-colors block"
            >
              {method.secondary}
            </a>
          ) : method.id === 'email' ? (
            <a
              href="mailto:m.nanney@goldminecomm.net"
              className="text-gray-600 text-sm hover:text-gold-500 transition-colors block"
            >
              {method.secondary}
            </a>
          ) : (
            <p className="text-gray-600 text-sm">{method.secondary}</p>
          )}
        </div>

        {/* Action Button */}
        <motion.a
          href={method.action.href}
          target={method.action.external ? '_blank' : undefined}
          rel={method.action.external ? 'noopener noreferrer' : undefined}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gold-500 
                   text-gray-700 hover:text-white rounded-lg transition-colors duration-200 
                   text-sm font-medium group-hover:bg-gold-500 group-hover:text-white"
          aria-label={`${method.action.label} - ${method.title}`}
        >
          {method.action.label}
        </motion.a>
      </div>
    </motion.div>
  );
};


/**
 * Key Features Section
 * Highlights business differentiators and credentials
 */
const KeyFeatures = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuresRef, { once: true });

  return (
    <motion.div
      ref={featuresRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 shadow-lg border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Why Choose Goldmine Communications?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {keyFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 + (index * 0.1) }}
            className="text-center group cursor-default"
          >
            <div className={`inline-flex p-4 rounded-full bg-gray-100 group-hover:bg-gold-50 
                          transition-colors duration-300 mb-4 ${feature.color}`}>
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Main Contact Page Component
 */
const ContactPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-gold-400 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>


      <main id="main-content" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative overflow-hidden"
            aria-labelledby="contact-hero-heading"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white"
              >
                <h1
                  id="contact-hero-heading"
                  className="text-4xl md:text-6xl font-bold mb-6 text-black"
                >
                  Get In
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                    {' '}Touch
                  </span>
                </h1>            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              {/* <h2
                id="contact-methods-heading"
                className="text-3xl md:text-4xl font-bold text-gray-300 mb-4"
              >
                Multiple Ways to Reach Us
              </h2> */}
              <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                Choose the most convenient way to get in touch. We&apos;re here to help
                with all your communications and construction needs.
              </p>
            </motion.div>

                {/* <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Ready to start your next project? Let&apos;s discuss how we can bring your
                  vision to life with expert communications and construction services.
                </p> */}


              </motion.div>
            </div>
          </section>

          {/* Main Content */}
          {/* <main id="main-content" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}

          {/* Contact Methods Grid */}
        



          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact Form Section */}
            <section
              className="lg:col-span-2"
              aria-labelledby="contact-form-heading"
            >
              {/* Contact Methods Grid */}
              <section
                className="mb-24"
                aria-labelledby="contact-methods-heading"
              >


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {contactMethods.map((method, index) => (
                    <ContactCard
                      key={method.id}
                      method={method}
                      index={index}
                    />
                  ))}
                </div>
              </section>

              {/* Contact Form */}
              {/* <ContactForm /> */}
            </section>

            {/* Sidebar Content */}
            <aside className="lg:col-span-1 space-y-8">
        {/* Company Logo */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/images/logo/logo-circular.jpg"
                    alt="Goldmine Communications and Construction Logo"
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Goldmine Construction Services
                </h3>
                <p className="text-gray-600 text-sm">
                  Excellence in communications and construction services throughout
                  Northern California.
                </p>
              </motion.div>
              {/* Business Hours */}
              <BusinessHours />

      

            </aside>
          </div>

          {/* Key Features Section */}
          <section className="mt-24">
            <KeyFeatures />
          </section>

          {/* Final CTA Section */}
          <section className="mt-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl p-12 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Next Project?
              </h2>
              <p className="text-xl text-gold-100 max-w-2xl mx-auto mb-8">
                Schedule a consultation and discover how we can help bring your
                communications and construction vision to life.
              </p>
              <motion.a
                href="tel:+19253055980"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-white text-gold-600 
                         hover:bg-gray-50 font-medium rounded-lg transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now for a Quote
              </motion.a>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default ContactPage;