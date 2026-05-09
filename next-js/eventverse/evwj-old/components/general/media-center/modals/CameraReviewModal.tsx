"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Camera, Check, Download, RotateCcw, Share2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CameraReviewModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onPhotoTaken: (photoData: string) => void;
	onCancel: () => void;
	title?: string;
}

export default function CameraReviewModal({
	open,
	onOpenChange,
	onPhotoTaken,
	onCancel,
	title = "Take Photo",
}: CameraReviewModalProps) {
	const [isCameraActive, setIsCameraActive] = useState(false);
	const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const streamRef = useRef<MediaStream | null>(null);

	useEffect(() => {
		if (open) {
			startCamera();
		} else {
			stopCamera();
			setCapturedPhoto(null);
		}
	}, [open]);

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 1280 },
					height: { ideal: 720 },
					facingMode: "user",
				},
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				streamRef.current = stream;
				setIsCameraActive(true);
			}
		} catch (error) {
			// Silently handle permission errors - don't log NotAllowedError
			const err = error as DOMException;
			if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
				toast.error("Camera access denied. Please allow camera permissions in your browser settings.");
			} else {
				console.error("Error accessing camera:", error);
				toast.error("Unable to access camera. Please check permissions.");
			}
		}
	};

	const stopCamera = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}
		setIsCameraActive(false);
	};

	const capturePhoto = () => {
		if (!videoRef.current || !canvasRef.current) return;

		setIsCapturing(true);

		const video = videoRef.current;
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		if (!context) return;

		// Set canvas size to match video
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		// Draw the current video frame to canvas
		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		// Convert to data URL
		const photoData = canvas.toDataURL("image/jpeg", 0.8);
		setCapturedPhoto(photoData);
		setIsCapturing(false);

		// Stop camera after capture
		stopCamera();

		toast.success("Photo captured!");
	};

	const retakePhoto = () => {
		setCapturedPhoto(null);
		startCamera();
	};

	const confirmPhoto = () => {
		if (capturedPhoto) {
			onPhotoTaken(capturedPhoto);
			onOpenChange(false);
			setCapturedPhoto(null);
		}
	};

	const downloadPhoto = () => {
		if (capturedPhoto) {
			const link = document.createElement("a");
			link.download = `photo-${Date.now()}.jpg`;
			link.href = capturedPhoto;
			link.click();
			toast.success("Photo downloaded!");
		}
	};

	const sharePhoto = () => {
		if (capturedPhoto) {
			// Convert data URL to blob
			fetch(capturedPhoto)
				.then((res) => res.blob())
				.then((blob) => {
					if (navigator.share) {
						navigator.share({
							title: "My Photo",
							files: [new File([blob], "photo.jpg", { type: "image/jpeg" })],
						});
					} else {
						// Fallback: copy to clipboard or show share options
						toast.info("Share functionality not available in this browser");
					}
				});
		}
	};

	const handleClose = () => {
		stopCamera();
		setCapturedPhoto(null);
		onCancel();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent
				className="h-[95vh] max-h-[95vh] w-[95vw] max-w-[95vw] overflow-hidden p-0"
				showCloseButton={false}
			>
				<DialogTitle className="sr-only">{title}</DialogTitle>

				<div className="flex h-full">
					{/* Camera/Photo Display */}
					<div className="relative flex-1 bg-black">
						{/* Header */}
						<div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between">
							<h2 className="text-xl font-semibold text-white">{title}</h2>
							<Button
								variant="ghost"
								size="sm"
								onClick={handleClose}
								className="border border-white/20 bg-black/50 text-white hover:bg-black/70"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>

						{/* Camera/Photo Content */}
						<div className="flex h-full w-full items-center justify-center">
							{capturedPhoto ? (
								// Show captured photo
								<div className="relative flex h-full w-full items-center justify-center">
									<Image
										src={capturedPhoto}
										alt="Captured photo"
										width={100}
										height={100}
										className="max-h-full max-w-full object-contain"
									/>
								</div>
							) : (
								// Show camera feed
								<div className="relative h-full w-full">
									<video
										ref={videoRef}
										autoPlay
										playsInline
										muted
										className="h-full w-full object-cover"
									/>
									{!isCameraActive && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/50">
											<div className="text-center text-white">
												<Camera className="mx-auto mb-4 h-16 w-16 opacity-50" />
												<p className="text-lg">Starting camera...</p>
											</div>
										</div>
									)}
								</div>
							)}
						</div>

						{/* Controls */}
						<div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
							{capturedPhoto ? (
								// Photo review controls
								<>
									<Button
										onClick={retakePhoto}
										variant="outline"
										size="lg"
										className="border-white/30 bg-white/20 text-white hover:bg-white/30"
									>
										<RotateCcw className="mr-2 h-5 w-5" />
										Retake
									</Button>

									<Button
										onClick={downloadPhoto}
										variant="outline"
										size="lg"
										className="border-white/30 bg-white/20 text-white hover:bg-white/30"
									>
										<Download className="mr-2 h-5 w-5" />
										Download
									</Button>

									<Button
										onClick={sharePhoto}
										variant="outline"
										size="lg"
										className="border-white/30 bg-white/20 text-white hover:bg-white/30"
									>
										<Share2 className="mr-2 h-5 w-5" />
										Share
									</Button>

									<Button
										onClick={confirmPhoto}
										size="lg"
										className="bg-green-600 text-white hover:bg-green-700"
									>
										<Check className="mr-2 h-5 w-5" />
										Use Photo
									</Button>
								</>
							) : (
								// Camera controls
								<Button
									onClick={capturePhoto}
									disabled={!isCameraActive || isCapturing}
									size="lg"
									className="h-16 w-16 rounded-full bg-white text-black hover:bg-gray-100"
								>
									<Camera className="h-8 w-8" />
								</Button>
							)}
						</div>

						{/* Hidden canvas for photo capture */}
						<canvas ref={canvasRef} className="hidden" />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
