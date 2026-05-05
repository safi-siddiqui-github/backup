"use client";

import StatsHighlightCard from "./StatsHighlightCard";
import { GuestProfile } from "../GuestProfileDrawer";

interface GuestStatsSectionProps {
	guest: GuestProfile;
}

export default function GuestStatsSection({ guest }: GuestStatsSectionProps) {
	const stats = [
		{
			label: "Events Attended",
			value: guest.eventsAttended,
			color: "text-blue-600",
		},
		{
			label: "Total Spent",
			value: `$${guest.totalSpent.toLocaleString()}`,
			color: "text-green-600",
		},
		{
			label: "Plus Ones",
			value: guest.plusOnes,
			color: "text-foreground",
		},
	];

	return (
		<section className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{stats.map((stat) => (
					<StatsHighlightCard
						key={stat.label}
						label={stat.label}
						value={stat.value}
						valueClassName={stat.color}
					/>
				))}
			</div>
		</section>
	);
}
