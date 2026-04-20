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
  Award,
  Wrench,
  Building2,
  Satellite,
} from 'lucide-react';

/**
 * Brochure page — printable two/three-page company overview.
 * noindex so search engines don't surface the raw brochure URL.
 */
export const metadata: Metadata = {
  title: 'Company Brochure | Goldmine Construction Services',
  description:
    'Goldmine Construction Services — Licensed telecommunications and construction company serving California, Nevada, and Oregon.',
  robots: { index: false, follow: false },
};

/* ─── Data ──────────────────────────────────────────────────────────────────── */

/** Page 1 — six core service cards */
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

const whyChooseUs = [
  'Licensed, bonded & insured — CA License #1099543 A, B, C-10',
  'We beat competitor estimates — send yours for a comparison',
  'Serving California, Nevada & Oregon',
  'Trusted by the largest wireless carriers in the nation',
  'End-to-end services: design through installation through certification',
];

/** Page 3 — California license classes (Tailwind classes to avoid inline styles) */
const licenses = [
  { code: 'Class A', name: 'General Engineering Contractor', borderClass: 'brochure-lic-blue',   iconClass: 'text-blue-500'   },
  { code: 'Class B', name: 'General Contracting',            borderClass: 'brochure-lic-indigo', iconClass: 'text-indigo-500' },
  { code: 'C10',     name: "Electrical Contractor's License", borderClass: 'brochure-lic-amber',  iconClass: 'text-amber-500'  },
];

/** Page 3 — civil / construction services */
const civilServices = [
  'Grading',
  'Trenching',
  'Excavating',
  'Concrete Paving',
  'Concrete Pads',
  'Structural Concrete',
  'Demolition',
  'Asphalt Paving',
  'Retaining Walls',
  'Scaffolding',
];

/** Page 3 — carrier & ISP services */
const carrierServices = [
  'T-Mobile / Sprint Demo',
  'ISP',
  'RF Support & Install — Dish, AT&T, Verizon, T-Mobile',
  'SpaceX — Starlink Projects',
];

/** Page 3 — electrical services detail */
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

/* ─── Page component ────────────────────────────────────────────────────────── */

export default function BrochurePage() {
  return (
    <>
      {/* ── Scroll container (screen only) ── */}
      <div className="mt-20 brochure-mt-wrapper brochure-scroll-container">

        {/*
         * Global styles for the brochure:
         * - Screen: fixed-height scrollable container, paper shadows
         * - Print: letter paper, force backgrounds, page breaks
         */}
        <style>{`
          /* ── Screen scroll container ───────────────────── */
          .brochure-scroll-container {
            height: calc(100vh - 5rem);
            overflow-y: auto;
          }

          /* ── Section heading underlines ────────────────── */
          .brochure-section-label-gold {
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 6px;
            display: inline-block;
          }
          .brochure-section-label-gray {
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 6px;
            display: inline-block;
          }

          /* ── Badge styles ───────────────────────────────── */
          .brochure-partner-badge {
            background-color: rgba(212, 175, 55, 0.094);
            color: #8C7322;
            border: 1px solid rgba(212, 175, 55, 0.251);
          }

          /* ── Service card image strip ───────────────────── */
          .brochure-service-img-wrap {
            position: relative;
            margin: -1rem -1rem 0.75rem -1rem;
            height: 140px;
            overflow: hidden;
            border-radius: 0.75rem 0.75rem 0 0;
          }
          .brochure-service-img-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%);
          }

          /* ── About section cards ────────────────────────── */
          .brochure-mission-card {
            background-color: rgba(212, 175, 55, 0.08);
            border-left: 3px solid #D4AF37;
          }
          .brochure-vision-card {
            background-color: #f9fafb;
            border-left: 3px solid #d1d5db;
          }

          /* ── Shared backgrounds ─────────────────────────── */
          .brochure-dark-bg    { background-color: #111827; }
          .brochure-contact-bg { background: linear-gradient(135deg, #111827 0%, #1f2937 100%); }
          .brochure-cta-bg     { background: linear-gradient(135deg, #D4AF37 0%, #C4A032 100%); }

          /* ── Print rules ────────────────────────────────── */
          @media print {
            @page { size: letter portrait; margin: 0; }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .brochure-mt-wrapper    { margin-top: 0 !important; }
            .brochure-root          { min-height: unset !important; padding-top: 0 !important; padding-bottom: 0 !important; background-color: white !important; }
            .brochure-pages-gap     { gap: 0 !important; }
            .page-break             { page-break-after: always; break-after: page; }

            /* Force 3-column services grid in print */
            .brochure-services-grid {
              display: grid !important;
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: 1rem !important;
            }

            /* Force 2-column grids in print */
            .brochure-2col-grid {
              display: grid !important;
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            /* Force 3-column contact bottom in print */
            .brochure-3col-grid {
              display: grid !important;
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }

            /* Always show header-right URL block */
            .brochure-header-right { display: block !important; }
          }

          /* ── License card border colours (avoids inline styles) ── */
          .brochure-lic-blue   { border-top: 3px solid #3B82F6; }
          .brochure-lic-indigo { border-top: 3px solid #6366F1; }
          .brochure-lic-amber  { border-top: 3px solid #F59E0B; }

          /* ── Screen-only paper shadow ───────────────────── */
          @media screen {
            .brochure-page { box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12); }
          }
        `}</style>

        {/*
         * Print button — positioned above the FloatingContactButton (bottom-24)
         * so the two fixed buttons don't overlap.
         */}
        <div className="print:hidden fixed bottom-24 right-6 z-50">
          <BrochurePrintButton />
        </div>

        {/* ── Outer wrapper ── */}
        <div className="brochure-root bg-gray-100 min-h-screen py-4 sm:py-8">
          <div className="brochure-pages-gap max-w-[8.5in] mx-auto flex flex-col gap-4 sm:gap-8">

            {/* ════════════════════════════════════════════════
                PAGE 1 — Services overview
            ════════════════════════════════════════════════ */}
            <div className="brochure-page page-break bg-gray-50">

              {/* Header */}
              <header className="brochure-dark-bg px-4 sm:px-10 py-4 sm:py-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-5">
                  <Image
                    src="/images/logo/logo-circular.jpg"
                    alt="Goldmine Construction Services logo"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-[#D4AF37] w-14 h-14 sm:w-[74px] sm:h-[74px]"
                    priority
                  />
                  <div>
                    <h1 className="text-white text-lg sm:text-2xl font-bold tracking-tight leading-tight">
                      Goldmine Construction Services
                    </h1>
                    <p className="text-[#D4AF37] text-xs sm:text-sm font-medium mt-0.5">
                      Licensed · Bonded · Insured &nbsp;|&nbsp; CA #1099543 A, B, C-10
                    </p>
                  </div>
                </div>
                <div className="brochure-header-right text-right hidden sm:block">
                  <p className="text-[#D4AF37] font-semibold text-sm">www.goldminecomm.net</p>
                  <p className="text-gray-400 text-sm mt-0.5">Stockton, CA</p>
                </div>
              </header>

              {/* Gold divider */}
              <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F5D78A] to-[#D4AF37]" />

              {/* About Us */}
              <section className="px-4 sm:px-10 py-4 sm:py-5 bg-white border-b border-gray-100">
                <h2 className="text-[#111827] text-base sm:text-lg font-bold mb-2">
                  About Goldmine Communications
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Founded by three individuals with over 60 years of combined experience in telecom and
                  commercial electrical contracting, Goldmine Communications brings diverse expertise,
                  versatility, and above all, safety into every network project. We are an integrity-first
                  business serving various industries — delivering cost-efficient solutions with innovative
                  ideas and unwavering commitment to quality and customer satisfaction.
                </p>
                <div className="brochure-2col-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="brochure-mission-card px-3 py-2.5 rounded-r-lg">
                    <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-1">Mission</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      To be the preeminent full-service provider of telecommunications network
                      infrastructure — putting family principles, pride, and customers first while
                      maintaining the highest quality and honest business practices.
                    </p>
                  </div>
                  <div className="brochure-vision-card px-3 py-2.5 rounded-r-lg">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Vision</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      To be recognized as a leading provider — elevating network standards and supplying
                      innovative installation, network, and construction services across the nation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Services grid */}
              <section className="px-4 sm:px-10 pb-5 sm:pb-7 pt-4 sm:pt-5">
                <h3 className="brochure-section-label-gold text-sm font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-4 sm:mb-5">
                  Our Services
                </h3>
                <div className="brochure-services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {services.map(({ icon: Icon, title, color, image, highlights }) => (
                    <div
                      key={title}
                      className="rounded-xl border border-gray-100 p-4 bg-gray-50"
                      style={{ borderTop: `3px solid ${color}` }}
                    >
                      <div className="brochure-service-img-wrap">
                        <Image
                          src={image}
                          alt={`${title} — Goldmine project`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="brochure-service-img-overlay" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${color}18` }}>
                          <Icon className="w-4 h-4" style={{ color }} aria-hidden="true" />
                        </div>
                        <h4 className="font-bold text-[#111827] text-sm">{title}</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {highlights.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-sm text-gray-600">
                            <span
                              className="mt-0.5 flex-shrink-0 w-3 h-3 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${color}22` }}
                              aria-hidden="true"
                            >
                              <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Credentials footer bar */}
              <footer className="brochure-dark-bg px-4 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
                PAGE 2 — Licensing, Services, Clients & Contact
            ════════════════════════════════════════════════ */}
            <div className="brochure-page bg-white">

              <header className="brochure-dark-bg px-4 sm:px-10 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    src="/images/logo/logo-circular.jpg"
                    alt="Goldmine Construction Services logo"
                    width={52}
                    height={52}
                    className="rounded-full border-2 border-[#D4AF37] w-10 h-10 sm:w-[52px] sm:h-[52px]"
                  />
                  <p className="text-white font-bold text-sm sm:text-base">
                    Goldmine Construction Services
                  </p>
                </div>
                <p className="text-[#D4AF37] text-sm font-medium">Company Overview</p>
              </header>

              <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F5D78A] to-[#D4AF37]" />

              <div className="px-4 sm:px-10 py-4 sm:py-5 space-y-4 sm:space-y-5">

                {/* ── Licensing (full width) ── */}
                <section>
                  <h3 className="brochure-section-label-gold text-sm font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-3">
                    California Licensing &amp; Credentials
                  </h3>
                  <div className="brochure-3col-grid grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                    {licenses.map(({ code, name, borderClass, iconClass }) => (
                      <div
                        key={code}
                        className={`rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 flex items-center gap-3 ${borderClass}`}
                      >
                        <Award className={`w-4 h-4 flex-shrink-0 ${iconClass}`} aria-hidden="true" />
                        <div>
                          <p className="font-bold text-xs text-[#111827]">{code}</p>
                          <p className="text-xs text-gray-500">{name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded text-green-800 text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" aria-hidden="true" /> Bonded &amp; Insured
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-blue-800 text-xs font-semibold">
                      <Shield className="w-3 h-3" aria-hidden="true" /> CA License #1099543
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" aria-hidden="true" /> Bond #G121001978153
                    </span>
                  </div>
                </section>

                {/* ── Services (left 3/5) + Clients & Why (right 2/5) ── */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-6">

                  {/* Left: Civil/Construction + Carrier+A&E */}
                  <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Civil & Construction */}
                    <section>
                      <h3 className="brochure-section-label-gold text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-2">
                        Civil &amp; Construction
                      </h3>
                      <ul className="space-y-1">
                        {civilServices.map((item) => (
                          <li key={item} className="flex items-center gap-1.5 text-xs text-gray-700">
                            <Building2 className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Carrier + A&E stacked */}
                    <div className="space-y-3">
                      <section>
                        <h3 className="brochure-section-label-gold text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-2">
                          Carrier &amp; ISP
                        </h3>
                        <ul className="space-y-1">
                          {carrierServices.map((item) => (
                            <li key={item} className="flex items-start gap-1.5 text-xs text-gray-700">
                              <Satellite className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </section>
                      <section>
                        <h3 className="brochure-section-label-gold text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-2">
                          A&amp;E Services
                        </h3>
                        <ul className="space-y-1">
                          {aeServices.map((item) => (
                            <li key={item} className="flex items-center gap-1.5 text-xs text-gray-700">
                              <Ruler className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>

                  {/* Right: Clients + Why Choose Goldmine */}
                  <div className="sm:col-span-2 space-y-4">
                    <section>
                      <h3 className="brochure-section-label-gold text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-2">
                        Trusted by Industry Leaders
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {clients.map((client) => (
                          <span
                            key={client}
                            className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-gray-800 text-xs font-semibold"
                          >
                            {client}
                          </span>
                        ))}
                      </div>
                    </section>
                    <section>
                      <h3 className="brochure-section-label-gold text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-2">
                        Why Choose Goldmine
                      </h3>
                      <ul className="space-y-1.5">
                        {whyChooseUs.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                {/* ── Electrical Services (full width, compact) ── */}
                <section className="bg-gray-50 rounded-xl border border-gray-100 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-yellow-500/10">
                      <Wrench className="w-3.5 h-3.5 text-yellow-600" aria-hidden="true" />
                    </div>
                    <h3 className="brochure-section-label-gold text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                      Electrical Services
                    </h3>
                  </div>
                  <div className="brochure-2col-grid grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {electricalServices.map((item) => (
                      <div key={item} className="flex items-center gap-1.5 text-xs text-gray-700">
                        <Zap className="w-3 h-3 text-yellow-500 flex-shrink-0" aria-hidden="true" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                {/* ── Contact ── */}
                <section className="brochure-contact-bg rounded-2xl p-3 sm:p-5">
                  <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.15em] mb-3">
                    Get in Touch
                  </h3>
                  <div className="brochure-2col-grid grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="space-y-1">
                      <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Field Operations</p>
                      <p className="text-white font-bold text-sm">Adrian Lopez</p>
                      <a href="tel:+19253055980" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-xs">
                        <Phone className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        (925) 305-5980
                      </a>
                      <a href="mailto:a.lopez@goldminecomm.net" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-xs">
                        <Mail className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        A.lopez@goldminecomm.net
                      </a>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Office Management</p>
                      <p className="text-white font-bold text-sm">Mark Nanney</p>
                      <a href="tel:+19167175389" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-xs">
                        <Phone className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        (916) 717-5389
                      </a>
                      <a href="mailto:m.nanney@goldminecomm.net" className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors text-xs">
                        <Mail className="w-3 h-3 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                        M.nanney@goldminecomm.net
                      </a>
                    </div>
                  </div>
                  <div className="brochure-3col-grid grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="text-xs">
                        <p className="text-gray-400">Logistics / Corporate Office</p>
                        <p>1161 Brick and Tile Circle</p>
                        <p>Stockton, California 95206</p>
                      </div>
                    </div>
                    <a href="https://www.goldminecomm.net" className="flex items-start gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors">
                      <Globe className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="text-xs">
                        <p className="text-gray-400">Website</p>
                        <p>www.goldminecomm.net</p>
                      </div>
                    </a>
                    <div className="brochure-cta-bg p-2.5 rounded-xl text-center">
                      <p className="text-white font-bold text-xs">Request an Estimate</p>
                      <p className="text-white/85 text-xs mt-0.5">Forward your estimate — we&apos;ll beat it.</p>
                    </div>
                  </div>
                </section>
              </div>

              <footer className="brochure-dark-bg px-4 sm:px-10 py-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-gray-400 text-sm">
                  © 2025 Goldmine Construction Services · All Rights Reserved
                </p>
                <p className="text-[#D4AF37] text-sm font-medium">Licensed · Bonded · Insured</p>
              </footer>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
