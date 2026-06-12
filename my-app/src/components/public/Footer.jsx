"use client";

import Link from "next/link";

// DATABASE READY ARRAY STRUCTURES FOR LINKS
const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Our Clients", href: "/clients" },
];

const servicesLinks = [
  { name: "Authorised Distributor", href: "/services/distributor" },
  { name: "Contact Us", href: "/contact" },
  { name: "Support", href: "/support" },
  { name: "Partnerships", href: "/partnerships" },
];

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Future API Newsletter action placeholder
  };

  return (
    <footer className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white pt-16 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* UPPER RESPONSIVE GRID GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 items-start">
          
          {/* COLUMN 1: BRAND LOGO & DIRECT CONTACT DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Dummy Logo block frame matching brand logo aspect */}
              <div className="bg-white/10 p-2 rounded-md border border-white/5 backdrop-blur-sm">
                <span className="text-xl font-black tracking-tight text-white">
                  SBS <span className="text-lime-500">groups</span>
                </span>
              </div>
            </div>

            {/* Address, Phone and Email metadata text exactly as per screenshot */}
            <div className="space-y-3 text-xs text-blue-100/80 leading-relaxed font-normal">
              <div className="flex items-start space-x-2">
                <span className="mt-0.5 text-lime-400 font-bold">📍</span>
                <p>
                  SUPERB BEARING STORES, Main Road, Tali Waidhan, Near Honda Showroom, Singrauli, M.P. 486886 (India)
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="mt-0.5 text-lime-400 font-bold">📞</span>
                <div>
                  <p>G K Jaiswal (Aman)</p>
                  <p className="text-white font-medium">Mobile:</p>
                  <p><a href="tel:9826808412">9826808412</a></p>
                  <p><a href="tel:8827559826">8827559826</a></p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="mt-0.5 text-lime-400 font-bold">✉️</span>
                <div className="space-y-0.5">
                    <p>mailto</p>
                    <p><a href="mailto:info@sbsgroups.co.in">info@sbsgroups.co.in</a></p>
                    <p><a href="mailto:admin@sbsgroups.co.in">admin@sbsgroups.co.in</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-4 md:pl-4 lg:pl-8">
            <h4 className="text-sm font-bold tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/70">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-lime-400 hover:underline transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wide text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/70">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-lime-400 hover:underline transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER SUBSCRIPTION & SOCIAL PORTAL ACCESS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wide text-white">
              Connect With Us
            </h4>
            
            {/* Social Icons grid row frame exactly styled */}
            <div className="flex items-center space-x-2.5">
              {["fb", "in", "ig", "yt"].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded bg-blue-950/60 border border-white/10 text-xs text-blue-100 hover:bg-lime-500 hover:text-blue-950 transition-all duration-200"
                >
                  {social === "fb" && "f"}
                  {social === "in" && "in"}
                  {social === "ig" && "📷"}
                  {social === "yt" && "▶"}
                </a>
              ))}
            </div>

            {/* Newsletter Container matching layout spacing */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-blue-100/80 font-medium">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex items-stretch max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-l border border-white/20 bg-blue-950/40 px-3 py-2 text-xs text-white placeholder-blue-300/50 focus:outline-none focus:ring-1 focus:ring-lime-400"
                />
                <button
                  type="submit"
                  className="rounded-r bg-blue-500 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 transition-colors uppercase tracking-wider shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT NOTATION BAR */}
        <div className="pt-6 border-t border-white/10 text-left text-[11px] text-blue-200/50 font-normal">
          <p>© 2026 SBS Group. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}