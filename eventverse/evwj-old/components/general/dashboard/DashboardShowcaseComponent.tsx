"use client";

import { StatCard } from "@/components/ui/stat-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { cn } from "@/lib/utils";
import { Calendar, Trophy, Users, Zap } from "lucide-react";
import { useMemo } from "react";

export default function DashboardShowcaseComponent() {
	//
	const cardsData = useMemo(
		() => [
			{
				title: "Total Events",
				content: 29,
				description: "+2 this month",
				trend: { value: 15, label: "vs last month" },
				icon: Calendar,
				iconClassName: "from-blue-500/20 to-blue-600/10",
				borderClassName: "border-blue-100 dark:border-blue-900/20",
			},
			{
				title: "Total Guests",
				content: 21034,
				description: "Top 5% hosts",
				trend: { value: 23, label: "vs last month" },
				icon: Users,
				iconClassName: "from-green-500/20 to-green-600/10",
				borderClassName: "border-green-100 dark:border-green-900/20",
			},
			{
				title: "Success Rate",
				content: 93,
				description: "Excellent",
				trend: { value: 5, label: "improvement" },
				icon: Trophy,
				iconClassName: "from-yellow-500/20 to-yellow-600/10",
				borderClassName: "border-yellow-100 dark:border-yellow-900/20",
			},
			{
				title: "XP Points",
				content: 3850,
				description: "+250 this week",
				trend: { value: 8, label: "this week" },
				icon: Zap,
				iconClassName: "from-purple-500/20 to-purple-600/10",
				borderClassName: "border-purple-100 dark:border-purple-900/20",
			},
		],
		[],
	);
	//
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
			{/*  */}

			{/*  */}
			{cardsData?.map((item, index) => {
				const displayValue =
					item.title === "Success Rate" ? (
						<>
							<AnimatedNumber value={item.content} />%
						</>
					) : item.title === "Total Guests" || item.title === "XP Points" ? (
						<AnimatedNumber
							value={item.content}
							formatFn={(val) => Math.floor(val).toLocaleString()}
						/>
					) : (
						<AnimatedNumber value={item.content} />
					);

				return (
					<StatCard
						key={index}
						title={item.title}
						value={displayValue}
						icon={item.icon}
						trend={item.trend}
						iconClassName={item.iconClassName}
						className={cn(
							"hover:scale-105 transition-all duration-300",
							item.borderClassName,
						)}
					/>
				);
			})}
			{/*  */}

			{/*  */}
		</div>
	);
}
