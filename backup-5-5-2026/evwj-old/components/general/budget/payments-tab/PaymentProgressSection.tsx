"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { Payment } from "./PaymentsTabContent";
import { calculatePaymentMetrics } from "./paymentHelpers";

interface PaymentProgressSectionProps {
	payments: Payment[];
}

export default function PaymentProgressSection({
	payments,
}: PaymentProgressSectionProps) {
	const { paidAmount, pendingAmount, totalAmount, progressPercentage } =
		calculatePaymentMetrics(payments);

	return (
		<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<CardContent className="p-6">
				<div className="flex items-center gap-2 mb-4">
					<TrendingUp className="h-5 w-5 text-blue-600" />
					<h3 className="text-xl font-semibold">Payment Progress</h3>
				</div>

				<div className="mb-6">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm text-muted-foreground">
							Overall Progress
						</span>
						<span className="text-sm font-semibold">
							{progressPercentage}% Complete
						</span>
					</div>
					<Progress value={progressPercentage} className="h-2" />
				</div>

				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-muted-foreground mb-1">Paid</p>
						<p className="text-lg font-semibold text-green-600">
							${paidAmount.toLocaleString()}
						</p>
					</div>
					<div>
						<p className="text-sm text-muted-foreground mb-1">Pending</p>
						<p className="text-lg font-semibold text-yellow-600">
							${pendingAmount.toLocaleString()}
						</p>
					</div>
					<div>
						<p className="text-sm text-muted-foreground mb-1">Total</p>
						<p className="text-lg font-semibold text-blue-600">
							${totalAmount.toLocaleString()}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
