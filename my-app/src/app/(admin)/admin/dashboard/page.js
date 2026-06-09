export default function AdminDashboardPage() {
  return (
    <>
      {/* DYNAMIC CARD COUNTERS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Active B2B Channels", val: "142 +", color: "text-slate-900" },
          { label: "Procured SKUs Singrauli", val: "12,450", color: "text-emerald-600" },
          { label: "Pending System Audits", val: "3 Alerts", color: "text-rose-600" }
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200">
            <p className="text-[10px] font-black tracking-wider text-slate-400 uppercase">{card.label}</p>
            <h3 className={`text-2xl font-black mt-1.5 tracking-tight ${card.color}`}>{card.val}</h3>
          </div>
        ))}
      </div>

      {/* CENTRAL CORE GRID ELEMENT WORKBENCH */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-8 min-h-[500px] flex flex-col justify-center items-center text-center space-y-3">
        <div className="h-14 w-14 bg-lime-50 rounded-2xl flex items-center justify-center text-2xl border border-lime-200/50">🏭</div>
        <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Isolated Central Node Active</h2>
        <p className="text-xs text-slate-500 max-w-md leading-relaxed font-medium">
          Welcome to the newly modularized architecture, Bhai. Now layout handling states live entirely in their shared parent nodes while dashboard routes remain completely clean.
        </p>
      </div>
    </>
  );
}