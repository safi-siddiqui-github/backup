"use client";

import { Calendar } from "lucide-react";
import { GuestProfile } from "../GuestProfileDrawer";

interface EventHistorySectionProps {
	events: GuestProfile["eventHistory"];
}

export default function EventHistorySection({
	events,
}: EventHistorySectionProps) {
	return (
		<section className="space-y-4">
			<div className="flex items-center gap-2 text-sm font-semibold">
				<Calendar className="h-4 w-4 text-muted-foreground" />
				Event History
			</div>
			<div className="space-y-3">
				{events.map((event) => (
					<div
						key={event.name}
						className="rounded-lg bg-[#FCFCFC] p-4 flex flex-col gap-2"
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-semibold">{event.name}</p>
								<p className="text-sm text-muted-foreground">
									{event.date} • {event.type}
								</p>
							</div>
							<span className="font-semibold text-green-600">
								${event.amount.toLocaleString()}
							</span>
						</div>
						<div className="text-xs border p-1 px-2 rounded-full w-fit font-bold">
							{event.ticketType}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
