"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import type {
	Announcement,
	AnnouncementModalProps,
} from "./announcement-types";
import AnnouncementModalHeader from "./AnnouncementModalHeader";
import AnnouncementModalMessage from "./AnnouncementModalMessage";
import AnnouncementModalStats from "./AnnouncementModalStats";
import AnnouncementModalAudience from "./AnnouncementModalAudience";
import AnnouncementModalSearchFilter from "./AnnouncementModalSearchFilter";
import AnnouncementModalRecipientsTable from "./AnnouncementModalRecipientsTable";

const recipientsData = [
	{
		name: "John Doe",
		email: "john.doe@example.com",
		source: "VIP Guests",
		status: "Delivered",
		deliveredAt: "Oct 16, 11:58 AM",
	},
	{
		name: "Jane Smith",
		email: "jane.smith@example.com",
		source: "Wedding Party",
		status: "Opened",
		deliveredAt: "Oct 16, 11:58 AM",
	},
	{
		name: "Michael Johnson",
		email: "michael.j@example.com",
		source: "VIP Guests",
		status: "Clicked",
		deliveredAt: "Oct 16, 11:58 AM",
	},
	{
		name: "Emily Davis",
		email: "emily.davis@example.com",
		source: "Wedding Party",
		status: "Opened",
		deliveredAt: "Oct 16, 11:58 AM",
	},
	{
		name: "Robert Brown",
		email: "robert.brown@example.com",
		source: "VIP Guests",
		status: "Clicked",
		deliveredAt: "Oct 16, 11:58 AM",
	},
	{
		name: "Sarah Wilson",
		email: "sarah.wilson@example.com",
		source: "Wedding Party",
		status: "Clicked",
		deliveredAt: "Oct 16, 11:58 AM",
	},
	{
		name: "David Martinez",
		email: "david.martinez@example.com",
		source: "VIP Guests",
		status: "Delivered",
		deliveredAt: "Oct 16, 11:58 AM",
	},
	{
		name: "Lisa Anderson",
		email: "lisa.anderson@example.com",
		source: "Wedding Party",
		status: "Opened",
		deliveredAt: "Oct 16, 11:58 AM",
	},
];

export default function AnnouncementModal({
	item,
	onClose,
	setShowCreate,
	setSelected,
}: AnnouncementModalProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All Statuses");

	const filteredRecipients = recipientsData.filter((recipient) => {
		const searchMatch =
			recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			recipient.email.toLowerCase().includes(searchTerm.toLowerCase());
		const statusMatch =
			statusFilter === "All Statuses" || recipient.status === statusFilter;
		return searchMatch && statusMatch;
	});

	const handleResend = () => {
		toast.success("Announcement has been resent!");
	};

	const handleDuplicate = () => {
		if (setShowCreate && setSelected) {
			setSelected({ ...item } as Announcement);
			setShowCreate(true);
			onClose();
		}
	};

	// Prevent body scroll when modal is open
	useEffect(() => {
		// Save the original overflow style
		const originalStyle = window.getComputedStyle(document.body).overflow;
		
		// Disable body scroll
		document.body.style.overflow = "hidden";
		
		// Re-enable body scroll when modal closes
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);

	return (
		<div 
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-hidden"
			onClick={onClose}
		>
			<div 
				className="flex flex-col w-[90vw] max-w-5xl max-h-[90vh] rounded-2xl border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Fixed Header Section */}
				<div className="flex-shrink-0 space-y-4 sm:space-y-6 p-6 border-b border-gray-200 dark:border-slate-600">
					<AnnouncementModalHeader
						item={item}
						onDuplicate={handleDuplicate}
						onResend={handleResend}
						onClose={onClose}
					/>
					<AnnouncementModalMessage item={item} />
					<AnnouncementModalStats item={item} />
					<AnnouncementModalAudience recipients={item.recipients} />
					<h3 className="mb-2 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
						Recipients (150)
					</h3>
					<AnnouncementModalSearchFilter
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						statusFilter={statusFilter}
						setStatusFilter={setStatusFilter}
					/>
				</div>
				{/* Scrollable Content Section */}
				<div className="flex-1 min-h-0 overflow-y-auto p-6">
					<AnnouncementModalRecipientsTable recipients={filteredRecipients} />
				</div>
			</div>
		</div>
	);
}
