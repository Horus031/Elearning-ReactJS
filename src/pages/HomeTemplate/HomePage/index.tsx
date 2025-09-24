import CourseSection from "@/components/HomePage/CourseSection";
import { CTASection } from "@/components/HomePage/CTASection";
import { FeaturesSection } from "@/components/HomePage/FeaturesSection";
import { HeroSection } from "@/components/HomePage/HeroSection";

const HomePage = () => {
  return (
    <div>
      <main>
        <HeroSection />
        <CourseSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;
