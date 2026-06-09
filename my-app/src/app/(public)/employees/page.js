"use client";

import { useState } from "react";
import Link from "next/link";

export default function PublicEmployeesDirectory() {
  const [employees] = useState([
    {
      id: "EMP-101",
      name: "G K Jaiswal",
      role: "Sales Executive Manager",
      tag: "Sales Desk",
      email: "jaiswal.sales@sbsgroups.com",
      phone: "+91 94251 XXXXX",
      avatar: "👨‍💼"
    },
    {
      id: "EMP-102",
      name: "Anjali Sharma",
      role: "Head of Human Resources",
      tag: "HR Operations",
      email: "sharma.a@sbsgroups.com",
      phone: "+91 70002 XXXXX",
      avatar: "👩‍💼"
    }
  ]);

  const [activeTagFilter, setActiveTagFilter] = useState("All");

  // 🆕 HELPER FUNCTION: Name aur Role ko clean slug me string-join karne ke liye
  const generateEmployeeSlug = (name, role) => {
    const combinedText = `${name} ${role}`;
    return combinedText
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Special characters remove karne ke liye
      .replace(/\s+/g, "-")         // Spaces ko "-" me convert karne ke liye
      .replace(/-+/g, "-");         // Multiple hyphens ko single "-" karne ke liye
  };

  const filteredStaff = activeTagFilter === "All" 
    ? employees 
    : employees.filter(emp => emp.tag === activeTagFilter);

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="border-b border-slate-200 pb-5 max-w-xl">
          <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Corporate Roster</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">Meet Our Professional Workforce</h1>
          <p className="text-xs text-slate-500 font-medium">Click on any workforce profile asset card to review their dynamic slug index route nodes.</p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((emp) => {
            // 🆕 Har employee ke parameters se custom unique slug generate hoga
            const staffSlug = generateEmployeeSlug(emp.name, emp.role);

            return (
              <div key={emp.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-400 transition-all group">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-3xl p-2.5 bg-slate-50 rounded-2xl group-hover:bg-blue-50 border transition-colors">{emp.avatar}</span>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border bg-blue-50 text-blue-700 border-blue-100">
                      {emp.tag}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors">{emp.name}</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">{emp.role}</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  {/* 🆕 ID ke badle humne pure generated staffSlug parameter par redirect kiya */}
                  <Link 
                    href={`/employees/${staffSlug}`}
                    className="w-full block text-center text-[10px] font-black uppercase bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 py-2.5 rounded-xl tracking-wider transition-all"
                  >
                    View Full Profile Metrics ➔
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}