"use client";

import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import SortableGuestItem, { SpecialGuest } from "./SortableGuestItem";
 
import { cn } from "@/lib/utils";
import GroupTypeDropdown from "./GroupTypeDropdown";

export type SpecialGuestGroup = {
	id: string;
	type: string;
	order: number;
	guests: SpecialGuest[];
};

type SortableGroupItemProps = {
	group: SpecialGuestGroup;
	index: number;
	isDragging: boolean;
	editingGuest: string | null;
	customTypes: string[];
	onUpdateGroupType: (groupId: string, newType: string) => void;
	onAddCustomType: (type: string) => void;
	onAddGuest: (groupId: string) => void;
	onUpdateGuest: (
		groupId: string,
		guestId: string,
		updates: Partial<SpecialGuest>,
	) => void;
	onDeleteGuest: (groupId: string, guestId: string) => void;
	onEditGuest: (guestId: string) => void;
	onSaveGuest: (guestId: string) => void;
	onCancelEdit: () => void;
	onAddCredential: (groupId: string, guestId: string) => void;
	onUpdateCredential: (
		groupId: string,
		guestId: string,
		index: number,
		value: string,
	) => void;
	onRemoveCredential: (groupId: string, guestId: string, index: number) => void;
	onDeleteGroup: (groupId: string) => void;
	guestIds: string[]; // For SortableContext
	overId?: string | null;
	activeId?: string | null;
	insertPosition?: "before" | "after" | "inside" | null;
};

export default function SortableGroupItem({
	group,
	index,
	isDragging,
	editingGuest,
	customTypes,
	onUpdateGroupType,
	onAddCustomType,
	onAddGuest,
	onUpdateGuest,
	onDeleteGuest,
	onEditGuest,
	onSaveGuest,
	onCancelEdit,
	onAddCredential,
	onUpdateCredential,
	onRemoveCredential,
	onDeleteGroup,
	guestIds,
	overId = null,
	activeId = null,
	insertPosition = null,
}: SortableGroupItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: group.id });

	// Make the group card droppable for guests
	const { setNodeRef: setDroppableRef, isOver: isDroppableOver } = useDroppable(
		{
			id: `group-drop-${group.id}`,
			data: {
				type: "group",
				groupId: group.id,
			},
		},
	);

	// Check if this group is being dragged over
	const isOver =
		overId === group.id ||
		overId === `group-drop-${group.id}` ||
		isDroppableOver;
	const isGroupBeingDragged = activeId === group.id;
	const isGuestBeingDragged = activeId && guestIds.includes(activeId);

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

	// Combine refs for both sortable and droppable
	const combinedRef = (node: HTMLDivElement | null) => {
		setNodeRef(node);
		setDroppableRef(node);
	};

	return (
		<>
			{isOver && insertPosition === "before" && !isGroupBeingDragged && (
				<div className="h-1.5 bg-primary rounded-full mx-4 my-3 shadow-lg" />
			)}
			<div ref={combinedRef} style={style}>
				<Card
					className={cn(
						"bg-white dark:bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border-2 transition-all duration-200",
						isOver &&
							!isGroupBeingDragged &&
							!isGuestBeingDragged &&
							"border-primary border-2 bg-primary/10 dark:bg-primary/20 shadow-lg ring-2 ring-primary ring-offset-2",
					)}
				>
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3 flex-1">
								{/* Group Drag Handle */}
								<div
									{...attributes}
									{...listeners}
									className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
								>
									<GripVertical className="h-5 w-5" />
								</div>

								{/* Group Type Dropdown */}
								<div className="flex-1">
									<GroupTypeDropdown
										value={group.type}
										onChange={(newType) => onUpdateGroupType(group.id, newType)}
										customTypes={customTypes}
										onAddCustomType={onAddCustomType}
									/>
								</div>

								{/* Guest Count Badge */}
								<Badge
									variant="secondary"
									className="ml-2 dark:bg-slate-700 dark:text-slate-200"
								>
									{group.guests.length}{" "}
									{group.guests.length === 1 ? "guest" : "guests"}
								</Badge>
							</div>

							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => onAddGuest(group.id)}
								>
									<Plus className="mr-2 h-4 w-4" />
									Add Guest
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setShowDeleteDialog(true)}
									className="text-red-600 hover:text-red-700"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						{group.guests.length === 0 ? (
							<div className="py-8 text-center text-gray-500 dark:text-slate-400">
								<p className="text-sm">No guests in this group yet</p>
								<Button
									variant="outline"
									size="sm"
									className="mt-4"
									onClick={() => onAddGuest(group.id)}
								>
									<Plus className="mr-2 h-4 w-4" />
									Add First Guest
								</Button>
							</div>
						) : (
							<SortableContext
								items={guestIds}
								strategy={verticalListSortingStrategy}
							>
								<div className="space-y-4">
									{group.guests.map((guest, guestIndex) => {
										const isGuestOver = overId === guest.id;
										const guestInsertPosition = isGuestOver
											? insertPosition === "before"
												? "before"
												: insertPosition === "after"
													? "after"
													: null
											: null;

										return (
											<SortableGuestItem
												key={guest.id}
												guest={guest}
												isEditing={editingGuest === guest.id}
												onEdit={() => onEditGuest(guest.id)}
												onSave={() => onSaveGuest(guest.id)}
												onCancel={onCancelEdit}
												onDelete={() => onDeleteGuest(group.id, guest.id)}
												onUpdate={(updates) =>
													onUpdateGuest(group.id, guest.id, updates)
												}
												onAddCredential={() =>
													onAddCredential(group.id, guest.id)
												}
												onUpdateCredential={(index, value) =>
													onUpdateCredential(group.id, guest.id, index, value)
												}
												onRemoveCredential={(index) =>
													onRemoveCredential(group.id, guest.id, index)
												}
												isOver={isGuestOver}
												insertPosition={guestInsertPosition}
											/>
										);
									})}
								</div>
							</SortableContext>
						)}
					</CardContent>
				</Card>
			</div>
			{isOver && insertPosition === "after" && !isGroupBeingDragged && (
				<div className="h-1.5 bg-primary rounded-full mx-4 my-3 shadow-lg" />
			)}

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Group</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete the "{group.type}" group?
							{group.guests.length > 0 && (
								<>
									{" "}
									This will also delete {group.guests.length}{" "}
									{group.guests.length === 1 ? "guest" : "guests"} in this
									group.
								</>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								onDeleteGroup(group.id);
								setShowDeleteDialog(false);
							}}
							className="bg-red-600 hover:bg-red-700"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
