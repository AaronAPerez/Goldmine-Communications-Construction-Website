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

    const inputClass = readOnly
      ? 'border-none bg-transparent p-0 focus:ring-0'
      : 'border-b border-blue-300 bg-blue-50 hover:bg-blue-100 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all';

    const cellInputClass = readOnly
      ? 'border-none bg-transparent p-0 focus:ring-0 w-full'
      : 'border border-blue-200 bg-blue-50 hover:bg-blue-100 focus:bg-white focus:ring-1 focus:ring-blue-400 focus:border-blue-500 transition-all w-full';

    return (
      <div ref={ref} className="bg-white text-gray-900 print:p-0 min-w-[320px]">
        <div className="max-w-[8.5in] mx-auto p-4 md:p-8 print:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start justify-between mb-4 md:mb-6 border-b-4 border-[#a68729] pb-4 gap-4 md:gap-0">
            <div>
              <Image
                src={COMPANY_INFO.logo}
                alt="Goldmine Communications"
                width={150}
                height={75}
                className="mb-2 md:mb-3 print:mb-2 w-32 md:w-auto h-auto"
                priority
              />
              <p className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{COMPANY_INFO.address}</p>
              <p className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                {COMPANY_INFO.phone} | {COMPANY_INFO.email}
              </p>
              <p className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{COMPANY_INFO.website}</p>
              <p className="text-xs md:text-sm font-semibold text-gold-600 mt-1 whitespace-nowrap">
                License {COMPANY_INFO.license}
              </p>
            </div>

            <div className="text-left md:text-right w-full md:w-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-gold-600 mb-2">INVOICE</h1>
              <div className="text-xs md:text-sm text-gray-700 space-y-1">
                <div className="flex justify-start md:justify-end items-center">
                  <span className="font-semibold mr-2">Invoice #:</span>
                  <input
                    type="text"
                    value={data.invoiceNumber}
                    onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                    onBlur={(e) => validateField('invoiceNumber', e.target.value)}
                    readOnly={readOnly}
                    className={`w-32 text-xs md:text-sm px-2 py-2 md:py-1 text-left md:text-right ${inputClass} ${errors.invoiceNumber ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.invoiceNumber && !readOnly && (
                  <p className="text-xs text-red-600 text-left md:text-right">{errors.invoiceNumber}</p>
                )}
                <div className="flex justify-start md:justify-end items-center print-date-container">
                  <span className="font-semibold mr-2">Date:</span>
                  <input
                    type="date"
                    value={data.issuedDate}
                    onChange={(e) => handleInputChange('issuedDate', e.target.value)}
                    readOnly={readOnly}
                    className={`w-32 text-xs md:text-sm px-2 py-2 md:py-1 text-left md:text-right ${inputClass} print-hide-calendar`}
                  />
                </div>
                {(data.dueDate || !readOnly) && (
                  <div className="flex justify-start md:justify-end items-center print-date-container">
                    <span className="font-semibold mr-2">Due Date:</span>
                    <input
                      type="date"
                      value={data.dueDate || ''}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      readOnly={readOnly}
                      className={`w-32 text-xs md:text-sm px-2 py-2 md:py-1 text-left md:text-right ${inputClass} print-hide-calendar`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project and Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
            {/* Project Details */}
            <div>
              <h2 className="text-sm md:text-lg font-bold text-gold-600 mb-2 md:mb-3 uppercase tracking-wide">
                PROJECT DETAILS
              </h2>
              <div className="space-y-2 text-xs md:text-sm">
                <div>
                  <span className="font-semibold">Project:</span>
                  <input
                    type="text"
                    value={data.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? 'Enter project name or title' : ''}
                    className={`inline-block ml-1 text-xs md:text-sm px-2 py-2 md:py-1 ${inputClass}`}
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
                    placeholder={!readOnly ? 'Enter project location/address' : ''}
                    className={`inline-block ml-1 text-xs md:text-sm px-2 py-2 md:py-1 ${inputClass}`}
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
                    className={`inline-block ml-1 text-xs md:text-sm px-2 py-2 md:py-1 ${inputClass} print-hide-calendar`}
                    style={{ width: 'calc(100% - 75px)' }}
                  />
                </div>
                {/* <div>
                  <span className="font-semibold">Estimator:</span> Goldmine Communications & Construction
                </div> */}
              </div>
            </div>

            {/* Client Information */}
            <div>
              <h2 className="text-sm md:text-lg font-bold text-gold-600 mb-2 md:mb-3 uppercase tracking-wide">
                CLIENT INFORMATION
              </h2>
              <div className="space-y-2 text-xs md:text-sm">
                <div>
                  <span className="font-semibold">Client:</span>
                  <input
                    type="text"
                    value={data.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    onBlur={(e) => validateField('clientName', e.target.value)}
                    readOnly={readOnly}
                    placeholder={!readOnly ? 'Enter client/company name' : ''}
                    className={`inline-block ml-1 text-xs md:text-sm px-2 py-2 md:py-1 ${inputClass} ${errors.clientName ? 'border-red-500' : ''}`}
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
                    placeholder={!readOnly ? 'Enter phone number' : ''}
                    className={`inline-block ml-1 text-xs md:text-sm px-2 py-2 md:py-1 ${inputClass} ${errors.clientPhone ? 'border-red-500' : ''}`}
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
                    placeholder={!readOnly ? 'Enter email address' : ''}
                    className={`inline-block ml-1 text-xs md:text-sm px-2 py-2 md:py-1 ${inputClass} ${errors.clientEmail ? 'border-red-500' : ''}`}
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
                    placeholder={!readOnly ? 'Enter street address' : ''}
                    className={`inline-block ml-1 text-xs md:text-sm px-2 py-2 md:py-1 ${inputClass}`}
                    style={{ width: 'calc(100% - 70px)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm md:text-lg font-bold text-gold-600 uppercase tracking-wide">
                SCOPE OF WORK
              </h2>
              {!readOnly && (
                <button
                  type="button"
                  onClick={addLineItem}
                  className="flex items-center gap-2 px-3 py-2 md:py-1.5 bg-blue-500 active:bg-blue-600 hover:bg-blue-600 text-white rounded-lg text-xs md:text-sm font-medium transition-colors no-print touch-target-44"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Row</span>
                  <span className="sm:hidden">Add</span>
                </button>
              )}
            </div>

            {/* Table - Mobile: Scroll horizontally, Desktop: Full width */}
            <div className="border border-gray-300 overflow-x-auto -mx-4 md:mx-0 md:overflow-hidden">
              <div className="min-w-[640px] md:min-w-0">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-center py-2 px-1 md:px-2 font-semibold text-gray-800 border-r border-l border-gray-300 w-12 md:w-20 text-xs md:text-sm">Item #</th>
                    <th className="text-left py-1 px-2 md:px-4 font-semibold text-gray-800 border-r border-gray-300 text-xs md:text-sm">Description</th>
                    <th className="text-center py-2 px-1 font-semibold text-gray-800 border-r border-gray-300 text-xs md:text-sm">Qty</th>
                    <th className="text-center py-2 px-1 md:px-3 font-semibold text-gray-800 border-r border-gray-300 text-xs md:text-sm">Unit</th>
                    <th className="text-right py-2 px-1 md:px-3 font-semibold text-gray-800 border-r border-gray-300 text-xs md:text-sm">Material</th>
                    <th className="text-right py-2 px-1 md:px-3 font-semibold text-gray-800 border-r border-gray-300 text-xs md:text-sm">Labor</th>
                    <th className="text-right py-2 px-1 md:px-3 font-semibold text-gray-800 text-xs md:text-sm border-r">Total</th>
                    {!readOnly && <th className="w-10 md:w-12 no-print"></th>}
                  </tr>
                </thead>
                <tbody>
                  {data.lineItems.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className={`border-t border-l border-gray-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="py-2 px-1 text-center border-r border-gray-300 text-xs md:text-sm">{index + 1}</td>
                      <td className="py-2 px-1 border-r border-gray-300">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                          readOnly={readOnly}
                          placeholder={!readOnly ? 'Enter work description' : ''}
                          className={`text-xs md:text-sm px-2 py-2 md:py-1 ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-1 border-r border-gray-300">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleLineItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          readOnly={readOnly}
                          className={`text-xs md:text-sm px-2 py-2 md:py-1 text-center ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-1 border-r border-gray-300">
                        {readOnly ? (
                          <span className="text-xs md:text-sm text-center block">{item.unit}</span>
                        ) : (
                          <select
                            value={item.unit}
                            onChange={(e) => handleLineItemChange(index, 'unit', e.target.value)}
                            className={`text-xs md:text-sm px-1 md:px-2 py-2 md:py-1 text-center ${cellInputClass}`}
                          >
                            <option value="EA">EA</option>
                            <option value="LF">LF</option>
                            <option value="SF">SF</option>
                            <option value="LS">LS</option>
                          </select>
                        )}
                      </td>
                      <td className="py-2 px-1 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.material || ''}
                          onChange={(e) => handleLineItemChange(index, 'material', parseFloat(e.target.value) || 0)}
                          readOnly={readOnly}
                          placeholder={!readOnly ? '$' : ''}
                          className={`text-xs md:text-sm px-1 md:px-2 py-2 md:py-1 text-right ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-1 md:px-3 border-r border-gray-300">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.labor || ''}
                          onChange={(e) => handleLineItemChange(index, 'labor', parseFloat(e.target.value) || 0)}
                          readOnly={readOnly}
                          placeholder={!readOnly ? '$' : ''}
                          className={`text-xs md:text-sm px-1 md:px-2 py-2 md:py-1 text-right ${cellInputClass}`}
                        />
                      </td>
                      <td className="py-2 px-1 md:px-3 text-right font-semibold text-xs md:text-sm">
                        {formatCurrency(item.total)}
                      </td>
                      {!readOnly && (
                        <td className="py-2 px-1 text-center no-print">
                          <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                            disabled={data.lineItems.length === 1}
                            className="text-red-600 active:text-red-800 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-2 touch-target-44"
                            title="Remove item"
                            aria-label="Remove line item"
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
            </div>

            {/* Totals */}
            <div className="mt-4 flex justify-end pr-2">
              <div className="w-full md:w-60">
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="text-xs md:text-sm font-semibold">Subtotal:</span>
                  <span className="text-xs md:text-sm font-semibold">{formatCurrency(data.subtotal)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300 items-center">
                  <span className="text-xs md:text-sm font-semibold">
                    Tax (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={data.taxRate || 0}
                      onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                      readOnly={readOnly}
                      className={`inline-block w-10 md:w-12 text-xs md:text-sm text-center py-1 ${inputClass}`}
                    />
                    %):
                  </span>
                  <span className="text-xs md:text-sm font-semibold">{formatCurrency(data.tax)}</span>
                </div>
                <div className="flex justify-between py-2 mt-2">
                  <span className="text-base md:text-lg font-bold text-[#a68729]">TOTAL:</span>
                  <span className="text-base md:text-lg font-bold text-[#a68729]">{formatCurrency(data.amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-sm font-bold text-[#a68729] mb-3 uppercase tracking-wide">
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
          {/* {(data.notes || !readOnly) && (
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
          )} */}

          {/* Footer */}
          <div className="mt-4 md:mt-6 pt-4 border-t border-gray-300 text-center">
            <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
              Thank you for your business!
            </p>
            <p className="text-xs text-gray-600">
              For questions regarding this invoice, please contact Goldmine Communications &
              Construction at {COMPANY_INFO.phone}.
            </p>
          </div>
        </div>

        {/* Mobile & Print Styles */}
        <style jsx global>{`
          /* Touch target sizing */
          .touch-target-44 {
            min-height: 44px;
            min-width: 44px;
          }

          /* Mobile-specific input improvements */
          @media (max-width: 768px) {
            /* Prevent zoom on input focus for better UX */
            input[type="text"],
            input[type="email"],
            input[type="tel"],
            input[type="number"],
            input[type="date"],
            select,
            textarea {
              font-size: 16px !important; /* Prevents iOS zoom */
            }

            /* Improve touch scrolling */
            .overflow-x-auto {
              -webkit-overflow-scrolling: touch;
              scroll-behavior: smooth;
            }

            /* Add scroll indicator */
            .overflow-x-auto::-webkit-scrollbar {
              height: 6px;
            }

            .overflow-x-auto::-webkit-scrollbar-thumb {
              background-color: rgba(166, 135, 41, 0.5);
              border-radius: 3px;
            }

            .overflow-x-auto::-webkit-scrollbar-track {
              background-color: rgba(0, 0, 0, 0.05);
            }
          }

          /* Improve active states for mobile */
          @media (hover: none) and (pointer: coarse) {
            button:active,
            input:active,
            select:active {
              transform: scale(0.98);
              transition: transform 0.1s ease;
            }
          }


          @media print {
            @page {
              size: letter;
              margin: 0.5in;
            }

            /* Force exact color printing */
            * {
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }

            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            .no-print {
              display: none !important;
            }

            /* Reset mobile responsive classes for print - use desktop layout */
            .min-w-\\[320px\\] {
              min-width: auto !important;
            }

            /* Force desktop padding and sizing for print with reduced top padding */
            .p-4 {
              padding: 1rem 2rem 2rem 2rem !important;
            }

            .md\\:p-8 {
              padding: 1rem 2rem 2rem 2rem !important;
            }

            .print\\:p-6 {
              padding: 1rem 1.5rem 1.5rem 1.5rem !important;
            }

            /* Force desktop text sizes for print */
            .text-xs,
            .text-sm,
            .md\\:text-sm,
            .md\\:text-base,
            .md\\:text-lg {
              font-size: inherit !important;
            }

            /* Reset specific text sizes to desktop values */
            h1.text-3xl {
              font-size: 3rem !important;
              line-height: 1 !important;
            }

            h2.text-sm {
              font-size: 1.125rem !important;
            }

            .text-xs.md\\:text-sm,
            td.text-xs {
              font-size: 0.875rem !important;
            }

            /* Force desktop layout for header */
            .flex-col {
              flex-direction: row !important;
            }

            .text-left {
              text-align: right !important;
            }

            .justify-start {
              justify-content: flex-end !important;
            }

            .w-full.md\\:w-auto {
              width: auto !important;
            }

            /* Force desktop grid layout */
            .grid-cols-1 {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .gap-4 {
              gap: 2rem !important;
            }

            /* Force desktop logo size */
            .w-32 {
              width: 150px !important;
              height: auto !important;
            }

            /* Remove mobile table scrolling wrapper */
            .overflow-x-auto {
              overflow-x: visible !important;
              -webkit-overflow-scrolling: auto !important;
            }

            .-mx-4 {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }

            .min-w-\\[640px\\] {
              min-width: 0 !important;
            }

            /* Force desktop table padding */
            table th,
            table td {
              padding-left: 0.75rem !important;
              padding-right: 0.75rem !important;
            }

            th.px-1,
            td.px-1 {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }

            th.px-2,
            td.px-2 {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }

            /* Force desktop input padding */
            input {
              padding-top: 0.25rem !important;
              padding-bottom: 0.25rem !important;
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
              -webkit-appearance: none !important;
              font-size: 0.875rem !important;
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

            /* FORCE GOLD COLORS - Multiple selectors for maximum compatibility */
            .text-gold-600,
            h1.text-gold-600,
            h2.text-gold-600,
            .text-\\[\\#a68729\\],
            span.text-\\[\\#a68729\\] {
              color: #a68729 !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }

            /* Force uppercase for section headers */
            h2.uppercase,
            .uppercase {
              text-transform: uppercase !important;
              letter-spacing: 0.05em !important;
              font-weight: 700 !important;
            }

            /* Preserve INVOICE heading gold color */
            h1 {
              color: #a68729 !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }

            /* Force ALL section headers to gold color */
            h2 {
              color: #a68729 !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }

            /* Force TOTAL label to gold */
            span.font-bold.text-\\[\\#a68729\\],
            .font-bold.text-\\[\\#a68729\\],
            span.text-base,
            span.md\\:text-lg {
              color: #a68729 !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }

            /* Keep company info on single lines */
            .whitespace-nowrap {
              white-space: nowrap !important;
            }

            /* Preserve table header background in print */
            .bg-gray-200,
            thead.bg-gray-200,
            thead tr,
            thead th {
              background-color: #e5e7eb !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }

            /* Preserve alternating row colors in print */
            .bg-gray-50,
            tbody tr:nth-child(even) {
              background-color: #f9fafb !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }

            /* Preserve border colors in print */
            .border-\\[\\#a68729\\] {
              border-color: #a68729 !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }

            /* Force desktop width for totals section */
            .w-full.md\\:w-60 {
              width: 15rem !important;
            }

            /* Force right alignment for totals section */
            .justify-end {
              justify-content: flex-end !important;
            }

            /* Ensure totals text alignment */
            .flex.justify-between {
              display: flex !important;
              justify-content: flex-end !important;
              align-items: center !important;
               gap: 2rem !important;
            }

            /* Force right alignment for totals values */
            .flex.justify-between > span:last-child {
              text-align: right !important;
            }

            /* Force desktop spacing */
            .mb-4 {
              margin-bottom: 1.5rem !important;
            }

            .mt-4 {
              margin-top: 1.5rem !important;
            }

            .mb-2 {
              margin-bottom: 0.75rem !important;
            }

            /* Ensure proper font weights */
            .font-bold {
              font-weight: 700 !important;
            }

            .font-semibold {
              font-weight: 600 !important;
            }

            /* Force TOTAL text to be gold and bold */
            .text-base.font-bold,
            .md\\:text-lg.font-bold {
              color: #a68729 !important;
              font-weight: 700 !important;
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }
          }
        `}</style>
      </div>
    );
  }
);

EditableInvoiceTemplate.displayName = 'EditableInvoiceTemplate';

export default EditableInvoiceTemplate;
