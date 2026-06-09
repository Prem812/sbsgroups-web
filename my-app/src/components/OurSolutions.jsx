"use client";

import { useState } from "react";

// DUMMY ARRAY SCHEMA: Directly updateable via Admin Dashboard Panel
const dummySolutionsList = [
  {
    id: 1,
    title: "Industrial Safety Products",
    tagline: "DGMS & BIS Approved Gear",
    description: "Complete personal protective equipment solutions including safety shoes, high-visibility vest systems, helmets, and heavy industrial respirators optimized for rough mining operations.",
    bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    slug: "industrial-safety",
    itemCount: 142
  },
  {
    id: 2,
    title: "Bearings & Mechanical Spares",
    tagline: "High-Load Transmission Spares",
    description: "Premium performance ball bearings, roller bearings, universal joints, and precision transmission elements built to minimize breakdown metrics in power generation lines.",
    bgImage: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=600",
    slug: "bearings-mechanical",
    itemCount: 210
  },
  {
    id: 3,
    title: "Fire Protection Equipment",
    tagline: "Strict Compliance Control",
    description: "Certified commercial fire extinguishers, rapid deployment suppression components, and safety kits mapping standard regional industry safety rules.",
    bgImage: "https://images.unsplash.com/photo-1599740831464-5cbe1a146810?auto=format&fit=crop&q=80&w=600",
    slug: "fire-protection",
    itemCount: 65
  },
  {
    id: 4,
    title: "Professional Power Tools",
    tagline: "Heavy-Duty Execution Units",
    description: "Ergonomic high-durability power tools, precision hand machinery, pneumatics, and customized smart electronic instrumentation sets for plant assemblies.",
    bgImage: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600",
    slug: "professional-tools",
    itemCount: 94
  }
];

export default function OurSolutions() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Component Header Sections */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            Engineered Supply Segments
          </span>
          <h2 className="text-3xl font-black tracking-tight text-blue-900 sm:text-4xl uppercase">
            Our Core Industrial Solutions
          </h2>
          <div className="h-1 w-20 bg-blue-900 mx-auto rounded-full" />
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Explore our curated inventory verticals managed explicitly to fulfill bulk procurement guidelines for core sectors.
          </p>
        </div>

        {/* SOLUTIONS RESPONSIVE INTERACTIVE GRAPHICAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-stretch">
          
          {/* LEFT INDEX STRIP: Interactive Category Controllers */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-center space-y-3">
            {dummySolutionsList.map((sol, index) => (
              <button
                key={sol.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                  activeTab === index
                    ? "border-blue-900 bg-blue-950 text-white shadow-md"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800"
                }`}
              >
                <div className="space-y-1">
                  <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === index ? "text-red-400" : "text-gray-400"}`}>
                    {sol.tagline}
                  </p>
                  <h3 className="text-sm md:text-base font-black tracking-tight uppercase">
                    {sol.title}
                  </h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === index ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {sol.itemCount} SKUs
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT DETAILED PREVIEW DECK: Auto updates based on chosen active selection */}
          <div className="col-span-1 lg:col-span-8 relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-100 min-h-[350px] flex flex-col justify-end p-8 sm:p-12 shadow-inner">
            {/* Smooth asset overlay styling background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-100 hover:scale-105 opacity-30 mix-blend-luminosity"
              style={{ backgroundImage: `url(${dummySolutionsList[activeTab].bgImage})` }}
            />
            {/* Dynamic dark linear overlay mask gradient for premium layout contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

            {/* Live Text Overlay Metadata Content Container */}
            <div className="relative space-y-4 max-w-xl text-white">
              <span className="inline-block bg-red-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                Category Segment Overview
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {dummySolutionsList[activeTab].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {dummySolutionsList[activeTab].description}
              </p>
              
              <div className="pt-2">
                <a
                  href={`/products?category=${dummySolutionsList[activeTab].slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-white transition-colors"
                >
                  <span>Browse Catalog Collections</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}