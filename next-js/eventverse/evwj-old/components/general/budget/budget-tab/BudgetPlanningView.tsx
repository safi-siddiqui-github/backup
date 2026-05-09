"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Plus, Edit, Trash2, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";
import AIRecommendations from "./AIRecommendations";
import CustomExpenseForm from "./CustomExpenseForm";
import EditItemDialog from "./EditItemDialog";
import DeleteItemDialog from "./DeleteItemDialog";
import CommitBudgetModal from "./CommitBudgetModal";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

export interface BudgetItem {
	id: string;
	category: string;
	title: string;
	description?: string;
	requirements?: string[];
	estimatedCost: number;
	priority?: "high" | "medium" | "low";
	isAIRecommended?: boolean;
	percentageOfBudget?: number;
}

interface BudgetPlanningViewProps {
	totalBudget: number;
	onBack?: () => void;
	onCommit?: () => void;
	isBudgetCommitted?: boolean;
	onUncommit?: () => void;
}

export default function BudgetPlanningView({
	totalBudget,
	onBack,
	onCommit,
	isBudgetCommitted = false,
	onUncommit,
}: BudgetPlanningViewProps) {
	const [selectedItems, setSelectedItems] = useState<BudgetItem[]>([]);
	const [activeTab, setActiveTab] = useState<"ai" | "custom">("ai");
	const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
	const [deletingItem, setDeletingItem] = useState<BudgetItem | null>(null);
	const [commitModalOpen, setCommitModalOpen] = useState(false);
	const [uncommitDialogOpen, setUncommitDialogOpen] = useState(false);
	const [actualCost, setActualCost] = useState(0); // Track actual spending

	// Calculate totals
	const allocatedAmount = selectedItems.reduce(
		(sum, item) => sum + item.estimatedCost,
		0,
	);
	const remainingAmount = totalBudget - allocatedAmount;
	const usagePercentage = (allocatedAmount / totalBudget) * 100;
	const actualUsagePercentage = (actualCost / totalBudget) * 100;

	const handleAddItem = (item: BudgetItem) => {
		if (isBudgetCommitted) {
			toast.info("Budget Locked", {
				description:
					"Unlock your budget before making changes to expense items.",
				duration: 3000,
			});
			return false;
		}
		// Check if adding this item would exceed budget
		const newTotal = allocatedAmount + item.estimatedCost;
		if (newTotal > totalBudget) {
			// Don't add the item if it exceeds budget
			return false;
		}
		setSelectedItems([...selectedItems, item]);
		return true;
	};

	const handleEditItem = (updatedItem: BudgetItem) => {
		if (isBudgetCommitted) {
			toast.info("Budget Locked", {
				description: "Unlock your budget before editing expense items.",
				duration: 3000,
			});
			return;
		}
		const oldItem = selectedItems.find((item) => item.id === updatedItem.id);

		setSelectedItems(
			selectedItems.map((item) =>
				item.id === updatedItem.id ? updatedItem : item,
			),
		);
		setEditingItem(null);

		// Show success toast
		if (oldItem) {
			const costDiff = updatedItem.estimatedCost - oldItem.estimatedCost;
			toast.success("Item Updated", {
				description: `${updatedItem.title} updated. ${
					costDiff > 0
						? `Cost increased by $${Math.abs(costDiff).toLocaleString()}`
						: costDiff < 0
							? `Cost decreased by $${Math.abs(costDiff).toLocaleString()}`
							: "Cost unchanged"
				}.`,
				duration: 3000,
			});
		}
	};

	const handleRemoveItem = (itemId: string) => {
		if (isBudgetCommitted) {
			toast.info("Budget Locked", {
				description: "Unlock your budget before removing expense items.",
				duration: 3000,
			});
			return;
		}
		const item = selectedItems.find((i) => i.id === itemId);

		setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
		setDeletingItem(null);

		// Show success toast
		if (item) {
			toast.success("Item Removed", {
				description: `${item.title} ($${item.estimatedCost.toLocaleString()}) removed from your budget.`,
				duration: 3000,
			});
		}
	};

	const handleCommitBudget = () => {
		// Check if all items have description and requirements
		const itemsWithMissingFields = selectedItems.filter(
			(item) => !item.description || !item.requirements || item.requirements.length === 0
		);

		if (itemsWithMissingFields.length > 0) {
			toast.error("Cannot Commit Budget", {
				description: `Please complete description and requirements for all items before committing. ${itemsWithMissingFields.length} item(s) are missing required information.`,
				duration: 5000,
			});
			return;
		}

		setCommitModalOpen(true);
	};

	const handleConfirmCommit = () => {
		if (onCommit) {
			onCommit();
			toast.success("Budget Committed!", {
				description: `Your budget of $${totalBudget.toLocaleString()} with ${selectedItems.length} expense items is now visible to vendors.`,
				duration: 4000,
			});
		}
	};

	const handleConfirmUncommit = () => {
		setUncommitDialogOpen(false);
		if (onUncommit) {
			onUncommit();
			toast.success("Budget Unlocked", {
				description:
					"Your budget is unlocked. You can make changes again before recommitting.",
				duration: 3000,
			});
		}
	};

	return (
		<div className="space-y-6">
			{/* Committed Budget Success Banner */}
			<Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
				<CardContent className="flex items-center justify-between py-4">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
							<svg
								className="h-6 w-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
								${totalBudget.toLocaleString()}
							</h3>
							<p className="text-sm text-green-700 dark:text-green-300">
								Total Event Budget
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{isBudgetCommitted ? (
							<>
								<Button
									variant="outline"
									size="sm"
									className="border-green-600 text-green-600"
									disabled
								>
									<Lock className="mr-2 h-4 w-4" />
									Budget Locked
								</Button>
								{onUncommit && (
									<Button
										variant="destructive"
										size="sm"
										onClick={() => setUncommitDialogOpen(true)}
										className="bg-red-600 hover:bg-red-700 text-white"
									>
										<Unlock className="mr-2 h-4 w-4" />
										Uncommit Budget
									</Button>
								)}
							</>
						) : (
							onBack && (
								<Button
									variant="outline"
									size="sm"
									onClick={onBack}
									className="border-green-600 text-green-600 hover:bg-green-100"
								>
									Edit Budget
								</Button>
							)
						)}
					</div>
				</CardContent>
			</Card>

			{/* Budget Progress Bar */}
			<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardContent className="pt-6">
					<div className="space-y-4">
						{/* Stats Row */}
						<div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
							<div>
								<p className="text-2xl font-bold text-blue-600">
									${totalBudget.toLocaleString()}
								</p>
								<p className="text-xs text-muted-foreground">Total Budget</p>
							</div>
							<div>
								<p className="text-2xl font-bold text-purple-600">
									${allocatedAmount.toLocaleString()}
								</p>
								<p className="text-xs text-muted-foreground">Planned</p>
							</div>
							<div>
								<p className="text-2xl font-bold text-orange-600">
									${actualCost.toLocaleString()}
								</p>
								<p className="text-xs text-muted-foreground">Actual Cost</p>
							</div>
							<div>
								<p className="text-2xl font-bold text-green-600">
									${remainingAmount.toLocaleString()}
								</p>
								<p className="text-xs text-muted-foreground">Remaining</p>
							</div>
							<div>
								<p className="text-2xl font-bold text-cyan-600">
									{usagePercentage.toFixed(1)}%
								</p>
								<p className="text-xs text-muted-foreground">On Track</p>
							</div>
						</div>

						{/* Progress Bar */}
						<div className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">
									Planned Budget Usage
								</span>
								<span className="font-medium">
									{usagePercentage.toFixed(1)}%
								</span>
							</div>
							<Progress value={usagePercentage} className="h-3" />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Ready to Commit Banner */}
			{selectedItems.length > 0 && !isBudgetCommitted && (
				<Card className={`${
					selectedItems.every(item => item.description && item.requirements && item.requirements.length > 0)
						? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
						: "border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20"
				}`}>
					<CardContent className="flex items-center justify-between py-4">
						<div>
							<h3 className={`font-semibold ${
								selectedItems.every(item => item.description && item.requirements && item.requirements.length > 0)
									? "text-green-900 dark:text-green-100"
									: "text-orange-900 dark:text-orange-100"
							}`}>
								{selectedItems.every(item => item.description && item.requirements && item.requirements.length > 0)
									? "Ready to Commit Budget?"
									: "Complete Required Fields to Commit"}
							</h3>
							<p className={`text-sm ${
								selectedItems.every(item => item.description && item.requirements && item.requirements.length > 0)
									? "text-green-700 dark:text-green-300"
									: "text-orange-700 dark:text-orange-300"
							}`}>
								{selectedItems.every(item => item.description && item.requirements && item.requirements.length > 0)
									? "Lock your budget and start receiving vendor proposals"
									: `Please complete description and requirements for all ${selectedItems.length} item(s) before committing.`}
							</p>
						</div>
						<Button
							onClick={handleCommitBudget}
							className={`${
								selectedItems.every(item => item.description && item.requirements && item.requirements.length > 0)
									? "bg-green-600 hover:bg-green-700"
									: "bg-orange-600 hover:bg-orange-700"
							}`}
						>
							<Lock className="h-4 w-4" />
							Commit Budget
						</Button>
					</CardContent>
				</Card>
			)}

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Section - Tabs */}
				<div className="lg:col-span-2">
					<Tabs
						value={activeTab}
						onValueChange={(v) => setActiveTab(v as "ai" | "custom")}
					>
						<TabsList className="mb-4 w-full">
							<TabsTrigger value="ai" className="flex-1">
								<Sparkles className="mr-2 h-4 w-4" />
								AI Recommendations
								<Badge variant="secondary" className="ml-2">
									5
								</Badge>
							</TabsTrigger>
							<TabsTrigger value="custom" className="flex-1">
								<Plus className="mr-2 h-4 w-4" />
								Custom Expense
							</TabsTrigger>
						</TabsList>

						<TabsContent value="ai" className="mt-0">
							<AIRecommendations
								totalBudget={totalBudget}
								remainingBudget={remainingAmount}
								onAddItem={handleAddItem}
								selectedItems={selectedItems}
							/>
						</TabsContent>

						<TabsContent value="custom" className="mt-0">
							<CustomExpenseForm
								remainingBudget={remainingAmount}
								onAddItem={handleAddItem}
							/>
						</TabsContent>
					</Tabs>
				</div>

				{/* Right Section - Selected Items */}
				<div className="lg:col-span-1">
					<Card className="sticky top-4 rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<svg
									className="h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
								Selected Items ({selectedItems.length})
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Budget Summary */}
							<div className="space-y-2 border-b pb-4">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Total Budget</span>
									<span className="font-semibold">
										${totalBudget.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Planned</span>
									<span className="font-semibold text-purple-600">
										${allocatedAmount.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Actual Cost</span>
									<span className="font-semibold text-orange-600">
										${actualCost.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Remaining</span>
									<span className="font-semibold text-green-600">
										${remainingAmount.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Usage</span>
									<span className="font-semibold text-cyan-600">
										{usagePercentage.toFixed(1)}%
									</span>
								</div>
							</div>

							{/* Selected Items List */}
							<div className="space-y-3">
								{selectedItems.length === 0 ? (
									<div className="py-8 text-center">
										<p className="text-sm text-muted-foreground">
											No items selected yet
										</p>
										<p className="text-xs text-muted-foreground mt-1">
											Add items from AI recommendations or create custom
											expenses
										</p>
									</div>
								) : (
									selectedItems.map((item) => (
										<Card
											key={item.id}
											className="border rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
										>
											<CardContent className="p-4">
												<div className="space-y-2">
													<div className="flex items-start justify-between">
														<div className="flex-1">
															<div className="flex items-center gap-2 flex-wrap">
																<Badge variant="outline" className="text-xs">
																	{item.category}
																</Badge>
																{item.priority && (
																	<Badge
																		variant={
																			item.priority === "high"
																				? "destructive"
																				: "secondary"
																		}
																		className={`text-xs ${
																			item.priority === "high"
																				? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
																				: item.priority === "medium"
																					? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
																					: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
																		}`}
																	>
																		{item.priority === "high"
																			? "High"
																			: item.priority === "medium"
																				? "Medium"
																				: "Low"}
																	</Badge>
																)}
																{!item.description && (
																	<Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-300">
																		Missing Desc
																	</Badge>
																)}
																{(!item.requirements || item.requirements.length === 0) && (
																	<Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-300">
																		Missing Requirements
																	</Badge>
																)}
																{item.isAIRecommended && (
																	<Sparkles className="h-3 w-3 text-blue-600" />
																)}
															</div>
															<h4 className="mt-1 font-semibold text-sm">
																{item.title}
															</h4>
															<p className="text-xs text-muted-foreground mt-1">
																Planned: ${item.estimatedCost.toLocaleString()}
															</p>
														</div>
														<div className="flex gap-1">
															{isBudgetCommitted ? (
																<Badge
																	variant="secondary"
																	className="flex items-center gap-1 bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-200"
																>
																	<Lock className="h-3 w-3" />
																	Locked
																</Badge>
															) : (
																<>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="h-8 w-8"
																		onClick={() => setEditingItem(item)}
																	>
																		<Edit className="h-3 w-3" />
																	</Button>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="h-8 w-8 text-red-600 hover:text-red-700"
																		onClick={() => setDeletingItem(item)}
																	>
																		<Trash2 className="h-3 w-3" />
																	</Button>
																</>
															)}
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									))
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Edit Item Dialog */}
			<EditItemDialog
				item={editingItem}
				open={!!editingItem}
				onOpenChange={(open) => !open && setEditingItem(null)}
				onSave={handleEditItem}
				remainingBudget={remainingAmount}
			/>

			{/* Delete Item Dialog */}
			<DeleteItemDialog
				item={deletingItem}
				open={!!deletingItem}
				onOpenChange={(open) => !open && setDeletingItem(null)}
				onConfirm={() => deletingItem && handleRemoveItem(deletingItem.id)}
			/>

			{/* Commit Budget Modal */}
			<CommitBudgetModal
				open={commitModalOpen}
				onOpenChange={setCommitModalOpen}
				onConfirm={handleConfirmCommit}
				totalBudget={totalBudget}
				expenseItemsCount={selectedItems.length}
			/>

			<ConfirmationDialog
				open={uncommitDialogOpen}
				onOpenChange={setUncommitDialogOpen}
				onConfirm={handleConfirmUncommit}
				title="Uncommit Budget?"
				description="This will unlock your budget so you can make changes. Are you sure you want to proceed?"
				confirmText="Uncommit Budget"
				variant="warning"
			/>
		</div>
	);
}
