import HeaderLanding from "@/components/general/header/HeaderLanding";
import HeroSection from "@/components/general/carousal/HeroSection";
import DiscoverSection from "@/components/general/carousal/DiscoverSection";
import FeaturedEventsSection from "@/components/general/carousal/FeaturedEventsSection";
import UpcomingEventsSection from "@/components/general/carousal/UpcomingEventsSection";
import EventCategoriesSection from "@/components/general/carousal/EventCategoriesSection";
import CallToActionSection from "@/components/general/carousal/CallToActionSection";
import HowItWorksSection from "@/components/general/carousal/HowItWorksSection";
import KeyFeaturesSection from "@/components/general/carousal/KeyFeaturesSection";
import CitiesSection from "@/components/general/carousal/CitiesSection";
import FooterSection from "@/components/footer/FooterSection";

export default function LandingPage() {
  return (
    
    <div className="min-h-screen">
      <HeaderLanding />
      <HeroSection />
      <DiscoverSection />
      <FeaturedEventsSection />
      <UpcomingEventsSection />
      <EventCategoriesSection />
      <CallToActionSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <CitiesSection />
      <FooterSection />
    </div>
  );
}
