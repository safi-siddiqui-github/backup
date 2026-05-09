import { EmailContentData } from "../components/content-forms/EmailContentForm";
import { PhysicalMailContentData } from "../components/content-forms/PhysicalMailContentForm";
import { SocialMediaPostData } from "../components/content-forms/SocialMediaPostForm";
import { SocialMediaAdData } from "../components/content-forms/SocialMediaAdForm";

export interface CampaignDetail {
	id: string;
	name: string;
	description: string;
	status: "scheduled" | "draft" | "completed";
	createdDate?: Date;
	channels: string[];
	audiences: string[];
	content?: {
		[key: string]: any;
	};
	metrics?: {
		reach?: number;
		delivered?: number;
		opened?: number;
		clicked?: number;
		conversions?: number;
		engagement?: number;
		conversion?: number;
		roi?: number;
	};
	channelMetrics?: {
		[channelId: string]: {
			cost: number;
			reach: number;
		};
	};
}

export interface CampaignDetailDrawerProps {
	campaign: CampaignDetail | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onEdit?: (campaignId: string) => void;
	onDuplicate?: (campaignId: string) => void;
	onDelete?: (campaignId: string) => void;
}

export interface Segment {
	id: string;
	name: string;
	description: string;
	guestCount: number;
	avatars: Array<{
		initials: string;
		color: string;
	}>;
}

// Type guard functions
export function isEmailContent(content: any): content is EmailContentData {
	return content && typeof content.subjectLine === "string";
}

export function isPhysicalMailContent(
	content: any,
): content is PhysicalMailContentData {
	return (
		content && typeof content.subjectLine === "string" && !("email" in content)
	);
}

export function isSocialMediaPostContent(
	content: any,
): content is SocialMediaPostData {
	return content && typeof content.postContent === "string";
}

export function isSocialMediaAdContent(
	content: any,
): content is SocialMediaAdData {
	return (
		content &&
		typeof content.headline === "string" &&
		typeof content.description === "string"
	);
}
