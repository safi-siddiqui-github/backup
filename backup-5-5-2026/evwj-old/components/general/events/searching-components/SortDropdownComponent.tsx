"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownWideNarrow } from "lucide-react";
import { Coordinates } from "@/lib/geo";

interface SortDropdownComponentProps {
	sortBy: string;
	onSortChange: (value: string) => void;
	userLocation: Coordinates | null;
}

export default function SortDropdownComponent({
	sortBy,
	onSortChange,
	userLocation,
}: SortDropdownComponentProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					<ArrowDownWideNarrow />
					<span>Sort By</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Select order</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
					<DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
					{userLocation && (
						<DropdownMenuRadioItem value="distance">
							Distance
						</DropdownMenuRadioItem>
					)}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
