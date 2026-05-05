import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getModuleById } from "@/config/moduleRegistry";
import { format } from "date-fns";
import { Calendar, ChevronRight, Clock, CloudSun, MapPin } from "lucide-react";

interface EventDetailsSidebarProps {
	event: any;
	selectedModules: string[];
	onEdit: () => void;
	onModuleClick: (moduleId: string) => void;
}

export const EventDetailsSidebar = ({
	event,
	selectedModules,
	onEdit,
	onModuleClick,
}: EventDetailsSidebarProps) => {
	const formatEventDate = () => {
		if (event.endDate && event.endDate !== event.startDate) {
			return `${format(event.startDate, "MMM d")} - ${format(event.endDate, "MMM d, yyyy")}`;
		}
		return format(event.startDate, "MMMM d, yyyy");
	};

	const primaryLocation = event.locations?.[0];

	// Calculate days until event
	const daysUntil = Math.ceil(
		(new Date(event.startDate).getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24),
	);

	// Get active modules for quick links
	const activeModules = selectedModules
		.map((id) => getModuleById(id))
		.filter(Boolean)
		.slice(0, 5);

	return (
		<div className="sticky top-[68px] h-fit w-[300px] flex-shrink-0 space-y-3">
			{/* Event Quick Info */}
			<Card className="border-border/30 shadow-sm">
				<CardHeader className="p-4 pb-3">
					<CardTitle className="text-sm font-semibold">Event Details</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2.5 p-4 pt-0">
					<div className="flex items-start gap-2.5">
						<Calendar className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
						<div className="min-w-0 flex-1">
							<p className="text-muted-foreground text-xs">Date</p>
							<p className="text-foreground text-sm leading-tight font-medium">
								{formatEventDate()}
							</p>
						</div>
					</div>

					{event.time && (
						<div className="flex items-start gap-2.5">
							<Clock className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
							<div className="min-w-0 flex-1">
								<p className="text-muted-foreground text-xs">Time</p>
								<p className="text-foreground text-sm font-medium">
									{event.time}
								</p>
							</div>
						</div>
					)}

					{primaryLocation && (
						<div className="flex items-start gap-2.5">
							<MapPin className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
							<div className="min-w-0 flex-1">
								<p className="text-muted-foreground text-xs">Location</p>
								<p className="text-foreground truncate text-sm font-medium">
									{primaryLocation.name}
								</p>
							</div>
						</div>
					)}

					<div className="border-border/40 mt-2 border-t pt-2">
						<Badge
							variant="secondary"
							className={
								event.status === "published"
									? "bg-success/10 text-success border-success/20"
									: "bg-warning/10 text-warning border-warning/20"
							}
						>
							{event.status === "published" ? "Published" : "Draft"}
						</Badge>
					</div>
				</CardContent>
			</Card>

			{/* Weather Widget */}
			{event.weather && (
				<Card className="border-border/30 shadow-sm">
					<CardContent className="flex items-center gap-3 p-4">
						<CloudSun className="text-primary h-5 w-5" />
						<div className="flex-1">
							<p className="text-muted-foreground text-xs">Weather Forecast</p>
							<p className="text-foreground text-sm font-semibold">
								{event.weather.temperature}°C
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Module Quick Links */}
			{activeModules.length > 0 && (
				<Card className="border-border/30 shadow-sm">
					<CardHeader className="p-4 pb-3">
						<CardTitle className="text-sm font-semibold">
							Active Features
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-1 p-4 pt-0">
						{activeModules.map((module: any) => {
							const Icon = module.icon;
							const moduleMapping = {
								schedules: "schedule",
								budgeting: "budget",
							};
							// const mappedId = moduleMapping[String(module?.id)] || module.id;

							return (
								<button
									key={module.id}
									// onClick={() => onModuleClick(mappedId)}
									className="hover:bg-muted/50 group flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors"
								>
									<div className="bg-primary/10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg">
										<Icon className="text-primary h-4 w-4" />
									</div>
									<span className="text-foreground flex-1 truncate text-sm font-medium">
										{module.name}
									</span>
									<ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
								</button>
							);
						})}
					</CardContent>
				</Card>
			)}
		</div>
	);
};
