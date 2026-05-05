"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import RsvpSettingBasicComponent from "./RsvpSettingBasicComponent";
import RsvpSettingRegistryComponent from "./RsvpSettingRegistryComponent";
import RsvpSettingReminderComponent from "./RsvpSettingReminderComponent";

export default function RsvpSettingComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	const { rsvpSettingTab, setRsvpSettingTab } = useNavigationStore();
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<Tabs
				value={rsvpSettingTab ?? ""}
				className="justify-start gap-6"
				onValueChange={setRsvpSettingTab}
			>
				{/*  */}

				{/*  */}
				<TabsList className="h-full w-full justify-start overflow-x-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					{/*  */}

					{/*  */}
					<TabsTrigger value="basic">Basic</TabsTrigger>
					{/*  */}

					{/*  */}
					<TabsTrigger value="registry">Gift Registry</TabsTrigger>
					{/*  */}

					{/*  */}
					<TabsTrigger value="reminder">Reminder</TabsTrigger>
					{/*  */}

					{/*  */}
				</TabsList>
				{/*  */}

				{/*  */}
				<TabsContent value="basic">
					<RsvpSettingBasicComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="registry">
					<RsvpSettingRegistryComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="reminder">
					<RsvpSettingReminderComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
			</Tabs>
			{/*  */}

			{/*  */}
		</div>
	);
}
