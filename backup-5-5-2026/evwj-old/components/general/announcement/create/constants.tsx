"use client";

import {
	Cloud,
	Clock,
	Mail,
	Megaphone,
	ParkingCircle,
	ShieldCheck,
	Ticket,
	TriangleAlert,
	UserCheck,
	Users,
} from "lucide-react";
import type { AnnouncementType, AudienceOption } from "../announcement-types";

export const ANNOUNCEMENT_TYPES: AnnouncementType[] = [
	{
		name: "General Announcement",
		icon: <Megaphone size={20} />,
		textColor: "text-blue-600",
		iconContainerBg: "bg-blue-100",
		selectedBgColor: "bg-blue-50",
		selectedBorderColor: "border-blue-500",
		priority: "medium",
		defaultTitle: "Important Event Update",
		defaultMessage:
			"We have an important update regarding your upcoming event. Please read the details below and contact us if you have any questions.",
	},
	{
		name: "Urgent Update",
		icon: <TriangleAlert size={20} />,
		textColor: "text-red-600",
		iconContainerBg: "bg-red-100",
		selectedBgColor: "bg-red-50",
		selectedBorderColor: "border-red-500",
		priority: "high",
		defaultTitle: "Urgent Event Update",
		defaultMessage:
			"This is an urgent update regarding the event. Please review the following information immediately.",
	},
	{
		name: "Schedule Change",
		icon: <Clock size={20} />,
		textColor: "text-orange-600",
		iconContainerBg: "bg-orange-100",
		selectedBgColor: "bg-orange-50",
		selectedBorderColor: "border-orange-500",
		priority: "medium",
		defaultTitle: "Schedule Change Notification",
		defaultMessage:
			"Please note that there has been a change to the event schedule. The updated details are as follows.",
	},
	{
		name: "Weather Update",
		icon: <Cloud size={20} />,
		textColor: "text-teal-600",
		iconContainerBg: "bg-teal-100",
		selectedBgColor: "bg-teal-50",
		selectedBorderColor: "border-teal-500",
		priority: "low",
		defaultTitle: "Weather Advisory",
		defaultMessage:
			"Here is the latest weather update for the event. Please plan accordingly.",
	},
	{
		name: "Parking Info",
		icon: <ParkingCircle size={20} />,
		textColor: "text-purple-600",
		iconContainerBg: "bg-purple-100",
		selectedBgColor: "bg-purple-50",
		selectedBorderColor: "border-purple-500",
		priority: "low",
		defaultTitle: "Parking Information",
		defaultMessage:
			"Please find important parking information and instructions for the event below.",
	},
	{
		name: "Safety Notice",
		icon: <ShieldCheck size={20} />,
		textColor: "text-green-600",
		iconContainerBg: "bg-green-100",
		selectedBgColor: "bg-green-50",
		selectedBorderColor: "border-green-500",
		priority: "high",
		defaultTitle: "Important Safety Notice",
		defaultMessage:
			"Your safety is our priority. Please read the following safety notice carefully.",
	},
];

export const AUDIENCE_OPTIONS: AudienceOption[] = [
	{
		id: "All Attendees",
		icon: <Users size={20} className="text-gray-500" />,
		title: "All Attendees",
		description: "Send to everyone (0 total recipients)",
		totalCount: 0,
	},
	{
		id: "Specific RSVP Groups",
		icon: <UserCheck size={20} className="text-gray-500" />,
		title: "Specific RSVP Groups",
		description: "Target specific guest groups",
		subOptions: [
			{ id: "VIP Guests", name: "VIP Guests", count: 45 },
			{ id: "Wedding Party", name: "Wedding Party", count: 12 },
			{
				id: "Family & Close Friends",
				name: "Family & Close Friends",
				count: 78,
			},
			{ id: "General Guests", name: "General Guests", count: 115 },
		],
	},
	{
		id: "Specific Ticket Tiers",
		icon: <Ticket size={20} className="text-gray-500" />,
		title: "Specific Ticket Tiers",
		description: "Target ticket holders by tier",
		subOptions: [
			{ id: "VIP Ticket", name: "VIP Ticket", count: 30 },
			{ id: "General Admission", name: "General Admission", count: 180 },
			{ id: "Early Bird", name: "Early Bird", count: 40 },
		],
	},
	{
		id: "Custom Email List",
		icon: <Mail size={20} className="text-gray-500" />,
		title: "Custom Email List",
		description: "Enter specific email addresses",
	},
];

export const PRIORITY_PREVIEW_STYLES: Record<
	"high" | "medium" | "low",
	string
> = {
	high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
	medium: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
	low: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};
