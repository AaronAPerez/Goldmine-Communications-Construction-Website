'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Printer, Trash2 } from 'lucide-react';
import InvoiceTemplate from '@/components/forms/InvoiceTemplate';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';

interface Invoice {
  id: string;
  invoiceNumber: string;
  issuedDate: string;
  dueDate: string | null;
  clientName: string;
  clientPhone: string | null;
  clientEmail: string | null;
  clientAddress: string | null;
  subtotal: number;
  tax: number;
  taxRate: number | null;
  amount: number;
  status: string;
  notes: string | null;
  project: {
    id: string;
    title: string;
    description: string | null;
    location: string | null;
    bidDate: string | null;
  } | null;
  lineItems: Array<{
    id: string;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    labor: number;
    material: number;
    total: number;
    order: number;
  }>;
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchInvoice = async () => {
    if (!params?.id) return;

    try {
      const res = await fetch(`/api/invoices/${params.id}`);
      if (!res.ok) throw new Error('Failed to fetch invoice');
      const data = await res.json();
      setInvoice(data);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast.error('Failed to load invoice');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: invoice?.invoiceNumber || 'Invoice',
  });

  const handleDelete = async () => {
    if (!params?.id) return;

    if (!confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/invoices/${params.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete invoice');

      toast.success('Invoice deleted successfully');
      router.push('/admin/forms/invoices');
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast.error('Failed to delete invoice');
      setDeleting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice not found</h2>
        <Link
          href="/admin/forms/invoices"
          className="text-gold-600 hover:text-gold-700 font-medium"
        >
          ← Back to Invoices
        </Link>
      </div>
    );
  }

  // Prepare invoice data for template
  const invoiceData = {
    invoiceNumber: invoice.invoiceNumber,
    issuedDate: invoice.issuedDate,
    dueDate: invoice.dueDate || undefined,
    clientName: invoice.clientName,
    clientPhone: invoice.clientPhone || undefined,
    clientEmail: invoice.clientEmail || undefined,
    clientAddress: invoice.clientAddress || undefined,
    title: invoice.project?.title,
    description: invoice.project?.description || undefined,
    location: invoice.project?.location || undefined,
    bidDate: invoice.project?.bidDate || undefined,
    lineItems: invoice.lineItems,
    subtotal: Number(invoice.subtotal),
    tax: Number(invoice.tax),
    taxRate: invoice.taxRate ? Number(invoice.taxRate) : undefined,
    amount: Number(invoice.amount),
    notes: invoice.notes || undefined,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/forms/invoices"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                  invoice.status
                )}`}
              >
                {invoice.status}
              </span>
              <span className="text-sm text-gray-600">
                {formatCurrency(Number(invoice.amount))}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
          <Link
            href={`/admin/forms/invoices/${invoice.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-medium transition-colors"
          >
            <Edit className="w-5 h-5" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-5 h-5" />
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Invoice Preview */}
      <div className="bg-gray-100 rounded-xl p-8">
        <div className="bg-white rounded-lg shadow-lg">
          <InvoiceTemplate ref={invoiceRef} data={invoiceData} />
        </div>
      </div>

      {/* Print Hidden Component */}
      <div className="hidden">
        <InvoiceTemplate ref={invoiceRef} data={invoiceData} />
      </div>
    </div>
  );
}
