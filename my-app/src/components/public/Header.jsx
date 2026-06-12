"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // CONFIGURATION: Set your logo image source link here. If blank (""), text fallback takes over.
  const branding = {
    logoUrl: "https://sbsgroups.co.in/assets/sbs_logo-C7_xX5GN.png", // Example: "/assets/sbs-logo.png"
    fallbackText: "SBS GROUPS",
    tagline: "Industrial Solutions"
  };

  // 1. PRIMARY LINKS: Visible directly on the header desktop menu
  const primaryLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Brands", href: "/brands" },
    { name: "Distributors", href: "/distributors" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // 2. DROPDOWN LINKS: Encapsulated inside the "More" popover layer
  const dropdownLinks = [
    { name: "Clients", href: "/clients" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "News & Media", href: "/news" },
    { name: "Employees Portal", href: "/employees" },
  ];

  // Combined array for flawless mobile responsive layout listing
  const allMobileLinks = [...primaryLinks, ...dropdownLinks];

  // FUNCTION: Executes the global text query routing parameter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchOpen(false); 
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* LOGO IDENTITY BOX WITH FALLBACK CRITERIA */}
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            {branding.logoUrl ? (
              <img 
                src={branding.logoUrl} 
                alt={`${branding.fallbackText} Logo`} 
                className="h-15 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; 
                  e.currentTarget.nextSibling.style.display = 'flex'; 
                }}
              />
            ) : null}
            
            {/* TEXT FALLBACK BLOCK */}
            <div className={`flex flex-col ${branding.logoUrl ? "hidden" : "flex"}`}>
              <span className="text-lg font-black tracking-tighter text-blue-950 group-hover:text-blue-900 transition-colors">
                {branding.fallbackText}
              </span>
              <span className="text-[10px] font-bold text-lime-600 uppercase tracking-widest leading-none mt-0.5">
                {branding.tagline}
              </span>
            </div>
          </Link>
        </div>

        {/* DESKTOP INLINE NAVIGATION LINKS WITH MORE DROPDOWN MENU */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Render Primary Navbar items directly */}
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-blue-900 transition-all whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}

          {/* DYNAMIC DROPDOWN TRIGGER ZONE */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 focus:outline-none ${
                isDropdownOpen ? "bg-gray-50 text-blue-900" : "text-gray-600 hover:bg-gray-50 hover:text-blue-900"
              }`}
            >
              <span>other services</span>
              <svg 
                className={`h-3 w-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* FLOATING SUBMENU CONTAINER POPUP CARD */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-xl animate-fade-in z-50 mt-1">
                {dropdownLinks.map((subLink) => (
                  <Link
                    key={subLink.name}
                    href={subLink.href}
                    className="block rounded-lg px-4 py-2.5 text-xs font-black uppercase tracking-wider text-gray-600 hover:bg-slate-50 hover:text-blue-900 transition-all"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {subLink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* UTILITY SEARCH BAR INPUT TRIGGER ZONE (Desktop Layout) */}
        <div className="hidden md:flex items-center flex-1 max-w-xs relative">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-4 pr-10 py-2.5 text-xs font-medium text-gray-900 placeholder-gray-400 focus:border-blue-900 focus:bg-white focus:outline-none transition-all shadow-inner"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900 transition-colors p-1"
              aria-label="Submit search query"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* MOBILE CONTROL LAYOUT */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Search Button toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 hover:text-blue-900 md:hidden transition-colors"
            aria-label="Toggle structural search bar drawer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Core Mobile Primary Hub Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 hover:text-blue-900 transition-colors"
            aria-label="Toggle navigation parameters panel"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* SEARCH OVERLAY BAR EXPANSION DRAWER (Mobile Viewports only) */}
      {isSearchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden shadow-sm animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or catalogs..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-10 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-900 focus:bg-white transition-all"
              autoFocus
            />
            <button type="submit" className="absolute right-3.5 text-gray-500 p-1">🔍</button>
          </form>
        </div>
      )}

      {/* MOBILE ALL INTEGRATED LINK ACCORDION (Shows all links sequentially for mobile scrolling) */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 shadow-xl lg:hidden absolute top-20 left-0 w-full max-h-[calc(100vh-5rem)] overflow-y-auto z-50">
          <nav className="flex flex-col space-y-1.5">
            {allMobileLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider text-gray-700 hover:bg-gray-50 hover:text-blue-900 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}