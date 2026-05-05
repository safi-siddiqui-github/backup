"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import DashboardHostingDraftComponent from "./DashboardHostingDraftComponent";
import { Search, Calendar, Clock, Archive } from "lucide-react";
import { useState } from "react";

// Empty state component for hosting sub-tabs
const HostingEmptyState = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) => (
	<div className="flex flex-col items-center justify-center py-12 px-4 w-full h-full min-h-[calc(100vh-500px)]">
		<div className="p-3 rounded-full bg-gradient-to-br from-slate-700/50 to-slate-800/40 backdrop-blur-sm border border-slate-600/50 mb-3">
			<Icon className="w-6 h-6 text-slate-300" />
		</div>
		<h3 className="text-base font-semibold text-white mb-1">{title}</h3>
		<p className="text-xs text-slate-400 text-center max-w-sm">{description}</p>
	</div>
);

export default function DashboardHostingComponent() {
	//
	const { setDashboardHostingTab, dashboardHostingTab } = useNavigationStore();
	const [searchTerm, setSearchTerm] = useState("");

	// TODO: Add actual event count when events are loaded
	const eventCount = 15;
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-4">
				{/*  */}

				{/*  */}
				<div className="flex flex-wrap items-center justify-between gap-4">
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-3">
						<CardTitle className="text-2xl">Events I am Hosting</CardTitle>
						<Badge variant="secondary" className="text-sm px-3 py-1">
							{eventCount} Total
						</Badge>
					</div>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
					<Input
						placeholder="Search events by name, type, location..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10 border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground placeholder:text-muted-foreground [background-color:white] dark:[background-color:#020617]"
					/>
				</div>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}

			{/*  */}
			<div>
				{/*  */}

				{/*  */}
				<Tabs
					value={dashboardHostingTab ?? ""}
					className="justify-start gap-6"
					onValueChange={setDashboardHostingTab}
				>
					{/*  */}

					{/*  */}
					<TabsList className="w-full justify-start bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="upcoming"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Upcoming
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="ongoing"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Ongoing
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="past"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Past
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="drafts"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Drafts
						</TabsTrigger>
						{/*  */}

						{/*  */}
					</TabsList>
					{/*  */}

					{/*  */}
					<TabsContent value="upcoming" className="flex-1 w-full m-0">
						<HostingEmptyState
							icon={Calendar}
							title="No Upcoming Events"
							description="You don't have any upcoming events scheduled. Create a new event to get started!"
						/>
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="ongoing" className="flex-1 w-full m-0">
						<HostingEmptyState
							icon={Clock}
							title="No Ongoing Events"
							description="There are currently no events in progress. Your live events will appear here."
						/>
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="past" className="flex-1 w-full m-0">
						<HostingEmptyState
							icon={Archive}
							title="No Past Events"
							description="Your completed events will be archived here. Start hosting to build your event history!"
						/>
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="drafts">
						{/*  */}

						{/*  */}
						<DashboardHostingDraftComponent />
						{/*  */}

						{/*  */}
					</TabsContent>
					{/*  */}

					{/*  */}
				</Tabs>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
