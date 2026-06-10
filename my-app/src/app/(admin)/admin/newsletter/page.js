"use client";

import { useState } from "react";

export default function AdminNewsletterBroadcastEngine() {
  // 1. 👥 LIVE SUBSCRIBERS REPOSITORY (Simulated Database Feed)
  const [subscribers, setSubscribers] = useState([
    { id: "SUB-001", email: "virendra.singh@miningcorp.com", name: "Virendra Singh", joinedAt: "Yesterday", status: "Active" },
    { id: "SUB-002", email: "purchasing@hindalco.aditya@gmail.com", name: "Hindalco Procurement", joinedAt: "3 days ago", status: "Active" },
    { id: "SUB-003", email: "sanjay.johri@jindalsteel.com", name: "Sanjay Johri", joinedAt: "1 week ago", status: "Active" },
    { id: "SUB-004", email: "contact@singraulitraders.co.in", name: "Singrauli Traders", joinedAt: "2 weeks ago", status: "Suspended" },
  ]);

  // MULTIPLE SELECTION CHECKBOX TRACKER STATE
  const [selectedEmails, setSelectedEmails] = useState([]);
  
  // BROADCAST FORM CONTROL STATES
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  // 📋 PRE-DEFINED CORPORATE DATA TEMPLATE INJECTORS
  const DATA_TEMPLATES = {
    products: `📦 --- RECENT INDUSTRIAL INVENTORY PRODUCT CORES --- \n1. High-Tensile Vulcanized Mining Conveyor Loops [Grade-4500 kN/m]\n2. Reinforced Alloy Steel Excavator Driveshafts (60mm Custom Sizing)\n3. Heavy Duty Slurry Distribution Pumping Nozzles\n\nFor pricing grid quotations, reply to this node directly.`,
    distributors: `🤝 --- AUTHORIZED REGIONAL DISTRIBUTION DEPOTS --- \n1. Singrauli Foundry Core Hub Depot (Singrauli, MP)\n2. Korba Industrial Supply Node (Korba, CG)\n3. Dhanbad Metallurgical Stockyard Depot (Dhanbad, JH)\n\nAll depots hold ready-to-dispatch inventory 24/7.`,
    clients: `🏢 --- TRUSTED ENTERPRISE NETWORK PATRONS --- \nWe are proud to serve over 140+ institutional giants including:\n- Northern Coalfields Limited (NCL Deep Extractions Div)\n- Reliance Industries Infrastructure Power Node\n- Adani Logistics Trans-Corridor Networks`
  };

  const injectTemplateData = (type) => {
    const selectedTemplate = DATA_TEMPLATES[type];
    if (selectedTemplate) {
      setMailBody(prev => prev + "\n" + selectedTemplate);
      alert(`Success Bhai! ${type.toUpperCase()} template structural logs injected into draft canvas.`);
    }
  };

  // CHECKBOX SELECTION DISPATCH HANDLING LOOPS
  const handleSelectAllSubscribers = (e) => {
    if (e.target.checked) {
      const activeMails = subscribers.filter(s => s.status === "Active").map(s => s.email);
      setSelectedEmails(activeMails);
    } else {
      setSelectedEmails([]);
    }
  };

  const handleSelectIndividualSubscriber = (email) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(prev => prev.filter(m => m !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  // 🚀 MASS SMTP CONSOLE BROADCAST DISPATCHER
  const executeMassBroadcastEmail = (e) => {
    e.preventDefault();

    if (selectedEmails.length === 0) {
      return alert("Bhai, please select at least one active subscriber from the registry grid to target.");
    }

    const SMTP_BROADCAST_DUMP_LOG = `
    ========================================================================
    [SMTP MASS BROADCAST SYSTEM — MULTI-CHANNEL TRANSMISSION SUCCESS]
    ========================================================================
    Total Targets Processed : ${selectedEmails.length} Subscribed Nodes
    Target Recipients Pool  : [ ${selectedEmails.join(" , ")} ]
    
    EMAIL SUBJECT DISPATCH   : ${mailSubject}
    
    EMAIL STRUCTURAL BODY CONTENT BUFFER:
    "Dear Patron, 
    We hope your operations are highly optimized. Please review the core corporate updates requested below:
    
    ${mailBody}
    
    ------------------------------------------------------------------------
    REGRET CLAUSE OVERHEAD:
    Apologies for any temporary digital transit latency inside automated tracking nodes.
    To terminate future dispatches, click 'Unsubscribe Matrix' link down below."
    ========================================================================`;

    console.log(SMTP_BROADCAST_DUMP_LOG);
    alert(`CRM Success Bhai! Broadcast dispatched to ${selectedEmails.length} users simultaneously. Check backend terminal streams to audit tracking logs.`);
    
    // Purging form variables after success delivery checks
    setMailSubject("");
    setMailBody("");
    setSelectedEmails([]);
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 antialiased">
      
      {/* HEADER MANAGEMENT STUDIO DESK */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Newsletter Broadcast Engine & Subscriptions</h1>
          <p className="text-xs text-slate-500 font-medium">Monitor active website subscribers, select multi-target recipient pools, inject ready data templates, and deploy mass outbound marketing arrays.</p>
        </div>
        <div className="bg-slate-950 text-white font-mono text-center px-4 py-2.5 rounded-2xl border shrink-0">
          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Total Subscribed Base</span>
          <span className="text-lg font-black text-emerald-400">{subscribers.length} Nodes</span>
        </div>
      </div>

      {/* CORE BI-DIRECTIONAL SYSTEM SPLIT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SUBSCRIBERS GRID CONTROLLER DESK (8 / 12 Columns Width) */}
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden lg:col-span-7">
          <div className="p-4 bg-slate-50/80 border-b flex justify-between items-center">
            <div>
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Verified System Subscribers Base</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase font-mono mt-0.5">Selected Targets Count: {selectedEmails.length} Recipient Nodes</p>
            </div>
            
            {/* BULK GLOBAL TOGGLER */}
            <div className="flex items-center space-x-2 text-[11px] font-black uppercase text-slate-500">
              <label htmlFor="bulk-toggle" className="cursor-pointer">Select All Active</label>
              <input 
                id="bulk-toggle"
                type="checkbox" 
                onChange={handleSelectAllSubscribers}
                checked={selectedEmails.length === subscribers.filter(s => s.status === "Active").length && selectedEmails.length > 0}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-medium">
              <thead>
                <tr className="bg-slate-100/50 border-b text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4 text-center w-12">Target</th>
                  <th className="py-4 px-4">Patron Name & Email Handle</th>
                  <th className="py-4 px-4">Joined Index</th>
                  <th className="py-4 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className={`hover:bg-slate-50/60 transition-colors ${selectedEmails.includes(sub.email) ? "bg-blue-50/30" : ""}`}>
                    <td className="py-4 px-4 text-center">
                      <input 
                        type="checkbox" 
                        disabled={sub.status !== "Active"}
                        checked={selectedEmails.includes(sub.email)}
                        onChange={() => handleSelectIndividualSubscriber(sub.email)}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-black text-slate-900">{sub.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono font-bold">{sub.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-400">{sub.joinedAt}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${sub.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: MASS OUTBOUND SMTP BROADCAST CAMPAIGN COMPOSER (5 / 12 Columns Width) */}
        <div className="bg-white p-5 rounded-3xl border shadow-sm lg:col-span-5 space-y-4">
          <div>
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">🚀 Automated Campaign Dispatch Center</h3>
            <p className="text-[11px] text-slate-400 font-medium">Compose outbound content payload packages. Inject system structures below to speed up messaging workflows.</p>
          </div>

          {/* QUICK STRUCTURE DATA INJECTION CHIPS ROW */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">⚡ Click to Inject Corporate Data Layouts</label>
            <div className="flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-wider">
              <button type="button" onClick={() => injectTemplateData("products")} className="bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white border border-blue-200 px-2.5 py-1.5 rounded-lg transition-all">📦 Inject Products Details</button>
              <button type="button" onClick={() => injectTemplateData("distributors")} className="bg-amber-50 text-amber-900 hover:bg-amber-900 hover:text-white border border-amber-200 px-2.5 py-1.5 rounded-lg transition-all">🤝 Inject Distributors List</button>
              <button type="button" onClick={() => injectTemplateData("clients")} className="bg-purple-50 text-purple-900 hover:bg-purple-900 hover:text-white border border-purple-200 px-2.5 py-1.5 rounded-lg transition-all">🏢 Inject Clients List</button>
            </div>
          </div>

          {/* MAIN COMPOSE BROADCAST FORM CONTAINER */}
          <form onSubmit={executeMassBroadcastEmail} className="space-y-3 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Outbound Email Subject Line Reference</label>
              <input 
                type="text" 
                required 
                value={mailSubject}
                onChange={e => setMailSubject(e.target.value)}
                placeholder="e.g., SBS Quarterly Infrastructure Logistics Expansion Report // 2026" 
                className="w-full text-xs px-3 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-400 font-bold text-slate-900" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Email Body Content Document Blueprint</label>
              <textarea 
                rows="8" 
                required 
                value={mailBody}
                onChange={e => setMailBody(e.target.value)}
                placeholder="Formulate industrial news updates parameters. Inject target template data chips above to auto-populate layout blocks..." 
                className="w-full text-xs p-3 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-400 font-medium leading-relaxed font-mono" 
              />
            </div>

            {/* TARGET SELECTION STATUS WARNER */}
            <div className="bg-slate-50 p-3 rounded-xl border border-dashed text-[10px] text-slate-500 font-medium font-mono text-center">
              Target Broadcast Volume: <span className="font-black text-slate-900 underline">{selectedEmails.length} Verified Users</span> will receive this customized transmission.
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-md transition-all"
            >
              🚀 Fire Mass Outbound Transmission Array
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}