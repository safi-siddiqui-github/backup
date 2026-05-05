"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
	title: string;
	value: ReactNode;
	icon: LucideIcon;
	trend?: {
		value: number;
		label: string;
	};
	iconClassName?: string;
	className?: string;
}

export function StatCard({
	title,
	value,
	icon: Icon,
	trend,
	iconClassName = "from-blue-500/20 to-blue-600/10",
	className,
}: StatCardProps) {
	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
				className,
			)}
		>
			{/* Glass-morphism background effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-sm" />

			{/* Content */}
			<div className="relative z-10 p-6">
				<div className="flex items-start justify-between gap-4">
					{/* Left: Icon */}
					<div
						className={cn(
							"p-3 rounded-xl bg-gradient-to-br",
							iconClassName,
							"transition-transform duration-300 group-hover:scale-110",
						)}
					>
						<Icon className="w-5 h-5 text-foreground/80" />
					</div>

					{/* Right: Value and Title */}
					<div className="flex-1 text-right">
						<p className="text-sm font-medium text-muted-foreground mb-1">
							{title}
						</p>
						<div className="text-3xl font-bold text-foreground mb-1">
							{value}
						</div>
						{trend && (
							<p className="text-xs text-muted-foreground">
								<span
									className={
										trend.value >= 0
											? "text-green-600 dark:text-green-400"
											: "text-red-600 dark:text-red-400"
									}
								>
									{trend.value >= 0 ? "+" : ""}
									{trend.value}%
								</span>{" "}
								{trend.label}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Hover gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
		</div>
	);
}
