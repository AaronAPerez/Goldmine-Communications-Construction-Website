import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectForm from '@/components/admin/projects/ProjectForm';

interface PageProps {
  params: { id: string };
}

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      manager: true,
      images: { orderBy: { order: 'asc' } },
    },
  });

  if (!project) return null;

  return project;
}

async function getFormData() {
  const [clients, managers] = await Promise.all([
    prisma.client.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        companyName: true,
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

export default async function EditProjectPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const [project, { clients, managers }] = await Promise.all([
    getProject(params.id),
    getFormData(),
  ]);

  if (!project) notFound();

  return (
    <div className="max-w-5xl mx-auto">
      <ProjectForm
        clients={clients}
        managers={managers}
        initialData={project}
        isEdit
      />
    </div>
  );
}