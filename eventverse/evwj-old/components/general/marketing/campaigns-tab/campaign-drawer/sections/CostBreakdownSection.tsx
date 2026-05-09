"use client";

import { DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CampaignDetail } from "../types";
import { getChannelInfo } from "../utils";

interface CostBreakdownSectionProps {
	channelMetrics: CampaignDetail["channelMetrics"];
}

export default function CostBreakdownSection({
	channelMetrics,
}: CostBreakdownSectionProps) {
	if (!channelMetrics || Object.keys(channelMetrics).length === 0) return null;

	const totalCost = Object.values(channelMetrics).reduce(
		(sum, metrics) => sum + metrics.cost,
		0,
	);

	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<div className="flex items-center gap-2">
				<DollarSign className="h-5 w-5 text-blue-600" />
				<h3 className="text-base font-semibold">Cost Breakdown</h3>
			</div>
			<div className="space-y-3">
				{Object.entries(channelMetrics).map(([channelId, metrics]) => {
					let displayName = "";
					if (channelId === "mail") {
						displayName = "Physical Mail";
					} else {
						const { name } = getChannelInfo(channelId);
						displayName = name;
					}
					return (
						<div key={channelId} className="flex items-center justify-between">
							<span className="text-sm font-medium">{displayName}</span>
							<span className="text-sm font-semibold">
								${metrics.cost.toLocaleString()}
							</span>
						</div>
					);
				})}
				<Separator className="my-3" />
				<div className="flex items-center justify-between">
					<span className="text-sm font-semibold">Total Cost</span>
					<span className="text-sm font-bold">
						${totalCost.toLocaleString()}
					</span>
				</div>
			</div>
		</div>
	);
}
