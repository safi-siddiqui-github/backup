"use client";

import { useState } from "react";
import {
	Clock,
	Users,
	Music,
	Heart,
	Utensils,
	Calendar,
	LucideIcon,
	MapPin,
} from "lucide-react";
import ConferenceModeView from "./conferrence-mood";

type Event = {
	time: string;
	title: string;
	description: string;
	location: string;
	icon: LucideIcon;
	tag: string;
	tagColorClass: string;
	iconBgColorClass: string;
};

const events: Event[] = [
	{
		time: "2:00 PM",
		title: "Guest Arrival & Welcome",
		description: "Welcome drinks and light appetizers",
		location: "Garden Entrance",
		icon: Users,
		tag: "arrival",
		tagColorClass:
			"bg-indigo-100 text-indigo-800 dark:bg-[#090a11] dark:text-white",
		iconBgColorClass: "bg-indigo-500 dark:bg-indigo-700",
	},
	{
		time: "3:00 PM",
		title: "Pre-Ceremony Music",
		description: "String quartet performance",
		location: "Rose Garden",
		icon: Music,
		tag: "music",
		tagColorClass:
			"bg-emerald-100 text-emerald-800 dark:bg-[#090a11] dark:text-white",
		iconBgColorClass: "bg-emerald-500 dark:bg-emerald-700",
	},
	{
		time: "4:00 PM",
		title: "Wedding Ceremony",
		description: "The main ceremony begins",
		location: "Garden Altar",
		icon: Heart,
		tag: "ceremony",
		tagColorClass:
			"bg-rose-100 text-rose-800 dark:bg-[#090a11] dark:text-white",
		iconBgColorClass: "bg-rose-500 dark:bg-rose-700",
	},
	{
		time: "4:30 PM",
		title: "Cocktail Hour",
		description: "Cocktails and canapés while couple takes photos",
		location: "Terrace",
		icon: Utensils,
		tag: "cocktails",
		tagColorClass:
			"bg-purple-100 text-purple-700 dark:bg-[#090a11] dark:text-white",
		iconBgColorClass: "bg-purple-500 dark:bg-purple-700",
	},
];

const EventItem: React.FC<Omit<Event, "icon"> & { Icon: LucideIcon }> = ({
	time,
	title,
	description,
	location,
	Icon,
	tag,
	iconBgColorClass,
	tagColorClass,
}) => (
	<div className="flex my-3 px-2 py-4 dark:bg-[#090a11] bg-white rounded-xl">
		<div className="w-1/9  shrink-0 p-4 text-lg font-bold text-gray-800 dark:text-white">
			{time}
		</div>

		<div className="relative mx-3 flex flex-col items-center">
			<div
				className={`relative z-10 p-2 rounded-full ${iconBgColorClass} shadow-sm`}
			>
				<Icon size={30} className="text-white" />
			</div>
		</div>

		<div className=" grow">
			<div className="flex justify-between items-start">
				<h3 className="text-xl font-semibold text-gray-800 dark:text-white">
					{title}
				</h3>
				{tag && (
					<span
						className={`ml-4 px-3 py-1 dark:bg-${iconBgColorClass} text-xs font-medium rounded-full ${tagColorClass}`}
					>
						{tag}
					</span>
				)}
			</div>
			<p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
			<div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mt-1">
				<MapPin size={14} className="mr-1.5 text-gray-400 dark:text-gray-200" />
				{location}
			</div>
		</div>
	</div>
);

const SimpleTimelineView: React.FC = () => (
	<div className="space-y-2 mx-auto">
		{events.map((event, index) => (
			<EventItem
				key={index}
				{...event}
				Icon={event.icon}
				tagColorClass={event.tagColorClass}
				iconBgColorClass={event.iconBgColorClass}
			/>
		))}
	</div>
);

export default function ScheduleTab() {
	const [activeView, setActiveView] = useState<"timeline" | "conference">(
		"timeline",
	);

	const isSimpleTimeline = activeView === "timeline";

	return (
		<div className="mx-auto  shadow-xl rounded-xl overflow-hidden">
			<div className="p-6 bg-linear-to-r from-pink-500 to-purple-600 text-white dark:bg-[#070b1c] dark:from-[#070b1c] dark:to-[#090a11]">
				<div className="text-center">
					<Clock size={32} className="mx-auto mb-2" />
					<h1 className="text-3xl font-bold">Event Schedule</h1>
					<p className="text-sm font-medium opacity-80 mt-1">
						Your timeline for{" "}
						<span className="font-extrabold">
							⭐ TEST EVENT – Guest Module Showcase
						</span>
					</p>
				</div>
			</div>

			<div className="p-4 dark:bg-[#090a11] bg-white">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-medium text-gray-700 dark:text-white">
						Schedule View
					</h2>
					<div className="flex space-x-2 p-1 dark:bg-[#070b1c] bg-gray-100 rounded-lg">
						<button
							onClick={() => setActiveView("timeline")}
							className={`flex items-center px-3 py-1 text-sm font-medium rounded-md transition-colors ${
								isSimpleTimeline
									? "dark:bg-[#090a11] bg-white text-purple-600 shadow"
									: "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#090a11]"
							}`}
						>
							<Clock size={16} className="mr-2" />
							Simple Timeline
						</button>
						<button
							onClick={() => setActiveView("conference")}
							className={`flex items-center px-3 py-1 text-sm font-medium rounded-md transition-colors ${
								!isSimpleTimeline
									? "dark:bg-[#090a11] bg-white text-purple-600 shadow"
									: "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#090a11]"
							}`}
						>
							<Users size={16} className="mr-2" />
							Conference Mode
						</button>
					</div>
				</div>
				<p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
					Choose how you want to view the schedule
				</p>
			</div>

			{isSimpleTimeline ? <SimpleTimelineView /> : <ConferenceModeView />}
		</div>
	);
}
