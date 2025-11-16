'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackUrl?: string;
}

/**
 * Protected Route wrapper component
 * Redirects to login if user is not authenticated
 * Optionally checks for required role
 */
export default function ProtectedRoute({
  children,
  requiredRole,
  fallbackUrl = '/admin/login',
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If loading, don't do anything
    if (status === 'loading') return;

    // If not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push(fallbackUrl);
      return;
    }

    // If authenticated but doesn't have required role, redirect to dashboard
    if (requiredRole && session?.user?.role !== requiredRole) {
      router.push('/admin/dashboard');
    }
  }, [status, session, router, requiredRole, fallbackUrl]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-gray-50 to-gold-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render children (will redirect)
  if (status === 'unauthenticated') {
    return null;
  }

  // If authenticated but doesn't have required role, don't render (will redirect)
  if (requiredRole && session?.user?.role !== requiredRole) {
    return null;
  }

  // Render children if authenticated and has required role (if specified)
  return <>{children}</>;
}
