"use client";

import { Target, LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CampaignDetail } from "../types";
import { getChannelInfo } from "../utils";

interface CampaignOverviewSectionProps {
	campaign: CampaignDetail;
}

export default function CampaignOverviewSection({
	campaign,
}: CampaignOverviewSectionProps) {
	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<div className="flex items-center gap-2">
				<Target className="h-5 w-5" />
				<h3 className="text-base font-semibold">Campaign Overview</h3>
			</div>
			<div className="space-y-3">
				<div>
					<p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
						Created
					</p>
					<p className="text-sm">
						{campaign.createdDate
							? campaign.createdDate.toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
								})
							: "N/A"}
					</p>
				</div>
				<Separator />
				<div>
					<p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
						Channels
					</p>
					<div className="flex flex-wrap gap-2">
						{campaign.channels.map((channel) => {
							const { icon: Icon, name, color } = getChannelInfo(channel);
							return (
								<span
									key={channel}
									className={cn(
										"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
										color,
									)}
								>
									<Icon className="h-3.5 w-3.5" />
									{name}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
