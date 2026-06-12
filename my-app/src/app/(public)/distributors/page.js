"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ============================ DYNAMIC CONFIG ============================== */
const PAGE_CONFIG = {
  layout: { container: "max-w-6xl", gridCols: "md:grid-cols-2 xl:grid-cols-3" },
  card: { variant: "elevated", radius: "xl", padding: "md" },
  description: { maxChars: 130 },          // Brief description truncation on cards
  show: {
    search: true,
    regionFilter: true,
    rating: true,                          // Avg star rating chip on card
    experience: true,                      // "Authorized since" chip
    contactQuickActions: true,             // Phone/email mini buttons
    socials: true,
    gallery: false,                        // Gallery preview strip on cards
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

export const DISTRIBUTORS = [
  {
    id: "DIST-01",
    slug: "vanguard-industrial-spares",
    name: "Amit Sharma",                       // Contact person
    designation: "Managing Partner",
    companyName: "Vanguard Industrial Spares",
    region: "Singrauli Zone",
    establishedIn: "2018",
    logo: "https://placehold.co/120x120/0f172a/38bdf8?text=VIS",
    url: "https://example.com/vanguard-spares",
    details:
      "Authorized channel partner distributing premium heavy-machinery spares, high-tensile fasteners, and conveyor belt components. Operating a 5,000 sq.ft. central warehouse in Singrauli, providing 24/7 emergency dispatch support to local mining cells and power plants with full OEM warranties.",
    contact: { phone: "+91 98765 20001", email: "sales@vanguardspares.example.com" },
    social: {
      linkedin: "https://linkedin.com/company/vanguard-spares",
      instagram: "",
      twitter: "https://twitter.com/vanguardspares",
    },
    gallery: [
      "https://placehold.co/480x300?text=Singrauli+Warehouse",
      "https://placehold.co/480x300?text=Inventory+Stock",
    ],
    reviews: [
      { date: "2026-05-10", rating: 5, description: "Excellent stock availability for heavy conveyor spares. Vanguard has optimized our emergency breakdown response significantly." },
      { date: "2026-01-15", rating: 4, description: "Reliable logistics and transparent billing. Their technical team helped us identify the exact replacement part numbers." },
    ],
  },
  {
    id: "DIST-02",
    slug: "apex-hydraulics-lubricants",
    name: "Karan Johar",
    designation: "Director - Distribution",
    companyName: "Apex Hydraulics & Lubricants",
    region: "Rewa Region",
    establishedIn: "2021",
    logo: "https://placehold.co/120x120/1e3a8a/38bdf8?text=AHL",
    url: "https://example.com/apex-hydraulics",
    details:
      "Specialized distributor for high-pressure industrial hydraulic systems, pneumatic valves, and premium brand lubricants. Maintains ready stock of sealed OEM chemical lines and provides on-site filtration system testing audits.",
    contact: { phone: "+91 98765 20002", email: "karan@apexhydraulics.example.com" },
    social: {
      linkedin: "https://linkedin.com/company/apex-hydraulics",
      instagram: "https://instagram.com/apexhydraulics",
      twitter: "",
    },
    gallery: ["https://placehold.co/480x300?text=Hydraulics+Testing+Lab"],
    reviews: [
      { date: "2026-03-22", rating: 5, description: "Authentic Mobil and Shell lubricants delivered in tamper-proof packaging. Always dependable." },
    ],
  },
  {
    id: "DIST-03",
    slug: "satpura-safety-solutions",
    name: "Nisha Mandloi",
    designation: "Operations Head",
    companyName: "Satpura Safety Solutions",
    region: "Vindhyan Nagar",
    establishedIn: "2019",
    logo: "https://placehold.co/120x120/7c2d12/38bdf8?text=SSS",
    url: "https://example.com/satpura-safety",
    details:
      "Leading regional supplier of industrial safety gear, CE-certified PPE, electrical insulated gloves, and height-safety lifting equipment. Fully aligned with power plant and heavy plant standard protocols.",
    contact: { phone: "+91 98765 20003", email: "info@satpurasafety.example.com" },
    social: { linkedin: "https://linkedin.com/company/satpura-safety", instagram: "", twitter: "" },
    gallery: [],
    reviews: [
      { date: "2026-04-05", rating: 5, description: "Top notch supply of Class-3 insulated gloves and site safety helmets. All compliance paperwork is provided upfront." },
      { date: "2025-11-12", rating: 4, description: "Good pricing on bulk PPE orders. Coordinated multi-site deliveries efficiently." },
    ],
  },
];

/* ============================ HELPERS ===================================== */
const fallbackImg = (e) => {
  e.currentTarget.src = "https://placehold.co/120x120/f1f5f9/94a3b8?text=Logo";
};

const isImageUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s);

const avgRatingOf = (distributor) => {
  const r = distributor.reviews || [];
  if (!r.length) return null;
  return (r.reduce((s, x) => s + x.rating, 0) / r.length).toFixed(1);
};

const Stars = ({ rating, size = "text-xs" }) => (
  <span className={`${size} leading-none`} aria-label={`${rating} out of 5`}>
    <span className="text-sky-500">{"★".repeat(Math.round(rating))}</span>
    <span className="text-slate-200">{"★".repeat(5 - Math.round(rating))}</span>
  </span>
);

const Logo = ({ distributor, sizeClass = "w-16 h-16", textSize = "text-3xl" }) =>
  isImageUrl(distributor.logo) ? (
    <img src={distributor.logo} alt={`${distributor.companyName} logo`} onError={fallbackImg}
      className={`${sizeClass} rounded-2xl object-cover border border-slate-200 shrink-0`} />
  ) : (
    <span className={`${sizeClass} ${textSize} flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl shrink-0`}>
      {distributor.logo || "🏢"}
    </span>
  );

/* ============================ PAGE ======================================== */
export default function PublicDistributorsDirectoryPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(DISTRIBUTORS.map((d) => d.region).filter(Boolean)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DISTRIBUTORS.filter((d) => {
      const matchesQuery =
        !q ||
        d.companyName?.toLowerCase().includes(q) ||
        d.name?.toLowerCase().includes(q) ||
        d.region?.toLowerCase().includes(q);
      const matchesRegion = region === "All" || d.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [query, region]);

  const currentYear = new Date().getFullYear();
  const SHOW = PAGE_CONFIG.show;

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 antialiased">

      {/* ==================== HERO HEADER ==================== */}
      <div className="bg-white border-b border-slate-200">
        <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-8 md:py-10`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="max-w-2xl">
              <span className="text-xs font-black text-sky-950 uppercase tracking-widest">Supply Network</span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Authorized Distribution Partners
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
                Connect with our certified regional distributors for ready industrial stock, genuine OEM parts, 
                and localized emergency delivery across hubs.
              </p>
            </div>

            {/* network stats strip */}
            <div className="flex gap-3 shrink-0">
              {[
                [DISTRIBUTORS.length, "Distributors"],
                [`${currentYear - Math.min(...DISTRIBUTORS.map((d) => Number(d.establishedIn) || currentYear))}+`, "Yrs Network Exp"],
                [
                  (DISTRIBUTORS.flatMap((d) => d.reviews || []).reduce((s, r) => s + r.rating, 0) /
                    Math.max(1, DISTRIBUTORS.flatMap((d) => d.reviews || []).length)).toFixed(1),
                  "Avg Rating",
                ],
              ].map(([value, label]) => (
                <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center">
                  <p className="text-lg font-black text-sky-950 leading-none">{value}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* search + region filter */}
          {(SHOW.search || SHOW.regionFilter) && (
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              {SHOW.search && (
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by hub, dealer name or region..."
                    className="w-full text-xs font-medium pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-sky-950 focus:bg-white transition-colors"
                  />
                </div>
              )}
              {SHOW.regionFilter && (
                <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setRegion(reg)}
                      className={`whitespace-nowrap text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-xl border transition-colors ${
                        region === reg
                          ? "bg-sky-950 text-white border-sky-950"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ==================== DISTRIBUTOR CARDS GRID ==================== */}
      <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-8 md:py-10`}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4 opacity-30">🔍</span>
            <h3 className="text-lg font-black text-slate-900">No distributors found</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Try a different keyword or change the region filter.</p>
            <button
              onClick={() => { setQuery(""); setRegion("All"); }}
              className="mt-5 text-[10px] font-black uppercase tracking-wider text-sky-950 border border-sky-950 px-5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors"
            >
              ✕ Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${PAGE_CONFIG.layout.gridCols} gap-5 md:gap-6`}>
            {filtered.map((distributor) => {
              const rating = avgRatingOf(distributor);
              const experience = distributor.establishedIn ? `${currentYear - Number(distributor.establishedIn)} Yrs` : null;
              const brief =
                distributor.details && distributor.details.length > PAGE_CONFIG.description.maxChars
                  ? distributor.details.slice(0, PAGE_CONFIG.description.maxChars).trimEnd() + "…"
                  : distributor.details;

              return (
                <div key={distributor.id} className={`${cardClass()} flex flex-col justify-between transition-all hover:border-sky-900/40 group`}>
                  <div className="space-y-4">
                    {/* top row: logo + id/experience */}
                    <div className="flex justify-between items-start gap-3">
                      <Logo distributor={distributor} />
                      <div className="text-right space-y-1.5">
                        <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded tracking-wider block w-fit ml-auto">
                          {distributor.id}
                        </span>
                        {SHOW.experience && experience && (
                          <span className="text-[10px] font-black text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-md block w-fit ml-auto">
                            🛡️ Certified {experience}
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
                      <h3 className="text-base font-black text-slate-900 group-hover:text-sky-900 transition-colors tracking-tight leading-snug">
                        {distributor.companyName}
                      </h3>
                      {distributor.region && (
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                          📍 {distributor.region}
                        </p>
                      )}
                      {distributor.name && (
                        <p className="text-[11px] text-slate-500 font-semibold">
                          👤 {distributor.name}{distributor.designation ? ` · ${distributor.designation}` : ""}
                        </p>
                      )}
                    </div>

                    {/* brief description */}
                    {brief && (
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{brief}</p>
                    )}

                    {/* quick contacts + socials */}
                    <div className="flex flex-wrap gap-1.5">
                      {SHOW.contactQuickActions && distributor.contact?.phone && (
                        <a href={`tel:${distributor.contact.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:border-sky-300 transition-colors">
                          📞 Call
                        </a>
                      )}
                      {SHOW.contactQuickActions && distributor.contact?.email && (
                        <a href={`mailto:${distributor.contact.email}`}
                          className="text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:border-sky-300 transition-colors">
                          ✉️ Email
                        </a>
                      )}
                      {SHOW.socials && distributor.social?.linkedin && (
                        <a href={distributor.social.linkedin} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-sky-700 bg-sky-50 border border-sky-100 px-2 py-1 rounded-md hover:bg-sky-100 transition-colors">in</a>
                      )}
                      {SHOW.socials && distributor.social?.instagram && (
                        <a href={distributor.social.instagram} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-pink-700 bg-pink-50 border border-pink-100 px-2 py-1 rounded-md hover:bg-pink-100 transition-colors">◎</a>
                      )}
                      {SHOW.socials && distributor.social?.twitter && (
                        <a href={distributor.social.twitter} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-200 transition-colors">𝕏</a>
                      )}
                      {distributor.url && (
                        <a href={distributor.url} target="_blank" rel="noopener noreferrer"
                          className="text-[9px] font-black text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:border-slate-400 transition-colors">🌐 Web</a>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 mt-5 border-t border-slate-100">
                    <Link
                      href={`/distributors/${distributor.slug}`}
                      className="w-full block text-center text-[10px] font-black uppercase bg-slate-900 text-white py-3 rounded-xl tracking-wider hover:bg-sky-950 shadow-sm transition-colors"
                    >
                      View Partner Profile ➔
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