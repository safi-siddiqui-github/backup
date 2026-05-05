"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { BudgetItem } from "./BudgetPlanningView";

interface AIRecommendationsProps {
	totalBudget: number;
	remainingBudget: number;
	onAddItem: (item: BudgetItem) => boolean;
	selectedItems: BudgetItem[];
}

export default function AIRecommendations({
	totalBudget,
	remainingBudget,
	onAddItem,
	selectedItems,
}: AIRecommendationsProps) {
	// AI Recommended budget items based on wedding industry standards
	const recommendations: Omit<BudgetItem, "id">[] = [
		{
			category: "Venue",
			title: "Venue for Wedding",
			description: "Reception and ceremony venues",
			estimatedCost: 7000,
			percentageOfBudget: 35,
			priority: "high",
			isAIRecommended: true,
		},
		{
			category: "Catering",
			title: "Catering for Wedding",
			description: "Food, beverages, and service",
			estimatedCost: 8000,
			percentageOfBudget: 40,
			priority: "high",
			isAIRecommended: true,
		},
		{
			category: "Photography",
			title: "Photography & Videography",
			description: "Professional photo and video coverage",
			estimatedCost: 2000,
			percentageOfBudget: 10,
			priority: "high",
			isAIRecommended: true,
		},
		{
			category: "Decoration",
			title: "Decoration & Flowers",
			description: "Floral arrangements and venue decoration",
			estimatedCost: 1500,
			percentageOfBudget: 7.5,
			priority: "medium",
			isAIRecommended: true,
		},
		{
			category: "Entertainment",
			title: "Entertainment & Music",
			description: "DJ, band, or live entertainment",
			estimatedCost: 1500,
			percentageOfBudget: 7.5,
			priority: "medium",
			isAIRecommended: true,
		},
	];

	const canAffordItem = (cost: number) => {
		return remainingBudget >= cost;
	};

	const isItemAdded = (recommendation: Omit<BudgetItem, "id">) => {
		return selectedItems.some(
			(item) =>
				item.title === recommendation.title &&
				item.category === recommendation.category &&
				item.estimatedCost === recommendation.estimatedCost &&
				item.isAIRecommended === true,
		);
	};

	const handleAddTobudget = (recommendation: Omit<BudgetItem, "id">) => {
		// Prevent adding if insufficient budget
		if (!canAffordItem(recommendation.estimatedCost)) {
			toast.error("Insufficient Budget", {
				description: `Cannot add ${recommendation.title}. You need $${recommendation.estimatedCost.toLocaleString()} but only have $${remainingBudget.toLocaleString()} remaining. Remove other items first.`,
				duration: 5000,
			});
			return;
		}

		const newItem: BudgetItem = {
			...recommendation,
			id: `ai-${Date.now()}-${Math.random()}`,
		};
		const success = onAddItem(newItem);

		if (success) {
			// Show success toast
			toast.success("Item Added", {
				description: `${recommendation.title} ($${recommendation.estimatedCost.toLocaleString()}) added to your budget.`,
				duration: 3000,
			});
		}
	};

	return (
		<div className="space-y-4">
			{/* AI Recommendations List */}
			<div className="space-y-4">
				{recommendations.map((recommendation, index) => {
					const canAfford = canAffordItem(recommendation.estimatedCost);
					const isAdded = isItemAdded(recommendation);
					const isDisabled = !canAfford;

					return (
						<Card
							key={index}
							className={`transition-all ${
								canAfford
									? "border-accent/50 bg-white dark:border-zinc-700 dark:bg-[#020617]"
									: "border-zinc-200 bg-white/80 dark:border-zinc-700 dark:bg-[#020617]/60 opacity-60"
							}`}
						>
							<CardContent className="p-6">
								<div className="flex items-start justify-between gap-4">
									{/* Left Content */}
									<div className="flex-1 space-y-3">
										{/* Category and Badge */}
										<div className="flex items-center gap-2">
											<Badge
												variant={
													recommendation.priority === "high"
														? "destructive"
														: "secondary"
												}
												className={
													recommendation.priority === "high"
														? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
														: ""
												}
											>
												{recommendation.priority === "high" ? "High" : "Medium"}
											</Badge>
											<Badge
												variant="outline"
												className="bg-accent/50 text-green-700 border-green-200"
											>
												{recommendation.percentageOfBudget}% of budget
											</Badge>
										</div>

										{/* Title */}
										<h3 className="text-lg font-semibold">
											{recommendation.title}
										</h3>

										{/* Description */}
										<p className="text-sm text-muted-foreground">
											{recommendation.description}
										</p>

										{/* AI Insight */}
										<div className="flex items-start gap-2 rounded-lg bg-accent/50 p-3 dark:bg-accent/50">
											<Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
											<p className="text-xs text-black dark:text-gray-300">
												<span className="font-semibold">AI Insight:</span> Based
												on wedding industry standards,{" "}
												{recommendation.category.toLowerCase()} typically
												accounts for {recommendation.percentageOfBudget}% of the
												total budget. This allocation ensures balanced spending
												across all essential categories.
											</p>
										</div>
									</div>

									{/* Right Content - Price and Button */}
									<div className="flex flex-col items-end gap-3">
										<div className="text-right">
											<div className="flex items-center gap-2 justify-end mb-1">
												<p className="text-2xl font-bold text-green-600">
													${recommendation.estimatedCost.toLocaleString()}
												</p>
												{isAdded && (
													<Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-base px-3 py-1.5 font-semibold">
														Added
													</Badge>
												)}
											</div>
											<p className="text-xs text-muted-foreground">Estimated</p>
										</div>

										<Button
											onClick={() => handleAddTobudget(recommendation)}
											disabled={isDisabled}
											className={
												!canAfford
													? "bg-red-600 hover:bg-red-600 opacity-60 cursor-not-allowed"
													: "bg-blue-600 hover:bg-blue-700"
											}
										>
											{!canAfford ? (
												<>
													<svg
														className="mr-2 h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
													Insufficient Budget
												</>
											) : (
												<>
													<svg
														className="mr-2 h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 4v16m8-8H4"
														/>
													</svg>
													Add to Budget
												</>
											)}
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
