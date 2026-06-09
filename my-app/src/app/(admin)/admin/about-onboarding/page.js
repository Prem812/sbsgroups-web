"use client";

import { useState } from "react";

export default function AdminLeadershipOnboardingTokenStudio() {
  // MASTER LIFECYCLE MONITOR TRACKING SECURITY STATUSES
  const [activeTokens, setActiveTokens] = useState([
    { id: "TKN-001", targetedExecutive: "Founder (G.K. Jaiswal)", targetMail: "gk.jaiswal@sbsgroups.com", generatedOtp: "451029", expiryTime: "24 Hours Left", linkStatus: "ACTIVE / PENDING FILL" },
    { id: "TKN-002", targetedExecutive: "Co-Founder (A.K. Srivastava)", targetMail: "ak.srivastava@sbsgroups.com", generatedOtp: "908112", expiryTime: "Expired / Submitted", linkStatus: "BURNED / DATA LOCKED" }
  ]);

  const dispatchFreshSecureTokenRequest = (executiveName, targetMail) => {
    const freshGeneratedOtp = Math.floor(100000 + Math.random() * 900000);
    const mockTokenId = `TKN-${Math.floor(100 + Math.random() * 900)}`;
    const deepSecureUrl = `http://localhost:3000/secure-onboarding?targetToken=${mockTokenId}`;

    const simulatedOutboundDoubleMailerLog = `
    ========================================================================
    [ADMINISTRATIVE SECURE LOG GENERATOR — DOUBLE MAIL DISPATCH SUCCESS]
    ========================================================================
    CHANNEL MAIL 1 (To Executive Personnel): 
    -> Address : ${targetMail}
    -> Message : "Sir, please access your private secure setup window link to update your public profile description and social data fields: ${deepSecureUrl}. This session token vanishes in 24 hours."
    
    CHANNEL MAIL 2 (To Fallback Secondary/Secure Audit Device):
    -> Address : secondary-verification@sbsgroups.com
    -> Message : "ALERT: Access pass OTP key generated for ${executiveName}. Secret validation PIN code sequence: [ ${freshGeneratedOtp} ]"
    ========================================================================`;

    console.log(simulatedOutboundDoubleMailerLog);
    
    setActiveTokens([{
      id: mockTokenId,
      targetedExecutive: executiveName,
      targetMail: targetMail,
      generatedOtp: freshGeneratedOtp.toString(),
      expiryTime: "24 Hours Valid",
      linkStatus: "ACTIVE / PENDING FILL"
    }, ...activeTokens]);

    alert(`Success Bhai! Separated profile onboarding token set generated for ${executiveName}. Check terminal console to audit details.`);
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 antialiased">
      
      {/* PANEL CONTROL HEADER BAR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Executive Profile Link Provision Studio</h1>
          <p className="text-xs text-slate-500 font-medium">Generate separate multi-authenticated token parameters, trace link lifecycles, and coordinate updation request sequences.</p>
        </div>
      </div>

      {/* QUICK LAUNCH HOOK TARGET BUTTON STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-2">
          <h3 className="text-xs font-black uppercase text-slate-900">Founder Profiles Switch Configuration</h3>
          <p className="text-[11px] text-slate-400 font-medium">Deploys separate exclusive links + secondary device OTP key loops targeted for Founder node updates.</p>
          <button onClick={() => dispatchFreshSecureTokenRequest("Founder (G.K. Jaiswal)", "gk.jaiswal@sbsgroups.com")} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] tracking-wider uppercase px-4 py-2 rounded-xl shadow-sm">⚡ Deploy Founder Updation Token</button>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-2">
          <h3 className="text-xs font-black uppercase text-slate-900">Co-Founder Profiles Switch Configuration</h3>
          <p className="text-[11px] text-slate-400 font-medium">Deploys separate exclusive links + secondary device OTP key loops targeted for Co-Founder node updates.</p>
          <button onClick={() => dispatchFreshSecureTokenRequest("Co-Founder (A.K. Srivastava)", "ak.srivastava@sbsgroups.com")} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] tracking-wider uppercase px-4 py-2 rounded-xl shadow-sm">⚡ Deploy Co-Founder Updation Token</button>
        </div>
      </div>

      {/* SECURE LIFECYCLE RECONCILIATION MONITOR DATA TABLE */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b">
          <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Active Token Lifecycle Token Tracks Registry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-medium">
            <thead>
              <tr className="bg-slate-100/50 border-b text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Token Reference ID</th>
                <th className="py-4 px-5">Target Executive</th>
                <th className="py-4 px-5 font-mono">Secret OTP Key</th>
                <th className="py-4 px-5">Lifespan Timeline</th>
                <th className="py-4 px-5 text-center">Security Status Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {activeTokens.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-blue-900">{t.id}</td>
                  <td>
                    <div>
                      <p className="font-black text-slate-900">{t.targetedExecutive}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{t.targetMail}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-mono font-black text-amber-600">{t.generatedOtp}</td>
                  <td className="py-4 px-5 font-bold text-slate-500">{t.expiryTime}</td>
                  <td className="py-4 px-5 text-center">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${t.linkStatus.startsWith("ACTIVE") ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-400 border"}`}>
                      {t.linkStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}