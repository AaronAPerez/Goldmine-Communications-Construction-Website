'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Network,
  Radio,
  Zap,
  Building,
  HardHat,
  Wrench,
  Lightbulb,
  Shield,
  FlaskConical
} from 'lucide-react';

/**
 * Services Preview Section for Homepage
 * Displays a condensed overview of all NECA-certified services
 * with links to the full services page
 */

interface ServicePreview {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

const serviceCategories = [
  {
    id: 'commercial-industrial',
    title: 'Commercial & Industrial',
    services: [
      {
        id: 'communications',
        title: 'Communications & Networking',
        description: 'Data centers, structured cabling, and fiber optic systems',
        icon: <Network className="w-6 h-6" />,
        color: 'from-blue-500 to-blue-600',
        href: '/services#commercial-industrial'
      },
      {
        id: 'security',
        title: 'Security & Access Control',
        description: 'CCTV, surveillance, and integrated security systems',
        icon: <Shield className="w-6 h-6" />,
        color: 'from-purple-500 to-purple-600',
        href: '/services#commercial-industrial'
      }
    ]
  },
  {
    id: 'electrical-infrastructure',
    title: 'Electrical Infrastructure',
    services: [
      {
        id: 'ev-charging',
        title: 'EV Charging Stations',
        description: 'Commercial and fleet charging infrastructure',
        icon: <Zap className="w-6 h-6" />,
        color: 'from-green-500 to-green-600',
        href: '/services#electrical-infrastructure'
      },
      {
        id: 'power-generation',
        title: 'Power & Substations',
        description: 'Generation, transmission, and distribution systems',
        icon: <Lightbulb className="w-6 h-6" />,
        color: 'from-amber-500 to-amber-600',
        href: '/services#electrical-infrastructure'
      }
    ]
  },
  {
    id: 'utility-municipal',
    title: 'Utility & Municipal',
    services: [
      {
        id: 'street-lighting',
        title: 'Street Lighting & Traffic',
        description: 'Municipal lighting and traffic control systems',
        icon: <Building className="w-6 h-6" />,
        color: 'from-cyan-500 to-cyan-600',
        href: '/services#utility-municipal'
      },
      {
        id: 'underground',
        title: 'Underground Utilities',
        description: 'Trenching, grading,conduit, and cable splicing',
        icon: <HardHat className="w-6 h-6" />,
        color: 'from-stone-500 to-stone-600',
        href: '/services#utility-municipal'
      }
    ]
  },
  {
    id: 'specialty',
    title: 'Specialty Services',
    services: [
      {
        id: 'wireless',
        title: 'Wireless & Telecommunications',
        description: '5G, small cells, and macro tower solutions',
        icon: <Radio className="w-6 h-6" />,
        color: 'from-rose-500 to-rose-600',
        href: '/services#commercial-industrial'
      },
      {
        id: 'testing',
        title: 'Testing & Certification',
        description: 'Electrical testing, PIM sweep, and fiber OTDR',
        icon: <FlaskConical className="w-6 h-6" />,
        color: 'from-indigo-500 to-indigo-600',
        href: '/services#testing-certification'
      }
    ]
  }
];

interface ServiceCardProps {
  service: ServicePreview;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={service.href}
        className="group block bg-white/10 backdrop-blur-md rounded-xl shadow-lg
                   hover:shadow-gold-500/10 transition-all duration-500 overflow-hidden
                   border border-white/10 hover:border-gold-400/30 hover:bg-white/15
                   hover:-translate-y-1"
      >
        <div className={`relative p-4 bg-gradient-to-r ${service.color} text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="relative flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              {service.icon}
            </div>
            <h3 className="text-base font-bold tracking-tight">{service.title}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesPreviewSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      aria-labelledby="services-preview-heading"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-gold-500/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-500/8 to-transparent" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gold-400/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-gold-400/10 text-gold-400 rounded-full text-sm font-semibold mb-4 border border-gold-400/20"
          >
            NECA-Certified Contractor
          </motion.span>
          <h2
            id="services-preview-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              {' '}Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive electrical and communications solutions for commercial,
            industrial, and municipal projects throughout California, Nevada, and Oregon.
          </p>
        </motion.div>

        {/* Services Grid by Category */}
        <div className="space-y-10">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
            >
              <h3 className="text-lg font-semibold text-gold-400 mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2" />
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.services.map((service, serviceIndex) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={categoryIndex * 2 + serviceIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm
                          rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Looking for a Specific Service?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We offer a complete range of NECA-certified electrical and communications services.
              View our full service catalog for detailed capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600
                           text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl
                           hover:from-gold-500 hover:to-gold-700"
                >
                  View All Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-gold-400
                           text-gold-400 hover:bg-gold-400 hover:text-white font-medium
                           rounded-xl transition-colors"
                >
                  Get an Estimate
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
