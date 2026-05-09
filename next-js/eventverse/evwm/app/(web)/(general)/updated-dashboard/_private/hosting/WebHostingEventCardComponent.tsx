import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import {
	Calendar,
	Clock,
	CloudSun,
	Edit,
	Layers,
	MapPin,
	Users,
} from "lucide-react";
import Image from "next/image";
import { MockHostingEvent } from "./MockHostingEvents";
 
 

type EnhancedEventCardProps = {
  event: MockHostingEvent;
  onViewEvent: (event: MockHostingEvent) => void;
  onEditEvent?: (event: MockHostingEvent) => void;
  viewMode: "grid" | "list";
};

const eventTypeGradients: Record<string, string> = {
	Conference: "from-blue-500/20 to-blue-600/20",
	Wedding: "from-pink-500/20 to-rose-600/20",
	Corporate: "from-indigo-500/20 to-purple-600/20",
	Festival: "from-orange-500/20 to-amber-600/20",
	Charity: "from-green-500/20 to-emerald-600/20",
	Business: "from-cyan-500/20 to-blue-600/20",
	Cultural: "from-purple-500/20 to-violet-600/20",
	Wellness: "from-teal-500/20 to-green-600/20",
	Gaming: "from-red-500/20 to-pink-600/20",
};

export const WebHostingEventCardComponent = ({
	event,
	onViewEvent,
	onEditEvent,
	viewMode,
}: EnhancedEventCardProps) => {
	const now = new Date();
	const startDate = new Date(event.startDate);
	const endDate = new Date(event.endDate);

	const getStatus = () => {
		if (event.status === "draft")
			return {
				label: "Draft",
				variant: "secondary" as const,
				color: "bg-secondary",
			};
		if (endDate < now)
			return {
				label: "Completed",
				variant: "secondary" as const,
				color: "bg-muted",
			};
		if (startDate <= now && endDate >= now)
			return {
				label: "Live",
				variant: "default" as const,
				color: "bg-success",
			};
		return {
			label: "Upcoming",
			variant: "default" as const,
			color: "bg-primary",
		};
	};

	const status = getStatus();
	const gradient =
		eventTypeGradients[event.eventType] || "from-gray-500/20 to-gray-600/20";

	const formatDateRange = () => {
		const options: Intl.DateTimeFormatOptions = {
			month: "short",
			day: "numeric",
			year: "numeric",
		};
		const start = startDate.toLocaleDateString("en-US", options);
		const end = endDate.toLocaleDateString("en-US", options);

		if (start === end) return start;
		return `${start} - ${end}`;
	};

	if (viewMode === "list") {
		return (
			<Card
				className="border-border/40 group hover:border-primary/30 hover:bg-accent/5 cursor-pointer transition-all duration-300 hover:shadow-lg"
				onClick={() => onViewEvent(event)}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onViewEvent(event);
					}
				}}
			>
				<CardContent className="relative p-4">
					<div className="flex flex-col gap-4 md:flex-row">
						{/* Poster Thumbnail or Gradient Accent */}
						{event.poster ? (
							<div className="h-32 w-full flex-shrink-0 overflow-hidden rounded-lg md:h-auto md:w-24">
								<Image
									src={String(event?.poster)}
									alt={`${event.name} poster`}
									className="h-full w-full object-cover"
									width={100}
									height={100}
								/>
							</div>
						) : (
							<div
								className={`w-full rounded-lg bg-gradient-to-br md:w-2 ${gradient}`}
							/>
						)}

						{/* Content */}
						<div className="min-w-0 flex-1">
							<div className="mb-2 flex items-start justify-between gap-3">
								<div className="min-w-0 flex-1">
									<h3 className="text-foreground group-hover:text-primary truncate text-lg font-semibold transition-colors">
										{event.name}
									</h3>
									<p className="text-muted-foreground line-clamp-1 text-sm">
										{event.description}
									</p>
								</div>
								<div className="flex flex-shrink-0 items-center gap-2">
									<Badge variant="outline" className="text-xs">
										{event.eventType}
									</Badge>
									<Badge variant={status.variant} className="text-xs">
										{status.label}
									</Badge>
									{event.isDemo && (
										<Badge className="bg-purple-500 text-xs">Demo</Badge>
									)}
								</div>
							</div>

							<div className="text-muted-foreground mb-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 flex-shrink-0" />
									<span className="truncate">{formatDateRange()}</span>
								</div>
								{event.time && (
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4 flex-shrink-0" />
										<span>{event.time}</span>
									</div>
								)}
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 flex-shrink-0" />
									<span className="truncate">
										{event.locations?.[0]?.name || event.location}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 flex-shrink-0" />
									<span>{event.attendees.toLocaleString()}</span>
								</div>
							</div>

							<div className="flex items-center gap-2">
								{event.weather && (
									<Badge variant="outline" className="gap-1 text-xs">
										<CloudSun className="h-3 w-3" />
										{event.weather.temperature}°C
									</Badge>
								)}
								{event.conferenceData && (
									<Badge variant="outline" className="gap-1 text-xs">
										<Layers className="h-3 w-3" />
										{event.conferenceData.sessions?.length || 0} Sessions
									</Badge>
								)}
							</div>

							{!event.isDemo && onEditEvent && (
								<Button
									variant="ghost"
									size="sm"
									onClick={(e) => {
										e.stopPropagation();
										onEditEvent(event);
									}}
									className="absolute top-4 right-4"
								>
									<Edit className="h-3 w-3" />
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			className="border-border/40 group hover:border-primary/30 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800/40 dark:bg-gray-900/90"
			onClick={() => onViewEvent(event)}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onViewEvent(event);
				}
			}}
		>
			{/* Poster Header */}
			<div className="relative h-40 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
				{event.poster ? (
					<>
						<Image
							src={event.poster}
							alt={`${event.name} poster`}
							className="h-full w-full object-cover"
							width={100}
							height={100}
						/>
						<div className="from-card via-card/40 absolute inset-0 bg-gradient-to-t to-transparent" />
					</>
				) : (
					<>
						<div className={`h-full w-full bg-gradient-to-br ${gradient}`} />
						<div className="from-card/80 absolute inset-0 bg-gradient-to-t to-transparent" />
					</>
				)}
				<div className="absolute bottom-2 left-3 flex gap-2">
					<Badge variant={status.variant} className="text-xs shadow-sm">
						{status.label}
					</Badge>
					{event.isDemo && (
						<Badge className="bg-purple-500 text-xs shadow-sm">Demo</Badge>
					)}
				</div>
			</div>

			<CardHeader className="pb-3">
				<div className="flex items-start justify-between gap-2">
					<h3 className="text-foreground group-hover:text-primary line-clamp-2 font-semibold transition-colors">
						{event.name}
					</h3>
					<Badge variant="outline" className="flex-shrink-0 text-xs">
						{event.eventType}
					</Badge>
				</div>
				<p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
					{event.description}
				</p>
			</CardHeader>

			<CardContent className="space-y-3 pt-0">
				<div className="space-y-2 text-sm">
					<div className="text-muted-foreground flex items-center gap-2">
						<Calendar className="h-4 w-4 flex-shrink-0" />
						<span className="truncate">{formatDateRange()}</span>
					</div>
					{event.time && (
						<div className="text-muted-foreground flex items-center gap-2">
							<Clock className="h-4 w-4 flex-shrink-0" />
							<span>{event.time}</span>
						</div>
					)}
					<div className="text-muted-foreground flex items-center gap-2">
						<MapPin className="h-4 w-4 flex-shrink-0" />
						<span className="truncate">
							{event.locations?.[0]?.name || event.location}
						</span>
					</div>
				</div>

				<div className="border-border/40 flex items-center justify-between border-t pt-2">
					<div className="flex gap-2">
						<Badge variant="outline" className="gap-1 text-xs">
							<Users className="h-3 w-3" />
							{event.attendees.toLocaleString()}
						</Badge>
						{event.weather && (
							<Badge variant="outline" className="gap-1 text-xs">
								<CloudSun className="h-3 w-3" />
								{event.weather.temperature}°C
							</Badge>
						)}
					</div>
				</div>

				{event.conferenceData && (
					<div className="flex flex-wrap gap-1">
						{event.conferenceData.tracks.slice(0, 2).map((track) => (
							<Badge
								key={track.id}
								variant="outline"
								className="text-xs"
								style={{ borderColor: track.color }}
							>
								{track.name}
							</Badge>
						))}
					</div>
				)}

				{!event.isDemo && onEditEvent && (
					<div className="flex justify-end pt-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={(e) => {
								e.stopPropagation();
								onEditEvent(event);
							}}
						>
							<Edit className="h-3 w-3" />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
