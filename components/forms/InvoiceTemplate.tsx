'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

interface InvoiceLineItem {
  id: string;
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

  // Client Information
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;

  // Project Details
  title?: string;
  description?: string;
  location?: string;
  bidDate?: string;

  // Line Items
  lineItems: InvoiceLineItem[];

  // Totals
  subtotal: number;
  tax: number;
  taxRate?: number;
  amount: number;

  // Optional fields
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

interface InvoiceTemplateProps {
  data: InvoiceData;
}

const InvoiceTemplate = forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  ({ data }, ref) => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    };

    return (
      <div ref={ref} className="bg-white text-gray-900 print:p-0">
        {/* Page container with print margins */}
        <div className="max-w-[8.5in] mx-auto p-8 print:p-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-8 border-b-4 border-gold-400 pb-6">
            <div>
              <Image
                src={COMPANY_INFO.logo}
                alt="Goldmine Communications"
                width={150}
                height={75}
                className="mb-4"
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
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Invoice #:</span> {data.invoiceNumber}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Date:</span> {formatDate(data.issuedDate)}
              </p>
              {data.dueDate && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Due Date:</span> {formatDate(data.dueDate)}
                </p>
              )}
            </div>
          </div>

          {/* Project and Client Information */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Project Details */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Project Details
              </h2>
              {data.title && (
                <p className="text-sm mb-2">
                  <span className="font-semibold">Project:</span> {data.title}
                </p>
              )}
              {data.location && (
                <p className="text-sm mb-2">
                  <span className="font-semibold">Location:</span> {data.location}
                </p>
              )}
              {data.bidDate && (
                <p className="text-sm mb-2">
                  <span className="font-semibold">Bid Date:</span> {formatDate(data.bidDate)}
                </p>
              )}
              <p className="text-sm mb-2">
                <span className="font-semibold">Estimator:</span> Goldmine Communications & Construction
              </p>
            </div>

            {/* Client Information */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Client Information
              </h2>
              <p className="text-sm mb-2">
                <span className="font-semibold">Client:</span> {data.clientName}
              </p>
              {data.clientPhone && (
                <p className="text-sm mb-2">
                  <span className="font-semibold">Phone:</span> {data.clientPhone}
                </p>
              )}
              {data.clientEmail && (
                <p className="text-sm mb-2">
                  <span className="font-semibold">Email:</span> {data.clientEmail}
                </p>
              )}
              {data.clientAddress && (
                <p className="text-sm mb-2">
                  <span className="font-semibold">Address:</span> {data.clientAddress}
                </p>
              )}
            </div>
          </div>

          {/* Scope of Work */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Scope of Work
            </h2>

            {/* Table */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Item #</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Qty</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Unit</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Material</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Labor</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.lineItems
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="py-3 px-4 border-t border-gray-200">{index + 1}</td>
                        <td className="py-3 px-4 border-t border-gray-200">{item.description}</td>
                        <td className="py-3 px-4 border-t border-gray-200 text-center">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200 text-center">
                          {item.unit}
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200 text-right">
                          {formatCurrency(item.material)}
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200 text-right">
                          {formatCurrency(item.labor)}
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200 text-right font-semibold">
                          {formatCurrency(item.total)}
                        </td>
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
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="text-sm font-semibold">
                    Tax {data.taxRate ? `(${data.taxRate}%)` : ''}:
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
          <div className="mt-8 border-t border-gray-300 pt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Terms & Conditions
            </h2>
            <div className="space-y-2">
              {TERMS_AND_CONDITIONS.map((term, index) => (
                <p key={index} className="text-xs text-gray-700 leading-relaxed">
                  • {term}
                </p>
              ))}
            </div>
          </div>

          {/* Notes */}
          {data.notes && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Additional Notes:</h3>
              <p className="text-xs text-gray-700 whitespace-pre-wrap">{data.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-300 text-center">
            <p className="text-sm font-semibold text-gray-900 mb-2">
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

            .print\\:p-0 {
              padding: 0 !important;
            }

            .print\\:p-12 {
              padding: 3rem !important;
            }

            /* Hide elements that shouldn't print */
            nav,
            header,
            footer,
            .no-print,
            button:not(.print-button) {
              display: none !important;
            }

            /* Ensure page breaks */
            .page-break {
              page-break-before: always;
            }

            /* Prevent page breaks inside important sections */
            table,
            .avoid-break {
              page-break-inside: avoid;
            }
          }
        `}</style>
      </div>
    );
  }
);

InvoiceTemplate.displayName = 'InvoiceTemplate';

export default InvoiceTemplate;
