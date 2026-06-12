"use client";

/* ============================================================================
   SBS GROUPS — PRODUCT DETAIL PAGE  (products/[sku]/page.js)
   ----------------------------------------------------------------------------
   DATA MODEL FOLLOWS THE EXCALIDRAW FLOW DIAGRAM:

     PRODUCTS ──► name, model, brand allocation, category & subcategory
                  allocation, client allocation, images, brochure,
                  description, multiple custom keys & values
     CATEGORY ──► name, image, description
     SUBCATEGORY ──► name, image, description
     DISTRIBUTOR BRANDS ──► brand name, logo, location, web url, email,
                  onboarded since, product count, operational zone,
                  image gallery, description
     CLIENTS ──► name, company, logo, image gallery, details, url,
                  contact (phone, email), social handles (linkedin,
                  instagram, twitter), reviews (date, description, rating)

   EVERYTHING VISUAL IS DRIVEN BY `PAGE_CONFIG` BELOW — card type, radius,
   padding, heading sizes, description length, gallery aspect, thumbnail
   size, spec columns, which sections render, review counts, etc.
   Change a key → the whole page re-themes. No Tailwind class is built
   dynamically (full class strings live in the UI map), so JIT-safe.

   TIP: When you connect a real backend, move CATEGORIES / SUBCATEGORIES /
   BRANDS / CLIENTS / PRODUCTS into lib/catalog.js (or an API) and import
   them in BOTH /products/page.js and this file — single source of truth,
   exactly like the "products allocation" arrows in your diagram.
   ========================================================================== */

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

/* ============================================================================
   1. PAGE_CONFIG — THE DYNAMIC CONTROL PANEL (edit freely)
   ========================================================================== */
const PAGE_CONFIG = {
  layout: {
    container: "max-w-7xl",      // page width
    contentSplit: "lg:grid-cols-3", // left 2 cols + right sticky col
  },
  card: {
    variant: "elevated",          // "elevated" | "outlined" | "flat"
    radius: "xl",                 // "md" | "lg" | "xl"
    padding: "lg",                // "sm" | "md" | "lg"
  },
  heading: {
    productName: "lg",            // "sm" | "md" | "lg"  → product title size
    section: "md",                // section eyebrow size
  },
  gallery: {
    aspect: "square",             // "square" | "landscape" | "wide"
    thumbSize: "md",              // "sm" | "md" | "lg"
    showAngleLabels: true,        // angle badge on main image
    showCounter: true,            // 1/4 counter badge
  },
  description: {
    maxChars: 260,                // truncate after N chars
    expandable: true,             // show "Read more / Read less"
  },
  specs: {
    columns: 2,                   // 1 | 2  (spec grid columns)
    mergeCustomAttributes: true,  // merge product.attributes into spec table
  },
  reviews: {
    maxVisiblePerClient: 2,       // reviews shown per client before "view all"
    showSummary: true,            // average-rating strip
  },
  related: {
    enabled: true,
    maxItems: 3,                  // related products from same subcategory
  },
  sections: {                     // turn whole sections on/off
    gallery: true,
    overview: true,
    description: true,
    specifications: true,
    certifications: true,
    brochure: true,
    brand: true,
    clients: true,
    related: true,
  },
};

/* JIT-safe full class strings — PAGE_CONFIG keys map into these */
const UI = {
  cardVariants: {
    elevated: "bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow",
    outlined: "bg-white border-2 border-slate-200",
    flat:     "bg-white border border-slate-100",
  },
  radii:    { md: "rounded-lg", lg: "rounded-xl", xl: "rounded-2xl" },
  paddings: { sm: "p-4", md: "p-6", lg: "p-6 md:p-8" },
  productNameSizes: {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  },
  sectionTitleSizes: { sm: "text-[10px]", md: "text-xs", lg: "text-sm" },
  galleryAspects: { square: "aspect-square", landscape: "aspect-[4/3]", wide: "aspect-video" },
  thumbSizes: { sm: "w-14 h-14", md: "w-16 h-16", lg: "w-20 h-20" },
  specCols: { 1: "grid-cols-1", 2: "grid-cols-1 sm:grid-cols-2" },
};

const cardClass = () =>
  `${UI.cardVariants[PAGE_CONFIG.card.variant]} ${UI.radii[PAGE_CONFIG.card.radius]} ${UI.paddings[PAGE_CONFIG.card.padding]}`;

/* ============================================================================
   2. CATEGORIES & SUBCATEGORIES  (name, image, description — per flow)
   ========================================================================== */
const CATEGORIES = {
  "cat-1": { name: "Hand Tools",            icon: "🔧", description: "Precision hand tools for assembly, maintenance and fitting work." },
  "cat-2": { name: "Power Tools",           icon: "⚡", description: "Corded and cordless power tools for industrial workshops." },
  "cat-3": { name: "Safety Equipment",      icon: "🦺", description: "PPE and electrical safety gear, IS/CE certified." },
  "cat-4": { name: "Chemicals & Lubricants",icon: "🧪", description: "Lubricants, oils and maintenance chemicals for plant upkeep." },
  "cat-5": { name: "Lifting & Rigging",     icon: "🪝", description: "Slings, hoists and rigging hardware with certified SWL." },
};

const SUBCATEGORIES = {
  "subcat-1":  { name: "Wrenches",             categoryId: "cat-1" },
  "subcat-2":  { name: "Sockets & Ratchets",   categoryId: "cat-1" },
  "subcat-3":  { name: "Drills & Drivers",     categoryId: "cat-2" },
  "subcat-4":  { name: "Grinders & Saws",      categoryId: "cat-2" },
  "subcat-5":  { name: "Protective Gear",      categoryId: "cat-3" },
  "subcat-6":  { name: "Electrical Safety",    categoryId: "cat-3" },
  "subcat-7":  { name: "Lubricants & Oils",    categoryId: "cat-4" },
  "subcat-8":  { name: "Cleaning & Maintenance", categoryId: "cat-4" },
  "subcat-9":  { name: "Slings & Webbing",     categoryId: "cat-5" },
  "subcat-10": { name: "Hoists & Pulleys",     categoryId: "cat-5" },
};

/* ============================================================================
   3. DISTRIBUTOR BRANDS  (full node from your flow diagram)
   ========================================================================== */
const mkBrand = (id, name, location, webUrl, email, onboardedSince, operationalZone, description, productCount = 1) => ({
  id, name, location, webUrl, email, onboardedSince, operationalZone, description, productCount,
  logo: `https://placehold.co/96x96/1e3a8a/ffffff?text=${encodeURIComponent(name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase())}`,
  gallery: [
    `https://placehold.co/400x260?text=${encodeURIComponent(name)}+Facility`,
    `https://placehold.co/400x260?text=${encodeURIComponent(name)}+Range`,
  ],
});

const BRANDS = {
  channellock: mkBrand("channellock", "Channellock", "Meadville, USA", "https://www.channellock.com", "sales@channellock.com", "2019", "Pan India", "American hand-tool maker famous for adjustable wrenches and pliers since 1886.", 4),
  stahlwille:  mkBrand("stahlwille", "Stahlwille", "Wuppertal, Germany", "https://www.stahlwille.com", "info@stahlwille.de", "2020", "North & Central India", "German precision tool manufacturer trusted in aerospace and heavy engineering.", 6),
  ridgid:      mkBrand("ridgid", "Ridgid", "Elyria, USA", "https://www.ridgid.com", "support@ridgid.com", "2018", "Pan India", "Professional pipe and plumbing tools built for jobsite durability.", 5),
  snapon:      mkBrand("snapon", "Snap-on", "Kenosha, USA", "https://www.snapon.com", "b2b@snapon.com", "2021", "MP & Chhattisgarh", "Premium socket sets and workshop tools used by OEM service centres worldwide.", 8),
  sata:        mkBrand("sata", "Sata", "Taipei, Taiwan", "https://www.sata.com", "export@sata.com", "2021", "Pan India", "Calibrated torque tools with strong value-for-money positioning.", 3),
  wera:        mkBrand("wera", "Wera", "Wuppertal, Germany", "https://www.wera.de", "sales@wera.de", "2020", "Pan India", "Innovative German ratchets and screwdriving tools with ergonomic design.", 4),
  bosch:       mkBrand("bosch", "Bosch", "Stuttgart, Germany", "https://www.bosch-pt.com", "industrial@bosch.com", "2017", "Pan India", "World leader in corded and cordless power tools for industry.", 12),
  dewalt:      mkBrand("dewalt", "DeWalt", "Towson, USA", "https://www.dewalt.com", "trade@dewalt.com", "2018", "Pan India", "20V cordless platform trusted on heavy construction sites.", 9),
  irwin:       mkBrand("irwin", "Irwin", "Huntersville, USA", "https://www.irwin.com", "sales@irwin.com", "2019", "Pan India", "Drill bits, clamps and cutting accessories for metal and wood.", 5),
  makita:      mkBrand("makita", "Makita", "Anjo, Japan", "https://www.makita.com", "b2b@makita.com", "2017", "Pan India", "Japanese power-tool engineering with industry-leading motor life.", 10),
  festool:     mkBrand("festool", "Festool", "Wendlingen, Germany", "https://www.festool.com", "service@festool.com", "2022", "Metro cities", "Premium German saws and dust-extraction systems.", 3),
  threem:      mkBrand("threem", "3M", "St. Paul, USA", "https://www.3m.com", "industrial@3m.com", "2016", "Pan India", "Abrasives, polishes and PPE from a global materials-science leader.", 14),
  timberland:  mkBrand("timberland", "Timberland PRO", "Stratham, USA", "https://www.timberlandpro.com", "pro@timberland.com", "2020", "Pan India", "Work boots engineered for all-day industrial wear.", 2),
  karam:       mkBrand("karam", "Karam", "Lucknow, India", "https://www.karam.in", "info@karam.in", "2016", "Pan India", "India's leading PPE manufacturer — helmets, harnesses and fall protection.", 11),
  uvex:        mkBrand("uvex", "Uvex", "Fürth, Germany", "https://www.uvex-safety.com", "safety@uvex.de", "2019", "Pan India", "German eye and head protection with anti-fog lens technology.", 6),
  ansell:      mkBrand("ansell", "Ansell", "Richmond, Australia", "https://www.ansell.com", "apac@ansell.com", "2018", "Pan India", "Insulated and chemical-resistant hand protection for utilities.", 4),
  wiha:        mkBrand("wiha", "Wiha", "Schonach, Germany", "https://www.wiha.com", "export@wiha.com", "2021", "Pan India", "VDE-insulated screwdrivers for electrical maintenance crews.", 3),
  fluke:       mkBrand("fluke", "Fluke", "Everett, USA", "https://www.fluke.com", "india@fluke.com", "2017", "Pan India", "Test and measurement instruments — the electrician's benchmark.", 7),
  eaton:       mkBrand("eaton", "Eaton", "Dublin, Ireland", "https://www.eaton.com", "hydraulics@eaton.com", "2019", "Pan India", "Hydraulic pumps and power-management systems for heavy plant.", 4),
  shell:       mkBrand("shell", "Shell", "The Hague, Netherlands", "https://www.shell.com", "lubricants@shell.com", "2016", "Pan India", "Industrial lubricants engineered for extended machine life.", 8),
  mobil:       mkBrand("mobil", "Mobil", "Irving, USA", "https://www.mobil.com", "industrial@mobil.com", "2016", "Pan India", "High-performance greases and oils for mining and power.", 7),
  wd40:        mkBrand("wd40", "WD-40", "San Diego, USA", "https://www.wd40.com", "trade@wd40.com", "2017", "Pan India", "The original multi-use moisture-displacement spray.", 3),
  castrol:     mkBrand("castrol", "Castrol", "Pangbourne, UK", "https://www.castrol.com", "b2b@castrol.com", "2018", "Pan India", "Industrial degreasers and metalworking fluids.", 5),
  cortland:    mkBrand("cortland", "Cortland", "Cortland, USA", "https://www.cortlandcompany.com", "lifting@cortland.com", "2020", "East & Central India", "High-strength synthetic slings and rigging textiles.", 3),
  pewag:       mkBrand("pewag", "Pewag", "Graz, Austria", "https://www.pewag.com", "chains@pewag.com", "2019", "Pan India", "Grade 100 chain systems with full traceability.", 4),
  bridon:      mkBrand("bridon", "Bridon", "Doncaster, UK", "https://www.bridon-bekaert.com", "ropes@bridon.com", "2018", "Pan India", "Wire ropes for cranes, mining and heavy lifting.", 5),
  kito:        mkBrand("kito", "Kito", "Yamanashi, Japan", "https://www.kito.com", "hoists@kito.com", "2017", "Pan India", "Chain blocks and hoists with industry-leading safety record.", 6),
  harrington:  mkBrand("harrington", "Harrington", "Manheim, USA", "https://www.harringtonhoists.com", "sales@harringtonhoists.com", "2020", "Pan India", "Hoists and pulleys for material handling.", 4),
  coffing:     mkBrand("coffing", "Coffing", "Wadesboro, USA", "https://www.coffinghoists.com", "info@coffinghoists.com", "2021", "Pan India", "Mechanical pullers and come-along tools.", 2),
};

/* ============================================================================
   4. CLIENTS  (full node from your flow diagram, incl. reviews)
   ========================================================================== */
const CLIENTS = {
  "client-1": {
    id: "client-1",
    name: "R.K. Tripathi",
    company: "Singrauli Minerals Pvt Ltd",
    logo: "https://placehold.co/80x80/0f172a/a3e635?text=SM",
    url: "https://example.com/singrauli-minerals",
    details: "Open-cast mining operator running three excavation sites around Singrauli. Procures hand tools, PPE and lubricants on quarterly rate contracts with consolidated dispatch to site stores.",
    gallery: ["https://placehold.co/320x200?text=SMPL+Site+1", "https://placehold.co/320x200?text=SMPL+Workshop"],
    contact: { phone: "+91 94250 00001", email: "stores@smpl.example.com" },
    social: { linkedin: "https://linkedin.com/company/smpl", instagram: "", twitter: "" },
    reviews: [
      { date: "2026-03-14", rating: 5, description: "Genuine branded material every time. Dispatch documentation is always complete — challan, test certificate, warranty card." },
      { date: "2025-11-02", rating: 4, description: "Quote turnaround within a day. One delivery was delayed in monsoon but the team kept us informed throughout." },
    ],
  },
  "client-2": {
    id: "client-2",
    name: "Meera Deshmukh",
    company: "Vindhya Thermal Power Co",
    logo: "https://placehold.co/80x80/1e3a8a/ffffff?text=VT",
    url: "https://example.com/vindhya-thermal",
    details: "660 MW thermal power station. Annual rate contract for electrical safety equipment, torque tools and lifting tackle with mandatory IS/IEC certification on every line item.",
    gallery: ["https://placehold.co/320x200?text=VTPC+Plant"],
    contact: { phone: "+91 94250 00002", email: "purchase@vtpc.example.com" },
    social: { linkedin: "https://linkedin.com/company/vtpc", instagram: "https://instagram.com/vtpc", twitter: "" },
    reviews: [
      { date: "2026-01-21", rating: 5, description: "Calibration certificates supplied with every torque wrench. Audit-ready paperwork — exactly what a power plant needs." },
    ],
  },
  "client-3": {
    id: "client-3",
    name: "Arvind Sao",
    company: "Korba Steel Fabricators",
    logo: "https://placehold.co/80x80/065f46/ffffff?text=KS",
    url: "https://example.com/korba-steel",
    details: "Structural steel fabrication unit. Bulk consumer of grinding discs, welding consumables and rigging slings; prefers staggered monthly deliveries to the Korba Hub.",
    gallery: [],
    contact: { phone: "+91 94250 00003", email: "admin@ksf.example.com" },
    social: { linkedin: "", instagram: "", twitter: "https://twitter.com/ksf_korba" },
    reviews: [
      { date: "2026-04-08", rating: 4, description: "Consistent quality on abrasives. Bulk pricing on 100+ disc orders is the best we have found in the region." },
      { date: "2025-09-17", rating: 5, description: "Webbing slings arrived with load-test certificates and colour-coded SWL tags. Very professional." },
    ],
  },
  "client-4": {
    id: "client-4",
    name: "Sunita Patel",
    company: "Rewa Cement Works",
    logo: "https://placehold.co/80x80/7c2d12/ffffff?text=RC",
    url: "https://example.com/rewa-cement",
    details: "Cement grinding unit sourcing lubricants, hydraulic spares and maintenance chemicals. Requires MSDS sheets with every chemical consignment.",
    gallery: ["https://placehold.co/320x200?text=RCW+Mill"],
    contact: { phone: "+91 94250 00004", email: "stores@rcw.example.com" },
    social: { linkedin: "https://linkedin.com/company/rcw", instagram: "", twitter: "" },
    reviews: [
      { date: "2026-02-11", rating: 5, description: "MSDS and batch certificates always attached. Shell oils supplied in sealed OEM packaging — zero adulteration concerns." },
    ],
  },
  "client-5": {
    id: "client-5",
    name: "Imran Qureshi",
    company: "MP Infra Projects Ltd",
    logo: "https://placehold.co/80x80/581c87/ffffff?text=MP",
    url: "https://example.com/mp-infra",
    details: "Road and bridge construction contractor. Seasonal bulk orders for power tools, safety helmets and boots across multiple site offices in Madhya Pradesh.",
    gallery: [],
    contact: { phone: "+91 94250 00005", email: "procure@mpinfra.example.com" },
    social: { linkedin: "https://linkedin.com/company/mpinfra", instagram: "https://instagram.com/mpinfra", twitter: "" },
    reviews: [
      { date: "2025-12-29", rating: 4, description: "Multi-site delivery handled smoothly. Helmets came with IS 2925 marking and manufacture date — passed our safety audit first time." },
    ],
  },
};

/* ============================================================================
   5. PRODUCTS  (flat list, allocations by id — mirrors "products allocation")
   Every field is optional except sku & name — the page renders whatever exists.
   ========================================================================== */
const PRODUCTS = [
  {
    sku: "SKU-9001", name: "Adjustable Wrench (10-inch)", model: "CL-810W",
    categoryId: "cat-1", subCategoryId: "subcat-1", brandId: "channellock", clientIds: ["client-1", "client-3"],
    specification: "Chrome plated, Anti-slip grip", zone: "Singrauli Main Hub",
    manufacturer: "Channellock Inc., USA", material: "Chrome Plated Carbon Steel",
    weight: "450g", dimensions: { height: "10 inches", width: "2 inches", depth: "0.5 inches" },
    capacity: "Up to 1.125 inches", certifications: ["ISO 6913", "BS 4757"],
    description: "A workshop staple built for daily abuse. The 10-inch adjustable wrench features a precision-machined jaw with laser-etched scale, a chrome-plated body that resists corrosion in humid plant conditions, and a knurled anti-slip grip that stays secure even with oily gloves. Jaw parallelism is held within 0.05mm for a positive bite on hex fasteners.",
    attributes: { "Jaw Opening": "0–28.5mm", "Handle Finish": "Knurled chrome", "Scale Marking": "Laser etched (mm + inch)", "Warranty": "Lifetime against forging defects" },
    brochure: { label: "Channellock Wrench Datasheet", url: "/brochures/sku-9001.pdf", size: "1.2 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Wrench+Front+View", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Wrench+Side+View", angle: "Side View" },
      { url: "https://placehold.co/600x600?text=Wrench+Top+View", angle: "Top View" },
      { url: "https://placehold.co/600x600?text=Wrench+Grip+Detail", angle: "Grip Detail" },
    ],
  },
  {
    sku: "SKU-9002", name: "Set of Combination Wrenches (6-32mm)", model: "ST-COMBI-26",
    categoryId: "cat-1", subCategoryId: "subcat-1", brandId: "stahlwille", clientIds: ["client-1"],
    specification: "SAE & Metric, Mirror polished", zone: "NCL Spares Depot",
    manufacturer: "Stahlwille Tools, Germany", material: "Chrome Vanadium Steel",
    weight: "1.8kg", dimensions: { height: "220mm", width: "100mm", depth: "50mm" },
    capacity: "6-32mm range", certifications: ["ISO 691", "DIN 3110", "BS 4757"],
    description: "Twenty-six mirror-polished combination wrenches covering 6 to 32mm in a roll-up pouch. Stahlwille's AS-drive open end grips the flat of the fastener — not the corners — reducing rounding on worn nuts by up to 60%.",
    attributes: { "Pieces": "26", "Drive Profile": "AS-drive open end", "Storage": "Canvas roll pouch", "Hardness": "44–48 HRC" },
    brochure: { label: "Stahlwille Combination Set Catalogue", url: "/brochures/sku-9002.pdf", size: "2.4 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Wrench+Set+Full", angle: "Full Set View" },
      { url: "https://placehold.co/600x600?text=Wrench+Set+Sizes", angle: "Size Range" },
      { url: "https://placehold.co/600x600?text=Wrench+Set+Close", angle: "Close-up" },
      { url: "https://placehold.co/600x600?text=Wrench+Polish+Detail", angle: "Polish Detail" },
    ],
  },
  {
    sku: "SKU-9003", name: "Pipe Wrench Heavy Duty (18-inch)", model: "RG-18HD",
    categoryId: "cat-1", subCategoryId: "subcat-1", brandId: "ridgid", clientIds: ["client-5"],
    specification: "Iron casting, Serrated jaws", zone: "Korba Hub",
    manufacturer: "Ridgid Inc., USA", material: "Iron Casting with Serrated Jaws",
    weight: "1.2kg", dimensions: { height: "18 inches", width: "3 inches", depth: "1 inch" },
    capacity: "Pipe size up to 2 inches", certifications: ["UL Certified", "ANSI B107.14"],
    description: "Classic heavy-duty pipe wrench with full-floating forged hook jaw and self-cleaning threads. The serrated jaw bites harder as load increases, ideal for seized galvanized pipework on site.",
    attributes: { "Jaw Type": "Full-floating forged hook", "Pipe Capacity": "2 inch nominal", "Replaceable Parts": "Hook jaw, heel jaw, nut & spring" },
    images: [
      { url: "https://placehold.co/600x600?text=Pipe+Wrench+Front", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Pipe+Wrench+Jaws", angle: "Jaw Detail" },
      { url: "https://placehold.co/600x600?text=Pipe+Wrench+Open", angle: "Open Position" },
      { url: "https://placehold.co/600x600?text=Pipe+Wrench+Scale", angle: "Size Reference" },
    ],
  },
  {
    sku: "SKU-9004", name: "Socket Set 1/2-inch Drive (40 Pieces)", model: "SO-240SET",
    categoryId: "cat-1", subCategoryId: "subcat-2", brandId: "snapon", clientIds: ["client-2", "client-1"],
    specification: "Chrome vanadium steel, Metric & SAE", zone: "Singrauli Main Hub",
    manufacturer: "Snap-on Inc., USA", material: "Chrome Vanadium Steel",
    weight: "3.5kg", dimensions: { height: "250mm", width: "200mm", depth: "100mm" },
    capacity: "1/2-inch drive, 8-32mm sockets", certifications: ["ISO 3123", "ANSI B107.1"],
    description: "Forty-piece 1/2-inch drive socket set in a blow-moulded case with metric and SAE coverage. Flank-drive socket profile applies torque to fastener flats for maximum grip without rounding.",
    attributes: { "Pieces": "40", "Drive": "1/2 inch", "Socket Profile": "Flank drive 6-point", "Case": "Blow-moulded with size markings" },
    brochure: { label: "Snap-on Socket Set Spec Sheet", url: "/brochures/sku-9004.pdf", size: "1.8 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Socket+Set+Complete", angle: "Complete Set" },
      { url: "https://placehold.co/600x600?text=Socket+Set+Sizes", angle: "Size Variety" },
      { url: "https://placehold.co/600x600?text=Socket+Set+Case", angle: "Storage Case" },
      { url: "https://placehold.co/600x600?text=Socket+Individual", angle: "Individual Socket" },
    ],
  },
  {
    sku: "SKU-9005", name: "Torque Wrench Click Type 1/2-inch", model: "SA-96211",
    categoryId: "cat-1", subCategoryId: "subcat-2", brandId: "sata", clientIds: ["client-2"],
    specification: "Range 42-210 N·m, Calibrated", zone: "NCL Spares Depot",
    manufacturer: "Sata Tools, Taiwan", material: "Alloy Steel",
    weight: "680g", dimensions: { height: "350mm", width: "35mm", depth: "30mm" },
    capacity: "42-210 N·m (30-155 ft-lbs)", certifications: ["ISO 6789", "DIN 912"],
    description: "Click-type torque wrench supplied with individual calibration certificate traceable to national standards. Dual-scale (N·m and ft-lb) with a positive lock ring to prevent accidental setting drift.",
    attributes: { "Accuracy": "±4% CW", "Calibration": "Certificate included", "Scale": "Dual N·m / ft-lb", "Ratchet Teeth": "45" },
    brochure: { label: "Sata Torque Tool Calibration Guide", url: "/brochures/sku-9005.pdf", size: "0.9 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Torque+Wrench+Full", angle: "Full Length" },
      { url: "https://placehold.co/600x600?text=Torque+Wrench+Head", angle: "Head Detail" },
      { url: "https://placehold.co/600x600?text=Torque+Wrench+Scale", angle: "Scale View" },
      { url: "https://placehold.co/600x600?text=Torque+Wrench+Handle", angle: "Handle Detail" },
    ],
  },
  {
    sku: "SKU-9006", name: "Ratchet Handle 3/8-inch 72-Tooth", model: "WE-8004B",
    categoryId: "cat-1", subCategoryId: "subcat-2", brandId: "wera", clientIds: ["client-1"],
    specification: "Quick release, Polished finish", zone: "Korba Hub",
    manufacturer: "Wera Werkzeuge, Germany", material: "Chrome Plated Alloy Steel",
    weight: "280g", dimensions: { height: "180mm", width: "20mm", depth: "15mm" },
    capacity: "3/8-inch drive", certifications: ["ISO 3315", "DIN 3122"],
    description: "Fine-tooth 72-position ratchet needing only a 5° swing arc — perfect for tight engine bays and panel work. Push-button quick release drops sockets without prying.",
    attributes: { "Teeth": "72 (5° arc)", "Release": "Push-button quick release", "Head": "Sealed, low profile" },
    images: [
      { url: "https://placehold.co/600x600?text=Ratchet+Complete", angle: "Full View" },
      { url: "https://placehold.co/600x600?text=Ratchet+Head", angle: "Head View" },
      { url: "https://placehold.co/600x600?text=Ratchet+Release", angle: "Quick Release" },
      { url: "https://placehold.co/600x600?text=Ratchet+Finish", angle: "Polish Detail" },
    ],
  },
  {
    sku: "SKU-9007", name: "Corded Impact Drill 850W", model: "GSB-850RE",
    categoryId: "cat-2", subCategoryId: "subcat-3", brandId: "bosch", clientIds: ["client-5", "client-3"],
    specification: "Variable speed, Metal chuck", zone: "Singrauli Main Hub",
    manufacturer: "Bosch Tools, Germany", material: "Metal Body with Rubber Grip",
    weight: "2.1kg", dimensions: { height: "200mm", width: "90mm", depth: "80mm" },
    capacity: "13mm chuck", wattage: "850W", certifications: ["CE Mark", "GS Certified", "IS 5194"],
    description: "850W impact drill with all-metal gear housing for jobsite life. Variable-speed trigger with lock-on, reversible rotation, and a 13mm keyed metal chuck that holds bits under hammer load without slip.",
    attributes: { "No-load Speed": "0–2,800 rpm", "Impact Rate": "0–44,800 bpm", "Drilling (Concrete)": "16mm max", "Cable": "4m H05 rubber" },
    brochure: { label: "Bosch GSB 850 Datasheet", url: "/brochures/sku-9007.pdf", size: "1.5 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Drill+Front+View", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Drill+Side+View", angle: "Side View" },
      { url: "https://placehold.co/600x600?text=Drill+Chuck+Detail", angle: "Chuck Detail" },
      { url: "https://placehold.co/600x600?text=Drill+In+Use", angle: "Action View" },
    ],
  },
  {
    sku: "SKU-9008", name: "Cordless Drill-Driver 20V Li-ion", model: "DCD-771C2",
    categoryId: "cat-2", subCategoryId: "subcat-3", brandId: "dewalt", clientIds: ["client-5"],
    specification: "2-speed transmission, Compact design", zone: "NCL Spares Depot",
    manufacturer: "DeWalt, USA", material: "Polymer Composite Housing",
    weight: "1.5kg", dimensions: { height: "180mm", width: "85mm", depth: "75mm" },
    capacity: "10mm chuck", wattage: "400W (equivalent)", certifications: ["CE Mark", "UL Listed"],
    description: "Compact 20V drill-driver with two-speed transmission and 16-position clutch. Ships with two 1.5Ah Li-ion packs and a 45-minute charger — enough for a full shift of fixing work.",
    attributes: { "Battery": "2 × 20V 1.5Ah Li-ion", "Clutch": "16 positions", "Speeds": "0–450 / 0–1,500 rpm", "Charger": "45-min fast charge" },
    images: [
      { url: "https://placehold.co/600x600?text=Cordless+Drill+Front", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Cordless+Drill+Battery", angle: "Battery View" },
      { url: "https://placehold.co/600x600?text=Cordless+Drill+Chuck", angle: "Chuck Close-up" },
      { url: "https://placehold.co/600x600?text=Cordless+Drill+Controls", angle: "Control Panel" },
    ],
  },
  {
    sku: "SKU-9009", name: "Drill Bit Set HSS 1-10mm (50pcs)", model: "IR-HSS50T",
    categoryId: "cat-2", subCategoryId: "subcat-3", brandId: "irwin", clientIds: ["client-3"],
    specification: "Titanium coated, Precision ground", zone: "Korba Hub",
    manufacturer: "Irwin Industrial Tools, USA", material: "High Speed Steel (HSS) Titanium Coated",
    weight: "450g", dimensions: { height: "180mm", width: "120mm", depth: "80mm" },
    capacity: "1-10mm range, 50 pieces", certifications: ["ISO 1412", "DIN 338"],
    description: "Fifty titanium-coated HSS bits from 1 to 10mm in an indexed metal case. 135° split-point tip starts on contact without centre punching and runs cooler in mild steel.",
    attributes: { "Pieces": "50", "Tip": "135° split point", "Coating": "Titanium nitride", "Case": "Indexed metal" },
    images: [
      { url: "https://placehold.co/600x600?text=Drill+Bits+Set+Full", angle: "Complete Set" },
      { url: "https://placehold.co/600x600?text=Drill+Bits+Organized", angle: "Organized View" },
      { url: "https://placehold.co/600x600?text=Drill+Bits+Individual", angle: "Individual Bit" },
      { url: "https://placehold.co/600x600?text=Drill+Bits+Coating", angle: "Titanium Coating" },
    ],
  },
  {
    sku: "SKU-9010", name: "Angle Grinder 4.5-inch 950W", model: "GA-4530R",
    categoryId: "cat-2", subCategoryId: "subcat-4", brandId: "makita", clientIds: ["client-3"],
    specification: "Guard included, Soft start", zone: "Singrauli Main Hub",
    manufacturer: "Makita Corporation, Japan", material: "Metal Body with Soft Grip",
    weight: "1.8kg", dimensions: { height: "200mm", width: "140mm", depth: "120mm" },
    capacity: "115mm disc (4.5-inch)", wattage: "950W", certifications: ["CE Mark", "IS 5194", "GS Certified"],
    description: "950W angle grinder with soft-start to kill kickback at switch-on and a labyrinth-sealed motor that survives grinding dust. Tool-less guard adjustment and side handle mountable on either side.",
    attributes: { "Disc": "115mm (4.5 in)", "No-load Speed": "11,000 rpm", "Spindle": "M14", "Soft Start": "Yes" },
    brochure: { label: "Makita GA4530 Spec Sheet", url: "/brochures/sku-9010.pdf", size: "1.1 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Angle+Grinder+Front", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Angle+Grinder+Guard", angle: "Guard Detail" },
      { url: "https://placehold.co/600x600?text=Angle+Grinder+Side", angle: "Side View" },
      { url: "https://placehold.co/600x600?text=Angle+Grinder+Disc", angle: "Disc Area" },
    ],
  },
  {
    sku: "SKU-9011", name: "Circular Saw 7.25-inch 1500W", model: "FT-HK85",
    categoryId: "cat-2", subCategoryId: "subcat-4", brandId: "festool", clientIds: ["client-5"],
    specification: "Laser guide, Dust blower", zone: "NCL Spares Depot",
    manufacturer: "Festool GmbH, Germany", material: "Magnesium Alloy Housing",
    weight: "2.4kg", dimensions: { height: "220mm", width: "180mm", depth: "150mm" },
    capacity: "185mm blade (7.25-inch)", wattage: "1500W", certifications: ["CE Mark", "GS Certified"],
    description: "Lightweight magnesium-bodied circular saw with laser cut-line guide and integrated dust blower keeping the mark visible. Bevel capacity to 45° with positive stops.",
    attributes: { "Blade": "185mm, 24T supplied", "Cut Depth @90°": "62mm", "Bevel": "0–45°", "Guide": "Laser line" },
    images: [
      { url: "https://placehold.co/600x600?text=Circular+Saw+Front", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Circular+Saw+Blade", angle: "Blade View" },
      { url: "https://placehold.co/600x600?text=Circular+Saw+Laser", angle: "Laser Guide" },
      { url: "https://placehold.co/600x600?text=Circular+Saw+Handle", angle: "Handle Detail" },
    ],
  },
  {
    sku: "SKU-9012", name: "Grinding Disc 4.5x6mm (10pcs)", model: "3M-GD456",
    categoryId: "cat-2", subCategoryId: "subcat-4", brandId: "threem", clientIds: ["client-3"],
    specification: "For metal, Stone & Steel", zone: "Korba Hub",
    manufacturer: "3M Abrasive Systems, USA", material: "Aluminum Oxide Abrasive",
    weight: "200g", dimensions: { height: "115mm", width: "115mm", depth: "6mm" },
    capacity: "115mm × 6mm discs, 10 pieces", certifications: ["ISO 12413", "ANSI B24.1"],
    description: "Depressed-centre grinding discs with triple fibreglass reinforcement, rated 13,300 rpm. Aluminium-oxide grain blend balances cut rate against disc life on structural steel.",
    attributes: { "Pack": "10 discs", "Max RPM": "13,300", "Bore": "22.23mm", "Reinforcement": "3-layer fibreglass" },
    images: [
      { url: "https://placehold.co/600x600?text=Grinding+Disc+Pack", angle: "Pack View" },
      { url: "https://placehold.co/600x600?text=Grinding+Disc+Stack", angle: "Stacked View" },
      { url: "https://placehold.co/600x600?text=Grinding+Disc+Surface", angle: "Surface Detail" },
      { url: "https://placehold.co/600x600?text=Grinding+Disc+Edge", angle: "Edge View" },
    ],
  },
  {
    sku: "SKU-9021", name: "Industrial Safety Leather Boots (Grade A)", model: "TB-PIT6ST",
    categoryId: "cat-3", subCategoryId: "subcat-5", brandId: "timberland", clientIds: ["client-5", "client-1"],
    specification: "Steel toe, Anti-slip sole", zone: "Singrauli Main Hub",
    manufacturer: "Timberland Company, USA", material: "Premium Leather with Steel Toe Cap",
    weight: "650g (pair)", dimensions: { height: "200mm", width: "100mm", depth: "80mm" },
    capacity: "Steel toe protection up to 200J", certifications: ["IS 1035", "CE 344:2004"],
    description: "Grade-A full-grain leather work boots with 200-joule steel toe and oil-resistant anti-slip outsole. Padded collar and moisture-wicking lining for 12-hour shifts in mining environments.",
    attributes: { "Toe Cap": "Steel, 200J", "Sole": "PU dual-density, anti-slip SRC", "Sizes": "UK 6–12", "Lining": "Moisture wicking" },
    brochure: { label: "Timberland PRO Boot Range", url: "/brochures/sku-9021.pdf", size: "2.0 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Safety+Boots+Pair", angle: "Full Pair" },
      { url: "https://placehold.co/600x600?text=Safety+Boots+Side", angle: "Side View" },
      { url: "https://placehold.co/600x600?text=Safety+Boots+Toe", angle: "Steel Toe Detail" },
      { url: "https://placehold.co/600x600?text=Safety+Boots+Sole", angle: "Anti-slip Sole" },
    ],
  },
  {
    sku: "SKU-9022", name: "Safety Helmet ABS Yellow", model: "KR-PN521",
    categoryId: "cat-3", subCategoryId: "subcat-5", brandId: "karam", clientIds: ["client-5", "client-2"],
    specification: "Impact resistant, Adjustable headband", zone: "NCL Spares Depot",
    manufacturer: "Karam Industries, India", material: "ABS Plastic Shell with EPS Liner",
    weight: "320g", dimensions: { height: "220mm", width: "260mm", depth: "200mm" },
    capacity: "Impact protection up to 200 Joules", certifications: ["IS 2925", "CE 397"],
    description: "ABS shell helmet with ratchet-adjustable 6-point textile harness and replaceable sweatband. UV-stabilised shell carries moulded IS 2925 marking with month of manufacture for audit traceability.",
    attributes: { "Shell": "UV-stabilised ABS", "Harness": "6-point ratchet", "Colours": "Yellow / White / Blue / Red", "Accessory Slots": "Ear-muff & visor compatible" },
    images: [
      { url: "https://placehold.co/600x600?text=Safety+Helmet+Front", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Safety+Helmet+Side", angle: "Side View" },
      { url: "https://placehold.co/600x600?text=Safety+Helmet+Interior", angle: "Interior Padding" },
      { url: "https://placehold.co/600x600?text=Safety+Helmet+Headband", angle: "Adjustable Band" },
    ],
  },
  {
    sku: "SKU-9023", name: "Safety Goggles Anti-fog Clear Lens", model: "UV-9302",
    categoryId: "cat-3", subCategoryId: "subcat-5", brandId: "uvex", clientIds: ["client-2"],
    specification: "Polycarbonate, UV protection", zone: "Korba Hub",
    manufacturer: "Uvex Group, Germany", material: "Polycarbonate Lens with Soft Frame",
    weight: "85g", dimensions: { height: "80mm", width: "160mm", depth: "70mm" },
    capacity: "UV 400 protection", certifications: ["IS 1835", "CE 166"],
    description: "Wide-vision goggles with Uvex supravision anti-fog coating on the inside and scratch-resistant coating outside. Indirect vents block dust and liquid splash while preventing lens misting.",
    attributes: { "Lens": "Polycarbonate, UV400", "Coating": "Anti-fog inside / anti-scratch outside", "Ventilation": "Indirect", "Over-spectacle": "Yes" },
    images: [
      { url: "https://placehold.co/600x600?text=Safety+Goggles+Front", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Safety+Goggles+Lens", angle: "Lens Detail" },
      { url: "https://placehold.co/600x600?text=Safety+Goggles+Side", angle: "Side Profile" },
      { url: "https://placehold.co/600x600?text=Safety+Goggles+Coated", angle: "Anti-fog Coating" },
    ],
  },
  {
    sku: "SKU-3112", name: "Insulated Electrical Rubber Gloves (Class 3)", model: "AN-E314",
    categoryId: "cat-3", subCategoryId: "subcat-6", brandId: "ansell", clientIds: ["client-2"],
    specification: "Working voltage 26,500V AC, Proof tested", zone: "NCL Spares Depot",
    manufacturer: "Ansell Limited, Australia", material: "Natural Rubber with Canvas Backing",
    weight: "250g (pair)", dimensions: { height: "350mm", width: "150mm", depth: "80mm" },
    capacity: "Class 3 - 26,500V AC", certifications: ["IS 6050", "IEC 60903", "EN 60903"],
    description: "Class 3 natural-rubber insulating gloves proof-tested at 30,000V AC with individual test stamp and date. Supplied with inspection record card; recommended retest interval of six months per IEC 60903.",
    attributes: { "Class": "3 (26,500V working)", "Proof Test": "30,000V AC", "Length": "360mm", "Retest Interval": "6 months" },
    brochure: { label: "Ansell Electrical Glove Test Protocol", url: "/brochures/sku-3112.pdf", size: "0.8 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Safety+Gloves+Pair", angle: "Full Pair" },
      { url: "https://placehold.co/600x600?text=Safety+Gloves+Single", angle: "Single Glove" },
      { url: "https://placehold.co/600x600?text=Safety+Gloves+Texture", angle: "Grip Texture" },
      { url: "https://placehold.co/600x600?text=Safety+Gloves+Detail", angle: "Material Detail" },
    ],
  },
  {
    sku: "SKU-9024", name: "Insulated Screwdriver Set (6pcs)", model: "WH-32092",
    categoryId: "cat-3", subCategoryId: "subcat-6", brandId: "wiha", clientIds: ["client-2"],
    specification: "1000V rated, Cushioned grip", zone: "Singrauli Main Hub",
    manufacturer: "Wiha Tools, Germany", material: "Chrome Vanadium with Insulation",
    weight: "450g", dimensions: { height: "280mm", width: "120mm", depth: "60mm" },
    capacity: "1000V rated, 6-piece set", certifications: ["IS 2848", "CE 1010", "IEC 60900"],
    description: "Six VDE-certified screwdrivers individually tested at 10,000V for a 1,000V working rating. SoftFinish cushion grips with hanging holes; slotted and Phillips profiles for panel work.",
    attributes: { "Pieces": "6 (3 slotted + 3 PH)", "Test Voltage": "10,000V each piece", "Standard": "IEC 60900 / VDE", "Grip": "SoftFinish two-component" },
    images: [
      { url: "https://placehold.co/600x600?text=Screwdriver+Set+Full", angle: "Complete Set" },
      { url: "https://placehold.co/600x600?text=Screwdriver+Individual", angle: "Individual Tool" },
      { url: "https://placehold.co/600x600?text=Screwdriver+Grip", angle: "Grip Detail" },
      { url: "https://placehold.co/600x600?text=Screwdriver+Tips", angle: "Tip Variety" },
    ],
  },
  {
    sku: "SKU-9025", name: "Live Wire Detector Non-contact", model: "FL-1AC-II",
    categoryId: "cat-3", subCategoryId: "subcat-6", brandId: "fluke", clientIds: ["client-2", "client-4"],
    specification: "12-1000V detection range, LED indicator", zone: "Korba Hub",
    manufacturer: "Fluke Corporation, USA", material: "ABS Plastic with Metal Tip",
    weight: "120g", dimensions: { height: "180mm", width: "45mm", depth: "35mm" },
    capacity: "12-1000V AC detection", wattage: "Battery powered", certifications: ["CE Mark", "UL Listed"],
    description: "Pocket non-contact voltage tester with continuous self-test — the tip glows when the unit is working, so a dark tip always means no power AND a verified tester. CAT IV 1000V safety rating.",
    attributes: { "Range": "90–1000V AC (VoltAlert)", "Safety Rating": "CAT IV 1000V", "Indicator": "Red glow tip + beeper", "Battery": "2 × AAA" },
    images: [
      { url: "https://placehold.co/600x600?text=Wire+Detector+Full", angle: "Full View" },
      { url: "https://placehold.co/600x600?text=Wire+Detector+Tip", angle: "Detection Tip" },
      { url: "https://placehold.co/600x600?text=Wire+Detector+LED", angle: "LED Indicator" },
      { url: "https://placehold.co/600x600?text=Wire+Detector+Controls", angle: "Control Button" },
    ],
  },
  {
    sku: "SKU-4412", name: "High-Pressure Hydraulic Lubrication Pump 10L", model: "ET-HP400",
    categoryId: "cat-4", subCategoryId: "subcat-7", brandId: "eaton", clientIds: ["client-4"],
    specification: "Max pressure 400 Bar, 3-Phase motor", zone: "NCL Spares Depot",
    manufacturer: "Eaton Hydraulics, USA", material: "Cast Iron Pump Body",
    weight: "8.5kg", dimensions: { height: "350mm", width: "280mm", depth: "200mm" },
    capacity: "10L reservoir", wattage: "0.75kW motor", certifications: ["ISO 4414", "CE Mark"],
    description: "Motorised lubrication pump delivering up to 400 bar from a 10-litre reservoir with level sight glass. Adjustable relief valve and 3-phase 0.75kW motor for continuous-duty centralised lubrication.",
    attributes: { "Max Pressure": "400 bar", "Reservoir": "10L with sight glass", "Motor": "3-phase, 0.75kW", "Relief Valve": "Adjustable" },
    brochure: { label: "Eaton Lubrication Pump Manual", url: "/brochures/sku-4412.pdf", size: "3.1 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Hydraulic+Pump+Full", angle: "Full Assembly" },
      { url: "https://placehold.co/600x600?text=Hydraulic+Pump+Top", angle: "Top View" },
      { url: "https://placehold.co/600x600?text=Hydraulic+Pump+Valve", angle: "Valve Detail" },
      { url: "https://placehold.co/600x600?text=Hydraulic+Pump+Motor", angle: "Motor View" },
    ],
  },
  {
    sku: "SKU-9026", name: "Machine Oil Premium Grade 20L", model: "SH-TELLUS46",
    categoryId: "cat-4", subCategoryId: "subcat-7", brandId: "shell", clientIds: ["client-4", "client-1"],
    specification: "ISO VG 46, Anti-oxidant", zone: "Singrauli Main Hub",
    manufacturer: "Shell Global, Netherlands", material: "Mineral Oil Blend",
    weight: "20.5kg", dimensions: { height: "350mm", width: "280mm", depth: "200mm" },
    capacity: "20 liters", certifications: ["ISO 6743", "ASTM D4378"],
    description: "ISO VG 46 hydraulic and machine oil with anti-oxidant and anti-wear additive pack. Sealed 20L OEM pail with batch number and MSDS supplied on every dispatch.",
    attributes: { "Viscosity": "ISO VG 46", "Pack": "20L sealed pail", "Additives": "Anti-oxidant, anti-wear (zinc)", "MSDS": "Supplied with consignment" },
    images: [
      { url: "https://placehold.co/600x600?text=Machine+Oil+Canister", angle: "Product Canister" },
      { url: "https://placehold.co/600x600?text=Machine+Oil+Label", angle: "Label Detail" },
      { url: "https://placehold.co/600x600?text=Machine+Oil+Pour", angle: "Pouring View" },
      { url: "https://placehold.co/600x600?text=Machine+Oil+Clarity", angle: "Oil Clarity" },
    ],
  },
  {
    sku: "SKU-9027", name: "Grease Multi-purpose NLGI 2 (400g)", model: "MB-XHP222",
    categoryId: "cat-4", subCategoryId: "subcat-7", brandId: "mobil", clientIds: ["client-4"],
    specification: "EP additives, Water resistant", zone: "Korba Hub",
    manufacturer: "Mobil Corporation, USA", material: "Lithium Complex Soap Grease",
    weight: "420g", dimensions: { height: "100mm", width: "80mm", depth: "80mm" },
    capacity: "400g cartridge", certifications: ["NLGI Grade 2", "ISO 6743"],
    description: "Lithium-complex EP grease in standard 400g cartridges, resistant to water washout and rated for bearing temperatures up to 140°C continuous. Suits conveyor and crusher bearings.",
    attributes: { "NLGI": "2", "Thickener": "Lithium complex", "Temp Range": "-20°C to +140°C", "Cartridge": "400g standard gun fit" },
    images: [
      { url: "https://placehold.co/600x600?text=Grease+Container", angle: "Product Container" },
      { url: "https://placehold.co/600x600?text=Grease+Texture", angle: "Grease Texture" },
      { url: "https://placehold.co/600x600?text=Grease+Dispense", angle: "Dispensing" },
      { url: "https://placehold.co/600x600?text=Grease+Application", angle: "Application View" },
    ],
  },
  {
    sku: "SKU-8821", name: "Aerosol Anti-Rust Spray Premium (Case of 24)", model: "WD-400ML24",
    categoryId: "cat-4", subCategoryId: "subcat-8", brandId: "wd40", clientIds: ["client-1", "client-3"],
    specification: "Moisture displacement, 400ml cans", zone: "Singrauli Main Hub",
    manufacturer: "WD-40 Company, USA", material: "Aerosol Spray Formulation",
    weight: "9.6kg (24 cans)", dimensions: { height: "200mm", width: "180mm", depth: "150mm" },
    capacity: "400ml × 24 cans", certifications: ["ISO 6743", "ASTM D1003"],
    description: "Case of twenty-four 400ml multi-use cans — displaces moisture, frees seized fasteners and leaves a light protective film. Smart-straw nozzle sprays wide or precise without a loose straw.",
    attributes: { "Case": "24 × 400ml", "Nozzle": "Smart Straw 2-way", "Functions": "Penetrant, lubricant, moisture displacer, protectant" },
    images: [
      { url: "https://placehold.co/600x600?text=Anti+Rust+Spray+Case", angle: "Case View" },
      { url: "https://placehold.co/600x600?text=Anti+Rust+Spray+Can", angle: "Single Can" },
      { url: "https://placehold.co/600x600?text=Anti+Rust+Spray+Nozzle", angle: "Spray Nozzle" },
      { url: "https://placehold.co/600x600?text=Anti+Rust+Spray+Label", angle: "Label Detail" },
    ],
  },
  {
    sku: "SKU-9028", name: "Degreaser Industrial Strength 5L", model: "CS-DG5000",
    categoryId: "cat-4", subCategoryId: "subcat-8", brandId: "castrol", clientIds: ["client-4"],
    specification: "Biodegradable, Fast acting", zone: "NCL Spares Depot",
    manufacturer: "Castrol Limited, UK", material: "Alkaline Degreasing Concentrate",
    weight: "5.2kg", dimensions: { height: "280mm", width: "200mm", depth: "150mm" },
    capacity: "5 liters", certifications: ["ISO 6743", "REACH Compliant"],
    description: "Water-dilutable alkaline degreaser concentrate (1:5 to 1:20) for machine beds, floors and parts washing. Biodegradable formulation, REACH compliant, supplied with dilution chart on pack.",
    attributes: { "Dilution": "1:5 to 1:20 in water", "pH (concentrate)": "~12.5", "Biodegradable": "Yes", "Application": "Spray, mop or dip tank" },
    images: [
      { url: "https://placehold.co/600x600?text=Degreaser+Container", angle: "Container View" },
      { url: "https://placehold.co/600x600?text=Degreaser+Label", angle: "Label Detail" },
      { url: "https://placehold.co/600x600?text=Degreaser+Dilution", angle: "Dilution Chart" },
      { url: "https://placehold.co/600x600?text=Degreaser+Action", angle: "Cleaning Action" },
    ],
  },
  {
    sku: "SKU-9029", name: "Metal Cleaner Polish 500ml", model: "3M-MP500",
    categoryId: "cat-4", subCategoryId: "subcat-8", brandId: "threem", clientIds: ["client-4"],
    specification: "Stainless steel safe, Streak-free", zone: "Korba Hub",
    manufacturer: "3M Company, USA", material: "Abrasive Cleaning Compound",
    weight: "530ml", dimensions: { height: "180mm", width: "80mm", depth: "60mm" },
    capacity: "500ml bottle", certifications: ["ISO 6743", "ASTM D2240"],
    description: "Fine-abrasive cream polish that removes oxidation, water spots and light scratches from stainless and aluminium, leaving a streak-free protective sheen.",
    attributes: { "Surfaces": "Stainless, aluminium, chrome", "Finish": "Streak-free sheen", "Pack": "500ml squeeze bottle" },
    images: [
      { url: "https://placehold.co/600x600?text=Metal+Polish+Bottle", angle: "Bottle View" },
      { url: "https://placehold.co/600x600?text=Metal+Polish+Texture", angle: "Polish Texture" },
      { url: "https://placehold.co/600x600?text=Metal+Polish+Before", angle: "Before Cleaning" },
      { url: "https://placehold.co/600x600?text=Metal+Polish+After", angle: "After Polishing" },
    ],
  },
  {
    sku: "SKU-1094", name: "Heavy Duty Lifting Textile Webbing Sling 5T", model: "CT-WS5T15",
    categoryId: "cat-5", subCategoryId: "subcat-9", brandId: "cortland", clientIds: ["client-3", "client-1"],
    specification: "Duplex factor 7:1, Polyester material", zone: "Korba Hub",
    manufacturer: "Cortland Limited, USA", material: "High-Strength Polyester Webbing",
    weight: "1.8kg", dimensions: { height: "1.5m", width: "100mm", depth: "20mm" },
    capacity: "5 tonne safe working load", certifications: ["ISO 7189", "EN 1492"],
    description: "Duplex polyester webbing sling, 5-tonne SWL with 7:1 safety factor and reinforced eye loops. Colour-coded red per EN 1492 with stitched-in load label; load-test certificate supplied per sling.",
    attributes: { "SWL": "5 tonne (straight lift)", "Safety Factor": "7:1", "Length": "1.5m eye-to-eye", "Colour Code": "Red (EN 1492)" },
    brochure: { label: "Cortland Sling Inspection Guide", url: "/brochures/sku-1094.pdf", size: "1.4 MB" },
    images: [
      { url: "https://placehold.co/600x600?text=Webbing+Sling+Full", angle: "Full Length" },
      { url: "https://placehold.co/600x600?text=Webbing+Sling+Weave", angle: "Weave Detail" },
      { url: "https://placehold.co/600x600?text=Webbing+Sling+Eye", angle: "Eye Loop" },
      { url: "https://placehold.co/600x600?text=Webbing+Sling+Stitch", angle: "Stitching Detail" },
    ],
  },
  {
    sku: "SKU-9030", name: "Chain Sling Grade 100 5T", model: "PW-G100-5T",
    categoryId: "cat-5", subCategoryId: "subcat-9", brandId: "pewag", clientIds: ["client-1"],
    specification: "Alloy steel, Calibrated links", zone: "Singrauli Main Hub",
    manufacturer: "Pewag Group, Austria", material: "Alloy Steel Grade 100",
    weight: "2.5kg", dimensions: { height: "1.2m", width: "50mm", depth: "40mm" },
    capacity: "5 tonne safe working load", certifications: ["EN 818", "ISO 3077"],
    description: "Grade 100 alloy chain sling with stamped traceability code on every link and master ring. 25% higher WLL than Grade 80 at the same chain size — lighter rigging for the same lift.",
    attributes: { "Grade": "100", "WLL": "5 tonne", "Traceability": "Stamped code per link", "Hooks": "Clevis self-locking" },
    images: [
      { url: "https://placehold.co/600x600?text=Chain+Sling+Full", angle: "Full Chain" },
      { url: "https://placehold.co/600x600?text=Chain+Sling+Link", angle: "Link Detail" },
      { url: "https://placehold.co/600x600?text=Chain+Sling+Hook", angle: "Hook Assembly" },
      { url: "https://placehold.co/600x600?text=Chain+Sling+Marks", angle: "Grade Markings" },
    ],
  },
  {
    sku: "SKU-9031", name: "Wire Rope Sling 6x19 8mm 10T", model: "BR-619-8",
    categoryId: "cat-5", subCategoryId: "subcat-9", brandId: "bridon", clientIds: ["client-1"],
    specification: "IWRC core, Certified safe working load", zone: "NCL Spares Depot",
    manufacturer: "Bridon International, UK", material: "Steel Wire Rope 6×19 IWRC",
    weight: "3.2kg", dimensions: { height: "1.5m", width: "8mm", depth: "8mm" },
    capacity: "10 tonne safe working load", certifications: ["ISO 2061", "EN 10017"],
    description: "6×19 construction wire rope sling with independent wire rope core (IWRC) for crush resistance, swaged ferrule terminations and certified 10-tonne SWL.",
    attributes: { "Construction": "6×19 IWRC", "SWL": "10 tonne", "Termination": "Swaged ferrule, soft eye", "Certificate": "Test cert per sling" },
    images: [
      { url: "https://placehold.co/600x600?text=Wire+Rope+Full", angle: "Full Length" },
      { url: "https://placehold.co/600x600?text=Wire+Rope+Strands", angle: "Strand Detail" },
      { url: "https://placehold.co/600x600?text=Wire+Rope+Termination", angle: "Termination" },
      { url: "https://placehold.co/600x600?text=Wire+Rope+Close", angle: "Close-up View" },
    ],
  },
  {
    sku: "SKU-9032", name: "Manual Chain Block 2T", model: "KT-CB020",
    categoryId: "cat-5", subCategoryId: "subcat-10", brandId: "kito", clientIds: ["client-3"],
    specification: "Load chain Grade 80, Swivel hook", zone: "Korba Hub",
    manufacturer: "Kito Corporation, Japan", material: "Ductile Iron Body",
    weight: "4.5kg", dimensions: { height: "180mm", width: "150mm", depth: "120mm" },
    capacity: "2 tonne lift capacity", certifications: ["ISO 4488", "EN 14491"],
    description: "Two-tonne manual chain block with Grade 80 nickel-plated load chain, 360° swivel hooks with safety latches, and a dual-pawl brake that holds load at any height.",
    attributes: { "Capacity": "2 tonne", "Standard Lift": "3m", "Load Chain": "Grade 80, nickel plated", "Brake": "Dual pawl, asbestos-free" },
    images: [
      { url: "https://placehold.co/600x600?text=Chain+Block+Full", angle: "Full Unit" },
      { url: "https://placehold.co/600x600?text=Chain+Block+Hook", angle: "Hook Detail" },
      { url: "https://placehold.co/600x600?text=Chain+Block+Chain", angle: "Load Chain" },
      { url: "https://placehold.co/600x600?text=Chain+Block+Handle", angle: "Handle View" },
    ],
  },
  {
    sku: "SKU-9033", name: "Pulley Steel 4-inch Fixed Eye", model: "HR-P4FE",
    categoryId: "cat-5", subCategoryId: "subcat-10", brandId: "harrington", clientIds: ["client-3"],
    specification: "Ball bearing, Powder coated", zone: "Singrauli Main Hub",
    manufacturer: "Harrington Hoists, USA", material: "Steel Body with Ball Bearing",
    weight: "2.8kg", dimensions: { height: "120mm", width: "100mm", depth: "80mm" },
    capacity: "2 tonne working load", certifications: ["ASME B29.1", "EN 14491"],
    description: "Fixed-eye steel pulley block with sealed ball-bearing sheave for low-effort rope handling, powder-coated against corrosion, rated 2-tonne working load.",
    attributes: { "Sheave": "4 inch, ball bearing", "WLL": "2 tonne", "Finish": "Powder coated", "Rope Size": "Up to 16mm" },
    images: [
      { url: "https://placehold.co/600x600?text=Pulley+Front", angle: "Front View" },
      { url: "https://placehold.co/600x600?text=Pulley+Side", angle: "Side Profile" },
      { url: "https://placehold.co/600x600?text=Pulley+Eye", angle: "Eye Loop" },
      { url: "https://placehold.co/600x600?text=Pulley+Bearing", angle: "Ball Bearing" },
    ],
  },
  {
    sku: "SKU-9034", name: "Come-Along Tool 2T Mechanical", model: "CF-CA200",
    categoryId: "cat-5", subCategoryId: "subcat-10", brandId: "coffing", clientIds: ["client-3", "client-5"],
    specification: "Dual pawl, Ratchet operation", zone: "NCL Spares Depot",
    manufacturer: "Coffing Hoists, USA", material: "Cast Iron with Steel Pawls",
    weight: "3.5kg", dimensions: { height: "250mm", width: "120mm", depth: "100mm" },
    capacity: "2 tonne pull capacity", certifications: ["ASME B30.20", "EN 14491"],
    description: "Two-tonne mechanical ratchet puller with redundant dual-pawl mechanism — either pawl alone holds full rated load. Drop-forged hooks with latches and a free-spool release for fast cable payout.",
    attributes: { "Pull Capacity": "2 tonne", "Pawls": "Dual, independent", "Cable": "Aircraft-grade, 3m", "Release": "Free-spool" },
    images: [
      { url: "https://placehold.co/600x600?text=Come+Along+Full", angle: "Full Assembly" },
      { url: "https://placehold.co/600x600?text=Come+Along+Lever", angle: "Lever Detail" },
      { url: "https://placehold.co/600x600?text=Come+Along+Pawl", angle: "Pawl Mechanism" },
      { url: "https://placehold.co/600x600?text=Come+Along+Hook", angle: "Hook Assembly" },
    ],
  },
];

/* ============================================================================
   6. SMALL REUSABLE PIECES (all read PAGE_CONFIG)
   ========================================================================== */

const Eyebrow = ({ children }) => (
  <p className={`${UI.sectionTitleSizes[PAGE_CONFIG.heading.section]} font-black text-slate-400 uppercase tracking-widest`}>
    {children}
  </p>
);

const Card = ({ children, className = "" }) => (
  <div className={`${cardClass()} ${className}`}>{children}</div>
);

const Stars = ({ rating, size = "text-sm" }) => (
  <span className={`${size} leading-none tracking-tight`} aria-label={`${rating} out of 5 stars`}>
    <span className="text-amber-400">{"★".repeat(Math.round(rating))}</span>
    <span className="text-slate-200">{"★".repeat(5 - Math.round(rating))}</span>
  </span>
);

const fallbackImg = (e) => {
  e.currentTarget.src = "https://placehold.co/600x600/f1f5f9/94a3b8?text=Image+Unavailable";
};

/* Expandable description, length controlled by PAGE_CONFIG.description */
function DescriptionBlock({ text }) {
  const [expanded, setExpanded] = useState(false);
  const { maxChars, expandable } = PAGE_CONFIG.description;
  if (!text) return null;
  const isLong = text.length > maxChars;
  const shown = expanded || !isLong ? text : text.slice(0, maxChars).trimEnd() + "…";
  return (
    <div>
      <p className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">{shown}</p>
      {isLong && expandable && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-black text-blue-700 uppercase tracking-wider hover:text-blue-900 transition-colors"
        >
          {expanded ? "− Read less" : "+ Read more"}
        </button>
      )}
    </div>
  );
}

/* Image gallery — main image + thumbnail rail */
function ImageGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) {
    return (
      <div className={`${UI.galleryAspects[PAGE_CONFIG.gallery.aspect]} bg-slate-100 ${UI.radii[PAGE_CONFIG.card.radius]} flex flex-col items-center justify-center text-slate-400`}>
        <span className="text-4xl mb-2">🖼️</span>
        <span className="text-xs font-bold uppercase tracking-wider">Images coming soon</span>
      </div>
    );
  }
  const img = images[active];
  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className={`relative ${UI.galleryAspects[PAGE_CONFIG.gallery.aspect]} bg-slate-100 ${UI.radii[PAGE_CONFIG.card.radius]} overflow-hidden border border-slate-200/80 group`}>
        <img
          src={img.url}
          alt={`${productName} — ${img.angle || "view"}`}
          onError={fallbackImg}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {PAGE_CONFIG.gallery.showAngleLabels && img.angle && (
          <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
            {img.angle}
          </span>
        )}
        {PAGE_CONFIG.gallery.showCounter && images.length > 1 && (
          <span className="absolute top-3 right-3 bg-white/90 text-slate-700 text-[10px] font-black px-2 py-1 rounded-md border border-slate-200">
            {active + 1} / {images.length}
          </span>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {images.map((im, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              title={im.angle}
              className={`${UI.thumbSizes[PAGE_CONFIG.gallery.thumbSize]} shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === active ? "border-blue-900 ring-2 ring-blue-900/20" : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={im.url} alt={im.angle || `view ${i + 1}`} onError={fallbackImg} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Generic spec row */
const SpecItem = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-200/60">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-semibold text-slate-900 break-words">{value}</span>
  </div>
);

/* ============================================================================
   7. PAGE COMPONENT
   ========================================================================== */
export default function ProductDetailPage() {
  const params = useParams();
  const sku = params.sku;

  /* ---- look up product + linked entities (the "allocation" arrows) ---- */
  const product = useMemo(() => PRODUCTS.find((p) => p.sku === sku) || null, [sku]);
  const category = product ? CATEGORIES[product.categoryId] : null;
  const subCategory = product ? SUBCATEGORIES[product.subCategoryId] : null;
  const brand = product?.brandId ? BRANDS[product.brandId] : null;
  const clients = (product?.clientIds || []).map((id) => CLIENTS[id]).filter(Boolean);
  const relatedProducts = useMemo(() => {
    if (!product || !PAGE_CONFIG.related.enabled) return [];
    return PRODUCTS.filter((p) => p.subCategoryId === product.subCategoryId && p.sku !== product.sku)
      .slice(0, PAGE_CONFIG.related.maxItems);
  }, [product]);

  /* ---- review aggregates ---- */
  const allReviews = clients.flatMap((c) => (c.reviews || []).map((r) => ({ ...r, client: c })));
  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : null;

  /* ---- RFQ cart state (unchanged behaviour, nicer toast) ---- */
  const [rfqCart, setRfqCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showFormModal, setShowFormModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", companyName: "", remarks: "" });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const handleQtyChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const stepQty = (productId, delta) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, (prev[productId] || 1) + delta) }));
  };

  const addToRfqCart = (p) => {
    const selectedQty = quantities[p.sku] || 1;
    setRfqCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === p.sku);
      if (existing) {
        return prevCart.map((item) => (item.id === p.sku ? { ...item, quantity: selectedQty } : item));
      }
      return [...prevCart, { id: p.sku, name: p.name, quantity: selectedQty }];
    });
    showToast(`✓ ${selectedQty} unit${selectedQty > 1 ? "s" : ""} of ${p.sku} added to Quote Bucket`);
  };

  const removeFromCart = (id) => setRfqCart((prev) => prev.filter((item) => item.id !== id));

  const handleQuoteSubmission = (e) => {
    e.preventDefault();
    const quotePayload = { client: formData, requestedItems: rfqCart };
    console.log("Dispatched RFQ Payload:", quotePayload);
    showToast(`✓ Quote request sent for ${rfqCart.length} item line${rfqCart.length > 1 ? "s" : ""}. Check ${formData.email}.`);
    setRfqCart([]);
    setShowFormModal(false);
    setFormData({ fullName: "", email: "", mobile: "", companyName: "", remarks: "" });
  };

  /* ---------------------------------------------------------------------- */
  /* NOT FOUND                                                               */
  /* ---------------------------------------------------------------------- */
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-6`}>
            <Link href="/products" className="text-blue-600 hover:text-blue-900 font-semibold text-sm">
              ← Back to Products
            </Link>
          </div>
        </div>
        <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-20 flex flex-col items-center justify-center`}>
          <div className="text-6xl mb-4 opacity-30">🔍</div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-slate-500 font-medium mb-1">No catalogue entry exists for:</p>
          <p className="font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg mb-8">{sku}</p>
          <Link href="/products">
            <button className="bg-blue-950 text-white font-black text-xs px-6 py-3 rounded-xl uppercase tracking-wider hover:bg-blue-900 transition-colors shadow-md">
              Return to Catalog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const currentInputQty = quantities[product.sku] || 1;
  const cartItem = rfqCart.find((item) => item.id === product.sku);
  const isAlreadyInCart = !!cartItem;
  const S = PAGE_CONFIG.sections;

  /* ---------------------------------------------------------------------- */
  /* MAIN RENDER                                                             */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">

      {/* ==================== HEADER ==================== */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-3`}>
          <div>
            <Link href="/products" className="text-blue-600 hover:text-blue-900 font-semibold text-xs uppercase tracking-wider">
              ← Back to Products
            </Link>
            <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight mt-0.5">Product Details</h1>
          </div>
          <button
            onClick={() => {
              if (rfqCart.length === 0) { showToast("Your Quote Bucket is empty — add items below."); return; }
              setShowFormModal(true);
            }}
            className="bg-blue-950 text-white font-bold text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow-lg flex items-center space-x-3 hover:bg-blue-900 transition-all transform active:scale-95 whitespace-nowrap w-fit"
          >
            <span>📋</span>
            <span>Quote Bucket</span>
            <span className={`bg-lime-400 text-slate-950 rounded-md px-1.5 py-0.5 font-black text-[10px] ${rfqCart.length > 0 ? "animate-pulse" : ""}`}>
              {rfqCart.length} Lines
            </span>
          </button>
        </div>
      </div>

      {/* ==================== BREADCRUMB ==================== */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-3">
        <div className={`${PAGE_CONFIG.layout.container} mx-auto text-xs font-medium text-slate-600 flex flex-wrap items-center gap-y-1`}>
          <Link href="/products" className="text-blue-600 hover:text-blue-900">Products</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span>{category?.icon} {category?.name}</span>
          <span className="mx-2 text-slate-300">/</span>
          <span>{subCategory?.name}</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-black text-slate-900 font-mono">{product.sku}</span>
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className={`${PAGE_CONFIG.layout.container} mx-auto px-4 md:px-8 py-8 md:py-12`}>
        <div className={`grid grid-cols-1 ${PAGE_CONFIG.layout.contentSplit} gap-6 lg:gap-8 items-start`}>

          {/* ========== LEFT COLUMN (2/3) ========== */}
          <div className="lg:col-span-2 space-y-6">

            {/* ---- HERO: GALLERY + OVERVIEW ---- */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                {S.gallery && (
                  <ImageGallery images={product.images} productName={product.name} />
                )}

                {S.overview && (
                  <div className="flex flex-col">
                    {/* SKU + model chips */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                        {product.sku}
                      </span>
                      {product.model && (
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                          Model: {product.model}
                        </span>
                      )}
                    </div>

                    {/* Product name — size from config */}
                    <h1 className={`${UI.productNameSizes[PAGE_CONFIG.heading.productName]} font-black text-slate-900 tracking-tight leading-tight`}>
                      {product.name}
                    </h1>

                    {product.specification && (
                      <p className="text-sm text-slate-500 font-medium mt-2">{product.specification}</p>
                    )}

                    {/* Brand chip (brand allocation) */}
                    {brand && (
                      <div className="flex items-center gap-3 mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60 w-fit">
                        <img src={brand.logo} alt={brand.name} onError={fallbackImg} className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</p>
                          <p className="text-sm font-black text-slate-900">{brand.name}</p>
                        </div>
                      </div>
                    )}

                    {/* Category / subcategory allocation chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {category && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-lg">
                          {category.icon} {category.name}
                        </span>
                      )}
                      {subCategory && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                          {subCategory.name}
                        </span>
                      )}
                    </div>

                    {/* Zone + rating row */}
                    <div className="mt-auto pt-5 space-y-2.5">
                      {product.zone && (
                        <div className="flex items-center gap-2 text-sm">
                          <span>📍</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Warehouse:</span>
                          <span className="font-bold text-emerald-700">{product.zone}</span>
                        </div>
                      )}
                      {avgRating && PAGE_CONFIG.reviews.showSummary && (
                        <div className="flex items-center gap-2">
                          <Stars rating={Number(avgRating)} />
                          <span className="text-xs font-black text-slate-900">{avgRating}</span>
                          <span className="text-xs text-slate-400 font-medium">({allReviews.length} client review{allReviews.length > 1 ? "s" : ""})</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Value:</span>
                        <span className="text-xs font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          Price On Request
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* ---- DESCRIPTION ---- */}
            {S.description && product.description && (
              <Card>
                <Eyebrow>Product Description</Eyebrow>
                <div className="mt-3">
                  <DescriptionBlock text={product.description} />
                </div>
              </Card>
            )}

            {/* ---- SPECIFICATIONS (standard fields + custom key/values) ---- */}
            {S.specifications && (
              <Card>
                <Eyebrow>Technical Specifications</Eyebrow>
                <div className={`grid ${UI.specCols[PAGE_CONFIG.specs.columns]} gap-2.5 mt-4`}>
                  {product.manufacturer && <SpecItem label="Manufacturer" value={product.manufacturer} />}
                  {product.material && <SpecItem label="Material" value={product.material} />}
                  {product.weight && <SpecItem label="Weight" value={product.weight} />}
                  {product.capacity && <SpecItem label="Capacity" value={product.capacity} />}
                  {product.wattage && <SpecItem label="Power" value={product.wattage} />}
                  {product.dimensions && (
                    <SpecItem
                      label="Dimensions (H × W × D)"
                      value={`${product.dimensions.height} × ${product.dimensions.width} × ${product.dimensions.depth}`}
                    />
                  )}
                  {/* CUSTOM KEY/VALUE PAIRS — "we can create our own key and value" */}
                  {PAGE_CONFIG.specs.mergeCustomAttributes &&
                    product.attributes &&
                    Object.entries(product.attributes).map(([key, value]) => (
                      <SpecItem key={key} label={key} value={value} />
                    ))}
                </div>

                {/* Certifications */}
                {S.certifications && product.certifications?.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <Eyebrow>Certifications & Standards</Eyebrow>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.certifications.map((cert) => (
                        <span key={cert} className="flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">
                          <span>🛡️</span> {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brochure download */}
                {S.brochure && product.brochure && (
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <a
                      href={product.brochure.url}
                      download
                      className="flex items-center justify-between gap-4 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">📄</span>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-900 truncate group-hover:text-blue-900 transition-colors">
                            {product.brochure.label}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            PDF {product.brochure.size ? `• ${product.brochure.size}` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider border border-blue-200 px-3 py-2 rounded-lg group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                        ⬇ Download
                      </span>
                    </a>
                  </div>
                )}
              </Card>
            )}

            {/* ---- DISTRIBUTOR BRAND (full node from flow) ---- */}
            {S.brand && brand && (
              <Card>
                <Eyebrow>Distributor Brand</Eyebrow>
                <div className="flex flex-col sm:flex-row gap-5 mt-4">
                  <img src={brand.logo} alt={brand.name} onError={fallbackImg} className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900">{brand.name}</h3>
                      <span className="text-[10px] font-black text-lime-700 bg-lime-50 border border-lime-200 px-2 py-0.5 rounded uppercase tracking-wider">
                        Authorized Partner
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mt-1.5 leading-relaxed">{brand.description}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
                      <SpecItem label="Location" value={brand.location} />
                      <SpecItem label="Onboarded Since" value={brand.onboardedSince} />
                      <SpecItem label="Products Listed" value={`${brand.productCount}+`} />
                      <SpecItem label="Operational Zone" value={brand.operationalZone} />
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      {brand.webUrl && (
                        <a href={brand.webUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs font-black text-blue-700 uppercase tracking-wider hover:text-blue-900 transition-colors">
                          🌐 Visit Website →
                        </a>
                      )}
                      {brand.email && (
                        <a href={`mailto:${brand.email}`}
                          className="text-xs font-black text-slate-500 uppercase tracking-wider hover:text-slate-900 transition-colors">
                          ✉️ {brand.email}
                        </a>
                      )}
                    </div>

                    {brand.gallery?.length > 0 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto custom-scrollbar pb-1">
                        {brand.gallery.map((g, i) => (
                          <img key={i} src={g} alt={`${brand.name} gallery ${i + 1}`} onError={fallbackImg}
                            className="h-20 rounded-lg object-cover border border-slate-200 shrink-0" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* ---- CLIENTS & REVIEWS (full node from flow) ---- */}
            {S.clients && clients.length > 0 && (
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Eyebrow>Trusted By {clients.length} Client{clients.length > 1 ? "s" : ""}</Eyebrow>
                  {avgRating && PAGE_CONFIG.reviews.showSummary && (
                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg">
                      <Stars rating={Number(avgRating)} size="text-xs" />
                      <span className="text-xs font-black text-amber-800">{avgRating} / 5</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-4">
                  {clients.map((client) => {
                    const reviews = client.reviews || [];
                    const isExpanded = !!expandedReviews[client.id];
                    const visibleReviews = isExpanded ? reviews : reviews.slice(0, PAGE_CONFIG.reviews.maxVisiblePerClient);
                    return (
                      <div key={client.id} className="border border-slate-200/80 rounded-xl p-4 md:p-5 bg-slate-50/50">
                        {/* client header */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <img src={client.logo} alt={client.company} onError={fallbackImg}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <h4 className="text-sm font-black text-slate-900">{client.company}</h4>
                              {client.url && (
                                <a href={client.url} target="_blank" rel="noopener noreferrer"
                                  className="text-[10px] font-black text-blue-600 uppercase tracking-wider hover:text-blue-900">
                                  Visit ↗
                                </a>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-semibold">{client.name}</p>
                            {client.details && (
                              <p className="text-xs text-slate-600 font-medium mt-1.5 leading-relaxed">{client.details}</p>
                            )}

                            {/* contacts + socials */}
                            <div className="flex flex-wrap gap-2 mt-2.5">
                              {client.contact?.phone && (
                                <a href={`tel:${client.contact.phone}`} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md hover:border-blue-300 transition-colors">
                                  📞 {client.contact.phone}
                                </a>
                              )}
                              {client.contact?.email && (
                                <a href={`mailto:${client.contact.email}`} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md hover:border-blue-300 transition-colors">
                                  ✉️ {client.contact.email}
                                </a>
                              )}
                              {client.social?.linkedin && (
                                <a href={client.social.linkedin} target="_blank" rel="noopener noreferrer"
                                  className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors">in LinkedIn</a>
                              )}
                              {client.social?.instagram && (
                                <a href={client.social.instagram} target="_blank" rel="noopener noreferrer"
                                  className="text-[10px] font-black text-pink-700 bg-pink-50 border border-pink-100 px-2 py-1 rounded-md hover:bg-pink-100 transition-colors">◎ Instagram</a>
                              )}
                              {client.social?.twitter && (
                                <a href={client.social.twitter} target="_blank" rel="noopener noreferrer"
                                  className="text-[10px] font-black text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-200 transition-colors">𝕏 Twitter</a>
                              )}
                            </div>

                            {/* client gallery */}
                            {client.gallery?.length > 0 && (
                              <div className="flex gap-2 mt-3 overflow-x-auto custom-scrollbar pb-1">
                                {client.gallery.map((g, i) => (
                                  <img key={i} src={g} alt={`${client.company} site ${i + 1}`} onError={fallbackImg}
                                    className="h-16 rounded-lg object-cover border border-slate-200 shrink-0" />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* reviews */}
                        {reviews.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-200/70 space-y-3">
                            {visibleReviews.map((review, i) => (
                              <div key={i} className="bg-white rounded-lg border border-slate-200/70 p-3.5">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                  <Stars rating={review.rating} size="text-xs" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-700 font-medium leading-relaxed">"{review.description}"</p>
                              </div>
                            ))}
                            {reviews.length > PAGE_CONFIG.reviews.maxVisiblePerClient && (
                              <button
                                onClick={() => setExpandedReviews((prev) => ({ ...prev, [client.id]: !isExpanded }))}
                                className="text-[10px] font-black text-blue-700 uppercase tracking-wider hover:text-blue-900 transition-colors"
                              >
                                {isExpanded ? "− Show fewer reviews" : `+ View all ${reviews.length} reviews`}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* ---- RELATED PRODUCTS (same subcategory allocation) ---- */}
            {S.related && relatedProducts.length > 0 && (
              <Card>
                <Eyebrow>More in {subCategory?.name}</Eyebrow>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {relatedProducts.map((rp) => (
                    <Link key={rp.sku} href={`/products/${rp.sku}`} className="group">
                      <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white hover:shadow-md hover:border-blue-300 transition-all h-full flex flex-col">
                        <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                          <img src={rp.images?.[0]?.url} alt={rp.name} onError={fallbackImg}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-3.5 flex flex-col flex-1">
                          <span className="text-[10px] font-mono font-bold text-slate-400">{rp.sku}</span>
                          <h5 className="text-xs font-black text-slate-900 mt-0.5 leading-snug group-hover:text-blue-900 transition-colors">
                            {rp.name}
                          </h5>
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider mt-auto pt-2">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* ========== RIGHT COLUMN — STICKY ADD-TO-QUOTE ========== */}
          <div className="lg:sticky lg:top-28 space-y-4">
            <Card>
              <h2 className="text-base font-black text-slate-900">Add to Quote</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 mb-5">
                B2B bulk pricing • GST invoice
              </p>

              {/* quantity stepper */}
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">
                Required Quantity (Units)
              </label>
              <div className="flex items-stretch gap-2 mb-5">
                <button onClick={() => stepQty(product.sku, -1)}
                  className="w-11 rounded-xl border-2 border-slate-200 text-slate-600 font-black text-lg hover:border-blue-950 hover:text-blue-950 transition-colors active:scale-95"
                  aria-label="Decrease quantity">−</button>
                <input
                  type="number" min="1" value={currentInputQty}
                  onChange={(e) => handleQtyChange(product.sku, e.target.value)}
                  className="flex-1 text-center font-black text-lg border-2 border-slate-200 rounded-xl py-2.5 focus:outline-none focus:border-blue-950 bg-slate-50"
                  title="Set Bulk Quantity Requirement"
                />
                <button onClick={() => stepQty(product.sku, 1)}
                  className="w-11 rounded-xl border-2 border-slate-200 text-slate-600 font-black text-lg hover:border-blue-950 hover:text-blue-950 transition-colors active:scale-95"
                  aria-label="Increase quantity">+</button>
              </div>

              {/* add to cart */}
              <button
                onClick={() => addToRfqCart(product)}
                className={`w-full text-xs font-black uppercase tracking-wider py-3.5 rounded-xl transition-colors border-2 mb-3 ${
                  isAlreadyInCart
                    ? "bg-lime-500 text-slate-900 border-lime-500 hover:bg-lime-400"
                    : "bg-blue-950 text-white border-blue-950 hover:bg-blue-900"
                }`}
              >
                {isAlreadyInCart ? "✓ Added — Update Quantity" : "➕ Add to Quote Bucket"}
              </button>

              {isAlreadyInCart && (
                <div className="bg-lime-50 border border-lime-200 rounded-lg p-2.5 mb-3">
                  <p className="text-[11px] font-black text-lime-900 text-center">
                    In Quote Bucket • {cartItem.quantity} units
                  </p>
                </div>
              )}

              {/* request quotation */}
              <button
                onClick={() => { if (rfqCart.length === 0) { showToast("Add items to your Quote Bucket first."); return; } setShowFormModal(true); }}
                className={`w-full text-xs font-black uppercase tracking-wider py-3.5 rounded-xl border-2 transition-colors ${
                  rfqCart.length === 0
                    ? "text-slate-300 border-slate-200 cursor-not-allowed"
                    : "text-blue-950 border-blue-950 hover:bg-blue-50"
                }`}
              >
                🚀 Request Quotation
              </button>

              {/* quick facts */}
              <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                {[
                  product.zone && ["📍 Warehouse", product.zone],
                  brand && ["🏷️ Brand", brand.name],
                  product.model && ["🔢 Model", product.model],
                  ["📦 Availability", "In Stock — Bulk Ready"],
                ].filter(Boolean).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] shrink-0">{label}</span>
                    <span className="font-black text-slate-800 text-right truncate">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* assurance strip */}
            <Card className="!p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["🛡️", "Genuine Brands"], ["📑", "Test Certificates"], ["🚚", "Site Delivery"]].map(([icon, label]) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{icon}</span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ==================== RFQ MODAL ==================== */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">

            <div className="bg-blue-950 text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider">Compile Procurement RFQ Slip</h2>
                <p className="text-[10px] text-blue-200/70 font-medium">Please supply accurate communication coordinates below.</p>
              </div>
              <button onClick={() => setShowFormModal(false)} className="text-white/60 hover:text-white font-bold text-sm" aria-label="Close">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Items Bundled Inside Order Line ({rfqCart.length})
                </p>
                <div className="divide-y divide-slate-200/60 max-h-36 overflow-y-auto pr-1">
                  {rfqCart.map((item) => (
                    <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                      <div className="truncate max-w-sm">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">SKU: {item.id}</span>
                      </div>
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="bg-blue-50 text-blue-900 font-black px-2 py-0.5 rounded text-[10px]">
                          QTY: {item.quantity} Units
                        </span>
                        <button onClick={() => removeFromCart(item.id)} className="text-rose-500 font-bold text-xs hover:text-rose-700" aria-label={`Remove ${item.name}`}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleQuoteSubmission} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Contact Full Name</label>
                    <input type="text" required value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g., Amit Sharma"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Company / Enterprise Entity</label>
                    <input type="text" required value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g., Singrauli Minerals Private Ltd"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Official Email Address</label>
                    <input type="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Mobile Number</label>
                    <input type="tel" required value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Specific Dispatch Requirements / Remarks (Optional)</label>
                  <textarea rows="3" value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    placeholder="Provide warehouse dispatch preferences, timeline constraints, or special packaging protocols..."
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium" />
                </div>

                <button type="submit"
                  className="w-full bg-blue-950 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-md hover:bg-blue-900 transition-colors">
                  🚀 Dispatch Quotation Slip via Email & SMS
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOAST ==================== */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-2xl border border-slate-700 max-w-[90vw] text-center animate-[toastIn_.25s_ease-out]">
          {toast}
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 9px; }
        @keyframes toastIn { from { opacity: 0; transform: translate(-50%, 8px); } to { opacity: 1; transform: translate(-50%, 0); } }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
}