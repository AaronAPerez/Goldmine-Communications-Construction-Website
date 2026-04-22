"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import styles from "./page.module.css";
/*
 * Lucide React SVG icons use `currentColor` for stroke, which html2canvas
 * fails to resolve — they render as solid red arrows in the exported PNG.
 * Unicode characters are plain text and render identically in browser and
 * in html2canvas, so they are used for all contact-row icons below.
 *
 * Next.js <Image> is also swapped for plain <img> inside the card refs so
 * that html2canvas captures images at their CSS-constrained size (not the
 * image file's natural resolution, which inflates the banner on the back).
 */

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


    /**
   * Capture a card element at 3× resolution and return a PNG Blob.
   * useCORS + imageTimeout ensure local images fully load before capture.
   * allowTaint: false keeps the canvas origin-clean so toBlob() works.
   */
  const exportCard = async (element: HTMLDivElement): Promise<Blob> => {
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      allowTaint: false,
      imageTimeout: 15000,
      logging: false,
    });
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('canvas.toBlob returned null'));
      }, 'image/png');
    });
  };

  const downloadSingle = async (side: "front" | "back") => {
    const target = side === "front" ? frontRef.current : backRef.current;
    if (!target) return;
    const blob = await exportCard(target);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `goldmine-business-card-${side}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadBoth = async () => {
    if (!frontRef.current || !backRef.current) return;

    const zip = new JSZip();

    const frontBlob = await exportCard(frontRef.current);
    const backBlob = await exportCard(backRef.current);

    zip.file("goldmine-business-card-front.png", frontBlob);
    zip.file("goldmine-business-card-back.png", backBlob);

    const zipFile = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipFile);
    const link = document.createElement("a");
    link.download = "goldmine-business-cards.zip";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-800 text-white px-4 py-6 sm:px-8 sm:py-8 gap-6 sm:gap-8">

      {/*
       * styles.goldBar  — gradient top/bottom accent strip  (→ page.module.css)
       * styles.pill     — website URL pill on the back card
       * styles.cardWrap — scales the card on very small viewports while keeping
       *                   its layout footprint tight (negative-margin compensation).
       *                   The ref lives on the inner card div so html2canvas always
       *                   captures at the true 3.5 × 2 in CSS dimensions.
       */}

      <h1 className="text-gold-400 text-lg sm:text-xl font-bold tracking-widest uppercase mt-20 sm:mt-24 text-center">
        Business Card Preview
      </h1>

      {/* ── FRONT ─────────────────────────────────────────────────────────────── */}
      <div className={styles.cardWrap}>
        <div
          ref={frontRef}
          className="relative w-[3.5in] h-[2in] overflow-hidden shadow-2xl flex bg-[#121212]"
        >
          {/* Gold top accent */}
          <div className={`${styles.goldBar} absolute top-0 left-0 right-0 h-[3px]`} />

          {/* Left column — logo with gold-tinted panel */}
          <div className="flex-shrink-0 w-[1.10in] h-full flex flex-col items-center justify-center overflow-hidden border-r border-gold-400/25 bg-gold-400/[0.04]">
            {/* plain <img> so html2canvas captures at CSS-constrained size */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/logo-circular.jpg"
              alt="Goldmine Construction Services logo"
              className={styles.frontLogo}
            />
          </div>

          {/* Right column — name, title, contact */}
          <div className="flex flex-col justify-between flex-1 px-4 pt-2 pb-3">

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
                President
              </p>
            </div>

            {/* Contact rows */}
            <div className="space-y-[3px]">
              {/* Unicode chars render identically in browser & html2canvas;
                  Lucide SVG icons misrender as arrows in html2canvas exports. */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-gold-400 leading-none">☎</span>
                <span className="text-[10px] text-gray-300">(925) 305-5980</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-gold-400 leading-none">✉</span>
                <span className="text-[10px] text-gray-300">a.lopez@goldminecomm.net</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-gold-400 leading-none">⊕</span>
                <span className="text-[10px] font-semibold text-gold-400">www.goldminecomm.net</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-gold-400 leading-none">◎</span>
                <span className="text-[10px] text-gray-300">
                  1161 Brick and Tile Cir, Stockton, CA 95206
                </span>
              </div>
            </div>
          </div>

          {/* Gold bottom accent */}
          <div className={`${styles.goldBar} absolute bottom-0 left-0 right-0 h-[3px]`} />
        </div>
      </div>

      {/* ── BACK ──────────────────────────────────────────────────────────────── */}
      <div className={styles.cardWrap}>
        <div
          ref={backRef}
          className="relative w-[3.5in] h-[2in] overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-[#121212]"
        >
          <div className={`${styles.goldBar} absolute top-0 left-0 right-0 h-[3px]`} />

          {/* plain <img> so html2canvas captures at CSS-constrained size */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/logo-banner.jpg"
            alt="Goldmine Construction Services"
            className={styles.backBanner}
          />
          

          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            Licensed · Bonded · Insured
          </p>

          <p className="text-[9px] text-gray-300 tracking-wide">
            CA License #1099543 A, B, C-10
          </p>

          <p className="my-2 text-[10px] text-gold-400 font-semibold uppercase tracking-wide">
            EV Charging Infrastructure Installation
          </p>

          {/* Website URL pill + QR code side by side — centered via margin:auto */}
          <div className={styles.urlRow}>
         <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-white leading-none">⊕</span>
                <span className="text-[12px] font-semibold text-gold-400">www.goldminecomm.net</span>
              </div>
            {/* QR code to the right of the URL pill */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/goldmine-qr-code1.png"
              alt="Scan to visit goldminecomm.net"
              className={styles.qrCode}
            />
          </div>



                    <div className={`${styles.goldBar} absolute bottom-0 left-0 right-0 h-[3px]`} />
        </div>
      </div>

     {/* DOWNLOAD BUTTONS */}
      <div className="flex space-x-4">
        <button
          onClick={() => downloadSingle("front")}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-md"
        >
          Download Front (PNG)
        </button>

        <button
          onClick={() => downloadSingle("back")}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-md"
        >
          Download Back (PNG)
        </button>

        <button
          onClick={downloadBoth}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md"
        >
          Download Both (ZIP)
        </button>
      </div>

      <p className="text-gray-600 text-xs text-center">3.5 × 2 in · high-resolution PNG export</p>
    </main>
  );
}
