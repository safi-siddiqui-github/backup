"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
	Sparkles,
	TrendingUp,
	Eye,
	Users,
	Calendar,
	CheckCircle2,
} from "lucide-react";
import { useMemo } from "react";

interface FeatureEventData {
	isFeatured: boolean;
	featureType: "single" | "recurring";
	weeksFeatured?: number;
}

interface FeatureEventFieldProps {
	data?: FeatureEventData;
	eventDate?: Date | null;
	onUpdate: (data: FeatureEventData) => void;
}

const FEATURE_BENEFITS = [
	{
		icon: TrendingUp,
		title: "Increased Visibility",
		description: "Get featured at the top of search results and event listings",
	},
	{
		icon: Eye,
		title: "More Exposure",
		description: "Reach up to 3x more potential attendees with premium placement",
	},
	{
		icon: Users,
		title: "Higher Attendance",
		description: "Featured events typically see 40-60% more registrations",
	},
	{
		icon: Calendar,
		title: "Priority Placement",
		description: "Stand out from the crowd with prominent event card placement",
	},
];

export default function FeatureEventField({
	data,
	eventDate,
	onUpdate,
}: FeatureEventFieldProps) {
	const featureData = data || {
		isFeatured: false,
		featureType: "single",
		weeksFeatured: 1,
	};

	const calculateWeeksUntilEvent = () => {
		if (!eventDate) return 0;
		const now = new Date();
		const event = new Date(eventDate);
		const diffTime = event.getTime() - now.getTime();
		const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
		return Math.max(0, diffWeeks);
	};

	const weeksUntilEvent = calculateWeeksUntilEvent();

	const calculatePrice = () => {
		if (!featureData.isFeatured) return 0;
		if (featureData.featureType === "single") {
			return 35;
		}
		// Recurring: $35 for first week + $29.99 for each additional week
		// Automatically calculate weeks until event for recurring
		const totalWeeks = featureData.featureType === "recurring" 
			? (weeksUntilEvent > 0 ? weeksUntilEvent : 1)
			: (featureData.weeksFeatured || 1);
		if (totalWeeks === 1) return 35;
		return 35 + (totalWeeks - 1) * 29.99;
	};

	const totalPrice = useMemo(() => calculatePrice(), [
		featureData.isFeatured,
		featureData.featureType,
		featureData.weeksFeatured,
		weeksUntilEvent,
	]);

	const handleToggle = (checked: boolean) => {
		onUpdate({
			...featureData,
			isFeatured: checked,
			featureType: checked ? featureData.featureType : "single",
			weeksFeatured: checked ? featureData.weeksFeatured || 1 : undefined,
		});
	};

	const handleFeatureTypeChange = (value: string) => {
		if (value === "recurring") {
			// Automatically set weeks to event date if available, otherwise default to 1
			const weeks = weeksUntilEvent > 0 ? weeksUntilEvent : 1;
			onUpdate({
				...featureData,
				featureType: "recurring",
				weeksFeatured: weeks,
			});
		} else {
			onUpdate({
				...featureData,
				featureType: "single",
				weeksFeatured: undefined,
			});
		}
	};

	return (
		<div className="space-y-6">
			{/* Feature Toggle */}
			<Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
				<CardHeader>
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-2 shadow-lg">
									<Sparkles className="h-5 w-5 text-white" />
								</div>
								<div>
									<CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
										Feature Your Event
									</CardTitle>
									<CardDescription className="text-sm text-gray-600 dark:text-gray-400">
										Get premium placement and increased visibility
									</CardDescription>
								</div>
							</div>
						</div>
						<Switch
							checked={featureData.isFeatured}
							onCheckedChange={handleToggle}
							className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-indigo-600"
						/>
					</div>
				</CardHeader>

				{featureData.isFeatured && (
					<CardContent className="space-y-6">
						{/* Benefits Section */}
						<div className="rounded-lg bg-white/60 dark:bg-gray-800/60 p-4 backdrop-blur-sm">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
								<CheckCircle2 className="h-4 w-4 text-green-600" />
								Why Feature Your Event?
							</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{FEATURE_BENEFITS.map((benefit, index) => {
									const Icon = benefit.icon;
									return (
										<div
											key={index}
											className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
										>
											<div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2 flex-shrink-0">
												<Icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
											</div>
											<div className="flex-1 min-w-0">
												<h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
													{benefit.title}
												</h5>
												<p className="text-xs text-gray-600 dark:text-gray-400">
													{benefit.description}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Feature Type Selection */}
						<div className="space-y-4">
							<Label className="text-base font-semibold text-gray-900 dark:text-white">
								Choose Feature Duration
							</Label>
							<RadioGroup
								value={featureData.featureType}
								onValueChange={handleFeatureTypeChange}
								className="space-y-3"
							>
								<div className="flex items-start space-x-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
									<RadioGroupItem
										value="single"
										id="single"
										className="mt-1"
									/>
									<Label
										htmlFor="single"
										className="flex-1 cursor-pointer space-y-1"
									>
										<div className="flex items-center justify-between">
											<span className="font-semibold text-gray-900 dark:text-white">
												Single Week
											</span>
											<Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
												$35.00
											</Badge>
										</div>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Feature your event for one week. Perfect for last-minute
											events or short-term promotion.
										</p>
									</Label>
								</div>

								<div className="flex items-start space-x-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
									<RadioGroupItem
										value="recurring"
										id="recurring"
										className="mt-1"
									/>
									<Label
										htmlFor="recurring"
										className="flex-1 cursor-pointer space-y-1"
									>
										<div className="flex items-center justify-between">
											<span className="font-semibold text-gray-900 dark:text-white">
												Every Week Until Event
											</span>
											<Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
												$35 + $29.99/week
											</Badge>
										</div>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Automatically feature your event every week until the event
												date. Best value for maximum exposure.
											</p>
											{eventDate && weeksUntilEvent > 0 && (
												<div className="mt-2 space-y-1">
													<p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
														{weeksUntilEvent} week{weeksUntilEvent !== 1 ? "s" : ""}{" "}
														until your event
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														Will be featured automatically each week
													</p>
												</div>
											)}
											{(!eventDate || weeksUntilEvent === 0) && (
												<p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
													Please set an event date to enable recurring features
												</p>
											)}
									</Label>
								</div>
							</RadioGroup>
						</div>

						{/* Pricing Summary */}
						{featureData.isFeatured && (
							<Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
								<CardContent className="p-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm opacity-90 mb-1">Total Cost</p>
											<p className="text-3xl font-bold">
												${totalPrice.toFixed(2)}
											</p>
											{featureData.featureType === "recurring" && (
												(() => {
													const weeks = weeksUntilEvent > 0 ? weeksUntilEvent : 1;
													if (weeks > 1) {
														return (
															<p className="text-xs opacity-75 mt-1">
																$35.00 (first week) + $
																{((weeks - 1) * 29.99).toFixed(2)}{" "}
																({weeks - 1} additional week
																{weeks - 1 !== 1 ? "s" : ""})
															</p>
														);
													}
													return null;
												})()
											)}
										</div>
										<div className="text-right">
											<Badge className="bg-white/20 text-white border-white/30">
												Premium
											</Badge>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					</CardContent>
				)}
			</Card>
		</div>
	);
}

