"use client";

import { useState } from "react";

export default function PublicProductsCatalog() {
  // PUBLIC COMPLIANT PRODUCT MASTER (No live public prices revealed)
  const [products] = useState([
    { id: "SKU-9021", name: "Industrial Safety Leather Boots (Grade A)", category: "Safety Supplies", specification: "Steel toe, Anti-slip sole, IS-certified", zone: "Singrauli Main Hub" },
    { id: "SKU-4412", name: "High-Pressure Hydraulic Lubrication Pump 10L", category: "Machinery", specification: "Max pressure 400 Bar, 3-Phase motor", zone: "NCL Spares Depot" },
    { id: "SKU-8821", name: "Aerosol Anti-Rust Spray Premium (Case of 24)", category: "Chemicals & Spares", specification: "Moisture displacement, 400ml cans", zone: "Singrauli Main Hub" },
    { id: "SKU-1094", name: "Heavy Duty Lifting Textile Webbing Sling 5T", category: "Lifting Gears", specification: "Duplex factor 7:1, Polyester material", zone: "Korba Hub" },
    { id: "SKU-3112", name: "Insulated Electrical Rubber Gloves (Class 3)", category: "Electrical Supplies", specification: "Working voltage 26,500V AC, Proof tested", zone: "NCL Spares Depot" }
  ]);

  // STATE CONTROLS FOR THE B2B QUOTATION CART
  const [rfqCart, setRfqCart] = useState([]);
  const [quantities, setQuantities] = useState({}); // Tracks quantity input per product id
  const [showFormModal, setShowFormModal] = useState(false);

  // USER DETAILS FORM STATES
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    companyName: "",
    remarks: ""
  });

  // Handle local quantity field typing changes
  const handleQtyChange = (productId, value) => {
    const qty = parseInt(value) || 1;
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  // Add Item with specified quantity directly to RFQ Bucket
  const addToRfqCart = (product) => {
    const selectedQty = quantities[product.id] || 1;
    
    setRfqCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // If already added, update the requested units count
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: selectedQty } : item
        );
      }
      return [...prevCart, { ...product, quantity: selectedQty }];
    });

    alert(`Successfully appended ${selectedQty} units of ${product.id} to your Quote Bucket.`);
  };

  // Remove Item from tracking cart array
  const removeFromCart = (id) => {
    setRfqCart(prev => prev.filter(item => item.id !== id));
  };

  // Handle Submission Action for sending quotation logs via mail triggers
  const handleQuoteSubmission = (e) => {
    e.preventDefault();
    
    const quotePayload = {
      client: formData,
      requestedItems: rfqCart
    };

    console.log("Dispatched RFQ Schema Matrix Payload:", quotePayload);
    
    alert(`Thank you, ${formData.fullName}! Your quotation request for ${rfqCart.length} item lines has been compiled. A detailed digital quotation slip is being dispatched to ${formData.email}. Our Singrauli executive will connect on ${formData.mobile}.`);
    
    // Clear state buckets post operational dispatch
    setRfqCart([]);
    setShowFormModal(false);
    setFormData({ fullName: "", email: "", mobile: "", companyName: "", remarks: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 p-4 md:p-8">
      
      {/* HEADER STRIP */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-black text-blue-900 uppercase tracking-widest">SBS GROUPS PARTNER CATALOG</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">B2B Product Sourcing Hub</h1>
          <p className="text-xs text-slate-500 font-medium">Select items, specify structural bulk quantities, and request official dispatch quotes instantly.</p>
        </div>

        {/* FLOATING BANNER BUCKET STATUS CONTROLLER */}
        <button 
          onClick={() => { if(rfqCart.length === 0) { alert("Your Quote bucket is currently empty. Please add items below."); return; } setShowFormModal(true); }}
          className="bg-blue-950 text-white font-bold text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow-lg flex items-center space-x-3 hover:bg-blue-900 transition-all transform active:scale-95"
        >
          <span>📋</span>
          <span>Quote Bucket</span>
          <span className="bg-lime-400 text-slate-950 rounded-md px-1.5 py-0.5 font-black text-[10px] animate-pulse">
            {rfqCart.length} Lines
          </span>
        </button>
      </div>

      {/* CATALOG DIRECTORY TILES GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const currentInputQty = quantities[product.id] || 1;
          const isAlreadyInCart = rfqCart.some(item => item.id === product.id);

          return (
            <div key={product.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              
              {/* Product Info Labels */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black tracking-wide uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {product.id}
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors">
                  {product.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-medium">
                  {product.specification}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center space-x-1">
                  <span>📍 Warehouse Node:</span> <span className="font-semibold text-slate-600">{product.zone}</span>
                </p>
              </div>

              {/* Price Reveal Block Interception (Policy Compliant: Hidden B2B rates) */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Value:</span>
                  <span className="text-xs font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    Price On Request
                  </span>
                </div>

                {/* Quantitative input field & basket injection layout controls */}
                <div className="flex items-center gap-2">
                  <div className="w-20 shrink-0">
                    <input 
                      type="number" 
                      min="1"
                      value={currentInputQty}
                      onChange={(e) => handleQtyChange(product.id, e.target.value)}
                      className="w-full text-center font-bold text-xs border border-slate-200 rounded-lg py-2 focus:outline-none focus:border-blue-950 bg-slate-50"
                      title="Set Bulk Quantity Requirement"
                    />
                  </div>
                  <button 
                    onClick={() => addToRfqCart(product)}
                    className={`flex-1 text-[10px] font-black uppercase tracking-wider py-2 rounded-lg transition-colors border ${
                      isAlreadyInCart 
                        ? "bg-lime-500 text-slate-900 border-lime-500" 
                        : "bg-slate-900 text-white hover:bg-slate-800 border-slate-900"
                    }`}
                  >
                    {isAlreadyInCart ? "🔄 Update Bulk Units" : "➕ Add to Quote"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* DYNAMIC BACKDROP MODAL: REQUEST FOR QUOTE USER REGISTRATION DATA INPUT FORM */}
      {/* -------------------------------------------------------------------------- */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Heading Header */}
            <div className="bg-blue-950 text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider">Compile Procurement RFQ Slip</h2>
                <p className="text-[10px] text-blue-200/70 font-medium">Please supply accurate communication coordinates below.</p>
              </div>
              <button onClick={() => setShowFormModal(false)} className="text-white/60 hover:text-white font-bold text-sm">✕</button>
            </div>

            {/* Split Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
              
              {/* Selected items array visualization display block */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Items Bundled Inside Order Line ({rfqCart.length})</p>
                <div className="divide-y divide-slate-200/60 max-h-36 overflow-y-auto pr-1">
                  {rfqCart.map((item) => (
                    <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                      <div className="truncate max-w-sm">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">ID Reference Node: {item.id}</span>
                      </div>
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="bg-blue-50 text-blue-900 font-black px-2 py-0.5 rounded text-[10px]">
                          QTY: {item.quantity} Units
                        </span>
                        <button onClick={() => removeFromCart(item.id)} className="text-rose-500 font-bold text-xs hover:text-rose-700">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Registration form input layers */}
              <form onSubmit={handleQuoteSubmission} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Contact Full Name</label>
                    <input 
                      type="text" required value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g., Amit Sharma"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Company/Enterprise Entity</label>
                    <input 
                      type="text" required value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      placeholder="e.g., Singrauli Minerals Private Ltd"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Official Email Address Address</label>
                    <input 
                      type="email" required value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="procurement@company.com"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Mobile Coordinate Number</label>
                    <input 
                      type="tel" required value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      placeholder="10-digit smartphone number"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Specific Dispatch Requirements / Remarks (Optional)</label>
                  <textarea 
                    rows="3" value={formData.remarks}
                    onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                    placeholder="Provide warehouse dispatch preferences, timeline constraints, or special packaging protocols..."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-950 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md hover:bg-blue-900 transition-colors"
                >
                  🚀 Dispatch Quotation Slip via Email & SMS
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

      {/* Embedded Mini styling layout wrapper updates */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 9px; }
      `}</style>

    </div>
  );
}