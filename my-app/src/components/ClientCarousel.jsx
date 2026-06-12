"use client";

const clients = [
  {
    name: "Northern Coalfields Ltd (NCL)",
    logo: "https://sbsgroups.co.in/assets/7-gxWNX6DG.webp",
    url: "https://www.nclcil.in/",
  },
  {
    name: "NTPC Limited",
    logo: "https://sbsgroups.co.in/assets/6-wlFXflvm.webp",
    url: "https://www.ntpc.co.in/",
  },
  {
    name: "Hindalco Industries",
    logo: "https://sbsgroups.co.in/assets/2-BEdwMCg4.webp",
    url: "https://www.hindalco.com/",
  },
  {
    name: "Coal India Limited",
    logo: "/logos/coal-india.png",
    url: "https://www.coalindia.in/",
  },
  {
    name: "Tata Projects",
    logo: "https://sbsgroups.co.in/assets/9-DiZBQZuz.webp",
    url: "https://tataprojects.com/",
  },
  {
    name: "Larsen & Toubro (L&T)",
    logo: "https://sbsgroups.co.in/assets/4-Cm7IJDPQ.webp",
    url: "https://www.larsentoubro.com/",
  },
];

const scrollingClients = [...clients, ...clients];

export default function ClientSlider() {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mb-14">
        <span className="inline-block px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-[3px] uppercase backdrop-blur-xl">
          Trusted By Industry Leaders
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
          Our Esteemed Clients
        </h2>

        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          Powering India's leading infrastructure, mining, energy and
          industrial organizations with reliable engineering solutions.
        </p>
      </div>

      <div className="relative flex overflow-hidden">

        <div className="flex animate-scroll whitespace-nowrap">

          {scrollingClients.map((client, index) => (
            <div
              key={index}
              className="group relative mx-8"
              style={{
                perspective: "1200px",
              }} >
              <a href={client.url}
                target="_blank" rel="noopener noreferrer"
                className="
                  relative flex h-40 w-64 items-center justify-center overflow-hidden rounded-3xl border
                  border-white/10 bg-white/5 backdrop-blur-xl transition-all
                  duration-700 hover:-translate-y-4 hover:scale-105 
                "
                style={{ 
                  transformStyle: "preserve-3d", boxShadow: "0 25px 50px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.15)",
                }} >
                {/* Glass Reflection */}
                <div
                  className=" absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                  style={{
                    background: "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)", transform: "translateX(-120%)",
                  }} />

                {/* Glow Border */}
                <div
                  className=" absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 "
                  style={{
                    boxShadow: "0 0 40px rgba(59,130,246,0.6), 0 0 80px rgba(6,182,212,0.3)",
                  }} />

                {/* Top Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

                {/* Logo */}
                <img src={client.logo} alt={client.name} 
                  className=" relative z-10 max-h-[75px] max-w-[180px] object-contain 
                  grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  style={{
                    transform: "translateZ(60px)", filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.35))",
                  }} />

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-1/2 h-8 w-32 -translate-x-1/2 
                    rounded-full bg-blue-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" 
                />
              </a>

              {/* Company Name */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="rounded-full border border-blue-400/30 bg-slate-900/95 px-4 py-2 backdrop-blur-xl shadow-2xl">
                  <span className="text-xs font-semibold text-blue-200 whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Left Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-52 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-52 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent" />

      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}