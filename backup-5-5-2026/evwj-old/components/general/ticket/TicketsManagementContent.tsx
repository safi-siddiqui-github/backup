"use client";

import { useState } from "react";
import { HiPlus, HiOutlineSquares2X2, HiOutlineBars3 } from "react-icons/hi2";
import type { TicketItem, TicketForm, TicketEditForm } from "./types";
import TicketCard from "./ticket-tab/TicketCard";
import TicketListItem from "./ticket-tab/TicketListItem";
import CreateTicketDialog from "./ticket-tab/CreateTicketDialog";
import EditTicketDialog from "./ticket-tab/EditTicketDialog";
import ViewTicketDialog from "./ticket-tab/ViewTicketDialog";
import DeleteConfirmDialog from "./ticket-tab/DeleteConfirmDialog";

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

	return (
		<div className="mt-8">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
				<h2 className="text-lg text-gray-600 dark:text-gray-400">
					Manage your event tickets and pricing
				</h2>
				<div className="flex items-center gap-2">
					<div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shadow-sm">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-2 rounded-md cursor-pointer ${
								viewMode === "grid"
									? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
									: "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
							} transition-all`}
							title="Grid view"
						>
							<HiOutlineSquares2X2 className="h-5 w-5" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-2 rounded-md cursor-pointer ${
								viewMode === "list"
									? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
									: "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
							} transition-all`}
							title="List view"
						>
							<HiOutlineBars3 className="h-5 w-5" />
						</button>
					</div>
					<button
						onClick={() => setCreateDialogOpen(true)}
						className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
					>
						<HiPlus className="h-5 w-5" />
						Create Ticket Type
					</button>
				</div>
			</div>

			{viewMode === "grid" ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{tickets.map((ticket) => (
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
					{tickets.map((ticket) => (
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
