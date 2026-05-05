import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
	ArrowRight,
	Calendar,
	Clock,
	Plus,
	Search,
	Sparkles,
} from "lucide-react";
import { useState } from "react";

type Event = {
	id: string;
	name: string;
	startDate: string;
	time?: string;
	isHosting?: boolean;
}

type UpcomingEventsPreviewProps = {
	hostingEvents: any[];
	attendingEvents: any[];
	onEventSelect: (event: any) => void;
	onAttendingEventSelect: (event: any) => void;
}

export default function UpcomingEventsPreview   ({
	hostingEvents,
	attendingEvents,
	onEventSelect,
	onAttendingEventSelect,
}: UpcomingEventsPreviewProps)   {
	// const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);

	// Combine and sort upcoming events
	const upcomingHosting = hostingEvents
		.filter((event) => new Date(event.startDate) > new Date())
		.map((event) => ({ ...event, isHosting: true }));

	const upcomingAttending = attendingEvents
		.filter((event) => new Date(event.startDate) > new Date())
		.map((event) => ({ ...event, isHosting: false }));

	const allUpcoming = [...upcomingHosting, ...upcomingAttending]
		.sort(
			(a, b) =>
				new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
		)
		.slice(0, 3);

	if (allUpcoming.length === 0) {
		return (
			<Card className="mb-8 border-white/20 bg-gradient-to-br from-purple-50/80 to-blue-50/80 shadow-xl backdrop-blur-xl dark:border-gray-800/20 dark:from-purple-950/40 dark:to-blue-950/40">
				<CardContent className="py-16 text-center">
					<div className="mx-auto max-w-md">
						<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
							<Sparkles className="h-10 w-10 text-white" />
						</div>
						<h3 className="mb-3 text-2xl font-bold">No Upcoming Events</h3>
						<p className="text-muted-foreground mb-6">
							Start creating amazing events or join events hosted by others.
							Your journey to memorable experiences begins here!
						</p>
						<div className="flex flex-wrap justify-center gap-3">
							<Button
								size="lg"
								// onClick={() => navigate("/create-event")}
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
							>
								<Plus className="mr-2 h-5 w-5" />
								Create Your First Event
							</Button>
							<Button
								size="lg"
								variant="outline"
								// onClick={() => navigate("/events")}
							>
								<Search className="mr-2 h-5 w-5" />
								Browse Events
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="mb-8 hidden border-white/20 bg-linear-to-br from-blue-50/80 to-purple-50/80 shadow-xl backdrop-blur-xl md:flex dark:border-gray-800/20 dark:from-blue-950/40 dark:to-purple-950/40">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Calendar className="h-5 w-5 text-blue-600" />
					Coming Up Next
				</CardTitle>
				<CardDescription>
					Your next {allUpcoming.length} event
					{allUpcoming.length > 1 ? "s" : ""}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div
					className={`group/stack relative transition-all duration-300 ease-out ${isHovered ? "h-[560px] md:h-[280px]" : "h-58 md:h-[120px]"}`}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{allUpcoming.map((event, index) => (
						<div
							key={event.id}
							className={cn(
								"group/card absolute right-0 left-0 cursor-pointer rounded-xl border border-white/40 bg-white/90 p-4 backdrop-blur-sm transition-all duration-300 ease-out hover:shadow-2xl nth-3:top-6 md:nth-2:top-4 dark:border-gray-800/40 dark:bg-gray-900/90",
								{
									"nth-2:top-40 md:nth-2:top-22": isHovered,
									"nth-3:top-92 md:nth-3:top-44": isHovered,
								},
							)}
							style={{
								// top: isHovered ? `${index * 80}px` : `${index * 20}px`,
								zIndex: allUpcoming.length - index,
								transform: isHovered
									? "scale(1)"
									: `scale(${1 - index * 0.03})`,
								transitionDelay: `${index * 50}ms`,
							}}
							onClick={() =>
								event.isHosting
									? onEventSelect(event)
									: onAttendingEventSelect(event)
							}
						>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<div className="flex flex-wrap items-center gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
										{format(new Date(event.startDate), "d")}
									</div>
									<div>
										<h4 className="text-foreground font-semibold">
											{event.name}
										</h4>
										<p className="text-muted-foreground flex items-center gap-2 text-sm">
											<Clock className="h-3 w-3" />
											{format(new Date(event.startDate), "MMM d, yyyy")} •{" "}
											{event.time || "12:00 PM"}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant={event.isHosting ? "default" : "secondary"}>
										{event.isHosting ? "Hosting" : "Attending"}
									</Badge>
									<ArrowRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
