import HeroCarousel from "@/components/HeroCarousel";
import ClientSlider from "@/components/ClientCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutIntro from "@/components/AboutIntro";
import BusinessCTA from "@/components/BusinessCTA";
import PrinciplesSection from "@/components/PrinciplesSection";
import OurSolutionsGrid from "@/components/OurSolutionsGrid";
import LatestNews from "@/components/LatestNews";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <ClientSlider />

      <WhyChooseUs />

      <AboutIntro />

      <BusinessCTA />

      <PrinciplesSection />

      <OurSolutionsGrid />

      <LatestNews />
    </>
  );
}