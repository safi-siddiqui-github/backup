import { Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MetricCard from "./MetricCard";
import { SegmentDetail } from "../SegmentDetailDrawer";

interface SegmentOverviewSectionProps {
	segment: SegmentDetail;
}

export default function SegmentOverviewSection({
	segment,
}: SegmentOverviewSectionProps) {
	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center gap-2 mb-4">
					<Users className="h-5 w-5 text-muted-foreground" />
					<h3 className="text-lg font-semibold">Segment Overview</h3>
				</div>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<MetricCard
						icon={Users}
						value={segment.guestCount}
						label="Total Guests"
						color="blue"
					/>
					<MetricCard
						icon={DollarSign}
						value={`$${segment.avgSpent.toLocaleString()}`}
						label="Avg Spent"
						color="green"
					/>
				</div>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div className="flex flex-col">
						<span className="text-muted-foreground mb-1">Total Spending</span>
						<span className="font-semibold">
							${segment.totalSpending.toLocaleString()}
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-muted-foreground mb-1">Total Events</span>
						<span className="font-semibold">{segment.totalEvents}</span>
					</div>
					<div className="flex flex-col">
						<span className="text-muted-foreground mb-1">Created</span>
						<span className="font-semibold">{segment.createdDate}</span>
					</div>
					<div className="flex flex-col">
						<span className="text-muted-foreground mb-1">Last Updated</span>
						<span className="font-semibold">{segment.lastUpdated}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
