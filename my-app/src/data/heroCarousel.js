export const dummySlides = [
  {
    id: "clx1234567890abcdefghijklmn", // CUID Format example
    mediaType: "IMAGE", // IMAGE or VIDEO
    mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
    videoLoop: false,
    videoNextOnEnd: false,
    duration: 5, // 5 seconds for this image
    layoutType: "LEFT", // LEFT, CENTER, RIGHT
    title: "Premium Industrial Bearings",
    subtitle: "Authorized Distributors & Suppliers",
    description: "Providing high-grade mechanical spares, heavy-duty bearings, and power transmission solutions for over 20+ years.",
    ctaText: "Explore Products",
    ctaLink: "/products",
    badgeColor: "bg-red-600",
    ctaColor: "bg-blue-900 hover:bg-blue-800",
  },
  {
    id: "clx234567890abcdefghijklmno",
    mediaType: "VIDEO",
    mediaUrl: "https://googleapis.com", // Sample Video
    videoLoop: false, 
    videoNextOnEnd: true, // Video khatam hote hi immediate next slide khulegi
    duration: 0, // Duration ignore ho jayegi jab videoNextOnEnd true hoga
    layoutType: "CENTER",
    title: "DGMS Approved Safety Equipment",
    subtitle: "Prioritizing Workplace Safety",
    description: "Complete industrial safety gear, certified PPE kits, high-visibility clothing, and premium safety shoes for mining & plants.",
    ctaText: "View Safety Range",
    ctaLink: "/products?category=safety",
    badgeColor: "bg-yellow-600",
    ctaColor: "bg-green-700 hover:bg-green-600",
  },
  {
    id: "clx34567890abcdefghijklmnop",
    mediaType: "VIDEO",
    mediaUrl: "https://googleapis.com",
    videoLoop: true,
    videoNextOnEnd: false,
    duration: 8,
    layoutType: "LEFT",
    title: "Fire Protection & Road Safety",
    subtitle: "Compliance & Protection Guaranteed",
    description: "Standard compliance fire extinguishers, suppression systems, and heavy-duty road safety indicators.",
    ctaText: "Get a Quote",
    ctaLink: "/contact",
    badgeColor: "bg-red-600",
    ctaColor: "bg-blue-900 hover:bg-blue-800",
  },
  {
    id: "cljh3b5ty00023b67m1n0b9v7",
    mediaType: "IMAGE",
    mediaUrl: "https://sbsgroups.co.in/assets/banner4-tKcYDE5l.webp",
    videoLoop: false,
    videoNextOnEnd: false,
    duration: 3,
    layoutType: "right",
    title: "Fire and Road safety",
    subtitle: "Guaranteed Compliance & Protection",
    description: "Standard Road safety and fire safety equipments for mining and industrial applications.",
    ctaText: "visit us",
    ctaLink: "/http://localhost:3000/products/SKU-9007",
    badgeColor: "bg-cyan-600 hover:bg-red-600 hover text-black-600",
    ctaColor: "bg-blue-900 hover:bg-blue-800",
  },
];