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
import { Badge } from "@/components/ui/badge";
import { Info, Users, Layout, Building2, Store, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { EditTicketDialogProps, TicketType, SeatingSection } from "../types";

export default function EditTicketDialog({
	open,
	onOpenChange,
	editForm,
	setEditForm,
	onSave,
	onCancel,
}: EditTicketDialogProps) {
	const ticketTypeLabels: Record<TicketType, string> = {
		"access-level": "Access Level Ticket",
		"seated": "Seated Ticket",
		"booth-table": "Booth/Table Ticket",
		"vendor-booth": "Vendor Booth Ticket",
	};

	const updateSeatingSection = (index: number, field: keyof SeatingSection, value: any) => {
		const updated = { ...editForm.seatingConfig! };
		if (!updated.sections) updated.sections = [];
		updated.sections[index] = { ...updated.sections[index], [field]: value };
		setEditForm({ ...editForm, seatingConfig: updated });
	};

	const removeSeatingSection = (index: number) => {
		const updated = { ...editForm.seatingConfig! };
		updated.sections = updated.sections!.filter((_, i) => i !== index);
		setEditForm({ ...editForm, seatingConfig: updated });
	};

	const addSeatingSection = () => {
		const newSection: SeatingSection = {
			name: `Section ${(editForm.seatingConfig?.sections?.length || 0) + 1}`,
			price: 0,
			totalSeats: 0,
		};
		setEditForm({
			...editForm,
			seatingConfig: {
				sections: [...(editForm.seatingConfig?.sections || []), newSection],
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[750px] md:max-w-[900px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold">
						Edit Ticket Type
					</DialogTitle>
					<DialogDescription>
						Update ticket details and configuration.
						{editForm.ticketType && (
							<div className="mt-2">
								<Badge variant="outline" className="text-xs">
									{ticketTypeLabels[editForm.ticketType]}
								</Badge>
							</div>
						)}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="edit-name">Ticket Name</Label>
						<Input
							id="edit-name"
							value={editForm.name}
							onChange={(e) =>
								setEditForm({ ...editForm, name: e.target.value })
							}
							placeholder="Enter ticket name"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="edit-category">Access Level / Category</Label>
						<Input
							id="edit-category"
							value={editForm.category}
							onChange={(e) =>
								setEditForm({ ...editForm, category: e.target.value })
							}
							placeholder="e.g., General, VIP"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="edit-description">Description</Label>
						<Textarea
							id="edit-description"
							value={editForm.description}
							onChange={(e) =>
								setEditForm({ ...editForm, description: e.target.value })
							}
							placeholder="Enter ticket description"
							rows={3}
						/>
					</div>

					{/* Type-Specific Fields */}
					{editForm.ticketType === "access-level" && (
						<div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-slate-600">
							<div className="space-y-2">
								<Label htmlFor="edit-price">Price (USD)</Label>
								<Input
									id="edit-price"
									type="number"
									step="0.01"
									min="0"
									value={editForm.price || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, price: Number(e.target.value) || undefined })
									}
									placeholder="0"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-capacity">Capacity</Label>
								<Input
									id="edit-capacity"
									type="number"
									min="0"
									value={editForm.capacity || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, capacity: Number(e.target.value) || undefined })
									}
									placeholder="0"
								/>
							</div>
						</div>
					)}

					{editForm.ticketType === "seated" && editForm.seatingConfig && (
						<div className="space-y-4 pt-2 border-t border-gray-200 dark:border-slate-600">
							<div className="flex items-center justify-between">
								<Label>Seating Sections</Label>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={addSeatingSection}
								>
									+ Add Section
								</Button>
							</div>
							{editForm.seatingConfig.sections?.map((section, sectionIndex) => (
								<Card key={sectionIndex} className="p-4">
									<CardContent className="space-y-4 p-0">
										<div className="flex items-center justify-between mb-3">
											<Label className="text-sm font-semibold">Section {sectionIndex + 1}</Label>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => removeSeatingSection(sectionIndex)}
												className="h-8 w-8 p-0"
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
											<div className="space-y-2">
												<Label>Section Name</Label>
												<Input
													placeholder="e.g. Orchestra, Balcony"
													value={section.name}
													onChange={(e) => updateSeatingSection(sectionIndex, "name", e.target.value)}
												/>
											</div>
											<div className="space-y-2">
												<Label>Price (USD)</Label>
												<Input
													type="number"
													step="0.01"
													min="0"
													placeholder="50.00"
													value={section.price || ""}
													onChange={(e) => updateSeatingSection(sectionIndex, "price", Number(e.target.value) || 0)}
												/>
											</div>
											<div className="space-y-2">
												<Label>Total Seats</Label>
												<Input
													type="number"
													min="0"
													placeholder="50"
													value={section.totalSeats || ""}
													onChange={(e) => updateSeatingSection(sectionIndex, "totalSeats", Number(e.target.value) || 0)}
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}

					{editForm.ticketType === "booth-table" && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-gray-200 dark:border-slate-600">
							<div className="space-y-2">
								<Label htmlFor="edit-number-of-booths">Number of Booths</Label>
								<Input
									id="edit-number-of-booths"
									type="number"
									min="1"
									value={editForm.numberOfBooths || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, numberOfBooths: Number(e.target.value) || undefined })
									}
									placeholder="1"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-booth-capacity">Table/Booth Capacity</Label>
								<Input
									id="edit-booth-capacity"
									type="number"
									min="1"
									value={editForm.boothCapacity || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, boothCapacity: Number(e.target.value) || undefined })
									}
									placeholder="10"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-assignable-tickets">Assignable Tickets</Label>
								<Input
									id="edit-assignable-tickets"
									type="number"
									min="1"
									value={editForm.assignableTickets || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, assignableTickets: Number(e.target.value) || undefined })
									}
									placeholder="10"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-booth-price">Total Booth Price (USD)</Label>
								<Input
									id="edit-booth-price"
									type="number"
									step="0.01"
									min="0"
									value={editForm.boothPrice || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, boothPrice: Number(e.target.value) || undefined })
									}
									placeholder="500.00"
								/>
							</div>
						</div>
					)}

					{editForm.ticketType === "vendor-booth" && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-gray-200 dark:border-slate-600">
							<div className="space-y-2">
								<Label htmlFor="edit-number-of-vendor-booths">Number of Booths</Label>
								<Input
									id="edit-number-of-vendor-booths"
									type="number"
									min="1"
									value={editForm.numberOfVendorBooths || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, numberOfVendorBooths: Number(e.target.value) || undefined })
									}
									placeholder="1"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-vendor-booth-capacity">Booth Capacity</Label>
								<Input
									id="edit-vendor-booth-capacity"
									type="number"
									min="1"
									value={editForm.vendorBoothCapacity || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, vendorBoothCapacity: Number(e.target.value) || undefined })
									}
									placeholder="5"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-vendor-assignable">Assignable Staff Tickets</Label>
								<Input
									id="edit-vendor-assignable"
									type="number"
									min="1"
									value={editForm.vendorAssignableTickets || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, vendorAssignableTickets: Number(e.target.value) || undefined })
									}
									placeholder="5"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-price-per-capacity">Price Per Person (USD)</Label>
								<Input
									id="edit-price-per-capacity"
									type="number"
									step="0.01"
									min="0"
									value={editForm.pricePerCapacity || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, pricePerCapacity: Number(e.target.value) || undefined })
									}
									placeholder="50.00"
								/>
							</div>
						</div>
					)}

					{/* Fallback for tickets without a ticketType (legacy) */}
					{!editForm.ticketType && (
						<div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-slate-600">
							<div className="space-y-2">
								<Label htmlFor="edit-price">Price (USD)</Label>
								<Input
									id="edit-price"
									type="number"
									step="0.01"
									min="0"
									value={editForm.price || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, price: Number(e.target.value) || undefined })
									}
									placeholder="0"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-capacity">Capacity</Label>
								<Input
									id="edit-capacity"
									type="number"
									min="0"
									value={editForm.capacity || ""}
									onChange={(e) =>
										setEditForm({ ...editForm, capacity: Number(e.target.value) || undefined })
									}
									placeholder="0"
								/>
							</div>
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button
						onClick={onSave}
						className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
					>
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
