"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import type { DeleteConfirmDialogProps } from "../types";

export default function DeleteConfirmDialog({
	open,
	onOpenChange,
	onCancel,
	onConfirm,
}: DeleteConfirmDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
						<HiOutlineExclamationTriangle className="h-6 w-6" />
						Delete Ticket Type
					</AlertDialogTitle>
					<AlertDialogDescription className="text-base">
						Are you sure you want to delete this ticket type? This action cannot
						be undone and will remove the ticket from your event.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
