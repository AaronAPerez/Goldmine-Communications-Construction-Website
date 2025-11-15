import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import UserMenu from '@/components/admin/UserMenu';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">
                Goldmine Admin
              </h1>
              <nav className="hidden md:flex gap-6">
                <a href="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </a>
                <a href="/admin/projects" className="text-gray-700 hover:text-blue-600 font-medium">
                  Projects
                </a>
                <a href="/admin/clients" className="text-gray-700 hover:text-blue-600 font-medium">
                  Clients
                </a>
              </nav>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}