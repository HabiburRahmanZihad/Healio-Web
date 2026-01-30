import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import LatestMedicines from "@/components/home/LatestMedicines";
import StatsSection from "@/components/home/StatsSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import EmergencyCare from "@/components/home/EmergencyCare";
import TopBrands from "@/components/home/TopBrands";
import FlashSale from "@/components/home/FlashSale";
import BlogSection from "@/components/home/BlogSection";

export default async function Home() {
  return (
    <div className="overflow-x-hidden space-y-0">
      <Hero />
      <StatsSection />
      <FlashSale />
      <FeaturedCategories />
      <EmergencyCare />
      <TopBrands />
      <HowItWorks />
      <LatestMedicines />
      <BlogSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
