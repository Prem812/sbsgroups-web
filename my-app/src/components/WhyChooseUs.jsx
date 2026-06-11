"use client";
import React from "react";
// Lucide icons ko use karenge taaki icons database se dynamic ho sakein
import * as Icons from "lucide-react"; 

// DUMMY CONFIGURATION SCHEMA (Bhavishya mein yeh pura object DB se aayega)
const publicConfigData = {
  // 1. Content Data
  sectionTag: "Our Benchmarks",
  title: "Why Industries choose SBS Groups",
  mainDescription: "With over two decades of technical expertise and a state-of-the-art logistical base in Singrauli, we deliver unparalleled engineering supplies and compliance-driven safety components.",
  statNumber: "20+",
  statLabel: "Years of Uncompromised Industrial Trust in Singrauli",
  
  // 2. 100% Fully Dynamic Design Controls (Jo Admin badal sakta hai)
  design: {
    backgroundColor: "#FFFFFF",        // Main background color
    cardBackgroundColor: "#F9FAFB",    // Cards ka background (gray-50)
    primaryColor: "#DC2626",           // Red color text/icons ke liye (text-red-600)
    titleColor: "#1E3A8A",             // Headings ka color (text-blue-900)
    fontFamily: "Inter, sans-serif",   // Main font family
    gridColumnsDesktop: "lg:col-span-7 grid-cols-1 sm:grid-cols-2", // Layout Grid style
    cardsPerRow: 2                     // Ek line mein kitne card dikhein
  },

  // 3. Dynamic Cards Array (Isme icon ab sirf ek String name hai)
  stats: [
    { id: 1, iconName: "Shield", title: "DGMS & ISO Certified Quality", description: "Every mechanical gear, lifting tool, and safety wear element strictly complies with core government and regulatory protocols." },
    { id: 2, iconName: "Building2", title: "Authorized Network & Sourcing", description: "Direct tie-ups with original manufacturers guarantee 100% genuine products, mitigating any equipment failure risks." },
    { id: 3, iconName: "Zap", title: "Integrated Logistics (NCL ICOMS)", description: "Our warehouses are synced digitally for immediate processing, reducing the turnaround time for mining and power infrastructure." },
    { id: 4, iconName: "Users", title: "Dedicated Technical Support", description: "Our engineering and support team remains on standby round-the-clock to manage critical industrial supply emergencies." }
  ]
};

export default function WhyChooseUsPublic() {
  const { design, stats } = publicConfigData;

  return (
    <section 
      style={{ backgroundColor: design.backgroundColor, fontFamily: design.fontFamily }} 
      className="py-16 md:py-24 border-b border-gray-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* LEFT HEADER AREA */}
          <div className="lg:col-span-5 space-y-6">
            <span 
              style={{ color: design.primaryColor, backgroundColor: `${design.primaryColor}10` }} 
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            >
              {publicConfigData.sectionTag}
            </span>
            <h2 
              style={{ color: design.titleColor }} 
              className="text-3xl font-black tracking-tight sm:text-4xl uppercase leading-tight"
            >
              {publicConfigData.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              {publicConfigData.mainDescription}
            </p>
            
            <div className="inline-flex items-center space-x-3 bg-gray-50 border border-gray-200/60 p-4 rounded-xl w-full max-w-sm">
              <span style={{ color: design.titleColor }} className="text-3xl font-black">
                {publicConfigData.statNumber}
              </span>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                {publicConfigData.statLabel}
              </p>
            </div>
          </div>

          {/* RIGHT GRID AREA (Fully Dynamic Columns Based on Admin Input) */}
          <div className={`lg:col-span-7 grid gap-6 grid-cols-1 ${design.cardsPerRow === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {stats.map((item) => {
              // Dynamic Icon Loading Logic
              const DynamicIcon = Icons[item.iconName] || Icons.HelpCircle;

              return (
                <div 
                  key={item.id} 
                  style={{ backgroundColor: design.cardBackgroundColor }}
                  className="group p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:bg-white hover:shadow-xl"
                >
                  {/* Dynamic Icon Wrapper */}
                  <div 
                    style={{ '--hover-bg': design.primaryColor }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 border border-gray-200 text-gray-700 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 mb-4"
                  >
                    <DynamicIcon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
