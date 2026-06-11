// File Location: src/components/public/PinnedFaqsStrip.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function PinnedFaqsStrip() {
  // Mock dummy array representing pinned FAQs directly controlled from admin dashboard configuration parameters
  const [topFaqs] = useState([
    { 
      question: "How long does standard delivery take for Singrauli mining hubs?", 
      slug: "how-long-does-standard-delivery-take-for-singrauli-mining-hubs" 
    },
    { 
      question: "Are your hydraulic components certified by NCL safety auditors?", 
      slug: "are-your-hydraulic-components-certified-by-ncl-safety-auditors" 
    },
    {
      question: "What is the maximum load rating of your modular conveyor systems?",
      slug: "what-is-the-maximum-load-rating-of-your-modular-conveyor-systems"
    }
  ]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-100/40 space-y-6">
      
      {/* Component Header Block */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-sm font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
            <span>📚</span> Featured Knowledge Base (FAQs)
          </h2>
          <p className="text-[11px] md:text-xs text-slate-400 font-medium mt-0.5">
            Pin configuration matrix loaded straight via Central Admin CRM settings array.
          </p>
        </div>
        
        {/* Redirect button to check all faqs */}
        <Link 
          href="/contact/faqs" 
          className="bg-blue-50 text-blue-900 border border-blue-100 text-[10px] font-black uppercase px-4 py-2.5 rounded-xl hover:bg-slate-900 hover:text-white transition-all tracking-wider shadow-sm shrink-0 text-center"
        >
          🔎 Explore All & Search Questions Pool ➔
        </Link>
      </div>

      {/* Accordion Layout / List Render Strip */}
      <div className="divide-y divide-slate-100">
        {topFaqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-all"
          >
            <div className="flex items-start gap-2.5">
              <span className="text-blue-500 font-bold text-xs shrink-0 mt-0.5">❓</span>
              <p className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-blue-900 transition-colors leading-relaxed">
                {faq.question}
              </p>
            </div>
            
            <Link 
              href={`/contact/faqs/${faq.slug}`} 
              className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 font-mono uppercase tracking-tight flex items-center gap-1 shrink-0 self-end sm:self-auto bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg hover:border-slate-300"
            >
              Read Answer <span className="transition-transform group-hover:translate-x-0.5">➔</span>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}