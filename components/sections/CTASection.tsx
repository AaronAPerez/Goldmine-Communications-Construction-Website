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
    title: 'Free Consultation',
    description: 'Get expert advice tailored to your project needs',
    icon: <Phone className="w-6 h-6" />,
    href: '/contact',
    type: 'primary',
    ariaLabel: 'Schedule a free consultation'
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
          ? 'bg-white text-gray-900 hover:bg-gray-50' 
          : 'bg-gray-900 text-white border-2 border-white hover:bg-white hover:text-gray-900'
        }
      `}
      aria-label={action.ariaLabel}
    >
      {/* Gradient Background for Primary Button */}
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#C4A032] to-[#D4AF37] 
                       rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
      )}

      {/* Button Icon */}
      <span className={`
        mr-3 transition-transform duration-300 group-hover:scale-110
        ${isPrimary ? 'text-[gold-600]' : 'text-current'}
      `}>
        {action.icon}
      </span>

      {/* Button Content */}
      <span className="relative z-10">
        <span className="block font-bold">{action.title}</span>
        <span className={`
          block text-sm font-normal mt-1
          ${isPrimary ? 'text-gray-600' : 'text-gray-300 group-hover:text-gray-600'}
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
      className="relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Ready to Build Something
            <span className="text-white"> Extraordinary?</span>
          </h2>
          <p className="text-xl text-gray-900/80 max-w-3xl mx-auto mb-8">
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
                       rounded-xl px-4 py-3 border-2 border-black/20"
            >
              <span className="text-gray-900">
                {indicator.icon}
              </span>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">
                  {indicator.text}
                </div>
                <div className="text-xs text-gray-700">
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
            <strong>Free consultation</strong> and competitive pricing for projects 
            started this quarter. Get your estimate today and see why we beat 
            competitor quotes by an average of 15%.
          </p>
        </motion.div> */}

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-gray-900"
        >
          <p className="text-lg font-semibold mb-2">
            Or call us directly:
          </p>
          <a 
            href="tel:+19253055980"
            className="text-2xl font-bold hover:text-white transition-colors"
          >
            (925) 305-5980
          </a>
          <p className="text-sm mt-2 opacity-80">
            Available Monday - Friday: 9:00 AM - 6:00 PM
          </p>
        </motion.div>

        {/* Final Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-gray-900/70 italic"
        >
          Building tomorrow&apos;s infrastructure, today.
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;