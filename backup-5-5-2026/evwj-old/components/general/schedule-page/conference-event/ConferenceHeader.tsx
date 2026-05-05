"use client";
import React from "react";

export default function ConferenceHeader() {
	return (
		<div className="w-full">
			{/* --- Top Title Block --- */}
			<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 shadow-sm sm:p-8 [background-color:white] dark:[background-color:#020617]">
				<div className="flex items-start justify-between">
					<div>
						<h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
							Conference Schedule
						</h1>
						<p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
							Overview of tracks, sessions and calendar for the event.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
