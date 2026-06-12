"use client";

import { useState } from "react";
import CorporateJourney from "@/components/CorporateJourney";

export default function PublicAboutUsCompleteHub() {
  // SIMULATING ENTIRE DATA BUNDLE FETCHED DYNAMICALLY FROM ADMIN CMS SETUPS
  const [aboutCmsConfig] = useState({
    // 👥 Active Team display records
    team: [
      { name: "Rahul Jaiswal", designation: "Chief Operating Officer", avatar: "👨‍💻" },
      { name: "Suresh Pandey", designation: "Lead Metallurgical Auditor", avatar: "👨‍🔧" }
    ],
    // 📊 Milestone counter logs
    metrics: { globalClients: "140+", activeProducts: "1,250+", authorizedDistributors: "18+ Nodes" },
    // 🎯 Corporate statements
    vision: "To be the absolute structural benchmark in industrial spare supply chains across Central India mining corridors.",
    mission: "Eliminating supply latencies by delivering precision metallurgical equipment using dynamic tracking frameworks.",
    // 💎 Values index blocks
    coreValues: [
      { title: "Metallurgical Absolute Integrity", desc: "No material compromise; zero failure tolerances." },
      { title: "Operational Execution Speed", desc: "Deploying inventory dispatches within explicit 24-hour delivery target metrics." }
    ],
    // ⭐ TESTIMONIALS DATA INTEGRATION HOOK
    testimonials: [
      { client: "NCL Sourcing Depot", feedback: "SBS pipeline delivery turnarounds optimized our excavator maintenance cycle logs by 35% instantly." }
    ]
  });

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* TOP SEGMENT: LEADERSHIP MESSAGES (Previously configured via tokens) */}
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-black text-blue-950 uppercase tracking-widest">Enterprise Profile</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Corporate Heritage & Command Systems</h1>
        </div>

        {/* --- 👤 NEW ATTACHMENT NODE: OUR TEAM ROSTER GRID --- */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-black uppercase text-slate-400 tracking-widest">Corporate Operational Team Desk</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">The structural engineering hands pushing procurement workflows forward.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aboutCmsConfig.team.map((member, idx) => (
              <div key={idx} className="bg-white p-4 border rounded-2xl shadow-sm text-center space-y-2 hover:border-slate-900 transition-all">
                <span className="text-3xl bg-slate-50 p-2 rounded-xl block w-fit mx-auto border">{member.avatar}</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900">{member.name}</h4>
                  <p className="text-[10px] text-blue-900 font-bold uppercase tracking-tight">{member.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 📊 NEW ATTACHMENT NODE: CORE MILESTONE COUNTERS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
          <div className="p-4 border border-slate-800 bg-slate-950/40 rounded-2xl text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">Institutional Clients Network</span>
            <h2 className="text-2xl font-mono font-black tracking-tight text-white">{aboutCmsConfig.metrics.globalClients}</h2>
          </div>
          <div className="p-4 border border-slate-800 bg-slate-950/40 rounded-2xl text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">Active Components Directory</span>
            <h2 className="text-2xl font-mono font-black tracking-tight text-white">{aboutCmsConfig.metrics.activeProducts}</h2>
          </div>
          <div className="p-4 border border-slate-800 bg-slate-950/40 rounded-2xl text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">Authorized Distribution Depots</span>
            <h2 className="text-2xl font-mono font-black tracking-tight text-white">{aboutCmsConfig.metrics.authorizedDistributors}</h2>
          </div>
        </div>

        {/* --- 🎯 NEW ATTACHMENT NODE: STRATEGIC VISION & MISSION SHIELDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-3xl border border-blue-900/40 shadow-md space-y-2">
            <span className="text-[9px] font-mono font-black bg-blue-900 text-blue-100 px-2 py-0.5 rounded uppercase tracking-wider">The North Star</span>
            <h3 className="text-xs font-black uppercase text-slate-100 tracking-wider">Strategic Long-Term Vision</h3>
            <p className="text-xs font-medium text-slate-300 leading-relaxed italic">"{aboutCmsConfig.vision}"</p>
          </div>
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-2">
            <span className="text-[9px] font-mono font-black bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase tracking-wider">The Core Objective</span>
            <h3 className="text-xs font-black uppercase text-slate-100 tracking-wider">Active Execution Mission</h3>
            <p className="text-xs font-medium text-slate-300 leading-relaxed italic">"{aboutCmsConfig.mission}"</p>
          </div>
        </div>

        {/* --- 💎 NEW ATTACHMENT NODE: CORE VALUES ANCHORS --- */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Our Pillars of Governance</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutCmsConfig.coreValues.map((value, idx) => (
              <div key={idx} className="bg-white border p-5 rounded-2xl shadow-sm space-y-1.5 hover:border-slate-400 transition-colors">
                <span className="text-xs font-mono font-bold text-slate-400 block">0{idx + 1} // Value Pillar</span>
                <h4 className="text-xs font-black text-slate-900">{value.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <CorporateJourney />

        {/* --- ⭐ NEW ATTACHMENT NODE: DYNAMIC SYNCHRONIZED TESTIMONIALS STRIP --- */}
        <div className="bg-white border p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">Verified Institutional Endorsements</h3>
            <p className="text-[11px] text-slate-400 font-medium">Real-time performance validations extracted directly from centralized customer logs rows.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {aboutCmsConfig.testimonials.map((testi, idx) => (
              <div key={idx} className="py-2.5 space-y-1">
                <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"{testi.feedback}"</p>
                <p className="text-[10px] text-blue-900 font-black font-mono tracking-wider">— {testi.client}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}