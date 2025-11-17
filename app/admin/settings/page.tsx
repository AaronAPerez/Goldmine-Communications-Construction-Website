import SettingsContent from '@/components/admin/settings/SettingsContent';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Settings | Goldmine Admin',
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  // Check if user has admin role
  const isAdmin = session.user?.role === 'SUPER_ADMIN' || session.user?.role === 'ADMIN';

  if (!isAdmin) {
    redirect('/admin/dashboard');
  }

  return <SettingsContent />;
}
