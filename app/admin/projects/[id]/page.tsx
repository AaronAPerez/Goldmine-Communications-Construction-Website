import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import Image from 'next/image';

export const metadata = {
  title: 'View Project | Admin Dashboard',
};

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      manager: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      images: {
        orderBy: {
          order: 'asc',
        },
      },
      notes: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!project) {
    return null;
  }

  // Convert Decimal to number for serialization
  return {
    ...project,
    budgetAmount: project.budgetAmount ? Number(project.budgetAmount) : null,
    actualCost: project.actualCost ? Number(project.actualCost) : null,
    client: {
      ...project.client,
      lifetimeValue: project.client.lifetimeValue ? Number(project.client.lifetimeValue) : 0,
    },
  };
}

export default async function ViewProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  const location = project.location as any;

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{project.category}</p>
          </div>
          <Link
            href={`/admin/projects/${project.id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit Project
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{project.status}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Priority</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{project.priority}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {format(new Date(project.startDate), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Budget</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {project.budgetAmount ? `$${Number(project.budgetAmount).toLocaleString()}` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>

          <div>
            <p className="text-sm font-medium text-gray-700">Description</p>
            <p className="text-gray-900 mt-1">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Client</p>
              <p className="text-gray-900 mt-1">
                {project.client.companyName ||
                  `${project.client.firstName} ${project.client.lastName}`}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Project Manager</p>
              <p className="text-gray-900 mt-1">{project.manager.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Location</p>
              <p className="text-gray-900 mt-1">
                {location?.address}, {location?.city}, {location?.state} {location?.zip}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Services</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.services.map((service: string) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-gold-100 text-gold-800 text-xs rounded"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        {project.images.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Project Images ({project.images.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.altText || 'Project image'}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {project.notes.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notes ({project.notes.length})
            </h2>
            <div className="space-y-4">
              {project.notes.map((note) => (
                <div key={note.id} className="border-l-4 border-gold-500 pl-4">
                  <p className="text-gray-900">{note.content}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {note.user.name} - {format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminPageLayout>
  );
}
