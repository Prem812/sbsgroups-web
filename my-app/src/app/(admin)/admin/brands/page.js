"use client";

import { useState } from "react";

export default function AdminBrandsManagementDashboard() {
  const [brands, setBrands] = useState([
    { id: "BRND-01", name: "SBS Heavy Machinery Spares", tagline: "Precision Engineering", vision: "To minimize field breakdowns..." }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // CONTROL FORM FIELD BINDINGS STATES
  const [formData, setFormData] = useState({
    name: "", tagline: "", vision: "", mission: "",
    founderName: "", coFounderName: "", galleryUrl: ""
  });

  const openCreateTrigger = () => {
    setEditingId(null);
    setFormData({ name: "", tagline: "", vision: "", mission: "", founderName: "", coFounderName: "", galleryUrl: "" });
    setShowModal(true);
  };

  const openUpdateTrigger = (brand) => {
    setEditingId(brand.id);
    setFormData(brand);
    setShowModal(true);
  };

  const handleFormSubmissionSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setBrands(prev => prev.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
      alert("Brand entity metadata structure synchronized perfectly.");
    } else {
      const generatedBrandId = `BRND-${Math.floor(10 + Math.random() * 90)}`;
      const payloadObj = { ...formData, id: generatedBrandId };
      setBrands([...brands, payloadObj]);
      alert(`Success, Bhai! New corporate brand branch allocated under ID: ${generatedBrandId}`);
    }
    setShowModal(false);
  };

  const terminalWipeDelete = (id) => {
    if (confirm("Absolute Critical Alert: Are you completely certain you want to purge this brand subsidiary node structure line? This clears all sub-linked assets.")) {
      setBrands(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER CONTROL STRIP ACTORS BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Corporate Vertical Registry Console</h1>
          <p className="text-xs text-slate-500 font-medium">Provision new dynamic brands, modify strategic alignment frameworks, upload work gallery hooks, and assign executive leadership grids.</p>
        </div>
        <button 
          onClick={openCreateTrigger}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-sm shrink-0"
        >
          ➕ Provision Brand Vertical
        </button>
      </div>

      {/* CORE BRANDS LIST DATA SCHEMAS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Brand ID</th>
                <th className="py-4 px-5">Subsidiary Corporate Title</th>
                <th className="py-4 px-5">Tagline Pitch Stream</th>
                <th className="py-4 px-5 text-center">System Node Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {brands.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-blue-900">{item.id}</td>
                  <td className="py-4 px-5 font-black text-slate-900">{item.name}</td>
                  <td className="py-4 px-5 font-medium text-slate-500 italic">"{item.tagline}"</td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button onClick={() => openUpdateTrigger(item)} className="p-1 px-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-md border border-slate-200 text-[10px] font-bold uppercase transition-colors">✏️ Edit Matrix</button>
                      <button onClick={() => terminalWipeDelete(item.id)} className="p-1 px-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md text-[10px] font-bold uppercase transition-colors">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- RICH COMPOSER DIALOG MODAL LAYOUT --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <form onSubmit={handleFormSubmissionSubmit} className="bg-white rounded-2xl w-full max-w-xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                {editingId ? "Update Subsidiary Structural Configuration" : "Establish New Subsidiary Brand Umbrella"}
              </h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Brand Identity Title</label>
                <input type="text" required placeholder="e.g., SBS Heavy Logistics" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Brand Slogan / Tagline Pitch</label>
                <input type="text" required placeholder="Automating Industrial Flows" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Core Corporate Vision Parameter</label>
              <textarea rows="2" required placeholder="State long-term strategic target vectors..." value={formData.vision} onChange={e => setFormData({...formData, vision: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg bg-slate-50" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Execution Mission Manifesto</label>
              <textarea rows="2" required placeholder="State actionable everyday operational goals..." value={formData.mission} onChange={e => setFormData({...formData, mission: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg bg-slate-50" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Founder Identity Name</label>
                <input type="text" required placeholder="G.K. Jaiswal" value={formData.founderName} onChange={e => setFormData({...formData, founderName: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Co-Founder Identity Name</label>
                <input type="text" required placeholder="A.K. Srivastava" value={formData.coFounderName} onChange={e => setFormData({...formData, coFounderName: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">In-line Field Work Gallery Hub Image URL</label>
              <input type="text" placeholder="https://images.unsplash.com/photo-xxx" value={formData.galleryUrl} onChange={e => setFormData({...formData, galleryUrl: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md">
              💾 Compile Brand Architecture Layout Matrix
            </button>
          </form>
        </div>
      )}

    </div>
  );
}