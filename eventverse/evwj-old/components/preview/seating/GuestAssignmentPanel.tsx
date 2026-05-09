import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Chair, Guest, Table } from "@/types/venue";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
	Armchair,
	ArrowLeft,
	ArrowRight,
	ArrowRightCircle,
	Filter,
	GripVertical,
	User,
	Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { GuestAvatar } from "./GuestAvatar";
import { GuestProfileDialog } from "./GuestProfileDialog";

interface GuestAssignmentPanelProps {
	guests: Guest[];
	tables: Table[];
	chairs?: Chair[];
	selectedTable: Table | null;
	onAssignGuest: (
		guest: Guest,
		tableOrChairId: number,
		seatNumber?: number,
	) => void;
	onUnassignGuest: (guest: Guest, tableOrChairId: number) => void;
	draggedGuest: Guest | null;
	onSetDraggedGuest: (guest: Guest | null) => void;
}

// Draggable Guest Card Component
const DraggableGuestCard = ({
	guest,
	tables,
	chairs,
	onAssignToTable,
	onAssignToChair,
	onAvatarClick,
	isGroupFiltered,
}: {
	guest: Guest;
	tables: Table[];
	chairs: Chair[];
	onAssignToTable: (guest: Guest, tableId: number) => void;
	onAssignToChair: (guest: Guest, chairId: number) => void;
	onAvatarClick: (guest: Guest) => void;
	isGroupFiltered: boolean;
}) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: `guest-${guest.id}`,
			data: guest,
		});

	const style = {
		transform: CSS.Translate.toString(transform),
		zIndex: isDragging ? 999 : undefined,
		opacity: isDragging ? 0.5 : 1,
	};

	const getDietaryBadgeColor = (dietary: string): string => {
		switch (dietary) {
			case "Vegetarian":
				return "bg-green-100 text-green-800";
			case "Vegan":
				return "bg-green-200 text-green-900";
			case "Gluten-free":
				return "bg-yellow-100 text-yellow-800";
			case "Halal":
				return "bg-blue-100 text-blue-800";
			case "Kosher":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-600";
		}
	};

	const getGroupColor = (group: string): string => {
		const colors: Record<string, string> = {
			Colleagues: "bg-indigo-100 text-indigo-800",
			Family: "bg-pink-100 text-pink-800",
			Friends: "bg-blue-100 text-blue-800",
			"Plus Ones": "bg-orange-100 text-orange-800",
			VIP: "bg-purple-100 text-purple-800",
		};
		return colors[group] || "bg-gray-100 text-gray-600";
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="group rounded-lg border bg-card p-2 lg:p-3 transition-all hover:shadow-md"
		>
			<div className="mb-2 flex items-start gap-2">
				{/* Drag Handle */}
				<div
					{...attributes}
					{...listeners}
					className="flex h-10 w-6 cursor-grab flex-col items-center justify-center rounded hover:bg-muted active:cursor-grabbing"
				>
					<GripVertical className="h-4 w-4 text-muted-foreground/50" />
				</div>

				<GuestAvatar
					name={guest.name}
					initials={guest.initials}
					avatarColor={guest.avatarColor}
					size="md"
					showStatus
					status="unassigned"
					onClick={() => onAvatarClick(guest)}
				/>
				<div className="min-w-0 flex-1">
					<div className="font-medium text-foreground">{guest.name}</div>
					<div className="truncate text-sm text-muted-foreground">
						{guest.email}
					</div>
				</div>
			</div>

			<div className="mb-3 ml-8 flex flex-wrap gap-1">
				<Badge
					variant="outline"
					className={getGroupColor(guest?.group ?? "")}
				>
					{guest.group}
				</Badge>
				{guest.dietary !== "None" && (
					<Badge
						variant="outline"
						className={getDietaryBadgeColor(guest?.dietary ?? "")}
					>
						{guest.dietary}
					</Badge>
				)}
			</div>

			{/* Quick Assign Dropdown */}
			<div className="ml-8 mt-1">
				<Select
					onValueChange={(value) => {
						const [type, id] = value.split(":");
						if (type === "table") {
							onAssignToTable(guest, parseInt(id));
						} else if (type === "chair") {
							onAssignToChair(guest, parseInt(id));
						}
					}}
				>
					<SelectTrigger className="h-6 text-[10px] w-full lg:w-[140px] bg-background px-2">
						<div className="flex items-center gap-1.5">
							<ArrowRightCircle className="h-2.5 w-2.5 text-muted-foreground" />
							<SelectValue placeholder="Quick Assign..." />
						</div>
					</SelectTrigger>
					<SelectContent className="bg-background z-[100] max-h-[300px]">
						{/* Tables Group */}
						{tables.some((t) => {
							const assignedCount = Object.keys(t.seatAssignments || {}).length;
							return assignedCount < t.seats;
						}) && (
								<SelectGroup>
									<SelectLabel className="flex items-center gap-2">
										<Users className="h-3 w-3" />
										Tables
									</SelectLabel>
									{tables
										.filter((table) => {
											const assignedCount = Object.keys(
												table.seatAssignments || {},
											).length;
											return assignedCount < table.seats;
										})
										.map((table) => {
											const assignedCount = Object.keys(
												table.seatAssignments || {},
											).length;
											return (
												<SelectItem
													key={`table-${table.id}`}
													value={`table:${table.id}`}
													className="text-[10px] py-1"
												>
													<div className="flex w-full items-center justify-between gap-2">
														<span>{table.name}</span>
														<span className="text-[9px] text-muted-foreground font-normal">
															({assignedCount}/{table.seats})
														</span>
													</div>
												</SelectItem>
											);
										})}
								</SelectGroup>
							)}

						{/* Chairs Group */}
						{chairs.some((c) => !c.guest) && (
							<>
								<SelectSeparator />
								<SelectGroup>
									<SelectLabel className="flex items-center gap-2">
										<Armchair className="h-3 w-3" />
										Individual Chairs
									</SelectLabel>
									{chairs
										.filter((chair) => !chair.guest)
										.map((chair, index) => (
											<SelectItem
												key={`chair-${chair.id}-${index}`}
												value={`chair:${chair.id}`}
												className="text-[10px] py-1 text-orange-600 focus:text-orange-600"
											>
												{chair.name}
											</SelectItem>
										))}
								</SelectGroup>
							</>
						)}

						{/* Empty State */}
						{!tables.some((t) => Object.keys(t.seatAssignments || {}).length < t.seats) &&
							!chairs.some((c) => !c.guest) && (
								<div className="p-2 text-center text-xs text-muted-foreground">
									No available spots
								</div>
							)}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

const GuestAssignmentPanel = ({
	guests,
	tables,
	chairs = [],
	selectedTable,
	onAssignGuest,
	onUnassignGuest,
	draggedGuest,
	onSetDraggedGuest,
}: GuestAssignmentPanelProps) => {
	const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
	const [showProfileDialog, setShowProfileDialog] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState<string>("all");

	// Extract unique groups - optimized to prevent unnecessary re-renders
	// Only extract from guests list, not from tables/chairs to avoid triggering canvas re-renders
	const availableGroups = useMemo(() => {
		const groupSet = new Set<string>();
		guests.forEach((g) => g.group && groupSet.add(g.group));
		return ["all", ...Array.from(groupSet).sort()];
	}, [guests]);

	// Filter function
	const filterGuestsByGroup = (guestList: Guest[]) => {
		if (selectedGroup === "all") return guestList;
		return guestList.filter((g) => g.group === selectedGroup);
	};

	const handleAssignToTable = (guest: Guest, tableId: number) => {
		const table = tables.find((t) => t.id === tableId);
		if (!table) return;

		const assignedSeats = Object.keys(table.seatAssignments || {}).length;
		if (assignedSeats >= table.seats) return;

		// Find the next available seat number
		const nextSeatNumber = findNextAvailableSeat(table);
		if (nextSeatNumber) {
			onAssignGuest(guest, tableId, nextSeatNumber);
		}
	};

	const handleAssignToChair = (guest: Guest, chairId: number) => {
		onAssignGuest(guest, chairId);
	};

	const findNextAvailableSeat = (table: Table): number | null => {
		for (let i = 1; i <= table.seats; i++) {
			if (!table.seatAssignments?.[i]) {
				return i;
			}
		}
		return null;
	};

	const getDietaryBadgeColor = (dietary: string): string => {
		switch (dietary) {
			case "Vegetarian":
				return "bg-green-100 text-green-800";
			case "Vegan":
				return "bg-green-200 text-green-900";
			case "Gluten-free":
				return "bg-yellow-100 text-yellow-800";
			case "Halal":
				return "bg-blue-100 text-blue-800";
			case "Kosher":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-600";
		}
	};

	const getGroupColor = (group: string): string => {
		const colors: Record<string, string> = {
			Colleagues: "bg-indigo-100 text-indigo-800",
			Family: "bg-pink-100 text-pink-800",
			Friends: "bg-blue-100 text-blue-800",
			"Plus Ones": "bg-orange-100 text-orange-800",
			VIP: "bg-purple-100 text-purple-800",
		};
		return colors[group] || "bg-gray-100 text-gray-600";
	};

	const handleAvatarClick = (
		guest: Guest,
		assignment?: {
			tableName?: string;
			seatNumber?: number;
			chairName?: string;
		},
	) => {
		setSelectedGuest(guest);
		setShowProfileDialog(true);
	};

	return (
		<div className="flex flex-1 flex-col overflow-hidden min-h-0">
			<Tabs defaultValue="unassigned" className="flex flex-1 flex-col overflow-hidden min-h-0">
				<TabsList className="m-2 lg:m-4 mb-2 flex-shrink-0">
					<TabsTrigger value="unassigned" className="flex flex-1 items-center justify-center gap-2 text-xs lg:text-sm">
						<User className="h-3 w-3 lg:h-4 lg:w-4" />
						Unassigned ({filterGuestsByGroup(guests).length})
					</TabsTrigger>
					<TabsTrigger value="tables" className="flex flex-1 items-center justify-center gap-2 text-xs lg:text-sm">
						<Users className="h-3 w-3 lg:h-4 lg:w-4" />
						Tables
					</TabsTrigger>
				</TabsList>

				{/* Group Filter */}
				<div className="bg-muted/30 border-b px-2 lg:px-4 pb-2 flex-shrink-0">
					<div className="flex items-center gap-2">
						<Filter className="text-muted-foreground h-3 w-3 lg:h-4 lg:w-4" />
						<Select value={selectedGroup} onValueChange={setSelectedGroup}>
							<SelectTrigger className="bg-background h-7 lg:h-8 w-full">
								<SelectValue placeholder="Filter..." />
							</SelectTrigger>
							<SelectContent className="bg-background z-50">
								<SelectItem value="all">All Groups</SelectItem>
								{availableGroups
									.filter((g) => g !== "all")
									.map((group) => (
										<SelectItem key={group} value={group}>
											{group}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
						{selectedGroup !== "all" && (
							<Badge variant="secondary" className="text-xs">
								{filterGuestsByGroup(guests).length} guests
							</Badge>
						)}
					</div>
				</div>

				<TabsContent value="unassigned" className="mt-0 flex flex-1 flex-col overflow-hidden min-h-0">
					<ScrollArea className="flex-1 min-h-0">
						{/* Drag and Drop Instructions */}
						<div className="mx-4 mt-4 mb-2 rounded-lg bg-purple-50 border border-purple-200 p-3">
							<div className="flex items-start gap-2">
								<div className="text-purple-600 mt-0.5">
									<svg
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium text-purple-900">
										💡 Drag & Drop to Assign
									</p>
									<p className="text-xs text-purple-700 mt-1">
										Drag a guest card and drop it onto a seat or chair to
										assign them.
									</p>
								</div>
							</div>
						</div>

						<div className="space-y-3 p-4 pt-2">
							{filterGuestsByGroup(guests).map((guest) => (
								<DraggableGuestCard
									key={guest.id}
									guest={guest}
									tables={tables}
									chairs={chairs}
									onAssignToTable={handleAssignToTable}
									onAssignToChair={handleAssignToChair}
									onAvatarClick={handleAvatarClick}
									isGroupFiltered={selectedGroup !== "all"}
								/>
							))}

							{filterGuestsByGroup(guests).length === 0 && (
								<div className="py-8 text-center text-muted-foreground">
									<User className="mx-auto mb-3 h-12 w-12 opacity-50" />
									<p>
										{selectedGroup === "all"
											? "All guests have been assigned!"
											: `No guests in ${selectedGroup} group`}
									</p>
								</div>
							)}
						</div>
					</ScrollArea>
				</TabsContent>

				<TabsContent value="tables" className="mt-0 flex flex-1 flex-col overflow-hidden min-h-0">
					<ScrollArea className="flex-1 min-h-0">
						<div className="p-4">
							<Accordion type="multiple" className="space-y-2">
								{tables.map((table) => {
									const assignedGuests = Object.entries(
										table.seatAssignments || {},
									);
									const filteredAssignedGuests =
										selectedGroup === "all"
											? assignedGuests
											: assignedGuests.filter(
												([_, guest]) => guest.group === selectedGroup,
											);
									const assignedCount = assignedGuests.length;

									// Hide table if no matching guests when filtering
									if (
										selectedGroup !== "all" &&
										filteredAssignedGuests.length === 0
									) {
										return null;
									}

									return (
										<AccordionItem
											key={table.id}
											value={`table-${table.id}`}
											className={`overflow-hidden rounded-lg border bg-card ${selectedTable?.id === table.id
												? "ring-2 ring-purple-500"
												: ""
												}`}
										>
											<AccordionTrigger className="px-3 hover:no-underline">
												<div className="flex w-full items-center justify-between pr-4">
													<div className="text-left">
														<div className="font-medium">{table.name}</div>
														<div className="text-sm text-muted-foreground">
															{assignedCount}/{table.seats} seats
														</div>
													</div>
													<div className="flex items-center gap-2">
														{assignedCount === table.seats && (
															<Badge variant="default" className="bg-green-500">
																Full
															</Badge>
														)}
														{assignedCount > table.seats && (
															<Badge variant="destructive">Over Capacity</Badge>
														)}
													</div>
												</div>
											</AccordionTrigger>
											<AccordionContent className="px-3 pb-3">
												{filteredAssignedGuests.length > 0 ? (
													<div className="space-y-2 pt-2">
														{filteredAssignedGuests.map(([seatNumber, guest]) => (
															<div
																key={`${table.id}-${seatNumber}`}
																className="flex items-center gap-3 rounded bg-muted/30 p-2"
															>
																<GuestAvatar
																	name={guest.name}
																	initials={guest.initials}
																	avatarColor={guest.avatarColor}
																	size="md"
																	showStatus
																	status="assigned"
																	onClick={() =>
																		handleAvatarClick(guest, {
																			tableName: table.name,
																			seatNumber: parseInt(seatNumber),
																		})
																	}
																/>
																<div className="min-w-0 flex-1">
																	<div className="text-sm font-medium">
																		Seat {seatNumber}: {guest.name}
																	</div>
																	<div className="mt-1 flex gap-1">
																		<Badge
																			variant="outline"
																			className={`text-xs ${getGroupColor(guest?.group ?? "")}`}
																		>
																			{guest.group}
																		</Badge>
																		{guest.dietary !== "None" && (
																			<Badge
																				variant="outline"
																				className={`text-xs ${getDietaryBadgeColor(guest?.dietary ?? "")}`}
																			>
																				{guest.dietary}
																			</Badge>
																		)}
																	</div>
																</div>
																<Button
																	size="sm"
																	variant="ghost"
																	className="h-6 text-xs"
																	onClick={() => onUnassignGuest(guest, table.id)}
																>
																	<ArrowLeft className="h-3 w-3" />
																</Button>
															</div>
														))}
													</div>
												) : (
													<div className="py-4 text-center text-sm text-muted-foreground">
														No guests assigned
													</div>
												)}
											</AccordionContent>
										</AccordionItem>
									);
								})}
							</Accordion>

							{/* Individual Chairs */}
							{chairs.length > 0 && (
								<div className="border-t pt-4">
									<h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
										<Armchair className="h-4 w-4" />
										Individual Chairs ({chairs.length})
									</h4>
									<div className="space-y-2">
										{chairs.map((chair, index) => (
											<div
												key={`chair-${chair.id}-${index}`}
												className="rounded-lg border bg-card p-3"
											>
												<div className="flex items-center justify-between">
													<div>
														<div className="text-sm font-medium">
															{chair.name}
														</div>
														{chair.targetGroup && (
															<Badge variant="outline" className="mt-1 text-xs">
																{chair.targetGroup}
															</Badge>
														)}
													</div>
													<div className="flex items-center gap-2">
														{chair.guest ? (
															<Badge
																variant="default"
																className="bg-orange-500"
															>
																Occupied
															</Badge>
														) : (
															<Badge variant="outline">Available</Badge>
														)}
													</div>
												</div>

												{chair.guest && (
													<div className="mt-2 rounded border-l-2 border-orange-500 bg-orange-50 p-2">
														<div className="flex items-center gap-3">
															<GuestAvatar
																name={chair.guest.name}
																initials={chair.guest.initials}
																avatarColor={chair.guest.avatarColor}
																size="md"
																showStatus
																status="assigned"
																onClick={() =>
																	handleAvatarClick(chair.guest!, {
																		chairName: chair.name,
																	})
																}
															/>
															<div className="min-w-0 flex-1">
																<div className="text-sm font-medium">
																	{chair.guest.name}
																</div>
																<div className="mt-1 flex gap-1">
																	<Badge
																		variant="outline"
																		className={`text-xs ${getGroupColor(chair?.guest?.group ?? "")}`}
																	>
																		{chair.guest.group}
																	</Badge>
																	{chair.guest.dietary !== "None" && (
																		<Badge
																			variant="outline"
																			className={`text-xs ${getDietaryBadgeColor(chair?.guest?.dietary ?? "")}`}
																		>
																			{chair.guest.dietary}
																		</Badge>
																	)}
																</div>
															</div>
															<Button
																size="sm"
																variant="ghost"
																className="h-6 text-xs"
																onClick={() =>
																	onUnassignGuest(chair.guest!, chair.id)
																}
															>
																<ArrowLeft className="h-3 w-3" />
															</Button>
														</div>
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>

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
						tables.find((t) =>
							Object.values(t.seatAssignments || {}).some(
								(g) => g.id === selectedGuest.id,
							),
						)
							? (() => {
								const table = tables.find((t) =>
									Object.values(t.seatAssignments || {}).some(
										(g) => g.id === selectedGuest.id,
									),
								);
								const seatNumber = Object.entries(
									table?.seatAssignments || {},
								).find(([_, g]) => g.id === selectedGuest.id)?.[0];
								return table && seatNumber
									? {
										tableName: table.name,
										seatNumber: parseInt(seatNumber),
									}
									: undefined;
							})()
							: undefined
					}
					chairAssignment={
						chairs.find((c) => c.guest?.id === selectedGuest.id)
							? {
								chairName: chairs.find(
									(c) => c.guest?.id === selectedGuest.id,
								)!.name,
							}
							: undefined
					}
				/>
			)}
		</div>
	);
};

export default GuestAssignmentPanel;
