"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import CampaignDetailsStep from "./steps/CampaignDetailsStep";
import ChooseChannelsStep from "./steps/ChooseChannelsStep";
import SelectAudienceStep from "./steps/SelectAudienceStep";
import CreateContentStep from "./steps/CreateContentStep";
import ReviewLaunchStep from "./steps/ReviewLaunchStep";
import StepIndicator from "./components/StepIndicator";
import { validateAllChannelContent } from "./utils/validationUtils";

interface CreateCampaignDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export interface CampaignData {
	name: string;
	description: string;
	selectedChannels: {
		directMessaging: string[];
		socialMediaPosts: string[];
		socialMediaAds: string[];
	};
	selectedSegments: string[];
	content: {
		[key: string]: any;
	};
}

export default function CreateCampaignDialog({
	open,
	onOpenChange,
}: CreateCampaignDialogProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [campaignData, setCampaignData] = useState<CampaignData>({
		name: "",
		description: "",
		selectedChannels: {
			directMessaging: [],
			socialMediaPosts: [],
			socialMediaAds: [],
		},
		selectedSegments: [],
		content: {},
	});

	// Determine if we need the audience selection step
	const hasDirectMessaging =
		campaignData.selectedChannels.directMessaging.length > 0;

	// Calculate total steps (4 or 5 depending on whether audience selection is needed)
	const totalSteps = hasDirectMessaging ? 5 : 4;

	// Map logical steps to actual step numbers
	const getStepNumber = (logicalStep: string) => {
		if (!hasDirectMessaging) {
			// Without audience step: Details(1), Channels(2), Content(3), Review(4)
			const stepMap: { [key: string]: number } = {
				details: 1,
				channels: 2,
				content: 3,
				review: 4,
			};
			return stepMap[logicalStep];
		} else {
			// With audience step: Details(1), Channels(2), Audience(3), Content(4), Review(5)
			const stepMap: { [key: string]: number } = {
				details: 1,
				channels: 2,
				audience: 3,
				content: 4,
				review: 5,
			};
			return stepMap[logicalStep];
		}
	};

	const updateCampaignData = (data: Partial<CampaignData>) => {
		setCampaignData((prev) => ({ ...prev, ...data }));
	};

	const canProceedFromCurrentStep = () => {
		switch (currentStep) {
			case getStepNumber("details"):
				return campaignData.name.trim().length > 0;
			case getStepNumber("channels"):
				const totalSelected =
					campaignData.selectedChannels.directMessaging.length +
					campaignData.selectedChannels.socialMediaPosts.length +
					campaignData.selectedChannels.socialMediaAds.length;
				return totalSelected > 0;
			case getStepNumber("audience"):
				return campaignData.selectedSegments.length > 0;
			case getStepNumber("content"):
				// Validate all selected channels have their required content filled
				const isValid = validateAllChannelContent(campaignData);
				return isValid;
			case getStepNumber("review"):
				return true;
			default:
				return false;
		}
	};

	const handleNext = () => {
		if (canProceedFromCurrentStep()) {
			setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
		}
	};

	const handleBack = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	};

	const handleClose = () => {
		setCurrentStep(1);
		setCampaignData({
			name: "",
			description: "",
			selectedChannels: {
				directMessaging: [],
				socialMediaPosts: [],
				socialMediaAds: [],
			},
			selectedSegments: [],
			content: {},
		});
		onOpenChange(false);
	};

	const renderStepContent = () => {
		if (currentStep === getStepNumber("details")) {
			return (
				<CampaignDetailsStep
					data={campaignData}
					onUpdate={updateCampaignData}
				/>
			);
		} else if (currentStep === getStepNumber("channels")) {
			return (
				<ChooseChannelsStep data={campaignData} onUpdate={updateCampaignData} />
			);
		} else if (
			currentStep === getStepNumber("audience") &&
			hasDirectMessaging
		) {
			return (
				<SelectAudienceStep data={campaignData} onUpdate={updateCampaignData} />
			);
		} else if (currentStep === getStepNumber("content")) {
			return (
				<CreateContentStep data={campaignData} onUpdate={updateCampaignData} />
			);
		} else if (currentStep === getStepNumber("review")) {
			return (
				<ReviewLaunchStep data={campaignData} onUpdate={updateCampaignData} />
			);
		}
		return null;
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-260! max-h-[90vh] overflow-hidden flex flex-col p-0">
				{/* Header */}
				<DialogHeader className="px-6 pt-6 pb-4 border-b">
					<div className="flex items-start justify-between">
						<div>
							<DialogTitle className="text-2xl font-bold">
								Create Marketing Campaign
							</DialogTitle>
							<DialogDescription className="mt-1">
								Launch multi-channel campaigns to reach your guests
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				{/* Step Indicator */}
				<div className="px-6 pt-4">
					<StepIndicator
						currentStep={currentStep}
						totalSteps={totalSteps}
						hasAudienceStep={hasDirectMessaging}
					/>
				</div>

				{/* Step Content */}
				<div className="flex-1 overflow-y-auto px-6 py-6">
					{renderStepContent()}
				</div>

				{/* Footer */}
				<div className="border-t px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-slate-800/50">
					<Button
						variant="outline"
						onClick={handleBack}
						disabled={currentStep === 1}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</Button>
					<div className="flex items-center gap-3">
						<Button variant="ghost" onClick={handleClose}>
							Cancel
						</Button>
						<Button
							onClick={handleNext}
							disabled={!canProceedFromCurrentStep()}
							className={
								currentStep === totalSteps
									? "bg-green-600 hover:bg-green-700"
									: "bg-blue-600 hover:bg-blue-700"
							}
						>
							{currentStep === totalSteps ? "Launch Campaign" : "Next"}
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
