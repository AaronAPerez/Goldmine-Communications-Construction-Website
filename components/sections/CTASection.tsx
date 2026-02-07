'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  ArrowRight, 
  Shield,
  Award
} from 'lucide-react';

/**
 * CTA (Call-to-Action) Section Component
 * 
 * Final conversion-focused section with:
 * - Multiple contact options
 * - Trust indicators
 * - Urgency elements
 * - Social proof
 */

interface CTAAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  type: 'primary' | 'secondary';
  ariaLabel: string;
}

const ctaActions: CTAAction[] = [
  {
    id: 'consultation',
    title: 'Schedule Consultation',
    description: 'Get expert advice tailored to your project needs',
    icon: <Phone className="w-6 h-6" />,
    href: '/contact',
    type: 'primary',
    ariaLabel: 'Schedule a consultation'
  },
  {
    id: 'quote',
    title: 'Request Quote',
    description: 'Get a detailed estimate for your project',
    icon: <Mail className="w-6 h-6" />,
    href: '/quote',
    type: 'secondary',
    ariaLabel: 'Request a project quote'
  }
];

const trustIndicators = [
  {
    icon: <Shield className="w-5 h-5" />,
    text: 'Licensed & Insured',
    detail: 'Lic# 1099543'
  },
  {
    icon: <Award className="w-5 h-5" />,
    text: '15+ Years Experience',
    detail: 'Proven Track Record'
  },
  // {
  //   icon: <Clock className="w-5 h-5" />,
  //   text: '24/7 Support',
  //   detail: 'Always Available'
  // }
];

/**
 * Animated CTA Button Component
 */
interface CTAButtonProps {
  action: CTAAction;
  index: number;
}

const CTAButton = ({ action, index }: CTAButtonProps) => {
  const isPrimary = action.type === 'primary';

  return (
    <motion.a
      href={action.href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center justify-center
        px-8 py-4 rounded-xl font-semibold text-lg
        transition-all duration-300 shadow-lg hover:shadow-xl
        ${isPrimary
          ? 'bg-[#a68729] text-white hover:bg-[#8a7122]'
          : 'bg-transparent text-white border-2 border-[#a68729] hover:bg-[#a68729] hover:text-white'
        }
      `}
      aria-label={action.ariaLabel}
    >
      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-all duration-300" />

      {/* Button Icon */}
      <span className={`
        mr-3 transition-transform duration-300 group-hover:scale-110
        ${isPrimary ? 'text-white' : 'text-[#a68729] group-hover:text-white'}
      `}>
        {action.icon}
      </span>

      {/* Button Content */}
      <span className="relative z-10">
        <span className="block font-bold">{action.title}</span>
        <span className={`
          block text-sm font-normal mt-1
          ${isPrimary ? 'text-white/80' : 'text-gray-300 group-hover:text-white/80'}
        `}>
          {action.description}
        </span>
      </span>

      {/* Arrow Icon */}
      <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 
                           group-hover:translate-x-1" />

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />
    </motion.a>
  );
};

/**
 * Main CTA Section Component
 */
const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 md:py-32"
      aria-labelledby="cta-heading"
    >
      {/* Gradient Overlay with Gold Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a68729]/20 via-transparent to-[#a68729]/20" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      {/* Decorative Gold Lines & Edge Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#a68729] to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#a68729]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#a68729] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#a68729]/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            id="cta-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Build Something
            <span className="text-[#a68729]"> Extraordinary?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join hundreds of satisfied clients who trust Goldmine for their most 
            important infrastructure projects. Let&apos;s discuss how we can bring your 
            vision to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {ctaActions.map((action, index) => (
              <CTAButton
                key={action.id}
                action={action}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-12"
        >
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm
                       rounded-xl px-4 py-3 border border-[#a68729]/30"
            >
              <span className="text-[#a68729]">
                {indicator.icon}
              </span>
              <div className="text-left">
                <div className="font-semibold text-white text-sm">
                  {indicator.text}
                </div>
                <div className="text-xs text-gray-400">
                  {indicator.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Urgency/Incentive Message */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30
                   max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-gray-900" />
            <span className="font-semibold text-gray-900">Special Offer</span>
          </div>
          <p className="text-gray-900">
            <strong>Competitive pricing</strong> for projects 
            started this quarter. Get your estimate today and see why we beat 
            competitor quotes by an average of 15%.
          </p>
        </motion.div> */}

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-white"
        >
          <p className="text-lg font-semibold mb-2 text-gray-300">
            Or call us directly:
          </p>
          <a
            href="tel:+19253055980"
            className="text-2xl font-bold text-[#a68729] hover:text-white transition-colors"
          >
            (925) 305-5980
          </a>
          <p className="text-sm mt-2 text-gray-400">
            Available Monday - Friday: 9:00 AM - 6:00 PM
          </p>
        </motion.div>

        {/* Final Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-gray-400 italic"
        >
          Building tomorrow&apos;s infrastructure, today.
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;