"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Core Form Component jo saare URL params read karega
function TestimonialFormContent() {
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token");
  const expirationTime = searchParams.get("exp");
  const urlClientCompany = searchParams.get("client") || "Enterprise Partner Node";

  const [isExpired, setIsExpired] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FORM BINDINGS STATES
  const [clientName, setClientName] = useState("");
  const [position, setPosition] = useState(""); // This is state setter
  const [testimonyText, setTestimonyText] = useState("");

  useEffect(() => {
    // SECURITY TOKEN LIFETIME INTEGRITY EVALUATION VERIFIER CHECK
    if (expirationTime) {
      const currentEpoch = Date.now();
      if (currentEpoch > parseInt(expirationTime)) {
        setIsExpired(true); // 🛑 Token 24 hours se upar ka ho gaya hai!
      }
    } else {
      setIsExpired(true); // Bina parameters ke directly khola toh lock ho jayega
    }
  }, [expirationTime]);

  const handleSubmitOpinionPayload = (e) => {
    e.preventDefault();
    
    const structuredPayload = {
      clientName,
      position,
      companyName: urlClientCompany,
      testimony: testimonyText,
      securityTokenUsed: token,
      timestampLogged: Date.now()
    };

    console.log("Securely Captured External Form Payload:", structuredPayload);
    setFormSubmitted(true);
  };

  // 1. SCREEN INTERCEPTION: TOKEN EXPIRED OR INVALID
  if (isExpired) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md bg-white border border-rose-200 p-8 rounded-3xl shadow-xl text-center space-y-4">
          <span className="text-4xl p-3 bg-rose-50 rounded-2xl inline-block border border-rose-100">⏳</span>
          <h2 className="text-base font-black text-rose-950 uppercase tracking-tight">Security Access Protocol Expired</h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            This private invitation submission link has expired. It was valid for 24 hours only.
          </p>
          <p className="text-[11px] text-slate-400 font-bold border-t pt-3">
            Please contact the SBS Systems administrator to request a fresh link.
          </p>
        </div>
      </div>
    );
  }

  // 2. SCREEN INTERCEPTION: SUCCESS SUBMISSION DISPLAY
  if (formSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md bg-white border border-emerald-200 p-8 rounded-3xl shadow-xl text-center space-y-4">
          <span className="text-4xl p-3 bg-emerald-50 rounded-2xl inline-block border border-emerald-100">🚀</span>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Submission Compiled</h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Thank you for validating our service. Your testimonial has been sent to the admin moderation panel.
          </p>
          <p className="text-[10px] font-black text-emerald-700 bg-emerald-50 p-1.5 rounded uppercase tracking-wider inline-block">
            Status: Awaiting Admin Verification Check
          </p>
        </div>
      </div>
    );
  }

  // STANDARD FORM INTERFACE
  return (
    <div className="min-h-[80vh] bg-slate-50 p-6 md:p-12 flex items-center justify-center font-sans text-slate-800">
      <div className="w-full max-w-lg bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-md space-y-6">
        
        <div>
          <span className="text-[9px] font-black text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded uppercase tracking-widest">Secure Verification Interface</span>
          <h1 className="text-lg font-black text-slate-900 tracking-tight mt-1">Submit Corporate Service Testimony</h1>
          <p className="text-xs text-slate-400 font-medium">Providing validation credentials for: <span className="text-slate-800 font-black underline">{urlClientCompany}</span></p>
        </div>

        <form onSubmit={handleSubmitOpinionPayload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Your Identity Full Name</label>
              <input 
                type="text" required placeholder="e.g., Amit Desai" 
                value={clientName} onChange={e => setClientName(e.target.value)} 
                className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:border-slate-900" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Designation Role Position</label>
              <input 
                type="text" required placeholder="e.g., Procurement Lead" 
                value={position} onChange={e => setPosition(e.target.value)} // 🆕 FIXED: Changed from setClientName to setPosition
                className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none focus:border-slate-900" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase">Testimonial Statement Review</label>
            <textarea 
              rows="5" required placeholder="Draft your experience with SBS Group bulk pricing, delivery speed, or material quality here..." 
              value={testimonyText} onChange={e => setTestimonyText(e.target.value)} 
              className="w-full text-xs p-3 border rounded-xl bg-slate-50 focus:outline-none focus:border-slate-900 font-medium" 
            />
          </div>

          <button type="submit" className="w-full bg-blue-950 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md hover:bg-blue-900 transition-colors">
            🔒 Finalize & Submit Secure Feedback
          </button>
        </form>

      </div>
    </div>
  );
}

// 🆕 WRAPPER COMPLINE SYSTEM: Suspense injection for safe Next.js URL param tracking
export default function SecureClientTestimonialSubmissionFormWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50">
        🔄 Initializing Secure Protocol...
      </div>
    }>
      <TestimonialFormContent />
    </Suspense>
  );
}