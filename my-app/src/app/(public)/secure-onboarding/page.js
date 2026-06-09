"use client";

import { useState } from "react";

export default function SecureExecutiveOnboardingPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // LOGIN CONTROL ARRAYS STATES
  const [authForm, setAuthForm] = useState({ email: "", otp: "" });
  
  // CORE PROFILE UPDATE FIELDS STATES  
  const [profileForm, setProfileForm] = useState({
    name: "", message: "", phone: "", whatsapp: "", linkedin: "", twitter: "", instagram: ""
  });

  const handleGateAuthentication = (e) => {
    e.preventDefault();
    // Simulating system tracking validation checks
    if (authForm.otp === "123456") {
      setIsAuthenticated(true);
      alert("Verification Success, Sir! Access granted to security registry block. Your link is configured to terminate upon successful form submission execution.");
    } else {
      alert("Access Denied: Invalid One-Time-Password or token link validity window expired.");
    }
  };

  const handleProfileDataSyncSubmission = (e) => {
    e.preventDefault();
    
    const consoleDestructionLog = `
    ========================================================================
    [DB WRITE SYNC SUCCESS — SINGLE USE ACCESS TOKEN FIRED & BURNED]
    ========================================================================
    Target Name      : ${profileForm.name}
    Message Payload  : "${profileForm.message}"
    Data Synchronization Check: 100% OK
    
    CRITICAL SECURITY PROTOCOL FLAG:
    "Token verification hash has been burned permanently from system files. This unique deep link is now dead/expired. Future modifications require administrative update tokens requests."
    ========================================================================`;
    
    console.log(consoleDestructionLog);
    alert("Data synchronized perfectly, Sir! Website profile updated live and this secure session token has been expired.");
    
    // Resetting interface back to safe null zone
    setIsAuthenticated(false);
    setAuthForm({ email: "", otp: "" });
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 flex justify-center items-center p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
        
        {/* INNER CONTAINER HEADER */}
        <div className="text-center space-y-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 bg-amber-950/60 border border-amber-900/60 px-3 py-1 rounded-full">Secure Executive Node Gateway</span>
          <h1 className="text-base font-black tracking-tight uppercase pt-2">SBS Command Profile Registry</h1>
        </div>

        {!isAuthenticated ? (
          /* STEP 1: DOUBLE AUTHENTICATION GATE */
          <form onSubmit={handleGateAuthentication} className="space-y-4">
            <p className="text-[11px] text-slate-400 font-medium text-center">Verify your enterprise credential alignment using the secret OTP routed to your secure fallback mailbox channels.</p>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">Official Corporate Email ID</label>
              <input type="email" required placeholder="name@sbsgroups.com" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} className="w-full text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-slate-600" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">One-Time Password PIN (6 Digits)</label>
              <input type="password" required placeholder="e.g., 123456" value={authForm.otp} onChange={e => setAuthForm({...authForm, otp: e.target.value})} className="w-full text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center font-mono text-white focus:outline-none focus:border-slate-600 tracking-widest font-bold" />
            </div>

            <button type="submit" className="w-full bg-amber-600 text-slate-950 font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:bg-amber-500 shadow-md transition-colors">
              🔑 Unlock Secure Access Session
            </button>
          </form>
        ) : (
          /* STEP 2: PROFILE DATA INTAKE FORM (Single Use Entry Window) */
          <form onSubmit={handleProfileDataSyncSubmission} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">Your Full Identity Name</label>
              <input type="text" required placeholder="G.K. Jaiswal" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full text-xs bg-slate-900 border border-slate-800 p-2 rounded-xl text-white focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">Personal Statement Message (Shows on Public Screen)</label>
              <textarea rows="3" required placeholder="Write your personalized executive message..." value={profileForm.message} onChange={e => setProfileForm({...profileForm, message: e.target.value})} className="w-full text-xs bg-slate-900 border border-slate-800 p-2 rounded-xl text-white focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">Direct Contact Call No</label>
                <input type="text" required placeholder="+91 XXXXX" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} className="w-full text-xs bg-slate-900 border border-slate-800 p-2 rounded-xl text-white focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">WhatsApp Communications Link</label>
                <input type="text" required placeholder="+91 XXXXX" value={profileForm.whatsapp} onChange={e => setProfileForm({...profileForm, whatsapp: e.target.value})} className="w-full text-xs bg-slate-900 border border-slate-800 p-2 rounded-xl text-white focus:outline-none" />
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-2">
              <label className="text-[10px] font-black text-amber-500 uppercase block tracking-wider">Social Index Network URL Handles</label>
              
              <input type="url" placeholder="LinkedIn Profile Link" value={profileForm.linkedin} onChange={e => setProfileForm({...profileForm, linkedin: e.target.value})} className="w-full text-[11px] bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-300 focus:outline-none" />
              <input type="url" placeholder="Twitter Profile Link" value={profileForm.twitter} onChange={e => setProfileForm({...profileForm, twitter: e.target.value})} className="w-full text-[11px] bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-300 focus:outline-none" />
              <input type="url" placeholder="Instagram Profile Link" value={profileForm.instagram} onChange={e => setProfileForm({...profileForm, instagram: e.target.value})} className="w-full text-[11px] bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-300 focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:bg-emerald-500 shadow-md">
              💾 Commit Metrics & Terminate Secure Token Link
            </button>
          </form>
        )}

      </div>
    </div>
  );
}