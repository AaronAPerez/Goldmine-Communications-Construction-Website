import React from 'react';
import ErrorPage from '@/components/errors/ErrorPage';
import Link from 'next/link';

/**
 * Props for the ServerErrorPage component
 */
interface ServerErrorPageProps {
  /**
   * Optional specific error message to display
   */
  errorMessage?: string;
  
  /**
   * Optional error details (shown only in development)
   */
  errorDetails?: string;
  
  /**
   * Function to retry the failed operation
   */
  reset?: () => void;
}

/**
 * Server Error (500) page with detailed troubleshooting suggestions
 * and contact information for further assistance
 */
export default function ServerErrorPage({
  errorMessage,
  errorDetails,
  reset
}: ServerErrorPageProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Main error component */}
      <ErrorPage 
        errorType={500} 
        errorMessage={errorMessage || "We're experiencing technical difficulties. Our team has been notified of the issue."}
        reset={reset}
        actionText="Try Again"
      />
      
      {/* Development mode error details */}
      {isDevelopment && errorDetails && (
        <div className="mt-8 max-w-md w-full bg-red-50 p-4 rounded-md border border-red-200">
          <h3 className="text-sm font-medium text-red-800 mb-2">Error Details (Development Only):</h3>
          <pre className="text-xs text-red-700 whitespace-pre-wrap overflow-auto max-h-60">
            {errorDetails}
          </pre>
        </div>
      )}
      
      {/* Troubleshooting suggestions */}
      <div className="mt-8 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
          Things you can try:
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 mr-3 text-sm font-bold">
              1
            </span>
            <span>Refresh the page to see if the issue resolves itself.</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 mr-3 text-sm font-bold">
              2
            </span>
            <span>Clear your browser cache and cookies, then try again.</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 mr-3 text-sm font-bold">
              3
            </span>
            <span>Check your internet connection and try again.</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 mr-3 text-sm font-bold">
              4
            </span>
            <span>Try accessing the site again in a few minutes.</span>
          </li>
        </ul>
      </div>
      
      {/* Contact support section */}
      <div className="mt-8 text-center max-w-md">
        <p className="text-gray-700 mb-4">
          If the problem persists, please contact our support team:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:support@theglampingspot.com" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@theglampingspot.com
          </a>
          <a 
            href="tel:+1-555-123-4567" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +1-555-123-4567
          </a>
        </div>
      </div>
      
      {/* Option to return to home */}
      <div className="mt-8">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return to Home Page
        </Link>
      </div>
      
      {/* Error tracking ID - useful for support requests */}
      {errorDetails && (
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Error Reference: {generateErrorReference()}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Generate a unique error reference code
 * This can help support teams identify specific error instances
 */
function generateErrorReference(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ERR-${timestamp}-${randomStr}`;
}