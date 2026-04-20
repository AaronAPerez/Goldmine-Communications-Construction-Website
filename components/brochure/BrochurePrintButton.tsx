'use client';

import { Printer } from 'lucide-react';

/**
 * BrochurePrintButton
 *
 * Opens a self-contained popup window with the full 3-page brochure HTML + CSS
 * and triggers window.print(). All data is kept in sync with page.tsx by living
 * in this single file — update one, update both.
 *
 * This popup approach guarantees background colours, gradients, and grid layouts
 * print exactly as they appear on screen (avoiding @media print specificity fights).
 */

/* ─── Shared brochure data ──────────────────────────────────────────────────── */

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

const whyChooseUs = [
  'Licensed, bonded & insured — CA License #1099543 A, B, C-10',
  'We beat competitor estimates — send yours for a comparison',
  'Serving California, Nevada & Oregon',
  'Trusted by the largest wireless carriers in the nation',
  'End-to-end services: design through installation through certification',
];

/** Page 3 — California license classes */
const licenses = [
  { code: 'Class A', name: 'General Engineering Contractor', color: '#3B82F6' },
  { code: 'Class B', name: 'General Contracting',            color: '#6366F1' },
  { code: 'C10',     name: "Electrical Contractor's License", color: '#F59E0B' },
];

/** Page 3 — civil / construction services */
const civilServices = [
  'Grading', 'Trenching', 'Excavating', 'Concrete Paving',
  'Concrete Pads', 'Structural Concrete', 'Demolition',
  'Asphalt Paving', 'Retaining Walls', 'Scaffolding',
];

/** Page 3 — carrier & ISP services */
const carrierServices = [
  'T-Mobile / Sprint Demo',
  'ISP',
  'RF Support & Install — Dish, AT&T, Verizon, T-Mobile',
  'SpaceX — Starlink Projects',
];

/** Page 3 — electrical services */
const electricalServices = [
  'Conduit, cabinets & power plant install / upgrades',
  'Battery racks & cabling',
  'Back-up generators up to 150KV',
  'Alarms & security systems',
  'Fiber optic systems',
  'CAT 6 & hybrid cabling',
  'Troubleshooting & maintenance',
];

/** Page 3 — A&E services */
const aeServices = [
  'Construction Drawings',
  'Traffic Plans',
  'Encroachment Permits',
];

/* ─── HTML generators ───────────────────────────────────────────────────────── */

/** Shared dark header bar used on all three pages */
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

/** Service card with photo strip — used in the 3×2 grid on page 1 */
function buildServiceCard(
  title: string,
  color: string,
  highlights: string[],
  image: string,
  origin: string,
): string {
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
          <span style="background:${color};width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
        </span>
        <strong style="color:#111827">${title}</strong>
      </div>
      <ul class="highlight-list">${bullets}</ul>
    </div>
  `;
}

/* ─── Full print HTML (3 pages) ─────────────────────────────────────────────── */

function buildPrintHTML(origin: string): string {
  const logoSrc = `${origin}/images/logo/logo-circular.jpg`;

  /* ── Page 1 content ── */
  const servicesGrid = services
    .map(s => buildServiceCard(s.title, s.color, s.highlights, s.image, origin))
    .join('');

  /* ── Page 2 content ── */
  const clientBadges = clients
    .map(c => `<span class="client-badge">${c}</span>`)
    .join('');

  const whyList = whyChooseUs
    .map(w => `<li class="why-item"><span class="check">&#10003;</span>${w}</li>`)
    .join('');

  /* ── Page 3 content ── */
  const licenseCards = licenses
    .map(l => `
      <div class="license-card" style="border-top:3px solid ${l.color}">
        <div class="license-icon" style="color:${l.color}">&#9670;</div>
        <div>
          <div class="license-code">${l.code}</div>
          <div class="license-name">${l.name}</div>
        </div>
      </div>
    `)
    .join('');

  const civilList = civilServices
    .map(s => `<li class="detail-item"><span class="detail-bullet">&#9632;</span>${s}</li>`)
    .join('');

  const carrierList = carrierServices
    .map(s => `<li class="detail-item"><span class="detail-bullet" style="color:#D4AF37">&#9830;</span>${s}</li>`)
    .join('');

  const electricalList = electricalServices
    .map(s => `<li class="elec-item"><span class="elec-bullet">&#9889;</span>${s}</li>`)
    .join('');

  const aeList = aeServices
    .map(s => `<li class="detail-item"><span class="detail-bullet">&#9632;</span>${s}</li>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Goldmine Construction Services — Company Brochure</title>
  <style>
    /* ── Paper setup ──────────────────────────────────── */
    @page { size: letter portrait; margin: 0; }

    /* Force ALL backgrounds to print ────────────────── */
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

    /* ── Page containers ──────────────────────────────── */
    .page {
      width: 8.5in;
      height: 11in;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: white;
      page-break-after: always;
      break-after: page;
    }
    .page:last-child { page-break-after: avoid; break-after: avoid; }

    .page-body {
      padding: 0.35in 0.5in 0.25in;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    /* Combined page 2 body — tighter padding to fit everything */
    .page-combined-body {
      padding: 0.22in 0.5in 0.18in;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .combined-section { }

    /* 5-col middle row: services left (3), clients/why right (2) */
    .combined-mid {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 18px;
    }
    .mid-services-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .mid-right {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* Compact electrical box (no description) */
    .elec-box-compact {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
    }
    .elec-compact-title {
      font-size: 7.5pt;
      font-weight: 700;
      color: #111827;
      margin-bottom: 5px;
    }

    /* ── Header ───────────────────────────────────────── */
    .page-header {
      background-color: #111827;
      padding: 14px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-left { display: flex; align-items: center; gap: 14px; }
    .logo {
      width: 60px; height: 60px;
      border-radius: 50%;
      border: 2px solid #D4AF37;
      object-fit: cover;
    }
    .company-name { font-size: 17pt; font-weight: 800; color: #fff; letter-spacing: -0.3px; line-height: 1.1; }
    .company-sub  { font-size: 8.5pt; color: #D4AF37; margin-top: 3px; font-weight: 500; }
    .header-right { text-align: right; font-size: 9pt; }
    .header-right .url      { color: #D4AF37; font-weight: 600; }
    .header-right .location { color: #9ca3af; margin-top: 2px; font-size: 8pt; }
    .header-right .tag      { color: #D4AF37; font-weight: 500; font-size: 9pt; }

    /* ── Gold divider ─────────────────────────────────── */
    .gold-divider { height: 4px; background: linear-gradient(to right, #D4AF37, #F5D78A, #D4AF37); }

    /* ── Section labels ───────────────────────────────── */
    .section-label {
      font-size: 7.5pt; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.12em; color: #D4AF37;
      border-bottom: 2px solid #D4AF37;
      padding-bottom: 4px; display: inline-block; margin-bottom: 12px;
    }
    /* ── About section ────────────────────────────────── */
    .intro-section { padding: 12px 0 10px; border-bottom: 1px solid #f3f4f6; margin-bottom: 12px; }
    .intro-heading { font-size: 13pt; font-weight: 800; color: #111827; margin-bottom: 5px; }
    .intro-text    { font-size: 8.5pt; color: #4b5563; line-height: 1.6; margin-bottom: 8px; }
    .about-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .mission-card  { background: rgba(212,175,55,0.08); border-left: 3px solid #D4AF37; border-radius: 0 6px 6px 0; padding: 8px 10px; }
    .vision-card   { background: #f9fafb; border-left: 3px solid #d1d5db; border-radius: 0 6px 6px 0; padding: 8px 10px; }
    .about-card-label { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
    .about-card-label.gold { color: #D4AF37; }
    .about-card-label.gray { color: #6b7280; }
    .about-card-text { font-size: 7.5pt; color: #374151; line-height: 1.5; }

    /* ── Services block (page 1) ──────────────────────── */
    .services-block { flex: 1; display: flex; flex-direction: column; }
    .services-grid  {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 10px; flex: 1;
    }
    .service-card  {
      background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
      padding: 10px; display: flex; flex-direction: column;
    }
    .service-title { display: flex; align-items: center; gap: 7px; margin-bottom: 7px; font-size: 9pt; flex-shrink: 0; }
    .service-dot   { width: 20px; height: 20px; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .highlight-list { list-style: none; display: flex; flex-direction: column; gap: 4px; flex: 1; }
    .highlight-list li { display: flex; align-items: flex-start; gap: 6px; font-size: 7.5pt; color: #4b5563; line-height: 1.4; }
    .bullet { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }

    /* ── Credentials bar (page 1 footer) ─────────────── */
    .credentials-bar {
      background-color: #111827; padding: 10px 40px;
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
    }
    .credentials-items { display: flex; gap: 24px; }
    .cred-item  { font-size: 8pt; color: #fff; }
    .cred-item strong { color: #D4AF37; }
    .credentials-bar .serve { font-size: 8pt; color: #9ca3af; }

    /* ── Footer (pages 2 & 3) ─────────────────────────── */
    .page-footer {
      background-color: #111827; padding: 10px 40px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-logo-row { display: flex; align-items: center; gap: 10px; }
    .footer-logo  { width: 26px; height: 26px; border-radius: 50%; border: 1px solid #D4AF37; object-fit: cover; }
    .footer-copy  { font-size: 7.5pt; color: #9ca3af; }
    .footer-right { font-size: 7.5pt; color: #D4AF37; font-weight: 500; }

    /* ── Page 2 — client/partner badges ──────────────── */
    .badge-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
    .client-badge  { padding: 4px 12px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 8pt; font-weight: 600; color: #1f2937; }

    /* ── Why Choose Goldmine ──────────────────────────── */
    .why-list { list-style: none; display: flex; flex-direction: column; gap: 7px; margin-top: 4px; }
    .why-item { display: flex; align-items: flex-start; gap: 8px; font-size: 9pt; color: #374151; line-height: 1.4; }
    .check { color: #D4AF37; font-weight: 700; font-size: 10pt; flex-shrink: 0; line-height: 1.3; }

    /* ── Contact section (page 2) ─────────────────────── */
    .contact-section { background: linear-gradient(135deg, #111827 0%, #1f2937 100%); border-radius: 12px; padding: 16px 20px; }
    .contact-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 4px; margin-bottom: 12px; }
    .contact-person { display: flex; flex-direction: column; gap: 4px; }
    .contact-role   { font-size: 6.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #D4AF37; }
    .contact-name   { font-size: 10pt; font-weight: 700; color: #fff; margin-bottom: 2px; }
    .contact-line   { display: flex; align-items: center; gap: 5px; font-size: 7.5pt; color: #d1d5db; }
    .contact-icon   { color: #D4AF37; font-size: 8pt; flex-shrink: 0; }
    .contact-bottom { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); }
    .contact-bottom-item { display: flex; align-items: flex-start; gap: 6px; }
    .contact-bottom-label { font-size: 6.5pt; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2px; }
    .contact-bottom-value { font-size: 7.5pt; color: #fff; line-height: 1.4; }
    .cta-box   { background: linear-gradient(135deg, #D4AF37 0%, #C4A032 100%); border-radius: 8px; padding: 10px 12px; text-align: center; }
    .cta-title { font-size: 9pt; font-weight: 700; color: #fff; margin-bottom: 2px; }
    .cta-sub   { font-size: 7pt; color: rgba(255,255,255,0.85); }

    /* ── Service card image strip ─────────────────────── */
    .service-img-wrap { position: relative; margin: -10px -10px 8px -10px; height: 90px; overflow: hidden; border-radius: 8px 8px 0 0; flex-shrink: 0; }
    .service-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .service-img-overlay  { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.25)); }

    /* ── Page 3 — Licensing ───────────────────────────── */
    .license-intro { font-size: 8.5pt; color: #4b5563; line-height: 1.6; margin-bottom: 12px; }
    .license-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px; }
    .license-card  { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; display: flex; align-items: flex-start; gap: 10px; }
    .license-icon  { font-size: 14pt; flex-shrink: 0; }
    .license-code  { font-size: 10pt; font-weight: 700; color: #111827; }
    .license-name  { font-size: 7.5pt; color: #6b7280; margin-top: 2px; }
    .cred-badges   { display: flex; flex-wrap: wrap; gap: 8px; }
    .cred-badge    { padding: 3px 10px; border-radius: 6px; font-size: 7.5pt; font-weight: 600; }
    .cred-badge.green { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .cred-badge.blue  { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
    .cred-badge.gold  { background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); color: #8C7322; }

    /* ── Page 3 — Detailed services two-column ────────── */
    .detail-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
    .detail-list  { list-style: none; display: flex; flex-direction: column; gap: 5px; }
    .detail-item  { display: flex; align-items: flex-start; gap: 6px; font-size: 8pt; color: #374151; line-height: 1.4; }
    .detail-bullet { font-size: 6pt; color: #D4AF37; flex-shrink: 0; margin-top: 3px; }

    /* ── Page 3 — Electrical services box ────────────── */
    .elec-box   { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px 16px; }
    .elec-title { font-size: 9pt; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .elec-desc  { font-size: 8pt; color: #4b5563; line-height: 1.6; margin-bottom: 10px; }
    .elec-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; }
    .elec-item  { display: flex; align-items: flex-start; gap: 5px; font-size: 7.5pt; color: #374151; line-height: 1.4; }
    .elec-bullet { color: #F59E0B; flex-shrink: 0; font-size: 8pt; }

    /* ── Subsection heading ───────────────────────────── */
    .sub-heading { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #D4AF37; border-bottom: 1px solid #D4AF37; padding-bottom: 3px; margin-bottom: 8px; display: inline-block; }
  </style>
</head>
<body>

  <!-- ══════════════════════════════════════════
       PAGE 1 — Services Overview
  ══════════════════════════════════════════ -->
  <div class="page">

    ${buildHeader(
      logoSrc,
      'Licensed &nbsp;·&nbsp; Bonded &nbsp;·&nbsp; Insured &nbsp;|&nbsp; CA #1099543 A, B, C-10',
      `<div class="url">www.goldminecomm.net</div><div class="location">Stockton, CA</div>`,
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

      <!-- Services grid -->
      <div class="services-block">
        <div class="section-label">Our Services</div>
        <div class="services-grid">${servicesGrid}</div>
      </div>

    </div>

    <!-- Credentials footer bar -->
    <div class="credentials-bar">
      <div class="credentials-items">
        <div class="cred-item">&#128737; <strong>License</strong> #1099543 A, B, C-10</div>
        <div class="cred-item">&#10003; <strong>Bond</strong> #G121001978153</div>
        <div class="cred-item">&#128737; <strong>Fully Insured</strong></div>
      </div>
      <div class="serve">Serving CA &nbsp;·&nbsp; NV &nbsp;·&nbsp; OR</div>
    </div>

  </div><!-- /page 1 -->


  <!-- ══════════════════════════════════════════
       PAGE 2 — Licensing, Services, Clients & Contact
  ══════════════════════════════════════════ -->
  <div class="page">

    ${buildHeader(
      logoSrc,
      'Licensed &nbsp;·&nbsp; Bonded &nbsp;·&nbsp; Insured &nbsp;|&nbsp; CA #1099543 A, B, C-10',
      `<div class="tag">Company Overview</div>`,
    )}

    <div class="page-combined-body">

      <!-- Licensing -->
      <div class="combined-section">
        <div class="section-label">California Licensing &amp; Credentials</div>
        <div class="license-grid">${licenseCards}</div>
        <div class="cred-badges">
          <span class="cred-badge green">&#10003; Bonded &amp; Insured</span>
          <span class="cred-badge blue">&#128737; CA License #1099543</span>
          <span class="cred-badge gold">&#10003; Bond #G121001978153</span>
        </div>
      </div>

      <!-- 5-col middle: services (3) + clients/why (2) -->
      <div class="combined-mid">

        <!-- Left 3 cols: Civil + Carrier/A&E -->
        <div class="mid-services">
          <div class="mid-services-inner">
            <!-- Civil -->
            <div>
              <div class="sub-heading">Civil &amp; Construction</div>
              <ul class="detail-list">${civilList}</ul>
            </div>
            <!-- Carrier + A&E -->
            <div>
              <div class="sub-heading">Carrier &amp; ISP</div>
              <ul class="detail-list" style="margin-bottom:10px">${carrierList}</ul>
              <div class="sub-heading">A&amp;E Services</div>
              <ul class="detail-list">${aeList}</ul>
            </div>
          </div>
        </div>

        <!-- Right 2 cols: Clients + Why -->
        <div class="mid-right">
          <div>
            <div class="sub-heading">Trusted by Industry Leaders</div>
            <div class="badge-row" style="margin-bottom:10px">${clientBadges}</div>
          </div>
          <div>
            <div class="sub-heading">Why Choose Goldmine</div>
            <ul class="why-list">${whyList}</ul>
          </div>
        </div>

      </div>

      <!-- Electrical (compact, no description) -->
      <div class="elec-box-compact">
        <div class="elec-compact-title">&#9889; Electrical Services</div>
        <div class="elec-grid">${electricalList}</div>
      </div>

      <!-- Contact -->
      <div class="contact-section">
        <div class="section-label">Get in Touch</div>
        <div class="contact-team-grid">
          <div class="contact-person">
            <div class="contact-role">Field Operations</div>
            <div class="contact-name">Adrian Lopez</div>
            <div class="contact-line"><span class="contact-icon">&#128222;</span>(925) 305-5980</div>
            <div class="contact-line"><span class="contact-icon">&#9993;</span>A.lopez@goldminecomm.net</div>
          </div>
          <div class="contact-person">
            <div class="contact-role">Office Management</div>
            <div class="contact-name">Mark Nanney</div>
            <div class="contact-line"><span class="contact-icon">&#128222;</span>(916) 717-5389</div>
            <div class="contact-line"><span class="contact-icon">&#9993;</span>M.nanney@goldminecomm.net</div>
          </div>
        </div>
        <div class="contact-bottom">
          <div class="contact-bottom-item">
            <span class="contact-icon">&#128205;</span>
            <div>
              <div class="contact-bottom-label">Logistics / Corporate Office</div>
              <div class="contact-bottom-value">1161 Brick and Tile Circle<br>Stockton, CA 95206</div>
            </div>
          </div>
          <div class="contact-bottom-item">
            <span class="contact-icon">&#127760;</span>
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

    <div class="page-footer">
      <span class="footer-copy">&#169; 2025 Goldmine Construction Services &nbsp;·&nbsp; All Rights Reserved</span>
      <div class="footer-right">Licensed &nbsp;·&nbsp; Bonded &nbsp;·&nbsp; Insured</div>
    </div>

  </div><!-- /page 2 -->

  <!--
    Image-aware print trigger: waits for ALL <img> elements to load
    before opening the print dialog. Falls back after 4 seconds.
  -->
  <script>
    (function () {
      var done = false;
      function triggerPrint() { if (!done) { done = true; window.print(); } }
      var imgs = Array.from(document.querySelectorAll('img'));
      var total = imgs.length, loaded = 0;
      if (total === 0) { setTimeout(triggerPrint, 300); return; }
      imgs.forEach(function (img) {
        if (img.complete && img.naturalWidth > 0) {
          if (++loaded >= total) setTimeout(triggerPrint, 200);
        } else {
          img.onload  = function () { if (++loaded >= total) setTimeout(triggerPrint, 200); };
          img.onerror = function () { if (++loaded >= total) setTimeout(triggerPrint, 200); };
        }
      });
      if (loaded >= total) setTimeout(triggerPrint, 300);
      setTimeout(triggerPrint, 4000);
    })();
  </script>

</body>
</html>`;
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function BrochurePrintButton() {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=850,height=1100,scrollbars=yes');
    if (!printWindow) {
      alert('Please allow popups to print this document');
      return;
    }
    const html = buildPrintHTML(window.location.origin);
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    // Print is triggered by the embedded <script> once all images are loaded.
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
