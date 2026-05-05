"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

type ReportOrganizerDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	organizerName: string;
};

const REPORT_REASONS = [
	{
		value: "inappropriate-content",
		label: "Inappropriate Content",
		description: "Contains offensive, harmful, or inappropriate material",
	},
	{
		value: "spam",
		label: "Spam or Scam",
		description: "Suspected spam, fake events, or fraudulent activity",
	},
	{
		value: "harassment",
		label: "Harassment or Bullying",
		description: "Engaging in harassment, bullying, or abusive behavior",
	},
	{
		value: "fake-profile",
		label: "Fake Profile",
		description: "Impersonating someone else or using false information",
	},
	{
		value: "other",
		label: "Other",
		description: "Something else that violates our community guidelines",
	},
];

export default function ReportOrganizerDialog({
	open,
	onOpenChange,
	organizerName,
}: ReportOrganizerDialogProps) {
	const [selectedReason, setSelectedReason] = useState<string>("");
	const [additionalDetails, setAdditionalDetails] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (!selectedReason) {
			return;
		}

		setIsSubmitting(true);
		try {
			// TODO: Implement actual report submission
			console.log("Report submitted:", {
				organizerName,
				reason: selectedReason,
				details: additionalDetails,
			});

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Reset form and close dialog
			setSelectedReason("");
			setAdditionalDetails("");
			onOpenChange(false);
		} catch (error) {
			console.error("Failed to submit report:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		setSelectedReason("");
		setAdditionalDetails("");
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
							<AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
						</div>
						<div>
							<DialogTitle>Report Organizer</DialogTitle>
							<DialogDescription>
								Help us understand what's wrong with {organizerName}'s profile
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="space-y-6 py-4">
					<div className="space-y-3">
						<Label className="text-base font-semibold">What's the issue?</Label>
						<RadioGroup
							value={selectedReason}
							onValueChange={setSelectedReason}
							className="space-y-3"
						>
							{REPORT_REASONS.map((reason) => (
								<div
									key={reason.value}
									className="flex items-start space-x-3 rounded-lg border border-slate-200 dark:border-slate-700 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
								>
									<RadioGroupItem
										value={reason.value}
										id={reason.value}
										className="mt-1"
									/>
									<div className="flex-1">
										<Label
											htmlFor={reason.value}
											className="font-medium cursor-pointer"
										>
											{reason.label}
										</Label>
										<p className="text-sm text-muted-foreground mt-1">
											{reason.description}
										</p>
									</div>
								</div>
							))}
						</RadioGroup>
					</div>

					<div className="space-y-2">
						<Label htmlFor="details" className="text-base font-semibold">
							Additional Details (Optional)
						</Label>
						<Textarea
							id="details"
							placeholder="Please provide any additional information that might help us understand the issue..."
							value={additionalDetails}
							onChange={(e) => setAdditionalDetails(e.target.value)}
							className="min-h-[100px] resize-none"
							maxLength={500}
						/>
						<p className="text-xs text-muted-foreground text-right">
							{additionalDetails.length}/500
						</p>
					</div>
				</div>

				<DialogFooter className="gap-2">
					<Button
						variant="outline"
						onClick={handleCancel}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={!selectedReason || isSubmitting}
						className="bg-red-600 hover:bg-red-700 text-white"
					>
						{isSubmitting ? "Submitting..." : "Submit Report"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
