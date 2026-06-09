"use client";

import { useState } from "react";

export default function AdminFaqManagementStudio() {
  const [activeSegment, setActiveSegment] = useState("all-faqs");

  // 1. MASTER SYNCHRONIZED FAQ POOL (Includes User Asked + Admin Created Entries)
  const [faqsPool, setFaqsPool] = useState([
    {
      id: "FAQ-301",
      question: "What is the tensile rating of your heavy mining conveyor loops?",
      slug: "what-is-the-tensile-rating-of-your-heavy-mining-conveyor-loops",
      askedBy: "Internal Content Team",
      answerHtml: "<strong>Grade-A Heavy Performance Status:</strong> <br/> Our loops feature a vulcanized layer structure with an absolute capacity threshold up to <span style='color: #16a34a; font-weight: bold;'>4500 kN/m</span>. <br/><br/> <img src='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400' alt='Conveyor Spec Diagram' style='border-radius:12px; margin-top:8px; border:1px solid #e2e8f0;' />"
    }
  ]);

  // 2. INCOMING TICKETS FROM USER SEARCH MISS PROTOCOLS
  const [incomingTickets, setIncomingTickets] = useState([
    { ticketId: "TCK-449", userEmail: "procurement@adani.com", rawQuestion: "Can we order custom 60mm alloy driveshafts?" }
  ]);

  // FORMS CONTROL SYSTEM HOOKS
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: "", askedBy: "Internal Operations Team", answerHtml: "" });

  const generateSlugPattern = (text) => {
    return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  };

  // 🎨 WYSIWYG EDITOR INLINE FORMATTING HELPER INJECTION TOOLS
  const injectRichMarkup = (tagType, placeholderOrUrl = "") => {
    let markup = "";
    if (tagType === "bold") markup = "<strong>Bold Text</strong>";
    if (tagType === "color") markup = "<span style='color: #e11d48; font-weight: bold;'>Colored Text</span>";
    if (tagType === "image") {
      const url = prompt("Bhai, yahan image ka web link layout URL paste kijiye:", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500");
      if (!url) return;
      markup = `<br/><img src='${url}' alt='Technical Reference Manual Specification Drawing Diagram' style='max-width:100%; border-radius:16px; margin: 10px 0; border: 1px solid #cbd5e1;' /><br/>`;
    }
    
    setFaqForm(prev => ({ ...prev, answerHtml: prev.answerHtml + markup }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const dynamicSlug = generateSlugPattern(faqForm.question);

    if (editingId) {
      setFaqsPool(prev => prev.map(item => item.id === editingId ? { ...faqForm, slug: dynamicSlug, id: editingId } : item));
      alert("Knowledge asset index matrix modified completely.");
    } else {
      const freshFaqId = `FAQ-${Math.floor(100 + Math.random() * 900)}`;
      setFaqsPool([...faqsPool, { ...faqForm, slug: dynamicSlug, id: freshFaqId }]);
      alert(`Success Bhai! Transmitted asset logs under structural index code tracking Node: ${freshFaqId}`);
    }
    
    setShowModal(false);
    setEditingId(null);
  };

  // 💥 DYNAMIC DUAL ACTIONS: SOLUTION LIVE CONVERSION + OUTBOUND SMTP MAILER SIGNAL
  const processTicketResolutionPipeline = (ticket, responseText) => {
    if (!responseText.trim()) return alert("Bhai, answer text cannot be empty.");
    
    const configuredSlug = generateSlugPattern(ticket.rawQuestion);
    const generatedFaqId = `FAQ-USR-${Math.floor(100 + Math.random() * 900)}`;

    const newFaqPayload = {
      id: generatedFaqId,
      question: ticket.rawQuestion,
      slug: configuredSlug,
      askedBy: `Verified User Client Node (${ticket.userEmail})`,
      answerHtml: `<div>${responseText}</div>`
    };

    // 1. Injects into active front-end system list instantly
    setFaqsPool(prev => [newFaqPayload, ...prev]);

    // 2. Triggers Virtual SMTP Log Terminal
    const SMTP_MAIL_DUMP_LOG = `
    ========================================================================
    [AUTOMATED CMS SMTP OUTBOUND TRANSMISSION LOG — SUCCESS]
    ========================================================================
    Recipient Email Address : ${ticket.userEmail}
    Subject Reference Line  : REQ-RESOLVED // RE: "${ticket.rawQuestion}"
    
    REGRET OVERHEAD DELAY CLAUSE:
    "Dear Patron, sorry to delay for any temporary interruptions in our routing lines."
    
    RESOLVED SOLUTION RICH TEXT PACKET DATA:
    "${responseText}"
    
    STATUS CODE: Live published to central database index at /contact/faqs/${configuredSlug}
    ========================================================================`;
    
    console.log(SMTP_MAIL_DUMP_LOG);
    alert(`CRM Success! Solution mail dispatched to ${ticket.userEmail} and query live-published on website framework.`);
    
    // Purging target entry from incoming buffer pool tracking list
    setIncomingTickets(prev => prev.filter(t => t.ticketId !== ticket.ticketId));
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 antialiased">
      
      {/* CMS HEADER ZONE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Knowledge Base System & CMS Studio</h1>
          <p className="text-xs text-slate-500 font-medium">Formulate rich media answers, embed internal blueprint illustrations, manage user questions, and automate resolution delivery.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setFaqForm({ question: "", askedBy: "Internal Operations Team", answerHtml: "" }); setShowModal(true); }}
          className="bg-slate-900 text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider shadow-sm"
        >
          ➕ Formulate Core FAQ Matrix
        </button>
      </div>

      {/* CORE MODULAR SYSTEM TABS INNER ROUTING SEGMENTS */}
      <div className="flex space-x-4 border-b text-xs font-black uppercase tracking-wider">
        <button onClick={() => setActiveSegment("all-faqs")} className={`pb-2 border-b-2 ${activeSegment === "all-faqs" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"}`}>📁 Indexed Global FAQ Pool ({faqsPool.length})</button>
        <button onClick={() => setActiveSegment("incoming-tickets")} className={`pb-2 border-b-2 relative ${activeSegment === "incoming-tickets" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"}`}>
          📥 User Search Missing Tickets 
          {incomingTickets.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-rose-600 text-white rounded-full font-mono text-[9px] animate-pulse">{incomingTickets.length}</span>}
        </button>
      </div>

      {/* SEGMENT SCREEN DISPLAY PATHWAYS LOGIC BLOCK */}
      {activeSegment === "all-faqs" ? (
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden divide-y divide-slate-100">
          {faqsPool.map(item => (
            <div key={item.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-start gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono font-black bg-blue-50 text-blue-900 border px-1.5 py-0.5 rounded">{item.id}</span>
                  <span className="text-[10px] font-medium text-slate-400">Origin: <span className="font-bold text-slate-500">{item.askedBy}</span></span>
                </div>
                <h3 className="text-xs font-black text-slate-900">❓ {item.question}</h3>
                <div className="text-xs text-slate-600 border bg-white p-3 rounded-xl max-h-40 overflow-y-auto font-medium" dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button onClick={() => { setEditingId(item.id); setFaqForm(item); setShowModal(true); }} className="text-[10px] font-black uppercase tracking-wider border px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-900 hover:text-white rounded-xl shadow-sm transition-all">✏️ Edit</button>
                <button onClick={() => setFaqsPool(prev => prev.filter(f => f.id !== item.id))} className="text-[10px] font-black uppercase tracking-wider border px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl shadow-sm transition-all">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {incomingTickets.length > 0 ? (
            incomingTickets.map(ticket => (
              <div key={ticket.ticketId} className="bg-white border p-5 rounded-2xl shadow-sm space-y-4 border-l-4 border-l-amber-500">
                <div>
                  <span className="text-[9px] font-mono font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{ticket.ticketId}</span>
                  <h3 className="text-xs font-black text-slate-900 mt-2">" {ticket.rawQuestion} "</h3>
                  <p className="text-[11px] font-mono font-bold text-blue-900 underline mt-0.5">User Tracking Node Link Inbox: {ticket.email}</p>
                </div>
                
                {/* INLINE RICH WYSIWYG CREATION ENGINE ROW FOR CONVERTING INCOMING TICKET */}
                <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                  <div className="flex flex-wrap gap-1.5 border-b pb-2 text-[10px] font-black">
                    <button type="button" onClick={() => { const text = prompt("Enter text to bold:"); if(text) document.getElementById(`txt-${ticket.ticketId}`).value += `<strong>${text}</strong>` }} className="bg-white border px-2 py-1 rounded hover:bg-slate-200">B</button>
                    <button type="button" onClick={() => { const src = prompt("Paste your layout illustration image URL location coordinates here:"); if(src) document.getElementById(`txt-${ticket.ticketId}`).value += `<br/><img src='${src}' style='max-width:100%; border-radius:12px; margin:8px 0;' /><br/>` }} className="bg-white border px-2 py-1 rounded hover:bg-slate-200">🖼️ Embed Image Node</button>
                    <span className="text-[9px] text-slate-400 font-medium self-center ml-auto">HTML tags support allowed manually.</span>
                  </div>
                  <textarea 
                    id={`txt-${ticket.ticketId}`}
                    rows="3" 
                    placeholder="Formulate the dynamic rich responsive statement block. HTML tags structural injection schemas authorized." 
                    className="w-full text-xs p-2.5 rounded-lg border bg-white focus:outline-none focus:border-slate-400 font-medium font-mono"
                  />
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={() => {
                        const compiledVal = document.getElementById(`txt-${ticket.ticketId}`).value;
                        processTicketResolutionPipeline(ticket, compiledVal);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] px-4 py-2 rounded-xl uppercase tracking-wider shadow-sm"
                    >
                      🚀 Shoot Outbound Resolution Mailer + Publish Live to Website
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 text-center border rounded-3xl border-dashed">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">🎉 System Queue Stabilized: No Pending Knowledge Base Tickets Found.</p>
            </div>
          )}
        </div>
      )}

      {/* --- STANDALONE SYSTEM FAQ MODAL CANVAS COMPOSER COMPONENT --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <form onSubmit={handleFormSubmission} className="bg-white rounded-3xl w-full max-w-xl shadow-2xl p-6 space-y-4 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">{editingId ? "Modify Knowledge Asset Configuration Node" : "Incorporate Core Pre-Answered FAQ Record Element"}</h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 font-black">✕</button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Primary Core Question Parameter Title</label>
              <input type="text" required placeholder="What is the standard configuration rating limit metrics?" value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:bg-white" />
            </div>

            {/* INTEGRATED CMS RICH TOOLBAR MATRIX WRAP */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Dynamic Solution Body Content Editor Suite</label>
              <div className="border rounded-xl overflow-hidden bg-slate-50/50">
                <div className="flex flex-wrap gap-1 bg-slate-100/80 p-2 border-b border-slate-200/60 text-[9px] font-black uppercase tracking-tight">
                  <button type="button" onClick={() => injectRichMarkup("bold")} className="bg-white px-2 py-1 rounded shadow-sm border hover:bg-slate-200">Bold text</button>
                  <button type="button" onClick={() => injectRichMarkup("color")} className="bg-white px-2 py-1 rounded shadow-sm border text-rose-600 hover:bg-slate-200">Alert color text</button>
                  <button type="button" onClick={() => injectRichMarkup("image")} className="bg-slate-900 text-white px-2 py-1 rounded shadow-sm hover:bg-slate-800">📷 Inject Reference Diagram Image</button>
                </div>
                <textarea 
                  rows="6" 
                  required
                  value={faqForm.answerHtml}
                  onChange={e => setFaqForm({...faqForm, answerHtml: e.target.value})}
                  placeholder="Formulate description layout details. Switch toolbar parameters blocks to inject tags..."
                  className="w-full text-xs p-3 bg-white focus:outline-none font-mono leading-relaxed"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md">
              💾 Lock Compiled Asset Logs Into Public Repositories Grid
            </button>
          </form>
        </div>
      )}

    </div>
  );
}