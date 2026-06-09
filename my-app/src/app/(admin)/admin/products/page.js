"use client";

import { useState } from "react";

export default function ProductsManagementPage() {
  // DUMMY MASTER PRODUCTS INVENTORY DATA
  const [products, setProducts] = useState([
    { id: "SKU-9021", name: "Industrial Safety Leather Boots (Grade A)", category: "Safety Supplies", stock: 450, status: "In Stock", price: "₹2,450", zone: "Singrauli Main Hub" },
    { id: "SKU-4412", name: "High-Pressure Hydraulic Lubrication Pump 10L", category: "Machinery", stock: 12, status: "Low Stock", price: "₹48,900", zone: "NCL Spares Depot" },
    { id: "SKU-8821", name: "Aerosol Anti-Rust Spray Premium (Case of 24)", category: "Chemicals & Spares", stock: 0, status: "Out of Stock", price: "₹8,200", zone: "Singrauli Main Hub" },
    { id: "SKU-1094", name: "Heavy Duty Lifting Textile Webbing Sling 5T", category: "Lifting Gears", stock: 85, status: "In Stock", price: "₹3,150", zone: "Korba Hub" },
    { id: "SKU-3112", name: "Insulated Electrical Rubber Gloves (Class 3)", category: "Electrical Supplies", stock: 8, status: "Low Stock", price: "₹1,850", zone: "NCL Spares Depot" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic for Real-time Grid Syncing
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. TOP TITLE BLOCK WITH BULK ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Master Products Directory</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Manage enterprise B2B item nodes, warehouses allocations, and live tracking stocks.</p>
        </div>
        <button 
          onClick={() => alert("Add Product Modal Triggered.")}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider shadow-sm transition-all flex items-center space-x-2 shrink-0"
        >
          <span>➕</span> <span>Add New SKU Item</span>
        </button>
      </div>

      {/* 2. DYNAMIC FILTERS & ANALYTICS HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input Filter */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm flex items-center space-x-2">
          <span className="text-slate-400 text-sm pl-1">🔍</span>
          <input 
            type="text" 
            placeholder="Filter table by SKU ID or Item Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs focus:outline-none text-slate-700 font-medium placeholder-slate-400"
          />
        </div>

        {/* Category Dropdown Selector */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Category Route:</span>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Safety Supplies">Safety Supplies</option>
            <option value="Machinery">Machinery</option>
            <option value="Chemicals & Spares">Chemicals & Spares</option>
            <option value="Lifting Gears">Lifting Gears</option>
            <option value="Electrical Supplies">Electrical Supplies</option>
          </select>
        </div>

        {/* Quick Insights Info Badge */}
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-sm flex items-center justify-between px-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filtered Records</span>
          <span className="text-sm font-black text-lime-400">{filteredProducts.length} / {products.length} Items</span>
        </div>
      </div>

      {/* 3. ENTERPRISE DIRECTORY MASTER TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">SKU Reference ID</th>
                <th className="py-4 px-5">Item Particular Description</th>
                <th className="py-4 px-5">Category Node</th>
                <th className="py-4 px-5">Warehouse Allocation</th>
                <th className="py-4 px-5">B2B Base Price</th>
                <th className="py-4 px-5 text-center">Live Units Stock</th>
                <th className="py-4 px-5 text-center">Availability Matrix</th>
                <th className="py-4 px-5 text-center">Management Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* SKU Code */}
                    <td className="py-4 px-5 font-mono text-slate-500 font-bold group-hover:text-slate-900">{product.id}</td>
                    
                    {/* Item Name */}
                    <td className="py-4 px-5 font-bold text-slate-900 max-w-xs truncate">{product.name}</td>
                    
                    {/* Category Label */}
                    <td className="py-4 px-5">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wide">
                        {product.category}
                      </span>
                    </td>
                    
                    {/* Zone Location */}
                    <td className="py-4 px-5 text-slate-500">{product.zone}</td>
                    
                    {/* Price Tag */}
                    <td className="py-4 px-5 font-bold text-slate-900">{product.price}</td>
                    
                    {/* Live Units */}
                    <td className="py-4 px-5 text-center font-bold text-slate-600">{product.stock} pcs</td>
                    
                    {/* Status Pill Badge mapping */}
                    <td className="py-4 px-5 text-center">
                      <span className={`inline-block text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        product.status === "In Stock" ? "bg-emerald-50 text-emerald-700" :
                        product.status === "Low Stock" ? "bg-amber-50 text-amber-700 animate-pulse" :
                        "bg-rose-50 text-rose-700"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    
                    {/* Management Action Callouts */}
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => alert(`Editing product ${product.id}`)}
                          className="p-1 px-2 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-md border border-slate-200 transition-colors text-[10px] font-bold uppercase"
                          title="Edit Product Parameters"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => alert(`Deleting product ${product.id}`)}
                          className="p-1 px-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md transition-colors text-[10px] font-bold uppercase"
                          title="Deprecate SKU Node"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-400 font-medium text-xs">
                    ⚠️ No products match your current filtration query matrices.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}