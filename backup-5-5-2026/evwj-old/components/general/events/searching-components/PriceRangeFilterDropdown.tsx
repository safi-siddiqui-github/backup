"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { DollarSign, ChevronDown, X } from "lucide-react";
import { MockEventData } from "@/type";
import PriceHistogram from "../PriceHistogram";
import { cn } from "@/lib/utils";

interface PriceRangeFilterDropdownProps {
	priceRange: [number, number];
	onPriceRangeChange: (value: number[]) => void;
	events: MockEventData[];
	dataMinPrice: number;
	dataMaxPrice: number;
}

export default function PriceRangeFilterDropdown({
	priceRange,
	onPriceRangeChange,
	events,
	dataMinPrice,
	dataMaxPrice,
}: PriceRangeFilterDropdownProps) {
	const isDefaultPrice =
		priceRange[0] === dataMinPrice && priceRange[1] === dataMaxPrice;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="justify-between gap-1.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
					<div className="flex items-center gap-1.5">
						<DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
						<span className="truncate">
							{isDefaultPrice
								? "Price"
								: `$${priceRange[0]} - $${priceRange[1]}`}
						</span>
					</div>
					{!isDefaultPrice ? (
						<X
							className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50 hover:opacity-100 shrink-0"
							onClick={(e) => {
								e.stopPropagation();
								onPriceRangeChange([dataMinPrice, dataMaxPrice]);
							}}
						/>
					) : (
						<ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50 shrink-0" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-4" align="start">
				<div className="flex flex-col gap-4">
					<div>
						<h4 className="text-sm font-medium mb-2">Price Range</h4>
						<p className="text-xs text-muted-foreground mb-4">
							Trip price, includes all fees
						</p>
					</div>
					<PriceHistogram
						events={events}
						minPrice={dataMinPrice}
						maxPrice={dataMaxPrice}
						selectedMin={priceRange[0]}
						selectedMax={priceRange[1]}
						className="my-2"
					/>
					<Slider
						value={priceRange}
						onValueChange={onPriceRangeChange}
						max={dataMaxPrice}
						min={dataMinPrice}
						step={5}
						className="w-full"
						aria-label="Price Range"
					/>
					<div className="flex justify-between mt-2">
						<div className="flex flex-col items-center">
							<label className="text-xs text-muted-foreground mb-1">
								Minimum
							</label>
							<div className="bg-muted px-3 py-1.5 rounded-lg font-semibold text-sm">
								${priceRange[0]}
							</div>
						</div>
						<div className="flex flex-col items-center">
							<label className="text-xs text-muted-foreground mb-1">
								Maximum
							</label>
							<div className="bg-muted px-3 py-1.5 rounded-lg font-semibold text-sm">
								${priceRange[1]}
								{priceRange[1] === dataMaxPrice ? "+" : ""}
							</div>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

