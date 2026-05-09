"use client";

import { BsStar, BsStarFill } from "react-icons/bs";

type Props = { rating: number; maxStars?: number; className?: string };

export default function StarRating({
	rating,
	maxStars = 5,
	className = "",
}: Props) {
	return (
		<div className={`flex text-yellow-400 gap-0.5 ${className}`}>
			{[...Array(maxStars)].map((_, i) => (
				<span key={i}>
					{i < rating ? (
						<BsStarFill className="w-4 h-4" />
					) : (
						<BsStar className="w-4 h-4 text-gray-300 dark:text-gray-600" />
					)}
				</span>
			))}
		</div>
	);
}
