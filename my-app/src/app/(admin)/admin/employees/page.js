"use client";

import { useState } from "react";

export default function AdminEmployeesManagement() {
  const [staffList, setStaffList] = useState([
    { id: "EMP-101", name: "G K Jaiswal", role: "Sales Executive Manager", tag: "Sales Desk", email: "jaiswal.sales@sbsgroups.com" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // FORM CONTROLLER BINDINGS STATES SCHEMAS
  const [formData, setFormData] = useState({
    name: "", role: "", tag: "Sales Desk", email: "", phone: "", biography: ""
  });

  const triggerCreateState = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", tag: "Sales Desk", email: "", phone: "", biography: "" });
    setShowModal(true);
  };

  const triggerUpdateState = (employee) => {
    setEditingId(employee.id);
    setFormData(employee);
    setShowModal(true);
  };

  const handleFormSubmitAction = (e) => {
    e.preventDefault();

    if (editingId) {
      setStaffList(prev => prev.map(emp => emp.id === editingId ? { ...formData, id: editingId } : emp));
      alert("Employee profile logs synchronized completely.");
    } else {
      const generatedStaffId = `EMP-${Math.floor(100 + Math.random() * 900)}`;
      setStaffList([...staffList, { ...formData, id: generatedStaffId }]);
      alert(`Success, Bhai! Assigned fresh workforce slot under code tracker ID: ${generatedStaffId}`);
    }
    setShowModal(false);
  };

  const executeTerminalWipe = (id) => {
    if (confirm("Critical Protocol Alert: Completely remove this staff member identity card metadata from all active tracking indices?")) {
      setStaffList(prev => prev.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ADMINISTRATIVE UTILITIES CONTROL BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Talent Pool Registry Terminal</h1>
          <p className="text-xs text-slate-500 font-medium">Provision organizational structural charts, reassign departmental tags, inject bio logs, and compile active corporate network credentials.</p>
        </div>
        <button 
          onClick={triggerCreateState}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-sm shrink-0"
        >
          ➕ Provision Employee Slot
        </button>
      </div>

      {/* CORE CONTROL SYSTEM DATA SHEET TABLE DISPLAY MAP */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Internal Code ID</th>
                <th className="py-4 px-5">Staff Identity Member Name</th>
                <th className="py-4 px-5">Core Role Designation</th>
                <th className="py-4 px-5">Departmental Tag Badge</th>
                <th className="py-4 px-5 text-center">Data Row Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {staffList.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-blue-900">{emp.id}</td>
                  <td className="py-4 px-5 font-black text-slate-900">{emp.name}</td>
                  <td className="py-4 px-5 font-semibold text-slate-500">{emp.role}</td>
                  <td className="py-4 px-5">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 border text-slate-600">{emp.tag}</span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button onClick={() => triggerUpdateState(emp)} className="p-1 px-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-md border text-[10px] font-bold uppercase transition-all">✏️ Edit Log</button>
                      <button onClick={() => executeTerminalWipe(emp.id)} className="p-1 px-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md text-[10px] font-bold uppercase transition-all">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPOSER DIALOG BOX POPUP INTERACTION FRAME */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <form onSubmit={handleFormSubmitAction} className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                {editingId ? "Synchronize Employee Credentials Profile" : "Register Fresh Staff Member Record Slot"}
              </h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Employee Full Name</label>
                <input type="text" required placeholder="G K Jaiswal" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Role Designation Specifics</label>
                <input type="text" required placeholder="Sales Manager Executive" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Operational Tag Segment</label>
                <select value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full text-xs px-3 py-2 border bg-slate-50 rounded-lg font-bold text-slate-700">
                  <option value="Sales Desk">Sales Desk (Sales Man)</option>
                  <option value="HR Operations">HR Operations (HR)</option>
                  <option value="Operations">Operations / Logistics</option>
                  <option value="Administration">Administration Board</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Contact Mobile Number</label>
                <input type="text" required placeholder="+91 94251 XXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Corporate Official Communication Mail</label>
              <input type="email" required placeholder="jaiswal.sales@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase">Operational Work Bio Summary / Scope Details</label>
              <textarea rows="3" required placeholder="Describe core daily work log parameters, active desk operations locations maps..." value={formData.biography} onChange={e => setFormData({...formData, biography: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg bg-slate-50" />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md">
              💾 Compile and Lock Roster Registry Allocation Sheet
            </button>
          </form>
        </div>
      )}

    </div>
  );
}