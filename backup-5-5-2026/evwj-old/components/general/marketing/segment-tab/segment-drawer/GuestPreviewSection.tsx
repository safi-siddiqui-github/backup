import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SegmentDetail } from "../SegmentDetailDrawer";

interface GuestPreviewSectionProps {
	segment: SegmentDetail;
}

export default function GuestPreviewSection({
	segment,
}: GuestPreviewSectionProps) {
	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center gap-2 mb-2">
					<Users className="h-5 w-5 text-muted-foreground" />
					<h3 className="text-lg font-semibold">Guest Preview</h3>
				</div>
				<p className="text-xs text-muted-foreground mb-4">
					Showing {segment.guests.length} of {segment.guestCount} guests
				</p>
				<div className="space-y-2">
					{segment.guests.map((guest) => (
						<Card
							key={guest.id}
							className="bg-muted/50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 p-0!"
						>
							<CardContent className="p-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3 flex-1">
										<div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
											{guest.initials}
										</div>
										<div className="min-w-0 flex-1">
											<p className="font-semibold text-sm truncate">
												{guest.name}
											</p>
											<p className="text-xs text-muted-foreground truncate">
												{guest.email}
											</p>
										</div>
									</div>
									<div className="text-right shrink-0 ml-3">
										<p className="font-semibold text-sm text-green-600 dark:text-green-500">
											${guest.spending.toLocaleString()}
										</p>
										<p className="text-xs text-muted-foreground">
											{guest.events} events
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
