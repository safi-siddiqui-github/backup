"use client";

import { Users } from "lucide-react";
import { CampaignDetail } from "../types";
import { MOCK_SEGMENTS } from "../utils";
import SegmentCard from "../components/SegmentCard";

interface TargetAudienceSectionProps {
	campaign: CampaignDetail;
}

export default function TargetAudienceSection({
	campaign,
}: TargetAudienceSectionProps) {
	// Get selected segments data
	const selectedSegmentsData = MOCK_SEGMENTS.filter((segment) =>
		campaign.audiences.includes(segment.id),
	);

	const totalGuests = selectedSegmentsData.reduce(
		(sum, segment) => sum + segment.guestCount,
		0,
	);

	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<div className="flex items-center gap-2">
				<Users className="h-5 w-5" />
				<h3 className="text-base font-semibold">Target Audience</h3>
			</div>
			<div>
				<p className="text-sm font-semibold mb-4">
					Total reach: <span>{totalGuests}</span> guests
				</p>
				<div className="space-y-3">
					{selectedSegmentsData.map((segment) => (
						<SegmentCard key={segment.id} segment={segment} />
					))}
				</div>
			</div>
		</div>
	);
}
