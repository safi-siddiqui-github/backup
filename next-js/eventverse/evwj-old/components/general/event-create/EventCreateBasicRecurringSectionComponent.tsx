"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronDownIcon, Repeat } from "lucide-react";
import { useState } from "react";

export default function EventCreateBasicRecurringSectionComponent() {
	//
	const [isEventRecurring, setIsEventRecurring] = useState(false);
	//
	return (
		<Card>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}

				{/*  */}
				<Accordion
					type="single"
					collapsible
					value={isEventRecurring ? "item-1" : ""}
				>
					{/*  */}

					{/*  */}
					<AccordionItem value="item-1">
						{/*  */}

						{/*  */}
						<Label className="flex cursor-pointer flex-wrap items-center justify-between gap-4 py-4">
							{/*  */}

							{/*  */}
							<CardTitle className="flex items-center gap-2 text-lg">
								{/*  */}
								<Repeat />
								{/*  */}
								<span>Recurring Event</span>
								{/*  */}
							</CardTitle>
							{/*  */}

							{/*  */}
							<Switch onCheckedChange={setIsEventRecurring} />
							{/*  */}

							{/*  */}
						</Label>
						{/*  */}

						{/* <AccordionTrigger className="hidden"></AccordionTrigger> */}

						{/*  */}
						<AccordionContent className="flex flex-col gap-6 py-4">
							{/*  */}

							{/*  */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<Label>Repeat Pattern</Label>
									{/*  */}

									{/*  */}
									<Select>
										<SelectTrigger className="w-full">
											Select pattern
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="utc1">Daily</SelectItem>
											<SelectItem value="utc">Weekly</SelectItem>
											<SelectItem value="eastern">Monthly</SelectItem>
											<SelectItem value="western">Yearly</SelectItem>
										</SelectContent>
									</Select>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<Label>Every </Label>
									{/*  */}

									{/*  */}
									<div className="flex items-center gap-2">
										{/*  */}

										{/*  */}
										<Input />
										{/*  */}

										{/*  */}
										<CardDescription>weeks</CardDescription>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<Label>Recurring End</Label>
									{/*  */}

									{/*  */}
									<Select>
										<SelectTrigger className="w-full">
											Select end pattern
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="utc">Never</SelectItem>
											<SelectItem value="eastern">
												After X Occurences
											</SelectItem>
											<SelectItem value="western">Unitl Date</SelectItem>
										</SelectContent>
									</Select>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Number Of Occurences</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="eg: 10" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Number Of Occurences</Label>
								{/*  */}

								{/*  */}
								<Popover
								// open={open}
								// onOpenChange={setOpen}
								>
									{/*  */}

									{/*  */}
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											id="date"
											className="justify-between font-normal"
										>
											{/* {date ? date.toLocaleDateString() : "Select date"} */}
											Pick End Date
											<ChevronDownIcon />
										</Button>
									</PopoverTrigger>
									{/*  */}

									{/*  */}
									<PopoverContent
										className="w-auto overflow-hidden p-0"
										align="start"
									>
										<Calendar
											mode="single"
											// selected={date}
											// captionLayout="dropdown"
											// onSelect={(date) => {
											//   setDate(date)
											//   setOpen(false)
											// }}
										/>
									</PopoverContent>
									{/*  */}

									{/*  */}
								</Popover>
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
