"use client";
import React from "react";
import { Attendee } from "./types";

type AvatarStackProps = {
	attendees: Attendee[];
	max?: number;
};

export default function AvatarStack({ attendees, max = 5 }: AvatarStackProps) {
	const visible = attendees.slice(0, max);
	const hiddenCount = attendees.length - max;

	const aColors = [
		"bg-blue-500",
		"bg-indigo-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-red-500",
		"bg-orange-500",
		"bg-yellow-500",
		"bg-green-500",
		"bg-teal-500",
	];

	const getInitials = (name: string): string => {
		if (!name) return "?";
		const parts = name.split(" ");
		if (parts.length === 1) return name[0] ? name[0].toUpperCase() : "?";
		return (parts[0][0] || "") + (parts[parts.length - 1][0] || "");
	};

	const getColor = (name: string): string =>
		aColors[String(name).length % aColors.length];

	return (
		<div className="flex -space-x-2 overflow-hidden">
			{visible.map((att, index) => (
				<span
					key={index}
					title={att.name}
					className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white ring-2 ring-white dark:ring-gray-900 ${getColor(
						att.name,
					)}`}
				>
					{getInitials(att.name)}
				</span>
			))}
			{hiddenCount > 0 && (
				<span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 ring-2 ring-white dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-900">
					+{hiddenCount}
				</span>
			)}
		</div>
	);
}
