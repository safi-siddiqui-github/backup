/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Upload, Image as ImageIcon, MapPin, User, Tag } from "lucide-react";
import Image from "next/image";
import type { Track } from "./data";

// Helper function to map border color to selectedColor
const getColorFromBorder = (border: string): string => {
	if (border.includes("blue")) return "indigo";
	if (border.includes("green")) return "teal";
	if (border.includes("red")) return "rose";
	if (border.includes("purple")) return "purple";
	if (border.includes("amber")) return "amber";
	if (border.includes("slate")) return "slate";
	return "indigo"; // default
};

export default function AddTrackModal({
	open,
	onOpenChange,
	track,
	onSave,
}: {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	track?: Track | null;
	onSave?: (data: {
		name: string;
		description: string;
		selectedColor: string;
		photo: string | null;
		tags: string;
		organizer: string;
		location: string;
		icon: string;
	}) => void;
}) {
	const isEditMode = !!track;
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [selectedColor, setSelectedColor] = useState<string>("indigo");
	const [photo, setPhoto] = useState<string | null>(null);
	const [tags, setTags] = useState<string>("");
	const [organizer, setOrganizer] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [icon, setIcon] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Populate form when editing
	useEffect(() => {
		if (track && open) {
			setName(track.title);
			setDescription(track.description);
			setPhoto(track.photo || null);
			setTags(track.tags?.join(", ") || "");
			setOrganizer(track.organizer || "");
			setLocation(track.location || "");
			setIcon(track.icon || "");
			setSelectedColor(getColorFromBorder(track.colors.border || "border-blue-200"));
		} else if (!track && open) {
			// Reset form for create mode
			setName("");
			setDescription("");
			setPhoto(null);
			setTags("");
			setOrganizer("");
			setLocation("");
			setIcon("");
			setSelectedColor("indigo");
		}
	}, [track, open]);

	const colorOptions: { key: string; label: string; className: string }[] = [
		{ key: "indigo", label: "Indigo", className: "bg-indigo-600" },
		{ key: "purple", label: "Purple", className: "bg-purple-600" },
		{ key: "teal", label: "Teal", className: "bg-teal-500" },
		{ key: "amber", label: "Amber", className: "bg-amber-400" },
		{ key: "rose", label: "Rose", className: "bg-rose-500" },
		{ key: "slate", label: "Slate", className: "bg-slate-600" },
	];

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 10 * 1024 * 1024) {
				alert("File size exceeds 10MB limit");
				return;
			}
			const reader = new FileReader();
			reader.onloadend = () => {
				setPhoto(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemovePhoto = () => {
		setPhoto(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleSave = () => {
		if (onSave) {
			onSave({
				name,
				description,
				selectedColor,
				photo,
				tags,
				organizer,
				location,
				icon,
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{isEditMode ? "Edit Track" : "Add Track"}</DialogTitle>
				</DialogHeader>
				<div className="mt-4 space-y-6">
					{/* Track Name */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Track Name *
						</Label>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g., AI/ML, DevOps, Security"
							className="mt-1"
						/>
					</div>

					{/* Description */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Description
						</Label>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
							placeholder="Brief description of this track"
							className="mt-1"
						/>
					</div>

					{/* Photo Upload */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Track Photo (Optional)
						</Label>
						{photo ? (
							<div className="relative mt-1">
								<div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
									<Image
										src={photo}
										alt="Track preview"
										fill
										className="object-cover"
									/>
									<Button
										type="button"
										variant="destructive"
										size="icon"
										className="absolute top-2 right-2 h-8 w-8"
										onClick={handleRemovePhoto}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
								<p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
									Photo will be displayed on the track card
								</p>
							</div>
						) : (
							<label
								onClick={() => fileInputRef.current?.click()}
								className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors mt-1"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<Upload className="w-8 h-8 mb-2 text-gray-400" />
									<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
										<span className="font-semibold">Click to upload</span> or drag and drop
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handlePhotoUpload}
									className="hidden"
								/>
							</label>
						)}
					</div>

					{/* Icon/Emoji */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Icon/Emoji (Optional)
						</Label>
						<Input
							value={icon}
							onChange={(e) => setIcon(e.target.value)}
							placeholder="e.g., 🤖, 🚀, 🔒 or any emoji"
							className="mt-1"
							maxLength={2}
						/>
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							Add an emoji or icon to represent this track
						</p>
					</div>

					{/* Tags */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Tags (Optional)
						</Label>
						<Input
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							placeholder="e.g., technical, beginner-friendly, advanced"
							className="mt-1"
						/>
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							Separate tags with commas
						</p>
					</div>

					{/* Organizer */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Track Organizer/Lead (Optional)
						</Label>
						<Input
							value={organizer}
							onChange={(e) => setOrganizer(e.target.value)}
							placeholder="e.g., John Doe, john@example.com"
							className="mt-1"
						/>
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							Primary contact person for this track
						</p>
					</div>

					{/* Location */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Primary Location/Venue (Optional)
						</Label>
						<Input
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							placeholder="e.g., Main Hall, Room 101"
							className="mt-1"
						/>
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							Where most sessions for this track will be held
						</p>
					</div>

					{/* Color Selection */}
					<div>
						<Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Choose a color
						</Label>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							Pick a color to represent this track in the schedule.
						</p>
						<div className="mt-3 flex flex-wrap gap-2">
							{colorOptions.map((c) => (
								<button
									key={c.key}
									type="button"
									aria-pressed={selectedColor === c.key}
									onClick={() => setSelectedColor(c.key)}
									className={`w-10 h-10 rounded-full flex items-center justify-center focus:outline-none transition-transform transform hover:scale-105 ${selectedColor === c.key ? "ring-2 ring-offset-2 ring-indigo-500" : ""}`}
									title={c.label}
								>
									<span
										className={`${c.className} block w-8 h-8 rounded-full`}
									/>
								</button>
							))}
						</div>
						<div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
							Selected:{" "}
							<span className="font-medium">
								{colorOptions.find((x) => x.key === selectedColor)?.label}
							</span>
						</div>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={handleSave} disabled={!name.trim()}>
							{isEditMode ? "Save Changes" : "Add Track"}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
