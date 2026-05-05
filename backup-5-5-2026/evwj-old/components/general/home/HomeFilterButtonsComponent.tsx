"use client";

import { HomePageProp } from "@/types/home";
import { useState } from "react";

export default function HomeFilterButtonsComponent(prop?: HomePageProp) {
	const { filterButtons, sectionType, defaultFilter } = prop ?? {};
	const [selectedFilter, setSelectedFilter] =
		useState<HomePageProp["filters"]>(defaultFilter);
	return (
		<div className="flex flex-wrap gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-full *:px-2 *:py-2 *:text-[10px] *:font-medium *:data-[state-filter-btn=active]:bg-linear-to-r *:data-[state-filter-btn=active]:from-purple-600 *:data-[state-filter-btn=active]:to-cyan-600 *:data-[state-filter-btn=active]:text-white *:data-[state-filter-btn=inactive]:bg-white *:*:nth-1:size-3 md:gap-4 2xl:*:px-4 2xl:*:text-xs dark:*:data-[state-filter-btn=inactive]:bg-white/15 dark:*:data-[state-filter-btn=inactive]:text-white">
			{filterButtons?.map((item, index) => (
				<button
					key={index}
					data-state-filter-btn={
						selectedFilter === item?.btnFilter ? "active" : "inactive"
					}
					onClick={() => {
						setSelectedFilter(item?.btnFilter);
						item?.handleClick &&
							item.handleClick({
								sectionType: sectionType,
								btnFilter: item?.btnFilter,
							});
					}}
					disabled={selectedFilter === item?.btnFilter}
				>
					{item?.BtnIcon && <item.BtnIcon />}
					{item?.btnText}
				</button>
			))}
		</div>
	);
}
