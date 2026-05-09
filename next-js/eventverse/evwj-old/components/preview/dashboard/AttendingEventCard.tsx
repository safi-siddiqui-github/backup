"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	getEventTypeBorder,
	getEventTypeGradient,
} from "@/utils/attendingColors";
import { generateEventTags } from "@/utils/eventTagUtils";
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
import { MockAttendingEvent } from "./mockAttendingEvents";

// Local event interface for this component
interface AttendingEventData {
	id: string;
	eventName: string;
	eventType: string;
	category: string;
	subcategory?: string;
	description: string;
	startDate: Date;
	endDate?: Date;
	time: string;
	locations: Array<{ name: string; address: string }>;
	hostId: string;
	hostName: string;
	hostRating: number;
	attendeeCount: number;
	maxCapacity: number;
	ticketPrice: number;
	currency: string;
	tags: string[];
	image: string;
	featured?: boolean;
	format: string;
	isPublic: boolean;
	ticketDetails?: {
		quantity: number;
		type: string;
		ticketNumbers: string[];
		qrCode: string;
		purchaseDate: string;
		totalPaid: number;
		checkedIn: boolean;
		checkInTime?: string;
	};
	moduleUsage?: {
		rsvp: {
			status: "confirmed" | "pending" | "declined" | "attending";
			responses?: Record<string, unknown>;
		};
		seating: { tableNumber?: number; seatNumber?: string; assignment?: string };
		media: { photosUploaded: number; albumAccess: boolean };
		games: { participated: string[]; points: number; rank?: number };
		surveys: { completed: string[]; pending: string[] };
	};
	accessInfo?: {
		entryCode: string;
		vipAccess: boolean;
		specialPerks: string[];
		notifications: number;
	};
}

interface AttendingEventCardProps {
	// event: AttendingEventData;
	// onEventSelect: (event: AttendingEventData) => void;
	event: MockAttendingEvent;
	onEventSelect: (event: MockAttendingEvent) => void;
}

const AttendingEventCard = ({
	event,
	onEventSelect,
}: AttendingEventCardProps) => {
	const router = useRouter();

	const handleCardClick = () => {
		// call callback (if provided) then navigate to the attending dashboard
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

	// Generate dynamic tags
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
				<img
					src={event.image}
					alt={event.eventName}
					className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
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
					{dynamicTags.slice(0, 3).map((tag, index) => (
						<Badge
							key={index}
							className={`text-xs ${tag.color} border-0 shadow-sm`}
						>
							{tag.text}
						</Badge>
					))}
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
};

export default AttendingEventCard;
