import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import ProjectForm from '@/components/admin/projects/ProjectForm';

export const metadata = {
  title: 'Edit Project | Admin Dashboard',
};

async function getProjectAndFormData(id: string) {
  const [project, clients, managers] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        images: true,
      },
    }),
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

  if (!project) {
    return null;
  }

  return { project, clients, managers };
}

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const data = await getProjectAndFormData(params.id);

  if (!data) {
    notFound();
  }

  const { project, clients, managers } = data;

  return (
    <AdminPageLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-sm text-gray-600 mt-1">{project.title}</p>
        </div>

        <ProjectForm
          initialData={project}
          projectId={project.id}
          clients={clients}
          managers={managers}
        />
      </div>
    </AdminPageLayout>
  );
}
