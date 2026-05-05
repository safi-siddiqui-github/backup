"use client";

import { CampaignDetail } from "../types";
import { getChannelInfo } from "../utils";
import ChannelContentCard from "../components/ChannelContentCard";

interface ChannelContentSectionProps {
	campaign: CampaignDetail;
}

export default function ChannelContentSection({
	campaign,
}: ChannelContentSectionProps) {
	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<h3 className="text-base font-semibold">Channel Content</h3>
			<div className="space-y-4">
				{campaign.channels.map((channelId) => {
					const content = campaign.content?.[channelId];
					const { icon, name } = getChannelInfo(channelId);

					return (
						<ChannelContentCard
							key={channelId}
							channelId={channelId}
							channelName={name}
							icon={icon}
							content={content}
						/>
					);
				})}
			</div>
		</div>
	);
}
