'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface LineItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  labor: number;
  material: number;
  total: number;
  order: number;
}

interface Project {
  id: string;
  title: string;
  client: {
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
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // Form state
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [projectId, setProjectId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [issuedDate, setIssuedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState(9.25);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      description: '',
      quantity: 1,
      unit: 'EA',
      unitPrice: 0,
      labor: 0,
      material: 0,
      total: 0,
      order: 0,
    },
  ]);

  // Validation state
  const [touched, setTouched] = useState({
    invoiceNumber: false,
    clientName: false,
    lineItems: false,
  });

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
    generateInvoiceNumber();
  }, []);

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

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    setInvoiceNumber(`GC-${year}-${random}`);
  };

  const handleProjectChange = (projectId: string) => {
    setProjectId(projectId);
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setClientName(project.client.name);
      setClientEmail(project.client.email || '');
      setClientPhone(project.client.phone || '');
      const address = [
        project.client.address,
        project.client.city,
        project.client.state,
        project.client.zipCode,
      ]
        .filter(Boolean)
        .join(', ');
      setClientAddress(address);
    }
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        description: '',
        quantity: 1,
        unit: 'EA',
        unitPrice: 0,
        labor: 0,
        material: 0,
        total: 0,
        order: lineItems.length,
      },
    ]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };

    // Calculate total for this line item
    const item = updated[index];
    item.total = item.labor + item.material;

    setLineItems(updated);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched for validation
    setTouched({
      invoiceNumber: true,
      clientName: true,
      lineItems: true,
    });

    // Validate required fields
    if (!invoiceNumber.trim()) {
      toast.error('Invoice number is required');
      return;
    }

    if (!clientName.trim()) {
      toast.error('Client name is required');
      return;
    }

    if (!hasValidLineItems()) {
      toast.error('Please add at least one valid line item with a description and amount');
      return;
    }

    setLoading(true);

    try {
      const subtotal = calculateSubtotal();
      const tax = calculateTax();
      const amount = calculateTotal();

      // Calculate unitPrice for each line item
      const lineItemsWithUnitPrice = lineItems.map((item) => ({
        ...item,
        unitPrice: item.quantity > 0 ? item.total / item.quantity : 0,
      }));

      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber,
          projectId: projectId || null,
          clientName,
          clientEmail: clientEmail || null,
          clientPhone: clientPhone || null,
          clientAddress: clientAddress || null,
          issuedDate,
          dueDate: dueDate || null,
          subtotal,
          tax,
          taxRate,
          amount,
          status,
          notes: notes || null,
          lineItems: lineItemsWithUnitPrice,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        const errorMessage = error.details
          ? `${error.error}: ${error.details}`
          : error.error || 'Failed to create invoice';
        throw new Error(errorMessage);
      }

      const invoice = await res.json();
      toast.success('Invoice created successfully!');
      router.push(`/admin/forms/invoices/${invoice.id}`);
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to create invoice';
      toast.error(errorMsg);
      console.error('Error creating invoice:', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Validation helpers
  const hasValidLineItems = () => {
    return lineItems.some((item) => item.description.trim() !== '' && item.total > 0);
  };

  const getFieldError = (field: string) => {
    if (!touched[field as keyof typeof touched]) return '';

    switch (field) {
      case 'invoiceNumber':
        return !invoiceNumber.trim() ? 'Invoice number is required' : '';
      case 'clientName':
        return !clientName.trim() ? 'Client name is required' : '';
      case 'lineItems':
        return !hasValidLineItems() ? 'At least one valid line item is required' : '';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/forms/invoices"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Invoice</h1>
          <p className="text-gray-600 mt-1">Fill in the details to create a new invoice</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Number *
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                onBlur={() => setTouched({ ...touched, invoiceNumber: true })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-colors ${
                  getFieldError('invoiceNumber')
                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
                    : 'border-gray-300 focus:ring-gold-400 focus:border-gold-400'
                }`}
                required
              />
              {getFieldError('invoiceNumber') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('invoiceNumber')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project (Optional)
              </label>
              <select
                value={projectId}
                onChange={(e) => handleProjectChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              >
                <option value="">Select a project (or enter manually)</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issued Date *
              </label>
              <input
                type="date"
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                required
              >
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent</option>
                <option value="PAID">Paid</option>
                <option value="OVERDUE">Overdue</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
              />
              <p className="mt-1 text-xs text-gray-500">Default is 9.25% - adjust as needed</p>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                onBlur={() => setTouched({ ...touched, clientName: true })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-colors ${
                  getFieldError('clientName')
                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
                    : 'border-gray-300 focus:ring-gold-400 focus:border-gold-400'
                }`}
                required
                placeholder="Enter client name"
              />
              {getFieldError('clientName') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('clientName')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                placeholder="client@example.com"
              />
              <p className="mt-1 text-xs text-gray-500">Optional - for sending invoice via email</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Phone
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                placeholder="(555) 123-4567"
              />
              <p className="mt-1 text-xs text-gray-500">Optional - contact phone number</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Address
              </label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                placeholder="123 Main St, City, ST 12345"
              />
              <p className="mt-1 text-xs text-gray-500">Optional - billing address</p>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">Line Items</h2>
            <button
              type="button"
              onClick={addLineItem}
              className="flex items-center gap-2 px-3 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Add items to the invoice. Enter material and labor costs separately for each item.
          </p>
          {getFieldError('lineItems') && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{getFieldError('lineItems')}</p>
            </div>
          )}

          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 p-4 border border-gray-200 rounded-lg"
              >
                <div className="col-span-12 md:col-span-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                    required
                  />
                </div>

                <div className="col-span-6 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateLineItem(index, 'quantity', parseInt(e.target.value) || 1)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                  />
                </div>

                <div className="col-span-6 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={item.unit}
                    onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                  >
                    <option value="EA">EA</option>
                    <option value="LF">LF</option>
                    <option value="SF">SF</option>
                    <option value="LS">LS</option>
                  </select>
                </div>

                <div className="col-span-6 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Material
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.material}
                    onChange={(e) =>
                      updateLineItem(index, 'material', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                  />
                </div>

                <div className="col-span-6 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Labor</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.labor}
                    onChange={(e) =>
                      updateLineItem(index, 'labor', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
                  />
                </div>

                <div className="col-span-10 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Total</label>
                  <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg">
                    {formatCurrency(item.total)}
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeLineItem(index)}
                    disabled={lineItems.length === 1}
                    className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-full md:w-80 space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-sm font-semibold">Subtotal:</span>
                <span className="text-sm font-semibold">
                  {formatCurrency(calculateSubtotal())}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-sm font-semibold">Tax ({taxRate}%):</span>
                <span className="text-sm font-semibold">{formatCurrency(calculateTax())}</span>
              </div>
              <div className="flex justify-between py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 rounded-lg">
                <span className="text-lg font-bold">TOTAL:</span>
                <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
            placeholder="Add any additional notes or payment instructions..."
          />
          <p className="mt-2 text-xs text-gray-500">
            Optional - Include payment terms, special instructions, or thank you message
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/forms/invoices"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Creating...' : 'Create Invoice'}
          </button>
        </div>
      </form>
    </div>
  );
}
