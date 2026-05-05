import { Edit, Target, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionsSectionProps {
	segmentId: string;
	onEdit?: (segmentId: string) => void;
	onDelete?: (segmentId: string) => void;
	onCreateCampaign?: (segmentId: string) => void;
	onExport?: (segmentId: string) => void;
}

export default function ActionsSection({
	segmentId,
	onEdit,
	onDelete,
	onCreateCampaign,
	onExport,
}: ActionsSectionProps) {
	return (
		<div>
			<h3 className="text-lg font-semibold mb-4">Actions</h3>
			<div className="grid grid-cols-2 gap-3">
				<Button
					variant="default"
					className="w-full bg-blue-600 hover:bg-blue-700"
					onClick={() => onEdit?.(segmentId)}
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Segment
				</Button>
				<Button
					variant="outline"
					className="w-full"
					onClick={() => onCreateCampaign?.(segmentId)}
				>
					<Target className="mr-2 h-4 w-4" />
					Create Campaign
				</Button>
				<Button
					variant="outline"
					className="w-full"
					onClick={() => onExport?.(segmentId)}
				>
					<Download className="mr-2 h-4 w-4" />
					Export Guest List
				</Button>
				<Button
					variant="destructive"
					className="w-full"
					onClick={() => onDelete?.(segmentId)}
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete Segment
				</Button>
			</div>
		</div>
	);
}
