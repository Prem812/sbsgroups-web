"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ✅ DATA NOW LIVES IN A SEPARATE FILE — single source of truth
import { categories, getAllFlattenedProducts } from "@/data/products";

function ProductsCatalogContent() {
  const searchParams = useSearchParams();

  // LIVE CAPTURE: Capture query string safely from the global layout header search bar input
  const globalSearchQuery = searchParams.get("search") || "";

  // FLAWFUL EXTRACT: Compiles flat list of all items across hierarchy for flawless filtering matrix
  const allFlattenedProducts = useMemo(() => getAllFlattenedProducts(), []);

  // STATE CONTROLS FOR THE B2B QUOTATION CART (100% Unchanged)
  const [rfqCart, setRfqCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showFormModal, setShowFormModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedItems, setSelectedItems] = useState({});

  // USER DETAILS FORM STATES (100% Unchanged)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    companyName: "",
    remarks: ""
  });

  const handleToggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedItems(prev => {
      const updated = { ...prev };
      const category = categories.find(c => c.id === categoryId);

      if (updated[categoryId]) {
        delete updated[categoryId];
        if (category) {
          category.subcategories.forEach(sub => {
            delete updated[sub.id];
          });
        }
      } else {
        updated[categoryId] = true;
        if (category) {
          category.subcategories.forEach(sub => {
            updated[sub.id] = true;
          });
        }
      }
      return updated;
    });
  };

  const handleSelectSubcategory = (categoryId, subcategoryId) => {
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (updated[subcategoryId]) {
        delete updated[subcategoryId];
      } else {
        updated[subcategoryId] = true;
      }

      const category = categories.find(c => c.id === categoryId);
      if (category) {
        const allChecked = category.subcategories.every(sub => updated[sub.id]);
        if (allChecked) {
          updated[categoryId] = true;
        } else {
          delete updated[categoryId];
        }
      }
      return updated;
    });
  };

  const getSelectedCount = () => {
    return Object.keys(selectedItems).filter(key => key.startsWith("subcat-")).length;
  };

  const handleQtyChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const addToRfqCart = (product) => {
    const selectedQty = quantities[product.id] || 1;
    setRfqCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: selectedQty } : item
        );
      }
      return [...prevCart, { ...product, quantity: selectedQty }];
    });
    alert(`Successfully appended ${selectedQty} units of ${product.id} to your Quote Bucket.`);
  };

  const removeFromCart = (id) => {
    setRfqCart(prev => prev.filter(item => item.id !== id));
  };

  const handleQuoteSubmission = (e) => {
    e.preventDefault();
    const quotePayload = { client: formData, requestedItems: rfqCart };
    console.log("Dispatched RFQ Schema Matrix Payload:", quotePayload);
    alert(`Thank you, ${formData.fullName}! Your quotation request for ${rfqCart.length} item lines has been compiled.`);
    setRfqCart([]);
    setShowFormModal(false);
    setFormData({ fullName: "", email: "", mobile: "", companyName: "", remarks: "" });
  };

  // ============================ NEW ADVANCED SEARCH ENGINE ENGINE ============================
  const finalVisibleProducts = useMemo(() => {
    const activeSubcatIds = Object.keys(selectedItems).filter(key => key.startsWith("subcat-"));
    const query = globalSearchQuery.toLowerCase().trim();

    return allFlattenedProducts.filter((product) => {
      // Rule A: If sidebar filters are active, item must match selected subcategory
      if (activeSubcatIds.length > 0 && !activeSubcatIds.includes(product.subCatId)) {
        return false;
      }
      // Rule B: Match text filter against multiple item tags
      if (query) {
        return (
          product.name.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query) ||
          product.specification.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.zone.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [allFlattenedProducts, selectedItems, globalSearchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">

      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black text-blue-900 uppercase tracking-widest">SBS GROUPS PARTNER CATALOG</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">B2B Product Sourcing Hub</h1>
            <p className="text-xs text-slate-500 font-medium">Browse categories, select items, and request official dispatch quotes instantly.</p>
          </div>

          <button
            onClick={() => { if(rfqCart.length === 0) { alert("Your Quote bucket is empty."); return; } setShowFormModal(true); }}
            className="bg-blue-950 text-white font-bold text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow-lg flex items-center space-x-3 hover:bg-blue-900 transition-all transform active:scale-95 whitespace-nowrap"
          >
            <span>📋</span>
            <span>Quote Bucket</span>
            <span className="bg-lime-400 text-slate-950 rounded-md px-1.5 py-0.5 font-black text-[10px]">
              {rfqCart.length} Lines
            </span>
          </button>
        </div>
      </div>

      {/* VIEW ENGINE LAYOUT CONTROLLER */}
      <div className="flex flex-col md:flex-row gap-0">

        {/* LEFT NAVIGATION SIDEBAR */}
        <div className="w-full md:w-80 bg-white border-r border-slate-200 overflow-y-auto max-h-[calc(100vh-140px)] sticky top-24">
          <div className="p-4">
            <div className="mb-4 pb-4 border-b border-slate-200">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Categories</h2>
              <p className="text-[10px] text-slate-500 font-medium">
                Active Selection Tags: <span className="font-black text-blue-900">{getSelectedCount()}</span>
              </p>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={!!selectedItems[category.id]}
                      onChange={() => handleSelectCategory(category.id)}
                      className="w-4 h-4 rounded border-slate-300 cursor-pointer accent-blue-900"
                    />
                    <button
                      onClick={() => handleToggleCategory(category.id)}
                      className="flex-1 text-left flex items-center justify-between hover:text-blue-900 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-xs font-black text-slate-900 uppercase tracking-wide">{category.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{expandedCategories[category.id] ? "▼" : "▶"}</span>
                    </button>
                  </div>

                  {expandedCategories[category.id] && (
                    <div className="pl-8 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors bg-slate-50">
                          <input
                            type="checkbox"
                            checked={!!selectedItems[subcategory.id]}
                            onChange={() => handleSelectSubcategory(category.id, subcategory.id)}
                            className="w-3 h-3 rounded border-slate-300 cursor-pointer accent-blue-900"
                          />
                          <span className="flex-1 text-xs font-semibold text-slate-700">{subcategory.name}</span>
                          <span className="text-[9px] text-slate-500 font-medium">({subcategory.productCount})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {getSelectedCount() > 0 && (
              <button
                onClick={() => setSelectedItems({})}
                className="w-full mt-6 text-xs font-bold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg border border-slate-300 transition-colors"
              >
                ✕ Clear Selection Filters
              </button>
            )}
          </div>
        </div>

        {/* MAIN PRODUCT CATALOG REGION */}
        <div className="flex-1 p-4 md:p-8">

          {/* CRITERIA BAR SUMMARY OVERVIEW DISPLAY */}
          <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                {finalVisibleProducts.length} Match Line{finalVisibleProducts.length !== 1 ? "s" : ""} Available
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Vetted heavy components aligned with selected parameters.</p>
            </div>

            {globalSearchQuery && (
              <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-2 self-start sm:self-center">
                <span>Active Global Filter: <b className="font-black">"{globalSearchQuery}"</b></span>
                <Link href="/products" className="text-red-500 hover:text-red-700 font-bold ml-2 border-l border-blue-200 pl-2 uppercase tracking-wide text-[10px]">
                  Clear ×
                </Link>
              </div>
            )}
          </div>

          {/* DYNAMIC FEED GRID */}
          {finalVisibleProducts.length > 0 ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finalVisibleProducts.map((product) => {
                const currentInputQty = quantities[product.id] || 1;
                const isAlreadyInCart = rfqCart.some(item => item.id === product.id);

                return (
                  <div key={product.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400">{product.id}</span>
                        <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded tracking-wide">{product.brand}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-medium">{product.specification}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-2 flex items-center space-x-1">
                        <span>📍 Warehouse Node:</span> <span className="font-semibold text-slate-600">{product.zone}</span>
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Value:</span>
                        <span className="text-xs font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          Price On Request
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-20 shrink-0">
                          <input
                            type="number"
                            min="1"
                            value={currentInputQty}
                            onChange={(e) => handleQtyChange(product.id, e.target.value)}
                            className="w-full text-center font-bold text-xs border border-slate-200 rounded-lg py-2 focus:outline-none focus:border-blue-950 bg-slate-50"
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

                      <Link href={`/products/${product.id}`}>
                        <button className="w-full text-[10px] font-black text-blue-600 uppercase tracking-wider py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                          👁️ View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto mt-12 shadow-sm">
              <span className="text-3xl">📦</span>
              <h3 className="text-sm font-black text-slate-900 tracking-tight mt-3">No matching items indexed</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                We couldn't locate any catalog entry matching your query criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FORM MODAL MODAL PANEL SYSTEM */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-blue-950 text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider">Compile Procurement RFQ Slip</h2>
              </div>
              <button onClick={() => setShowFormModal(false)} className="text-white/60 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Items Bundled Inside Order Line ({rfqCart.length})</p>
                <div className="divide-y divide-slate-200/60 max-h-36 overflow-y-auto pr-1">
                  {rfqCart.map((item) => (
                    <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                      <div className="truncate max-w-sm">
                        <span className="font-bold text-slate-900">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="bg-blue-50 text-blue-900 font-black px-2 py-0.5 rounded text-[10px]">QTY: {item.quantity} Units</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-rose-500 font-bold text-xs">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleQuoteSubmission} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Contact Full Name" className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-medium bg-slate-50"/>
                  <input type="text" required value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} placeholder="Company/Enterprise Entity" className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-medium bg-slate-50"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Official Email Address" className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-medium bg-slate-50"/>
                  <input type="tel" required value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} placeholder="Mobile Coordinate Number" className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-medium bg-slate-50"/>
                </div>
                <textarea rows={3} value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} placeholder="Provide warehouse preferences..." className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-medium bg-slate-50"/>
                <button type="submit" className="w-full bg-blue-950 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider">🚀 Dispatch Quotation Slip</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Next.js structural requirement: Suspense boundary ensures clean routing params loading
export default function PublicProductsCatalog() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-black text-slate-400 uppercase tracking-widest">Initialising Procurement Data Grid...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}