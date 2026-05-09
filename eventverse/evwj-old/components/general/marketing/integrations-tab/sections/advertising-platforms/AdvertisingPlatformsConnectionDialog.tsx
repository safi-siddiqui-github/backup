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
import ConnectionMethodStep from "./components/ConnectionMethodStep";
import AdAccountSelectionStep from "./components/AdAccountSelectionStep";
import BudgetConfigurationStep from "./components/BudgetConfigurationStep";
import PermissionsReviewStep from "./components/PermissionsReviewStep";
import ProgressIndicator from "./components/ProgressIndicator";

interface AdvertisingPlatformsConnectionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	platformName: string;
	platformIcon: React.ComponentType<{ className?: string }>;
	platformIconBg: string;
	onConnect: () => void;
}

export default function AdvertisingPlatformsConnectionDialog({
	open,
	onOpenChange,
	platformName,
	platformIcon: PlatformIcon,
	platformIconBg,
	onConnect,
}: AdvertisingPlatformsConnectionDialogProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [connectionMethod, setConnectionMethod] = useState<"oauth" | "api">(
		"oauth",
	);
	const [apiKey, setApiKey] = useState("");
	const [selectedAdAccount, setSelectedAdAccount] = useState<string>("");
	const [dailyBudget, setDailyBudget] = useState("100.00");

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
		setConnectionMethod("oauth");
		setApiKey("");
		setSelectedAdAccount("");
		setDailyBudget("100.00");
		onOpenChange(false);
	};

	const isStepValid = (step: number): boolean => {
		switch (step) {
			case 1:
				return (
					connectionMethod === "oauth" ||
					(connectionMethod === "api" && apiKey.trim() !== "")
				);
			case 2:
				return selectedAdAccount !== "";
			case 3:
				return dailyBudget.trim() !== "" && parseFloat(dailyBudget) > 0;
			case 4:
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
					<ConnectionMethodStep
						platformName={platformName}
						platformIcon={PlatformIcon}
						platformIconBg={platformIconBg}
						connectionMethod={connectionMethod}
						apiKey={apiKey}
						onConnectionMethodChange={setConnectionMethod}
						onApiKeyChange={setApiKey}
					/>
				);

			case 2:
				return (
					<AdAccountSelectionStep
						selectedAdAccount={selectedAdAccount}
						onAdAccountChange={setSelectedAdAccount}
					/>
				);

			case 3:
				return (
					<BudgetConfigurationStep
						dailyBudget={dailyBudget}
						onDailyBudgetChange={setDailyBudget}
					/>
				);

			case 4:
				return <PermissionsReviewStep />;

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
								Set up advertising campaigns with {platformName}.
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				{/* Progress Indicator */}
				<ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

				{/* Step Content */}
				<div className="min-h-[250px]">{renderStepContent()}</div>

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
