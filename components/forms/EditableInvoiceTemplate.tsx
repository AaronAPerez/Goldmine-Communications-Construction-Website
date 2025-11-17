'use client';

import Image from 'next/image';
import { forwardRef, useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface InvoiceLineItem {
  id?: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  labor: number;
  material: number;
  total: number;
  order: number;
}

interface InvoiceData {
  invoiceNumber: string;
  issuedDate: string;
  dueDate?: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  title?: string;
  description?: string;
  location?: string;
  bidDate?: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  taxRate?: number;
  amount: number;
  notes?: string;
}

const COMPANY_INFO = {
  name: 'Goldmine Communications and Construction',
  address: '946 Lincoln Ave, San Jose, CA 95125',
  phone: '(925) 305-5980',
  email: 'info@goldminecomm.net',
  website: 'www.goldminecomm.net',
  license: '#1099543',
  logo: '/images/logo/logo-banner.jpg',
};

const TERMS_AND_CONDITIONS = [
  'Payment Terms: Net 30 days from invoice date. Late payments subject to 1.5% monthly interest.',
  'Scope of Work: All work performed in accordance with local building codes and safety regulations.',
  'Warranty: All materials and workmanship guaranteed for one year from completion date.',
  'Change Orders: Any changes to scope of work must be approved in writing and may affect final pricing.',
  'Permits & Inspections: All necessary permits and inspections included unless otherwise specified.',
  'Site Access: Client to provide clear and safe access to work areas during business hours (Mon-Fri 9AM-6PM).',
  'Service Availability: 24/7 emergency support available for critical infrastructure systems.',
  'Validity: This quote is valid for 30 days from invoice date.',
];

interface EditableInvoiceTemplateProps {
  initialData?: Partial<InvoiceData>;
  onChange?: (data: InvoiceData) => void;
  readOnly?: boolean;
}

const EditableInvoiceTemplate = forwardRef<HTMLDivElement, EditableInvoiceTemplateProps>(
  ({ initialData, onChange, readOnly = false }, ref) => {
    const [data, setData] = useState<InvoiceData>({
      invoiceNumber: initialData?.invoiceNumber || `GC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      issuedDate: initialData?.issuedDate || new Date().toISOString().split('T')[0],
      dueDate: initialData?.dueDate || '',
      clientName: initialData?.clientName || '',
      clientPhone: initialData?.clientPhone || '',
      clientEmail: initialData?.clientEmail || '',
      clientAddress: initialData?.clientAddress || '',
      title: initialData?.title || '',
      location: initialData?.location || '',
      bidDate: initialData?.bidDate || '',
      lineItems: initialData?.lineItems || [
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
      ],
      subtotal: initialData?.subtotal || 0,
      tax: initialData?.tax || 0,
      taxRate: initialData?.taxRate || 8.25,
      amount: initialData?.amount || 0,
      notes: initialData?.notes || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Calculate totals whenever line items or tax rate changes
    useEffect(() => {
      const subtotal = data.lineItems.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * ((data.taxRate || 0) / 100);
      const amount = subtotal + tax;

      const updatedData = { ...data, subtotal, tax, amount };
      setData(updatedData);

      if (onChange) {
        onChange(updatedData);
      }
    }, [data.lineItems, data.taxRate]);

    const validateField = (field: string, value: string | number | undefined) => {
      const newErrors = { ...errors };
      const stringValue = String(value || '');

      switch (field) {
        case 'invoiceNumber':
          if (!stringValue.trim()) {
            newErrors[field] = 'Invoice number is required';
          } else {
            delete newErrors[field];
          }
          break;
        case 'clientName':
          if (!stringValue.trim()) {
            newErrors[field] = 'Client name is required';
          } else {
            delete newErrors[field];
          }
          break;
        case 'clientEmail':
          if (stringValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
            newErrors[field] = 'Invalid email format';
          } else {
            delete newErrors[field];
          }
          break;
        case 'clientPhone':
          if (stringValue && !/^[\d\s\-\(\)]+$/.test(stringValue)) {
            newErrors[field] = 'Invalid phone format';
          } else {
            delete newErrors[field];
          }
          break;
      }

      setErrors(newErrors);
    };

    const handleInputChange = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
      const updatedData = { ...data, [field]: value };
      setData(updatedData);

      if (typeof value === 'string' || typeof value === 'number' || value === undefined) {
        validateField(field, value);
      }

      if (onChange) {
        onChange(updatedData);
      }
    };

    const handleLineItemChange = <K extends keyof InvoiceLineItem>(
      index: number,
      field: K,
      value: InvoiceLineItem[K]
    ) => {
      const updatedItems = [...data.lineItems];
      updatedItems[index] = { ...updatedItems[index], [field]: value };

      // Recalculate total for this line item
      const item = updatedItems[index];
      item.total = item.labor + item.material;
      item.unitPrice = item.quantity > 0 ? item.total / item.quantity : 0;

      handleInputChange('lineItems', updatedItems);
    };

    const addLineItem = () => {
      const newItem: InvoiceLineItem = {
        description: '',
        quantity: 1,
        unit: 'EA',
        unitPrice: 0,
        labor: 0,
        material: 0,
        total: 0,
        order: data.lineItems.length,
      };
      handleInputChange('lineItems', [...data.lineItems, newItem]);
    };

    const removeLineItem = (index: number) => {
      if (data.lineItems.length > 1) {
        const updatedItems = data.lineItems.filter((_, i) => i !== index);
        handleInputChange('lineItems', updatedItems);
      }
    };

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    };

    const inputClass = readOnly
      ? 'border-none bg-transparent p-0 focus:ring-0'
      : 'border-b border-blue-300 bg-blue-50 hover:bg-blue-100 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all';

    const cellInputClass = readOnly
      ? 'border-none bg-transparent p-0 focus:ring-0 w-full'
      : 'border border-blue-200 bg-blue-50 hover:bg-blue-100 focus:bg-white focus:ring-1 focus:ring-blue-400 focus:border-blue-500 transition-all w-full';

    return (
      <div ref={ref} className="bg-white text-gray-900 print:p-0">
        <div className="max-w-[8.5in] mx-auto p-8 print:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 border-b-4 border-gold-400 pb-4">
            <div>
              <Image
                src={COMPANY_INFO.logo}
                alt="Goldmine Communications"
                width={150}
                height={75}
                className="mb-3 print:mb-2"
                priority
              />
              <p className="text-sm text-gray-600">{COMPANY_INFO.address}</p>
              <p className="text-sm text-gray-600">
                {COMPANY_INFO.phone} | {COMPANY_INFO.email}
              </p>
              <p className="text-sm text-gray-600">{COMPANY_INFO.website}</p>
              <p className="text-sm font-semibold text-gold-600 mt-1">
                License {COMPANY_INFO.license}
              </p>
            </div>

            <div className="text-right">
              <h1 className="text-5xl font-bold text-gold-600 mb-2">INVOICE</h1>
              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex justify-end items-center">
                  <span className="font-semibold mr-2">Invoice #:</span>
                  <input
                    type="text"
                    value={data.invoiceNumber}
                    onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                    onBlur={(e) => validateField('invoiceNumber', e.target.value)}
                    readOnly={readOnly}
                    className={`w-40 text-sm px-2 py-1 ${inputClass} ${errors.invoiceNumber ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.invoiceNumber && !readOnly && (
                  <p className="text-xs text-red-600 text-right">{errors.invoiceNumber}</p>
                )}
                <div className="flex justify-end items-center print-date-container">
                  <span className="font-semibold mr-2">Date:</span>
                  <input
                    type="date"
                    value={data.issuedDate}
                    onChange={(e) => handleInputChange('issuedDate', e.target.value)}
                    readOnly={readOnly}
                    className={`w-36 text-sm px-2 py-1 ${inputClass} print-hide-calendar`}
                  />
                </div>
                {(data.dueDate || !readOnly) && (
                  <div className="flex justify-end items-center print-date-container">
                    <span className="font-semibold mr-2">Due Date:</span>
                    <input
                      type="date"
                      value={data.dueDate || ''}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      readOnly={readOnly}
                      className={`w-36 text-sm px-2 py-1 ${inputClass} print-hide-calendar`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project and Client Information */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Project Details */}
            <div>
              <h2 className="text-lg font-bold text-gold-600 mb-3 uppercase tracking-wide">
                PROJECT DETAILS
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Project:</span>
                  <input
                    type="text"
                    value={data.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? 'EV Charging Station Infrastructure Development' : ''}
                    className={`inline-block ml-1 text-sm px-2 py-1 ${inputClass}`}
                    style={{ width: 'calc(100% - 70px)' }}
                  />
                </div>
                <div>
                  <span className="font-semibold">Location:</span>
                  <input
                    type="text"
                    value={data.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? 'Downtown Plaza, San Jose, CA 95113' : ''}
                    className={`inline-block ml-1 text-sm px-2 py-1 ${inputClass}`}
                    style={{ width: 'calc(100% - 75px)' }}
                  />
                </div>
                <div className="print-date-container">
                  <span className="font-semibold">Bid Date:</span>
                  <input
                    type="date"
                    value={data.bidDate || ''}
                    onChange={(e) => handleInputChange('bidDate', e.target.value)}
                    readOnly={readOnly}
                    className={`inline-block ml-1 text-sm px-2 py-1 ${inputClass} print-hide-calendar`}
                    style={{ width: 'calc(100% - 75px)' }}
                  />
                </div>
                <div>
                  <span className="font-semibold">Estimator:</span> Goldmine Communications & Construction
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div>
              <h2 className="text-lg font-bold text-gold-600 mb-3 uppercase tracking-wide">
                CLIENT INFORMATION
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Client:</span>
                  <input
                    type="text"
                    value={data.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    onBlur={(e) => validateField('clientName', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? 'Silicon Valley Transit Authority' : ''}
                    className={`inline-block ml-1 text-sm px-2 py-1 ${inputClass} ${errors.clientName ? 'border-red-500' : ''}`}
                    style={{ width: 'calc(100% - 55px)' }}
                    required
                  />
                  {errors.clientName && !readOnly && (
                    <p className="text-xs text-red-600 ml-14">{errors.clientName}</p>
                  )}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>
                  <input
                    type="tel"
                    value={data.clientPhone || ''}
                    onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                    onBlur={(e) => validateField('clientPhone', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? '(408) 555-0123' : ''}
                    className={`inline-block ml-1 text-sm px-2 py-1 ${inputClass} ${errors.clientPhone ? 'border-red-500' : ''}`}
                    style={{ width: 'calc(100% - 60px)' }}
                  />
                  {errors.clientPhone && !readOnly && (
                    <p className="text-xs text-red-600 ml-14">{errors.clientPhone}</p>
                  )}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>
                  <input
                    type="email"
                    value={data.clientEmail || ''}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    onBlur={(e) => validateField('clientEmail', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? 'projects@svta.org' : ''}
                    className={`inline-block ml-1 text-sm px-2 py-1 ${inputClass} ${errors.clientEmail ? 'border-red-500' : ''}`}
                    style={{ width: 'calc(100% - 50px)' }}
                  />
                  {errors.clientEmail && !readOnly && (
                    <p className="text-xs text-red-600 ml-14">{errors.clientEmail}</p>
                  )}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>
                  <input
                    type="text"
                    value={data.clientAddress || ''}
                    onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? '123 main street' : ''}
                    className={`inline-block ml-1 text-sm px-2 py-1 ${inputClass}`}
                    style={{ width: 'calc(100% - 70px)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gold-600 uppercase tracking-wide">
                SCOPE OF WORK
              </h2>
              {!readOnly && (
                <button
                  type="button"
                  onClick={addLineItem}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors no-print"
                >
                  <Plus className="w-4 h-4" />
                  Add Row
                </button>
              )}
            </div>

            {/* Table */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-center py-3 px-3 font-semibold text-gray-700 border-r border-gray-300">Item #</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-300">Description</th>
                    <th className="text-center py-3 px-3 font-semibold text-gray-700 border-r border-gray-300">Qty</th>
                    <th className="text-center py-3 px-3 font-semibold text-gray-700 border-r border-gray-300">Unit</th>
                    <th className="text-right py-3 px-3 font-semibold text-gray-700 border-r border-gray-300">Material</th>
                    <th className="text-right py-3 px-3 font-semibold text-gray-700 border-r border-gray-300">Labor</th>
                    <th className="text-right py-3 px-3 font-semibold text-gray-700">Total</th>
                    {!readOnly && <th className="w-12 no-print"></th>}
                  </tr>
                </thead>
                <tbody>
                  {data.lineItems.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-t border-gray-300"
                    >
                      <td className="py-2 px-3 text-center border-r border-gray-300">{index + 1}</td>
                      <td className="py-2 px-4 border-r border-gray-300">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                          readOnly={readOnly}
                          placeholder={!readOnly ? 'Site Development & Foundation Construction for EV Charging Stations' : ''}
                          className={`text-sm px-2 py-1 ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleLineItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          readOnly={readOnly}
                          className={`text-sm px-2 py-1 text-center ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300 print-hide-dropdown">
                        <select
                          value={item.unit}
                          onChange={(e) => handleLineItemChange(index, 'unit', e.target.value)}
                          disabled={readOnly}
                          className={`text-sm px-2 py-1 text-center ${cellInputClass}`}
                        >
                          <option value="EA">EA</option>
                          <option value="LF">LF</option>
                          <option value="SF">SF</option>
                          <option value="LS">LS</option>
                        </select>
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.material}
                          onChange={(e) => handleLineItemChange(index, 'material', parseFloat(e.target.value) || 0)}
                          readOnly={readOnly}
                          placeholder={!readOnly ? '0.00' : ''}
                          className={`text-sm px-2 py-1 text-right ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.labor}
                          onChange={(e) => handleLineItemChange(index, 'labor', parseFloat(e.target.value) || 0)}
                          readOnly={readOnly}
                          placeholder={!readOnly ? '0.00' : ''}
                          className={`text-sm px-2 py-1 text-right ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-3 text-right font-semibold">
                        {formatCurrency(item.total)}
                      </td>
                      {!readOnly && (
                        <td className="py-2 px-3 text-center no-print">
                          <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                            disabled={data.lineItems.length === 1}
                            className="text-red-600 hover:text-red-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-4 flex justify-end">
              <div className="w-80">
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="text-sm font-semibold">Subtotal:</span>
                  <span className="text-sm font-semibold">{formatCurrency(data.subtotal)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300 items-center">
                  <span className="text-sm font-semibold">
                    Tax (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={data.taxRate || 0}
                      onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                      readOnly={readOnly}
                      className={`inline-block w-16 text-sm px-1 text-center ${inputClass}`}
                    />
                    %):
                  </span>
                  <span className="text-sm font-semibold">{formatCurrency(data.tax)}</span>
                </div>
                <div className="flex justify-between py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 rounded-lg mt-2">
                  <span className="text-lg font-bold">TOTAL:</span>
                  <span className="text-lg font-bold">{formatCurrency(data.amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mt-6 border-t border-gray-300 pt-4">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              TERMS & CONDITIONS
            </h2>
            <div className="space-y-1">
              {TERMS_AND_CONDITIONS.map((term, index) => (
                <p key={index} className="text-xs text-gray-700 leading-relaxed">
                  • {term}
                </p>
              ))}
            </div>
          </div>

          {/* Notes */}
          {(data.notes || !readOnly) && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 print:bg-transparent print:border-gray-300">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Additional Notes:</h3>
              <textarea
                value={data.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                readOnly={readOnly}
                rows={3}
                placeholder={!readOnly ? 'Add any additional notes or payment instructions...' : ''}
                className={`w-full text-xs text-gray-700 ${
                  readOnly ? 'border-none bg-transparent resize-none p-0' : 'border border-blue-200 bg-white p-2 rounded focus:ring-2 focus:ring-blue-400'
                }`}
              />
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-300 text-center">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Thank you for your business!
            </p>
            <p className="text-xs text-gray-600">
              For questions regarding this invoice, please contact Goldmine Communications &
              Construction at {COMPANY_INFO.phone}.
            </p>
          </div>
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            @page {
              size: letter;
              margin: 0.5in;
            }

            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            .no-print {
              display: none !important;
            }

            /* Hide calendar icons from date inputs */
            input[type="date"]::-webkit-calendar-picker-indicator,
            input[type="date"]::-webkit-inner-spin-button {
              display: none !important;
              -webkit-appearance: none !important;
            }

            /* Hide dropdown arrows from selects */
            select {
              -webkit-appearance: none !important;
              -moz-appearance: none !important;
              appearance: none !important;
              background-image: none !important;
            }

            /* Clean up inputs for print */
            input, select, textarea {
              border: none !important;
              background: transparent !important;
              padding: 0 !important;
              -webkit-appearance: none !important;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none !important;
              margin: 0 !important;
            }

            /* Format dates properly in print */
            .print-date-container input[type="date"] {
              color: inherit !important;
            }

            /* Adjust padding for print */
            .print\\:p-6 {
              padding: 1.5rem !important;
            }
          }
        `}</style>
      </div>
    );
  }
);

EditableInvoiceTemplate.displayName = 'EditableInvoiceTemplate';

export default EditableInvoiceTemplate;
