"use client";

import { DollarSign } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import InfoBanner from "../../../common/InfoBanner";
import Checklist from "../../../common/Checklist";
import { PRICING_TIERS, PRICING_FEATURES } from "../types";

interface PricingTierStepProps {
	selectedPricingTier: string;
	onPricingTierChange: (tierId: string) => void;
}

export default function PricingTierStep({
	selectedPricingTier,
	onPricingTierChange,
}: PricingTierStepProps) {
	const selectedTier = PRICING_TIERS.find(
		(tier) => tier.id === selectedPricingTier,
	);

	return (
		<div className="space-y-4">
			<InfoBanner icon={DollarSign}>
				Select your pricing tier based on expected volume.
			</InfoBanner>

			<div className="space-y-2.5">
				<label htmlFor="pricing-tier" className="text-sm font-medium">
					Pricing Tier
				</label>
				<Select value={selectedPricingTier} onValueChange={onPricingTierChange}>
					<SelectTrigger id="pricing-tier" className="w-full">
						<SelectValue placeholder="Select pricing tier" />
					</SelectTrigger>
					<SelectContent>
						{PRICING_TIERS.map((tier) => (
							<SelectItem key={tier.id} value={tier.id}>
								{tier.name} ({tier.range}) - {tier.price}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="mt-6">
				<Checklist items={PRICING_FEATURES} />
			</div>
		</div>
	);
}
