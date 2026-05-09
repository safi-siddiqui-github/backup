"use client";

import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import InfoBanner from "../../../common/InfoBanner";

interface BudgetConfigurationStepProps {
	dailyBudget: string;
	onDailyBudgetChange: (budget: string) => void;
}

export default function BudgetConfigurationStep({
	dailyBudget,
	onDailyBudgetChange,
}: BudgetConfigurationStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner icon={DollarSign}>
				Configure default budget limits and targeting options.
			</InfoBanner>

			<div className="space-y-2.5">
				<label htmlFor="daily-budget" className="text-sm font-medium">
					Daily Budget Limit
				</label>
				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
						$
					</span>
					<Input
						id="daily-budget"
						type="number"
						step="0.01"
						min="0"
						placeholder="100.00"
						value={dailyBudget}
						onChange={(e) => onDailyBudgetChange(e.target.value)}
						className="pl-7"
					/>
				</div>
			</div>

			<div className="space-y-3 mt-6">
				<label className="text-sm font-medium">Default Targeting</label>
				<div className="mt-4 p-4 border rounded-md space-y-2 bg-muted/50">
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Age Range:</span>
						<span className="text-sm font-medium">18-65+</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Locations:</span>
						<span className="text-sm font-medium">All Regions</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Interests:</span>
						<span className="text-sm font-medium">Events, Entertainment</span>
					</div>
				</div>
			</div>
		</div>
	);
}
