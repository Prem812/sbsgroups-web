"use client";

import { useState, useEffect, useCallback, useRef } from "react";
// importing dummy data from a separate data file where source is data/heroCarousel.js
import { dummySlides, CarouselSettings } from "@/data/heroCarousel";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const currentSlide = dummySlides[currentIndex];

  // Helpers to normalise loose data values (e.g. "true" string, lowercase types)
  const toBool = (v) => v === true || v === "true";
  const mediaType = (currentSlide.mediaType || "IMAGE").toUpperCase();
  const isVideo = mediaType === "VIDEO";
  const isLoopingVideo = isVideo && toBool(currentSlide.videoLoop);

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

  // Video ended handler: only advance when video is NOT looping
  const handleVideoEnded = () => {
    if (isVideo && !isLoopingVideo) {
      nextSlide();
    }
  };

  // Video play controller on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [currentIndex]);

  // Autoplay effect
  useEffect(() => {
    // Hover hone par koi movement nahi (pause)
    if (isHovered) return;

    // Looping video: slide kabhi automatically aage/peeche nahi jayegi
    if (isLoopingVideo) return;

    // Non-looping video: video ke khatam hone par hi next slide (handleVideoEnded), timer nahi
    if (isVideo) return;

    // IMAGE / SOLID / GRADIENT: nextSlideIn seconds (default 5) ke baad next slide
    const slideDuration = (currentSlide.nextSlideIn || 5) * 1000;
    const slideTimer = setTimeout(() => {
      nextSlide();
    }, slideDuration);

    return () => clearTimeout(slideTimer);
  }, [nextSlide, currentIndex, currentSlide, isHovered, isVideo, isLoopingVideo]);

  // Content alignment styling
  const getAlignmentClass = (layout) => {
    const value = (layout || "").toUpperCase();
    if (value === "CENTER") return "items-center text-center mx-auto";
    if (value === "RIGHT") return "items-end text-right ml-auto";
    return "items-start text-left mr-auto"; // Default LEFT
  };

  // Build background style for SOLID / GRADIENT media types
  const getBackgroundStyle = (slide) => {
    const type = (slide.mediaType || "IMAGE").toUpperCase();

    if (type === "SOLID") {
      return { backgroundColor: slide.solidColor };
    }

    if (type === "GRADIENT") {
      const g = slide.gradientColor || {};
      if (g.gradientType === "radial") {
        return {
          background: `radial-gradient(circle, ${g.gradientColorStarts}, ${g.gradientColorEnds})`,
        };
      }
      return {
        background: `linear-gradient(${g.gradientDirection || "to right"}, ${g.gradientColorStarts}, ${g.gradientColorEnds})`,
      };
    }

    // IMAGE fallback
    return {
      backgroundImage: `url(${slide.mediaUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  return (
    <div
      className="relative h-[450px] w-full overflow-hidden sm:h-[550px] lg:h-[650px] bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* WRAPPER FOR SLIDES */}
      <div className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} >
        {dummySlides.map((slide, idx) => {
          const slideType = (slide.mediaType || "IMAGE").toUpperCase();
          return (
          <div key={slide.id} className="relative h-full w-full flex-shrink-0">

            {/* CONDITION: Render Video, or Image/Solid/Gradient background */}
            {slideType === "VIDEO" ? (
              <video ref={idx === currentIndex ? videoRef : null}
                className="absolute inset-0 h-full w-full object-cover"
                muted playsInline loop={toBool(slide.videoLoop)} onEnded={handleVideoEnded} >
                <source src={slide.mediaUrl} type="video/mp4" />
              </video>
            ) : (
              <div className="absolute inset-0 h-full w-full"
                style={getBackgroundStyle(slide)} />
            )}

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Content Container (Responsive Layout Alignment) */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-12 lg:px-16">
              <div className={`max-w-2xl text-white space-y-4 md:space-y-6 flex flex-col ${getAlignmentClass(slide.layoutType)}`}>
                <span className="inline-block transform focus:outline-none hover:scale-[var(--badge-scale)]"
                  style={{
                    color: slide.badgeStyle?.fontColor,
                    backgroundColor: slide.badgeStyle?.backgroundColor,
                    padding: slide.badgeStyle?.padding,
                    fontWeight: slide.badgeStyle?.fontWeight,
                    letterSpacing: slide.badgeStyle?.letterSpacing || "0.05em",
                    textTransform: slide.badgeStyle?.textTransform || "uppercase",
                    transition: slide.badgeStyle?.transition || "all 0.3s ease",
                    // Passes your huge 2.03 scale factor dynamically to Tailwind via CSS variable
                    "--badge-scale": slide.badgeStyle?.hoverScale || 1.03,
                  }} >
                  {slide.badge}
                </span>
                <h1 className={`text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-balance ${getAlignmentClass(slide.titleStyle)}`}>
                  {slide.title}
                </h1>
                <p className={`text-sm text-gray-200 sm:text-lg max-w-xl ${getAlignmentClass(slide.descriptionStyle)}`}>
                  {slide.description}
                </p>
                <div className="pt-2">
                  <a href={slide.ctaLink} target={slide.ctaOpenInNewTab ? "_blank" : "_self"}
                      rel={slide.ctaOpenInNewTab ? "noopener noreferrer" : undefined}
                      className="inline-block transform focus:outline-none hover:scale-[var(--hover-scale)]"
                      style={{
                        color: slide.ctaButtonStyle?.fontColor,
                        padding: slide.ctaButtonStyle?.padding,
                        borderRadius: slide.ctaButtonStyle?.borderRadius,
                        fontWeight: slide.ctaButtonStyle?.fontWeight,
                        letterSpacing: slide.ctaButtonStyle?.letterSpacing || "0.05em",
                        textTransform: slide.ctaButtonStyle?.textTransform || "capitalize",
                        transition: slide.ctaButtonStyle?.transition || "all 0.3s ease",
                        // Sets the dynamic hover scale factor using a CSS custom property
                        "--hover-scale": slide.ctaButtonStyle?.hoverScale || 1.03,
                        // Evaluates whether to render a solid or gradient background inline
                        background: slide.ctaButtonStyle?.backgroundColor?.mediatype === "SOLID"
                          ? slide.ctaButtonStyle?.backgroundColor?.solid
                          : slide.ctaButtonStyle?.backgroundColor?.mediatype === "GRADIENT" && slide.ctaButtonStyle?.backgroundColor?.gradient?.gradientType === "linear"
                            ? `linear-gradient(${slide.ctaButtonStyle?.backgroundColor?.gradient?.gradientDirection}, ${slide.ctaButtonStyle?.backgroundColor?.gradient?.gradientColorStarts}, ${slide.ctaButtonStyle?.backgroundColor?.gradient?.gradientColorEnds})`
                            : slide.ctaButtonStyle?.backgroundColor?.mediatype === "GRADIENT" && slide.ctaButtonStyle?.backgroundColor?.gradient?.gradientType === "radial"
                              ? `radial-gradient(circle, ${slide.ctaButtonStyle?.backgroundColor?.gradient?.gradientColorStarts}, ${slide.ctaButtonStyle?.backgroundColor?.gradient?.gradientColorEnds})`
                              : undefined
                      }}>
                      {slide.ctaText}
                    </a>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* LEFT ARROW CONTROL */}
      {toBool(CarouselSettings?.prevButton) && (
        <button onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/45 md:left-6 z-10" aria-label="Previous Slide" >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* RIGHT ARROW CONTROL */}
      {toBool(CarouselSettings?.nextButton) && (
        <button onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/45 md:right-6 z-10"
          aria-label="Next Slide" >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* BOTTOM DOT INDICATORS */}
      {toBool(CarouselSettings?.bottomDots) && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-3 z-10">
          {dummySlides.map((_, index) => (
            <button key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-red-600 w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}