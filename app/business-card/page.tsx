"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import { GlobeIcon, MapPin, PhoneIcon } from "lucide-react";

/**
 * BusinessCardPage
 *
 * Renders a print-ready front + back business card using the website's
 * brand colours (gray-900 / #111827 charcoal, gold-400 / #D4AF37).
 * Each side can be downloaded as a high-resolution PNG via html2canvas.
 *
 * Standard US business card: 3.5 in × 2 in.
 * Responsive: cards scale down on very small screens while the ref targets
 * retain their true dimensions so html2canvas exports at the correct size.
 */
export default function BusinessCardPage() {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef  = useRef<HTMLDivElement>(null);

  /** Capture a card side at 3× resolution and trigger a PNG download */
  const handleDownload = async (side: "front" | "back") => {
    const target = side === "front" ? frontRef.current : backRef.current;
    if (!target) return;
    const canvas = await html2canvas(target, { scale: 3, backgroundColor: null, useCORS: true, allowTaint: false, imageTimeout: 15000 });
    const link = document.createElement("a");
    link.download = `goldmine-business-card-${side}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-800 text-white px-4 py-6 sm:px-8 sm:py-8 gap-6 sm:gap-8">

      {/*
       * .bc-gold-bar  — gradient top/bottom accent strip
       * .bc-pill      — website URL pill on the back card
       * .bc-card-wrap — scales the card on very small viewports while keeping
       *                 its layout footprint tight (negative-margin compensation).
       *                 The ref lives on the inner card div so html2canvas always
       *                 captures at the true 3.5 × 2 in CSS dimensions.
       */}
      <style>{`
        .bc-gold-bar {
          background: linear-gradient(to right, #D4AF37, #F5D78A, #D4AF37);
        }
        .bc-pill {
          background-color: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: #D4AF37;
        }

        /*
         * Screens narrower than 368 px: scale the wrapper to 0.9 so the
         * 336 px (3.5 in) card doesn't overflow a 328 px content area.
         * Negative margin removes the phantom space that CSS transform leaves.
         *   2in = 192px → at scale(0.9) visual height = 172.8px
         *   excess per side = (192 − 172.8) / 2 ≈ 10px
         */
        @media (max-width: 367px) {
          .bc-card-wrap {
            transform: scale(0.9);
            transform-origin: center;
            margin-top: -10px;
            margin-bottom: -10px;
          }
        }
      
        /* Print: force backgrounds and lock all image dimensions.
         * Browsers strip backgrounds by default and may reflow Next.js Image
         * because it relies on intrinsic sizing that print media can ignore.
         */
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bc-card-wrap {
            transform: none !important;
            margin: 0 !important;
          }
          .bc-front-logo {
            width: 90px !important;
            height: 90px !important;
          }
          .bc-back-banner {
            width: 140px !important;
            height: 50px !important;
          }
        }
      `}</style>

      <h1 className="text-gold-400 text-lg sm:text-xl font-bold tracking-widest uppercase mt-20 sm:mt-24 text-center">
        Business Card Preview
      </h1>

      {/* ── FRONT ─────────────────────────────────────────────────────────────── */}
      <div className="bc-card-wrap">
        <div
          ref={frontRef}
          className="relative w-[3.5in] h-[2in] overflow-hidden shadow-2xl flex bg-[#121212]"
        >
          {/* Gold top accent */}
          <div className="bc-gold-bar absolute top-0 left-0 right-0 h-[3px]" />

          {/* Left column — logo with gold-tinted panel */}
          <div className="flex-shrink-0 w-[1.10in] h-full flex flex-col items-center border-r border-gold-400/25 bg-gold-400/[0.04]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/logo-circular.jpg"
              alt="Goldmine logo"
              className="bc-front-logo rounded-full object-cover mt-6"
              style={{ width: '80px', height: '80px', flexShrink: 0 }}
            />
          </div>

          {/* Right column — name, title, contact */}
          <div className="flex flex-col justify-between flex-1 px-4 py-3">

            {/* Name block */}
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] leading-none text-gold-400">
                Goldmine Construction Services
              </p>
              <div className="mt-1.5 mb-1 h-px w-16 bg-gold-400/40" />
              <h2 className="text-white font-bold text-[16px] leading-tight">
                Adrian Lopez
              </h2>
              <p className="text-[10px] mt-0.5 text-gray-400">
                President &amp; Field Operations
              </p>
            </div>

            {/* Contact rows */}
            <div className="space-y-[3px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-gold-400"><PhoneIcon size={9}/></span>
                <span className="text-[10px] text-gray-300">(925) 305-5980</span>
              </div>
              <div className="flex items-end gap-1.5">
                <span className="text-[9px] text-gold-400">&#9993;</span>
                <span className="text-[10px] text-gray-300">a.lopez@goldminecomm.net</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-gold-400"><GlobeIcon size={9}/></span>
                <span className="text-[10px] font-semibold text-gold-400">www.goldminecomm.net</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] text-gold-400"><MapPin size={10}/></span>
                <span className="text-[10px] text-gray-400">
                  1161 Brick and Tile Cir, Stockton, CA 95206
                </span>
              </div>
            </div>
          </div>

          {/* Gold bottom accent */}
          <div className="bc-gold-bar absolute bottom-0 left-0 right-0 h-[3px]" />
        </div>
      </div>

      {/* ── BACK ──────────────────────────────────────────────────────────────── */}
      <div className="bc-card-wrap">
        <div
          ref={backRef}
          className="relative w-[3.5in] h-[2in] overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-[#121212]"
        >
          <div className="bc-gold-bar absolute top-0 left-0 right-0 h-[3px]" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/logo-banner.jpg"
            alt="Goldmine Construction Services"
            className="bc-back-banner object-contain"
            style={{ width: '140px', height: '50px' }}
          />

          <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            Licensed · Bonded · Insured
          </p>

          <p className="mt-1 text-[9px] text-gray-500 tracking-wide">
            CA License #1099543 A, B, C-10
          </p>

          <p className="my-2 text-[9px] text-gray-200 tracking-wide">
            EV Charging Infrastructure Installation
          </p>

          <div className="bc-pill px-3 py-1 rounded-full text-[9px] font-bold tracking-normal">
            www.goldminecomm.net
          </div>

          <div className="bc-gold-bar absolute bottom-0 left-0 right-0 h-[3px]" />
        </div>
      </div>

      {/* ── DOWNLOAD BUTTONS ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-[3.5in] sm:max-w-none sm:w-auto">
        <button
          onClick={() => handleDownload("front")}
          className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl font-semibold text-sm text-black bg-gold-400 hover:bg-gold-500 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          ↓ Download Front
        </button>
        <button
          onClick={() => handleDownload("back")}
          className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl font-semibold text-sm text-black bg-gold-400 hover:bg-gold-500 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          ↓ Download Back
        </button>
      </div>

      <p className="text-gray-600 text-xs text-center">3.5 × 2 in · high-resolution PNG export</p>
    </main>
  );
}
