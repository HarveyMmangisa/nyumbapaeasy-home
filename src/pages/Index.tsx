import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedListings />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
