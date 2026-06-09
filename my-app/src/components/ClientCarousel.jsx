"use client";

const clients = [
  { name: "Northern Coalfields Ltd (NCL)", logo: "https://sbsgroups.co.in/assets/7-gxWNX6DG.webp", url: "https://www.nclcil.in/" },
  { name: "NTPC Limited", logo: "https://sbsgroups.co.in/assets/6-wlFXflvm.webp", url: "https://www.ntpc.co.in/" },
  { name: "Hindalco Industries", logo: "https://sbsgroups.co.in/assets/2-BEdwMCg4.webp", url: "https://www.hindalco.com/" },
  { name: "Coal India Limited", logo: "/logos/coal-india.png", url: "https://www.coalindia.in/" },
  { name: "Tata Projects", logo: "https://sbsgroups.co.in/assets/9-DiZBQZuz.webp", url: "https://tataprojects.com/" },
  { name: "Larsen & Toubro (L&T)", logo: "https://sbsgroups.co.in/assets/4-Cm7IJDPQ.webp", url: "https://www.larsentoubro.com/" },
];

// List ko duplicate kiya infinite loop ke liye
const scrollingClients = [...clients, ...clients];

export default function ClientSlider() {
  return (
    <section className="bg-gray-50 py-12 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* Main Slider Container */}
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-scroll pause-animation whitespace-nowrap">
          {scrollingClients.map((client, index) => (
            <div 
              key={index} 
              className="relative mx-8 flex flex-col items-center justify-center group/item"
            >
              {/* Logo Card */}
              <a 
                href={client.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-24 w-40 items-center justify-center rounded-lg bg-white p-4 shadow-sm border border-transparent hover:border-blue-500 transition-all duration-300"
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </a>

              {/* Tooltip Name (Shows on Hover) */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover/item:scale-100 transition-transform duration-200 bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap z-10 shadow-lg">
                {client.name}
                {/* Tooltip Arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-blue-900"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays (For smooth fade in/out on edges) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent"></div>
      </div>
    </section>
  );
}