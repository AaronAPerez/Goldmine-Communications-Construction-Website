import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
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
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.findMany({
      where: {
        role: {
          in: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER'],
        },
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

  if (!session) {
    redirect('/admin/login');
  }

  const { clients, managers } = await getFormData();

  return (
    <AdminPageLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details to create a new project
          </p>
        </div>

        <ProjectForm clients={clients} managers={managers} />
      </div>
    </AdminPageLayout>
  );
}
