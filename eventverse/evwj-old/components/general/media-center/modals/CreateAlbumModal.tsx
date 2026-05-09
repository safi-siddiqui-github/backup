"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { CreateAlbumModalProps } from "../shared";

export default function CreateAlbumModal({
	open,
	onOpenChange,
	onSubmit,
	isSubAlbum = false,
	parentAlbumName = null,
	parentAlbumSettings = null,
}: CreateAlbumModalProps) {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		maxPhotosPerGuest: 15,
		allowDownloads: true,
		requireApproval: false,
	});

	// Initialize form data with parent album settings for sub-albums
	useEffect(() => {
		if (isSubAlbum && parentAlbumSettings) {
			setFormData((prev) => ({
				...prev,
				maxPhotosPerGuest: parentAlbumSettings.maxPhotosPerGuest,
				allowDownloads: parentAlbumSettings.allowDownloads,
				requireApproval: parentAlbumSettings.requireApproval,
			}));
		}
	}, [isSubAlbum, parentAlbumSettings]);

	const handleSubmit = () => {
		onSubmit(formData);
		setFormData({
			name: "",
			description: "",
			maxPhotosPerGuest: 15,
			allowDownloads: true,
			requireApproval: false,
		});
	};

	const handleCancel = () => {
		onOpenChange(false);
		setFormData({
			name: "",
			description: "",
			maxPhotosPerGuest: 15,
			allowDownloads: true,
			requireApproval: false,
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<DialogHeader className="pb-4">
					<DialogTitle className="text-2xl font-bold text-gray-900 dark:text-slate-200">
						{isSubAlbum
							? `Create Sub-Album for ${parentAlbumName}`
							: "Create Main Event Album"}
					</DialogTitle>
					<DialogDescription className="text-base text-gray-600 dark:text-slate-400">
						{isSubAlbum
							? "Create a new sub-album to organize photos within your main album."
							: "Set up your main event album where guests can upload and view photos."}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-gray-900 dark:text-slate-200 uppercase tracking-wide">
							Album Information
						</h3>

						<div className="space-y-2">
							<Label
								htmlFor="album-name"
								className="text-gray-700 dark:text-slate-200"
							>
								Album Name
							</Label>
							<Input
								id="album-name"
								placeholder="e.g., Company Retreat 2024"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								className="!bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="album-description"
								className="text-gray-700 dark:text-slate-200"
							>
								Description
							</Label>
							<div className="relative">
								<Textarea
									id="album-description"
									placeholder="Brief description of your event"
									rows={3}
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									className="!bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-4 pt-2 border-t border-gray-200 dark:border-slate-600">
						<h3 className="text-sm font-semibold text-gray-900 dark:text-slate-200 uppercase tracking-wide">
							Initial Settings
						</h3>

						<div className="space-y-2">
							<Label
								htmlFor="max-photos"
								className="text-gray-700 dark:text-slate-200"
							>
								Max photos per guest
							</Label>
							<div className="flex items-center gap-2">
								<Input
									id="max-photos"
									type="number"
									min="1"
									max="100"
									value={formData.maxPhotosPerGuest}
									onChange={(e) =>
										setFormData({
											...formData,
											maxPhotosPerGuest: Number(e.target.value),
										})
									}
									className="w-20 !bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								/>
								<span className="text-sm text-gray-600 dark:text-slate-400">
									Free tier limit
								</span>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<Label
									htmlFor="allow-downloads"
									className="text-gray-700 dark:text-slate-200"
								>
									Allow downloads
								</Label>
								<p className="text-sm text-gray-600 dark:text-slate-400">
									Let guests download photos
								</p>
							</div>
							<Switch
								id="allow-downloads"
								checked={formData.allowDownloads}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, allowDownloads: checked })
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<Label
									htmlFor="require-approval"
									className="text-gray-700 dark:text-slate-200"
								>
									Require approval
								</Label>
								<p className="text-sm text-gray-600 dark:text-slate-400">
									Review photos before publishing
								</p>
							</div>
							<Switch
								id="require-approval"
								checked={formData.requireApproval}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, requireApproval: checked })
								}
							/>
						</div>
					</div>
				</div>

				<DialogFooter className="gap-2">
					<Button
						variant="outline"
						onClick={handleCancel}
						className="border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={!formData.name.trim()}
						className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
					>
						Create Album
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
