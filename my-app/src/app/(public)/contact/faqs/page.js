"use client";

import { useState } from "react";
import Link from "next/link";

export default function PublicDynamicContactShellPage() {
  // SIMULATING DATA LOAD FETCHED DIRECTLY FROM THE ACTIVE SELECTIONS IN THE CODES ABOVE
  const [pinnedContacts] = useState([
    { id: "EMP-101", name: "G K Jaiswal", role: "Sales Executive Manager", phone: "+91 94251 XXXXX", email: "jaiswal.sales@sbsgroups.com" },
    { id: "EMP-102", name: "Anjali Sharma", role: "Head of Human Resources", phone: "+91 70002 XXXXX", email: "sharma.a@sbsgroups.com" }
  ]);

  const [topFaqs] = useState([
    { question: "How long does standard delivery take for Singrauli mining hubs?", slug: "how-long-does-standard-delivery-take-for-singrauli-mining-hubs" },
    { question: "Are your hydraulic components certified by NCL safety auditors?", slug: "are-your-hydraulic-components-certified-by-ncl-safety-auditors" }
  ]);

  const [formEmail, setFormEmail] = useState("");
  const [formQuestion, setFormQuestion] = useState("");

  const handlePublicLeadSubmission = (e) => {
    e.preventDefault();
    
    // 💥 AUTOMATIC NEWSLETTER ALIGNMENT ALERT BUNDLE MESSAGE SHOW CASE
    const alertMessage = `
    ========================================================
    [SBS SYSTEM AUTOMATED NOTIFICATION RECEIPT]
    ========================================================
    Target Registered Email: ${formEmail}
    
    STATUS CODE:
    1. "We have received your request for: '${formQuestion}'. We will answer shortly or we will get back to you soon."
    
    2. "🎉 System Notification: Your email has been automatically synchronized and subscribed to our official corporate technical newsletter list rows successfully!"
    ========================================================`;
    
    alert(alertMessage);
    setFormEmail("");
    setFormQuestion("");
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* ROW HEADER PARTITION */}
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-black text-blue-950 uppercase tracking-widest">Connect Hub</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Interface With SBS Comm Matrix</h1>
          <p className="text-xs text-slate-500 font-medium">Dynamically updated communication cells controlled straight via the Central Admin CRM Panel.</p>
        </div>

        {/* CONTROLLERS ELEMENTS SPLIT GRID MAPPING */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* INTERACTIVE FORM CAPTURING WITH NEWSLETTER HOOKS */}
          <form onSubmit={handlePublicLeadSubmission} className="bg-white p-6 md:p-8 rounded-3xl border shadow-sm space-y-4">
            <div>
              <h2 className="text-sm font-black uppercase text-slate-900 tracking-tight">Submit Procurement Query / FAQ Request</h2>
              <p className="text-[11px] text-slate-400 font-medium">Submitting instantly registers your email hook to our newsletter updates pipeline.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Your Communication Email Address</label>
              <input type="email" required placeholder="sourcing@enterprise.com" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="w-full text-xs px-3 py-2.5 bg-slate-50 border rounded-xl focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">State Your Question / Requirement Log</label>
              <textarea rows="4" required placeholder="Type technical query data sheets dimensions needed..." value={formQuestion} onChange={e => setFormQuestion(e.target.value)} className="w-full text-xs p-3 bg-slate-50 border rounded-xl focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:bg-slate-800 shadow-md">
              📡 Broadcast Request & Auto-Subscribe ➔
            </button>
          </form>

          {/* DYNAMICALLY PINNED EMPLOYEE CARDS AND MAP LAYER SECTION */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Active Duty Desk Handlers</h3>
              
              <div className="space-y-2">
                {pinnedContacts.map((contact) => (
                  <div key={contact.id} className="bg-white border p-4 rounded-xl shadow-sm flex justify-between items-center hover:border-slate-400 transition-colors">
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{contact.name}</h4>
                      <p className="text-[10px] text-blue-900 font-bold uppercase tracking-tight">{contact.role}</p>
                    </div>
                    <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                      <p>📞 {contact.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE DATA SYNCED GOOGLE MAP COMPONENT IFRAME CONTAINER */}
            <div className="w-full h-40 bg-slate-100 rounded-2xl overflow-hidden border shadow-inner">
              <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-slate-400 uppercase font-bold p-4 bg-white">
                🗺️ [Google Map Dynamic Link Embed Shell Managed from Admin Dashboard Syncs Here]
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3: PINNED FAQs ELEMENT LAYOUT INTERACTION FRAME */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4">
            <div>
              <h2 className="text-sm font-black uppercase text-slate-900 tracking-tight">Featured Knowledge Base (FAQs)</h2>
              <p className="text-[11px] text-slate-400 font-medium">Pin configurations arrays maintained on admin dashboards.</p>
            </div>
            
            <Link href="/contact/faqs" className="bg-blue-50 text-blue-900 border border-blue-100 text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:bg-blue-950 hover:text-white transition-all tracking-wider shadow-sm shrink-0">
              🔎 Explore All & Search Questions Pool ➔
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {topFaqs.map((faq, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center gap-4">
                <p className="text-xs font-bold text-slate-700">❓ {faq.question}</p>
                <Link href={`/contact/faqs/${faq.slug}`} className="text-[10px] font-black text-slate-400 hover:text-slate-900 font-mono uppercase tracking-tight">
                  Read Answer ➔
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}