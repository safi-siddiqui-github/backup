import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { format } from "date-fns";
import { Plus, Settings, Trophy } from "lucide-react";

type EnhancedHeaderProps = {
  userName?: string;
  level: number;
  xp: number;
  nextLevelXp: number;
};

const getGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 12) return "Good morning";
	if (hour < 18) return "Good afternoon";
	return "Good evening";
};

export default function ({
	userName,
	level,
	xp,
	nextLevelXp,
}: EnhancedHeaderProps) {
	// const navigate = useNavigate();
	const levelProgress = ((xp % nextLevelXp) / nextLevelXp) * 100;

	return (
		<div className="relative mb-8 overflow-hidden rounded-2xl">
			{/* Animated gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--border))_1px,_transparent_0)] [background-size:40px_40px] opacity-20" />

			{/* Glass-morphism container */}
			<div className="relative border border-white/20 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-800/20 dark:bg-gray-900/60">
				<div className="flex items-center justify-between">
					{/* Left: User greeting + level */}
					<div className="space-y-3">
						<div className="flex items-center gap-4">
							<h1 className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
								{getGreeting()}, {userName}!
							</h1>
							<Badge className="border-0 bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-base text-white shadow-lg transition-all duration-300 hover:shadow-xl">
								<Trophy className="mr-2 h-4 w-4" />
								Level {level}
							</Badge>
						</div>
						<p className="text-muted-foreground flex items-center gap-2 text-lg">
							<span className="font-medium">
								{format(new Date(), "EEEE, MMMM d")}
							</span>
							<span className="text-border">•</span>
							<span>Continue your amazing journey</span>
						</p>
					</div>

					{/* Right: Action buttons + Progress */}
					<div className="flex items-center gap-6">
						<div className="flex gap-3">
							<Button
								// onClick={() => navigate("/create-event")}
								className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
								size="lg"
							>
								<Plus className="mr-2 h-5 w-5" />
								Create Event
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="border-border/50 hover:bg-accent/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
							>
								<Settings className="mr-2 h-5 w-5" />
								Settings
							</Button>
						</div>

						{/* Level Progress Circle */}
						<div className="hidden lg:block">
							<CircularProgress
								value={levelProgress}
								size={80}
								strokeWidth={6}
								showValue={false}
								color="hsl(var(--primary))"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
