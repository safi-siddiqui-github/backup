"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaCar, FaExclamationCircle, FaEye } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import CreateAnnouncement from "./CreateAnnouncement";
import type {
	Announcement,
	AnnouncementCardProps,
	DateGroupedAnnouncementsProps,
	StatCardProps,
} from "./announcement-types";
import AnnouncementModal from "./announcementmodal";

const announcements: Announcement[] = [
	{
		title: "Venue Change - Important Update",
		description:
			"Due to unforeseen weather conditions, we are moving the outdoor ceremony indoors to the Grand Ballroom. All other details remain the same. Please arrive 15 minutes early to find your seat.",
		priority: "high",
		status: "sent",
		sentAt: "Oct 16, 2025 11:58 AM",
		recipients: "2 RSVP Groups",
		delivered: 52,
		opened: 38,
		percentage: 73,
	},
	{
		title: "Parking Instructions for Event Day",
		description:
			"Valet parking will be available at the main entrance. Additional self-parking is available in Lot B. Please display your parking pass on your dashboard. VIP ticket holders have reserved spots in Lot A.",
		priority: "medium",
		status: "draft",
		sentAt: "Oct 16, 2025 7:58 AM",
		recipients: "2 Ticket Tiers",
		delivered: 175,
		opened: 142,
		percentage: 81,
	},
	{
		title: "Weather Advisory for Outdoor Events",
		description:
			"Please be advised that rain is expected later in the day. Umbrellas will be provided at the entrance. Stay tuned for further updates.",
		priority: "low",
		status: "sent",
		sentAt: "Oct 17, 2025 8:30 AM",
		recipients: "All Attendees",
		delivered: 200,
		opened: 120,
		percentage: 60,
	},
	{
		title: "Safety Notice: Emergency Exits",
		description:
			"For your safety, please familiarize yourself with the emergency exits located throughout the venue. Staff will be available to assist if needed.",
		priority: "high",
		status: "sent",
		sentAt: "Oct 17, 2025 9:00 AM",
		recipients: "All Attendees",
		delivered: 200,
		opened: 180,
		percentage: 90,
	},
	{
		title: "Schedule Change: Keynote Time Updated",
		description:
			"The keynote speech will now begin at 10:30 AM instead of 10:00 AM. Please adjust your plans accordingly.",
		priority: "medium",
		status: "draft",
		sentAt: "Oct 17, 2025 7:00 AM",
		recipients: "VIP Guests",
		delivered: 45,
		opened: 40,
		percentage: 89,
	},
	{
		title: "Parking Lot C Closed",
		description:
			"Parking Lot C will be closed for maintenance. Please use Lots A or B for parking. We apologize for any inconvenience.",
		priority: "low",
		status: "sent",
		sentAt: "Oct 18, 2025 6:00 AM",
		recipients: "All Attendees",
		delivered: 210,
		opened: 150,
		percentage: 71,
	},
];

const getRelativeTime = (date: Date) => {
	const today = new Date();

	const todayStart = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
	);
	const dateStart = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	);

	const diffTime = todayStart.getTime() - dateStart.getTime();
	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "1 day ago";
	if (diffDays > 1) return `${diffDays} days ago`;
	if (diffDays === -1) return "Tomorrow";
	if (diffDays < -1) return `${Math.abs(diffDays)} days from now`;
	return "";
};

const groupAnnouncementsByDate = (announcementsList: Announcement[]) => {
	return announcementsList.reduce(
		(acc, announcement) => {
			const dateKey = announcement.sentAt.split(" ").slice(0, 3).join(" ");
			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}
			acc[dateKey].push(announcement);
			return acc;
		},
		{} as { [key: string]: Announcement[] },
	);
};

function DateGroupedAnnouncements({
	announcementsList,
	onView,
}: DateGroupedAnnouncementsProps) {
	const groupedAnnouncements = groupAnnouncementsByDate(announcementsList);
	const sortedDates = Object.keys(groupedAnnouncements).sort(
		(a, b) => new Date(b).getTime() - new Date(a).getTime(),
	);

	if (sortedDates.length === 0) {
		return (
			<div className="py-8 text-center text-gray-500 dark:text-slate-400">
				No announcements found.
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{sortedDates.map((dateString) => {
				const date = new Date(dateString);
				const formattedDate = date.toLocaleDateString("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				});
				const relativeTime = getRelativeTime(date);

				return (
					<div key={dateString} className="relative pl-6">
						<span
							className={`absolute top-1 left-0 h-3 w-3 rounded-full ${
								relativeTime === "Today"
									? "bg-blue-500 ring-4 ring-blue-500/30 dark:bg-blue-400 dark:ring-blue-400/30"
									: "bg-gray-300 dark:bg-slate-600"
							}`}
						></span>

						<div className="mb-3">
							<h3 className="text-base font-semibold text-gray-900 dark:text-slate-200">
								{formattedDate}
							</h3>
							<p className="text-sm text-gray-500 dark:text-slate-400">
								{relativeTime}
							</p>
						</div>

						<div className="space-y-4">
							{groupedAnnouncements[dateString]
								.sort(
									(a, b) =>
										new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(),
								)
								.map((a) => (
									<AnnouncementCard key={a.title} item={a} onView={onView} />
								))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

function StatCard({ title, value, icon, highlight }: StatCardProps) {
	return (
		<Card className="!bg-white [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
			<CardContent className="flex flex-col items-center justify-center p-2.5 sm:p-3">
				{icon && (
					<div
						className={`mb-1 flex h-5 w-5 items-center justify-center rounded-full sm:h-6 sm:w-6 ${highlight ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-slate-700/50"}`}
					>
						{icon}
					</div>
				)}
				<h3
					className={`text-lg font-bold sm:text-xl ${highlight ? "text-green-500 dark:text-green-400" : "text-gray-900 dark:text-slate-200"}`}
				>
					{value}
				</h3>
				<span className="mt-0.5 text-center text-xs font-medium text-gray-600 dark:text-slate-400">
					{title}
				</span>
			</CardContent>
		</Card>
	);
}

function AnnouncementCard({ item, onView }: AnnouncementCardProps) {
	return (
		<Card
			className="cursor-pointer !bg-white [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl dark:!bg-[#020617] dark:[background-color:#020617]"
			onClick={() => onView(item)}
		>
			<CardContent className="space-y-3 p-4 sm:p-5">
				<div className="flex items-start justify-between gap-2">
					<h4 className="flex flex-wrap items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg dark:text-slate-200">
						{item.priority === "high" ? (
							<FaExclamationCircle className="text-red-500 dark:text-red-400" />
						) : (
							<FaCar className="text-gray-500 dark:text-slate-400" />
						)}
						{item.title}
						<span
							className={`rounded-md border px-2 py-0.5 text-xs uppercase ${
								item.priority === "high"
									? "border-red-500 text-red-500 dark:border-red-400 dark:text-red-400"
									: item.priority === "medium"
										? "border-yellow-500 text-yellow-500 dark:border-yellow-400 dark:text-yellow-400"
										: "border-green-500 text-green-500 dark:border-green-400 dark:text-green-400"
							}`}
						>
							{item.priority}
						</span>
						<span
							className={`rounded-md border px-2 py-0.5 text-xs uppercase ${
								item.status === "sent"
									? "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400"
									: "border-gray-500 text-gray-500 dark:border-slate-400 dark:text-slate-400"
							}`}
						>
							{item.status}
						</span>
					</h4>
				</div>

				<p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
					{item.description}
				</p>
				<div className="flex justify-between border-t border-gray-200 pt-2 text-xs text-gray-500 dark:border-slate-600 dark:text-slate-400">
					<span>
						✓ {item.delivered} delivered • {item.opened} opened (
						{item.percentage}
						%)
					</span>
				</div>
			</CardContent>
		</Card>
	);
}

export default function AnnouncementDashboard() {
	const [selected, setSelected] = useState<Announcement | null>(null);
	const [showCreate, setShowCreate] = useState(false);
	const [duplicateData, setDuplicateData] = useState<Announcement | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("All Types");
	const [priorityFilter, setPriorityFilter] = useState("All Priorities");

	return (
		<div className="">
			<div className="w-full space-y-6 sm:space-y-8">
				{!showCreate && (
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<div>
							<h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-slate-200">
								Event Announcements
							</h1>
							<p className="text-xs text-gray-500 sm:text-sm dark:text-slate-400">
								Communicate with your event attendees
							</p>
						</div>
						<button
							onClick={() => {
								setDuplicateData(null);
								setShowCreate(true);
							}}
							className="flex w-full transform cursor-pointer items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl sm:w-auto"
						>
							<FiSend size={18} /> <span>New Announcement</span>
						</button>
					</div>
				)}

				{showCreate ? (
					<CreateAnnouncement
						setShowCreate={setShowCreate}
						duplicateData={
							duplicateData
								? {
										title: duplicateData.title + " - copy",
										description: duplicateData.description,
										priority: duplicateData.priority,
									}
								: undefined
						}
					/>
				) : (
					<>
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
							<StatCard
								title="Total Announcements"
								value={announcements.length}
								icon={<FiSend className="text-blue-500" size={14} />}
								color="#3b82f6"
							/>
							<StatCard
								title="Urgent Messages"
								value={
									announcements.filter((a) => a.priority === "high").length
								}
								icon={
									<FaExclamationCircle className="text-red-500" size={14} />
								}
								highlight
								color="#ef4444"
							/>
							<StatCard
								title="Sent Today"
								value={
									announcements.filter((a) => a.sentAt.includes("Oct 18, 2025"))
										.length
								}
								icon={<FaCar className="text-green-500" size={14} />}
								color="#22c55e"
							/>
							<StatCard
								title="Avg. Open Rate"
								value={
									Math.round(
										announcements.reduce((acc, a) => acc + a.percentage, 0) /
											announcements.length,
									) + "%"
								}
								icon={<FaEye className="text-purple-500" size={14} />}
								color="#a855f7"
							/>
						</div>
						<Card className="!bg-white [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
							<CardContent className="p-4 sm:p-6">
								<Tabs defaultValue="sent" className="w-full">
									<TabsList className="mb-4 grid w-full grid-cols-2 !bg-white [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
										<TabsTrigger
											value="sent"
											className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
										>
											Sent
										</TabsTrigger>
										<TabsTrigger
											value="draft"
											className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
										>
											Draft
										</TabsTrigger>
									</TabsList>

									<div className="mb-4 flex w-full flex-wrap items-center gap-3 pb-4 sm:gap-4">
										<div className="flex min-w-[200px] flex-grow items-center overflow-hidden rounded-lg border border-gray-200 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
											<Input
												type="text"
												placeholder="Search announcements..."
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												className="flex-grow border-0 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
											/>
										</div>
										<Select value={typeFilter} onValueChange={setTypeFilter}>
											<SelectTrigger className="w-full border-gray-200 !bg-white [background-color:white] sm:w-auto sm:min-w-[150px] dark:border-slate-600 dark:!bg-slate-700/50 dark:[background-color:rgb(51_65_85/0.5)]">
												<SelectValue placeholder="All Types" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="All Types">All Types</SelectItem>
												<SelectItem value="General">General</SelectItem>
												<SelectItem value="Urgent">Urgent</SelectItem>
												<SelectItem value="Schedule">Schedule</SelectItem>
												<SelectItem value="Weather">Weather</SelectItem>
												<SelectItem value="Parking">Parking</SelectItem>
												<SelectItem value="Safety">Safety</SelectItem>
											</SelectContent>
										</Select>
										<Select
											value={priorityFilter}
											onValueChange={setPriorityFilter}
										>
											<SelectTrigger className="w-full border-gray-200 !bg-white [background-color:white] sm:w-auto sm:min-w-[150px] dark:border-slate-600 dark:!bg-slate-700/50 dark:[background-color:rgb(51_65_85/0.5)]">
												<SelectValue placeholder="All Priorities" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="All Priorities">
													All Priorities
												</SelectItem>
												<SelectItem value="High Priority">
													High Priority
												</SelectItem>
												<SelectItem value="Medium Priority">
													Medium Priority
												</SelectItem>
												<SelectItem value="Low Priority">
													Low Priority
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<TabsContent value="sent" className="space-y-4">
										<DateGroupedAnnouncements
											announcementsList={announcements.filter(
												(a) => a.status === "sent",
											)}
											onView={setSelected}
										/>
									</TabsContent>
									<TabsContent value="draft" className="space-y-4">
										<DateGroupedAnnouncements
											announcementsList={announcements.filter(
												(a) => a.status === "draft",
											)}
											onView={setSelected}
										/>
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					</>
				)}

				{selected && (
					<AnnouncementModal
						setShowCreate={setShowCreate}
						item={selected}
						onClose={() => setSelected(null)}
						setSelected={setDuplicateData}
					/>
				)}
			</div>
		</div>
	);
}
