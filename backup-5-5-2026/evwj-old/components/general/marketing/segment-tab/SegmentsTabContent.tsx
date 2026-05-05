"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SegmentCard from "./SegmentCard";
import { AvatarProps } from "../common/Avatar";
import SegmentDetailDrawer, { SegmentDetail } from "./SegmentDetailDrawer";
import CreateSegmentForm, { Filter } from "./CreateSegmentForm";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

export interface Segment {
	id: string;
	title: string;
	description: string;
	guestCount: number;
	avatars: Omit<AvatarProps, "size" | "className">[];
}

export default function SegmentsTabContent() {
	const [selectedSegment, setSelectedSegment] = useState<SegmentDetail | null>(
		null,
	);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [editingSegment, setEditingSegment] = useState<Segment | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [segmentToDelete, setSegmentToDelete] = useState<Segment | null>(null);

	// Mock segments data
	const segments: Segment[] = [
		{
			id: "1",
			title: "VIP Guests",
			description: "Guests who purchased VIP or higher tier tickets",
			guestCount: 45,
			avatars: [
				{ initials: "SJ", color: "bg-green-500" },
				{ initials: "ER", color: "bg-purple-500" },
			],
		},
		{
			id: "2",
			title: "Wedding Attendees",
			description: "Guests who attended wedding events",
			guestCount: 120,
			avatars: [{ initials: "SJ", color: "bg-green-500" }],
		},
		{
			id: "3",
			title: "Corporate Event Attendees",
			description: "Professionals who attended corporate events",
			guestCount: 230,
			avatars: [{ initials: "MC", color: "bg-orange-500" }],
		},
		{
			id: "4",
			title: "High Spenders",
			description: "Guests who spent $1000+ total",
			guestCount: 67,
			avatars: [{ initials: "ER", color: "bg-purple-500" }],
		},
		{
			id: "5",
			title: "Frequent Attendees",
			description: "Guests who attended 3+ events",
			guestCount: 89,
			avatars: [{ initials: "MC", color: "bg-orange-500" }],
		},
		{
			id: "6",
			title: "Young Adults (18-34)",
			description: "Guests aged 18-34",
			guestCount: 156,
			avatars: [{ initials: "DK", color: "bg-blue-500" }],
		},
		{
			id: "7",
			title: "Festival Goers",
			description: "Guests who attended festival events",
			guestCount: 342,
			avatars: [{ initials: "DK", color: "bg-blue-500" }],
		},
	];

	const handleMenuClick = (segmentId: string, e: React.MouseEvent) => {
		e.stopPropagation();
		// Handle menu click
		console.log("Menu clicked for segment:", segmentId);
	};

	const handleSegmentClick = (segment: Segment) => {
		// Create detailed segment data
		const segmentDetail: SegmentDetail = {
			id: segment.id,
			title: segment.title,
			description: segment.description,
			guestCount: segment.guestCount,
			avatars: segment.avatars,
			totalSpending: segment.id === "1" ? 2500 : segment.guestCount * 500,
			avgSpent: segment.id === "1" ? 1250 : 500,
			totalEvents: segment.id === "1" ? 2 : 1,
			createdDate: "01/01/2024",
			lastUpdated: "01/01/2024",
			filterCriteria:
				segment.id === "1"
					? "ticket Tier in VIP, Platinum, Diamond"
					: segment.id === "4"
						? "totalSpending >= 1000"
						: "eventType in Wedding",
			guests:
				segment.id === "1"
					? [
							{
								id: "1",
								name: "Sarah Johnson",
								email: "sarah.johnson@email.com",
								initials: "SJ",
								color: "bg-green-500",
								spending: 500,
								events: 1,
							},
							{
								id: "2",
								name: "Emily Rodriguez",
								email: "emily.r@email.com",
								initials: "ER",
								color: "bg-purple-500",
								spending: 2000,
								events: 1,
							},
						]
					: [
							{
								id: "1",
								name: "Sample Guest",
								email: "guest@email.com",
								initials: segment.avatars[0]?.initials || "SG",
								color: segment.avatars[0]?.color || "bg-blue-500",
								spending: 500,
								events: 1,
							},
						],
			ageDistribution: {
				range: "45-54",
				percentage: 50,
			},
			eventTypeAttendance: [
				{ type: "Wedding", percentage: 100 },
				{ type: "Fundraiser", percentage: 100 },
			],
			topLocations: [
				{ location: "New York, NY", count: 1 },
				{ location: "Los Angeles, CA", count: 1 },
			],
			campaigns: [
				{
					id: "1",
					name: "Summer Wedding Campaign 2025",
					description: "Multi-channel campaign for upcoming summer wedding",
					status: "draft",
				},
				{
					id: "2",
					name: "Charity Gala Invitations",
					description: "Premium campaign with physical mail for VIP guests",
					status: "completed",
				},
			],
			isAutomatic: false,
		};

		setSelectedSegment(segmentDetail);
		setDrawerOpen(true);
	};

	const handleEdit = (segmentId: string) => {
		const segment = segments.find((s) => s.id === segmentId);
		if (segment) {
			setEditingSegment(segment);
			setShowCreateForm(true);
		}
	};

	const handleDelete = (segmentId: string) => {
		const segment = segments.find((s) => s.id === segmentId);
		if (segment) {
			setSegmentToDelete(segment);
			setDeleteDialogOpen(true);
		}
	};

	const handleConfirmDelete = () => {
		if (segmentToDelete) {
			console.log("Delete segment:", segmentToDelete.id);
			// Handle delete
			setDeleteDialogOpen(false);
			setSegmentToDelete(null);
		}
	};

	const getFilterCriteriaForSegment = (segmentId: string): string => {
		// This matches the logic in handleSegmentClick
		if (segmentId === "1") {
			return "ticket Tier in VIP, Platinum, Diamond";
		} else if (segmentId === "4") {
			return "totalSpending >= 1000";
		} else {
			return "eventType in Wedding";
		}
	};

	const handleCreateCampaign = (segmentId: string) => {
		console.log("Create campaign for segment:", segmentId);
		// Handle create campaign
	};

	const handleExport = (segmentId: string) => {
		console.log("Export segment:", segmentId);
		// Handle export
	};

	const handleCreateSegment = () => {
		setShowCreateForm(true);
	};

	const handleCancelCreate = () => {
		setShowCreateForm(false);
		setEditingSegment(null);
	};

	const handleSubmitSegment = (data: {
		name: string;
		description: string;
		filters: any[];
	}) => {
		if (editingSegment) {
			console.log("Update segment:", editingSegment.id, data);
			// Handle segment update
		} else {
			console.log("Create segment:", data);
			// Handle segment creation
		}
		setShowCreateForm(false);
		setEditingSegment(null);
	};

	// Helper function to convert filterCriteria string to Filter array
	const parseFilterCriteria = (criteria: string): Filter[] => {
		const filters: Filter[] = [];
		// Simple parsing - you may need to adjust based on your actual format
		// Example formats: "ticket Tier in VIP, Platinum, Diamond" or "totalSpending >= 1000"
		try {
			const match = criteria.match(
				/(\w+(?:\s+\w+)*)\s+(in|>=|<=|>|<|equals|contains)\s+(.+)/i,
			);
			if (match) {
				filters.push({
					id: Date.now().toString(),
					field: match[1].toLowerCase().replace(/\s+/g, ""),
					operator: match[2].toLowerCase(),
					value: match[3].trim(),
				});
			}
		} catch (e) {
			console.error("Error parsing filter criteria:", e);
		}
		return filters;
	};

	if (showCreateForm) {
		const initialData = editingSegment
			? {
					name: editingSegment.title,
					description: editingSegment.description,
					filters: parseFilterCriteria(
						getFilterCriteriaForSegment(editingSegment.id),
					),
				}
			: undefined;

		return (
			<CreateSegmentForm
				onCancel={handleCancelCreate}
				onSubmit={handleSubmitSegment}
				initialData={initialData}
				isEdit={!!editingSegment}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
				<div>
					<h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
						Guest Segments
					</h2>
					<p className="text-xs sm:text-sm text-muted-foreground mt-1">
						Organize guests by demographics and behavior.
					</p>
				</div>
				<Button
					onClick={handleCreateSegment}
					className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md w-full sm:w-auto text-sm sm:text-base"
				>
					<Plus className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
					Create Segment
				</Button>
			</div>

			{/* Segment Cards Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
				{segments.map((segment) => (
					<SegmentCard
						key={segment.id}
						title={segment.title}
						description={segment.description}
						guestCount={segment.guestCount}
						avatars={segment.avatars}
						onClick={() => handleSegmentClick(segment)}
						onEdit={() => handleEdit(segment.id)}
						onDelete={() => handleDelete(segment.id)}
					/>
				))}
			</div>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleConfirmDelete}
				title="Delete Segment?"
				description={
					segmentToDelete
						? `Are you sure you want to delete "${segmentToDelete.title}"? This action cannot be undone.`
						: "Are you sure you want to delete this segment? This action cannot be undone."
				}
				confirmText="Delete"
				variant="destructive"
			/>

			{/* Segment Detail Drawer */}
			<SegmentDetailDrawer
				segment={selectedSegment}
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onCreateCampaign={handleCreateCampaign}
				onExport={handleExport}
			/>
		</div>
	);
}
