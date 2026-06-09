"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function PublicBrandDynamicProfilePage() {
  const params = useParams();

  // HIGHLY RICH RECIPIENT SCHEMA BLOCK DATA ROW (Simulating database row matching parameters)
  const [brandProfile] = useState({
    name: "SBS Heavy Machinery Spares",
    slug: params.slug,
    tagline: "Precision Engineering for Extreme Mining Operations",
    vision: "To completely digitize structural sourcing grids for public-sector mine operators, guaranteeing zero component failure downtime lines.",
    mission: "Deploying certified high-tensile metallurgical polymers across heavy processing plants via rigorous automated auditing tracks.",
    
    // Core Executives Board Profile
    leadership: [
      { name: "G.K. Jaiswal", role: "Co-Founder & Metallurgical Lead", avatar: "👨‍💼" },
      { name: "A.K. Srivastava", role: "Managing Director & Operations Head", avatar: "👨‍💻" }
    ],

    // Global Corporate Sourcing Alliances
    partners: ["Adani Enterprises Mining", "NCL Singrauli Depots", "Hindalco Metal Logistics"],

    // Interactive Media Gallery Streams array data
    gallery: [
      { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500", caption: "Heavy Casting Hydraulic Lathe Grids" },
      { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=500", caption: "On-Site Component Delivery Audits Singrauli" },
      { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500", caption: "High-Tensile Conveyor Testing Protocols" }
    ]
  });

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER BRAND HERO SPLIT SUMMARY */}
        <div className="bg-white border p-6 md:p-8 rounded-3xl shadow-sm space-y-2 relative overflow-hidden">
          <span className="text-[9px] font-black uppercase text-blue-900 tracking-widest bg-blue-50 px-2.5 py-0.5 rounded">Active Vertical Node</span>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-1">{brandProfile.name}</h1>
          <p className="text-xs text-slate-500 font-bold italic">"{brandProfile.tagline}"</p>
          <div className="pt-2 text-[10px] font-mono text-slate-400 font-semibold uppercase">Mapping Route: /brands/{brandProfile.slug}</div>
        </div>

        {/* MISSION & VISION TWIN SHAPE BLOCKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <h3 className="text-[11px] font-black text-blue-900 uppercase tracking-wider">🎯 Core Operational Vision</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{brandProfile.vision}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <h3 className="text-[11px] font-black text-emerald-800 uppercase tracking-wider">🚀 Execution Mission Manifesto</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{brandProfile.mission}</p>
          </div>
        </div>

        {/* EXECUTIVE LEADERSHIP STRUCTURE BLOCK ROW */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b pb-2">Founding Board & Core Leadership</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brandProfile.leadership.map((lead, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl flex items-center space-x-3 border border-slate-100">
                <span className="text-2xl p-2 bg-white border rounded-xl shadow-inner">{lead.avatar}</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900">{lead.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{lead.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ENTERPRISE ALLIANCES NETWORKS GRID */}
        <div className="bg-white p-5 rounded-3xl border shadow-sm space-y-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Trusted Operational Partners</h3>
          <div className="flex flex-wrap gap-2">
            {brandProfile.partners.map((p, idx) => (
              <span key={idx} className="text-[10px] font-black uppercase text-slate-600 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                🏢 {p}
              </span>
            ))}
          </div>
        </div>

        {/* MULTI-MEDIA FIELD WORK GALLERY IMAGES TRACK */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Dynamic Industrial Field Work Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {brandProfile.gallery.map((img, idx) => (
              <div key={idx} className="bg-white p-3 rounded-2xl border shadow-sm space-y-2 group hover:border-slate-400 transition-colors">
                <img src={img.url} alt={img.caption} className="w-full h-36 object-cover rounded-xl border" />
                <p className="text-[10px] font-bold text-slate-400 text-center italic truncate">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}