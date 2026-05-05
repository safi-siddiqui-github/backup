"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Copy, Download, Eye as EyeIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { MediaCenterAlbum } from "../shared";
import QRCode from "qrcode";

interface QRCodeModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	album: MediaCenterAlbum | null;
}

export default function QRCodeModal({
	open,
	onOpenChange,
	album,
}: QRCodeModalProps) {
	const [copied, setCopied] = useState(false);
	const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const uploadURL = album?.slug
		? `https://eventdome.com/upload/${album.slug}`
		: "";

	// Generate QR code when modal opens or album changes
	useEffect(() => {
		if (open && uploadURL && canvasRef.current) {
			QRCode.toCanvas(
				canvasRef.current,
				uploadURL,
				{
					width: 192,
					margin: 2,
					color: {
						dark: "#000000",
						light: "#FFFFFF",
					},
					errorCorrectionLevel: "M",
				},
				(error) => {
					if (error) {
						console.error("QR Code generation error:", error);
					} else {
						// Convert canvas to data URL for download
						setQrCodeUrl(canvasRef.current!.toDataURL("image/png"));
					}
				},
			);
		}
	}, [open, uploadURL]);

	const handleCopyURL = async () => {
		try {
			await navigator.clipboard.writeText(uploadURL);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy URL:", err);
		}
	};

	const handleDownload = () => {
		if (!qrCodeUrl) {
			console.error("QR code not available");
			return;
		}
		const link = document.createElement("a");
		link.href = qrCodeUrl;
		link.download = `${album?.name?.replace(/\s+/g, "-") || "event-upload"}-QR.png`;
		link.click();
	};

	const handlePreview = () => {
		window.open(uploadURL, "_blank");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader className="pb-4">
					<DialogTitle className="text-2xl font-bold">
						Event Upload QR Code
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* QR Code Display */}
					<div className="flex flex-col items-center space-y-4">
						<div className="w-48 h-48 border-4 border-black bg-white flex items-center justify-center p-4 rounded">
							{uploadURL ? (
								<canvas ref={canvasRef} className="w-full h-full" />
							) : (
								<div className="text-center text-gray-500">
									<div className="text-sm">No album selected</div>
								</div>
							)}
						</div>
						<div className="text-center">
							<p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
								{album?.name || "Event Upload"}
							</p>
							<p className="text-xs text-muted-foreground">
								Scan to upload photos
							</p>
						</div>
					</div>

					{/* How it works section */}
					<div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
						<h3 className="font-semibold text-blue-900 dark:text-blue-100">
							How it works:
						</h3>
						<ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
							<li className="flex items-center gap-2">
								<span>•</span>
								<span>Guests scan the QR code with their phone</span>
							</li>
							<li className="flex items-center gap-2">
								<span>•</span>
								<span>They can choose which sub-album to upload to</span>
							</li>
							<li className="flex items-center gap-2">
								<span>•</span>
								<span>
									Upload limit: {album?.maxPhotosPerGuest || 15} photos per
									guest
								</span>
							</li>
							<li className="flex items-center gap-2">
								<span>•</span>
								<span>
									{album?.allowDownloads
										? "Downloads allowed"
										: "Downloads disabled"}
								</span>
							</li>
						</ul>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3">
						<Button
							variant="outline"
							onClick={handleCopyURL}
							className="flex-1"
						>
							<Copy className="h-4 w-4 mr-2" />
							{copied ? "Copied!" : "Copy URL"}
						</Button>
						<Button
							variant="outline"
							onClick={handleDownload}
							className="flex-1"
						>
							<Download className="h-4 w-4 mr-2" />
							Download
						</Button>
					</div>

					{/* Preview Link */}
					<div className="flex justify-center">
						<Button
							variant="ghost"
							onClick={handlePreview}
							className="text-blue-600 hover:text-blue-700"
						>
							<EyeIcon className="h-4 w-4 mr-2" />
							Preview Upload Page
						</Button>
					</div>

					{/* Print Instructions */}
					<div className="space-y-2">
						<h3 className="font-semibold text-gray-900 dark:text-gray-100">
							Print Instructions:
						</h3>
						<p className="text-sm text-muted-foreground">
							For best results, print the QR code at least 2x2 inches. Place it
							on tables or display boards where guests can easily scan it.
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
