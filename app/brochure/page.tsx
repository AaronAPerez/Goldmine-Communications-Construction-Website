import type { Metadata } from 'next';
import Image from 'next/image';
import BrochurePrintButton from '@/components/brochure/BrochurePrintButton';
import {
  Radio,
  Server,
  Zap,
  Speaker,
  GraduationCap,
  Ruler,
  Phone,
  Mail,
  Globe,
  MapPin,
  Shield,
  CheckCircle,
} from 'lucide-react';

/**
 * Brochure page metadata — noindex so search engines don't surface it.
 */
export const metadata: Metadata = {
  title: 'Company Brochure | Goldmine Construction Services',
  description:
    'Goldmine Construction Services — Licensed telecommunications and construction company serving California, Nevada, and Oregon.',
  robots: { index: false, follow: false },
};

/* ─── Service data ─────────────────────────────────────────────────────────── */

const services = [
  {
    icon: Radio,
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
    icon: Server,
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
    icon: Zap,
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
    icon: Speaker,
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
    icon: GraduationCap,
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
    icon: Ruler,
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

/* ─── Page component ────────────────────────────────────────────────────────── */

export default function BrochurePage() {
  return (
    <>
      {/* Fixed-height scroll container so both pages are reachable without a full-page scroll */}
      <div className="mt-20 brochure-mt-wrapper brochure-scroll-container">
        {/*
       * Print-specific global styles:
       * - Letter paper, half-inch margin
       * - Force background colors to print
       * - Page break between the two brochure pages
       * - Remove default browser header/footer text on print
       */}
        <style>{`
        /* ── Screen scroll container ────────────────────────────────────── */
        /* Fixed height = viewport minus nav bar (80px / 5rem), scrollable */
        .brochure-scroll-container {
          height: calc(100vh - 5rem);
          overflow-y: auto;
        }

        /* ── Section heading underlines ─────────────────────────────────── */
        /* Gold underline — used on "Our Services", "Trusted by Industry Leaders", "Why Choose Goldmine" */
        .brochure-section-label-gold {
          border-bottom: 2px solid #D4AF37;
          padding-bottom: 6px;
          display: inline-block;
        }
        /* Gray underline — used on "Network Family & Partner Companies" */
        .brochure-section-label-gray {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 6px;
          display: inline-block;
        }
        /* Partner badge pill */
        .brochure-partner-badge {
          background-color: rgba(212, 175, 55, 0.094);
          color: #8C7322;
          border: 1px solid rgba(212, 175, 55, 0.251);
        }

        /* ── Service card image strip ────────────────────────────────────── */
        .brochure-service-img-wrap {
          position: relative;
          margin: -1rem -1rem 0.75rem -1rem;
          height: 72px;
          overflow: visible;
          border-radius: 0.75rem 0.75rem 0 0;
        }
        .brochure-service-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: full-width;
        }
        .brochure-service-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%);
        }

        /* ── About section cards ────────────────────────────────────────── */
        .brochure-mission-card {
          background-color: rgba(212, 175, 55, 0.08);
          border-left: 3px solid #D4AF37;
        }
        .brochure-vision-card {
          background-color: #f9fafb;
          border-left: 3px solid #d1d5db;
        }

        /* ── Shared backgrounds (screen + print) ───────────────────────── */

        /* Dark charcoal used on all 4 header/footer bars */
        .brochure-dark-bg {
          background-color: #111827;
        }
        /* Dark gradient used in the contact section */
        .brochure-contact-bg {
          background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
        }
        /* Gold gradient used in the CTA box */
        .brochure-cta-bg {
          background: linear-gradient(135deg, #D4AF37 0%, #C4A032 100%);
        }

        /* ── Print rules ────────────────────────────────────────────────── */
        @media print {
          @page {
            size: letter portrait;
            margin: 0
          }

          /*
           * Force EVERY element to print its background color/image exactly.
           * Applying only to html/body does NOT cascade to children for
           * background-color — this * rule is required.
           */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Remove the nav-offset top margin that's only needed on screen */
          .brochure-mt-wrapper {
            margin-top: 0 !important;
          }

          /* Remove screen-only sizing from the outer wrapper */
          .brochure-root {
            min-height: unset !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            background-color: white !important;
          }

          /* Remove inter-page gap that's only for screen preview */
          .brochure-pages-gap {
            gap: 0 !important;
          }

          /* Insert a hard page break after page 1 */
          .page-break {
            page-break-after: always;
            break-after: page;
          }

          /* Keep the 3-column services grid in print */
          .brochure-services-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1rem !important;
          }

          /* Always show the right-side URL block regardless of viewport width */
          .brochure-header-right {
            display: block !important;
          }
        }

        /* ── Screen-only shadow to simulate paper ───────────────────────── */
        @media screen {
          .brochure-page {
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
          }
        }
      `}</style>

        {/* ── Sticky print button — hidden when printing ── */}
        <div className="print:hidden fixed bottom-6 right-6 z-50">
          <BrochurePrintButton />
        </div>

        {/* ── Outer wrapper: white background, centered ── */}
        <div className="brochure-root bg-gray-100 min-h-screen py-8">
          <div className="brochure-pages-gap max-w-[8.5in] mx-auto flex flex-col gap-8">

            {/* ════════════════════════════════════════════════
              PAGE 1 — Services overview
          ════════════════════════════════════════════════ */}
            <div className="brochure-page page-break bg-gray-50">

              {/* ── Header bar: dark charcoal matching footer ── */}
              <header className="brochure-dark-bg px-10 py-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {/* Logo */}
                  <Image
                    src="/images/logo/logo-circular.jpg"
                    alt="Goldmine Construction Services logo"
                    width={74}
                    height={74}
                    className="rounded-full border-2 border-[#D4AF37]"
                    priority
                  />
                  <div>
                    <h1 className="text-white text-2xl font-bold tracking-tight leading-tight">
                      Goldmine Construction Services
                    </h1>
                    <p className="text-[#D4AF37] text-sm font-medium mt-0.5">
                      Licensed · Bonded · Insured &nbsp;|&nbsp; CA #1099543 A, B, C-10
                    </p>
                  </div>
                </div>
                {/* Right: website URL — brochure-header-right ensures it shows in print */}
                <div className="brochure-header-right text-right">
                  <p className="text-[#D4AF37] font-semibold text-sm">www.goldminecomm.net</p>
                  <p className="text-gray-400 text-sm mt-0.5">Stockton, CA</p>
                </div>
              </header>

              {/* ── Gold divider ── */}
              <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F5D78A] to-[#D4AF37]" />

              {/* ── About Us — sourced from Goldmine brochure Intro.pdf ── */}
              <section className="px-10 py-5 bg-white border-b border-gray-100">
                <h2 className="text-[#111827] text-lg font-bold mb-2">About Goldmine Communications</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Founded by three individuals with over 60 years of combined experience in telecom and
                  commercial electrical contracting, Goldmine Communications brings diverse expertise,
                  versatility, and above all, safety into every network project. We are an integrity-first
                  business serving various industries — delivering cost-efficient solutions with innovative
                  ideas and unwavering commitment to quality and customer satisfaction.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Mission Statement */}
                  <div className="brochure-mission-card px-3 py-2.5 rounded-r-lg">
                    <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-1">Mission</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      To be the preeminent full-service provider of telecommunications network
                      infrastructure — putting family principles, pride, and customers first while
                      maintaining the highest quality and honest business practices.
                    </p>
                  </div>
                  {/* Vision */}
                  <div className="brochure-vision-card px-3 py-2.5 rounded-r-lg">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Vision</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      To be recognized as a leading provider — elevating network standards and supplying
                      innovative installation, network, and construction services across the nation.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Services grid ── */}
              <section className="px-10 pb-7">
                <h3 className="brochure-section-label-gold text-sm font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-5">
                  Our Services
                </h3>

                <div className="brochure-services-grid grid grid-cols-3 gap-4">
                  {services.map(({ icon: Icon, title, color, image, highlights }) => (
                    <div
                      key={title}
                      className="rounded-xl border border-gray-100 p-4 bg-gray-50"
                      style={{ borderTop: `3px solid ${color}` }}
                    >
                      {/* Project photo — bleeds to card edges via negative margin */}
                      <div className="brochure-service-img-wrap">
                        <Image
                          src={image}
                          alt={`${title} — Goldmine project`}
                          width={300}
                          height={82}
                          className="w-full h-full object-contain  rounded-tl-lg rounded-tr-lg"
                        />
                        <div className="brochure-service-img-overlay" aria-hidden="true" />
                      </div>

                      {/* Service icon + name */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="p-1.5 rounded-lg"
                          style={{ backgroundColor: `${color}18` }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color }}
                            aria-hidden="true"
                          />
                        </div>
                        <h4 className="font-bold text-[#111827] text-sm">{title}</h4>
                      </div>

                      {/* Bullet highlights */}
                      <ul className="space-y-1.5">
                        {highlights.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-sm text-gray-600">
                            <span
                              className="mt-0.5 flex-shrink-0 w-3 h-3 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${color}22` }}
                              aria-hidden="true"
                            >
                              <span
                                className="block w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Credentials footer bar ── */}
              <footer className="brochure-dark-bg px-10 py-4 flex flex-wrap items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Shield className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                    <span><strong className="text-[#D4AF37]">License</strong> #1099543 A, B, C-10</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                    <span><strong className="text-[#D4AF37]">Bond</strong> #G121001978153</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Shield className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                    <span><strong className="text-[#D4AF37]">Fully Insured</strong></span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Serving CA · NV · OR</p>
              </footer>
            </div>

            {/* ════════════════════════════════════════════════
              PAGE 2 — Clients, Why Us & Contact
          ════════════════════════════════════════════════ */}
            <div className="brochure-page bg-white">

              {/* ── Header bar: dark charcoal matching footer ── */}
              <header className="brochure-dark-bg px-10 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/logo/logo-circular.jpg"
                    alt="Goldmine Construction Services logo"
                    width={52}
                    height={52}
                    className="rounded-full border-2 border-[#D4AF37]"
                  />
                  <p className="text-white font-bold text-base">
                    Goldmine Construction Services
                  </p>
                </div>
                <p className="text-[#D4AF37] text-sm font-medium">Company Introduction</p>
              </header>

              {/* ── Gold divider ── */}
              <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F5D78A] to-[#D4AF37]" />

              <div className="px-10 py-7 space-y-7">

                {/* ── Trusted clients row ── */}
                <section>
                  <h3 className="brochure-section-label-gold text-sm font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-4">
                    Trusted by Industry Leaders
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {clients.map((client) => (
                      <span
                        key={client}
                        className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm font-semibold"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </section>

                {/* ── Partner companies ── */}
                <section>
                  <h3 className="brochure-section-label-gray text-sm font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">
                    Network Family &amp; Partner Companies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {partners.map((partner) => (
                      <span
                        key={partner}
                        className="brochure-partner-badge px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </section>

                {/* ── Why Choose Goldmine ── */}
                <section>
                  <h3 className="brochure-section-label-gold text-sm font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-4">
                    Why Choose Goldmine
                  </h3>
                  <ul className="space-y-2.5">
                    {whyChooseUs.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle
                          className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* ── Contact section — full team from brochure PDF ── */}
                <section className="brochure-contact-bg rounded-2xl p-6">
                  <h3 className="text-[#D4AF37] text-sm font-bold uppercase tracking-[0.15em] mb-4">
                    Get in Touch
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-4">

                    {/* Adrian Lopez — Field Operations */}
                    <div className="space-y-1.5">
                      <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider">Field Operations</p>
                      <p className="text-white font-bold text-sm">Adrian Lopez</p>
                      <a href="tel:+19253055980" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">
                        <Phone className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        (925) 305-5980
                      </a>
                      <a href="mailto:a.lopez@goldminecomm.net" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">
                        <Mail className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        A.lopez@goldminecomm.net
                      </a>
                    </div>

                    {/* Mark Nanney — Office Management */}
                    <div className="space-y-1.5">
                      <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider">Office Management</p>
                      <p className="text-white font-bold text-sm">Mark Nanney</p>
                      <a href="tel:+19167175389" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">
                        <Phone className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        (916) 717-5389
                      </a>
                      <a href="mailto:m.nanney@goldminecomm.net" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">
                        <Mail className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        M.nanney@goldminecomm.net
                      </a>
                    </div>

                  </div>

                  {/* Bottom row: address + web + CTA */}
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10">
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="text-sm">
                        <p className="text-gray-400">Logistics / Corporate Office</p>
                        <p>1161 Brick and Tile Circle</p>
                        <p>Stockton, California 95206</p>
                      </div>
                    </div>
                    <a href="https://www.goldminecomm.net" className="flex items-start gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors">
                      <Globe className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="text-sm">
                        <p className="text-gray-400">Website</p>
                        <p>www.goldminecomm.net</p>
                      </div>
                    </a>
                    <div className="brochure-cta-bg p-3 rounded-xl text-center">
                      <p className="text-white font-bold text-sm">Request an Estimate</p>
                      <p className="text-white/85 text-sm mt-0.5">
                        Forward your estimate — we&apos;ll beat it.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* ── Footer ── */}
              <footer className="brochure-dark-bg px-10 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo/logo-banner.jpg"
                    alt="Goldmine logo"
                    width={62}
                    height={62}
                    className=""
                  />
                  <p className="text-gray-400 text-sm">
                    © 2025 Goldmine Construction Services · All Rights Reserved
                  </p>
                </div>
                <p className="text-[#D4AF37] text-sm font-medium">
                  Licensed · Bonded · Insured
                </p>
              </footer>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
