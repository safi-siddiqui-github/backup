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
	Settings,
	QrCode,
	Plus,
	Edit,
	Trash2,
	Eye,
	Camera,
	Video,
	Users,
} from "lucide-react";
import { useState } from "react";
import { MOCK_ALBUMS, MOCK_CONTRIBUTORS } from "../shared";
import { CreateAlbumModal, AlbumSettingsModal, QRCodeModal } from "../modals";
import { ContributorsDropdown } from "../components";
import { MediaCenterAlbum } from "../shared";

export default function MediaCenterAlbumsTab() {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [settingsModalOpen, setSettingsModalOpen] = useState(false);
	const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);
	const [selectedAlbum, setSelectedAlbum] = useState<MediaCenterAlbum | null>(
		null,
	);

	const mainAlbum = MOCK_ALBUMS.find((album) => !album.parentAlbumId);
	const subAlbums = MOCK_ALBUMS.filter((album) => album.parentAlbumId);

	const handleCreateAlbum = (data: Partial<MediaCenterAlbum>) => {
		console.log("Creating album:", data);
		setCreateModalOpen(false);
	};

	const handleEditAlbum = (id: string) => {
		console.log("Editing album:", id);
		setEditModalOpen(true);
	};

	const handleDeleteAlbum = (id: string) => {
		console.log("Deleting album:", id);
	};

	const handleViewAlbum = (id: string) => {
		console.log("Viewing album:", id);
	};

	const handleSettingsClick = (album: MediaCenterAlbum) => {
		setSelectedAlbum(album);
		setSettingsModalOpen(true);
	};

	const handleQRCodeClick = (album: MediaCenterAlbum) => {
		setSelectedAlbum(album);
		setQrCodeModalOpen(true);
	};

	const handleSaveSettings = (settings: {
		maxPhotosPerGuest: number;
		allowDownloads: boolean;
		requireApproval: boolean;
	}) => {
		console.log("Saving settings for album:", selectedAlbum?.name, settings);
		// In a real implementation, this would update the album settings
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Main Album with Nested Sub-Albums */}
			{mainAlbum && (
				<Card className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">
					<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
					<CardContent className="p-6 relative z-10">
						{/* Main Album Header */}
						<div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
							<div className="flex items-start gap-4 flex-1">
								<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
									<Folder className="h-8 w-8 text-white" />
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<CardTitle className="text-2xl text-gray-900 dark:text-slate-200">
											{mainAlbum.name}
										</CardTitle>
										<Badge className="bg-indigo-600 dark:bg-indigo-500 text-white text-xs">
											Album
										</Badge>
									</div>
									{mainAlbum.description && (
										<CardDescription className="text-sm text-gray-600 dark:text-slate-400 mb-4">
											{mainAlbum.description}
										</CardDescription>
									)}
									
									{/* Stats Row */}
									<div className="flex items-center gap-6">
										<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
											<Camera className="h-4 w-4 text-blue-600 dark:text-blue-400" />
											<span className="font-semibold text-gray-900 dark:text-slate-200">
												{mainAlbum.photoCount}
											</span>
											<span>Photos</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
											<Video className="h-4 w-4 text-green-600 dark:text-green-400" />
											<span className="font-semibold text-gray-900 dark:text-slate-200">
												{mainAlbum.videoCount}
											</span>
											<span>Videos</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
											<FolderOpen className="h-4 w-4 text-orange-600 dark:text-orange-400" />
											<span className="font-semibold text-gray-900 dark:text-slate-200">
												{mainAlbum.subAlbumCount}
											</span>
											<span>Sub-Albums</span>
										</div>
									</div>
								</div>
							</div>
							
							{/* Action Buttons */}
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-2 mr-2">
									<span className="text-xs font-medium text-gray-600 dark:text-slate-400">
										Contributors
									</span>
									<ContributorsDropdown
										contributors={MOCK_CONTRIBUTORS}
										totalCount={45}
									/>
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleSettingsClick(mainAlbum)}
									className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<Settings className="h-4 w-4 mr-2" />
									Settings
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleQRCodeClick(mainAlbum)}
									className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<QrCode className="h-4 w-4 mr-2" />
									QR Code
								</Button>
							</div>
						</div>

						{/* Sub-Albums Section - Nested within Main Album */}
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="h-px w-8 bg-gray-300 dark:bg-slate-600"></div>
									<CardTitle className="text-lg text-gray-700 dark:text-slate-300">
										Sub-Albums
									</CardTitle>
									<Badge variant="secondary" className="text-xs">
										{subAlbums.length}
									</Badge>
								</div>
								<Button
									onClick={() => setCreateModalOpen(true)}
									size="sm"
									className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
								>
									<Plus className="h-4 w-4 mr-2" />
									Add Sub-Album
								</Button>
							</div>

							{subAlbums.length > 0 ? (
								<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 ml-8">
									{subAlbums.map((album) => (
										<Card
											key={album.id}
											className="group hover:shadow-lg transition-all border-l-4 border-l-orange-500 from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]"
										>
											<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50"></div>
											<CardContent className="p-4 relative z-10">
												<div className="flex items-start justify-between mb-3">
													<div className="flex items-center gap-2 flex-1 min-w-0">
														<Folder className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
														<div className="min-w-0 flex-1">
															<CardTitle className="text-sm font-semibold text-gray-900 dark:text-slate-200 truncate">
																{album.name}
															</CardTitle>
															<div className="flex items-center gap-2 mt-1">
																<CardDescription className="text-xs text-gray-600 dark:text-slate-400">
																	{album.photoCount} photos
																</CardDescription>
																{album.videoCount > 0 && (
																	<>
																		<span className="text-gray-400">•</span>
																		<CardDescription className="text-xs text-gray-600 dark:text-slate-400">
																			{album.videoCount} videos
																		</CardDescription>
																	</>
																)}
															</div>
														</div>
													</div>
													<Badge
														variant={album.isActive ? "default" : "secondary"}
														className={`text-xs flex-shrink-0 ${album.isActive ? "bg-indigo-600 dark:bg-indigo-500" : ""}`}
													>
														{album.isActive ? "Active" : "Inactive"}
													</Badge>
												</div>

												<div className="flex items-center justify-between text-xs text-gray-600 dark:text-slate-400 mb-3 pt-2 border-t border-gray-100 dark:border-slate-700">
													<span>Max: {album.maxPhotosPerGuest} photos/guest</span>
													<div className="flex items-center gap-1">
														<Users className="h-3 w-3" />
														<span>{album.photoCount}</span>
													</div>
												</div>

												<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleViewAlbum(album.id)}
														className="h-7 px-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
													>
														<Eye className="h-3 w-3" />
													</Button>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleEditAlbum(album.id)}
														className="h-7 px-2 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
													>
														<Edit className="h-3 w-3" />
													</Button>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleDeleteAlbum(album.id)}
														className="h-7 px-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
													>
														<Trash2 className="h-3 w-3" />
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							) : (
								<div className="ml-8 p-8 text-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg">
									<FolderOpen className="h-12 w-12 text-gray-400 dark:text-slate-600 mx-auto mb-3" />
									<p className="text-sm text-gray-600 dark:text-slate-400 mb-2">
										No sub-albums yet
									</p>
									<Button
										onClick={() => setCreateModalOpen(true)}
										size="sm"
										variant="outline"
										className="mt-2"
									>
										<Plus className="h-4 w-4 mr-2" />
										Create your first sub-album
									</Button>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Create Album Modal */}
			<CreateAlbumModal
				open={createModalOpen}
				onOpenChange={setCreateModalOpen}
				onSubmit={handleCreateAlbum}
				isSubAlbum={true}
				parentAlbumName={mainAlbum?.name}
				parentAlbumSettings={
					mainAlbum
						? {
								maxPhotosPerGuest: mainAlbum.maxPhotosPerGuest,
								allowDownloads: mainAlbum.allowDownloads,
								requireApproval: mainAlbum.requireApproval,
							}
						: null
				}
			/>

			{/* Edit Album Modal */}
			<CreateAlbumModal
				open={editModalOpen}
				onOpenChange={setEditModalOpen}
				onSubmit={handleCreateAlbum}
				isSubAlbum={true}
				parentAlbumName={mainAlbum?.name}
				parentAlbumSettings={
					mainAlbum
						? {
								maxPhotosPerGuest: mainAlbum.maxPhotosPerGuest,
								allowDownloads: mainAlbum.allowDownloads,
								requireApproval: mainAlbum.requireApproval,
							}
						: null
				}
			/>

			{/* Settings Modal */}
			<AlbumSettingsModal
				open={settingsModalOpen}
				onOpenChange={setSettingsModalOpen}
				album={selectedAlbum}
				onSave={handleSaveSettings}
			/>

			{/* QR Code Modal */}
			<QRCodeModal
				open={qrCodeModalOpen}
				onOpenChange={setQrCodeModalOpen}
				album={selectedAlbum}
			/>
		</div>
	);
}
