"use client";

import { useState } from "react";
import { MessageSquare, Mail, Send } from "lucide-react";
import { CampaignData } from "../CreateCampaignDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SMSContentForm from "../components/content-forms/SMSContentForm";
import EmailContentForm from "../components/content-forms/EmailContentForm";
import PhysicalMailContentForm from "../components/content-forms/PhysicalMailContentForm";
import LinkedInPostForm from "../components/content-forms/LinkedInPostForm";
import InstagramPostForm from "../components/content-forms/InstagramPostForm";
import FacebookPostForm from "../components/content-forms/FacebookPostForm";
import LinkedInAdForm from "../components/content-forms/LinkedInAdForm";
import InstagramAdForm from "../components/content-forms/InstagramAdForm";
import FacebookAdForm from "../components/content-forms/FacebookAdForm";
import { SocialMediaPostData } from "../components/content-forms/SocialMediaPostForm";
import { SocialMediaAdData } from "../components/content-forms/SocialMediaAdForm";
import { EmailContentData } from "../components/content-forms/EmailContentForm";
import { PhysicalMailContentData } from "../components/content-forms/PhysicalMailContentForm";
import {
	LinkedInIcon,
	InstagramIcon,
	FacebookIcon,
} from "../../integrations-tab/IntegrationIcons";

interface CreateContentStepProps {
	data: CampaignData;
	onUpdate: (data: Partial<CampaignData>) => void;
}

export default function CreateContentStep({
	data,
	onUpdate,
}: CreateContentStepProps) {
	const [activeChannel, setActiveChannel] = useState<string>("");

	// Get all selected channels with icons
	const getChannelIcon = (id: string) => {
		if (id === "sms") return MessageSquare;
		if (id === "email") return Mail;
		if (id === "mail") return Send;
		if (id === "linkedin-post" || id === "linkedin-ad") return LinkedInIcon;
		if (id === "instagram-post" || id === "instagram-ad") return InstagramIcon;
		if (id === "facebook-post" || id === "facebook-ad") return FacebookIcon;
		return MessageSquare; // Default icon
	};

	const allSelectedChannels = [
		...data.selectedChannels.directMessaging.map((id) => ({
			id,
			name: id === "email" ? "Email" : id === "sms" ? "SMS" : "Physical Mail",
			category: "directMessaging",
			icon: getChannelIcon(id),
		})),
		...data.selectedChannels.socialMediaPosts.map((id) => ({
			id,
			name:
				id.replace("-post", "").replace(/^\w/, (c) => c.toUpperCase()) +
				" Post",
			category: "socialMediaPosts",
			icon: getChannelIcon(id),
		})),
		...data.selectedChannels.socialMediaAds.map((id) => ({
			id,
			name:
				id.replace("-ad", "").replace(/^\w/, (c) => c.toUpperCase()) + " Ad",
			category: "socialMediaAds",
			icon: getChannelIcon(id),
		})),
	];

	// Set initial active channel
	if (!activeChannel && allSelectedChannels.length > 0) {
		setActiveChannel(allSelectedChannels[0].id);
	}

	const updateChannelContent = (channelId: string, content: any) => {
		onUpdate({
			content: {
				...data.content,
				[channelId]: content,
			},
		});
	};

	const renderContentForm = (channelId: string) => {
		if (channelId === "sms") {
			return (
				<SMSContentForm
					content={data.content[channelId] || { message: "" }}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		if (channelId === "email") {
			return (
				<EmailContentForm
					content={
						(data.content[channelId] as EmailContentData) || {
							subjectLine: "",
							bodyContent: "",
							callToActionText: "",
							buttonUrl: "",
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		if (channelId === "mail") {
			return (
				<PhysicalMailContentForm
					content={
						(data.content[channelId] as PhysicalMailContentData) || {
							subjectLine: "",
							bodyContent: "",
							callToActionText: "",
							buttonUrl: "",
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		if (channelId === "linkedin-post") {
			return (
				<LinkedInPostForm
					content={
						(data.content[channelId] as SocialMediaPostData) || {
							postContent: "",
							hashtags: "",
							mentions: "",
							callToActionLink: "",
							media: [],
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		if (channelId === "instagram-post") {
			return (
				<InstagramPostForm
					content={
						(data.content[channelId] as SocialMediaPostData) || {
							postContent: "",
							hashtags: "",
							mentions: "",
							callToActionLink: "",
							media: [],
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		if (channelId === "facebook-post") {
			return (
				<FacebookPostForm
					content={
						(data.content[channelId] as SocialMediaPostData) || {
							postContent: "",
							hashtags: "",
							mentions: "",
							callToActionLink: "",
							media: [],
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		// Social Media Ads
		if (channelId === "linkedin-ad") {
			return (
				<LinkedInAdForm
					content={
						(data.content[channelId] as SocialMediaAdData) || {
							headline: "",
							description: "",
							callToAction: "Learn More",
							destinationUrl: "",
							budget: {
								dailyBudget: 0,
								targetAudience: "Auto (Based on your guests)",
								adPlacement: "Automatic (Recommended)",
							},
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		if (channelId === "instagram-ad") {
			return (
				<InstagramAdForm
					content={
						(data.content[channelId] as SocialMediaAdData) || {
							headline: "",
							description: "",
							callToAction: "Learn More",
							destinationUrl: "",
							budget: {
								dailyBudget: 0,
								targetAudience: "Auto (Based on your guests)",
								adPlacement: "Automatic (Recommended)",
							},
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		if (channelId === "facebook-ad") {
			return (
				<FacebookAdForm
					content={
						(data.content[channelId] as SocialMediaAdData) || {
							headline: "",
							description: "",
							callToAction: "Learn More",
							destinationUrl: "",
							budget: {
								dailyBudget: 0,
								targetAudience: "Auto (Based on your guests)",
								adPlacement: "Automatic (Recommended)",
							},
						}
					}
					onUpdate={(content) => updateChannelContent(channelId, content)}
				/>
			);
		}

		// Add more channel forms as needed
		return (
			<div className="p-8 text-center text-muted-foreground">
				Content form for {channelId} coming soon...
			</div>
		);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="text-center space-y-3">
				<div className="flex justify-center">
					<MessageSquare className="h-12 w-12 text-blue-600" />
				</div>
				<h2 className="text-2xl font-bold">Craft Your Message</h2>
				<p className="text-muted-foreground">
					Create compelling content for each channel
				</p>
			</div>

			{/* Channel Tabs */}
			{allSelectedChannels.length > 0 ? (
				<Tabs value={activeChannel} onValueChange={setActiveChannel}>
					<TabsList className="w-full justify-start overflow-x-auto bg-gray-100 dark:bg-slate-800 p-1 h-auto">
						{allSelectedChannels.map((channel) => {
							const Icon = channel.icon;
							return (
								<TabsTrigger
									key={channel.id}
									value={channel.id}
									className="gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-2 rounded-md"
								>
									<Icon className="h-4 w-4" />
									{channel.name}
								</TabsTrigger>
							);
						})}
					</TabsList>

					{allSelectedChannels.map((channel) => (
						<TabsContent key={channel.id} value={channel.id}>
							{renderContentForm(channel.id)}
						</TabsContent>
					))}
				</Tabs>
			) : (
				<div className="text-center py-12 text-muted-foreground">
					No channels selected. Please go back and select at least one channel.
				</div>
			)}
		</div>
	);
}
