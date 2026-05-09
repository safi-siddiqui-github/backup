"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent } from "@/shadcn/ui/card";
import { format } from "date-fns";
import {
	Calendar,
	Clock,
	Globe,
	Lock,
	MapPin,
	Share,
	Star,
	User,
} from "lucide-react";
 
import Image from "next/image";
import { MockAttendingEvent } from "./MockAttendingEvents";
 


export const eventTypeGradients: Record<string, string> = {
	Wedding: "from-pink-500 via-rose-500 to-red-500",
	Conference: "from-blue-500 via-indigo-500 to-purple-500",
	Party: "from-purple-500 via-pink-500 to-fuchsia-500",
	Concert: "from-orange-500 via-red-500 to-pink-500",
	Sports: "from-green-500 via-emerald-500 to-teal-500",
	"Birthday Party": "from-purple-500 via-pink-500 to-rose-500",
	"Baby Shower": "from-pink-400 via-rose-400 to-pink-500",
	Anniversary: "from-rose-500 via-red-500 to-pink-600",
	Corporate: "from-slate-500 via-gray-600 to-slate-700",
	Default: "from-purple-500 via-blue-500 to-indigo-500",
};

export const moduleGradients: Record<string, string> = {
	rsvp: "from-green-400 to-emerald-600",
	tickets: "from-green-400 to-emerald-600",
	schedule: "from-blue-400 to-blue-600",
	seating: "from-purple-400 to-purple-600",
	media: "from-pink-400 to-pink-600",
	games: "from-orange-400 to-red-600",
	surveys: "from-indigo-400 to-indigo-600",
	travel: "from-cyan-400 to-blue-600",
};

export const statusColors: Record<string, string> = {
	confirmed: "bg-green-500",
	pending: "bg-amber-500",
	declined: "bg-red-500",
	attending: "bg-green-500",
	"checked-in": "bg-emerald-500",
	hot: "bg-gradient-to-r from-red-500 to-orange-500",
	live: "bg-gradient-to-r from-purple-500 to-pink-500",
	vip: "bg-gradient-to-r from-yellow-400 to-orange-500",
};

export const getEventTypeGradient = (eventType?: string): string => {
	if (!eventType) return eventTypeGradients.Default;
	const key = Object.keys(eventTypeGradients).find((k) =>
		eventType.toLowerCase().includes(k.toLowerCase()),
	);
	return eventTypeGradients[key || "Default"];
};

export const getEventTypeBorder = (eventType?: string): string => {
	if (!eventType) return "border-l-purple-500";

	if (eventType.toLowerCase().includes("wedding")) return "border-l-pink-500";
	if (eventType.toLowerCase().includes("conference"))
		return "border-l-blue-500";
	if (eventType.toLowerCase().includes("party")) return "border-l-purple-500";
	if (eventType.toLowerCase().includes("concert")) return "border-l-orange-500";
	if (eventType.toLowerCase().includes("sport")) return "border-l-green-500";

	return "border-l-indigo-500";
};
type AttendingEventCardProps = {
	event: MockAttendingEvent;
	onEventSelect: (event: MockAttendingEvent) => void;
};

export default function WebAttendingEventCardComponent({
	event,
	onEventSelect,
}: AttendingEventCardProps) {
	const router = useRouter();

	const handleCardClick = () => {
		onEventSelect?.(event);
		router.push("/dashboard/attending");
	};

	const now = new Date();
	const eventIsInPast = event.startDate < now;
	const eventIsToday = event.startDate.toDateString() === now.toDateString();

	const ticketDetails = event.ticketDetails || {
		quantity: 1,
		type: "General Admission",
		totalPaid: event.ticketPrice,
		checkedIn: eventIsInPast,
	};

	const dynamicTags = generateEventTags(
		{
			category: event.category,
			eventType: event.eventType,
			subcategory: event.subcategory,
			format: event.format,
			startDate: event.startDate,
			ticketDetails: ticketDetails,
			moduleUsage: event.moduleUsage,
			maxCapacity: event.maxCapacity,
			attendeeCount: event.attendeeCount,
		},
		"attending",
		eventIsInPast,
	);

	const eventGradient = getEventTypeGradient(event.eventType);
	const borderColor = getEventTypeBorder(event.eventType);
	const hasGames =
		event.moduleUsage?.games && event.moduleUsage.games.participated.length > 0;

	return (
		<Card
			className={`group bg-card animate-fade-in relative cursor-pointer overflow-hidden border-0 border-l-4 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl ${borderColor}`}
			onClick={handleCardClick}
		>
			{/* Glassmorphism overlay on hover */}
			<div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			{/* Event Image with gradient overlay */}
			<div className="relative h-52 overflow-hidden">
				<div
					className={`absolute inset-0 bg-gradient-to-br ${eventGradient} opacity-60`}
				/>
				<Image
					src={event.image}
					alt={event.eventName}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
					priority
				/>

				{/* Floating Status Badges */}
				<div className="absolute top-3 left-3 flex flex-wrap gap-2">
					<Badge
						className={`border-0 shadow-lg backdrop-blur-sm ${
							ticketDetails.checkedIn
								? "bg-emerald-500/90 text-white"
								: eventIsToday
								? "animate-pulse bg-orange-500/90 text-white"
								: "bg-blue-500/90 text-white"
						}`}
					>
						{ticketDetails.checkedIn
							? "✓ Checked In"
							: eventIsToday
							? "⚡ Today"
							: "✓ Confirmed"}
					</Badge>

					{hasGames && (
						<Badge className="animate-pulse border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg">
							🔥 Live Games
						</Badge>
					)}
				</div>

				{/* Privacy Badge */}
				<Badge
					className={`absolute top-3 right-3 flex items-center gap-1 border-0 shadow-lg backdrop-blur-sm ${
						event.isPublic
							? "bg-green-500/90 text-white"
							: "bg-red-500/90 text-white"
					}`}
				>
					{event.isPublic ? (
						<>
							<Globe className="h-3 w-3" />
							Public
						</>
					) : (
						<>
							<Lock className="h-3 w-3" />
							Private
						</>
					)}
				</Badge>

				{/* Ticket/Guest Count - Bottom */}
				<div className="absolute right-3 bottom-3">
					<Badge className="text-foreground border-0 bg-white/95 px-3 py-1 shadow-lg backdrop-blur-sm dark:bg-gray-900/95">
						{event.moduleUsage?.rsvp
							? `👥 ${1 + (Number(event.moduleUsage.rsvp.responses?.plusOnes) || 0)} Guest${1 + (Number(event.moduleUsage.rsvp.responses?.plusOnes) || 0) > 1 ? "s" : ""}`
							: `🎟️ ${ticketDetails.quantity} Ticket${ticketDetails.quantity > 1 ? "s" : ""}`}
					</Badge>
				</div>

				{/* Quick Actions on Hover */}
				<div className="absolute bottom-3 left-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					<Button
						size="sm"
						variant="secondary"
						className="h-8 bg-white/90 backdrop-blur-sm hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-800"
						onClick={(e) => {
							e.stopPropagation();
							// Share functionality
						}}
					>
						<Share className="mr-1 h-3 w-3" />
						Share
					</Button>
				</div>
			</div>

			<CardContent className="relative space-y-4 p-6">
				{/* Date and Time with gradient accent */}
				<div
					className={`flex items-center gap-2 bg-gradient-to-r text-sm font-semibold ${eventGradient} bg-clip-text text-transparent`}
				>
					<Calendar className="text-primary h-4 w-4" />
					<span>{format(event.startDate, "EEE, MMM d")}</span>
					<span>•</span>
					<Clock className="text-primary h-4 w-4" />
					<span>{event.time}</span>
				</div>

				{/* Event Title with gradient on hover */}
				<h3 className="text-foreground text-xl leading-tight font-bold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent">
					{event.eventName}
				</h3>

				{/* Location */}
				<div className="text-muted-foreground flex items-center gap-2 text-sm">
					<MapPin className="text-primary h-4 w-4" />
					<span
						className={
							event.locations[0].name === "Online Event"
								? "text-primary font-medium"
								: ""
						}
					>
						{event.locations[0].name}
					</span>
				</div>

				{/* Dynamic Event Tags */}
				<div className="flex flex-wrap gap-2">
					{dynamicTags.slice(0, 3).map(
						(tag: { text: string; color: string }, index: number) => (
							<Badge
								key={index}
								className={`text-xs ${tag.color} border-0 shadow-sm`}
							>
								{tag.text}
							</Badge>
						)
					)}
				</div>

				{/* Separator */}
				<div className="border-border border-t pt-4" />

				{/* Host and Payment Info */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div
							className={`h-10 w-10 bg-gradient-to-br ${eventGradient} flex items-center justify-center rounded-full shadow-md`}
						>
							<User className="h-5 w-5 text-white" />
						</div>
						<div>
							<p className="text-foreground text-sm font-medium">
								{event.hostName}
							</p>
							<div className="flex items-center gap-1">
								<Star className="h-3 w-3 fill-current text-yellow-500" />
								<span className="text-muted-foreground text-xs font-medium">
									{event.hostRating}
								</span>
							</div>
						</div>
					</div>
					<div className="text-right">
						{event.moduleUsage?.rsvp ? (
							<div>
								<span className="text-muted-foreground text-xs">RSVP</span>
								<p className="text-foreground text-sm font-bold">
									{event.moduleUsage.rsvp.status === "attending"
										? "✓ Attending"
										: event.moduleUsage.rsvp.status === "confirmed"
										? "✓ Confirmed"
										: event.moduleUsage.rsvp.status}
								</p>
							</div>
						) : (
							<div>
								<span className="text-muted-foreground text-xs">Paid</span>
								<p className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-lg font-bold text-transparent">
									${ticketDetails.totalPaid}
								</p>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
// Generate dynamic event tags based on event properties
function generateEventTags(
	{
		category,
		eventType,
		subcategory,
		format,
		startDate,
		ticketDetails,
		moduleUsage,
		maxCapacity,
		attendeeCount,
	}: {
		category: string;
		eventType: string;
		subcategory: string | undefined;
		format: string;
		startDate: Date;
		ticketDetails:
			| {
					quantity: number;
					type: string;
					ticketNumbers: string[];
					qrCode: string;
					purchaseDate: string;
					totalPaid: number;
					checkedIn: boolean;
					checkInTime?: string;
			  }
			| {
					quantity: number;
					type: string;
					totalPaid: number;
					checkedIn: boolean;
			  };
		moduleUsage: {
			rsvp: {
				status: "confirmed" | "pending" | "declined" | "attending";
				responses?: Record<string, unknown>;
			};
			seating: {
				tableNumber?: number;
				seatNumber?: string;
				assignment?: string;
			};
			media: {
				photosUploaded: number;
				albumAccess: boolean;
			};
			games: {
				participated: string[];
				points: number;
				rank?: number;
			};
			surveys: {
				completed: string[];
				pending: string[];
			};
		};
		maxCapacity: number;
		attendeeCount: number;
	},
	context: string,
	eventIsInPast: boolean
) {
	const tags: { text: string; color: string }[] = [];

	// Event type/category
	if (eventType) {
		tags.push({
			text: eventType,
			color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
		});
	} else if (category) {
		tags.push({
			text: category,
			color: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
		});
	}

	// Subcategory or format
	if (subcategory) {
		tags.push({
			text: subcategory,
			color: "bg-gradient-to-r from-pink-400 to-rose-500 text-white",
		});
	} else if (format) {
		tags.push({
			text: format,
			color: "bg-gradient-to-r from-indigo-400 to-blue-500 text-white",
		});
	}

	// RSVP status or ticket type
	if (moduleUsage?.rsvp) {
		const status = moduleUsage.rsvp.status;
		let color = "bg-gray-400 text-white";
		if (status === "confirmed" || status === "attending") color = "bg-green-500 text-white";
		else if (status === "pending") color = "bg-amber-500 text-white";
		else if (status === "declined") color = "bg-red-500 text-white";
		tags.push({
			text: status.charAt(0).toUpperCase() + status.slice(1),
			color,
		});
	} else if (ticketDetails?.type) {
		tags.push({
			text: ticketDetails.type,
			color: "bg-gradient-to-r from-green-400 to-emerald-600 text-white",
		});
	}

	// Capacity/attendance
	if (typeof maxCapacity === "number" && typeof attendeeCount === "number" && maxCapacity > 0) {
		const percent = Math.round((attendeeCount / maxCapacity) * 100);
		let color = "bg-blue-500 text-white";
		if (percent > 90) color = "bg-red-500 text-white";
		else if (percent > 70) color = "bg-orange-500 text-white";
		else if (percent > 40) color = "bg-yellow-500 text-white";
		tags.push({
			text: `${attendeeCount}/${maxCapacity} attending`,
			color,
		});
	}

	// Games participation
	if (moduleUsage?.games && moduleUsage.games.participated.length > 0) {
		tags.push({
			text: "Games",
			color: "bg-gradient-to-r from-orange-400 to-red-500 text-white",
		});
	}

	// Media uploads
	if (moduleUsage?.media && moduleUsage.media.photosUploaded > 0) {
		tags.push({
			text: `${moduleUsage.media.photosUploaded} Photo${moduleUsage.media.photosUploaded > 1 ? "s" : ""}`,
			color: "bg-gradient-to-r from-pink-400 to-pink-600 text-white",
		});
	}

	// Past event
	if (eventIsInPast) {
		tags.push({
			text: "Past Event",
			color: "bg-gray-400 text-white",
		});
	}

	return tags;
}
 