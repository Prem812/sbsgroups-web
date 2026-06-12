"use client";

import { useState } from "react";
import DynamicFormEngine from "@/components/public/DynamicFormEngine";
import PinnedHotlines from "@/components/public/PinnedHotlines";
import PinnedFaqsStrip from "@/components/public/PinnedFaqsStrip";
import WhyChooseUsPublic from "@/components/WhyChooseUs"; // Yeh component bhi public folder mein hona chahiye taaki yeh page usko import kar sake

export default function PublicContactUsPage() {
  // Mock Database Global settings fetch response
  const [settings] = useState({
    pageMaxWidth: "max-w-6xl", // Dynamic input parameter from DB: max-w-4xl, max-w-6xl, max-w-7xl
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115647.78442385157!2d82.59316131494875!3d24.119253457173268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398eec61df555555%3A0xa6cd46cf98dfad8b!2sSingrauli!5e0!3m2!1sen!2sin!4v1710000000000!3m2!1sen!2sin",
    alertSuccessMessage: "Thank you! For your enquiry has been captured seamlessly into SBS central node pipeline.",
  });

  const [fieldsConfig] = useState([
    { id: "1", fieldName: "fullName", label: "Full Enterprise Name", placeholder: "e.g. Adani Logistics Hub", fieldType: "TEXT", gridWidth: "FULL", isRequired: true, sortOrder: 1, prefixIcon: "🏢" },
    { id: "2", fieldName: "email", label: "Official Communication Email", placeholder: "sourcing@domain.com", fieldType: "EMAIL", gridWidth: "HALF", isRequired: true, sortOrder: 2, prefixIcon: "📧" },
    { id: "3", fieldName: "phone", label: "Active Mobile/Telecom Number", placeholder: "+91 XXXXX XXXXX", fieldType: "NUMBER", gridWidth: "HALF", isRequired: true, sortOrder: 3, prefixIcon: "📞" },
    { id: "4", fieldName: "department", label: "Target Command Department", fieldType: "SELECT", gridWidth: "FULL", isRequired: true, sortOrder: 4, options: ["Bulk Procurement RFQ", "Logistics & Supply Chain Hub", "Foundry Metallurgical Technical Audit"] },
    { id: "5", fieldName: "message", label: "Operational Execution Notes / Message Summary", placeholder: "Provide comprehensive breakdown instructions...", fieldType: "TEXTAREA", gridWidth: "FULL", isRequired: true, sortOrder: 5 }
  ]);

  const [hotlines] = useState([
    { name: "G.K. Jaiswal", designation: "Founder & Technical Chairman", phone: "+91 94251 XXXXX", email: "gk.jaiswal@sbsgroups.com" },
    { name: "A.K. Srivastava", designation: "Co-Founder & Logistics Director", phone: "+91 88188 XXXXX", email: "ak.srivastava@sbsgroups.com" }
  ]);

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
      <div className={`${settings.pageMaxWidth} mx-auto space-y-12`}>
        
        {/* ROW HEADER PARTITION */}
        <div className="border-b border-slate-200/80 pb-6">
          <span className="text-[10px] font-black text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-md uppercase tracking-widest">Connect Matrix</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">Interface With SBS Core Command</h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">Transmit secure technical request logs, audit localized distribution coordinates, or initiate direct corporate hotlines.</p>
        </div>

        {/* COMPONENT DIVISION GRID SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <DynamicFormEngine fieldsConfig={fieldsConfig} alertSuccessMessage={settings.alertSuccessMessage} />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <PinnedHotlines hotlines={hotlines} />
            {/* LIVE DYNAMIC MAP CONTAINER */}
            <div className="w-full h-64 rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white p-2">
              <iframe src={settings.mapEmbedUrl} className="w-full h-full rounded-2xl border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>

        <WhyChooseUsPublic />
        <PinnedFaqsStrip />
      </div>
    </div>
  );
}