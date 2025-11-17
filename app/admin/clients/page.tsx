import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ClientsTable from '@/components/admin/clients/ClientsTable';

export const metadata = {
  title: 'Clients | Admin Dashboard',
  description: 'Manage your clients and leads',
};

interface SearchParams {
  page?: string;
  search?: string;
  status?: string;
  type?: string;
}

async function getClients(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const search = searchParams.search || '';
  const status = searchParams.status || '';
  const type = searchParams.type || '';

  const where: any = {};

  // Search filter
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { companyName: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Status filter
  if (status) {
    where.status = status;
  }

  // Type filter
  if (type) {
    where.type = type;
  }

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            projects: true,
            notes: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.client.count({ where }),
  ]);

  // Convert Decimal to number for serialization
  const serializedClients = clients.map(client => ({
    ...client,
    lifetimeValue: client.lifetimeValue ? Number(client.lifetimeValue) : 0,
  }));

  return {
    clients: serializedClients,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

async function getFilterCounts() {
  const [statusCounts, typeCounts] = await Promise.all([
    prisma.client.groupBy({
      by: ['status'],
      _count: true,
    }),
    prisma.client.groupBy({
      by: ['type'],
      _count: true,
    }),
  ]);

  return { statusCounts, typeCounts };
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const [{ clients, pagination }, { statusCounts, typeCounts }] =
    await Promise.all([getClients(searchParams), getFilterCounts()]);

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your clients and track leads
            </p>
          </div>
          <Link
            href="/admin/clients/new"
            className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Client
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Clients</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {pagination.total}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Leads</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {statusCounts.find((s) => s.status === 'LEAD')?._count || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {statusCounts.find((s) => s.status === 'ACTIVE_CLIENT')?._count || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Commercial</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {typeCounts.find((t) => t.type === 'COMMERCIAL')?._count || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Government</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {typeCounts.find((t) => t.type === 'GOVERNMENT')?._count || 0}
            </p>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ClientsTable
            clients={clients}
            pagination={pagination}
            statusCounts={statusCounts}
            typeCounts={typeCounts}
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
