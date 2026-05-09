"use client";

import { Card } from "@/components/ui/card";

interface BudgetHeaderStatsProps {
	stats: {
		committedBudget: string;
		eventDate: string;
		guests: number;
		eventType: string;
	};
}

export default function BudgetHeaderStats({ stats }: BudgetHeaderStatsProps) {
	return (
		<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] mb-6 p-6">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{/* Committed Budget */}
				<div className="flex flex-col">
					<span className="text-sm text-muted-foreground mb-1">
						Committed Budget
					</span>
					<span className="text-xl font-semibold">{stats.committedBudget}</span>
				</div>

				{/* Event Date */}
				<div className="flex flex-col">
					<span className="text-sm text-muted-foreground mb-1">Event Date</span>
					<span className="text-xl font-semibold">{stats.eventDate}</span>
				</div>

				{/* Guests */}
				<div className="flex flex-col">
					<span className="text-sm text-muted-foreground mb-1">Guests</span>
					<span className="text-xl font-semibold">{stats.guests}</span>
				</div>

				{/* Event Type */}
				<div className="flex flex-col">
					<span className="text-sm text-muted-foreground mb-1">Event Type</span>
					<span className="text-xl font-semibold">{stats.eventType}</span>
				</div>
			</div>
		</Card>
	);
}
