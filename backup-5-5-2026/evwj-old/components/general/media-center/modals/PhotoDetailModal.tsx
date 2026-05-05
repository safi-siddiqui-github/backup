"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
	X,
	ChevronRight,
	Heart,
	Download,
	Share2,
	Calendar,
	Folder,
	MessageCircle,
	ChevronDown,
	Search,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MediaCenterPhoto } from "../shared";

// Mock data for likes
const mockLikes = [
	{
		id: "1",
		name: "Evelyn Ramirez",
		initials: "ER",
		avatarColor: "bg-purple-100 text-purple-800",
		likedAt: "3 days ago",
	},
	{
		id: "2",
		name: "Sebastian Martin",
		initials: "SM",
		avatarColor: "bg-pink-100 text-pink-800",
		likedAt: "1 day ago",
	},
	{
		id: "3",
		name: "Benjamin Anderson",
		initials: "BA",
		avatarColor: "bg-orange-100 text-orange-800",
		likedAt: "4 hours ago",
	},
	{
		id: "4",
		name: "Grace Wilson",
		initials: "GW",
		avatarColor: "bg-green-100 text-green-800",
		likedAt: "2 days ago",
	},
	{
		id: "5",
		name: "Michael Chen",
		initials: "MC",
		avatarColor: "bg-blue-100 text-blue-800",
		likedAt: "1 week ago",
	},
	{
		id: "6",
		name: "Sarah Johnson",
		initials: "SJ",
		avatarColor: "bg-yellow-100 text-yellow-800",
		likedAt: "5 days ago",
	},
	{
		id: "7",
		name: "David Kim",
		initials: "DK",
		avatarColor: "bg-indigo-100 text-indigo-800",
		likedAt: "6 hours ago",
	},
	{
		id: "8",
		name: "Emma Davis",
		initials: "ED",
		avatarColor: "bg-teal-100 text-teal-800",
		likedAt: "2 hours ago",
	},
];

interface PhotoDetailModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	photo: MediaCenterPhoto | null;
	onPrevious: () => void;
	onNext: () => void;
	currentIndex: number;
	totalPhotos: number;
	onLike: (photoId: string) => void;
	onDownload: (photoId: string) => void;
	onShare: (photoId: string) => void;
}

export default function PhotoDetailModal({
	open,
	onOpenChange,
	photo,
	onPrevious,
	onNext,
	currentIndex,
	totalPhotos,
	onLike,
	onDownload,
	onShare,
}: PhotoDetailModalProps) {
	const [showLikesDropdown, setShowLikesDropdown] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	if (!photo) return null;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	const filteredLikes = mockLikes.filter((like) =>
		like.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const totalLikes = mockLikes.length;
	const visibleLikes = mockLikes.slice(0, 3);
	const remainingLikes = totalLikes - 3;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh] p-0 overflow-hidden"
				showCloseButton={false}
			>
				<DialogTitle className="sr-only">
					{photo.title || "Photo Detail"}
				</DialogTitle>
				<div className="flex h-full">
					{/* Left Section - Image Display */}
					<div className="flex-1 relative bg-black">
						{/* Navigation Arrows */}
						<Button
							variant="ghost"
							size="sm"
							onClick={onPrevious}
							className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
						>
							<ChevronRight className="h-4 w-4 rotate-180" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={onNext}
							className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>

						{/* Main Image */}
						<div className="w-full h-full relative">
							<Image
								src={
									photo.url ||
									"https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg"
								}
								alt={photo.title || "Photo"}
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
								priority
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src =
										"https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg";
								}}
							/>
						</div>

						{/* Pagination */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
							{currentIndex + 1}/{totalPhotos}
						</div>
					</div>

					{/* Right Section - Information Panel */}
					<div className="w-96 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm flex flex-col [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
						{/* Header */}
						<div className="p-6 border-b border-gray-200 dark:border-slate-600">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
									{photo.title || "Welcome Reception"}
								</h2>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onOpenChange(false)}
									className="h-8 w-8 p-0"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</div>

						{/* Content */}
						<div className="flex-1 p-6 space-y-6 overflow-y-auto">
							{/* Uploader Info */}
							<div className="flex items-center gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src={photo.uploadedBy.avatar || undefined} />
									<AvatarFallback className="text-xs">
										{getInitials(photo.uploadedBy.name)}
									</AvatarFallback>
								</Avatar>
								<span className="font-medium">{photo.uploadedBy.name}</span>
							</div>

							{/* Date and Time */}
							<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
								<Calendar className="h-4 w-4" />
								<span>{formatDate(photo.uploadedAt)}</span>
							</div>

							{/* Category */}
							<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
								<Folder className="h-4 w-4" />
								<span>Reception</span>
							</div>

							{/* Tags */}
							<div>
								<h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-2">
									Tags
								</h3>
								<div className="flex flex-wrap gap-1">
									{photo.tags.map((tag, index) => (
										<Badge
											key={index}
											variant="secondary"
											className="text-xs !bg-white dark:!bg-slate-700/50 text-gray-600 dark:text-slate-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
										>
											{tag}
										</Badge>
									))}
								</div>
							</div>

							{/* Likes */}
							<div className="relative">
								<h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-2">
									Likes
								</h3>
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => onLike(photo.id)}
										className="p-0 h-auto"
									>
										<Heart className="h-4 w-4 text-red-500" />
									</Button>
									<div className="flex items-center -space-x-1">
										{visibleLikes.map((like) => (
											<Avatar
												key={like.id}
												className="h-6 w-6 border border-white"
											>
												<AvatarFallback
													className={`text-xs ${like.avatarColor}`}
												>
													{like.initials}
												</AvatarFallback>
											</Avatar>
										))}
									</div>
									<span className="text-sm text-gray-600 dark:text-slate-400">
										+{remainingLikes}
									</span>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setShowLikesDropdown(!showLikesDropdown)}
										className="p-0 h-auto"
									>
										<ChevronDown
											className={`h-3 w-3 text-gray-400 dark:text-slate-500 transition-transform ${showLikesDropdown ? "rotate-180" : ""}`}
										/>
									</Button>
								</div>

								{/* Likes Dropdown */}
								{showLikesDropdown && (
									<div className="absolute top-full left-0 right-0 mt-2 !bg-white dark:!bg-slate-800/95 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
										<div className="p-4">
											<div className="flex items-center gap-2 mb-3">
												<Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
												<h4 className="font-medium text-gray-900 dark:text-slate-200">
													Liked by {totalLikes} people
												</h4>
											</div>

											<div className="relative mb-3">
												<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
												<Input
													placeholder="Search..."
													value={searchQuery}
													onChange={(e) => setSearchQuery(e.target.value)}
													className="pl-10 h-8 text-sm !bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
												/>
											</div>

											<div className="max-h-48 overflow-y-auto space-y-2">
												{filteredLikes.map((like) => (
													<div
														key={like.id}
														className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded"
													>
														<Avatar className="h-8 w-8">
															<AvatarFallback
																className={`text-xs ${like.avatarColor}`}
															>
																{like.initials}
															</AvatarFallback>
														</Avatar>
														<div className="flex-1">
															<p className="text-sm font-medium text-gray-900 dark:text-slate-200">
																{like.name}
															</p>
															<p className="text-xs text-gray-500 dark:text-slate-400">
																Liked {like.likedAt}
															</p>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Comments */}
							<div>
								<h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-2">
									Comments
								</h3>
								<Button
									variant="outline"
									size="sm"
									className="w-full justify-start border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<MessageCircle className="h-4 w-4 mr-2" />
									Comments (0)
								</Button>
							</div>
						</div>

						{/* Footer Actions */}
						<div className="p-6 border-t border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:rgb(249_250_251)] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="flex gap-3">
								<Button
									variant="outline"
									className="flex-1 h-10 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									onClick={() => onDownload(photo.id)}
								>
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
								<Button
									variant="outline"
									className="flex-1 h-10 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									onClick={() => onShare(photo.id)}
								>
									<Share2 className="h-4 w-4 mr-2" />
									Share
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
