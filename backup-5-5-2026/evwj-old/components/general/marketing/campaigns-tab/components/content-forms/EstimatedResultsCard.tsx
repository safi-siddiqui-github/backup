"use client";

import { TrendingUp } from "lucide-react";

interface EstimatedResultsCardProps {
	dailyBudget: number;
}

export default function EstimatedResultsCard({
	dailyBudget,
}: EstimatedResultsCardProps) {
	// Calculate estimated results based on daily budget
	// These are mock calculations - adjust based on your actual algorithm
	const calculateEstimates = (budget: number) => {
		if (budget === 0) {
			return {
				dailyReach: { min: 0, max: 0 },
				costPerClick: { min: 0, max: 0 },
				expectedClicks: { min: 0, max: 0 },
				estConversions: { min: 0, max: 0 },
			};
		}

		// Rough estimates (adjust these formulas based on your needs)
		const reachPerDollar = 30; // Estimated reach per dollar
		const clicksPerDollar = 0.5; // Estimated clicks per dollar
		const conversionRate = 0.1; // 10% conversion rate

		const dailyReach = {
			min: Math.round(budget * reachPerDollar * 0.5),
			max: Math.round(budget * reachPerDollar * 1.0),
		};

		const expectedClicks = {
			min: Math.round(budget * clicksPerDollar * 0.5),
			max: Math.round(budget * clicksPerDollar * 1.0),
		};

		const costPerClick = {
			min:
				expectedClicks.max > 0
					? parseFloat((budget / expectedClicks.max).toFixed(2))
					: 0,
			max:
				expectedClicks.min > 0
					? parseFloat((budget / expectedClicks.min).toFixed(2))
					: 0,
		};

		const estConversions = {
			min: Math.round(expectedClicks.min * conversionRate),
			max: Math.round(expectedClicks.max * conversionRate),
		};

		return {
			dailyReach,
			costPerClick,
			expectedClicks,
			estConversions,
		};
	};

	const estimates = calculateEstimates(dailyBudget);

	return (
		<div className="bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
			{/* Header */}
			<div className="flex items-center gap-2 mb-6">
				<TrendingUp className="h-5 w-5 text-blue-600" />
				<h3 className="text-base font-semibold">Estimated Results</h3>
			</div>

			{/* Metrics Grid */}
			<div className="grid grid-cols-2 gap-6">
				{/* Daily Reach */}
				<div>
					<p className="text-sm text-muted-foreground mb-1">Daily Reach</p>
					<p className="text-lg font-bold">
						{estimates.dailyReach.min.toLocaleString()} -{" "}
						{estimates.dailyReach.max.toLocaleString()}
					</p>
				</div>

				{/* Cost Per Click */}
				<div>
					<p className="text-sm text-muted-foreground mb-1">Cost Per Click</p>
					<p className="text-lg font-bold">
						${estimates.costPerClick.min.toFixed(2)} - $
						{estimates.costPerClick.max.toFixed(2)}
					</p>
				</div>

				{/* Expected Clicks */}
				<div>
					<p className="text-sm text-muted-foreground mb-1">Expected Clicks</p>
					<p className="text-lg font-bold">
						{estimates.expectedClicks.min} - {estimates.expectedClicks.max}
					</p>
				</div>

				{/* Est. Conversions */}
				<div>
					<p className="text-sm text-muted-foreground mb-1">Est. Conversions</p>
					<p className="text-lg font-bold">
						{estimates.estConversions.min} - {estimates.estConversions.max}
					</p>
				</div>
			</div>
		</div>
	);
}
