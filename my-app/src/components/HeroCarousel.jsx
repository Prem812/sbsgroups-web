"use client";

import { useState, useEffect, useCallback } from "react";

// DUMMY DATA STRUCTURE (Easily replaceable with Database / API data later)
const dummySlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
    title: "Premium Industrial Bearings",
    subtitle: "Authorized Distributors & Suppliers",
    description: "Providing high-grade mechanical spares, heavy-duty bearings, and power transmission solutions for over 20+ years.",
    ctaText: "Explore Products",
    ctaLink: "/products",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=1920",
    title: "DGMS Approved Safety Equipment",
    subtitle: "Prioritizing Workplace Safety",
    description: "Complete industrial safety gear, certified PPE kits, high-visibility clothing, and premium safety shoes for mining & plants.",
    ctaText: "View Safety Range",
    ctaLink: "/products?category=safety",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1599740831464-5cbe1a146810?auto=format&fit=crop&q=80&w=1920",
    title: "Fire Protection & Road Safety",
    subtitle: "Compliance & Protection Guaranteed",
    description: "Standard compliance fire extinguishers, suppression systems, and heavy-duty road safety indicators.",
    ctaText: "Get a Quote",
    ctaLink: "/contact",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? dummySlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === dummySlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  // Automatic slide transition (Autoplay like sbsgroups)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, 5000); // Changes slide every 5 seconds

    return () => clearInterval(slideTimer);
  }, [nextSlide]);

  return (
    <div className="relative h-[450px] w-full overflow-hidden sm:h-[550px] lg:h-[650px] bg-gray-900">
      
      {/* WRAPPER FOR SLIDES */}
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {dummySlides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-full w-full flex-shrink-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Content Container (Responsive Text Alignment) */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-12 lg:px-16">
              <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                <span className="inline-block rounded bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider md:text-sm">
                  {slide.subtitle}
                </span>
                <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-balance">
                  {slide.title}
                </h1>
                <p className="text-sm text-gray-200 sm:text-lg max-w-xl">
                  {slide.description}
                </p>
                <div className="pt-2">
                  <a
                    href={slide.ctaLink}
                    className="inline-block rounded-md bg-blue-900 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-blue-800 focus:outline-none"
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LEFT ARROW CONTROL */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/45 md:left-6"
        aria-label="Previous Slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* RIGHT ARROW CONTROL */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/45 md:right-6"
        aria-label="Next Slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* BOTTOM DOT INDICATORS */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-3">
        {dummySlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-red-600 w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}