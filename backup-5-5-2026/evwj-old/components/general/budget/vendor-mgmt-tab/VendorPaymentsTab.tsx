"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	CheckCircle2,
	AlertTriangle,
	Clock,
	CreditCard,
	Download,
	FileText,
} from "lucide-react";

// Types
export type PaymentStatus = "paid" | "due" | "pending";
export type PaymentType = "deposit" | "progress" | "final" | "other";

export interface Payment {
	id: string;
	title: string;
	type: PaymentType;
	percentage: number;
	amount: number;
	status: PaymentStatus;
	linkedTo: string; // Milestone name
	dueDate: string;
	paidDate?: string;
	milestoneId?: string; // Link payment to specific milestone
	projectId?: string; // Link payment to specific project
	eventId?: string; // Link payment to specific event
}

interface VendorPaymentsTabProps {
	vendorName: string;
	selectedEventId?: string | null;
	selectedProjectId?: string | null;
}

export default function VendorPaymentsTab({
	vendorName,
	selectedEventId,
	selectedProjectId,
}: VendorPaymentsTabProps) {
	// Mock payment schedule data
	const allPayments: Payment[] = [
		// Project-specific: Wedding Catering (vp1-1)
		{
			id: "1",
			title: "Initial Deposit - Catering",
			type: "deposit",
			percentage: 25,
			amount: 1875,
			status: "paid",
			linkedTo: "Initial Consultation",
			dueDate: "01/11/2025",
			paidDate: "03/11/2025",
			milestoneId: "m1",
			projectId: "vp1-1",
			eventId: "ve1",
		},
		{
			id: "2",
			title: "Final Payment - Catering",
			type: "final",
			percentage: 75,
			amount: 5625,
			status: "pending",
			linkedTo: "Final Menu Confirmation",
			dueDate: "16/11/2025",
			milestoneId: "m3",
			projectId: "vp1-1",
			eventId: "ve1",
		},
		// Project-specific: Wedding Decoration (vp1-2)
		{
			id: "3",
			title: "Initial Deposit - Decoration",
			type: "deposit",
			percentage: 25,
			amount: 1875,
			status: "paid",
			linkedTo: "Decoration Consultation",
			dueDate: "05/11/2025",
			paidDate: "07/11/2025",
			milestoneId: "m4",
			projectId: "vp1-2",
			eventId: "ve1",
		},
		{
			id: "4",
			title: "Final Payment - Decoration",
			type: "final",
			percentage: 75,
			amount: 5625,
			status: "due",
			linkedTo: "Venue Decoration Setup",
			dueDate: "15/08/2024",
			milestoneId: "m6",
			projectId: "vp1-2",
			eventId: "ve1",
		},
	];

	// Filter payments based on selected event/project
	const paymentSchedule = useMemo(() => {
		if (!selectedEventId && !selectedProjectId) {
			return allPayments; // Show all payments
		}

		// Filter by specific project
		if (selectedProjectId) {
			return allPayments.filter(
				(p) => p.projectId === selectedProjectId
			);
		}

		// Filter by event (show all payments for projects in that event)
		if (selectedEventId) {
			return allPayments.filter(
				(p) => p.eventId === selectedEventId
			);
		}

		return allPayments;
	}, [allPayments, selectedEventId, selectedProjectId]);

	// Payment history (only paid payments)
	const paymentHistory = paymentSchedule.filter((p) => p.status === "paid");

	const getStatusIcon = (status: PaymentStatus) => {
		switch (status) {
			case "paid":
				return <CheckCircle2 className="h-5 w-5 text-green-600" />;
			case "due":
				return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
			case "pending":
				return <Clock className="h-5 w-5 text-gray-400" />;
		}
	};

	const getStatusBadge = (status: PaymentStatus) => {
		switch (status) {
			case "paid":
				return (
					<Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
						paid
					</Badge>
				);
			case "due":
				return (
					<Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
						due
					</Badge>
				);
			case "pending":
				return (
					<Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
						pending
					</Badge>
				);
		}
	};

	return (
		<div className="space-y-8">
			{/* Payment Schedule Section */}
			<div>
				<div className="mb-4">
					<h3 className="text-xl font-semibold mb-1">Payment Schedule</h3>
					<p className="text-sm text-muted-foreground">
						Milestone-based payments linked to service delivery stages
					</p>
				</div>

				<div className="space-y-3">
					{paymentSchedule.map((payment) => (
						<PaymentCard
							key={payment.id}
							payment={payment}
							getStatusIcon={getStatusIcon}
							getStatusBadge={getStatusBadge}
							isHistory={false}
						/>
					))}
				</div>
			</div>

			{/* Payment History Section */}
			{paymentHistory.length > 0 && (
				<div>
					<div className="mb-4">
						<h3 className="text-xl font-semibold mb-1">Payment History</h3>
						<p className="text-sm text-muted-foreground">
							Complete record of all payments made to this vendor
						</p>
					</div>

					<div className="space-y-3">
						{paymentHistory.map((payment) => (
							<PaymentCard
								key={payment.id}
								payment={payment}
								getStatusIcon={getStatusIcon}
								getStatusBadge={getStatusBadge}
								isHistory={true}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

interface PaymentCardProps {
	payment: Payment;
	getStatusIcon: (status: PaymentStatus) => React.ReactElement;
	getStatusBadge: (status: PaymentStatus) => React.ReactElement;
	isHistory: boolean;
}

function PaymentCard({
	payment,
	getStatusIcon,
	getStatusBadge,
	isHistory,
}: PaymentCardProps) {
	return (
		<Card className="hover:border-primary/50 transition-colors !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<CardContent className="p-4">
				<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
					{/* Left: Status Icon and Info */}
					<div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
						<div className="shrink-0 mt-0.5">
							{getStatusIcon(payment.status)}
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
								<h4 className="font-semibold text-sm sm:text-base">
									{payment.title} ({payment.percentage}%)
								</h4>
								<div className="shrink-0">{getStatusBadge(payment.status)}</div>
							</div>

							{!isHistory && (
								<>
									<p className="text-xs sm:text-sm text-muted-foreground mb-1">
										Linked to: {payment.linkedTo}
									</p>
									<p className="text-xs sm:text-sm text-muted-foreground">
										Due: {payment.dueDate}
									</p>
								</>
							)}

							{isHistory && (
								<p className="text-xs sm:text-sm text-muted-foreground">
									Paid on {payment.paidDate}
								</p>
							)}

							{payment.status === "paid" && !isHistory && payment.paidDate && (
								<div className="flex items-center gap-2 mt-2">
									<CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
									<span className="text-xs sm:text-sm text-green-700 dark:text-green-300">
										Paid: {payment.paidDate}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Right: Amount and Actions */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 shrink-0 sm:min-w-0">
						<div className="text-left sm:text-right">
							<p className="text-lg sm:text-xl font-semibold">
								${payment.amount.toLocaleString()}
							</p>
						</div>

						<div className="flex items-center gap-2 w-full sm:w-auto">
							{payment.status === "paid" && (
								<Button
									variant="outline"
									size="sm"
									className="flex-1 sm:flex-initial"
								>
									<FileText className="mr-2 h-4 w-4" />
									<span className="hidden sm:inline">Download Receipt</span>
									<span className="sm:hidden">Receipt</span>
								</Button>
							)}

							{payment.status === "due" && !isHistory && (
								<Button
									className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-initial"
									size="sm"
								>
									<CreditCard className="mr-2 h-4 w-4" />
									Pay Now
								</Button>
							)}

							{isHistory && (
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 shrink-0"
								>
									<Download className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
