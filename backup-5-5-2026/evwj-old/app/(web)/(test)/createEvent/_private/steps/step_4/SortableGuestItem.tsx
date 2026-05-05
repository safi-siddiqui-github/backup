"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	GripVertical,
	Edit,
	X,
	Check,
	Mail,
	Trash2,
	Upload,
	Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SpecialGuest = {
	id: string;
	name: string;
	title: string;
	bio: string;
	photo?: string;
	credentials: string[];
	socialLinks: {
		linkedin?: string;
		twitter?: string;
		website?: string;
	};
	isImported: boolean;
	importSource?: "linkedin" | "twitter" | "manual";
	groupId: string;
};

type SortableGuestItemProps = {
	guest: SpecialGuest;
	isEditing: boolean;
	onEdit: () => void;
	onSave: () => void;
	onCancel: () => void;
	onDelete: () => void;
	onUpdate: (updates: Partial<SpecialGuest>) => void;
	onAddCredential: () => void;
	onUpdateCredential: (index: number, value: string) => void;
	onRemoveCredential: (index: number) => void;
	isOver?: boolean;
	insertPosition?: "before" | "after" | null;
};

export default function SortableGuestItem({
	guest,
	isEditing,
	onEdit,
	onSave,
	onCancel,
	onDelete,
	onUpdate,
	onAddCredential,
	onUpdateCredential,
	onRemoveCredential,
	isOver = false,
	insertPosition = null,
}: SortableGuestItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: guest.id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<>
			{isOver && insertPosition === "before" && (
				<div className="h-1 bg-primary rounded-full mx-4 my-2" />
			)}
			<div ref={setNodeRef} style={style} className={cn("relative")}>
				<Card className="bg-white dark:bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3 flex-1">
								{/* Drag Handle */}
								<div
									{...attributes}
									{...listeners}
									className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
								>
									<GripVertical className="h-5 w-5" />
								</div>

								<Avatar className="h-12 w-12">
									<AvatarImage src={guest.photo} alt={guest.name} />
									<AvatarFallback>
										{guest.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<h3 className="font-semibold dark:text-slate-200">
										{guest.name || "Unnamed Guest"}
									</h3>
									<p className="text-muted-foreground dark:text-slate-400 text-sm">
										{guest.title}
									</p>
									{guest.isImported && (
										<Badge variant="secondary" className="mt-1">
											Imported from {guest.importSource}
										</Badge>
									)}
								</div>
							</div>
							<div className="flex gap-1">
								{isEditing ? (
									<>
										<Button
											variant="ghost"
											size="sm"
											onClick={onSave}
											className="text-green-600 hover:text-green-700"
										>
											<Check className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={onCancel}
											className="text-red-600 hover:text-red-700"
										>
											<X className="h-4 w-4" />
										</Button>
									</>
								) : (
									<>
										<Button variant="ghost" size="sm" onClick={onEdit}>
											<Edit className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="sm" onClick={onDelete}>
											<Trash2 className="h-4 w-4" />
										</Button>
									</>
								)}
							</div>
						</div>
					</CardHeader>

					{isEditing && (
						<CardContent className="space-y-4 border-t">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<Label className="text-sm font-medium">Full Name</Label>
									<Input
										value={guest.name}
										onChange={(e) => onUpdate({ name: e.target.value })}
										placeholder="Enter full name"
										className="mt-1"
									/>
								</div>

								<div>
									<Label className="text-sm font-medium">Title/Role</Label>
									<Input
										value={guest.title}
										onChange={(e) => onUpdate({ title: e.target.value })}
										placeholder="e.g., CEO, Keynote Speaker, Artist"
										className="mt-1"
									/>
								</div>
							</div>

							<div>
								<Label className="text-sm font-medium">Bio/Description</Label>
								<Textarea
									value={guest.bio}
									onChange={(e) => onUpdate({ bio: e.target.value })}
									placeholder="Brief biography or description of the guest..."
									className="mt-1"
									rows={3}
								/>
							</div>

							{/* Credentials */}
							<div>
								<div className="mb-2 flex items-center justify-between">
									<Label className="text-sm font-medium">
										Credentials/Achievements
									</Label>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={onAddCredential}
									>
										<Plus className="mr-1 h-3 w-3" />
										Add
									</Button>
								</div>
								<div className="space-y-2">
									{guest.credentials.map((credential, index) => (
										<div key={index} className="flex gap-2">
											<Input
												value={credential}
												onChange={(e) =>
													onUpdateCredential(index, e.target.value)
												}
												placeholder="e.g., Forbes 30 Under 30, TEDx Speaker"
												className="flex-1"
											/>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => onRemoveCredential(index)}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									))}
								</div>
							</div>

							{/* Social Links */}
							<div>
								<Label className="mb-2 block text-sm font-medium">
									Social Links
								</Label>
								<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
									<div>
										<Label className="text-xs">LinkedIn</Label>
										<Input
											value={guest.socialLinks.linkedin || ""}
											onChange={(e) =>
												onUpdate({
													socialLinks: {
														...guest.socialLinks,
														linkedin: e.target.value,
													},
												})
											}
											placeholder="LinkedIn profile URL"
											className="mt-1"
										/>
									</div>
									<div>
										<Label className="text-xs">Twitter/X</Label>
										<Input
											value={guest.socialLinks.twitter || ""}
											onChange={(e) =>
												onUpdate({
													socialLinks: {
														...guest.socialLinks,
														twitter: e.target.value,
													},
												})
											}
											placeholder="Twitter profile URL"
											className="mt-1"
										/>
									</div>
									<div>
										<Label className="text-xs">Website</Label>
										<Input
											value={guest.socialLinks.website || ""}
											onChange={(e) =>
												onUpdate({
													socialLinks: {
														...guest.socialLinks,
														website: e.target.value,
													},
												})
											}
											placeholder="Personal/company website"
											className="mt-1"
										/>
									</div>
								</div>
							</div>

							{/* Photo Upload */}
							<div>
								<Label className="mb-2 block text-sm font-medium">
									Profile Photo
								</Label>
								<div className="flex items-center gap-3">
									<Avatar className="h-16 w-16">
										<AvatarImage src={guest.photo} alt={guest.name} />
										<AvatarFallback>
											{guest.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<Button variant="outline" size="sm">
										<Upload className="mr-2 h-4 w-4" />
										Upload Photo
									</Button>
								</div>
							</div>
						</CardContent>
					)}

					{/* Guest Preview (when not editing) */}
					{!isEditing && guest.bio && (
						<CardContent className="pt-0">
							<p className="text-muted-foreground dark:text-slate-300 line-clamp-2 text-sm">
								{guest.bio}
							</p>
							{guest.credentials.length > 0 && (
								<div className="mt-2 flex flex-wrap gap-1">
									{guest.credentials.slice(0, 3).map((credential, index) => (
										<Badge
											key={index}
											variant="outline"
											className="text-xs dark:border-slate-600 dark:text-slate-300"
										>
											{credential}
										</Badge>
									))}
									{guest.credentials.length > 3 && (
										<Badge
											variant="outline"
											className="text-xs dark:border-slate-600 dark:text-slate-300"
										>
											+{guest.credentials.length - 3} more
										</Badge>
									)}
								</div>
							)}
						</CardContent>
					)}
				</Card>
			</div>
			{isOver && insertPosition === "after" && (
				<div className="h-1 bg-primary rounded-full mx-4 my-2" />
			)}
		</>
	);
}
