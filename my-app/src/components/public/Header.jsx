"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Clients", href: "/clients" },
    { name: "Brands", href: "/brands" },
    { name: "Contact", href: "/contact" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "News", href: "/news" },
    { name: "Distributors", href: "/distributors" },
    { name: "Employees", href: "/employees" },

  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      {/* Dynamic Sizing Container to prevent layout overlaps */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* LOGO IDENTITY BOX */}
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-blue-900 sm:text-2xl">
              SBS <span className="text-red-600">GROUPS</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              Superb Bearing Stores
            </span>
          </Link>
        </div>

        {/* NEW GLOBAL SEARCH BAR (Desktop - Hidden on mobile screen views) */}
        <div className="hidden md:block flex-1 max-w-xs xl:max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, brands, SKUs..."
              className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* IDENTICAL NAVIGATION LINKS TRACK (Desktop) */}
        <nav className="hidden lg:flex items-center gap-x-5 xl:gap-x-7 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-gray-700 transition duration-150 ease-in-out hover:text-blue-900 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* NEW PORTAL LOGIN BUTTON (Desktop) */}
        <div className="hidden lg:flex shrink-0">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-bold text-white transition duration-150 ease-in-out hover:bg-blue-800 whitespace-nowrap shadow-sm"
          >
            Login / Portal
          </Link>
        </div>

        {/* RESPONSIVE MOBILE ACTION TOGGLES */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none md:hidden"
            aria-label="Toggle Search"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile Hamburguer Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- RESPONSIVE MOBILE DRAWERS PANEL --- */}

      {/* Mobile Search Bar Expansion Area */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm text-gray-700 focus:outline-none"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Vertical Navigation Links List */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-inner lg:hidden">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-900"
              >
                {link.name}
              </Link>
            ))}
            {/* Login Link inside Mobile Stack */}
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-md bg-blue-900 py-2.5 text-center text-sm font-bold text-white hover:bg-blue-800"
              >
                Login / Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}