import React, { useEffect, useState } from "react";
import { Photo } from "./types";
import {
	X,
	ChevronLeft,
	ChevronRight,
	Heart,
	MessageCircle,
	Share2,
} from "lucide-react";

const ImageModal: React.FC<{
	photo: Photo | null;
	allPhotos: Photo[];
	onClose: () => void;
	onNavigate: (index: number) => void;
}> = ({ photo, allPhotos, onClose, onNavigate }) => {
	if (!photo) return null;

	const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
	const totalPhotos = allPhotos.length;
	const [liked, setLiked] = useState(photo.liked);

	const formattedDate = photo.uploadDate
		? new Date(photo.uploadDate).toLocaleString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			})
		: "Unknown Date";

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft" && currentIndex > 0)
				onNavigate(currentIndex - 1);
			if (e.key === "ArrowRight" && currentIndex < totalPhotos - 1)
				onNavigate(currentIndex + 1);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentIndex, totalPhotos, onClose, onNavigate]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fade-in">
			<div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden dark:bg-[#090a11]">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md text-gray-600 hover:bg-gray-100 transition dark:bg-[#070b1c] dark:text-gray-300 dark:hover:bg-gray-800"
					aria-label="Close modal"
				>
					<X className="w-6 h-6" />
				</button>

				{totalPhotos > 1 && (
					<>
						<button
							onClick={() => onNavigate(currentIndex - 1)}
							disabled={currentIndex === 0}
							className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition dark:bg-[#070b1c] dark:text-gray-300 dark:hover:bg-gray-800"
							aria-label="Previous image"
						>
							<ChevronLeft className="w-6 h-6" />
						</button>
						<button
							onClick={() => onNavigate(currentIndex + 1)}
							disabled={currentIndex === totalPhotos - 1}
							className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition dark:bg-[#070b1c] dark:text-gray-300 dark:hover:bg-gray-800"
							aria-label="Next image"
						>
							<ChevronRight className="w-6 h-6" />
						</button>
					</>
				)}

				<div className="flex flex-col md:flex-row flex-grow overflow-hidden">
					<div className="relative md:w-2/3 bg-gray-100 flex items-center justify-center p-4 flex-shrink-0 h-1/2 md:h-full dark:bg-[#070b1c]">
						<img
							src={photo.imageUrl}
							alt={photo.title}
							className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
						/>
					</div>

					<div className="md:w-1/3 flex flex-col bg-white dark:bg-[#090a11]">
						<div className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs dark:bg-blue-900/30 dark:text-blue-300">
									{photo.uploader?.charAt(0) || "U"}
								</div>
								<div>
									<div className="text-sm font-semibold text-gray-900 dark:text-white">
										{photo.uploader || "Unknown"}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{formattedDate}
									</div>
								</div>
							</div>
						</div>

						<div className="p-4 flex items-center gap-4">
							<button
								onClick={() => setLiked(!liked)}
								className={`flex items-center gap-1.5 text-sm font-medium transition ${liked ? "text-red-500" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`}
							>
								<Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
								{liked ? (photo.likes || 0) + 1 : photo.likes}
							</button>
							<button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
								<MessageCircle className="w-5 h-5" />
								{photo.comments}
							</button>
							<button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 ml-auto dark:text-gray-400 dark:hover:text-gray-200">
								<Share2 className="w-5 h-5" />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{/* Sample comments */}
							<div className="flex gap-3">
								<div className="w-8 h-8 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-purple-600 font-bold text-xs dark:bg-purple-900/30 dark:text-purple-300">
									S
								</div>
								<div>
									<div className="bg-gray-50 rounded-lg rounded-tl-none px-3 py-2 text-sm dark:bg-[#070b1c]">
										<span className="font-semibold text-gray-900 block text-xs mb-0.5 dark:text-white">
											Sarah Johnson
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											This looks amazing! Wish I was there! 😍
										</span>
									</div>
									<div className="text-[10px] text-gray-400 mt-1 ml-1">
										2h ago
									</div>
								</div>
							</div>
							<div className="flex gap-3">
								<div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-green-600 font-bold text-xs dark:bg-green-900/30 dark:text-green-300">
									M
								</div>
								<div>
									<div className="bg-gray-50 rounded-lg rounded-tl-none px-3 py-2 text-sm dark:bg-[#070b1c]">
										<span className="font-semibold text-gray-900 block text-xs mb-0.5 dark:text-white">
											Mike Chen
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											Great shot! The lighting is perfect.
										</span>
									</div>
									<div className="text-[10px] text-gray-400 mt-1 ml-1">
										1h ago
									</div>
								</div>
							</div>
						</div>

						<div className="p-3 dark:bg-transparent">
							<div className="relative">
								<input
									type="text"
									placeholder="Add a comment..."
									className="w-full pl-4 pr-10 py-2.5 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all dark:bg-[#070b1c] dark:text-white dark:focus:bg-[#090a11]"
								/>
								<button className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
									<SendIcon />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// small inline Send icon wrapper to avoid extra lucide import in parent
const SendIcon: React.FC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="feather feather-send w-3.5 h-3.5"
	>
		<line x1="22" y1="2" x2="11" y2="13"></line>
		<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
	</svg>
);

export default ImageModal;
