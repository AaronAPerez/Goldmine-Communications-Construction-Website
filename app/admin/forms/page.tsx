import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { FileText, Receipt, Clock, AlertCircle } from 'lucide-react';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';

export const metadata = {
  title: 'Forms & Documents | Goldmine Admin',
};

async function getFormsData() {
  const [invoiceStats, quoteStats, recentInvoices, recentQuotes] = await Promise.all([
    prisma.invoice?.aggregate({
      _count: true,
      _sum: { amount: true },
    }).catch(() => ({ _count: 0, _sum: { amount: 0 } })) || { _count: 0, _sum: { amount: 0 } },

    prisma.quote?.aggregate({
      _count: true,
      _sum: { total: true },
    }).catch(() => ({ _count: 0, _sum: { total: 0 } })) || { _count: 0, _sum: { total: 0 } },

    prisma.invoice?.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        invoiceNumber: true,
        clientName: true,
        amount: true,
        status: true,
        issuedDate: true,
      },
    }).catch(() => []) || [],

    prisma.quote?.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        lead: {
          select: {
            firstName: true,
            lastName: true,
            companyName: true,
          },
        },
      },
    }).catch(() => []) || [],
  ]);

  const pendingInvoices = await prisma.invoice?.count({
    where: {
      status: { in: ['DRAFT', 'SENT'] },
    },
  }).catch(() => 0) || 0;

  const overdueInvoices = await prisma.invoice?.count({
    where: {
      status: 'OVERDUE',
    },
  }).catch(() => 0) || 0;

  return {
    invoiceStats,
    quoteStats,
    recentInvoices,
    recentQuotes,
    pendingInvoices,
    overdueInvoices,
  };
}

export default async function FormsPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const data = await getFormsData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Invoices',
      value: data.invoiceStats._count || 0,
      subtitle: formatCurrency(Number(data.invoiceStats._sum?.amount) || 0),
      icon: Receipt,
      iconColor: 'text-primary-600',
      iconBgColor: 'bg-primary-100',
      href: '/admin/forms/invoices',
    },
    {
      title: 'Total Quotes',
      value: data.quoteStats._count || 0,
      subtitle: formatCurrency(Number(data.quoteStats._sum?.total) || 0),
      icon: FileText,
      iconColor: 'text-gold-600',
      iconBgColor: 'bg-gold-100',
      href: '/admin/forms/quotes',
    },
    {
      title: 'Pending',
      value: data.pendingInvoices,
      subtitle: 'Awaiting payment',
      icon: Clock,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      href: '/admin/forms/invoices?status=pending',
    },
    {
      title: 'Overdue',
      value: data.overdueInvoices,
      subtitle: 'Needs attention',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      iconBgColor: 'bg-red-100',
      href: '/admin/forms/invoices?status=overdue',
    },
  ];

  return (
    <AdminPageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Forms & Documents</h1>
            <p className="text-gray-600 mt-2">Manage invoices, quotes, and financial documents</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/forms/quotes/new"
              className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-medium transition-colors"
            >
              New Quote
            </Link>
            <Link
              href="/admin/forms/invoices/new"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              New Invoice
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-gray-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${stat.iconBgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Invoices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
              <Link
                href="/admin/forms/invoices"
                className="text-sm text-gold-600 hover:text-gold-700 font-medium"
              >
                View all →
              </Link>
            </div>

            {data.recentInvoices.length > 0 ? (
              <div className="space-y-3">
                {data.recentInvoices.map((invoice) => (
                  <Link
                    key={invoice.id}
                    href={`/admin/forms/invoices/${invoice.id}`}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {invoice.invoiceNumber}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {invoice.clientName || 'No client'}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(Number(invoice.amount))}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${invoice.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : invoice.status === 'OVERDUE'
                              ? 'bg-red-100 text-red-800'
                              : invoice.status === 'SENT'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No invoices yet</p>
                <Link
                  href="/admin/forms/invoices/new"
                  className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                >
                  Create your first invoice
                </Link>
              </div>
            )}
          </div>

          {/* Recent Quotes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Quotes</h2>
              <Link
                href="/admin/forms/quotes"
                className="text-sm text-gold-600 hover:text-gold-700 font-medium"
              >
                View all →
              </Link>
            </div>

            {data.recentQuotes.length > 0 ? (
              <div className="space-y-3">
                {data.recentQuotes.map((quote) => (
                  <Link
                    key={quote.id}
                    href={`/admin/forms/quotes/${quote.id}`}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{quote.title}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {quote.lead?.companyName ||
                          `${quote.lead?.firstName} ${quote.lead?.lastName}`}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(Number(quote.total))}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${quote.status === 'ACCEPTED'
                            ? 'bg-green-100 text-green-800'
                            : quote.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : quote.status === 'SENT'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {quote.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No quotes yet</p>
                <Link
                  href="/admin/forms/quotes/new"
                  className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                >
                  Create your first quote
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
