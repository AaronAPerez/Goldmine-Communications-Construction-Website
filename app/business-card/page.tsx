"use client";

import Image from "next/image";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { MapPin } from "lucide-react";

/**
 * BusinessCardPage
 *
 * Renders a print-ready front + back business card using the website's
 * brand colours (gray-900 / #111827 charcoal, gold-400 / #D4AF37).
 * Each side can be downloaded as a high-resolution PNG via html2canvas.
 *
 * Standard US business card: 3.5 in × 2 in.
 */
export default function BusinessCardPage() {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef  = useRef<HTMLDivElement>(null);

  /** Capture a card side at 3× resolution and trigger a PNG download */
  const handleDownload = async (side: "front" | "back") => {
    const target = side === "front" ? frontRef.current : backRef.current;
    if (!target) return;
    const canvas = await html2canvas(target, { scale: 3, backgroundColor: null });
    const link = document.createElement("a");
    link.download = `goldmine-business-card-${side}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-8 gap-8">

      {/*
       * Two classes that can't be expressed with plain Tailwind utilities:
       *  .bc-gold-bar  — the gradient top/bottom accent strip
       *  .bc-pill      — the website URL pill on the back card
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
      `}</style>

      <h1 className="text-gold-400 text-xl font-bold tracking-widest uppercase mt-24">
        Business Card Preview
      </h1>

      {/* ── FRONT ─────────────────────────────────────────────────────────────── */}
      <div
        ref={frontRef}
        className="relative w-[3.5in] h-[2in] rounded-xl overflow-hidden shadow-2xl flex bg-[#121212]"
      >
        {/* Gold top accent */}
        <div className="bc-gold-bar absolute top-0 left-0 right-0 h-[3px]" />

        {/* Left column — logo with gold-tinted panel */}
        <div className="flex-shrink-0 w-[1.10in] h-full flex flex-col items-center mt-8 border-r border-gold-400/25 bg-gold-400/[0.04]">
          <Image
            src="/images/logo/logo-circular.jpg"
            alt="Goldmine logo"
            width={102}
            height={102}
            className="rounded-full object-cover overflow-visible m-2 border-gold-400"
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
              <span className="text-[9px] text-gold-400">&#9990;</span>
              <span className="text-[10px] text-gray-300">(925) 305-5980</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gold-400">&#9993;</span>
              <span className="text-[10px] text-gray-300">a.lopez@goldminecomm.net</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gold-400">&#127760;</span>
              <span className="text-[10px] font-semibold text-gold-400">www.goldminecomm.net</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px]  text-gold-400"><MapPin size={10}/></span>
              <span className="text-[9px] text-gray-400">
                1161 Brick and Tile Cir, Stockton, CA 95206
              </span>
            </div>
          </div>
        </div>

        {/* Gold bottom accent */}
        <div className="bc-gold-bar absolute bottom-0 left-0 right-0 h-[3px]" />
      </div>

      {/* ── BACK ──────────────────────────────────────────────────────────────── */}
      <div
        ref={backRef}
        className="relative w-[3.5in] h-[2in] rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-[#121212]"
      >
        <div className="bc-gold-bar absolute top-0 left-0 right-0 h-[3px]" />

        <Image
          src="/images/logo/logo-banner.jpg"
          alt="Goldmine Construction Services"
          width={140}
          height={50}
          className="object-contain"
        />

        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-400">
          Licensed · Bonded · Insured
        </p>
       
        <p className="mt-1 text-[9px] text-gray-500 tracking-wide">
          CA License #1099543 A, B, C-10
        </p>

        <p className="mt-2 text-[9px] text-gray-200 tracking-wide">
          EV Charging Infrastructure Installation
        </p>

        <div className="bc-pill mt-2 px-4 py-1 rounded-full text-[9px] font-bold tracking-widest">
          www.goldminecomm.net
        </div>

        <div className="bc-gold-bar absolute bottom-0 left-0 right-0 h-[3px]" />
      </div>

      {/* ── DOWNLOAD BUTTONS ──────────────────────────────────────────────────── */}
      <div className="flex gap-4">
        <button
          onClick={() => handleDownload("front")}
          className="px-5 py-2.5 rounded-xl font-semibold text-sm text-black bg-gold-400 hover:bg-gold-500 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          ↓ Download Front
        </button>
        <button
          onClick={() => handleDownload("back")}
          className="px-5 py-2.5 rounded-xl font-semibold text-sm text-black bg-gold-400 hover:bg-gold-500 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          ↓ Download Back
        </button>
      </div>

      <p className="text-gray-600 text-xs">3.5 × 2 in · high-resolution PNG export</p>
    </main>
  );
}
