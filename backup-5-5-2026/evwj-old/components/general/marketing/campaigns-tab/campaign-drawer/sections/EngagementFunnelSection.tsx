"use client";

import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { CampaignDetail } from "../types";

interface EngagementFunnelSectionProps {
	metrics: CampaignDetail["metrics"];
}

export default function EngagementFunnelSection({
	metrics,
}: EngagementFunnelSectionProps) {
	if (!metrics) return null;

	const funnelData = [
		{ name: "Sent", value: metrics.reach || 0 },
		{ name: "Delivered", value: metrics.delivered || 0 },
		{ name: "Opened", value: metrics.opened || 0 },
		{ name: "Clicked", value: metrics.clicked || 0 },
		{ name: "Converted", value: metrics.conversions || 0 },
	];

	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<h3 className="text-base font-semibold">Engagement Funnel</h3>
			<ChartContainer
				config={{
					value: {
						label: "Value",
						color: "hsl(221.2 83.2% 53.3%)",
					},
				}}
				className="h-[250px] w-full"
			>
				<BarChart
					data={funnelData}
					margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
				>
					<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
					<XAxis
						dataKey="name"
						tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
					/>
					<YAxis
						domain={[0, 80]}
						ticks={[0, 20, 40, 60, 80]}
						tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
					/>
					<Bar
						dataKey="value"
						fill="hsl(221.2 83.2% 53.3%)"
						radius={[4, 4, 0, 0]}
					>
						{funnelData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={index === 0 ? "hsl(221.2 83.2% 53.3%)" : "hsl(0 0% 0%)"}
							/>
						))}
					</Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
}
