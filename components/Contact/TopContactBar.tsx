import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function TopContactBar() {
  return (
    <>
      {/* Yellow top bar - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gold-400 to-gold-700 text-black font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-sm">
            {/* Left Side - License info on small screens, contact info on larger screens */}
            <div className="flex items-center">
              {/* License info only on small screens */}
              <span className="sm:hidden text-xs font-medium">
                Lic# 1099543 | Bonded & Insured
              </span>
              
              {/* Contact info on left side for larger screens */}
              <div className="hidden sm:flex items-center space-x-6">
                <a 
                  href="tel:+19253055980"
                  className="flex items-center hover:text-white transition-colors"
                  aria-label="Call us at (925) 305-5980"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span>(925) 305-5980</span>
                </a>
                <a 
                  href="mailto:info@goldminecomm.net"
                  className="flex items-center hover:text-white transition-colors"
                  aria-label="Email us at info@goldminecomm.net"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@goldminecomm.net</span>
                </a>
              </div>
            </div>

            {/* Right Side - Contact icons on small screens, address/hours on larger screens */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Phone and Email icons only on small screens */}
              <div className="flex sm:hidden items-center space-x-4">
                <a 
                  href="tel:+19253055980"
                  className="flex items-center hover:text-white transition-colors"
                  aria-label="Call us at (925) 305-5980"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:info@goldminecomm.net"
                  className="flex items-center hover:text-white transition-colors"
                  aria-label="Email us at info@goldminecomm.net"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              
              {/* Address and Hours on medium and large screens */}
              <div className="hidden md:flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>946 Lincoln Ave, San Jose, CA 95125</span>
              </div>
              <div className="hidden lg:flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Mon-Fri: 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black bar - Only visible on sm screens and up */}
      {/* <div className="fixed top-8 left-0 right-0 z-50 hidden sm:block bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-6 text-xs text-white/80">
            {/* License info only on sm+ screens 
            <div className="block">
              Lic# 1099543 | Bonded & Insured
            </div>
            <div className="text-right">
              Forward your estimate & we&apos;ll beat it!
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}