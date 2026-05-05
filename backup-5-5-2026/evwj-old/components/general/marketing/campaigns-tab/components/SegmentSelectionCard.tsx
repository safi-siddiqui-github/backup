"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Users, DollarSign, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface SegmentSelectionCardProps {
	segment: {
		id: string;
		name: string;
		badge: string;
		description: string;
		guestCount: number;
		totalSpent: number;
		avgEvents: number;
		avatars: { initials: string; color: string }[];
		criteria: string;
	};
	selected: boolean;
	onToggle: () => void;
}

export default function SegmentSelectionCard({
	segment,
	selected,
	onToggle,
}: SegmentSelectionCardProps) {
	return (
		<div
			onClick={onToggle}
			className={cn(
				"p-5 rounded-lg border-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg",
				selected
					? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
					: "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300",
			)}
		>
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-3">
					<Checkbox checked={selected} onCheckedChange={onToggle} />
					<div>
						<div className="flex items-center gap-2">
							<h3 className="font-semibold text-base">{segment.name}</h3>
							<span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">
								{segment.badge}
							</span>
						</div>
						<p className="text-sm text-muted-foreground mt-1">
							{segment.description}
						</p>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-4 mt-4">
				{/* Guest Avatars */}
				<div className="flex items-center gap-2">
					<div className="flex -space-x-2">
						{segment.avatars.map((avatar, index) => (
							<div
								key={index}
								className={cn(
									"w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-slate-800",
									avatar.color,
								)}
							>
								{avatar.initials}
							</div>
						))}
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Users className="h-4 w-4" />
						<span className="font-medium text-foreground">
							{segment.guestCount}
						</span>
					</div>
				</div>

				{/* Stats */}
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<DollarSign className="h-4 w-4" />
						<span>Total: ${segment.totalSpent}</span>
					</div>
					<div className="flex items-center gap-1">
						<Calendar className="h-4 w-4" />
						<span>Avg: {segment.avgEvents} events</span>
					</div>
				</div>
			</div>

			<div className="mt-3 pt-3 border-t">
				<span className="inline-block text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
					{segment.criteria}
				</span>
			</div>
		</div>
	);
}
