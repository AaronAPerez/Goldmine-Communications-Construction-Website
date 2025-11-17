import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin Page Layout Component
 * Wraps admin pages with sidebar and header
 * Use this for all authenticated admin pages (not login)
 */
export default function AdminPageLayout({ children }: AdminPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
