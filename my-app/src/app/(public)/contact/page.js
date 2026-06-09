"use client";

import { useState } from "react";
import Link from "next/link";

export default function PublicContactUsPage() {
  // 🏢 DUMMY CRM CORE CONFIGURATION (Managed dynamically via Admin panel)
  const [crmConfig] = useState({
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.513410183335!2d82.6852341!3d24.0481234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398ee314bc3a4b6f%3A0x679c66914619abff!2sWaidhan%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000",
    hotlineContacts: [
      { name: "G.K. Jaiswal", designation: "Founder & Technical Chairman", phone: "+91 94251 XXXXX", email: "gk.jaiswal@sbsgroups.com" },
      { name: "A.K. Srivastava", designation: "Co-Founder & Logistics Director", phone: "+91 88188 XXXXX", email: "ak.srivastava@sbsgroups.com" },
      { name: "Sales Department Desk", designation: "Bulk RFQ Sourcing Pipeline", phone: "+91 70002 XXXXX", email: "procurement.desk@sbsgroups.com" }
    ],
    whyChooseUs: [
      { title: "Zero Breakdown Commitment", desc: "Our heavy mining machinery spare components carry certified zero metallurgical failure ratings." },
      { title: "Direct Hub Delivery Logs", desc: "Strategic operations routing depots built straight inside Singrauli & NCL operational zones." },
      { title: "Automated RFQ Generation", desc: "No manual latency overheads. Institutional client inquiries match against real-time supply indexes instantly." }
    ]
  });

  // ⭐ DUMMY TOP-5 POPULAR FAQ BUNDLE
  const [topFaqs] = useState([
    { question: "How long does standard delivery take for Singrauli mining hubs?", slug: "how-long-does-standard-delivery-take-for-singrauli-mining-hubs" },
    { question: "Are your hydraulic components certified by NCL safety auditors?", slug: "are-your-hydraulic-components-certified-by-ncl-safety-auditors" },
    { question: "Can we track bulk enterprise dispatches through third-party platforms?", slug: "can-we-track-bulk-enterprise-dispatches-through-third-party-platforms" }
  ]);

  // FORM INTAKE STATE SCHEMAS
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  
  const handleFormSubmission = (e) => {
    e.preventDefault();
    alert(`Dhanyawad, Bhai! Your transmission log captured securely. Our department desk will route an update file to ${contactForm.email} shortly.`);
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ROW HEADER PARTITION */}
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-black text-blue-950 uppercase tracking-widest">Connect Matrix</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Interface With SBS Core Command</h1>
          <p className="text-xs text-slate-500 font-medium">Transmit secure technical request logs, audit localized distribution coordinates, or initiate direct corporate hotlines.</p>
        </div>

        {/* SECTION 1: TWIN GRID SPLIT - LEAD CAPTURE FORM vs HOTLINE CHANNELS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CRM AUTOMATED LEAD CAPTURE INTAKE */}
          <form onSubmit={handleFormSubmission} className="bg-white p-6 md:p-8 rounded-3xl border shadow-sm space-y-4">
            <div>
              <h2 className="text-sm font-black uppercase text-slate-900 tracking-tight">Transmit Sourcing RFQ / Query</h2>
              <p className="text-[11px] text-slate-400 font-medium">Every filed ticket logs immediately into the central admin CRM grid pipeline.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Your Name</label>
                <input type="text" required value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full text-xs px-3 py-2 border bg-slate-50 rounded-lg focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Official Email Endpoint</label>
                <input type="email" required value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full text-xs px-3 py-2 border bg-slate-50 rounded-lg focus:outline-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Strategic Subject Reference</label>
              <input type="text" required value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})} className="w-full text-xs px-3 py-2 border bg-slate-50 rounded-lg focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Operational Message Log Summary</label>
              <textarea rows="4" required value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full text-xs p-3 border bg-slate-50 rounded-lg focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:bg-slate-800 shadow-md transition-colors">
              ⚡ Dispatch Token to CRM Core Engine
            </button>
          </form>

          {/* DYNAMIC HOTLINES ROSTER DISPLAY COLUMN */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest">Direct Command Coordinates</h2>
              <div className="space-y-3">
                {crmConfig.hotlineContacts.map((contact, idx) => (
                  <div key={idx} className="bg-white border p-4 rounded-2xl shadow-sm flex justify-between items-center gap-4 hover:border-blue-950 transition-colors">
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{contact.name}</h4>
                      <p className="text-[10px] text-blue-900 font-bold uppercase tracking-wider">{contact.designation}</p>
                    </div>
                    <div className="text-right text-[10px] font-mono font-bold text-slate-500 space-y-0.5">
                      <p>📞 {contact.phone}</p>
                      <p className="underline text-slate-400">{contact.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC GOOGLE MAP EMBED BLOCK LAYER */}
            <div className="w-full h-48 rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <iframe src={crmConfig.mapEmbedUrl} className="w-full h-full border-0" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

        </div>

        {/* SECTION 2: WHY CHOOSE SBS EMBED MATRIX */}
        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Strategic Paradigm</span>
            <h2 className="text-base font-black tracking-tight uppercase">Why Enterprise Entities Anchor with SBS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crmConfig.whyChooseUs.map((item, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">0{idx + 1} Node</span>
                <h3 className="text-xs font-black text-slate-100 tracking-tight pt-1">{item.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: TOP PRE-ANSWERED FAQs MATRIX STRIP */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
            <div>
              <h2 className="text-sm font-black uppercase text-slate-900 tracking-tight">Essential Knowledge Matrices (FAQs)</h2>
              <p className="text-[11px] text-slate-400 font-medium">Instant structural resolution parameters mapped for incoming supply dispatch fields queries.</p>
            </div>
            
            {/* 🆕 DIRECT REDIRECT HOOK FOR GLOBAL FAQ LOOKUP SYSTEM */}
            <Link href="/contact/faqs" className="bg-blue-50 text-blue-900 border border-blue-100 text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:bg-blue-950 hover:text-white tracking-wider transition-all shadow-sm shrink-0">
              🔎 Explore All Knowledge Base Base-Pool
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {topFaqs.map((faq, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center gap-4 group">
                <p className="text-xs font-bold text-slate-700 group-hover:text-blue-900 transition-colors">❓ {faq.question}</p>
                {/* Dynamic Slug Page Redirection Trigger URL */}
                <Link href={`/contact/faqs/${faq.slug}`} className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 transition-colors shrink-0 font-mono uppercase tracking-tight">
                  Read File ➔
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}