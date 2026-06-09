"use client";

import { useState } from "react";

export default function AdminClientsManagementDashboard() {
  // MASTER IN-MEMORY REPOSITORY FOR CLIENT ENTITIES
  const [clientsList, setClientsList] = useState([
    {
      id: "CLNT-01",
      companyName: "Adani Enterprises Ltd",
      slug: "adani-enterprises",
      industry: "Mining & Heavy Infrastructure",
      servingSince: "2020",
      totalYears: "6 Years",
      logo: "🏭",
      briefDescription: "Collaborating across multiple open-cast mining cells in Singrauli for strategic distribution of high-tensile parts."
    },
    {
      id: "CLNT-02",
      companyName: "Hindalco Industries",
      slug: "hindalco-industries",
      industry: "Metallurgy & Aluminum Refineries",
      servingSince: "2022",
      totalYears: "4 Years",
      logo: "⚡",
      briefDescription: "Core strategic supplier for high-pressure industrial line hydraulics and safety audit equipment lines."
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // CONTROL FORM FIELD BINDINGS STATES SCHEMAS
  const [formData, setFormData] = useState({
    companyName: "", industry: "Mining & Heavy Infrastructure",
    servingSince: "2026", totalYears: "1 Year", logo: "🏭", briefDescription: ""
  });

  // Automatically generates url clean slugs on name input bases
  const generateSlugPattern = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const triggerCreateState = () => {
    setEditingId(null);
    setFormData({ companyName: "", industry: "Mining & Heavy Infrastructure", servingSince: "2026", totalYears: "1 Year", logo: "🏭", briefDescription: "" });
    setShowModal(true);
  };

  const triggerUpdateState = (client) => {
    setEditingId(client.id);
    setFormData(client);
    setShowModal(true);
  };

  const handleFormSubmitAction = (e) => {
    e.preventDefault();
    const cleanGeneratedSlug = generateSlugPattern(formData.companyName);

    if (editingId) {
      // UPDATE OPERATIONS LOG MATRIX
      setClientsList(prev => prev.map(item => item.id === editingId ? { ...formData, slug: cleanGeneratedSlug, id: editingId } : item));
      alert("Corporate client profile metadata records synchronized perfectly.");
    } else {
      // CREATE FRESH OPERATIONS SLOT ENTRY
      const generatedClientId = `CLNT-${Math.floor(100 + Math.random() * 900)}`;
      const payloadObj = { ...formData, slug: cleanGeneratedSlug, id: generatedClientId };
      setClientsList([...clientsList, payloadObj]);
      alert(`Success, Bhai! New corporate alliance workspace allocated under system tracking ID: ${generatedClientId}`);
    }
    setShowModal(false);
  };

  const executeTerminalWipe = (id) => {
    if (confirm("Absolute Critical Alert: Are you completely certain you want to purge this corporate client node structure? This action will break dynamic dependency links inside public route pages dashboards.")) {
      setClientsList(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ADMINISTRATIVE UTILITIES ACTION STRETCH BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Corporate Clients Registry Terminal</h1>
          <p className="text-xs text-slate-500 font-medium">Provision fresh industrial network clients accounts, update lifecycle parameters metrics, compile slugs, and synchronize accounts tracking nodes.</p>
        </div>
        <button 
          onClick={triggerCreateState}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-sm shrink-0"
        >
          ➕ Provision Client Workspace
        </button>
      </div>

      {/* SYSTEM DATAGRID LAYOUT GRID MAP TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Internal Code ID</th>
                <th className="py-4 px-5">Corporate Alliance Brand</th>
                <th className="py-4 px-5">Industrial Classification Sector</th>
                <th className="py-4 px-5">Account Tenure Specs</th>
                <th className="py-4 px-5 text-center">Data Matrix Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {clientsList.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-blue-900">{client.id}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xl bg-slate-100 p-1 rounded-lg border">{client.logo}</span>
                      <div>
                        <span className="font-black text-slate-900 block">{client.companyName}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold block">slug: /clients/{client.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-semibold text-slate-500">{client.industry}</td>
                  <td className="py-4 px-5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                      ⏱️ Since {client.servingSince} ({client.totalYears})
                    </span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button onClick={() => triggerUpdateState(client)} className="p-1 px-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-md border text-[10px] font-bold uppercase transition-all">✏️ Edit Config</button>
                      <button onClick={() => executeTerminalWipe(client.id)} className="p-1 px-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md text-[10px] font-bold uppercase transition-all">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- RECIPIENT COMPOSER BOX POPUP LAYOUT --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <form onSubmit={handleFormSubmitAction} className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                {editingId ? "Modify Alliance Profile Matrix Layout" : "Incorporate Fresh Corporate Account Workspace"}
              </h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1 sm:col-span-3">
                <label className="text-[10px] font-black text-slate-500 uppercase">Company Legal Enterprise Name</label>
                <input type="text" required placeholder="e.g., Reliance Industries Ltd" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none" />
              </div>
              <div className="space-y-1 sm:col-span-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Icon Avatar</label>
                <select value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} className="w-full text-xs px-2 py-2 border rounded-lg bg-slate-50 focus:outline-none text-center font-bold">
                  <option value="🏭">🏭</option>
                  <option value="⚡">⚡</option>
                  <option value="🚚">🚚</option>
                  <option value="🏗️">🏗️</option>
                  <option value="⛏️">⛏️</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Industrial Core Sector Branch</label>
              <select value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full text-xs px-3 py-2 border bg-slate-50 rounded-lg font-bold text-slate-700 focus:outline-none">
                <option value="Mining & Heavy Infrastructure">Mining & Heavy Infrastructure</option>
                <option value="Metallurgy & Aluminum Refineries">Metallurgy & Aluminum Refineries</option>
                <option value="Petrochemical Grids & Energy Hubs">Petrochemical Grids & Energy Hubs</option>
                <option value="Power Generation & Core Logistics">Power Generation & Core Logistics</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Sourcing Start Year</label>
                <input type="number" required placeholder="e.g., 2021" value={formData.servingSince} onChange={e => setFormData({...formData, servingSince: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Total Relationship Span</label>
                <input type="text" required placeholder="e.g., 5 Years" value={formData.totalYears} onChange={e => setFormData({...formData, totalYears: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 focus:outline-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Alliance Brief Profile Summary Description</label>
              <textarea rows="3" required placeholder="Describe cross-supply deployment zones logistics scopes lines data..." value={formData.briefDescription} onChange={e => setFormData({...formData, briefDescription: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md">
              💾 Compile Alliance Profile Infrastructure Records
            </button>
          </form>
        </div>
      )}

    </div>
  );
}