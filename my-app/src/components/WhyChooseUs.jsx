"use client";

// DUMMY DATA SCHEMA (Aap baad mein is pure data array ko Database/Admin Panel se map kar sakte hain)
const whyChooseUsData = {
  sectionTag: "Our Benchmarks",
  title: "Why Industries choose SBS Groups",
  mainDescription: "With over two decades of technical expertise and a state-of-the-art logistical base in Singrauli, we deliver unparalleled engineering supplies and compliance-driven safety components.",
  stats: [
    {
      id: 1,
      icon: (
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "DGMS & ISO Certified Quality",
      description: "Every mechanical gear, lifting tool, and safety wear element strictly complies with core government and regulatory protocols.",
    },
    {
      id: 2,
      icon: (
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Authorized Network & Sourcing",
      description: "Direct tie-ups with original manufacturers guarantee 100% genuine products, mitigating any equipment failure risks.",
    },
    {
      id: 3,
      icon: (
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Integrated Logistics (NCL ICOMS)",
      description: "Our warehouses are synced digitally for immediate processing, reducing the turnaround time for mining and power infrastructure.",
    },
    {
      id: 4,
      icon: (
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Dedicated Technical Support",
      description: "Our engineering and support team remains on standby round-the-clock to manage critical industrial supply emergencies.",
    }
  ]
};

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid Structure */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* LEFT HEADER AREA: Description & Badges (Occupies 5 Columns on large screens) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {whyChooseUsData.sectionTag}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-blue-900 sm:text-4xl uppercase leading-tight">
              {whyChooseUsData.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              {whyChooseUsData.mainDescription}
            </p>
            
            {/* Quick trust counter footer tag */}
            <div className="inline-flex items-center space-x-3 bg-gray-50 border border-gray-200/60 p-4 rounded-xl w-full max-w-sm">
              <span className="text-3xl font-black text-blue-900">20+</span>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                Years of Uncompromised Industrial Trust in Singrauli
              </p>
            </div>
          </div>

          {/* RIGHT GRID AREA: Infographics Points (Occupies 7 Columns on large screens) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyChooseUsData.stats.map((item) => (
              <div 
                key={item.id} 
                className="group p-6 rounded-2xl border border-gray-100 bg-gray-50/50 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-blue-900/20"
              >
                {/* Icon Circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 mb-4">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                
                {/* Text Layout */}
                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}