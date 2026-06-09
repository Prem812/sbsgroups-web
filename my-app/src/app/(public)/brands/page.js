"use client";

import { useState } from "react";
import Link from "next/link";

export default function PublicBrandsDirectoryPage() {
  // DUMMY REPOSITORY FOR MASTER SUBSIDIARY BRANDS 
  const [brands] = useState([
    {
      id: "BRND-01",
      name: "SBS Heavy Machinery Spares",
      slug: "sbs-heavy-machinery-spares",
      tagline: "Precision Engineering for Extreme Mining Operations",
      logo: "🧱",
      summary: "Primary distribution line handling high-tensile crusher plates, automated conveyor tracks, and customized hydraulic components for Singrauli zone heavy fields."
    },
    {
      id: "BRND-02",
      name: "SBS Techno-Logistics Systems",
      slug: "sbs-techno-logistics-systems",
      tagline: "Automating B2B Supply Dispatches & Warehousing Flow",
      logo: "🚚",
      summary: "Next-gen routing logistics wing specialized in automated picking tracking setups, fuel monitoring algorithms, and instant site dispatch operations logs."
    }
  ]);

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* BANNER GRID HEADER */}
        <div className="border-b border-slate-200 pb-5 max-w-2xl">
          <span className="text-xs font-black text-blue-950 uppercase tracking-widest">Subsidiary Architecture</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">The SBS Brands Umbrella</h1>
          <p className="text-xs text-slate-500 font-medium">Explore our targeted industrial verticals, each engineered independently to streamline high-output heavy supply matrices.</p>
        </div>

        {/* BRANDS LIST MATRIX CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-400 hover:shadow-md transition-all group">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-4xl p-3 bg-slate-50 group-hover:bg-blue-50 border rounded-2xl transition-all">{brand.logo}</span>
                  <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded tracking-wider">{brand.id}</span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight">{brand.name}</h3>
                  <p className="text-xs text-blue-950/80 font-bold italic tracking-tight">{brand.tagline}</p>
                </div>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {brand.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link 
                  href={`/brands/${brand.slug}`}
                  className="w-full block text-center text-[10px] font-black uppercase bg-slate-900 text-white py-2.5 rounded-xl tracking-wider hover:bg-slate-800 shadow-sm transition-colors"
                >
                  Explore Brand Profile & Catalog ➔
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}