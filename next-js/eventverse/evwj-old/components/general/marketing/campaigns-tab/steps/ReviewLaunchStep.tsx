"use client";

import {
	Sparkles,
	Rocket,
	Users,
	Mail,
	MessageSquare,
	Send,
} from "lucide-react";
import { CampaignData } from "../CreateCampaignDialog";
import { cn } from "@/lib/utils";
import {
	LinkedInIcon,
	InstagramIcon,
	FacebookIcon,
} from "../../integrations-tab/IntegrationIcons";
import { SocialMediaPostData } from "../components/content-forms/SocialMediaPostForm";
import { SocialMediaAdData } from "../components/content-forms/SocialMediaAdForm";
import { EmailContentData } from "../components/content-forms/EmailContentForm";
import { PhysicalMailContentData } from "../components/content-forms/PhysicalMailContentForm";

interface ReviewLaunchStepProps {
	data: CampaignData;
	onUpdate: (data: Partial<CampaignData>) => void;
}

// Mock segments data (same as SelectAudienceStep)
const MOCK_SEGMENTS = [
	{
		id: "vip-guests",
		name: "VIP Guests",
		avatars: [
			{ initials: "SJ", color: "bg-green-500" },
			{ initials: "ER", color: "bg-pink-500" },
		],
		guestCount: 45,
	},
	{
		id: "wedding-attendees",
		name: "Wedding Attendees",
		avatars: [{ initials: "SJ", color: "bg-green-500" }],
		guestCount: 120,
	},
	{
		id: "corporate-attendees",
		name: "Corporate Event Attendees",
		avatars: [
			{ initials: "MC", color: "bg-orange-500" },
			{ initials: "ER", color: "bg-pink-500" },
		],
		guestCount: 89,
	},
	{
		id: "high-spenders",
		name: "High Spenders",
		avatars: [{ initials: "ER", color: "bg-pink-500" }],
		guestCount: 23,
	},
];

export default function ReviewLaunchStep({ data }: ReviewLaunchStepProps) {
	const totalChannels =
		data.selectedChannels.directMessaging.length +
		data.selectedChannels.socialMediaPosts.length +
		data.selectedChannels.socialMediaAds.length;

	// Get selected segments data
	const selectedSegmentsData = MOCK_SEGMENTS.filter((segment) =>
		data.selectedSegments.includes(segment.id),
	);

	const totalGuests = selectedSegmentsData.reduce(
		(sum, segment) => sum + segment.guestCount,
		0,
	);

	// Collect unique avatars (limit to first 3 for display)
	const allAvatars = selectedSegmentsData.flatMap((segment) => segment.avatars);
	const uniqueAvatars = Array.from(
		new Map(allAvatars.map((avatar) => [avatar.initials, avatar])).values(),
	).slice(0, 3);

	// Helper to get channel icon and name
	const getChannelInfo = (channelId: string) => {
		if (channelId === "email")
			return { icon: Mail, name: "Email", color: "bg-blue-600" };
		if (channelId === "sms")
			return { icon: MessageSquare, name: "SMS", color: "bg-green-600" };
		if (channelId === "mail")
			return { icon: Send, name: "Mail", color: "bg-orange-600" };
		if (channelId === "linkedin-post")
			return {
				icon: LinkedInIcon,
				name: "LinkedIn Post",
				color: "bg-blue-600",
			};
		if (channelId === "instagram-post")
			return {
				icon: InstagramIcon,
				name: "Instagram Post",
				color: "bg-gradient-to-br from-purple-500 to-pink-500",
			};
		if (channelId === "facebook-post")
			return {
				icon: FacebookIcon,
				name: "Facebook Post",
				color: "bg-blue-600",
			};
		if (channelId === "linkedin-ad")
			return { icon: LinkedInIcon, name: "LinkedIn Ads", color: "bg-blue-600" };
		if (channelId === "instagram-ad")
			return {
				icon: InstagramIcon,
				name: "Instagram Ads",
				color: "bg-gradient-to-br from-purple-500 to-pink-500",
			};
		if (channelId === "facebook-ad")
			return { icon: FacebookIcon, name: "Facebook Ads", color: "bg-blue-600" };
		return { icon: Mail, name: channelId, color: "bg-gray-600" };
	};

	// Render content preview card
	const renderContentPreview = (channelId: string) => {
		const content = data.content[channelId];
		if (!content) return null;

		const { icon: Icon, name } = getChannelInfo(channelId);

		// SMS Content
		if (channelId === "sms" && "message" in content) {
			return (
				<div
					key={channelId}
					className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-3"
				>
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
							<MessageSquare className="h-4 w-4 text-white" />
						</div>
						<span className="font-semibold text-sm">{name}</span>
					</div>
					<p className="text-sm text-muted-foreground line-clamp-2">
						{content.message || "No message"}
					</p>
				</div>
			);
		}

		// Email Content
		if (channelId === "email" && "subjectLine" in content) {
			const emailContent = content as EmailContentData;
			return (
				<div
					key={channelId}
					className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-3"
				>
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<Mail className="h-4 w-4 text-white" />
						</div>
						<span className="font-semibold text-sm">{name}</span>
					</div>
					<div className="space-y-1">
						<p className="text-xs font-semibold text-muted-foreground">
							Subject: {emailContent.subjectLine || "No subject"}
						</p>
						<p className="text-sm text-muted-foreground line-clamp-2">
							{emailContent.bodyContent || "No content"}
						</p>
					</div>
				</div>
			);
		}

		// Physical Mail Content
		if (channelId === "mail" && "subjectLine" in content) {
			const mailContent = content as PhysicalMailContentData;
			return (
				<div
					key={channelId}
					className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-3"
				>
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
							<Send className="h-4 w-4 text-white" />
						</div>
						<span className="font-semibold text-sm">{name}</span>
					</div>
					<div className="space-y-1">
						<p className="text-xs font-semibold text-muted-foreground">
							{mailContent.subjectLine || "No subject"}
						</p>
						<p className="text-sm text-muted-foreground line-clamp-2">
							{mailContent.bodyContent || "No content"}
						</p>
					</div>
				</div>
			);
		}

		// Social Media Posts
		if (channelId.includes("-post") && "postContent" in content) {
			const postContent = content as SocialMediaPostData;
			return (
				<div
					key={channelId}
					className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-3"
				>
					<div className="flex items-center gap-2">
						<div
							className={cn(
								"w-8 h-8 rounded-lg flex items-center justify-center",
								getChannelInfo(channelId).color,
							)}
						>
							<Icon className="h-4 w-4 text-white" />
						</div>
						<span className="font-semibold text-sm">{name}</span>
					</div>
					<p className="text-sm text-muted-foreground line-clamp-2">
						{postContent.postContent || "No content"}
					</p>
				</div>
			);
		}

		// Social Media Ads
		if (channelId.includes("-ad") && "headline" in content) {
			const adContent = content as SocialMediaAdData;
			return (
				<div
					key={channelId}
					className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-3"
				>
					<div className="flex items-center gap-2">
						<div
							className={cn(
								"w-8 h-8 rounded-lg flex items-center justify-center",
								getChannelInfo(channelId).color,
							)}
						>
							<Icon className="h-4 w-4 text-white" />
						</div>
						<span className="font-semibold text-sm">{name}</span>
					</div>
					<div className="space-y-1">
						<p className="text-xs font-semibold">
							{adContent.headline || "No headline"}
						</p>
						<p className="text-sm text-muted-foreground line-clamp-2">
							{adContent.description || "No description"}
						</p>
						{adContent.callToAction && (
							<div className="pt-1">
								<span className="text-xs text-blue-600">
									CTA: {adContent.callToAction}
								</span>
							</div>
						)}
					</div>
				</div>
			);
		}

		return null;
	};

	const allSelectedChannels = [
		...data.selectedChannels.directMessaging,
		...data.selectedChannels.socialMediaPosts,
		...data.selectedChannels.socialMediaAds,
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="text-center space-y-3">
				<div className="flex items-center justify-center gap-2">
					<Sparkles className="h-6 w-6 text-blue-600" />
					<h2 className="text-2xl font-bold">Ready to Launch!</h2>
					<span className="text-2xl">🚀</span>
				</div>
				<p className="text-muted-foreground">
					Review your campaign details before launching
				</p>
			</div>

			{/* Two Column Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Left Section - Campaign Details with Gradient BG */}
				<div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-6">
					<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
						Campaign Details
					</h3>

					{/* Campaign Name */}
					<div>
						<p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
							Campaign Name
						</p>
						<p className="text-lg font-bold">
							{data.name || "Untitled Campaign"}
						</p>
					</div>

					{/* Description */}
					{data.description && (
						<div>
							<p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
								Description
							</p>
							<p className="text-sm text-muted-foreground">
								{data.description}
							</p>
						</div>
					)}

					{/* Target Audience */}
					{data.selectedSegments.length > 0 && (
						<div>
							<p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
								Target Audience
							</p>
							<div className="flex items-center gap-3">
								<div className="flex -space-x-2">
									{uniqueAvatars.map((avatar, index) => (
										<div
											key={index}
											className={cn(
												"w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-slate-700",
												avatar.color,
											)}
										>
											{avatar.initials}
										</div>
									))}
								</div>
								<span className="text-sm font-semibold">
									{totalGuests} guests targeted
								</span>
							</div>
						</div>
					)}

					{/* Channels */}
					<div>
						<p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
							Channels ({totalChannels})
						</p>
						<div className="flex flex-wrap gap-2">
							{allSelectedChannels.map((channelId) => {
								const { icon: Icon, name, color } = getChannelInfo(channelId);
								return (
									<div
										key={channelId}
										className={cn(
											"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white",
											color,
										)}
									>
										<Icon className="h-3.5 w-3.5" />
										<span>{name}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Right Section - Content Preview */}
				<div className="space-y-4">
					<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
						Content Preview
					</h3>
					<div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
						{allSelectedChannels.map((channelId) =>
							renderContentPreview(channelId),
						)}
						{allSelectedChannels.length === 0 && (
							<p className="text-sm text-muted-foreground text-center py-8">
								No content to preview
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
