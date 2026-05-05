"use client";

import React from "react";
import { Check } from "lucide-react";
import { useHotelPayment } from "../HotelPaymentContext";
import type { HotelType } from "../hotels";
import { toast } from "sonner";

export default function Step5_Confirmation({
	hotel,
	onClose,
}: {
	hotel: HotelType;
	onClose: () => void;
}) {
	const { payment } = useHotelPayment();

	const bookingRef = React.useMemo(
		() => `HB-${Date.now().toString(36).toUpperCase().slice(-8)}`,
		[],
	);

	const maskedCard = payment.cardNumber
		? payment.cardNumber.replace(/.(?=.{4})/g, "*")
		: "";

	const downloadReceipt = () => {
		toast.info("Receipt download will be implemented");
	};

	const addToCalendar = () => {
		toast.info("Calendar integration will be implemented");
	};

	const copyRef = async () => {
		try {
			await navigator.clipboard.writeText(bookingRef);
			toast.success("Booking reference copied to clipboard");
		} catch (err) {
			// Fallback for browsers that don't support clipboard API
			console.error("Failed to copy to clipboard:", err);
			toast.error("Unable to copy to clipboard. Please copy manually.");
		}
	};

	const handleDone = () => {
		toast.success("All set — booking complete");
		onClose();
	};

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			<div className="flex items-center gap-4">
				<div className="h-16 w-16 !bg-white dark:!bg-slate-700/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<Check className="h-8 w-8" />
				</div>
				<div>
					<h2 className="text-2xl font-bold text-foreground">
						Booking Confirmed
					</h2>
					<div className="text-sm text-muted-foreground">
						Reference:{" "}
						<span className="font-mono text-foreground">{bookingRef}</span>
					</div>
				</div>
			</div>

			<div className="rounded-lg border p-4 !bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<h3 className="font-semibold text-foreground">Reservation</h3>
				<div className="mt-2 text-sm text-foreground">
					<div>
						<span className="font-medium">Hotel:</span> {hotel.name}
					</div>
					<div>
						<span className="font-medium">Address:</span> {hotel.address}
					</div>
					<div>
						<span className="font-medium">Check-in:</span> {hotel.checkIn}
					</div>
					<div>
						<span className="font-medium">Check-out:</span> {hotel.checkOut}
					</div>
				</div>
			</div>

			<div className="rounded-lg border p-4 border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<h3 className="font-semibold text-foreground">Payment</h3>
				<div className="mt-2 text-sm text-foreground space-y-1">
					<div>
						<span className="font-medium">Method:</span>{" "}
						{payment.method.toUpperCase()}
					</div>
					<div>
						<span className="font-medium">Card:</span> {maskedCard}
					</div>
					<div>
						<span className="font-medium">Billing:</span> {payment.street},{" "}
						{payment.city} {payment.stateField} {payment.zip}, {payment.country}
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-3">
				<button
					onClick={downloadReceipt}
					className="px-4 py-2 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-lg text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
				>
					Download Receipt
				</button>
				<button
					onClick={addToCalendar}
					className="px-4 py-2 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-lg text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
				>
					Add to Calendar
				</button>
				<button
					onClick={copyRef}
					className="px-4 py-2 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-lg text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
				>
					Copy Reference
				</button>
				<button
					onClick={handleDone}
					className="ml-auto px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg"
				>
					Done
				</button>
			</div>
		</div>
	);
}
