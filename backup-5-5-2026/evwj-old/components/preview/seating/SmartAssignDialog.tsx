import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Users, Zap } from "lucide-react";

interface SmartAssignDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	unassignedGuests: number;
	availableSeats: number;
	groupMatches: Array<{
		group: string;
		guestsCount: number;
		seatsCount: number;
	}>;
}

const SmartAssignDialog = ({
	isOpen,
	onClose,
	onConfirm,
	unassignedGuests,
	availableSeats,
	groupMatches,
}: SmartAssignDialogProps) => {
	const canAssignAll = unassignedGuests <= availableSeats;

	const getGroupColor = (group: string): string => {
		const colors: Record<string, string> = {
			Colleagues: "bg-indigo-100 text-indigo-800 border-indigo-200",
			Family: "bg-pink-100 text-pink-800 border-pink-200",
			Friends: "bg-blue-100 text-blue-800 border-blue-200",
			"Plus Ones": "bg-orange-100 text-orange-800 border-orange-200",
			VIP: "bg-purple-100 text-purple-800 border-purple-200",
		};
		return colors[group] || "bg-gray-100 text-gray-800 border-gray-200";
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Zap className="h-5 w-5 text-purple-600" />
						Smart Assign Confirmation
					</DialogTitle>
					<DialogDescription>
						Automatically assign guests to seats based on matching groups
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{/* Summary */}
					<div className="rounded-lg border bg-muted/30 p-4">
						<div className="mb-3 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm font-medium">Assignment Summary</span>
							</div>
							{canAssignAll ? (
								<CheckCircle2 className="h-4 w-4 text-green-600" />
							) : (
								<AlertCircle className="h-4 w-4 text-orange-600" />
							)}
						</div>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Unassigned Guests:</span>
								<span className="font-medium">{unassignedGuests}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Available Seats:</span>
								<span className="font-medium">{availableSeats}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Status:</span>
								{canAssignAll ? (
									<span className="font-medium text-green-600">All can be assigned</span>
								) : (
									<span className="font-medium text-orange-600">
										{unassignedGuests - availableSeats} guests will remain unassigned
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Group Matches */}
					{groupMatches.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-medium">Group Matching:</div>
							<div className="space-y-2">
								{groupMatches.map((match) => (
									<div
										key={match.group}
										className={`flex items-center justify-between rounded-md border p-2 ${getGroupColor(match.group)}`}
									>
										<Badge variant="outline" className="border-0">
											{match.group}
										</Badge>
										<div className="text-xs">
											<span className="font-medium">{match.guestsCount}</span> guests →{" "}
											<span className="font-medium">{match.seatsCount}</span> seats
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Warning if not all can be assigned */}
					{!canAssignAll && (
						<div className="flex gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
							<AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600" />
							<div className="text-sm text-orange-800">
								<p className="font-medium">Not enough seats available</p>
								<p className="mt-1 text-orange-700">
									{unassignedGuests - availableSeats} guest{unassignedGuests - availableSeats > 1 ? "s" : ""} will remain
									unassigned. Priority will be given to groups with matching table assignments.
								</p>
							</div>
						</div>
					)}

					{/* How it works */}
					<div className="rounded-lg border bg-blue-50/50 p-3">
						<div className="text-sm">
							<p className="font-medium text-blue-900">How Smart Assign works:</p>
							<ul className="mt-2 space-y-1 text-blue-800">
								<li className="flex items-start gap-2">
									<span className="text-blue-600">•</span>
									<span>Matches guests to tables/chairs with same group assignment</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-blue-600">•</span>
									<span>Fills remaining seats with unassigned guests</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-blue-600">•</span>
									<span>Respects existing seat assignments</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onConfirm} className="bg-purple-600 hover:bg-purple-700">
						<Zap className="mr-2 h-4 w-4" />
						Confirm Smart Assign
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SmartAssignDialog;


