import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Budget | Goldmine Admin',
};

export default async function BudgetPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  return (
    <AdminPageLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Budget & Finance</h1>
          <p className="text-gray-600 mt-2">Track expenses, revenue, and financial performance</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Management</h3>
            <p className="text-gray-600 mb-4">This feature is coming soon</p>
            <button className="px-6 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors">
              View Financials
            </button>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}