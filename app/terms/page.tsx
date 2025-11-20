'use client';

import { motion } from 'framer-motion';
import { FileText, Mail, Phone, MapPin, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using the Goldmine Communications and Construction website (goldminecomm.net) and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our website or services.",
        "",
        "We reserve the right to update, change, or replace any part of these Terms of Service by posting updates on our website. It is your responsibility to check this page periodically for changes. Your continued use of the website following the posting of any changes constitutes acceptance of those changes."
      ]
    },
    {
      title: "Use of Website and Services",
      content: [
        "Our website provides information about our communications and construction services. You may use our website for lawful purposes only. You agree not to:",
        "",
        "• Use the website in any way that violates any applicable federal, state, local, or international law",
        "• Transmit any viruses, malware, or other malicious code",
        "• Attempt to gain unauthorized access to our systems or networks",
        "• Engage in any conduct that restricts or inhibits anyone's use of the website",
        "• Use automated systems (bots, scrapers) without our written permission",
        "• Reproduce, duplicate, or copy any content without written permission",
        "• Impersonate any person or entity or misrepresent your affiliation"
      ]
    },
    {
      title: "Services and Estimates",
      content: [
        "Goldmine Communications and Construction provides communications infrastructure and construction services. All estimates and quotes provided are:",
        "",
        "• Valid for 30 days from the date of issue unless otherwise specified",
        "• Subject to site inspection and verification of conditions",
        "• Based on information provided by the client at the time of request",
        "• Subject to change if actual site conditions differ from those described",
        "• Non-binding until a formal contract or work order is executed",
        "",
        "We reserve the right to refuse service to anyone for any reason at any time. Final pricing and scope of work will be established in a separate written agreement."
      ]
    },
    {
      title: "Intellectual Property Rights",
      content: [
        "All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Goldmine Communications and Construction Inc. or its content suppliers and is protected by United States and international copyright laws.",
        "",
        "You may not:",
        "• Reproduce, distribute, or create derivative works from our content without written permission",
        "• Use our company name, logo, or branding without authorization",
        "• Remove any copyright or proprietary notices from materials",
        "",
        "Project photos and case studies are the property of Goldmine Communications and Construction and may not be used without written permission."
      ]
    },
    {
      title: "User Submissions",
      content: [
        "Any information, feedback, data, questions, comments, suggestions, or other content you submit to us through our website, contact forms, or email becomes our property. By submitting content, you grant us:",
        "",
        "• A non-exclusive, royalty-free, perpetual, worldwide license to use, reproduce, modify, and distribute the submitted content",
        "• The right to use any ideas, concepts, or techniques contained in your submissions for any purpose",
        "",
        "You represent and warrant that:",
        "• You own or have the necessary rights to submit the content",
        "• The content does not violate any third-party rights",
        "• The content is accurate and not misleading"
      ]
    },
    {
      title: "Contractor Licensing and Insurance",
      content: [
        "Goldmine Communications and Construction Inc. is a licensed contractor in the State of California:",
        "",
        "• California Contractor License Number: 1099543",
        "• Classification: C-10 (Electrical)",
        "• Fully insured with general liability and workers' compensation insurance",
        "",
        "All work performed is subject to applicable local, state, and federal regulations. Required permits and inspections are the responsibility of the client unless specifically included in the written agreement."
      ]
    },
    {
      title: "Warranty and Liability",
      content: [
        "Service Warranty:",
        "• We warrant that services will be performed in a professional and workmanlike manner",
        "• Specific warranty terms will be outlined in individual service agreements",
        "• Material and equipment warranties are provided by manufacturers",
        "",
        "Limitation of Liability:",
        "• Our total liability shall not exceed the amount paid for the specific service in question",
        "• We are not liable for indirect, consequential, or incidental damages",
        "• We are not responsible for delays caused by weather, site conditions, or third parties",
        "• Claims must be made in writing within 30 days of service completion"
      ]
    },
    {
      title: "Disclaimer of Warranties",
      content: [
        "THIS WEBSITE AND ITS CONTENT ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.",
        "",
        "We do not warrant that:",
        "• The website will be uninterrupted, timely, secure, or error-free",
        "• The results obtained from using the website will be accurate or reliable",
        "• Any errors in the website will be corrected",
        "• The website or server are free of viruses or harmful components",
        "",
        "Information on our website is for general information purposes only and should not be relied upon as professional advice for specific projects without consultation."
      ]
    },
    {
      title: "Payment Terms",
      content: [
        "Unless otherwise specified in a written agreement:",
        "",
        "• Payment is due upon receipt of invoice",
        "• Net payment terms are Net 30 days from invoice date",
        "• Late payments may be subject to a 1.5% monthly finance charge (18% APR)",
        "• We reserve the right to require deposits or progress payments",
        "• We accept payment by check, ACH transfer, or credit card (processing fees may apply)",
        "• Disputed charges must be reported in writing within 10 days of invoice date"
      ]
    },
    {
      title: "Indemnification",
      content: [
        "You agree to indemnify, defend, and hold harmless Goldmine Communications and Construction Inc., its officers, directors, employees, agents, and contractors from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of:",
        "",
        "• Your use of our website or services",
        "• Your violation of these Terms of Service",
        "• Your violation of any rights of another party",
        "• Any information or content you submit through our website"
      ]
    },
    {
      title: "Third-Party Links",
      content: [
        "Our website may contain links to third-party websites or services that are not owned or controlled by Goldmine Communications and Construction. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.",
        "",
        "You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any third-party website or service."
      ]
    },
    {
      title: "Privacy",
      content: [
        "Your use of our website and services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information."
      ]
    },
    {
      title: "Governing Law and Dispute Resolution",
      content: [
        "These Terms of Service are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.",
        "",
        "Any disputes arising from these terms or your use of our services shall be resolved through:",
        "",
        "1. Good faith negotiations between the parties",
        "2. Mediation, if negotiations fail",
        "3. Binding arbitration in Santa Clara County, California, if mediation fails",
        "4. Litigation in the state or federal courts located in Santa Clara County, California, as a last resort",
        "",
        "You waive any right to a jury trial in any dispute arising from these terms."
      ]
    },
    {
      title: "Severability",
      content: [
        "If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable."
      ]
    },
    {
      title: "Entire Agreement",
      content: [
        "These Terms of Service, together with our Privacy Policy and any written service agreements, constitute the entire agreement between you and Goldmine Communications and Construction Inc. regarding the use of our website and services.",
        "",
        "These terms supersede any prior agreements or understandings, whether written or oral, relating to the subject matter herein."
      ]
    },
    {
      title: "Contact Information",
      content: [
        "If you have any questions about these Terms of Service, please contact us:"
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
                <FileText className="w-12 h-12 text-gold-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Please read these terms carefully before using our website or services.
            </p>
            <div className="flex items-center justify-center text-gray-400">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8"
        >
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-amber-800">
                These Terms of Service govern your use of our website and services. By using our website or engaging our services,
                you agree to be bound by these terms. Please read them carefully.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg max-w-none"
        >
          {/* Introduction */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 mb-0">
              Welcome to Goldmine Communications and Construction Inc. These Terms of Service (&quot;Terms&quot;) apply to your
              use of our website and services. By accessing our website or using our services, you acknowledge that you
              have read, understood, and agree to be bound by these Terms.
            </p>
          </div>

          {/* Terms Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
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
                  <a href="mailto:info@goldminecomm.net" className="text-gold-400 hover:text-gold-300 transition-colors">
                    info@goldminecomm.net
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                For questions about these Terms of Service or to report a violation, please contact us at the address above.
                We will respond to inquiries within 2 business days.
              </p>
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
