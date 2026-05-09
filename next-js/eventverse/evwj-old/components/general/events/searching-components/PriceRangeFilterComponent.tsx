"use client";

import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { MockEventData } from "@/type";
import PriceHistogram from "../PriceHistogram";

interface PriceRangeFilterComponentProps {
	priceRange: [number, number];
	onPriceRangeChange: (value: number[]) => void;
	events: MockEventData[];
	dataMinPrice: number;
	dataMaxPrice: number;
}

export default function PriceRangeFilterComponent({
	priceRange,
	onPriceRangeChange,
	events,
	dataMinPrice,
	dataMaxPrice,
}: PriceRangeFilterComponentProps) {
	return (
		<div className="flex flex-col gap-2">
			<Field>
				<FieldTitle className="text-lg">Price range</FieldTitle>
				<FieldDescription className="text-sm text-muted-foreground">
					Trip price, includes all fees
				</FieldDescription>
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
					className="mt-2 w-full"
					aria-label="Price Range"
				/>
				<div className="flex justify-between mt-4">
					<div className="flex flex-col items-center">
						<label className="text-sm text-muted-foreground mb-1">
							Minimum
						</label>
						<div className="bg-muted px-4 py-2 rounded-lg font-semibold">
							${priceRange[0]}
						</div>
					</div>
					<div className="flex flex-col items-center">
						<label className="text-sm text-muted-foreground mb-1">
							Maximum
						</label>
						<div className="bg-muted px-4 py-2 rounded-lg font-semibold">
							${priceRange[1]}
							{priceRange[1] === dataMaxPrice ? "+" : ""}
						</div>
					</div>
				</div>
			</Field>
		</div>
	);
}
