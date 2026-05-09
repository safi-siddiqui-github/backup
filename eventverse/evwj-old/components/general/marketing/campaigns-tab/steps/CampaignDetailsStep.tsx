"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { CampaignData } from "../CreateCampaignDialog";

interface CampaignDetailsStepProps {
	data: CampaignData;
	onUpdate: (data: Partial<CampaignData>) => void;
}

export default function CampaignDetailsStep({
	data,
	onUpdate,
}: CampaignDetailsStepProps) {
	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="text-center space-y-3">
				<div className="flex justify-center">
					<Sparkles className="h-12 w-12 text-blue-600" />
				</div>
				<h2 className="text-2xl font-bold">Let's Create Something Amazing</h2>
				<p className="text-muted-foreground">
					Start by giving your campaign a memorable name
				</p>
			</div>

			{/* Form Fields */}
			<div className="space-y-6 mx-auto">
				{/* Campaign Name */}
				<div className="space-y-2.5">
					<Label htmlFor="campaign-name" className="text-sm font-semibold">
						CAMPAIGN NAME <span className="text-red-500">*</span>
					</Label>
					<Input
						id="campaign-name"
						placeholder="Enter campaign name"
						value={data.name}
						onChange={(e) => onUpdate({ name: e.target.value })}
						className={
							data.name.trim().length === 0
								? "border-red-200 focus:border-red-500"
								: ""
						}
					/>
					<p className="text-xs text-muted-foreground">
						{data.name.length}/100 characters
					</p>
					{data.name.trim().length === 0 && (
						<p className="text-xs text-red-500">Campaign name is required</p>
					)}
				</div>

				{/* Description */}
				<div className="space-y-2.5">
					<Label htmlFor="description" className="text-sm font-semibold">
						DESCRIPTION
					</Label>
					<Textarea
						id="description"
						placeholder="Describe your campaign goals and target audience"
						value={data.description}
						onChange={(e) => onUpdate({ description: e.target.value })}
						rows={5}
						className="resize-none"
					/>
					<p className="text-xs text-muted-foreground">
						What makes this campaign special? What's the goal?
					</p>
				</div>
			</div>
		</div>
	);
}
