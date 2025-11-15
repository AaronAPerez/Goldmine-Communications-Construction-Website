import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {session.user?.name}! 👋
          </h1>
          <p className="text-gray-600 mb-4">
            You are signed in as: <strong>{session.user?.email}</strong>
          </p>
          <p className="text-gray-600">
            Role: <span className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium">
              {session.user?.role}
            </span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
            <p className="text-3xl font-bold text-gold-500 mt-2">0</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Clients</h3>
            <p className="text-3xl font-bold text-gold-500 mt-2">0</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
            <p className="text-3xl font-bold text-gold-500 mt-2">$0</p>
          </div>
        </div>
      </div>
    </div>
  );
}