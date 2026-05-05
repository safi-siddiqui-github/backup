import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SegmentDetail } from "../SegmentDetailDrawer";

interface CampaignUsageSectionProps {
	segment: SegmentDetail;
}

export default function CampaignUsageSection({
	segment,
}: CampaignUsageSectionProps) {
	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center gap-2 mb-4">
					<Target className="h-5 w-5 text-muted-foreground" />
					<h3 className="text-lg font-semibold">Campaign Usage</h3>
				</div>
				<p className="text-sm text-muted-foreground mb-4">
					This segment is used in {segment.campaigns.length} campaigns.
				</p>
				<div className="space-y-3">
					{segment.campaigns.map((campaign) => (
						<Card
							key={campaign.id}
							className="bg-muted/50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 p-0!"
						>
							<CardContent className="p-4">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h4 className="font-semibold text-sm mb-1">
											{campaign.name}
										</h4>
										<p className="text-xs text-muted-foreground">
											{campaign.description}
										</p>
									</div>
									<span
										className={cn(
											"text-xs px-2 py-1 rounded-full flex items-center justify-center",
											campaign.status === "completed" &&
												"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
											campaign.status === "draft" &&
												"bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
											campaign.status === "active" &&
												"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
										)}
									>
										{campaign.status}
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
