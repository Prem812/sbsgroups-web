"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// UPDATED DUMMY DATA STRUCTURE (Supports Image, Video, Alignment & Timing)
const dummySlides = [
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
    videoLoop: true, // Loop me chalta rahega
    videoNextOnEnd: false,
    duration: 8, // Loop chalte hue bhi 8 seconds baad auto-slide ho jayega
    layoutType: "LEFT",
    title: "Fire Protection & Road Safety",
    subtitle: "Compliance & Protection Guaranteed",
    description: "Standard compliance fire extinguishers, suppression systems, and heavy-duty road safety indicators.",
    ctaText: "Get a Quote",
    ctaLink: "/contact",
    badgeColor: "bg-red-600",
    ctaColor: "bg-blue-900 hover:bg-blue-800",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  const currentSlide = dummySlides[currentIndex];

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

  // Video ended event handler
  const handleVideoEnded = () => {
    if (currentSlide.mediaType === "VIDEO" && currentSlide.videoNextOnEnd) {
      nextSlide();
    }
  };

  // Video play controller on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [currentIndex]);

  // Dynamic Autoplay effect based on current slide configuration
  useEffect(() => {
    // Agar current slide video hai aur video khatam hone par next slide lagayi hai, toh dynamic timer set nahi karenge
    if (currentSlide.mediaType === "VIDEO" && currentSlide.videoNextOnEnd) {
      return;
    }

    // Default duration seconds ko milliseconds me convert karna
    const slideDuration = (currentSlide.duration || 5) * 1000;

    const slideTimer = setInterval(() => {
      nextSlide();
    }, slideDuration);

    return () => clearInterval(slideTimer);
  }, [nextSlide, currentIndex, currentSlide]);

  // Helper utility for Content alignment styling
  const getAlignmentClass = (layout) => {
    if (layout === "CENTER") return "items-center text-center mx-auto";
    if (layout === "RIGHT") return "items-end text-right ml-auto";
    return "items-start text-left mr-auto"; // Default LEFT
  };

  return (
    <div className="relative h-[450px] w-full overflow-hidden sm:h-[550px] lg:h-[650px] bg-gray-900">
      
      {/* WRAPPER FOR SLIDES */}
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {dummySlides.map((slide, idx) => (
          <div key={slide.id} className="relative h-full w-full flex-shrink-0">
            
            {/* CONDITION: Render Image or Video */}
            {slide.mediaType === "VIDEO" ? (
              <video
                ref={idx === currentIndex ? videoRef : null}
                className="absolute inset-0 h-full w-full object-cover"
                muted
                playsInline
                loop={slide.videoLoop}
                onEnded={handleVideoEnded}
              >
                <source src={slide.mediaUrl} type="video/mp4" />
              </video>
            ) : (
              <div
                className="absolute inset-0 h-full w-full"
                style={{
                  backgroundImage: `url(${slide.mediaUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Content Container (Responsive Layout Alignment) */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-12 lg:px-16">
              <div className={`max-w-2xl text-white space-y-4 md:space-y-6 flex flex-col ${getAlignmentClass(slide.layoutType)}`}>
                <span className={`inline-block rounded px-3 py-1 text-xs font-bold uppercase tracking-wider md:text-sm ${slide.badgeColor}`}>
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
                    className={`inline-block rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition focus:outline-none ${slide.ctaColor}`}
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
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/45 md:left-6 z-10"
        aria-label="Previous Slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* RIGHT ARROW CONTROL */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/45 md:right-6 z-10"
        aria-label="Next Slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* BOTTOM DOT INDICATORS */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-3 z-10">
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
