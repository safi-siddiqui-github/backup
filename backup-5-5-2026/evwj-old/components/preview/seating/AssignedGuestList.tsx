import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Guest } from "@/types/venue";
import { ChevronDown, Search, Users, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { GuestAvatar } from "./GuestAvatar";
import { GuestProfileDialog } from "./GuestProfileDialog";

interface AssignedGuestListProps {
	guests: Guest[];
	arrangementName: string;
	totalCapacity: number;
	getGuestAssignment?: (guest: Guest) => {
		tableName?: string;
		seatNumber?: number;
		chairName?: string;
	};
}

export const AssignedGuestList = ({
	guests,
	arrangementName,
	totalCapacity,
	getGuestAssignment,
}: AssignedGuestListProps) => {
	const [showDialog, setShowDialog] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
	const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
	const [showProfileDialog, setShowProfileDialog] = useState(false);

	const displayLimit = 5;
	const hasMore = guests.length > displayLimit;

	const filteredGuests = guests.filter((guest) => {
		if (
			searchQuery &&
			!guest.name.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}
		if (selectedGroup && guest.group !== selectedGroup) {
			return false;
		}
		if (selectedDietary && guest.dietary !== selectedDietary) {
			return false;
		}
		return true;
	});

	const uniqueGroups = Array.from(
		new Set(guests.map((g) => g.group).filter(Boolean)),
	);
	const uniqueDietary = Array.from(
		new Set(guests.map((g) => g.dietary).filter(Boolean)),
	);

	const handleAvatarClick = (guest: Guest) => {
		setSelectedGuest(guest);
		setShowProfileDialog(true);
	};

	return (
		<>
			{/* Avatar Stack - Always Visible */}
			<div className="flex items-center gap-2">
				<div className="flex -space-x-2">
					{guests.slice(0, displayLimit).map((guest) => (
						<div
							key={guest.id}
							className="ring-background rounded-full ring-2"
							onClick={() => handleAvatarClick(guest)}
						>
							<GuestAvatar
								name={guest.name}
								initials={guest.initials}
								avatarColor={guest.avatarColor}
								size="sm"
								showStatus
								status="assigned"
								onClick={() => handleAvatarClick(guest)}
							/>
						</div>
					))}
				</div>
				{hasMore && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowDialog(true)}
						className="text-muted-foreground hover:text-foreground text-xs"
					>
						+{guests.length - displayLimit} more
					</Button>
				)}
				{!hasMore && guests.length > 0 && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowDialog(true)}
						className="text-muted-foreground hover:text-foreground text-xs"
					>
						<ChevronDown className="ml-1 h-3 w-3" />
					</Button>
				)}
			</div>

			{/* Full Guest List Dialog */}
			<Dialog open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent className="flex max-h-[80vh] max-w-2xl flex-col">
					<DialogHeader>
						<DialogTitle>Assigned Guests - {arrangementName}</DialogTitle>
						<div className="text-muted-foreground text-sm">
							{guests.length} / {totalCapacity} seats assigned
						</div>
					</DialogHeader>

					{/* Search and Filters */}
					<div className="space-y-3">
						<div className="relative">
							<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
							<Input
								placeholder="Search guests..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-9"
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button
								variant={selectedGroup === null ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedGroup(null)}
							>
								All Groups
							</Button>
							{uniqueGroups.map((group) => (
								<Button
									key={group}
									variant={selectedGroup === group ? "default" : "outline"}
									size="sm"
									onClick={() => {
										// setSelectedGroup(group === selectedGroup ? null : group)
									}}
								>
									{group}
								</Button>
							))}
						</div>

						<div className="flex flex-wrap gap-2">
							<Button
								variant={selectedDietary === null ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedDietary(null)}
							>
								All Dietary
							</Button>
							{uniqueDietary.map((dietary) => (
								<Button
									key={dietary}
									variant={selectedDietary === dietary ? "default" : "outline"}
									size="sm"
									onClick={() => {
										// setSelectedDietary(
										//   dietary === selectedDietary ? null : dietary,
										// )
									}}
								>
									{dietary}
								</Button>
							))}
						</div>
					</div>

					{/* Guest List */}
					<div className="flex-1 space-y-2 overflow-y-auto pr-2">
						{filteredGuests.map((guest) => {
							const assignment = getGuestAssignment
								? getGuestAssignment(guest)
								: {};
							return (
								<div
									key={guest.id}
									className="border-border hover:bg-accent/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors"
									onClick={() => handleAvatarClick(guest)}
								>
									<GuestAvatar
										name={guest.name}
										initials={guest.initials}
										avatarColor={guest.avatarColor}
										size="md"
										showStatus
										status="assigned"
									/>

									<div className="min-w-0 flex-1">
										<div className="text-foreground truncate text-sm font-medium">
											{guest.name}
										</div>
										<div className="text-muted-foreground truncate text-xs">
											{guest.email}
										</div>
										{assignment.tableName && (
											<div className="mt-0.5 text-xs text-green-600 dark:text-green-400">
												{assignment.tableName} • Seat {assignment.seatNumber}
											</div>
										)}
										{assignment.chairName && (
											<div className="mt-0.5 text-xs text-green-600 dark:text-green-400">
												{assignment.chairName}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-1">
										{guest.group && (
											<Badge
												variant="secondary"
												className="flex items-center gap-1 text-xs"
											>
												<Users className="h-3 w-3" />
												{guest.group}
											</Badge>
										)}
										{guest.dietary && guest.dietary !== "None" && (
											<Badge
												variant="outline"
												className="flex items-center gap-1 text-xs"
											>
												<UtensilsCrossed className="h-3 w-3" />
												{guest.dietary}
											</Badge>
										)}
									</div>
								</div>
							);
						})}

						{filteredGuests.length === 0 && (
							<div className="text-muted-foreground py-8 text-center">
								<Users className="mx-auto mb-2 h-12 w-12 opacity-50" />
								<p>No guests found</p>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>

			{/* Guest Profile Dialog */}
			{selectedGuest && (
				<GuestProfileDialog
					guest={selectedGuest}
					isOpen={showProfileDialog}
					onClose={() => {
						setShowProfileDialog(false);
						setSelectedGuest(null);
					}}
					tableAssignment={
						getGuestAssignment && getGuestAssignment(selectedGuest).tableName
							? {
									tableName: getGuestAssignment(selectedGuest).tableName!,
									seatNumber: getGuestAssignment(selectedGuest).seatNumber!,
								}
							: undefined
					}
					chairAssignment={
						getGuestAssignment && getGuestAssignment(selectedGuest).chairName
							? {
									chairName: getGuestAssignment(selectedGuest).chairName!,
								}
							: undefined
					}
				/>
			)}
		</>
	);
};
