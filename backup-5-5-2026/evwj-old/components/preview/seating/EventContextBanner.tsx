import { useState } from "react";
import { useEventStorage } from "@/hooks/useEventStorage";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Calendar,
	Users,
	ChevronDown,
	MapPin,
	Clock,
	UserCheck,
	UserX,
} from "lucide-react";
import { format } from "date-fns";

const EventContextBanner = () => {
	const { events } = useEventStorage();
	const currentEvent = events[0];
	const [showDetails, setShowDetails] = useState(false);

	if (!currentEvent) {
		return null;
	}

	const guestStats = {
		total: currentEvent.maxGuests || 0,
		confirmed: Math.floor((currentEvent.maxGuests || 0) * 0.7),
		pending: Math.floor((currentEvent.maxGuests || 0) * 0.2),
		declined: Math.floor((currentEvent.maxGuests || 0) * 0.1),
		groups: [
			{
				name: "Family",
				count: Math.floor((currentEvent.maxGuests || 0) * 0.3),
			},
			{
				name: "Friends",
				count: Math.floor((currentEvent.maxGuests || 0) * 0.4),
			},
			{
				name: "Colleagues",
				count: Math.floor((currentEvent.maxGuests || 0) * 0.3),
			},
		],
	};

	return (
		<>
			<div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between gap-4 flex-wrap">
						<div className="flex items-center gap-6 flex-wrap">
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-primary" />
								<div>
									<p className="text-sm font-semibold text-foreground">
										{currentEvent.eventName}
									</p>
									<p className="text-xs text-muted-foreground">
										{format(new Date(currentEvent.startDate), "MMM dd, yyyy")}
									</p>
								</div>
							</div>

							<div className="h-8 w-px bg-border" />

							<div className="flex items-center gap-2">
								<Users className="w-4 h-4 text-primary" />
								<div>
									<p className="text-sm font-semibold text-foreground">
										{guestStats.total} Guests
									</p>
									<p className="text-xs text-muted-foreground">
										{guestStats.confirmed} confirmed
									</p>
								</div>
							</div>

							{currentEvent.location && (
								<>
									<div className="h-8 w-px bg-border" />
									<div className="flex items-center gap-2">
										<MapPin className="w-4 h-4 text-primary" />
										<div>
											<p className="text-sm font-semibold text-foreground">
												{currentEvent.location}
											</p>
											<p className="text-xs text-muted-foreground capitalize">
												{currentEvent.eventType}
											</p>
										</div>
									</div>
								</>
							)}
						</div>

						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowDetails(true)}
							className="gap-1"
						>
							View Details
							<ChevronDown className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Details Dialog */}
			<Dialog open={showDetails} onOpenChange={setShowDetails}>
				<DialogContent className="max-w-3xl">
					<DialogHeader>
						<DialogTitle className="text-2xl">
							{currentEvent.eventName}
						</DialogTitle>
					</DialogHeader>

					<div className="space-y-6 py-4">
						{/* Event Details */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<Calendar className="w-5 h-5 text-primary" />
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Event Date</p>
									<p className="text-sm font-semibold text-foreground">
										{format(new Date(currentEvent.startDate), "MMM dd, yyyy")}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<Clock className="w-5 h-5 text-primary" />
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Event Type</p>
									<p className="text-sm font-semibold text-foreground capitalize">
										{currentEvent.eventType}
									</p>
								</div>
							</div>

							{currentEvent.location && (
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg bg-primary/10">
										<MapPin className="w-5 h-5 text-primary" />
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Venue</p>
										<p className="text-sm font-semibold text-foreground">
											{currentEvent.location}
										</p>
									</div>
								</div>
							)}
						</div>

						{/* Guest Statistics */}
						<div className="pt-4 border-t border-border">
							<h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
								<Users className="w-4 h-4" />
								Guest Overview
							</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<div className="text-center p-3 rounded-lg bg-muted/30">
									<div className="flex items-center justify-center gap-2 mb-1">
										<Users className="w-4 h-4 text-primary" />
										<p className="text-2xl font-bold text-foreground">
											{guestStats.total}
										</p>
									</div>
									<p className="text-xs text-muted-foreground">Total Guests</p>
								</div>

								<div className="text-center p-3 rounded-lg bg-muted/30">
									<div className="flex items-center justify-center gap-2 mb-1">
										<UserCheck className="w-4 h-4 text-green-500" />
										<p className="text-2xl font-bold text-foreground">
											{guestStats.confirmed}
										</p>
									</div>
									<p className="text-xs text-muted-foreground">Confirmed</p>
								</div>

								<div className="text-center p-3 rounded-lg bg-muted/30">
									<div className="flex items-center justify-center gap-2 mb-1">
										<Clock className="w-4 h-4 text-yellow-500" />
										<p className="text-2xl font-bold text-foreground">
											{guestStats.pending}
										</p>
									</div>
									<p className="text-xs text-muted-foreground">Pending</p>
								</div>

								<div className="text-center p-3 rounded-lg bg-muted/30">
									<div className="flex items-center justify-center gap-2 mb-1">
										<UserX className="w-4 h-4 text-red-500" />
										<p className="text-2xl font-bold text-foreground">
											{guestStats.declined}
										</p>
									</div>
									<p className="text-xs text-muted-foreground">Declined</p>
								</div>
							</div>
						</div>

						{/* Guest Groups */}
						<div className="pt-4 border-t border-border">
							<h3 className="text-sm font-semibold text-foreground mb-3">
								Guest Groups
							</h3>
							<div className="flex flex-wrap gap-2">
								{guestStats.groups.map((group) => (
									<div
										key={group.name}
										className="px-3 py-2 rounded-lg bg-muted/30 border border-border"
									>
										<span className="text-sm font-medium text-foreground">
											{group.name}
										</span>
										<span className="ml-2 text-xs text-muted-foreground">
											({group.count})
										</span>
									</div>
								))}
							</div>
						</div>

						{currentEvent.description && (
							<div className="pt-4 border-t border-border">
								<h3 className="text-sm font-semibold text-foreground mb-2">
									Description
								</h3>
								<p className="text-sm text-muted-foreground">
									{currentEvent.description}
								</p>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default EventContextBanner;
