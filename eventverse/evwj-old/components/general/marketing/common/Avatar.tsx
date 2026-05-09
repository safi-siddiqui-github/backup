"use client";

import { cn } from "@/lib/utils";

export interface AvatarProps {
	initials: string;
	color: string;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizeClasses = {
	sm: "w-7 h-7 sm:w-8 sm:h-8 text-xs",
	md: "w-8 h-8 text-xs",
	lg: "w-10 h-10 text-sm",
};

export default function Avatar({
	initials,
	color,
	size = "md",
	className,
}: AvatarProps) {
	return (
		<div
			className={cn(
				"rounded-full flex items-center justify-center text-white font-medium border-2 border-white dark:border-slate-800 shrink-0",
				sizeClasses[size],
				color,
				className,
			)}
		>
			{initials}
		</div>
	);
}
