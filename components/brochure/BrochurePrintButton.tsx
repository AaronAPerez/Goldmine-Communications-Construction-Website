'use client';

import { Printer } from 'lucide-react';

/**
 * BrochurePrintButton
 *
 * Opens a clean popup window with self-contained HTML + CSS that exactly
 * matches the on-screen brochure design, then triggers window.print().
 * This approach (used in InvoiceForm.tsx) avoids @media print CSS specificity
 * fights and guarantees background colors, gradients, and grid layouts print
 * exactly as they appear on screen.
 */

/* ─── Brochure data ─────────────────────────────────────────────────────────── */

const services = [
  {
    title: 'Wireless',
    color: '#3B82F6',
    image: '/images/projects/Sparks-NV/tree-tower-network.jpg',
    highlights: [
      'Verizon, T-Mobile, AT&T, Dish Networks',
      'RF, 5G & Small Cell installation',
      'PIM, Sweep & OTDR testing',
      'Civil construction & project management',
    ],
  },
  {
    title: 'Network Infrastructure',
    color: '#6366F1',
    image: '/images/projects/Oregon-AV-Station/trench/trench-card.jpg',
    highlights: [
      'Data centers — rack & stack',
      'Fiber optic splicing & termination',
      'DAS wireless & outside plant',
      'Cabling & network services',
    ],
  },
  {
    title: 'Charging / IoT / 5G',
    color: '#F59E0B',
    image: '/images/projects/Oregon-AV-Station/AV-station/AvStation-parking-1.jpg',
    highlights: [
      'EV charging station installation',
      'Level 2 & DC fast charging',
      'Video surveillance & intrusion detection',
      'Public safety CBRS LTE & IoT',
    ],
  },
  {
    title: 'Audio / Visual',
    color: '#8B5CF6',
    image: '/images/projects/Oregon-AV-Station/AV-station/AvStation2.jpg',
    highlights: [
      'Corporate boardrooms & command centers',
      'Control system & DSP programming',
      'Classroom media & church systems',
      'Smart building control & monitoring',
    ],
  },
  {
    title: 'Training & Certification',
    color: '#10B981',
    image: '/images/projects/Sparks-NV/tower-tree-install.jpg',
    highlights: [
      'Integration & installation training',
      '5G technologies certification',
      'Structured cabling & telecom standards',
      'Field technician development programs',
    ],
  },
  {
    title: 'Design & Drafting (A&E)',
    color: '#EF4444',
    image: '/images/projects/Bodega-Bay-CA/bulldozer-1.jpg',
    highlights: [
      'Conceptual, permitting & as-built drawings',
      'Survey & modification plan drawings',
      'FAA application drawings',
      'Pre-construction audits',
    ],
  },
];

const clients = ['Verizon', 'T-Mobile', 'AT&T', 'Ericsson', 'Nokia', 'CenturyLink'];

const partners = [
  'Luma Builders',
  'Salient Global Technologies',
  'Blackrock A&E Services',
  'Intellifreight Logistics',
  'Alpha Services',
  'Lucas Electric',
];

const whyChooseUs = [
  'Licensed, bonded & insured — CA License #1099543 A, B, C-10',
  'We beat competitor estimates — send yours for a comparison',
  'Serving California, Nevada & Oregon',
  'Trusted by the largest wireless carriers in the nation',
  'End-to-end services: design through installation through certification',
];

/* ─── HTML generators ───────────────────────────────────────────────────────── */

/** Shared dark charcoal header bar — used on both pages */
function buildHeader(logoSrc: string, subtitle: string, rightContent: string): string {
  return `
    <header class="page-header">
      <div class="header-left">
        <img src="${logoSrc}" alt="Goldmine logo" class="logo" />
        <div>
          <div class="company-name">Goldmine Construction Services</div>
          <div class="company-sub">${subtitle}</div>
        </div>
      </div>
      <div class="header-right">${rightContent}</div>
    </header>
    <div class="gold-divider"></div>
  `;
}

/** Shared dark footer bar */
function buildFooter(left: string, right: string): string {
  return `
    <footer class="page-footer">
      <div>${left}</div>
      <div class="footer-right">${right}</div>
    </footer>
  `;
}

/** Service card for the 3×2 grid on page 1 — includes a photo strip at the top */
function buildServiceCard(title: string, color: string, highlights: string[], image: string, origin: string): string {
  const bullets = highlights
    .map(h => `<li><span class="bullet" style="background:${color}"></span>${h}</li>`)
    .join('');
  return `
    <div class="service-card" style="border-top:3px solid ${color}">
      <div class="service-img-wrap">
        <img src="${origin}${image}" alt="${title} — Goldmine project" />
        <div class="service-img-overlay"></div>
      </div>
      <div class="service-title">
        <span class="service-dot" style="background:${color}20; border:1px solid ${color}40">
          <span style="background:${color}; width:8px; height:8px; border-radius:50%; display:inline-block;"></span>
        </span>
        <strong style="color:#111827">${title}</strong>
      </div>
      <ul class="highlight-list">${bullets}</ul>
    </div>
  `;
}

/* ─── Full print HTML ────────────────────────────────────────────────────────── */

function buildPrintHTML(origin: string): string {
  const logoSrc = `${origin}/images/logo/logo-circular.jpg`;

  const servicesGrid = services
    .map(s => buildServiceCard(s.title, s.color, s.highlights, s.image, origin))
    .join('');

  const clientBadges = clients
    .map(c => `<span class="client-badge">${c}</span>`)
    .join('');

  const partnerBadges = partners
    .map(p => `<span class="partner-badge">${p}</span>`)
    .join('');

  const whyList = whyChooseUs
    .map(w => `<li class="why-item"><span class="check">✓</span>${w}</li>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Goldmine Construction Services — Company Brochure</title>
  <style>
    /* ── Paper setup ─────────────────────────────────── */
    @page {
      size: letter portrait;
      margin: 0;
    }

    /* ── Force ALL backgrounds to print ─────────────── */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
      font-size: 10pt;
      color: #374151;
      background: white;
    }

    /* ── Page containers (one per printed page) ──────── */
    .page {
      width: 8.5in;
      height: 11in;
      overflow: hidden;
      padding: 0;
      display: flex;
      flex-direction: column;
      background: white;
      page-break-after: always;
      break-after: page;
    }
    .page:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
    /* Page body is a flex column so the services block can grow to fill remaining space */
    .page-body {
      padding: 0.35in 0.5in 0.25in;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    /* Page 2 distributes its sections evenly across available space */
    .page-2-body {
      padding: 0.4in 0.5in 0.3in;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* ── Header ──────────────────────────────────────── */
    .page-header {
      background-color: #111827;
      padding: 14px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #D4AF37;
      object-fit: cover;
    }
    .company-name {
      font-size: 17pt;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.3px;
      line-height: 1.1;
    }
    .company-sub {
      font-size: 8.5pt;
      color: #D4AF37;
      margin-top: 3px;
      font-weight: 500;
    }
    .header-right {
      text-align: right;
      font-size: 9pt;
    }
    .header-right .url {
      color: #D4AF37;
      font-weight: 600;
    }
    .header-right .location {
      color: #9ca3af;
      margin-top: 2px;
      font-size: 8pt;
    }
    .header-right .tag {
      color: #D4AF37;
      font-weight: 500;
      font-size: 9pt;
    }

    /* ── Gold divider ────────────────────────────────── */
    .gold-divider {
      height: 4px;
      background: linear-gradient(to right, #D4AF37, #F5D78A, #D4AF37);
    }

    /* ── Section labels ──────────────────────────────── */
    .section-label {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #D4AF37;
      border-bottom: 2px solid #D4AF37;
      padding-bottom: 4px;
      display: inline-block;
      margin-bottom: 12px;
    }
    .section-label-gray {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #6b7280;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
      display: inline-block;
      margin-bottom: 10px;
    }

    /* ── About / intro section ───────────────────────── */
    .intro-section {
      background: white;
      padding: 12px 0 10px;
      border-bottom: 1px solid #f3f4f6;
      margin-bottom: 12px;
    }
    .intro-heading {
      font-size: 13pt;
      font-weight: 800;
      color: #111827;
      margin-bottom: 5px;
      letter-spacing: -0.3px;
    }
    .intro-text {
      font-size: 8.5pt;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .mission-card {
      background: rgba(212,175,55,0.08);
      border-left: 3px solid #D4AF37;
      border-radius: 0 6px 6px 0;
      padding: 8px 10px;
    }
    .vision-card {
      background: #f9fafb;
      border-left: 3px solid #d1d5db;
      border-radius: 0 6px 6px 0;
      padding: 8px 10px;
    }
    .about-card-label {
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }
    .about-card-label.gold { color: #D4AF37; }
    .about-card-label.gray { color: #6b7280; }
    .about-card-text {
      font-size: 7.5pt;
      color: #374151;
      line-height: 1.5;
    }

    /* ── Services section — grows to fill remaining page-body space ─ */
    .services-block {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* ── Services 3×2 grid — rows stretch to fill services-block ──── */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 10px;
      flex: 1;
    }
    /* Each card is a flex column so image is fixed and bullets fill remaining height */
    .service-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    .service-title {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 7px;
      font-size: 9pt;
      flex-shrink: 0;
    }
    .service-dot {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    /* Bullet list stretches to fill card height, keeping cards uniform */
    .highlight-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .highlight-list li {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 7.5pt;
      color: #4b5563;
      line-height: 1.4;
    }
    .bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 3px;
    }

    /* ── Credentials footer bar (page 1) ─────────────── */
    .credentials-bar {
      background-color: #111827;
      padding: 10px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
    .credentials-items {
      display: flex;
      gap: 24px;
    }
    .cred-item {
      font-size: 8pt;
      color: #ffffff;
    }
    .cred-item strong {
      color: #D4AF37;
    }
    .credentials-bar .serve {
      font-size: 8pt;
      color: #9ca3af;
    }

    /* ── Page footer bar (page 2) ────────────────────── */
    .page-footer {
      background-color: #111827;
      padding: 10px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer-logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .footer-logo {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid #D4AF37;
      object-fit: cover;
    }
    .footer-copy {
      font-size: 7.5pt;
      color: #9ca3af;
    }
    .footer-right {
      font-size: 7.5pt;
      color: #D4AF37;
      font-weight: 500;
    }

    /* ── Client badges ───────────────────────────────── */
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }
    .client-badge {
      padding: 4px 12px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 8pt;
      font-weight: 600;
      color: #1f2937;
    }
    .partner-badge {
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 7.5pt;
      font-weight: 500;
      background: rgba(212,175,55,0.1);
      color: #8C7322;
      border: 1px solid rgba(212,175,55,0.25);
    }

    /* ── Why Choose Goldmine ─────────────────────────── */
    .why-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 4px;
    }
    .why-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 9pt;
      color: #374151;
      line-height: 1.4;
    }
    .check {
      color: #D4AF37;
      font-weight: 700;
      font-size: 10pt;
      flex-shrink: 0;
      line-height: 1.3;
    }

    /* ── Contact dark section ────────────────────────── */
    .contact-section {
      background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
      border-radius: 12px;
      padding: 16px 20px;
      margin-top: 14px;
    }
    .contact-section .section-label {
      color: #D4AF37;
      border-color: #D4AF37;
    }
    /* 2-person team grid */
    .contact-team-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-top: 4px;
      margin-bottom: 12px;
    }
    .contact-person {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .contact-role {
      font-size: 6.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #D4AF37;
    }
    .contact-name {
      font-size: 10pt;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }
    .contact-line {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 7.5pt;
      color: #d1d5db;
    }
    .contact-icon {
      color: #D4AF37;
      font-size: 8pt;
      flex-shrink: 0;
    }
    /* Bottom row: address + website + CTA */
    .contact-bottom {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 14px;
      padding-top: 10px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .contact-bottom-item {
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }
    .contact-bottom-label {
      font-size: 6.5pt;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 2px;
    }
    .contact-bottom-value {
      font-size: 7.5pt;
      color: #ffffff;
      line-height: 1.4;
    }
    .cta-box {
      background: linear-gradient(135deg, #D4AF37 0%, #C4A032 100%);
      border-radius: 8px;
      padding: 10px 12px;
      text-align: center;
    }
    .cta-title {
      font-size: 9pt;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }
    .cta-sub {
      font-size: 7pt;
      color: rgba(255,255,255,0.85);
    }

    /* ── Service card image strip — fixed height, never shrinks ─── */
    .service-img-wrap {
      position: relative;
      margin: -10px -10px 8px -10px;
      height: 90px;
      overflow: hidden;
      border-radius: 8px 8px 0 0;
      flex-shrink: 0;
    }
    .service-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .service-img-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.25));
    }

    /* ── Section spacing ─────────────────────────────── */
    .section-block {
      margin-bottom: 14px;
    }
  </style>
</head>
<body>

  <!-- ══════════════════════════════════════════
       PAGE 1 — Services Overview
  ══════════════════════════════════════════ -->
  <div class="page">

    ${buildHeader(
      logoSrc,
      'Licensed · Bonded · Insured &nbsp;|&nbsp; CA #1099543 A, B, C-10',
      `<div class="url">www.goldminecomm.net</div><div class="location">Stockton, CA</div>`
    )}

    <div class="page-body">

      <!-- About Us -->
      <div class="intro-section">
        <div class="intro-heading">About Goldmine Communications</div>
        <p class="intro-text">
          Founded by three individuals with over 60 years of combined experience in telecom and
          commercial electrical contracting, Goldmine Communications brings diverse expertise,
          versatility, and above all, safety into every network project. We are an integrity-first
          business — delivering cost-efficient solutions with innovative ideas and unwavering
          commitment to quality and customer satisfaction.
        </p>
        <div class="about-grid">
          <div class="mission-card">
            <div class="about-card-label gold">Mission</div>
            <div class="about-card-text">
              To be the preeminent full-service provider of telecommunications network infrastructure —
              putting family principles, pride, and customers first while maintaining the highest
              quality and honest business practices.
            </div>
          </div>
          <div class="vision-card">
            <div class="about-card-label gray">Vision</div>
            <div class="about-card-text">
              To be recognized as a leading provider — elevating network standards and supplying
              innovative installation, network, and construction services across the nation.
            </div>
          </div>
        </div>
      </div>

      <!-- Services — flex: 1 so grid fills remaining page height -->
      <div class="services-block">
        <div class="section-label">Our Services</div>
        <div class="services-grid">
          ${servicesGrid}
        </div>
      </div>

    </div>

    <!-- Credentials footer bar -->
    <div class="credentials-bar">
      <div class="credentials-items">
        <div class="cred-item">&#x1F6E1; <strong>License</strong> #1099543 A, B, C-10</div>
        <div class="cred-item">&#10003; <strong>Bond</strong> #G121001978153</div>
        <div class="cred-item">&#x1F6E1; <strong>Fully Insured</strong></div>
      </div>
      <div class="serve">Serving CA &nbsp;·&nbsp; NV &nbsp;·&nbsp; OR</div>
    </div>

  </div><!-- end page 1 -->


  <!-- ══════════════════════════════════════════
       PAGE 2 — Clients, Why Us & Contact
  ══════════════════════════════════════════ -->
  <div class="page">

    ${buildHeader(
      logoSrc,
      'Licensed · Bonded · Insured &nbsp;|&nbsp; CA #1099543 A, B, C-10',
      `<div class="tag">Company Introduction</div>`
    )}

    <div class="page-2-body">

      <!-- Trusted clients -->
      <div>
        <div class="section-label">Trusted by Industry Leaders</div>
        <div class="badge-row">${clientBadges}</div>
      </div>

      <!-- Partner companies -->
      <div>
        <div class="section-label-gray">Network Family &amp; Partner Companies</div>
        <div class="badge-row">${partnerBadges}</div>
      </div>

      <!-- Why Choose Goldmine -->
      <div>
        <div class="section-label">Why Choose Goldmine</div>
        <ul class="why-list">${whyList}</ul>
      </div>

      <!-- Contact section -->
      <div class="contact-section">
        <div class="section-label">Get in Touch</div>

        <!-- 2-person team -->
        <div class="contact-team-grid">

          <!-- Adrian Lopez — Field Operations -->
          <div class="contact-person">
            <div class="contact-role">Field Operations</div>
            <div class="contact-name">Adrian Lopez</div>
            <div class="contact-line"><span class="contact-icon">📞</span>(925) 305-5980</div>
            <div class="contact-line"><span class="contact-icon">✉</span>A.lopez@goldminecomm.net</div>
          </div>

          <!-- Mark Nanney — Office Management -->
          <div class="contact-person">
            <div class="contact-role">Office Management</div>
            <div class="contact-name">Mark Nanney</div>
            <div class="contact-line"><span class="contact-icon">📞</span>(916) 717-5389</div>
            <div class="contact-line"><span class="contact-icon">✉</span>M.nanney@goldminecomm.net</div>
          </div>

        </div>

        <!-- Address + Website + CTA -->
        <div class="contact-bottom">
          <div class="contact-bottom-item">
            <span class="contact-icon">📍</span>
            <div>
              <div class="contact-bottom-label">Logistics / Corporate Office</div>
              <div class="contact-bottom-value">1161 Brick and Tile Circle<br>Stockton, CA 95206</div>
            </div>
          </div>
          <div class="contact-bottom-item">
            <span class="contact-icon">🌐</span>
            <div>
              <div class="contact-bottom-label">Website</div>
              <div class="contact-bottom-value">www.goldminecomm.net<br>Serving CA · NV · OR</div>
            </div>
          </div>
          <div class="cta-box">
            <div class="cta-title">Request an Estimate</div>
            <div class="cta-sub">Forward your current estimate — we'll beat it.</div>
          </div>
        </div>

      </div>

    </div>

    <!-- Footer -->
    <div class="page-footer">
      <div class="footer-logo-row">
        <img src="${logoSrc}" alt="Goldmine logo" class="footer-logo" />
        <span class="footer-copy">© 2025 Goldmine Construction Services · All Rights Reserved</span>
      </div>
      <div class="footer-right">Licensed · Bonded · Insured</div>
    </div>

  </div><!-- end page 2 -->

  <!--
    Image-aware print trigger: waits for ALL <img> elements to finish loading
    before opening the print dialog. Falls back to 3 seconds if any image errors.
  -->
  <script>
    (function() {
      var done = false;
      function triggerPrint() {
        if (!done) { done = true; window.print(); }
      }
      var imgs = Array.from(document.querySelectorAll('img'));
      var total = imgs.length;
      var loaded = 0;
      if (total === 0) {
        setTimeout(triggerPrint, 300);
        return;
      }
      imgs.forEach(function(img) {
        if (img.complete && img.naturalWidth > 0) {
          if (++loaded >= total) setTimeout(triggerPrint, 200);
        } else {
          img.onload = function() { if (++loaded >= total) setTimeout(triggerPrint, 200); };
          img.onerror = function() { if (++loaded >= total) setTimeout(triggerPrint, 200); };
        }
      });
      if (loaded >= total) setTimeout(triggerPrint, 300);
      // Absolute fallback after 4 seconds
      setTimeout(triggerPrint, 4000);
    })();
  </script>

</body>
</html>`;
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function BrochurePrintButton() {
  const handlePrint = () => {
    // Open a clean popup window — same dimensions as letter paper at 96dpi
    const printWindow = window.open('', '_blank', 'width=850,height=1100,scrollbars=yes');
    if (!printWindow) {
      alert('Please allow popups to print this document');
      return;
    }

    const html = buildPrintHTML(window.location.origin);
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    // Print is triggered by the embedded <script> in the HTML once all images are loaded.
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      aria-label="Open print-ready brochure and save as PDF"
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
