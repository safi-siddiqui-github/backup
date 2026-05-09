"use client";
import React from "react";
import { Settings2, Users } from "lucide-react";

type Track = {
	title: string;
	description: string;
	attendees: number;
	utilization: number;
	count: number;
	colors: { bg: string; border: string; text: string; progress: string };
};

export default function OverviewTracks({ tracks }: { tracks: Track[] }) {
	return (
		<section>
			<div className="flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
						<Settings2 className="w-5 h-5 text-blue-600 dark:text-blue-300" />
					</div>
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">
						Conference Tracks
					</h2>
					<span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium px-2.5 py-0.5 rounded-full">
						3
					</span>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
				{tracks.map((track) => (
					<div
						key={track.title}
						className={`p-6 rounded-xl border ${track.colors.bg} ${track.colors.border} shadow-sm`}
					>
						<div className="flex justify-between items-start">
							<h3 className={`text-xl font-bold ${track.colors.text}`}>
								{track.title}
							</h3>
							<span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
								{track.count}
							</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-1 h-10">
							{track.description}
						</p>
						<div className="flex items-center gap-2 mt-6">
							<Users className="w-5 h-5 text-gray-400 dark:text-gray-500" />
							<span className="font-bold text-gray-900 dark:text-white">
								{track.attendees}
							</span>
							<span className="text-sm text-gray-600 dark:text-gray-400">
								attendees
							</span>
						</div>
						<div className="mt-4">
							<div className="flex justify-between text-sm mb-1">
								<span className="font-medium text-gray-700 dark:text-gray-300">
									Capacity Utilization
								</span>
								<span className={`font-bold ${track.colors.text}`}>
									{track.utilization}%
								</span>
							</div>
							<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
								<div
									className={`h-2.5 rounded-full ${track.colors.progress}`}
									style={{ width: `${track.utilization}%` }}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
