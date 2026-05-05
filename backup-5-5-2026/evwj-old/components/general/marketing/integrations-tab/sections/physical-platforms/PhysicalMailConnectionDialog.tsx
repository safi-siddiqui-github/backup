"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AccountNumberStep from "./components/AccountNumberStep";
import AddressStep from "./components/AddressStep";
import TemplateSelectionStep from "./components/TemplateSelectionStep";
import PricingTierStep from "./components/PricingTierStep";
import ProgressIndicator from "./components/ProgressIndicator";

interface PhysicalMailConnectionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	platformName: string;
	platformIcon: React.ComponentType<{ className?: string }>;
	platformIconBg: string;
	onConnect: () => void;
}

export default function PhysicalMailConnectionDialog({
	open,
	onOpenChange,
	platformName,
	platformIcon: PlatformIcon,
	platformIconBg,
	onConnect,
}: PhysicalMailConnectionDialogProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [accountNumber, setAccountNumber] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [selectedTemplate, setSelectedTemplate] = useState<string>("");
	const [selectedPricingTier, setSelectedPricingTier] = useState<string>("");

	const totalSteps = 4;

	const handleNext = () => {
		if (currentStep < totalSteps && isStepValid(currentStep)) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleConnect = () => {
		if (isStepValid(4)) {
			onConnect();
			handleClose();
		}
	};

	const handleClose = () => {
		setCurrentStep(1);
		setAccountNumber("");
		setStreetAddress("");
		setCity("");
		setState("");
		setZipCode("");
		setSelectedTemplate("");
		setSelectedPricingTier("");
		onOpenChange(false);
	};

	const isStepValid = (step: number): boolean => {
		switch (step) {
			case 1:
				return accountNumber.trim() !== "";
			case 2:
				return (
					streetAddress.trim() !== "" &&
					city.trim() !== "" &&
					state.trim() !== "" &&
					zipCode.trim() !== ""
				);
			case 3:
				return selectedTemplate !== "";
			case 4:
				return selectedPricingTier !== "";
			default:
				return false;
		}
	};

	const canProceed = isStepValid(currentStep);

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<AccountNumberStep
						accountNumber={accountNumber}
						platformName={platformName}
						onAccountNumberChange={setAccountNumber}
					/>
				);

			case 2:
				return (
					<AddressStep
						streetAddress={streetAddress}
						city={city}
						state={state}
						zipCode={zipCode}
						onStreetAddressChange={setStreetAddress}
						onCityChange={setCity}
						onStateChange={setState}
						onZipCodeChange={setZipCode}
					/>
				);

			case 3:
				return (
					<TemplateSelectionStep
						selectedTemplate={selectedTemplate}
						onTemplateChange={setSelectedTemplate}
					/>
				);

			case 4:
				return (
					<PricingTierStep
						selectedPricingTier={selectedPricingTier}
						onPricingTierChange={setSelectedPricingTier}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="min-w-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<div className="flex items-center gap-3 mb-2">
						<div
							className={cn(
								"w-10 h-10 rounded-lg flex items-center justify-center",
								platformIconBg,
							)}
						>
							<PlatformIcon className="h-5 w-5 text-white" />
						</div>
						<div>
							<DialogTitle>Connect {platformName}</DialogTitle>
							<DialogDescription className="mt-1">
								Set up physical mail campaigns with {platformName}.
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				{/* Progress Indicator */}
				<ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

				{/* Step Content */}
				<div className="min-h-[200px]">{renderStepContent()}</div>

				{/* Footer */}
				<DialogFooter className="flex-row gap-2">
					{currentStep > 1 ? (
						<Button variant="outline" onClick={handleBack} className="flex-1">
							Back
						</Button>
					) : null}
					{currentStep < totalSteps ? (
						<Button
							onClick={handleNext}
							disabled={!canProceed}
							className={cn(
								"bg-blue-600 hover:bg-blue-700",
								currentStep === 1 ? "w-full" : "flex-1",
							)}
						>
							Continue
						</Button>
					) : (
						<Button
							onClick={handleConnect}
							disabled={!canProceed}
							className="flex-1 bg-blue-600 hover:bg-blue-700"
						>
							Connect {platformName}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
