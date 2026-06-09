"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PublicEmployeeProfileDetail() {
  const params = useParams();

  // DUMMY SCHEMAS LOOKUP MOCK DATA
  const [profile] = useState({
    name: "G K Jaiswal",
    role: "Sales Executive Manager",
    tag: "Sales Desk",
    avatar: "👨‍💼",
    email: "jaiswal.sales@sbsgroups.com",
    phone: "+91 94251 XXXXX",
    officeLocation: "Singrauli Main Hub Depot",
    joiningDate: "August 14, 2022",
    biography: "Handling primary supply logistics distributions agreements, corporate RFQs evaluations, and vendor negotiations for our heavy mechanical processing spare parts deployment grid channels.",
    socials: { linkedin: "#", twitter: "#", skype: "#" }
  });

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* REVERSE BREADCRUMB STRIP */}
        <Link href="/employees" className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors">
          ⬅️ Back to Global Talent Directory
        </Link>

        {/* CORE DETAILS CANVAS CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left border-b border-slate-100 pb-6">
            <span className="text-5xl p-4 bg-slate-100 rounded-3xl shadow-inner border inline-block shrink-0">{profile.avatar}</span>
            <div className="space-y-1.5 w-full">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">{profile.role} — <span className="text-blue-900 font-black underline">{profile.tag}</span></p>
              
              {/* VISUAL SLUG LOGGER METADATA BADGE FOR ROUTING PROOF */}
              <div className="pt-2">
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md block w-max mx-auto sm:mx-0">
                  🛰️ Active Route Param Node: /employees/{params.slug}
                </span>
              </div>
            </div>
          </div>

          {/* BIOGRAPHY HISTORY */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Scope Biography</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/70 p-4 rounded-xl border">
              {profile.biography}
            </p>
          </div>

          {/* CONTACT INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[9px] font-black uppercase text-slate-400">Direct Comms Coordinates</span>
              <p className="text-xs font-mono font-bold text-slate-800">📞 {profile.phone}</p>
              <p className="text-xs font-mono font-bold text-blue-900 underline truncate">📧 {profile.email}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[9px] font-black uppercase text-slate-400">Station Allocation Hub</span>
              <p className="text-xs font-bold text-slate-700">📍 {profile.officeLocation}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}