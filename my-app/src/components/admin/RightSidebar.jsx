"use client";

export default function RightSidebar({ isRightOpen, setIsRightOpen, searchResults }) {
  return (
    <aside 
      className={`bg-white border-l border-slate-200/80 flex flex-col transition-all duration-300 shrink-0 z-30 shadow-xl h-full ${
        isRightOpen ? "w-[20%] min-w-[240px]" : "w-0 overflow-hidden border-none"
      }`}
    >
      {/* Search Header fixed */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
        <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Search Stream</span>
        <button onClick={() => setIsRightOpen(false)} className="text-slate-400 hover:text-red-500 font-bold p-1 text-xs">✕</button>
      </div>

      {/* Independent scroll results list */}
      <div className="flex-1 p-3 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
        {searchResults.map((item) => (
          <div 
            key={item.id} 
            onClick={() => alert(`Redirecting item ID #${item.id}`)}
            className="py-3 px-2.5 cursor-pointer group hover:bg-slate-50 rounded-xl transition-all"
          >
            <span className="text-[9px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wide group-hover:bg-blue-900 group-hover:text-white transition-colors">
              {item.category}
            </span>
            <p className="text-xs font-bold text-slate-700 mt-2 leading-snug">
              {item.title}
            </p>
            <span className="text-[10px] text-slate-400 block mt-1 font-mono">SKU REF: #{item.id}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}