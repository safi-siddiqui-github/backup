"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { MediaCenterAlbum } from "../shared";

interface AlbumSettingsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	album: MediaCenterAlbum | null;
	onSave: (settings: {
		maxPhotosPerGuest: number;
		allowDownloads: boolean;
		requireApproval: boolean;
	}) => void;
}

export default function AlbumSettingsModal({
	open,
	onOpenChange,
	album,
	onSave,
}: AlbumSettingsModalProps) {
	const [formData, setFormData] = useState({
		maxPhotosPerGuest: 15,
		allowDownloads: true,
		requireApproval: false,
	});

	useEffect(() => {
		if (album) {
			setFormData({
				maxPhotosPerGuest: album.maxPhotosPerGuest,
				allowDownloads: album.allowDownloads,
				requireApproval: album.requireApproval,
			});
		}
	}, [album]);

	const handleSubmit = () => {
		onSave(formData);
		onOpenChange(false);
	};

	const handleCancel = () => {
		if (album) {
			setFormData({
				maxPhotosPerGuest: album.maxPhotosPerGuest,
				allowDownloads: album.allowDownloads,
				requireApproval: album.requireApproval,
			});
		}
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader className="pb-4">
					<DialogTitle className="text-2xl font-bold">
						Album Settings
					</DialogTitle>
					<DialogDescription className="text-base">
						Configure upload and sharing settings for &quot;{album?.name}&quot;
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					<div className="space-y-4">
						<h3 className="text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
							Upload Settings
						</h3>

						<div className="space-y-2">
							<Label htmlFor="max-photos">Max photos per guest</Label>
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
									className="w-20"
								/>
								<span className="text-muted-foreground text-sm">
									photos per guest
								</span>
							</div>
						</div>
					</div>

					<div className="space-y-4 border-t border-gray-200 pt-2 dark:border-gray-700">
						<h3 className="text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
							Sharing Settings
						</h3>

						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<Label htmlFor="allow-downloads">Allow downloads</Label>
								<p className="text-muted-foreground text-sm">
									Let guests download photos from this album
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
								<Label htmlFor="require-approval">Require approval</Label>
								<p className="text-muted-foreground text-sm">
									Review photos before they appear in the album
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
					<Button variant="outline" onClick={handleCancel}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Save Settings</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
