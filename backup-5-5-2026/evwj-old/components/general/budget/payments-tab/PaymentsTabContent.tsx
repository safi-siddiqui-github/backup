"use client";

import { useState } from "react";
import PaymentProgressSection from "./PaymentProgressSection";
import UpcomingPaymentsSection from "./UpcomingPaymentsSection";
import PaymentScheduleSection from "./PaymentScheduleSection";

// Types
export type PaymentStatus = "paid" | "due" | "pending" | "completed";
export type PaymentType = "deposit" | "progress" | "final" | "other";

export interface Payment {
	id: string;
	vendor: string;
	service: string;
	milestone: string;
	amount: number;
	status: PaymentStatus;
	dueDate: string;
	paidDate?: string;
	daysUntilDue?: number;
}

// Mock Payments
const mockPayments: Payment[] = [
	{
		id: "1",
		vendor: "Elegant Venues Inc.",
		service: "Venue Rental",
		milestone: "Contract Signing - 50% Deposit",
		amount: 3900,
		status: "pending",
		dueDate: "14/11/2025",
		daysUntilDue: 7,
	},
	{
		id: "2",
		vendor: "Elegant Venues Inc.",
		service: "Venue Rental",
		milestone: "Event Day - Final Payment",
		amount: 3900,
		status: "pending",
		dueDate: "07/12/2025",
		daysUntilDue: 30,
	},
	{
		id: "3",
		vendor: "Pixel Perfect Photography",
		service: "Photography Services",
		milestone: "Booking Confirmation - 25% Deposit",
		amount: 725,
		status: "completed",
		dueDate: "05/11/2025",
		paidDate: "03/11/2025",
	},
];

export default function PaymentsTabContent() {
	const [payments] = useState<Payment[]>(mockPayments);

	return (
		<div className="space-y-6">
			<PaymentProgressSection payments={payments} />
			<UpcomingPaymentsSection payments={payments} />
			<PaymentScheduleSection payments={payments} />
		</div>
	);
}
