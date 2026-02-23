'use client';

import { motion } from 'framer-motion';
import { Shield, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "We collect information that you provide directly to us when you:",
        "• Request a quote or estimate for our services",
        "• Contact us via phone, email, or our contact form",
        "• Submit a career application",
        "• Subscribe to our newsletter or communications",
        "",
        "This information may include your name, email address, phone number, mailing address, company name, and project details."
      ]
    },
    {
      title: "Automatically Collected Information",
      content: [
        "When you visit our website, we may automatically collect certain information about your device, including:",
        "• IP address",
        "• Browser type and version",
        "• Pages you visit and time spent on pages",
        "• Referring website addresses",
        "• Device type and operating system",
        "",
        "This information is collected through cookies and similar tracking technologies to improve our website functionality and user experience."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "We use the information we collect to:",
        "• Provide, maintain, and improve our services",
        "• Respond to your inquiries and provide customer support",
        "• Send you project updates, estimates, and service information",
        "• Process employment applications",
        "• Comply with legal obligations",
        "• Detect and prevent fraud or security issues",
        "• Analyze website usage and improve our online presence"
      ]
    },
    {
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
        "",
        "• Service Providers: With trusted third-party vendors who assist us in operating our website and conducting our business (e.g., email service providers, hosting providers)",
        "• Legal Requirements: When required by law, court order, or government regulation",
        "• Business Transfers: In connection with any merger, sale of company assets, or acquisition",
        "• Consent: With your explicit consent for any other purpose"
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:",
        "• Secure SSL encryption for data transmission",
        "• Regular security assessments and updates",
        "• Restricted access to personal information",
        "• Secure data storage practices",
        "",
        "However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security."
      ]
    },
    {
      title: "Your Rights and Choices",
      content: [
        "Depending on your location, you may have certain rights regarding your personal information:",
        "",
        "• Access: Request access to the personal information we hold about you",
        "• Correction: Request correction of inaccurate or incomplete information",
        "• Deletion: Request deletion of your personal information",
        "• Opt-Out: Unsubscribe from marketing communications at any time",
        "• Data Portability: Request a copy of your data in a portable format",
        "",
        "To exercise these rights, please contact us using the information provided below."
      ]
    },
    {
      title: "California Privacy Rights (CCPA)",
      content: [
        "If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):",
        "",
        "• Right to know what personal information is collected",
        "• Right to know if personal information is sold or disclosed",
        "• Right to opt-out of the sale of personal information",
        "• Right to request deletion of personal information",
        "• Right to non-discrimination for exercising CCPA rights",
        "",
        "We do not sell personal information. To exercise your CCPA rights, contact us at a.lopez@goldminecomm.net."
      ]
    },
    {
      title: "Cookies and Tracking Technologies",
      content: [
        "Our website uses cookies and similar tracking technologies to enhance your browsing experience. You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.",
        "",
        "Types of cookies we use:",
        "• Essential cookies: Required for website operation",
        "• Analytics cookies: Help us understand website usage",
        "• Functional cookies: Remember your preferences",
      ]
    },
    {
      title: "Third-Party Links",
      content: [
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit."
      ]
    },
    {
      title: "Children's Privacy",
      content: [
        "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately."
      ]
    },
    {
      title: "Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The 'Last Updated' date at the top of this page indicates when the policy was last revised. We encourage you to review this policy periodically."
      ]
    },
    {
      title: "Contact Us",
      content: [
        "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:"
      ]
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
                <Shield className="w-12 h-12 text-gold-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Your privacy is important to us. This policy explains how Goldmine Communications and Construction collects, uses, and protects your personal information.
            </p>
            <div className="flex items-center justify-center text-gray-400">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {/* Introduction */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 mb-0">
              Goldmine Communications and Construction Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website goldminecomm.net or use our services.
            </p>
          </div>

          {/* Policy Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-8 bg-gold-400 mr-4 rounded"></span>
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className={paragraph === '' ? 'mb-0' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 text-white rounded-2xl p-8 mt-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-gold-400">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gold-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Address</p>
                  <p className="text-gray-300">946 Lincoln Avenue<br />San Jose, CA 95125</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gold-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <a href="tel:+19253055980" className="text-gold-400 hover:text-gold-300 transition-colors">
                    (925) 305-5980
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gold-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:a.lopez@goldminecomm.net" className="text-gold-400 hover:text-gold-300 transition-colors">
                    a.lopez@goldminecomm.net
                  </a>
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
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
