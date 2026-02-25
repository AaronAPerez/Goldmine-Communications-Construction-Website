'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
 
  Award,
  Star,
  ExternalLink,
  Shield
} from 'lucide-react';
import Image from 'next/image';

/**
 * Enhanced Footer Component
 * 
 * Improvements:
 * - Better visual hierarchy and spacing
 * - Enhanced accessibility features
 * - Improved responsive design
 * - Added business highlights section
 * - Better SEO structure with proper headings
 * - Enhanced hover states and animations
 * - Improved color scheme consistency
 */

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Communications', href: '/communications' },
      { label: 'Construction', href: '/construction' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' },
      // { label: 'Careers', href: '/careers' }
    ]
  },
  {
    title: 'Our Services',
    links: [
      { label: 'Communications Infrastructure', href: '/communications' },
      { label: 'Construction Services', href: '/construction' },
      { label: 'Network Solutions', href: '/communications' },
      { label: 'Project Management', href: '/construction' },
      { label: 'Maintenance & Support', href: '/services' },
      { label: 'Consulting & Design', href: '/services' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '/projects' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Sitemap', href: '/sitemap' }
    ]
  }
];

const businessHighlights = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Licensed & Insured',
    subtitle: 'Lic# 1099543',
    description: 'Fully bonded and insured for your protection'
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: '15+ Years Experience',
    subtitle: 'Industry Leaders',
    description: 'Specialized expertise in healthcare and infrastructure'
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'We Beat Estimates',
    subtitle: 'Competitive Pricing',
    description: 'Forward your estimate - we\'ll beat it!'
  }
];

// const socialLinks = [
//   { 
//     name: 'Facebook', 
//     href: '#', 
//     icon: <Facebook size={20} />,
//     color: 'hover:text-blue-500'
//   },
//   { 
//     name: 'Twitter', 
//     href: '#', 
//     icon: <Twitter size={20} />,
//     color: 'hover:text-sky-500'
//   },
//   { 
//     name: 'LinkedIn', 
//     href: '#', 
//     icon: <Linkedin size={20} />,
//     color: 'hover:text-blue-600'
//   },
//   { 
//     name: 'Instagram', 
//     href: '#', 
//     icon: <Instagram size={20} />,
//     color: 'hover:text-pink-500'
//   }
// ];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B3995D' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section - Company Info & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-2">
                <div className="relative w-28 h-28 backdrop-blur-sm 0">
                  <Image
                    src="/images/logo/logo-circular.jpg"
                    alt="Goldmine and Construction"
                    width={100}
                    height={100}
                    className="object-cover rounded-full border-4 border-gold-400 group-hover:border-gold-300 transition-colors"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gold-400 group-hover:text-gold-300 transition-colors">
                    Goldmine Construction
                  </h2>
                  <p className="text-xl text-gray-300">Services</p>
                </div>
              </div>
            </Link>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed max-w-md">
                Excellence in communications and construction services. Building tomorrow&apos;s
                infrastructure with over 15 years of specialized experience in Northern California.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center group">
                  <MapPin className="text-gold-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    1161 Brick and Tile Circle, Stockton, California 95206
                  </span>
                </div>
                <div className="flex items-center group">
                  <Phone className="text-gold-400 mr-3 flex-shrink-0" size={20} />
                  <a
                    href="tel:+19253055980"
                    className="text-gray-300 hover:text-gold-400 transition-colors font-medium"
                  >
                    (925) 305-5980
                  </a>
                </div>
                <div className="flex items-center group">
                  <Mail className="text-gold-400 mr-3 flex-shrink-0" size={20} />
                  <a
                    href="mailto:a.lopez@goldminecomm.net"
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    a.lopez@goldminecomm.net
                  </a>
                </div>
                <div className="flex items-center group">
                  <Clock className="text-gold-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-300">
                    Mon-Fri: 9AM-6PM | Sat: 10AM-2PM
                  </span>
                </div>
              </div>

              {/* Social Media Links */}
              {/* <div className="flex space-x-4 pt-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg bg-gray-800 text-gray-400 ${social.color} 
                               transition-all duration-300 hover:bg-gray-700 hover:shadow-lg`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div> */}
            </div>
          </motion.div>

          {/* Business Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us</h3>
            <div className="grid grid-cols-1 gap-6">
              {businessHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="group p-6 bg-gray-800/50 rounded-xl border border-gray-700 
                           hover:border-gold-400/30 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gold-400/10 rounded-lg text-gold-400 
                                  group-hover:bg-gold-400/20 transition-colors">
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-gold-400 transition-colors">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-gold-400 font-medium mb-1">
                        {highlight.subtitle}
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Emergency Contact */}
            {/* <div className="bg-gradient-to-r from-gold-400/10 to-gold-600/10 rounded-xl p-6 border border-gold-400/20">
              <h4 className="font-semibold text-gold-400 mb-2">24/7 Emergency Services</h4>
              <p className="text-gray-300 text-sm mb-3">
                Available for urgent infrastructure needs and emergency repairs.
              </p>
              <a
                href="tel:+19253055980"
                className="inline-flex items-center px-4 py-2 bg-gold-400 hover:bg-gold-500 
                         text-black font-medium rounded-lg transition-colors text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline
              </a>
            </div> */}
          </motion.div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-gray-300 hover:text-gold-400 
                               transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gold-400 mr-0 
                                     group-hover:mr-2 transition-all duration-200"></span>
                      {link.label}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="max-w-md mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2 text-white">Stay Connected</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Subscribe to our newsletter for the latest updates, industry insights, 
                and project showcases.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent
                           text-white placeholder-gray-400 min-w-[280px]"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black 
                           font-medium rounded-lg transition-colors whitespace-nowrap
                           flex items-center justify-center"
                >
                  Subscribe
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              © {currentYear} Goldmine Construction Services Inc. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Building tomorrow&apos;s infrastructure with excellence and integrity.
            </p>
          </div>
        </div>
                     {/* AP Designs Credit */}
        <div className="py-8 px-4 flex items-center justify-center gap-2 text-sm text-[#A5ACAF] dark:text-gray-400">
          <span>Website by</span>
          <a
            href="https://www.aaronaperez.dev/?utm_source=footer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium hover:text-gold-400 transition-colors focus:outline-none focus:text-gold-400"
          >
            <Image
              src="/icons/AP-Designs-Icon-48x48.svg"
              alt="AP Designs Logo"
              width={20}
              height={20}
              className="w-5 h-5 transition-colors"
            />
            AP Designs
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold-400/5 rounded-full blur-3xl" />
    </footer>
  );
}