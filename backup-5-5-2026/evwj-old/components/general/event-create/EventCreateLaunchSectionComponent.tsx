"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	Bell,
	Calendar,
	ChartColumn,
	CircleCheck,
	Eye,
	Rocket,
	Save,
	Users,
} from "lucide-react";
import { useMemo } from "react";

export default function EventCreateLaunchSectionComponent() {
	//
	const postMonitoring = useMemo(
		() => [
			{
				icon: Users,
				name: "Guest Analytics",
				description: "Track RSVPs, attendance, and engagement",
			},
			{
				icon: Calendar,
				name: "Event Timeline",
				description: "Monitor progress and key milestones",
			},
			{
				icon: Bell,
				name: "Smart Notifications",
				description: "Get alerts for important updates",
			},
			{
				icon: ChartColumn,
				name: "Performance Insights",
				description: "Detailed reports and metrics",
			},
		],
		[],
	);
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
					<div className="flex flex-col items-center gap-2 py-10">
						{/*  */}

						{/*  */}
						<Rocket className="text-primary size-10 animate-bounce" />
						{/*  */}

						{/*  */}
						<CardTitle className="text-xl">Ready to Launch</CardTitle>
						{/*  */}

						{/*  */}
						<CardDescription>
							Choose how you want to launch your amazing event
						</CardDescription>
						{/*  */}

						{/*  */}
					</div>
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
							<div className="flex flex-col gap-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<CardTitle className="text-xl">Launch Readiness</CardTitle>
									{/*  */}

									{/*  */}
									<CardDescription className="text-inherit">
										Everything looks great! Your event is ready to launch.
									</CardDescription>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
									{/*  */}

									{/*  */}
									{Array.from("1234")?.map((item, index) => {
										return (
											<div
												className="bg-background flex items-center justify-between gap-2 rounded-lg px-4 py-2"
												key={index}
											>
												{/*  */}

												{/*  */}
												<CardTitle className="flex items-center gap-2">
													{/*  */}

													{/*  */}
													<CircleCheck />
													{/*  */}

													{/*  */}
													<span>Event basics completed</span>
													{/*  */}

													{/*  */}
												</CardTitle>
												{/*  */}

												{/*  */}
												<Badge className="bg-primary">Completed</Badge>
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
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
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
						<CardTitle className="text-xl">
							Choose Your Launch Strategy
						</CardTitle>
						{/*  */}

						{/*  */}
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
							{/*  */}

							{/*  */}
							<Card className="bg-secondary border-secondary-foreground dark:border-primary">
								{/*  */}

								{/*  */}
								<CardContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-2">
										{/*  */}

										{/*  */}
										<CardTitle className="flex items-center gap-2">
											{/*  */}

											{/*  */}
											<Save className="" />
											{/*  */}

											{/*  */}
											<p className="">Save as Draft</p>
											{/*  */}

											{/*  */}
										</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											Save your event privately. You can continue editing and
											publish later.
										</CardDescription>
										{/*  */}

										{/*  */}
										<div className="flex flex-col indent-2.5 text-sm">
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">
												Private and editable
											</li>
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">No guest access</li>
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">
												Perfect for planning
											</li>
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
							<Card className="dark:bg-secondary dark:border-primary border-yellow-500 bg-yellow-50/40">
								{/*  */}

								{/*  */}
								<CardContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-2">
										{/*  */}

										{/*  */}
										<CardTitle className="flex items-center gap-2">
											{/*  */}

											{/*  */}
											<Eye className="dark:text-primary text-yellow-500" />
											{/*  */}

											{/*  */}
											<p className="">Soft Launch</p>
											{/*  */}

											{/*  */}
										</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											Launch to a small group first to test everything works
											perfectly.
										</CardDescription>
										{/*  */}

										{/*  */}
										<div className="flex flex-col indent-2.5 text-sm">
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">
												Limited Audience
											</li>
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">
												Test functionality
											</li>
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">Gather feedback</li>
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
							<Card className="dark:bg-secondary dark:border-primary border-green-500 bg-green-50/40">
								{/*  */}

								{/*  */}
								<CardContent>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-2">
										{/*  */}

										{/*  */}
										<CardTitle className="flex items-center gap-2">
											{/*  */}

											{/*  */}
											<Rocket className="dark:text-primary text-green-500" />
											{/*  */}

											{/*  */}
											<p className="">Full Launch</p>
											{/*  */}

											{/*  */}
										</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription className="text-inherit">
											Make your event live and start inviting all yout guests.
										</CardDescription>
										{/*  */}

										{/*  */}
										<div className="flex flex-col indent-2.5 text-sm">
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">
												Public or pricate listings
											</li>
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">
												Send invitations
											</li>
											{/*  */}

											{/*  */}
											<li className="list-inside list-disc">
												Full functionality
											</li>
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
						</div>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent>
					{/*  */}

					<Card className="hidden border-purple-500 bg-purple-50">
						{/*  */}

						{/*  */}
						<CardContent>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<CardTitle className="text-xl">
										Post-Launch Monitoring
									</CardTitle>
									{/*  */}

									{/*  */}
									<CardDescription>
										Track your event&apos;s success with comprehensive analytics
										and insights
									</CardDescription>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									{/*  */}

									{/*  */}
									{postMonitoring?.map((item, index) => {
										return (
											<div
												className="flex items-center gap-2 rounded-lg bg-white p-4"
												key={index}
											>
												{/*  */}

												{/*  */}
												<item.icon className="size-10 text-purple-600" />
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-1">
													{/*  */}

													{/*  */}
													<CardTitle>{item.name}</CardTitle>
													{/*  */}

													{/*  */}
													<CardDescription>{item.description}</CardDescription>
													{/*  */}

													{/*  */}
												</div>
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
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
		</div>
	);
}
