"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DollarSign, Target } from "lucide-react";
import { SocialMediaAdData } from "./SocialMediaAdForm";

interface BudgetTargetingCardProps {
	budget?: SocialMediaAdData["budget"];
	onUpdate: (budget: SocialMediaAdData["budget"]) => void;
}

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

export default function BudgetTargetingCard({
	budget,
	onUpdate,
}: BudgetTargetingCardProps) {
	const handleDailyBudgetChange = (value: string) => {
		const numValue = parseFloat(value) || 0;
		onUpdate({
			...budget,
			dailyBudget: numValue,
			targetAudience: budget?.targetAudience || "Auto (Based on your guests)",
			adPlacement: budget?.adPlacement || "Automatic (Recommended)",
		});
	};

	const handleTargetAudienceChange = (value: string) => {
		onUpdate({
			...budget,
			dailyBudget: budget?.dailyBudget || 0,
			targetAudience: value,
			adPlacement: budget?.adPlacement || "Automatic (Recommended)",
		});
	};

	const handleAdPlacementChange = (value: string) => {
		onUpdate({
			...budget,
			dailyBudget: budget?.dailyBudget || 0,
			targetAudience: budget?.targetAudience || "Auto (Based on your guests)",
			adPlacement: value,
		});
	};

	return (
		<div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center gap-2">
				<DollarSign className="h-5 w-5 text-blue-600" />
				<h3 className="text-base font-semibold">Budget & Targeting</h3>
			</div>

			{/* Daily Budget */}
			<div className="space-y-2">
				<Label htmlFor="dailyBudget" className="text-sm font-semibold">
					Daily Budget
				</Label>
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
						$
					</span>
					<Input
						id="dailyBudget"
						type="number"
						min="0"
						step="0.01"
						value={budget?.dailyBudget || 0}
						onChange={(e) => handleDailyBudgetChange(e.target.value)}
						className="pl-7 bg-white dark:bg-slate-800"
					/>
				</div>
				<p className="text-xs text-muted-foreground">
					Recommended: $50-200/day for optimal reach
				</p>
			</div>

			{/* Target Audience */}
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<Target className="h-4 w-4 text-muted-foreground" />
					<Label htmlFor="targetAudience" className="text-sm font-semibold">
						Target Audience
					</Label>
				</div>
				<Select
					value={budget?.targetAudience || "Auto (Based on your guests)"}
					onValueChange={handleTargetAudienceChange}
				>
					<SelectTrigger
						id="targetAudience"
						className="w-full bg-white dark:bg-slate-800"
					>
						<SelectValue placeholder="Select target audience" />
					</SelectTrigger>
					<SelectContent>
						{TARGET_AUDIENCE_OPTIONS.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Ad Placement */}
			<div className="space-y-2">
				<Label htmlFor="adPlacement" className="text-sm font-semibold">
					Ad Placement
				</Label>
				<Select
					value={budget?.adPlacement || "Automatic (Recommended)"}
					onValueChange={handleAdPlacementChange}
				>
					<SelectTrigger
						id="adPlacement"
						className="w-full bg-white dark:bg-slate-800"
					>
						<SelectValue placeholder="Select ad placement" />
					</SelectTrigger>
					<SelectContent>
						{AD_PLACEMENT_OPTIONS.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
