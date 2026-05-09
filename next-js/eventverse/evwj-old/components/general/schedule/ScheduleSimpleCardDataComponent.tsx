"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Calendar, CalendarCheck, Clock } from "lucide-react";
import { useMemo } from "react";

export default function ScheduleSimpleCardDataComponent() {
	//
	const cardsData = useMemo(
		() => [
			{
				title: "Total Schedule Items",
				quantity: 3,
				description: "Across all days",
				icon: Calendar,
			},
			{
				title: "Event Duration",
				quantity: 3,
				description: "Multi-day event",
				icon: Clock,
			},
			{
				title: "Today's Agenda",
				quantity: 3,
				description: "Items scheduled",
				icon: CalendarCheck,
			},
		],
		[],
	);
	//
	return (
		<div className="flex flex-col">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap gap-4">
				{/*  */}

				{/*  */}
				{cardsData?.map((item, index) => {
					return (
						<Card key={index} className="flex-1">
							{/*  */}

							{/*  */}
							<CardContent className="flex justify-between gap-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-col">
									{/*  */}

									{/*  */}
									<p className="font-medium">{item?.title}</p>
									{/*  */}

									{/*  */}
									<CardTitle className="text-3xl">{item?.quantity}</CardTitle>
									{/*  */}

									{/*  */}
									<CardDescription>{item?.description}</CardDescription>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<Button size={"icon-lg"}>
									<item.icon />
								</Button>
								{/*  */}

								{/*  */}
							</CardContent>
							{/*  */}

							{/*  */}
						</Card>
					);
				})}
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
