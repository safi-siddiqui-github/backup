"use client";

import AvatarGroupComponent from "@/components/ui-extends/AvatarGroupComponent";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartBar, Tag, Users } from "lucide-react";

export default function ScheduleConferenceOverviewComponent() {
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex items-center gap-2">
					{/*  */}
					<Tag />
					{/*  */}
					<CardTitle>Conference Tracks</CardTitle>
					{/*  */}
					<CardDescription>10</CardDescription>
					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{/*  */}

					{/*  */}
					{Array.from({ length: 6 })?.map((item, index) => {
						return (
							<Card key={index} className="border-l-primary border-l-4">
								{/*  */}

								{/*  */}
								<CardContent className="flex flex-col gap-4">
									{/*  */}

									{/*  */}
									<CardTitle>AI & Machine Learning</CardTitle>
									{/*  */}

									{/*  */}
									<CardDescription>
										Latest developments in artificial intelligence and machine
										learning
									</CardDescription>
									{/*  */}

									{/*  */}
									<div className="flex items-center justify-between">
										{/*  */}

										{/*  */}
										<div className="flex items-center gap-2">
											{/*  */}
											<Users />
											{/*  */}
											<CardDescription>914 Attendees</CardDescription>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<CardTitle>77%</CardTitle>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<Progress value={77} />
									{/*  */}

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
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex items-center gap-2">
					{/*  */}
					<ChartBar />
					{/*  */}
					<CardTitle>High Demand Sessions</CardTitle>
					{/*  */}
					<CardDescription>10</CardDescription>
					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					{Array.from({ length: 6 })?.map((item, index) => {
						return (
							<Card key={index} className="border-l-primary border-l-4">
								{/*  */}

								{/*  */}
								<CardContent className="flex flex-wrap items-center justify-between gap-4">
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-4">
										{/*  */}

										{/*  */}
										<div className="flex flex-wrap items-center gap-4">
											{/*  */}
											<CardTitle>
												Morning Track 1: Understanding React
											</CardTitle>
											{/*  */}
											<Badge>Full</Badge>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<div className="flex flex-wrap items-center gap-4">
											{/*  */}

											{/*  */}
											<Badge>AI & Machine Learning</Badge>
											{/*  */}

											{/*  */}
											<Badge variant={"outline"}>AI & Machine Learning</Badge>
											{/*  */}

											{/*  */}
											<CardDescription>09:00 AM - 10:30 AM</CardDescription>
											{/*  */}

											{/*  */}
											<CardDescription>Main Hall</CardDescription>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<div className="flex items-center gap-2">
											{/*  */}
											<Users />
											{/*  */}
											<CardDescription>980/1000</CardDescription>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<AvatarGroupComponent />
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="border-primary text-primary flex h-20 w-20 items-center justify-center rounded-full border-4">
										{/*  */}
										<CardTitle>80%</CardTitle>
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
			{/*  */}

			{/*  */}
		</div>
	);
}
