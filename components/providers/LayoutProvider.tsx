'use client';

import { usePathname } from 'next/navigation';
import TopContactBar from '../Contact/TopContactBar';
import FloatingNavigation from '../Navigation/FloatingNavigation';
import Footer from '../Footer/Footer';
import { ScrollToTop } from '../Navigation/ScrollToTop';

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname();

  // Check if we're in the admin area or on a login page
  const isAdminRoute = pathname?.startsWith('/admin') || false;
  const isLoginPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/reset-password';
  const hideNavigation = isAdminRoute || isLoginPage;

  if (hideNavigation) {
    // Admin Layout - No public navigation components
    return <>{children}</>;
  }

  // Public Layout - Full navigation and footer
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4
                   bg-gold-400 text-white px-4 py-2 rounded-lg z-[60]"
      >
        Skip to main content
      </a>

      {/* Top contact bar - fixed width */}
      <div className="w-full overflow-x-hidden">
        <TopContactBar />
      </div>

      {/* Floating navigation - fixed width */}
      <div className="w-full overflow-x-hidden">
        <FloatingNavigation />
      </div>

      {/* Main content with proper constraints */}
      <main
        id="main-content"
        className="flex-grow w-full max-w-full overflow-x-hidden md:mt-4"
      >
        <div className="w-full max-w-full">
          {children}
        </div>
      </main>

      {/* Footer with width constraints */}
      <div className="w-full overflow-x-hidden">
        <Footer />
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}
