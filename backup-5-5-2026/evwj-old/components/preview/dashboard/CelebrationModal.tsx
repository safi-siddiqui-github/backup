import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PartyPopper, Sparkles, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface CelebrationModalProps {
	open: boolean;
	onClose: () => void;
	achievement: {
		title: string;
		description: string;
		xpReward: number;
		tier: string;
		icon: React.ComponentType<any>;
	} | null;
}

const CelebrationModal = ({
	open,
	onClose,
	achievement,
}: CelebrationModalProps) => {
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		if (open) {
			setShowConfetti(true);
			const timer = setTimeout(() => setShowConfetti(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [open]);

	if (!achievement) return null;

	const getTierColor = (tier: string) => {
		switch (tier) {
			case "bronze":
				return "from-amber-500 to-orange-600";
			case "silver":
				return "from-gray-400 to-gray-600";
			case "gold":
				return "from-yellow-400 to-yellow-600";
			case "platinum":
				return "from-blue-400 to-blue-600";
			case "diamond":
				return "from-purple-400 to-pink-600";
			default:
				return "from-gray-400 to-gray-600";
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="mx-auto max-w-md overflow-hidden border-0 p-0 text-center">
				{/* Confetti Animation */}
				{showConfetti && (
					<div className="pointer-events-none absolute inset-0 z-10">
						{[...Array(20)].map((_, i) => (
							<div
								key={i}
								className="absolute animate-bounce"
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
									animationDelay: `${Math.random() * 2}s`,
									animationDuration: `${1 + Math.random()}s`,
								}}
							>
								<Sparkles className="h-4 w-4 text-yellow-400" />
							</div>
						))}
					</div>
				)}

				{/* Main Content */}
				<div
					className={`relative bg-gradient-to-br ${getTierColor(achievement.tier)} p-8 text-white`}
				>
					<div className="space-y-4">
						{/* Achievement Icon */}
						<div className="animate-scale-in mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
							<achievement.icon className="h-8 w-8" />
						</div>

						{/* Achievement Title */}
						<div className="space-y-2">
							<div className="flex items-center justify-center gap-2">
								<PartyPopper className="h-5 w-5" />
								<h2 className="text-xl font-bold">Achievement Unlocked!</h2>
								<PartyPopper className="h-5 w-5" />
							</div>
							<h3 className="text-2xl font-bold">{achievement.title}</h3>
						</div>

						{/* Achievement Description */}
						<p className="text-sm leading-relaxed text-white/90">
							{achievement.description}
						</p>

						{/* Tier Badge */}
						<Badge className="border-0 bg-white/20 px-3 py-1 text-sm text-white">
							{achievement.tier.toUpperCase()} TIER
						</Badge>

						{/* XP Reward */}
						{achievement.xpReward > 0 && (
							<div className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2">
								<Zap className="h-4 w-4" />
								<span className="font-semibold">
									+{achievement.xpReward} XP
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Bottom Section */}
				<div className="bg-background space-y-4 p-6">
					<div className="text-center">
						<p className="text-muted-foreground text-sm">
							Keep up the amazing work! Your dedication to creating exceptional
							events is paying off.
						</p>
					</div>

					<div className="flex gap-3">
						<Button
							onClick={onClose}
							className="flex-1 border-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
						>
							<Trophy className="mr-2 h-4 w-4" />
							Awesome!
						</Button>
						<Button variant="outline" onClick={onClose} className="flex-1">
							Share Achievement
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CelebrationModal;
