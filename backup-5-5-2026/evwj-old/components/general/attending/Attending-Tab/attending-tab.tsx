"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AnnouncementTab from "./announcement-tab";
import OverviewPanel from "./OverviewPanel";
import PhotoTab from "./photos/photo-tab";
import RsvpTab from "./RSVPTab";
import SurveyTab from "./survey-tab";
import TravelAndAccomodation from "@/components/general/travel-accomodation/travel-accomodation";
import ScheduleTab from "./schedule/schedule-tab";
import TicketsTab from "./ticket-tab/ticket-tab";

const tabItems = [
	"Overview",
	"RSVP",
	"Tickets",
	"Announcements",
	"Schedule",
	"Photos",
	"Travel",
	"Surveys",
];

export default function AttendingTab() {
	const [index, setIndex] = useState(0);

	function renderPanel(tab: string) {
		switch (tab) {
			case "Overview":
				return (
					<OverviewPanel
						onViewTicket={() => setIndex(tabItems.indexOf("Tickets"))}
						onViewSchedule={() => setIndex(tabItems.indexOf("Schedule"))}
						onViewSeating={() => {
							// TODO: Navigate to seating view when available
							console.log("Navigate to seating");
						}}
						onUploadPhotos={() => setIndex(tabItems.indexOf("Photos"))}
						onPlayGames={() => {
							// TODO: Navigate to games when available
							console.log("Navigate to games");
						}}
						onShareWishes={() => {
							// TODO: Navigate to wishes when available
							console.log("Navigate to wishes");
						}}
					/>
				);
			case "RSVP":
				return <RsvpTab />;
			case "Tickets":
				return <TicketsTab />;
			case "Announcements":
				return <AnnouncementTab />;
			case "Schedule":
				return <ScheduleTab />;
			case "Photos":
				return <PhotoTab />;

			case "Travel":
				return <TravelAndAccomodation guestView={true} />;
			case "Surveys":
				return <SurveyTab />;
			default:
				return (
					<div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-0 dark:bg-[#090a11]">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							{tab}
						</h3>
						<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
							This is the <strong>{tab}</strong> tab. Add the content or
							components you need here.
						</p>

						{/* Small placeholder area with hoverable cards to indicate interaction style */}
						<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
							<button className="transform cursor-pointer rounded border border-gray-100 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg dark:border-0 dark:bg-[#070b1c] dark:hover:bg-[#090a11]">
								<div className="text-sm font-medium text-gray-900 dark:text-white">
									Add {tab} item
								</div>
								<div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
									Click to add a new {tab.toLowerCase()} item
								</div>
							</button>
							<div className="flex items-center justify-center rounded border border-dashed border-gray-200 p-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
								Preview area
							</div>
						</div>
					</div>
				);
		}
	}

	return (
		<div className="mt-5 w-full">
			<Tabs selectedIndex={index} onSelect={(i) => setIndex(i)}>
				<TabList className="flex w-full overflow-hidden border-b pb-2 dark:border-gray-800">
					{tabItems.map((t, i) => (
						<Tab
							key={t}
							className={`flex-1 cursor-pointer rounded-t-md px-3 py-2 text-center text-sm transition-all outline-none select-none ${
								index === i
									? "bg-white text-indigo-600 shadow-sm dark:bg-[#090a11] dark:text-indigo-300"
									: "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#090a11] dark:hover:text-gray-200"
							}`}
						>
							<span className="block truncate capitalize">{t}</span>
						</Tab>
					))}
				</TabList>

				{tabItems.map((t) => (
					<TabPanel key={t} className="mt-4">
						{renderPanel(t)}
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}
