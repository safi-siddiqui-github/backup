"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PaginationControls from "@/components/ui/pagination-controls";
import { DollarSign } from "lucide-react";
import { Payment } from "./PaymentsTabContent";
import PaymentScheduleCard from "./PaymentScheduleCard";

interface PaymentScheduleSectionProps {
	payments: Payment[];
}

export default function PaymentScheduleSection({
	payments,
}: PaymentScheduleSectionProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const totalPages = Math.ceil(payments.length / itemsPerPage);
	const paginatedPayments = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return payments.slice(startIndex, endIndex);
	}, [payments, currentPage, itemsPerPage]);

	return (
		<>
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<CardContent className="p-6">
					<div className="flex items-center gap-2 mb-4">
						<DollarSign className="h-5 w-5 text-blue-600" />
						<h3 className="text-xl font-semibold">Payment Schedule</h3>
					</div>

					<div className="space-y-3">
						{paginatedPayments.map((payment) => (
							<PaymentScheduleCard key={payment.id} payment={payment} />
						))}
					</div>
				</CardContent>
			</Card>

			{/* Pagination */}
			{payments.length > 0 && (
				<PaginationControls
					currentPage={currentPage}
					totalPages={totalPages}
					totalItems={payments.length}
					itemsPerPage={itemsPerPage}
					onPageChange={setCurrentPage}
					onItemsPerPageChange={(newItemsPerPage) => {
						setItemsPerPage(newItemsPerPage);
						setCurrentPage(1);
					}}
				/>
			)}
		</>
	);
}
