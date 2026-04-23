"use client";

// NOTE: Do NOT import Lucide React icons here.
// Lucide SVG icons use `currentColor` for stroke — html2canvas cannot resolve
// this and renders them as large red arrows in the exported PNG.
// All contact icons use Unicode characters + styles.contactIcon instead.
// \uFE0E (text-presentation selector) is appended in JSX to prevent browsers
// from substituting a colored emoji glyph for ☎ / ✉ etc.

import { useRef } from "react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import styles from "./page.module.css";

/**
 * BusinessCardPage
 *
 * Renders a print-ready front + back business card using the website's
 * brand colours (charcoal #121212, gold #D4AF37).
 * Each side can be downloaded as a high-resolution PNG via html2canvas.
 *
 * Standard US business card: 3.5 in × 2 in.
 */
export default function BusinessCardPage() {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef  = useRef<HTMLDivElement>(null);

  /**
   * Capture a card element at 3× resolution and return a PNG Blob.
   * useCORS + imageTimeout ensure local images fully load before capture.
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
        else reject(new Error("canvas.toBlob returned null"));
      }, "image/png");
    });
  };

  const downloadSingle = async (side: "front" | "back") => {
    const target = side === "front" ? frontRef.current : backRef.current;
    if (!target) return;
    const blob = await exportCard(target);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.download = `goldmine-business-card-${side}.png`;
    anchor.href = url;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const downloadBoth = async () => {
    if (!frontRef.current || !backRef.current) return;

    const zip = new JSZip();
    const frontBlob = await exportCard(frontRef.current);
    const backBlob  = await exportCard(backRef.current);

    zip.file("goldmine-business-card-front.png", frontBlob);
    zip.file("goldmine-business-card-back.png",  backBlob);

    const zipFile = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipFile);
    const anchor = document.createElement("a");
    anchor.download = "goldmine-business-cards.zip";
    anchor.href = url;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-800 text-white px-4 py-6 sm:px-8 sm:py-8 gap-6 sm:gap-8">

      <h1 className="text-gold-400 text-lg sm:text-xl font-bold tracking-widest uppercase mt-20 sm:mt-24 text-center">
        Business Card Preview
      </h1>

      {/* ── FRONT ─────────────────────────────────────────────────────────────── */}
      <div className={styles.cardWrap}>
        <div
          ref={frontRef}
          className="relative w-[3.5in] h-[2in] overflow-hidden shadow-2xl flex bg-[#121212]"
        >
          <div className={`${styles.goldBar} absolute top-0 left-0 right-0 h-[3px]`} />

          {/* Left column — circular logo */}
          <div className="flex-shrink-0 w-[1.10in] h-full flex flex-col items-center py-4 overflow-hidden border-r border-gold-400/25 bg-gold-400/[0.04]">
            {/* plain <img> — html2canvas renders at CSS size, not source resolution */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/logo-circular.jpg"
              alt="Goldmine Communications and Construction logo"
              className={styles.frontLogo}
            />
          </div>

          {/* Right column — name, title, contact */}
          <div className="flex flex-col justify-between flex-1 px-2 pt-2 pb-3">

            {/* Name block */}
            <div>
              <p className="text-[8px] font-bold uppercase tracking-wider text-gold-400">
                Goldmine Communications &amp; Construction
              </p>
              <div className="mt-1.5 mb-1 h-px w-16 bg-gold-400/40" />
              <h2 className="text-white font-bold text-[18px] leading-tight">
                Adrian Lopez
              </h2>
              <p className="text-[11px] mt-0.5 text-gray-400">
                President
              </p>
            </div>

            {/* Contact rows
                styles.contactIcon — fixed 12px width, font-variant-emoji:text, gold color
                \uFE0E — text-presentation selector, prevents colored emoji glyph in
                         both the browser and html2canvas PNG export */}
            <div className="space-y-[3px]">
              <div className="flex items-center gap-1.5">
                <span className={styles.contactIcon}>{"☎\uFE0E"}</span>
                <span className="text-[10px] text-gray-300">(925) 305-5980</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={styles.contactIcon}>{"✉\uFE0E"}</span>
                <span className="text-[10px] text-gray-300">a.lopez@goldminecomm.net</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={styles.contactIcon}>{"⊕\uFE0E"}</span>
                <span className="text-[10px] font-semibold text-gold-400">www.goldminecomm.net</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={styles.contactIcon}>{"◎\uFE0E"}</span>
                <span className="text-[9px] text-gray-300">
                  1161 Brick &amp; Tile Cir, Stockton, CA 95206
                </span>
              </div>
            </div>
          </div>

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
            alt="Goldmine Communications and Construction"
            className={styles.backBanner}
          />

          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            Licensed · Bonded · Insured
          </p>

          <p className="text-[8px] text-gray-400 tracking-wide">
            CA License #1099543 A, B, C-10
          </p>

          {/* Thin gold divider above services */}
          <div className="w-[80%] h-px bg-gold-400/30 my-1" />

          {/* Services list */}
          <p className="text-[6.5px] text-gray-400 uppercase tracking-wider leading-snug text-center">
            Paving · Grading · Site Concrete · Civil Construction
          </p>
          <p className="text-[6.5px] text-gray-400 uppercase tracking-wider leading-snug text-center">
            Demolition · Structural Concrete · Excavation
          </p>
          <p className="text-[6.5px] text-gray-400 uppercase tracking-wider leading-snug text-center">
            Electrical · Tech Services · PM &amp; CM Management
          </p>
          <p className="text-[6.5px] text-gray-400 uppercase tracking-wider leading-snug text-center">
            EV Charging Infrastructure Installation
          </p>

          {/* Thin gold divider below services */}
          <div className="w-[80%] h-px bg-gold-400/30 my-1" />

          {/* Website URL pill + QR code — centered as a unit via margin:auto
              ⊕\uFE0E renders as a small gold text glyph in both browser & html2canvas */}
          <div className={styles.urlRow}>
            <div className={`${styles.pill} flex items-center gap-1 px-3 py-1 rounded-full`}>
              <span className={styles.contactIcon}>{"⊕\uFE0E"}</span>
              <span className="text-[11px] font-bold tracking-normal">www.goldminecomm.net</span>
            </div>
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
