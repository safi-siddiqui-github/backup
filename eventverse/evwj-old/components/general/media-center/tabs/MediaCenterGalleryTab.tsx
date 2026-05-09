"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Grid3X3,
	List,
	Download,
	Trash2,
	CheckSquare,
	Search,
	User,
	FolderPlus,
	Sparkles,
	X,
} from "lucide-react";
import { useState } from "react";
import { MOCK_PHOTOS, MOCK_ALBUMS } from "../shared";
import { PhotoCard, FiltersDropdown } from "../components";
import { PhotoDetailModal, FindMeModal } from "../modals";

export default function MediaCenterGalleryTab() {
	const [selectedAlbum, setSelectedAlbum] = useState<string>("all");
	const [filterType, setFilterType] = useState<string>("all");
	const [sortOrder, setSortOrder] = useState<string>("newest");
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
	const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	// New search and filter states
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
	const [showFindMeModal, setShowFindMeModal] = useState<boolean>(false);
	const [isAISearchMode, setIsAISearchMode] = useState<boolean>(false);
	const [showAISuggestions, setShowAISuggestions] = useState<boolean>(false);
	const [showAISearchAlert, setShowAISearchAlert] = useState<boolean>(false);
	const [showSearchSuggestions, setShowSearchSuggestions] =
		useState<boolean>(false);

	// Filter states for the new dropdown
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);
	const [selectedUploaders, setSelectedUploaders] = useState<string[]>([]);

	const filteredPhotos = MOCK_PHOTOS.filter((photo) => {
		// Album filter
		if (selectedAlbum !== "all" && photo.albumId !== selectedAlbum)
			return false;

		// Media type filter
		if (filterType === "photos" && photo.fileType.startsWith("video/"))
			return false;
		if (filterType === "videos" && photo.fileType.startsWith("image/"))
			return false;

		// Search query filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			const matchesTitle = photo.title?.toLowerCase().includes(query);
			const matchesTags = photo.tags.some((tag) =>
				tag.toLowerCase().includes(query),
			);
			const matchesUploader = photo.uploadedBy.name
				.toLowerCase()
				.includes(query);

			if (!matchesTitle && !matchesTags && !matchesUploader) return false;
		}

		// Tags filter
		if (selectedTags.length > 0) {
			const hasMatchingTag = selectedTags.some((tag) =>
				photo.tags.some((photoTag) =>
					photoTag.toLowerCase().includes(tag.toLowerCase()),
				),
			);
			if (!hasMatchingTag) return false;
		}

		// Albums filter
		if (selectedAlbums.length > 0) {
			const albumName = MOCK_ALBUMS.find(
				(album) => album.id === photo.albumId,
			)?.name;
			if (!albumName || !selectedAlbums.includes(albumName)) return false;
		}

		// Uploaders filter
		if (selectedUploaders.length > 0) {
			if (!selectedUploaders.includes(photo.uploadedBy.name)) return false;
		}

		return true;
	});

	const sortedPhotos = [...filteredPhotos].sort((a, b) => {
		switch (sortOrder) {
			case "oldest":
				return (
					new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
				);
			case "most-liked":
				return b.likes - a.likes;
			case "most-downloaded":
				return b.downloads - a.downloads;
			default: // newest
				return (
					new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
				);
		}
	});

	const handleLike = (photoId: string) => {
		console.log("Liking photo:", photoId);
	};

	const handleDownload = (photoId: string) => {
		console.log("Downloading photo:", photoId);
	};

	const handleDelete = (photoId: string) => {
		console.log("Deleting photo:", photoId);
	};

	const handleSelectPhoto = (photoId: string) => {
		const newSelected = new Set(selectedPhotos);
		if (newSelected.has(photoId)) {
			newSelected.delete(photoId);
		} else {
			newSelected.add(photoId);
		}
		setSelectedPhotos(newSelected);
	};

	const handleBulkDownload = () => {
		console.log("Bulk downloading photos:", Array.from(selectedPhotos));
	};

	const handleBulkDelete = () => {
		console.log("Bulk deleting photos:", Array.from(selectedPhotos));
	};

	const handleBulkAddToAlbum = () => {
		console.log("Adding photos to album:", Array.from(selectedPhotos));
	};

	const handleClearSelection = () => {
		setSelectedPhotos(new Set());
	};

	const handleClearFilters = () => {
		setSearchQuery("");
		setSelectedAlbum("all");
		setFilterType("all");
		setSelectedTags([]);
		setSelectedAlbums([]);
		setSelectedUploaders([]);
	};

	const handleToggleSelectMode = () => {
		setIsSelectMode(!isSelectMode);
		if (isSelectMode) {
			setSelectedPhotos(new Set());
		}
	};

	const handleFindMe = () => {
		setShowFindMeModal(true);
	};

	const handleFindPhotos = (imageFile: File) => {
		console.log("Finding photos with face:", imageFile);
		// In a real implementation, this would use face recognition
		// For now, we'll just filter photos with certain tags
		setSelectedTags(["reception", "guests"]);
	};

	const handleAISearchToggle = () => {
		setIsAISearchMode(!isAISearchMode);
		setShowAISuggestions(!showAISuggestions);
		if (!isAISearchMode) {
			setSearchQuery("");
		}
	};

	const handleAISuggestion = (suggestion: string) => {
		setSearchQuery(suggestion);
		setIsAISearchMode(true);
		setShowAISuggestions(false);
		setShowAISearchAlert(true);

		// Auto-hide the alert after 3 seconds
		setTimeout(() => {
			setShowAISearchAlert(false);
		}, 3000);
	};

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);

		// Hide suggestions when user types
		if (value.trim()) {
			setShowSearchSuggestions(false);
		}

		// Show AI alert if user types while in AI mode and query is not empty
		if (isAISearchMode && value.trim() && !showAISearchAlert) {
			setShowAISearchAlert(true);
			setTimeout(() => {
				setShowAISearchAlert(false);
			}, 3000);
		}
	};

	const handleSearchFocus = () => {
		if (!searchQuery.trim()) {
			setShowSearchSuggestions(true);
		}
	};

	const handleSearchBlur = () => {
		// Delay hiding suggestions to allow clicks on suggestions
		setTimeout(() => {
			setShowSearchSuggestions(false);
		}, 200);
	};

	const handleSuggestionClick = (suggestion: string) => {
		setSearchQuery(suggestion);
		setShowSearchSuggestions(false);
	};

	const aiSuggestions = [
		"people wearing red dress",
		"group photos",
		"outdoor scenery",
		"food on table",
		"dancing people",
		"stage performance",
	];

	const searchSuggestions = ["red dress", "black suit", "dancing", "food"];

	const currentPhotoIndex = selectedPhoto
		? sortedPhotos.findIndex((p) => p.id === selectedPhoto)
		: -1;
	const currentPhoto = selectedPhoto ? sortedPhotos[currentPhotoIndex] : null;

	const navigatePhoto = (direction: "prev" | "next") => {
		if (currentPhotoIndex === -1) return;

		const newIndex =
			direction === "prev"
				? (currentPhotoIndex - 1 + sortedPhotos.length) % sortedPhotos.length
				: (currentPhotoIndex + 1) % sortedPhotos.length;

		setSelectedPhoto(sortedPhotos[newIndex].id);
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Search and Main Controls */}
			<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
				<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
				<CardContent className="p-4 relative z-10">
					<div className="flex flex-col gap-4">
						{/* Search Bar and Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-1 z-10">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 h-4 w-4" />
								<Input
									placeholder={
										isAISearchMode
											? "Search photos or try AI search..."
											: "Search photos by title, tags, or uploader..."
									}
									value={searchQuery}
									onChange={handleSearchInput}
									onFocus={handleSearchFocus}
									onBlur={handleSearchBlur}
									className="pl-10 pr-12 !bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								/>
								<Button
									variant="ghost"
									size="sm"
									onClick={handleAISearchToggle}
									className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${
										isAISearchMode
											? "text-purple-600 hover:text-purple-700"
											: "text-gray-400 hover:text-purple-600"
									} transition-colors duration-200`}
								>
									<Sparkles className="h-4 w-4" />
								</Button>

								{/* Search Suggestions Dropdown */}
								{showSearchSuggestions && !searchQuery.trim() && (
									<div className="absolute top-full left-0 right-0 mt-2 z-[100] !bg-white dark:!bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
										<div className="p-2">
											<div className="text-xs font-semibold text-gray-500 dark:text-slate-400 px-3 py-2 mb-1">
												Search Suggestions
											</div>
											{searchSuggestions.map((suggestion, index) => (
												<button
													key={index}
													onClick={() => handleSuggestionClick(suggestion)}
													className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-2"
												>
													<Search className="h-3 w-3 text-gray-400 dark:text-slate-500" />
													<span>{suggestion}</span>
												</button>
											))}
										</div>
									</div>
								)}
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={handleFindMe}
								className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								<User className="h-4 w-4 mr-2" />
								<span className="font-semibold">Find Me</span>
							</Button>
							<div className="flex items-center gap-2">
								<Button
									variant={isSelectMode ? "default" : "outline"}
									size="sm"
									onClick={handleToggleSelectMode}
									className={
										isSelectMode
											? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
											: "border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									}
								>
									<CheckSquare className="h-4 w-4 mr-2" />
									<span className="font-semibold">
										{isSelectMode ? "Exit Select" : "Select"}
									</span>
								</Button>
								<FiltersDropdown
									selectedTags={selectedTags}
									onTagsChange={setSelectedTags}
									selectedAlbums={selectedAlbums}
									onAlbumsChange={setSelectedAlbums}
									selectedUploaders={selectedUploaders}
									onUploadersChange={setSelectedUploaders}
									onClearAll={handleClearFilters}
								/>
							</div>
						</div>

						{/* AI Search Suggestions */}
						{showAISuggestions && (
							<div className="space-y-3">
								<div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-slate-200">
									<Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
									✨ Try AI-powered search:
								</div>
								<div className="flex flex-wrap gap-2">
									{aiSuggestions.map((suggestion, index) => (
										<Button
											key={index}
											variant="outline"
											size="sm"
											onClick={() => handleAISuggestion(suggestion)}
											className="text-xs px-3 py-1 h-auto rounded-full border-gray-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 !bg-white dark:!bg-slate-700/50 transition-colors duration-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
										>
											{suggestion}
										</Button>
									))}
								</div>
							</div>
						)}

						{/* Sort and View Controls */}
						<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
							<div className="flex items-center gap-4">
								<Select value={sortOrder} onValueChange={setSortOrder}>
									<SelectTrigger className="w-40 !bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="newest">Newest First</SelectItem>
										<SelectItem value="oldest">Oldest First</SelectItem>
										<SelectItem value="most-liked">Most Liked</SelectItem>
										<SelectItem value="most-downloaded">
											Most Downloaded
										</SelectItem>
									</SelectContent>
								</Select>

								<div className="text-sm text-gray-600 dark:text-slate-400">
									{sortedPhotos.length} photo
									{sortedPhotos.length !== 1 ? "s" : ""} found
								</div>
							</div>

							<div className="flex items-center gap-1 !bg-white dark:!bg-slate-700/50 rounded-lg p-1 border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<Button
									variant={viewMode === "grid" ? "default" : "ghost"}
									size="sm"
									onClick={() => setViewMode("grid")}
									className={`p-2 rounded-md transition-all ${
										viewMode === "grid"
											? "bg-indigo-600 text-white"
											: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
									}`}
								>
									<Grid3X3 className="h-4 w-4" />
								</Button>
								<Button
									variant={viewMode === "list" ? "default" : "ghost"}
									size="sm"
									onClick={() => setViewMode("list")}
									className={`p-2 rounded-md transition-all ${
										viewMode === "list"
											? "bg-indigo-600 text-white"
											: "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
									}`}
								>
									<List className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Selection Toolbar */}
			{selectedPhotos.size > 0 && (
				<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
					<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-xl shadow-2xl px-6 py-4 flex items-center gap-6 [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
						<div className="flex items-center gap-3">
							<div className="p-2 !bg-white dark:!bg-slate-700/50 rounded-lg [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<CheckSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
							</div>
							<span className="text-sm text-gray-900 dark:text-slate-200 font-semibold">
								{selectedPhotos.size} selected
							</span>
						</div>
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								size="sm"
								onClick={handleClearSelection}
								className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								Clear
							</Button>
							<Button
								variant="default"
								size="sm"
								onClick={handleBulkDownload}
								className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								<Download className="h-4 w-4 mr-2" />
								<span className="font-semibold">Download</span>
							</Button>
							<Button
								variant="default"
								size="sm"
								onClick={handleBulkAddToAlbum}
								className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								<FolderPlus className="h-4 w-4 mr-2" />
								<span className="font-semibold">Add to Album</span>
							</Button>
							<Button
								variant="destructive"
								size="sm"
								onClick={handleBulkDelete}
								className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								<Trash2 className="h-4 w-4 mr-2" />
								<span className="font-semibold">Delete</span>
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Photo Grid */}
			<div
				className={`grid gap-4 ${
					viewMode === "grid"
						? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						: "grid-cols-1"
				}`}
			>
				{sortedPhotos.map((photo) => (
					<PhotoCard
						key={photo.id}
						photo={photo}
						onLike={handleLike}
						onDownload={handleDownload}
						onDelete={handleDelete}
						isSelected={selectedPhotos.has(photo.id)}
						onSelect={() => handleSelectPhoto(photo.id)}
						onView={() => !isSelectMode && setSelectedPhoto(photo.id)}
						viewMode={viewMode}
						showSelection={isSelectMode}
					/>
				))}
			</div>

			{/* Load More Button */}
			<div className="flex justify-center">
				<Button
					variant="outline"
					className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Load More Photos
				</Button>
			</div>

			{/* Photo Detail Modal */}
			<PhotoDetailModal
				open={!!selectedPhoto}
				onOpenChange={(open) => !open && setSelectedPhoto(null)}
				photo={currentPhoto}
				onPrevious={() => navigatePhoto("prev")}
				onNext={() => navigatePhoto("next")}
				currentIndex={currentPhotoIndex}
				totalPhotos={sortedPhotos.length}
				onLike={handleLike}
				onDownload={handleDownload}
				onShare={(photoId) => console.log("Sharing photo:", photoId)}
			/>

			{/* Find Me Modal */}
			<FindMeModal
				open={showFindMeModal}
				onOpenChange={setShowFindMeModal}
				onFindPhotos={handleFindPhotos}
			/>

			{/* AI Search Alert */}
			{showAISearchAlert && (
				<div className="fixed bottom-4 right-4 z-50">
					<div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[280px]">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<h3 className="font-semibold text-gray-800 mb-1">
									AI Search Started
								</h3>
								<p className="text-sm text-gray-600">Analyzing photos...</p>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setShowAISearchAlert(false)}
								className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
