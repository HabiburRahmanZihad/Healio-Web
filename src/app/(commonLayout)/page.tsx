import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LatestMedicines from "@/components/home/LatestMedicines";
import StatsSection from "@/components/home/StatsSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default async function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <StatsSection />
      <FeaturedCategories />
      <HowItWorks />
      <WhyChooseUs />
      <LatestMedicines />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
