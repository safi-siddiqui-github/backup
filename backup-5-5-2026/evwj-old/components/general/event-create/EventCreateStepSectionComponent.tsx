"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import EventCreateBasicSectionComponent from "./EventCreateBasicSectionComponent";
import EventCreateFeatureSectionComponent from "./EventCreateFeatureSectionComponent";
import EventCreateLaunchSectionComponent from "./EventCreateLaunchSectionComponent";
import EventCreatePhotoSectionComponent from "./EventCreatePhotoSectionComponent";

export default function EventCreateStepSectionComponent() {
	//
	const steps = useMemo(
		() => [
			{
				name: "Event Basics",
				description: "What, when, and where",
			},
			{
				name: "Features",
				description: "Choose functionality",
			},
			{
				name: "Event Photos",
				description: "Add photos to your event",
			},
			{
				name: "Launch",
				description: "Review and publish",
			},
		],
		[],
	);
	//
	const [currentStep, setCurrentStep] = useState(1);
	//
	const updateCurrentStep = () => {
		const ahead = currentStep === 4 ? 1 : currentStep + 1;
		setCurrentStep(ahead);
	};
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent>
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-6">
						{/*  */}

						{/*  */}
						<div className="flex flex-col gap-2">
							{/*  */}

							{/*  */}
							<div className="flex flex-wrap justify-between gap-4">
								{/*  */}
								<p className="">Step 1 of 5</p>
								{/*  */}
								<p className="">20% Complete</p>
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<Progress value={33} />
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<div className="flex flex-wrap gap-2">
							{/*  */}

							{/*  */}
							{steps?.map((item, index) => {
								return (
									<div
										className="flex flex-1 flex-col items-center gap-1 text-center"
										key={index}
									>
										{/*  */}

										{/*  */}
										<div
											className={cn(
												"flex h-10 w-10 items-center justify-center overflow-hidden rounded-full",
												{
													"bg-primary text-background": index === 0,
												},
											)}
										>
											{index + 1}
										</div>
										{/*  */}

										{/*  */}
										<CardTitle className="">{item.name}</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription>{item.description}</CardDescription>
										{/*  */}

										{/*  */}
									</div>
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
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
			{currentStep === 1 ? (
				<EventCreateBasicSectionComponent />
			) : currentStep === 2 ? (
				<EventCreateFeatureSectionComponent />
			) : currentStep === 3 ? (
				<EventCreatePhotoSectionComponent />
			) : (
				<EventCreateLaunchSectionComponent />
			)}
			{/*  */}

			{/*  */}
			<div className="flex flex-col items-end gap-4">
				<Button onClick={updateCurrentStep} className="">
					{currentStep === 1
						? "Continue To Features"
						: currentStep === 2
							? "Continue To Event Photos"
							: currentStep === 3
								? "Continue to Launch"
								: "Launch"}
				</Button>
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
