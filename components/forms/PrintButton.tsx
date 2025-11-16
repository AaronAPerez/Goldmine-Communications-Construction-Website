'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  contentRef: React.RefObject<HTMLDivElement>;
  documentTitle?: string;
  buttonText?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function PrintButton({
  contentRef,
  documentTitle = 'Document',
  buttonText = 'Print',
  className,
  variant = 'outline',
}: PrintButtonProps) {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle,
  });

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white';
      case 'secondary':
        return 'bg-gold-500 hover:bg-gold-600 text-white';
      case 'outline':
      default:
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50';
    }
  };

  return (
    <button
      onClick={handlePrint}
      className={
        className ||
        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${getVariantClasses()}`
      }
    >
      <Printer className="w-5 h-5" />
      {buttonText}
    </button>
  );
}
