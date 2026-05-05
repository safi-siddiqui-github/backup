"use client";

import { cn } from "@/lib/utils";
import Avatar, { AvatarProps } from "./Avatar";

export interface AvatarGroupProps {
	avatars: Omit<AvatarProps, "size">[];
	size?: "sm" | "md" | "lg";
	max?: number;
	overlap?: boolean;
	className?: string;
}

export default function AvatarGroup({
	avatars,
	size = "md",
	max,
	overlap = true,
	className,
}: AvatarGroupProps) {
	const displayAvatars = max ? avatars.slice(0, max) : avatars;
	const remainingCount = max && avatars.length > max ? avatars.length - max : 0;

	return (
		<div
			className={cn(
				"flex items-center",
				overlap ? "-space-x-2" : "gap-2",
				className,
			)}
		>
			{displayAvatars.map((avatar, index) => (
				<Avatar
					key={index}
					initials={avatar.initials}
					color={avatar.color}
					size={size}
				/>
			))}
			{remainingCount > 0 && (
				<div
					className={cn(
						"rounded-full flex items-center justify-center text-white font-medium border-2 border-white dark:border-slate-800 shrink-0 bg-gray-500",
						size === "sm" && "w-7 h-7 sm:w-8 sm:h-8 text-xs",
						size === "md" && "w-8 h-8 text-xs",
						size === "lg" && "w-10 h-10 text-sm",
					)}
				>
					+{remainingCount}
				</div>
			)}
		</div>
	);
}
