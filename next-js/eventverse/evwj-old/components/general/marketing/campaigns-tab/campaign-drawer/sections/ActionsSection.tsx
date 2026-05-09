"use client";

import { Edit, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionsSectionProps {
	onEdit?: () => void;
	onDuplicate?: () => void;
	onDelete?: () => void;
}

export default function ActionsSection({
	onEdit,
	onDuplicate,
	onDelete,
}: ActionsSectionProps) {
	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<h3 className="text-base font-semibold">Actions</h3>
			<div className="grid grid-cols-2 gap-3">
				<Button
					variant="default"
					onClick={onEdit}
					className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
				>
					<Edit className="h-4 w-4" />
					Edit Campaign
				</Button>
				<Button
					variant="outline"
					onClick={onDuplicate}
					className="w-full flex items-center gap-2"
				>
					<Copy className="h-4 w-4" />
					Duplicate
				</Button>
				<Button
					variant="destructive"
					onClick={onDelete}
					className="w-full flex items-center gap-2 col-span-2"
				>
					<Trash2 className="h-4 w-4" />
					Delete Campaign
				</Button>
			</div>
		</div>
	);
}
