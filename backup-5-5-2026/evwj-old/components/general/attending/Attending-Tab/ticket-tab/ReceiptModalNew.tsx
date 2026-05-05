"use client";
import React from "react";
import { X, Printer, Download, FileText } from "lucide-react";
import { toast } from "sonner";

type Receipt = {
	id: string;
	date: string;
	transactionId?: string;
	item: string;
	price: string;
	total: string;
	cardType?: string;
	cardLast4?: string;
};

export default function ReceiptModalNew({
	open,
	onClose,
	receipt,
}: {
	open: boolean;
	onClose: () => void;
	receipt: Receipt | null;
}) {
	if (!open || !receipt) return null;

	const { id, date, transactionId, item, price, total, cardType, cardLast4 } =
		receipt;

	const handlePrint = () => {
		try {
			window.print();
			toast.success("Print dialog opened");
		} catch (err) {
			toast.error("Unable to open print dialog");
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
				onClick={onClose}
			/>

			<div className="relative w-full max-w-[600px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200 dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11]">
				<div className="flex items-start justify-between p-6 pb-2">
					<div>
						<div className="flex items-center gap-2">
							<FileText className="w-5 h-5 text-gray-900 dark:text-gray-100" />
							<h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
								Purchase Receipt
							</h2>
						</div>
						<p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
							Receipt #{id}
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						title="Close receipt"
						aria-label="Close receipt"
						className="text-gray-400 hover:text-gray-600 transition-colors p-1"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-6">
					<div className="text-center mb-8 mt-2">
						<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
							Official Receipt
						</h3>
						<p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
							Purchase Date: {date}
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-300">
							Transaction ID: {transactionId || "TXN-MI4IPN7O"}
						</p>
					</div>

					<div className="mb-8">
						<h4 className="text-sm font-bold dark:text-white text-gray-900 mb-4">
							Items Purchased
						</h4>

						<div className="flex justify-between items-start mb-2">
							<div>
								<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
									{item}
								</p>
								<p className="text-xs text-gray-500 mt-0.5 dark:text-gray-300">
									{price} × 1
								</p>
							</div>
							<p className="text-sm font-bold text-gray-900 dark:text-gray-100">
								{price}
							</p>
						</div>

						<div className="my-4 h-px bg-gray-100 dark:bg-[#070b1c]"></div>

						<div className="space-y-2 text-sm">
							<div className="flex justify-between text-gray-500 dark:text-gray-300">
								<span>Subtotal</span>
								<span>{price}</span>
							</div>
							<div className="flex justify-between text-gray-500 dark:text-gray-300">
								<span>Service Fee</span>
								<span>$0.00</span>
							</div>
							<div className="flex justify-between text-gray-500 dark:text-gray-300">
								<span>Processing Fee</span>
								<span>$2.50</span>
							</div>
							<div className="flex justify-between text-gray-500 dark:text-gray-300">
								<span>Tax</span>
								<span>$0.00</span>
							</div>
						</div>

						<div className="my-4 h-px bg-gray-100 dark:bg-[#070b1c]"></div>

						<div className="flex justify-between items-center">
							<span className="text-base font-bold text-gray-900 dark:text-gray-100">
								Total Paid
							</span>
							<span className="text-lg font-bold text-emerald-500">
								{total}
							</span>
						</div>
					</div>

					<div className="mb-6">
						<h4 className="text-sm font-bold text-gray-900 mb-2 dark:text-gray-100">
							Payment Method
						</h4>
						<div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 dark:bg-[#090a11] dark:text-gray-100">
							Credit Card - {cardType || "Visa"} Ending In {cardLast4 || "4242"}
						</div>
					</div>

					<div className="mb-6">
						<h4 className="text-sm font-bold text-gray-900 mb-2 dark:text-gray-100">
							Billing Address
						</h4>
						<div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 space-y-0.5 dark:bg-[#090a11] dark:text-gray-100">
							<p>Guest</p>
							<p>123 Main Street</p>
							<p>San Francisco, CA 94105</p>
							<p>United States</p>
						</div>
					</div>

					<div className="dark:bg-[#01030f] rounded-lg p-4 text-center">
						<p className="text-xs  text-gray-500 leading-relaxed dark:text-gray-300">
							Thank you for your purchase! Please keep this receipt for your
							records.
							<br />
							For questions, contact support@example.com
						</p>
					</div>
				</div>

				<div className="p-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11]">
					<button
						onClick={handlePrint}
						className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-[#00020f] dark:text-gray-100 dark:hover:bg-[#070a1a] transition-colors"
					>
						<Printer className="w-4 h-4" />
						Print
					</button>
					<button
						type="button"
						onClick={() => {
							toast.success("Preparing PDF...");
						}}
						className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6366f1] dark:hover:bg-[#000011] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
					>
						<Download className="w-4 h-4" />
						Download PDF
					</button>
				</div>
			</div>
		</div>
	);
}
