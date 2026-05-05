import React, { useState } from "react";
import { ChevronLeft, Upload, Camera, Heart } from "lucide-react";

const PhotoPreviewCard: React.FC = () => (
	<div className="relative flex flex-col items-center justify-center h-40 bg-pink-50 rounded-lg p-4 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
		<Heart className="w-5 h-5 fill-white absolute top-2 right-2 dark:fill-gray-800" />
		<span className="text-xs font-semibold mt-auto">Guest Photo</span>
	</div>
);

const UploadScreen: React.FC<{
	onBack: () => void;
	quotaRemaining: number;
}> = ({ onBack, quotaRemaining }) => {
	const quotaTotal = 10;
	const [dragActive, setDragActive] = useState(false);

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			// Handle file upload
		}
	};

	return (
		<div className="  mx-auto py-8">
			<button
				onClick={onBack}
				className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition text-sm font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
			>
				<ChevronLeft className="w-4 h-4 mr-1" /> Back to Gallery
			</button>

			<div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 dark:bg-[#090a11]">
				<div className="p-8 text-white text-center bg-linear-to-r from-pink-500 to-indigo-600">
					<Camera className="w-8 h-8 mx-auto mb-3" />
					<h1 className="text-2xl font-bold mb-1">Share Your Memories</h1>
					<p className="text-sm text-indigo-100">
						Upload photos to test-showcase-event's wedding album
					</p>
				</div>

				<div className="p-6">
					<div className="flex justify-between items-center mb-1">
						<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
							Your Upload Quota
						</h2>
						<span className="text-sm font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
							{quotaRemaining} remaining
						</span>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Share your favorite moments from the celebration
					</p>
				</div>

				<div className="p-6">
					<h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
						Upload Photos
					</h2>
					<div className="flex gap-6 sm:gap-10">
						<button className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 rounded-xl hover:bg-gray-100 transition shadow-sm dark:bg-[#070b1c]">
							<Upload className="w-6 h-6 text-indigo-600 mb-2 dark:text-indigo-400" />
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Choose Photos
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								From your device
							</span>
						</button>
						<button className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 rounded-xl hover:bg-gray-100 transition shadow-sm dark:bg-[#070b1c]">
							<Camera className="w-6 h-6 text-indigo-600 mb-2 dark:text-indigo-400" />
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Take Photo
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								Use camera
							</span>
						</button>
					</div>

					<div
						className={`mt-6 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
							dragActive
								? "bg-blue-50 dark:bg-blue-900/20"
								: "hover:bg-gray-50 dark:hover:bg-[#070b1c]"
						}`}
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}
					>
						<div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900/30 dark:text-blue-400">
							<Upload className="w-8 h-8" />
						</div>
						<p className="text-lg font-semibold text-gray-900 mb-1 dark:text-white">
							Drag & drop photos here
						</p>
						<p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
							or click to browse from your device
						</p>
						<button className="px-4 py-2 bg-white rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition dark:bg-[#070b1c] dark:text-gray-300 dark:hover:bg-gray-800">
							Select Files
						</button>
					</div>
				</div>

				<div className="p-6">
					<h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
						Wedding Album Preview
					</h2>
					<div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
						<PhotoPreviewCard />
						<PhotoPreviewCard />
						<PhotoPreviewCard />
						<PhotoPreviewCard />
						<PhotoPreviewCard />
						<PhotoPreviewCard />
					</div>
					<p className="text-center text-sm text-gray-500 mt-4 dark:text-gray-400">
						Photos from all guests will appear here throughout the celebration
					</p>
				</div>
			</div>

			<div className="p-6 bg-blue-50 rounded-xl">
				<h2 className="text-lg font-bold text-blue-800 mb-3 dark:text-blue-300">
					Photo Guidelines
				</h2>
				<ul className="list-disc list-inside text-sm text-blue-700 space-y-1 dark:text-blue-400">
					<li>
						<span className="font-semibold">Maximum 10 photos per guest</span>
					</li>
					<li>
						Photos will be{" "}
						<span className="font-semibold">visible to all wedding guests</span>
					</li>
					<li>
						Please keep photos{" "}
						<span className="font-semibold">appropriate for all audiences</span>
					</li>
					<li>High-quality images are preferred</li>
					<li>Photos may be used in the couple's wedding album</li>
				</ul>
			</div>
		</div>
	);
};

export default UploadScreen;
