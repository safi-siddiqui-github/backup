"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterDropdownProps {
	categories: string[];
	selectedCategories: string[];
	onCategoryToggle: (category: string) => void;
}

export default function CategoryFilterDropdown({
	categories,
	selectedCategories,
	onCategoryToggle,
}: CategoryFilterDropdownProps) {
	const hasSelection = selectedCategories.length > 0;
	const displayText = hasSelection
		? selectedCategories.length === 1
			? selectedCategories[0]
			: `${selectedCategories.length} selected`
		: "Event type";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="justify-between gap-1.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
					<div className="flex items-center gap-1.5">
						<Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
						<span className="truncate">{displayText}</span>
					</div>
					<ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50 shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuLabel>Event type</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{categories.map((cat) => {
					const isSelected = selectedCategories.includes(cat);
					return (
						<DropdownMenuCheckboxItem
							key={cat}
							checked={isSelected}
							onCheckedChange={() => onCategoryToggle(cat)}
							onSelect={(e) => e.preventDefault()}
						>
							{cat}
						</DropdownMenuCheckboxItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
