"use client";

import { useState } from "react";
import Header from "@/components/admin/Header";
import LeftSidebar from "@/components/admin/LeftSidebar";
import RightSidebar from "@/components/admin/RightSidebar";
import Footer from "@/components/admin/Footer";

export default function AdminLayout({ children }) {
  // MASTER STATES FOR INTERACTION LAYERS
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  // CONFIG THEME PALETTE ENGINE
  const [isGradient, setIsGradient] = useState(true);
  const [solidColor, setSolidColor] = useState("#0f172a"); 
  const [gradientStart, setGradientStart] = useState("#0f172a"); 
  const [gradientEnd, setGradientEnd] = useState("#1e3a8a"); 

  const presetThemes = [
    { name: "Deep Ocean (Default)", start: "#0f172a", end: "#1e3a8a", type: "gradient" },
    { name: "Midnight Emerald", start: "#022c22", end: "#065f46", type: "gradient" },
    { name: "Cyber Sunset", start: "#1e1b4b", end: "#4c1d95", type: "gradient" },
    { name: "Slate Minimalist", color: "#1e293b", type: "solid" },
    { name: "Coal Professional", color: "#111827", type: "solid" }
  ];

  const notifications = [
    { id: 1, text: "New procurement request received from Singrauli Zone", time: "5m ago" },
    { id: 2, text: "Product 'Safety Harness Grade A' SKU low on inventory", time: "1h ago" },
    { id: 3, text: "NCL Compliance update certificate uploaded successfully", time: "4h ago" }
  ];

  const searchResults = [
    { id: 101, title: "Industrial Safety Wear - Boots & Helmets", category: "Safety Supplies" },
    { id: 102, title: "High-Pressure Hydraulic Lubrication Pump", category: "Machinery" },
    { id: 103, title: "Aerosol Spray Anti-Rust Premium Grade", category: "Chemicals & Spares" }
  ];

  const navMenus = [
    { name: "Dashboard", icon: "📊", href: "/admin/dashboard" },
    { name: "Contact Settings", icon: "📦", href: "/admin/contact-settings" },
    { name: "FAQ Manager", icon: "🤝", href: "/admin/faq-manager" },
    { name: "faqs", icon: "🚚", href: "/admin/faqs" },
    { name: "employees", icon: "🛠️", href: "/admin/employees" },
    { name: "carousel", icon: "🛠️", href: "/admin/carousel" },
    { name: "brands", icon: "🛠️", href: "/admin/brands" },
    { name: "clients", icon: "🛠️", href: "/admin/clients" }
  ];

  const headerThemeStyle = isGradient 
    ? { backgroundImage: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})` }
    : { backgroundColor: solidColor };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans select-none antialiased text-slate-800 overflow-hidden">
      
      {/* 1. Header Injection */}
      <Header 
        headerThemeStyle={headerThemeStyle}
        setIsLeftCollapsed={setIsLeftCollapsed}
        isLeftCollapsed={isLeftCollapsed}
        setIsRightOpen={setIsRightOpen}
        showThemeModal={showThemeModal}
        setShowThemeModal={setShowThemeModal}
        showNotificationModal={showNotificationModal}
        setShowNotificationModal={setShowNotificationModal}
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        presetThemes={presetThemes}
        isGradient={isGradient}
        setIsGradient={setIsGradient}
        gradientStart={gradientStart}
        setGradientStart={setGradientStart}
        gradientEnd={gradientEnd}
        setGradientEnd={setGradientEnd}
        solidColor={solidColor}
        setSolidColor={setSolidColor}
        notifications={notifications}
      />

      {/* 2. Content Row Wrapper */}
      <div className="flex-1 flex w-full items-stretch overflow-hidden relative">
        
        {/* Left Sidebar Layout */}
        <LeftSidebar isLeftCollapsed={isLeftCollapsed} navMenus={navMenus} />

        {/* Dynamic Nested Page Rendering Container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 bg-slate-50/50 custom-scrollbar">
          {children} {/* This renders your /admin/dashboard/page.js data */}
        </main>

        {/* Right Search Outcomes Panel */}
        <RightSidebar isRightOpen={isRightOpen} setIsRightOpen={setIsRightOpen} searchResults={searchResults} />

      </div>

      {/* 3. Global Footer */}
      <Footer />

      {/* Global Scrollbar Customization Engine */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}