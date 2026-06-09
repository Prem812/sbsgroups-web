"use client";

import Link from "next/link";

// THE EXACT DATA STRUCTURING MATCHING THE SCREENSHOT (Admin ready)
const solutionsData = [
  {
    id: 1,
    name: "Safety",
    slug: "safety",
    image: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&q=80&w=500" // Worker with safety helmet/harness look
  },
  {
    id: 2,
    name: "Professional Tools",
    slug: "professional-tools",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=500" // Wrenches and premium mechanical instruments
  },
  {
    id: 3,
    name: "Lubrication Systems",
    slug: "lubrication-systems",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=500" // Industrial grease/oil dispenser or tools in hand
  },
  {
    id: 4,
    name: "Spare and Aerosols",
    slug: "spare-and-aerosols",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=500" // Chemical spray cans or clean industrial sprays
  },
  {
    id: 5,
    name: "Mechanical",
    slug: "mechanical",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=500" // Heavy industrial factory assembly lines layout
  },
  {
    id: 6,
    name: "Lifting Equipment",
    slug: "lifting-equipment",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=500" // Industrial hooks, cranes or lifting setups
  }
];

export default function OurSolutionsGrid() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Main Title matching live site styling */}
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tight text-blue-950 sm:text-3xl">
            Our <span className="text-lime-500">Solutions</span>
          </h2>
        </div>

        {/* 6-Card High-Fidelity Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionsData.map((item) => (
            <Link
              key={item.id}
              href={`/products?category=${item.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-gray-100 bg-gray-900 aspect-[16/10] shadow-md transition-all duration-300 hover:shadow-xl"
            >
              {/* Card Image element with smooth hover zoom transformation */}
              <img
                src={item.image}
                alt={`${item.name} categories distribution thumbnail`}
                className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dynamic Overlay Shadow Gradients matching screenshot contrast overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

              {/* Centered Label Alignment Content Box */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-lg md:text-xl font-extrabold tracking-wide text-white drop-shadow-md text-center transition-transform duration-300 group-hover:scale-105 uppercase">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}