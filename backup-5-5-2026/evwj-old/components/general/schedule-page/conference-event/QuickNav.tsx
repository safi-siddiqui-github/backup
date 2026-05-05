"use client";
import React from "react";

type NavItem = { day: number; date: string };

export default function QuickNav({
	items,
	activeDay,
	onSelect,
}: {
	items: NavItem[];
	activeDay: number;
	onSelect: (day: number) => void;
}) {
	return (
		<div className="flex flex-wrap items-center justify-center gap-2">
			<span className="shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300">
				Quick Navigate:
			</span>
			<div className="flex items-center gap-2">
				{items.map((nav) => (
					<button
						key={nav.day}
						onClick={() => onSelect(nav.day)}
						className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors ${
							activeDay === nav.day
								? "bg-blue-600 text-white shadow-sm"
								: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						}`}
					>
						<span className="font-bold">Day {nav.day}</span>
						<span className="ml-1.5 text-gray-400 dark:text-gray-500">
							{nav.date}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
