import { LucideIcon } from "lucide-react";
import { Mail, MessageSquare, Send } from "lucide-react";
import {
	LinkedInIcon,
	InstagramIcon,
	FacebookIcon,
} from "../../integrations-tab/IntegrationIcons";
import { CampaignDetail } from "./types";
import { EmailContentData } from "../components/content-forms/EmailContentForm";
import { PhysicalMailContentData } from "../components/content-forms/PhysicalMailContentForm";
import { SocialMediaPostData } from "../components/content-forms/SocialMediaPostForm";
import { SocialMediaAdData } from "../components/content-forms/SocialMediaAdForm";
import { Segment } from "./types";

export interface ChannelInfo {
	icon: LucideIcon | React.ComponentType<{ className?: string }>;
	name: string;
	color: string;
}

export function getChannelInfo(channelId: string): ChannelInfo {
	if (channelId === "email")
		return {
			icon: Mail,
			name: "Email",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	if (channelId === "sms")
		return {
			icon: MessageSquare,
			name: "SMS",
			color:
				"bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300",
		};
	if (channelId === "mail")
		return {
			icon: Send,
			name: "Physical Mail",
			color:
				"bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300",
		};
	if (channelId === "linkedin-post")
		return {
			icon: LinkedInIcon,
			name: "LinkedIn Post",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	if (channelId === "instagram-post")
		return {
			icon: InstagramIcon,
			name: "Instagram Post",
			color:
				"bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300",
		};
	if (channelId === "facebook-post")
		return {
			icon: FacebookIcon,
			name: "Facebook Post",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	if (channelId === "linkedin-ad")
		return {
			icon: LinkedInIcon,
			name: "LinkedIn Ads",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	if (channelId === "instagram-ad")
		return {
			icon: InstagramIcon,
			name: "Instagram Ads",
			color:
				"bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300",
		};
	if (channelId === "facebook-ad")
		return {
			icon: FacebookIcon,
			name: "Facebook Ads",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	return {
		icon: Mail,
		name: channelId,
		color: "bg-gray-100 dark:bg-gray-950/30 text-gray-700 dark:text-gray-300",
	};
}

export function getStatusBadge(status: CampaignDetail["status"]) {
	switch (status) {
		case "scheduled":
			return {
				label: "Scheduled",
				className:
					"bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
			};
		case "draft":
			return {
				label: "Draft",
				className:
					"bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800",
			};
		case "completed":
			return {
				label: "Completed",
				className:
					"bg-gray-50 dark:bg-gray-950/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800",
			};
		default:
			return {
				label: status,
				className:
					"bg-gray-50 dark:bg-gray-950/30 text-gray-700 dark:text-gray-300",
			};
	}
}

export function isContentComplete(channelId: string, content: any): boolean {
	if (!content) return false;

	if (channelId === "sms") {
		return content.message && content.message.trim().length > 0;
	}
	if (channelId === "email") {
		const emailContent = content as EmailContentData;
		return !!(
			emailContent.subjectLine?.trim() &&
			emailContent.bodyContent?.trim() &&
			emailContent.callToActionText?.trim() &&
			emailContent.buttonUrl?.trim()
		);
	}
	if (channelId === "mail") {
		const mailContent = content as PhysicalMailContentData;
		return !!(
			mailContent.subjectLine?.trim() &&
			mailContent.bodyContent?.trim() &&
			mailContent.callToActionText?.trim() &&
			mailContent.buttonUrl?.trim()
		);
	}
	if (channelId.includes("-post")) {
		const postContent = content as SocialMediaPostData;
		return !!postContent.postContent?.trim();
	}
	if (channelId.includes("-ad")) {
		const adContent = content as SocialMediaAdData;
		return !!(
			adContent.headline?.trim() &&
			adContent.description?.trim() &&
			adContent.destinationUrl?.trim()
		);
	}
	return false;
}

export const MOCK_SEGMENTS: Segment[] = [
	{
		id: "vip-guests",
		name: "VIP Guests",
		description: "Guests who purchased VIP or higher tier tickets",
		guestCount: 45,
		avatars: [
			{ initials: "SJ", color: "bg-green-500" },
			{ initials: "ER", color: "bg-pink-500" },
		],
	},
	{
		id: "wedding-attendees",
		name: "Wedding Attendees",
		description: "Guests who attended wedding events",
		guestCount: 120,
		avatars: [{ initials: "SJ", color: "bg-green-500" }],
	},
	{
		id: "corporate-attendees",
		name: "Corporate Event Attendees",
		description: "Guests who attended corporate events",
		guestCount: 89,
		avatars: [
			{ initials: "MC", color: "bg-orange-500" },
			{ initials: "ER", color: "bg-pink-500" },
		],
	},
	{
		id: "high-spenders",
		name: "High Spenders",
		description: "Guests who spent over $1000",
		guestCount: 23,
		avatars: [{ initials: "ER", color: "bg-pink-500" }],
	},
];
