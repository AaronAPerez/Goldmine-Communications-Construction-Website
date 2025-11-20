'use client';

import { motion } from 'framer-motion';
import { Map, Home, Info, Briefcase, FolderOpen, Mail, Users, Phone } from 'lucide-react';
import Link from 'next/link';

interface SitemapSection {
  title: string;
  icon: React.ReactNode;
  links: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export default function SitemapPage() {
  const sitemapSections: SitemapSection[] = [
    {
      title: "Main Pages",
      icon: <Home className="w-6 h-6" />,
      links: [
        { label: "Home", href: "/", description: "Welcome to Goldmine Communications" },
        { label: "About Us", href: "/about", description: "Learn about our company and team" },
        { label: "Services", href: "/services", description: "Overview of our services" },
        { label: "Projects", href: "/projects", description: "View our completed projects" },
        { label: "Contact", href: "/contact", description: "Get in touch with us" },
        { label: "Careers", href: "/careers", description: "Join our team" }
      ]
    },
    {
      title: "Services",
      icon: <Briefcase className="w-6 h-6" />,
      links: [
        { label: "Communications Infrastructure", href: "/communications", description: "Telecommunications and network services" },
        { label: "Construction Services", href: "/construction", description: "General construction and project management" }
      ]
    },
    {
      title: "Projects",
      icon: <FolderOpen className="w-6 h-6" />,
      links: [
        { label: "All Projects", href: "/projects", description: "Browse our project portfolio" },
        { label: "Case Studies", href: "/projects", description: "Detailed project information" }
      ]
    },
    {
      title: "Company Information",
      icon: <Info className="w-6 h-6" />,
      links: [
        { label: "About Us", href: "/about", description: "Company history and values" },
        { label: "Careers", href: "/careers", description: "Current job opportunities" }
      ]
    },
    {
      title: "Contact & Support",
      icon: <Phone className="w-6 h-6" />,
      links: [
        { label: "Contact Us", href: "/contact", description: "Send us a message or request a quote" },
        { label: "Get a Quote", href: "/contact", description: "Request an estimate for your project" }
      ]
    },
    {
      title: "Legal & Policy",
      icon: <Users className="w-6 h-6" />,
      links: [
        { label: "Privacy Policy", href: "/privacy-policy", description: "How we handle your information" },
        { label: "Terms of Service", href: "/terms", description: "Terms and conditions of use" },
        { label: "Accessibility", href: "/accessibility", description: "Our commitment to accessibility" },
        { label: "Sitemap", href: "/sitemap", description: "This page - website navigation" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B3995D' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gold-400/10 rounded-2xl backdrop-blur-sm border border-gold-400/20">
                <Map className="w-12 h-12 text-gold-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Navigate through all pages and sections of the Goldmine Communications and Construction website
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-gold-400/30 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gold-400/10 rounded-lg text-gold-400 mr-3">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              </div>

              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.href + link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start">
                        <span className="w-0 group-hover:w-1.5 h-0 group-hover:h-6 bg-gold-400 mr-0 group-hover:mr-3 transition-all duration-200 rounded"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 group-hover:text-gold-600 transition-colors">
                            {link.label}
                          </p>
                          {link.description && (
                            <p className="text-sm text-gray-600 mt-1 leading-snug">
                              {link.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Quick Contact</h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center">
                  <Phone className="w-5 h-5 text-gold-400 mr-3" />
                  <a href="tel:+19253055980" className="hover:text-gold-400 transition-colors">
                    (925) 305-5980
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 text-gold-400 mr-3" />
                  <a href="mailto:info@goldminecomm.net" className="hover:text-gold-400 transition-colors">
                    info@goldminecomm.net
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
