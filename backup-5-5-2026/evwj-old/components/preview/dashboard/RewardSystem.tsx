import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Crown,
	Gift,
	Lock,
	Palette,
	Shield,
	Sparkles,
	Star,
	Trophy,
	Unlock,
	Zap,
} from "lucide-react";

interface Reward {
	id: string;
	title: string;
	description: string;
	type: "feature" | "cosmetic" | "access" | "physical";
	unlocked: boolean;
	requiredLevel?: number;
	requiredXP?: number;
	requiredAchievement?: string;
	icon: React.ComponentType<any>;
	rarity: "common" | "rare" | "epic" | "legendary";
}

const rewards: Reward[] = [
	{
		id: "premium_templates",
		title: "Premium Templates",
		description: "Access to 50+ exclusive event templates",
		type: "feature",
		unlocked: true,
		requiredLevel: 2,
		icon: Palette,
		rarity: "common",
	},
	{
		id: "custom_branding",
		title: "Custom Branding",
		description: "Add your logo and colors to events",
		type: "feature",
		unlocked: true,
		requiredLevel: 3,
		icon: Crown,
		rarity: "rare",
	},
	{
		id: "priority_support",
		title: "Priority Support",
		description: "VIP customer support with 1-hour response",
		type: "access",
		unlocked: true,
		requiredLevel: 3,
		icon: Shield,
		rarity: "rare",
	},
	{
		id: "api_access",
		title: "API Access",
		description: "Developer API for custom integrations",
		type: "access",
		unlocked: false,
		requiredLevel: 4,
		icon: Zap,
		rarity: "epic",
	},
	{
		id: "white_label",
		title: "White Label Options",
		description: "Remove branding for professional use",
		type: "feature",
		unlocked: false,
		requiredLevel: 4,
		icon: Sparkles,
		rarity: "epic",
	},
	{
		id: "personal_concierge",
		title: "Personal Concierge",
		description: "Dedicated event planning assistant",
		type: "access",
		unlocked: false,
		requiredLevel: 5,
		icon: Star,
		rarity: "legendary",
	},
	{
		id: "host_merchandise",
		title: "Exclusive Merchandise",
		description: "Limited edition host branded items",
		type: "physical",
		unlocked: false,
		requiredXP: 10000,
		icon: Gift,
		rarity: "epic",
	},
	{
		id: "platinum_badge",
		title: "Platinum Host Badge",
		description: "Exclusive badge for your profile",
		type: "cosmetic",
		unlocked: false,
		requiredAchievement: "million_milestone",
		icon: Trophy,
		rarity: "legendary",
	},
];

const currentLevel = 3;
const currentXP = 3850;

const RewardSystem = () => {
	const getRarityColor = (rarity: string) => {
		switch (rarity) {
			case "common":
				return "from-gray-500 to-gray-600";
			case "rare":
				return "from-blue-500 to-blue-600";
			case "epic":
				return "from-purple-500 to-purple-600";
			case "legendary":
				return "from-yellow-500 to-orange-500";
			default:
				return "from-gray-500 to-gray-600";
		}
	};

	const getRarityBadgeColor = (rarity: string) => {
		switch (rarity) {
			case "common":
				return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
			case "rare":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
			case "epic":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
			case "legendary":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
		}
	};

	const isRewardUnlockable = (reward: Reward) => {
		if (reward.unlocked) return false;
		if (reward.requiredLevel && currentLevel >= reward.requiredLevel)
			return true;
		if (reward.requiredXP && currentXP >= reward.requiredXP) return true;
		return false;
	};

	const getUnlockProgress = (reward: Reward) => {
		if (reward.requiredLevel) {
			return Math.min((currentLevel / reward.requiredLevel) * 100, 100);
		}
		if (reward.requiredXP) {
			return Math.min((currentXP / reward.requiredXP) * 100, 100);
		}
		return 0;
	};

	const unlockedRewards = rewards.filter((r) => r.unlocked);
	const lockedRewards = rewards.filter((r) => !r.unlocked);

	return (
		<div className="space-y-6">
			{/* Unlocked Rewards */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Unlock className="h-5 w-5 text-green-500" />
						Your Rewards ({unlockedRewards.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{unlockedRewards.map((reward) => (
							<div
								key={reward.id}
								className={`rounded-lg bg-gradient-to-r p-4 ${getRarityColor(reward.rarity)} relative overflow-hidden text-white`}
							>
								<div className="absolute top-2 right-2">
									<Badge
										className={`text-xs ${getRarityBadgeColor(reward.rarity)}`}
									>
										{reward.rarity}
									</Badge>
								</div>
								<div className="flex items-start gap-3">
									<div className="rounded-full bg-white/20 p-2">
										<reward.icon className="h-5 w-5" />
									</div>
									<div className="flex-1">
										<h3 className="mb-1 font-semibold">{reward.title}</h3>
										<p className="text-sm text-white/80">
											{reward.description}
										</p>
										<div className="mt-2 flex items-center gap-2">
											<Badge className="border-0 bg-white/20 text-xs text-white">
												<Unlock className="mr-1 h-3 w-3" />
												Unlocked
											</Badge>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Locked Rewards */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Lock className="h-5 w-5 text-amber-500" />
						Upcoming Rewards ({lockedRewards.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{lockedRewards.map((reward) => {
							const progress = getUnlockProgress(reward);
							const isUnlockable = isRewardUnlockable(reward);

							return (
								<div
									key={reward.id}
									className={`rounded-lg border p-4 transition-all duration-200 ${
										isUnlockable
											? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10"
											: "border-border bg-muted/20"
									}`}
								>
									<div className="mb-3 flex items-start justify-between">
										<div className="flex flex-1 items-start gap-3">
											<div
												className={`rounded-full p-2 ${
													isUnlockable
														? "bg-green-100 dark:bg-green-900/20"
														: "bg-muted"
												}`}
											>
												<reward.icon
													className={`h-5 w-5 ${
														isUnlockable
															? "text-green-600"
															: "text-muted-foreground"
													}`}
												/>
											</div>
											<div className="flex-1">
												<div className="mb-1 flex items-center gap-2">
													<h3 className="text-foreground font-semibold">
														{reward.title}
													</h3>
													<Badge
														className={`text-xs ${getRarityBadgeColor(reward.rarity)}`}
													>
														{reward.rarity}
													</Badge>
												</div>
												<p className="text-muted-foreground mb-2 text-sm">
													{reward.description}
												</p>

												{/* Requirements */}
												<div className="text-muted-foreground text-xs">
													{reward.requiredLevel && (
														<span>Requires Level {reward.requiredLevel}</span>
													)}
													{reward.requiredXP && (
														<span>
															Requires {reward.requiredXP.toLocaleString()} XP
														</span>
													)}
													{reward.requiredAchievement && (
														<span>Requires specific achievement</span>
													)}
												</div>
											</div>
										</div>

										{isUnlockable && (
											<Button
												size="sm"
												className="border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90"
											>
												<Gift className="mr-1 h-3 w-3" />
												Claim
											</Button>
										)}
									</div>

									{/* Progress Bar */}
									{progress > 0 && progress < 100 && (
										<div className="space-y-1">
											<div className="text-muted-foreground flex justify-between text-xs">
												<span>Progress</span>
												<span>{Math.round(progress)}%</span>
											</div>
											<Progress value={progress} className="h-2" />
										</div>
									)}
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RewardSystem;
