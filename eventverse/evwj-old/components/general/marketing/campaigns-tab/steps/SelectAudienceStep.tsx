"use client";

import { Users, Info } from "lucide-react";
import { CampaignData } from "../CreateCampaignDialog";
import SegmentSelectionCard from "../components/SegmentSelectionCard";
import { cn } from "@/lib/utils";

interface SelectAudienceStepProps {
	data: CampaignData;
	onUpdate: (data: Partial<CampaignData>) => void;
}

// Mock segments data (you can replace this with actual data from your segments)
const MOCK_SEGMENTS = [
	{
		id: "vip-guests",
		name: "VIP Guests",
		badge: "Auto",
		description: "Guests who purchased VIP or higher tier tickets",
		guestCount: 45,
		totalSpent: 2500,
		avgEvents: 1,
		avatars: [
			{ initials: "SJ", color: "bg-green-500" },
			{ initials: "ER", color: "bg-pink-500" },
		],
		criteria: "ticketTier",
	},
	{
		id: "wedding-attendees",
		name: "Wedding Attendees",
		badge: "Auto",
		description: "Guests who attended wedding events",
		guestCount: 120,
		totalSpent: 500,
		avgEvents: 1,
		avatars: [{ initials: "SJ", color: "bg-green-500" }],
		criteria: "eventType",
	},
	{
		id: "corporate-attendees",
		name: "Corporate Event Attendees",
		badge: "Auto",
		description: "Guests who attended corporate events",
		guestCount: 89,
		totalSpent: 1200,
		avgEvents: 2,
		avatars: [
			{ initials: "MC", color: "bg-orange-500" },
			{ initials: "ER", color: "bg-pink-500" },
		],
		criteria: "eventType",
	},
	{
		id: "high-spenders",
		name: "High Spenders",
		badge: "Auto",
		description: "Guests who spent over $1000",
		guestCount: 23,
		totalSpent: 5000,
		avgEvents: 3,
		avatars: [{ initials: "ER", color: "bg-pink-500" }],
		criteria: "spending",
	},
];

export default function SelectAudienceStep({
	data,
	onUpdate,
}: SelectAudienceStepProps) {
	const toggleSegment = (segmentId: string) => {
		const newSegments = data.selectedSegments.includes(segmentId)
			? data.selectedSegments.filter((id) => id !== segmentId)
			: [...data.selectedSegments, segmentId];

		onUpdate({ selectedSegments: newSegments });
	};

	// Calculate total guests and collect avatars from selected segments
	const selectedSegmentsData = MOCK_SEGMENTS.filter((segment) =>
		data.selectedSegments.includes(segment.id),
	);

	const totalGuests = selectedSegmentsData.reduce(
		(sum, segment) => sum + segment.guestCount,
		0,
	);

	// Collect unique avatars (limit to first 2 for display)
	const allAvatars = selectedSegmentsData.flatMap((segment) => segment.avatars);
	const uniqueAvatars = Array.from(
		new Map(allAvatars.map((avatar) => [avatar.initials, avatar])).values(),
	).slice(0, 2);

	return (
		<div className="space-y-6">
			{/* Info Banner */}
			<div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
				<Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
				<p className="text-sm text-blue-900 dark:text-blue-100">
					You selected channels that support targeted messaging. Choose which
					guest segments to reach.
				</p>
			</div>

			{/* Header with Selected Guests Badge */}
			<div className="flex items-start justify-between">
				<div>
					<h2 className="text-lg font-bold mb-2">Select Target Segments</h2>
				</div>

				{/* Selected Guests Badge */}
				{data.selectedSegments.length > 0 && (
					<div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2.5 flex items-center gap-3">
						<div className="flex -space-x-2">
							{uniqueAvatars.map((avatar, index) => (
								<div
									key={index}
									className={cn(
										"w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-slate-700",
										avatar.color,
									)}
								>
									{avatar.initials}
								</div>
							))}
						</div>
						<div className="flex flex-col items-center">
							<span className="text-2xl font-bold text-blue-600 leading-none">
								{totalGuests}
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-400">
								guests
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Segments Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{MOCK_SEGMENTS.map((segment) => (
					<SegmentSelectionCard
						key={segment.id}
						segment={segment}
						selected={data.selectedSegments.includes(segment.id)}
						onToggle={() => toggleSegment(segment.id)}
					/>
				))}
			</div>
		</div>
	);
}
