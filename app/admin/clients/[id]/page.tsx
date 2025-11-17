import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import Link from 'next/link';
import { PencilIcon, BuildingOfficeIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export const metadata = {
  title: 'View Client | Admin Dashboard',
};

async function getClient(id: string) {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      assignedTo: {
        select: {
          name: true,
          email: true,
        },
      },
      projects: {
        include: {
          manager: {
            select: {
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

  if (!client) {
    return null;
  }

  // Convert Decimal to number for serialization
  return {
    ...client,
    lifetimeValue: client.lifetimeValue ? Number(client.lifetimeValue) : 0,
    projects: client.projects.map(project => ({
      ...project,
      budgetAmount: project.budgetAmount ? Number(project.budgetAmount) : null,
      actualCost: project.actualCost ? Number(project.actualCost) : null,
    })),
  };
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

export default async function ViewClientPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const client = await getClient(params.id);

  if (!client) {
    notFound();
  }

  const address = client.address as any;

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {client.companyName || `${client.firstName} ${client.lastName}`}
            </h1>
            <p className="text-sm text-gray-600 mt-1">{client.type} Client</p>
          </div>
          <Link
            href={`/admin/clients/${client.id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit Client
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Status</p>
            <span
              className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                statusColors[client.status]
              }`}
            >
              {client.status.replace('_', ' ')}
            </span>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Source</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{client.source.replace('_', ' ')}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Projects</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{client.projects.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Lifetime Value</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              ${Number(client.lifetimeValue).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {client.companyName && (
              <div className="flex items-start">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Company</p>
                  <p className="text-gray-900 mt-1">{client.companyName}</p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <a href={`mailto:${client.email}`} className="text-gold-600 hover:text-gold-700 mt-1">
                  {client.email}
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <a href={`tel:${client.phone}`} className="text-gold-600 hover:text-gold-700 mt-1">
                  {client.phone}
                </a>
              </div>
            </div>

            {client.alternatePhone && (
              <div className="flex items-start">
                <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Alternate Phone</p>
                  <a href={`tel:${client.alternatePhone}`} className="text-gold-600 hover:text-gold-700 mt-1">
                    {client.alternatePhone}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start md:col-span-2">
              <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Address</p>
                <p className="text-gray-900 mt-1">
                  {address?.street}<br />
                  {address?.city}, {address?.state} {address?.zip}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Assigned To</p>
              <p className="text-gray-900 mt-1">{client.assignedTo.name}</p>
            </div>
          </div>
        </div>

        {/* Projects */}
        {client.projects.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Projects ({client.projects.length})
            </h2>
            <div className="space-y-3">
              {client.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {project.category} • {project.manager.name}
                      </p>
                    </div>
                    <span className="text-sm text-gray-600">{project._count.images} images</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {client.notes.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notes ({client.notes.length})
            </h2>
            <div className="space-y-4">
              {client.notes.map((note) => (
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
