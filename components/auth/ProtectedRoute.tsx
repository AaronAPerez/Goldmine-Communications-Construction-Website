// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/lib/supabase-hooks';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   redirectTo?: string;
// }

// export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push(redirectTo);
//     }
//   }, [user, loading, router, redirectTo]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-400">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   return <>{children}</>;
// }
