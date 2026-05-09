"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import { TextCursorInput } from "lucide-react";

export default function RsvpFormBuilderFieldLibraryComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	const { rsvpFormFieldLibraryTab, setRsvpFormFieldLibraryTab } =
		useNavigationStore();
	//
	return (
		<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}
				<CardTitle>Field Library</CardTitle>
				{/*  */}
				<CardDescription>Drag fields to add them to your form</CardDescription>
				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}
				<Tabs
					value={rsvpFormFieldLibraryTab ?? ""}
					onValueChange={setRsvpFormFieldLibraryTab}
				>
					{/*  */}

					{/*  */}
					<TabsList className="w-full">
						{/*  */}
						<TabsTrigger value="standard">Standard</TabsTrigger>
						{/*  */}
						<TabsTrigger value="custom">Custom</TabsTrigger>
						{/*  */}
					</TabsList>
					{/*  */}

					{/*  */}
				</Tabs>
				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}
				<Tabs value={rsvpFormFieldLibraryTab ?? ""}>
					{/*  */}

					{/*  */}
					<TabsContent value="standard" className="flex flex-col gap-4">
						{/*  */}

						{Array.from({ length: 5 })?.map((item, index) => {
							return (
								<Card
									key={index}
									className="rounded-md p-0 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
								>
									{/*  */}

									{/*  */}
									<CardContent className="flex flex-col gap-px p-4">
										{/*  */}

										{/*  */}
										<div className="flex items-center gap-2">
											{/*  */}
											<TextCursorInput className="size-5" />
											{/*  */}
											<CardTitle className="tracking-tight">
												Email Address
											</CardTitle>
											{/*  */}
											<Badge variant={"secondary"}>Required</Badge>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<CardDescription className="text-xs">
											Enter Email Address (Required)
										</CardDescription>
										{/*  */}

										{/*  */}
									</CardContent>
									{/*  */}

									{/*  */}
								</Card>
							);
						})}

						{/*  */}
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="custom" className="flex flex-col gap-4">
						{/*  */}

						{/*  */}
						<div className="flex flex-wrap items-center justify-between gap-4">
							{/*  */}

							{/*  */}
							<CardTitle>Custom RSVP Fields</CardTitle>
							{/*  */}

							{/*  */}
							<Button>Add Field</Button>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<div className="bg-secondary/30 flex flex-col items-center rounded-2xl border-2 border-dashed py-20">
							{/*  */}
							<CardDescription>No Custom Fields Added</CardDescription>
							{/*  */}
						</div>
						{/*  */}

						{/*  */}
					</TabsContent>
					{/*  */}

					{/*  */}
				</Tabs>
				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
		</Card>
	);
}
