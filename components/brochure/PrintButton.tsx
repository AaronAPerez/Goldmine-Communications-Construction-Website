'use client';

import { Printer } from 'lucide-react';

/**
 * PrintButton — triggers the browser's native print dialog.
 * Rendered as a client component because it uses window.print().
 * Hidden during print via the `print:hidden` utility class.
 */
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      aria-label="Print or save brochure as PDF"
      className="
        flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
        bg-[#D4AF37] hover:bg-[#C4A032] text-white
        shadow-lg hover:shadow-xl transition-all duration-200
        print:hidden
      "
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      Save as PDF / Print
    </button>
  );
}
