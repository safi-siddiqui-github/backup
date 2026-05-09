"use client";

import { useState, useMemo, useEffect } from "react";
import { HiPlus, HiOutlineSquares2X2, HiOutlineBars3 } from "react-icons/hi2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TicketItem, TicketForm, TicketEditForm } from "../types";
import TicketCard from "./TicketCard";
import TicketListItem from "./TicketListItem";
import CreateTicketDialog from "./CreateTicketDialog";
import EditTicketDialog from "./EditTicketDialog";
import ViewTicketDialog from "./ViewTicketDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ticketData: TicketItem[] = [
	{
		id: "t1",
		category: "General",
		name: "General Admission",
		description: "Standard event access",
		price: 25,
		revenue: 75,
		sold: 45,
		left: 55,
		capacity: 100,
		status: "Active",
		color: "blue",
		isSoldOut: false,
		recentBuyers: [
			{ name: "John Smith", purchaseDate: "10/13/2025 • 6:44:53 PM" },
			{ name: "Sarah Johnson", purchaseDate: "10/13/2025 • 5:32:21 PM" },
			{ name: "Mike Davis", purchaseDate: "10/13/2025 • 4:15:08 PM" },
		],
	},
	{
		id: "t2",
		category: "Vip",
		name: "VIP Premium",
		description: "Premium experience with exclusive benefits",
		price: 75,
		revenue: 225,
		sold: 12,
		left: 13,
		capacity: 25,
		status: "Active",
		color: "orange",
		isSoldOut: false,
		recentBuyers: [
			{ name: "Emily Wilson", purchaseDate: "10/12/2025 • 8:22:44 PM" },
			{ name: "David Brown", purchaseDate: "10/12/2025 • 7:11:33 PM" },
		],
	},
	{
		id: "t3",
		category: "General",
		name: "Early Bird",
		description: "Limited time discount ticket",
		price: 20,
		revenue: 20,
		sold: 50,
		left: 0,
		capacity: 50,
		status: "Inactive",
		color: "green",
		isSoldOut: true,
		recentBuyers: [
			{ name: "Amanda Taylor", purchaseDate: "10/11/2025 • 3:45:12 PM" },
		],
	},
];

export function TicketsTabContent() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [tickets, setTickets] = useState<TicketItem[]>(ticketData);
	const [expandedBuyersCardId, setExpandedBuyersCardId] = useState<
		string | null
	>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [ticketToEdit, setTicketToEdit] = useState<TicketItem | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);
	const [editForm, setEditForm] = useState<TicketEditForm>({
		name: "",
		category: "",
		description: "",
		price: undefined,
		capacity: undefined,
	});

	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createForm, setCreateForm] = useState<TicketForm>({
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

	const handleToggleBuyersExpand = (ticketId: string) => {
		setExpandedBuyersCardId((prev) => (prev === ticketId ? null : ticketId));
	};

	const [viewDialogOpen, setViewDialogOpen] = useState(false);
	const [ticketToView, setTicketToView] = useState<TicketItem | null>(null);
	const [customersOpen, setCustomersOpen] = useState(true);

	const handleViewClick = (ticketId: string) => {
		const ticket = tickets.find((t) => t.id === ticketId);
		if (ticket) {
			setTicketToView(ticket);
			setViewDialogOpen(true);
		}
	};

	const handleToggleStatus = (ticketId: string) => {
		setTickets((prev) =>
			prev.map((ticket) =>
				ticket.id === ticketId
					? {
							...ticket,
							status: ticket.status === "Active" ? "Inactive" : "Active",
						}
					: ticket,
			),
		);
	};

	const handleDeleteClick = (ticketId: string) => {
		setTicketToDelete(ticketId);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = () => {
		if (ticketToDelete) {
			setTickets((prev) =>
				prev.filter((ticket) => ticket.id !== ticketToDelete),
			);
			setTicketToDelete(null);
			setDeleteDialogOpen(false);
		}
	};

	const handleDeleteCancel = () => {
		setTicketToDelete(null);
		setDeleteDialogOpen(false);
	};

	const handleEditClick = (ticketId: string) => {
		const ticket = tickets.find((t) => t.id === ticketId);
		if (ticket) {
			setTicketToEdit(ticket);
			setEditForm({
				name: ticket.name,
				category: ticket.category,
				description: ticket.description,
				price: ticket.price,
				capacity: ticket.capacity,
				ticketType: ticket.ticketType,
				seatingConfig: ticket.seatingConfig,
				numberOfBooths: ticket.numberOfBooths,
				boothCapacity: ticket.boothCapacity,
				assignableTickets: ticket.assignableTickets,
				boothPrice: ticket.boothPrice,
				numberOfVendorBooths: ticket.numberOfVendorBooths,
				vendorBoothCapacity: ticket.vendorBoothCapacity,
				vendorAssignableTickets: ticket.vendorAssignableTickets,
				pricePerCapacity: ticket.pricePerCapacity,
				pricingTiers: ticket.pricingTiers,
			});
			setEditDialogOpen(true);
		}
	};

	const handleEditSave = () => {
		if (ticketToEdit) {
			let updatedCapacity = editForm.capacity ?? ticketToEdit.capacity;
			const updatedPrice = editForm.price ?? ticketToEdit.price;
			
			// Recalculate capacity for booth types if numberOfBooths changed
			if (editForm.ticketType === "booth-table" || ticketToEdit.ticketType === "booth-table") {
				const numberOfBooths = editForm.numberOfBooths ?? ticketToEdit.numberOfBooths ?? 1;
				const seatsPerBooth = editForm.boothCapacity ?? ticketToEdit.boothCapacity ?? 0;
				updatedCapacity = numberOfBooths * seatsPerBooth;
			} else if (editForm.ticketType === "vendor-booth" || ticketToEdit.ticketType === "vendor-booth") {
				const numberOfBooths = editForm.numberOfVendorBooths ?? ticketToEdit.numberOfVendorBooths ?? 1;
				const peoplePerBooth = editForm.vendorBoothCapacity ?? ticketToEdit.vendorBoothCapacity ?? 0;
				updatedCapacity = numberOfBooths * peoplePerBooth;
			}
			
			setTickets((prev) =>
				prev.map((ticket) =>
					ticket.id === ticketToEdit.id
						? {
								...ticket,
								name: editForm.name,
								category: editForm.category,
								description: editForm.description,
								price: updatedPrice,
								capacity: updatedCapacity,
								left: updatedCapacity - ticket.sold,
								ticketType: editForm.ticketType ?? ticket.ticketType,
								seatingConfig: editForm.seatingConfig ?? ticket.seatingConfig,
								numberOfBooths: editForm.numberOfBooths ?? ticket.numberOfBooths,
								boothCapacity: editForm.boothCapacity ?? ticket.boothCapacity,
								assignableTickets: editForm.assignableTickets ?? ticket.assignableTickets,
								boothPrice: editForm.boothPrice ?? ticket.boothPrice,
								numberOfVendorBooths: editForm.numberOfVendorBooths ?? ticket.numberOfVendorBooths,
								vendorBoothCapacity: editForm.vendorBoothCapacity ?? ticket.vendorBoothCapacity,
								vendorAssignableTickets: editForm.vendorAssignableTickets ?? ticket.vendorAssignableTickets,
								pricePerCapacity: editForm.pricePerCapacity ?? ticket.pricePerCapacity,
								pricingTiers: editForm.pricingTiers ?? ticket.pricingTiers,
							}
						: ticket,
				),
			);
			setTicketToEdit(null);
			setEditDialogOpen(false);
		}
	};

	const handleEditCancel = () => {
		setTicketToEdit(null);
		setEditDialogOpen(false);
	};

	const handleCopyClick = (ticketId: string) => {
		const ticket = tickets.find((t) => t.id === ticketId);
		if (ticket) {
			const newTicket: TicketItem = {
				...ticket,
				id: `t${Date.now()}`,
				name: `${ticket.name} (Copy)`,
				revenue: 0,
				sold: 0,
				left: ticket.capacity,
				status: "Inactive",
				recentBuyers: [],
			};
			setTickets((prev) => [...prev, newTicket]);
		}
	};

	const createTicketFromForm = (ticketForm: TicketForm, id?: number): TicketItem => {
		// Calculate capacity based on ticket type
		let calculatedCapacity = 0;
		let calculatedPrice = 0;

		if (ticketForm.ticketType === "access-level") {
			calculatedCapacity = Number(ticketForm.capacity) || 0;
			calculatedPrice = Number(ticketForm.price) || 0;
		} else if (ticketForm.ticketType === "seated") {
			// Sum up all seats from sections
			calculatedCapacity = ticketForm.seatingConfig?.sections?.reduce((sum, section) => {
				return sum + (section.totalSeats || 0);
			}, 0) || 0;
			calculatedPrice = 0; // Price varies by section
		} else if (ticketForm.ticketType === "booth-table") {
			// For booths, capacity is the total number of booths * seats per booth
			const numberOfBooths = Number(ticketForm.numberOfBooths) || 1;
			const seatsPerBooth = Number(ticketForm.boothCapacity) || 0;
			calculatedCapacity = numberOfBooths * seatsPerBooth;
			calculatedPrice = Number(ticketForm.boothPrice) || 0;
		} else if (ticketForm.ticketType === "vendor-booth") {
			// For vendor booths, capacity is the total number of booths * people per booth
			const numberOfBooths = Number(ticketForm.numberOfVendorBooths) || 1;
			const peoplePerBooth = Number(ticketForm.vendorBoothCapacity) || 0;
			calculatedCapacity = numberOfBooths * peoplePerBooth;
			calculatedPrice = (Number(ticketForm.vendorBoothCapacity) || 0) * (Number(ticketForm.pricePerCapacity) || 0);
		} else {
			calculatedCapacity = Number(ticketForm.capacity) || 0;
			calculatedPrice = Number(ticketForm.price) || 0;
		}

		return {
			id: id ? `t${id}` : `t${Date.now()}`,
			ticketType: ticketForm.ticketType,
			category: ticketForm.category,
			name: ticketForm.name || "Untitled Ticket",
			description: ticketForm.description,
			price: calculatedPrice,
			revenue: 0,
			sold: 0,
			left: calculatedCapacity,
			capacity: calculatedCapacity,
			status: ticketForm.active ? "Active" : "Inactive",
			color: ticketForm.color,
			isSoldOut: false,
			recentBuyers: [],
			// Include type-specific fields
			seatingConfig: ticketForm.seatingConfig,
			numberOfBooths: ticketForm.numberOfBooths,
			boothCapacity: ticketForm.boothCapacity,
			assignableTickets: ticketForm.assignableTickets,
			boothPrice: ticketForm.boothPrice,
			numberOfVendorBooths: ticketForm.numberOfVendorBooths,
			vendorBoothCapacity: ticketForm.vendorBoothCapacity,
			vendorAssignableTickets: ticketForm.vendorAssignableTickets,
			pricePerCapacity: ticketForm.pricePerCapacity,
			pricingTiers: ticketForm.pricingTiers,
		};
	};

	// Pagination calculations
	const totalPages = Math.ceil(tickets.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedTickets = tickets.slice(startIndex, endIndex);

	// Reset to page 1 when items per page changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	return (
		<div className="mt-8">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
				<h2 className="text-lg text-gray-900 dark:text-slate-200">
					Manage your event tickets and pricing
				</h2>
				<div className="flex items-center gap-2">
					<div className="flex items-center !bg-white dark:!bg-slate-700/50 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-2 rounded-md cursor-pointer ${
								viewMode === "grid"
									? "bg-indigo-600 text-white shadow-sm"
									: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
							} transition-all`}
							title="Grid view"
						>
							<HiOutlineSquares2X2 className="h-5 w-5" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-2 rounded-md cursor-pointer ${
								viewMode === "list"
									? "bg-indigo-600 text-white shadow-sm"
									: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
							} transition-all`}
							title="List view"
						>
							<HiOutlineBars3 className="h-5 w-5" />
						</button>
					</div>
					<button
						onClick={() => setCreateDialogOpen(true)}
						className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
					>
						<HiPlus className="h-5 w-5" />
						Create Ticket Type
					</button>
				</div>
			</div>

			{viewMode === "grid" ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
					{paginatedTickets.map((ticket) => (
						<TicketCard
							key={ticket.id}
							ticket={ticket}
							onToggleStatus={handleToggleStatus}
							onDelete={handleDeleteClick}
							onEdit={handleEditClick}
							onCopy={handleCopyClick}
							expandedBuyers={expandedBuyersCardId === ticket.id}
							onToggleBuyersExpand={handleToggleBuyersExpand}
							onView={handleViewClick}
						/>
					))}
				</div>
			) : (
				<div className="space-y-4">
					{paginatedTickets.map((ticket) => (
						<TicketListItem
							key={ticket.id}
							ticket={ticket}
							onToggleStatus={handleToggleStatus}
							onDelete={handleDeleteClick}
							onEdit={handleEditClick}
							onCopy={handleCopyClick}
							expandedBuyers={expandedBuyersCardId === ticket.id}
							onToggleBuyersExpand={handleToggleBuyersExpand}
							onView={handleViewClick}
						/>
					))}
				</div>
			)}

			{/* Pagination */}
			{tickets.length > 0 && (
				<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
					<CardContent className="p-4">
						<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600 dark:text-slate-400">
									Items per page:
								</span>
								<select
									value={itemsPerPage}
									onChange={(e) => {
										setItemsPerPage(Number(e.target.value));
										setCurrentPage(1);
									}}
									className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<option value={10}>10</option>
									<option value={20}>20</option>
									<option value={30}>30</option>
									<option value={40}>40</option>
									<option value={50}>50</option>
								</select>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600 dark:text-slate-400">
									Showing {startIndex + 1} -{" "}
									{Math.min(endIndex, tickets.length)} of {tickets.length}
								</span>
								<div className="flex items-center gap-1">
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((prev) => Math.max(1, prev - 1))
										}
										disabled={currentPage === 1}
									>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
										Page {currentPage} of {totalPages}
									</span>
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((prev) =>
												Math.min(totalPages, prev + 1),
											)
										}
										disabled={currentPage === totalPages}
									>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			<DeleteConfirmDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onCancel={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
			/>
			<CreateTicketDialog
				open={createDialogOpen}
				onOpenChange={setCreateDialogOpen}
				createForm={createForm}
				setCreateForm={setCreateForm}
				onCreate={() => {
					// Single ticket creation (for backward compatibility)
					const newTicket = createTicketFromForm(createForm);
					setTickets((prev) => [...prev, newTicket]);
					setCreateDialogOpen(false);
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
				}}
				onCreateMultiple={(ticketForms) => {
					// Create multiple tickets at once
					const baseTimestamp = Date.now();
					const newTickets: TicketItem[] = ticketForms.map((ticketForm, index) => {
						return createTicketFromForm(ticketForm, baseTimestamp + index);
					});
					setTickets((prev) => [...prev, ...newTickets]);
					setCreateDialogOpen(false);
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
				}}
			/>
			<EditTicketDialog
				open={editDialogOpen}
				onOpenChange={setEditDialogOpen}
				editForm={editForm}
				setEditForm={setEditForm}
				onSave={handleEditSave}
				onCancel={handleEditCancel}
			/>
			<ViewTicketDialog
				open={viewDialogOpen}
				onOpenChange={setViewDialogOpen}
				ticket={ticketToView}
				customersOpen={customersOpen}
				setCustomersOpen={setCustomersOpen}
			/>
		</div>
	);
}
