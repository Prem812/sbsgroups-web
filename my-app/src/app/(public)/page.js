import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ClientSlider from "@/components/ClientCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutIntro from "@/components/AboutIntro";
import BusinessCTA from "@/components/BusinessCTA";
import PrinciplesSection from "@/components/PrinciplesSection";
import OurSolutionsGrid from "@/components/OurSolutionsGrid";
import OurSolutions from "@/components/OurSolutions";
import AboutInfrastructure from "@/components/AboutInfrastructure";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* 1. Global Navigation Frame with integrated Search and Portal Access */}
      <Header />

      {/* 2. Main Large Fluid Image Presentation Carousel Slider */}
      <HeroCarousel />

      {/* 3. Automatic Continuous Horizontal Infinite Clients Running Block */}
      <ClientSlider />

      {/* 4. Strict Benchmark Matrix (Why Choose Us) Container Section */}
      <WhyChooseUs />

      <AboutIntro />

      <BusinessCTA />

      <PrinciplesSection />

      <OurSolutionsGrid />

      {/* <OurSolutions />

      <AboutInfrastructure /> */}

      <LatestNews />

      <Footer />
    </>
  );
}