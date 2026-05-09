"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
	value: string | number;
	label: string;
	icon?: LucideIcon;
	variant?: "primary" | "secondary";
	colorScheme?: "blue" | "green" | "purple";
	iconSize?: "sm" | "md" | "lg";
}

export default function MetricCard({
	value,
	label,
	icon: Icon,
	variant = "primary",
	colorScheme = "blue",
	iconSize = "md",
}: MetricCardProps) {
	const iconSizeClasses = {
		sm: "h-4 w-4",
		md: "h-5 w-5",
		lg: "h-6 w-6",
	};

	const colorClasses = {
		blue: {
			bg: "bg-blue-50 dark:bg-blue-950/20",
			border: "border-blue-200 dark:border-blue-800",
			icon: "text-blue-600 dark:text-blue-400",
			value: "text-blue-600 dark:text-blue-400",
		},
		green: {
			bg: "bg-green-50 dark:bg-green-950/20",
			border: "border-green-200 dark:border-green-800",
			icon: "text-green-600 dark:text-green-400",
			value: "text-green-600 dark:text-green-400",
		},
		purple: {
			bg: "bg-purple-50 dark:bg-purple-950/20",
			border: "border-purple-200 dark:border-purple-800",
			icon: "text-purple-600 dark:text-purple-400",
			value: "text-purple-600 dark:text-purple-400",
		},
	};

	if (variant === "secondary") {
		return (
			<div className="flex flex-col items-center justify-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600">
				<span
					className={cn("text-lg font-bold", colorClasses[colorScheme].value)}
				>
					{value}
				</span>
				<span className="text-xs font-semibold text-muted-foreground">
					{label}
				</span>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-2 p-4 rounded-lg border",
				colorClasses[colorScheme].bg,
				colorClasses[colorScheme].border,
			)}
		>
			{Icon && (
				<Icon
					className={cn(
						iconSizeClasses[iconSize],
						colorClasses[colorScheme].icon,
					)}
				/>
			)}
			<span className="text-2xl font-bold">{value}</span>
			<span className="text-xs font-semibold text-muted-foreground">
				{label}
			</span>
		</div>
	);
}
