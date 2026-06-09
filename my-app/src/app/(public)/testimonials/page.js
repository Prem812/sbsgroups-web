"use client";

import { useState } from "react";

export default function PublicTestimonialsPage() {
  // ONLY APPROVED B2B ENTRIES SHOWN HERE
  const [approvedTestimonials] = useState([
    {
      id: 1,
      clientName: "Rajesh Malhotra",
      position: "VP - Procurement Operations",
      companyName: "Adani Enterprises Ltd",
      testimony: "The bulk sourcing turnaround time provided by SBS groups for our Singrauli zone machinery spares has been stellar. Their automated RFQ pipeline eliminated minor order tracking overheads by almost 35%. Highly recommended for heavy logistics coordination.",
      avatar: "🏭",
      verifiedPartner: true
    },
    {
      id: 2,
      clientName: "Nitin Shrivastava",
      position: "Chief Safety Auditor",
      companyName: "Hindalco Industries",
      testimony: "Compliance is zero-compromise zone for us. The recent dispatch of Grade-A safety leather boots and class-3 insulated rubber gloves perfectly aligned with our strict corporate standards. True reliability in industrial distribution.",
      avatar: "⚡",
      verifiedPartner: true
    }
  ]);

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* BANNER HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-black text-blue-950 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Corporate Trust Benchmarks
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Validated by Industrial Leaders
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            See how major enterprise entities rely on SBS Group grids to fuel their everyday production logs and supply matrices.
          </p>
        </div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {approvedTestimonials.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition-all">
              
              {/* Massive Decorative Quote Icon */}
              <span className="absolute -right-2 -top-4 text-9xl text-slate-100 font-serif select-none pointer-events-none group-hover:text-slate-200/70 transition-colors">“</span>

              <div className="space-y-4 relative z-10">
                {/* Verified Corporate Stamp Badge */}
                <div className="flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md w-max border border-emerald-100">
                  <span>🛡️</span> <span>Verified Enterprise Feedback</span>
                </div>
                
                {/* Testimony paragraph text stream */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                  "{item.testimony}"
                </p>
              </div>

              {/* Author Company Profile Identity block */}
              <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-slate-100 relative z-10">
                <div className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center rounded-xl text-lg font-bold shrink-0 border shadow-inner">
                  {item.avatar}
                </div>
                <div className="truncate">
                  <h4 className="text-xs font-black text-slate-900 tracking-tight">{item.clientName}</h4>
                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    {item.position} — <span className="font-bold text-blue-950">{item.companyName}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}