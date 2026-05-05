"use client";

import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import { ClientPropType } from "@/type";
import RsvpGuestGroupComponent from "./guest-group/RsvpGuestGroupComponent";
import RsvpDashboardComponent from "./RsvpDashboardComponent";
import RsvpFormComponent from "./RsvpFormComponent";
import RsvpGuestComponent from "./RsvpGuestComponent";
import RsvpSettingComponent from "./RsvpSettingComponent";

export default function RsvpTabComponent({ slug, rsvpSlug }: ClientPropType) {
	//
	if (rsvpSlug) {
	}
	const { rsvpTab, setRsvpTab } = useNavigationStore();
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<CardTitle className="text-xl md:text-2xl lg:text-4xl">
				RSVP Management
			</CardTitle>
			{/*  */}

			{/*  */}
			<Tabs
				value={rsvpTab ?? ""}
				className="justify-start gap-6"
				onValueChange={setRsvpTab}
			>
				{/*  */}

				{/*  */}
				<TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					{/*  */}

					{/*  */}
					<TabsTrigger
						value="dashboard"
						className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Dashboard
					</TabsTrigger>
					{/*  */}

					{/*  */}
					<TabsTrigger
						value="form"
						className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Form Builder
					</TabsTrigger>
					{/*  */}

					{/*  */}
					<TabsTrigger
						value="guestList"
						className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Guest List
					</TabsTrigger>
					{/*  */}

					{/*  */}
					<TabsTrigger
						value="groups"
						className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Groups
					</TabsTrigger>
					{/*  */}

					{/*  */}
					<TabsTrigger
						value="settings"
						className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						Settings
					</TabsTrigger>
					{/*  */}

					{/*  */}
				</TabsList>
				{/*  */}

				{/*  */}
				<TabsContent value="dashboard">
					<RsvpDashboardComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="form">
					<RsvpFormComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="guestList">
					<RsvpGuestComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="groups">
					<RsvpGuestGroupComponent slug={slug} />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="settings">
					<RsvpSettingComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
			</Tabs>
			{/*  */}

			{/*  */}
		</div>
	);
}
