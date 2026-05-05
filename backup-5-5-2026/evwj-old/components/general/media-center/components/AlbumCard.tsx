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
	Folder,
	FolderOpen,
	Eye,
	Edit,
	Trash2,
	Camera,
	Video,
} from "lucide-react";
import Image from "next/image";
import { AlbumCardProps } from "../shared";

export default function AlbumCard({
	album,
	onEdit,
	onDelete,
	onView,
}: AlbumCardProps) {
	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		onEdit(album.id);
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete(album.id);
	};

	const handleView = (e: React.MouseEvent) => {
		e.stopPropagation();
		onView(album.id);
	};

	return (
		<Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)]">
			<CardContent className="p-0">
				{/* Album Cover */}
				<div
					className="relative aspect-square overflow-hidden rounded-t-lg"
					onClick={handleView}
				>
					{album.coverPhotoUrl ? (
						<Image
							src={album.coverPhotoUrl}
							alt={album.name}
							fill
							className="object-cover transition-transform duration-200 group-hover:scale-105"
							sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						/>
					) : (
						<div className="w-full h-full bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center">
							<Folder className="h-16 w-16 text-blue-400" />
						</div>
					)}

					{/* Overlay with actions */}
					<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200">
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
								<Button variant="secondary" size="sm" onClick={handleView}>
									<Eye className="h-4 w-4" />
									View
								</Button>
								<Button variant="secondary" size="sm" onClick={handleEdit}>
									<Edit className="h-4 w-4" />
								</Button>
								<Button variant="secondary" size="sm" onClick={handleDelete}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>

					{/* Status Badge */}
					<div className="absolute top-2 right-2">
						<Badge
							variant={album.isActive ? "default" : "secondary"}
							className={`text-xs ${
								album.isActive
									? "bg-green-100 text-green-800 border-green-200"
									: "bg-gray-100 text-gray-600 border-gray-200"
							}`}
						>
							{album.isActive ? "Active" : "Inactive"}
						</Badge>
					</div>

					{/* Sub-album indicator */}
					{album.parentAlbumId && (
						<div className="absolute top-2 left-2">
							<Badge variant="outline" className="text-xs bg-white/80">
								Sub-Album
							</Badge>
						</div>
					)}
				</div>

				{/* Album Info */}
				<div className="p-4">
					<div className="flex items-start justify-between mb-2">
						<div className="flex-1 min-w-0">
							<CardTitle className="text-sm font-medium truncate">
								{album.name}
							</CardTitle>
							<CardDescription className="text-xs mt-1 line-clamp-2">
								{album.description}
							</CardDescription>
						</div>
					</div>

					{/* Stats */}
					<div className="flex items-center gap-4 text-xs text-gray-600 dark:text-slate-400 mb-3">
						<div className="flex items-center gap-1">
							<Camera className="h-3 w-3" />
							<span>{album.photoCount}</span>
						</div>
						<div className="flex items-center gap-1">
							<Video className="h-3 w-3" />
							<span>{album.videoCount}</span>
						</div>
						{album.subAlbumCount > 0 && (
							<div className="flex items-center gap-1">
								<FolderOpen className="h-3 w-3" />
								<span>{album.subAlbumCount}</span>
							</div>
						)}
					</div>

					{/* Settings Info */}
					<div className="space-y-1 text-xs text-gray-600 dark:text-slate-400">
						<div className="flex items-center justify-between">
							<span>Max per guest:</span>
							<span className="font-medium">{album.maxPhotosPerGuest}</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Downloads:</span>
							<span
								className={`font-medium ${album.allowDownloads ? "text-green-600" : "text-red-600"}`}
							>
								{album.allowDownloads ? "Allowed" : "Disabled"}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Approval:</span>
							<span
								className={`font-medium ${album.requireApproval ? "text-orange-600" : "text-green-600"}`}
							>
								{album.requireApproval ? "Required" : "Auto"}
							</span>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleView}
							className="flex-1"
						>
							<Eye className="h-3 w-3 mr-1" />
							View
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleEdit}
							className="flex-1"
						>
							<Edit className="h-3 w-3 mr-1" />
							Edit
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleDelete}
							className="text-red-500 hover:text-red-700"
						>
							<Trash2 className="h-3 w-3" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
