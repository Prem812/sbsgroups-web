"use client";

import { useState } from "react";

export default function AdminAboutUsCmsStudio() {
  const [activeSubTab, setActiveSubTab] = useState("team-milestones");

  // 1. TEAM MANAGEMENT ARRAYS
  const [teamPool, setTeamPool] = useState([
    { id: "T-1", name: "Rahul Jaiswal", role: "Chief Operating Officer", isShownOnAbout: true },
    { id: "T-2", name: "Suresh Pandey", role: "Lead Metallurgical Auditor", isShownOnAbout: true },
    { id: "T-3", name: "Nitin Verma", role: "Inventory Supervisor", isShownOnAbout: false }
  ]);

  // 2. TIMELINE LOG DATA STATE MATRIX  
  const [journeyEvents, setJourneyEvents] = useState([
    { year: "2018", title: "Foundational Origin Hub", desc: "Started operations inside Singrauli grid with single milling supply node." }
  ]);
  const [newEvent, setNewEvent] = useState({ year: "", title: "", desc: "" });

  // 3. STATISTICAL MILESTONE TARGET NUMBERS
  const [metricsForm, setMetricsForm] = useState({ globalClients: "140+", activeProducts: "1,250+", authorizedDistributors: "18+ Nodes" });

  // 4. STRATEGIC MISSION / VISION LOGS
  const [statements, setStatements] = useState({
    vision: "To be the absolute structural benchmark in industrial spare supply chains across Central India mining corridors.",
    mission: "Eliminating supply latencies by delivering precision metallurgical equipment using dynamic tracking frameworks."
  });

  const handleTeamToggleCheckbox = (id) => {
    setTeamPool(prev => prev.map(m => m.id === id ? { ...m, isShownOnAbout: !m.isShownOnAbout } : m));
  };

  const commitNewJourneyEvent = (e) => {
    e.preventDefault();
    setJourneyEvents([...journeyEvents, newEvent]);
    setNewEvent({ year: "", title: "", desc: "" });
    alert("New chronological index timeline node appended.");
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 antialiased">
      
      {/* BRAND CMS STUDIO HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
        <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Corporate Heritage CMS Studio</h1>
        <p className="text-xs text-slate-500 font-medium">Manipulate team alignments, update historical journey parameters logs, rewrite mission benchmarks, and calibrate live milestone data counters.</p>
      </div>

      {/* HORIZONTAL STUDIO TABS STRIP */}
      <div className="flex space-x-4 border-b text-xs font-black uppercase tracking-wider">
        <button onClick={() => setActiveSubTab("team-milestones")} className={`pb-2 border-b-2 ${activeSubTab === "team-milestones" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"}`}>👥 Team & Milestone Metrics Counters</button>
        <button onClick={() => setActiveSubTab("journey-statements")} className={`pb-2 border-b-2 ${activeSubTab === "journey-statements" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"}`}>⏳ Journey Timelines & Pillars Statements</button>
      </div>

      {/* SUB-TAB ZONE 1: TEAM MATRIX + COUNTERS REGISTRY CONTROL */}
      {activeSubTab === "team-milestones" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TEAM ROSTER TOGGLER COMPONENT ROW */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">Public Team Dashboard Assignment Matrix</h3>
              <p className="text-[11px] text-slate-400 font-medium">Toggle checkbox configurations to sync specific internal personnel units under the public corporate page block layout.</p>
              
              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pt-2">
                {teamPool.map(member => (
                  <div key={member.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-xs font-black text-slate-800">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{member.role}</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={member.isShownOnAbout} 
                      onChange={() => handleTeamToggleCheckbox(member.id)}
                      className="w-4 h-4 rounded text-slate-950 border-slate-300 focus:ring-0 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => alert("Live team public matrix visibility states updated perfectly.")} className="w-full bg-slate-900 text-white font-bold text-[10px] uppercase py-2.5 rounded-xl tracking-wider">
              Save Active Team Layout
            </button>
          </div>

          {/* MILESTONE COUNTERS INPUT BLOCK */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">📊 Milestone Counter Metric Constants</h3>
              <p className="text-[11px] text-slate-400 font-medium">Calibrate real-time quantitative achievements indices displayed inside the core highlight belt container.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Clients Tally</label>
                  <input type="text" value={metricsForm.globalClients} onChange={e => setMetricsForm({...metricsForm, globalClients: e.target.value})} className="w-full p-2 border bg-slate-50 font-mono rounded-lg focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Products Tally</label>
                  <input type="text" value={metricsForm.activeProducts} onChange={e => setMetricsForm({...metricsForm, activeProducts: e.target.value})} className="w-full p-2 border bg-slate-50 font-mono rounded-lg focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Distributors Tally</label>
                  <input type="text" value={metricsForm.authorizedDistributors} onChange={e => setMetricsForm({...metricsForm, authorizedDistributors: e.target.value})} className="w-full p-2 border bg-slate-50 font-mono rounded-lg focus:outline-none" />
                </div>
              </div>
            </div>
            <button onClick={() => alert("Milestone counter logs synced successfully.")} className="w-full bg-slate-900 text-white font-bold text-[10px] uppercase py-2.5 rounded-xl tracking-wider">
              Update Live Statistics Counters
            </button>
          </div>

        </div>
      )}

      {/* SUB-TAB ZONE 2: CHRONOLOGY TIMELINE + CORE MISSION VALUES */}
      {activeSubTab === "journey-statements" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* TIMELINE APPENDER PANEL FORM */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">⏳ Chronological Timeline Event Tracker</h3>
              <p className="text-[11px] text-slate-400 font-medium">Append historical data layers to build out your year-wise brand journey map.</p>
            </div>
            
            <form onSubmit={commitNewJourneyEvent} className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <input type="text" required placeholder="Year (e.g., 2026)" value={newEvent.year} onChange={e => setNewEvent({...newEvent, year: e.target.value})} className="w-full text-xs p-2 border bg-slate-50 rounded-lg focus:outline-none" />
                <input type="text" required placeholder="Milestone Title Header" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full text-xs p-2 border bg-slate-50 rounded-lg focus:outline-none col-span-2" />
              </div>
              <textarea rows="2" required placeholder="Provide clear brief description log detailing this explicit year event timeline metrics..." value={newEvent.desc} onChange={e => setNewEvent({...newEvent, desc: e.target.value})} className="w-full text-xs p-2 border bg-slate-50 rounded-lg focus:outline-none" />
              <button type="submit" className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-xl shadow-sm">Append Milestone Node</button>
            </form>

            <div className="border-t pt-2 space-y-2 max-h-40 overflow-y-auto">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Active Indexed Nodes Row ({journeyEvents.length})</span>
              {journeyEvents.map((ev, i) => (
                <div key={i} className="text-[11px] font-bold text-slate-600 bg-slate-50 p-2 rounded-lg border flex justify-between items-center">
                  <span>🗓️ {ev.year} — <strong>{ev.title}</strong></span>
                  <button onClick={() => setJourneyEvents(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-600 text-[9px] uppercase tracking-wider font-black">Remove</button>
                </div>
              ))}
            </div>
          </div>

          {/* MISSION / VISION STRATEGIC DATA FIELDS */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight">🎯 Brand Directives & Core Pillars</h3>
              <p className="text-[11px] text-slate-400 font-medium">Edit the exact vision and mission statement strings that orient corporate operations priorities panels.</p>
              
              <div className="space-y-2 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Vision Declaration Statement String</label>
                  <textarea rows="2" value={statements.vision} onChange={e => setStatements({...statements, vision: e.target.value})} className="w-full p-2 border bg-slate-50 rounded-lg focus:outline-none font-medium text-slate-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Mission Execution Statement String</label>
                  <textarea rows="2" value={statements.mission} onChange={e => setStatements({...statements, mission: e.target.value})} className="w-full p-2 border bg-slate-50 rounded-lg focus:outline-none font-medium text-slate-600" />
                </div>
              </div>
            </div>
            <button onClick={() => alert("Brand alignment statements locked into public database indices rows perfectly.")} className="w-full bg-slate-900 text-white font-bold text-[10px] uppercase py-2.5 rounded-xl tracking-wider">
              Synchronize Governance Directives
            </button>
          </div>

        </div>
      )}

    </div>
  );
}