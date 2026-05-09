"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { BudgetItem } from "./BudgetPlanningView";

interface CustomExpenseFormProps {
	remainingBudget: number;
	onAddItem: (item: BudgetItem) => boolean;
}

export default function CustomExpenseForm({
	remainingBudget,
	onAddItem,
}: CustomExpenseFormProps) {
	const [formData, setFormData] = useState({
		category: "",
		title: "",
		description: "",
		requirements: [] as string[],
		estimatedCost: "",
		priority: "medium" as "high" | "medium" | "low",
	});
	const [requirementInput, setRequirementInput] = useState("");
	const [showBudgetWarning, setShowBudgetWarning] = useState(false);

	const categories = [
		"Venue",
		"Catering",
		"Photography",
		"Videography",
		"Decoration",
		"Flowers",
		"Entertainment",
		"Music",
		"Transportation",
		"Accommodation",
		"Invitations",
		"Favors",
		"Cake",
		"Attire",
		"Hair & Makeup",
		"Other",
	];

	const handleAddRequirement = () => {
		if (requirementInput.trim()) {
			setFormData({
				...formData,
				requirements: [...formData.requirements, requirementInput.trim()],
			});
			setRequirementInput("");
		}
	};

	const handleRemoveRequirement = (index: number) => {
		setFormData({
			...formData,
			requirements: formData.requirements.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.category || !formData.title || !formData.estimatedCost) {
			return;
		}

		const cost = parseFloat(formData.estimatedCost);

		// Check if cost exceeds remaining budget
		if (cost > remainingBudget) {
			toast.error("Insufficient Budget", {
				description: `Cannot add this expense. You need $${cost.toLocaleString()} but only have $${remainingBudget.toLocaleString()} remaining. Remove other items first.`,
				duration: 5000,
			});
			return;
		}

		const newItem: BudgetItem = {
			id: `custom-${Date.now()}-${Math.random()}`,
			category: formData.category,
			title: formData.title,
			description: formData.description,
			requirements: formData.requirements.length > 0 ? formData.requirements : undefined,
			estimatedCost: cost,
			priority: formData.priority,
			isAIRecommended: false,
		};

		const success = onAddItem(newItem);

		if (success) {
			// Show success toast
			toast.success("Custom Expense Added", {
				description: `${formData.title} ($${cost.toLocaleString()}) added to your budget.`,
				duration: 3000,
			});

			// Reset form
			setFormData({
				category: "",
				title: "",
				description: "",
				requirements: [],
				estimatedCost: "",
				priority: "medium",
			});
			setRequirementInput("");
			setShowBudgetWarning(false);
		}
	};

	const estimatedCostValue = formData.estimatedCost
		? parseFloat(formData.estimatedCost)
		: 0;
	const exceedsBudget = estimatedCostValue > remainingBudget;
	const isFormValid =
		formData.category &&
		formData.title &&
		formData.estimatedCost &&
		!exceedsBudget;

	return (
		<div className="space-y-4">
			{/* Form */}
			<Card>
				<CardContent className="pt-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Add Custom Expense Button/Header */}
						<div className="flex items-center justify-between pb-4 border-b">
							<div className="flex items-center gap-2">
								<Plus className="h-5 w-5 text-blue-600" />
								<h3 className="text-lg font-semibold">Add Custom Expense</h3>
							</div>
							<div className="text-right">
								<p className="text-sm text-muted-foreground">
									Remaining Budget
								</p>
								<p className="text-lg font-bold text-green-600">
									${remainingBudget.toLocaleString()}
								</p>
							</div>
						</div>

						{/* Budget Warning */}
						{exceedsBudget && formData.estimatedCost && (
							<Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
								<CardContent className="py-3">
									<p className="text-sm text-red-700 dark:text-red-300">
										<strong>Insufficient Budget:</strong> This expense ($
										{estimatedCostValue.toLocaleString()}) exceeds your
										remaining budget ($
										{remainingBudget.toLocaleString()}). Please reduce the cost
										or remove other items.
									</p>
								</CardContent>
							</Card>
						)}

						{/* Category */}
						<div className="space-y-2">
							<Label htmlFor="category">
								Category <span className="text-red-500">*</span>
							</Label>
							<Select
								value={formData.category}
								onValueChange={(value) =>
									setFormData({ ...formData, category: value })
								}
							>
								<SelectTrigger id="category" className="w-full">
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent className="w-full">
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Title */}
						<div className="space-y-2">
							<Label htmlFor="title">
								Title <span className="text-red-500">*</span>
							</Label>
							<Input
								id="title"
								placeholder="e.g., Reception Venue"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
							/>
						</div>

						{/* Description */}
						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								placeholder="Brief description of the expense"
								rows={3}
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
							/>
						</div>

						{/* Requirements (Optional at creation, required before commit) */}
						<div className="space-y-2">
							<Label htmlFor="requirements">
								Requirements <span className="text-xs text-muted-foreground">(Optional - can add later)</span>
							</Label>
							<div className="space-y-2">
								<div className="flex gap-2">
									<Input
										id="requirements"
										placeholder="Add a requirement (e.g., Must accommodate 100 guests)"
										value={requirementInput}
										onChange={(e) => setRequirementInput(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												handleAddRequirement();
											}
										}}
									/>
									<Button
										type="button"
										variant="outline"
										onClick={handleAddRequirement}
										disabled={!requirementInput.trim()}
									>
										Add
									</Button>
								</div>
								{formData.requirements.length > 0 && (
									<div className="space-y-1">
										{formData.requirements.map((req, index) => (
											<div
												key={index}
												className="flex items-center justify-between rounded-md bg-muted p-2 text-sm"
											>
												<span className="flex-1">• {req}</span>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
													onClick={() => handleRemoveRequirement(index)}
												>
													×
												</Button>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Estimated Cost and Priority */}
						<div className="grid grid-cols-2 gap-4">
							{/* Estimated Cost */}
							<div className="space-y-2">
								<Label htmlFor="estimatedCost">
									Estimated Cost <span className="text-red-500">*</span>
								</Label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
										$
									</span>
									<Input
										id="estimatedCost"
										type="number"
										placeholder="0.00"
										className="pl-6"
										value={formData.estimatedCost}
										onChange={(e) =>
											setFormData({
												...formData,
												estimatedCost: e.target.value,
											})
										}
										min="0"
										step="0.01"
									/>
								</div>
							</div>

							{/* Priority */}
							<div className="space-y-2">
								<Label htmlFor="priority">Priority</Label>
								<Select
									value={formData.priority}
									onValueChange={(value: "high" | "medium" | "low") =>
										setFormData({ ...formData, priority: value })
									}
								>
									<SelectTrigger id="priority" className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent className="w-full">
										<SelectItem value="high">High</SelectItem>
										<SelectItem value="medium">Medium</SelectItem>
										<SelectItem value="low">Low</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Submit Button */}
						<Button
							type="submit"
							className="w-full"
							disabled={!isFormValid}
							size="lg"
						>
							<Plus className="mr-2 h-4 w-4" />
							Complete Form to Add
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
