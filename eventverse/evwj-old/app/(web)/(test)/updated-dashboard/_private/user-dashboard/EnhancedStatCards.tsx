import { StatCard } from "@/components/ui/stat-card";
import { Calendar, Sparkles, Trophy, Users } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
 

type EnhancedStatCardsProps = {
  totalEvents: number;
  totalGuests: number;
  successRate: number;
  xp: number;
};

export default function ({
	totalEvents,
	totalGuests,
	successRate,
	xp,
}: EnhancedStatCardsProps) {
	return (
		<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
			<StatCard
				title="Total Events"
				value={<AnimatedNumber value={totalEvents} />}
				icon={Calendar}
				trend={{ value: 15, label: "vs last month" }}
				iconClassName="from-blue-500/20 to-blue-600/10"
				className="border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-blue-900/20"
			/>

			<StatCard
				title="Total Guests"
				value={
					<AnimatedNumber
						value={totalGuests}
						formatFn={(val) => Math.floor(val).toLocaleString()}
					/>
				}
				icon={Users}
				trend={{ value: 23, label: "vs last month" }}
				iconClassName="from-green-500/20 to-green-600/10"
				className="border-green-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-green-900/20"
			/>

			<StatCard
				title="Success Rate"
				value={
					<>
						<AnimatedNumber value={successRate} />%
					</>
				}
				icon={Trophy}
				trend={{ value: 5, label: "improvement" }}
				iconClassName="from-yellow-500/20 to-yellow-600/10"
				className="border-yellow-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-yellow-900/20"
			/>

			<StatCard
				title="XP Points"
				value={
					<AnimatedNumber
						value={xp}
						formatFn={(val) => Math.floor(val).toLocaleString()}
					/>
				}
				icon={Sparkles}
				trend={{ value: 8, label: "this week" }}
				iconClassName="from-purple-500/20 to-purple-600/10"
				className="border-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-purple-900/20"
			/>
		</div>
	);
}
