import { Campaign, CampaignStatus } from "../types";
import { Mail, Package } from "lucide-react";
import {
	LinkedInIcon,
	InstagramIcon,
	FacebookIcon,
} from "../../integrations-tab/IntegrationIcons";

interface ChannelInfo {
	icon:
		| typeof Mail
		| typeof LinkedInIcon
		| typeof InstagramIcon
		| typeof FacebookIcon;
	name: string;
	color: string;
}

interface StatusBadge {
	label: string;
	className: string;
}

/**
 * Groups campaigns by month and year for timeline display
 */
export function groupCampaignsByMonth(campaigns: Campaign[]) {
	const grouped: { [key: string]: Campaign[] } = {};

	campaigns.forEach((campaign) => {
		const monthYear = campaign.date.toLocaleDateString("en-US", {
			month: "long",
			year: "numeric",
		});
		if (!grouped[monthYear]) {
			grouped[monthYear] = [];
		}
		grouped[monthYear].push(campaign);
	});

	// Sort campaigns within each month (most recent first)
	Object.values(grouped).forEach((campaigns) => {
		campaigns.sort((a, b) => b.date.getTime() - a.date.getTime());
	});

	// Sort months (most recent first) by comparing dates from first campaign in each group
	return Object.entries(grouped).sort((a, b) => {
		const dateA = a[1][0]?.date || new Date(0);
		const dateB = b[1][0]?.date || new Date(0);
		return dateB.getTime() - dateA.getTime();
	});
}

/**
 * Returns channel information including icon, name, and color scheme
 */
export function getChannelInfo(channelId: string): ChannelInfo {
	if (channelId === "email") {
		return {
			icon: Mail,
			name: "email",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	}
	if (channelId === "sms") {
		return {
			icon: Mail,
			name: "sms",
			color:
				"bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300",
		};
	}
	if (channelId === "physical") {
		return {
			icon: Package,
			name: "physical",
			color:
				"bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300",
		};
	}
	if (
		channelId === "linkedin" ||
		channelId === "linkedin-post" ||
		channelId === "linkedin-ad"
	) {
		return {
			icon: LinkedInIcon,
			name: "linkedin",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	}
	if (
		channelId === "instagram" ||
		channelId === "instagram-post" ||
		channelId === "instagram-ad"
	) {
		return {
			icon: InstagramIcon,
			name: "instagram",
			color:
				"bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300",
		};
	}
	if (
		channelId === "facebook" ||
		channelId === "facebook-post" ||
		channelId === "facebook-ad"
	) {
		return {
			icon: FacebookIcon,
			name: "facebook",
			color: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
		};
	}
	return {
		icon: Mail,
		name: channelId,
		color: "bg-gray-100 dark:bg-gray-950/30 text-gray-700 dark:text-gray-300",
	};
}

/**
 * Returns status badge configuration for campaign status
 */
export function getStatusBadge(status: CampaignStatus): StatusBadge {
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
