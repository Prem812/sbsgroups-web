"use client";

// DUMMY DATA FOR THE STATS BLOCK (Admin can update numbers later)
const dummyStats = [
  { id: 1, value: "20+", label: "Years Experience" },
  { id: 2, value: "50+", label: "Corporate Clients" },
  { id: 3, value: "5000+", label: "SKUs Managed" },
  { id: 4, value: "24/7", label: "Plant Support" },
];

// DUMMY DATA FOR LEADERSHIP/PARTNERS (Easily updateable via Admin Panel)
const dummyLeaders = [
  { id: 1, name: "G K Jaiswal (Aman)", role: "Managing Partner" },
  { id: 2, name: "B K Jaiswal", role: "Operations Partner" },
];

export default function AboutInfrastructure() {
  return (
    <section className="bg-gray-900 text-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* UPPER GRID: TEXT AND MANAGEMENT METRICS */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Context & Core Message */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Our Footprint & Strength
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl uppercase text-balance">
              Powering Industrial Supplies Across Central India
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Based in the energy capital of Singrauli, Madhya Pradesh, Superb Bearing Stores (SBS Groups) operates as a critical distribution hub. We are fully integrated with industrial compliance frameworks and corporate e-procurement ecosystems like **NCL ICOMS**.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our strategically situated warehouses in Waidhan ensure minimized turnaround time and lightning-fast logistics execution directly to production sites.
            </p>

            {/* Management & Leadership Badges */}
            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Key Management Contacts
              </h3>
              <div className="flex flex-wrap gap-4">
                {dummyLeaders.map((leader) => (
                  <div 
                    key={leader.id} 
                    className="bg-gray-800/60 border border-gray-700/50 rounded-lg px-4 py-2.5"
                  >
                    <p className="text-sm font-bold text-gray-200">{leader.name}</p>
                    <p className="text-[11px] font-semibold text-red-500 uppercase tracking-wider">{leader.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Stats Grid (Admin Control Ready) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {dummyStats.map((stat) => (
              <div 
                key={stat.id} 
                className="relative bg-gradient-to-br from-gray-800 to-gray-800/40 p-6 md:p-8 rounded-2xl border border-gray-700/30 text-center space-y-2 group hover:border-red-500/30 transition-all duration-300"
              >
                {/* Accent Dot */}
                <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-gray-700 group-hover:bg-red-500 transition-colors" />
                
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-red-500 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* LOWER BLOCK: INDUSTRIAL VISUAL INFRASTRUCTURE PLACEHOLDER */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-800 border border-gray-700/60 h-48 sm:h-64 md:h-80 lg:h-96">
          {/* Dummy background image simulating warehouse/industrial activity */}
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200')` }}
          />
          {/* Content overlay inside image block */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
            <div className="max-w-xl space-y-2">
              <span className="inline-block bg-blue-900 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                Singrauli Logistical Base
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                Fully Equipped Operations Hub & Tool Storage Setup
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Equipped with custom tech-enabled inventories to monitor bulk supply contracts and track shipments seamlessly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}