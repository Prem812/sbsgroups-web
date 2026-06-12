"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function PublicDynamicContactShellPage() {
  const [pinnedFaqs, setPinnedFaqs] = useState([]);
  const [systemSettings, setSystemSettings] = useState({
    maxQuestionLength: 500,
    enforceEmailCheck: true
  });

  // Dynamic Framework Configuration bindings
  const [formEmail, setFormEmail] = useState("");
  const [formQuestion, setFormQuestion] = useState("");
  
  // Future Dynamic Attributes Extension Pool JSON Array Matrix Hook
  const [additionalMetaFields, setAdditionalMetaFields] = useState({
    clientName: "",
    clientLocation: "",
    plantIdentificationCode: ""
  });

  const fetchPublicFaqsData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:4000/api/faq/pinned");
      if (res.ok) {
        const data = await res.json();
        setPinnedFaqs(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchPublicFaqsData();
  }, [fetchPublicFaqsData]);

  const handlePublicLeadSubmission = async (e) => {
    e.preventDefault();
    try {
      // Dynamic Fields payload array scaling rule inject
      const payload = {
        email: formEmail,
        question: formQuestion,
        // Kal ko agar name, location extend karein to dynamic context metadata package me automatic push ho jayega
        dynamicMetaAttributes: additionalMetaFields 
      };

      const res = await fetch("http://localhost:4000/api/faq/submit-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Inquiry logged cleanly. Real-time diagnostic alert broadcasted to Admin SMTP gateways.");
        setFormEmail("");
        setFormQuestion("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="border-b border-slate-200 pb-5">
          <Link href="/contact" className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-all">⬅️ Return Matrix View</Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">SBS Central Knowledge Pool Engine</h1>
          <p className="text-xs text-slate-500 font-medium">Browse dynamic structural answers compiled directly by operations engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Active Featured Parameters</h3>
            <div className="divide-y divide-slate-100">
              {pinnedFaqs.map((faq) => (
                <div key={faq.id} className="py-3.5 flex justify-between items-center gap-4 group">
                  <p className="text-xs font-bold text-slate-700 group-hover:text-blue-900 transition-colors">❓ {faq.question}</p>
                  <Link href={`/contact/faqs/${faq.slug}`} className="text-[10px] font-black bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white px-3 py-1.5 rounded-xl uppercase transition-all">Read File ➔</Link>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handlePublicLeadSubmission} className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div>
              <h2 className="text-xs font-black uppercase text-slate-900 tracking-wider">Unresolved Inquiry? Post New Question</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Automated validation routers linked straight to infrastructure pipelines.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Communication Email ID</label>
              <input type="email" required={systemSettings.enforceEmailCheck} placeholder="sourcing@enterprise.com" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white font-semibold text-slate-700" />
            </div>

            {/* OPTIONAL EXTENSIONS EXAMPLES BLOCK MAPPER (Future me use karne ke liye activate kijiye yahan) */}
            {/* <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Client Name</label>
              <input type="text" value={additionalMetaFields.clientName} onChange={e => setAdditionalMetaFields({...additionalMetaFields, clientName: e.target.value})} className="..." />
            </div>
            */}

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-500 uppercase">State Question Log</label>
                <span className="text-[9px] font-mono text-slate-400">{systemSettings.maxQuestionLength - formQuestion.length} remaining</span>
              </div>
              <textarea rows={4} required placeholder="Type parameters structure configuration parameters needed..." value={formQuestion} onChange={e => setFormQuestion(e.target.value)} maxLength={systemSettings.maxQuestionLength} className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white text-slate-700 font-medium" />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:bg-slate-800 shadow-md transition-all">📡 Broadcast Request Node ➔</button>
          </form>
        </div>
      </div>
    </div>
  );
}