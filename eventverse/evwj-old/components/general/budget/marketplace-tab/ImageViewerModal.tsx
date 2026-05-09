"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageViewerModalProps {
	images: string[];
	title: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialIndex?: number;
}

export default function ImageViewerModal({
	images,
	title,
	open,
	onOpenChange,
	initialIndex = 0,
}: ImageViewerModalProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	// Update current index when initialIndex changes
	useEffect(() => {
		if (open) {
			setCurrentIndex(initialIndex);
		}
	}, [initialIndex, open]);

	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	if (images.length === 0) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-5xl p-0 !bg-black dark:!bg-black backdrop-blur-sm">
				<DialogHeader className="absolute top-4 left-4 right-4 z-10">
					<div className="flex items-center justify-between">
						<DialogTitle className="text-white drop-shadow-lg">
							{title}
						</DialogTitle>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => onOpenChange(false)}
							className="text-white hover:bg-white/20"
						>
							<X className="h-5 w-5" />
						</Button>
					</div>
				</DialogHeader>

				<div className="relative bg-black">
					<img
						src={images[currentIndex]}
						alt={`${title} - Image ${currentIndex + 1}`}
						className="w-full h-[70vh] object-contain"
					/>

					{/* Navigation */}
					{images.length > 1 && (
						<>
							<button
								onClick={prevImage}
								className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-colors"
							>
								<ChevronLeft className="h-6 w-6" />
							</button>
							<button
								onClick={nextImage}
								className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-colors"
							>
								<ChevronRight className="h-6 w-6" />
							</button>

							{/* Image counter */}
							<div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
								{currentIndex + 1} / {images.length}
							</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
