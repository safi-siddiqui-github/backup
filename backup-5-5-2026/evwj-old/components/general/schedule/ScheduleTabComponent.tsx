"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import ScheduleConferenceComponent from "./ScheduleConferenceComponent";
import ScheduleSimpleComponent from "./ScheduleSimpleComponent";

export default function ScheduleTabComponent() {
	//
	const { scheduleTab, setScheduleTab } = useNavigationStore();
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
					<div className="flex flex-col">
						{/*  */}
						<CardTitle className="text-xl md:text-2xl lg:text-4xl">
							Event Schedule
						</CardTitle>
						{/*  */}
						<CardDescription>Tech Innovation Conference 2024</CardDescription>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<Tabs
						value={scheduleTab ?? ""}
						className="overflow-auto"
						onValueChange={setScheduleTab}
					>
						{/*  */}

						{/*  */}
						<TabsList className="border-b border-gray-200 dark:border-gray-700 -mb-px flex w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] rounded-none gap-0 h-auto p-0">
							{/*  */}
							<TabsTrigger
								value="simple"
								className="flex flex-1 items-center justify-center gap-2 rounded-t-sm border-b-2 px-1 py-4 text-sm font-medium transition-colors focus:outline-none data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:data-[state=inactive]:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
							>
								Simple Events
							</TabsTrigger>
							{/*  */}
							<Switch checked={scheduleTab === "conference" ? true : false} />
							{/*  */}
							<TabsTrigger
								value="conference"
								className="flex flex-1 items-center justify-center gap-2 rounded-t-sm border-b-2 px-1 py-4 text-sm font-medium transition-colors focus:outline-none data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-400 data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:data-[state=inactive]:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
							>
								Conference Events
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
			<Tabs value={scheduleTab ?? ""}>
				{/*  */}
				<TabsContent value="simple">
					<ScheduleSimpleComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="conference">
					<ScheduleConferenceComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
			</Tabs>
			{/*  */}

			{/*  */}
		</div>
	);
}
