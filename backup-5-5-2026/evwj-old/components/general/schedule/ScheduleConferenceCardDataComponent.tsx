"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import { useMemo } from "react";

export default function ScheduleConferenceCardDataComponent() {
	//
	const cardsData = useMemo(
		() => [
			{
				quantity: 3,
				description: "Conference Days",
				icon: Calendar,
			},
			{
				quantity: 30,
				description: "Total Sessions",
				icon: Clock,
			},
			{
				quantity: 2269,
				description: "Total Registrations",
				icon: Users,
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
