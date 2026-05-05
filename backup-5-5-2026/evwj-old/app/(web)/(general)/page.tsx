"use client";

import HomeDomeGalleryComponent from "@/components/general/home/HomeDomeGalleryComponent";
import HomeFilteredEventsComponent from "@/components/general/home/HomeFilteredEventsComponent";
import HomeHeroSectionV2 from "@/components/general/home/HomeHeroSectionV2";
import HomeSearchBarEvent from "@/components/general/home/HomeSearchBarEvent";

export default function Page() {
	return (
		<main className="flex w-full flex-col bg-white dark:bg-black">
			<HomeHeroSectionV2 />
			<HomeFilteredEventsComponent />
			<HomeDomeGalleryComponent />
			<HomeSearchBarEvent />
		</main>
	);
}
