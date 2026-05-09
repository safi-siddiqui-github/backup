"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, Users, Layout, Building2, Store, X, Plus, Trash2, Edit2, Check } from "lucide-react";
import { useState } from "react";
import type { CreateTicketDialogProps, TicketType, SeatingSection, TicketForm } from "../types";

export default function CreateTicketDialog({
	open,
	onOpenChange,
	createForm,
	setCreateForm,
	onCreate,
	onCreateMultiple,
}: CreateTicketDialogProps) {
	// State for managing multiple ticket types
	const [ticketTypesList, setTicketTypesList] = useState<TicketForm[]>([]);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const ticketTypeDescriptions: Record<TicketType, { icon: any; title: string; description: string }> = {
		"access-level": {
			icon: Users,
			title: "Access Level Ticket",
			description: "Open seating. Guests purchase access to an area/level and can sit anywhere within that access level."
		},
		"seated": {
			icon: Layout,
			title: "Seated Ticket",
			description: "Guests select specific seats. Price varies by section, row, or individual seat selection."
		},
		"booth-table": {
			icon: Building2,
			title: "Booth/Table Ticket",
			description: "Purchase entire table/booth with multiple assignable tickets. Perfect for groups wanting exclusive seating together."
		},
		"vendor-booth": {
			icon: Store,
			title: "Vendor Booth Ticket",
			description: "For vendors to purchase booths/stands. Price depends on booth capacity and number of assignable staff tickets."
		}
	};

	// Reset state when dialog opens/closes
	const handleDialogOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			// Reset everything when closing
			setTicketTypesList([]);
			setEditingIndex(null);
			resetForm();
		}
		onOpenChange(isOpen);
	};

	const resetForm = () => {
		setCreateForm({
			name: "",
			ticketType: undefined,
			category: "General",
			description: "",
			saleStart: "",
			saleEnd: "",
			features: "Event Access, Welcome Drink, VIP Lounge",
			color: "blue",
			active: true,
		});
	};

	const handleTicketTypeChange = (type: TicketType) => {
		setCreateForm({ ...createForm, ticketType: type });
		// Reset type-specific fields when switching types
		if (type !== "access-level") {
			setCreateForm(prev => ({ ...prev, price: undefined, capacity: undefined }));
		}
		if (type !== "seated") {
			setCreateForm(prev => ({ ...prev, seatingConfig: undefined }));
		}
		if (type !== "booth-table") {
			setCreateForm(prev => ({ ...prev, numberOfBooths: undefined, boothCapacity: undefined, assignableTickets: undefined, boothPrice: undefined }));
		}
		if (type !== "vendor-booth") {
			setCreateForm(prev => ({ ...prev, numberOfVendorBooths: undefined, vendorBoothCapacity: undefined, vendorAssignableTickets: undefined, pricePerCapacity: undefined, pricingTiers: undefined }));
		}
	};

	const validateForm = (): boolean => {
		if (!createForm.ticketType || !createForm.name) return false;
		
		if (createForm.ticketType === "access-level") {
			return !!(createForm.price !== undefined && createForm.price >= 0 && createForm.capacity !== undefined && createForm.capacity > 0);
		} else if (createForm.ticketType === "seated") {
			return !!(createForm.seatingConfig?.sections && createForm.seatingConfig.sections.length > 0);
		} else if (createForm.ticketType === "booth-table") {
			return !!(createForm.numberOfBooths && createForm.numberOfBooths > 0 && createForm.boothCapacity && createForm.assignableTickets && createForm.boothPrice !== undefined);
		} else if (createForm.ticketType === "vendor-booth") {
			return !!(createForm.numberOfVendorBooths && createForm.numberOfVendorBooths > 0 && createForm.vendorBoothCapacity && createForm.vendorAssignableTickets && createForm.pricePerCapacity !== undefined);
		}
		return true;
	};

	const handleAddTicketType = () => {
		if (!validateForm()) return;

		const ticketToAdd: TicketForm = { ...createForm };
		
		if (editingIndex !== null) {
			// Update existing ticket type
			const updated = [...ticketTypesList];
			updated[editingIndex] = ticketToAdd;
			setTicketTypesList(updated);
			setEditingIndex(null);
		} else {
			// Add new ticket type
			setTicketTypesList([...ticketTypesList, ticketToAdd]);
		}
		
		resetForm();
	};

	const handleRemoveTicketType = (index: number) => {
		setTicketTypesList(ticketTypesList.filter((_, i) => i !== index));
		if (editingIndex === index) {
			setEditingIndex(null);
			resetForm();
		} else if (editingIndex !== null && editingIndex > index) {
			setEditingIndex(editingIndex - 1);
		}
	};

	const handleEditTicketType = (index: number) => {
		const ticketToEdit = ticketTypesList[index];
		setCreateForm(ticketToEdit);
		setEditingIndex(index);
	};


	const handleSaveAll = () => {
		if (ticketTypesList.length === 0) return;
		
		// If onCreateMultiple is provided, use it to create all tickets at once
		if (onCreateMultiple) {
			onCreateMultiple(ticketTypesList);
			handleDialogOpenChange(false);
		} else {
			// Fallback: For now, we'll need to handle this in the parent
			// Close the dialog and the parent can handle creating tickets
			handleDialogOpenChange(false);
		}
	};

	const addSeatingSection = () => {
		const newSection: SeatingSection = {
			name: `Section ${(createForm.seatingConfig?.sections?.length || 0) + 1}`,
			price: 0,
			totalSeats: 0,
		};
		setCreateForm({
			...createForm,
			seatingConfig: {
				sections: [...(createForm.seatingConfig?.sections || []), newSection],
			},
		});
	};

	const updateSeatingSection = (index: number, field: keyof SeatingSection, value: any) => {
		const updated = { ...createForm.seatingConfig! };
		if (!updated.sections) updated.sections = [];
		updated.sections[index] = { ...updated.sections[index], [field]: value };
		setCreateForm({ ...createForm, seatingConfig: updated });
	};

	const removeSeatingSection = (index: number) => {
		const updated = { ...createForm.seatingConfig! };
		updated.sections = updated.sections!.filter((_, i) => i !== index);
		setCreateForm({ ...createForm, seatingConfig: updated });
	};

	const getTicketTypeDisplayInfo = (ticket: TicketForm) => {
		if (!ticket.ticketType) return { label: "Unknown", icon: Info };
		return {
			label: ticketTypeDescriptions[ticket.ticketType].title,
			icon: ticketTypeDescriptions[ticket.ticketType].icon,
		};
	};

	const getTicketTypeSummary = (ticket: TicketForm): string => {
		if (ticket.ticketType === "access-level") {
			return `Price: $${ticket.price || 0} • Capacity: ${ticket.capacity || 0}`;
		} else if (ticket.ticketType === "seated") {
			const sectionsCount = ticket.seatingConfig?.sections?.length || 0;
			const totalSeats = ticket.seatingConfig?.sections?.reduce((sum, s) => sum + (s.totalSeats || 0), 0) || 0;
			return `${sectionsCount} section(s) • ${totalSeats} total seats`;
		} else if (ticket.ticketType === "booth-table") {
			const boothCount = ticket.numberOfBooths || 1;
			return `${boothCount} booth(s) • Capacity: ${ticket.boothCapacity || 0} per booth • Tickets: ${ticket.assignableTickets || 0} • Price: $${ticket.boothPrice || 0} per booth`;
		} else if (ticket.ticketType === "vendor-booth") {
			const boothCount = ticket.numberOfVendorBooths || 1;
			const totalPrice = (ticket.vendorBoothCapacity || 0) * (ticket.pricePerCapacity || 0);
			return `${boothCount} booth(s) • Capacity: ${ticket.vendorBoothCapacity || 0} per booth • Staff Tickets: ${ticket.vendorAssignableTickets || 0} • Price: $${totalPrice} per booth`;
		}
		return "";
	};

	return (
		<Dialog open={open} onOpenChange={handleDialogOpenChange}>
			<DialogContent className="sm:max-w-[1200px] md:max-w-[1400px] max-h-[95vh] overflow-hidden flex flex-col">
				<DialogHeader className="pb-4 flex-shrink-0">
					<DialogTitle className="text-2xl font-bold">
						Create Ticket Types
					</DialogTitle>
					<DialogDescription className="text-base">
						Add multiple ticket types and review them before saving.
					</DialogDescription>
				</DialogHeader>

				<div className="flex-1 overflow-hidden flex flex-col gap-4">
					{/* Two-panel layout */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
						{/* Left Panel: Summary of Added Ticket Types */}
						<div className="flex flex-col space-y-4 overflow-hidden">
							<div className="flex items-center justify-between flex-shrink-0">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Added Ticket Types ({ticketTypesList.length})
								</h3>
							</div>
							
							<div className="flex-1 overflow-y-auto space-y-3 pr-2">
								{ticketTypesList.length === 0 ? (
									<div className="flex flex-col items-center justify-center h-full p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
										<Info className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
										<p className="text-sm text-gray-500 dark:text-gray-400">
											No ticket types added yet. Fill out the form on the right to add your first ticket type.
										</p>
									</div>
								) : (
									ticketTypesList.map((ticket, index) => {
										const { label, icon: Icon } = getTicketTypeDisplayInfo(ticket);
										const isEditing = editingIndex === index;
										
										return (
											<Card 
												key={index} 
												className={`transition-all ${isEditing ? "ring-2 ring-primary" : ""}`}
											>
												<CardHeader className="pb-3">
													<div className="flex items-start justify-between gap-3">
														<div className="flex items-start gap-3 flex-1">
															<div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${
																isEditing ? "bg-primary/10 text-primary" : "text-gray-600 dark:text-gray-400"
															}`}>
																<Icon className="h-5 w-5" />
															</div>
															<div className="flex-1 min-w-0">
																<CardTitle className="text-base mb-1">{ticket.name || "Untitled Ticket"}</CardTitle>
																<Badge variant="outline" className="text-xs mb-2">
																	{label}
																</Badge>
																<p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
																	{ticket.description || "No description"}
																</p>
																<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
																	{getTicketTypeSummary(ticket)}
																</p>
															</div>
														</div>
														<div className="flex items-center gap-1">
															<Button
																variant="ghost"
																size="sm"
																onClick={() => handleEditTicketType(index)}
																className="h-8 w-8 p-0"
															>
																<Edit2 className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																onClick={() => handleRemoveTicketType(index)}
																className="h-8 w-8 p-0 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
												</CardHeader>
											</Card>
										);
									})
								)}
							</div>
						</div>

						{/* Right Panel: Form to Add New Ticket Type */}
						<div className="flex flex-col space-y-4 overflow-y-auto pr-2 border-l border-gray-200 dark:border-gray-700 pl-6">
							<div className="flex items-center justify-between flex-shrink-0">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									{editingIndex !== null ? "Edit Ticket Type" : "Add New Ticket Type"}
								</h3>
								{editingIndex !== null && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											setEditingIndex(null);
											resetForm();
										}}
									>
										Cancel Edit
									</Button>
								)}
							</div>

							<div className="space-y-6">
								{/* Ticket Type Selection */}
								<div className="space-y-3">
									<Label className="text-sm font-semibold">Ticket Type</Label>
									<div className="grid grid-cols-2 gap-3">
										{Object.entries(ticketTypeDescriptions).map(([type, { icon: Icon, title, description }]) => (
											<Card
												key={type}
												className={`cursor-pointer transition-all hover:border-primary ${
													createForm.ticketType === type
														? "border-primary ring-2 ring-primary ring-offset-2"
														: "border-gray-200 dark:border-gray-700"
												}`}
												onClick={() => handleTicketTypeChange(type as TicketType)}
											>
												<CardHeader className="pb-2">
													<div className="flex items-start gap-2">
														<div className={`p-1.5 rounded-lg ${
															createForm.ticketType === type
																? "bg-primary/10 text-primary"
																: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
														}`}>
															<Icon className="h-4 w-4" />
														</div>
														<div className="flex-1 min-w-0">
															<CardTitle className="text-sm">{title}</CardTitle>
															<CardDescription className="text-[10px] mt-0.5 line-clamp-2">
																{description}
															</CardDescription>
														</div>
													</div>
												</CardHeader>
											</Card>
										))}
									</div>
								</div>

								{createForm.ticketType && (
									<>
										{/* Basic Information */}
										<div className="space-y-4 pt-2 border-t border-gray-200 dark:border-slate-600">
											<Label className="text-sm font-semibold">Basic Information</Label>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="create-name" className="text-xs">Ticket Name</Label>
													<Input
														id="create-name"
														placeholder="e.g. General Admission"
														value={createForm.name}
														onChange={(e) =>
															setCreateForm({ ...createForm, name: e.target.value })
														}
													/>
												</div>

												<div className="space-y-2">
													<Label htmlFor="create-category" className="text-xs">Access Level / Category</Label>
													<select
														id="create-category"
														value={createForm.category}
														onChange={(e) =>
															setCreateForm({ ...createForm, category: e.target.value })
														}
														className="w-full px-3 py-2 border border-gray-200 dark:border-slate-600 rounded-md !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 text-sm"
													>
														<option value="VIP">VIP</option>
														<option value="PREMIUM">PREMIUM</option>
														<option value="BACKSTAGE">BACKSTAGE</option>
														<option value="GENERAL">GENERAL</option>
													</select>
												</div>
											</div>

											<div className="space-y-2">
												<Label htmlFor="create-description" className="text-xs">Description</Label>
												<Textarea
													id="create-description"
													placeholder="Describe what's included with this ticket"
													rows={2}
													value={createForm.description}
													onChange={(e) =>
														setCreateForm({ ...createForm, description: e.target.value })
													}
													className="text-sm"
												/>
											</div>
										</div>

										{/* Type-Specific Configuration */}
										<div className="space-y-4 pt-2 border-t border-gray-200 dark:border-slate-600">
											<Label className="text-sm font-semibold">
												{createForm.ticketType === "access-level" && "Pricing & Capacity"}
												{createForm.ticketType === "seated" && "Seating Configuration"}
												{createForm.ticketType === "booth-table" && "Booth/Table Configuration"}
												{createForm.ticketType === "vendor-booth" && "Vendor Booth Configuration"}
											</Label>

											{/* Access Level Ticket Configuration */}
											{createForm.ticketType === "access-level" && (
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label htmlFor="create-price" className="text-xs">Price (USD)</Label>
														<Input
															id="create-price"
															type="number"
															step="0.01"
															min="0"
															placeholder="25.00"
															value={createForm.price || ""}
															onChange={(e) =>
																setCreateForm({
																	...createForm,
																	price: Number(e.target.value) || undefined,
																})
															}
															className="text-sm"
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor="create-capacity" className="text-xs">Total Capacity</Label>
														<Input
															id="create-capacity"
															type="number"
															min="0"
															placeholder="100"
															value={createForm.capacity || ""}
															onChange={(e) =>
																setCreateForm({
																	...createForm,
																	capacity: Number(e.target.value) || undefined,
																})
															}
															className="text-sm"
														/>
													</div>
												</div>
											)}

											{/* Seated Ticket Configuration */}
											{createForm.ticketType === "seated" && (
												<div className="space-y-3">
													<div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
														<Info className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
														<p className="text-xs text-gray-700 dark:text-gray-300">
															Configure seating sections with different pricing.
														</p>
													</div>
													
													<div className="space-y-2">
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={addSeatingSection}
															className="w-full"
														>
															<Plus className="h-3.5 w-3.5 mr-1" />
															Add Section
														</Button>
														
														{createForm.seatingConfig?.sections?.map((section, sectionIndex) => (
															<Card key={sectionIndex} className="p-3">
																<CardContent className="space-y-3 p-0">
																	<div className="flex items-center justify-between mb-2">
																		<Label className="text-xs font-semibold">Section {sectionIndex + 1}</Label>
																		<Button
																			type="button"
																			variant="ghost"
																			size="sm"
																			onClick={() => removeSeatingSection(sectionIndex)}
																			className="h-7 w-7 p-0"
																		>
																			<X className="h-3.5 w-3.5" />
																		</Button>
																	</div>
																	<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
																		<div className="space-y-1">
																			<Label className="text-xs">Name</Label>
																			<Input
																				placeholder="Orchestra"
																				value={section.name}
																				onChange={(e) => updateSeatingSection(sectionIndex, "name", e.target.value)}
																				className="text-xs h-8"
																			/>
																		</div>
																		<div className="space-y-1">
																			<Label className="text-xs">Price</Label>
																			<Input
																				type="number"
																				step="0.01"
																				min="0"
																				placeholder="50.00"
																				value={section.price || ""}
																				onChange={(e) => updateSeatingSection(sectionIndex, "price", Number(e.target.value) || 0)}
																				className="text-xs h-8"
																			/>
																		</div>
																		<div className="space-y-1">
																			<Label className="text-xs">Seats</Label>
																			<Input
																				type="number"
																				min="0"
																				placeholder="50"
																				value={section.totalSeats || ""}
																				onChange={(e) => updateSeatingSection(sectionIndex, "totalSeats", Number(e.target.value) || 0)}
																				className="text-xs h-8"
																			/>
																		</div>
																	</div>
																</CardContent>
															</Card>
														))}
													</div>
												</div>
											)}

											{/* Booth/Table Ticket Configuration */}
											{createForm.ticketType === "booth-table" && (
												<div className="space-y-4">
													<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
														<div className="space-y-2">
															<Label htmlFor="number-of-booths" className="text-xs">Number of Booths</Label>
															<Input
																id="number-of-booths"
																type="number"
																min="1"
																placeholder="1"
																value={createForm.numberOfBooths || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		numberOfBooths: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																How many booths of this type
															</p>
														</div>
														<div className="space-y-2">
															<Label htmlFor="booth-capacity" className="text-xs">Table/Booth Capacity</Label>
															<Input
																id="booth-capacity"
																type="number"
																min="1"
																placeholder="10"
																value={createForm.boothCapacity || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		boothCapacity: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																Seats per booth
															</p>
														</div>
														<div className="space-y-2">
															<Label htmlFor="assignable-tickets" className="text-xs">Assignable Tickets</Label>
															<Input
																id="assignable-tickets"
																type="number"
																min="1"
																placeholder="10"
																value={createForm.assignableTickets || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		assignableTickets: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																Tickets per booth
															</p>
														</div>
														<div className="space-y-2">
															<Label htmlFor="booth-price" className="text-xs">Total Booth Price (USD)</Label>
															<Input
																id="booth-price"
																type="number"
																step="0.01"
																min="0"
																placeholder="500.00"
																value={createForm.boothPrice || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		boothPrice: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																Price per booth
															</p>
														</div>
													</div>
												</div>
											)}

											{/* Vendor Booth Ticket Configuration */}
											{createForm.ticketType === "vendor-booth" && (
												<div className="space-y-3">
													<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
														<div className="space-y-2">
															<Label htmlFor="number-of-vendor-booths" className="text-xs">Number of Booths</Label>
															<Input
																id="number-of-vendor-booths"
																type="number"
																min="1"
																placeholder="1"
																value={createForm.numberOfVendorBooths || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		numberOfVendorBooths: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																How many booths of this type
															</p>
														</div>
														<div className="space-y-2">
															<Label htmlFor="vendor-booth-capacity" className="text-xs">Booth Capacity</Label>
															<Input
																id="vendor-booth-capacity"
																type="number"
																min="1"
																placeholder="5"
																value={createForm.vendorBoothCapacity || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		vendorBoothCapacity: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																People per booth
															</p>
														</div>
														<div className="space-y-2">
															<Label htmlFor="vendor-assignable" className="text-xs">Assignable Staff Tickets</Label>
															<Input
																id="vendor-assignable"
																type="number"
																min="1"
																placeholder="5"
																value={createForm.vendorAssignableTickets || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		vendorAssignableTickets: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																Staff tickets per booth
															</p>
														</div>
														<div className="space-y-2">
															<Label htmlFor="price-per-capacity" className="text-xs">Price Per Person (USD)</Label>
															<Input
																id="price-per-capacity"
																type="number"
																step="0.01"
																min="0"
																placeholder="50.00"
																value={createForm.pricePerCapacity || ""}
																onChange={(e) =>
																	setCreateForm({
																		...createForm,
																		pricePerCapacity: Number(e.target.value) || undefined,
																	})
																}
																className="text-sm"
															/>
															<p className="text-xs text-gray-500 dark:text-gray-400">
																Price per person capacity
															</p>
														</div>
													</div>
												</div>
											)}
										</div>

										{/* Sale Period */}
										<div className="space-y-4 pt-2 border-t border-gray-200 dark:border-slate-600">
											<Label className="text-sm font-semibold">Sale Period</Label>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="create-sale-start" className="text-xs">Sale Start</Label>
													<Input
														id="create-sale-start"
														type="datetime-local"
														value={createForm.saleStart}
														onChange={(e) =>
															setCreateForm({ ...createForm, saleStart: e.target.value })
														}
														className="text-sm"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="create-sale-end" className="text-xs">Sale End</Label>
													<Input
														id="create-sale-end"
														type="datetime-local"
														value={createForm.saleEnd}
														onChange={(e) =>
															setCreateForm({ ...createForm, saleEnd: e.target.value })
														}
														className="text-sm"
													/>
												</div>
											</div>
										</div>

										{/* Additional Options */}
										<div className="space-y-4 pt-2 border-t border-gray-200 dark:border-slate-600">
											<Label className="text-sm font-semibold">Additional Options</Label>
											<div className="space-y-2">
												<Label htmlFor="create-features" className="text-xs">Features (comma-separated)</Label>
												<Input
													id="create-features"
													placeholder="Event Access, Welcome Drink"
													value={createForm.features}
													onChange={(e) =>
														setCreateForm({ ...createForm, features: e.target.value })
													}
													className="text-sm"
												/>
											</div>

											<div className="space-y-2">
												<Label className="text-xs">Color Theme</Label>
												<div className="flex items-center gap-2 flex-wrap">
													{(["blue", "orange", "green", "purple", "red", "pink", "indigo", "teal"] as const).map((colorOption) => {
														const colorMap: Record<string, string> = {
															blue: "bg-blue-500 hover:bg-blue-600",
															orange: "bg-orange-500 hover:bg-orange-600",
															green: "bg-green-500 hover:bg-green-600",
															purple: "bg-purple-500 hover:bg-purple-600",
															red: "bg-red-500 hover:bg-red-600",
															pink: "bg-pink-500 hover:bg-pink-600",
															indigo: "bg-indigo-500 hover:bg-indigo-600",
															teal: "bg-teal-500 hover:bg-teal-600",
														};
														const isSelected = createForm.color === colorOption;
														return (
															<button
																key={colorOption}
																type="button"
																onClick={() =>
																	setCreateForm({ ...createForm, color: colorOption })
																}
																className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${colorMap[colorOption]} ${isSelected ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-gray-400 dark:ring-gray-500 scale-110" : "hover:scale-105"}`}
																title={colorOption}
															/>
														);
													})}
												</div>
											</div>
											
											<div className="flex items-center justify-between py-2 px-3 !bg-white dark:!bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
												<div className="space-y-0.5">
													<Label
														htmlFor="create-active"
														className="text-sm cursor-pointer text-gray-700 dark:text-slate-200"
													>
														Active Status
													</Label>
													<p className="text-xs text-gray-600 dark:text-slate-400">
														Available for sale immediately
													</p>
												</div>
												<Switch
													id="create-active"
													checked={createForm.active}
													onCheckedChange={(v) =>
														setCreateForm({ ...createForm, active: Boolean(v) })
													}
												/>
											</div>
										</div>

										{/* Add/Update Button */}
										<Button
											onClick={handleAddTicketType}
											disabled={!validateForm()}
											className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{editingIndex !== null ? (
												<>
													<Check className="h-4 w-4 mr-2" />
													Update Ticket Type
												</>
											) : (
												<>
													<Plus className="h-4 w-4 mr-2" />
													Add Ticket Type
												</>
											)}
										</Button>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<DialogFooter className="pt-4 border-t border-gray-200 dark:border-slate-600 flex-shrink-0">
					<Button
						variant="outline"
						onClick={() => handleDialogOpenChange(false)}
						className="cursor-pointer"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSaveAll}
						disabled={ticketTypesList.length === 0}
						className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Check className="h-4 w-4 mr-2" />
						Save All Ticket Types ({ticketTypesList.length})
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
