import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import { Card, CardContent } from "@/components/ui/card";
import { TableIcon, Users, MapPin, Layers } from "lucide-react";

const SeatingOverviewStats = () => {
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

	const totalTables = hierarchy.locations.reduce(
		(sum, location) =>
			sum +
			location.sections.reduce(
				(sectionSum, section) =>
					sectionSum +
					section.arrangements.reduce(
						(arrSum, arr) => arrSum + (arr.tables?.length || 0),
						0,
					),
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
			label: "Total Arrangements",
			value: totalArrangements,
			icon: Layers,
			color: "text-primary",
		},
		{
			label: "Total Tables",
			value: totalTables,
			icon: TableIcon,
			color: "text-blue-500",
		},
		{
			label: "Total Capacity",
			value: totalCapacity,
			icon: Users,
			color: "text-green-500",
		},
		{
			label: "Assigned Seats",
			value: totalAssigned,
			icon: MapPin,
			color: "text-purple-500",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{stats.map((stat) => {
				const Icon = stat.icon;
				return (
					<Card key={stat.label}>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-muted-foreground">{stat.label}</p>
									<p className="text-3xl font-bold text-foreground mt-2">
										{stat.value}
									</p>
								</div>
								<Icon className={`w-8 h-8 ${stat.color}`} />
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};

export default SeatingOverviewStats;
