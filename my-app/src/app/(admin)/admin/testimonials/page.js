"use client";

import { useState } from "react";

export default function AdminTestimonialsControlPanel() {
  // DUMMY REPOSITORIES FOR INCOMING FEEDBACK NODES
  const [pendingSubmissions, setPendingSubmissions] = useState([
    { id: 901, clientName: "Amit Desai", position: "Procurement Manager", companyName: "Reliance Industries", testimony: "The hydraulic pump packages arrived safely at our plant node. Absolute precise fit.", status: "Pending" }
  ]);

  // FORM DISPATCH DATA BOUNDS
  const [clientCompany, setClientCompany] = useState("Adani Enterprises Ltd");
  const [targetEmail, setTargetEmail] = useState("");
  const [generatedLinkLog, setGeneratedLinkLog] = useState("");

  // LINK GENERATION HANDLER MECHANISM WITH TIMESTAMP EXPIRATION TOKEN SYNC
  const handleGenerateSecureMailer = (e) => {
    e.preventDefault();
    if (!targetEmail.trim()) return;

    // Simulating token generation with active date tracking
    const secureToken = Math.random().toString(36).substring(2, 15);
    const expiryTimestamp = Date.now() + 24 * 60 * 60 * 1000; // Exact +24 Hours baseline parameter
    
    // Sluggified dynamic email route address link
    const secureUrlPath = `http://localhost:3000/testimonials/write?token=${secureToken}&exp=${expiryTimestamp}&client=${encodeURIComponent(clientCompany)}`;
    
    setGeneratedLinkLog(secureUrlPath);
    
    alert(`System Action: A secure corporate verification template has been queued for dispatch to ${targetEmail}. Token validity strict parameters locked for 24 Hours until tomorrow exactly at this same time.`);
  };

  const approveNodeLineItem = (id) => {
    setPendingSubmissions(prev => prev.filter(item => item.id !== id));
    alert("Testimonial verification status updated to APPROVED. Entry live on target public layouts grids.");
  };

  const rejectNodeLineItem = (id) => {
    setPendingSubmissions(prev => prev.filter(item => item.id !== id));
    alert("Submission log deleted permanently from moderation buffer queues.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* LEFT COMPONENT COLUMN: SECURE EMAIL DISPATCH DISPATCH ENGINE (6 Columns) */}
      <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-5">
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Generate Secure Client Invitation Link</h2>
          <p className="text-[11px] text-slate-400 font-medium">Issue unique temporary tokens to targeted high-profile partners via email protocols.</p>
        </div>

        <form onSubmit={handleGenerateSecureMailer} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase">Select Target Client Entity</label>
            <select 
              value={clientCompany} onChange={e => setClientCompany(e.target.value)}
              className="w-full text-xs font-bold px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none"
            >
              <option value="Adani Enterprises Ltd">Adani Enterprises Ltd</option>
              <option value="Hindalco Industries">Hindalco Industries</option>
              <option value="Reliance Industries">Reliance Industries Ltd</option>
              <option value="NCL Singrauli Project">NCL Singrauli Spares Project</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase">Partner Authorized Email Coordinate</label>
            <input 
              type="email" required placeholder="procurement.desk@company.com"
              value={targetEmail} onChange={e => setTargetEmail(e.target.value)}
              className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:border-slate-900 font-medium"
            />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition-colors hover:bg-slate-800">
            📨 Dispatch Invitation Token Route Link
          </button>
        </form>

        {/* VISUAL LOGGER BADGE FOR LOCAL EMULATION SYSTEM PREVIEWS */}
        {generatedLinkLog && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2 mt-4 animate-fadeIn">
            <p className="text-[10px] font-black uppercase text-amber-800 tracking-wider flex items-center space-x-1">
              <span>⚠️</span> <span>System Dynamic Link Simulated Log Output (Valid for 24h)</span>
            </p>
            <textarea 
              readOnly value={generatedLinkLog}
              className="w-full text-[10px] font-mono p-2 bg-white rounded border border-amber-200 text-slate-600 focus:outline-none h-20 resize-none"
            />
            <p className="text-[9px] text-amber-700/80 font-medium">* Copy this URL and open it in a separate browser tab to mimic the client write interface sequence experience.</p>
          </div>
        )}
      </div>

      {/* RIGHT COMPONENT COLUMN: LIVE INCOMING VERIFICATION BUFFER (6 Columns) */}
      <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Pending Submissions Moderation Queue</h2>
          <p className="text-[11px] text-slate-400 font-medium">Verify credentials authenticity before authorizing global publication layouts nodes.</p>
        </div>

        <div className="space-y-4">
          {pendingSubmissions.length > 0 ? (
            pendingSubmissions.map((node) => (
              <div key={node.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{node.clientName}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{node.position} — <span className="font-bold text-slate-700">{node.companyName}</span></p>
                  </div>
                  <span className="text-[9px] font-black uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded animate-pulse">Pending Review</span>
                </div>
                
                <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded border border-slate-100">"{node.testimony}"</p>
                
                <div className="flex gap-2 pt-1">
                  <button onClick={() => approveNodeLineItem(node.id)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] py-1.5 rounded-lg uppercase tracking-wider transition-colors">✅ Approve Live</button>
                  <button onClick={() => rejectNodeLineItem(node.id)} className="bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 font-black text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors">Purge</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 font-medium text-center py-12 border border-dashed rounded-xl">
              📭 Moderation buffer clear. No pending testimonial submissions require tracking authorization logs.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}