"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ============================ DYNAMIC CONFIG ============================== */
const PAGE_CONFIG = {
  layout: { container: "max-w-6xl", gridCols: "md:grid-cols-2 xl:grid-cols-3" },
  card: { variant: "elevated", radius: "xl", padding: "md" },
  description: { maxChars: 130 },          // brief description truncation on cards
  show: {
    search: true,
    industryFilter: true,
    rating: true,                          // avg star rating chip on card
    tenure: true,                          // "Partner since" chip
    contactQuickActions: true,             // phone/email mini buttons
    socials: true,
    gallery: false,                        // gallery preview strip on cards
  },
};

const UI = {
  cardVariants: {
    elevated: "bg-white border border-slate-200/80 shadow-sm hover:shadow-lg",
    outlined: "bg-white border-2 border-slate-200",
    flat: "bg-white border border-slate-100",
  },
  radii: { lg: "rounded-xl", xl: "rounded-2xl", "2xl": "rounded-3xl" },
  paddings: { sm: "p-4", md: "p-5 md:p-6", lg: "p-6 md:p-8" },
};
const cardClass = () =>
  `${UI.cardVariants[PAGE_CONFIG.card.variant]} ${UI.radii[PAGE_CONFIG.card.radius]} ${UI.paddings[PAGE_CONFIG.card.padding]}`;

export const CLIENTS = [
  {
    id: "CLNT-01",
    slug: "adani-enterprises",
    name: "Rajesh Malhotra",                       // client name (contact person)
    designation: "VP — Procurement Operations",
    companyName: "Adani Enterprises Ltd",
    industry: "Mining & Heavy Infrastructure",
    servingSince: "2020",
    logo: "https://placehold.co/120x120/0f172a/a3e635?text=AE",
    url: "https://www.adanienterprises.com",
    details:
      "Collaborating across multiple open-cast mining cells in the Singrauli zone for strategic distribution of high-tensile machinery spares, conveyor systems and site safety equipment. Engagement runs on an annual rate contract with consolidated monthly dispatches to three site stores, full test-certificate documentation on every line item, and a dedicated account executive for emergency breakdown sourcing.",
    contact: { phone: "+91 98765 10001", email: "procurement@adanient.example.com" },
    social: {
      linkedin: "https://linkedin.com/company/adani-enterprises",
      instagram: "https://instagram.com/adanionline",
      twitter: "https://twitter.com/adanionline",
    },
    gallery: [
      "https://placehold.co/480x300?text=Singrauli+Mining+Cell",
      "https://placehold.co/480x300?text=Site+Stores",
      "https://placehold.co/480x300?text=Conveyor+Line",
    ],
    reviews: [
      { date: "2026-04-18", rating: 5, description: "Bulk sourcing turnaround for our Singrauli zone machinery spares has been stellar. The automated RFQ pipeline cut our order-tracking overhead by almost 35%." },
      { date: "2025-12-03", rating: 5, description: "Emergency breakdown order delivered to site in 18 hours with complete test certificates. This is the standard we hold every vendor to now." },
      { date: "2025-07-22", rating: 4, description: "Consistent quality across consignments. One packaging issue in monsoon was resolved with replacement within the week." },
    ],
  },
  {
    id: "CLNT-02",
    slug: "hindalco-industries",
    name: "Meera Krishnan",
    designation: "Head — Plant Maintenance Stores",
    companyName: "Hindalco Industries",
    industry: "Metallurgy & Aluminium Refineries",
    servingSince: "2022",
    logo: "https://placehold.co/120x120/1e3a8a/ffffff?text=HI",
    url: "https://www.hindalco.com",
    details:
      "Core strategic supplier for high-pressure industrial hydraulics, lubrication systems and electrical safety audit equipment across refinery maintenance cells. Procurement operates on quarterly purchase orders with MSDS sheets mandatory on all chemical lines and IEC-certified PPE for electrical crews.",
    contact: { phone: "+91 98765 10002", email: "stores@hindalco.example.com" },
    social: {
      linkedin: "https://linkedin.com/company/hindalco",
      instagram: "",
      twitter: "https://twitter.com/hindalco",
    },
    gallery: [
      "https://placehold.co/480x300?text=Refinery+Cell",
      "https://placehold.co/480x300?text=Hydraulics+Bay",
    ],
    reviews: [
      { date: "2026-02-09", rating: 5, description: "Every electrical safety item arrives with IEC certification and test stamps. Audit-ready paperwork without us having to chase — rare in this region." },
      { date: "2025-09-15", rating: 4, description: "Hydraulic spares matched OEM part numbers exactly. Pricing on bulk lubricant orders is consistently competitive." },
    ],
  },
  {
    id: "CLNT-03",
    slug: "ntpc-vindhyachal",
    name: "Arvind Deshpande",
    designation: "Sr. Manager — Materials",
    companyName: "NTPC Vindhyachal",
    industry: "Thermal Power Generation",
    servingSince: "2021",
    logo: "https://placehold.co/120x120/7c2d12/ffffff?text=NV",
    url: "https://www.ntpc.co.in",
    details:
      "Annual rate contract covering calibrated torque tooling, lifting tackle with load-test certification, and Class-3 insulated electrical PPE for one of India's largest thermal power stations. All lifting equipment is supplied with EN-standard certificates and colour-coded SWL tagging per station safety protocol.",
    contact: { phone: "+91 98765 10003", email: "materials@ntpcvin.example.com" },
    social: { linkedin: "https://linkedin.com/company/ntpc", instagram: "", twitter: "" },
    gallery: ["https://placehold.co/480x300?text=Power+Station"],
    reviews: [
      { date: "2026-01-27", rating: 5, description: "Calibration certificates traceable to national standards supplied with every torque wrench. Exactly what a power plant audit demands." },
      { date: "2025-06-11", rating: 4, description: "Lifting tackle arrived with complete EN documentation. Delivery scheduling around our shutdown window was handled professionally." },
    ],
  },
  {
    id: "CLNT-04",
    slug: "jp-cement-rewa",
    name: "Sunita Agrawal",
    designation: "Purchase Officer",
    companyName: "JP Cement Works, Rewa",
    industry: "Cement Manufacturing",
    servingSince: "2023",
    logo: "https://placehold.co/120x120/065f46/ffffff?text=JP",
    url: "https://example.com/jp-cement",
    details:
      "Cement grinding unit sourcing industrial lubricants, hydraulic pump spares and maintenance chemicals. Requires MSDS documentation with every chemical consignment and sealed OEM packaging on all lubricant lines to guarantee against adulteration.",
    contact: { phone: "+91 98765 10004", email: "purchase@jpcement.example.com" },
    social: { linkedin: "https://linkedin.com/company/jp-cement", instagram: "https://instagram.com/jpcement", twitter: "" },
    gallery: [],
    reviews: [
      { date: "2026-03-02", rating: 5, description: "Shell and Mobil lines always arrive in sealed OEM packaging with batch numbers. Zero adulteration concerns since switching to SBS." },
    ],
  },
  {
    id: "CLNT-05",
    slug: "mp-infra-projects",
    name: "Imran Qureshi",
    designation: "Director — Site Operations",
    companyName: "MP Infra Projects Ltd",
    industry: "Roads & Bridge Construction",
    servingSince: "2024",
    logo: "https://placehold.co/120x120/581c87/ffffff?text=MP",
    url: "https://example.com/mp-infra",
    details:
      "Road and bridge construction contractor placing seasonal bulk orders for power tools, IS-marked safety helmets and Grade-A work boots across multiple site offices in Madhya Pradesh. Multi-site split deliveries coordinated against a single consolidated purchase order.",
    contact: { phone: "+91 98765 10005", email: "procure@mpinfra.example.com" },
    social: { linkedin: "https://linkedin.com/company/mpinfra", instagram: "https://instagram.com/mpinfra", twitter: "https://twitter.com/mpinfra" },
    gallery: ["https://placehold.co/480x300?text=Bridge+Site", "https://placehold.co/480x300?text=Site+Office"],
    reviews: [
      { date: "2025-12-29", rating: 4, description: "Multi-site delivery across four locations handled against one PO without a single mix-up. Helmets passed our safety audit first time." },
      { date: "2025-08-14", rating: 4, description: "Good bulk pricing on Bosch and DeWalt lines. Would like faster quote turnaround during peak season, but quality is reliable." },
    ],
  },
];

/* ============================ HELPERS ===================================== */
const fallbackImg = (e) => {
  e.currentTarget.src = "https://placehold.co/120x120/f1f5f9/94a3b8?text=Logo";
};

const isImageUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s);

const avgRatingOf = (client) => {
  const r = client.reviews || [];
  if (!r.length) return null;
  return (r.reduce((s, x) => s + x.rating, 0) / r.length).toFixed(1);
};

const Stars = ({ rating, size = "text-xs" }) => (
  <span className={`${size} leading-none`} aria-label={`${rating} out of 5`}>
    <span className="text-amber-400">{"★".repeat(Math.round(rating))}</span>
    <span className="text-slate-200">{"★".repeat(5 - Math.round(rating))}</span>
  </span>
);

const Logo = ({ client, sizeClass = "w-16 h-16", textSize = "text-3xl" }) =>
  isImageUrl(client.logo) ? (
    <img src={client.logo} alt={`${client.companyName} logo`} onError={fallbackImg}
      className={`${sizeClass} rounded-2xl object-cover border border-slate-200 shrink-0`} />
  ) : (
    <span className={`${sizeClass} ${textSize} flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl shrink-0`}>
      {client.logo || "🏢"}
    </span>
  );

/* ============================ PAGE ======================================== */
export default function PublicClientsDirectoryPage() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(CLIENTS.map((c) => c.industry).filter(Boolean)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLIENTS.filter((c) => {
      const matchesQuery =
        !q ||
        c.companyName?.toLowerCase().includes(q) ||
        c.name?.toLowerCase().includes(q) ||
        c.industry?.toLowerCase().includes(q);
      const matchesIndustry = industry === "All" || c.industry === industry;
      return matchesQuery && matchesIndustry;
    });
  }, [query, industry]);

  const currentYear = new Date().getFullYear();
  const SHOW = PAGE_CONFIG.show;

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 antialiased">

      {/* ==================== HERO HEADER ==================== */}
      <div className="bg-white border-b border-slate-200">
        <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-8 md:py-10`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="max-w-2xl">
              <span className="text-xs font-black text-blue-950 uppercase tracking-widest">Enterprise Trust</span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Our Valued Corporate Alliances
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
                The industrial enterprises across power, mining, cement and infrastructure
                that rely on SBS Groups for certified supply, documented quality and
                on-time site delivery.
              </p>
            </div>

            {/* trust stats strip */}
            <div className="flex gap-3 shrink-0">
              {[
                [CLIENTS.length, "Active Clients"],
                [`${currentYear - Math.min(...CLIENTS.map((c) => Number(c.servingSince) || currentYear))}+`, "Years Serving"],
                [
                  (CLIENTS.flatMap((c) => c.reviews || []).reduce((s, r) => s + r.rating, 0) /
                    Math.max(1, CLIENTS.flatMap((c) => c.reviews || []).length)).toFixed(1),
                  "Avg. Rating",
                ],
              ].map(([value, label]) => (
                <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center">
                  <p className="text-lg font-black text-blue-950 leading-none">{value}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* search + industry filter */}
          {(SHOW.search || SHOW.industryFilter) && (
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              {SHOW.search && (
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by company, contact person or sector..."
                    className="w-full text-xs font-medium pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 focus:bg-white transition-colors"
                  />
                </div>
              )}
              {SHOW.industryFilter && (
                <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`whitespace-nowrap text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-xl border transition-colors ${
                        industry === ind
                          ? "bg-blue-950 text-white border-blue-950"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ==================== CLIENT CARDS GRID ==================== */}
      <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-8 md:py-10`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4 opacity-30">🔍</span>
            <h3 className="text-lg font-black text-slate-900">No clients match your search</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Try a different keyword or clear the sector filter.</p>
            <button
              onClick={() => { setQuery(""); setIndustry("All"); }}
              className="mt-5 text-[10px] font-black uppercase tracking-wider text-blue-950 border border-blue-950 px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              ✕ Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${PAGE_CONFIG.layout.gridCols} gap-5 md:gap-6`}>
            {filtered.map((client) => {
              const rating = avgRatingOf(client);
              const tenure = client.servingSince ? `${currentYear - Number(client.servingSince)} Yrs` : null;
              const brief =
                client.details && client.details.length > PAGE_CONFIG.description.maxChars
                  ? client.details.slice(0, PAGE_CONFIG.description.maxChars).trimEnd() + "…"
                  : client.details;

              return (
                <div key={client.id} className={`${cardClass()} flex flex-col justify-between transition-all hover:border-blue-900/40 group`}>
                  <div className="space-y-4">
                    {/* top row: logo + id/tenure */}
                    <div className="flex justify-between items-start gap-3">
                      <Logo client={client} />
                      <div className="text-right space-y-1.5">
                        <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded tracking-wider block w-fit ml-auto">
                          {client.id}
                        </span>
                        {SHOW.tenure && tenure && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md block w-fit ml-auto">
                            ⏳ Partner {tenure}
                          </span>
                        )}
                        {SHOW.rating && rating && (
                          <span className="flex items-center justify-end gap-1.5">
                            <Stars rating={Number(rating)} />
                            <span className="text-[10px] font-black text-slate-700">{rating}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* identity */}
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight leading-snug">
                        {client.companyName}
                      </h3>
                      {client.industry && (
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                          {client.industry}
                        </p>
                      )}
                      {client.name && (
                        <p className="text-[11px] text-slate-500 font-semibold">
                          👤 {client.name}{client.designation ? ` · ${client.designation}` : ""}
                        </p>
                      )}
                    </div>

                    {/* brief description */}
                    {brief && (
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{brief}</p>
                    )}

                    {/* gallery preview (optional via config) */}
                    {SHOW.gallery && client.gallery?.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                        {client.gallery.slice(0, 3).map((g, i) => (
                          <img key={i} src={g} alt={`${client.companyName} ${i + 1}`} onError={fallbackImg}
                            className="h-14 rounded-lg object-cover border border-slate-200 shrink-0" />
                        ))}
                      </div>
                    )}

                    {/* quick contacts + socials */}
                    <div className="flex flex-wrap gap-1.5">
                      {SHOW.contactQuickActions && client.contact?.phone && (
                        <a href={`tel:${client.contact.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:border-blue-300 transition-colors">
                          📞 Call
                        </a>
                      )}
                      {SHOW.contactQuickActions && client.contact?.email && (
                        <a href={`mailto:${client.contact.email}`}
                          className="text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:border-blue-300 transition-colors">
                          ✉️ Email
                        </a>
                      )}
                      {SHOW.socials && client.social?.linkedin && (
                        <a href={client.social.linkedin} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors">in</a>
                      )}
                      {SHOW.socials && client.social?.instagram && (
                        <a href={client.social.instagram} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-pink-700 bg-pink-50 border border-pink-100 px-2 py-1 rounded-md hover:bg-pink-100 transition-colors">◎</a>
                      )}
                      {SHOW.socials && client.social?.twitter && (
                        <a href={client.social.twitter} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-200 transition-colors">𝕏</a>
                      )}
                      {client.url && (
                        <a href={client.url} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:border-slate-400 transition-colors">🌐 Web</a>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 mt-5 border-t border-slate-100">
                    <Link
                      href={`/clients/${client.slug}`}
                      className="w-full block text-center text-[10px] font-black uppercase bg-slate-900 text-white py-3 rounded-xl tracking-wider hover:bg-blue-950 shadow-sm transition-colors"
                    >
                      View Alliance Profile ➔
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 9px; }
      `}</style>
    </div>
  );
}