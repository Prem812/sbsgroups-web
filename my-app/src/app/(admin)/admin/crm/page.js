"use client";

import { useState } from "react";

export default function AdminCrmCentralizedManagement() {
  const [activeTab, setActiveTab] = useState("contact-layout");

  // 1. 👥 ROSTER SELECTION STORAGE (Linked from Employees DB)
  const [availableStaff, setAvailableStaff] = useState([
    { id: "EMP-101", name: "G K Jaiswal", role: "Sales Executive Manager", isPinnedOnContact: true },
    { id: "EMP-102", name: "Anjali Sharma", role: "Head of Human Resources", isPinnedOnContact: true },
    { id: "EMP-103", name: "Vikram Singh", role: "Logistics Specialist", isPinnedOnContact: false }
  ]);

  // 2. 📍 GEOLOCATION SYSTEM STORAGE
  const [mapEmbedUrl, setMapEmbedUrl] = useState("https://www.google.com/maps/embed?pb=...");

  // 3. 📬 REAL-TIME USER QUERIES INTAKE PIPELINE
  const [crmTickets, setCrmTickets] = useState([
    { id: "TCK-101", email: "procurement@adani.com", subject: "Bulk Sourcing Request", message: "Need quotation for 100 units of high-tensile steel sheets for Singrauli mining division.", filedAt: "2 mins ago" },
    { id: "TCK-102", email: "info@relianceindustries.com", subject: "Vendor Registration Inquiry", message: "Please provide the criteria grid and documents list to register as a regular premium sub-distributor.", filedAt: "1 hour ago" }
  ]);

  const [activeAnsweringId, setActiveAnsweringId] = useState(null);
  const [outboundMailResponse, setOutboundMailResponse] = useState("");

  const handleStaffToggle = (id) => {
    setAvailableStaff(prev => prev.map(staff => staff.id === id ? { ...staff, isPinnedOnContact: !staff.isPinnedOnContact } : staff));
  };

  const executeSmtpMailShoot = (ticket, e) => {
    e.preventDefault();

    // 💥 CORE ENTERPRISE MARKETING + INTERRUPTION REGRET PROTOCOL LAYER
    const simulatedSmtpPayload = `
    ========================================================================
    [SMTP OUTBOUND OUTLET SERVICE — TRANSMISSION SUCCESSFUL]
    ========================================================================
    To               : ${ticket.email}
    Subject          : Resolution Track regarding your ticket log: [${ticket.subject}]
    
    REGRET CLAUSE MESSAGE SUMMARY:
    "Dear Patron, we deeply apologize for the temporary delay or interruption in processing your procurement token log files sequence due to central database queuing syncs."
    
    OFFICIAL CORPORATE RESPONSE STATEMENT DATA:
    "${outboundMailResponse}"
    
    CRM ACTIONS METRICS: Ticket marked RESOLVED and filed into Closed History Registry.
    ========================================================================`;

    console.log(simulatedSmtpPayload);
    alert(`CRM Status Update Bhai! Response transmission log executed perfectly. Direct email shot to ${ticket.email}.`);
    
    // Ticket resolved, remove from active interface buffer
    setCrmTickets(prev => prev.filter(t => t.id !== ticket.id));
    setActiveAnsweringId(null);
    setOutboundMailResponse("");
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 antialiased">
      
      {/* CRM OPERATIONAL HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
        <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Centralized CRM Sourcing Lead Panel</h1>
        <p className="text-xs text-slate-500 font-medium">Coordinate live front-end layout arrays, manage pinned duty handlers, modify location linkages, and deploy outbound email communications.</p>
      </div>

      {/* HORIZONTAL CONSOLE TABS SECTION */}
      <div className="flex space-x-4 border-b text-xs font-black uppercase tracking-wider">
        <button 
          onClick={() => setActiveTab("contact-layout")} 
          className={`pb-2 border-b-2 transition-colors ${activeTab === "contact-layout" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"}`}
        >
          🌐 Contact Page Layout Configuration
        </button>
        <button 
          onClick={() => setActiveTab("crm-pipeline")} 
          className={`pb-2 border-b-2 transition-colors relative ${activeTab === "crm-pipeline" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"}`}
        >
          📥 Live Inbound Leads / Queries 
          {crmTickets.length > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 bg-rose-600 text-white rounded-full font-mono text-[9px] animate-pulse">{crmTickets.length}</span>
          )}
        </button>
      </div>

      {/* TAB SCENARIO 1: CONTACT HUB SHELL OPTIONS CONFIGURATION */}
      {activeTab === "contact-layout" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* COMPONENT MODULE A: STAFF VISIBILITY DESK SELECTOR */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">Public Contacts Duty Selector</h3>
                <p className="text-[11px] text-slate-400 font-medium">Check target employees to dynamically assign their communication cards onto the live front-end page layout.</p>
              </div>
              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
                {availableStaff.map(staff => (
                  <div key={staff.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-xs font-black text-slate-800">{staff.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{staff.role}</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={staff.isPinnedOnContact}
                      onChange={() => handleStaffToggle(staff.id)}
                      className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => alert("Public Duty Handler configuration matrices updated successfully.")} className="w-full bg-slate-900 text-white font-black text-[10px] tracking-wider uppercase py-2.5 rounded-xl transition-all">
              Save Display Contacts Config
            </button>
          </div>

          {/* COMPONENT MODULE B: INTERACTIVE MAP LINK INTERCEPTOR */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">📍 Google Maps Localization Integration</h3>
              <p className="text-[11px] text-slate-400 font-medium">Update the company's public digital navigation layout coordinate map by dropping the embed source link below.</p>
              <textarea 
                rows="4"
                value={mapEmbedUrl}
                onChange={(e) => setMapEmbedUrl(e.target.value)}
                className="w-full font-mono text-xs p-3 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-400 transition-all leading-normal"
                placeholder="Paste latest Google Maps iframe link coordinates here..."
              />
            </div>
            <button onClick={() => alert("Core operational location node link saved to main directory streams.")} className="w-full bg-slate-900 text-white font-black text-[10px] tracking-wider uppercase py-2.5 rounded-xl transition-all">
              Synchronize Map Coordinate Node
            </button>
          </div>

        </div>
      )}

      {/* TAB SCENARIO 2: LIVE USER INQUIRIES QUEUE PIPELINE INTERFACE */}
      {activeTab === "crm-pipeline" && (
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Active Procurement Inquiries Buffer ({crmTickets.length})</h3>
          
          {crmTickets.length > 0 ? (
            crmTickets.map(ticket => (
              <div key={ticket.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4 border-l-4 border-l-slate-900 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-mono font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{ticket.id}</span>
                      <span className="text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100">✓ Auto Newsletter Subscribed</span>
                      <span className="text-[10px] text-slate-400 font-medium font-mono">— filed {ticket.filedAt}</span>
                    </div>
                    <h3 className="text-xs font-black text-slate-900 pt-1">Subject Reference: <span className="text-blue-900 underline">{ticket.subject}</span></h3>
                    <p className="text-xs font-mono font-bold text-slate-500">Sender Inbox: {ticket.email}</p>
                  </div>

                  <button 
                    onClick={() => { setActiveAnsweringId(ticket.id); setOutboundMailResponse(""); }}
                    className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl hover:bg-slate-800 shadow-sm transition-all shrink-0 self-start"
                  >
                    ✏️ Formulate SMTP Response Mailer
                  </button>
                </div>

                {/* INLINE MESSAGE DISPATCH TEXTAREA PREVIEW BLOCK */}
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-xs font-medium text-slate-600 leading-relaxed italic">
                  " {ticket.message} "
                </div>

                {/* ACCORDION TRIGGER FOR MAILER COMPOSITION CORE */}
                {activeAnsweringId === ticket.id && (
                  <form onSubmit={(e) => executeSmtpMailShoot(ticket, e)} className="bg-slate-50 border p-4 rounded-xl space-y-3 animate-slideDown">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wide">Compose Outbound Solution Payload Statement</label>
                      <textarea 
                        rows="3"
                        required
                        value={outboundMailResponse}
                        onChange={(e) => setOutboundMailResponse(e.target.value)}
                        placeholder="Type standard pricing quotation timelines, logistics dispatch availability metrics or technical data sheets resolution logs..."
                        className="w-full text-xs p-2.5 rounded-lg bg-white border focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button type="button" onClick={() => setActiveAnsweringId(null)} className="text-[10px] font-bold bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg uppercase">Cancel</button>
                      <button type="submit" className="text-[10px] font-black bg-emerald-600 text-white px-4 py-1.5 rounded-lg uppercase tracking-wider shadow-sm hover:bg-emerald-700 transition-all">
                        🚀 Shoot Resolution Outbound Mailer
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white p-12 border border-dashed rounded-3xl text-center">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">🎉 Pipeline Stable: All Active CRM Lead Queries Mapped and Cleared Successfully.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}