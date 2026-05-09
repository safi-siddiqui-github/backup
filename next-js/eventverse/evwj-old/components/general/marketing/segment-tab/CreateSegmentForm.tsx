"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, X, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export interface Filter {
	id: string;
	field: string;
	operator: string;
	value: string;
}

interface CreateSegmentFormProps {
	onCancel: () => void;
	onSubmit?: (data: {
		name: string;
		description: string;
		filters: Filter[];
	}) => void;
	initialData?: {
		name: string;
		description: string;
		filters: Filter[];
	};
	isEdit?: boolean;
}

const FIELD_OPTIONS = [
	{ value: "eventType", label: "Event Type" },
	{ value: "ticketTier", label: "Ticket Tier" },
	{ value: "ageRange", label: "Age Range" },
	{ value: "location", label: "Location" },
	{ value: "totalSpent", label: "Total Spent" },
	{ value: "attendanceCount", label: "Attendance Count" },
	{ value: "lastEventDate", label: "Last Event Date" },
];

const OPERATOR_OPTIONS = [
	{ value: "equals", label: "Equals" },
	{ value: "notEquals", label: "Not Equals" },
	{ value: "contains", label: "Contains" },
	{ value: "greaterThan", label: "Greater Than" },
	{ value: "lessThan", label: "Less Than" },
	{ value: "greaterThanOrEqual", label: "Greater Than or Equal" },
	{ value: "lessThanOrEqual", label: "Less Than or Equal" },
];

export default function CreateSegmentForm({
	onCancel,
	onSubmit,
	initialData,
	isEdit = false,
}: CreateSegmentFormProps) {
	const [segmentName, setSegmentName] = useState(initialData?.name || "");
	const [description, setDescription] = useState(
		initialData?.description || "",
	);
	const [filters, setFilters] = useState<Filter[]>(initialData?.filters || []);

	useEffect(() => {
		if (initialData) {
			setSegmentName(initialData.name);
			setDescription(initialData.description);
			setFilters(initialData.filters);
		}
	}, [initialData]);

	const handleAddFilter = () => {
		const newFilter: Filter = {
			id: Date.now().toString(),
			field: "",
			operator: "",
			value: "",
		};
		setFilters([...filters, newFilter]);
	};

	const handleRemoveFilter = (filterId: string) => {
		setFilters(filters.filter((f) => f.id !== filterId));
	};

	const handleFilterChange = (
		filterId: string,
		field: keyof Filter,
		value: string,
	) => {
		setFilters(
			filters.map((f) => (f.id === filterId ? { ...f, [field]: value } : f)),
		);
	};

	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit({
				name: segmentName,
				description,
				filters,
			});
		}
	};

	return (
		<div className=" mx-auto">
			<Card className="p-6">
				{/* Header */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{isEdit ? "Edit Your Segment" : "Create New Segment"}
					</h2>
					<p className="text-sm text-muted-foreground">
						Define filters to create a targeted audience
					</p>
				</div>

				<div className="space-y-6">
					{/* Segment Name */}
					<div>
						<Label htmlFor="segment-name" className="text-sm font-medium mb-2">
							Segment Name
						</Label>
						<Input
							id="segment-name"
							placeholder="e.g., VIP Wedding Guests"
							value={segmentName}
							onChange={(e) => setSegmentName(e.target.value)}
						/>
					</div>

					{/* Description */}
					<div>
						<Label htmlFor="description" className="text-sm font-medium mb-2">
							Description
						</Label>
						<Textarea
							id="description"
							placeholder="Describe this audience segment..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
						/>
					</div>

					{/* Filters */}
					<div>
						<div className="flex items-center justify-between mb-4">
							<Label className="text-sm font-medium">Filters</Label>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={handleAddFilter}
								className="h-8"
							>
								<Plus className="h-4 w-4 mr-1" />
								Add Filter
							</Button>
						</div>

						{filters.length === 0 ? (
							<div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
								<p className="text-sm text-muted-foreground">
									No filters added yet. Click "Add Filter" to start building
									your segment.
								</p>
							</div>
						) : (
							<div className="space-y-3">
								{filters.map((filter) => (
									<Card
										key={filter.id}
										className="p-4 bg-gray-50/50 dark:bg-gray-900/30"
									>
										<div className="grid grid-cols-12 gap-3 items-end">
											{/* Field */}
											<div className="col-span-12 sm:col-span-4">
												<Label className="text-xs text-muted-foreground mb-1 block">
													Field
												</Label>
												<Select
													value={filter.field}
													onValueChange={(value) =>
														handleFilterChange(filter.id, "field", value)
													}
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select field" />
													</SelectTrigger>
													<SelectContent>
														{FIELD_OPTIONS.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											{/* Operator */}
											<div className="col-span-12 sm:col-span-4">
												<Label className="text-xs text-muted-foreground mb-1 block">
													Operator
												</Label>
												<Select
													value={filter.operator}
													onValueChange={(value) =>
														handleFilterChange(filter.id, "operator", value)
													}
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select operator" />
													</SelectTrigger>
													<SelectContent>
														{OPERATOR_OPTIONS.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											{/* Value */}
											<div className="col-span-12 sm:col-span-3">
												<Label className="text-xs text-muted-foreground mb-1 block">
													Value
												</Label>
												<div className="relative">
													<Input
														placeholder="Enter value..."
														value={filter.value}
														onChange={(e) =>
															handleFilterChange(
																filter.id,
																"value",
																e.target.value,
															)
														}
														className="pr-8"
													/>
												</div>
											</div>

											{/* Remove Button */}
											<div className="col-span-12 sm:col-span-1">
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="h-9 w-9"
													onClick={() => handleRemoveFilter(filter.id)}
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</Card>
								))}
							</div>
						)}
					</div>

					{/* Estimated Audience Size */}
					<Card className="p-4 bg-gray-50/50 dark:bg-gray-900/30">
						<div className="flex items-center gap-3">
							<Users className="h-5 w-5 text-muted-foreground" />
							<div>
								<Label className="text-sm font-medium">
									Estimated Audience Size
								</Label>
								<p className="text-2xl font-bold mt-1">0 guests</p>
							</div>
						</div>
					</Card>

					{/* Action Buttons */}
					<div className="flex gap-3 pt-4">
						<Button
							onClick={handleSubmit}
							className="bg-blue-600 hover:bg-blue-700 text-white"
						>
							{isEdit ? "Update Segment" : "Create Segment"}
						</Button>
						<Button variant="outline" onClick={onCancel}>
							Cancel
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
