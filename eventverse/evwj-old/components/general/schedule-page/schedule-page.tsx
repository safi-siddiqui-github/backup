"use client";

import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import ConferenceEvent from "./conference-event/conference-event";
import SimpleEvent from "./simple-event/simple-event";

export default function SchedulePageComponent() {
	const { scheduleTab, setScheduleTab } = useNavigationStore();

	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<CardTitle className="text-xl md:text-2xl lg:text-4xl">
				Schedule & Timeline
			</CardTitle>
			{/*  */}

			{/*  */}
			<Tabs
				value={scheduleTab ?? "simple"}
				className="justify-start gap-6"
				onValueChange={setScheduleTab}
			>
				{/*  */}

				{/*  */}
				<TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					{/*  */}

					{/*  */}
					<TabsTrigger
						value="simple"
						className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Simple Events
					</TabsTrigger>
					{/*  */}

					{/*  */}
					<TabsTrigger
						value="conference"
						className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Conference Events
					</TabsTrigger>
					{/*  */}

					{/*  */}
				</TabsList>
				{/*  */}

				{/*  */}
				<TabsContent value="simple">
					<SimpleEvent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="conference">
					<ConferenceEvent />
				</TabsContent>
				{/*  */}

				{/*  */}
			</Tabs>
			{/*  */}

			{/*  */}
		</div>
	);
}
