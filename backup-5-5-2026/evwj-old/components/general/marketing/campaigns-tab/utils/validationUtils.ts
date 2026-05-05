import { CampaignData } from "../CreateCampaignDialog";
import { z } from "zod";

// Validation schemas for each content type
const smsContentSchema = z.object({
	message: z.string().trim().min(1, "Message is required"),
});

const emailContentSchema = z.object({
	subjectLine: z.string().trim().min(1, "Subject line is required"),
	bodyContent: z.string().trim().min(1, "Body content is required"),
	callToActionText: z.string().trim().min(1, "Call to action text is required"),
	buttonUrl: z
		.string()
		.trim()
		.min(1, "Button URL is required")
		.url("Please enter a valid URL"),
});

const physicalMailContentSchema = z.object({
	subjectLine: z.string().trim().min(1, "Subject line is required"),
	bodyContent: z.string().trim().min(1, "Body content is required"),
	callToActionText: z.string().trim().min(1, "Call to action text is required"),
	buttonUrl: z
		.string()
		.trim()
		.min(1, "Button URL is required")
		.url("Please enter a valid URL"),
});

const socialMediaPostSchema = z.object({
	postContent: z.string().trim().min(1, "Post content is required"),
});

const socialMediaAdSchema = z.object({
	headline: z.string().trim().min(1, "Headline is required"),
	description: z.string().trim().min(1, "Description is required"),
	destinationUrl: z
		.string()
		.trim()
		.min(1, "Destination URL is required")
		.url("Please enter a valid URL"),
});

/**
 * Validates if a channel's content has all required fields filled
 */
export function validateChannelContent(
	channelId: string,
	content: any,
): boolean {
	// Content must exist and be an object
	if (!content || typeof content !== "object") {
		return false;
	}

	try {
		// Direct Messaging
		if (channelId === "sms") {
			// Check message exists and is not empty
			if (
				!content.message ||
				typeof content.message !== "string" ||
				content.message.trim().length === 0
			) {
				return false;
			}
			smsContentSchema.parse(content);
			return true;
		}
		if (channelId === "email") {
			// Check all required fields exist and are not empty
			if (
				!content.subjectLine ||
				typeof content.subjectLine !== "string" ||
				content.subjectLine.trim().length === 0
			) {
				return false;
			}
			if (
				!content.bodyContent ||
				typeof content.bodyContent !== "string" ||
				content.bodyContent.trim().length === 0
			) {
				return false;
			}
			if (
				!content.callToActionText ||
				typeof content.callToActionText !== "string" ||
				content.callToActionText.trim().length === 0
			) {
				return false;
			}
			if (
				!content.buttonUrl ||
				typeof content.buttonUrl !== "string" ||
				content.buttonUrl.trim().length === 0
			) {
				return false;
			}
			emailContentSchema.parse(content);
			return true;
		}
		if (channelId === "mail") {
			// Check all required fields exist and are not empty
			if (
				!content.subjectLine ||
				typeof content.subjectLine !== "string" ||
				content.subjectLine.trim().length === 0
			) {
				return false;
			}
			if (
				!content.bodyContent ||
				typeof content.bodyContent !== "string" ||
				content.bodyContent.trim().length === 0
			) {
				return false;
			}
			if (
				!content.callToActionText ||
				typeof content.callToActionText !== "string" ||
				content.callToActionText.trim().length === 0
			) {
				return false;
			}
			if (
				!content.buttonUrl ||
				typeof content.buttonUrl !== "string" ||
				content.buttonUrl.trim().length === 0
			) {
				return false;
			}
			physicalMailContentSchema.parse(content);
			return true;
		}

		// Social Media Posts
		if (channelId.includes("-post")) {
			// Check postContent exists and is not empty
			if (
				!content.postContent ||
				typeof content.postContent !== "string" ||
				content.postContent.trim().length === 0
			) {
				return false;
			}
			socialMediaPostSchema.parse(content);
			return true;
		}

		// Social Media Ads
		if (channelId.includes("-ad")) {
			// Check all required fields exist and are not empty
			if (
				!content.headline ||
				typeof content.headline !== "string" ||
				content.headline.trim().length === 0
			) {
				return false;
			}
			if (
				!content.description ||
				typeof content.description !== "string" ||
				content.description.trim().length === 0
			) {
				return false;
			}
			if (
				!content.destinationUrl ||
				typeof content.destinationUrl !== "string" ||
				content.destinationUrl.trim().length === 0
			) {
				return false;
			}
			socialMediaAdSchema.parse(content);
			return true;
		}

		return false;
	} catch (error) {
		return false;
	}
}

/**
 * Validates all selected channels have their required content filled
 */
export function validateAllChannelContent(data: CampaignData): boolean {
	const allSelectedChannels = [
		...data.selectedChannels.directMessaging,
		...data.selectedChannels.socialMediaPosts,
		...data.selectedChannels.socialMediaAds,
	];

	// If no channels selected, validation fails
	if (allSelectedChannels.length === 0) {
		return false;
	}

	// Check each selected channel has valid content
	for (const channelId of allSelectedChannels) {
		const content = data.content[channelId];
		const isValid = validateChannelContent(channelId, content);
		if (!isValid) {
			// Debug: uncomment to see which channel is failing
			// console.log(`Validation failed for channel: ${channelId}`, content);
			return false;
		}
	}

	return true;
}
