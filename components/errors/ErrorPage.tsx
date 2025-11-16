import React from 'react';
import Link from 'next/link';
import { ErrorSvg } from './ErrorSvg';


/**
 * Props for the ErrorPage component
 */
interface ErrorPageProps {
  /**
   * Type of error to display (e.g., 404, 500, 403)
   * @default 500
   */
  errorType?: number;
  
  /**
   * Custom error message to display
   */
  errorMessage?: string;
  
  /**
   * Function to retry the failed operation
   */
  reset?: () => void;
  
  /**
   * Custom action button text
   */
  actionText?: string;
  
  /**
   * Custom action button link (if not using reset function)
   */
  actionLink?: string;
}

/**
 * Error page component that displays appropriate messages based on error type
 * Includes an SVG illustration and action buttons for navigation
 */
const ErrorPage = ({
  errorType = 500,
  errorMessage,
  reset,
  actionText,
  actionLink = '/'
}: ErrorPageProps) => {
  // Error configurations based on error type
  const errorConfig = {
    404: {
      title: 'Page Not Found',
      description: 'Sorry, we couldn\'t find the page you\'re looking for.',
      actionDefault: 'Return Home'
    },
    500: {
      title: 'Server Error',
      description: 'Sorry, something went wrong on our end.',
      actionDefault: 'Try Again'
    },
    403: {
      title: 'Access Denied',
      description: 'Sorry, you don\'t have permission to access this page.',
      actionDefault: 'Return Home'
    },
    401: {
      title: 'Authentication Required',
      description: 'You need to be logged in to access this page.',
      actionDefault: 'Log In'
    },
    default: {
      title: 'An Error Occurred',
      description: 'Sorry, an unexpected error has occurred.',
      actionDefault: 'Try Again'
    }
  };

  // Get the appropriate error configuration or use default
  const config = errorType in errorConfig 
    ? errorConfig[errorType as keyof typeof errorConfig] 
    : errorConfig.default;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        {/* Error Code */}
        <h1 className="text-6xl font-bold text-[#7d693f]mb-4" aria-live="assertive">
          {errorType}
        </h1>
        
        {/* Error Illustration */}
        <div className="w-48 h-48 mx-auto mb-6">
          <ErrorSvg errorType={errorType} />
        </div>
        
        {/* Error Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {config.title}
        </h2>
        
        {/* Error Description */}
        <p className="text-gray-600 mb-6">
          {errorMessage || config.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary Action Button (Reset or Link) */}
          {reset ? (
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#7d693f] text-white rounded-md font-medium hover:bg-[#e4c985] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b3995d]"
              aria-label={actionText || config.actionDefault}
            >
              {actionText || config.actionDefault}
            </button>
          ) : (
            <Link
              href={actionLink}
              className="px-6 py-3 bg-[#7d693f]text-white rounded-md font-medium hover:[#e4c985] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b3995d]"
              aria-label={actionText || config.actionDefault}
            >
              {actionText || config.actionDefault}
            </Link>
          )}
          
          {/* Secondary Action - Always Home link unless we're already showing home link */}
          {(reset || actionLink !== '/') && (
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 bg-white rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b3995d]"
              aria-label="Return to Home page"
            >
              Return Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;