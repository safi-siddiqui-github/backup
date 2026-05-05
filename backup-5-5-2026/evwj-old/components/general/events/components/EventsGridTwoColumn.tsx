"use client";

import { Button } from "@/components/ui/button";
import { memo } from "react";
import EventCardComponent from "../../card/EventCardComponent";
import EventCardSkeleton from "../../card/EventCardSkeleton";
import { EventWithDistance } from "../utils/eventFiltering";

interface EventsGridProps {
	events: EventWithDistance[];
	isFiltering: boolean;
	hasActiveFilters: boolean;
	onClearAllFilters: () => void;
	// Abdel changes(Event map corresponding glowing): hover callback to notify parent
	onEventHover?: (slug: string | null) => void;
}

const EventsGridTwoColumn = memo(function EventsGrid({
	events,
	isFiltering,
	hasActiveFilters,
	onClearAllFilters,
	// Abdel changes(Event map corresponding glowing)
	onEventHover,
}: EventsGridProps) {
	if (isFiltering) {
		return (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
				{Array.from({ length: 12 }).map((_, index) => (
					<div key={index}>
						<EventCardSkeleton />
					</div>
				))}
			</div>
		);
	}

	if (events.length === 0 && !isFiltering) {
		return (
			<div className="text-muted-foreground flex flex-col items-center justify-center gap-4 py-20 text-center">
				<p className="text-lg font-medium">No events found</p>
				<p className="text-sm">
					Try adjusting your filters or request an event from us
				</p>
				{hasActiveFilters && (
					<div className="flex gap-2">
						<Button onClick={onClearAllFilters} variant="outline" size="sm">
							Clear All Filters
						</Button>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
			{events.map((event, index) => (
				<div
					key={`${event.slug || ""}-${index}`}
					// Abdel changes(Event map corresponding glowing): emit slug on hover to glow marker
					onMouseEnter={() => onEventHover?.(event.slug || null)}
					onMouseLeave={() => onEventHover?.(null)}
				>
					<EventCardComponent item={event} distanceKm={event.distanceKm} />
				</div>
			))}
		</div>
	);
});

export default EventsGridTwoColumn;
