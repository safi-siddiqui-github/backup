"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import RsvpFormBuilderComponent from "./RsvpFormBuilderComponent";
import RsvpFormPreviewComponent from "./RsvpFormPreviewComponent";

export default function RsvpFormComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	const { rsvpFormTab, setRsvpFormTab } = useNavigationStore();
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				{/*  */}

				{/*  */}
				<div className="flex flex-col">
					{/*  */}
					<CardTitle>RSVP Form Builder</CardTitle>
					{/*  */}
					<CardDescription>
						Design your perfect guest response form
					</CardDescription>
					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<Tabs value={rsvpFormTab ?? ""} onValueChange={setRsvpFormTab}>
					{/*  */}

					{/*  */}
					<TabsList className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						{/*  */}
						<TabsTrigger value="formBuilder">Form Builder</TabsTrigger>
						{/*  */}
						<TabsTrigger value="preview">Preview</TabsTrigger>
						{/*  */}
					</TabsList>
					{/*  */}

					{/*  */}
				</Tabs>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<Tabs value={rsvpFormTab ?? ""}>
				{/*  */}

				{/*  */}
				<TabsContent value="formBuilder">
					<RsvpFormBuilderComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="preview">
					<RsvpFormPreviewComponent />
				</TabsContent>
				{/*  */}

				{/*  */}
			</Tabs>
			{/*  */}

			{/*  */}
		</div>
	);
}
