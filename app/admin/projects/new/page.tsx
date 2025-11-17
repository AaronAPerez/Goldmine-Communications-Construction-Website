import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectForm from '@/components/admin/projects/ProjectForm';

export const metadata = {
  title: 'New Project | Admin Dashboard',
};

async function getFormData() {
  const [clients, managers] = await Promise.all([
    prisma.client.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        companyName: true,
      },
      where: {
        status: {
          in: ['ACTIVE_CLIENT', 'QUALIFIED', 'PROPOSAL_SENT'],
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.findMany({
      where: {
        role: { in: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER'] },
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    }),
  ]);

  return { clients, managers };
}

export default async function NewProjectPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const { clients, managers } = await getFormData();

  return (
    <div className="max-w-5xl mx-auto">
      <ProjectForm clients={clients} managers={managers} />
    </div>
  );
}