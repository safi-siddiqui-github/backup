"use client";

import { Segment } from "../types";

interface SegmentCardProps {
	segment: Segment;
}

export default function SegmentCard({ segment }: SegmentCardProps) {
	return (
		<div className="flex items-start justify-between gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md cursor-pointer">
			<div className="flex items-start gap-3 flex-1">
				<div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center shrink-0">
					<span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
						+{segment.guestCount}
					</span>
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-semibold mb-1">{segment.name}</p>
					<p className="text-xs text-muted-foreground">{segment.description}</p>
				</div>
			</div>
			<div className="text-sm font-semibold shrink-0">
				{segment.guestCount} guests
			</div>
		</div>
	);
}
