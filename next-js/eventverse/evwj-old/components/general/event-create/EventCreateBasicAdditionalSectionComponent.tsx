"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	Car,
	CircleQuestionMark,
	Clock,
	ExternalLink,
	Plus,
	Users,
} from "lucide-react";
import { useMemo } from "react";
import TriggerCustomEventComponent from "../trigger/TriggerCustomEventComponent";

export default function EventCreateBasicAdditionalSectionComponent() {
	//
	const restrictionPresets = useMemo(
		() => [
			"18+ Adults Only",
			"21+ Adults Only",
			"13+ Teenagers & Adults",
			"All Ages Welcome",
			"Kids Event (Under 12)",
			"Family Friendly",
		],
		[],
	);
	//
	const parkingTypes = useMemo(
		() => [
			"Free Parking",
			"Paid Parking",
			"Valet Service",
			"Street Parking",
			"Parking Garage",
			"Parking Lot",
		],
		[],
	);
	//
	const placeholderQuestions = useMemo(
		() => [
			"What should I bring to the event?",
			"What is the dress code?",
			"Is the event rain or shine?",
			"Can I get a refund for my ticket?",
			"Can I transfer my ticket to someone else?",
		],
		[],
	);
	//
	return (
		<Card>
			{/*  */}

			{/*  */}
			<CardHeader>
				{/*  */}

				{/*  */}
				<div className="flex flex-col gap-2">
					{/*  */}

					{/*  */}
					<CardTitle>Additional Event Details</CardTitle>
					{/*  */}

					{/*  */}
					<CardDescription>
						Optional information to enhance your event experience
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
				<Card className="dark:bg-secondary dark:border-primary border-blue-500 bg-blue-50/40">
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
								<AccordionTrigger>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-2 font-normal">
										{/*  */}

										{/*  */}
										<CardTitle className="text-lg">Event Logistics</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											Age restrictions, check-in times, and parking details
										</CardDescription>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</AccordionTrigger>
								{/*  */}

								{/*  */}
								<AccordionContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-6">
										{/*  */}

										{/*  */}
										<Separator className="dark:bg-secondary-foreground" />
										{/*  */}

										{/*  */}
										<div className="flex flex-col gap-4">
											{/*  */}

											{/*  */}
											<Label className="flex gap-2 text-lg">
												{/*  */}

												{/*  */}
												<Users />
												{/*  */}

												{/*  */}
												<span>Age Restriction</span>
												{/*  */}

												{/*  */}
												<Switch />
												{/*  */}

												{/*  */}
											</Label>
											{/*  */}

											{/*  */}
											<div className="flex flex-col gap-4">
												{/*  */}

												{/*  */}
												<CardTitle>Configure Age Requiremnts</CardTitle>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<p className="">Quick Presets</p>
													{/*  */}

													{/*  */}
													<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
														{/*  */}

														{/*  */}
														{restrictionPresets?.map((item, index) => {
															return (
																<Button
																	key={index}
																	className=""
																	variant={"outline"}
																>
																	{item}
																</Button>
															);
														})}
														{/*  */}

														{/*  */}
													</div>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<div className="flex flex-col gap-4">
												{/*  */}

												{/*  */}
												<CardTitle>Custom Configuration</CardTitle>
												{/*  */}

												{/*  */}
												<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
													{/*  */}

													{/*  */}
													<div className="flex flex-col gap-4">
														{/*  */}

														{/*  */}
														<Label className="flex items-center justify-between">
															{/*  */}

															{/*  */}
															<span>Minimum Age</span>
															{/*  */}

															{/*  */}
															<Switch />
															{/*  */}

															{/*  */}
														</Label>
														{/*  */}

														{/*  */}
														<Input placeholder="eg: 12" className="bg-white" />
														{/*  */}

														{/*  */}
													</div>
													{/*  */}

													{/*  */}
													<div className="flex flex-col gap-4">
														{/*  */}

														{/*  */}
														<Label className="flex items-center justify-between">
															{/*  */}

															{/*  */}
															<span>Maximum Age</span>
															{/*  */}

															{/*  */}
															<Switch />
															{/*  */}

															{/*  */}
														</Label>
														{/*  */}

														{/*  */}
														<Input placeholder="eg: 80" className="bg-white" />
														{/*  */}

														{/*  */}
													</div>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<Label className="flex items-center justify-between">
													{/*  */}

													{/*  */}
													<span>Minors must be accompanied by guardian</span>
													{/*  */}

													{/*  */}
													<Switch />
													{/*  */}

													{/*  */}
												</Label>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<Label className="flex items-center justify-between">
														Custom Message (Optional)
													</Label>
													{/*  */}

													{/*  */}
													<Textarea
														placeholder="eg: Valid ID required for verification"
														className="h-32 bg-white"
													></Textarea>
													{/*  */}

													{/*  */}
												</div>

												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Separator className="dark:bg-secondary-foreground" />
										{/*  */}

										{/*  */}
										<div className="flex flex-col gap-4">
											{/*  */}

											{/*  */}
											<Label className="flex gap-2 text-lg">
												{/*  */}

												{/*  */}
												<Clock />
												{/*  */}

												{/*  */}
												<span>Check-in Time</span>
												{/*  */}

												{/*  */}
												<Switch />
												{/*  */}

												{/*  */}
											</Label>
											{/*  */}

											{/*  */}
											<div className="flex flex-col gap-4">
												{/*  */}

												{/*  */}
												<CardTitle>Configure Check-in Details</CardTitle>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-2">
													{/*  */}

													{/*  */}
													<Label>Check-in Start Time</Label>
													{/*  */}

													{/*  */}
													<Input type="time" className="bg-white" />
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<Label className="flex items-center justify-between">
													{/*  */}

													{/*  */}
													<span>
														Allow early check-in (before scheduled time)
													</span>
													{/*  */}

													{/*  */}
													<Switch />
													{/*  */}

													{/*  */}
												</Label>
												{/*  */}

												{/*  */}
												<Label className="flex items-center justify-between">
													{/*  */}

													{/*  */}
													<span>Allow late check-in (after event starts)</span>
													{/*  */}

													{/*  */}
													<Switch />
													{/*  */}

													{/*  */}
												</Label>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<Label className="flex items-center justify-between">
														Check-in Instructions (Optional)
													</Label>
													{/*  */}

													{/*  */}
													<Textarea
														placeholder="eg: Bring Valid ID and ticket confirmation"
														className="h-32 bg-white"
													></Textarea>
													{/*  */}

													{/*  */}
												</div>

												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Separator className="dark:bg-secondary-foreground" />
										{/*  */}

										{/*  */}
										<div className="flex flex-col gap-4">
											{/*  */}

											{/*  */}
											<Label className="flex gap-2 text-lg">
												{/*  */}

												{/*  */}
												<Car />
												{/*  */}

												{/*  */}
												<span>Parking Information</span>
												{/*  */}

												{/*  */}
												<Switch />
												{/*  */}

												{/*  */}
											</Label>
											{/*  */}

											{/*  */}
											<div className="flex flex-col gap-4">
												{/*  */}

												{/*  */}
												<CardTitle>Parking Details</CardTitle>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<p className="">Parking Type</p>
													{/*  */}

													{/*  */}
													<div className="grid grid-cols-1 gap-2 md:grid-cols-3">
														{/*  */}

														{/*  */}
														{parkingTypes?.map((item, index) => {
															return (
																<Button
																	key={index}
																	className=""
																	variant={"outline"}
																>
																	{item}
																</Button>
															);
														})}
														{/*  */}

														{/*  */}
													</div>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<div className="flex flex-col gap-4">
												{/*  */}

												{/*  */}
												<Label className="flex items-center justify-between">
													{/*  */}

													{/*  */}
													<span>Parking validation available</span>
													{/*  */}

													{/*  */}
													<Switch />
													{/*  */}

													{/*  */}
												</Label>
												{/*  */}

												{/*  */}
												<Label className="flex items-center justify-between">
													{/*  */}

													{/*  */}
													<span>Parking reservation required</span>
													{/*  */}

													{/*  */}
													<Switch />
													{/*  */}

													{/*  */}
												</Label>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<Label className="flex items-center justify-between">
														Parking Details & Directions
													</Label>
													{/*  */}

													{/*  */}
													<Textarea
														placeholder="eg: Enter through the main gate"
														className="h-32 bg-white"
													></Textarea>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<Label className="flex items-center justify-between">
														Map or Directions Link (Optional)
													</Label>
													{/*  */}

													{/*  */}
													<Input
														placeholder="eg: https://maps.google.com"
														className="bg-white"
													/>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<Label className="flex items-center justify-between">
														Alternative Transportation (Optional)
													</Label>
													{/*  */}

													{/*  */}
													<Textarea
														placeholder="eg: Public transit: Take metro lane 2"
														className="h-32 bg-white"
													></Textarea>
													{/*  */}

													{/*  */}
												</div>
												{/*  */}

												{/*  */}
											</div>
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
				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}

				{/*  */}
				<Card className="dark:bg-secondary dark:border-primary border-primary bg-primary/5">
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
								<AccordionTrigger>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-2 font-normal">
										{/*  */}

										{/*  */}
										<CardTitle className="text-lg">
											Special Guests & VIPs
										</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											Speakers, performers, and notable attendees
										</CardDescription>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</AccordionTrigger>
								{/*  */}

								{/*  */}
								<AccordionContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-6">
										{/*  */}

										{/*  */}
										<div className="flex flex-wrap items-center justify-between gap-4">
											{/*  */}

											{/*  */}
											<CardTitle>Special Guests & Speakers</CardTitle>
											{/*  */}

											{/*  */}
											<div className="flex flex-wrap items-center gap-2">
												{/*  */}

												{/*  */}
												<TriggerCustomEventComponent
													eventType={"DialogEventSpecialGuestImportComponent"}
												>
													{/*  */}
													<Button variant={"outline"}>
														{/*  */}
														<ExternalLink />
														{/*  */}
														<span>Import Profile</span>
														{/*  */}
													</Button>
													{/*  */}
												</TriggerCustomEventComponent>
												{/*  */}

												{/*  */}
												<TriggerCustomEventComponent
													eventType={"DialogEventSpecialGuestComponent"}
												>
													{/*  */}
													<Button>
														{/*  */}
														<Plus />
														{/*  */}
														<span>Add Guest</span>
														{/*  */}
													</Button>
													{/*  */}
												</TriggerCustomEventComponent>
												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Separator className="bg-primary" />
										{/*  */}

										{/*  */}
										<div className="flex flex-col items-center gap-2 py-10">
											{/*  */}

											{/*  */}
											<Users className="size-10" />
											{/*  */}

											{/*  */}
											<CardTitle>No special guests yet</CardTitle>
											{/*  */}

											{/*  */}
											<CardDescription>
												Add speakers, performers, or VIP guests to highlight
												your event
											</CardDescription>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Separator className="bg-primary" />
										{/*  */}

										{/*  */}
										<Card>
											{/*  */}

											{/*  */}
											<CardContent>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<div className="flex flex-wrap items-center justify-between gap-4">
														{/*  */}

														{/*  */}
														<div className="flex flex-wrap items-center gap-2">
															{/*  */}

															{/*  */}
															<Avatar className="size-20">
																{/*  */}
																<AvatarImage src="https://github.com/shadcn.png" />
																{/*  */}
																<AvatarFallback>CN</AvatarFallback>
																{/*  */}
															</Avatar>
															{/*  */}

															{/*  */}
															<div className="flex flex-col">
																{/*  */}

																{/*  */}
																<CardTitle className="text-lg">
																	John Doe
																</CardTitle>
																{/*  */}

																{/*  */}
																<CardDescription>Compnay CEO</CardDescription>
																{/*  */}

																{/*  */}
															</div>
															{/*  */}

															{/*  */}
														</div>
														{/*  */}

														{/*  */}
														<div className="flex items-center gap-1">
															{/*  */}

															{/*  */}
															<TriggerCustomEventComponent
																eventType={"DialogEventSpecialGuestComponent"}
															>
																{/*  */}
																<Button variant={"outline"}>Edit</Button>
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
													</div>
													{/*  */}

													{/*  */}
													<CardDescription>
														Lorem ipsum dolor, sit amet consectetur adipisicing
														elit. Non, ad.
													</CardDescription>
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
				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}

				{/*  */}
				<Card className="dark:bg-secondary dark:border-primary border-green-500 bg-green-50/40">
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
								<AccordionTrigger>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-2 font-normal">
										{/*  */}

										{/*  */}
										<CardTitle className="text-lg">Event Resources</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											FAQs and additional information for attendees
										</CardDescription>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</AccordionTrigger>
								{/*  */}

								{/*  */}
								<AccordionContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-6">
										{/*  */}

										{/*  */}
										<div className="flex flex-wrap items-center justify-between gap-4">
											{/*  */}

											{/*  */}
											<CardTitle>Frequently Asked Questions</CardTitle>
											{/*  */}

											{/*  */}
											<TriggerCustomEventComponent
												eventType={"DialogEventFaqComponent"}
											>
												{/*  */}
												<Button className="dark:bg-primary bg-green-600">
													{/*  */}
													<Plus />
													{/*  */}
													<span>Add FAQ</span>
													{/*  */}
												</Button>
												{/*  */}
											</TriggerCustomEventComponent>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Separator className="dark:bg-secondary-foreground bg-green-300" />
										{/*  */}

										{/*  */}
										<div className="flex flex-col items-center gap-4 py-4">
											{/*  */}

											{/*  */}
											<CircleQuestionMark className="size-10" />
											{/*  */}

											{/*  */}
											<CardTitle>No FAQs yet</CardTitle>
											{/*  */}

											{/*  */}
											<CardDescription>
												Add frequently asked questions to help attendees get
												quick answers
											</CardDescription>
											{/*  */}

											{/*  */}
											<div className="flex flex-col gap-2">
												{/*  */}

												{/*  */}
												<CardTitle>Quick Add Common Questions:</CardTitle>
												{/*  */}

												{/*  */}
												{placeholderQuestions?.map((item, index) => {
													return (
														<Button key={index} variant={"outline"}>
															{item}
														</Button>
													);
												})}
												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Separator className="dark:bg-secondary-foreground bg-green-300" />
										{/*  */}

										{/*  */}
										<Card>
											{/*  */}

											{/*  */}
											<CardContent>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-4">
													{/*  */}

													{/*  */}
													<div className="flex flex-wrap items-center justify-between gap-4">
														{/*  */}
														{/*  */}
														<div className="flex flex-col">
															{/*  */}

															{/*  */}
															<CardTitle className="text-lg">
																Question: What it the type of event?
															</CardTitle>
															{/*  */}

															{/*  */}
														</div>
														{/*  */}

														{/*  */}
														<div className="flex items-center gap-1">
															{/*  */}

															{/*  */}
															<TriggerCustomEventComponent
																eventType={"DialogEventFaqComponent"}
															>
																{/*  */}
																<Button variant={"outline"}>Edit</Button>
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
													</div>
													{/*  */}

													{/*  */}
													<CardDescription>
														<span className="font-medium">Answer: </span>
														<span>
															Lorem ipsum dolor, sit amet consectetur
															adipisicing elit. Non, ad.
														</span>
													</CardDescription>
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
				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
		</Card>
	);
}
