"use client";

import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { CampaignDetail } from "../types";
import { getChannelInfo } from "../utils";

interface ChannelPerformanceSectionProps {
	channelMetrics: CampaignDetail["channelMetrics"];
}

export default function ChannelPerformanceSection({
	channelMetrics,
}: ChannelPerformanceSectionProps) {
	if (!channelMetrics || Object.keys(channelMetrics).length === 0) return null;

	const chartData = Object.entries(channelMetrics).map(
		([channelId, metrics]) => {
			let displayName = "";
			if (channelId === "mail") {
				displayName = "physical mail";
			} else if (channelId === "email") {
				displayName = "email";
			} else {
				const { name } = getChannelInfo(channelId);
				displayName = name.toLowerCase();
			}
			return {
				name: displayName,
				"Cost ($)": metrics.cost,
				Reach: metrics.reach,
			};
		},
	);

	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<h3 className="text-base font-semibold">Channel Performance</h3>
			<ChartContainer
				config={{
					cost: {
						label: "Cost ($)",
						color: "hsl(0 0% 0%)",
					},
					reach: {
						label: "Reach",
						color: "hsl(0 0% 0%)",
					},
				}}
				className="h-[250px] w-full"
			>
				<BarChart
					data={chartData}
					margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
				>
					<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
					<XAxis
						dataKey="name"
						tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
					/>
					<YAxis
						domain={[0, 340]}
						ticks={[0, 85, 170, 340]}
						tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
					/>
					<Legend />
					<Bar dataKey="Cost ($)" fill="hsl(0 0% 0%)" radius={[4, 4, 0, 0]} />
					<Bar dataKey="Reach" fill="hsl(0 0% 0%)" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ChartContainer>
		</div>
	);
}
