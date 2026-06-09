"use client";

import { useState } from "react";
import Link from "next/link";

export default function PublicClientsDirectoryPage() {
  // MASTER DUMMY CLIENT RECORDS WITH SERVICE TENURE TRACKS
  const [clients] = useState([
    {
      id: "CLNT-01",
      companyName: "Adani Enterprises Ltd",
      slug: "adani-enterprises",
      industry: "Mining & Heavy Infrastructure",
      servingSince: "2020",
      totalYears: "6 Years",
      logo: "🏭",
      briefDescription: "Collaborating across multiple open-cast mining cells in Singrauli for strategic distribution of high-tensile parts."
    },
    {
      id: "CLNT-02",
      companyName: "Hindalco Industries",
      slug: "hindalco-industries",
      industry: "Metallurgy & Aluminum Refineries",
      servingSince: "2022",
      totalYears: "4 Years",
      logo: "⚡",
      briefDescription: "Core strategic supplier for high-pressure industrial line hydraulics and safety audit equipment lines."
    }
  ]);

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* BANNER LAYOUT STRIP */}
        <div className="border-b border-slate-200 pb-5 max-w-2xl">
          <span className="text-xs font-black text-blue-950 uppercase tracking-widest">Enterprise Trust</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Our Valued Corporate Alliances</h1>
          <p className="text-xs text-slate-500 font-medium">Review the industrial heavyweights leveraging SBS systems to keep field production lines running with zero latency overhead logs.</p>
        </div>

        {/* CLIENT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-blue-950 hover:shadow-md transition-all group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-4xl p-3 bg-slate-50 group-hover:bg-blue-50 border rounded-2xl transition-all">{client.logo}</span>
                  <div className="text-right">
                    <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded tracking-wider block">{client.id}</span>
                    <span className="text-[10px] font-bold text-emerald-700 block mt-1">⏳ Partners: {client.totalYears}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight">{client.companyName}</h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Sector: {client.industry}</p>
                </div>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {client.briefDescription}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100">
                <Link 
                  href={`/clients/${client.slug}`}
                  className="w-full block text-center text-[10px] font-black uppercase bg-slate-900 text-white py-2.5 rounded-xl tracking-wider hover:bg-slate-800 shadow-sm transition-colors"
                >
                  View Alliance Profile Details ➔
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}