"use client";

import { CATEGORY_IMAGES } from "@/lib/category-data";
import { Routes } from "@/lib/lib-routes";
import { getEventsByCategory } from "@/lib/mock-events";
import { HomePageProp } from "@/types/home";
import {
	Music,
	Code,
	UtensilsCrossed,
	Palette,
	Briefcase,
	Dumbbell,
	Film,
	GraduationCap,
	Users,
	Ghost,
	Home,
	Sun,
	Mic,
	Martini,
	UserPlus,
	Wrench,
	Radio,
	Shirt,
	type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import HomeDescriptionComponent from "./HomeDescriptionComponent";
import HomeHeadingComponent from "./HomeHeadingComponent";

// Map categories to their icons
const CATEGORY_ICONS: Record<string, LucideIcon> = {
	Music: Music,
	Technology: Code,
	"Food & Drink": UtensilsCrossed,
	"Art & Culture": Palette,
	Business: Briefcase,
	Sports: Dumbbell,
	Entertainment: Film,
	Education: GraduationCap,
	Social: Users,
	Halloween: Ghost,
	"Themed & House Parties": Home,
	"Outdoor Parties and Festivals": Sun,
	"Concerts and Live Performances": Mic,
	"Nightlife & Clubbing": Martini,
	"Meetups & Socials": UserPlus,
	"Workshops & Conventions": Wrench,
	"Raves & EDM": Radio,
	"Fashion & Lifestyle": Shirt,
};

// Curated list of categories to display
const DISPLAY_CATEGORIES = [
	"Music",
	"Technology",
	"Food & Drink",
	"Art & Culture",
	"Business",
	"Sports",
	"Entertainment",
	"Education",
	"Social",
	"Halloween",
	"Themed & House Parties",
	"Outdoor Parties and Festivals",
	"Concerts and Live Performances",
	"Nightlife & Clubbing",
	"Meetups & Socials",
	"Workshops & Conventions",
	"Raves & EDM",
	"Fashion & Lifestyle",
];

export default function HomeFilterSectionTwoComponent(prop?: HomePageProp) {
	const { heading, description } = prop ?? {};

	// Get all categories and count events for each
	const categoriesWithCounts = useMemo(() => {
		return DISPLAY_CATEGORIES.map((category) => {
			const events = getEventsByCategory(category);
			const Icon = CATEGORY_ICONS[category] || Users; // Default icon if not found
			const imageUrl = CATEGORY_IMAGES[category] || ""; // Background image URL
			return {
				name: category,
				icon: Icon,
				count: events.length,
				imageUrl,
			};
		});
	}, []);

	return (
		<div className="flex flex-col gap-5 md:*:nth-1:text-center md:*:nth-2:text-center">
			<HomeHeadingComponent heading={heading} />
			<HomeDescriptionComponent description={description} />
			
			{/* Category Squares Grid */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{categoriesWithCounts.map((category) => {
					const categoryUrl = `${Routes.web.general.eventsCategory}/${encodeURIComponent(category.name)}`;
					return (
						<Link
							key={category.name}
							href={categoryUrl}
							className="group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-gray-200/50 p-4 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800/50 dark:hover:border-gray-700"
							style={{
								backgroundImage: category.imageUrl
									? `url(${category.imageUrl})`
									: undefined,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							{/* Dark overlay for better text readability */}
							<div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50 dark:bg-black/60 dark:group-hover:bg-black/70" />

							{/* Content */}
							<div className="relative z-10 flex flex-col items-center gap-1">
								<span className="text-center text-sm font-semibold text-white drop-shadow-md">
									{category.name}
								</span>
								<span className="text-xs text-white/90 drop-shadow-sm">
									{category.count} {category.count === 1 ? "event" : "events"}
								</span>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
