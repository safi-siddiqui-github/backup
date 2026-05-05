import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PromoCode } from "../types";
import PromoCodeCard from "./PromoCodeCard";
import CreatePromoModal from "./CreatePromoModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialPromoCodes: PromoCode[] = [
	{
		id: "1",
		icon: "percent",
		title: "Early Bird Special",
		status: "Active",
		description: "20% off for early ticket purchases",
		promoCode: "EARLYBIRD",
		promoValue: "20% off",
		usageCurrent: 33,
		usageLimit: 100,
		revenueImpact: 8250.0,
		discountAmount: 2062.5,
		validFrom: "1/1/2024",
		validTo: "6/30/2024",
	},
	{
		id: "2",
		icon: "dollar",
		title: "Summer Festival Discount",
		status: "Inactive",
		description: "$50 off any ticket purchase",
		promoCode: "SUMMER50",
		promoValue: "$50 off",
		usageCurrent: 22,
		usageLimit: 50,
		revenueImpact: 5500.0,
		discountAmount: 1100.0,
		validFrom: "5/1/2024",
		validTo: "8/31/2024",
	},
	{
		id: "3",
		icon: "gift",
		title: "Buy One Get One",
		status: "Active",
		description: "Buy one ticket, get one free",
		promoCode: "BOGO2024",
		promoValue: "Buy 1 Get 1",
		usageCurrent: 12,
		usageLimit: 25,
		revenueImpact: 6000.0,
		discountAmount: 3000.0,
		validFrom: "4/1/2024",
		validTo: "7/31/2024",
	},
];

export default function PromoCodesTabContent() {
	const [promos, setPromos] = useState<PromoCode[]>(initialPromoCodes);
	const [createOpen, setCreateOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	const handleToggleStatus = (id: string) => {
		setPromos((prev) =>
			prev.map((p) =>
				p.id === id
					? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
					: p,
			),
		);
	};

	const handleCopy = async (code: string) => {
		try {
			await navigator.clipboard.writeText(code);
			// toast handled in parent space if needed
		} catch {
			// ignore
		}
	};

	const handleCreate = (promo: PromoCode) => setPromos((p) => [promo, ...p]);

	// Pagination calculations
	const totalPages = Math.ceil(promos.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedPromos = promos.slice(startIndex, endIndex);

	// Reset to page 1 when items per page changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	return (
		<div className="py-3">
			<div className="flex items-center justify-between mb-4">
				<span className="text-sm text-gray-600 dark:text-slate-400">
					Create and manage promotional codes for your event
				</span>
				<button
					className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
					onClick={() => setCreateOpen(true)}
				>
					<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
						<path
							d="M12 5v14M5 12h14"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Create Promo Code
				</button>
			</div>

			<div className="mt-6">
				{paginatedPromos.map((promo) => (
					<PromoCodeCard
						key={promo.id}
						promo={promo}
						onCopy={handleCopy}
						onToggleStatus={handleToggleStatus}
					/>
				))}
			</div>

			{/* Pagination */}
			{promos.length > 0 && (
				<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
					<CardContent className="p-4">
						<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600 dark:text-slate-400">
									Items per page:
								</span>
								<select
									value={itemsPerPage}
									onChange={(e) => {
										setItemsPerPage(Number(e.target.value));
										setCurrentPage(1);
									}}
									className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<option value={10}>10</option>
									<option value={20}>20</option>
									<option value={30}>30</option>
									<option value={40}>40</option>
									<option value={50}>50</option>
								</select>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600 dark:text-slate-400">
									Showing {startIndex + 1} -{" "}
									{Math.min(endIndex, promos.length)} of {promos.length}
								</span>
								<div className="flex items-center gap-1">
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((prev) => Math.max(1, prev - 1))
										}
										disabled={currentPage === 1}
									>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
										Page {currentPage} of {totalPages}
									</span>
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((prev) =>
												Math.min(totalPages, prev + 1),
											)
										}
										disabled={currentPage === totalPages}
									>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			<CreatePromoModal
				open={createOpen}
				onOpenChange={setCreateOpen}
				onCreate={handleCreate}
			/>
		</div>
	);
}
