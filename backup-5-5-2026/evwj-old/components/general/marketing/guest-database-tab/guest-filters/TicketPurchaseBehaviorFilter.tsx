"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface TicketPurchaseBehaviorFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function TicketPurchaseBehaviorFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: TicketPurchaseBehaviorFilterProps) {
	return (
		<FilterSection
			title="Ticket Purchase Behavior"
			isOpen={isOpen}
			onToggle={onToggle}
		>
			<div className="space-y-4 pt-2">
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						Avg Ticket Price
					</Label>
					<Slider
						value={filters.avgTicketPrice}
						onValueChange={(value) =>
							onUpdate("avgTicketPrice", value as [number, number])
						}
						min={0}
						max={500}
						step={10}
						className="mb-2"
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>${filters.avgTicketPrice[0]}</span>
						<span>${filters.avgTicketPrice[1]}</span>
					</div>
				</div>
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						Total Tickets Purchased
					</Label>
					<Slider
						value={filters.totalTicketsPurchased}
						onValueChange={(value) =>
							onUpdate("totalTicketsPurchased", value as [number, number])
						}
						min={0}
						max={20}
						step={1}
						className="mb-2"
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>{filters.totalTicketsPurchased[0]}</span>
						<span>{filters.totalTicketsPurchased[1]}</span>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="multi-ticket"
						checked={filters.multiTicketBuyersOnly}
						onCheckedChange={(checked) =>
							onUpdate("multiTicketBuyersOnly", Boolean(checked))
						}
					/>
					<Label htmlFor="multi-ticket" className="text-sm cursor-pointer">
						Multi-ticket buyers only (2+ tickets)
					</Label>
				</div>
			</div>
		</FilterSection>
	);
}
