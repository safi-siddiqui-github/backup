"use client";

import VendorCTASection from "./VendorCTASection";
import VendorFeaturesSection from "./VendorFeaturesSection";
import VendorHeroSection from "./VendorHeroSection";
import VendorHowItWorksSection from "./VendorHowItWorksSection";
import VendorTestimonialsSection from "./VendorTestimonialsSection";
import VendorValueSection from "./VendorValueSection";

export default function VendorLandingPageComponent() {
	return (
		<main className="flex min-h-screen flex-col bg-background text-foreground">
			<VendorHeroSection />
			<VendorFeaturesSection />
			<VendorHowItWorksSection />
			<VendorValueSection />
			<VendorTestimonialsSection />
			<VendorCTASection />
		</main>
	);
}

