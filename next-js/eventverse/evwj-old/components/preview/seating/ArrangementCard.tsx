import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import type { Guest, SeatingArrangement } from "@/types/venue";
import {
	Building2,
	Clock,
	Copy,
	Edit,
	MoreVertical,
	TableIcon,
	Trash2,
	Users,
} from "lucide-react";
import { useState } from "react";
import { AssignedGuestList } from "./AssignedGuestList";
import BuildingOutline from "./BuildingOutline";
import { inferLayoutType } from "./mockBuildingLayouts";
import PresetPreviewCanvas from "./PresetPreviewCanvas";

interface ArrangementCardProps {
	arrangement: SeatingArrangement;
	onEdit: () => void;
}

const ArrangementCard = ({ arrangement, onEdit }: ArrangementCardProps) => {
	const { duplicateArrangement, deleteArrangement, updateArrangement } = useVenueHierarchy();
	const [showEditDialog, setShowEditDialog] = useState(false);
	const [editName, setEditName] = useState(arrangement.name);

	const tableCount = arrangement.tables?.length || 0;
	const chairCount = arrangement.chairs?.length || 0;
	const seatCount = arrangement.seats?.length || 0;

	const totalCapacity =
		(arrangement.tables?.reduce((sum, t) => sum + t.seats, 0) || 0) +
		chairCount +
		seatCount;

	const assignedCount =
		(arrangement.tables?.reduce(
			(sum, t) => sum + Object.keys(t.seatAssignments || {}).length,
			0,
		) || 0) + (arrangement.chairs?.filter((c) => c.guest).length || 0);

	// Get all assigned guests
	const assignedGuests: Guest[] = [
		...(arrangement.tables?.flatMap((t) =>
			Object.values(t.seatAssignments || {}),
		) || []),
		...(arrangement.chairs?.filter((c) => c.guest).map((c) => c.guest!) || []),
	];

	// Helper function to get guest assignment details
	const getGuestAssignment = (guest: Guest) => {
		// Check tables
		const table = arrangement.tables?.find((t) =>
			Object.values(t.seatAssignments || {}).some((g) => g.id === guest.id),
		);
		if (table) {
			const seatNumber = Object.entries(table.seatAssignments || {}).find(
				([_, g]) => g.id === guest.id,
			)?.[0];
			return {
				tableName: table.name,
				seatNumber: seatNumber ? parseInt(seatNumber) : undefined,
			};
		}

		// Check chairs
		const chair = arrangement.chairs?.find((c) => c.guest?.id === guest.id);
		if (chair) {
			return { chairName: chair.name };
		}

		return {};
	};

	const handleDuplicate = (e: React.MouseEvent) => {
		e.stopPropagation();
		const newName = `${arrangement.name} (Copy)`;
		duplicateArrangement(arrangement.id, newName);
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (confirm(`Delete arrangement "${arrangement.name}"?`)) {
			deleteArrangement(arrangement.id);
		}
	};

	const handleEditName = (e: React.MouseEvent) => {
		e.stopPropagation();
		setEditName(arrangement.name);
		setShowEditDialog(true);
	};

	const handleSaveName = () => {
		if (editName.trim()) {
			updateArrangement(arrangement.id, { name: editName.trim() });
			setShowEditDialog(false);
		}
	};

	const layoutType = inferLayoutType(arrangement.name, arrangement.venueType);

	return (
		<Card
			className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] hover:border-primary/30 group w-full min-w-[280px] max-w-[320px] cursor-pointer border transition-all duration-200 hover:shadow-sm"
			onClick={onEdit}
		>
			{/* Gradient Overlay */}
			<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50 pointer-events-none" />
			
			<CardContent className="relative z-10 p-4">
				{/* Header with Title and Actions */}
				<div className="mb-3 flex items-start justify-between gap-2">
					<div className="min-w-0 flex-1">
						<h3 className="text-foreground group-hover:text-primary truncate text-sm font-semibold transition-colors">
							{arrangement.name}
						</h3>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
							>
								<MoreVertical className="h-3.5 w-3.5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={handleEditName}>
								<Edit className="mr-2 h-4 w-4" />
								Edit Name
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onEdit}>
								<TableIcon className="mr-2 h-4 w-4" />
								Open Editor
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleDuplicate}>
								<Copy className="mr-2 h-4 w-4" />
								Duplicate
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleDelete}
								className="text-destructive"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>


				{/* Info Row - Time, Stats, Status */}
				<div className="space-y-2">
					{/* Time Range */}
					{(arrangement.startTime || arrangement.endTime) && (
						<div className="text-muted-foreground flex items-center gap-1.5 text-xs">
							<Clock className="h-3 w-3" />
							<span>
								{arrangement.startTime} - {arrangement.endTime}
							</span>
						</div>
					)}

					{/* Stats - Compact */}
					<div className="flex items-center gap-3 text-xs">
						<div className="text-muted-foreground flex items-center gap-1">
							<TableIcon className="h-3 w-3" />
							<span>{tableCount}</span>
						</div>
						<div className="text-muted-foreground flex items-center gap-1">
							<Users className="h-3 w-3" />
							<span>{totalCapacity}</span>
						</div>
						<div className="text-muted-foreground flex items-center gap-1">
							<span>Assigned:</span>
							{assignedGuests.length > 0 ? (
								<AssignedGuestList
									guests={assignedGuests}
									arrangementName={arrangement.name}
									totalCapacity={totalCapacity}
									getGuestAssignment={getGuestAssignment}
								/>
							) : (
								<span className="font-medium text-foreground">
									{assignedCount} / {totalCapacity}
								</span>
							)}
						</div>
					</div>

					{/* Status Badge */}
					<div className="flex items-center justify-between">
						<Badge
							variant={arrangement.isActive ? "default" : "secondary"}
							className="text-xs"
						>
							{arrangement.isActive ? "Active" : "Inactive"}
						</Badge>
					</div>
				</div>
			</CardContent>

			{/* Edit Name Dialog */}
			<Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
				<DialogContent onClick={(e) => e.stopPropagation()}>
					<DialogHeader>
						<DialogTitle>Edit Arrangement Name</DialogTitle>
						<DialogDescription>
							Update the name of this seating arrangement.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="arrangement-name">Name</Label>
							<Input
								id="arrangement-name"
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
								placeholder="Enter arrangement name"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSaveName();
									}
								}}
								autoFocus
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowEditDialog(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleSaveName} disabled={!editName.trim()}>
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Card>
	);
};

export default ArrangementCard;
