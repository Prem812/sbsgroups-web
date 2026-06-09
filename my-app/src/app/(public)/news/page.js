"use client";

import { useState } from "react";
import Link from "next/link"; // 🆕 URL Navigation ke liye import kiya

export default function PublicNewsPage() {
  // MASTER DUMMY NEWS ARRAY 
  const [newsArticles] = useState([
    {
      id: 1,
      title: "New Safety Equipment Compliance Protocols Issued for Singrauli Site",
      category: "Compliance",
      date: "June 08, 2026",
      summary: "Official regulatory guidelines have been updated for all on-site industrial safety gears, effective from next payroll batch cycle.",
      image: "⚠️"
    },
    {
      id: 2,
      title: "Bulk Supply Logistics Hub Expanded at NCL Spares Depot",
      category: "Logistics",
      date: "June 05, 2026",
      summary: "To minimize dispatch timelines, the warehouse square footage has been expanded by 40% with automated picking hooks.",
      image: "🏗️"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Compliance", "Logistics"];

  // 🆕 HELPER FUNCTION: Jo heading ko URL slug me convert karega
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Special characters ko remove karne ke liye
      .replace(/\s+/g, "-")         // Saare spaces ko "-" me badalne ke liye
      .replace(/-+/g, "-");         // Double dashes "--" ko single "-" karne ke liye
  };

  const filteredArticles = activeFilter === "All" 
    ? newsArticles 
    : newsArticles.filter(item => item.category === activeFilter);

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto flex-1 w-full space-y-8">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200 pb-5">
        <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Media & Announcements</span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Enterprise News Hub</h1>
        <p className="text-xs text-slate-500 font-medium">Click on any announcement to open its dedicated full layout page.</p>
      </div>

      {/* FILTER TABS BAR */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl border transition-all ${
              activeFilter === cat ? "bg-blue-950 text-white border-blue-950" : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          // 🆕 Har article ka unique slug string calculate hoga
          const articleSlug = generateSlug(article.title);

          return (
            // 🆕 Ab poora card ek dynamic Link ban chuka hai jo new page open karega
            <Link 
              key={article.id}
              href={`/news/${articleSlug}`} // 👉 Yeh user ko naye dynamic route par le jayega
              className="bg-white border rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md border-slate-200/80 flex flex-col justify-between hover:border-blue-950 group"
            >
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-black">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100">{article.image}</span>
                  <h3 className="text-xs font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-900 transition-colors">
                    {article.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-3 font-medium leading-relaxed">
                  {article.summary}
                </p>
              </div>
              <span className="text-[10px] text-blue-900 font-black uppercase tracking-wider mt-4 block">Read Full News ➔</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}