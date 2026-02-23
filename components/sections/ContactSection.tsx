'use client';

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight 
} from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Initial form state
const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
};

// Validation rules
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s]*$/
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  },
  phone: {
    pattern: /^\+?[\d\s-]{10,}$/
  },
  message: {
    required: true,
    minLength: 10
  }
};

// Contact information array
const contactInfo = [
  {
    icon: <MapPin className="text-gold-400" size={20} />,
    title: 'Office Location',
    content: '946 Lincoln Avenue, San Jose, California 95125',
    description: 'Main Office & Headquarters'
  },
  {
    icon: <Phone className="text-gold-400" size={20} />,
    title: 'Phone Numbers',
    content: [
      { label: 'Main Line', value: '(925) 305-5980', href: 'tel:+19253055980' },
      { label: 'Support', value: '(510) 695-3177', href: 'tel:+15106953177' }
    ]
  },
  {
    icon: <Mail className="text-gold-400" size={20} />,
    title: 'Email Address',
    content: 'a.lopez@goldminecomm.net',
    href: 'mailto:a.lopez@goldminecomm.net',
    description: 'Send us an email anytime'
  },
  {
    icon: <Clock className="text-gold-400" size={20} />,
    title: 'Business Hours',
    content: [
      'Monday - Friday: 9:00 AM - 6:00 PM',
      'Saturday: 10:00 AM - 2:00 PM',
      'Sunday: Closed'
    ],
    // description: '24/7 Emergency Services Available'
  }
];

/**
 * Enhanced Contact Section Component
 * 
 * Seamlessly integrated with homepage design:
 * - Consistent styling with other sections
 * - Professional form design
 * - Proper spacing and typography
 * - Accessible form validation
 * - Smooth animations
 */
export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Form submission handler
  const handleSubmit = async (values: FormData) => {
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          to: 'a.lopez@goldminecomm.net',
          subject: `Website Contact: ${values.service || 'General Inquiry'}`
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      throw error;
    }
  };

  // Form validation hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: onSubmit,
    resetForm
  } = useFormValidation({
    initialValues: INITIAL_FORM_DATA,
    validationRules,
    onSubmit: handleSubmit,
  });

  // Reset form when successful
  React.useEffect(() => {
    if (submitStatus === 'success') {
      resetForm();
    }
  }, [submitStatus, resetForm]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      {/* Gradient Overlay with Gold Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a68729]/10 via-transparent to-[#a68729]/10" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Get In
            <span className="text-[#a68729]">
              {' '}Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your project? Contact us today to schedule a consultation
            and let&apos;s bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 h-fit border-t-4 border-[#a68729]">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="group"
                  >
                    <div className="flex items-start">
                      <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gold-50 
                                    transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        {Array.isArray(item.content) ? (
                          <div className="space-y-1">
                            {item.content.map((line, i) => (
                              typeof line === 'string' ? (
                                <p key={i} className="text-gray-600 text-sm">{line}</p>
                              ) : (
                                <a
                                  key={i}
                                  href={line.href}
                                  className="block text-gray-600 hover:text-gold-600 
                                           transition-colors text-sm"
                                >
                                  {line.label}: {line.value}
                                </a>
                              )
                            ))}
                          </div>
                        ) : item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-600 hover:text-gold-600 
                                     transition-colors text-sm"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-sm">{item.content}</p>
                        )}
                        {item.description && (
                          <p className="mt-1 text-xs text-gray-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* License & Insurance Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Licensed & Insured
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">License:</span> #1099543
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Status:</span> Bonded & Insured
                  </p>
                  <p className="text-gold-600 text-sm font-medium italic">
                    Forward your estimate & we&apos;ll beat it!
                  </p>
                </div>
              </div>

              {/* Quick Action */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href="tel:+19253055980"
                  className="inline-flex items-center w-full justify-center px-6 py-3 
                           bg-gold-400 hover:bg-gold-500 text-white font-semibold rounded-lg
                           transition-colors shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: (925) 305-5980
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#a68729]">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Send Us a Message
              </h3>

              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                {/* Form Status Messages */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`rounded-lg p-4 ${
                        submitStatus === 'success' 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {submitStatus === 'success' ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="text-green-800 font-medium">Message sent successfully!</p>
                              <p className="text-green-700 text-sm">We&apos;ll get back to you within 24 hours.</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <div>
                              <p className="text-red-800 font-medium">Failed to send message</p>
                              <p className="text-red-700 text-sm">Please try again or call us directly.</p>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      className={`
                        w-full px-4 py-3 rounded-lg border transition-all duration-200
                        focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400
                        ${errors.name && touched.name 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 focus:border-gold-400'}
                      `}
                      placeholder="Enter your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {touched.name && errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      className={`
                        w-full px-4 py-3 rounded-lg border transition-all duration-200
                        focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400
                        ${errors.email && touched.email 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 focus:border-gold-400'}
                      `}
                      placeholder="your.email@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label 
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      className={`
                        w-full px-4 py-3 rounded-lg border transition-all duration-200
                        focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400
                        ${errors.phone && touched.phone 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 focus:border-gold-400'}
                      `}
                      placeholder="(555) 123-4567"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {touched.phone && errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service Field */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={values.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300
                               focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400
                               transition-all duration-200"
                    >
                      <option value="">Select a service</option>
                      <option value="Communications Infrastructure">Communications Infrastructure</option>
                      <option value="Construction Services">Construction Services</option>
                      <option value="Maintenance & Support">Maintenance & Support</option>
                      <option value="Consulting & Design">Consulting & Design</option>
                      <option value="Emergency Services">Emergency Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    className={`
                      w-full px-4 py-3 rounded-lg border transition-all duration-200
                      focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400
                      ${errors.message && touched.message
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 focus:border-gold-400'}
                    `}
                    placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-500">
                    * Required fields
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      inline-flex items-center px-8 py-3 rounded-lg
                      font-semibold transition-all duration-200
                      min-w-[150px] justify-center
                      ${isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gold-400 hover:bg-gold-500 text-white shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}