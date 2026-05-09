import { BarChart3, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SegmentDetail } from "../SegmentDetailDrawer";
import AgeDistributionChart from "./charts/AgeDistributionChart";
import EventTypeAttendanceChart from "./charts/EventTypeAttendanceChart";

interface SegmentAnalyticsSectionProps {
	segment: SegmentDetail;
}

export default function SegmentAnalyticsSection({
	segment,
}: SegmentAnalyticsSectionProps) {
	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center gap-2 mb-4">
					<BarChart3 className="h-5 w-5 text-muted-foreground" />
					<h3 className="text-lg font-semibold">Segment Analytics</h3>
				</div>

				{/* Age Distribution */}
				<div className="mb-6">
					<h4 className="text-sm font-semibold mb-3">Age Distribution</h4>
					<AgeDistributionChart
						range={segment.ageDistribution.range}
						percentage={segment.ageDistribution.percentage}
					/>
				</div>

				<Separator className="my-6" />

				{/* Event Type Attendance */}
				<div className="mb-6">
					<h4 className="text-sm font-semibold mb-3">Event Type Attendance</h4>
					<EventTypeAttendanceChart events={segment.eventTypeAttendance} />
				</div>

				<Separator className="my-6" />

				{/* Top Locations */}
				<div>
					<h4 className="text-sm font-semibold mb-3">Top Locations</h4>
					<div className="space-y-2">
						{segment.topLocations.map((location, index) => (
							<div
								key={index}
								className="flex items-center justify-between text-sm"
							>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-muted-foreground" />
									<span>{location.location}</span>
								</div>
								<span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-muted-foreground">
									{location.count} guests
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
