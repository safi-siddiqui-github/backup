"use client";

import { cn } from "@/lib/utils";
import type { VendorService } from "@/lib/mock-vendor-services";

export default function ServiceCard({
	service,
	isSelected,
	onClick,
}: {
	service: VendorService;
	isSelected: boolean;
	onClick: () => void;
}) {
	const Icon = service.icon;

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group relative flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105",
				isSelected
					? "border-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:border-purple-400"
					: "border-border bg-card hover:border-purple-300 dark:hover:border-purple-700",
			)}
		>
			<div
				className={cn(
					"p-3 rounded-lg transition-colors",
					isSelected
						? "bg-purple-600 dark:bg-purple-400"
						: "bg-muted group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30",
				)}
			>
				<Icon
					className={cn(
						"h-6 w-6 transition-colors",
						isSelected
							? "text-white"
							: "text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400",
					)}
				/>
			</div>
			<span
				className={cn(
					"text-sm font-medium text-center",
					isSelected
						? "text-purple-600 dark:text-purple-400"
						: "text-foreground",
				)}
			>
				{service.name}
			</span>
		</button>
	);
}

