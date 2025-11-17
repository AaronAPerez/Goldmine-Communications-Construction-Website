import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Eye, Pencil } from 'lucide-react';

export const metadata = {
  title: 'Projects | Admin Dashboard',
  description: 'Manage your projects',
};

async function getProjects() {
  const projects = await prisma.project.findMany({
    include: {
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          companyName: true,
        },
      },
      manager: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          images: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Convert Decimal to number for serialization
  return projects.map(project => ({
    ...project,
    budgetAmount: project.budgetAmount ? Number(project.budgetAmount) : null,
    actualCost: project.actualCost ? Number(project.actualCost) : null,
  }));
}

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  PLANNING: 'bg-blue-100 text-blue-800',
  ACTIVE: 'bg-green-100 text-green-800',
  ON_HOLD: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-purple-100 text-purple-800',
  ARCHIVED: 'bg-gray-100 text-gray-600',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default async function ProjectsPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const projects = await getProjects();

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your construction and communications projects
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Project
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Projects', value: projects.length },
            { label: 'Active', value: projects.filter(p => p.status === 'ACTIVE').length },
            { label: 'Planning', value: projects.filter(p => p.status === 'PLANNING').length },
            { label: 'Completed', value: projects.filter(p => p.status === 'COMPLETED').length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Projects Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No projects yet. Create your first project to get started.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="text-gold-600 hover:text-gold-900"
                        >
                          <Eye size={16} className="inline-block mr-1"
                          aria-label='view' />
                          {/* View */}
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Pencil size={16} className="inline-block mr-1"
                          aria-label="edit" />
                          {/* Edit */}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {project._count.images} images
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {project.client.companyName ||
                            `${project.client.firstName} ${project.client.lastName}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {project.manager.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[project.status]
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(project.startDate), 'MMM d, yyyy')}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="text-gold-600 hover:text-gold-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}