"use client";

import { useState } from "react";
import Link from "next/link";

export default function PublicDynamicContactShellPage() {
  const [pinnedFaqs] = useState([
    { question: "How long does standard delivery take for Singrauli mining hubs?", slug: "how-long-does-standard-delivery-take-for-singrauli-mining-hubs" },
    { question: "Are your hydraulic components certified by NCL safety auditors?", slug: "are-your-hydraulic-components-certified-by-ncl-safety-auditors" }
  ]);

  // Faq Custom Policy Restrictions Configuration Hooks
  const [faqSystemSettings] = useState({
    maxQuestionLength: 300,
    enforceEmailCheck: true,
  });

  const [formEmail, setFormEmail] = useState("");
  const [formQuestion, setFormQuestion] = useState("");
  const [charLeft, setCharLeft] = useState(faqSystemSettings.maxQuestionLength);

  const handleQuestionChange = (val) => {
    if (val.length <= faqSystemSettings.maxQuestionLength) {
      setFormQuestion(val);
      setCharLeft(faqSystemSettings.maxQuestionLength - val.length);
    }
  };

  const handlePublicLeadSubmission = (e) => {
    e.preventDefault();
    
    const alertMessage = `
[SBS SYSTEM AUTOMATED RECEIPT METRIC]
--------------------------------------------------------
Target Registered Endpoint: ${formEmail}

1. STATUS STATUS: We have securely compiled your query node: "${formQuestion}". Our operations desk will broadcast an update layout token via mail shortly.
2. SUCCESS CORRELATION: Auto-Synchronized & Whitelisted to SBS newsletter repository indexes successfully!`;
    
    alert(alertMessage);
    setFormEmail("");
    setFormQuestion("");
    setCharLeft(faqSystemSettings.maxQuestionLength);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="border-b border-slate-200 pb-5">
          <Link href="/contact" className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-all">⬅️ Return Matrix View</Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">SBS Central Knowledge Pool Engine</h1>
          <p className="text-xs text-slate-500 font-medium">Browse dynamic structural answers compiled directly by operations engineering, or submit structural logs below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* FAQ REDIRECTION BOX */}
          <div className="md:col-span-7 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Active Featured Parameters</h3>
            <div className="divide-y divide-slate-100">
              {pinnedFaqs.map((faq, idx) => (
                <div key={idx} className="py-3.5 flex justify-between items-center gap-4 group">
                  <p className="text-xs font-bold text-slate-700 group-hover:text-blue-900 transition-colors">❓ {faq.question}</p>
                  <Link href={`/contact/faqs/${faq.slug}`} className="text-[10px] font-black bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white px-3 py-1.5 rounded-xl transition-all shrink-0 font-mono tracking-tight uppercase">
                    Read File ➔
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* QUESTION SUBMISSION SHELL */}
          <form onSubmit={handlePublicLeadSubmission} className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div>
              <h2 className="text-xs font-black uppercase text-slate-900 tracking-wider">Unresolved Inquiry? Post New Question</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Missing parameters will be dynamically validated & routed right to terminal modules.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Your Communication Email Address</label>
              <input 
                type="email" 
                required={faqSystemSettings.enforceEmailCheck}
                placeholder="sourcing@enterprise.com" 
                value={formEmail} 
                onChange={e => setFormEmail(e.target.value)} 
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white font-semibold text-slate-700" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-500 uppercase">State Your Question Log</label>
                <span className={`text-[9px] font-mono font-bold ${charLeft < 30 ? "text-red-500" : "text-slate-400"}`}>{charLeft} chars left</span>
              </div>
              <textarea 
                rows={4} 
                required 
                placeholder="Type structural dimensions parameters needed..." 
                value={formQuestion} 
                onChange={e => handleQuestionChange(e.target.value)} 
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white text-slate-700 font-medium" 
              />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:bg-slate-800 shadow-md transition-all">
              📡 Broadcast Request Node ➔
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}