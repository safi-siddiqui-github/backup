"use client";

import { CATEGORY_IMAGES } from "@/lib/category-data";
import { useEffect, useState } from "react";

interface EventsCategoryHeroSectionComponentProps {
	categoryName: string;
}

export default function EventsCategoryHeroSectionComponent({
	categoryName,
}: EventsCategoryHeroSectionComponentProps) {
	const [mounted, setMounted] = useState(false);
	const categoryImage = CATEGORY_IMAGES[categoryName] || "";

	// Initialize
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="relative z-10 w-full pt-20 md:pt-24">
			{/* Category Image Container */}
			<div className="relative h-[400px] w-full overflow-hidden rounded-xl md:h-[450px] lg:h-[350px]">
				{/* Background Image */}
				{categoryImage && (
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: `url(${categoryImage})`,
						}}
					/>
				)}

				{/* Gradient Overlay for text readability */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

				{/* Text Overlay - Bottom Left */}
				<div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10">
					<h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
						{categoryName}
					</h1>
					<p className="mt-2 text-lg text-white/90 md:text-xl lg:text-2xl">
						Discover {categoryName} events
					</p>
				</div>
			</div>
		</div>
	);
}

