"use client";

import React, { useState } from "react";
import { Check, Bookmark, Copy, Download, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useSaved } from "../../saved/SavedContext";

export const Step7_Confirmation = ({ onClose }: { onClose: () => void }) => {
	const bookingRef = "FLT-BPJURD-EF13HC";
	const { add, remove } = useSaved();
	const [saved, setSaved] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(bookingRef);
			toast.success("Booking reference copied to clipboard");
		} catch (err) {
			// Fallback for browsers that don't support clipboard API
			console.error("Failed to copy to clipboard:", err);
			toast.error("Unable to copy to clipboard. Please copy manually.");
		}
	};

	const downloadReceipt = () => {
		toast.info("Receipt download will be implemented");
	};

	const addToCalendar = () => {
		toast.info("Calendar integration will be implemented");
	};

	return (
		<div className="space-y-6">
			<div className="text-center">
				<div className="mx-auto inline-flex items-center justify-center h-16 w-16 rounded-full !bg-white dark:!bg-slate-700/50 text-green-600 dark:text-green-400 border border-gray-200 dark:border-slate-600 mb-4 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<Check className="h-8 w-8" />
				</div>
				<h2 className="text-2xl font-semibold text-foreground">
					Booking Confirmed!
				</h2>
				<p className="text-muted-foreground">
					Your reservation has been successfully processed
				</p>
			</div>

			<div className="!bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-lg p-4 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div className="flex items-center justify-between">
					<div>
						<div className="text-sm text-muted-foreground">
							Booking Reference
						</div>
						<div className="font-mono font-semibold text-lg text-foreground">
							{bookingRef}
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => {
								setSaved((s) => {
									const next = !s;
									if (next) {
										try {
											add({
												id: bookingRef,
												kind: "flight",
												title: `Flight UA1001 - United Airlines`,
												payload: { bookingRef },
											});
										} catch (e) {
											console.warn("failed to add saved item", e);
										}
										toast.success("Reference saved");
									} else {
										try {
											remove(bookingRef, "flight");
										} catch (e) {
											console.warn("failed to remove saved item", e);
										}
										toast.success("Removed from saved");
									}
									return next;
								});
							}}
							className={`px-3 py-1 rounded-md border border-gray-200 dark:border-slate-600 ${saved ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" : "!bg-white dark:!bg-slate-800/95 backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"}`}
						>
							<Bookmark className="inline-block mr-2" />{" "}
							{saved ? "Saved" : "Save this reference"}
						</button>
						<button
							onClick={handleCopy}
							className="px-3 py-1 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
						>
							<Copy className="inline-block mr-2" /> Copy
						</button>
					</div>
				</div>

				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="text-sm font-semibold text-foreground">
							Booking Summary
						</h4>
						<div className="mt-2 text-sm text-foreground space-y-1">
							<div>
								<span className="font-medium">Item:</span> United Airlines
							</div>
							<div>
								<span className="font-medium">Flight:</span> UA1001
							</div>
							<div>
								<span className="font-medium">Departure:</span> JFK - Jul 18,
								09:30
							</div>
							<div>
								<span className="font-medium">Total Paid:</span> $263.25
							</div>
						</div>
					</div>

					<div>
						<h4 className="text-sm font-semibold text-foreground">
							Guest Information
						</h4>
						<div className="mt-2 text-sm text-foreground space-y-1">
							<div>
								<span className="font-medium">Name:</span> John Doe
							</div>
							<div>
								<span className="font-medium">Email:</span> john.doe@example.com
							</div>
							<div>
								<span className="font-medium">Phone:</span> (123) 456-7890
							</div>
							<div>
								<span className="font-medium">Payment:</span> Visa •••• 4242
							</div>
						</div>
					</div>
				</div>

				<div className="mt-4 flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Email Confirmation sent to{" "}
						<span className="font-medium text-foreground">
							john.doe@example.com
						</span>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={downloadReceipt}
							className="px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center gap-2 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
						>
							<Download /> Download Receipt
						</button>
						<button
							onClick={addToCalendar}
							className="px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center gap-2 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
						>
							<Calendar /> Add to Calendar
						</button>
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<button
					onClick={onClose}
					className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg"
				>
					Done
				</button>
			</div>
		</div>
	);
};

export default Step7_Confirmation;
