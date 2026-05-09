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
import ApiKeyStep from "./components/ApiKeyStep";
import FromEmailStep from "./components/FromEmailStep";
import ComplianceReviewStep from "./components/ComplianceReviewStep";
import ProgressIndicator from "./components/ProgressIndicator";

interface EmailSMSConnectionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	platformName: string;
	platformIcon: React.ComponentType<{ className?: string }>;
	platformIconBg: string;
	onConnect: () => void;
}

export default function EmailSMSConnectionDialog({
	open,
	onOpenChange,
	platformName,
	platformIcon: PlatformIcon,
	platformIconBg,
	onConnect,
}: EmailSMSConnectionDialogProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [apiKey, setApiKey] = useState("");
	const [fromEmail, setFromEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	const totalSteps = 3;

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

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
		if (isStepValid(3)) {
			onConnect();
			handleClose();
		}
	};

	const handleClose = () => {
		setCurrentStep(1);
		setApiKey("");
		setFromEmail("");
		setEmailError("");
		onOpenChange(false);
	};

	const handleFromEmailChange = (email: string) => {
		setFromEmail(email);
		if (email.trim() !== "") {
			if (!validateEmail(email)) {
				setEmailError("Please enter a valid email address");
			} else {
				setEmailError("");
			}
		} else {
			setEmailError("");
		}
	};

	const isStepValid = (step: number): boolean => {
		switch (step) {
			case 1:
				return apiKey.trim() !== "";
			case 2:
				return fromEmail.trim() !== "" && validateEmail(fromEmail);
			case 3:
				return true;
			default:
				return false;
		}
	};

	const canProceed = isStepValid(currentStep);

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<ApiKeyStep
						apiKey={apiKey}
						platformName={platformName}
						onApiKeyChange={setApiKey}
					/>
				);

			case 2:
				return (
					<FromEmailStep
						fromEmail={fromEmail}
						platformName={platformName}
						onFromEmailChange={handleFromEmailChange}
						error={emailError}
					/>
				);

			case 3:
				return <ComplianceReviewStep />;

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
								Set up email marketing campaigns.
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
