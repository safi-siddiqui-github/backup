"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, Sparkles } from "lucide-react";
import BudgetPlanningView from "./BudgetPlanningView";

interface BudgetTabContentProps {
	onCommit?: () => void;
	isPlanningMode?: boolean;
	onPlanningModeChange?: (value: boolean) => void;
	totalBudget?: string;
	onTotalBudgetChange?: (value: string) => void;
	isBudgetCommitted?: boolean;
	onUncommit?: () => void;
}

export default function BudgetTabContent({
	onCommit,
	isPlanningMode: externalIsPlanningMode,
	onPlanningModeChange,
	totalBudget: externalTotalBudget,
	onTotalBudgetChange,
	isBudgetCommitted = false,
	onUncommit,
}: BudgetTabContentProps) {
	// Use external state if provided, otherwise fall back to local state
	const [localTotalBudget, setLocalTotalBudget] = useState("0");
	const [localIsPlanningMode, setLocalIsPlanningMode] = useState(false);

	const totalBudget = externalTotalBudget ?? localTotalBudget;
	const isPlanningMode = externalIsPlanningMode ?? localIsPlanningMode;

	const setTotalBudget = (value: string) => {
		if (onTotalBudgetChange) {
			onTotalBudgetChange(value);
		} else {
			setLocalTotalBudget(value);
		}
	};

	const setIsPlanningMode = (value: boolean) => {
		if (onPlanningModeChange) {
			onPlanningModeChange(value);
		} else {
			setLocalIsPlanningMode(value);
		}
	};

	const [showRecommendation, setShowRecommendation] = useState(true);

	const handleUseRecommendation = () => {
		setTotalBudget("22500");
		setShowRecommendation(false);
	};

	const handleStartPlanning = () => {
		if (totalBudget && parseFloat(totalBudget) > 0) {
			// Ensure totalBudget is synced to parent before starting planning
			setTotalBudget(totalBudget);
			setIsPlanningMode(true);
		}
	};

	const handleBackToSetup = () => {
		// Don't allow going back to step-1 if budget is committed
		if (isBudgetCommitted) {
			return;
		}
		setIsPlanningMode(false);
	};

	const shouldShowPlanningView = isBudgetCommitted || isPlanningMode;

	if (shouldShowPlanningView) {
		return (
			<BudgetPlanningView
				totalBudget={parseFloat(totalBudget)}
				onBack={isBudgetCommitted ? undefined : handleBackToSetup}
				onCommit={onCommit}
				isBudgetCommitted={isBudgetCommitted}
				onUncommit={onUncommit}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Consolidated Budget Setup Card */}
			<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="rounded-md bg-blue-600 p-2">
							<Calculator className="h-5 w-5 text-white" />
						</div>
						<div className="flex flex-col">
							<CardTitle>Set Your Event Budget</CardTitle>
							<p className="text-sm text-muted-foreground">
								Get started with AI-powered budget recommendations
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					{/* Event Info */}
					<div className="grid grid-cols-3 gap-4 rounded-md border p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						<div className="flex flex-col">
							<span className="text-xs text-muted-foreground mb-1">
								Event Type
							</span>
							<span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
								Wedding
							</span>
						</div>
						<div className="flex flex-col">
							<span className="text-xs text-muted-foreground mb-1">Guests</span>
							<span className="text-sm font-semibold">100</span>
						</div>
						<div className="flex flex-col">
							<span className="text-xs text-muted-foreground mb-1">Date</span>
							<span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
								01/01/2026
							</span>
						</div>
					</div>

					{/* Budget Input */}
					<div className="flex flex-col gap-4">
						<div>
							<label className="text-sm font-semibold tracking-tight mb-2 block">
								Total Event Budget
							</label>
							<div className="flex items-center gap-4">
								<div className="flex-1">
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-semibold text-muted-foreground">
											$
										</span>
										<Input
											type="number"
											value={totalBudget}
											onChange={(e) => setTotalBudget(e.target.value)}
											className="h-12 pl-8 text-xl font-semibold"
											placeholder="20000"
										/>
									</div>
								</div>
								<Button
									size="lg"
									className="h-12 px-6"
									onClick={handleStartPlanning}
									disabled={!totalBudget || parseFloat(totalBudget) <= 0}
								>
									<Calculator className="mr-2 h-4 w-4" />
									Start Planning
								</Button>
							</div>
						</div>

						{/* AI Recommendation */}
						{showRecommendation && (
							<div className="rounded-md border border-green-200 dark:border-green-800 !bg-green-50 dark:!bg-green-950/20 p-4">
								<div className="flex items-start gap-3">
									<div className="rounded-md bg-green-600 p-2">
										<Sparkles className="h-4 w-4 text-white" />
									</div>
									<div className="flex-1">
										<div className="mb-2 flex items-center gap-2">
											<h3 className="text-sm font-semibold text-green-900 dark:text-green-100">
												AI Recommendation
											</h3>
											<Badge
												variant="secondary"
												className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs"
											>
												<Sparkles className="mr-1 h-3 w-3" />
												AI
											</Badge>
										</div>
										<p className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
											$22,500
										</p>
										<p className="mb-3 text-xs text-green-700 dark:text-green-300">
											Based on 100 guests and wedding industry standards
										</p>
										<Button
											onClick={handleUseRecommendation}
											variant="default"
											size="sm"
											className="bg-green-600 hover:bg-green-700 text-xs h-8"
										>
											Use Recommendation
										</Button>
									</div>
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
