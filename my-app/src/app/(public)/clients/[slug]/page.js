"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PublicClientDynamicProfileView() {
  const params = useParams();

  // DUMMY FULL PROFILE MATRIX LINKED FOR TARGETED LOOKUPS
  const [clientProfile] = useState({
    companyName: "Adani Enterprises Ltd",
    slug: params.slug,
    industry: "Mining & Heavy Infrastructure",
    servingSince: "April 2020",
    totalTenure: "6 Years Productive Engagement",
    authorizedSignatory: "Rajesh Malhotra (VP - Procurement Operations)",
    logo: "🏭",
    
    // 🛡️ VERIFIED TESTIMONIAL INNER PROPERTY NODE
    testimonyDetails: {
      text: "The bulk sourcing turnaround time provided by SBS groups for our Singrauli zone machinery spares has been stellar. Their automated RFQ pipeline eliminated minor order tracking overheads by almost 35%. Highly recommended for heavy logistics coordination.",
      verifiedBadge: true
    },

    // 📦 MAPPED ACTIVE PRODUCTS CURRENTLY BEING SUPPLIED
    suppliedProducts: [
      { id: "SKU-9021", name: "High-Tensile Steel Crusher Plates 40mm", category: "Machinery Spares", spec: "Grade-600 Manganese Steel" },
      { id: "SKU-3120", name: "Heavy Duty Vulcanized Conveyor Belt V-22", category: "Logistics Spares", spec: "Fire resistant, 4-Ply structure" },
      { id: "SKU-7741", name: "Industrial Safety Gear Packs (Grade A)", category: "Site Safety", spec: "Steel-toe protection matrices" }
    ]
  });

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* BACK NAVIGATION ACTION BAR */}
        <Link href="/clients" className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors">
          ⬅️ Back to Global Client Network Directory
        </Link>

        {/* HERO CANVAS HEADER METADATA SHAPE */}
        <div className="bg-white border p-6 md:p-8 rounded-3xl shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <span className="text-5xl p-4 bg-slate-50 border rounded-2xl shrink-0">{clientProfile.logo}</span>
            <div className="space-y-1 w-full">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{clientProfile.companyName}</h1>
              <p className="text-xs text-blue-900 font-bold uppercase tracking-wider">{clientProfile.industry}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2 text-[10px] font-mono text-slate-400 font-bold">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">📅 Client Since: {clientProfile.servingSince}</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">⏱️ Account Life: {clientProfile.totalTenure}</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTEGRATED TRUST SEGMENT: VERIFIED TESTIMONIAL LOG ENTRY */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
          <span className="absolute right-4 -top-8 text-[12rem] text-slate-800/40 font-serif font-black select-none pointer-events-none">“</span>
          
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-900/60 px-3 py-1 rounded-full w-max relative z-10">
            <span>🛡️</span> <span>Verified Enterprise Feedback Statement</span>
          </div>

          <p className="text-xs md:text-sm font-medium italic text-slate-200 leading-relaxed relative z-10">
            "{clientProfile.testimonyDetails.text}"
          </p>

          <div className="border-t border-slate-800 pt-4 mt-2 relative z-10">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Authorized Endorsement Profile</p>
            <p className="text-xs font-bold text-slate-100 mt-0.5">{clientProfile.authorizedSignatory}</p>
          </div>
        </div>

        {/* LIVE SUPPLY TRACK INVENTORY: DYNAMIC PRODUCTS GRID LOOKUP */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Current Supply Inventory Matrix</h3>
            <p className="text-[11px] text-slate-400 font-medium">Standard material assets regularly purchased and delivered to this operational node.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {clientProfile.suppliedProducts.map((product) => (
              <div key={product.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:border-slate-400 transition-colors">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded">{product.id}</span>
                    <span className="text-[9px] font-black uppercase text-blue-900 tracking-tight bg-blue-50 px-2 py-0.5 rounded">{product.category}</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900 tracking-tight leading-snug">{product.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium leading-normal italic">Spec: {product.spec}</p>
                </div>
                
                <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] font-black text-emerald-600 uppercase tracking-wider">
                  <span>● Active Contract</span>
                  <span>📦 Live</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}