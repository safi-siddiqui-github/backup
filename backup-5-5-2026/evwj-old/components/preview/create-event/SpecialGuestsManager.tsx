"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ExternalLink, Plus, Star, Users } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import ProfileImportDialog from "./ProfileImportDialog";
import {
	closestCenter,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
	DragStartEvent,
	DragEndEvent,
	DragOverEvent,
	DragCancelEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableGroupItem, { SpecialGuestGroup } from "./SortableGroupItem";
import { SpecialGuest } from "./SortableGuestItem";

// Helper function to migrate old flat array to new grouped structure
function migrateToGroupedStructure(
	data: SpecialGuest[] | SpecialGuestGroup[],
): SpecialGuestGroup[] {
	// Check if data is already in grouped format
	if (data.length > 0 && "guests" in data[0]) {
		return data as SpecialGuestGroup[];
	}

	// Convert flat array to grouped structure
	const flatGuests = data as SpecialGuest[];
	if (flatGuests.length === 0) {
		return [];
	}

	// Create default group with all guests
	return [
		{
			id: Date.now().toString(),
			type: "Special Guest",
			order: 0,
			guests: flatGuests.map((guest) => ({
				...guest,
				groupId: Date.now().toString(),
			})),
		},
	];
}

interface Props {
	data: SpecialGuest[] | SpecialGuestGroup[];
	onUpdate: (data: SpecialGuestGroup[]) => void;
}

const PREDEFINED_TYPES = [
	"Special Guest",
	"VIP",
	"Lineup",
	"Artist",
	"Performer",
	"Speaker",
];

const SpecialGuestsManager = ({ data = [], onUpdate }: Props) => {
	// Migrate data to grouped structure
	const initialGroups = useMemo(() => migrateToGroupedStructure(data), [data]);
	const [groups, setGroups] = useState<SpecialGuestGroup[]>(initialGroups);
	const [customTypes, setCustomTypes] = useState<string[]>([]);
	const [editingGuest, setEditingGuest] = useState<string | null>(null);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [draggedFromGroup, setDraggedFromGroup] = useState<string | null>(null);
	const [overId, setOverId] = useState<string | null>(null);
	const [insertPosition, setInsertPosition] = useState<
		"before" | "after" | "inside" | null
	>(null);
	const [showImportDialog, setShowImportDialog] = useState(false);
	const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);
	const [newGroupType, setNewGroupType] = useState("Special Guest");

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	useEffect(() => {
		const migrated = migrateToGroupedStructure(data);
		setGroups(migrated);
	}, [data]);

	const handleUpdate = useCallback(
		(newGroups: SpecialGuestGroup[]) => {
			setGroups(newGroups);
			onUpdate(newGroups);
		},
		[onUpdate],
	);

	// Get all group types (predefined + custom)
	const getAllGroupTypes = useCallback(() => {
		return [...PREDEFINED_TYPES, ...customTypes];
	}, [customTypes]);

	// Add custom type
	const addCustomType = useCallback(
		(type: string) => {
			if (!customTypes.includes(type) && !PREDEFINED_TYPES.includes(type)) {
				setCustomTypes((prev) => [...prev, type]);
			}
		},
		[customTypes],
	);

	// Create default guest
	const createDefaultGuest = useCallback((groupId: string): SpecialGuest => {
		return {
			id: `${Date.now()}-${Math.random()}`,
			name: "",
			title: "",
			bio: "",
			credentials: [],
			socialLinks: {},
			isImported: false,
			groupId,
		};
	}, []);

	// Add new group
	const addGroup = useCallback(
		(type: string) => {
			const newGroupId = `${Date.now()}-${Math.random()}`;
			const defaultGuest = createDefaultGuest(newGroupId);
			const newGroup: SpecialGuestGroup = {
				id: newGroupId,
				type,
				order: groups.length,
				guests: [defaultGuest],
			};
			const updatedGroups = [...groups, newGroup];
			handleUpdate(updatedGroups);
			setEditingGuest(defaultGuest.id);
			setShowAddGroupDialog(false);
			setNewGroupType("Special Guest");
		},
		[groups, handleUpdate, createDefaultGuest],
	);

	// Remove group
	const removeGroup = useCallback(
		(groupId: string) => {
			const updatedGroups = groups.filter((g) => g.id !== groupId);
			// Update order for remaining groups
			const reorderedGroups = updatedGroups.map((group, index) => ({
				...group,
				order: index,
			}));
			handleUpdate(reorderedGroups);
		},
		[groups, handleUpdate],
	);

	// Update group type
	const updateGroupType = useCallback(
		(groupId: string, newType: string) => {
			const updatedGroups = groups.map((group) =>
				group.id === groupId ? { ...group, type: newType } : group,
			);
			handleUpdate(updatedGroups);
		},
		[groups, handleUpdate],
	);

	// Add guest to group
	const addGuest = useCallback(
		(groupId: string) => {
			const newGuest = createDefaultGuest(groupId);
			const updatedGroups = groups.map((group) =>
				group.id === groupId
					? { ...group, guests: [...group.guests, newGuest] }
					: group,
			);
			handleUpdate(updatedGroups);
			setEditingGuest(newGuest.id);
		},
		[groups, handleUpdate, createDefaultGuest],
	);

	// Update guest
	const updateGuest = useCallback(
		(groupId: string, guestId: string, updates: Partial<SpecialGuest>) => {
			const updatedGroups = groups.map((group) =>
				group.id === groupId
					? {
							...group,
							guests: group.guests.map((guest) =>
								guest.id === guestId ? { ...guest, ...updates } : guest,
							),
						}
					: group,
			);
			handleUpdate(updatedGroups);
		},
		[groups, handleUpdate],
	);

	// Delete guest
	const deleteGuest = useCallback(
		(groupId: string, guestId: string) => {
			const updatedGroups = groups.map((group) =>
				group.id === groupId
					? {
							...group,
							guests: group.guests.filter((guest) => guest.id !== guestId),
						}
					: group,
			);
			handleUpdate(updatedGroups);
			if (editingGuest === guestId) {
				setEditingGuest(null);
			}
		},
		[groups, handleUpdate, editingGuest],
	);

	// Move guest between groups
	const moveGuest = useCallback(
		(
			guestId: string,
			fromGroupId: string,
			toGroupId: string,
			newIndex?: number,
		) => {
			const fromGroup = groups.find((g) => g.id === fromGroupId);
			const toGroup = groups.find((g) => g.id === toGroupId);
			if (!fromGroup || !toGroup) return;

			const guest = fromGroup.guests.find((g) => g.id === guestId);
			if (!guest) return;

			const updatedGuest = { ...guest, groupId: toGroupId };
			const updatedFromGroup = {
				...fromGroup,
				guests: fromGroup.guests.filter((g) => g.id !== guestId),
			};

			let updatedToGroupGuests = [...toGroup.guests];
			if (newIndex !== undefined) {
				updatedToGroupGuests.splice(newIndex, 0, updatedGuest);
			} else {
				updatedToGroupGuests.push(updatedGuest);
			}

			const updatedToGroup = {
				...toGroup,
				guests: updatedToGroupGuests,
			};

			const updatedGroups = groups.map((group) => {
				if (group.id === fromGroupId) return updatedFromGroup;
				if (group.id === toGroupId) return updatedToGroup;
				return group;
			});

			handleUpdate(updatedGroups);
		},
		[groups, handleUpdate],
	);

	// Add credential
	const addCredential = useCallback(
		(groupId: string, guestId: string) => {
			const group = groups.find((g) => g.id === groupId);
			const guest = group?.guests.find((g) => g.id === guestId);
			if (guest) {
				updateGuest(groupId, guestId, {
					credentials: [...guest.credentials, ""],
				});
			}
		},
		[groups, updateGuest],
	);

	// Update credential
	const updateCredential = useCallback(
		(groupId: string, guestId: string, index: number, value: string) => {
			const group = groups.find((g) => g.id === groupId);
			const guest = group?.guests.find((g) => g.id === guestId);
			if (guest) {
				const newCredentials = [...guest.credentials];
				newCredentials[index] = value;
				updateGuest(groupId, guestId, { credentials: newCredentials });
			}
		},
		[groups, updateGuest],
	);

	// Remove credential
	const removeCredential = useCallback(
		(groupId: string, guestId: string, index: number) => {
			const group = groups.find((g) => g.id === groupId);
			const guest = group?.guests.find((g) => g.id === guestId);
			if (guest) {
				const newCredentials = guest.credentials.filter((_, i) => i !== index);
				updateGuest(groupId, guestId, { credentials: newCredentials });
			}
		},
		[groups, updateGuest],
	);

	// Handle import profile
	const handleImportProfile = useCallback(
		(profileData: any) => {
			// Add to first group, or create a new group if none exist
			if (groups.length === 0) {
				const newGroupId = `${Date.now()}-${Math.random()}`;
				const newGuest: SpecialGuest = {
					id: `${Date.now()}-${Math.random()}`,
					name: profileData.name,
					title: profileData.title || profileData.headline,
					bio: profileData.bio || profileData.summary,
					photo: profileData.photo,
					credentials: profileData.credentials || [],
					socialLinks: profileData.socialLinks || {},
					isImported: true,
					importSource: profileData.source,
					groupId: newGroupId,
				};
				const newGroup: SpecialGuestGroup = {
					id: newGroupId,
					type: "Special Guest",
					order: 0,
					guests: [newGuest],
				};
				handleUpdate([newGroup]);
			} else {
				const firstGroupId = groups[0].id;
				const newGuest: SpecialGuest = {
					id: `${Date.now()}-${Math.random()}`,
					name: profileData.name,
					title: profileData.title || profileData.headline,
					bio: profileData.bio || profileData.summary,
					photo: profileData.photo,
					credentials: profileData.credentials || [],
					socialLinks: profileData.socialLinks || {},
					isImported: true,
					importSource: profileData.source,
					groupId: firstGroupId,
				};
				const updatedGroups = groups.map((group) =>
					group.id === firstGroupId
						? { ...group, guests: [...group.guests, newGuest] }
						: group,
				);
				handleUpdate(updatedGroups);
			}
			setShowImportDialog(false);
		},
		[groups, handleUpdate],
	);

	// Drag handlers
	const handleDragStart = useCallback(
		(event: DragStartEvent) => {
			const activeId = String(event.active.id);
			setActiveId(activeId);

			// Check if it's a group ID
			const isGroup = groups.some((g) => g.id === activeId);
			if (isGroup) {
				setDraggedFromGroup(null);
				return;
			}

			// Find which group the guest belongs to
			for (const group of groups) {
				const guest = group.guests.find((g) => g.id === activeId);
				if (guest) {
					setDraggedFromGroup(group.id);
					return;
				}
			}
		},
		[groups],
	);

	const handleDragOver = useCallback(
		(event: DragOverEvent) => {
			const { active, over, delta } = event;
			if (!over) {
				setOverId(null);
				setInsertPosition(null);
				return;
			}

			const activeId = String(active.id);
			const overIdStr = String(over.id);
			setOverId(overIdStr);

			// Check if dragging a group
			const activeGroup = groups.find((g) => g.id === activeId);
			if (activeGroup) {
				// When dragging groups, determine position based on delta
				// If dragging down (positive delta.y), insert after
				// If dragging up (negative delta.y), insert before
				if (delta && delta.y > 0) {
					setInsertPosition("after");
				} else if (delta && delta.y < 0) {
					setInsertPosition("before");
				} else {
					setInsertPosition("inside");
				}
				return;
			}

			// Dragging a guest
			// Check if over a group
			let targetGroup: SpecialGuestGroup | undefined;
			if (overIdStr.startsWith("group-drop-")) {
				const groupId = overIdStr.replace("group-drop-", "");
				targetGroup = groups.find((g) => g.id === groupId);
				setInsertPosition("inside");
				return;
			} else {
				targetGroup = groups.find((g) => g.id === overIdStr);
				if (targetGroup) {
					setInsertPosition("inside");
					return;
				}
			}

			// Check if over a guest
			for (const group of groups) {
				const guestIndex = group.guests.findIndex((g) => g.id === overIdStr);
				if (guestIndex !== -1) {
					// Determine if we're above or below based on drag delta
					// Positive delta.y means dragging down, so insert after
					// Negative delta.y means dragging up, so insert before
					if (delta && delta.y > 10) {
						setInsertPosition("after");
					} else if (delta && delta.y < -10) {
						setInsertPosition("before");
					} else {
						// Default to after if no clear direction
						setInsertPosition("after");
					}
					return;
				}
			}

			setInsertPosition(null);
		},
		[groups],
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			setActiveId(null);
			setOverId(null);
			setInsertPosition(null);
			const fromGroup = draggedFromGroup;

			if (!over || active.id === over.id) {
				setDraggedFromGroup(null);
				return;
			}

			const activeId = String(active.id);
			const overId = String(over.id);

			// Check if dragging a group
			const activeGroup = groups.find((g) => g.id === activeId);
			if (activeGroup) {
				// Reordering groups - check if over is also a group
				const overGroup = groups.find((g) => g.id === overId);
				if (overGroup && activeGroup.id !== overGroup.id) {
					const oldIndex = groups.findIndex((g) => g.id === activeId);
					const newIndex = groups.findIndex((g) => g.id === overId);
					const reorderedGroups = arrayMove(groups, oldIndex, newIndex).map(
						(group, index) => ({
							...group,
							order: index,
						}),
					);
					handleUpdate(reorderedGroups);
				}
				setDraggedFromGroup(null);
				return;
			}

			// Dragging a guest
			const sourceGroup = fromGroup
				? groups.find((g) => g.id === fromGroup)
				: groups.find((g) => g.guests.some((guest) => guest.id === activeId));

			if (!sourceGroup) {
				setDraggedFromGroup(null);
				return;
			}

			// Check if dropping on a group (could be group ID or group-drop-{groupId})
			let targetGroup: SpecialGuestGroup | undefined;
			if (overId.startsWith("group-drop-")) {
				const groupId = overId.replace("group-drop-", "");
				targetGroup = groups.find((g) => g.id === groupId);
			} else {
				targetGroup = groups.find((g) => g.id === overId);
			}

			if (targetGroup && targetGroup.id !== sourceGroup.id) {
				// Dropping on a group - move guest to end of that group
				moveGuest(activeId, sourceGroup.id, targetGroup.id);
				setDraggedFromGroup(null);
				return;
			}

			// Check if dropping on another guest
			let targetGuestGroup: SpecialGuestGroup | undefined;
			let targetGuestIndex = -1;

			for (const group of groups) {
				const guestIndex = group.guests.findIndex((g) => g.id === overId);
				if (guestIndex !== -1) {
					targetGuestGroup = group;
					targetGuestIndex = guestIndex;
					break;
				}
			}

			if (targetGuestGroup) {
				if (sourceGroup.id === targetGuestGroup.id) {
					// Reordering within same group
					const oldIndex = sourceGroup.guests.findIndex(
						(g) => g.id === activeId,
					);
					if (oldIndex !== -1 && oldIndex !== targetGuestIndex) {
						const reorderedGuests = arrayMove(
							sourceGroup.guests,
							oldIndex,
							targetGuestIndex,
						);
						const updatedGroups = groups.map((group) =>
							group.id === sourceGroup.id
								? { ...group, guests: reorderedGuests }
								: group,
						);
						handleUpdate(updatedGroups);
					}
				} else {
					// Moving to different group - insert at target position
					moveGuest(
						activeId,
						sourceGroup.id,
						targetGuestGroup.id,
						targetGuestIndex,
					);
				}
			}

			setDraggedFromGroup(null);
		},
		[groups, handleUpdate, moveGuest, draggedFromGroup],
	);

	const handleDragCancel = useCallback(() => {
		setActiveId(null);
		setOverId(null);
		setInsertPosition(null);
		setDraggedFromGroup(null);
	}, []);

	// Get all group IDs for SortableContext
	const groupIds = useMemo(() => groups.map((g) => g.id), [groups]);

	// Get active dragged item for overlay
	const activeItem = useMemo(() => {
		if (!activeId) return null;

		// Check if it's a group
		const activeGroup = groups.find((g) => g.id === activeId);
		if (activeGroup) {
			return { type: "group" as const, data: activeGroup };
		}

		// Check if it's a guest
		for (const group of groups) {
			const guest = group.guests.find((g) => g.id === activeId);
			if (guest) {
				return { type: "guest" as const, data: guest };
			}
		}

		return null;
	}, [activeId, groups]);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<Star className="text-muted-foreground h-5 w-5" />
					<Label className="text-base font-medium">
						Special Guests & Speakers
					</Label>
				</div>
				<div className="flex gap-2">
					<Button
						onClick={() => setShowImportDialog(true)}
						size="sm"
						variant="outline"
					>
						<ExternalLink className="mr-2 h-4 w-4" />
						Import Profile
					</Button>
					<Button onClick={() => setShowAddGroupDialog(true)} size="sm">
						<Plus className="mr-2 h-4 w-4" />
						Add New Group
					</Button>
				</div>
			</div>

			{groups.length === 0 ? (
				<Card className="bg-muted/20 dark:bg-slate-800/50 border-dashed">
					<CardContent className="pt-6">
						<div className="py-8 text-center">
							<Users className="text-muted-foreground dark:text-slate-400 mx-auto mb-4 h-12 w-12" />
							<h3 className="mb-2 text-lg font-semibold dark:text-slate-200">
								No guest groups yet
							</h3>
							<p className="text-muted-foreground dark:text-slate-400 mb-4 text-sm">
								Create a group to organize your special guests, VIPs, lineup, or
								artists
							</p>
							<div className="flex justify-center gap-2">
								<Button
									onClick={() => setShowImportDialog(true)}
									variant="outline"
								>
									<ExternalLink className="mr-2 h-4 w-4" />
									Import from Social Media
								</Button>
								<Button onClick={() => setShowAddGroupDialog(true)}>
									<Plus className="mr-2 h-4 w-4" />
									Create First Group
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			) : (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
					onDragCancel={handleDragCancel}
				>
					<SortableContext
						items={groupIds}
						strategy={verticalListSortingStrategy}
					>
						<div className="space-y-4">
							{groups.map((group, index) => {
								const guestIds = group.guests.map((g) => g.id);
								const isGroupOver =
									overId === group.id || overId === `group-drop-${group.id}`;
								const groupInsertPosition = isGroupOver
									? insertPosition === "before"
										? "before"
										: insertPosition === "after"
											? "after"
											: insertPosition === "inside"
												? "inside"
												: null
									: null;

								return (
									<SortableGroupItem
										key={group.id}
										group={group}
										index={index}
										isDragging={activeId === group.id}
										editingGuest={editingGuest}
										customTypes={customTypes}
										onUpdateGroupType={updateGroupType}
										onAddCustomType={addCustomType}
										onAddGuest={addGuest}
										onUpdateGuest={updateGuest}
										onDeleteGuest={deleteGuest}
										onEditGuest={(guestId) => setEditingGuest(guestId)}
										onSaveGuest={(guestId) => setEditingGuest(null)}
										onCancelEdit={() => setEditingGuest(null)}
										onAddCredential={addCredential}
										onUpdateCredential={updateCredential}
										onRemoveCredential={removeCredential}
										onDeleteGroup={removeGroup}
										guestIds={guestIds}
										overId={overId}
										activeId={activeId}
										insertPosition={groupInsertPosition}
									/>
								);
							})}
						</div>
					</SortableContext>

					<DragOverlay>
						{activeItem?.type === "group" ? (
							<Card className="border-2 bg-white p-4 shadow-lg">
								<div className="flex items-center gap-3">
									<div className="font-semibold">
										{activeItem.data.type} ({activeItem.data.guests.length}{" "}
										{activeItem.data.guests.length === 1 ? "guest" : "guests"})
									</div>
								</div>
							</Card>
						) : activeItem?.type === "guest" ? (
							<Card className="bg-white p-4 shadow-lg">
								<div className="flex items-center gap-3">
									<div className="font-semibold">
										{activeItem.data.name || "Unnamed Guest"}
									</div>
								</div>
							</Card>
						) : null}
					</DragOverlay>
				</DndContext>
			)}

			{/* Import Profile Dialog */}
			<ProfileImportDialog
				open={showImportDialog}
				onOpenChange={setShowImportDialog}
				onImport={handleImportProfile}
			/>

			{/* Add Group Dialog */}
			<Dialog open={showAddGroupDialog} onOpenChange={setShowAddGroupDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Group</DialogTitle>
						<DialogDescription>
							Choose a type for your new guest group. You can add a custom type
							later.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div>
							<Label>Group Type</Label>
							<Select value={newGroupType} onValueChange={setNewGroupType}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{getAllGroupTypes().map((type) => (
										<SelectItem key={type} value={type}>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setShowAddGroupDialog(false);
								setNewGroupType("Special Guest");
							}}
						>
							Cancel
						</Button>
						<Button onClick={() => addGroup(newGroupType)}>Create Group</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SpecialGuestsManager;
export type { SpecialGuestGroup, SpecialGuest };
