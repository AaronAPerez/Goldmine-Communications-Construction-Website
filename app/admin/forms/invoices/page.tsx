import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Receipt, Search, Printer, Eye, Edit, Plus } from 'lucide-react';

export const metadata = {
  title: 'Invoices | Goldmine Admin',
};

async function getInvoices(searchQuery?: string, statusFilter?: string) {
  const where: any = {};

  if (statusFilter && statusFilter !== 'ALL') {
    where.status = statusFilter;
  }

  if (searchQuery) {
    where.OR = [
      { invoiceNumber: { contains: searchQuery, mode: 'insensitive' } },
      { clientName: { contains: searchQuery, mode: 'insensitive' } },
      { clientEmail: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  const invoices = await prisma.invoice?.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      project: {
        select: {
          title: true,
        },
      },
    },
  }).catch(() => []) || [];

  return invoices;
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string };
}) {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const invoices = await getInvoices(searchParams.search, searchParams.status);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800' },
      SENT: { bg: 'bg-blue-100', text: 'text-blue-800' },
      PAID: { bg: 'bg-green-100', text: 'text-green-800' },
      OVERDUE: { bg: 'bg-red-100', text: 'text-red-800' },
      CANCELLED: { bg: 'bg-gray-100', text: 'text-gray-600' },
    };

    const config = statusConfig[status] || statusConfig.DRAFT;
    return `${config.bg} ${config.text}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-2">Manage and track all invoices</p>
        </div>
        <Link
          href="/admin/forms/invoices/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Invoice
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice #, client name, or email..."
              defaultValue={searchParams.search}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              name="search"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              defaultValue={searchParams.status || 'ALL'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              name="status"
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SENT">Sent</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Invoice #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Issued Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/forms/invoices/${invoice.id}`}
                        className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {invoice.clientName}
                        </p>
                        {invoice.clientEmail && (
                          <p className="text-xs text-gray-500">{invoice.clientEmail}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {invoice.project?.title || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(Number(invoice.amount))}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{formatDate(invoice.issuedDate)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {invoice.dueDate ? formatDate(invoice.dueDate) : '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/forms/invoices/${invoice.id}`}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/forms/invoices/${invoice.id}/edit`}
                          className="p-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Print"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-600 mb-6">
              {searchParams.search || searchParams.status
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first invoice'}
            </p>
            <Link
              href="/admin/forms/invoices/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Invoice
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
