import React from 'react';
import ErrorPage from '@/components/errors/ErrorPage';
import Link from 'next/link';

/**
 * Custom 404 Not Found page with added features
 * Shows suggestions for navigation and popular pages
 */
export default function NotFound() {
  // Popular destinations to suggest when page is not found
  const popularPages = [
    { name: 'Projects', href: '/projects' },
    { name: 'Construction', href: '/construction' },
    { name: 'Contact', href: '/contact' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Main error component */}
      <ErrorPage 
        errorType={404} 
        errorMessage="We couldn't find the page you were looking for. It might have been moved, deleted, or never existed."
        actionText="Go to Home"
        actionLink="/"
      />
      
      {/* Additional suggestions */}
      <div className="mt-12 text-center max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          You might be interested in
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {popularPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {page.name}
            </Link>
          ))}
        </div>
        
        {/* Search suggestion */}
        <p className="mt-6 text-sm text-gray-500">
          If you&apos;re looking for something specific, you can also try our{' '}
          <Link href="/search" className="text-[#7d693f] hover:text-[#e4c985] font-medium">
            search page
          </Link>
        </p>
      </div>
    </div>
  );
}