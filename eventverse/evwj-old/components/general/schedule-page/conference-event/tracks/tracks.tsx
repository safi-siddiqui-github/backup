"use client";

import { useState, useMemo } from "react";
import { Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationControls from "@/components/ui/pagination-controls";
import AddTrackModal from "./AddTrackModal";
import TrackCard from "./TrackCard";
import TrackListItem from "./TrackListItem";
import TrackDetailModal from "./TrackDetailModal";
import { MockTracks, Track } from "./data";

// Helper function to generate colors object from selectedColor
const generateColorsFromSelectedColor = (selectedColor: string): Record<string, string> => {
	const colorMaps: Record<string, Record<string, string>> = {
		indigo: {
			border: "border-blue-200",
			bg: "bg-blue-50",
			darkBg: "dark:bg-blue-900/30",
			text: "text-blue-700",
			darkText: "dark:text-blue-300",
			progress: "bg-blue-500",
			statusBg: "bg-yellow-100",
			darkStatusBg: "dark:bg-yellow-900",
			statusText: "text-yellow-800",
			darkStatusText: "dark:text-yellow-200",
		},
		teal: {
			border: "border-green-200",
			bg: "bg-green-50",
			darkBg: "dark:bg-green-900/30",
			text: "text-green-700",
			darkText: "dark:text-green-300",
			progress: "bg-green-500",
			statusBg: "bg-red-100",
			darkStatusBg: "dark:bg-red-900",
			statusText: "text-red-800",
			darkStatusText: "dark:text-red-200",
		},
		rose: {
			border: "border-red-200",
			bg: "bg-red-50",
			darkBg: "dark:bg-red-900/30",
			text: "text-red-700",
			darkText: "dark:text-red-300",
			progress: "bg-red-500",
			statusBg: "bg-red-100",
			darkStatusBg: "dark:bg-red-900",
			statusText: "text-red-800",
			darkStatusText: "dark:text-red-200",
		},
		purple: {
			border: "border-purple-200",
			bg: "bg-purple-50",
			darkBg: "dark:bg-purple-900/30",
			text: "text-purple-700",
			darkText: "dark:text-purple-300",
			progress: "bg-purple-500",
			statusBg: "bg-yellow-100",
			darkStatusBg: "dark:bg-yellow-900",
			statusText: "text-yellow-800",
			darkStatusText: "dark:text-yellow-200",
		},
		amber: {
			border: "border-amber-200",
			bg: "bg-amber-50",
			darkBg: "dark:bg-amber-900/30",
			text: "text-amber-700",
			darkText: "dark:text-amber-300",
			progress: "bg-amber-500",
			statusBg: "bg-yellow-100",
			darkStatusBg: "dark:bg-yellow-900",
			statusText: "text-yellow-800",
			darkStatusText: "dark:text-yellow-200",
		},
		slate: {
			border: "border-slate-200",
			bg: "bg-slate-50",
			darkBg: "dark:bg-slate-900/30",
			text: "text-slate-700",
			darkText: "dark:text-slate-300",
			progress: "bg-slate-500",
			statusBg: "bg-yellow-100",
			darkStatusBg: "dark:bg-yellow-900",
			statusText: "text-yellow-800",
			darkStatusText: "dark:text-yellow-200",
		},
	};
	
	return colorMaps[selectedColor] || colorMaps.indigo;
};

export default function TaskTracks() {
	const [tracks, setTracks] = useState<Track[]>(MockTracks);
	const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(6);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [trackToEdit, setTrackToEdit] = useState<Track | null>(null);

	const totalPages = Math.ceil(tracks.length / itemsPerPage);
	const paginatedTracks = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return tracks.slice(startIndex, endIndex);
	}, [currentPage, itemsPerPage, tracks]);

	const handleEdit = (track: Track) => {
		setTrackToEdit(track);
		setEditModalOpen(true);
	};

	const handleDelete = (track: Track) => {
		if (confirm(`Are you sure you want to delete "${track.title}"?`)) {
			setTracks((prev) => prev.filter((t) => t.title !== track.title));
			if (selectedTrack?.title === track.title) {
				setSelectedTrack(null);
			}
		}
	};

	const handleSaveCreate = (data: {
		name: string;
		description: string;
		selectedColor: string;
		photo: string | null;
		tags: string;
		organizer: string;
		location: string;
		icon: string;
	}) => {
		const colors = generateColorsFromSelectedColor(data.selectedColor);
		const tagsArray = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
		
		// Generate default values for stats (these would come from API in real app)
		const newTrack: Track = {
			title: data.name,
			description: data.description,
			sessions: 0,
			registered: 0,
			utilization: 0,
			avgCapacity: 0,
			status: "New",
			colors,
			photo: data.photo || undefined,
			icon: data.icon || undefined,
			tags: tagsArray.length > 0 ? tagsArray : undefined,
			organizer: data.organizer || undefined,
			location: data.location || undefined,
		};
		
		setTracks((prev) => [...prev, newTrack]);
		setCreateModalOpen(false);
	};

	const handleSaveEdit = (data: {
		name: string;
		description: string;
		selectedColor: string;
		photo: string | null;
		tags: string;
		organizer: string;
		location: string;
		icon: string;
	}) => {
		if (!trackToEdit) return;
		
		const colors = generateColorsFromSelectedColor(data.selectedColor);
		const tagsArray = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
		
		const updatedTrack: Track = {
			...trackToEdit,
			title: data.name,
			description: data.description,
			colors,
			photo: data.photo || undefined,
			icon: data.icon || undefined,
			tags: tagsArray.length > 0 ? tagsArray : undefined,
			organizer: data.organizer || undefined,
			location: data.location || undefined,
		};
		
		setTracks((prev) =>
			prev.map((t) => (t.title === trackToEdit.title ? updatedTrack : t))
		);
		
		if (selectedTrack?.title === trackToEdit.title) {
			setSelectedTrack(updatedTrack);
		}
		
		setEditModalOpen(false);
		setTrackToEdit(null);
	};


	return (
		<div className="w-full bg-white p-4 md:p-8 dark:bg-gray-900">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
						Conference Tracks
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Organize sessions into themed tracks
					</p>
				</div>
				<div className="flex items-center gap-3">
					{/* View Mode Toggle */}
					<div className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="sm"
							onClick={() => setViewMode("grid")}
							className={`h-8 px-3 ${
								viewMode === "grid"
									? "bg-indigo-600 text-white hover:bg-indigo-700"
									: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
							}`}
						>
							<Grid3X3 className="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="sm"
							onClick={() => setViewMode("list")}
							className={`h-8 px-3 ${
								viewMode === "list"
									? "bg-indigo-600 text-white hover:bg-indigo-700"
									: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
							}`}
						>
							<List className="h-4 w-4" />
						</Button>
					</div>
					<Button
						variant="default"
						onClick={() => setCreateModalOpen(true)}
					>
						Add Track
					</Button>
				</div>
			</div>

			{/* Tracks Display */}
			{viewMode === "grid" ? (
				<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{paginatedTracks.map((track) => (
						<TrackCard
							key={track.title}
							track={track}
							onClick={() => setSelectedTrack(track)}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</div>
			) : (
				<div className="mt-6 space-y-3">
					{paginatedTracks.map((track) => (
						<TrackListItem
							key={track.title}
							track={track}
							onClick={() => setSelectedTrack(track)}
						/>
					))}
				</div>
			)}

			{/* Pagination */}
			{tracks.length > 0 && (
				<div className="mt-6">
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={tracks.length}
						itemsPerPage={itemsPerPage}
						onPageChange={setCurrentPage}
						onItemsPerPageChange={setItemsPerPage}
					/>
				</div>
			)}

			{/* Create Modal */}
			<AddTrackModal
				open={createModalOpen}
				onOpenChange={(open) => {
					setCreateModalOpen(open);
				}}
				onSave={(data) => {
					handleSaveCreate(data);
					setCreateModalOpen(false);
				}}
			/>

			{/* Edit Modal */}
			<AddTrackModal
				open={editModalOpen}
				onOpenChange={(open) => {
					setEditModalOpen(open);
					if (!open) setTrackToEdit(null);
				}}
				track={trackToEdit}
				onSave={(data) => {
					handleSaveEdit(data);
					setEditModalOpen(false);
				}}
			/>

			{selectedTrack && (
				<TrackDetailModal
					track={selectedTrack}
					isOpen={!!selectedTrack}
					onClose={() => setSelectedTrack(null)}
				/>
			)}
		</div>
	);
}
