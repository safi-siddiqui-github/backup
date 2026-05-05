import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
	Calendar,
	Clock,
	Edit,
	MapPin,
	Settings,
	Share,
	Users,
} from "lucide-react";
import { useState } from "react";
import { InlineEditableField } from "./InlineEditableField";
import { TeamDialog } from "./TeamDialog";
// import { useToast } from "@/hooks/use-toast";
// import { TeamDialog } from '@/components/TeamDialog';

interface EventHeroSectionProps {
	event: any;
	onEdit: () => void;
}

export const EventHeroSection = ({ event, onEdit }: EventHeroSectionProps) => {
	// const { toast } = useToast();
	const [showTeamDialog, setShowTeamDialog] = useState(false);

	const formatEventDate = () => {
		if (event.endDate && event.endDate !== event.startDate) {
			return `${format(event.startDate, "MMM d")} - ${format(event.endDate, "MMM d, yyyy")}`;
		}
		return format(event.startDate, "MMMM d, yyyy");
	};

	const primaryLocation = event.locations?.[0];

	const handleTitleSave = (newTitle: string) => {
		event.eventName = newTitle;
		// toast({
		//   title: "Event title updated",
		//   description: "Your changes have been saved.",
		// });
	};

	const handleDateSave = (newDate: string) => {
		// In a real app, parse and update the date
		// toast({
		//   title: "Date updated",
		//   description: "Your changes have been saved.",
		// });
	};

	const handleTimeSave = (newTime: string) => {
		event.time = newTime;
		// toast({
		//   title: "Time updated",
		//   description: "Your changes have been saved.",
		// });
	};

	// Theme colors with fallbacks
	const primaryColor = event.primaryColor || "#3b82f6";
	const secondaryColor = event.secondaryColor || "#8b5cf6";
	const accentColor = event.accentColor || "#ec4899";

	return (
		<div
			className="relative w-full overflow-hidden"
			style={
				{
					"--theme-primary": primaryColor,
					"--theme-secondary": secondaryColor,
					"--theme-accent": accentColor,
				} as React.CSSProperties
			}
		>
			{/* Compact Hero Background */}
			<div
				className="absolute inset-0 h-[180px]"
				style={{
					backgroundImage: event.poster
						? `url(${event.poster})`
						: `linear-gradient(135deg, ${primaryColor}15 0%, ${accentColor}10 50%, transparent 100%)`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="from-background/70 via-background/20 absolute inset-0 bg-linear-to-t to-transparent" />

				{/* Floating Action Buttons - Top Right */}
				<div className="absolute top-4 right-6 z-10 flex gap-2">
					<Button
						size="sm"
						variant="outline"
						onClick={onEdit}
						className="bg-background/80 border-border/50 hover:bg-background/90 shadow-sm backdrop-blur-md"
					>
						<Edit className="mr-2 h-4 w-4" />
						Edit Event
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() => setShowTeamDialog(true)}
						className="bg-background/80 border-border/50 hover:bg-background/90 shadow-sm backdrop-blur-md"
					>
						<Users className="mr-2 h-4 w-4" />
						Team
					</Button>
					<Button
						size="sm"
						variant="outline"
						// onClick={() => toast({ title: "Share feature coming soon!" })}
						className="bg-background/80 border-border/50 hover:bg-background/90 shadow-sm backdrop-blur-md"
					>
						<Share className="mr-2 h-4 w-4" />
						Share
					</Button>
					<Button
						size="sm"
						variant="outline"
						// onClick={() => toast({ title: "Settings feature coming soon!" })}
						className="bg-background/80 border-border/50 hover:bg-background/90 shadow-sm backdrop-blur-md"
					>
						<Settings className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Compact Hero Content */}
			<div className="relative mx-auto flex h-[180px] max-w-7xl flex-col justify-end px-6 py-6">
				<div className="flex items-end justify-between gap-4">
					<div className="min-w-0 flex-1">
						{/* Compact Badges */}
						<div className="mb-2 flex flex-wrap gap-1">
							<Badge
								variant="secondary"
								className="px-1.5 py-0.5 text-xs"
								style={{
									backgroundColor: `${primaryColor}20`,
									color: primaryColor,
									borderColor: `${primaryColor}40`,
								}}
							>
								{event.eventType}
							</Badge>
						</div>

						{/* Event Title - Editable */}
						<InlineEditableField
							value={event.eventName}
							onSave={handleTitleSave}
							type="text"
							className="-mx-2 mb-2 px-2 py-1"
							displayClassName="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
							editClassName="text-3xl md:text-4xl font-bold"
						/>

						{/* Event Details - Date, Time, Location */}
						<div className="text-muted-foreground flex flex-wrap gap-3 text-sm">
							<div className="flex items-center gap-1.5">
								<Calendar className="h-4 w-4" />
								<InlineEditableField
									value={formatEventDate()}
									onSave={handleDateSave}
									type="text"
									className="text-sm"
									displayClassName="text-sm text-muted-foreground"
								/>
							</div>
							{event.time && (
								<div className="flex items-center gap-1.5">
									<Clock className="h-4 w-4" />
									<InlineEditableField
										value={event.time}
										onSave={handleTimeSave}
										type="text"
										className="text-sm"
										displayClassName="text-sm text-muted-foreground"
									/>
								</div>
							)}
							{primaryLocation && (
								<div className="flex items-center gap-1.5">
									<MapPin className="h-4 w-4" />
									<span>{primaryLocation.name}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<TeamDialog
				eventId={event.id}
				open={showTeamDialog}
				onOpenChange={setShowTeamDialog}
			/>
		</div>
	);
};
