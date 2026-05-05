"use client";

import { Mail, Send, Plane, MessageSquare, Camera } from "lucide-react";
import { CampaignData } from "../CreateCampaignDialog";
import ChannelCard from "../components/ChannelCard";
import {
	FacebookIcon,
	InstagramIcon,
	LinkedInIcon,
} from "../../integrations-tab/IntegrationIcons";

interface ChooseChannelsStepProps {
	data: CampaignData;
	onUpdate: (data: Partial<CampaignData>) => void;
}

export default function ChooseChannelsStep({
	data,
	onUpdate,
}: ChooseChannelsStepProps) {
	const toggleChannel = (
		category: keyof CampaignData["selectedChannels"],
		channelId: string,
	) => {
		const currentChannels = data.selectedChannels[category];
		const newChannels = currentChannels.includes(channelId)
			? currentChannels.filter((id) => id !== channelId)
			: [...currentChannels, channelId];

		onUpdate({
			selectedChannels: {
				...data.selectedChannels,
				[category]: newChannels,
			},
		});
	};

	const isChannelSelected = (
		category: keyof CampaignData["selectedChannels"],
		channelId: string,
	) => {
		return data.selectedChannels[category].includes(channelId);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="text-center space-y-3">
				<div className="flex justify-center">
					<Mail className="h-12 w-12 text-blue-600" />
				</div>
				<h2 className="text-2xl font-bold">Choose Your Channels</h2>
				<p className="text-muted-foreground">
					Select how you want to reach your audience
				</p>
			</div>

			{/* Direct Messaging */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<h3 className="text-sm font-semibold">DIRECT MESSAGING</h3>
					<span className="text-xs     font-semibold bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">
						Target Specific Guests
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<ChannelCard
						id="email"
						name="Email"
						description="Direct communication"
						icon={Mail}
						iconBg="bg-blue-600"
						selected={isChannelSelected("directMessaging", "email")}
						onToggle={() => toggleChannel("directMessaging", "email")}
					/>
					<ChannelCard
						id="sms"
						name="SMS"
						description="Instant messaging"
						icon={MessageSquare}
						iconBg="bg-green-600"
						selected={isChannelSelected("directMessaging", "sms")}
						onToggle={() => toggleChannel("directMessaging", "sms")}
					/>
					<ChannelCard
						id="mail"
						name="Mail"
						description="Premium touchpoint"
						icon={Send}
						iconBg="bg-orange-600"
						selected={isChannelSelected("directMessaging", "mail")}
						onToggle={() => toggleChannel("directMessaging", "mail")}
					/>
				</div>
			</div>

			{/* Social Media Posts */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<h3 className="text-sm font-semibold">SOCIAL MEDIA POSTS</h3>
					<span className="text-xs font-semibold bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">
						Organic Content
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<ChannelCard
						id="linkedin-post"
						name="LinkedIn"
						description="Professional networks"
						icon={LinkedInIcon}
						iconBg="bg-blue-600"
						selected={isChannelSelected("socialMediaPosts", "linkedin-post")}
						onToggle={() => toggleChannel("socialMediaPosts", "linkedin-post")}
					/>
					<ChannelCard
						id="instagram-post"
						name="Instagram"
						description="Visual storytelling"
						icon={InstagramIcon}
						iconBg="bg-gradient-to-br from-purple-500 to-pink-500"
						selected={isChannelSelected("socialMediaPosts", "instagram-post")}
						onToggle={() => toggleChannel("socialMediaPosts", "instagram-post")}
					/>
					<ChannelCard
						id="facebook-post"
						name="Facebook"
						description="Social engagement"
						icon={FacebookIcon}
						iconBg="bg-blue-600"
						selected={isChannelSelected("socialMediaPosts", "facebook-post")}
						onToggle={() => toggleChannel("socialMediaPosts", "facebook-post")}
					/>
				</div>
			</div>

			{/* Social Media Ads */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<h3 className="text-sm font-semibold">SOCIAL MEDIA ADS</h3>
					<span className="text-xs font-semibold bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">
						Paid Campaigns
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<ChannelCard
						id="linkedin-ad"
						name="LinkedIn Ad"
						description="Targeted B2B reach"
						icon={LinkedInIcon}
						iconBg="bg-blue-600"
						selected={isChannelSelected("socialMediaAds", "linkedin-ad")}
						onToggle={() => toggleChannel("socialMediaAds", "linkedin-ad")}
					/>
					<ChannelCard
						id="instagram-ad"
						name="Instagram Ad"
						description="Visual paid ads"
						icon={InstagramIcon}
						iconBg="bg-gradient-to-br from-purple-500 to-pink-500"
						selected={isChannelSelected("socialMediaAds", "instagram-ad")}
						onToggle={() => toggleChannel("socialMediaAds", "instagram-ad")}
					/>
					<ChannelCard
						id="facebook-ad"
						name="Facebook Ad"
						description="Broad audience reach"
						icon={FacebookIcon}
						iconBg="bg-blue-600"
						selected={isChannelSelected("socialMediaAds", "facebook-ad")}
						onToggle={() => toggleChannel("socialMediaAds", "facebook-ad")}
					/>
				</div>
			</div>
		</div>
	);
}
