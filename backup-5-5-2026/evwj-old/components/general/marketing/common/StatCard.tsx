"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AvatarGroup from "./AvatarGroup";

export interface BreakdownItem {
	name: string;
	count: number;
	icon: LucideIcon;
}

export interface AvatarItem {
	initials: string;
	color: string;
}

export interface StatusItem {
	text: string;
	icon?: LucideIcon;
	color?: string;
}

export interface StatCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon: LucideIcon;
	color: "blue" | "green" | "purple" | "pink";
	breakdown?: BreakdownItem[];
	avatars?: AvatarItem[];
	status?: StatusItem;
	className?: string;
}

const colorClasses = {
	blue: {
		card: "bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30",
		iconBg: "bg-blue-100 dark:bg-blue-900/30",
		iconColor: "text-blue-600 dark:text-blue-400",
		progressBar: "bg-blue-500",
	},
	green: {
		card: "bg-green-50/50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30",
		iconBg: "bg-green-100 dark:bg-green-900/30",
		iconColor: "text-green-600 dark:text-green-400",
		progressBar: "bg-green-500",
	},
	purple: {
		card: "bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30",
		iconBg: "bg-purple-100 dark:bg-purple-900/30",
		iconColor: "text-purple-600 dark:text-purple-400",
		progressBar: "bg-purple-500",
	},
	pink: {
		card: "bg-pink-50/50 dark:bg-pink-950/20 border-pink-100 dark:border-pink-900/30",
		iconBg: "bg-pink-100 dark:bg-pink-900/30",
		iconColor: "text-pink-600 dark:text-pink-400",
		progressBar: "bg-pink-500",
	},
};

export default function StatCard({
	title,
	value,
	subtitle,
	icon: Icon,
	color,
	breakdown,
	avatars,
	status,
	className,
}: StatCardProps) {
	const colors = colorClasses[color];

	return (
		<Card
			className={cn(
				"rounded-md backdrop-blur-sm transition-all hover:shadow-md",
				colors.card,
				className,
			)}
		>
			<CardContent className="p-4 sm:p-6">
				{/* Header */}
				<div className="flex items-start justify-between mb-4 sm:mb-6">
					<span className="text-xs sm:text-sm text-muted-foreground">
						{title}
					</span>
					<div
						className={cn(
							"w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0",
							colors.iconBg,
						)}
					>
						<Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", colors.iconColor)} />
					</div>
				</div>

				{/* Main Content */}
				<div className="flex flex-col">
					{/* Value */}
					<span className="text-2xl sm:text-3xl font-bold mb-2">{value}</span>

					{/* Subtitle */}
					{subtitle && (
						<span className="text-xs text-muted-foreground mb-3 sm:mb-4">
							{subtitle}
						</span>
					)}

					{/* Status */}
					{status && (
						<div className="flex items-center gap-1 mb-3 sm:mb-4">
							{status.icon && (
								<status.icon
									className={cn("h-3 w-3", status.color || "text-green-600")}
								/>
							)}
							<span
								className={cn(
									"text-xs font-medium",
									status.color || "text-green-600",
								)}
							>
								{status.text}
							</span>
						</div>
					)}

					{/* Breakdown List */}
					{breakdown && breakdown.length > 0 && (
						<div className="space-y-2 sm:space-y-3">
							{breakdown.map((item, index) => {
								const ItemIcon = item.icon;
								const maxCount = Math.max(...breakdown.map((i) => i.count));
								const percentage = (item.count / maxCount) * 100;
								return (
									<div
										key={index}
										className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap"
									>
										<ItemIcon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
										<div className="flex-1 flex items-center gap-2 min-w-0">
											<span className="text-xs sm:text-sm text-muted-foreground min-w-[60px] sm:min-w-[80px] truncate">
												{item.name}
											</span>
											<div className="flex-1 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden min-w-[60px]">
												<div
													className={cn(
														"h-full rounded-full transition-all",
														colors.progressBar,
													)}
													style={{ width: `${percentage}%` }}
												/>
											</div>
										</div>
										<span className="text-xs sm:text-sm font-medium min-w-[20px] text-right">
											{item.count}
										</span>
									</div>
								);
							})}
						</div>
					)}

					{/* Avatars */}
					{avatars && avatars.length > 0 && (
						<AvatarGroup avatars={avatars} size="sm" />
					)}
				</div>
			</CardContent>
		</Card>
	);
}
