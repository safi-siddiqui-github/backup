"use client";

import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
	ChevronUp,
	ChevronDown,
	Calendar,
	Star,
	MapPin,
	Check,
	Download,
	Copy,
	Bookmark,
} from "lucide-react";
import { toast } from "sonner";
import type { Booking, HotelBooking, FlightBooking } from "./data";
import AmenityTag from "./AmenityTag";
import DetailItem from "./DetailItem";
import { useSaved } from "../saved/SavedContext";

export default function BookingCard({
	booking,
	onCancel,
}: {
	booking: Booking;
	onCancel?: (id: string) => void;
}) {
	const Icon = booking.icon as React.ElementType;
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [agreed, setAgreed] = useState(false);
	const { add, remove } = useSaved();
	const [saved, setSaved] = useState(false);

	function isHotelBooking(b: Booking): b is HotelBooking {
		return b.category === "Hotel";
	}

	function isFlightBooking(b: Booking): b is FlightBooking {
		return b.category === "Flight";
	}

	// Generate booking reference based on booking ID
	const bookingRef = useMemo(() => {
		if (booking.category === "Hotel") return `HB-${booking.id.toUpperCase()}`;
		if (booking.category === "Flight") return `FL-${booking.id.toUpperCase()}`;
		return `BK-${booking.id.toUpperCase()}`;
	}, [booking]);

	// Parse flight details from the details string
	const flightDetails = useMemo(() => {
		if (!isFlightBooking(booking)) return null;
		const parts = booking.details.split("•");
		const date = parts[0]?.trim() || "";
		const route = parts[1]?.trim() || "";
		const price = parts[2]?.trim() || "";
		const [dep, arr] = route.split(" to ") || ["", ""];
		return { date, departure: dep?.trim(), arrival: arr?.trim(), price };
	}, [booking]);

	const handleCardClick = (e: React.MouseEvent) => {
		// Don't expand if clicking on cancel button or chevron
		if ((e.target as HTMLElement).closest("button")) {
			return;
		}
		setIsExpanded(!isExpanded);
	};

	const downloadReceipt = () => {
		let content = `Booking Reference: ${bookingRef}\n`;
		if (isHotelBooking(booking)) {
			content += `Hotel: ${booking.title}\nCheck-in: ${booking.checkIn}\nCheck-out: ${booking.checkOut}\nTotal Cost: ${booking.totalCost}\n`;
		} else if (isFlightBooking(booking)) {
			content += `Flight: ${booking.title}\nRoute: ${booking.details}\n`;
		} else {
			content += `Activity: ${booking.title}\nDetails: ${booking.details}\n`;
		}
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
					kind:
						booking.category === "Hotel"
							? "hotel"
							: booking.category === "Flight"
								? "flight"
								: "activity",
					title: booking.title,
					payload: { bookingRef, booking },
				});
				toast.success("Reference saved");
			} catch (e) {
				console.warn("failed to add saved item", e);
			}
		} else {
			try {
				remove(
					bookingRef,
					booking.category === "Hotel"
						? "hotel"
						: booking.category === "Flight"
							? "flight"
							: "activity",
				);
				toast.success("Removed from saved");
			} catch (e) {
				console.warn("failed to remove saved item", e);
			}
		}
	};

	return (
		<div className="overflow-hidden rounded-lg !bg-white dark:!bg-[#020617] backdrop-blur-sm shadow-md transform-gpu transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg border border-gray-200 dark:border-slate-600 cursor-pointer [background-color:white] dark:[background-color:#020617]">
			<div className="flex items-center p-4" onClick={handleCardClick}>
				<div
					className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 ${booking.iconColor}`}
				>
					<Icon className="h-6 w-6 text-gray-700 dark:text-gray-100" />
				</div>
				<div className="ml-4 grow">
					<p className="text-xs font-semibold text-muted-foreground uppercase">
						{booking.category}
					</p>
					<p className="text-base font-semibold text-foreground">
						{booking.title}
					</p>
					<p className="text-sm text-muted-foreground">{booking.details}</p>
				</div>
				<div className="ml-4 flex shrink-0 items-center gap-2">
					<div className="flex items-center gap-3">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setShowCancelModal(true);
							}}
							className="text-sm text-red-600 transition-colors hover:text-red-700 dark:text-red-400"
							aria-label="Cancel booking"
						>
							Cancel
						</button>
					</div>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsExpanded(!isExpanded);
						}}
						className="text-gray-400 transition-colors hover:text-indigo-500 dark:text-gray-500 dark:hover:text-indigo-400"
						aria-label="View details"
					>
						{isExpanded ? (
							<ChevronUp className="h-5 w-5" />
						) : (
							<ChevronDown className="h-5 w-5" />
						)}
					</button>
				</div>
			</div>

			{showCancelModal &&
				createPortal(
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
						<div
							className="absolute inset-0 bg-black/60"
							onClick={() => setShowCancelModal(false)}
						/>
						<div className="relative z-10 w-full max-w-md rounded-lg !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]">
							<h3 className="text-lg font-semibold text-foreground">
								Cancel booking
							</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Please confirm you understand the cancellation policy for this
								booking. By cancelling you may forfeit your payment and the
								booking may be non-refundable.
							</p>

							<ul className="mt-3 list-disc list-inside text-sm text-foreground space-y-1">
								<li>
									No refund for cancellations made within 24 hours of check-in.
								</li>
								<li>Service fees may not be refundable.</li>
								<li>
									Some providers require advance notice; contact support for
									exceptions.
								</li>
							</ul>

							<label className="mt-4 inline-flex items-center gap-2 text-sm text-foreground">
								<input
									type="checkbox"
									checked={agreed}
									onChange={(e) => setAgreed(e.target.checked)}
									className="h-4 w-4"
								/>
								<span>I agree to the cancellation terms above</span>
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
					</div>,
					document.body,
				)}

			{isExpanded && (
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

					{/* Booking Details */}
					{isHotelBooking(booking) ? (
						<>
							{/* Reservation Details */}
							<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
								<h4 className="font-semibold text-foreground mb-3">
									Reservation Details
								</h4>
								<div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3">
									<DetailItem label="Check-in">
										<div className="flex items-center gap-1.5">
											<Calendar className="h-4 w-4 text-muted-foreground" />
											<span className="text-foreground">{booking.checkIn}</span>
										</div>
									</DetailItem>
									<DetailItem label="Check-out">
										<div className="flex items-center gap-1.5">
											<Calendar className="h-4 w-4 text-muted-foreground" />
											<span className="text-foreground">
												{booking.checkOut}
											</span>
										</div>
									</DetailItem>
									<DetailItem
										label="Total Nights"
										value={`${booking.totalNights} nights`}
									/>
									<DetailItem label="Room Type" value={booking.roomType} />
									<DetailItem label="Rating">
										<div className="flex items-center gap-1.5">
											<Star
												className="h-4 w-4 text-yellow-500"
												fill="currentColor"
											/>
											<span className="text-foreground">
												{booking.rating} stars
											</span>
										</div>
									</DetailItem>
									<DetailItem label="Distance">
										<div className="flex items-center gap-1.5">
											<MapPin className="h-4 w-4 text-muted-foreground" />
											<span className="text-foreground">
												{booking.distance}
											</span>
										</div>
									</DetailItem>
									<DetailItem
										label="Price per Night"
										value={booking.pricePerNight}
									/>
									<DetailItem label="Total Cost" value={booking.totalCost} />
								</div>
							</div>

							{/* Amenities */}
							{booking.amenities && booking.amenities.length > 0 && (
								<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
									<p className="mb-3 text-sm font-medium text-foreground">
										Amenities
									</p>
									<div className="flex flex-wrap gap-2">
										{booking.amenities.map((amenity) => (
											<AmenityTag key={amenity} text={amenity} />
										))}
									</div>
								</div>
							)}
						</>
					) : isFlightBooking(booking) && flightDetails ? (
						<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
							<h4 className="font-semibold text-foreground mb-3">
								Flight Details
							</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<div className="text-sm text-muted-foreground mb-1">
										Airline
									</div>
									<div className="text-base font-medium text-foreground">
										{booking.title}
									</div>
								</div>
								<div>
									<div className="text-sm text-muted-foreground mb-1">
										Departure Date
									</div>
									<div className="text-base font-medium text-foreground">
										{flightDetails.date}
									</div>
								</div>
								<div>
									<div className="text-sm text-muted-foreground mb-1">
										Route
									</div>
									<div className="text-base font-medium text-foreground">
										{flightDetails.departure} → {flightDetails.arrival}
									</div>
								</div>
								<div>
									<div className="text-sm text-muted-foreground mb-1">
										Price
									</div>
									<div className="text-base font-medium text-foreground">
										{flightDetails.price}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
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
										Details
									</div>
									<div className="text-base font-medium text-foreground">
										{booking.details}
									</div>
								</div>
							</div>
						</div>
					)}

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
		</div>
	);
}
