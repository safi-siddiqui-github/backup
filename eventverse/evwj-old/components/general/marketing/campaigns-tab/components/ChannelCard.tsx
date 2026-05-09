"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ChannelCardProps {
	id: string;
	name: string;
	description: string;
	icon: LucideIcon | React.ComponentType<any>;
	iconBg: string;
	selected: boolean;
	onToggle: () => void;
}

export default function ChannelCard({
	id,
	name,
	description,
	icon: Icon,
	iconBg,
	selected,
	onToggle,
}: ChannelCardProps) {
	return (
		<div
			onClick={onToggle}
			className={cn(
				"relative p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md flex flex-col",
				selected
					? "border-blue-600 bg-[#F3F4F6] dark:bg-slate-800"
					: "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300",
			)}
		>
			<div className="flex flex-col items-center text-center space-y-3 flex-1">
				<div
					className={cn(
						"rounded-2xl flex items-center justify-center transition-all duration-300",
						selected ? "w-16 h-16 scale-110" : "w-16 h-16",
						iconBg,
					)}
				>
					<Icon className="text-white h-8 w-8" />
				</div>
				<div>
					<h4 className="font-semibold text-base text-gray-900 dark:text-gray-100">
						{name}
					</h4>
					<p className="text-sm text-muted-foreground mt-1">{description}</p>
				</div>
			</div>

			{selected && (
				<div className="mt-4 flex justify-center">
					<div className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
						<Check className="h-4 w-4" />
						<span>Selected</span>
					</div>
				</div>
			)}
		</div>
	);
}
