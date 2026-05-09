import { Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SegmentDetail } from "../SegmentDetailDrawer";

interface FilterCriteriaSectionProps {
	segment: SegmentDetail;
}

export default function FilterCriteriaSection({
	segment,
}: FilterCriteriaSectionProps) {
	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center gap-2 mb-4">
					<Filter className="h-5 w-5 text-muted-foreground" />
					<h3 className="text-lg font-semibold">Filter Criteria</h3>
				</div>
				<p className="text-xs border p-2 rounded-md w-fit">
					{segment.filterCriteria}
				</p>
			</CardContent>
		</Card>
	);
}
