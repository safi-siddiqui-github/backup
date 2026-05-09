"use client";

import {
	FileText,
	Grid,
	Heart,
	Loader2,
	MessageCircle,
	Sparkles,
	Upload,
	User,
} from "lucide-react";
import React, { useCallback, useEffect, useState, useRef } from "react";
import EmptyUploadsState from "./EmptyUploadsState";
import FindMeModal from "./FindMeModal";
import ImageModal from "./ImageModal";
import PhotoCard from "./PhotoCard";
import StatCard from "./StatCard";
import { Photo } from "./types";
import UploadQuotaStatus from "./UploadQuotaStatus";
import UploadScreen from "./UploadScreen";
import { Folder, Users, ChevronUp } from "lucide-react";

interface FilterState {
	tags: string[];
	albums: string[];
	uploaders: string[];
}

const initialFilters: FilterState = { tags: [], albums: [], uploaders: [] };
const initialAvailableTags = ["activity", "venue", "setup"];
const initialAvailableAlbums = ["Reception", "Activities", "Setup"];
const initialAvailableUploaders = [
	{ name: "John Doe", count: 1 },
	{ name: "Jane Smith", count: 2 },
];
const __app_id =
	typeof window !== "undefined" ? (window as any).__app_id : undefined;
const __firebase_config =
	typeof window !== "undefined" ? (window as any).__firebase_config : undefined;
const __initial_auth_token =
	typeof window !== "undefined"
		? (window as any).__initial_auth_token
		: undefined;

export default function PhotoTab() {
	const [view, setView] = useState<"gallery" | "upload">("gallery");
	const [activeTab, setActiveTab] = useState<"gallery" | "my-uploads">(
		"gallery",
	);
	const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
	const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] =
		useState<FilterState>(initialFilters);

	const [albumsOpen, setAlbumsOpen] = useState(true);
	const [uploadersOpen, setUploadersOpen] = useState(true);

	const filtersRef = useRef<HTMLDivElement | null>(null);
	const sortRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const onDocMouseDown = (e: MouseEvent) => {
			const target = e.target as Node;
			if (filtersRef.current && !filtersRef.current.contains(target)) {
				setFiltersDropdownOpen(false);
			}
			if (sortRef.current && !sortRef.current.contains(target)) {
				setShowSortOptions(false);
			}
		};

		document.addEventListener("mousedown", onDocMouseDown);
		return () => document.removeEventListener("mousedown", onDocMouseDown);
	}, []);

	const handleTagChange = (tag: string) => {
		const next = selectedFilters.tags.includes(tag)
			? selectedFilters.tags.filter((t) => t !== tag)
			: [...selectedFilters.tags, tag];
		setSelectedFilters({ ...selectedFilters, tags: next });
	};

	const handleAlbumChange = (album: string) => {
		const next = selectedFilters.albums.includes(album)
			? selectedFilters.albums.filter((a) => a !== album)
			: [...selectedFilters.albums, album];
		setSelectedFilters({ ...selectedFilters, albums: next });
	};

	const handleUploaderChange = (uploaderName: string) => {
		const next = selectedFilters.uploaders.includes(uploaderName)
			? selectedFilters.uploaders.filter((x) => x !== uploaderName)
			: [...selectedFilters.uploaders, uploaderName];
		setSelectedFilters({ ...selectedFilters, uploaders: next });
	};

	const clearFilters = () => {
		setSelectedFilters(initialFilters);
	};
	const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
	const [userId, setUserId] = useState<string | null>(null);
	const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const quotaTotal = 10;
	const userPhotos = allPhotos.filter((p) => p.uploaderId === userId);
	const quotaRemaining = Math.max(0, quotaTotal - userPhotos.length);
	const photosToDisplay = activeTab === "gallery" ? allPhotos : userPhotos;

	const totalLikes = allPhotos.reduce(
		(sum, photo) => sum + (photo.likes || 0),
		0,
	);
	const totalComments = allPhotos.reduce(
		(sum, photo) => sum + (photo.comments || 0),
		0,
	);
	const myUploadCount = userPhotos.length;
	const [searchTerm, setSearchTerm] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [sortBy, setSortBy] = useState<
		"newest" | "oldest" | "most_liked" | "most_commented"
	>("newest");
	const [showSortOptions, setShowSortOptions] = useState(false);

	const availableTagsData = Array.from(
		new Set(allPhotos.flatMap((p) => p.tags || [])),
	).sort();
	const availableAlbumsData = Array.from(
		new Set(allPhotos.map((p) => (p as any).album).filter(Boolean)),
	).sort();
	const uploaderCounts = allPhotos.reduce((acc: Record<string, number>, p) => {
		const name = p.uploader || p.uploadedBy || "Unknown";
		acc[name] = (acc[name] || 0) + 1;
		return acc;
	}, {});
	const availableUploadersData = Object.entries(uploaderCounts).map(
		([name, count]) => ({ name, count }),
	);

	const suggestionTags = [
		"wedding",
		"family",
		"selfie",
		"sunset",
		"portrait",
		"group",
		"ceremony",
	];

	const handleSelectTag = (tag: string) => {
		setSearchTerm(tag);
		setShowSuggestions(false);
	};

	const filteredPhotos = (photosToDisplay || []).filter((p) => {
		if (!searchTerm) return true;
		const q = searchTerm.toLowerCase();
		const inTitle = (p.title || "").toLowerCase().includes(q);
		const inUploader = (p.uploader || "").toLowerCase().includes(q);
		const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
		return inTitle || inUploader || inTags;
	});

	const filteredWithFilters = filteredPhotos.filter((p) => {
		if (selectedFilters.tags.length > 0) {
			const hasTag = (p.tags || []).some((t) =>
				selectedFilters.tags.includes(t),
			);
			if (!hasTag) return false;
		}

		if (selectedFilters.albums.length > 0) {
			const album = (p as any).album;
			if (!album || !selectedFilters.albums.includes(album)) return false;
		}

		if (selectedFilters.uploaders.length > 0) {
			const uploaderName = p.uploader || p.uploadedBy || "Unknown";
			if (!selectedFilters.uploaders.includes(uploaderName)) return false;
		}

		return true;
	});

	const sortedPhotos = [...filteredWithFilters].sort((a, b) => {
		switch (sortBy) {
			case "newest": {
				const ta = a.uploadDate ? new Date(a.uploadDate).getTime() : 0;
				const tb = b.uploadDate ? new Date(b.uploadDate).getTime() : 0;
				return tb - ta;
			}
			case "oldest": {
				const ta = a.uploadDate ? new Date(a.uploadDate).getTime() : 0;
				const tb = b.uploadDate ? new Date(b.uploadDate).getTime() : 0;
				return ta - tb;
			}
			case "most_liked":
				return (b.likes || 0) - (a.likes || 0);
			case "most_commented":
				return (b.comments || 0) - (a.comments || 0);
			default:
				return 0;
		}
	});

	useEffect(() => {
		const appId = __app_id || "default-app-id";
		const firebaseConfig = __firebase_config
			? JSON.parse(__firebase_config)
			: null;

		if (!firebaseConfig) {
			setIsAuthReady(true);
			setIsLoading(false);
			setAllPhotos([]);
			return;
		}

		return () => {};
	}, []);

	const openModal = useCallback(
		(photo: Photo) => {
			setSelectedPhoto(photo);
			const photos = activeTab === "gallery" ? allPhotos : userPhotos;
			setSelectedPhotoIndex(photos.findIndex((p) => p.id === photo.id));
			document.body.style.overflow = "hidden";
		},
		[activeTab, allPhotos, userPhotos],
	);

	const closeModal = useCallback(() => {
		setSelectedPhoto(null);
		setSelectedPhotoIndex(0);
		document.body.style.overflow = "unset";
	}, []);

	const navigatePhotos = useCallback(
		(index: number) => {
			const photos = activeTab === "gallery" ? allPhotos : userPhotos;
			if (index >= 0 && index < photos.length) {
				setSelectedPhoto(photos[index]);
				setSelectedPhotoIndex(index);
			}
		},
		[activeTab, allPhotos, userPhotos],
	);

	const openUpload = () => setView("upload");
	const closeUpload = () => setView("gallery");
	const [findMeOpen, setFindMeOpen] = useState(false);

	const TabButton: React.FC<{
		id: "gallery" | "my-uploads";
		label: React.ReactNode;
		icon?: React.ComponentType<any>;
		className?: string;
	}> = ({ id, label, icon: Icon, className = "" }) => (
		<button
			onClick={() => setActiveTab(id)}
			className={`flex grow items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-200 ease-in-out sm:grow-0 sm:justify-start ${
				activeTab === id
					? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
					: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
			} ${className}`}
		>
			{Icon && <Icon className="mr-2 h-4 w-4" />}
			{label}
		</button>
	);

	const LoadingState: React.FC = () => (
		<div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl bg-white p-8 text-indigo-600 dark:bg-[#090a11] dark:text-indigo-400">
			<Loader2 className="mb-4 h-10 w-10 animate-spin" />
			<p className="text-lg font-semibold">Loading Gallery...</p>
		</div>
	);

	const GalleryView: React.FC = () => (
		<div className="mx-auto max-w-7xl  ">
			<div className="mb-6 rounded-2xl bg-white p-6 shadow-xl dark:bg-[#090a11]">
				<div className="flex items-start justify-between">
					<div>
						<h1 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
							Event Photos
						</h1>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Share your memories and explore the gallery
						</p>
					</div>
					<button
						onClick={openUpload}
						className="flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition duration-150 hover:bg-indigo-700"
					>
						Upload
					</button>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
					<StatCard
						icon={FileText}
						title="My Uploads"
						value={myUploadCount}
						colorClass="text-indigo-600 dark:text-indigo-400"
					/>
					<StatCard
						icon={Heart}
						title="Total Likes"
						value={totalLikes}
						colorClass="text-red-500"
					/>
					<StatCard
						icon={MessageCircle}
						title="Comments"
						value={totalComments}
						colorClass="text-purple-600 dark:text-purple-400"
					/>
					<StatCard
						icon={Upload}
						title="Upload Quota"
						value={`${myUploadCount}/${quotaTotal}`}
						colorClass="text-green-600 dark:text-green-400"
					/>
				</div>
			</div>

			<div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-[#090a11]">
				<div className="border-b border-gray-200 px-4 sm:px-6 dark:border-gray-800">
					<div className="flex items-center justify-between py-2">
						<div className="flex items-center gap-4">
							<div className="flex space-x-2">
								<TabButton
									id="gallery"
									label={`Gallery (${allPhotos.length})`}
									icon={Grid}
								/>
								<TabButton
									id="my-uploads"
									label={`My Uploads (${myUploadCount})`}
									icon={User}
								/>
							</div>
							<button onClick={openUpload} className="ml-2">
								<UploadQuotaStatus count={quotaRemaining} />
							</button>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-200 p-4 sm:p-6 dark:border-gray-800">
					<div className="flex flex-wrap items-center gap-3">
						<div className="relative max-w-sm min-w-[200px] grow">
							<div className="absolute top-1/2 left-3 -translate-y-1/2 text-indigo-500 dark:text-indigo-300">
								<Sparkles className="h-4 w-4" />
							</div>
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onFocus={() => setShowSuggestions(true)}
								onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
								placeholder="Search photos or try AI search..."
								className="w-full rounded-full border py-2 pr-4 pl-10 text-sm dark:bg-[#070b1c] dark:text-white"
							/>

							{showSuggestions && (
								<div className="absolute right-0 left-0 z-20 mt-2 rounded-lg bg-white p-3 shadow-md dark:bg-[#090a11]">
									<div className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-300">
										Try searching by tags
									</div>
									<div className="flex flex-wrap gap-2">
										{suggestionTags.map((tag) => (
											<button
												key={tag}
												onMouseDown={(e) => {
													e.preventDefault();
													handleSelectTag(tag);
												}}
												className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-[#070b1c] dark:text-gray-200"
											>
												{tag}
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						<div className="relative ml-auto flex flex-wrap items-center gap-2 sm:gap-4">
							<button
								onClick={() => setFindMeOpen(true)}
								className="flex items-center rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-[#070b1c] dark:text-gray-300 dark:hover:bg-gray-800"
							>
								Find Me
							</button>
							<div className="relative" ref={filtersRef}>
								<button
									onClick={() => setFiltersDropdownOpen((s) => !s)}
									className="flex items-center rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-[#070b1c] dark:text-gray-300 dark:hover:bg-gray-800"
								>
									Filters
								</button>

								{filtersDropdownOpen && (
									<div className="absolute overflow-y-auto right-0 z-40 mt-2 w-64 rounded-xl bg-white p-4 shadow-xl dark:bg-[#00020f]">
										<div>
											<h3 className="mb-2 text-lg font-semibold dark:text-gray-200">
												Filters
											</h3>
											<div className="flex flex-col gap-2">
												{initialAvailableTags.map((tag) => (
													<label
														key={tag}
														className="flex items-center gap-2 text-sm dark:text-gray-300"
													>
														<input
															type="checkbox"
															checked={selectedFilters.tags.includes(tag)}
															onChange={() => handleTagChange(tag)}
														/>
														{tag}
													</label>
												))}
											</div>
										</div>

										{initialAvailableAlbums.length > 0 && (
											<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
												<button
													onClick={() => setAlbumsOpen(!albumsOpen)}
													className="flex w-full items-center justify-between text-sm font-semibold dark:text-gray-200"
												>
													<div className="flex items-center gap-2">
														<Folder className="h-5 w-5" />
														Albums
													</div>
													<ChevronUp
														className={`h-4 w-4 transform transition-transform ${albumsOpen ? "rotate-180" : "rotate-0"}`}
													/>
												</button>

												{albumsOpen && (
													<div className="mt-2 flex   flex-col gap-2 overflow-auto">
														{initialAvailableAlbums.map((album) => (
															<label
																key={album}
																className="flex items-center gap-2 text-sm dark:text-gray-300"
															>
																<input
																	type="checkbox"
																	checked={selectedFilters.albums.includes(
																		album,
																	)}
																	onChange={() => handleAlbumChange(album)}
																/>
																{album}
															</label>
														))}
													</div>
												)}
											</div>
										)}

										<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
											<button
												onClick={() => setUploadersOpen(!uploadersOpen)}
												className="flex w-full items-center justify-between text-sm font-semibold dark:text-gray-200"
											>
												<div className="flex items-center gap-2">
													<Users className="h-5 w-5" />
													Uploaded By
												</div>
												<ChevronUp
													className={`h-4 w-4 transform transition-transform ${uploadersOpen ? "rotate-180" : "rotate-0"}`}
												/>
											</button>

											{uploadersOpen && (
												<div className="mt-2 flex  flex-col gap-2 overflow-auto">
													{initialAvailableUploaders.map((u) => (
														<label
															key={u.name}
															className="flex items-center gap-2 text-sm dark:text-gray-300"
														>
															<input
																type="checkbox"
																checked={selectedFilters.uploaders.includes(
																	u.name,
																)}
																onChange={() => handleUploaderChange(u.name)}
															/>
															{u.name}{" "}
															<span className="text-gray-400">({u.count})</span>
														</label>
													))}
												</div>
											)}
										</div>

										<div className="mt-4 flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
											<button
												onClick={clearFilters}
												className="rounded bg-gray-100 px-3 py-1 text-xs dark:bg-[#070b1c] dark:text-gray-300"
											>
												Clear
											</button>
											<button
												onClick={() => setFiltersDropdownOpen(false)}
												className="rounded bg-indigo-600 px-3 py-1 text-xs text-white"
											>
												Apply
											</button>
										</div>
									</div>
								)}
							</div>
							<div className="relative" ref={sortRef}>
								<button
									onClick={() => setShowSortOptions((s) => !s)}
									className="flex items-center rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-[#070b1c] dark:text-gray-300 dark:hover:bg-gray-800"
								>
									Sort:{" "}
									<span className="ml-2 font-medium">
										{sortBy === "newest"
											? "Newest"
											: sortBy === "oldest"
												? "Oldest"
												: sortBy === "most_liked"
													? "Most liked"
													: "Most commented"}
									</span>
								</button>

								{showSortOptions && (
									<div className="absolute right-0 z-30 mt-2 w-44 rounded-md bg-white shadow-lg dark:bg-[#090a11]">
										<button
											onMouseDown={(e) => {
												e.preventDefault();
												setSortBy("newest");
												setShowSortOptions(false);
											}}
											className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#070b1c]"
										>
											Newest
										</button>
										<button
											onMouseDown={(e) => {
												e.preventDefault();
												setSortBy("oldest");
												setShowSortOptions(false);
											}}
											className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#070b1c]"
										>
											Oldest
										</button>
										<button
											onMouseDown={(e) => {
												e.preventDefault();
												setSortBy("most_liked");
												setShowSortOptions(false);
											}}
											className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#070b1c]"
										>
											Most liked
										</button>
										<button
											onMouseDown={(e) => {
												e.preventDefault();
												setSortBy("most_commented");
												setShowSortOptions(false);
											}}
											className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#070b1c]"
										>
											Most commented
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="p-4 min-h-[600px] sm:p-6">
					{isLoading ? (
						<LoadingState />
					) : filteredWithFilters.length > 0 ? (
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{sortedPhotos.map((photo) => (
								<PhotoCard key={photo.id} photo={photo} onClick={openModal} />
							))}
						</div>
					) : activeTab === "my-uploads" ? (
						<EmptyUploadsState onOpenUpload={openUpload} />
					) : (
						<p className="py-10 text-center text-gray-500 dark:text-gray-400">
							No photos match your filters or search.
						</p>
					)}
				</div>
			</div>

			<ImageModal
				photo={selectedPhoto}
				allPhotos={photosToDisplay}
				onClose={closeModal}
				onNavigate={navigatePhotos}
			/>
		</div>
	);

	return (
		<div className="p-4   ">
			{view === "gallery" && <GalleryView />}
			{view === "upload" && (
				<UploadScreen onBack={closeUpload} quotaRemaining={quotaRemaining} />
			)}
		</div>
	);
}
