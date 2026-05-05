"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CreditCard } from "lucide-react";
import { Payment } from "./PaymentsTabContent";

interface UpcomingPaymentsSectionProps {
	payments: Payment[];
}

export default function UpcomingPaymentsSection({
	payments,
}: UpcomingPaymentsSectionProps) {
	// Get upcoming payments (due within 30 days)
	const upcomingPayments = payments.filter(
		(p) =>
			(p.status === "pending" || p.status === "due") &&
			p.daysUntilDue &&
			p.daysUntilDue <= 30,
	);

	if (upcomingPayments.length === 0) {
		return null;
	}

	return (
		<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<CardContent className="p-6">
				<div className="flex items-center gap-2 mb-4">
					<AlertTriangle className="h-5 w-5 text-orange-600" />
					<h3 className="text-xl font-semibold">Upcoming Payments</h3>
				</div>

				<div className="space-y-3">
					{upcomingPayments.map((payment) => (
						<div
							key={payment.id}
							className="rounded-lg bg-orange-50 dark:bg-[#020617] border border-orange-200 dark:border-orange-900/40 p-4"
						>
							<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
								<div className="flex-1">
									<p className="font-semibold text-sm sm:text-base mb-2">
										{payment.vendor}
									</p>
									<div className="mb-2">
										<p className="text-xs sm:text-sm font-semibold text-foreground mb-1">
											Milestone:
										</p>
										<p className="text-xs sm:text-sm text-muted-foreground">
											{payment.milestone}
										</p>
									</div>
									<div className="mb-2">
										<p className="text-xs sm:text-sm font-semibold text-foreground mb-1">
											Due Date:
										</p>
										<p className="text-xs sm:text-sm text-muted-foreground">
											{payment.dueDate}
										</p>
									</div>
									<p className="text-xs sm:text-sm font-medium text-orange-600">
										Due in {payment.daysUntilDue} days
									</p>
								</div>
								<div className="flex flex-col sm:items-end gap-2">
									<p className="text-lg sm:text-xl font-bold">
										${payment.amount.toLocaleString()}
									</p>
									<Button
										className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto"
										size="sm"
									>
										<CreditCard className="mr-2 h-4 w-4" />
										Pay Now
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
