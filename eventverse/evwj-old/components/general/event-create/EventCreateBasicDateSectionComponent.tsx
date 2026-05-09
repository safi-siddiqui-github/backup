"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { CalendarCheck, Edit, Plus } from "lucide-react";
import TriggerCustomEventComponent from "../trigger/TriggerCustomEventComponent";

export default function EventCreateBasicDateSectionComponent() {
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
								<CalendarCheck />
								{/*  */}
								<span>Event Date &amp; Time</span>
								{/*  */}
							</CardTitle>
							{/*  */}
						</AccordionTrigger>
						{/*  */}

						{/*  */}
						<AccordionContent className="flex flex-col gap-6">
							{/*  */}

							{/*  */}
							<div className="flex flex-wrap items-center justify-between gap-4">
								{/*  */}

								{/*  */}
								<CardDescription>List Event Days</CardDescription>
								{/*  */}

								{/*  */}
								<TriggerCustomEventComponent
									eventType={"DialogEventDateComponent"}
								>
									{/*  */}
									<Button className="bg-primary">
										{/*  */}
										<Plus />
										{/*  */}
										<span>Add Days</span>
										{/*  */}
									</Button>
									{/*  */}
								</TriggerCustomEventComponent>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								{Array.from("123")?.map((item, index) => {
									return (
										<Card key={index} className="bg-secondary">
											{/*  */}

											{/*  */}
											<CardContent className="flex items-center justify-between gap-4">
												{/*  */}

												{/*  */}
												<div className="flex flex-col">
													{/*  */}

													{/*  */}
													<CardTitle>Event {item}</CardTitle>
													{/*  */}

													<CardDescription>
														Friday October {item}, 2025 at 10:00 AM - 4:00 PM
													</CardDescription>

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<div className="flex items-center gap-2">
													{/*  */}

													{/*  */}
													<TriggerCustomEventComponent
														eventType={"DialogEventDateComponent"}
													>
														{/*  */}
														<Button className="bg-primary">
															<Edit />
															<span>Edit</span>
														</Button>
														{/*  */}
													</TriggerCustomEventComponent>
													{/*  */}

													{/*  */}
													<Button variant={"destructive"}>Cancel</Button>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
											</CardContent>
											{/*  */}

											{/*  */}
										</Card>
									);
								})}
								{/*  */}

								{/*  */}
							</div>

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
