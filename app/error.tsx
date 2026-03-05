'use client';

// app/error.tsx
// Global error boundary - catches and handles runtime errors in the application
// Provides user-friendly error message with recovery options
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/error

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry, LogRocket)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-4">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Something Went Wrong
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left max-w-xl mx-auto">
            <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2 hover:text-gray-900">
              Error Details (Development Only)
            </summary>
            <div className="bg-gray-100 rounded-lg p-4 overflow-auto">
              <p className="text-sm font-mono text-red-600 mb-2">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-600 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
              {error.stack && (
                <pre className="text-xs text-gray-700 mt-2 overflow-x-auto">
                  {error.stack}
                </pre>
              )}
            </div>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA - Try Again */}
          <button
            onClick={reset}
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          {/* Secondary CTA - Home */}
          <a
            href="/"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </a>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            If this problem persists, please{' '}
            <a
              href="/contact"
              className="text-gold-600 hover:text-gold-800 font-medium underline underline-offset-4 hover:underline-offset-2 transition-all"
            >
              contact our support team
            </a>
            {error.digest && ` and reference error ID: ${error.digest}`}
          </p>
        </div>
      </div>
    </div>
  );
}
