import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Printer, RotateCcw, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CompactVenueHeaderProps {
	onSmartAssign: () => void;
	onReset: () => void;
	onExport: () => void;
	onPrint: () => void;
	totalAssigned: number;
	totalCapacity: number;
	unassignedCount: number;
	ticketMode: boolean;
	onToggleTicketMode: (enabled: boolean) => void;
}

const CompactVenueHeader = ({
	onSmartAssign,
	onReset,
	onExport,
	onPrint,
	totalAssigned,
	totalCapacity,
	unassignedCount,
	ticketMode,
	onToggleTicketMode,
}: CompactVenueHeaderProps) => {
	return (
		<div className="flex h-8 items-center justify-end gap-2 border-b bg-muted/30 px-4 text-xs">
			<div className="flex items-center gap-2 mr-2 pr-2">
				<Switch
					id="ticket-mode"
					checked={ticketMode}
					onCheckedChange={onToggleTicketMode}
					className="h-4 w-8"
				/>
				<Label htmlFor="ticket-mode" className="text-xs cursor-pointer font-medium">
					Ticket Mode
				</Label>
			</div>
			<Button
				size="sm"
				onClick={onSmartAssign}
				className="h-6 bg-purple-600 text-xs hover:bg-purple-700"
			>
				<Zap className="mr-1 h-3 w-3" />
				Smart Assign
			</Button>
			<Button
				size="sm"
				variant="outline"
				onClick={onPrint}
				className="h-6 text-xs"
			>
				<Download className="mr-1 h-3 w-3" />
				Export
			</Button>
			<Badge variant="outline" className="h-5 text-xs">
				{totalAssigned}/{totalCapacity}
			</Badge>
			<Badge variant="outline" className="h-5 text-xs">
				{unassignedCount} unassigned
			</Badge>
		</div>
	);
};

export default CompactVenueHeader;
