"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import ScheduleConferenceOverviewComponent from "./ScheduleConferenceOverviewComponent";
import ScheduleConferenceSessionComponent from "./ScheduleConferenceSessionComponent";
import ScheduleConferenceTrackComponent from "./ScheduleConferenceTrackComponent";
import ScheduleConferenceCalendarComponent from "./ScheduleConferenceCalendarComponent";

export default function ScheduleConferenceTabComponent() {
	//
	const { scheduleConferenceTab, setScheduleConferenceTab } =
		useNavigationStore();
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<Card className="flex flex-col gap-6 rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-wrap items-center justify-between gap-4">
					{/*  */}

					{/*  */}
					<CardTitle className="text-xl md:text-2xl lg:text-4xl">
						Conference Mode
					</CardTitle>
					{/*  */}

					{/*  */}
					<Tabs
						value={scheduleConferenceTab ?? ""}
						className="overflow-auto"
						onValueChange={setScheduleConferenceTab}
					>
						{/*  */}

						{/*  */}
						<TabsList className="gap-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
							{/*  */}
							<TabsTrigger
								value="overview"
								className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
							>
								Overview
							</TabsTrigger>
							{/*  */}
							<TabsTrigger
								value="track"
								className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
							>
								Tracks
							</TabsTrigger>
							{/*  */}
							<TabsTrigger
								value="session"
								className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
							>
								Sessions
							</TabsTrigger>
							{/*  */}
							<TabsTrigger
								value="calendar"
								className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
							>
								Calendars
							</TabsTrigger>
							{/*  */}
						</TabsList>
						{/*  */}

						{/*  */}
					</Tabs>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
			<Tabs value={scheduleConferenceTab ?? ""}>
				{/*  */}

				{/*  */}
				<TabsContent value="overview">
					<ScheduleConferenceOverviewComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="track">
					<ScheduleConferenceTrackComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="session">
					<ScheduleConferenceSessionComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="calendar">
					<ScheduleConferenceCalendarComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
			</Tabs>
			{/*  */}

			{/*  */}
		</div>
	);
}
