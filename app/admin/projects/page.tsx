import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProjectsTable from '@/components/admin/projects/ProjectsTable';

export const metadata = {
  title: 'Projects | Admin Dashboard',
  description: 'Manage your construction and communications projects',
};

interface SearchParams {
  page?: string;
  search?: string;
  status?: string;
  category?: string;
}

async function getProjects(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const search = searchParams.search || '';
  const status = searchParams.status || '';
  const category = searchParams.category || '';

  const where: any = {};

  // Search filter
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      {
        client: {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
          ],
        },
      },
    ];
  }

  // Status filter
  if (status) {
    where.status = status;
  }

  // Category filter
  if (category) {
    where.category = category;
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
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
        images: {
          select: {
            url: true,
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            images: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  // Convert Decimal to number for serialization
  const serializedProjects = projects.map(project => ({
    ...project,
    budgetAmount: project.budgetAmount ? Number(project.budgetAmount) : null,
    actualCost: project.actualCost ? Number(project.actualCost) : null,
  }));

  return {
    projects: serializedProjects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

async function getFilterCounts() {
  const [statusCounts, categoryCounts] = await Promise.all([
    prisma.project.groupBy({
      by: ['status'],
      _count: true,
    }),
    prisma.project.groupBy({
      by: ['category'],
      _count: true,
    }),
  ]);

  return { statusCounts, categoryCounts };
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const [{ projects, pagination }, { statusCounts, categoryCounts }] =
    await Promise.all([getProjects(searchParams), getFilterCounts()]);

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage construction and communications projects
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {pagination.total}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {statusCounts.find((s) => s.status === 'ACTIVE')?._count || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Planning</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {statusCounts.find((s) => s.status === 'PLANNING')?._count || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">
              {statusCounts.find((s) => s.status === 'COMPLETED')?._count || 0}
            </p>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ProjectsTable
            projects={projects}
            pagination={pagination}
            statusCounts={statusCounts}
            categoryCounts={categoryCounts}
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
