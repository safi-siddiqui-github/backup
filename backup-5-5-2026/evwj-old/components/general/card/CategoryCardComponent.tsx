"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type CategoryCardProps = {
	title: string;
	description: string;
	image: string;
	tags?: string[];
	ctaText?: string;
};

const CategoryCardComponent = ({
	title,
	description,
	image,
	tags = [],
	ctaText = "Learn more",
}: CategoryCardProps) => {
	return (
		<div className="relative w-full h-full bg-[#2a2a2a] rounded-lg overflow-hidden group cursor-pointer">
			{/* Background Image Optimized with next/image */}
			<div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
				<Image
					src={image}
					alt={title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
					className="object-cover object-center"
					loading="lazy"
				/>
				{/* Dark overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
			</div>

			{/* Content */}
			<div className="relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-7 lg:p-10 xl:p-12">
				{/* Top section - Tags */}
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
						{tags.map((tag, index) => (
							<span
								key={index}
								className="text-[10px] sm:text-xs md:text-[13px] lg:text-sm text-white/80 font-light"
							>
								{tag}
								{index < tags.length - 1 && " · "}
							</span>
						))}
					</div>
				)}

				{/* Bottom section - Title & Description */}
				<div className="space-y-2 sm:space-y-3 md:space-y-3.5 lg:space-y-5 xl:space-y-6">
					<h3 className="text-xl sm:text-2xl md:text-[28px] lg:text-4xl xl:text-5xl font-serif text-white leading-tight">
						{title}
					</h3>

					<p className="text-xs sm:text-sm md:text-[15px] lg:text-base xl:text-lg text-white/90 leading-relaxed max-w-xl font-light line-clamp-2 md:line-clamp-2 lg:line-clamp-3">
						{description}
					</p>

					{/* CTA Button */}
					<Button className="bg-white text-black hover:bg-white/90 font-medium px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm md:text-[14px] lg:text-base rounded-md transition-all duration-300 group-hover:translate-x-1">
						{ctaText}
						<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CategoryCardComponent;
