import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientForm from '@/components/admin/clients/ClientForm';

export const metadata = {
  title: 'New Client | Admin Dashboard',
};

async function getAssignableUsers() {
  return prisma.user.findMany({
    where: {
      role: { in: ['SUPER_ADMIN', 'ADMIN', 'SALES_REP'] },
      active: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export default async function NewClientPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const assignableUsers = await getAssignableUsers();

  return (
    <div className="max-w-4xl mx-auto">
      <ClientForm assignableUsers={assignableUsers} />
    </div>
  );
}