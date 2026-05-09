"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { BudgetItem } from "./BudgetPlanningView";

interface EditItemDialogProps {
	item: BudgetItem | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (item: BudgetItem) => void;
	remainingBudget: number;
}

export default function EditItemDialog({
	item,
	open,
	onOpenChange,
	onSave,
	remainingBudget,
}: EditItemDialogProps) {
	const [formData, setFormData] = useState({
		category: "",
		title: "",
		description: "",
		requirements: [] as string[],
		estimatedCost: "",
		priority: "medium" as "high" | "medium" | "low",
	});
	const [requirementInput, setRequirementInput] = useState("");
	const [originalCost, setOriginalCost] = useState(0);

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

	// Update form when item changes
	useEffect(() => {
		if (item) {
			setFormData({
				category: item.category,
				title: item.title,
				description: item.description || "",
				requirements: item.requirements || [],
				estimatedCost: item.estimatedCost.toString(),
				priority: item.priority || "medium",
			});
			setOriginalCost(item.estimatedCost);
			setRequirementInput("");
		}
	}, [item]);

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

		if (
			!item ||
			!formData.category ||
			!formData.title ||
			!formData.estimatedCost ||
			!formData.description ||
			formData.requirements.length === 0
		) {
			toast.error("Missing Required Fields", {
				description: "Please fill in description and add at least one requirement.",
				duration: 3000,
			});
			return;
		}

		const newCost = parseFloat(formData.estimatedCost);
		const costIncrease = newCost - originalCost;

		// Check if the cost increase exceeds remaining budget
		if (costIncrease > remainingBudget) {
			toast.error("Insufficient Budget", {
				description: `Cannot increase cost by $${costIncrease.toLocaleString()}. You only have $${remainingBudget.toLocaleString()} remaining. You can decrease the cost or keep it the same.`,
				duration: 5000,
			});
			return;
		}

		const updatedItem: BudgetItem = {
			...item,
			category: formData.category,
			title: formData.title,
			description: formData.description,
			requirements: formData.requirements,
			estimatedCost: newCost,
			priority: formData.priority,
		};

		onSave(updatedItem);
		onOpenChange(false);
	};

	const estimatedCostValue = formData.estimatedCost
		? parseFloat(formData.estimatedCost)
		: 0;
	const costIncrease = estimatedCostValue - originalCost;
	const exceedsBudget = costIncrease > remainingBudget;

	const isFormValid =
		formData.category &&
		formData.title &&
		formData.estimatedCost &&
		formData.description &&
		formData.requirements.length > 0 &&
		!exceedsBudget;

	if (!item) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
				<DialogHeader>
					<DialogTitle>Edit Budget Item</DialogTitle>
					<DialogDescription>
						Make changes to your budget item. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Budget Info */}
					<div className="flex items-center justify-between rounded-lg bg-muted p-3">
						<div>
							<p className="text-sm text-muted-foreground">Original Cost</p>
							<p className="text-lg font-semibold">
								${originalCost.toLocaleString()}
							</p>
						</div>
						<div className="text-right">
							<p className="text-sm text-muted-foreground">Remaining Budget</p>
							<p className="text-lg font-semibold text-green-600">
								${remainingBudget.toLocaleString()}
							</p>
						</div>
					</div>

					{/* Budget Warning */}
					{exceedsBudget && costIncrease > 0 && (
						<Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
							<CardContent className="py-3">
								<p className="text-sm text-red-700 dark:text-red-300">
									<strong>Cannot Increase Cost:</strong> The cost increase of $
									{costIncrease.toLocaleString()} exceeds your remaining budget
									of ${remainingBudget.toLocaleString()}. You can only decrease
									the cost or keep it the same.
								</p>
							</CardContent>
						</Card>
					)}

					{/* Category */}
					<div className="space-y-2">
						<Label htmlFor="edit-category">
							Category <span className="text-red-500">*</span>
						</Label>
						<Select
							value={formData.category}
							onValueChange={(value) =>
								setFormData({ ...formData, category: value })
							}
						>
							<SelectTrigger id="edit-category" className="w-full">
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
						<Label htmlFor="edit-title">
							Title <span className="text-red-500">*</span>
						</Label>
						<Input
							id="edit-title"
							placeholder="e.g., Reception Venue"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
						/>
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="edit-description">
							Description <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="edit-description"
							placeholder="Brief description of the expense"
							rows={3}
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							required
						/>
					</div>

					{/* Requirements */}
					<div className="space-y-2">
						<Label htmlFor="edit-requirements">
							Requirements <span className="text-red-500">*</span>
						</Label>
						<div className="space-y-2">
							<div className="flex gap-2">
								<Input
									id="edit-requirements"
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
							{formData.requirements.length === 0 && (
								<p className="text-xs text-muted-foreground">
									Add at least one requirement. Press Enter or click Add to add a requirement.
								</p>
							)}
						</div>
					</div>

					{/* Estimated Cost and Priority */}
					<div className="grid grid-cols-2 gap-4">
						{/* Estimated Cost */}
						<div className="space-y-2">
							<Label htmlFor="edit-estimatedCost">
								Estimated Cost <span className="text-red-500">*</span>
							</Label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									$
								</span>
								<Input
									id="edit-estimatedCost"
									type="number"
									placeholder="0.00"
									className="pl-6"
									value={formData.estimatedCost}
									onChange={(e) =>
										setFormData({ ...formData, estimatedCost: e.target.value })
									}
									min="0"
									step="0.01"
								/>
							</div>
						</div>

						{/* Priority */}
						<div className="space-y-2">
							<Label htmlFor="edit-priority">Priority</Label>
							<Select
								value={formData.priority}
								onValueChange={(value: "high" | "medium" | "low") =>
									setFormData({ ...formData, priority: value })
								}
							>
								<SelectTrigger id="edit-priority" className="w-full">
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

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!isFormValid}>
							Save Changes
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
