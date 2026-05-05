"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Users, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AvatarGroup from "../common/AvatarGroup";
import { AvatarProps } from "../common/Avatar";

export interface SegmentCardProps {
	title: string;
	description: string;
	guestCount: number;
	avatars?: Omit<AvatarProps, "size" | "className">[];
	onEdit?: () => void;
	onDelete?: () => void;
	onClick?: () => void;
	className?: string;
}

export default function SegmentCard({
	title,
	description,
	guestCount,
	avatars = [],
	onEdit,
	onDelete,
	onClick,
	className,
}: SegmentCardProps) {
	return (
		<Card
			className={cn(
				"rounded-md bg-white dark:bg-slate-800/95 cursor-pointer py-4 px-2 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg",
				className,
			)}
			onClick={onClick}
		>
			<CardContent className="px-4 sm:px-5 md:px-6">
				{/* Header with title and menu */}
				<div className="flex items-start justify-between mb-2 sm:mb-3">
					<h3 className="text-base sm:text-lg md:text-xl font-semibold pr-2 flex-1">
						{title}
					</h3>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							onClick={(e) => e.stopPropagation()}
						>
							<DropdownMenuItem
								onClick={(e) => {
									e.stopPropagation();
									onEdit?.();
								}}
							>
								<Edit className="h-4 w-4 mr-2" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								variant="destructive"
								onClick={(e) => {
									e.stopPropagation();
									onDelete?.();
								}}
							>
								<Trash2 className="h-4 w-4 mr-2" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Description */}
				<p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4">
					{description}
				</p>

				{/* Avatars and Guest Count Row */}
				<div className="flex items-center  gap-3 flex-wrap sm:flex-nowrap">
					{avatars.length > 0 ? (
						<AvatarGroup avatars={avatars} size="md" />
					) : (
						<div />
					)}
					<div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
						<Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 shrink-0" />
						<span className="text-xs sm:text-sm md:text-base font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
							{guestCount.toLocaleString()}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
