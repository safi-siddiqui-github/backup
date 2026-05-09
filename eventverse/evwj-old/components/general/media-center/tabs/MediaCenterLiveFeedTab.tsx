"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	Camera,
	Heart,
	MessageCircle,
	Pause,
	RotateCcw,
	Share2,
	Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface LiveFeedPhoto {
	id: string;
	url: string;
	thumbnailUrl: string;
	uploadedBy: {
		id: string;
		name: string;
		avatar: string | null;
	};
	uploadedAt: string;
	category: string;
	likes: number;
	comments: number;
	isNew: boolean;
	tags: string[];
}

interface FeedStats {
	totalPhotos: number;
	newPhotos: number;
	lastUpdated: number;
}

export default function MediaCenterLiveFeedTab() {
	const [isPaused, setIsPaused] = useState(false);
	const [lastUpdated, setLastUpdated] = useState(0);
	const [feedPhotos, setFeedPhotos] = useState<LiveFeedPhoto[]>([]);
	const [feedStats, setFeedStats] = useState<FeedStats>({
		totalPhotos: 3,
		newPhotos: 1,
		lastUpdated: 0,
	});

	// Mock data for live feed photos
	const mockFeedPhotos: LiveFeedPhoto[] = useMemo(
		() => [
			{
				id: "1",
				url: "https://picsum.photos/800/600?random=1",
				thumbnailUrl: "https://picsum.photos/400/300?random=1",
				uploadedBy: {
					id: "user-1",
					name: "Sarah M.",
					avatar: "https://ui-avatars.com/api/?name=Sarah+M&background=random",
				},
				uploadedAt: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
				category: "Reception",
				likes: 8,
				comments: 2,
				isNew: true,
				tags: ["reception", "celebration"],
			},
			{
				id: "2",
				url: "https://picsum.photos/800/600?random=2",
				thumbnailUrl: "https://picsum.photos/400/300?random=2",
				uploadedBy: {
					id: "user-2",
					name: "Mike R.",
					avatar: "https://ui-avatars.com/api/?name=Mike+R&background=random",
				},
				uploadedAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
				category: "Activities",
				likes: 12,
				comments: 4,
				isNew: false,
				tags: ["activities", "workshop"],
			},
			{
				id: "3",
				url: "https://picsum.photos/800/600?random=3",
				thumbnailUrl: "https://picsum.photos/400/300?random=3",
				uploadedBy: {
					id: "user-3",
					name: "Emma K.",
					avatar: "https://ui-avatars.com/api/?name=Emma+K&background=random",
				},
				uploadedAt: new Date(Date.now() - 480000).toISOString(), // 8 minutes ago
				category: "Venue",
				likes: 15,
				comments: 6,
				isNew: false,
				tags: ["venue", "architecture"],
			},
		],
		[],
	);

	useEffect(() => {
		setFeedPhotos(mockFeedPhotos);
		setFeedStats({
			totalPhotos: mockFeedPhotos.length,
			newPhotos: mockFeedPhotos.filter((photo) => photo.isNew).length,
			lastUpdated: 0,
		});
	}, [mockFeedPhotos]);

	// Simulate real-time updates
	useEffect(() => {
		if (isPaused) return;

		const interval = setInterval(() => {
			setLastUpdated((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isPaused]);

	const handlePause = () => {
		setIsPaused(!isPaused);
	};

	const handleRefresh = () => {
		setLastUpdated(0);
		// In a real app, this would fetch new photos from the server
		console.log("Refreshing feed...");
	};

	const handleLike = (photoId: string) => {
		setFeedPhotos((prev) =>
			prev.map((photo) =>
				photo.id === photoId ? { ...photo, likes: photo.likes + 1 } : photo,
			),
		);
	};

	const handleComment = (photoId: string) => {
		setFeedPhotos((prev) =>
			prev.map((photo) =>
				photo.id === photoId
					? { ...photo, comments: photo.comments + 1 }
					: photo,
			),
		);
	};

	const handleShare = async (photoId: string) => {
		const photo = feedPhotos.find((p) => p.id === photoId);
		if (photo) {
			if (navigator.share) {
				try {
					await navigator.share({
						title: "Live Feed Photo",
						text: `Check out this photo from ${photo.uploadedBy.name}`,
						url: photo.url,
					});
				} catch (err) {
					// User cancelled or share failed - silently handle
					if ((err as Error).name !== "AbortError") {
						console.error("Share failed:", err);
					}
				}
			} else {
				try {
					await navigator.clipboard.writeText(photo.url);
					toast.success("Photo URL copied to clipboard");
				} catch (err) {
					console.error("Failed to copy to clipboard:", err);
					toast.error("Unable to copy to clipboard. Please copy manually.");
				}
			}
		}
	};

	const formatTimeAgo = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffInMinutes = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60),
		);

		if (diffInMinutes < 1) return "Just now";
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) return `${diffInHours}h ago`;
		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays}d ago`;
	};

	const getCategoryColor = (category: string) => {
		const colors: Record<string, string> = {
			Reception: "bg-pink-100 text-pink-800 border-pink-200",
			Activities: "bg-blue-100 text-blue-800 border-blue-200",
			Venue: "bg-green-100 text-green-800 border-green-200",
			Ceremony: "bg-purple-100 text-purple-800 border-purple-200",
			Party: "bg-orange-100 text-orange-800 border-orange-200",
		};
		return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
				<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
				<CardContent className="p-6 relative z-10">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<CardTitle className="mb-2 text-xl text-gray-900 dark:text-slate-200">
								Live Photo Feed
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-slate-400">
								Real-time photos from your event • Last updated: {lastUpdated}s
								ago
							</CardDescription>
							<div className="text-gray-600 dark:text-slate-400 mt-2 flex items-center gap-4 text-sm">
								<span>
									• {feedStats.newPhotos} new photos {feedStats.totalPhotos}{" "}
									total photos in feed
								</span>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								size="sm"
								onClick={handlePause}
								className={
									isPaused
										? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
										: "border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								}
							>
								<Pause className="h-4 w-4 mr-2" />
								<span className="font-semibold">
									{isPaused ? "Resume" : "Pause"}
								</span>
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={handleRefresh}
								className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<RotateCcw className="h-4 w-4 mr-2" />
								<span className="font-semibold">Refresh</span>
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Feed Photos */}
			<div className="space-y-4">
				{feedPhotos.map((photo) => (
					<Card
						key={photo.id}
						className={`group transition-all duration-200 hover:shadow-md from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] ${
							photo.isNew ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""
						}`}
					>
						<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
						<CardContent className="p-6 relative z-10">
							<div className="flex items-start gap-4">
								{/* Photo Thumbnail */}
								<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
									<Image
										src={photo.thumbnailUrl}
										alt="Feed photo"
										fill
										className="object-cover"
										sizes="80px"
									/>
									{photo.isNew && (
										<div className="absolute -top-1 -right-1">
											<Badge className="bg-blue-500 dark:bg-blue-600 px-2 py-1 text-xs text-white">
												New!
											</Badge>
										</div>
									)}
								</div>

								{/* Photo Info */}
								<div className="min-w-0 flex-1">
									<div className="mb-2 flex items-center gap-2">
										<h3 className="text-lg font-medium text-gray-900 dark:text-slate-200">
											{photo.uploadedBy.name}
										</h3>
										<span className="text-gray-600 dark:text-slate-400 text-sm">
											{formatTimeAgo(photo.uploadedAt)}
										</span>
									</div>

									<div className="mb-3 flex items-center gap-2">
										<Badge
											variant="outline"
											className={`text-xs !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)] ${getCategoryColor(photo.category)}`}
										>
											{photo.category}
										</Badge>
									</div>

									{/* Engagement Stats */}
									<div className="text-gray-600 dark:text-slate-400 flex items-center gap-4 text-sm">
										<div className="flex items-center gap-1">
											<Heart className="h-4 w-4" />
											<span>{photo.likes}</span>
										</div>
										<div className="flex items-center gap-1">
											<MessageCircle className="h-4 w-4" />
											<span>{photo.comments}</span>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleShare(photo.id)}
											className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 h-auto p-0"
										>
											<Share2 className="h-4 w-4" />
										</Button>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleLike(photo.id)}
										className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									>
										<Heart className="h-3 w-3 mr-1" />
										<span className="font-semibold">{photo.likes}</span>
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleComment(photo.id)}
										className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									>
										<MessageCircle className="h-3 w-3 mr-1" />
										<span className="font-semibold">{photo.comments}</span>
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleShare(photo.id)}
										className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									>
										<Share2 className="h-3 w-3 mr-1" />
										<span className="font-semibold">Share</span>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Feed Activity Section */}
			<Card className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
				<CardContent className="p-6">
					<CardTitle className="mb-4 text-lg text-gray-900 dark:text-slate-200">
						Feed Activity
					</CardTitle>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div className="flex items-center gap-3 rounded-lg !bg-white dark:!bg-slate-700/50 p-3 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
								<Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<p className="font-medium text-gray-900 dark:text-slate-200">
									Photos Uploaded
								</p>
								<p className="text-gray-600 dark:text-slate-400 text-sm">
									{feedStats.totalPhotos} today
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3 rounded-lg !bg-white dark:!bg-slate-700/50 p-3 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
								<Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
							</div>
							<div>
								<p className="font-medium text-gray-900 dark:text-slate-200">
									Total Likes
								</p>
								<p className="text-gray-600 dark:text-slate-400 text-sm">
									{feedPhotos.reduce((sum, photo) => sum + photo.likes, 0)}{" "}
									across all photos
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3 rounded-lg !bg-white dark:!bg-slate-700/50 p-3 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
								<Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
							</div>
							<div>
								<p className="font-medium text-gray-900 dark:text-slate-200">
									Active Contributors
								</p>
								<p className="text-gray-600 dark:text-slate-400 text-sm">
									{new Set(feedPhotos.map((photo) => photo.uploadedBy.id)).size}{" "}
									people
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
