export const categories = [
  {
    id: "cat-1",
    name: "Hand Tools",
    icon: "🔧", // select icon from react-icons
    image: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=500",
    subcategories: [
      {
        id: "subcat-1",
        name: "Wrenches",
        image: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=500",
        productCount: 3,
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
              { title: "", url: "https://images.unsplash.com/photo-1578926078328-123456789?w=500&h=500", angle: "Front View", alternateText: "", },
              { title: "", url: "https://via.placeholder.com/500x500?text=Wrench+Side+View", angle: "Side View", alternateText: "", },
              { title: "", url: "https://via.placeholder.com/500x500?text=Wrench+Top+View", angle: "Top View", alternateText: "", },
              { title: "", url: "https://via.placeholder.com/500x500?text=Wrench+Detail", angle: "Grip Detail", alternateText: "", }
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
              { url: "https://via.placeholder.com/500x500?text=Wrench+Set+View", angle: "Full Set View" },
              { url: "https://via.placeholder.com/500x500?text=Wrench+Set+Sizes", angle: "Size Range" },
              { url: "https://via.placeholder.com/500x500?text=Wrench+Set+Close", angle: "Close-up" },
              { url: "https://via.placeholder.com/500x500?text=Wrench+Set+Detail", angle: "Polish Detail" }
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
              { url: "https://via.placeholder.com/500x500?text=Pipe+Wrench+Front", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Pipe+Wrench+Jaws", angle: "Jaw Detail" },
              { url: "https://via.placeholder.com/500x500?text=Pipe+Wrench+Open", angle: "Open Position" },
              { url: "https://via.placeholder.com/500x500?text=Pipe+Wrench+Scale", angle: "Size Reference" }
            ]
          }
        ]
      },
      {
        id: "subcat-2",
        name: "Sockets & Ratchets",
        productCount: 3,
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
              { url: "https://via.placeholder.com/500x500?text=Socket+Set+Complete", angle: "Complete Set" },
              { url: "https://via.placeholder.com/500x500?text=Socket+Set+Sizes", angle: "Size Variety" },
              { url: "https://via.placeholder.com/500x500?text=Socket+Set+Case", angle: "Storage Case" },
              { url: "https://via.placeholder.com/500x500?text=Socket+Individual", angle: "Individual Socket" }
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
              { url: "https://via.placeholder.com/500x500?text=Torque+Wrench+Full", angle: "Full Length" },
              { url: "https://via.placeholder.com/500x500?text=Torque+Wrench+Head", angle: "Head Detail" },
              { url: "https://via.placeholder.com/500x500?text=Torque+Wrench+Scale", angle: "Scale View" },
              { url: "https://via.placeholder.com/500x500?text=Torque+Wrench+Handle", angle: "Handle Detail" }
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
              { url: "https://via.placeholder.com/500x500?text=Ratchet+Complete", angle: "Full View" },
              { url: "https://via.placeholder.com/500x500?text=Ratchet+Head", angle: "Head View" },
              { url: "https://via.placeholder.com/500x500?text=Ratchet+Release", angle: "Quick Release" },
              { url: "https://via.placeholder.com/500x500?text=Ratchet+Finish", angle: "Polish Detail" }
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
        productCount: 3,
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
              { url: "https://via.placeholder.com/500x500?text=Drill+Front+View", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Drill+Side+View", angle: "Side View" },
              { url: "https://via.placeholder.com/500x500?text=Drill+Chuck+Detail", angle: "Chuck Detail" },
              { url: "https://via.placeholder.com/500x500?text=Drill+In+Use", angle: "Action View" }
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
              { url: "https://via.placeholder.com/500x500?text=Cordless+Drill+Front", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Cordless+Drill+Battery", angle: "Battery View" },
              { url: "https://via.placeholder.com/500x500?text=Cordless+Drill+Chuck", angle: "Chuck Close-up" },
              { url: "https://via.placeholder.com/500x500?text=Cordless+Drill+Controls", angle: "Control Panel" }
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
              { url: "https://via.placeholder.com/500x500?text=Drill+Bits+Set+Full", angle: "Complete Set" },
              { url: "https://via.placeholder.com/500x500?text=Drill+Bits+Organized", angle: "Organized View" },
              { url: "https://via.placeholder.com/500x500?text=Drill+Bits+Individual", angle: "Individual Bit" },
              { url: "https://via.placeholder.com/500x500?text=Drill+Bits+Coating", angle: "Titanium Coating" }
            ]
          }
        ]
      },
      {
        id: "subcat-4",
        name: "Grinders & Saws",
        productCount: 3,
        products: [
          {
            id: "SKU-9010",
            name: "Angle Grinder 4.5-inch 950W",
            specification: "Guard included, Soft start",
            zone: "Singrauli Main Hub",
            brand: "Makita",
            manufacturer: "Makita Corporation, Japan",
            material: "Metal Body with Soft Grip",
            weight: "1.8kg",
            dimensions: { height: "200mm", width: "140mm", depth: "120mm" },
            capacity: "115mm disc (4.5-inch)",
            wattage: "950W",
            certifications: ["CE Mark", "IS 5194", "GS Certified"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Angle+Grinder+Front", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Angle+Grinder+Guard", angle: "Guard Detail" },
              { url: "https://via.placeholder.com/500x500?text=Angle+Grinder+Side", angle: "Side View" },
              { url: "https://via.placeholder.com/500x500?text=Angle+Grinder+Disc", angle: "Disc Area" }
            ]
          },
          {
            id: "SKU-9011",
            name: "Circular Saw 7.25-inch 1500W",
            specification: "Laser guide, Dust blower",
            zone: "NCL Spares Depot",
            brand: "Festool",
            manufacturer: "Festool GmbH, Germany",
            material: "Magnesium Alloy Housing",
            weight: "2.4kg",
            dimensions: { height: "220mm", width: "180mm", depth: "150mm" },
            capacity: "185mm blade (7.25-inch)",
            wattage: "1500W",
            certifications: ["CE Mark", "GS Certified"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Circular+Saw+Front", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Circular+Saw+Blade", angle: "Blade View" },
              { url: "https://via.placeholder.com/500x500?text=Circular+Saw+Laser", angle: "Laser Guide" },
              { url: "https://via.placeholder.com/500x500?text=Circular+Saw+Handle", angle: "Handle Detail" }
            ]
          },
          {
            id: "SKU-9012",
            name: "Grinding Disc 4.5x6mm (10pcs)",
            specification: "For metal, Stone & Steel",
            zone: "Korba Hub",
            brand: "3M",
            manufacturer: "3M Abrasive Systems, USA",
            material: "Aluminum Oxide Abrasive",
            weight: "200g",
            dimensions: { height: "115mm", width: "115mm", depth: "6mm" },
            capacity: "115mm × 6mm discs, 10 pieces",
            certifications: ["ISO 12413", "ANSI B24.1"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Grinding+Disc+Pack", angle: "Pack View" },
              { url: "https://via.placeholder.com/500x500?text=Grinding+Disc+Stack", angle: "Stacked View" },
              { url: "https://via.placeholder.com/500x500?text=Grinding+Disc+Surface", angle: "Surface Detail" },
              { url: "https://via.placeholder.com/500x500?text=Grinding+Disc+Edge", angle: "Edge View" }
            ]
          }
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
        productCount: 3,
        products: [
          {
            id: "SKU-921",
            name: "Industrial Safety Leather Boots (Grade A)",
            specification: "Steel toe, Anti-slip sole",
            zone: "Singrauli Main Hub",
            brand: "Timberland PRO",
            manufacturer: "Timberland Company, USA",
            material: "Premium Leather with Steel Toe Cap",
            weight: "650g (pair)",
            dimensions: { height: "200mm", width: "100mm", depth: "80mm" },
            capacity: "Steel toe protection up to 200J",
            certifications: ["IS 1035", "CE 344:2004"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Safety+Boots+Pair", angle: "Full Pair" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Boots+Side", angle: "Side View" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Boots+Toe", angle: "Steel Toe Detail" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Boots+Sole", angle: "Anti-slip Sole" }
            ]
          },
          {
            id: "SKU-922",
            name: "Safety Helmet ABS Yellow",
            specification: "Impact resistant, Adjustable headband",
            zone: "NCL Spares Depot",
            brand: "Karam",
            manufacturer: "Karam Industries, India",
            material: "ABS Plastic Shell with EPS Liner",
            weight: "320g",
            dimensions: { height: "220mm", width: "260mm", depth: "200mm" },
            capacity: "Impact protection up to 200 Joules",
            certifications: ["IS 2925", "CE 397"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Safety+Helmet+Front", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Helmet+Side", angle: "Side View" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Helmet+Interior", angle: "Interior Padding" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Helmet+Headband", angle: "Adjustable Band" }
            ]
          },
          {
            id: "SKU-923",
            name: "Safety Goggles Anti-fog Clear Lens",
            specification: "Polycarbonate, UV protection",
            zone: "Korba Hub",
            brand: "Uvex",
            manufacturer: "Uvex Group, Germany",
            material: "Polycarbonate Lens with Soft Frame",
            weight: "85g",
            dimensions: { height: "80mm", width: "160mm", depth: "70mm" },
            capacity: "UV 400 protection",
            certifications: ["IS 1835", "CE 166"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Safety+Goggles+Front", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Goggles+Lens", angle: "Lens Detail" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Goggles+Side", angle: "Side Profile" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Goggles+Coated", angle: "Anti-fog Coating" }
            ]
          }
        ]
      },
      {
        id: "subcat-6",
        name: "Electrical Safety",
        productCount: 3,
        products: [
          {
            id: "SKU-3112",
            name: "Insulated Electrical Rubber Gloves (Class 3)",
            specification: "Working voltage 26,500V AC, Proof tested",
            zone: "NCL Spares Depot",
            brand: "Ansell",
            manufacturer: "Ansell Limited, Australia",
            material: "Natural Rubber with Canvas Backing",
            weight: "250g (pair)",
            dimensions: { height: "350mm", width: "150mm", depth: "80mm" },
            capacity: "Class 3 - 26,500V AC",
            certifications: ["IS 6050", "IEC 60903", "EN 60903"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Safety+Gloves+Pair", angle: "Full Pair" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Gloves+Single", angle: "Single Glove" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Gloves+Texture", angle: "Grip Texture" },
              { url: "https://via.placeholder.com/500x500?text=Safety+Gloves+Detail", angle: "Material Detail" }
            ]
          },
          {
            id: "SKU-924",
            name: "Insulated Screwdriver Set (6pcs)",
            specification: "1000V rated, Cushioned grip",
            zone: "Singrauli Main Hub",
            brand: "Wiha",
            manufacturer: "Wiha Tools, Germany",
            material: "Chrome Vanadium with Insulation",
            weight: "450g",
            dimensions: { height: "280mm", width: "120mm", depth: "60mm" },
            capacity: "1000V rated, 6-piece set",
            certifications: ["IS 2848", "CE 1010", "IEC 60900"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Screwdriver+Set+Full", angle: "Complete Set" },
              { url: "https://via.placeholder.com/500x500?text=Screwdriver+Set+Individual", angle: "Individual Tool" },
              { url: "https://via.placeholder.com/500x500?text=Screwdriver+Set+Grip", angle: "Grip Detail" },
              { url: "https://via.placeholder.com/500x500?text=Screwdriver+Set+Tips", angle: "Tip Variety" }
            ]
          },
          {
            id: "SKU-925",
            name: "Live Wire Detector Non-contact",
            specification: "12-1000V detection range, LED indicator",
            zone: "Korba Hub",
            brand: "Fluke",
            manufacturer: "Fluke Corporation, USA",
            material: "ABS Plastic with Metal Tip",
            weight: "120g",
            dimensions: { height: "180mm", width: "45mm", depth: "35mm" },
            capacity: "12-1000V AC detection",
            wattage: "Battery powered",
            certifications: ["CE Mark", "UL Listed"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Wire+Detector+Full", angle: "Full View" },
              { url: "https://via.placeholder.com/500x500?text=Wire+Detector+Tip", angle: "Detection Tip" },
              { url: "https://via.placeholder.com/500x500?text=Wire+Detector+LED", angle: "LED Indicator" },
              { url: "https://via.placeholder.com/500x500?text=Wire+Detector+Controls", angle: "Control Button" }
            ]
          }
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
        productCount: 3,
        products: [
          {
            id: "SKU-4412",
            name: "High-Pressure Hydraulic Lubrication Pump 10L",
            specification: "Max pressure 400 Bar, 3-Phase motor",
            zone: "NCL Spares Depot",
            brand: "Eaton",
            manufacturer: "Eaton Hydraulics, USA",
            material: "Cast Iron Pump Body",
            weight: "8.5kg",
            dimensions: { height: "350mm", width: "280mm", depth: "200mm" },
            capacity: "10L reservoir",
            wattage: "0.75kW motor",
            certifications: ["ISO 4414", "CE Mark"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Hydraulic+Pump+Full", angle: "Full Assembly" },
              { url: "https://via.placeholder.com/500x500?text=Hydraulic+Pump+Top", angle: "Top View" },
              { url: "https://via.placeholder.com/500x500?text=Hydraulic+Pump+Valve", angle: "Valve Detail" },
              { url: "https://via.placeholder.com/500x500?text=Hydraulic+Pump+Motor", angle: "Motor View" }
            ]
          },
          {
            id: "SKU-926",
            name: "Machine Oil Premium Grade 20L",
            specification: "ISO VG 46, Anti-oxidant",
            zone: "Singrauli Main Hub",
            brand: "Shell",
            manufacturer: "Shell Global, Netherlands",
            material: "Mineral Oil Blend",
            weight: "20.5kg",
            dimensions: { height: "350mm", width: "280mm", depth: "200mm" },
            capacity: "20 liters",
            certifications: ["ISO 6743", "ASTM D4378"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Machine+Oil+Canister", angle: "Product Canister" },
              { url: "https://via.placeholder.com/500x500?text=Machine+Oil+Label", angle: "Label Detail" },
              { url: "https://via.placeholder.com/500x500?text=Machine+Oil+Pour", angle: "Pouring View" },
              { url: "https://via.placeholder.com/500x500?text=Machine+Oil+Clarity", angle: "Oil Clarity" }
            ]
          },
          {
            id: "SKU-927",
            name: "Grease Multi-purpose NLGI 2 (400g)",
            specification: "EP additives, Water resistant",
            zone: "Korba Hub",
            brand: "Mobil",
            manufacturer: "Mobil Corporation, USA",
            material: "Lithium Complex Soap Grease",
            weight: "420g",
            dimensions: { height: "100mm", width: "80mm", depth: "80mm" },
            capacity: "400g cartridge",
            certifications: ["NLGI Grade 2", "ISO 6743"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Grease+Container", angle: "Product Container" },
              { url: "https://via.placeholder.com/500x500?text=Grease+Texture", angle: "Grease Texture" },
              { url: "https://via.placeholder.com/500x500?text=Grease+Dispense", angle: "Dispensing" },
              { url: "https://via.placeholder.com/500x500?text=Grease+Application", angle: "Application View" }
            ]
          }
        ]
      },
      {
        id: "subcat-8",
        name: "Cleaning & Maintenance",
        productCount: 3,
        products: [
          {
            id: "SKU-8821",
            name: "Aerosol Anti-Rust Spray Premium (Case of 24)",
            specification: "Moisture displacement, 400ml cans",
            zone: "Singrauli Main Hub",
            brand: "WD-40",
            manufacturer: "WD-40 Company, USA",
            material: "Aerosol Spray Formulation",
            weight: "9.6kg (24 cans)",
            dimensions: { height: "200mm", width: "180mm", depth: "150mm" },
            capacity: "400ml × 24 cans",
            certifications: ["ISO 6743", "ASTM D1003"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Anti+Rust+Spray+Case", angle: "Case View" },
              { url: "https://via.placeholder.com/500x500?text=Anti+Rust+Spray+Can", angle: "Single Can" },
              { url: "https://via.placeholder.com/500x500?text=Anti+Rust+Spray+Nozzle", angle: "Spray Nozzle" },
              { url: "https://via.placeholder.com/500x500?text=Anti+Rust+Spray+Label", angle: "Label Detail" }
            ]
          },
          {
            id: "SKU-928",
            name: "Degreaser Industrial Strength 5L",
            specification: "Biodegradable, Fast acting",
            zone: "NCL Spares Depot",
            brand: "Castrol",
            manufacturer: "Castrol Limited, UK",
            material: "Alkaline Degreasing Concentrate",
            weight: "5.2kg",
            dimensions: { height: "280mm", width: "200mm", depth: "150mm" },
            capacity: "5 liters",
            certifications: ["ISO 6743", "REACH Compliant"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Degreaser+Container", angle: "Container View" },
              { url: "https://via.placeholder.com/500x500?text=Degreaser+Label", angle: "Label Detail" },
              { url: "https://via.placeholder.com/500x500?text=Degreaser+Dilution", angle: "Dilution Chart" },
              { url: "https://via.placeholder.com/500x500?text=Degreaser+Action", angle: "Cleaning Action" }
            ]
          },
          {
            id: "SKU-929",
            name: "Metal Cleaner Polish 500ml",
            specification: "Stainless steel safe, Streak-free",
            zone: "Korba Hub",
            brand: "3M",
            manufacturer: "3M Company, USA",
            material: "Abrasive Cleaning Compound",
            weight: "530ml",
            dimensions: { height: "180mm", width: "80mm", depth: "60mm" },
            capacity: "500ml bottle",
            certifications: ["ISO 6743", "ASTM D2240"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Metal+Polish+Bottle", angle: "Bottle View" },
              { url: "https://via.placeholder.com/500x500?text=Metal+Polish+Polish", angle: "Polish Texture" },
              { url: "https://via.placeholder.com/500x500?text=Metal+Polish+Before", angle: "Before Cleaning" },
              { url: "https://via.placeholder.com/500x500?text=Metal+Polish+After", angle: "After Polishing" }
            ]
          }
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
        productCount: 3,
        products: [
          {
            id: "SKU-1094",
            name: "Heavy Duty Lifting Textile Webbing Sling 5T",
            specification: "Duplex factor 7:1, Polyester material",
            zone: "Korba Hub",
            brand: "Cortland",
            manufacturer: "Cortland Limited, USA",
            material: "High-Strength Polyester Webbing",
            weight: "1.8kg",
            dimensions: { height: "1.5m", width: "100mm", depth: "20mm" },
            capacity: "5 tonne safe working load",
            certifications: ["ISO 7189", "EN 1492"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Webbing+Sling+Full", angle: "Full Length" },
              { url: "https://via.placeholder.com/500x500?text=Webbing+Sling+Weave", angle: "Weave Detail" },
              { url: "https://via.placeholder.com/500x500?text=Webbing+Sling+Eye", angle: "Eye Loop" },
              { url: "https://via.placeholder.com/500x500?text=Webbing+Sling+Stitching", angle: "Stitching Detail" }
            ]
          },
          {
            id: "SKU-930",
            name: "Chain Sling Grade 100 5T",
            specification: "Alloy steel, Calibrated links",
            zone: "Singrauli Main Hub",
            brand: "Pewag",
            manufacturer: "Pewag Group, Austria",
            material: "Alloy Steel Grade 100",
            weight: "2.5kg",
            dimensions: { height: "1.2m", width: "50mm", depth: "40mm" },
            capacity: "5 tonne safe working load",
            certifications: ["EN 818", "ISO 3077"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Chain+Sling+Full", angle: "Full Chain" },
              { url: "https://via.placeholder.com/500x500?text=Chain+Sling+Link", angle: "Link Detail" },
              { url: "https://via.placeholder.com/500x500?text=Chain+Sling+Hook", angle: "Hook Assembly" },
              { url: "https://via.placeholder.com/500x500?text=Chain+Sling+Marks", angle: "Grade Markings" }
            ]
          },
          {
            id: "SKU-931",
            name: "Wire Rope Sling 6x19 8mm 10T",
            specification: "IWRC core, Certified safe working load",
            zone: "NCL Spares Depot",
            brand: "Bridon",
            manufacturer: "Bridon International, UK",
            material: "Steel Wire Rope 6×19 IWRC",
            weight: "3.2kg",
            dimensions: { height: "1.5m", width: "8mm", depth: "8mm" },
            capacity: "10 tonne safe working load",
            certifications: ["ISO 2061", "EN 10017"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Wire+Rope+Full", angle: "Full Length" },
              { url: "https://via.placeholder.com/500x500?text=Wire+Rope+Strands", angle: "Strand Detail" },
              { url: "https://via.placeholder.com/500x500?text=Wire+Rope+Termination", angle: "Termination" },
              { url: "https://via.placeholder.com/500x500?text=Wire+Rope+Close", angle: "Close-up View" }
            ]
          }
        ]
      },
      {
        id: "subcat-10",
        name: "Hoists & Pulleys",
        productCount: 3,
        products: [
          {
            id: "SKU-932",
            name: "Manual Chain Block 2T",
            specification: "Load chain Grade 80, Swivel hook",
            zone: "Korba Hub",
            brand: "Kito",
            manufacturer: "Kito Corporation, Japan",
            material: "Ductile Iron Body",
            weight: "4.5kg",
            dimensions: { height: "180mm", width: "150mm", depth: "120mm" },
            capacity: "2 tonne lift capacity",
            certifications: ["ISO 4488", "EN 14491"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Chain+Block+Full", angle: "Full Unit" },
              { url: "https://via.placeholder.com/500x500?text=Chain+Block+Hook", angle: "Hook Detail" },
              { url: "https://via.placeholder.com/500x500?text=Chain+Block+Chain", angle: "Load Chain" },
              { url: "https://via.placeholder.com/500x500?text=Chain+Block+Handle", angle: "Handle View" }
            ]
          },
          {
            id: "SKU-933",
            name: "Pulley Steel 4-inch Fixed Eye",
            specification: "Ball bearing, Powder coated",
            zone: "Singrauli Main Hub",
            brand: "Harrington",
            manufacturer: "Harrington Hoists, USA",
            material: "Steel Body with Ball Bearing",
            weight: "2.8kg",
            dimensions: { height: "120mm", width: "100mm", depth: "80mm" },
            capacity: "2 tonne working load",
            certifications: ["ASME B29.1", "EN 14491"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Pulley+Front", angle: "Front View" },
              { url: "https://via.placeholder.com/500x500?text=Pulley+Side", angle: "Side Profile" },
              { url: "https://via.placeholder.com/500x500?text=Pulley+Eye", angle: "Eye Loop" },
              { url: "https://via.placeholder.com/500x500?text=Pulley+Bearing", angle: "Ball Bearing" }
            ]
          },
          {
            id: "SKU-934",
            name: "Come-Along Tool 2T Mechanical",
            specification: "Dual pawl, Ratchet operation",
            zone: "NCL Spares Depot",
            brand: "Coffing",
            manufacturer: "Coffing Hoists, USA",
            material: "Cast Iron with Steel Pawls",
            weight: "3.5kg",
            dimensions: { height: "250mm", width: "120mm", depth: "100mm" },
            capacity: "2 tonne pull capacity",
            certifications: ["ASME B30.20", "EN 14491"],
            images: [
              { url: "https://via.placeholder.com/500x500?text=Come+Along+Full", angle: "Full Assembly" },
              { url: "https://via.placeholder.com/500x500?text=Come+Along+Lever", angle: "Lever Detail" },
              { url: "https://via.placeholder.com/500x500?text=Come+Along+Pawl", angle: "Pawl Mechanism" },
              { url: "https://via.placeholder.com/500x500?text=Come+Along+Hook", angle: "Hook Assembly" }
            ]
          }
        ]
      }
    ]
  }
];

// ----------------------------------------------------------------------------
// HELPERS — reusable across pages (catalog grid, product detail page, etc.)
// ----------------------------------------------------------------------------

// Flat list of all products with parent category/subcategory references attached
export const getAllFlattenedProducts = () => {
  const output = [];
  categories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.products.forEach((prod) => {
        output.push({
          ...prod,
          parentCatId: cat.id,
          subCatId: sub.id
        });
      });
    });
  });
  return output;
};

// Find a single product by its SKU id — handy for the /products/[id] detail page
export const getProductById = (productId) => {
  return getAllFlattenedProducts().find((p) => p.id === productId) || null;
};

export default categories;