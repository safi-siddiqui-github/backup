"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, FileText } from "lucide-react";
import { Payment } from "./PaymentsTabContent";
import { getStatusBadge } from "./paymentHelpers";

interface PaymentScheduleCardProps {
	payment: Payment;
}

export default function PaymentScheduleCard({
	payment,
}: PaymentScheduleCardProps) {
	const isCompleted =
		payment.status === "completed" || payment.status === "paid";

	return (
		<Card className="hover:border-primary/50 transition-colors !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<CardContent className="p-4">
				<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
					{/* Left: Payment Info */}
					<div className="flex-1 min-w-0">
						<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
							<p className="font-semibold text-sm sm:text-base">
								{payment.vendor}
							</p>
							{getStatusBadge(payment.status)}
						</div>
						<p className="text-xs sm:text-sm text-muted-foreground mb-2">
							{payment.service}
						</p>
						<div className="mb-2">
							<p className="text-xs sm:text-sm font-semibold text-foreground mb-1">
								Milestone:
							</p>
							<p className="text-xs sm:text-sm text-muted-foreground">
								{payment.milestone}
							</p>
						</div>
						<div>
							<p className="text-xs sm:text-sm font-semibold text-foreground mb-1">
								Due Date:
							</p>
							<p className="text-xs sm:text-sm text-muted-foreground">
								{payment.dueDate}
								{payment.daysUntilDue && ` (${payment.daysUntilDue} days)`}
							</p>
						</div>
					</div>

					{/* Right: Amount and Action */}
					<div className="flex flex-col sm:items-end gap-2 shrink-0">
						<p className="text-lg sm:text-xl font-bold">
							${payment.amount.toLocaleString()}
						</p>
						{isCompleted ? (
							<Button variant="outline" size="sm" className="w-full sm:w-auto">
								<FileText className="mr-2 h-4 w-4" />
								Receipt
							</Button>
						) : (
							<Button
								className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
								size="sm"
							>
								<CreditCard className="mr-2 h-4 w-4" />
								Pay Now
							</Button>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
