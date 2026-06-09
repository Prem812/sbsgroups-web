"use client";

import { useState } from "react";

export default function PublicDistributorsPage() {
  // DUMMY MASTER REPOSITORY FOR AUTHORIZED DISTRIBUTORS
  const [distributors] = useState([
    { id: "DIST-101", name: "Singrauli Industrial Spares Corp", zone: "Singrauli Main Hub", contactEmail: "sourcing@siscorp.com", verifiedYear: "2019", specialty: "Heavy Machinery Belts & Bearings", logo: "⚙️" },
    { id: "DIST-102", name: "NCL Global Mining Equipment Supplier", zone: "NCL Spares Depot", contactEmail: "deals@nclglobal.in", verifiedYear: "2021", specialty: "Hydraulic Pumps & Aerosol Fluids", logo: "⚡" },
    { id: "DIST-103", name: "Vindhya Tech Electro-Mechanicals", zone: "Waidhan Sector 4", contactEmail: "orders@vindhyatech.com", verifiedYear: "2024", specialty: "Electrical Grids & Switchgears", logo: "🔌" }
  ]);

  // FUTURE CROSS-LINKED PRODUCTS DATABASE (Simulating relational lookup data matrix)
  const [globalProducts] = useState([
    { id: "SKU-9021", name: "Industrial Safety Leather Boots (Grade A)", distributorName: "Singrauli Industrial Spares Corp", specification: "Steel toe, Anti-slip sole" },
    { id: "SKU-4412", name: "High-Pressure Hydraulic Lubrication Pump 10L", distributorName: "NCL Global Mining Equipment Supplier", specification: "Max pressure 400 Bar" },
    { id: "SKU-8821", name: "Aerosol Anti-Rust Spray Premium (Case of 24)", distributorName: "NCL Global Mining Equipment Supplier", specification: "Moisture displacement" }
  ]);

  const [activeDistributorDetails, setActiveDistributorDetails] = useState(null);
  const [activeDistributorCatalog, setActiveDistributorCatalog] = useState(null);

  // Dynamic Filtering Logic matching current selected parameters
  const filteredProducts = globalProducts.filter(
    (prod) => prod.distributorName === activeDistributorCatalog?.name
  );

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* BLOCK HEADER DESCRIPTION */}
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Network Supply Chain</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Authorized Distributors Matrix</h1>
          <p className="text-xs text-slate-500 font-medium">Verify official vendor logs, corporate profile segments, and directly audit product inventories mapped cleanly to specific hubs.</p>
        </div>

        {/* DISTRIBUTORS NETWORK ROW/GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {distributors.map((dist) => (
            <div key={dist.id} className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:border-blue-950 transition-all group">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-3xl p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">{dist.logo}</span>
                  <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">{dist.id}</span>
                </div>
                
                <h3 className="text-sm font-black text-slate-900 tracking-tight mt-4 group-hover:text-blue-900 transition-colors">{dist.name}</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">📍 {dist.zone}</p>
                <p className="text-[11px] text-slate-500 mt-3 font-medium leading-relaxed">Primary Sourcing Core: <span className="font-bold text-slate-700">{dist.specialty}</span></p>
              </div>

              {/* ACTION DUAL OPTIONS LAYOUT BUTTONS */}
              <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => { setActiveDistributorDetails(dist); setActiveDistributorCatalog(null); }}
                  className="text-center text-[10px] font-black uppercase bg-slate-100 text-slate-700 py-2 rounded-xl border hover:bg-slate-200 transition-colors"
                >
                  📄 View Details
                </button>
                <button 
                  onClick={() => { setActiveDistributorCatalog(dist); setActiveDistributorDetails(null); }}
                  className="text-center text-[10px] font-black uppercase bg-blue-950 text-white py-2 rounded-xl hover:bg-blue-900 shadow-sm transition-colors"
                >
                  📦 View Products
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* INTERACTIVE COMPONENT MODAL OVERLAY 1: VIEW PROFILE SPECIFICS DETAILS */}
        {/* -------------------------------------------------------------------------- */}
        {activeDistributorDetails && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Distributor Profile Specifications</h2>
                <button onClick={() => setActiveDistributorDetails(null)} className="text-slate-400 font-bold p-1">✕</button>
              </div>
              
              <div className="space-y-3 pt-2 text-xs font-medium">
                <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-400">Corporate Identity Title</p>
                  <p className="text-sm font-black text-slate-900">{activeDistributorDetails.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[9px] font-black uppercase text-slate-400">Operational Zone</p>
                    <p className="font-bold text-slate-800">{activeDistributorDetails.zone}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[9px] font-black uppercase text-slate-400">On-Boarded Since</p>
                    <p className="font-bold text-slate-800">{activeDistributorDetails.verifiedYear} Year</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-400">Secure Procurement Communication Mail</p>
                  <p className="font-mono text-blue-900 font-bold underline">{activeDistributorDetails.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* INTERACTIVE COMPONENT MODAL OVERLAY 2: REVERSE MAP FILTERED PRODUCTS */}
        {/* -------------------------------------------------------------------------- */}
        {activeDistributorCatalog && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-3xl w-full max-w-xl p-6 space-y-4 animate-fadeIn max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center border-b pb-2 shrink-0">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Sourcing Catalog Index</h2>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Live items purchased from: {activeDistributorCatalog.name}</p>
                </div>
                <button onClick={() => setActiveDistributorCatalog(null)} className="text-slate-400 font-bold p-1">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 py-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div key={p.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center gap-4">
                      <div>
                        <span className="text-[9px] font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">{p.id}</span>
                        <h4 className="text-xs font-black text-slate-900 mt-1">{p.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{p.specification}</p>
                      </div>
                      <span className="shrink-0 font-black text-[10px] uppercase bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-md">🛡️ Active Supply</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-slate-400 font-medium py-12 border border-dashed rounded-xl">
                    ⚠️ No products currently tracked or mapped to this individual distributor node yet inside data blocks.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}