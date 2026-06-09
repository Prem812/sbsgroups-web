"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const sku = params.sku;
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const [rfqCart, setRfqCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    companyName: "",
    remarks: ""
  });

  // PRODUCT DATA (Same as main catalog page)
  const categories = [
    {
      id: "cat-1",
      name: "Hand Tools",
      icon: "🔧",
      subcategories: [
        {
          id: "subcat-1",
          name: "Wrenches",
          products: [
            {
              id: "SKU-9001",
              name: "Adjustable Wrench (10-inch)",
              specification: "Chrome plated, Anti-slip grip",
              zone: "Singrauli Main Hub",
              brand: "Channellock",
              manufacturer: "Channellock Inc., USA",
              material: "Chrome Plated Carbon Steel",
              weight: "450g",
              dimensions: { height: "10 inches", width: "2 inches", depth: "0.5 inches" },
              capacity: "Up to 1.125 inches",
              certifications: ["ISO 6913", "BS 4757"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Wrench+Front+View", angle: "Front View" },
                { url: "https://via.placeholder.com/600x600?text=Wrench+Side+View", angle: "Side View" },
                { url: "https://via.placeholder.com/600x600?text=Wrench+Top+View", angle: "Top View" },
                { url: "https://via.placeholder.com/600x600?text=Wrench+Grip+Detail", angle: "Grip Detail" }
              ]
            },
            {
              id: "SKU-9002",
              name: "Set of Combination Wrenches (6-32mm)",
              specification: "SAE & Metric, Mirror polished",
              zone: "NCL Spares Depot",
              brand: "Stahlwille",
              manufacturer: "Stahlwille Tools, Germany",
              material: "Chrome Vanadium Steel",
              weight: "1.8kg",
              dimensions: { height: "220mm", width: "100mm", depth: "50mm" },
              capacity: "6-32mm range",
              certifications: ["ISO 691", "DIN 3110", "BS 4757"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Wrench+Set+Full", angle: "Full Set View" },
                { url: "https://via.placeholder.com/600x600?text=Wrench+Set+Sizes", angle: "Size Range" },
                { url: "https://via.placeholder.com/600x600?text=Wrench+Set+Closeup", angle: "Close-up" },
                { url: "https://via.placeholder.com/600x600?text=Wrench+Polish+Detail", angle: "Polish Detail" }
              ]
            },
            {
              id: "SKU-9003",
              name: "Pipe Wrench Heavy Duty (18-inch)",
              specification: "Iron casting, Serrated jaws",
              zone: "Korba Hub",
              brand: "Ridgid",
              manufacturer: "Ridgid Inc., USA",
              material: "Iron Casting with Serrated Jaws",
              weight: "1.2kg",
              dimensions: { height: "18 inches", width: "3 inches", depth: "1 inch" },
              capacity: "Pipe size up to 2 inches",
              certifications: ["UL Certified", "ANSI B107.14"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Pipe+Wrench+Front", angle: "Front View" },
                { url: "https://via.placeholder.com/600x600?text=Pipe+Wrench+Jaws", angle: "Jaw Detail" },
                { url: "https://via.placeholder.com/600x600?text=Pipe+Wrench+Open", angle: "Open Position" },
                { url: "https://via.placeholder.com/600x600?text=Pipe+Wrench+Size", angle: "Size Reference" }
              ]
            }
          ]
        },
        {
          id: "subcat-2",
          name: "Sockets & Ratchets",
          products: [
            {
              id: "SKU-9004",
              name: "Socket Set 1/2-inch Drive (40 Pieces)",
              specification: "Chrome vanadium steel, Metric & SAE",
              zone: "Singrauli Main Hub",
              brand: "Snap-on",
              manufacturer: "Snap-on Inc., USA",
              material: "Chrome Vanadium Steel",
              weight: "3.5kg",
              dimensions: { height: "250mm", width: "200mm", depth: "100mm" },
              capacity: "1/2-inch drive, 8-32mm sockets",
              certifications: ["ISO 3123", "ANSI B107.1"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Socket+Set+Complete", angle: "Complete Set" },
                { url: "https://via.placeholder.com/600x600?text=Socket+Set+Sizes", angle: "Size Variety" },
                { url: "https://via.placeholder.com/600x600?text=Socket+Set+Case", angle: "Storage Case" },
                { url: "https://via.placeholder.com/600x600?text=Socket+Individual", angle: "Individual Socket" }
              ]
            },
            {
              id: "SKU-9005",
              name: "Torque Wrench Click Type 1/2-inch",
              specification: "Range 42-210 N·m, Calibrated",
              zone: "NCL Spares Depot",
              brand: "Sata",
              manufacturer: "Sata Tools, Taiwan",
              material: "Alloy Steel",
              weight: "680g",
              dimensions: { height: "350mm", width: "35mm", depth: "30mm" },
              capacity: "42-210 N·m (30-155 ft-lbs)",
              certifications: ["ISO 6789", "DIN 912"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Torque+Wrench+Full", angle: "Full Length" },
                { url: "https://via.placeholder.com/600x600?text=Torque+Wrench+Head", angle: "Head Detail" },
                { url: "https://via.placeholder.com/600x600?text=Torque+Wrench+Scale", angle: "Scale View" },
                { url: "https://via.placeholder.com/600x600?text=Torque+Handle+Detail", angle: "Handle Detail" }
              ]
            },
            {
              id: "SKU-9006",
              name: "Ratchet Handle 3/8-inch 72-Tooth",
              specification: "Quick release, Polished finish",
              zone: "Korba Hub",
              brand: "Wera",
              manufacturer: "Wera Werkzeuge, Germany",
              material: "Chrome Plated Alloy Steel",
              weight: "280g",
              dimensions: { height: "180mm", width: "20mm", depth: "15mm" },
              capacity: "3/8-inch drive",
              certifications: ["ISO 3315", "DIN 3122"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Ratchet+Complete", angle: "Full View" },
                { url: "https://via.placeholder.com/600x600?text=Ratchet+Head", angle: "Head View" },
                { url: "https://via.placeholder.com/600x600?text=Ratchet+Release", angle: "Quick Release" },
                { url: "https://via.placeholder.com/600x600?text=Ratchet+Polish", angle: "Polish Detail" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cat-2",
      name: "Power Tools",
      icon: "⚡",
      subcategories: [
        {
          id: "subcat-3",
          name: "Drills & Drivers",
          products: [
            {
              id: "SKU-9007",
              name: "Corded Impact Drill 850W",
              specification: "Variable speed, Metal chuck",
              zone: "Singrauli Main Hub",
              brand: "Bosch",
              manufacturer: "Bosch Tools, Germany",
              material: "Metal Body with Rubber Grip",
              weight: "2.1kg",
              dimensions: { height: "200mm", width: "90mm", depth: "80mm" },
              capacity: "13mm chuck",
              wattage: "850W",
              certifications: ["CE Mark", "GS Certified", "IS 5194"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Drill+Front+View", angle: "Front View" },
                { url: "https://via.placeholder.com/600x600?text=Drill+Side+View", angle: "Side View" },
                { url: "https://via.placeholder.com/600x600?text=Drill+Chuck+Detail", angle: "Chuck Detail" },
                { url: "https://via.placeholder.com/600x600?text=Drill+In+Use", angle: "Action View" }
              ]
            },
            {
              id: "SKU-9008",
              name: "Cordless Drill-Driver 20V Li-ion",
              specification: "2-speed transmission, Compact design",
              zone: "NCL Spares Depot",
              brand: "DeWalt",
              manufacturer: "DeWalt, USA",
              material: "Polymer Composite Housing",
              weight: "1.5kg",
              dimensions: { height: "180mm", width: "85mm", depth: "75mm" },
              capacity: "10mm chuck",
              wattage: "400W (equivalent)",
              certifications: ["CE Mark", "UL Listed"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Cordless+Drill+Front", angle: "Front View" },
                { url: "https://via.placeholder.com/600x600?text=Cordless+Drill+Battery", angle: "Battery View" },
                { url: "https://via.placeholder.com/600x600?text=Cordless+Chuck+Detail", angle: "Chuck Close-up" },
                { url: "https://via.placeholder.com/600x600?text=Cordless+Controls", angle: "Control Panel" }
              ]
            },
            {
              id: "SKU-9009",
              name: "Drill Bit Set HSS 1-10mm (50pcs)",
              specification: "Titanium coated, Precision ground",
              zone: "Korba Hub",
              brand: "Irwin",
              manufacturer: "Irwin Industrial Tools, USA",
              material: "High Speed Steel (HSS) Titanium Coated",
              weight: "450g",
              dimensions: { height: "180mm", width: "120mm", depth: "80mm" },
              capacity: "1-10mm range, 50 pieces",
              certifications: ["ISO 1412", "DIN 338"],
              images: [
                { url: "https://via.placeholder.com/600x600?text=Drill+Bits+Set+Full", angle: "Complete Set" },
                { url: "https://via.placeholder.com/600x600?text=Drill+Bits+Organized", angle: "Organized View" },
                { url: "https://via.placeholder.com/600x600?text=Drill+Bits+Individual", angle: "Individual Bit" },
                { url: "https://via.placeholder.com/600x600?text=Drill+Bits+Coating", angle: "Titanium Coating" }
              ]
            }
          ]
        },
        {
          id: "subcat-4",
          name: "Grinders & Saws",
          products: [
            { id: "SKU-9010", name: "Angle Grinder 4.5-inch 950W", specification: "Guard included, Soft start", zone: "Singrauli Main Hub", brand: "Makita", manufacturer: "Makita Corporation, Japan", material: "Metal Body with Soft Grip", weight: "1.8kg", dimensions: { height: "200mm", width: "140mm", depth: "120mm" }, capacity: "115mm disc (4.5-inch)", wattage: "950W", certifications: ["CE Mark", "IS 5194", "GS Certified"], images: [{ url: "https://via.placeholder.com/600x600?text=Angle+Grinder+Front", angle: "Front View" }, { url: "https://via.placeholder.com/600x600?text=Angle+Grinder+Guard", angle: "Guard Detail" }, { url: "https://via.placeholder.com/600x600?text=Angle+Grinder+Side", angle: "Side View" }, { url: "https://via.placeholder.com/600x600?text=Angle+Grinder+Disc", angle: "Disc Area" }] },
            { id: "SKU-9011", name: "Circular Saw 7.25-inch 1500W", specification: "Laser guide, Dust blower", zone: "NCL Spares Depot", brand: "Festool", manufacturer: "Festool GmbH, Germany", material: "Magnesium Alloy Housing", weight: "2.4kg", dimensions: { height: "220mm", width: "180mm", depth: "150mm" }, capacity: "185mm blade (7.25-inch)", wattage: "1500W", certifications: ["CE Mark", "GS Certified"], images: [{ url: "https://via.placeholder.com/600x600?text=Circular+Saw+Front", angle: "Front View" }, { url: "https://via.placeholder.com/600x600?text=Circular+Saw+Blade", angle: "Blade View" }, { url: "https://via.placeholder.com/600x600?text=Circular+Saw+Laser", angle: "Laser Guide" }, { url: "https://via.placeholder.com/600x600?text=Circular+Saw+Handle", angle: "Handle Detail" }] },
            { id: "SKU-9012", name: "Grinding Disc 4.5x6mm (10pcs)", specification: "For metal, Stone & Steel", zone: "Korba Hub", brand: "3M", manufacturer: "3M Abrasive Systems, USA", material: "Aluminum Oxide Abrasive", weight: "200g", dimensions: { height: "115mm", width: "115mm", depth: "6mm" }, capacity: "115mm × 6mm discs, 10 pieces", certifications: ["ISO 12413", "ANSI B24.1"], images: [{ url: "https://via.placeholder.com/600x600?text=Grinding+Disc+Pack", angle: "Pack View" }, { url: "https://via.placeholder.com/600x600?text=Grinding+Disc+Stack", angle: "Stacked View" }, { url: "https://via.placeholder.com/600x600?text=Grinding+Disc+Surface", angle: "Surface Detail" }, { url: "https://via.placeholder.com/600x600?text=Grinding+Disc+Edge", angle: "Edge View" }] }
          ]
        }
      ]
    },
    {
      id: "cat-3",
      name: "Safety Equipment",
      icon: "🦺",
      subcategories: [
        {
          id: "subcat-5",
          name: "Protective Gear",
          products: [
            { id: "SKU-9021", name: "Industrial Safety Leather Boots (Grade A)", specification: "Steel toe, Anti-slip sole", zone: "Singrauli Main Hub", brand: "Timberland PRO", manufacturer: "Timberland Company, USA", material: "Premium Leather with Steel Toe Cap", weight: "650g (pair)", dimensions: { height: "200mm", width: "100mm", depth: "80mm" }, capacity: "Steel toe protection up to 200J", certifications: ["IS 1035", "CE 344:2004"], images: [{ url: "https://via.placeholder.com/600x600?text=Safety+Boots+Pair", angle: "Full Pair" }, { url: "https://via.placeholder.com/600x600?text=Safety+Boots+Side", angle: "Side View" }, { url: "https://via.placeholder.com/600x600?text=Safety+Boots+Toe", angle: "Steel Toe Detail" }, { url: "https://via.placeholder.com/600x600?text=Safety+Boots+Sole", angle: "Anti-slip Sole" }] },
            { id: "SKU-9022", name: "Safety Helmet ABS Yellow", specification: "Impact resistant, Adjustable headband", zone: "NCL Spares Depot", brand: "Karam", manufacturer: "Karam Industries, India", material: "ABS Plastic Shell with EPS Liner", weight: "320g", dimensions: { height: "220mm", width: "260mm", depth: "200mm" }, capacity: "Impact protection up to 200 Joules", certifications: ["IS 2925", "CE 397"], images: [{ url: "https://via.placeholder.com/600x600?text=Safety+Helmet+Front", angle: "Front View" }, { url: "https://via.placeholder.com/600x600?text=Safety+Helmet+Side", angle: "Side View" }, { url: "https://via.placeholder.com/600x600?text=Safety+Helmet+Interior", angle: "Interior Padding" }, { url: "https://via.placeholder.com/600x600?text=Safety+Helmet+Band", angle: "Adjustable Band" }] },
            { id: "SKU-9023", name: "Safety Goggles Anti-fog Clear Lens", specification: "Polycarbonate, UV protection", zone: "Korba Hub", brand: "Uvex", manufacturer: "Uvex Group, Germany", material: "Polycarbonate Lens with Soft Frame", weight: "85g", dimensions: { height: "80mm", width: "160mm", depth: "70mm" }, capacity: "UV 400 protection", certifications: ["IS 1835", "CE 166"], images: [{ url: "https://via.placeholder.com/600x600?text=Safety+Goggles+Front", angle: "Front View" }, { url: "https://via.placeholder.com/600x600?text=Safety+Goggles+Lens", angle: "Lens Detail" }, { url: "https://via.placeholder.com/600x600?text=Safety+Goggles+Side", angle: "Side Profile" }, { url: "https://via.placeholder.com/600x600?text=Safety+Goggles+Coated", angle: "Anti-fog Coating" }] }
          ]
        },
        {
          id: "subcat-6",
          name: "Electrical Safety",
          products: [
            { id: "SKU-3112", name: "Insulated Electrical Rubber Gloves (Class 3)", specification: "Working voltage 26,500V AC, Proof tested", zone: "NCL Spares Depot", brand: "Ansell", manufacturer: "Ansell Limited, Australia", material: "Natural Rubber with Canvas Backing", weight: "250g (pair)", dimensions: { height: "350mm", width: "150mm", depth: "80mm" }, capacity: "Class 3 - 26,500V AC", certifications: ["IS 6050", "IEC 60903", "EN 60903"], images: [{ url: "https://via.placeholder.com/600x600?text=Safety+Gloves+Pair", angle: "Full Pair" }, { url: "https://via.placeholder.com/600x600?text=Safety+Gloves+Single", angle: "Single Glove" }, { url: "https://via.placeholder.com/600x600?text=Safety+Gloves+Texture", angle: "Grip Texture" }, { url: "https://via.placeholder.com/600x600?text=Safety+Gloves+Detail", angle: "Material Detail" }] },
            { id: "SKU-9024", name: "Insulated Screwdriver Set (6pcs)", specification: "1000V rated, Cushioned grip", zone: "Singrauli Main Hub", brand: "Wiha", manufacturer: "Wiha Tools, Germany", material: "Chrome Vanadium with Insulation", weight: "450g", dimensions: { height: "280mm", width: "120mm", depth: "60mm" }, capacity: "1000V rated, 6-piece set", certifications: ["IS 2848", "CE 1010", "IEC 60900"], images: [{ url: "https://via.placeholder.com/600x600?text=Screwdriver+Set+Full", angle: "Complete Set" }, { url: "https://via.placeholder.com/600x600?text=Screwdriver+Set+Ind", angle: "Individual Tool" }, { url: "https://via.placeholder.com/600x600?text=Screwdriver+Grip", angle: "Grip Detail" }, { url: "https://via.placeholder.com/600x600?text=Screwdriver+Tips", angle: "Tip Variety" }] },
            { id: "SKU-9025", name: "Live Wire Detector Non-contact", specification: "12-1000V detection range, LED indicator", zone: "Korba Hub", brand: "Fluke", manufacturer: "Fluke Corporation, USA", material: "ABS Plastic with Metal Tip", weight: "120g", dimensions: { height: "180mm", width: "45mm", depth: "35mm" }, capacity: "12-1000V AC detection", wattage: "Battery powered", certifications: ["CE Mark", "UL Listed"], images: [{ url: "https://via.placeholder.com/600x600?text=Wire+Detector+Full", angle: "Full View" }, { url: "https://via.placeholder.com/600x600?text=Wire+Detector+Tip", angle: "Detection Tip" }, { url: "https://via.placeholder.com/600x600?text=Wire+Detector+LED", angle: "LED Indicator" }, { url: "https://via.placeholder.com/600x600?text=Wire+Detector+Btn", angle: "Control Button" }] }
          ]
        }
      ]
    },
    {
      id: "cat-4",
      name: "Chemicals & Lubricants",
      icon: "🧪",
      subcategories: [
        {
          id: "subcat-7",
          name: "Lubricants & Oils",
          products: [
            { id: "SKU-4412", name: "High-Pressure Hydraulic Lubrication Pump 10L", specification: "Max pressure 400 Bar, 3-Phase motor", zone: "NCL Spares Depot", brand: "Eaton", manufacturer: "Eaton Hydraulics, USA", material: "Cast Iron Pump Body", weight: "8.5kg", dimensions: { height: "350mm", width: "280mm", depth: "200mm" }, capacity: "10L reservoir", wattage: "0.75kW motor", certifications: ["ISO 4414", "CE Mark"], images: [{ url: "https://via.placeholder.com/600x600?text=Hydraulic+Pump+Full", angle: "Full Assembly" }, { url: "https://via.placeholder.com/600x600?text=Hydraulic+Pump+Top", angle: "Top View" }, { url: "https://via.placeholder.com/600x600?text=Hydraulic+Pump+Valve", angle: "Valve Detail" }, { url: "https://via.placeholder.com/600x600?text=Hydraulic+Motor", angle: "Motor View" }] },
            { id: "SKU-9026", name: "Machine Oil Premium Grade 20L", specification: "ISO VG 46, Anti-oxidant", zone: "Singrauli Main Hub", brand: "Shell", manufacturer: "Shell Global, Netherlands", material: "Mineral Oil Blend", weight: "20.5kg", dimensions: { height: "350mm", width: "280mm", depth: "200mm" }, capacity: "20 liters", certifications: ["ISO 6743", "ASTM D4378"], images: [{ url: "https://via.placeholder.com/600x600?text=Machine+Oil+Canister", angle: "Product Canister" }, { url: "https://via.placeholder.com/600x600?text=Machine+Oil+Label", angle: "Label Detail" }, { url: "https://via.placeholder.com/600x600?text=Machine+Oil+Pour", angle: "Pouring View" }, { url: "https://via.placeholder.com/600x600?text=Machine+Oil+Clarity", angle: "Oil Clarity" }] },
            { id: "SKU-9027", name: "Grease Multi-purpose NLGI 2 (400g)", specification: "EP additives, Water resistant", zone: "Korba Hub", brand: "Mobil", manufacturer: "Mobil Corporation, USA", material: "Lithium Complex Soap Grease", weight: "420g", dimensions: { height: "100mm", width: "80mm", depth: "80mm" }, capacity: "400g cartridge", certifications: ["NLGI Grade 2", "ISO 6743"], images: [{ url: "https://via.placeholder.com/600x600?text=Grease+Container", angle: "Product Container" }, { url: "https://via.placeholder.com/600x600?text=Grease+Texture", angle: "Grease Texture" }, { url: "https://via.placeholder.com/600x600?text=Grease+Dispense", angle: "Dispensing" }, { url: "https://via.placeholder.com/600x600?text=Grease+Application", angle: "Application View" }] }
          ]
        },
        {
          id: "subcat-8",
          name: "Cleaning & Maintenance",
          products: [
            { id: "SKU-8821", name: "Aerosol Anti-Rust Spray Premium (Case of 24)", specification: "Moisture displacement, 400ml cans", zone: "Singrauli Main Hub", brand: "WD-40", manufacturer: "WD-40 Company, USA", material: "Aerosol Spray Formulation", weight: "9.6kg (24 cans)", dimensions: { height: "200mm", width: "180mm", depth: "150mm" }, capacity: "400ml × 24 cans", certifications: ["ISO 6743", "ASTM D1003"], images: [{ url: "https://via.placeholder.com/600x600?text=Anti+Rust+Spray+Case", angle: "Case View" }, { url: "https://via.placeholder.com/600x600?text=Anti+Rust+Spray+Can", angle: "Single Can" }, { url: "https://via.placeholder.com/600x600?text=Anti+Rust+Nozzle", angle: "Spray Nozzle" }, { url: "https://via.placeholder.com/600x600?text=Anti+Rust+Label", angle: "Label Detail" }] },
            { id: "SKU-9028", name: "Degreaser Industrial Strength 5L", specification: "Biodegradable, Fast acting", zone: "NCL Spares Depot", brand: "Castrol", manufacturer: "Castrol Limited, UK", material: "Alkaline Degreasing Concentrate", weight: "5.2kg", dimensions: { height: "280mm", width: "200mm", depth: "150mm" }, capacity: "5 liters", certifications: ["ISO 6743", "REACH Compliant"], images: [{ url: "https://via.placeholder.com/600x600?text=Degreaser+Container", angle: "Container View" }, { url: "https://via.placeholder.com/600x600?text=Degreaser+Label", angle: "Label Detail" }, { url: "https://via.placeholder.com/600x600?text=Degreaser+Dilution", angle: "Dilution Chart" }, { url: "https://via.placeholder.com/600x600?text=Degreaser+Action", angle: "Cleaning Action" }] },
            { id: "SKU-9029", name: "Metal Cleaner Polish 500ml", specification: "Stainless steel safe, Streak-free", zone: "Korba Hub", brand: "3M", manufacturer: "3M Company, USA", material: "Abrasive Cleaning Compound", weight: "530ml", dimensions: { height: "180mm", width: "80mm", depth: "60mm" }, capacity: "500ml bottle", certifications: ["ISO 6743", "ASTM D2240"], images: [{ url: "https://via.placeholder.com/600x600?text=Metal+Polish+Bottle", angle: "Bottle View" }, { url: "https://via.placeholder.com/600x600?text=Metal+Polish+Polish", angle: "Polish Texture" }, { url: "https://via.placeholder.com/600x600?text=Metal+Polish+Before", angle: "Before Cleaning" }, { url: "https://via.placeholder.com/600x600?text=Metal+Polish+After", angle: "After Polishing" }] }
          ]
        }
      ]
    },
    {
      id: "cat-5",
      name: "Lifting & Rigging",
      icon: "🪝",
      subcategories: [
        {
          id: "subcat-9",
          name: "Slings & Webbing",
          products: [
            { id: "SKU-1094", name: "Heavy Duty Lifting Textile Webbing Sling 5T", specification: "Duplex factor 7:1, Polyester material", zone: "Korba Hub", brand: "Cortland", manufacturer: "Cortland Limited, USA", material: "High-Strength Polyester Webbing", weight: "1.8kg", dimensions: { height: "1.5m", width: "100mm", depth: "20mm" }, capacity: "5 tonne safe working load", certifications: ["ISO 7189", "EN 1492"], images: [{ url: "https://via.placeholder.com/600x600?text=Webbing+Sling+Full", angle: "Full Length" }, { url: "https://via.placeholder.com/600x600?text=Webbing+Sling+Weave", angle: "Weave Detail" }, { url: "https://via.placeholder.com/600x600?text=Webbing+Sling+Eye", angle: "Eye Loop" }, { url: "https://via.placeholder.com/600x600?text=Webbing+Stitch", angle: "Stitching Detail" }] },
            { id: "SKU-9030", name: "Chain Sling Grade 100 5T", specification: "Alloy steel, Calibrated links", zone: "Singrauli Main Hub", brand: "Pewag", manufacturer: "Pewag Group, Austria", material: "Alloy Steel Grade 100", weight: "2.5kg", dimensions: { height: "1.2m", width: "50mm", depth: "40mm" }, capacity: "5 tonne safe working load", certifications: ["EN 818", "ISO 3077"], images: [{ url: "https://via.placeholder.com/600x600?text=Chain+Sling+Full", angle: "Full Chain" }, { url: "https://via.placeholder.com/600x600?text=Chain+Sling+Link", angle: "Link Detail" }, { url: "https://via.placeholder.com/600x600?text=Chain+Sling+Hook", angle: "Hook Assembly" }, { url: "https://via.placeholder.com/600x600?text=Chain+Sling+Marks", angle: "Grade Markings" }] },
            { id: "SKU-9031", name: "Wire Rope Sling 6x19 8mm 10T", specification: "IWRC core, Certified safe working load", zone: "NCL Spares Depot", brand: "Bridon", manufacturer: "Bridon International, UK", material: "Steel Wire Rope 6×19 IWRC", weight: "3.2kg", dimensions: { height: "1.5m", width: "8mm", depth: "8mm" }, capacity: "10 tonne safe working load", certifications: ["ISO 2061", "EN 10017"], images: [{ url: "https://via.placeholder.com/600x600?text=Wire+Rope+Full", angle: "Full Length" }, { url: "https://via.placeholder.com/600x600?text=Wire+Rope+Strands", angle: "Strand Detail" }, { url: "https://via.placeholder.com/600x600?text=Wire+Rope+Term", angle: "Termination" }, { url: "https://via.placeholder.com/600x600?text=Wire+Rope+Close", angle: "Close-up View" }] }
          ]
        },
        {
          id: "subcat-10",
          name: "Hoists & Pulleys",
          products: [
            { id: "SKU-9032", name: "Manual Chain Block 2T", specification: "Load chain Grade 80, Swivel hook", zone: "Korba Hub", brand: "Kito", manufacturer: "Kito Corporation, Japan", material: "Ductile Iron Body", weight: "4.5kg", dimensions: { height: "180mm", width: "150mm", depth: "120mm" }, capacity: "2 tonne lift capacity", certifications: ["ISO 4488", "EN 14491"], images: [{ url: "https://via.placeholder.com/600x600?text=Chain+Block+Full", angle: "Full Unit" }, { url: "https://via.placeholder.com/600x600?text=Chain+Block+Hook", angle: "Hook Detail" }, { url: "https://via.placeholder.com/600x600?text=Chain+Block+Chain", angle: "Load Chain" }, { url: "https://via.placeholder.com/600x600?text=Chain+Block+Handle", angle: "Handle View" }] },
            { id: "SKU-9033", name: "Pulley Steel 4-inch Fixed Eye", specification: "Ball bearing, Powder coated", zone: "Singrauli Main Hub", brand: "Harrington", manufacturer: "Harrington Hoists, USA", material: "Steel Body with Ball Bearing", weight: "2.8kg", dimensions: { height: "120mm", width: "100mm", depth: "80mm" }, capacity: "2 tonne working load", certifications: ["ASME B29.1", "EN 14491"], images: [{ url: "https://via.placeholder.com/600x600?text=Pulley+Front", angle: "Front View" }, { url: "https://via.placeholder.com/600x600?text=Pulley+Side", angle: "Side Profile" }, { url: "https://via.placeholder.com/600x600?text=Pulley+Eye", angle: "Eye Loop" }, { url: "https://via.placeholder.com/600x600?text=Pulley+Bearing", angle: "Ball Bearing" }] },
            { id: "SKU-9034", name: "Come-Along Tool 2T Mechanical", specification: "Dual pawl, Ratchet operation", zone: "NCL Spares Depot", brand: "Coffing", manufacturer: "Coffing Hoists, USA", material: "Cast Iron with Steel Pawls", weight: "3.5kg", dimensions: { height: "250mm", width: "120mm", depth: "100mm" }, capacity: "2 tonne pull capacity", certifications: ["ASME B30.20", "EN 14491"], images: [{ url: "https://via.placeholder.com/600x600?text=Come+Along+Full", angle: "Full Assembly" }, { url: "https://via.placeholder.com/600x600?text=Come+Along+Lever", angle: "Lever Detail" }, { url: "https://via.placeholder.com/600x600?text=Come+Along+Pawl", angle: "Pawl Mechanism" }, { url: "https://via.placeholder.com/600x600?text=Come+Along+Hook", angle: "Hook Assembly" }] }
          ]
        }
      ]
    }
  ];

  // Find product
  let product = null;
  let categoryName = "";
  let subcategoryName = "";

  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      const foundProduct = subcategory.products.find(p => p.id === sku);
      if (foundProduct) {
        product = foundProduct;
        categoryName = category.name;
        subcategoryName = subcategory.name;
        break;
      }
    }
    if (product) break;
  }

  const handleQtyChange = (productId, value) => {
    const qty = parseInt(value) || 1;
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const addToRfqCart = (product) => {
    const selectedQty = quantities[product.id] || 1;
    setRfqCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: selectedQty } : item
        );
      }
      return [...prevCart, { ...product, quantity: selectedQty }];
    });
    alert(`Successfully added ${selectedQty} units of ${product.id} to your Quote Bucket.`);
  };

  const removeFromCart = (id) => {
    setRfqCart(prev => prev.filter(item => item.id !== id));
  };

  const handleQuoteSubmission = (e) => {
    e.preventDefault();
    const quotePayload = { client: formData, requestedItems: rfqCart };
    console.log("Dispatched RFQ Schema Matrix Payload:", quotePayload);
    alert(`Thank you, ${formData.fullName}! Your quotation request for ${rfqCart.length} item lines has been compiled. A detailed digital quotation slip is being dispatched to ${formData.email}. Our Singrauli executive will connect on ${formData.mobile}.`);
    setRfqCart([]);
    setShowFormModal(false);
    setFormData({ fullName: "", email: "", mobile: "", companyName: "", remarks: "" });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm p-6">
          <Link href="/products" className="text-blue-600 hover:text-blue-900 font-semibold text-sm">← Back to Products</Link>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center h-96">
          <div className="text-6xl mb-4 opacity-30">❌</div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-slate-600 font-medium mb-6">SKU: {sku}</p>
          <Link href="/products">
            <button className="bg-blue-950 text-white font-black text-xs px-6 py-3 rounded-lg hover:bg-blue-900">Return to Catalog</button>
          </Link>
        </div>
      </div>
    );
  }

  const currentInputQty = quantities[product.id] || 1;
  const isAlreadyInCart = rfqCart.some(item => item.id === product.id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/products" className="text-blue-600 hover:text-blue-900 font-semibold text-sm">← Back to Products</Link>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">Product Details</h1>
          </div>
          <button 
            onClick={() => { if(rfqCart.length === 0) { alert("Your Quote bucket is currently empty. Please add items below."); return; } setShowFormModal(true); }}
            className="bg-blue-950 text-white font-bold text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow-lg flex items-center space-x-3 hover:bg-blue-900 transition-all transform active:scale-95 whitespace-nowrap"
          >
            <span>📋</span>
            <span>Quote Bucket</span>
            <span className="bg-lime-400 text-slate-950 rounded-md px-1.5 py-0.5 font-black text-[10px] animate-pulse">{rfqCart.length} Lines</span>
          </button>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto text-xs font-medium text-slate-600">
          <Link href="/products" className="text-blue-600 hover:text-blue-900">Products</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span>{categoryName}</span>
          <span className="mx-2 text-slate-400">/</span>
          <span>{subcategoryName}</span>
          <span className="mx-2 text-slate-400">/</span>
          <span className="font-black text-slate-900">{product.id}</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT - IMAGE GALLERY */}
          <div className="md:col-span-2">
            {/* MAIN IMAGE */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-4">
              <div className="relative bg-slate-100 rounded-xl overflow-hidden mb-4" style={{ aspectRatio: "1" }}>
                <img src={product.images[mainImageIndex]?.url} alt="Product" className="w-full h-full object-cover" />
                
                {/* Image Navigation Arrows */}
                <button
                  onClick={() => setMainImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  ◀
                </button>
                <button
                  onClick={() => setMainImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  ▶
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white px-3 py-1 rounded text-xs font-semibold">
                  {mainImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Image Title */}
              <p className="text-sm font-semibold text-slate-700 text-center mb-4">
                {product.images[mainImageIndex]?.angle}
              </p>

              {/* THUMBNAIL GALLERY */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      mainImageIndex === idx ? "border-blue-950 ring-2 ring-blue-950" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img src={img.url} alt={img.angle} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - QUICK ADD SECTION */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 sticky top-32 space-y-4">
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product SKU</span>
                <p className="text-blue-600 font-black text-lg">{product.id}</p>
              </div>

              <div>
                <p className="text-xl font-black text-slate-900">{product.name}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Brand</span>
                  <p className="text-slate-700 font-semibold">{product.brand}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Manufacturer</span>
                  <p className="text-slate-700 font-semibold text-sm">{product.manufacturer}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-500 uppercase mb-2 block">Unit Value</span>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100 inline-block">Price On Request</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <input 
                  type="number" 
                  min="1"
                  value={currentInputQty}
                  onChange={(e) => handleQtyChange(product.id, e.target.value)}
                  className="w-20 text-center font-bold text-xs border border-slate-200 rounded-lg py-2 focus:outline-none focus:border-blue-950 bg-slate-50"
                />
                <button 
                  onClick={() => addToRfqCart(product)}
                  className={`flex-1 text-[10px] font-black uppercase tracking-wider py-2.5 rounded-lg transition-colors border ${
                    isAlreadyInCart 
                      ? "bg-lime-500 text-slate-900 border-lime-500" 
                      : "bg-slate-900 text-white hover:bg-slate-800 border-slate-900"
                  }`}
                >
                  {isAlreadyInCart ? "🔄 Update" : "➕ Add"}
                </button>
              </div>

              {rfqCart.length > 0 && (
                <button 
                  onClick={() => setShowFormModal(true)}
                  className="w-full bg-blue-950 text-white font-black text-xs py-3 rounded-lg uppercase tracking-wider hover:bg-blue-900 transition-colors"
                >
                  🚀 Request Quote
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DETAILED SPECIFICATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* LEFT - BASIC INFO */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Material / Made Of</span>
                <p className="text-slate-700 font-semibold">{product.material}</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Weight</span>
                <p className="text-slate-700 font-semibold">{product.weight}</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Warehouse Location</span>
                <p className="text-slate-700 font-semibold">📍 {product.zone}</p>
              </div>
            </div>
          </div>

          {/* RIGHT - DIMENSIONS & CAPACITY */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide">Dimensions & Capacity</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Height</span>
                  <p className="text-slate-700 font-semibold text-sm">{product.dimensions.height}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Width</span>
                  <p className="text-slate-700 font-semibold text-sm">{product.dimensions.width}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Depth</span>
                  <p className="text-slate-700 font-semibold text-sm">{product.dimensions.depth}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Capacity / Load Rating</span>
                <p className="text-slate-700 font-semibold">{product.capacity}</p>
              </div>
              {product.wattage && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">⚡ Power Rating</span>
                  <p className="text-slate-700 font-semibold">{product.wattage}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        {product.certifications && product.certifications.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 mt-6">
            <h2 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wide">✓ Certifications & Standards</h2>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert, idx) => (
                <span key={idx} className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-semibold text-sm border border-emerald-300">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QUOTE FORM MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-blue-950 text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider">Compile Procurement RFQ Slip</h2>
                <p className="text-[10px] text-blue-200/70 font-medium">Please supply accurate communication coordinates below.</p>
              </div>
              <button onClick={() => setShowFormModal(false)} className="text-white/60 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Items Bundled Inside Order Line ({rfqCart.length})</p>
                <div className="divide-y divide-slate-200/60 max-h-36 overflow-y-auto pr-1">
                  {rfqCart.map((item) => (
                    <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                      <div className="truncate max-w-sm">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                      </div>
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="bg-blue-50 text-blue-900 font-black px-2 py-0.5 rounded text-[10px]">QTY: {item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-rose-500 font-bold text-xs">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleQuoteSubmission} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" required value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Full Name"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                  />
                  <input 
                    type="text" required value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="Company Name"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email Address"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                  />
                  <input 
                    type="tel" required value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="Mobile Number"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                  />
                </div>
                <textarea 
                  rows="3" value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  placeholder="Special Requirements (Optional)"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-950 font-medium"
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-950 text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md hover:bg-blue-900 transition-colors"
                >
                  🚀 Dispatch Quotation Slip
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 9px; }
      `}</style>

    </div>
  );
}
