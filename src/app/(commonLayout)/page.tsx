import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LatestMedicines from "@/components/home/LatestMedicines";

export default async function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedCategories />
      <WhyChooseUs />
      <LatestMedicines />
    </div>
  );
}
