"use client";

export default function LeftSidebar({ isLeftCollapsed, navMenus }) {
  return (
    <aside 
      className={`bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 shrink-0 z-30 shadow-sm h-full ${
        isLeftCollapsed ? "w-[5%] min-w-[70px]" : "w-[20%] min-w-[240px]"
      }`}
    >
      {/* Scrollable links block */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
        {!isLeftCollapsed && (
          <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase px-3 mb-3 block">Enterprise Tree</p>
        )}
        <div className="space-y-1">
          {navMenus.map((menu, idx) => (
            <a
              key={idx}
              href={menu.href}
              className={`flex items-center rounded-xl p-3 text-xs font-bold text-slate-600 transition-all duration-150 hover:bg-slate-50 hover:text-slate-950 group ${
                isLeftCollapsed ? "justify-center" : "space-x-3.5"
              }`}
            >
              <span className="text-base group-hover:scale-110 transition-transform">{menu.icon}</span>
              <span className={`${isLeftCollapsed ? "hidden" : "block"} opacity-90`}>
                {menu.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Dock (Never scrolls) */}
      <div className="p-4 border-t border-slate-100 bg-white shrink-0">
        <button
          onClick={() => alert("Session destroyed safely.")}
          className={`w-full flex items-center rounded-xl p-3 text-xs font-bold bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 ${
            isLeftCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <span>🔒</span>
          <span className={isLeftCollapsed ? "hidden" : "block"}>Exit Session</span>
        </button>
      </div>
    </aside>
  );
}