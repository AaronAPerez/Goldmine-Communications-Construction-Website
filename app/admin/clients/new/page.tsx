import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import ClientForm from '@/components/admin/clients/ClientForm';

export const metadata = {
  title: 'New Client | Admin Dashboard',
};

async function getAssignableUsers() {
  const users = await prisma.user.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return users;
}

export default async function NewClientPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const assignableUsers = await getAssignableUsers();

  return (
    <AdminPageLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Client</h1>
          <p className="text-sm text-gray-600 mt-1">
            Add a new client to your CRM
          </p>
        </div>

        <ClientForm assignableUsers={assignableUsers} />
      </div>
    </AdminPageLayout>
  );
}
