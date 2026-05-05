import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import { Button } from "@/components/ui/button";
import { Plus, Layers, Users, MapPin } from "lucide-react";

interface SeatingHeroProps {
	onCreateNew: () => void;
}

const SeatingHero = ({ onCreateNew }: SeatingHeroProps) => {
	const { hierarchy } = useVenueHierarchy();

	// Calculate aggregate statistics
	const totalArrangements = hierarchy.locations.reduce(
		(sum, location) =>
			sum +
			location.sections.reduce(
				(sectionSum, section) => sectionSum + section.arrangements.length,
				0,
			),
		0,
	);

	const totalCapacity = hierarchy.locations.reduce(
		(sum, location) =>
			sum +
			location.sections.reduce(
				(sectionSum, section) =>
					sectionSum +
					section.arrangements.reduce((arrSum, arr) => {
						const tableSeats =
							arr.tables?.reduce((ts, t) => ts + t.seats, 0) || 0;
						const chairCount = arr.chairs?.length || 0;
						const seatCount = arr.seats?.length || 0;
						return arrSum + tableSeats + chairCount + seatCount;
					}, 0),
				0,
			),
		0,
	);

	const totalAssigned = hierarchy.locations.reduce(
		(sum, location) =>
			sum +
			location.sections.reduce(
				(sectionSum, section) =>
					sectionSum +
					section.arrangements.reduce((arrSum, arr) => {
						const tableAssignments =
							arr.tables?.reduce(
								(ts, t) => ts + Object.keys(t.seatAssignments || {}).length,
								0,
							) || 0;
						const chairAssignments =
							arr.chairs?.filter((c) => c.guest).length || 0;
						return arrSum + tableAssignments + chairAssignments;
					}, 0),
				0,
			),
		0,
	);

	const stats = [
		{
			label: "Arrangements",
			value: totalArrangements,
			icon: Layers,
		},
		{
			label: "Total Capacity",
			value: totalCapacity,
			icon: Users,
		},
		{
			label: "Assigned Seats",
			value: totalAssigned,
			icon: MapPin,
		},
	];

	return (
		<div className="py-8 space-y-6">
			{/* Header with Title and CTA */}
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">
						Seating Arrangements
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Create and manage seating layouts for your events
					</p>
				</div>
				<Button onClick={onCreateNew} size="default" className="gap-2">
					<Plus className="w-4 h-4" />
					Create New Arrangement
				</Button>
			</div>

			{/* Stats - Compact Horizontal Layout */}
			<div className="flex items-center gap-6">
				{stats.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<div key={stat.label} className="flex items-center gap-2">
							<div className="flex items-center gap-2 text-foreground">
								<Icon className="w-4 h-4 text-muted-foreground" />
								<span className="text-sm font-medium text-muted-foreground">
									{stat.label}:
								</span>
								<span className="text-base font-semibold">{stat.value}</span>
							</div>
							{index < stats.length - 1 && (
								<div className="h-4 w-px bg-border" />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SeatingHero;
