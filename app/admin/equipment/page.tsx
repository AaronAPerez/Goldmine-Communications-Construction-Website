import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';

export const metadata = {
  title: 'Equipment | Goldmine Communications',
  description: 'Manage equipment and assets',
};

export default async function EquipmentPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
          <p className="text-gray-600 mt-2">Track and manage your equipment and assets</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">Equipment management features coming soon...</p>
        </div>
      </div>
    </AdminPageLayout>
  );
}
