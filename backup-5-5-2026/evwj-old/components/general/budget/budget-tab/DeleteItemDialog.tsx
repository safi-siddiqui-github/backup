"use client";

import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { BudgetItem } from "./BudgetPlanningView";

interface DeleteItemDialogProps {
	item: BudgetItem | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
}

export default function DeleteItemDialog({
	item,
	open,
	onOpenChange,
	onConfirm,
}: DeleteItemDialogProps) {
	if (!item) return null;

	return (
		<ConfirmationDialog
			open={open}
			onOpenChange={onOpenChange}
			onConfirm={onConfirm}
			title="Delete Budget Item?"
			description={`Are you sure you want to delete ${item.title}? This will remove $${item.estimatedCost.toLocaleString()} from your planned budget. This action cannot be undone.`}
			confirmText="Delete Item"
			variant="destructive"
		/>
	);
}
