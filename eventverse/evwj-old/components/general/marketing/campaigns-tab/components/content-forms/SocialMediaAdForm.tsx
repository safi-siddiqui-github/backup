"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DollarSign, Target } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import BudgetTargetingCard from "./BudgetTargetingCard";
import EstimatedResultsCard from "./EstimatedResultsCard";

// Validation schema
const socialMediaAdSchema = z.object({
	headline: z
		.string()
		.min(1, "Ad headline is required")
		.max(100, "Headline must be 100 characters or less"),
	description: z
		.string()
		.min(1, "Ad description is required")
		.max(500, "Description must be 500 characters or less"),
	callToAction: z.string(),
	destinationUrl: z
		.string()
		.min(1, "Destination URL is required")
		.url("Please enter a valid URL"),
	budget: z
		.object({
			dailyBudget: z.number().min(0, "Daily budget must be 0 or greater"),
			targetAudience: z.string(),
			adPlacement: z.string(),
		})
		.optional(),
});

export type SocialMediaAdData = z.infer<typeof socialMediaAdSchema>;

interface SocialMediaAdFormProps {
	content: SocialMediaAdData;
	onUpdate: (content: SocialMediaAdData) => void;
	platformName: string;
}

const CALL_TO_ACTION_OPTIONS = ["Learn More", "RSVP Now", "Buy Tickets"];

const TARGET_AUDIENCE_OPTIONS = [
	"Auto (Based on your guests)",
	"Custom Audience",
	"Lookalike Audience",
];

const AD_PLACEMENT_OPTIONS = [
	"Automatic (Recommended)",
	"Feed Only",
	"Stories Only",
	"Feed + Stories",
];

export default function SocialMediaAdForm({
	content,
	onUpdate,
	platformName,
}: SocialMediaAdFormProps) {
	const [errors, setErrors] = useState<
		Partial<Record<keyof SocialMediaAdData, string>>
	>({});
	const [touched, setTouched] = useState<
		Partial<Record<keyof SocialMediaAdData, boolean>>
	>({});

	const MAX_HEADLINE_LENGTH = 100;
	const MAX_DESCRIPTION_LENGTH = 500;

	// Validate a single field using Zod
	const validateField = (
		field: keyof SocialMediaAdData,
		value: any,
	): string | undefined => {
		// Create a partial schema for the specific field
		const fieldSchema = socialMediaAdSchema.shape[field];
		if (!fieldSchema) return undefined;

		const result = fieldSchema.safeParse(value);
		if (!result.success) {
			return result.error.issues[0]?.message || "Invalid value";
		}
		return undefined;
	};

	const handleHeadlineChange = (value: string) => {
		const newContent = { ...content, headline: value };
		onUpdate(newContent);

		// Validate if field has been touched
		if (touched.headline) {
			const error = validateField("headline", value);
			setErrors((prev) => ({ ...prev, headline: error }));
		}
	};

	const handleDescriptionChange = (value: string) => {
		const newContent = { ...content, description: value };
		onUpdate(newContent);

		// Validate if field has been touched
		if (touched.description) {
			const error = validateField("description", value);
			setErrors((prev) => ({ ...prev, description: error }));
		}
	};

	const handleCallToActionChange = (value: string) => {
		const newContent = { ...content, callToAction: value };
		onUpdate(newContent);
	};

	const handleDestinationUrlChange = (value: string) => {
		const newContent = { ...content, destinationUrl: value };
		onUpdate(newContent);

		// Validate if field has been touched
		if (touched.destinationUrl) {
			const error = validateField("destinationUrl", value);
			setErrors((prev) => ({ ...prev, destinationUrl: error }));
		}
	};

	const handleBudgetUpdate = (budget: SocialMediaAdData["budget"]) => {
		const newContent = { ...content, budget };
		onUpdate(newContent);
	};

	// Validate fields when they are touched or when content changes
	useEffect(() => {
		if (touched.headline) {
			const error = validateField("headline", content.headline);
			setErrors((prev) => ({ ...prev, headline: error }));
		}
		if (touched.description) {
			const error = validateField("description", content.description);
			setErrors((prev) => ({ ...prev, description: error }));
		}
		if (touched.destinationUrl) {
			const error = validateField("destinationUrl", content.destinationUrl);
			setErrors((prev) => ({ ...prev, destinationUrl: error }));
		}
	}, [
		content.headline,
		content.description,
		content.destinationUrl,
		touched.headline,
		touched.description,
		touched.destinationUrl,
	]);

	return (
		<div className="pt-4 space-y-6">
			{/* Ad Headline */}
			<div className="space-y-2">
				<Label htmlFor="headline" className="text-sm font-semibold">
					Ad Headline <span className="text-red-500">*</span>
				</Label>
				<Input
					id="headline"
					placeholder="Grab attention with a powerful headline"
					value={content.headline || ""}
					onChange={(e) => handleHeadlineChange(e.target.value)}
					onBlur={() => {
						setTouched((prev) => ({ ...prev, headline: true }));
						const error = validateField("headline", content.headline);
						setErrors((prev) => ({ ...prev, headline: error }));
					}}
					className={cn(
						touched.headline &&
							errors.headline &&
							"border-red-500 focus-visible:ring-red-500",
					)}
				/>
				<div className="flex justify-between items-center">
					{touched.headline && errors.headline && (
						<p className="text-xs text-red-500">{errors.headline}</p>
					)}
					<p
						className={cn(
							"text-xs ml-auto",
							(content.headline?.length || 0) > MAX_HEADLINE_LENGTH
								? "text-red-500"
								: "text-muted-foreground",
						)}
					>
						{content.headline?.length || 0}/{MAX_HEADLINE_LENGTH} characters
					</p>
				</div>
			</div>

			{/* Ad Description */}
			<div className="space-y-2">
				<Label htmlFor="description" className="text-sm font-semibold">
					Ad Description <span className="text-red-500">*</span>
				</Label>
				<Textarea
					id="description"
					placeholder="Describe your event and why people should attend..."
					value={content.description || ""}
					onChange={(e) => handleDescriptionChange(e.target.value)}
					onBlur={() => {
						setTouched((prev) => ({ ...prev, description: true }));
						const error = validateField("description", content.description);
						setErrors((prev) => ({ ...prev, description: error }));
					}}
					className={cn(
						"min-h-[100px] resize-y",
						touched.description &&
							errors.description &&
							"border-red-500 focus-visible:ring-red-500",
					)}
				/>
				{touched.description && errors.description && (
					<p className="text-xs text-red-500">{errors.description}</p>
				)}
			</div>

			{/* Call to Action Button */}
			<div className="space-y-2">
				<Label htmlFor="callToAction" className="text-sm font-semibold">
					Call to Action Button
				</Label>
				<Select
					value={content.callToAction || "Learn More"}
					onValueChange={handleCallToActionChange}
				>
					<SelectTrigger
						id="callToAction"
						className="w-full bg-white dark:bg-slate-800"
					>
						<SelectValue placeholder="Select call to action" />
					</SelectTrigger>
					<SelectContent>
						{CALL_TO_ACTION_OPTIONS.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Destination URL */}
			<div className="space-y-2">
				<Label htmlFor="destinationUrl" className="text-sm font-semibold">
					Destination URL <span className="text-red-500">*</span>
				</Label>
				<Input
					id="destinationUrl"
					type="url"
					placeholder="https://your-event-page.com"
					value={content.destinationUrl || ""}
					onChange={(e) => handleDestinationUrlChange(e.target.value)}
					onBlur={() => {
						setTouched((prev) => ({ ...prev, destinationUrl: true }));
						const error = validateField(
							"destinationUrl",
							content.destinationUrl,
						);
						setErrors((prev) => ({ ...prev, destinationUrl: error }));
					}}
					className={cn(
						touched.destinationUrl &&
							errors.destinationUrl &&
							"border-red-500 focus-visible:ring-red-500",
					)}
				/>
				{touched.destinationUrl && errors.destinationUrl && (
					<p className="text-xs text-red-500">{errors.destinationUrl}</p>
				)}
			</div>

			{/* Budget & Targeting Card */}
			<BudgetTargetingCard
				budget={content.budget}
				onUpdate={handleBudgetUpdate}
			/>

			{/* Estimated Results Card */}
			<EstimatedResultsCard dailyBudget={content.budget?.dailyBudget || 0} />
		</div>
	);
}
