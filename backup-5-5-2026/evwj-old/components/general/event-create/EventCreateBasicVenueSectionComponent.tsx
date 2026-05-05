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
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Building2,
	Clock,
	DollarSign,
	Edit,
	Info,
	MapPin,
	Plus,
	Trash,
	Users,
} from "lucide-react";
import TriggerCustomEventComponent from "../trigger/TriggerCustomEventComponent";

export default function EventCreateBasicVenueSectionComponent() {
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

						<AccordionTrigger className="cursor-pointer">
							{/*  */}
							<CardTitle className="flex items-center gap-2 text-lg">
								{/*  */}
								<Building2 />
								{/*  */}
								<span>Event Venue & Sections</span>
								{/*  */}
							</CardTitle>
							{/*  */}
						</AccordionTrigger>
						{/*  */}

						{/*  */}
						<AccordionContent className="flex flex-col gap-6 py-4">
							{/*  */}

							{/*  */}
							<Card className="border-primary bg-primary/10">
								{/*  */}

								{/*  */}
								<CardHeader>
									{/*  */}

									{/*  */}
									<div className="text-primary flex flex-col gap-2">
										{/*  */}

										{/*  */}
										<div className="flex items-center gap-2">
											{/*  */}

											{/*  */}
											<MapPin />
											{/*  */}

											{/*  */}
											<p className="">Where will your event take place?</p>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											You can either add your venue details now or skip this
											step and add them later.
										</CardDescription>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</CardHeader>
								{/*  */}

								{/*  */}
								<CardContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap gap-4">
										{/*  */}

										{/*  */}
										<Button className="bg-primary">
											{/*  */}
											<MapPin />
											{/*  */}
											<span>Add venue details now</span>
											{/*  */}
										</Button>
										{/*  */}

										{/*  */}
										<Button variant={"outline"}>
											{/*  */}
											<Clock />
											{/*  */}
											<span>Add venue later</span>
											{/*  */}
										</Button>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</CardContent>
								{/*  */}

								{/*  */}
							</Card>
							{/*  */}

							{/*  */}
							<Card className="dark:border-secondary-foreground dark:bg-secondary dark:text-secondary-foreground border-blue-600 bg-blue-50 text-blue-600">
								{/*  */}

								{/*  */}
								<CardHeader>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-2">
										{/*  */}

										{/*  */}
										<div className="flex items-center gap-2">
											{/*  */}

											{/*  */}
											<Info />
											{/*  */}

											{/*  */}
											<p className="">Venue Partner Network</p>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											When you add budgeting to your event, we can connect you
											with verified venue partners in your area who offer
											exclusive discounts to EventVerse users.
										</CardDescription>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</CardHeader>
								{/*  */}

								{/*  */}
								<CardContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap gap-4">
										{/*  */}

										{/*  */}
										<div className="flex items-center gap-2">
											{/*  */}

											{/*  */}
											<Users />
											{/*  */}

											<p className="">1200+ Verified Users</p>

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<div className="flex items-center gap-2">
											{/*  */}

											{/*  */}
											<DollarSign />
											{/*  */}

											<p className="">15% Average Savings</p>

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</CardContent>
								{/*  */}

								{/*  */}
							</Card>
							{/*  */}

							{/*  */}
							<div className="flex flex-wrap items-center justify-between gap-4">
								{/*  */}

								{/*  */}
								<CardDescription>My venue list</CardDescription>
								{/*  */}

								{/*  */}
								<TriggerCustomEventComponent
									eventType={"DialogEventVenueComponent"}
								>
									{/*  */}
									<Button>
										<Plus />
										<span>Add Venue</span>
									</Button>
									{/*  */}
								</TriggerCustomEventComponent>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-4">
								{/*  */}

								{/*  */}
								{Array.from("12").map((item, index) => {
									return (
										<Card key={index} className="bg-secondary">
											{/*  */}

											{/*  */}
											<CardHeader className="flex flex-wrap items-center justify-between gap-4">
												{/*  */}

												{/*  */}
												<div className="flex flex-col">
													{/*  */}

													{/*  */}
													<CardTitle>Venue {item}</CardTitle>
													{/*  */}

													{/*  */}
													<CardDescription className="text-inherit">
														Venue Type {1} - Venue Address/Link {1}
													</CardDescription>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<div className="flex flex-wrap items-center gap-2">
													{/*  */}

													{/*  */}
													<TriggerCustomEventComponent
														eventType={"DialogEventVenueComponent"}
													>
														{/*  */}
														<Button>
															<Edit />
															Edit
														</Button>
														{/*  */}
													</TriggerCustomEventComponent>
													{/*  */}

													{/*  */}
													<TriggerCustomEventComponent
														eventType={"DialogEventVenueSectionComponent"}
													>
														{/*  */}
														<Button variant={"outline"}>
															<Plus />
															Add Section
														</Button>
														{/*  */}
													</TriggerCustomEventComponent>
													{/*  */}

													{/*  */}
													<Button variant={"destructive"}>
														<Trash />
														Cancel
													</Button>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
											</CardHeader>
											{/*  */}

											<Separator className="" />

											{/*  */}
											<CardContent className="flex flex-col gap-2">
												{/*  */}

												{/*  */}
												{Array.from("12").map((subItem, subIndex) => {
													return (
														<Card key={subIndex}>
															{/*  */}

															{/*  */}
															<CardContent className="flex flex-wrap items-center justify-between gap-4">
																{/*  */}

																{/*  */}
																<div className="flex flex-col gap-1">
																	{/*  */}

																	{/*  */}
																	<CardTitle>Venue Section {subItem}</CardTitle>
																	{/*  */}

																	{/*  */}
																	<CardDescription>
																		Capacity: {Number(subItem) * 2}
																	</CardDescription>
																	{/*  */}

																	{/*  */}
																</div>
																{/*  */}

																{/*  */}
																<div className="flex flex-wrap items-center gap-2">
																	{/*  */}

																	{/*  */}
																	<TriggerCustomEventComponent
																		eventType={
																			"DialogEventVenueSectionComponent"
																		}
																	>
																		{/*  */}
																		<Button variant={"outline"}>
																			<Edit />
																			Edit
																		</Button>
																		{/*  */}
																	</TriggerCustomEventComponent>
																	{/*  */}

																	{/*  */}
																	<Button variant={"destructive"}>
																		<Trash />
																	</Button>
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
