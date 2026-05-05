import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Calendar,
	Sparkles,
	Star,
	Target,
	TrendingUp,
	Trophy,
	Users,
} from "lucide-react";

type Milestone = {
	id: string;
	title: string;
	description: string;
	current: number;
	target: number;
	category: "guests" | "events" | "rating" | "streak";
	icon: React.ComponentType<any>;
	reward: string;
	timeEstimate: string;
};

const upcomingMilestones: Milestone[] = [
	{
		id: "5k_guests",
		title: "5K Community Builder",
		description: "Host a total of 5,000 guests",
		current: 3847,
		target: 5000,
		category: "guests",
		icon: Users,
		reward: "Premium templates & Priority support",
		timeEstimate: "2 months",
	},
	{
		id: "perfect_month",
		title: "Perfect Month",
		description: "Maintain 5.0 rating for 30 days",
		current: 18,
		target: 30,
		category: "rating",
		icon: Star,
		reward: "Gold badge & Feature spotlight",
		timeEstimate: "12 days",
	},
	{
		id: "century_events",
		title: "Century Host",
		description: "Complete 100 successful events",
		current: 73,
		target: 100,
		category: "events",
		icon: Calendar,
		reward: "Custom branding options",
		timeEstimate: "4 months",
	},
	{
		id: "innovation_master",
		title: "Innovation Master",
		description: "Use all 15 platform modules",
		current: 12,
		target: 15,
		category: "streak",
		icon: Sparkles,
		reward: "Beta access & API keys",
		timeEstimate: "1 month",
	},
];

export default function () {
	const getProgressColor = (progress: number) => {
		if (progress >= 90) return "bg-gradient-to-r from-green-500 to-emerald-500";
		if (progress >= 70) return "bg-gradient-to-r from-yellow-500 to-orange-500";
		if (progress >= 50) return "bg-gradient-to-r from-blue-500 to-purple-500";
		return "bg-gradient-to-r from-gray-500 to-gray-600";
	};

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "guests":
				return Users;
			case "events":
				return Calendar;
			case "rating":
				return Star;
			case "streak":
				return Sparkles;
			default:
				return Target;
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Target className="h-5 w-5 text-blue-500" />
					Milestone Countdown
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{upcomingMilestones.map((milestone) => {
						const progress = (milestone.current / milestone.target) * 100;
						const remaining = milestone.target - milestone.current;

						return (
							<div key={milestone.id} className="space-y-3">
								<div className="flex items-start justify-between">
									<div className="flex flex-1 items-start gap-3">
										<div className="from-primary/20 to-primary/10 rounded-full bg-gradient-to-br p-2">
											<milestone.icon className="text-primary h-5 w-5" />
										</div>
										<div className="flex-1">
											<h3 className="text-foreground flex items-center gap-2 font-semibold">
												{milestone.title}
												{progress >= 90 && (
													<Badge className="border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-xs text-white">
														Almost there!
													</Badge>
												)}
											</h3>
											<p className="text-muted-foreground mb-2 text-sm">
												{milestone.description}
											</p>
											<div className="text-muted-foreground flex items-center gap-4 text-xs">
												<span>ETA: {milestone.timeEstimate}</span>
												<span>•</span>
												<span>Reward: {milestone.reward}</span>
											</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-foreground text-2xl font-bold">
											{remaining.toLocaleString()}
										</div>
										<div className="text-muted-foreground text-xs">to go</div>
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">
											{milestone.current.toLocaleString()} /{" "}
											{milestone.target.toLocaleString()}
										</span>
										<span className="text-foreground font-medium">
											{Math.round(progress)}%
										</span>
									</div>
									<div className="relative">
										<Progress value={progress} className="h-3" />
										<div
											className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
											style={{ width: `${progress}%` }}
										/>
									</div>
								</div>

								{progress >= 95 && (
									<div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-3 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Trophy className="h-4 w-4 text-green-600" />
												<span className="text-sm font-medium text-green-800 dark:text-green-400">
													Almost unlocked! Just {remaining} more to go!
												</span>
											</div>
											<Button
												size="sm"
												className="border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90"
											>
												<TrendingUp className="mr-1 h-3 w-3" />
												Push Forward
											</Button>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
