"use client";

import { useState } from "react";

export default function AdminDistributorsManagement() {
  const [distributors, setDistributors] = useState([
    { id: "DIST-101", name: "Singrauli Industrial Spares Corp", zone: "Singrauli Main Hub", contactEmail: "sourcing@siscorp.com", verifiedYear: "2019", specialty: "Heavy Machinery Belts & Bearings" }
  ]);

  const [showModal, setShowModal] = useState(false);
  
  // CONTAINER BINDING STATES DATA FORM
  const [formData, setFormData] = useState({
    name: "",
    zone: "Singrauli Main Hub",
    contactEmail: "",
    verifiedYear: "2026",
    specialty: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const uniqueGeneratedId = `DIST-${Math.floor(100 + Math.random() * 900)}`;
    const freshPayload = { ...formData, id: uniqueGeneratedId };
    
    setDistributors([...distributors, freshPayload]);
    alert(`Success, Bhai! Distributor node compiled securely with Tracking ID: ${uniqueGeneratedId}`);
    
    setShowModal(false);
    setFormData({ name: "", zone: "Singrauli Main Hub", contactEmail: "", verifiedYear: "2026", specialty: "" });
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER UTILITY ACTOR BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Supply Source Registry Console</h1>
          <p className="text-xs text-slate-500 font-medium">Provision new verified global distributorship lines, update communication endpoints, and manage logistics hubs routing.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-sm shrink-0"
        >
          ➕ Register Distributor Node
        </button>
      </div>

      {/* CORE DATA CONTROL DATAGRID TABLE GRID MAP */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">ID Node</th>
                <th className="py-4 px-5">Distributor Identity Brand Name</th>
                <th className="py-4 px-5">Operational Zone Area</th>
                <th className="py-4 px-5">Primary Specialty Scope</th>
                <th className="py-4 px-5">Contact Node coordinate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {distributors.map((dist) => (
                <tr key={dist.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-blue-900">{dist.id}</td>
                  <td className="py-4 px-5 font-black text-slate-900">{dist.name}</td>
                  <td className="py-4 px-5 font-semibold text-slate-500">📍 {dist.zone}</td>
                  <td className="py-4 px-5 font-medium text-slate-600">{dist.specialty}</td>
                  <td className="py-4 px-5 font-mono text-[11px] text-slate-400 underline">{dist.contactEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGISTRATION FORM INTERACTION MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Authorize New Supply Line Channel</h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Distributor Full Corporate Name</label>
              <input type="text" required placeholder="e.g., Reliance Industrial Components Hub" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-xs px-3 py-2 rounded-lg border bg-slate-50 focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Hub Zone Positioning</label>
                <select value={formData.zone} onChange={e => setFormData({...formData, zone: e.target.value})} className="w-full text-xs px-3 py-2 border bg-slate-50 rounded-lg font-bold text-slate-700">
                  <option value="Singrauli Main Hub">Singrauli Main Hub</option>
                  <option value="NCL Spares Depot">NCL Spares Depot</option>
                  <option value="Waidhan Sector 4">Waidhan Sector 4</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">On-Boarding Year</label>
                <input type="number" required value={formData.verifiedYear} onChange={e => setFormData({...formData, verifiedYear: e.target.value})} className="w-full text-xs px-3 py-2 rounded-lg border bg-slate-50 focus:outline-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Secure Communication Email</label>
              <input type="email" required placeholder="sourcing@partnerco.com" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} className="w-full text-xs px-3 py-2 rounded-lg border bg-slate-50 focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Sourcing Specialty Scope</label>
              <input type="text" required placeholder="e.g., Heavy Excavator Engine Spares Lines" value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full text-xs px-3 py-2 rounded-lg border bg-slate-50 focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-2.5 rounded-xl uppercase tracking-wider">
              💾 Lock and Register Distributor Credentials
            </button>
          </form>
        </div>
      )}

    </div>
  );
}