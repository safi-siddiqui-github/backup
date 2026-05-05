"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { BsStack } from "react-icons/bs";

export default function SeatingCardDataComponent() {
	//
	const cardData = useMemo(
		() => [
			{
				title: "Total Arrangements",
				quantity: 10,
				icon: BsStack,
			},
			{
				title: "Total Tables",
				quantity: 10,
				icon: BsStack,
			},
			{
				title: "Total Capacity",
				quantity: 10,
				icon: BsStack,
			},
			{
				title: "Assigned Seats",
				quantity: 10,
				icon: BsStack,
			},
		],
		[],
	);
	//
	return (
		<div className="flex flex-col gap-4">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col">
					{/*  */}
					<CardTitle>Seating Arrangement</CardTitle>
					{/*  */}
					<CardDescription>
						Manage all your venue layouts and seating plans
					</CardDescription>
					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{/*  */}

				{/*  */}
				{cardData?.map((item, index) => {
					return (
						<Card key={index}>
							{/*  */}

							{/*  */}
							<CardContent className="flex items-center justify-between">
								{/*  */}

								{/*  */}
								<div className="flex flex-col">
									{/*  */}
									<CardDescription>{item.title}</CardDescription>
									{/*  */}
									<CardTitle className="text-2xl">{item.quantity}</CardTitle>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<item.icon className="size-8" />
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
