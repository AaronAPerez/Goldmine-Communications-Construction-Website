'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Contact form validation types
type FormField = {
  value: string;
  error: string;
  touched: boolean;
};

type FormState = {
  name: FormField;
  email: FormField;
  phone: FormField;
  service: FormField;
  message: FormField;
};

// Service options
const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'communications', label: 'Communications Infrastructure' },
  { value: 'construction', label: 'Construction Services' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'consulting', label: 'Consulting & Design' },
  { value: 'other', label: 'Other / Not Sure' },
];

// Contact info for display
// const contactInfo = [
//   {
//     icon: <MapPin className="text-gold-400" size={24} />,
//     title: 'Address',
//     content: (
//       <p>
//         946 Lincoln Avenue,<br />
//         San Jose, California 95125
//       </p>
//     ),
//   },
//   {
//     icon: <Phone className="text-gold-400" size={24} />,
//     title: 'Phone',
//     content: (
//       <a
//         href="tel:+19253055980"
//         className="hover:text-gold-400 transition-colors"
//       >
//         (925) 305-5980
//       </a>
//     ),
//   },
//   {
//     icon: <Mail className="text-gold-400" size={24} />,
//     title: 'Email',
//     content: (
//       <a
//         href="mailto:a.lopez@goldminecomm.net"
//         className="hover:text-gold-400 transition-colors"
//       >
//         a.lopez@goldminecomm.net
//       </a>
//     ),
//   },
//   {
//     icon: <Clock className="text-gold-400" size={24} />,
//     title: 'Business Hours',
//     content: (
//       <>
//         Monday - Friday: 9:00 AM - 6:00 PM<br />
//         Saturday: 10:00 AM - 2:00 PM<br />
//         Sunday: Closed
//       </>
//     ),
//   },
// ];

export default function ContactForm() {
  // Form state management
  const [formState, setFormState] = useState<FormState>({
    name: { value: '', error: '', touched: false },
    email: { value: '', error: '', touched: false },
    phone: { value: '', error: '', touched: false },
    service: { value: '', error: '', touched: false },
    message: { value: '', error: '', touched: false },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Refs for animations
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  // Form validation
  const validateField = (name: keyof FormState, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'email':
        return value.trim() === '' 
          ? 'Email is required' 
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ? 'Invalid email address'
            : '';
      case 'phone':
        // Phone is optional but if provided should be valid
        return value.trim() !== '' && !/^\+?[\d\s-]{10,}$/.test(value)
          ? 'Invalid phone number'
          : '';
      case 'message':
        return value.trim() === '' 
          ? 'Message is required' 
          : value.trim().length < 10
            ? 'Message is too short'
            : '';
      default:
        return '';
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value);

    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormState],
        value,
        error: prev[name as keyof FormState].touched ? error : '',
      }
    }));
  };

  // Handle field blur for validation
  const handleBlur = (name: keyof FormState) => {
    const value = formState[name].value;
    const error = validateField(name, value);

    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error,
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    const newFormState = { ...formState };
    
    (Object.keys(formState) as Array<keyof FormState>).forEach(key => {
      const error = validateField(key, formState[key].value);
      if (error) {
        isValid = false;
        newFormState[key] = {
          ...newFormState[key],
          error,
          touched: true,
        };
      }
    });
    
    setFormState(newFormState);
    
    if (!isValid) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name.value,
          email: formState.email.value,
          phone: formState.phone.value || 'Not provided',
          service: formState.service.value || 'Not specified',
          message: formState.message.value,
          // Add recipient email
          to: 'a.lopez@goldminecomm.net',
          subject: `Website Contact Form: ${formState.service.value || 'General Inquiry'}`
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Reset form on success
      setFormState({
        name: { value: '', error: '', touched: false },
        email: { value: '', error: '', touched: false },
        phone: { value: '', error: '', touched: false },
        service: { value: '', error: '', touched: false },
        message: { value: '', error: '', touched: false },
      });
      
      setSubmitStatus('success');
      setSubmitMessage('Your message has been sent successfully! We will get back to you soon.');
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('There was a problem sending your message. Please try again or contact us directly.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" ref={formRef}>
          {/* Contact Information */}
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start group"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-gray-50 group-hover:bg-gold-50 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <div className="text-gray-600 mt-1">{item.content}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Business License Info 
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  Business Information
                </h4>
                <p className="text-gray-600">
                  Lic# 1099543 | Bonded & Insured
                </p>
              </div>

              {/* Social Media Links 
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {/* Add your social media links here
                  <a
                    href="#"
                    className="p-2 rounded-lg bg-gray-50 hover:bg-gold-50 transition-colors duration-300"
                    aria-label="Visit our LinkedIn page"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 hover:text-gold-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  {/* Add more social media buttons
                </div>
              </div>
            </div> */}
          {/* </motion.div> */}

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Form Status Messages */}
              {submitStatus && (
                <div className={`mb-6 rounded-lg p-4 ${
                  submitStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-center gap-2">
                    {submitStatus === 'success' ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <AlertCircle className="text-red-500" size={20} />
                    )}
                    <p className={submitStatus === 'success' ? 'text-green-700' : 'text-red-700'}>
                      {submitMessage}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name.value}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      className={`
                        w-full px-4 py-2 border rounded-lg
                        focus:ring-2 focus:ring-gold-400 focus:border-transparent
                        transition-colors
                        ${formState.name.error ? 'border-red-500' : 'border-gray-300'}
                        ${formState.name.touched && !formState.name.error ? 'border-green-500' : ''}
                      `}
                      aria-invalid={!!formState.name.error}
                      disabled={isSubmitting}
                    />
                    {formState.name.error && (
                      <p className="mt-1 text-sm text-red-500">
                        {formState.name.error}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email.value}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      className={`
                        w-full px-4 py-2 border rounded-lg
                        focus:ring-2 focus:ring-gold-400 focus:border-transparent
                        transition-colors
                        ${formState.email.error ? 'border-red-500' : 'border-gray-300'}
                        ${formState.email.touched && !formState.email.error ? 'border-green-500' : ''}
                      `}
                      aria-invalid={!!formState.email.error}
                      disabled={isSubmitting}
                    />
                    {formState.email.error && (
                      <p className="mt-1 text-sm text-red-500">
                        {formState.email.error}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label 
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone.value}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      className={`
                        w-full px-4 py-2 border rounded-lg
                        focus:ring-2 focus:ring-gold-400 focus:border-transparent
                        transition-colors
                        ${formState.phone.error ? 'border-red-500' : 'border-gray-300'}
                        ${formState.phone.touched && !formState.phone.error ? 'border-green-500' : ''}
                      `}
                      aria-invalid={!!formState.phone.error}
                      disabled={isSubmitting}
                      placeholder="(123) 456-7890"
                    />
                    {formState.phone.error && (
                      <p className="mt-1 text-sm text-red-500">
                        {formState.phone.error}
                      </p>
                    )}
                  </div>

                  {/* Service Field */}
                  <div>
                    <label 
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service.value}
                      onChange={handleChange}
                      onBlur={() => handleBlur('service')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                              focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                      disabled={isSubmitting}
                    >
                      {serviceOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formState.message.value}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    className={`
                      w-full px-4 py-2 border rounded-lg
                      focus:ring-2 focus:ring-gold-400 focus:border-transparent
                      transition-colors
                      ${formState.message.error ? 'border-red-500' : 'border-gray-300'}
                      ${formState.message.touched && !formState.message.error ? 'border-green-500' : ''}
                    `}
                    aria-invalid={!!formState.message.error}
                    disabled={isSubmitting}
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                  {formState.message.error && (
                    <p className="mt-1 text-sm text-red-500">
                      {formState.message.error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      px-6 py-3 bg-gold-400 text-white rounded-lg
                      font-medium transition-all duration-200 min-w-[150px]
                      flex items-center justify-center
                      ${isSubmitting
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:bg-gold-500 hover:shadow-lg'
                      }
                    `}
                    aria-disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>

                {/* Required Fields Note */}
                <p className="text-sm text-gray-500 mt-2">
                  * Required fields
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}