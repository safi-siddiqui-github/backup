"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { BsCamera, BsFolder, BsPlayCircle } from "react-icons/bs";

export default function MediaCenterCardDataComponent() {
	//
	const cardData = useMemo(
		() => [
			{
				title: "Total Photos",
				quantity: 247,
				icon: BsCamera,
			},
			{
				title: "Total Videos",
				quantity: 12,
				icon: BsPlayCircle,
			},
			{
				title: "Total Albums",
				quantity: 8,
				icon: BsFolder,
			},
			{
				title: "Total Sub-Albums",
				quantity: 1,
				icon: BsFolder,
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
					<CardTitle>Media Center</CardTitle>
					{/*  */}
					<CardDescription>Organized Albums & Guest Uploads</CardDescription>
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
