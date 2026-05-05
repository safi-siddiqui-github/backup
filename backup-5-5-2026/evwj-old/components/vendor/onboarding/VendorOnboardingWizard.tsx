"use client";

import { Routes } from "@/lib/lib-routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OnboardingStepper from "./OnboardingStepper";
import Step1_Account from "./steps/Step1_Account";
import Step2_Services from "./steps/Step2_Services";
import Step3_ServiceArea from "./steps/Step3_ServiceArea";
import Step4_BusinessDetails from "./steps/Step4_BusinessDetails";

export type OnboardingFormData = {
	// Step 1: Account
	email: string;
	password: string;
	name: string;
	isSignUp: boolean;

	// Step 2: Services
	selectedServices: string[]; // Array of service IDs or custom service names

	// Step 3: Service Areas
	serviceAreas: Array<{
		country: string;
		state: string;
		city: string;
		radius: number;
	}>;

	// Step 4: Business Details
	businessName: string;
	businessPhoto: File | null;
	portfolioImages: File[];
	businessDescription: string;
};

export default function VendorOnboardingWizard() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<OnboardingFormData>({
		email: "",
		password: "",
		name: "",
		isSignUp: true,
		selectedServices: [],
		serviceAreas: [],
		businessName: "",
		businessPhoto: null,
		portfolioImages: [],
		businessDescription: "",
	});

	const next = () => {
		if (currentStep < 4) {
			setCurrentStep((s) => s + 1);
		}
	};

	const back = () => {
		if (currentStep > 1) {
			setCurrentStep((s) => s - 1);
		}
	};

	const handleComplete = () => {
		// TODO: Save form data to backend
		console.log("Onboarding data:", formData);
		// Redirect to vendor dashboard
		router.push(Routes.web.vendor.dashboard);
	};

	const updateFormData = (updates: Partial<OnboardingFormData>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	};

	return (
		<div className="min-h-screen bg-background py-8 px-4">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<OnboardingStepper currentStep={currentStep} />
				</div>

				<div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
					{currentStep === 1 && (
						<Step1_Account
							formData={formData}
							updateFormData={updateFormData}
							onNext={next}
						/>
					)}

					{currentStep === 2 && (
						<Step2_Services
							formData={formData}
							updateFormData={updateFormData}
							onNext={next}
							onBack={back}
						/>
					)}

					{currentStep === 3 && (
						<Step3_ServiceArea
							formData={formData}
							updateFormData={updateFormData}
							onNext={next}
							onBack={back}
						/>
					)}

					{currentStep === 4 && (
						<Step4_BusinessDetails
							formData={formData}
							updateFormData={updateFormData}
							onBack={back}
							onComplete={handleComplete}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

