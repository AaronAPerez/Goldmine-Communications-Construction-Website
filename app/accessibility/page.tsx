'use client';

import { motion } from 'framer-motion';
import { Accessibility, Mail, Phone, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';

export default function AccessibilityPage() {
  const features = [
    {
      title: "Keyboard Navigation",
      description: "All interactive elements can be accessed and operated using keyboard controls (Tab, Enter, Arrow keys, etc.)"
    },
    {
      title: "Screen Reader Compatibility",
      description: "Our website is designed to work with popular screen readers including JAWS, NVDA, and VoiceOver"
    },
    {
      title: "Alt Text for Images",
      description: "All meaningful images include descriptive alternative text for users who cannot see images"
    },
    {
      title: "Color Contrast",
      description: "Text and background colors meet WCAG 2.1 AA standards for contrast ratios"
    },
    {
      title: "Responsive Design",
      description: "Our website adapts to different screen sizes and can be zoomed up to 200% without loss of functionality"
    },
    {
      title: "Clear Navigation",
      description: "Consistent navigation structure with clear headings and landmarks to help users find content"
    },
    {
      title: "Form Accessibility",
      description: "Forms include clear labels, instructions, and error messages to guide users through completion"
    },
    {
      title: "Skip Links",
      description: "Skip navigation links allow keyboard users to bypass repetitive content"
    }
  ];

  const standards = [
    {
      name: "WCAG 2.1 Level AA",
      description: "We strive to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards"
    },
    {
      name: "Section 508",
      description: "Our website aims to comply with Section 508 of the Rehabilitation Act"
    },
    {
      name: "ADA Compliance",
      description: "We work to ensure our digital presence is accessible under the Americans with Disabilities Act"
    }
  ];

  const lastUpdated = "January 19, 2025";

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
                <Accessibility className="w-12 h-12 text-gold-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Goldmine Communications and Construction is committed to ensuring digital accessibility for people with disabilities.
            </p>
            <div className="flex items-center justify-center text-gray-400">
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Commitment Statement */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-lg">
            <div className="flex items-start">
              <Info className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Commitment</h2>
                <p className="text-gray-700 leading-relaxed">
                  Goldmine Communications and Construction Inc. is committed to ensuring that our website is accessible to
                  people with disabilities. We are continually improving the user experience for everyone and applying the
                  relevant accessibility standards to ensure we provide equal access to all of our users.
                </p>
              </div>
            </div>
          </div>

          {/* Conformance Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
              Conformance Status
            </h2>
            <div className="space-y-4">
              {standards.map((standard, index) => (
                <motion.div
                  key={standard.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-gold-400/30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{standard.name}</h3>
                    <p className="text-gray-600 text-sm">{standard.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Accessibility Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
              Accessibility Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gold-400/30 hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
              Technical Specifications
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Accessibility of our website relies on the following technologies to work with the particular combination
                of web browser and any assistive technologies or plugins installed on your computer:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>HTML5</li>
                <li>WAI-ARIA (Accessible Rich Internet Applications)</li>
                <li>CSS (Cascading Style Sheets)</li>
                <li>JavaScript (with graceful degradation)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                These technologies are relied upon for conformance with the accessibility standards used.
              </p>
            </div>
          </motion.div>

          {/* Limitations and Alternatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
              Known Limitations
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Despite our best efforts to ensure accessibility, there may be some limitations. We are actively working
                    to identify and fix any issues. Known limitations include:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>Some older PDF documents may not be fully accessible - we are working to remediate these</li>
                    <li>Third-party embedded content (maps, videos) may have limited accessibility features</li>
                    <li>Some complex interactive features are still being enhanced for optimal screen reader support</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    If you encounter any accessibility barriers, please contact us for assistance or alternative access options.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Assessment Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
              Assessment Approach
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="leading-relaxed mb-4">
                Goldmine Communications and Construction assesses the accessibility of our website through:
              </p>
              <ul className="space-y-2">
                <li>Self-evaluation using automated accessibility testing tools</li>
                <li>Manual testing with keyboard-only navigation</li>
                <li>Screen reader testing with popular assistive technologies</li>
                <li>Ongoing monitoring and user feedback</li>
                <li>Regular updates to maintain compliance with evolving standards</li>
              </ul>
            </div>
          </motion.div>

          {/* Feedback and Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
              Feedback and Contact Information
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed mb-6">
              <p className="mb-4">
                We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers
                or have suggestions for improvement, please let us know:
              </p>
            </div>

            <div className="bg-gray-900 text-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-gold-400">Contact Our Accessibility Team</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gold-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:+19253055980" className="text-gold-400 hover:text-gold-300 transition-colors">
                      (925) 305-5980
                    </a>
                    <p className="text-sm text-gray-400 mt-1">Monday-Friday, 9:00 AM - 6:00 PM PST</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gold-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:a.lopez@goldminecomm.net" className="text-gold-400 hover:text-gold-300 transition-colors">
                      a.lopez@goldminecomm.net
                    </a>
                    <p className="text-sm text-gray-400 mt-1">We aim to respond within 2 business days</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-300">
                  When reporting an accessibility issue, please include:
                </p>
                <ul className="text-sm text-gray-400 mt-2 space-y-1 ml-4">
                  <li>The web page or feature where you experienced the issue</li>
                  <li>A description of the problem</li>
                  <li>The assistive technology you were using (if applicable)</li>
                  <li>Your contact information for follow-up</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Formal Complaints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
              Formal Complaints
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                If you are not satisfied with our response to your accessibility concern, you may file a formal complaint with:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="font-semibold mb-2">U.S. Department of Justice</p>
                <p className="text-sm">
                  Civil Rights Division<br />
                  Disability Rights Section<br />
                  950 Pennsylvania Avenue, N.W.<br />
                  Washington, D.C. 20530
                </p>
                <p className="text-sm mt-3">
                  Website: <a href="https://www.ada.gov" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.ada.gov</a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Back to Home Link */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
