import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VendorAuth from "@/components/vendor/VendorAuth";
import { HeroSection } from "@/components/vendor/landing/HeroSection";
import { ProblemSolutionSection } from "@/components/vendor/landing/ProblemSolutionSection";
import { FeaturesShowcase } from "@/components/vendor/landing/FeaturesShowcase";
import { TestimonialsSection } from "@/components/vendor/landing/TestimonialsSection";
import { PricingSection } from "@/components/vendor/landing/PricingSection";
import { HowItWorks } from "@/components/vendor/landing/HowItWorks";
import { FAQSection } from "@/components/vendor/landing/FAQSection";
import { FinalCTA } from "@/components/vendor/landing/FinalCTA";
import { LandingFooter } from "@/components/vendor/landing/LandingFooter";

const VendorLanding = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const handleLoginClick = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const handleAuthenticated = () => {
    setAuthModalOpen(false);
    navigate("/vendor");
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onSignupClick={handleSignupClick} onLoginClick={handleLoginClick} />
      <ProblemSolutionSection />
      <FeaturesShowcase />
      <TestimonialsSection />
      <HowItWorks />
      <PricingSection onSignupClick={handleSignupClick} />
      <FAQSection />
      <FinalCTA onSignupClick={handleSignupClick} />
      <LandingFooter />

      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <VendorAuth onAuthenticated={handleAuthenticated} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorLanding;
