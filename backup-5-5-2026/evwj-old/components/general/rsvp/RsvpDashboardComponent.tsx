"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, PartyPopper } from "lucide-react";
import { useMemo } from "react";

export default function RsvpDashboardComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	const dataCards = useMemo(
		() => [
			{
				title: "Total Invited",
				content: 5,
				// contentColor: "",
			},
			{
				title: "Attending",
				content: 2,
				contentColor: "text-green-700 dark:text-green-400",
			},
			{
				title: "Pending",
				content: 1,
				contentColor: "text-orange-700 dark:text-orange-400",
			},
			{
				title: "Declined",
				content: 1,
				contentColor: "text-red-700 dark:text-red-400",
			},
			{
				title: "Response Rate",
				content: "80%",
				contentColor: "text-blue-700 dark:text-blue-400",
			},
		],
		[],
	);
	//
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap gap-4 *:data-[slot=card]:rounded-md">
				{/*  */}

				{/*  */}
				{dataCards?.map((item, index) => {
					return (
						<Card
							key={index}
							className="!bg-white dark:!bg-[#020617] backdrop-blur-sm flex-1 [background-color:white] dark:[background-color:#020617]"
						>
							{/*  */}

							{/*  */}
							<CardContent className="flex flex-col gap-1">
								{/*  */}

								{/*  */}
								<p className="text-sm font-semibold tracking-tight text-foreground">
									{item?.title}
								</p>
								{/*  */}

								{/*  */}
								<CardTitle
									className={cn(`text-2xl font-bold ${item?.contentColor}`, {})}
								>
									{item?.content}
								</CardTitle>
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
			<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-1">
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
						{/*  */}
						<PartyPopper className="size-7" />
						{/*  */}
						<p className="text-xl font-bold tracking-tight">Recent Activity</p>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<p className="text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400">
						Hot off the press! Your latest RSVP responses
					</p>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					{Array.from({ length: 3 })?.map((item, index) => {
						return (
							<Card
								key={index}
								className="rounded-md p-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 [background-color:white] dark:[background-color:#020617]"
							>
								{/*  */}

								{/*  */}
								<CardContent className="flex flex-wrap items-center justify-between gap-4 px-2">
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap items-center gap-4">
										{/*  */}

										{/*  */}
										<Avatar className="size-14">
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										{/*  */}

										{/*  */}
										<div className="flex flex-col gap-1">
											{/*  */}

											{/*  */}
											<CardTitle>John Doe</CardTitle>
											{/*  */}

											{/*  */}
											<div className="flex items-center gap-1">
												{/*  */}
												<Calendar className="size-5" />
												{/*  */}
												<p className="text-sm font-medium">21/01/2024</p>
												{/*  */}
											</div>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<Badge className="bg-green-500">
										<PartyPopper />
										Coming
									</Badge>
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
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
		</div>
	);
}
