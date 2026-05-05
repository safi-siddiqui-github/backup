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
	Star,
	Smile,
	Heart,
	Sparkles,
	Crown,
	X,
	Download,
	Share2,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { CameraReviewModal } from "../modals";

interface PhotoBoothPhoto {
	id: string;
	url: string;
	filter: string;
	frame: string;
	timestamp: string;
}

interface Filter {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	active: boolean;
}

interface Frame {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	active: boolean;
}

export default function MediaCenterPhotoBoothTab() {
	const [showCameraReview, setShowCameraReview] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState("normal");
	const [selectedFrame, setSelectedFrame] = useState("none");
	const [recentPhotos, setRecentPhotos] = useState<PhotoBoothPhoto[]>([]);
	const [photosTaken, setPhotosTaken] = useState(0);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const filters: Filter[] = [
		{
			id: "normal",
			name: "Normal",
			icon: Camera,
			active: selectedFilter === "normal",
		},
		{
			id: "vintage",
			name: "Vintage",
			icon: Star,
			active: selectedFilter === "vintage",
		},
		{ id: "bw", name: "B&W", icon: Smile, active: selectedFilter === "bw" },
		{
			id: "warm",
			name: "Warm",
			icon: Heart,
			active: selectedFilter === "warm",
		},
		{
			id: "cool",
			name: "Cool",
			icon: Sparkles,
			active: selectedFilter === "cool",
		},
		{
			id: "glamour",
			name: "Glamour",
			icon: Crown,
			active: selectedFilter === "glamour",
		},
	];

	const frames: Frame[] = [
		{ id: "none", name: "No Frame", icon: X, active: selectedFrame === "none" },
		{
			id: "classic",
			name: "Classic",
			icon: Camera,
			active: selectedFrame === "classic",
		},
		{
			id: "elegant",
			name: "Elegant",
			icon: Star,
			active: selectedFrame === "elegant",
		},
		{ id: "fun", name: "Fun", icon: Smile, active: selectedFrame === "fun" },
	];

	const handleStartCamera = () => {
		setShowCameraReview(true);
	};

	const handlePhotoTaken = (photoData: string) => {
		// Apply filters and frames to the captured photo
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const img = new window.Image();

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			if (ctx) {
				// Draw the image
				ctx.drawImage(img, 0, 0);

				// Apply filter effects
				applyFilterToCanvas(ctx, canvas.width, canvas.height);

				// Convert to blob and create photo object
				canvas.toBlob(
					(blob) => {
						if (blob) {
							const photoUrl = URL.createObjectURL(blob);
							const newPhoto: PhotoBoothPhoto = {
								id: Date.now().toString(),
								url: photoUrl,
								filter: selectedFilter,
								frame: selectedFrame,
								timestamp: new Date().toISOString(),
							};

							setRecentPhotos((prev) => [newPhoto, ...prev]);
							setPhotosTaken((prev) => prev + 1);
							toast.success("Photo captured with effects!");
						}
					},
					"image/jpeg",
					0.9,
				);
			}
		};

		img.src = photoData;
	};

	const handleCameraCancel = () => {
		setShowCameraReview(false);
	};

	const applyFilterToCanvas = (
		context: CanvasRenderingContext2D,
		width: number,
		height: number,
	) => {
		const imageData = context.getImageData(0, 0, width, height);
		const data = imageData.data;

		switch (selectedFilter) {
			case "vintage":
				// Apply vintage filter (sepia-like effect)
				for (let i = 0; i < data.length; i += 4) {
					const r = data[i];
					const g = data[i + 1];
					const b = data[i + 2];

					data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
					data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
					data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
				}
				break;
			case "bw":
				// Apply black and white filter
				for (let i = 0; i < data.length; i += 4) {
					const gray =
						data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
					data[i] = gray;
					data[i + 1] = gray;
					data[i + 2] = gray;
				}
				break;
			case "warm":
				// Apply warm filter (increase red and yellow)
				for (let i = 0; i < data.length; i += 4) {
					data[i] = Math.min(255, data[i] * 1.2);
					data[i + 1] = Math.min(255, data[i + 1] * 1.1);
				}
				break;
			case "cool":
				// Apply cool filter (increase blue)
				for (let i = 0; i < data.length; i += 4) {
					data[i + 2] = Math.min(255, data[i + 2] * 1.2);
				}
				break;
			case "glamour":
				// Apply glamour filter (slight blur and brightness)
				for (let i = 0; i < data.length; i += 4) {
					data[i] = Math.min(255, data[i] * 1.1);
					data[i + 1] = Math.min(255, data[i + 1] * 1.1);
					data[i + 2] = Math.min(255, data[i + 2] * 1.1);
				}
				break;
		}

		context.putImageData(imageData, 0, 0);
	};

	const downloadPhoto = (photo: PhotoBoothPhoto) => {
		const link = document.createElement("a");
		link.href = photo.url;
		link.download = `photo-booth-${photo.id}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Photo downloaded!");
	};

	const sharePhoto = async (photo: PhotoBoothPhoto) => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Photo Booth Photo",
					text: "Check out this photo from the photo booth!",
					url: photo.url,
				});
			} catch (err) {
				// User cancelled or share failed - silently handle
				if ((err as Error).name !== "AbortError") {
					console.error("Share failed:", err);
				}
			}
		} else {
			// Fallback: copy to clipboard
			try {
				await navigator.clipboard.writeText(photo.url);
				toast.success("Photo URL copied to clipboard!");
			} catch (err) {
				console.error("Failed to copy to clipboard:", err);
				toast.error("Unable to copy to clipboard. Please copy manually.");
			}
		}
	};

	const deletePhoto = (photoId: string) => {
		setRecentPhotos((prev) => {
			const updated = prev.filter((photo) => photo.id !== photoId);
			return updated;
		});
		toast.success("Photo deleted!");
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
				<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
				<CardContent className="p-6 relative z-10">
					<div className="flex items-center gap-3 mb-2">
						<Camera className="h-6 w-6 text-blue-600 dark:text-blue-400" />
						<CardTitle className="text-xl text-gray-900 dark:text-slate-200">
							Digital Photo Booth
						</CardTitle>
					</div>
					<CardDescription className="text-gray-600 dark:text-slate-400">
						Take fun photos with filters and frames. • {photosTaken} photos
						taken
					</CardDescription>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Camera Area */}
				<div className="lg:col-span-2">
					<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
						<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
						<CardContent className="p-6 relative z-10">
							<div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
								<div className="w-full h-full flex flex-col items-center justify-center text-white">
									<Camera className="h-16 w-16 mb-4 opacity-50" />
									<p className="text-lg mb-4">Ready to take photos?</p>
									<Button
										onClick={handleStartCamera}
										size="lg"
										className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
									>
										<Camera className="h-5 w-5 mr-2" />
										<span className="font-semibold">Start Camera</span>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Filters */}
					<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
						<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
						<CardContent className="p-4 relative z-10">
							<CardTitle className="text-lg mb-4 text-gray-900 dark:text-slate-200">
								Filters
							</CardTitle>
							<div className="grid grid-cols-2 gap-2">
								{filters.map((filter) => (
									<Button
										key={filter.id}
										variant={filter.active ? "default" : "outline"}
										size="sm"
										onClick={() => setSelectedFilter(filter.id)}
										className={`flex flex-col items-center gap-1 h-auto py-3 transition-all ${
											filter.active
												? "bg-indigo-600 text-white"
												: "border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
										}`}
									>
										<filter.icon className="h-4 w-4" />
										<span className="text-xs font-semibold">{filter.name}</span>
									</Button>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Frames */}
					<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
						<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
						<CardContent className="p-4 relative z-10">
							<CardTitle className="text-lg mb-4 text-gray-900 dark:text-slate-200">
								Frames
							</CardTitle>
							<div className="grid grid-cols-2 gap-2">
								{frames.map((frame) => (
									<Button
										key={frame.id}
										variant={frame.active ? "default" : "outline"}
										size="sm"
										onClick={() => setSelectedFrame(frame.id)}
										className={`flex flex-col items-center gap-1 h-auto py-3 transition-all ${
											frame.active
												? "bg-indigo-600 text-white"
												: "border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
										}`}
									>
										<frame.icon className="h-4 w-4" />
										<span className="text-xs font-semibold">{frame.name}</span>
									</Button>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Recent Photos */}
					<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
						<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
						<CardContent className="p-4 relative z-10">
							<CardTitle className="text-lg mb-4 text-gray-900 dark:text-slate-200">
								Recent Photos ({recentPhotos.length})
							</CardTitle>
							{recentPhotos.length === 0 ? (
								<p className="text-sm text-gray-600 dark:text-slate-400 text-center py-8">
									No photos taken yet
								</p>
							) : (
								<div className="space-y-3">
									{recentPhotos.slice(0, 4).map((photo) => (
										<div
											key={photo.id}
											className="flex items-center gap-3 p-2 border border-gray-200 dark:border-slate-600 rounded-lg !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
										>
											<div className="relative w-12 h-12 rounded overflow-hidden">
												<Image
													src={photo.url}
													alt="Recent photo"
													fill
													className="object-cover"
													sizes="48px"
												/>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-xs text-gray-600 dark:text-slate-400">
													{new Date(photo.timestamp).toLocaleTimeString()}
												</p>
												<div className="flex gap-1 mt-1">
													<Badge
														variant="secondary"
														className="text-xs !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
													>
														{photo.filter}
													</Badge>
													{photo.frame !== "none" && (
														<Badge
															variant="secondary"
															className="text-xs !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
														>
															{photo.frame}
														</Badge>
													)}
												</div>
											</div>
											<div className="flex gap-1">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => downloadPhoto(photo)}
													className="text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
												>
													<Download className="h-3 w-3" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => sharePhoto(photo)}
													className="text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
												>
													<Share2 className="h-3 w-3" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => deletePhoto(photo.id)}
													className="text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
												>
													<X className="h-3 w-3" />
												</Button>
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Hidden canvas for photo processing */}
			<canvas ref={canvasRef} className="hidden" />

			{/* Camera Review Modal */}
			<CameraReviewModal
				open={showCameraReview}
				onOpenChange={setShowCameraReview}
				onPhotoTaken={handlePhotoTaken}
				onCancel={handleCameraCancel}
				title="Photo Booth Camera"
			/>
		</div>
	);
}
