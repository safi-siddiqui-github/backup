"use client";
import ConferenceHeader from "./ConferenceHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tracks, highDemandSessions } from "./data";
import {
	Calendar as CalendarIcon,
	LayoutDashboard,
	Presentation,
	Settings2,
} from "lucide-react";
import { useState } from "react";
import OverviewTracks from "./overview/OverviewTracks";
import OverviewHighDemand from "./overview/OverviewHighDemand";
import TaskTracks from "./tracks/tracks";
import Session from "./session/session";
import ConferenceCalendar from "./calendar/calendar";

// --- Main Component ---
export default function ConferenceEvent() {
	const [activeTab, setActiveTab] = useState("overview");

	const tabs = [
		{ id: "overview", label: "Overview", count: 6, icon: LayoutDashboard },
		{ id: "tracks", label: "Tracks", count: 3, icon: Settings2 },
		{ id: "sessions", label: "Sessions", count: 4, icon: Presentation },
		{ id: "calendar", label: "Calendar", count: 2, icon: CalendarIcon },
	];

	return (
		<div className="flex flex-col gap-6">
			{/*  */}
			<ConferenceHeader />
			{/*  */}

			{/*  */}
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="bg-muted text-muted-foreground inline-flex items-center rounded-lg p-[3px] *:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					{tabs.map((tab) => {
						const Icon = tab.icon as
							| React.ComponentType<{ className?: string }>
							| undefined;
						return (
							<TabsTrigger
								key={tab.id}
								value={tab.id}
								className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-transparent"
							>
								{Icon && <Icon className="h-4 w-4" />}
								<span>{tab.label}</span>
								{tab.count && (
									<span className="ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold data-[state=active]:bg-white/30 data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:bg-gray-800 dark:data-[state=inactive]:text-gray-300">
										{tab.count}
									</span>
								)}
							</TabsTrigger>
						);
					})}
				</TabsList>

				{/*  */}

				{/*  */}
				{/* --- Tab Content --- */}
				<div className="mt-8">
					<TabsContent value="overview">
						<div role="tabpanel" className="space-y-12">
							<OverviewTracks tracks={tracks} />
							<OverviewHighDemand sessions={highDemandSessions} />
						</div>
					</TabsContent>

					<TabsContent value="tracks">
						<div role="tabpanel" className="space-y-12">
							<TaskTracks />
						</div>
					</TabsContent>

					<TabsContent value="sessions">
						<div role="tabpanel" className="space-y-12">
							<Session />
						</div>
					</TabsContent>

					<TabsContent value="calendar">
						<div role="tabpanel" className="space-y-12">
							<ConferenceCalendar />
						</div>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}
