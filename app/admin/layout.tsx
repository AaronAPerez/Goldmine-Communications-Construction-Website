import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SessionProvider from '@/components/providers/SessionProvider';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to login if not authenticated (except for login page)
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gradient-to-br from-primary-400 via-gray-50 to-gold-100">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <AdminHeader />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-2 py-2">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}