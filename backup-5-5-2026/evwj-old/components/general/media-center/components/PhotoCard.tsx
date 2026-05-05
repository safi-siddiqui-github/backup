"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Download, Trash2, Eye, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { PhotoCardProps } from "../shared";

interface ExtendedPhotoCardProps extends PhotoCardProps {
	isSelected?: boolean;
	onSelect?: () => void;
	onView?: () => void;
	viewMode?: "grid" | "list";
	showSelection?: boolean;
}

export default function PhotoCard({
	photo,
	onLike,
	onDownload,
	onDelete,
	isSelected = false,
	onSelect,
	onView,
	viewMode = "grid",
	showSelection = false,
}: ExtendedPhotoCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	const handleLike = () => {
		setIsLiked(!isLiked);
		onLike(photo.id);
	};

	const handleDownload = () => {
		onDownload(photo.id);
	};

	const handleDelete = () => {
		onDelete(photo.id);
	};

	const handleView = () => {
		onView?.();
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffInHours = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60 * 60),
		);

		if (diffInHours < 1) return "Just now";
		if (diffInHours < 24) return `${diffInHours}h ago`;
		if (diffInHours < 48) return "Yesterday";
		return date.toLocaleDateString();
	};

	if (viewMode === "list") {
		return (
			<Card
				className={`group hover:shadow-md transition-shadow from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] ${
					isSelected
						? "ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-lg"
						: ""
				}`}
			>
				<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
				<CardContent className="p-4 relative z-10">
					<div className="flex items-center gap-4">
						{/* Thumbnail */}
						<div
							className={`relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer shrink-0 ${
								isSelected
									? "ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-lg"
									: ""
							}`}
							onClick={showSelection ? onSelect : handleView}
						>
							<Image
								src={photo.thumbnailUrl || photo.url}
								alt={photo.title || "Photo"}
								fill
								className="object-cover"
								sizes="64px"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src =
										"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
								}}
							/>
							<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
								<Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</div>

						{/* Photo Info */}
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<h3 className="font-medium truncate">
									{photo.title || "Untitled"}
								</h3>
								{!photo.isApproved && (
									<Badge variant="secondary" className="text-xs">
										Pending
									</Badge>
								)}
							</div>
							<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
								<span>{formatFileSize(photo.fileSize)}</span>
								<span>•</span>
								<span>
									{photo.width} × {photo.height}
								</span>
								<span>•</span>
								<span>{formatDate(photo.uploadedAt)}</span>
							</div>
						</div>

						{/* Stats */}
						<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400 shrink-0">
							<div className="flex items-center gap-1">
								<Heart className="h-4 w-4" />
								<span>{photo.likes}</span>
							</div>
							<div className="flex items-center gap-1">
								<Download className="h-4 w-4" />
								<span>{photo.downloads}</span>
							</div>
						</div>

						{/* Actions */}
						<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
							<Button variant="ghost" size="sm" onClick={handleLike}>
								<Heart
									className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
								/>
							</Button>
							<Button variant="ghost" size="sm" onClick={handleDownload}>
								<Download className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="sm" onClick={handleDelete}>
								<Trash2 className="h-4 w-4 text-red-500" />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			className={`group hover:shadow-md transition-all duration-200 hover:scale-[1.02] from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] ${
				isSelected
					? "ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-lg"
					: ""
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
			<CardContent className="p-0 relative z-10">
				{/* Photo Thumbnail */}
				<div
					className={`relative aspect-square overflow-hidden cursor-pointer ${
						isSelected
							? "ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-lg"
							: ""
					}`}
					onClick={showSelection ? onSelect : handleView}
				>
					<Image
						src={photo.thumbnailUrl || photo.url}
						alt={photo.title || "Photo"}
						fill
						className="object-cover transition-transform duration-200 group-hover:scale-105"
						sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.src =
								"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
						}}
					/>

					{/* Overlay with actions */}
					{!showSelection && (
						<div
							className={`absolute inset-0 bg-black transition-opacity duration-200 ${
								isHovered ? "bg-opacity-40" : "bg-opacity-0"
							}`}
						>
							<div className="absolute inset-0 flex items-center justify-center">
								<div
									className={`flex items-center gap-2 transition-opacity duration-200 ${
										isHovered ? "opacity-100" : "opacity-0"
									}`}
								>
									<Button
										variant="secondary"
										size="sm"
										onClick={handleLike}
										className="relative overflow-hidden bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
									>
										<div className="relative z-10 flex items-center gap-1">
											<Heart
												className={`h-4 w-4 transition-all duration-300 ${
													isLiked
														? "fill-red-500 text-red-500"
														: "text-gray-600 group-hover:text-pink-500"
												}`}
											/>
											<span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
												{photo.likes}
											</span>
										</div>
									</Button>
									<Button
										variant="secondary"
										size="sm"
										onClick={handleDownload}
										className="relative overflow-hidden bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
									>
										<div className="relative z-10">
											<Download className="h-4 w-4 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
										</div>
									</Button>
									<Button
										variant="secondary"
										size="sm"
										onClick={handleDelete}
										className="relative overflow-hidden bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
									>
										<div className="relative z-10">
											<Trash2 className="h-4 w-4 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
										</div>
									</Button>
								</div>
							</div>
						</div>
					)}

					{/* Approval Status Badge */}
					{!photo.isApproved && (
						<div className="absolute top-2 right-2">
							<Badge
								variant="secondary"
								className="text-xs bg-yellow-100 text-yellow-800"
							>
								Pending
							</Badge>
						</div>
					)}
				</div>

				{/* Photo Info */}
				<div className="p-4 !bg-white dark:!bg-slate-800/95 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
					<div className="mb-2">
						<h3 className="font-semibold text-lg text-gray-900 dark:text-slate-200">
							{photo.title || "Welcome Reception"}
						</h3>
						<p className="text-sm text-gray-600 dark:text-slate-400">
							by {photo.uploadedBy.name}
						</p>
					</div>

					{/* Tags */}
					{photo.tags.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-3">
							{photo.tags.slice(0, 2).map((tag, index) => (
								<Badge
									key={index}
									variant="secondary"
									className="text-xs !bg-white dark:!bg-slate-700/50 text-gray-600 dark:text-slate-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									{tag}
								</Badge>
							))}
						</div>
					)}

					{/* Interaction Icons */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleLike}
								className={`p-2 h-auto rounded-lg transition-all duration-300 hover:scale-110 ${
									isLiked
										? "bg-red-50 hover:bg-red-100"
										: "bg-gray-50 hover:bg-pink-50"
								}`}
							>
								<Heart
									className={`h-4 w-4 transition-all duration-300 ${
										isLiked
											? "fill-red-500 text-red-500"
											: "text-gray-400 hover:text-pink-500"
									}`}
								/>
							</Button>

							{/* Contributors with avatars */}
							<div className="flex items-center gap-1">
								<div className="flex items-center -space-x-1">
									<Avatar className="h-6 w-6 border border-white">
										<AvatarFallback className="text-xs bg-blue-100 text-blue-800">
											ER
										</AvatarFallback>
									</Avatar>
									<Avatar className="h-6 w-6 border border-white">
										<AvatarFallback className="text-xs bg-green-100 text-green-800">
											SM
										</AvatarFallback>
									</Avatar>
									<Avatar className="h-6 w-6 border border-white">
										<AvatarFallback className="text-xs bg-purple-100 text-purple-800">
											BA
										</AvatarFallback>
									</Avatar>
								</div>
								<span className="text-xs text-gray-500 dark:text-slate-400">
									+11
								</span>
								<ChevronDown className="h-3 w-3 text-gray-400 dark:text-slate-500" />
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleDownload}
								className="p-2 h-auto rounded-lg !bg-white dark:!bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<Download className="h-4 w-4 text-gray-400 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="p-2 h-auto rounded-lg !bg-white dark:!bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 hover:scale-110 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<svg
									className="h-4 w-4 text-gray-400 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-300"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
								</svg>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
