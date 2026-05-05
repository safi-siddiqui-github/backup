import React from "react";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus, Payment } from "./PaymentsTabContent";

export const getStatusBadge = (
	status: PaymentStatus,
): React.ReactElement | null => {
	switch (status) {
		case "paid":
		case "completed":
			return (
				<Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
					Completed
				</Badge>
			);
		case "due":
			return (
				<Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs">
					Due
				</Badge>
			);
		case "pending":
			return (
				<Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs">
					Pending
				</Badge>
			);
		default:
			return null;
	}
};

export const calculatePaymentMetrics = (payments: Payment[]) => {
	const paidAmount = payments
		.filter((p) => p.status === "completed" || p.status === "paid")
		.reduce((sum, p) => sum + p.amount, 0);

	const pendingAmount = payments
		.filter((p) => p.status === "pending" || p.status === "due")
		.reduce((sum, p) => sum + p.amount, 0);

	const totalAmount = paidAmount + pendingAmount;
	const progressPercentage =
		totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;

	return {
		paidAmount,
		pendingAmount,
		totalAmount,
		progressPercentage,
	};
};
