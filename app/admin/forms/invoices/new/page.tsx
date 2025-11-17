'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Printer, FileText } from 'lucide-react';
import { toast } from 'sonner';
import AdminPageLayout from '@/components/admin/layouts/AdminPageLayout';
import EditableInvoiceTemplate from '@/components/forms/EditableInvoiceTemplate';
import { useReactToPrint } from 'react-to-print';

interface Project {
  id: string;
  name: string;
  location: string | null;
  bidDate: string | null;
  client: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
  };
}

export default function NewInvoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [isBlankForm, setIsBlankForm] = useState(true);

  useEffect(() => {
    fetchProjects();
    const projectId = searchParams.get('projectId');
    if (projectId) {
      setSelectedProjectId(projectId);
      setIsBlankForm(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedProjectId && projects.length > 0) {
      loadProjectData(selectedProjectId);
    }
  }, [selectedProjectId, projects]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    }
  };

  const loadProjectData = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const address = [
        project.client.address,
        project.client.city,
        project.client.state,
        project.client.zipCode,
      ]
        .filter(Boolean)
        .join(', ');

      setInvoiceData({
        title: project.name,
        location: project.location || '',
        bidDate: project.bidDate || '',
        clientName: project.client.name,
        clientEmail: project.client.email || '',
        clientPhone: project.client.phone || '',
        clientAddress: address,
      });
      setIsBlankForm(false);
    }
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
    if (projectId) {
      loadProjectData(projectId);
    } else {
      setInvoiceData(null);
      setIsBlankForm(true);
    }
  };

  const handleInvoiceDataChange = (data: any) => {
    setInvoiceData(data);
  };

  const handleSave = async () => {
    if (!invoiceData) {
      toast.error('Please fill in the invoice details');
      return;
    }

    if (!invoiceData.clientName?.trim()) {
      toast.error('Client name is required');
      return;
    }

    if (!invoiceData.lineItems?.some((item: any) => item.description.trim() && item.total > 0)) {
      toast.error('Please add at least one valid line item');
      return;
    }

    setLoading(true);

    try {
      const lineItemsWithUnitPrice = invoiceData.lineItems.map((item: any, index: number) => ({
        ...item,
        unitPrice: item.quantity > 0 ? item.total / item.quantity : 0,
        order: index,
      }));

      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber: invoiceData.invoiceNumber,
          projectId: selectedProjectId || null,
          clientName: invoiceData.clientName,
          clientEmail: invoiceData.clientEmail || null,
          clientPhone: invoiceData.clientPhone || null,
          clientAddress: invoiceData.clientAddress || null,
          issuedDate: invoiceData.issuedDate,
          dueDate: invoiceData.dueDate || null,
          subtotal: invoiceData.subtotal,
          tax: invoiceData.tax,
          taxRate: invoiceData.taxRate,
          amount: invoiceData.amount,
          status: 'DRAFT',
          notes: invoiceData.notes || null,
          lineItems: lineItemsWithUnitPrice,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create invoice');
      }

      const invoice = await res.json();
      toast.success('Invoice created successfully!');
      router.push(`/admin/forms/invoices/${invoice.id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create invoice');
      console.error('Error creating invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: invoiceData?.invoiceNumber || 'Invoice',
  });

  const createBlankForm = () => {
    setSelectedProjectId('');
    setInvoiceData(null);
    setIsBlankForm(true);
    toast.info('Blank invoice form created');
  };

  return (
    <AdminPageLayout>
      <div className="space-y-4">
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
              <h1 className="text-3xl font-bold text-gray-900">Create New Invoice</h1>
              <p className="text-gray-600 mt-1">
                {isBlankForm ? 'Creating a blank invoice form' : 'Pre-filled with project data'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={createBlankForm}
              className="flex items-center gap-2 px-4 py-2 outline outline-gray-700 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Blank Form
            </button>
            <button
              type="button"
              onClick={handlePrint}
              disabled={!invoiceData}
              className="flex items-center gap-2 px-4 py-2 outline outline-green-600 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading || !invoiceData}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Invoice'}
            </button>
          </div>
        </div>

        {/* Project Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Load from Project (Optional)</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <select
                value={selectedProjectId}
                onChange={(e) => handleProjectChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              >
                <option value="">Create blank invoice (no project)</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} - {project.client.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedProjectId && (
              <div className="text-sm text-green-600 font-medium">
                ✓ Project data loaded
              </div>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Select a project to automatically fill in client and project details, or create a blank invoice to enter all information manually.
          </p>
        </div>

        {/* Invoice Preview with Editable Fields */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-inner">
          <div className="bg-white rounded-lg shadow-xl">
            <EditableInvoiceTemplate
              ref={invoiceRef}
              initialData={invoiceData}
              onChange={handleInvoiceDataChange}
              readOnly={false}
            />
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 How to use:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Click on any field with a blue background to edit it directly on the form</li>
            <li>Use the &quot;Add Row&quot; button to add more line items</li>
            <li>All calculations update automatically as you type</li>
            <li>Click &quot;Save Invoice&quot; when done to save to the database</li>
            <li>Click &quot;Print&quot; to generate a PDF preview</li>
            <li>Use &quot;Blank Form&quot; to start over with empty fields</li>
          </ul>
        </div>
      </div>
    </AdminPageLayout>
  );
}
