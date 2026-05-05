import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReservationsList from "./ReservationsList";
import ReserveModal from "./ReserveModal";
import { Reservation, ReserveForm } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialReservations: Reservation[] = [
	{
		id: "1",
		guestName: "David Martinez",
		status: "sent",
		ticketType: "VIP Premium",
		ticketCount: 2,
		guestCategory: "VIP Guest",
		email: "david@example.com",
		reservedDate: "2024-05-15",
		qrCodes: 2,
		notes: "VIP guest from corporate partner",
	},
	{
		id: "2",
		guestName: "Jennifer Lee",
		status: "active",
		ticketType: "General Admission",
		ticketCount: 3,
		guestCategory: "Press/Media",
		email: "jennifer@example.com",
		reservedDate: "2024-05-18",
		qrCodes: 3,
		notes: "Media coverage representative",
	},
	{
		id: "3",
		guestName: "Robert Chen",
		status: "redeemed",
		ticketType: "General Admission",
		ticketCount: 4,
		guestCategory: "Sponsor",
		email: "robert@example.com",
		reservedDate: "2024-05-10",
		qrCodes: 4,
		notes: "Gold sponsor package",
	},
	{
		id: "4",
		guestName: "Maria Garcia",
		status: "sent",
		ticketType: "VIP Premium",
		ticketCount: 1,
		guestCategory: "Speaker/Presenter",
		email: "maria@example.com",
		reservedDate: "2024-05-20",
		qrCodes: 1,
		notes: "Keynote speaker",
	},
	{
		id: "5",
		guestName: "Thomas Wilson",
		status: "active",
		ticketType: "General Admission",
		ticketCount: 2,
		guestCategory: "Staff",
		email: "thomas@example.com",
		reservedDate: "2024-05-22",
		qrCodes: 2,
		notes: "Event staff members",
	},
];

export default function ReservationsTabContent() {
	const [reservations, setReservations] =
		useState<Reservation[]>(initialReservations);
	const [showModal, setShowModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	const handleSend = (id: string) => {
		setReservations((prev) =>
			prev.map((r) => (r.id === id ? { ...r, status: "active" } : r)),
		);
	};

	const handleCancel = (id: string) => {
		setReservations((prev) =>
			prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r)),
		);
	};

	const handleReserve = () => setShowModal(true);

	const submitReserve = (form: ReserveForm) => {
		const num = Math.max(1, Math.floor(Number(form.quantity) || 1));
		const base: Reservation = {
			id: String(Date.now()),
			guestName: form.guestName || "Guest",
			status: "sent",
			ticketType: form.ticketType,
			ticketCount: num,
			guestCategory: form.reason,
			email: form.guestEmail || "",
			reservedDate: new Date().toISOString().slice(0, 10),
			qrCodes: num,
			notes: form.notes || "",
		};
		setReservations((p) => [base, ...p]);
		setShowModal(false);
		toast.success("Reservation created");
	};

	// Pagination calculations
	const totalPages = Math.ceil(reservations.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedReservations = reservations.slice(startIndex, endIndex);

	// Reset to page 1 when items per page changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	return (
		<div className="py-3">
			<div>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
					<div>
						<p className="text-sm text-gray-600 dark:text-slate-400">
							Reserve complimentary tickets for VIPs, staff, and sponsors
						</p>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={handleReserve}
							className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
						>
							<svg
								className="h-4 w-4"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 3.33331V12.6666"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<path
									d="M3.33331 8H12.6666"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
							Reserve Tickets
						</button>
					</div>
				</div>

				<ReservationsList
					reservations={paginatedReservations}
					onSend={handleSend}
					onCancel={handleCancel}
				/>
			</div>

			{/* Pagination */}
			{reservations.length > 0 && (
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
									{Math.min(endIndex, reservations.length)} of{" "}
									{reservations.length}
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

			<ReserveModal
				open={showModal}
				onOpenChange={setShowModal}
				onSubmit={submitReserve}
			/>
		</div>
	);
}
