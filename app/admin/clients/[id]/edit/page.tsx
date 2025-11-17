import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import ClientForm from '@/components/admin/clients/ClientForm';

export const metadata = {
  title: 'Edit Client | Admin Dashboard',
};

async function getClientAndUsers(id: string) {
  const [client, users] = await Promise.all([
    prisma.client.findUnique({
      where: { id },
    }),
    prisma.user.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    }),
  ]);

  if (!client) {
    return null;
  }

  return { client, users };
}

export default async function EditClientPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const data = await getClientAndUsers(params.id);

  if (!data) {
    notFound();
  }

  const { client, users } = data;

  return (
    <AdminPageLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Client</h1>
          <p className="text-sm text-gray-600 mt-1">
            {client.companyName || `${client.firstName} ${client.lastName}`}
          </p>
        </div>

        <ClientForm
          initialData={client}
          clientId={client.id}
          assignableUsers={users}
        />
      </div>
    </AdminPageLayout>
  );
}
