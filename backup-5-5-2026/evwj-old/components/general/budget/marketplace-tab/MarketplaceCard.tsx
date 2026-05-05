"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Eye,
	MapPin,
	Star,
	ChevronLeft,
	ChevronRight,
	Calendar,
	Users,
} from "lucide-react";
import { MarketplaceVendor } from "./MarketplaceListView";
import { cn } from "@/lib/utils";
import ImageViewerModal from "./ImageViewerModal";

interface MarketplaceCardProps {
	vendor: MarketplaceVendor;
	viewMode: "grid" | "list";
	onViewProfile: () => void;
}

export default function MarketplaceCard({
	vendor,
	viewMode,
	onViewProfile,
}: MarketplaceCardProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [viewerImageIndex, setViewerImageIndex] = useState(0);

	const nextImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev + 1) % vendor.images.length);
	};

	const prevImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex(
			(prev) => (prev - 1 + vendor.images.length) % vendor.images.length,
		);
	};

	const openViewer = (index: number) => {
		setViewerImageIndex(index);
		setIsViewerOpen(true);
	};

	const getPricingBadge = () => {
		switch (vendor.pricing) {
			case 1:
				return "$";
			case 2:
				return "$$";
			case 3:
				return "$$$";
			case 4:
				return "$$$$";
			default:
				return "$";
		}
	};

	// Grid view (3 cards per row)
	if (viewMode === "grid") {
		return (
			<>
				<Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
					<CardContent className="p-0">
						{/* Image Carousel */}
						<div className="relative h-48 bg-gray-100 dark:bg-gray-800 group">
							<img
								src={vendor.images[currentImageIndex]}
								alt={vendor.name}
								className="h-full w-full object-cover"
							/>

							{/* Carousel Controls */}
							{vendor.images.length > 1 && (
								<>
									<button
										onClick={prevImage}
										className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
									>
										<ChevronLeft className="h-5 w-5" />
									</button>
									<button
										onClick={nextImage}
										className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
									>
										<ChevronRight className="h-5 w-5" />
									</button>

									{/* Image dots */}
									<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
										{vendor.images.map((_, index) => (
											<div
												key={index}
												className={cn(
													"h-1.5 w-1.5 rounded-full transition-all",
													index === currentImageIndex
														? "bg-white w-4"
														: "bg-white/60",
												)}
											/>
										))}
									</div>
								</>
							)}

							{/* Eye icon viewer */}
							<button
								onClick={() => openViewer(currentImageIndex)}
								className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
							>
								<Eye className="h-4 w-4" />
							</button>

							{/* Badges */}
							<div className="absolute left-2 top-2 flex flex-col gap-1">
								{vendor.badges.verified && (
									<Badge className="bg-green-600 hover:bg-green-600">
										Verified
									</Badge>
								)}
								{vendor.badges.topRated && (
									<Badge className="bg-blue-600 hover:bg-blue-600">
										Top Rated
									</Badge>
								)}
								{vendor.badges.hostsFavorite && (
									<Badge className="bg-purple-600 hover:bg-purple-600">
										Host&apos;s Favorite
									</Badge>
								)}
								{vendor.badges.risingStar && (
									<Badge className="bg-yellow-600 hover:bg-yellow-600">
										Rising Star
									</Badge>
								)}
							</div>
						</div>

						{/* Content */}
						<div className="p-4 space-y-3">
							{/* Header */}
							<div>
								<div className="flex items-start justify-between gap-2">
									<h3 className="font-semibold text-lg line-clamp-1">
										{vendor.name}
									</h3>
									<span className="font-bold text-green-600 whitespace-nowrap">
										{getPricingBadge()}
									</span>
								</div>
								<div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
									<MapPin className="h-3 w-3" />
									<span className="line-clamp-1">{vendor.location}</span>
								</div>
							</div>

							{/* Description */}
							<p className="text-sm text-muted-foreground line-clamp-2">
								{vendor.description}
							</p>

							{/* Stats */}
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center gap-1">
									<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
									<span className="font-semibold">{vendor.rating}</span>
									<span className="text-muted-foreground">
										({vendor.reviewCount})
									</span>
								</div>
								<div className="flex items-center gap-3 text-muted-foreground">
									<div className="flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										<span>{vendor.eventsCount}</span>
									</div>
									{vendor.estimatedGuests && (
										<div className="flex items-center gap-1">
											<Users className="h-3 w-3" />
											<span>{vendor.estimatedGuests}</span>
										</div>
									)}
								</div>
							</div>

							{/* Categories */}
							<div className="flex flex-wrap gap-1">
								{vendor.categories.slice(0, 3).map((category) => (
									<Badge key={category} variant="outline" className="text-xs">
										{category}
									</Badge>
								))}
								{vendor.categories.length > 3 && (
									<Badge variant="outline" className="text-xs">
										+{vendor.categories.length - 3}
									</Badge>
								)}
							</div>

							{/* Established */}
							<div className="text-xs text-muted-foreground">
								Est. {vendor.established}
							</div>

							{/* Action Buttons */}
							<div className="flex gap-2 pt-2">
								<Button
									variant="outline"
									size="sm"
									className="flex-1"
									onClick={onViewProfile}
								>
									<Eye className="mr-2 h-4 w-4" />
									View Profile
								</Button>
								<Button
									size="sm"
									className="flex-1 bg-blue-600 hover:bg-blue-700"
								>
									Contact
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Image Viewer Modal */}
				<ImageViewerModal
					images={vendor.images}
					title={vendor.name}
					open={isViewerOpen}
					onOpenChange={setIsViewerOpen}
					initialIndex={viewerImageIndex}
				/>
			</>
		);
	}

	// List view (1 card per row)
	return (
		<>
			<Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<CardContent className="p-0">
					<div className="flex flex-col md:flex-row">
						{/* Image Carousel */}
						<div className="relative h-64 md:h-auto md:w-80 bg-gray-100 dark:bg-gray-800 group shrink-0">
							<img
								src={vendor.images[currentImageIndex]}
								alt={vendor.name}
								className="h-full w-full object-cover"
							/>

							{/* Carousel Controls */}
							{vendor.images.length > 1 && (
								<>
									<button
										onClick={prevImage}
										className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
									>
										<ChevronLeft className="h-5 w-5" />
									</button>
									<button
										onClick={nextImage}
										className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
									>
										<ChevronRight className="h-5 w-5" />
									</button>

									{/* Image dots */}
									<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
										{vendor.images.map((_, index) => (
											<div
												key={index}
												className={cn(
													"h-1.5 w-1.5 rounded-full transition-all",
													index === currentImageIndex
														? "bg-white w-4"
														: "bg-white/60",
												)}
											/>
										))}
									</div>
								</>
							)}

							{/* Eye icon viewer */}
							<button
								onClick={() => openViewer(currentImageIndex)}
								className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
							>
								<Eye className="h-4 w-4" />
							</button>

							{/* Badges */}
							<div className="absolute left-2 top-2 flex flex-col gap-1">
								{vendor.badges.verified && (
									<Badge className="bg-green-600 hover:bg-green-600">
										Verified
									</Badge>
								)}
								{vendor.badges.topRated && (
									<Badge className="bg-blue-600 hover:bg-blue-600">
										Top Rated
									</Badge>
								)}
								{vendor.badges.hostsFavorite && (
									<Badge className="bg-purple-600 hover:bg-purple-600">
										Host&apos;s Favorite
									</Badge>
								)}
								{vendor.badges.risingStar && (
									<Badge className="bg-yellow-600 hover:bg-yellow-600">
										Rising Star
									</Badge>
								)}
							</div>
						</div>

						{/* Content */}
						<div className="flex-1 p-6">
							<div className="flex flex-col h-full">
								{/* Header */}
								<div className="flex items-start justify-between gap-4 mb-3">
									<div className="flex-1">
										<h3 className="font-semibold text-xl mb-1">
											{vendor.name}
										</h3>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<MapPin className="h-4 w-4" />
											<span>{vendor.location}</span>
										</div>
									</div>
									<div className="text-right">
										<span className="font-bold text-2xl text-green-600">
											{getPricingBadge()}
										</span>
										<div className="text-xs text-muted-foreground mt-1">
											Est. {vendor.established}
										</div>
									</div>
								</div>

								{/* Description */}
								<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
									{vendor.description}
								</p>

								{/* Stats */}
								<div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
									<div className="flex items-center gap-1">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span className="font-semibold">{vendor.rating}</span>
										<span className="text-muted-foreground">
											({vendor.reviewCount} reviews)
										</span>
									</div>
									<div className="flex items-center gap-1 text-muted-foreground">
										<Calendar className="h-4 w-4" />
										<span>{vendor.eventsCount} events</span>
									</div>
									{vendor.estimatedGuests && (
										<div className="flex items-center gap-1 text-muted-foreground">
											<Users className="h-4 w-4" />
											<span>{vendor.estimatedGuests} guests</span>
										</div>
									)}
								</div>

								{/* Categories */}
								<div className="flex flex-wrap gap-2 mb-4">
									{vendor.categories.map((category) => (
										<Badge key={category} variant="outline">
											{category}
										</Badge>
									))}
								</div>

								{/* Action Buttons */}
								<div className="flex gap-2 mt-auto">
									<Button variant="outline" size="sm" onClick={onViewProfile}>
										<Eye className="mr-2 h-4 w-4" />
										View Profile
									</Button>
									<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
										Contact
									</Button>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Image Viewer Modal */}
			<ImageViewerModal
				images={vendor.images}
				title={vendor.name}
				open={isViewerOpen}
				onOpenChange={setIsViewerOpen}
				initialIndex={viewerImageIndex}
			/>
		</>
	);
}
