"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";
import { useState, useRef } from "react";
import CameraReviewModal from "./CameraReviewModal";

interface FindMeModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onFindPhotos: (imageFile: File) => void;
}

export default function FindMeModal({
	open,
	onOpenChange,
	onFindPhotos,
}: FindMeModalProps) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [showCameraReview, setShowCameraReview] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUploadPhoto = () => {
		fileInputRef.current?.click();
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setIsProcessing(true);
			// Simulate processing
			setTimeout(() => {
				onFindPhotos(file);
				setIsProcessing(false);
				onOpenChange(false);
			}, 2000);
		}
	};

	const handleTakePhoto = () => {
		setShowCameraReview(true);
	};

	const handlePhotoTaken = (photoData: string) => {
		// Convert data URL to File
		fetch(photoData)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
				setIsProcessing(true);
				setTimeout(() => {
					onFindPhotos(file);
					setIsProcessing(false);
					onOpenChange(false);
				}, 2000);
			});
	};

	const handleCameraCancel = () => {
		setShowCameraReview(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader className="pb-4">
					<DialogTitle className="text-2xl font-bold">
						Find Me in Photos
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Instructions */}
					<p className="text-sm text-gray-600 text-center">
						Upload a clear photo of your face or take a selfie to find all
						photos you appear in.
					</p>

					{/* Action Buttons */}
					<div className="flex gap-3">
						<Button
							variant="outline"
							className="flex-1 h-16 flex-col gap-2"
							onClick={handleUploadPhoto}
							disabled={isProcessing}
						>
							<Upload className="h-6 w-6" />
							<span>Upload Photo</span>
						</Button>

						<Button
							variant="outline"
							className="flex-1 h-16 flex-col gap-2"
							onClick={handleTakePhoto}
							disabled={isProcessing}
						>
							<Camera className="h-6 w-6" />
							<span>Take Selfie</span>
						</Button>
					</div>

					{/* Processing State */}
					{isProcessing && (
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p className="text-sm text-gray-600">
								Finding photos with your face...
							</p>
						</div>
					)}

					{/* Hidden file input */}
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						className="hidden"
					/>
				</div>
			</DialogContent>

			{/* Camera Review Modal */}
			<CameraReviewModal
				open={showCameraReview}
				onOpenChange={setShowCameraReview}
				onPhotoTaken={handlePhotoTaken}
				onCancel={handleCameraCancel}
				title="Take Selfie for Find Me"
			/>
		</Dialog>
	);
}
