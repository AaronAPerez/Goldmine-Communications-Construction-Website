// app/not-found.tsx
// Global 404 Not Found page - displayed when users navigate to non-existent routes
// Provides branded error message with navigation options back to main site areas

import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false, // Don't index 404 pages
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gold-50 px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA - Home */}
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3
                       bg-gradient-to-r from-gold-500 to-gold-600
                       text-white font-semibold rounded-lg
                       hover:from-gold-600 hover:to-gold-700
                       transform hover:scale-105 transition-all duration-200
                       shadow-lg hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          {/* Secondary CTA - Contact */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3
                       border-2 border-gold-500 text-gold-700 font-semibold rounded-lg
                       hover:bg-gold-50
                       transform hover:scale-105 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/services"
              className="text-gold-600 hover:text-gold-800 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all"
            >
              Our Services
            </Link>
            <Link
              href="/projects"
              className="text-gold-600 hover:text-gold-800 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all"
            >
              Projects
            </Link>
            <Link
              href="/communications"
              className="text-gold-600 hover:text-gold-800 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all"
            >
              Communications
            </Link>
            <Link
              href="/construction"
              className="text-gold-600 hover:text-gold-800 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all"
            >
              Construction
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
