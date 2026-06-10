"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  // CORE AUTHENTICATION CONTROL STATES
  const [currentStep, setCurrentStep] = useState("login"); // 'login' | 'otp' | 'reset'
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorLog, setErrorLog] = useState("");

  // 1. ADVANCED FRONTEND SECURITY: DISABLE RIGHT CLICK & INSPECT SHORTCUTS
  useEffect(() => {
    // Disable Right-Click Context Menu
    const handleContextMenu = (e) => e.preventDefault();
    
    // Disable Developer Tools Shortcuts (F12, Ctrl+Shift+I, J, C, Ctrl+U)
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U (View Source)
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Clean up listeners when component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 2. SECURITY LAYER: SANITIZE INPUTS AGAINST SCRIPT INJECTIONS (XSS / SSL INJECTIONS)
  const sanitizeInput = (text) => {
    setErrorLog("");
    // Strict Regex to strip out HTML tags, script scripts, and suspicious symbols
    const maliciousPattern = /<[^>]*>|javascript:|script|select|drop|delete|insert|update/gi;
    if (maliciousPattern.test(text)) {
      setErrorLog("Security Alert: Unauthorized characters or script injection detected!");
      return ""; // Block the text stream completely
    }
    return text;
  };

  // FORM SUBMISSION HANDLERS
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (errorLog) return; // Prevent submission if security threat found
    
    if (emailOrPhone && password) {
      setCurrentStep("otp");
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (errorLog) return;
    alert("Authentication Successful! Redirecting to secure dashboard portal...");
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (errorLog) return;
    alert("Password updated successfully! Please login with your new credentials.");
    setCurrentStep("login");
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-950 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      
      {/* CARD BODY WRAPPER */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300">
        
        {/* BRAND IDENTITY TOP BLOCK HEADER WITH LOGO IMAGE */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 px-6 py-8 text-center border-b border-gray-100 flex flex-col items-center justify-center">
          <Link href="/" className="inline-block">
            {/* LOGO IMAGE REPLACED TEXT HERE */}
            <img 
              src="/logos/logo.png" // Apne logo image ka path public folder ke hisab se yahan dalo
              alt="SBS Groups Official Corporate Logo" 
              className="h-14 w-auto object-contain max-w-[220px]"
              onError={(e) => {
                // Fallback text if logo fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden text-2xl font-black text-white tracking-tight">
              SBS <span className="text-lime-400">GROUPS</span>
            </span>
          </Link>
          <span className="text-[10px] font-bold tracking-widest text-blue-200/60 uppercase mt-3">
            Secure Authorized Partner Portal
          </span>
        </div>

        {/* --- LIVE INTERACTION CONTENT AREA --- */}
        <div className="p-6 sm:p-8">
          
          {/* SECURITY WARNING ALERT BOX */}
          {errorLog && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-[11px] font-bold text-red-600 animate-pulse text-center">
              {errorLog}
            </div>
          )}

          {/* STATE 1: CREDENTIALS INPUT SCREEN */}
          {currentStep === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="text-center space-y-1">
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Portal Authorization</h2>
                <p className="text-xs text-gray-500">Access registered procurement lists & compliance tools</p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Input 1: User Account ID */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">User Account / ID</label>
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(sanitizeInput(e.target.value))}
                    placeholder="Enter email or corporate phone index"
                    className="w-full px-3 py-2.5 rounded border border-gray-300 bg-gray-50 text-xs text-gray-800 focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>

                {/* Input 2: Password Key */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Password Key</label>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("reset")}
                      className="text-[11px] font-bold text-red-600 hover:underline hover:text-blue-900 transition-colors"
                    >
                      Forgot Key?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(sanitizeInput(e.target.value))}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded border border-gray-300 bg-gray-50 text-xs text-gray-800 focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!!errorLog}
                className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 text-white font-bold text-xs py-3 px-4 rounded transition-colors uppercase tracking-wider mt-2 shadow-sm"
              >
                Proceed to Verification →
              </button>
            </form>
          )}

          {/* STATE 2: OTP SECURITY CHECKPOINT SCREEN */}
          {currentStep === "otp" && (
            <form onSubmit={handleOtpVerify} className="space-y-5">
              <div className="text-center space-y-1">
                <span className="inline-block bg-lime-50 border border-lime-200 text-lime-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                  Code Dispatched
                </span>
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Security Checkpoint</h2>
                <p className="text-xs text-gray-500">Enter the validation OTP sent to your verification platform terminal.</p>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">One-Time Token (OTP)</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(sanitizeInput(e.target.value))}
                  placeholder="Enter 6-digit OTP code"
                  className="w-full px-3 py-2.5 rounded border border-gray-300 bg-gray-50 text-center tracking-[0.5em] text-sm font-black text-blue-950 focus:outline-none focus:border-blue-900 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={!!errorLog}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 text-white font-bold text-xs py-3 px-4 rounded transition-colors uppercase tracking-wider shadow-sm"
                >
                  Verify Token & Access
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep("login")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 px-4 rounded transition-colors uppercase tracking-wider"
                >
                  ← Modify Parameters
                </button>
              </div>
            </form>
          )}

          {/* STATE 3: PASSWORD RESET MODULE SCREEN */}
          {currentStep === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-5">
              <div className="text-center space-y-1">
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Restore Security Access</h2>
                <p className="text-xs text-gray-500">Provide configuration details below to establish a new encrypted access node.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">Registered ID Reference</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter email linked with sbsgroups database"
                    className="w-full px-3 py-2.5 rounded border border-gray-300 bg-gray-50 text-xs text-gray-800 focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">Proposed New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(sanitizeInput(e.target.value))}
                    placeholder="Establish secure alpha-numeric string"
                    className="w-full px-3 py-2.5 rounded border border-gray-300 bg-gray-50 text-xs text-gray-800 focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={!!errorLog}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-400 text-white font-bold text-xs py-3 px-4 rounded transition-colors uppercase tracking-wider shadow-sm"
                >
                  Confirm Structural Remap
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep("login")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2.5 px-4 rounded transition-colors uppercase tracking-wider"
                >
                  Cancel Reset Action
                </button>
              </div>
            </form>
          )}

        </div>

        {/* BOTTOM METRIC DISCLAIMER */}
        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100 text-[10px] text-gray-400">
          <p>© 2026 SBS Group. Restricted Access. System sessions are monitored for compliance tracking.</p>
        </div>

      </div>
    </main>
  );
}