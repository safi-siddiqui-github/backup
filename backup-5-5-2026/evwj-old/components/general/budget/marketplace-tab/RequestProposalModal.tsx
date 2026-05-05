"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";
import { MarketplaceVendor } from "./MarketplaceListView";
import { BudgetItem } from "../budget-tab/BudgetPlanningView";
import { toast } from "sonner";

interface RequestProposalModalProps {
	vendor: MarketplaceVendor | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	budgetItems?: BudgetItem[];
	onSuccess?: () => void; // Callback to close parent modal
}

export default function RequestProposalModal({
	vendor,
	open,
	onOpenChange,
	budgetItems = [],
	onSuccess,
}: RequestProposalModalProps) {
	const [selectedBudgetItem, setSelectedBudgetItem] = useState<string>("");
	const [requirements, setRequirements] = useState("");
	const [minBudget, setMinBudget] = useState("");
	const [maxBudget, setMaxBudget] = useState("");
	const [timeline, setTimeline] = useState("");
	const [urgencyLevel, setUrgencyLevel] = useState<string>("medium");

	if (!vendor) return null;

	// Get selected budget item details
	const selectedItem = budgetItems.find(
		(item) => item.id === selectedBudgetItem,
	);

	const handleSubmit = () => {
		// Validate required fields
		if (!selectedBudgetItem && (!minBudget || !maxBudget)) {
			toast.error("Missing Information", {
				description: "Please select a budget item or enter budget range.",
			});
			return;
		}

		if (!requirements.trim()) {
			toast.error("Missing Information", {
				description: "Please describe your requirements and specifications.",
			});
			return;
		}

		// Submit proposal request
		toast.success("Proposal Request Sent!", {
			description: `Your request has been sent to ${vendor.name}. You'll receive a response within 24 hours.`,
			duration: 4000,
		});

		// Reset form and close modal
		setSelectedBudgetItem("");
		setRequirements("");
		setMinBudget("");
		setMaxBudget("");
		setTimeline("");
		setUrgencyLevel("medium");
		onOpenChange(false);

		// Close parent modal (VendorProfileModal) if callback provided
		if (onSuccess) {
			onSuccess();
		}
	};

	const handleCancel = () => {
		// Reset form
		setSelectedBudgetItem("");
		setRequirements("");
		setMinBudget("");
		setMaxBudget("");
		setTimeline("");
		setUrgencyLevel("medium");
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<span>Request Proposal from {vendor.name}</span>
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 mt-4">
					{/* Expense Item Details - View Only */}
					<div className="space-y-2">
						<Label className="text-base font-semibold">
							Expense Item Details
						</Label>
						{selectedItem ? (
							<div className="rounded-lg bg-gray-50 dark:bg-[#020617] p-4 space-y-2">
								<div className="font-semibold">{selectedItem.title}</div>
								<div className="text-sm text-muted-foreground">
									{selectedItem.description || selectedItem.category}
								</div>
								<div className="flex items-center gap-4 text-sm">
									<div className="flex items-center gap-1">
										<DollarSign className="h-4 w-4 text-green-600" />
										<span className="font-semibold">
											Budget: ${selectedItem.estimatedCost.toLocaleString()}
										</span>
									</div>
									{selectedItem.priority && (
										<Badge
											variant={
												selectedItem.priority === "high"
													? "destructive"
													: "secondary"
											}
											className={
												selectedItem.priority === "high"
													? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
													: selectedItem.priority === "medium"
														? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
														: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
											}
										>
											High priority
										</Badge>
									)}
								</div>
							</div>
						) : (
							<div className="rounded-lg bg-gray-50 dark:bg-[#020617] p-4 text-sm text-muted-foreground">
								No budget item selected. Please select or enter budget range
								below.
							</div>
						)}
					</div>

					<Separator />

					{/* Vendor Information - View Only */}
					<div className="space-y-2">
						<Label className="text-base font-semibold">
							Vendor Information
						</Label>
						<div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
							<div className="flex items-start justify-between mb-3">
								<div>
									<div className="font-semibold text-lg">{vendor.name}</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
										<MapPin className="h-3 w-3" />
										<span>{vendor.location}</span>
									</div>
								</div>
								<div className="text-right">
									<div className="flex items-center gap-1">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span className="font-semibold">{vendor.rating}</span>
										<span className="text-sm text-muted-foreground">
											({vendor.reviewCount} reviews)
										</span>
									</div>
									<div className="flex items-center gap-1 mt-1 text-sm text-green-600">
										<Clock className="h-3 w-3" />
										<span>Within 24 hours</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					{/* Detailed Requirements & Specifications */}
					<div className="space-y-2">
						<Label htmlFor="requirements" className="text-base font-semibold">
							Detailed Requirements & Specifications
						</Label>
						<Textarea
							id="requirements"
							placeholder="Please describe your specific needs, preferences, style requirements, and any special considerations for this project..."
							value={requirements}
							onChange={(e) => setRequirements(e.target.value)}
							className="min-h-[120px]"
						/>
					</div>

					<Separator />

					{/* Budget Range */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">Budget Range</Label>

						{/* Budget Item Selection */}
						{budgetItems.length > 0 && (
							<div className="space-y-2">
								<Label htmlFor="budgetItem" className="text-sm">
									Select from your budget items
								</Label>
								<Select
									value={selectedBudgetItem}
									onValueChange={setSelectedBudgetItem}
								>
									<SelectTrigger id="budgetItem" className="w-full">
										<SelectValue placeholder="Select a budget item" />
									</SelectTrigger>
									<SelectContent>
										{budgetItems.map((item) => (
											<SelectItem key={item.id} value={item.id}>
												{item.title} - ${item.estimatedCost.toLocaleString()}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* Manual Budget Range */}
						{!selectedBudgetItem && (
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="minBudget">Minimum</Label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
											$
										</span>
										<Input
											id="minBudget"
											type="number"
											placeholder="Min budget"
											value={minBudget}
											onChange={(e) => setMinBudget(e.target.value)}
											className="pl-6"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="maxBudget">
										Maximum {selectedItem && `(${selectedItem.estimatedCost})`}
									</Label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
											$
										</span>
										<Input
											id="maxBudget"
											type="number"
											placeholder={
												selectedItem
													? selectedItem.estimatedCost.toString()
													: "Max budget (7000)"
											}
											value={maxBudget}
											onChange={(e) => setMaxBudget(e.target.value)}
											className="pl-6"
										/>
									</div>
								</div>
							</div>
						)}
					</div>

					<Separator />

					{/* Preferred Timeline and Urgency */}
					<div className="grid md:grid-cols-2 gap-4">
						{/* Preferred Timeline */}
						<div className="space-y-2">
							<Label htmlFor="timeline">Preferred Timeline</Label>
							<Input
								id="timeline"
								placeholder="e.g., 2-3 weeks, By March 15th"
								value={timeline}
								onChange={(e) => setTimeline(e.target.value)}
							/>
						</div>

						{/* Urgency Level */}
						<div className="space-y-2">
							<Label htmlFor="urgency">Urgency Level</Label>
							<Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
								<SelectTrigger id="urgency" className="w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="low">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-green-500" />
											<span>Low - Flexible timeline</span>
										</div>
									</SelectItem>
									<SelectItem value="medium">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-yellow-500" />
											<span>Medium - Standard timeline</span>
										</div>
									</SelectItem>
									<SelectItem value="high">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-red-500" />
											<span>High - Urgent</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3 pt-4">
						<Button variant="outline" onClick={handleCancel} className="flex-1">
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							className="flex-1 bg-blue-600 hover:bg-blue-700"
						>
							Send Proposal Request
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
