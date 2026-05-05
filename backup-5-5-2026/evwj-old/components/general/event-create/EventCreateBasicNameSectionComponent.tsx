"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarCheck2, ImageIcon, Sparkle } from "lucide-react";

export default function EventCreateBasicNameSectionComponent() {
	//
	return (
		<Card>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}

				{/*  */}
				<Accordion type="single" collapsible>
					{/*  */}

					{/*  */}
					<AccordionItem value="item-1">
						{/*  */}

						{/*  */}
						<AccordionTrigger className="cursor-pointer">
							{/*  */}
							<CardTitle className="flex items-center gap-2 text-lg">
								{/*  */}
								<Sparkle />
								{/*  */}
								<span>Event Information</span>
								{/*  */}
							</CardTitle>
							{/*  */}
						</AccordionTrigger>
						{/*  */}

						{/*  */}
						<AccordionContent className="flex flex-col">
							{/*  */}

							{/*  */}
							<div className="flex flex-col items-center gap-1 py-10 text-center">
								{/*  */}

								{/*  */}
								<CalendarCheck2 className="size-10 text-purple-600" />
								{/*  */}

								{/*  */}
								<CardTitle className="text-lg">Event Basics</CardTitle>
								{/*  */}

								{/*  */}
								<CardDescription>
									Let&apos;s start with the fundamentals of your event
								</CardDescription>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-6">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<Label>Event Name</Label>
									{/*  */}

									{/*  */}
									<Input placeholder="Enter your event name" />
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<Label className="flex items-center gap-2">
									{/*  */}
									<span>Is Event Pubic</span>
									{/*  */}
									<Switch />
									{/*  */}
								</Label>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap gap-2">
										{/*  */}

										{/*  */}
										<Label>Main Event Photo/Video</Label>
										{/*  */}

										{/*  */}
										<Badge variant={"outline"}>Optional</Badge>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<Label className="flex h-96 cursor-pointer items-center justify-center rounded border-2 border-dashed">
										{/*  */}

										{/*  */}
										<div className="flex flex-col items-center gap-2 font-normal">
											{/*  */}

											{/*  */}
											<ImageIcon className="size-10" />
											{/*  */}

											{/*  */}
											<CardTitle>Add Main Image / Video</CardTitle>
											{/*  */}

											{/*  */}
											<CardDescription>
												Drag and drop or click to browse • Images or videos up
												to 50MB
											</CardDescription>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Input type="file" className="hidden" />
										{/*  */}

										{/*  */}
									</Label>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
						</AccordionContent>
						{/*  */}

						{/*  */}
					</AccordionItem>
					{/*  */}

					{/*  */}
				</Accordion>
				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
		</Card>
	);
}
