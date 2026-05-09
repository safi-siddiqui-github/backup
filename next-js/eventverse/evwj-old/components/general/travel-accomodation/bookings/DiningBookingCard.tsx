"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import type { Booking } from "./data";
import { Calendar, Check, Download, Copy, Bookmark } from "lucide-react";
import { useSaved } from "../saved/SavedContext";

export default function DiningBookingCard({
	booking,
	onCancel,
}: {
	booking: Booking;
	onCancel?: (id: string) => void;
}) {
	const [expanded, setExpanded] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [agreed, setAgreed] = useState(false);
	const { add, remove } = useSaved();
	const [saved, setSaved] = useState(false);

	// Generate booking reference
	const bookingRef = useMemo(() => `BK-${booking.id.toUpperCase()}`, [booking]);

	const handleCardClick = (e: React.MouseEvent) => {
		// Don't expand if clicking on buttons
		if ((e.target as HTMLElement).closest("button")) {
			return;
		}
		setExpanded(!expanded);
	};

	const downloadReceipt = () => {
		const content = `Booking Reference: ${bookingRef}\nActivity: ${booking.title}\nDetails: ${booking.details}\n`;
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `booking-${bookingRef}.txt`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
		toast.success("Receipt downloaded");
	};

	const copyRef = async () => {
		try {
			await navigator.clipboard.writeText(bookingRef);
			toast.success("Booking reference copied to clipboard");
		} catch (err) {
			console.error(err);
			toast.error("Could not copy booking reference");
		}
	};

	const handleSave = () => {
		const next = !saved;
		setSaved(next);
		if (next) {
			try {
				add({
					id: bookingRef,
					kind: "activity",
					title: booking.title,
					payload: { bookingRef, booking },
				});
				toast.success("Reference saved");
			} catch (e) {
				console.warn("failed to add saved item", e);
			}
		} else {
			try {
				remove(bookingRef, "activity");
				toast.success("Removed from saved");
			} catch (e) {
				console.warn("failed to remove saved item", e);
			}
		}
	};

	return (
		<article className="overflow-hidden rounded-lg !bg-white dark:!bg-[#020617] backdrop-blur-sm shadow-md transform-gpu transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg border border-gray-200 dark:border-slate-600 cursor-pointer [background-color:white] dark:[background-color:#020617]">
			<div className="flex items-center gap-4 p-4" onClick={handleCardClick}>
				<div className="h-20 w-20 shrink-0 rounded-md bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
					R
				</div>

				<div className="flex-1">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h3 className="text-lg font-semibold text-foreground">
								{booking.title}
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								{booking.details}
							</p>
						</div>
						<div className="text-right">
							<div className="inline-flex items-center gap-2 rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm px-2 py-1 text-sm font-medium text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 [background-color:white] dark:[background-color:#020617]">
								Confirmed
							</div>
							<div className="text-sm text-muted-foreground mt-1">
								{booking.category}
							</div>
						</div>
					</div>

					<div className="mt-3 flex items-center gap-3 text-sm">
						<div className="inline-flex items-center gap-2 text-muted-foreground">
							<Calendar className="h-4 w-4" />
							<span>{booking.details}</span>
						</div>
						<div className="ml-auto flex items-center gap-2">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setExpanded((s) => !s);
								}}
								className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-500"
							>
								{expanded ? "Hide" : "View"}
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setShowCancelModal(true);
								}}
								className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>

			{expanded && (
				<div className="border-t border-gray-200 dark:border-slate-600 p-6 space-y-6 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					{/* Booking Confirmation Header */}
					<div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-slate-600">
						<div className="h-12 w-12 !bg-white dark:!bg-[#020617] backdrop-blur-sm text-green-600 dark:text-green-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]">
							<Check className="h-6 w-6" />
						</div>
						<div className="flex-1">
							<h3 className="text-xl font-bold text-foreground">
								Booking Confirmed
							</h3>
							<div className="text-sm text-muted-foreground">
								Reference:{" "}
								<span className="font-mono text-foreground">{bookingRef}</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={handleSave}
								className={`px-3 py-1 rounded-md border border-gray-200 dark:border-slate-600 text-sm ${
									saved
										? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
										: "!bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:#020617]"
								}`}
							>
								<Bookmark className="inline-block mr-1 h-3 w-3" />{" "}
								{saved ? "Saved" : "Save"}
							</button>
							<button
								onClick={copyRef}
								className="px-3 py-1 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 text-sm [background-color:white] dark:[background-color:#020617]"
							>
								<Copy className="inline-block mr-1 h-3 w-3" /> Copy
							</button>
						</div>
					</div>

					{/* Activity Details */}
					<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						<h4 className="font-semibold text-foreground mb-3">
							Activity Details
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<div className="text-sm text-muted-foreground mb-1">
									Activity
								</div>
								<div className="text-base font-medium text-foreground">
									{booking.title}
								</div>
							</div>
							<div>
								<div className="text-sm text-muted-foreground mb-1">
									Date & Time
								</div>
								<div className="text-base font-medium text-foreground flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									{booking.details}
								</div>
							</div>
						</div>
						<div className="mt-4 text-sm text-muted-foreground">
							<p>
								Reservation details and restaurant information will appear here.
								When OpenTable is integrated, this section will show table time,
								party size, and special requests.
							</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-slate-600">
						<button
							onClick={downloadReceipt}
							className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 text-sm flex items-center gap-2 [background-color:white] dark:[background-color:#020617]"
						>
							<Download className="h-4 w-4" />
							Download Receipt
						</button>
					</div>
				</div>
			)}

			{/* Cancel modal */}
			{showCancelModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
					<div
						className="absolute inset-0 bg-black/60"
						onClick={() => setShowCancelModal(false)}
					/>
					<div className="relative z-10 w-full max-w-md rounded-lg !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]">
						<h3 className="text-lg font-semibold text-foreground">
							Cancel reservation
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							By cancelling this reservation you may forfeit any deposit and the
							booking may be non-refundable.
						</p>
						<ul className="mt-3 list-disc list-inside text-sm text-foreground space-y-1">
							<li>No refund for cancellations within 24 hours.</li>
							<li>Provider or restaurant cancellation policies apply.</li>
						</ul>

						<label className="mt-4 inline-flex items-center gap-2 text-sm text-foreground">
							<input
								type="checkbox"
								checked={agreed}
								onChange={(e) => setAgreed(e.target.checked)}
								className="h-4 w-4"
							/>
							<span>I agree to the cancellation terms</span>
						</label>

						<div className="mt-4 flex justify-end gap-2">
							<button
								onClick={() => setShowCancelModal(false)}
								className="px-3 py-2 rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:#020617]"
							>
								Close
							</button>
							<button
								onClick={() => {
									if (!agreed)
										return toast.error(
											"Please agree to the cancellation terms",
										);
									setShowCancelModal(false);
									if (onCancel) onCancel(booking.id);
									toast.success(`${booking.title} cancelled`);
								}}
								disabled={!agreed}
								className={`px-3 py-2 rounded-md font-medium transition-colors ${agreed ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white" : "!bg-white dark:!bg-[#020617] backdrop-blur-sm text-muted-foreground border border-gray-200 dark:border-slate-600 cursor-not-allowed [background-color:white] dark:[background-color:#020617]"}`}
							>
								Confirm cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</article>
	);
}
