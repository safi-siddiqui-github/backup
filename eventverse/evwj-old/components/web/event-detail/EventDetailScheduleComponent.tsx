"use client";
import { cn } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";

export default function EventDetailScheduleComponent() {
	const scheduleData = useMemo(
		() => [
			{
				category: "Networking",
				categoryColor: "purple",
				timeRange: "08:00 AM - 09:00 AM",
				name: "Registration & Coffee",
				locationName: "Main Lobby",
			},
			{
				category: "Keynote",
				categoryColor: "blue",
				timeRange: "09:00 AM - 10:00 AM",
				name: "Opening Keynote",
				locationName: "Main Auditorium",
			},
			{
				category: "AI & ML",
				categoryColor: "red",
				timeRange: "10:00 AM - 11:00 AM",
				name: "Learning AI ML",
				locationName: "Main Reception Hall",
			},
		],
		[],
	);

	const conferenceData = useMemo(
		() => [
			{
				eventDate: "Friday 11, June 2025",
				eventDateFilter: "Fri 11, Jun",
				subEvents: [
					{
						category: "Workshop",
						categoryColor: "green",
						timeRange: "08:00 AM - 09:00 AM",
						name: "AI Workshop",
						locationName: "Workshop Room 1",
					},
					{
						category: "Networking",
						categoryColor: "orange",
						timeRange: "10:00 AM - 11:00 AM",
						name: "Networking Lunch",
						locationName: "Dining Hall",
					},
					{
						category: "Showcase",
						categoryColor: "purple",
						timeRange: "08:00 AM - 09:00 AM",
						name: "Registration & Coffee",
						locationName: "Main Lobby",
					},
				],
			},
			{
				eventDate: "Saturday 12, June 2025",
				eventDateFilter: "Sat 12, Jun",
				subEvents: [
					{
						category: "Networking",
						categoryColor: "purple",
						timeRange: "08:00 AM - 09:00 AM",
						name: "Registration & Coffee",
						locationName: "Main Lobby",
					},
					{
						category: "Keynote",
						categoryColor: "blue",
						timeRange: "09:00 AM - 10:00 AM",
						name: "Opening Keynote",
						locationName: "Main Auditorium",
					},
					{
						category: "AI & ML",
						categoryColor: "red",
						timeRange: "10:00 AM - 11:00 AM",
						name: "Learning AI ML",
						locationName: "Main Reception Hall",
					},
				],
			},
		],
		[],
	);
	const conferenceFilters = useMemo(
		() => [...conferenceData?.map((item) => item?.eventDateFilter)],
		[],
	);
	const [selectedCF, setSelectedCF] = useState(conferenceFilters[0]);
	const conferenceFiltered = useMemo(
		() => conferenceData?.find((item) => item?.eventDateFilter === selectedCF),
		[selectedCF],
	);
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4">
					<p className="text-xl font-semibold">Friday, March 15 2025</p>
					<div className="flex flex-col gap-3">
						{scheduleData?.map((item, index) => {
							return (
								<div key={index} className="flex flex-wrap md:gap-4">
									<div className="hidden flex-col items-center md:flex">
										<Clock />
										<div className="w-0.5 flex-1 rounded-full bg-current"></div>
									</div>
									<div className="flex flex-1 flex-col gap-2 rounded-md bg-white p-4 shadow dark:bg-blue-900/30">
										<div className="flex flex-wrap items-center gap-2">
											<div
												className={cn(
													"rounded-full px-2 py-1 text-xs font-medium text-white",
													{
														"bg-purple-500": item?.categoryColor === "purple",
														"bg-red-500": item?.categoryColor === "red",
														"bg-blue-500": item?.categoryColor === "blue",
													},
												)}
											>
												{item?.category}
											</div>
											<p className="text-sm font-medium">{item?.timeRange}</p>
										</div>
										<p className="text-lg font-semibold">{item?.name}</p>
										<div className="flex flex-wrap items-center gap-2">
											<MapPin className="size-4" />
											<p className="text-sm font-medium">
												{item?.locationName}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center gap-2 *:data-[state-conference-filter=active]:bg-blue-500 *:data-[state-conference-filter=active]:text-white *:data-[state-conference-filter=inactive]:bg-white *:data-[state-conference-filter=inactive]:text-black">
					{conferenceFilters?.map((item, index) => {
						return (
							<button
								key={index}
								onClick={() => setSelectedCF(item)}
								className="rounded-full px-4 py-2 text-sm font-medium"
								data-state-conference-filter={
									item === selectedCF ? "active" : "inactive"
								}
							>
								{item}
							</button>
						);
					})}
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-xl font-semibold">
						{conferenceFiltered?.eventDate}
					</p>
					<div className="flex flex-col gap-3">
						{conferenceFiltered?.subEvents?.map((item, index) => {
							return (
								<div key={index} className="flex flex-wrap md:gap-4">
									<div className="hidden flex-col items-center md:flex">
										<Clock />
										<div className="w-0.5 flex-1 rounded-full bg-current"></div>
									</div>
									<div className="flex flex-1 flex-col gap-2 rounded-md bg-white p-4 shadow dark:bg-blue-900/30">
										<div className="flex flex-wrap items-center gap-2">
											<div
												className={cn(
													"rounded-full px-2 py-1 text-xs font-medium text-white",
													{
														"bg-purple-500": item?.categoryColor === "purple",
														"bg-red-500": item?.categoryColor === "red",
														"bg-blue-500": item?.categoryColor === "blue",
														"bg-green-500": item?.categoryColor === "green",
														"bg-orange-500": item?.categoryColor === "orange",
													},
												)}
											>
												{item?.category}
											</div>
											<p className="text-sm font-medium">{item?.timeRange}</p>
										</div>
										<p className="text-lg font-semibold">{item?.name}</p>
										<div className="flex flex-wrap items-center gap-2">
											<MapPin className="size-4" />
											<p className="text-sm font-medium">
												{item?.locationName}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
