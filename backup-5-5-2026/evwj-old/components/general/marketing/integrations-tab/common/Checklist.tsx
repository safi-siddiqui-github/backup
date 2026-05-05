"use client";

import { CheckCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistProps {
	items: string[];
	icon?: LucideIcon;
	iconClassName?: string;
	itemClassName?: string;
	containerClassName?: string;
}

export default function Checklist({
	items,
	icon: Icon = CheckCircle,
	iconClassName = "h-4 w-4 text-green-600",
	itemClassName,
	containerClassName,
}: ChecklistProps) {
	return (
		<div
			className={cn("space-y-2 bg-muted/50 rounded-md p-3", containerClassName)}
		>
			{items.map((item, index) => (
				<div
					key={index}
					className={cn("flex items-center gap-4", itemClassName)}
				>
					<Icon className={iconClassName} />
					<span className="text-sm">{item}</span>
				</div>
			))}
		</div>
	);
}
