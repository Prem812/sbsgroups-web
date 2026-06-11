// File Location: src/app/admin/hero-manager/page.js
"use client";

import { useState } from "react";

export default function AdminHeroCarouselDashboard() {
  // Mock Initial Data - Matching your Prisma Schema precisely
  const [slides, setSlides] = useState([
    {
      id: "clx1234567890abcdefghijklmn",
      mediaType: "IMAGE",
      mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
      videoLoop: false,
      videoNextOnEnd: false,
      duration: 5,
      layoutType: "LEFT",
      title: "Premium Industrial Bearings",
      subtitle: "Authorized Distributors & Suppliers",
      description: "Providing high-grade mechanical spares, heavy-duty bearings, and power transmission solutions for over 20+ years.",
      ctaText: "Explore Products",
      ctaLink: "/products",
      badgeColor: "bg-red-600",
      ctaColor: "bg-blue-900 hover:bg-blue-800",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "clx234567890abcdefghijklmno",
      mediaType: "VIDEO",
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with valid video link
      videoLoop: false,
      videoNextOnEnd: true,
      duration: 0,
      layoutType: "CENTER",
      title: "DGMS Approved Safety Equipment",
      subtitle: "Prioritizing Workplace Safety",
      description: "Complete industrial safety gear, certified PPE kits, high-visibility clothing, and premium safety shoes for mining & plants.",
      ctaText: "View Safety Range",
      ctaLink: "/products?category=safety",
      badgeColor: "bg-yellow-600",
      ctaColor: "bg-green-700 hover:bg-green-600",
      sortOrder: 2,
      isActive: true,
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // CONTROL FORM FIELD BINDINGS STATES (Precise Type Matches for Prisma Model)
  const [formData, setFormData] = useState({
    mediaType: "IMAGE",
    mediaUrl: "",
    videoLoop: false,
    videoNextOnEnd: false,
    duration: 5,
    layoutType: "LEFT",
    title: "",
    subtitle: "",
    description: "",
    ctaText: "Learn More",
    ctaLink: "#",
    badgeColor: "bg-red-600",
    ctaColor: "bg-blue-900 hover:bg-blue-800",
    sortOrder: 0,
    isActive: true,
  });

  const openCreateTrigger = () => {
    setEditingId(null);
    setFormData({
      mediaType: "IMAGE",
      mediaUrl: "",
      videoLoop: false,
      videoNextOnEnd: false,
      duration: 5,
      layoutType: "LEFT",
      title: "",
      subtitle: "",
      description: "",
      ctaText: "Learn More",
      ctaLink: "#",
      badgeColor: "bg-red-600",
      ctaColor: "bg-blue-900 hover:bg-blue-800",
      sortOrder: slides.length + 1,
      isActive: true,
    });
    setShowModal(true);
  };

  const openUpdateTrigger = (slide) => {
    setEditingId(slide.id);
    setFormData(slide);
    setShowModal(true);
  };

  const handleFormSubmissionSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setSlides(prev => prev.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
      alert("Hero slide database structural properties updated successfully.");
    } {
      const generatedCuid = `clx${Math.random().toString(36).substr(2, 25)}`;
      const payloadObj = { ...formData, id: generatedCuid };
      setSlides([...slides, payloadObj]);
      alert(`Success! New Slider Element Node deployed with ID: ${generatedCuid}`);
    }
    setShowModal(false);
  };

  const toggleSlideStatus = (id) => {
    setSlides(prev => prev.map(slide => slide.id === id ? { ...slide, isActive: !slide.isActive } : slide));
  };

  const terminalWipeDelete = (id) => {
    if (confirm("CRITICAL ACTION: Are you absolutely certain you want to purge this Hero Slide node? This will remove it instantly from the public homepage view.")) {
      setSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= HEADER ACTORS CONTROL BAR ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-900 px-2 py-0.5 rounded font-black tracking-widest uppercase">
              Homepage Layout Engine
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase mt-1">
              Hero Carousel Studio
            </h1>
            <p className="text-xs text-slate-400 font-medium max-w-2xl mt-0.5">
              Configure premium marketing slides, toggle image/video matrices, optimize timing logic loops, and inject custom call-to-action color layouts dynamically.
            </p>
          </div>
          <button 
            onClick={openCreateTrigger}
            className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-5 py-3 rounded-xl uppercase tracking-widest transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>➕</span> Provision Slide Matrix
          </button>
        </div>

        {/* ================= GRID LIST WITH ADVANCED UI/UX CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {slides.sort((a,b) => a.sortOrder - b.sortOrder).map((slide) => (
            <div 
              key={slide.id} 
              className={`bg-slate-900 rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-xl ${
                slide.isActive ? "border-slate-800 hover:border-slate-700" : "border-rose-950/50 opacity-60"
              }`}
            >
              {/* Media Preview Window Frame */}
              <div className="relative h-44 w-full bg-slate-950 border-b border-slate-800 overflow-hidden group">
                {slide.mediaType === "VIDEO" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                    <span className="absolute top-3 left-3 bg-indigo-600/90 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider z-10 flex items-center gap-1">
                      📹 VIDEO FRAME
                    </span>
                    <video className="w-full h-full object-cover opacity-40" muted playsInline src={slide.mediaUrl} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-2xl">▶️</span>
                      <p className="text-[10px] text-slate-400 font-mono mt-1 max-w-xs truncate">{slide.mediaUrl}</p>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${slide.mediaUrl})` }}
                  >
                    <span className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider z-10">
                      🖼️ IMAGE CANVAS
                    </span>
                  </div>
                )}
                
                {/* Float Indicators Pill */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <span className="bg-slate-900/80 backdrop-blur border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded text-slate-300">
                    Order: {slide.sortOrder}
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded text-slate-300 uppercase">
                    📐 {slide.layoutType}
                  </span>
                </div>
              </div>

              {/* Content Framework Body */}
              <div className="p-5 space-y-3 flex-1">
                <div>
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white ${slide.badgeColor}`}>
                    {slide.subtitle || "NO SUBTITLE"}
                  </span>
                  <h3 className="text-base font-black text-white tracking-tight line-clamp-1 mt-1.5">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium line-clamp-2 mt-1 leading-relaxed">
                    {slide.description || "No descriptive brief registered for this slider node vector structure."}
                  </p>
                </div>

                {/* Timing Logic Metadata Strip */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 text-[10px] font-mono text-slate-400">
                  <div>⏱️ Delay: <span className="text-amber-400 font-bold">{slide.mediaType === "VIDEO" && slide.videoNextOnEnd ? "Video End" : `${slide.duration}s`}</span></div>
                  <div>🔄 Loop: <span className="text-slate-200">{slide.videoLoop ? "ENABLED" : "DISABLED"}</span></div>
                </div>

                {/* CTA Blueprint Details */}
                <div className="flex items-center gap-2 border-t border-slate-800/80 pt-3 text-[11px]">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">CTA Button:</span>
                  <a href={slide.ctaLink} target="_blank" className={`px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-tight ${slide.ctaColor}`}>
                    {slide.ctaText} ➔
                  </a>
                </div>
              </div>

              {/* Action Trigger Buttons footer Node */}
              <div className="bg-slate-950/40 border-t border-slate-800/80 px-5 py-3.5 flex items-center justify-between gap-2">
                <button 
                  onClick={() => toggleSlideStatus(slide.id)}
                  className={`text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg border transition-all ${
                    slide.isActive 
                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-900 hover:bg-emerald-900 hover:text-white" 
                      : "bg-rose-950/40 text-rose-400 border-rose-900 hover:bg-rose-900 hover:text-white"
                  }`}
                >
                  {slide.isActive ? "🟢 Active Node" : "🔴 Suspended"}
                </button>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openUpdateTrigger(slide)} 
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 text-[10px] font-black uppercase tracking-wider transition-all"
                  >
                    ✏️ Modify Config
                  </button>
                  <button 
                    onClick={() => terminalWipeDelete(slide.id)} 
                    className="p-1.5 bg-rose-950/30 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-900/50 rounded-xl text-[10px] font-bold uppercase transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ================= COMPOSER SIDE SHEET / MODAL DIALOG ================= */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center p-4 z-50 transition-all">
            <form 
              onSubmit={handleFormSubmissionSubmit} 
              className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl w-full max-w-2xl shadow-2xl p-6 space-y-5 max-h-[92vh] overflow-y-auto"
            >
              {/* Modal Top Branding Controller */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-blue-400">
                    {editingId ? "Update Structural Configuration Grid" : "Provision Corporate Frame Parameters"}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-medium">Map variables parameters directly bounded to MySQL engine mapping fields.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* CORE MEDIA SWITCH SELECTORS SECTION */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Media Target Stream Type</label>
                    <select 
                      value={formData.mediaType} 
                      onChange={e => setFormData({...formData, mediaType: e.target.value})} 
                      className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 font-bold focus:outline-none"
                    >
                      <option value="IMAGE">IMAGE ASSET CHANNEL</option>
                      <option value="VIDEO">VIDEO LIVE STREAM CHANNEL</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Canvas Layout Alignment</label>
                    <select 
                      value={formData.layoutType} 
                      onChange={e => setFormData({...formData, layoutType: e.target.value})} 
                      className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 font-bold focus:outline-none"
                    >
                      <option value="LEFT">LEFT COMPONENT STACK</option>
                      <option value="CENTER">CENTER BALANCED STACK</option>
                      <option value="RIGHT">RIGHT COMPONENT STACK</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Resource Path Asset URL</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={formData.mediaType === 'VIDEO' ? "e.g., https://storage.googleapis.com/production.mp4" : "e.g., https://images.unsplash.com/photo-..."} 
                    value={formData.mediaUrl} 
                    onChange={e => setFormData({...formData, mediaUrl: e.target.value})} 
                    className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono" 
                  />
                </div>

                {/* Conditional Video Controls Rendering Trigger Logic */}
                {formData.mediaType === "VIDEO" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="v_loop" 
                        checked={formData.videoLoop} 
                        onChange={e => setFormData({...formData, videoLoop: e.target.checked})} 
                        className="w-4 h-4 accent-blue-500" 
                      />
                      <label htmlFor="v_loop" className="text-[11px] font-bold text-slate-300 select-none cursor-pointer">Enable Infinite Loop</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="v_next" 
                        checked={formData.videoNextOnEnd} 
                        onChange={e => setFormData({...formData, videoNextOnEnd: e.target.checked})} 
                        className="w-4 h-4 accent-blue-500" 
                      />
                      <label htmlFor="v_next" className="text-[11px] font-bold text-slate-300 select-none cursor-pointer">Auto-Next on Video Ended</label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Slide Auto-Rotation Intermission Delay (Seconds)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="30" 
                      value={formData.duration} 
                      onChange={e => setFormData({...formData, duration: parseInt(e.target.value) || 5})} 
                      className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-bold" 
                    />
                  </div>
                )}
              </div>

              {/* TEXT CONTENTS META INJECTION SPACE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Slide Master Headline Title</label>
                  <input type="text" required placeholder="Heavy Modular Conveyor Units" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Subheading / Badge Label Pitch</label>
                  <input type="text" placeholder="Authorized OEM Dealers" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Core Descriptive Brief Summary Paragraph</label>
                <textarea rows="2" placeholder="Provide strategic details about payload metrics, plant integration specifications..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full text-xs p-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none" />
              </div>

              {/* STYLE HOOKS AND SORT CONTROLS SPACE */}
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Call-to-Action Text String</label>
                  <input type="text" value={formData.ctaText} onChange={e => setFormData({...formData, ctaText: e.target.value})} className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">CTA Hyperlink Address Route</label>
                  <input type="text" value={formData.ctaLink} onChange={e => setFormData({...formData, ctaLink: e.target.value})} className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Badge CSS Layout Style Color Class</label>
                  <input type="text" value={formData.badgeColor} onChange={e => setFormData({...formData, badgeColor: e.target.value})} className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-amber-400" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">CTA Button CSS Classes Node</label>
                  <input type="text" value={formData.ctaColor} onChange={e => setFormData({...formData, ctaColor: e.target.value})} className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-amber-400" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Sort Sequential Order Priority Index</label>
                  <input type="number" value={formData.sortOrder} onChange={e => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} className="w-full text-xs px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none font-bold" />
                </div>
                <div className="flex items-center gap-2 pt-5 pl-1">
                  <input 
                    type="checkbox" 
                    id="is_active_check" 
                    checked={formData.isActive} 
                    onChange={e => setFormData({...formData, isActive: e.target.checked})} 
                    className="w-4 h-4 accent-blue-500 cursor-pointer" 
                  />
                  <label htmlFor="is_active_check" className="text-xs font-black text-slate-300 select-none cursor-pointer uppercase tracking-wider">Deploy Instantly onto Public View</label>
                </div>
              </div>

              {/* ACTION ENGINE EMITTER NODE */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-4 rounded-2xl uppercase tracking-widest shadow-xl transition-all"
              >
                🚀 Synchronize Hero Slider Blueprint Schema
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}