import React from "react";
import { Photo } from "./types";
import { Heart, MessageCircle, Download, Share2 } from "lucide-react";

const PhotoCard: React.FC<{ photo: Photo; onClick: (p: Photo) => void }> = ({
	photo,
	onClick,
}) => {
	const handleError = (e: any) => {
		if (e && e.target) e.target.onerror = null;
		(e?.target as any).src =
			"https://placehold.co/600x400/94a3b8/ffffff?text=Image+Error";
	};

	return (
		<button
			onClick={() => onClick(photo)}
			className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-xl hover:scale-[1.01] text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#090a11]"
		>
			<div className="h-48 w-full bg-gray-100 overflow-hidden dark:bg-[#070b1c]">
				<img
					src={photo.imageUrl}
					alt={photo.title}
					className="w-full h-full object-cover"
					onError={handleError}
				/>
			</div>
			<div className="p-4 flex flex-col justify-between flex-grow">
				<div>
					<h3 className="text-base font-semibold text-gray-900 line-clamp-1 dark:text-white">
						{photo.title}
					</h3>
					<p className="text-xs text-gray-500 mb-2 dark:text-gray-400">
						by {photo.uploader || "Anonymous"}
					</p>
					<div className="flex flex-wrap gap-1 mb-3">
						{(photo.tags || []).map((tag) => (
							<span
								key={tag}
								className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
				<div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3 dark:border-gray-800 dark:text-gray-400">
					<div className="flex items-center space-x-3">
						<div className="flex items-center space-x-1 text-red-500">
							<Heart className="w-4 h-4 fill-red-500" />
							<span className="text-xs">{photo.likes}</span>
						</div>
						<div className="flex items-center space-x-1">
							<MessageCircle className="w-4 h-4" />
							<span className="text-xs">{photo.comments}</span>
						</div>
					</div>
					<div className="flex space-x-2">
						<div className="p-1 rounded-full hover:bg-gray-100 transition dark:hover:bg-gray-800">
							<Download className="w-4 h-4" />
						</div>
						<div className="p-1 rounded-full hover:bg-gray-100 transition dark:hover:bg-gray-800">
							<Share2 className="w-4 h-4" />
						</div>
					</div>
				</div>
			</div>
		</button>
	);
};

export default PhotoCard;
