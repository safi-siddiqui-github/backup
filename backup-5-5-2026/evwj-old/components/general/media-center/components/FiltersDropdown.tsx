"use client";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Filter,
	ChevronDown,
	Tag,
	Folder,
	Users,
	ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface FiltersDropdownProps {
	selectedTags: string[];
	onTagsChange: (tags: string[]) => void;
	selectedAlbums: string[];
	onAlbumsChange: (albums: string[]) => void;
	selectedUploaders: string[];
	onUploadersChange: (uploaders: string[]) => void;
	onClearAll: () => void;
}

const AVAILABLE_TAGS = [
	"reception",
	"guests",
	"activity",
	"team",
	"venue",
	"setup",
];

const AVAILABLE_ALBUMS = ["Main Album", "Ceremony", "Reception", "Party"];

const AVAILABLE_UPLOADERS = [
	"John Doe",
	"Jane Smith",
	"Mike Johnson",
	"Sarah Wilson",
	"David Brown",
];

export default function FiltersDropdown({
	selectedTags,
	onTagsChange,
	selectedAlbums,
	onAlbumsChange,
	selectedUploaders,
	onUploadersChange,
	onClearAll,
}: FiltersDropdownProps) {
	const [open, setOpen] = useState(false);
	const [expandedSections, setExpandedSections] = useState({
		tags: true,
		albums: false,
		uploaders: false,
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			onTagsChange(selectedTags.filter((t) => t !== tag));
		} else {
			onTagsChange([...selectedTags, tag]);
		}
	};

	const handleAlbumToggle = (album: string) => {
		if (selectedAlbums.includes(album)) {
			onAlbumsChange(selectedAlbums.filter((a) => a !== album));
		} else {
			onAlbumsChange([...selectedAlbums, album]);
		}
	};

	const handleUploaderToggle = (uploader: string) => {
		if (selectedUploaders.includes(uploader)) {
			onUploadersChange(selectedUploaders.filter((u) => u !== uploader));
		} else {
			onUploadersChange([...selectedUploaders, uploader]);
		}
	};

	const getActiveFiltersCount = () => {
		return (
			selectedTags.length + selectedAlbums.length + selectedUploaders.length
		);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					<Filter className="h-4 w-4 mr-2" />
					Filters
					{getActiveFiltersCount() > 0 && (
						<span className="ml-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
							{getActiveFiltersCount()}
						</span>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent
				className="w-80 p-0 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]"
				align="start"
			>
				<div className="p-4">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<h3 className="font-semibold text-lg text-gray-900 dark:text-slate-200">
							Filters
						</h3>
						{getActiveFiltersCount() > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={onClearAll}
								className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
							>
								Clear All
							</Button>
						)}
					</div>

					{/* Tags Section */}
					<div className="border-b border-gray-200 dark:border-slate-600 pb-4 mb-4">
						<div
							className="flex items-center justify-between cursor-pointer"
							onClick={() => toggleSection("tags")}
						>
							<div className="flex items-center gap-2">
								<Tag className="h-4 w-4 text-gray-600 dark:text-slate-400" />
								<span className="font-medium text-gray-900 dark:text-slate-200">
									Tags
								</span>
							</div>
							{expandedSections.tags ? (
								<ChevronUp className="h-4 w-4 text-gray-400 dark:text-slate-500" />
							) : (
								<ChevronDown className="h-4 w-4 text-gray-400 dark:text-slate-500" />
							)}
						</div>

						{expandedSections.tags && (
							<div className="mt-3 space-y-2">
								{AVAILABLE_TAGS.map((tag) => (
									<div key={tag} className="flex items-center space-x-2">
										<Checkbox
											id={`tag-${tag}`}
											checked={selectedTags.includes(tag)}
											onCheckedChange={() => handleTagToggle(tag)}
										/>
										<label
											htmlFor={`tag-${tag}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-slate-200"
										>
											{tag}
										</label>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Albums Section */}
					<div className="border-b border-gray-200 dark:border-slate-600 pb-4 mb-4">
						<div
							className="flex items-center justify-between cursor-pointer"
							onClick={() => toggleSection("albums")}
						>
							<div className="flex items-center gap-2">
								<Folder className="h-4 w-4 text-gray-600 dark:text-slate-400" />
								<span className="font-medium text-gray-900 dark:text-slate-200">
									Albums
								</span>
							</div>
							{expandedSections.albums ? (
								<ChevronUp className="h-4 w-4 text-gray-400 dark:text-slate-500" />
							) : (
								<ChevronDown className="h-4 w-4 text-gray-400 dark:text-slate-500" />
							)}
						</div>

						{expandedSections.albums && (
							<div className="mt-3 space-y-2">
								{AVAILABLE_ALBUMS.map((album) => (
									<div key={album} className="flex items-center space-x-2">
										<Checkbox
											id={`album-${album}`}
											checked={selectedAlbums.includes(album)}
											onCheckedChange={() => handleAlbumToggle(album)}
										/>
										<label
											htmlFor={`album-${album}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-slate-200"
										>
											{album}
										</label>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Uploaded By Section */}
					<div>
						<div
							className="flex items-center justify-between cursor-pointer"
							onClick={() => toggleSection("uploaders")}
						>
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-gray-600 dark:text-slate-400" />
								<span className="font-medium text-gray-900 dark:text-slate-200">
									Uploaded By
								</span>
							</div>
							{expandedSections.uploaders ? (
								<ChevronUp className="h-4 w-4 text-gray-400 dark:text-slate-500" />
							) : (
								<ChevronDown className="h-4 w-4 text-gray-400 dark:text-slate-500" />
							)}
						</div>

						{expandedSections.uploaders && (
							<div className="mt-3 space-y-2">
								{AVAILABLE_UPLOADERS.map((uploader) => (
									<div key={uploader} className="flex items-center space-x-2">
										<Checkbox
											id={`uploader-${uploader}`}
											checked={selectedUploaders.includes(uploader)}
											onCheckedChange={() => handleUploaderToggle(uploader)}
										/>
										<label
											htmlFor={`uploader-${uploader}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-slate-200"
										>
											{uploader}
										</label>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
