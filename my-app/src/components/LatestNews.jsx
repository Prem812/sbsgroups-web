"use client";

// DUMMY DATA STRUCTURE (Connected to Admin Dashboard / Database CMS later)
const dummyNews = [
  {
    id: 1,
    tag: "Corporate Deployment",
    title: "Hindalco Smart Tool Storage Room",
    description: "Successfully engineered and delivered an automated smart tool management framework optimizing asset tracking for Hindalco facilities.",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    tag: "Integration Update",
    title: "NCL ICOMS Portal Synchronization",
    description: "Streamlining bulk procurement timelines via active inventory mapping for smoother Northern Coalfields Limited supplies.",
    date: "Jan 2025",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    tag: "Company Event",
    title: "Annual Growth Summit 2025",
    description: "Reflecting on key distribution milestones, scaling strategies, and introducing new DGMS certified safety catalogs.",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
  },
];

export default function LatestNews() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-end">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Updates & Highlights
            </span>
            <h2 className="text-2xl font-black tracking-tight text-blue-900 sm:text-3xl uppercase">
              Latest News & Key Deployments
            </h2>
          </div>
          {/* View All Button placeholder linking to blog or news center */}
          <a
            href="/news"
            className="group inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 hover:text-red-600 transition-colors"
          >
            <span>View All Updates</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* NEWS / DEPLOYMENT GRID (Highly Responsive Layout) */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dummyNews.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Media Wrapper */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded bg-blue-900 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  {item.tag}
                </span>
              </div>

              {/* Card Typography Elements */}
              <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-400">
                    {item.date}
                  </span>
                  <h3 className="text-base font-black text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Read Case Study CTA */}
                <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-red-600 group-hover:text-blue-900 transition-colors">
                    Read Case Study
                  </span>
                  <svg className="h-4 w-4 text-red-600 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}