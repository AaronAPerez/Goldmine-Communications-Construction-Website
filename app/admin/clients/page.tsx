import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Clients | Admin Dashboard',
  description: 'Manage your clients',
};

async function getClients() {
  const clients = await prisma.client.findMany({
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          projects: true,
          notes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Convert Decimal to number for serialization
  return clients.map(client => ({
    ...client,
    lifetimeValue: client.lifetimeValue ? Number(client.lifetimeValue) : 0,
  }));
}

const statusColors = {
  LEAD: 'bg-gray-100 text-gray-800',
  CONTACTED: 'bg-blue-100 text-blue-800',
  QUALIFIED: 'bg-purple-100 text-purple-800',
  PROPOSAL_SENT: 'bg-yellow-100 text-yellow-800',
  ACTIVE_CLIENT: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-gray-100 text-gray-600',
  LOST: 'bg-red-100 text-red-800',
};

export default async function ClientsPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const clients = await getClients();

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your client relationships and leads
            </p>
          </div>
          <Link
            href="/admin/clients/new"
            className="inline-flex items-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Client
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Clients', value: clients.length },
            { label: 'Active', value: clients.filter(c => c.status === 'ACTIVE_CLIENT').length },
            { label: 'Leads', value: clients.filter(c => c.status === 'LEAD').length },
            { label: 'Qualified', value: clients.filter(c => c.status === 'QUALIFIED').length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Clients Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No clients yet. Create your first client to get started.
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {client.companyName || `${client.firstName} ${client.lastName}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.companyName && `${client.firstName} ${client.lastName}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{client.email}</div>
                        <div className="text-sm text-gray-500">{client.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{client.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[client.status]
                          }`}
                        >
                          {client.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {client.assignedTo.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client._count.projects} projects
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="text-gold-600 hover:text-gold-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/clients/${client.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                      </td>
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